# PLAN DE REMEDIACIÓN — MAGICLEAN WEB LAUNCH
**Fecha:** 20 de abril de 2026  
**Prioridad:** Críticos primero, luego bloqueantes de lanzamiento, luego mejoras

---

## SPRINT 1 — Bloqueantes de cierre (< 1 día total)

| # | ID | Acción | Responsable | Esfuerzo | Dependencias |
|---|-----|--------|-------------|----------|--------------|
| 1 | SEC-RLS-01 | Verificar RLS activo en Supabase dashboard para tabla `leads` | Jacobo | XS | Acceso a Supabase dashboard |
| 2 | SEC-RLS-01 | Mover `supabase_leads_table.sql` a `supabase/migrations/` | IA | XS | Ninguna |
| 3 | CON-DOMAIN-01 | Mover `siteUrl` a env var `NEXT_PUBLIC_SITE_URL` | IA | XS | Ninguna |
| 4 | SEO-OG-01 | Crear `og-image-placeholder.jpg` 1200×630px con marca | Jacobo/IA | XS | Canva o Figma |
| 5 | ERR-BOUNDARY-01 | Crear `src/app/error.tsx` branded | IA | XS | Ninguna |
| 6 | CON-LINT-01 | Reparar `npm run lint` con `--dir src` flag | IA | XS | Ninguna |
| 7 | WP-CONN-01 | Agregar `WP_GRAPHQL_URL` a `.env.example` | IA | XS | Ninguna |
| 8 | ERR-CONSOLE-01 | Sanitizar `console.error` en API route | IA | XS | Ninguna |

**Estimado Sprint 1:** 2-3 horas (IA ejecuta 2,3,5,6,7,8 en paralelo; Jacobo hace 1 y 4)

---

## SPRINT 2 — Seguridad crítica (1-2 días)

| # | ID | Acción | Responsable | Esfuerzo | Dependencias |
|---|-----|--------|-------------|----------|--------------|
| 9 | CON-RATELIMIT-01 | Instalar `@vercel/kv`, provisionar KV store en Vercel, reemplazar rate limit en-memoria | IA | S | Vercel KV o Upstash Redis |
| 10 | SEC-CSP-01 | Implementar CSP con nonces via middleware.ts (remover unsafe-inline/eval) | IA | M | Testing con Framer Motion en prod |

**Estimado Sprint 2:** 4-8 horas

---

## SPRINT 3 — Monitoreo y estabilidad (1 día)

| # | ID | Acción | Responsable | Esfuerzo | Dependencias |
|---|-----|--------|-------------|----------|--------------|
| 11 | ERR-SENTRY-01 | Instalar `@sentry/nextjs`, configurar DSN en Vercel env vars, sample rate 0.1 | IA | S | Cuenta Sentry (gratis disponible) |
| 12 | CON-MIGRATE-01 | Inicializar Supabase CLI, migrar SQL a `supabase/migrations/` | IA+Jacobo | S | CLI access + project ref |

**Estimado Sprint 3:** 3-5 horas

---

## SPRINT 4 — Mejoras de calidad (post-lanzamiento)

| # | ID | Acción | Responsable | Esfuerzo | Prioridad |
|---|-----|--------|-------------|----------|-----------|
| 13 | PERF-CLIENT-01 | Refactor de componentes: separar RSC/Client boundaries para los que no requieren estado | IA | L | Alta |
| 14 | UX-HARDCODED-01 | Refactor de colores hardcodeados a tokens Tailwind | IA | M | Media |
| 15 | UX-REDUCED-MOTION-01 | Agregar `useReducedMotion` en todos los componentes animados | IA | S | Media |
| 16 | ART-SKELETON-01 | Agregar blur-up/skeleton en slots de imagen | IA | S | Media (antes del arte) |
| 17 | CON-SUPABASE-SINGLETON-01 | Patrón singleton para cliente Supabase | IA | XS | Baja |
| 18 | PERF-BUNDLE-01 | Instalar bundle-analyzer, documentar y optimizar dependencias pesadas | IA | XS | Baja |
| 19 | SEO-DOMAIN-02 | Confirmar datos de contacto en JSON-LD con Jacobo | Jacobo | XS | Baja |

---

## Criterios para pasar a fase de arte

✅ Sprint 1 completado  
✅ Sprint 2 completado (CON-RATELIMIT-01 mínimo)  
✅ RLS verificado en Supabase (SEC-RLS-01)  
⏳ Sprint 3 puede correr en paralelo con inicio de arte  
⏳ Sprint 4 puede hacerse mientras se produce el material fotográfico
