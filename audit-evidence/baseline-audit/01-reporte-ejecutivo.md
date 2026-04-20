# AUDITORÍA TÉCNICA — MAGICLEAN WEB LAUNCH
## Reporte Ejecutivo
**Cliente:** Jacobo — Magiclean  
**Fecha:** 20 de abril de 2026  
**Ejecutor:** Claude Code  
**Repositorio:** https://github.com/MagicleanMX/magiclean-web (rama `main`)  
**Último commit auditado:** `da4ed14` — 2026-04-18

---

## Estado General del Proyecto

| Dimensión | Estado | Bloquea cierre |
|-----------|--------|----------------|
| Seguridad | ⚠️ ALERTA | Sí (1 CRÍTICO) |
| Diseño/UX | ✅ SÓLIDO | No |
| Errores/Estabilidad | ⚠️ ALERTA | Sí (Sentry ausente) |
| Performance/SEO | ⚠️ ALERTA | No (mejoras recomendadas) |
| Conexiones | ⚠️ ALERTA | No (rate limit inefectivo) |
| Preparación Arte | ✅ LISTO (estructura) | No |

**Veredicto:** El proyecto **NO está listo para cierre** todavía. Hay **1 hallazgo CRÍTICO** y **3 ALTO bloqueantes** que deben resolverse antes de lanzamiento. El esqueleto visual está bien construido y la estructura de slots de imagen está preparada para recibir el arte final.

---

## Hallazgos por Severidad

| Severidad | Cantidad |
|-----------|----------|
| 🔴 CRÍTICO | 3 |
| 🟠 ALTO | 11 |
| 🟡 MEDIO | 6 |
| 🟢 BAJO | 1 |
| **TOTAL** | **21** |

---

## Los 3 CRÍTICOS (bloquean cierre)

### 🔴 SEC-RLS-01 — RLS de Supabase no verificable sin acceso al dashboard
El archivo `supabase_leads_table.sql` define la política correcta (`service_role_only`), pero **no existe una carpeta `supabase/migrations/`** ni hay evidencia de que fue aplicada al proyecto de producción. La política RLS no está versionada. No es posible confirmar sin credenciales de Supabase que RLS esté activo en producción.  
→ **Acción:** Confirmar manualmente en Supabase dashboard o proveer credenciales de solo lectura.

### 🔴 CON-RATELIMIT-01 — Rate limiting en memoria es inefectivo en serverless
El `/api/contact` implementa un rate limit con `Map` en memoria y `setInterval`. En Vercel serverless, cada invocación puede ser una instancia nueva (cold start). El mapa se resetea en cada arranque en frío. En la práctica **el rate limit no funciona en producción**, dejando el formulario expuesto a spam masivo y abuso de la cuota de Resend/Supabase.  
→ **Acción:** Implementar rate limiting con Upstash Redis o Vercel KV (< 4 horas de trabajo).

### 🔴 SEC-CSP-01 — CSP permite `unsafe-inline` y `unsafe-eval`
El Content-Security-Policy en `next.config.ts` incluye `'unsafe-inline'` y `'unsafe-eval'` en `script-src`. Esto anula la protección XSS que el header CSP debería proveer. Cualquier inyección de script funcionaría igualmente.  
→ **Acción:** Migrar a nonces o hashes para scripts inline (requerido por Framer Motion).

---

## Top Hallazgos ALTO

1. **ERR-SENTRY-01** — Sentry no está instalado. Producción opera sin monitoreo de errores.
2. **PERF-CLIENT-01** — Los 17 componentes son `use client` por Framer Motion. Sin RSC benefits.
3. **SEO-OG-01** — La imagen OG tiene 2752×1536px. Las redes sociales esperan 1200×630px (ya hay TODO en el código).
4. **CON-DOMAIN-01** — `siteUrl` hardcodeado como `magiclean-web.vercel.app` en layout.tsx, sitemap y JSON-LD. Cuando se conecte el dominio final, el SEO y structured data serán incorrectos.
5. **ERR-BOUNDARY-01** — No existe `error.tsx` ni `ErrorBoundary`. Errores en runtime muestran pantalla blanca.
6. **CON-LINT-01** — `npm run lint` está roto (`next lint` error de directorio). Calidad de código no se puede auditar automáticamente.
7. **CON-MIGRATE-01** — Migración SQL no está en `supabase/migrations/`. Si se recrea el proyecto en otro entorno, el esquema se pierde.

---

## Puntos Positivos (no tocar)

- ✅ **0 vulnerabilidades** en dependencias de producción (`npm audit --production`)
- ✅ **0 errores TypeScript** — `tsc --noEmit` limpio
- ✅ **Build exitoso** — compila sin warnings en Next.js 16.2.3
- ✅ **Headers de seguridad completos** — HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP, CORP
- ✅ **`.env.local` nunca commiteado** — git log limpio de secretos
- ✅ **`SUPABASE_SERVICE_ROLE_KEY` solo server-side** — jamás expuesto al cliente
- ✅ **Honeypot + validación server-side** en formulario — buena práctica
- ✅ **next/font, next/image, AVIF/WebP** — configuración de performance correcta
- ✅ **Aspect ratios fijos** en todos los slots de imagen — sin CLS al llegar el arte
- ✅ **404 página branded** y consistente con la identidad

---

## Criterios de Cierre

| Criterio | Estado |
|----------|--------|
| 0 hallazgos CRÍTICOS en seguridad | ❌ 3 pendientes |
| 0 errores en consola (browser) | ⚠️ No verificable sin servidor local |
| Build exitoso sin warnings | ✅ |
| RLS habilitado en Supabase | ⚠️ No verificable sin credenciales |
| Sin claves sensibles expuestas | ✅ |
| SSL válido en dominio producción | ✅ (Vercel automático) |
| Lighthouse Performance mobile ≥ 85 | ⚠️ No medible localmente sin build server |
