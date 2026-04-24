# HALLAZGOS DETALLADOS — MAGICLEAN WEB LAUNCH
**Formato:** ID · Título · Severidad · Ubicación · Descripción · Evidencia · Impacto · Remediación · Esfuerzo

---

## 🔴 CRÍTICOS

---

### SEC-RLS-01 · RLS de Supabase no verificado en producción
**Severidad:** CRÍTICO  
**Ubicación:** `supabase_leads_table.sql` / Supabase dashboard (proyecto de producción)  
**Descripción:** El archivo SQL define correctamente `alter table public.leads enable row level security` con policy `service_role_only`. Sin embargo:  
1. No existe carpeta `supabase/migrations/` — la migración no está versionada.  
2. No hay certeza de que el script fue aplicado al proyecto Supabase de producción.  
3. Sin credenciales de solo lectura al dashboard no es posible verificarlo.  
**Evidencia:** `find . -path "*/supabase/migrations/*"` → sin resultados. Solo existe `supabase_leads_table.sql` en raíz del proyecto.  
**Impacto:** Si RLS no está activo, cualquier usuario con la anon key (si existiera) podría SELECT todos los leads B2B (nombre, empresa, email, teléfono). En el stack actual el cliente público no tiene anon key expuesta, lo que mitiga parcialmente el riesgo. Pero la política debe estar activa por diseño defensivo.  
**Remediación:**  
1. Acceder a Supabase dashboard → Table Editor → `leads` → verificar que el toggle RLS está ON.  
2. Verificar que la policy `service_role_only` aparece en la lista de políticas.  
3. Mover `supabase_leads_table.sql` a `supabase/migrations/20260411_leads.sql` e inicializar Supabase CLI.  
**Esfuerzo:** XS (< 1h para verificación, S si hay que crear migraciones)

---

### CON-RATELIMIT-01 · Rate limiting en memoria inefectivo en serverless
**Severidad:** CRÍTICO  
**Ubicación:** `src/app/api/contact/route.ts:18-42`  
**Descripción:** El rate limiting está implementado con un `Map<string, RateEntry>` en memoria del módulo y un `setInterval` para limpieza. En Vercel Edge/Serverless, cada función se ejecuta en una instancia aislada. Las instancias frías (cold start) comienzan con `rateLimitMap` vacío. Bajo carga distribuida, múltiples instancias corren en paralelo sin compartir estado.  
**Evidencia:**
```typescript
const rateLimitMap = new Map<string, RateEntry>() // se resetea en cada cold start
setInterval(() => { ... }, RATE_WINDOW_MS)         // timer no persiste entre invocaciones
```
**Impacto:** Un atacante puede enviar cientos de leads falsos simultáneamente desde la misma IP, saturando la cuota de Resend (200 emails/día en plan free), llenando la tabla de Supabase con spam, y potencialmente bloqueando el dominio de envío de email.  
**Remediación:**
```typescript
// Reemplazar rateLimitMap con Upstash Redis / Vercel KV
import { kv } from '@vercel/kv'
const key = `rl:${ip}`
const count = await kv.incr(key)
if (count === 1) await kv.expire(key, 3600)
if (count > RATE_LIMIT) return NextResponse.json({ error: '...' }, { status: 429 })
```
**Esfuerzo:** S (2-4 horas — instalar @vercel/kv, provisionar KV en Vercel, reemplazar lógica)

---

### SEC-CSP-01 · Content Security Policy permite `unsafe-inline` y `unsafe-eval`
**Severidad:** CRÍTICO  
**Ubicación:** `next.config.ts:21`  
**Descripción:** El header CSP incluye `"script-src 'self' 'unsafe-inline' 'unsafe-eval'"`. Esto anula completamente la protección XSS del CSP. Cualquier script inyectado en el DOM (vía XSS, extensión de terceros, o contenido comprometido) se ejecutaría sin restricción.  
**Evidencia:**
```typescript
"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
```
**Impacto:** Si un atacante logra inyectar JavaScript en la página (vía reflected XSS en un parámetro URL, por ejemplo el campo `?canal=`), el CSP no lo bloqueará. Impacto en confidencialidad de leads si se roba el token de sesión del formulario.  
**Remediación:**  
Framer Motion requiere `unsafe-eval` solo en modo dev. En producción se puede usar nonces:
```typescript
// En middleware.ts — generar nonce por request
const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
// En next.config.ts headers — usar nonce en lugar de unsafe-inline
"script-src 'self' 'nonce-${nonce}'"
```
Documentación: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy  
**Esfuerzo:** M (4-8 horas — requiere middleware + testing de que Framer Motion no quiebra)

---

## 🟠 ALTOS

---

### ERR-SENTRY-01 · Sentry no está instalado
**Severidad:** ALTO  
**Ubicación:** Todo el proyecto  
**Descripción:** No existe `sentry.client.config.ts`, `sentry.server.config.ts`, ni el paquete `@sentry/nextjs` en `package.json`. La aplicación opera en producción sin monitoreo de errores. Los errores de runtime en Vercel solo aparecen en los logs de la plataforma, sin alertas, sin contexto de usuario, sin source maps.  
**Evidencia:** `grep -r "sentry" src/` → sin resultados. `cat package.json | grep sentry` → sin resultados.  
**Impacto:** Un error crítico en producción (ej: fallo en el API de contacto) puede pasar desapercibido días. No hay trazabilidad de errores por usuario ni por release.  
**Remediación:**
```bash
npx @sentry/wizard@latest -i nextjs
# Configurar SENTRY_DSN en .env.local y Vercel
# Configurar tracesSampleRate: 0.1 (no 1.0 — costo)
# Habilitar filtros de PII
```
**Esfuerzo:** S (2-3 horas instalación + configuración básica)

---

### PERF-CLIENT-01 · Todos los componentes son `use client` — sin Server Components
**Severidad:** ALTO  
**Ubicación:** 17 de 17 componentes en `src/components/`  
**Descripción:** Todos los componentes tienen `'use client'` debido al uso de `framer-motion`. Next.js App Router está diseñado para que la mayoría del árbol sea Server Components (RSC), con `use client` solo en las hojas interactivas. Con el stack actual, todo el JavaScript se envía al cliente, eliminando los beneficios de RSC: streaming, menor bundle inicial, sin hidratación del árbol completo.  
**Evidencia:** 17/17 archivos tsx con `'use client'` en línea 1.  
**Impacto:** Bundle más grande, Time to Interactive más lento, mayor consumo de memoria en dispositivos móviles. Se estima 20-30% de degradación en Lighthouse Performance mobile.  
**Remediación:**  
Para componentes solo-animados, extraer la lógica de animación a un wrapper `use client` pequeño y mantener el contenido como RSC:
```tsx
// AnimatedSection.tsx (use client — solo wrapper)
'use client'
import { motion } from 'framer-motion'
export const AnimatedSection = ({ children }) => (
  <motion.div initial={{opacity:0}} whileInView={{opacity:1}}>{children}</motion.div>
)
// BeneficiosClave.tsx (server component — sin use client)
import { AnimatedSection } from './AnimatedSection'
```
**Esfuerzo:** L (1-3 días para refactor completo, M si solo se hace en secciones clave)

---

### SEO-OG-01 · Imagen OG con dimensiones incorrectas (2752×1536 en lugar de 1200×630)
**Severidad:** ALTO  
**Ubicación:** `src/app/layout.tsx:55` / `public/images/hero/hero-main.png`  
**Descripción:** La metadata OG declara `width: 1200, height: 630` pero el archivo real es 2752×1536px. Open Graph requiere exactamente 1200×630px. Plataformas como WhatsApp, Twitter/X y LinkedIn pueden rechazar o distorsionar la preview.  
**Evidencia:** 
```
sips -g pixelWidth -g pixelHeight public/images/hero/hero-main.png
→ pixelWidth: 2752
→ pixelHeight: 1536
```
Hay un TODO en el código: `// TODO: Replace OG image with correct 1200x630 version after photo production.`  
**Impacto:** Las previews en redes sociales mostrarán la imagen cortada o no la mostrarán. Daño a la presencia de marca en el lanzamiento.  
**Remediación:** Crear una versión `og-image.jpg` de 1200×630px en `/public` para uso exclusivo como OG image. Puede ser un placeholder de marca hasta que llegue el arte final.  
**Esfuerzo:** XS (< 1h — Figma o Canva para crear el placeholder 1200×630)

---

### CON-DOMAIN-01 · siteUrl hardcodeado como subdominio Vercel, no dominio final
**Severidad:** ALTO  
**Ubicación:** `src/app/layout.tsx:22` / `src/app/sitemap.ts`  
**Descripción:** `const siteUrl = 'https://magiclean-web.vercel.app'` está hardcodeado en layout.tsx y se usa para canonical URL, sitemap, JSON-LD structured data y OG URL. Cuando se conecte el dominio final (ej: `magiclean.mx`), estos valores quedarán incorrectos hasta una corrección manual.  
**Evidencia:**
```typescript
const siteUrl = 'https://magiclean-web.vercel.app'
```
**Impacto:** Google indexará `magiclean-web.vercel.app` como URL canónica. El structured data (JSON-LD) apuntará al subdominio Vercel. El `sitemap.xml` en producción tendrá URLs incorrectas.  
**Remediación:**
```typescript
// next.config.ts o src/lib/config.ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://magiclean-web.vercel.app'
```
Agregar `NEXT_PUBLIC_SITE_URL=https://magiclean.mx` en Vercel Production environment variables.  
**Esfuerzo:** XS (30 min)

---

### ERR-BOUNDARY-01 · Sin Error Boundaries ni página error.tsx
**Severidad:** ALTO  
**Ubicación:** `src/app/` — no existe `error.tsx`  
**Descripción:** Next.js App Router requiere un `error.tsx` en cada segmento de ruta para capturar errores de runtime. Sin él, un error en cualquier Server Component muestra una pantalla blanca genérica. No hay `ErrorBoundary` en el árbol de componentes cliente.  
**Evidencia:** `ls src/app/` → no contiene `error.tsx`.  
**Impacto:** Si el API de contacto falla o hay un error de hidratación, el usuario ve una pantalla blanca sin opción de recuperación. Daño a credibilidad de marca B2B.  
**Remediación:**
```tsx
// src/app/error.tsx
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <div className="text-center text-white">
        <h2>Algo salió mal.</h2>
        <button onClick={reset}>Reintentar</button>
      </div>
    </div>
  )
}
```
**Esfuerzo:** XS (30 min)

---

### CON-LINT-01 · `npm run lint` está roto
**Severidad:** ALTO  
**Ubicación:** `package.json:7` / Next.js 16 configuración  
**Descripción:** Ejecutar `npm run lint` produce: `Invalid project directory provided, no such directory: /Users/jacobolevy/Desktop/magicclean/lint`. El comando `next lint` en Next.js 16 tiene un cambio de API que requiere configuración explícita.  
**Evidencia:**
```
> next lint
Invalid project directory provided, no such directory: .../lint
```
**Impacto:** Sin lint funcional, no hay barrera automática contra errores de código. CI/CD no puede validar calidad.  
**Remediación:**
```json
// package.json
"lint": "next lint --dir src"
// O bien, crear eslint.config.mjs con la nueva API flat config de ESLint 9
```
**Esfuerzo:** XS (< 30 min)

---

### CON-MIGRATE-01 · Migración SQL no versionada con Supabase CLI
**Severidad:** ALTO  
**Ubicación:** `supabase_leads_table.sql` (raíz del proyecto)  
**Descripción:** El esquema de la base de datos existe solo como un archivo SQL manual en la raíz. No hay carpeta `supabase/migrations/`, no hay `supabase/config.toml`. Si se necesita recrear el entorno (staging, nuevo miembro del equipo, disaster recovery), el esquema se debe aplicar manualmente.  
**Impacto:** Riesgo de pérdida de datos o inconsistencias entre entornos. Imposible hacer rollback de cambios al schema.  
**Remediación:**
```bash
supabase init
mkdir -p supabase/migrations
mv supabase_leads_table.sql supabase/migrations/20260411000000_leads_table.sql
supabase link --project-ref <ref>
```
**Esfuerzo:** S (2 horas)

---

### UX-HARDCODED-01 · Colores hardcodeados en componentes en lugar de tokens del tema
**Severidad:** ALTO  
**Ubicación:** Todos los componentes `.tsx`  
**Descripción:** `globals.css` define tokens de diseño (`--color-primary: #0076FF`, `--color-deep: #0A1628`, etc.) pero en los componentes se usan los hex directamente: `bg-[#0076FF]`, `bg-[#0A1628]`, `text-[#666666]`. Si el cliente cambia la paleta, hay que editar decenas de archivos.  
**Evidencia:** `grep -rn '#0076FF\|#0A1628' src/components/ | wc -l` → múltiples ocurrencias.  
**Impacto:** Mantenibilidad. Un cambio de marca requiere búsqueda/reemplazo masivo en lugar de editar 3 tokens.  
**Remediación:** Usar `bg-primary`, `bg-deep`, `text-ink` como clases de Tailwind mapeadas a los custom properties del tema. Requiere configurar la extensión de Tailwind v4.  
**Esfuerzo:** M (4-8 horas para refactor de todos los componentes)

---

### WP-CONN-01 · Variable `WP_GRAPHQL_URL` no documentada ni en .env.example
**Severidad:** ALTO  
**Ubicación:** `src/lib/wordpress.ts:14` / `src/app/page.tsx:43`  
**Descripción:** La integración con WordPress usa `process.env.WP_GRAPHQL_URL` que no aparece en `.env.example`. En producción, si esta variable no está configurada en Vercel, la landing funciona (fallback implementado), pero el feature está silenciosamente inactivo sin alerta.  
**Impacto:** Si en el futuro se edita contenido en WordPress esperando que se refleje en la landing, no ocurrirá sin que sea obvio por qué.  
**Remediación:** Agregar a `.env.example`:
```bash
# WordPress GraphQL (opcional — si no se configura, se usan los textos por defecto)
WP_GRAPHQL_URL=https://cms.magiclean.mx/graphql
```
**Esfuerzo:** XS (15 min)

---

## 🟡 MEDIOS

---

### PERF-BUNDLE-01 · No se ha analizado el bundle con @next/bundle-analyzer
**Severidad:** MEDIO  
**Descripción:** Framer Motion v12 es una dependencia pesada. No se ha verificado si se importa completa o solo los módulos necesarios. El bundle analyzer no está instalado.  
**Remediación:** `npm install --save-dev @next/bundle-analyzer` y analizar las 10 dependencias más pesadas.  
**Esfuerzo:** XS (30 min análisis)

---

### UX-REDUCED-MOTION-01 · `prefers-reduced-motion` no respetado en animaciones
**Severidad:** MEDIO  
**Ubicación:** Todos los componentes con Framer Motion  
**Descripción:** Las animaciones de entrada (opacity: 0 → 1, y: 20 → 0) no tienen variante para usuarios con `prefers-reduced-motion: reduce`. Esto afecta a usuarios con epilepsia fotosensible o vértigo.  
**Remediación:**
```typescript
import { useReducedMotion } from 'framer-motion'
const shouldReduceMotion = useReducedMotion()
const variants = shouldReduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } }
```
**Esfuerzo:** S (2-4 horas para aplicar a todos los componentes)

---

### ART-SKELETON-01 · Sin estados skeleton/blur-up en slots de imagen
**Severidad:** MEDIO  
**Ubicación:** `src/components/ProductImageSlot.tsx` / todos los slots  
**Descripción:** El `ProductImageSlot` muestra un texto tipográfico como placeholder. Cuando se activen las fotos reales, no habrá transición blur-up ni skeleton. Causará un layout shift visual perceptible al cargar.  
**Remediación:** Agregar `placeholder="blur"` con `blurDataURL` en cada `next/image`, o implementar un skeleton con `@/components/ui/skeleton`.  
**Esfuerzo:** S (2-4 horas)

---

### CON-SUPABASE-SINGLETON-01 · Cliente Supabase re-creado en cada request
**Severidad:** MEDIO  
**Ubicación:** `src/app/api/contact/route.ts:6-10`  
**Descripción:** `getSupabase()` crea una nueva instancia de `createClient` en cada llamada al POST. Aunque es lazy (no en build time), en Vercel con alta concurrencia puede acumular conexiones.  
**Remediación:** Mover la instancia a módulo-level fuera del handler o usar el patrón singleton recomendado por Supabase.  
**Esfuerzo:** XS (15 min)

---

### SEO-DOMAIN-02 · JSON-LD con datos personales expuestos públicamente
**Severidad:** MEDIO  
**Ubicación:** `src/app/layout.tsx:76-103`  
**Descripción:** El JSON-LD incluye dirección física completa, teléfono y email. Esto es válido para LocalBusiness, pero debe ser confirmado con el cliente si estos datos son los correctos y aprobados para publicación.  
**Impacto:** Los datos quedan indexados por Google y scrapers de datos.  
**Remediación:** Confirmar con Jacobo que la dirección, teléfono y email son los datos oficiales aprobados.  
**Esfuerzo:** XS (confirmación)

---

### ERR-CONSOLE-01 · `console.error` en API route expone detalles de Supabase
**Severidad:** MEDIO  
**Ubicación:** `src/app/api/contact/route.ts:149`  
**Descripción:** `console.error('Supabase error:', dbError)` en producción imprime el objeto de error completo de Supabase en los logs de Vercel. Puede incluir información de la query o del esquema.  
**Remediación:** En producción, loguear solo un mensaje genérico o usar Sentry para capturar el error con contexto controlado.  
**Esfuerzo:** XS (15 min)

---

## 🟢 BAJOS

---

### PERF-DYNAMIC-01 · Framer Motion podría cargarse con dynamic import
**Severidad:** BAJO  
**Descripción:** Los componentes con animaciones solo-decorativas (BeneficiosClave, SocialProof, etc.) podrían usar `dynamic(() => import('framer-motion'), { ssr: false })` para sacar Framer Motion del bundle inicial y mejorar LCP.  
**Esfuerzo:** M (4-8 horas)
