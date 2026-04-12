import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

// ─── Clientes (lazy — se inicializan dentro del handler, no en build time) ───
function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  )
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? '')
}

// ─── Tipos ───────────────────────────────────────────────────────────────────
interface LeadPayload {
  nombre: string
  empresa: string
  email: string
  telefono?: string
  canal: string
  ciudad: string
  mensaje?: string
}

// ─── Sanitiza texto para inserción en HTML de email ──────────────────────────
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
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
    const body: LeadPayload = await req.json()

    // Validación mínima
    const required = ['nombre', 'empresa', 'email', 'canal', 'ciudad']
    for (const field of required) {
      if (!body[field as keyof LeadPayload]?.trim()) {
        return NextResponse.json(
          { error: `El campo "${field}" es obligatorio.` },
          { status: 400 }
        )
      }
    }

    // 1️⃣  Guardar en Supabase
    const supabase = getSupabase()
    const resend = getResend()
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

    // 3️⃣  Confirmación automática al lead
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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Error interno. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
