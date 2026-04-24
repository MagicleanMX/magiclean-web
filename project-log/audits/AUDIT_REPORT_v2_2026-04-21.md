# Auditoría Total MagiClean Landing v2 — 2026-04-21

- **Repo auditado**: `/Users/jacobolevy/Desktop/magicclean`
- **Branch**: `feat/brand-identity` (working tree limpio)
- **Proyecto Vercel**: `magiclean-web` (`prj_SsbQqGvQcsDEPPcy7UM02Arh5tYB`)
- **Stack confirmado**: Next.js 16.2.3 (Turbopack) · React 19.2.4 · Tailwind 4 · TypeScript 5 · Sentry · Supabase · Upstash · Resend · Vercel Analytics + Speed Insights · framer-motion · lucide-react
- **Método**: 7 dimensiones obligatorias, chequeos ejecutados localmente en build de producción (`npm run build && npm start` en `localhost:3006`), Lighthouse desktop + mobile, Chrome headless para screenshots, lectura directa de los 28 archivos del prompt
- **Screenshots**: `audit-evidence/screenshots/` (desktop-fold, desktop-tall, desktop-all, mobile-fold, mobile-tall, mobile-all)

---

## Resumen ejecutivo

### 3 hallazgos más graves

1. **El catálogo tiene tres cuentas diferentes de cuántos SKUs existen, más una cuarta en el packaging físico**. El copy dice "23 modelos" en 5 lugares, el mega menú del Navbar enumera 22, `src/lib/products.ts` define 20, y la realidad del negocio son 24. No hay una sola fuente de verdad. **Gravedad**: alta, porque el distribuidor lo descubre comparando el sitio con el packaging y con el catálogo PDF; rompe credibilidad antes de que haga una pregunta.

2. **El botón de WhatsApp apunta a un número placeholder (+52 55 1234-5678)**. Cada click abre WhatsApp Web a un contacto inexistente. Evidencia: `src/components/WhatsAppButton.tsx:7` — `WHATSAPP_NUMBER = '5215512345678'`. El número real existe en el JSON-LD (`layout.tsx:81` → `+525571553635`) pero nunca llegó al componente. **Gravedad**: alta, bug activo en producción, pérdida directa de leads del canal que más usa un comprador B2B móvil.

3. **El CSP del sitio bloquea Sentry y el web worker de Replay en runtime real**. El `connect-src` de `next.config.ts:31` no incluye `*.sentry.io`; el browser rechaza todos los beacons (visto 3× por pageload en la consola de Lighthouse mobile). El sitio tiene Sentry instalado, configurado con PII redaction, con source maps subidos — y aun así **no captura errores de usuarios finales**. **Gravedad**: alta operacional, no de seguridad. La telemetría que se cree tener no existe.

### 3 oportunidades más grandes

1. **Cerrar la fotografía de producto**. De 24 SKUs, **solo F4 tiene imagen real**. El mega menú, las cards de familias, los heroes de M1/M2 — todos renderizan placeholders tipográficos ("imagen próximamente"). Sin fotos, el sitio es un catálogo de nombres. La inversión para un shooting de producto con fondo neutro + shot técnico por SKU es proporcionalmente pequeña y desbloquea el resto del contenido (fichas técnicas, casos de uso, cards).

2. **Convertir los trust signals de "escondidos en legales" a "visibles en home"**. Razón social, dirección de fábrica (Naucalpan), teléfono comercial, años en operación, marketplaces activos con logos reales: toda esa información existe en el repo pero hoy vive en `/aviso-de-privacidad` y en el JSON-LD que el usuario no ve. Un Footer ampliado + una sección "Empresa" con foto de fábrica cubriría esto.

3. **Consolidar identidad de marca (3 variantes activas) y dominio (2 en paralelo)**. Hoy conviven "MagicClean" (canon digital, 43 usos), "MagiClean" (canon de accesibilidad, 6 usos en alt/aria) y "Magiclean" (visible en la foto del F4). Los emails se reparten entre `magiclean.mx` (sender Resend) y `magicleanproducts.com` (público). Un usuario escribe a un email, recibe respuesta de otro dominio, ve un tercer nombre en el empaque. Estandarizar es barato y elimina un punto de fricción recurrente.

### Recomendación general

**El sitio no está listo para mostrar a un distribuidor real hoy**, pero la brecha no es técnica — es de **integridad de contenido y trust signals**. El código es sólido (TSC 0 errores, build limpio en 21s, RLS activo, validación fuerte en el endpoint de contacto, accesibilidad correcta en formularios y navegación, páginas legales bien redactadas conforme LFPDPPP). Los bugs técnicos reales son contables con la mano (WhatsApp fake, CSP bloqueando Sentry, 8 lint errors cosméticos, `ProductImageSlot` dead code, `NEXT_PUBLIC_SITE_URL` sin setear en prod).

Lo que no está listo es:
- La **historia de catálogo** (20 vs 22 vs 23 vs 24 SKUs; 1 de 24 con foto; sin fichas técnicas).
- La **capa B2B operacional** (sin descarga de PDF, sin FAQ, sin logística, sin página de distribuidores propia, sin mapa de cobertura, sin testimonios, sin certificación visible).
- La **coherencia de marca** (3 formas del nombre, 2 dominios).
- La **foto del producto y de la empresa** (fábrica, equipo) para pasar el test "¿esta empresa es real?".

No es un proyecto que requiera rehacer. Es un proyecto al que le falta **contenido validado y cerrar las inconsistencias**. La decisión para el dueño es si invertir en foto + catálogo técnico + consolidación de marca + eventos analytics (trabajo mayoritariamente NO de código) antes del deploy público, o aceptar una primera versión imperfecta y refinar con feedback de distribuidores reales bajo un NDA.

---

## Dimensión 1 — Seguridad

Seguridad del bundle Next.js: sólida. Los riesgos reales son **operacionales** (degradación silenciosa cuando falta config) más que de código.

### Tabla de hallazgos

| # | Issue | Severidad | Evidencia |
|---|---|---|---|
| S-01 | Rate-limit con degradación silenciosa — si faltan `KV_REST_API_URL`/`KV_REST_API_TOKEN` en runtime, el endpoint `/api/contact` acepta requests sin límite y loguea un `console.warn` | Alta | `src/lib/rate-limit.ts:32-35` (`if (!ratelimit) { console.warn(...); return null }`) + `src/app/api/contact/route.ts:104-105` (`if (rl && !rl.success)`) |
| S-02 | CSP permite `'unsafe-inline' 'unsafe-eval'` en `script-src` | Media | `next.config.ts:27`. Justificado parcialmente por Next.js/Turbopack. Aceptable mientras no haya sesiones autenticadas; bloqueante antes de pagos o login |
| S-03 | Regex anti-HTML débil en validación de inputs — bloquea `<` y `<script>` pero no entities, `javascript:` ni unicode | Media | `src/app/api/contact/route.ts:38` → `HTML_PATTERN = /<[^>]*>\|<script/i`. Supabase guarda el valor crudo; el escape sí se aplica antes de embeber en el HTML del email (`escapeHtml` líneas 41-48). Riesgo real bajo porque el único consumidor del valor crudo es el admin de Supabase |
| S-04 | `RESEND_API_KEY` faltante → el form **sigue aceptando leads** sin enviar emails; solo deja `Sentry.captureMessage("warning")` | Media | `src/app/api/contact/route.ts:161-165`. En un deploy mal configurado pueden pasar días sin que nadie note que no llegan emails |
| S-05 | `X-Frame-Options: SAMEORIGIN` (header) vs `frame-ancestors 'none'` (CSP) — contradictorio | Baja | `next.config.ts:17` vs `:32`. Browsers modernos respetan `frame-ancestors` (más estricto gana). Cosmético |
| S-06 | Policy RLS `service_role_only` es técnicamente redundante — service_role bypassea RLS por defecto en Supabase; lo que protege es la **ausencia** de políticas para `anon`/`authenticated` | Informativa | `supabase/migrations/20260411000000_leads_table.sql:26-32` |
| S-07 | Archivos fuente de branding se sirven públicamente en `/images/brand/_source/*.source.png` (800KB+ de PNGs originales) | Baja | `ls public/images/brand/_source/` → 3 PNGs sin referencias en `src/` |
| S-08 | `.vercel/project.json` gitignored correctamente pero queda en el filesystem de dev con el `VERCEL_OIDC_TOKEN` en `.env.local` (short-lived, auto-rotado) | Informativa | `.gitignore:19` ✓ |
| S-09 | `magiclean-theme/` (WordPress PHP) convive en el filesystem con lógica duplicada de contact→Supabase→Resend vía `curl_post` | Informativa (security baja, arquitectural alta) | `magiclean-theme/inc/form-handler.php`. `.gitignore:22` excluye del repo y del deploy |
| S-10 | CSP no permite Sentry ni Vercel Analytics en `connect-src` pero el código los carga | **Alta** (confirmado runtime en Dim 3) | `next.config.ts:31` → `connect-src 'self' https://*.supabase.co https://api.resend.com`. Los beacons van a `*.sentry.io` y `vitals.vercel-insights.com` — bloqueados |

### Lo que está bien (confirmado)

- `npm audit --audit-level=low` → **0 vulnerabilidades** en 652 dependencias
- **Git history limpia de secretos**: `git log -S` sobre `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `SENTRY_AUTH_TOKEN`, `KV_REST_API_TOKEN` solo encuentra placeholders en `.env.example` y nombres de variables en código
- `.env.local` y `.env.sentry-build-plugin` **NO tracked** en git; solo `.env.example` con placeholders obvios
- Validación fuerte en `/api/contact`: límites de longitud por campo, whitelist `canal` (Set de 6 valores), regex de email y teléfono, honeypot `website`, escape HTML antes de emails
- Rate limit real cuando Redis está disponible: Upstash sliding window 10 req/hora/IP, headers `Retry-After` y `X-RateLimit-*` en la respuesta 429
- Supabase RLS activo en `leads`
- Service role key solo server-side (referencia única en `src/app/api/contact/route.ts:11`)
- Headers completos: HSTS+preload, `X-Content-Type-Options: nosniff`, CSP con `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy (bloquea cámara/mic/geo/interest-cohort), COOP y CORP en `same-origin`
- No hay rutas protegidas (superficie de ataque mínima: `/`, `/aviso-de-privacidad`, `/terminos-de-uso`, `/api/contact`)
- `robots.ts` y `sitemap.ts` exponen solo rutas públicas intencionales
- `public/` sin archivos sensibles (.sql, .env*, .pem, .key, .bak, archivos de diseño)

---

## Dimensión 2 — Arquitectura

### Diagrama

```
                                    ┌──────────────────────────────────────┐
                                    │  VERCEL (magiclean-web)              │
                                    │  - Git integration (sin .github/CI)  │
                                    │  - Sentry source maps via auth token │
                                    │  - Upstash KV (vars auto-inyectadas) │
                                    └────────────────┬─────────────────────┘
                                                     │
┌──────────────┐       ┌──────────────────┐          │        ┌──────────────────┐
│ WordPress    │       │ Next.js 16 App   │◄─────────┘        │ Supabase         │
│ headless     │◄──┐   │ (Turbopack, RSC) │                   │ (leads, RLS)     │
│ (WPGraphQL)  │   │   │                  ├──► Resend API ◄───┤                  │
│ [OPCIONAL —  │   │   │  src/app/*       │                   └──────────────────┘
│  bypass si   │   │   │  src/components/*│
│  no hay env] │   │   │  src/lib/*       │                   ┌──────────────────┐
└──────────────┘   └───┤                  ├──► Upstash Redis  │ Sentry           │
                       │                  │    (rate limit)   │ (errors/replays) │
                       └────────┬─────────┘                   │  BLOQUEADO POR   │
                                │                             │  CSP EN RUNTIME  │
                                └───► magiclean-theme/        └──────────────────┘
                                      [PHP, gitignored,
                                       fuera del deploy]
```

### Tabla de hallazgos

| # | Issue | Severidad | Evidencia |
|---|---|---|---|
| A-01 | No hay tests — ni unit, ni integration, ni e2e. No hay framework instalado | Alta | `package.json` scripts = `dev, build, start, lint`. `find . -name '*.test.*'` → 0 archivos |
| A-02 | No hay CI — sin `.github/workflows/`, sin `vercel.json`. Lint y tsc no corren en PR | Alta | `ls .github` → No such file or directory |
| A-03 | **Inconsistencia de catálogo**: 20 SKUs en `products.ts`, 22 en Navbar, "23 modelos" en copy, 24 real | Alta | `src/lib/products.ts:121-206` FAMILIAS contiene 20 SKUs. Copy "23 modelos" en `src/app/layout.tsx:27`, `src/components/Hero.tsx:11`, `src/components/Navbar.tsx:357`, `src/lib/products.ts:110`. Navbar mega menú `:8-54` lista 22. Faltan M8, M10 en FAMILIAS (presentes en Navbar) |
| A-04 | **WordPress integration parcial + dead types**: tipos/queries para `homeAbout`, `WPFooter`, `siteSettings` definidos pero nunca consumidos. `HOME_QUERY` grande comentada | Media | `src/lib/wordpress.ts:116-204` (tipos) + `:422-493` (query comentada). 4 funciones consumidas en `page.tsx`: `getWPSettings`, `getHeroSection`, `getCategoriesSection`, `getDistribuidoresSection` |
| A-05 | **Turbopack NFT warning** — `next.config.ts` queda en el trace de la función por el `dataUrl()` de `opengraph-image.tsx` | Media | Build log: "Turbopack build encountered 1 warnings: ./next.config.ts / Encountered unexpected file in NFT list" |
| A-06 | `NEXT_PUBLIC_SITE_URL` no seteada — genera 6× warning en build y el sitio cae al fallback `https://magiclean-web.vercel.app` en robots, sitemap, canonical, OG | Media | `[config] NEXT_PUBLIC_SITE_URL not set in production. Using Vercel subdomain fallback.` × 6 en build log. Definido en `.env.example:24`, ausente en `.env.local` |
| A-07 | Sentry DSN hardcoded en 3 archivos (en lugar de env var) | Baja | `sentry.server.config.ts:8`, `sentry.edge.config.ts:9`, `src/instrumentation-client.ts:8`. DSNs no son secretos pero bloquea multi-project por entorno |
| A-08 | 8 lint errors + 3 warnings — no bloquean build porque `next build` no corre `next lint` por default | Baja | `react-hooks/set-state-in-effect` × 4, `react/no-unescaped-entities` × 4, `@next/next/no-html-link-for-pages` × 1 |
| A-09 | `"` sin escapar en JSX produce errors de lint | Baja | `aviso-de-privacidad/page.tsx:46`, `ProductHeroF4.tsx:94` |
| A-10 | `magiclean-theme/` duplica lógica de contact→Supabase→Resend en PHP + templates de hero/neoshield/distribuidores | Media (arquitectural) | `.gitignore:22` excluye del deploy. Dos intenciones compitiendo: "WP como CMS headless" vs "WP como sitio independiente" |
| A-11 | 1 TODO en código de producción | Informativa | `src/components/SocialProof.tsx:66` → `{/* TODO: Agregar testimonios de distribuidores reales */}` |
| A-12 | `console.*` solo en paths server-side de error/warn (7 ocurrencias, todas justificadas) | Bien | `rate-limit.ts:33`, `config.ts:6`, `wordpress.ts:267/306/353/404`, `api/contact/route.ts:152/162/251/301/307` |

### Rutas y API (post-build)

```
○ /                         Static   ← single-page landing
○ /_not-found               Static
ƒ /api/contact              Dynamic  ← única API, POST con Supabase + Resend + rate-limit
○ /apple-icon.png           Static
○ /aviso-de-privacidad      Static
○ /icon.png                 Static
○ /opengraph-image          Static
○ /robots.txt               Static
○ /sitemap.xml              Static
○ /terminos-de-uso          Static
```

10 estáticas, 1 dinámica. Sin `middleware.ts`. Naming en español consistente. Build limpio en **21 segundos** (7.4s compile + 3.7s TS + 1s static gen).

### Data layer

| Fuente | Consumo | Estado |
|---|---|---|
| `src/lib/products.ts` (20 SKUs + constantes marketing) | Import directo en componentes | Hardcoded y desactualizado vs realidad |
| `src/lib/wordpress.ts` (WPGraphQL) | `page.tsx:48-53` con `WP_CONNECTED` flag | Opcional; sin endpoint conectado hoy; fallback a null |
| `supabase.leads` | `src/app/api/contact/route.ts:137-149` | Funcional, RLS activo |
| Upstash Redis | `src/lib/rate-limit.ts` | Funcional condicional (ver S-01) |

### Bundle / build

- `.next/` total: **35 MB** · `.next/static/`: **1.7 MB**
- Top 5 chunks cliente (bytes raw):

| Chunk | Bytes | Probable contenido |
|---|---:|---|
| `0y_b361nigf-r.js` | 536 KB | framer-motion + Sentry replay + React runtime |
| `05yb_k3wb~0oa.js` | 186 KB | Sentry SDK (browser) |
| `0t.hkrpu7~eg1.js` | 149 KB | Supabase client + transversales |
| `03~yq9q893hmn.js` | 113 KB | App shell + lucide icons |
| `04ye_qk5k6smn.js` | 56 KB | Rutas legales / OG |

### Dependencias (`npx depcheck`)

- Missing: 0. Unused reportadas: `@eslint/eslintrc`, `@tailwindcss/postcss`, `@types/react-dom`, `tailwindcss` — **falsos positivos**, las 4 se usan vía `eslint.config.mjs`/`postcss.config.mjs`/tipado.
- Prod deps activas (12): `@sentry/nextjs`, `@supabase/supabase-js`, `@upstash/ratelimit`, `@upstash/redis`, `@vercel/analytics`, `@vercel/speed-insights`, `framer-motion`, `lucide-react`, `next`, `react`, `react-dom`, `resend`.

### Separación de concerns

- Server Components (sin `'use client'`): `page.tsx`, `layout.tsx`, páginas legales, `Footer.tsx`, error boundaries, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`
- Client Components (`'use client'`): 19 de 20 componentes
- Data fetching: aislado a Server Components (`page.tsx` hace `await` de WP en paralelo con `Promise.all`)
- Business logic: aislada a `src/lib/` y `src/app/api/`
- No encontré mezclas problemáticas

### Observabilidad

| Tooling | Instalado | Configurado | Nota |
|---|---|---|---|
| Sentry errors | ✓ | ✓ pero **bloqueado por CSP en runtime** (Dim 3 P-05) | Replay 10% sesión, 100% sesión-con-error. PII=false. `beforeSend` redacta `request.data`. **DSN hardcoded** |
| Vercel Analytics | ✓ | ✓ dentro de `ConsentAwareAnalytics` | Consent gating correcto (solo monta si consent === 'all') |
| Vercel Speed Insights | ✓ | ✓ | Montado en `layout.tsx` — **falla por MIME en runtime local** |
| Tests | — | — | Ningún framework |
| CI | — | — | Sin `.github/workflows` |

---

## Dimensión 3 — Performance

### Scores Lighthouse (build de producción, `localhost:3006`)

| Métrica | Desktop | Mobile | Target | Estado |
|---|---:|---:|---:|---|
| **Performance** | 79 | **59** | ≥90 | ❌ mobile |
| **Accessibility** | 97 | 97 | 100 | ⚠️ 15 fails de contrast |
| **Best Practices** | 92 | 92 | 100 | ❌ 7 errores en console |
| **SEO** | 100 | 100 | 100 | ✓ |
| LCP | 1.1 s | **5.4 s** | ≤2.5 s | ❌ mobile crítico |
| CLS | 0 | 0 | ≤0.1 | ✓ |
| FCP | 0.3 s | 1.0 s | ≤1.8 s | ✓ |
| Speed Index | 1.1 s | 2.4 s | ≤3.4 s | ✓ |
| TBT | 420 ms | **930 ms** | ≤200 ms | ❌ |
| TTI | 1.1 s | 5.5 s | ≤3.8 s | ❌ mobile |

### Tabla de hallazgos

| # | Id | Ahorro / Impacto | Evidencia |
|---|---|---|---|
| P-01 | `unused-javascript` | **101 KiB** no ejecutado en primera pantalla | Chunk `0y_b361nigf-r.js` (168 KB transfer / 536 KB raw) concentra la mayor parte |
| P-02 | `mainthread-work-breakdown` | **2.4 s** en mobile throttled | `scriptEvaluation=868ms` + `other=1002ms` (framer-motion y Sentry) |
| P-03 | `errors-in-console` (Best Practices 92) | — | 9 errores totales, 7 críticos (ver P-05/06/07) |
| P-04 | `valid-source-maps` | — | Sentry sube source maps en build via plugin, pero el audit de Lighthouse falla. En Vercel prod con token configurado debería desaparecer |
| **P-05** | **CSP bloquea Sentry en producción** — `connect-src` no incluye `*.sentry.io` | **Alta** | Console errors ×3: `Connecting to 'https://o4511248313352192.ingest.us.sentry.io/api/.../envelope/...' violates the following Content Security Policy directive`. Sentry efectivamente muerto |
| **P-06** | **CSP bloquea el web worker de Sentry Replay** — falta `worker-src`/`blob:` | **Alta** | `Creating a worker from 'blob:http://localhost:3006/...' violates the following Content Security Policy directive: "script-src 'self' 'unsafe-inline' 'unsafe-eval'"` |
| P-07 | **Vercel Speed Insights script falla** en dev/local por MIME mismatch | Media | `Refused to execute script from 'http://localhost:3006/_vercel/speed-insights/script.js' because its MIME type ('text/html') is not executable`. Verificar si también ocurre en Vercel prod |
| P-08 | 1 request 404 en el pageload | Media | `network-requests` audit. URL exacta requiere DevTools abierto |
| P-09 | **15 fallas de contraste AA** — `text-white/40` en sección dark y `#0076FF`/`#8B92A0` en claro | **Alta (a11y)** | Selectores en `Hero.tsx:51`, `Footer.tsx:110,114,120,141,171`, `NeoShield.tsx:71,116`, etc. |

### Network waterfall (top 10 mobile)

| Bytes | Tipo | URL | Observación |
|---:|---|---|---|
| 168 710 | Script | `/_next/static/chunks/0y_b361nigf-r.js` | 536 KB raw — framer-motion + Sentry |
| 66 585 | Image | `/_next/image?url=%2Fimages%2Fbrand%2Flogo%2Fmagiclean-logo.webp&w=3840&q=75` | Logo pedido a **w=3840** para render ~40px — `sizes` no acotado |
| 57 190 | Script | Sentry SDK browser | |
| 54 122 | Other | `/icon.png?icon.0lsi709ionm~n.png` | Nombre con query string sospechoso |
| 41 426 | Script | Supabase + transversales | |
| 39 877 | Font | Playfair Display | |
| 39 449 | Font | Montserrat | |
| 36 497 | Font | Montserrat | |
| 20 972 | Document | `/` | |
| 20 063 | Script | Chunk secundario | |

**Resumen**: 27 requests, 640 KB total (340 KB JS / 113 KB fuentes / 87 KB imágenes / 10 KB CSS / 20 KB HTML).

### Imágenes

| Archivo | Bytes | Usado en LIVE site |
|---|---:|---|
| `products/F4.jpg` | 2 215 985 | ❌ no referenciado en `src/` |
| `hero/hero-kitchen.png` | 1 853 259 | ❌ (solo `.webp` se usa) |
| `brand/logo/magiclean-logo.png` | 1 174 443 | ❌ excepto en `opengraph-image.tsx:15` (build-time) |
| `brand/neoshield/neoshield-badge.png` | 665 774 | ❌ |
| `brand/isotipo/magiclean-mc.png` | 535 675 | ❌ |
| `brand/_source/*.source.png` | 801 703 | ❌ no deberían estar en `public/` |
| `products/F4.webp` | 185 464 | ✓ `ProductHeroF4.tsx:34` |
| `brand/logo/magiclean-logo.webp` | 148 844 | ✓ Navbar + Footer |
| `brand/neoshield/neoshield-badge.webp` | 97 420 | ❌ (el SVG inline reemplaza al raster — ver Dim 4) |
| `brand/isotipo/magiclean-mc.webp` | 58 336 | ✓ StickyCtaBar |
| `hero/hero-kitchen.webp` | 52 816 | ✓ Hero |
| `logo.svg` | 692 | ✓ JSON-LD Organization logo |

Todas las imágenes live usan `next/image` (AVIF/WebP dinámico, lazy por default). Los PNGs sin uso en `public/` suman ~**7 MB** de URLs públicas no referenciadas.

### Fuentes

- `next/font/google`: Montserrat (7 weights 300-900) + Playfair Display (4 weights × 2 styles = 8 variantes) = **15 variantes declaradas**
- `display: 'swap'` en ambas ✓
- Solo 3 `.woff2` descargados (115 KB) por subsetting automático de Next
- Sobredeclaración: el sitio visible usa ~3-4 pesos
- Sin `preload` explícito para la fuente del hero → contribuye al LCP mobile

### Terceros

Lighthouse reporta 0 bytes de terceros como artefacto del bloqueo CSP (P-05) y MIME fail (P-07). En prod real con CSP corregido se añaden ~40-60 KB Sentry + ~10-15 KB Analytics.

---

## Dimensión 4 — Gráficos y arte

### 4.1 Sistema de color

**Tokens declarados** (`src/app/globals.css:4-12`):

```
--color-primary:       #0076FF   (azul marca)
--color-primary-dark:  #0052CC
--color-accent:        #FF2B2B   (rojo marca)
--color-deep:          #0A1628   (navy dark sections)
--color-ink:           #1A1A1A
--color-surface:       #F5F7FA
--color-border:        #E8EAED
```

**Hex inline fuera de tokens**: 301 ocurrencias de `bg-[#...]`/`text-[#...]` en 28 archivos. Los tokens son declarativos, no obligatorios. Colores accent por familia (`#2D7A2D, #B45309, #6D28D9, #ADB3BA`) en `products.ts:132,147,161,175,189,203` — no tokenizados.

**Comparación con empaque físico**: tokens `#FF2B2B` (rojo) y `#0076FF` (azul) son plausibles para el bicolor del empaque MagiClean; exactitud frente al impreso CMYK requiere muestra física + ColorChecker.

### 4.2 Tipografía

| Familia | Uso | Variantes |
|---|---|---:|
| Montserrat | Body, eyebrows, nav, CTAs | 7 weights (300-900) |
| Playfair Display | Headlines editoriales | 4 weights × 2 styles = 8 |

Total: **15 variantes declaradas**; solo 3 `.woff2` descargados por subsetting.

Jerarquía: `.label-eyebrow` (0.68rem, 700, 0.20em tracking, uppercase) → `.headline-editorial` (Playfair 400, -0.03em, line 1.05) → body Montserrat default.

**Match con referencias B2B** (Ecolab/Diversey/3M/Rubbermaid): todos usan solo sans, 2-3 pesos. El pairing Sans + Serif editorial es **más Apple/Rolex que B2B**. Decisión estética defendible pero discutible para el target declarado.

### 4.3 Logo

Visible en `desktop-fold.png` y `mobile-fold.png`: wordmark "MagiClean" con "Magi" rojo + "Clean" azul sobre un óvalo/halo blanco. Asset raster (`magiclean-logo.webp` 149 KB) — no SVG vectorial.

**Inconsistencia visible en la hero image**: la etiqueta del producto F4 fotografiado lee claramente **"Magiclean"** (una palabra, lowercase después de "Magi"), mientras el chrome del sitio dice **"MagiClean"** (camelCase). Tres variantes activas en el repo:

| Forma | Dónde | |
|---|---|---|
| `MagiClean` | Navbar `aria-label` y `alt`, Footer, StickyCtaBar, opengraph-image (atributos a11y) | 6 usos |
| `MagicClean` | Todo el copy visible, razón social, metadata, emails, legales | 43 usos |
| `Magiclean` | Etiqueta impresa del F4 en la foto | visible en hero |
| `magiclean` | URLs técnicas | dominios |

### 4.4 NeoShield

- `src/components/NeoShieldMark.tsx` define `ShieldIcon` (SVG 24×24 genérico) y `NeoShieldBadge` (pill con el icono + "NeoShield™" Playfair serif).
- El asset raster `public/images/brand/neoshield/neoshield-badge.{png,webp}` (650 KB / 97 KB) **no se renderiza en ningún componente vivo** (0 matches en `src/` con grep). Solo aparece en `scripts/brand-processing.py` y `opengraph-image.tsx` (build-time).
- El path SVG inline es un escudo genérico de UI-kit: `<path d="M12 2L3.5 6.5V12c0..."/>` — sin gotas, sin patrón, sin identidad propia.

### 4.5 Iconografía

Library única: **lucide-react**. Estilo outline / 1.5 stroke weight, consistente. Uso (12 archivos):

| Icono | Consumidores |
|---|---|
| `ArrowRight` | 9 |
| `X` | 2 (Navbar, WhatsAppButton) |
| `Menu`, `ChevronDown` | 1 (Navbar) |
| `MapPin` | 1 |
| `CheckCircle, Loader2` | 1 (ContactForm) |
| `Zap, Shield, Leaf` | 1 (BeneficiosClave — 3 pilares) |
| `TrendingDown, ShieldOff, Layers` | 1 (ElProblema — 3 problemas) |

Sin iconos custom mezclados. ✓

### 4.6 Fotografía

| Archivo | Uso | Calidad / observación |
|---|---|---|
| `hero/hero-kitchen.webp` | Hero bg | Kitchen interior marble, neutra, premium. Ambiental |
| `products/F4.webp` | ProductHeroF4 | Producto aislado con fondo claro. **Etiqueta "Magiclean" legible; perspectiva distorsionada, producto oversized** |
| `brand/logo/magiclean-logo.webp` | Navbar, Footer | Bitmap; halo/oval rasterizado; borroso en pequeño |
| `brand/isotipo/magiclean-mc.webp` | StickyCtaBar | No visible en fold |

**22 SKUs sin foto**: F1-F3, F5-F9 (8 fibras), M1-M10 + M16-M18 (13 mops/accesorios, 2 de ellos ni siquiera en `products.ts`).

Estilo: consumer premium (tipo Apple product hero), no technical B2B catalog (tipo Diversey/Ecolab shots frontales con specs).

### 4.7 Espaciado

Solo 2 utilidades declaradas (`globals.css:53-55`):
```
.section-standard { padding: 5rem 0; }   /* 80px */
.section-premium  { padding: 6rem 0; }   /* 96px */
```
Todo lo demás viene de Tailwind default. Uso mixto: `py-3, py-3.5, py-7, py-12, py-16` — sin escala tokenizada.

### Tabla resumen

| Elemento | Estado actual | Referencia | Severidad |
|---|---|---|---|
| Color primary/accent tokens | Declarados | Empaque bicolor rojo+azul | Baja |
| Hex inline fuera de tokens | 301 ocurrencias | Tokens como SoT | Media |
| Contraste hero `#8B92A0` | Falla AA | ≥4.5:1 | Alta (a11y) |
| Tipografía 15 variantes | Declarada, swap, subset | B2B ref: solo sans, 2-3 pesos | Media |
| Logo raster con halo | Bitmap 149 KB | Wordmarks flat de ref B2B | Media |
| Nombre en producto vs UI | "Magiclean" vs "MagiClean" | — | **Alta (credibilidad)** |
| NeoShield badge raster vs SVG | Raster sin usar; SVG genérico | Badge reconocible propio | Media |
| Iconografía lucide | Consistente | Cualquier DS | Bien |
| Fotografía producto | 1 de 24 SKUs | Catálogo B2B completo | **Alta** |
| Fotografía hero | Kitchen stock-style | Fábrica / producto en uso profesional | Media |
| Sistema de espaciado | 2 tokens + Tailwind default | Escala explícita 4/8/12/16/24/32/48 | Baja |

---

## Dimensión 5 — Código y componentes

28 archivos, **3 903 LOC** total.

| # | Archivo | LOC | Estado | Issue principal |
|---|---|---:|---|---|
| 1 | `app/layout.tsx` | 117 | ✅ | Email JSON-LD difiere del Footer y del `.env.example`. "MagicClean S.A. de C.V." en legalName vs "MagiClean" en metadata title |
| 2 | `app/page.tsx` | 95 | ✅ | Composición limpia. WP fetch con `Promise.all` + `WP_CONNECTED` flag |
| 3 | `app/opengraph-image.tsx` | 64 | ✅ | `fontFamily: 'system-ui'` (no usa Playfair/Montserrat). Causa el warning NFT de Turbopack (A-05) |
| 4 | `app/api/contact/route.ts` | 313 | ✅ | Email template de 62 líneas inline (debería moverse) |
| 5 | `components/Navbar.tsx` | 441 | ✅ | Mega menú con **22 SKUs hardcoded** que contradicen `products.ts`; "23 modelos" en footer del mega (línea 357); a11y fuerte |
| 6 | `components/Footer.tsx` | 184 | ✅ | Email `contacto@magicleanproducts.com` (4ª variante distinta); SVGs de redes inline en lugar de lucide; contraste `text-white/40` falla AA |
| 7 | `components/Hero.tsx` | 119 | ✅ | FALLBACK con "23 modelos"; `#8B92A0` microtext falla AA |
| 8 | `components/ContactForm.tsx` | 307 | ✅ | a11y fuerte (`label htmlFor`, `aria-required`, honeypot `aria-hidden`); falta RFC, volumen, tipo de cuenta |
| 9 | `components/DistribuidoresCTA.tsx` | 92 | ✅ | Zonas hardcoded; "+ 24 zonas más" sin fuente |
| 10 | `components/Categories.tsx` | 180 | ✅ | **SLOT DE IMAGEN comentado** (:73-80); ninguna card tiene foto real; fallback tipográfico elegante |
| 11 | `components/ProductHeroF4.tsx` | 135 | ✅ | lint error: `"` sin escapar × 2 (línea 94) |
| 12 | `components/ProductHeroMop.tsx` | 190 | ⚠️ | M1 y M2 con "imagen próximamente"; specs duplicadas fuera de `products.ts` |
| 13 | `components/ProductImageSlot.tsx` | 47 | ❌ **DEAD CODE** | **0 imports en todo el repo**. Categories y ProductHeroMop duplican su lógica inline |
| 14 | `components/NeoShield.tsx` | 125 | ✅ | Counter animado bien hecho. Imagen microscopía = placeholder |
| 15 | `components/NeoShieldMark.tsx` | 39 | ✅ | Símbolo genérico, no mark de marca |
| 16 | `components/SocialProof.tsx` | 86 | ⚠️ | **TODO en línea 66**: testimonios ausentes. Logos de marketplaces como strings, no visuales |
| 17 | `components/StickyCtaBar.tsx` | 79 | ✅ | IntersectionObserver bien implementado |
| 18 | `components/BeneficiosClave.tsx` | 70 | ✅ | — |
| 19 | `components/ElProblema.tsx` | 57 | ✅ | Colores `#FFF0F0`/`#FF2B2B` inline no tokenizados |
| 20 | `components/HowItWorks.tsx` | 60 | ✅ | — |
| 21 | `components/Nosotros.tsx` | 146 | ⚠️ | **Banner corporativo = placeholder** (línea 41); marketplaces como texto; stats arbitrarios (3/23/3/5+) sin año de fundación |
| 22 | `components/WhatsAppButton.tsx` | 106 | 🔴 | **`WHATSAPP_NUMBER = '5215512345678'`** — placeholder fake, bug activo |
| 23 | `components/CookieBanner.tsx` | 66 | ✅ | Oculta primary CTA en mobile 390×844 (Dim 4) |
| 24 | `components/ConsentAwareAnalytics.tsx` | 36 | ✅ | Pattern elegante de evento custom entre banner y analytics |
| 25 | `lib/config.ts` | 12 | ✅ | Genera 6× warning en build por `NEXT_PUBLIC_SITE_URL` faltante |
| 26 | `lib/products.ts` | 206 | ⚠️ | **20 SKUs** vs 22 (Navbar) vs 23 (copy) vs 24 (real) |
| 27 | `lib/rate-limit.ts` | 38 | ✅ | Degradación silenciosa (S-01) |
| 28 | `lib/wordpress.ts` | 493 | ⚠️ | Dead types (A-04) |

### Hallazgos destacados

- **C-01 🔴 WhatsApp fake**: `WhatsAppButton.tsx:7` → `'5215512345678'` (+52 55 1234-5678). Cada click lleva a un chat inexistente. Real: `+525571553635` en `layout.tsx:81`.
- **C-02 🔴 4 variantes de email en 2 dominios distintos**:
  - `datos@magicleanproducts.com` (JSON-LD + legales)
  - `contacto@magicleanproducts.com` (Footer UI)
  - `noreply@magiclean.mx` (Resend sender notify)
  - `hola@magiclean.mx` (Resend sender confirm + `.env.example` default)
- **C-03 🔴 Catálogo con 3 cuentas** (20/22/23) vs realidad (24).
- **C-04 🟡 ProductImageSlot.tsx dead code** — componente reutilizable preparado pero nunca importado.
- **C-05 🟡 Footer con 4 SVGs de redes inline** (Facebook/Instagram/LinkedIn/TikTok) en lugar de lucide.
- **C-06 🟡 8 CTAs "Solicitar cotización" idénticos** apuntando al mismo `#contacto`.
- **C-07 🟡 "+ 24 zonas más"** y `3-5/5-8 días hábiles` hardcoded en `DistribuidoresCTA.tsx` sin fuente verificable.
- **C-08 🟡 Handles sociales `@magiclean` no verificados** — pueden ser perfiles ajenos.

---

## Dimensión 6 — Contenido y mensaje

### Headlines / subheadlines (transcripción exacta)

| Sección | Headline | Subheadline |
|---|---|---|
| Hero | "Fibras que duran. Tecnología que protege." | "23 modelos con NeoShield™ — la única tecnología antibacterial certificada para el canal profesional en México. Más duración. Cero contaminación cruzada. Un solo proveedor." |
| ElProblema | "Tu proveedor actual te está costando más de lo que crees." | — |
| NeoShield | "NeoShield™" + shield icon | "Desarrollada en laboratorio después de 3 años de investigación, NeoShield™ es la tecnología de fibra más avanzada del mercado mexicano. Elimina el 99% de las bacterias sin productos químicos adicionales." |
| BeneficiosClave | "Tecnología que se demuestra. Beneficios que se miden." | NeoShieldBadge |
| Categories | "Un portafolio completo. Un solo proveedor." | "Fibras, sistemas mop y accesorios — todo con NeoShield™…" |
| ProductHeroF4 | "Dos superficies. *Un estándar.*" | "Fibra abrasiva de alta resistencia por un lado, esponja suave por el otro. Un producto. Dos herramientas." |
| ProductHeroMop | "Piso impecable. Sin esfuerzo. *Sin químicos adicionales.*" | "Dos sistemas con microfibra NeoShield™…" |
| SocialProof | "Donde ya estamos. Y a dónde vamos." | — |
| HowItWorks | "Simple y transparente" | — |
| DistribuidoresCTA | "Conviértete en distribuidor MagicClean" | "Márgenes competitivos…" |
| Nosotros | "El estándar que faltaba. *Lo estamos construyendo.*" | "MagicClean nació con una idea simple…" |
| ContactForm | "Tu operación merece una solución diseñada para ella." | "No tenemos catálogos genéricos…" |

**Veredicto**: estilo editorial aspiracional (frases cortas, cursivas para énfasis). Bien escrito pero **consistentemente emocional**, no técnico. Alineado con Apple/Rolex, no con Ecolab/Diversey.

### CTAs

- **8 CTAs primarios "Solicitar cotización"** todos apuntan a `#contacto` (Hero, Navbar desktop+mobile, StickyCtaBar, ProductHeroMop, HowItWorks, Nosotros, ContactForm submit, WhatsApp).
- Variaciones: "Solicitar muestra" (ProductHeroF4 → mismo form), "Quiero ser distribuidor" (DistribuidoresCTA, segmentado con `?canal=distribuidor`), "Únete a la red" (SocialProof → `#distribuidores`), "Ver familia" (Categories hover).
- **"Solicitar catálogo completo →"** en Navbar engaña: no descarga, lleva al form.
- **"Ver portafolio completo"** aparece 2 veces con destinos distintos (Hero → `#productos`, Categories → `#contacto`).

### Copy de producto / specs

| Producto | Copy actual | Falta |
|---|---|---|
| F1-F3 | Navbar detail: "220×140mm · Limpieza pesada", "150×140mm", "135×82mm" | Composición, UPC, abrasividad numérica, presentación, peso |
| F4 | Hero dedicado + 3 métricas ("3× durabilidad / Dual / 0 contaminación") + quote | UPC, composición, dimensiones, presentación |
| F5-F9 | Una línea de detalle cada uno | Todo |
| M1-M2 | Hero con 3 specs ("Cubo con pedal…") | Dimensiones, peso, capacidad, MOQ, caja master |
| M5, M6, M9 | Solo chip con nombre | Todo |
| M4, M10 (baño) | 1 línea | Todo |
| M3, M7, M8, M16-M18 | 1 línea | Todo |

### Trust signals

| Señal | Presente | Dónde |
|---|---|---|
| Razón social | ✓ | Footer + JSON-LD + legales |
| Dirección física | ⚠️ solo en legales/JSON-LD | **NO visible en home** |
| Teléfono | ⚠️ solo en legales | 1 solo número (prompt mencionaba 2) |
| Email | 🔴 4 direcciones / 2 dominios | (ver C-02) |
| Años de operación | ⚠️ "3 años de crecimiento" sin año fundación | Hero stats |
| Marketplaces activos | ✓ como texto | No como logos verificables |
| Capacidad productiva | ❌ | — |
| Logos clientes | ❌ | — |
| Testimonios | ❌ TODO | `SocialProof.tsx:66` |
| Certificaciones | ❌ | "Validado por laboratorio certificado independiente" sin nombre |
| Redes sociales | ⚠️ `@magiclean` no verificadas | — |
| Google Maps | ❌ | — |

### Lorem ipsum / placeholders

- `grep -i "lorem|ipsum|dolor sit|consectetur"` → **0 matches reales** ✓
- **~10 placeholders visuales** en UI ("imagen próximamente", "Fotografía corporativa próximamente", "Microscopía NeoShield™")
- 1 TODO en `SocialProof.tsx:66`

### Typos y ortografía

| Palabra | Con tilde | Sin tilde | |
|---|---:|---:|---|
| protección | ✓ | 0 | OK |
| tecnología | ✓ | 3 (solo en `href="#tecnologia"` — anchor URL-safe) | OK |
| ergonomía | 0 | 0 | n/a |
| análisis | ✓ | 0 | OK |
| química | ✓ | 0 | OK |

✓ Ortografía correcta.

### Inconsistencia de nombre

(Resumido de Dim 4) 3 formas activas: **MagicClean** (43 usos, copy dominante), **MagiClean** (6 usos, a11y), **Magiclean** (visible en foto del F4).

### Inconsistencia de dominio

| Dominio | Uso |
|---|---|
| `magiclean.mx` | Resend sender (`noreply@`, `hola@`), fallback esperado de `NEXT_PUBLIC_SITE_URL` |
| `magicleanproducts.com` | Emails públicos (`datos@`, `contacto@`), URL canónica en `terminos-de-uso:29` |

**Problema SPF/DKIM potencial**: Resend envía `from: noreply@magiclean.mx`; los usuarios responden a `@magicleanproducts.com`. Si los DNS no están alineados para ambos, emails caen a spam o conversaciones quedan en dominio sin monitoreo.

### Páginas legales y de error

| Página | Estado |
|---|---|
| `/aviso-de-privacidad` | ✅ 7 secciones conforme LFPDPPP, 13 abril 2025, transferencias a Supabase/Vercel documentadas |
| `/terminos-de-uso` | ✅ 9 secciones, jurisdicción CDMX/Edo. México, NeoShield™ mencionado |
| `error.tsx` | ✅ Copy propio + Sentry capture |
| `global-error.tsx` | ✅ Copy propio inline styles |
| `not-found.tsx` | ✅ 404 personalizado, `robots: { index: false, follow: false }` |

---

## Dimensión 7 — Lo que falta

Checklist de 23 ítems B2B. ✅ existe y funcional · ⚠️ parcial · ❌ ausente.

| # | Ítem | Estado | Evidencia |
|---|---|---|---|
| 1 | Hero con propuesta de valor clara para distribuidores | ⚠️ | Eyebrow target ✓, headline editorial-aspiracional, subheadline con "23 modelos" (cifra incorrecta) |
| 2 | CTA primario B2B | ⚠️ | "Solicitar cotización" × 8, sin variación (no "Cotizar volumen", "Descargar catálogo") |
| 3 | Catálogo completo visible (24 SKUs) | ❌ | 20 (products.ts) / 22 (Navbar) / 23 (copy). Sin vista con 24 correctos |
| 4 | Fichas técnicas por SKU | ❌ | Solo F4 tiene 3 métricas editoriales. 19+ SKUs sin specs. 0 UPCs, 0 composición |
| 5 | Sección Logística (paquete/cajex/master, dimensiones, peso) | ❌ | — |
| 6 | Casos de uso sectorizados | ⚠️ | Campo `canal` por familia como texto corto. No sección dedicada con case studies |
| 7 | Trust signals: razón social, dirección, años, capacidad | ⚠️ | Razón social ✓. Dirección solo en legales. Teléfono solo en legales. Años vago. Capacidad ❌ |
| 8 | Prueba social: marketplaces, logos clientes, testimonios | ⚠️ | Marketplaces como texto ✓. Logos ❌. Testimonios ❌ (TODO) |
| 9 | Descarga de catálogo PDF | ❌ | PDFs existen en Desktop del usuario, no en `public/` |
| 10 | Formulario B2B con empresa, RFC, volumen, tipo cuenta | ⚠️ | Empresa/canal/ciudad ✓. Faltan RFC, volumen, tipo cuenta |
| 11 | FAQ distribuidores (MOQ, entrega, pago, garantía) | ❌ | Menciones sueltas en DistribuidoresCTA, sin estructura |
| 12 | Certificaciones | ❌ | "Validado por lab" sin documento ni logos |
| 13 | Google Maps con fábrica | ❌ | — |
| 14 | Múltiples canales contacto (teléfono ventas, WhatsApp, email diferenciado) | ⚠️ | 1 teléfono en legales, WhatsApp **apunta a número fake**, email con 4 direcciones |
| 15 | Blog o recursos (opcional) | ❌ | — |
| 16 | Aviso de privacidad real | ✅ | 296 LOC, LFPDPPP conforme |
| 17 | Términos y condiciones reales | ✅ | 215 LOC, 9 secciones |
| 18 | Cookie banner + consent management | ✅ | `CookieBanner` + `ConsentAwareAnalytics` con evento custom; gate real |
| 19 | Analytics con eventos B2B | ⚠️ | Pageviews auto ✓, **0 eventos custom** (form submit, WhatsApp click, PDF download). CSP bloquea Sentry runtime |
| 20 | Página Distribuidores dedicada | ❌ | Solo sección `#distribuidores` inline |
| 21 | Mapa de cobertura / zonas | ⚠️ | 6 ciudades como cards de texto + "+ 24 zonas más" sin fuente. Sin mapa visual |
| 22 | Testimonios con datos concretos | ❌ | TODO en `SocialProof.tsx:66` |
| 23 | Info empresa (años, fábrica, capacidad, equipo) | ⚠️ | Párrafo breve + 4 stats. Banner fábrica placeholder. Sin año fundación explícito |

**Conteo**: ✅ **3 de 23** · ⚠️ **9 de 23** · ❌ **11 de 23**.

Cumplimiento B2B: **13% completo, 39% parcial, 48% ausente**.

---

## Apéndice A — Evidencia cruda

### A.1 `npm audit --audit-level=low --json`

```json
{
  "auditReportVersion": 2,
  "vulnerabilities": {},
  "metadata": {
    "vulnerabilities": { "info": 0, "low": 0, "moderate": 0, "high": 0, "critical": 0, "total": 0 },
    "dependencies": { "prod": 207, "dev": 326, "optional": 121, "peer": 51, "peerOptional": 0, "total": 652 }
  }
}
```

### A.2 Git log (últimos 5 commits)

```
4637c37 revert: use original NeoShield badge, blurred variant looked worse
dd8b72a fix(og): use simplified NeoShield variant without unreadable legal text
96f9060 fix(brand): OG — NeoShield badge 260px + wrap tagline to 2 lines
0f30482 fix(brand): OG image — bigger NeoShield + unify logo blue to #0076FF
d92b20c docs(pr): add brand-identity visual validation screenshots
```

### A.3 `npm run build` (salida relevante)

```
▲ Next.js 16.2.3 (Turbopack)
- Environments: .env.local
- Experiments (use with caution): · clientTraceMetadata

Turbopack build encountered 1 warnings:
./next.config.ts
Encountered unexpected file in NFT list
Import trace:
  App Route:
    ./next.config.ts
    ./src/app/opengraph-image.tsx
    ./src/app/opengraph-image--route-entry.js

✓ Compiled successfully in 7.4s
✓ Completed runAfterProductionCompile in 5.8s
✓ Finished TypeScript in 3.7s

[config] NEXT_PUBLIC_SITE_URL not set in production. Using Vercel subdomain fallback. × 6

✓ Generating static pages using 5 workers (11/11) in 942ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/contact
├ ○ /apple-icon.png
├ ○ /aviso-de-privacidad
├ ○ /icon.png
├ ○ /opengraph-image
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /terminos-de-uso

npm run build  41.18s user 3.60s system 211% cpu 21.135 total
```

### A.4 `npm run lint` (8 errors + 3 warnings)

```
eslint.config.mjs
  5:1  warning  Assign array to a variable before exporting as module default  import/no-anonymous-default-export

app/aviso-de-privacidad/page.tsx
  46:33  error  `"` can be escaped  react/no-unescaped-entities
  46:48  error  `"` can be escaped  react/no-unescaped-entities

app/error.tsx
  36:11  error  Do not use an `<a>` to navigate to `/`. Use `<Link />` from next/link  @next/next/no-html-link-for-pages

app/opengraph-image.tsx
  34:10  warning  Unused eslint-disable directive
  53:10  warning  Unused eslint-disable directive

components/ConsentAwareAnalytics.tsx:22:7  error  react-hooks/set-state-in-effect
components/ContactForm.tsx:43:7            error  react-hooks/set-state-in-effect
components/CookieBanner.tsx:15:18          error  react-hooks/set-state-in-effect
components/ProductHeroF4.tsx:94            error  react/no-unescaped-entities × 2

✖ 11 problems (8 errors, 3 warnings)
```

### A.5 Lighthouse mobile — Scores y vitals

```json
{
  "perf":  0.59,
  "a11y":  0.97,
  "best":  0.92,
  "seo":   1.0,
  "lcp":   "5.4 s",
  "cls":   "0",
  "fcp":   "1.0 s",
  "si":    "2.4 s",
  "tbt":   "930 ms",
  "inp":   "5.5 s"
}
```

### A.6 Lighthouse desktop — Scores y vitals

```json
{
  "perf":  0.79,
  "a11y":  0.97,
  "best":  0.92,
  "seo":   1.0,
  "lcp":   "1.1 s",
  "cls":   "0",
  "fcp":   "0.3 s",
  "si":    "1.1 s",
  "tbt":   "420 ms",
  "inp":   "1.1 s"
}
```

### A.7 Console errors (Lighthouse mobile — 7 críticos + 2 warnings)

```
[security] Connecting to 'https://o4511248313352192.ingest.us.sentry.io/api/4511253451243520/envelope/...'
           violates the following Content Security Policy directive: "connect-src 'self' https://*.supabase.co https://api.resend.com"
           × 3

[security] Creating a worker from 'blob:http://localhost:3006/...' violates the following
           Content Security Policy directive: "script-src 'self' 'unsafe-inline' 'unsafe-eval'".
           Note that 'worker-src' was not explicitly set, so 'script-src' is used as a fallback.

[network]  Failed to load resource: the server responded with a status of 404 (Not Found)

[javascript] Fetch API cannot load https://o4511248313352192.ingest.us.sentry.io/.../envelope/...
             Refused to connect because it violates the document's Content Security Policy.
             × 3

[security] Refused to execute script from 'http://localhost:3006/_vercel/speed-insights/script.js'
           because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
```

### A.8 `npx depcheck --json` (resumen)

```
Dependencies missing:   0
DevDependencies unused: 4 (@eslint/eslintrc, @tailwindcss/postcss, @types/react-dom, tailwindcss)
                          → los 4 son falsos positivos (uso implícito vía eslint.config.mjs,
                            postcss.config.mjs, tipado)
```

### A.9 Inventario de secretos (git history — no leaks detectados)

```
git log -S 'SUPABASE_SERVICE_ROLE_KEY=ey'   → 7df992f (solo placeholder en .env.example)
git log -S 'RESEND_API_KEY=re_'              → 7df992f (solo placeholder)
git log -S 'SENTRY_AUTH_TOKEN=sntrys'        → (sin matches)
git log -S 'KV_REST_API_TOKEN'               → 3dfc421 (referencia al nombre de env var, no al valor)
git ls-files | grep -iE '^\.env'             → .env.example (solo este archivo tracked)
```

### A.10 Screenshots capturados

| Archivo | Viewport | Tamaño |
|---|---|---:|
| `audit-evidence/screenshots/desktop-fold.png` | 1440×900 | 368 KB |
| `audit-evidence/screenshots/desktop-tall.png` | 1440×3200 | 770 KB |
| `audit-evidence/screenshots/desktop-all.png` | 1440×7200 | 1.1 MB |
| `audit-evidence/screenshots/mobile-fold.png` | 390×844 | 57 KB |
| `audit-evidence/screenshots/mobile-tall.png` | 390×3200 | 214 KB |
| `audit-evidence/screenshots/mobile-all.png` | 390×10800 | 242 KB |

**Nota**: en los screenshots "all" las secciones debajo del fold aparecen vacías porque `framer-motion` con `whileInView` mantiene opacity 0 hasta que el usuario scrollea. Chrome headless no simula scroll; por eso el contenido below-the-fold no se pinta.

---

## Apéndice B — Inventario de archivos

### B.1 Source tree (`src/`)

```
src/
├── app/
│   ├── api/contact/route.ts                  (313 LOC)
│   ├── aviso-de-privacidad/page.tsx          (296 LOC)
│   ├── terminos-de-uso/page.tsx              (215 LOC)
│   ├── apple-icon.png
│   ├── icon.png
│   ├── error.tsx                             ( 46 LOC)
│   ├── global-error.tsx                      ( 79 LOC)
│   ├── not-found.tsx                         ( 72 LOC)
│   ├── globals.css                           ( 56 LOC — @theme tokens)
│   ├── layout.tsx                            (117 LOC)
│   ├── page.tsx                              ( 95 LOC)
│   ├── opengraph-image.tsx                   ( 64 LOC)
│   ├── robots.ts                             ( 13 LOC)
│   └── sitemap.ts                            ( 26 LOC)
├── components/                               (20 componentes, 2 537 LOC)
│   ├── BeneficiosClave.tsx                   ( 70 LOC)
│   ├── Categories.tsx                        (180 LOC)
│   ├── ConsentAwareAnalytics.tsx             ( 36 LOC)
│   ├── ContactForm.tsx                       (307 LOC)
│   ├── CookieBanner.tsx                      ( 66 LOC)
│   ├── DistribuidoresCTA.tsx                 ( 92 LOC)
│   ├── ElProblema.tsx                        ( 57 LOC)
│   ├── Footer.tsx                            (184 LOC)
│   ├── Hero.tsx                              (119 LOC)
│   ├── HowItWorks.tsx                        ( 60 LOC)
│   ├── Navbar.tsx                            (441 LOC)
│   ├── NeoShield.tsx                         (125 LOC)
│   ├── NeoShieldMark.tsx                     ( 39 LOC)
│   ├── Nosotros.tsx                          (146 LOC)
│   ├── ProductHeroF4.tsx                     (135 LOC)
│   ├── ProductHeroMop.tsx                    (190 LOC)
│   ├── ProductImageSlot.tsx                  ( 47 LOC — DEAD CODE, 0 imports)
│   ├── SocialProof.tsx                       ( 86 LOC)
│   ├── StickyCtaBar.tsx                      ( 79 LOC)
│   └── WhatsAppButton.tsx                    (106 LOC)
├── lib/
│   ├── config.ts                             ( 12 LOC)
│   ├── products.ts                           (206 LOC — 20 SKUs)
│   ├── rate-limit.ts                         ( 38 LOC)
│   └── wordpress.ts                          (493 LOC — 4 consumidos + dead types)
├── instrumentation.ts                        ( 14 LOC)
└── instrumentation-client.ts                 ( 38 LOC)
```

**Total `src/`**: 28 archivos auditados en el prompt = 3 903 LOC.

### B.2 `public/` assets

```
Archivo                                                       Bytes
public/icon-192.png                                          12 627
public/icon-512.png                                          53 105
public/manifest.json                                            488
public/images/logo.svg                                          692
public/images/brand/_source/magiclean-logo.source.png       470 990  ❌ dead weight
public/images/brand/_source/magiclean-mc.source.png         210 453  ❌ dead weight
public/images/brand/_source/neoshield-badge.source.png      120 260  ❌ dead weight
public/images/brand/isotipo/magiclean-mc.png                535 675  ❌ dead weight
public/images/brand/isotipo/magiclean-mc.webp                58 336  ✓ usado
public/images/brand/logo/magiclean-logo.png               1 174 443  ⚠️ build-time OG
public/images/brand/logo/magiclean-logo.webp                148 844  ✓ usado
public/images/brand/neoshield/neoshield-badge.png           665 774  ❌ no renderizado
public/images/brand/neoshield/neoshield-badge.webp           97 420  ❌ no renderizado
public/images/hero/hero-kitchen.png                       1 853 259  ❌ dead weight
public/images/hero/hero-kitchen.webp                         52 816  ✓ usado
public/images/products/F4.jpg                             2 215 985  ❌ dead weight
public/images/products/F4.webp                              185 464  ✓ usado
```

**Total `public/`**: ~8.1 MB. **Realmente servido en la home**: ~512 KB (webp + svg + manifest + icons). **Dead weight público**: ~7.6 MB de PNGs/JPGs accesibles por URL pero no renderizados.

### B.3 Archivos de configuración

| Archivo | Propósito |
|---|---|
| `package.json` | 12 deps prod + 9 devDeps; scripts: dev, build, start, lint |
| `tsconfig.json` | Strict mode, paths `@/*` |
| `next.config.ts` | Images AVIF/WebP, headers de seguridad, CSP, Sentry wrapper |
| `postcss.config.mjs` | Tailwind 4 via `@tailwindcss/postcss` |
| `eslint.config.mjs` | Next.js recommended + typescript |
| `sentry.server.config.ts` + `sentry.edge.config.ts` | DSN hardcoded, PII redacted, tracesSampleRate 0.1 |
| `supabase/migrations/20260411000000_leads_table.sql` | Tabla leads + RLS + policy service_role_only |
| `.gitignore` | Excluye `.env.local`, `.vercel`, `.env.sentry-build-plugin`, `magiclean-theme/`, `public/og-image.png` |

### B.4 Archivos fuera del scope del audit pero relevantes

| Archivo/Dir | Nota |
|---|---|
| `magiclean-theme/` | Tema WordPress PHP independiente, gitignored. Duplica lógica de contact→Supabase→Resend en `inc/form-handler.php`. No parte del deploy de Vercel |
| `scripts/brand-processing.py` | Pipeline Python que genera los assets de marca desde `_source/*.source.png` |
| `audit-evidence/baseline-audit/*` | Documentación de auditorías previas (referencia histórica) |
| `audit-evidence/sprint-2/01-design-audit.md` | Contexto del PR #14 (logos / OG / NeoShield) |
| `audit-evidence/07-sprint-cierre-resultado.md` | Cierre del sprint de remediación previo |
| `audit-evidence/screenshots/` | Output del audit actual |

---

*Fin del reporte. Generado el 2026-04-21 sobre la branch `feat/brand-identity` @ `4637c37`.*
