# Sprint Cierre Auditoría — Reporte Final

**Fecha:** 2026-04-20
**Branch:** sprint-cierre-auditoria
**Duración:** ~1 día
**Commits:** 12 (9 hallazgos + 3 housekeeping)

## Resumen ejecutivo

- **8 hallazgos del brief original** ejecutados en código (3 CRÍTICOS + 5 ALTOS).
- **1 hallazgo crítico adicional** cerrado fuera de código (SEC-RLS-01: validado en Supabase tras descubrir que el proyecto dedicado no existía).
- **3 hallazgos fuera de alcance** diferidos a Sprint 2 (SEC-CSP-01, PERF-CLIENT-01, UX-HARDCODED-01).
- **4 hallazgos secundarios** descubiertos durante la remediación (lint, Resend, NOTIFY_EMAIL, WP_GRAPHQL_URL).
- **Score técnico al cierre:** producción lista salvo Resend (bloqueado por migración DNS a Kinsta).

## Tabla de commits

| # | Hash | Tipo | Hallazgo | Severidad |
|---|------|------|----------|-----------|
| 1 | 7b73ef5 | fix(lint) | CON-LINT-01 | ALTO |
| 2 | aec8354 | feat(errors) | ERR-BOUNDARY-01 | ALTO |
| 3 | 7b3f05c | fix(seo) | SEO-OG-01 | ALTO |
| 4 | 467e58b | chore(gitignore) | — (housekeeping) | — |
| 5 | c0de670 | refactor(config) | CON-DOMAIN-01 | ALTO |
| 6 | 0e0a5d8 | docs(env) | WP-CONN-01 | ALTO |
| 7 | b6624ca | chore(supabase) | CON-MIGRATE-01 | CRÍTICO |
| 8 | 7eb3cd9 | feat(sentry) | ERR-SENTRY-01 | CRÍTICO |
| 9 | 3dfc421 | feat(ratelimit) | CON-RATELIMIT-01 | CRÍTICO |
| 10 | d3bfc8f | chore(assets) | — (housekeeping) | — |
| 11 | ea2e408 | chore(sentry) | ERR-SENTRY-01 followup | — |
| 12 | (this PR) | docs(audit) | Reporte de cierre | — |

## Hallazgos cerrados — detalle

### CON-LINT-01 — Lint roto tras migración a ESLint 9
- **Problema:** `next lint` no corría en CI; migración pendiente a flat config.
- **Solución:** `eslint.config.mjs` con `next/core-web-vitals` + reglas TypeScript; `npm run lint` ejecutable de nuevo.
- **Archivos:** `eslint.config.mjs`, `package.json`.
- **Commit:** `7b73ef5`

### ERR-BOUNDARY-01 — Falta de error boundaries
- **Problema:** errores de render no capturados llegaban al usuario final.
- **Solución:** añadidos `error.tsx` (segment-level) y `global-error.tsx` (root) con UI de fallback y botón de reset.
- **Archivos:** `src/app/error.tsx`, `src/app/global-error.tsx`.
- **Commit:** `aec8354`

### SEO-OG-01 — Falta de imagen Open Graph
- **Problema:** compartidos en redes sin preview gráfica.
- **Solución:** placeholder 1200×630 con marca MagiClean generado desde `og-image.source.svg` vía `rsvg-convert`; metadata apunta a `/og-image.png`.
- **Archivos:** `public/og-image.source.svg`, `src/app/layout.tsx` (metadata).
- **Commit:** `7b3f05c`

### CON-DOMAIN-01 — siteUrl hardcoded en múltiples archivos
- **Problema:** URL base duplicada en sitemap, robots, metadata y emails.
- **Solución:** centralizado en `src/lib/config.ts` con fallback `VERCEL_URL` → producción.
- **Archivos:** `src/lib/config.ts` y consumidores en `src/app/`.
- **Commit:** `c0de670`

### WP-CONN-01 — WP_GRAPHQL_URL sin documentar
- **Problema:** env var requerida pero ausente de `.env.example`.
- **Solución:** añadida con comentario explicativo sobre cuándo es obligatoria.
- **Archivos:** `.env.example`.
- **Commit:** `0e0a5d8`

### CON-MIGRATE-01 — Schema Supabase sin versionar  [CRÍTICO]
- **Problema:** schema aplicado por SQL manual, sin trazabilidad ni rollback.
- **Solución:** Supabase CLI inicializado; migración `20260411000000_leads_table.sql` versionada en repo; `supabase/config.toml` incluido.
- **Archivos:** `supabase/migrations/*`, `supabase/config.toml`.
- **Commit:** `b6624ca`

### ERR-SENTRY-01 — Sin error monitoring en producción  [CRÍTICO]
- **Problema:** errores en runtime invisibles.
- **Solución:** Sentry SDK instalado (server + client + edge). PII scrubbing activo, `tracesSampleRate: 0.1`, replays solo on-error. Páginas de ejemplo retiradas tras verificación.
- **Archivos:** `sentry.server.config.ts`, `sentry.edge.config.ts`, `instrumentation.ts`, `instrumentation-client.ts`, `next.config.ts`.
- **Commits:** `7eb3cd9` (instalación), `ea2e408` (cleanup)

### CON-RATELIMIT-01 — Rate limit in-memory  [CRÍTICO]
- **Problema:** `Map` en memoria no sobrevive cold starts ni se comparte entre funciones serverless.
- **Solución:** Upstash Redis via `@upstash/ratelimit` con sliding window de 10 req/hora por IP; provisionado vía Vercel Marketplace (Free tier).
- **Archivos:** `src/lib/ratelimit.ts`, `src/app/api/leads/route.ts`.
- **Commit:** `3dfc421`

## Hallazgo cerrado fuera de código

### SEC-RLS-01 — Row Level Security sin verificar  [CRÍTICO]
- **Problema:** RLS declarado en esquema pero nunca validado en proyecto Supabase dedicado.
- **Descubrimiento:** durante el sprint se detectó que el proyecto Supabase de la landing **no existía**. El código apuntaba a env vars que no estaban en Vercel.
- **Solución:**
  1. Creado proyecto Supabase `magiclean-landing` (org Pro, region `us-west-2`).
  2. Aplicada migración `supabase/migrations/20260411000000_leads_table.sql` con `ALTER TABLE leads ENABLE ROW LEVEL SECURITY` y policy `service_role_full_access`.
  3. Validado con `INSERT` + `DELETE` manuales desde SQL Editor (anon rechazado, service_role autorizado).
  4. Configuradas `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en Vercel (Production, Preview, Development).

## Hallazgos secundarios descubiertos

| ID | Descripción | Severidad | Estado | Notas |
|---|---|---|---|---|
| SEC-LINT-01 | 3 × `react-hooks/set-state-in-effect` + 4 × `react/no-unescaped-entities` | MEDIO | Pendiente Sprint 2 | Detectados al restaurar lint (CON-LINT-01) |
| ENV-RESEND-01 | `RESEND_API_KEY` sin configurar en Vercel | ALTO | Bloqueado | Depende de verificar dominio `magiclean.mx` en Resend post-migración DNS a Kinsta |
| ENV-NOTIFY-01 | `NOTIFY_EMAIL` sin configurar | MEDIO | Pendiente | Configurar junto con Resend |
| ENV-WP-01 | `WP_GRAPHQL_URL` sin configurar | BAJO | Diferido | Solo necesario si WordPress se integra |

## Arquitectura final de producción

- **Hosting:** Vercel Pro (proyecto `magiclean-web`)
- **DB leads:** Supabase Pro (proyecto `magiclean-landing`, `us-west-2`)
- **Rate limit:** Upstash Redis vía Vercel Marketplace Free (10 req/hora por IP, sliding window)
- **Error monitoring:** Sentry (proyecto `magiclean-landing`, org `magiclean-no`, PII scrubbing activo)
- **Email:** **PENDIENTE** Resend post-migración DNS

## Checklist post-merge (para Jacobo)

- [ ] Verificar que Vercel redeployea sin errores después del PR merge.
- [ ] Abrir Sentry dashboard y confirmar que no llegan errores nuevos.
- [ ] Probar formulario en producción: llenarlo con datos de prueba y verificar que el lead aparece en tabla `leads` de Supabase `magiclean-landing`.
- [ ] (post-Kinsta) Verificar dominio `magiclean.mx` en Resend → crear `RESEND_API_KEY` → agregar `RESEND_API_KEY` + `NOTIFY_EMAIL` en Vercel.
- [ ] Eliminar del CRM Supabase (`jlevyh69-hash's Project`) cualquier rastro de leads de prueba o referencias a la landing si existen.

## Sprint 2 recomendado

**Fase 1 — Arte y fotografía** (iniciando ahora):
- Optimizar `hero-main.png` (5.4 MB → WebP responsive).
- Optimizar `F4.jpg` (2.1 MB → WebP).
- Shootear fotos faltantes según gap-list (ver `05-gap-list-arte.md`).
- Integrar foto por foto en componentes.

**Fase 2 — Hallazgos diferidos técnicos:**
- SEC-CSP-01: refactor CSP con nonces.
- PERF-CLIENT-01: evaluar componentes RSC vs client.
- UX-HARDCODED-01: tokens de color centralizados.
- Cerrar lint errors detectados (SEC-LINT-01).

**Fase 3 — Email activation (post-Kinsta):**
- Verificar dominio en Resend.
- Configurar env vars (`RESEND_API_KEY`, `NOTIFY_EMAIL`).
- Test end-to-end del formulario con emails.
