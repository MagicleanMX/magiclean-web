import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import * as Sentry from '@sentry/nextjs'

// ─── Clientes (lazy — se inicializan dentro del handler, no en build time) ───
function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  )
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

// ─── Tipos ───────────────────────────────────────────────────────────────────
interface LeadPayload {
  nombre:   string
  empresa:  string
  email:    string
  telefono?: string
  canal:    string
  ciudad:   string
  mensaje?: string
  website?: string // honeypot — debe llegar vacío siempre
}

// ─── Constantes de validación ─────────────────────────────────────────────────
const CANAL_WHITELIST = new Set([
  'distribuidor', 'horeca', 'retail', 'institucional', 'hogar', 'otro',
])

const HTML_PATTERN = /<[^>]*>|<script/i

// ─── Sanitiza texto para inserción en HTML de email ──────────────────────────
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ─── Validación estricta ──────────────────────────────────────────────────────
function validatePayload(body: LeadPayload): string | null {
  const { nombre, empresa, email, telefono, canal, ciudad, mensaje } = body

  if (!nombre?.trim())                         return 'El campo "nombre" es obligatorio.'
  if (nombre.trim().length > 100)              return 'El nombre no puede superar 100 caracteres.'
  if (HTML_PATTERN.test(nombre))               return 'El nombre contiene caracteres no permitidos.'

  if (!empresa?.trim())                        return 'El campo "empresa" es obligatorio.'
  if (empresa.trim().length > 200)             return 'La empresa no puede superar 200 caracteres.'
  if (HTML_PATTERN.test(empresa))              return 'La empresa contiene caracteres no permitidos.'

  if (!email?.trim())                          return 'El campo "email" es obligatorio.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'El email no tiene un formato válido.'
  if (HTML_PATTERN.test(email))                return 'El email contiene caracteres no permitidos.'

  if (telefono) {
    if (!/^[0-9+\s\-().]{1,20}$/.test(telefono.trim())) return 'El teléfono solo puede contener números, +, espacios y guiones (máx. 20).'
  }

  if (!canal?.trim())                          return 'El campo "canal" es obligatorio.'
  if (!CANAL_WHITELIST.has(canal))             return 'El canal seleccionado no es válido.'

  if (!ciudad?.trim())                         return 'El campo "ciudad" es obligatorio.'
  if (ciudad.trim().length > 100)              return 'La ciudad no puede superar 100 caracteres.'
  if (HTML_PATTERN.test(ciudad))               return 'La ciudad contiene caracteres no permitidos.'

  if (mensaje) {
    if (mensaje.trim().length > 2000)          return 'El mensaje no puede superar 2000 caracteres.'
    if (HTML_PATTERN.test(mensaje))            return 'El mensaje contiene caracteres no permitidos.'
  }

  return null
}

// ─── Labels para el correo ───────────────────────────────────────────────────
const CANAL_LABELS: Record<string, string> = {
  distribuidor:  'Distribuidor',
  horeca:        'HORECA (Hotel / Restaurant / Cafetería)',
  retail:        'Retail / Tienda',
  institucional: 'Institucional (Hospital / Escuela / Gobierno)',
  hogar:         'Hogar',
  otro:          'Otro',
}

// ─── POST /api/contact ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ──
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    const rl = await checkRateLimit(ip)
    if (rl && !rl.success) {
      const retryAfterSec = Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000))
      return NextResponse.json(
        { error: 'Demasiados envíos. Intenta en una hora.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSec),
            'X-RateLimit-Limit': String(rl.limit),
            'X-RateLimit-Remaining': String(rl.remaining),
            'X-RateLimit-Reset': String(rl.reset),
          },
        }
      )
    }

    const body: LeadPayload = await req.json()

    // ── Honeypot: si el campo "website" tiene contenido es un bot ──
    if (body.website) {
      // Responder 200 para no alertar al bot; no guardamos ni enviamos nada
      return NextResponse.json({ success: true })
    }

    // ── Validación estricta ──
    const validationError = validatePayload(body)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    // 1️⃣  Guardar en Supabase (primero — asegura persistencia incluso si email falla)
    const supabase = getSupabase()
    const { error: dbError } = await supabase.from('leads').insert([
      {
        nombre:    body.nombre.trim(),
        empresa:   body.empresa.trim(),
        email:     body.email.trim().toLowerCase(),
        telefono:  body.telefono?.trim() || null,
        canal:     body.canal,
        ciudad:    body.ciudad.trim(),
        mensaje:   body.mensaje?.trim() || null,
        fuente:    'web_contacto',
        creado_en: new Date().toISOString(),
      },
    ])

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json(
        { error: 'Error al guardar la solicitud. Intenta de nuevo.' },
        { status: 500 }
      )
    }

    // ── Resend lazy init: si falta la env var, lead queda guardado y salimos OK ──
    const resend = getResend()
    if (!resend) {
      console.warn('[contact] RESEND_API_KEY missing — skipping email notifications. Lead guardado en Supabase OK.')
      Sentry.captureMessage('Contact form: email skipped (Resend not configured)', 'warning')
      return NextResponse.json({ success: true })
    }

    // 2️⃣  Notificación interna al equipo MagicClean
    const notifyTo = process.env.NOTIFY_EMAIL || 'hola@magiclean.mx'
    const canalLabel = CANAL_LABELS[body.canal] || body.canal

    // Valores escapados para uso en HTML de email
    const safe = {
      nombre:  escapeHtml(body.nombre),
      empresa: escapeHtml(body.empresa),
      email:   escapeHtml(body.email),
      telefono: body.telefono ? escapeHtml(body.telefono) : '—',
      canal:   escapeHtml(canalLabel),
      ciudad:  escapeHtml(body.ciudad),
      mensaje: body.mensaje ? escapeHtml(body.mensaje) : '',
    }

    try {
      await resend.emails.send({
        from:    'MagicClean Web <noreply@magiclean.mx>',
        to:      notifyTo,
        subject: `🟢 Nuevo lead B2B — ${safe.empresa} (${safe.canal})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
            <div style="background: #0076FF; padding: 24px 32px; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">
                Nuevo lead desde magiclean.mx
              </h1>
            </div>
            <div style="background: #F5F7FA; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #E5E7EB;">

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #6B7280; font-size: 13px; width: 120px; vertical-align: top;">Nombre</td>
                  <td style="padding: 10px 0; font-weight: 600; font-size: 14px;">${safe.nombre}</td>
                </tr>
                <tr style="border-top: 1px solid #E5E7EB;">
                  <td style="padding: 10px 0; color: #6B7280; font-size: 13px; vertical-align: top;">Empresa</td>
                  <td style="padding: 10px 0; font-weight: 600; font-size: 14px;">${safe.empresa}</td>
                </tr>
                <tr style="border-top: 1px solid #E5E7EB;">
                  <td style="padding: 10px 0; color: #6B7280; font-size: 13px; vertical-align: top;">Email</td>
                  <td style="padding: 10px 0; font-size: 14px;">
                    <a href="mailto:${safe.email}" style="color: #0076FF;">${safe.email}</a>
                  </td>
                </tr>
                <tr style="border-top: 1px solid #E5E7EB;">
                  <td style="padding: 10px 0; color: #6B7280; font-size: 13px; vertical-align: top;">Teléfono</td>
                  <td style="padding: 10px 0; font-size: 14px;">${safe.telefono}</td>
                </tr>
                <tr style="border-top: 1px solid #E5E7EB;">
                  <td style="padding: 10px 0; color: #6B7280; font-size: 13px; vertical-align: top;">Canal</td>
                  <td style="padding: 10px 0; font-size: 14px;">
                    <span style="background: #0076FF; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                      ${safe.canal}
                    </span>
                  </td>
                </tr>
                <tr style="border-top: 1px solid #E5E7EB;">
                  <td style="padding: 10px 0; color: #6B7280; font-size: 13px; vertical-align: top;">Ciudad</td>
                  <td style="padding: 10px 0; font-size: 14px;">${safe.ciudad}</td>
                </tr>
                ${safe.mensaje ? `
                <tr style="border-top: 1px solid #E5E7EB;">
                  <td style="padding: 10px 0; color: #6B7280; font-size: 13px; vertical-align: top;">Mensaje</td>
                  <td style="padding: 10px 0; font-size: 14px; line-height: 1.6;">${safe.mensaje}</td>
                </tr>
                ` : ''}
              </table>

              <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #E5E7EB;">
                <a href="mailto:${safe.email}?subject=MagicClean — Tu solicitud profesional"
                   style="background: #0076FF; color: white; padding: 12px 24px; border-radius: 24px;
                          text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
                  Responder a ${safe.nombre} →
                </a>
              </div>

              <p style="margin-top: 24px; font-size: 11px; color: #9CA3AF;">
                Lead recibido el ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })} · MagicClean Web
              </p>
            </div>
          </div>
        `,
      })
    } catch (err) {
      console.error('[contact] Resend notify email failed:', err)
      Sentry.captureException(err)
    }

    // 3️⃣  Confirmación automática al lead
    try {
      await resend.emails.send({
        from:    'MagicClean <hola@magiclean.mx>',
        to:      body.email,
        subject: 'Recibimos tu solicitud — MagicClean',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
            <div style="background: #0A1628; padding: 24px 32px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">
                MagicClean
              </h1>
              <p style="color: rgba(255,255,255,0.4); margin: 4px 0 0; font-size: 13px;">
                Soluciones de limpieza profesional
              </p>
            </div>
            <div style="padding: 40px 32px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 16px; color: #0A1628;">
                Hola, ${safe.nombre}.
              </h2>
              <p style="font-size: 15px; line-height: 1.7; color: #374151; margin: 0 0 16px;">
                Recibimos tu solicitud de información para <strong>${safe.empresa}</strong>.
                Nuestro equipo especializado en el canal <strong>${safe.canal}</strong>
                la revisará y te contactará en menos de <strong>24 horas hábiles</strong>
                con una propuesta adaptada a tu operación.
              </p>
              <p style="font-size: 15px; line-height: 1.7; color: #374151; margin: 0 0 32px;">
                Mientras tanto, si tienes alguna pregunta urgente, puedes responder directamente a este correo.
              </p>
              <div style="background: #F5F7FA; padding: 20px 24px; border-radius: 8px; border-left: 3px solid #0076FF;">
                <p style="font-size: 13px; color: #6B7280; margin: 0 0 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                  Tu solicitud
                </p>
                <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.6;">
                  Canal: ${safe.canal} · Ciudad: ${safe.ciudad}
                  ${safe.mensaje ? `<br>&ldquo;${safe.mensaje}&rdquo;` : ''}
                </p>
              </div>
              <p style="margin-top: 40px; font-size: 13px; color: #9CA3AF; text-align: center;">
                MagicClean · Proveedor B2B de limpieza profesional · México
              </p>
            </div>
          </div>
        `,
      })
    } catch (err) {
      console.error('[contact] Resend confirm email failed:', err)
      Sentry.captureException(err)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Error interno. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
