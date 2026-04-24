# Sprint B — Auditoría Técnica (anexo de referencia) — 2026-04-23

**Branch:** `feat/sprint-b-catalog-consolidation` · **Status:** read-only audit, no code changes · **Acompaña:** `sprint-b-cierre.md`

## Propósito

Reporte técnico detallado que respalda la sección "Pendientes" del cierre formal. Este anexo existe para que cualquier sesión futura (Claude Code, auditor externo, dueño consultando) pueda reproducir el razonamiento detrás de la clasificación en buckets A/B/C y reusar el protocolo de cross-reference.

## 1. Inventario de components activos (20 archivos)

Todos en `src/components/`. Orden por aparición en `page.tsx`:

| # | Component | Estado | Nota |
|---|-----------|--------|------|
| 1 | `Navbar.tsx` | ✅ active | Top bar + mega-menú 23 SKUs + mobile drawer |
| 2 | `Hero.tsx` | ⚠️ placeholder hero image | WIP A-1 slot 01 |
| 3 | `ElProblema.tsx` | ✅ active | |
| 4 | `NeoShield.tsx` | ⚠️ placeholder microscopía | WIP A-1 slot 11 (L91 `<Image>` comentado) |
| 5 | `NeoShieldMark.tsx` | ✅ active | Badge helper |
| 6 | `BeneficiosClave.tsx` | ✅ active | |
| 7 | `Categories.tsx` | ✅ active | Grid productos + CTA catálogo (T9) |
| 8 | `ProductHeroF4.tsx` | ✅ active | Única card con foto autorizada + subida |
| 9 | `ProductHeroMop.tsx` | ⚠️ placeholder editorial | WIP A-1 slots 09/10 (hotfix `7f063f3`) |
| 10 | `SocialProof.tsx` | ⚠️ TODO testimonios | Deuda B-4 |
| 11 | `HowItWorks.tsx` | ✅ active | |
| 12 | `Logistica.tsx` | ✅ active | Nueva en Sprint B (T10) |
| 13 | `DistribuidoresCTA.tsx` | ✅ active | Refactored T10 a CTA puro |
| 14 | `Nosotros.tsx` | ⚠️ placeholder corporativo | WIP A-1 slot 12 (L41 `<Image>` comentado) |
| 15 | `ContactForm.tsx` | ✅ active | Fetch `/api/contact` |
| 16 | `Footer.tsx` | ✅ active | T9.1, pasó a `'use client'` |
| 17 | `WhatsAppButton.tsx` | ⚠️ número placeholder | WIP A-3 |
| 18 | `StickyCtaBar.tsx` | ✅ active | |
| 19 | `CookieBanner.tsx` | ✅ active | |
| 20 | `ConsentAwareAnalytics.tsx` | ⚠️ CSP bloqueada | WIP A-4 |

## 2. Inventario assets públicos

### Consumidos ✅
- `public/docs/Catalogo_Fibras.pdf` (12MB) → `catalog-assets.ts` (Categories, Footer, Navbar)
- `public/docs/Catalogo_Mops.pdf` (3.3MB) → `catalog-assets.ts`
- `public/images/hero/hero-kitchen.webp` → `Hero.tsx:92` (placeholder, WIP A-1)
- `public/images/products/F4.webp` → `products.json` vía `ProductHeroF4`
- `public/images/brand/logo/magiclean-logo.webp` → Navbar + Footer
- `public/images/brand/isotipo/magiclean-mc.webp` → StickyCtaBar
- `public/icon-192.png`, `public/icon-512.png` → manifest.json (PWA)

### Orphan (deuda B-2)
- `public/images/logo.svg`
- `public/images/hero/hero-kitchen.png` (fallback raster no referenciado directo)
- `public/images/products/F4.jpg` (fallback raster)
- `public/images/brand/logo/magiclean-logo.png`
- `public/images/brand/isotipo/magiclean-mc.png`
- `public/images/brand/neoshield/neoshield-badge.{png,webp}` (0 consumers grep)

### Referenciados en código pero NO existen (comentados, WIP)
- `/products/m1-product.webp`, `/products/m2-product.webp` (`ProductHeroMop.tsx:101/157` COMENTADOS)
- `/neoshield-tech.webp` (`NeoShield.tsx:91` COMENTADO)
- `/nosotros-banner.webp` (`Nosotros.tsx:41` COMENTADO)

Todos son `<Image>` comentados esperando llegada de arte — no rompen build.

## 3. Estado `products.json`

**23 SKUs activos** · 9 fibras + 7 mops + 3 accesorios + 4 repuestos.

**Hallazgo de data:** 22 de 23 SKUs tienen `foto_disponible: true` pero `imagen_path: null`. Solo F4 tiene `imagen_path: "/images/products/F4.webp"` real.

**Clasificación final:** A-6 WIP. Ground truth del dueño: `foto_disponible` refleja autorización/proyección, los `imagen_path` se completan progresivamente cuando llegue el arte.

## 4. Imports orphan o legacy

### ✅ Todos los 10 exports post-Sprint B de `products.ts` consumidos
CANALES, MARKETPLACES, NEOSHIELD_STATS, NEOSHIELD_FEATURES, PROBLEMAS, BENEFICIOS, PASOS, METRICAS, NOSOTROS_STATS, NOSOTROS_VALORES. T12 cleanup correcto.

### ⚠️ Orphans en `src/lib/wordpress.ts` (deuda B-1)
- `getMetrics()` L298 — 0 consumers
- `getHomePage()` L490 — 0 consumers
- Chain orphan: `HomeData`, `HomeMetrics`, `WPHero`, `WPAbout`, `WPAboutValue`, `WPCta`, `WPStat`, `WPImage`, `WPCategories` inner, `WPDistributors` inner, `WPFooter`, `WPFooterColumn`

### ✅ Resto de `src/lib/` limpio
`catalog-assets.ts`, `analytics.ts`, `categoryColors.ts`, `config.ts`, `rate-limit.ts` — todos exports consumidos.

## 5. TODO comments

**Solo 1** en todo `src/`:
- `SocialProof.tsx:66` — `TODO: Agregar testimonios de distribuidores reales` (deuda B-4)

## 6. Console errors producción local

### Verificados
- 2 errores CSP → Vercel Analytics bloqueada (WIP A-4, ticket SEC-CSP-01 existente).

### Potenciales sin verificar
- Sentry DSN inline (configuración correcta, no bug — ver C-2).
- Rate limit silent fail si Upstash env falta (ver C-1, provisionado).
- WordPress GraphQL fetch fallback (tiene try/catch, OK).

## 7. Riesgos de producción post-merge (re-evaluado)

Mi clasificación inicial asignó severidad ALTO/MEDIO a múltiples items. Post cross-reference con docs baseline la clasificación cambia sustancialmente:

| Finding original | Severidad inicial | Reclasificación final |
|------------------|-------------------|------------------------|
| WhatsApp número fake | ALTO | A-3 WIP (trámite en curso) |
| Email domain mismatch | ALTO | A-2 WIP (Kinsta DNS en curso) |
| Placeholders visuales en 4 secciones | ALTO | A-1 WIP (13 slots tracked) |
| `products.json.foto_disponible` inconsistente | ALTO | A-6 WIP (parte del trabajo fotos) |
| Vercel Analytics CSP | MEDIO | A-4 WIP (SEC-CSP-01 Sprint 2) |
| Logo halo artifact | MEDIO | A-7 WIP (decisión branding) |
| SocialProof TODO | MEDIO | B-4 deuda baja |
| Phone number JSON-LD | MEDIO | A-8 WIP (confirmado placeholder, mismo bloqueante que A-3 WhatsApp) |
| Rate limit env | MEDIO | C-1 cancelado (ya provisionado) |
| WordPress dead code | BAJO | B-1 deuda baja |
| Assets orphan | BAJO | B-2 deuda baja |
| Sentry DSN hardcoded | BAJO | C-2 cancelado (config correcta) |

**Lectura real:** ninguna acción pre-merge requerida. 8 items WIP del bucket A esperan externalidades. Deuda nueva del bucket B son 3 items todos BAJA para sprint futuro.

## 8. Consolidación final en buckets A/B/C

Replicada del `sprint-b-cierre.md` sección 6 para autonomía del documento. Ver cierre para tabla completa.

- **A — WIP tracked (8 items):** A-1 fotografía 13 slots, A-2 email domain Kinsta, A-3 WhatsApp, A-4 CSP Vercel Analytics, A-5 RSC refactor, A-6 `foto_disponible`, A-7 logo + escudo, A-8 phone JSON-LD.
- **B — Deuda nueva (3 items):** B-1 WordPress dead code, B-2 assets orphan, B-4 SocialProof TODO. (Numeración salta B-3 intencionalmente — phone JSON-LD pasó a A-8 tras confirmación del dueño como placeholder; salto preservado para trazabilidad histórica.)
- **C — Cancelados (2 items):** C-1 rate limit env, C-2 Sentry DSN.

## 9. Protocolo registrado

Mea culpa del auditor: clasificación inicial sin cross-reference infló severidad ALTO/MEDIO en 7 items (5 pasaron a WIP bucket A, 2 cancelados en bucket C). Registrado en memoria `feedback_audit_cross_reference.md` como protocolo operativo:

> Antes de clasificar severidad en audit técnica, cruzar con `audit-evidence/` + `docs/04-ACTIVE-SPRINTS.md` + `docs/03-DECISIONS-LOG.md` + memoria `project_magicclean_wip.md`. Severidad solo se asigna a "Deuda nueva" post cross-reference.

Aplicable a todas las auditorías futuras en este proyecto.
