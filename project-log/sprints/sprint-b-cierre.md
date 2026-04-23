# Sprint B — Consolidación Catálogo Source of Truth — 2026-04-23

## 1. Metadata

- **Branch:** `feat/sprint-b-catalog-consolidation`
- **Fecha de cierre:** 2026-04-23
- **Periodo:** 2026-04-22 (primer commit `2e7b394`) → 2026-04-23 (último commit `e450fbe`)
- **Commits totales:** 17 (sin push, sin merge a `feat/brand-identity`)
- **Status:** técnicamente cerrado, esperando decisión de branch del dueño

## 2. Objetivo original

De `docs/04-ACTIVE-SPRINTS.md` Sprint B:

- Crear `products.json` con SKUs activos para landing (23 — M7 excluido por descontinuación)
- Unificar Navbar / Categories / ProductHero* contra ese archivo
- Agregar sección Logística con presentaciones
- Linkear PDFs descargables de catálogo
- **Pre-requisito:** dueño sube `Catalogo_Fibras.pdf` y `Catalogo_Mops.pdf` al repo (cumplido al inicio del sprint).

## 3. Qué se hizo — 17 commits

| # | Hash | Descripción |
|---|---|---|
| 1 | `2e7b394` | Creación de `products.json` con 23 SKUs consolidados + voice dual B2B copy. Source of truth del catálogo. |
| 2 | `e0ba4fb` | Rename F6 a "Fibra Blanca Delicada" (qualifier agregado, matching al catálogo físico). |
| 3 | `4b40db3` | Migración Navbar mega-menú a `products.json` — layout compacto simplificado. |
| 4 | `db75665` | Copy F1/F2/F3 refinado a "Limpieza profunda" positioning. |
| 5 | `843c8df` | Migración Categories a `products.json` con sub-categorización de Fibras por uso. |
| 6 | `c2dfc56` | Fix Navbar: chips de Fibras sincronizados con sub-grupo color system. |
| 7 | `ceb42e6` | Refactor ProductHero* (F4 y Mop) para consumir `products.json` como source of truth. |
| 8 | `7f063f3` | Hotfix ProductHeroMop: reemplazo de placeholders huecos por typography treatment editorial (M1/M2 sin foto). |
| 9 | `33be953` | Fix ProductHeroMop: rebalance de proporciones de card para estado photoless. |
| 10 | `8568386` | Copy Hero: "23 modelos" → "23 soluciones profesionales" — positioning inspiracional. |
| 11 | `45655dc` | Unificación global "modelos" → "soluciones" en SEO metadata, Navbar footer y JSDoc `wordpress.ts`. |
| 12 | `b5219f1` | CTA Catálogo Profesional en Categories.tsx: PDFs huérfanos cableados al header CTA + analytics `catalog_download`. |
| 13 | `2574fa4` | Sección `<Logistica />` entre HowItWorks y DistribuidoresCTA: 4 bloques editoriales, 3 columnas + footer MOQ/flete. Refactor DistribuidoresCTA a CTA puro. |
| 14 | `14ef91e` | Docs actualizados (CLAUDE.md, 02-PRODUCT-CATALOG, 04-ACTIVE-SPRINTS): 23 SKUs activos vs 24 totales (M7 excluido). |
| 15 | `ee0d578` | Eliminación del export `FAMILIAS` deprecated (87 líneas) + unificación 3 strings residuales "modelos" → "soluciones" en METRICAS, NOSOTROS_STATS, NOSOTROS_VALORES. Header comment agregado al archivo. |
| 16 | `c822fac` | Extracción `src/lib/catalog-assets.ts` como single source of truth de URLs/labels PDFs + refactor Categories.tsx. |
| 17 | `e450fbe` | Propagación del patrón T9 a Footer (link único → 2 PDFs) y Navbar mega-menú (footer en 2 líneas con PDF pills + CTA). Footer pasa a `'use client'`. |

## 4. Decisiones clave

1. **Rename F6 a "Fibra Blanca Delicada"** (`e0ba4fb`). El qualifier "Delicada" era requerido para diferenciar vs Fibra Blanca Baños y matchear catálogo físico.

2. **Sub-categorización de Fibras por uso** (`843c8df` + `c2dfc56`). En Categories y Navbar las Fibras se agrupan por sub-grupo visual, no como listado plano. Mejora escaneo B2B.

3. **Hotfix M1/M2 placeholders editoriales** (`7f063f3` + `33be953`). Como no hay fotografía autorizada de Mops, la card se reemplazó por typography treatment en lugar de placeholder hueco. Mantiene presencia editorial premium en ausencia de foto.

4. **"23 modelos" → "23 soluciones profesionales" unificado en TODA la landing** (`8568386` + `45655dc` + `ee0d578`). Cambio de posicionamiento: "modelos" es retail, "soluciones" es B2B consultivo. Cleanup total en 3 commits cubriendo Hero, SEO, Navbar, wordpress JSDoc, METRICAS, NOSOTROS_STATS y NOSOTROS_VALORES.

5. **CTA Catálogo Profesional + analytics cableado** (`b5219f1`). 2 PDFs (Fibras 12MB + Mops 3MB) que existían en `public/docs/` pero estaban huérfanos (sin entry point en UI) ahora linkeados desde Categories header. Analytics `catalog_download` (infra pre-existente pero sin disparadores) ahora activo.

6. **Logística honesta con sub-bloques Cómo llega / Dónde operamos** (`2574fa4`). Estructura de 2 sub-bloques en columna Cobertura separa la capacidad de surtido (nacional vía paquetería/CEDIS desde CDMX) de la presencia operativa directa (solo CDMX hoy, expansión 2026). Refactor de DistribuidoresCTA a CTA puro (removida duplicación de info logística).

7. **M7 excluido intencional con doc trazable** (`14ef91e`). Landing con 23 SKUs vs catálogo físico con 24. M7 en descontinuación. Decisión de posicionamiento B2B premium — un producto saldando no debe aparecer en landing. Ground truth documentado en CLAUDE.md, 02-PRODUCT-CATALOG.md y 04-ACTIVE-SPRINTS.md para evitar re-preguntas futuras.

8. **`FAMILIAS` deprecated removido** (`ee0d578`). El export estaba unused post-migración a `products.json`. Cierre del hilo "source of truth" — `products.ts` ahora contiene solo copy editorial, no datos de producto.

9. **Single source of truth `catalog-assets` propagado a 3 surfaces** (`c822fac` + `e450fbe`). URLs/labels/sizes de PDFs centralizados en `src/lib/catalog-assets.ts`. Agregar un 3º catálogo en el futuro es edit de 1 línea en la constante, sin tocar componentes.

## 5. Lecciones / notas para el futuro

1. **Ground truth corrections matter.** Durante T10 el dueño corrigió que "cobertura solo CDMX" subvendía la operación real (surtido nacional vía paquetería desde CDMX). Ajuste crítico mid-sprint. Moraleja: verificar ground truth con el dueño antes de escribir copy que afirme estado operacional, incluso cuando el ground truth previo parece sólido.

2. **Disciplina "genérico > números no verificables" en copy B2B.** En T10 se removió un pill "Márgenes 40-45% vs 18% multinacionales" antes de commit: el número estaba en CLAUDE.md como contexto interno, NO verificado para publicación. Principio guardado como feedback memory — CLAUDE.md es contexto para Claude, no source-of-truth para copy visible. Publicar comparativas frágiles = riesgo legal + credibilidad B2B.

3. **Scope creep detection al cierre.** T11.b (Badge NeoShield™) entró por scope creep mid-conversación — no estaba en `docs/04-ACTIVE-SPRINTS.md` Sprint B original. Se removió al cierre para mover a Sprint C/D. Moraleja: al cerrar un sprint, auditar el scope ejecutado vs scope planeado, mover lo que entró por accidente.

4. **Modo individual de aprobación en Claude Code previno bugs.** La mayor parte del sprint corrió en modo individual (Shift+Tab para cada edit). Permitió atrapar al menos 1 problema temprano (y también el flag de foto IA descartada en sesión previa). Trade-off aceptable de velocidad a favor de control, especialmente en archivos sensibles como `products.ts` (rule CLAUDE.md #7).

5. **Auditoría sin cross-reference infla severidad.** El audit técnico inicial al cierre clasificó como ALTO/MEDIO varios items que ya eran WIP tracked en `audit-evidence/` y `docs/03-DECISIONS-LOG.md` (placeholders visuales, WhatsApp, email domain, CSP Vercel Analytics, phone JSON-LD). Después del cross-reference, **7 findings se reclasificaron** (5 a WIP tracked en bucket A incluyendo phone JSON-LD confirmado como placeholder por el dueño, 2 cancelados en bucket C como falsos positivos). Protocolo registrado en memoria (`feedback_audit_cross_reference.md`): para auditorías futuras consultar `audit-evidence/` + `docs/04-ACTIVE-SPRINTS.md` + `project_magicclean_wip.md` ANTES de clasificar severidad. Severidad solo se asigna a la categoría "Deuda nueva".

## 6. Pendientes

Clasificados en 3 buckets tras cross-reference con docs baseline. Detalle completo en documento anexo `sprint-b-auditoria.md`.

### 6.A — Work In Progress tracked en docs baseline (8 items)

No son deuda. No son blockers. Trabajo paralelo al codebase.

| # | Item | Tracking | Bloqueante externo |
|---|------|----------|---------------------|
| A-1 | Placeholders visuales — 13 slots de fotografía | `audit-evidence/baseline-audit/04-inventario-fotografia.md` + `05-gap-list-arte.md` | Producción fotográfica + autorización dueño F9/7 Mops + Adobe Stock (10 créditos) |
| A-2 | Email domain `magicleanproducts.com` → `magiclean.mx` | `docs/03-DECISIONS-LOG.md` 2026-04-21 "Dominio canónico" + `audit-evidence/next-steps-domain.md` + ticket ENV-RESEND-01 en `07-sprint-cierre-resultado.md` | Migración DNS a Kinsta en curso |
| A-3 | WhatsApp número B2B real | `memory/project_magicclean_wip.md` | Trámite del número B2B por el dueño |
| A-4 | CSP → Vercel Analytics bloqueada | `02-hallazgos-detallados.md` ticket SEC-CSP-01 + `03-plan-remediacion.md` Sprint 2 | Esfuerzo M, planeado Sprint E |
| A-5 | Todos los componentes `use client` | `02-hallazgos-detallados.md` PERF-CLIENT-01 + `03-plan-remediacion.md` Sprint 4 | Post-lanzamiento explícito |
| A-6 | `products.json.foto_disponible` inconsistente | `memory/project_magicclean_wip.md` | Parte del trabajo de fotos, se completa progresivamente |
| A-7 | Logo MagiClean + escudo NeoShield™ | `memory/project_magicclean_wip.md` | Decisión de branding pendiente del dueño |
| A-8 | Phone JSON-LD `+525571553635` placeholder | `memory/project_magicclean_wip.md` (mismo bloqueante que A-3 WhatsApp — ambos esperan número B2B real) | Trámite del número B2B por el dueño. Cuando llegue: reemplazar en `WhatsAppButton.tsx:8` Y `layout.tsx:83` en el mismo commit |

### 6.B — Deuda nueva descubierta en auditoría (3 items)

Genuinamente no documentado. Severidad máxima BAJA (ningún ALTO ni MEDIO post-movimiento de phone JSON-LD a A-8).

Numeración B-1/B-2/B-4 preserva salto intencional de B-3 para trazabilidad histórica de la reclasificación.

| # | Item | Severidad | Sprint sugerido |
|---|------|-----------|-----------------|
| B-1 | WordPress dead code — `getMetrics()` + `getHomePage()` orphans + tipos asociados (~200 líneas) | BAJA | Sprint D (voice dual toca `wordpress.ts`) o Sprint E (cleanup pre-lanzamiento) |
| B-2 | Assets orphan en `public/` (logo.svg, F4.jpg fallback, .png variantes, neoshield-badge) | BAJA | Sprint E (cleanup pre-lanzamiento) |
| B-4 | `SocialProof.tsx:66` TODO testimonios distribuidores reales | BAJA | Sprint C (Elevación B2B) — encaja con "trust signals visibles" |

### 6.C — Cancelados post cross-reference (2 items)

Falsos positivos del audit inicial.

| # | Finding original | Cancelación |
|---|------------------|-------------|
| C-1 | "Rate limit env vars verification needed" (MEDIO) | `07-sprint-cierre-resultado.md` CON-RATELIMIT-01 resuelto commit `3dfc421` — Upstash provisionado vía Vercel Marketplace Free tier |
| C-2 | "Sentry DSN hardcoded" (BAJO) | `07-sprint-cierre-resultado.md` ERR-SENTRY-01 resuelto commits `7eb3cd9` + `ea2e408` — SDK configurado correctamente con PII scrubbing y sample rate 0.1 |

## 7. Cross-reference con docs baseline

Sección nueva incorporada al protocolo de cierre tras el ejercicio de auditoría técnica durante T13.

### Documentos consultados

| Documento | Propósito |
|-----------|-----------|
| `audit-evidence/baseline-audit/02-hallazgos-detallados.md` | Hallazgos audit técnica 2026-04-20 con IDs formales |
| `audit-evidence/baseline-audit/03-plan-remediacion.md` | Plan en 4 sprints por prioridad |
| `audit-evidence/baseline-audit/04-inventario-fotografia.md` | 13 slots de fotografía definidos con specs |
| `audit-evidence/baseline-audit/05-gap-list-arte.md` | Bloqueantes + prerequisitos producción fotográfica |
| `audit-evidence/07-sprint-cierre-resultado.md` | Cierre auditoría previo — rate limit, Sentry, RLS resueltos |
| `audit-evidence/next-steps-domain.md` | Guía operativa `NEXT_PUBLIC_SITE_URL` post-Kinsta |
| `docs/03-DECISIONS-LOG.md` | 9 decisiones estratégicas 2026-04-21 (naming, entidad, dominio) |
| `docs/04-ACTIVE-SPRINTS.md` | Roadmap Sprint A-F |

### Mapping resumen audit → docs baseline

| Mi finding inicial | Ubicación en docs / resolución | Reclasificación |
|--------------------|-------------------------------|-----------------|
| Placeholders visuales "riesgos ALTOS" | `04-inventario-fotografia.md` 13 slots | → A-1 WIP |
| Email domain inconsistente "ALTO" | `03-DECISIONS-LOG.md` + `next-steps-domain.md` | → A-2 WIP |
| WhatsApp número fake "ALTO" | Memoria WIP dueño | → A-3 WIP |
| Vercel Analytics CSP "MEDIO" | `02-hallazgos-detallados.md` SEC-CSP-01 | → A-4 WIP (Sprint 2 plan) |
| Phone JSON-LD `+525571553635` "MEDIO" | Confirmado placeholder por dueño 2026-04-23 — mismo bloqueante que A-3 WhatsApp | → A-8 WIP |
| Rate limit env verification "MEDIO" | `07-sprint-cierre-resultado.md` CON-RATELIMIT-01 | → C-1 cancelado |
| Sentry DSN hardcoded "BAJO" | `07-sprint-cierre-resultado.md` ERR-SENTRY-01 | → C-2 cancelado |
| WordPress dead code | No documentado previamente | → B-1 deuda nueva |
| Assets orphan public/ | No documentado previamente | → B-2 deuda nueva |
| SocialProof TODO testimonios | No documentado previamente | → B-4 deuda nueva |

### Mea culpa y protocolo

El audit técnico inicial ejecutado al cierre de Sprint B sobre-clasificó severidad por no haber consultado docs baseline antes del análisis. Tras cross-reference, **7 de 10 findings iniciales se reclasificaron** (5 a WIP bucket A: A-1 placeholders, A-2 email, A-3 WhatsApp, A-4 CSP, A-8 phone JSON-LD; 2 cancelados en bucket C: C-1 rate limit, C-2 Sentry). Solo 3 ítems quedaron como deuda nueva real (bucket B), todos severidad BAJA.

Lección registrada como **protocolo en memoria** (`feedback_audit_cross_reference.md`): antes de clasificar severidad en audits técnicas futuras, consultar `audit-evidence/` + `docs/04-ACTIVE-SPRINTS.md` + `docs/03-DECISIONS-LOG.md` + memoria WIP. Severidad solo se asigna a categoría "Deuda nueva" post cross-reference.

## 8. Próximo sprint sugerido

Sprint B cerró limpio técnicamente. Los items críticos visibles en la landing (placeholders visuales, WhatsApp, email domain, phone JSON-LD) son **WIP tracked en docs baseline** — **NO son blockers de merge ni de Sprint C**. La decisión del dueño es libre.

### Opciones disponibles, todas válidas

- **Sprint C como planeado** — FAQ distribuidores, `/distribuidores` page, Google Maps embed, trust signals, form B2B extendido. El audit inicial había sugerido NO hacer esto hasta fixear placeholders — esa recomendación **queda cancelada** post cross-reference.
- **Mini-sprint Auditoría Visual primero** — audit F1-F8 en cards + Hero Adobe Stock + microscopía + logo halo fix + audit aspiracional/real de copy. Útil si el dueño quiere visible premium antes de lanzar features B2B.
- **Sprint D directo** — saltarse Sprint C y cerrar todo lo visual + voice dual + fotografía en 1 sprint largo.
- **Preview deploy ahora mismo** — review visual de stakeholders sin tocar `main`. Permite validar Sprint B en browser antes de decidir próximo sprint.

### Acción única requerida pre-merge

**NINGUNA.** Todos los items WIP esperan externalidades (fotografía, DNS Kinsta, número B2B real, decisión branding). Decisión de merge/preview/próximo sprint completamente libre.

La deuda nueva (B-1, B-2, B-4) puede esperar sprint designado.

### Recomendación neutra

El dueño decide según prioridad comercial. Sin urgencia técnica de fixear "ALTOS" antes — esos ALTOS eran WIP ya planeados.

## 9. Estado de branch al cierre

- **Branch activa:** `feat/sprint-b-catalog-consolidation`
- **Commits:** 17, sin push, sin merge
- **Tests:** no existe script de tests (deuda conocida), lint y tsc en 0 errors a cada commit
- **Dev server:** verificado en `localhost:3006`, sin errores de consola nuevos introducidos por el sprint (los 2 errores CSP Vercel Analytics son pre-existentes — ticket SEC-CSP-01 existente)
- **Decisión pendiente del dueño:**
  - Merge a `feat/brand-identity` (regla CLAUDE.md #4 requiere OK explícito)
  - Preview deploy desde la branch sin mergear para review visual de stakeholders
  - Dejar esperando review sin push
- **Recomendación:** preview deploy antes de merge para ver en producción los cambios de Sprint B. Sin acciones pre-merge requeridas.
