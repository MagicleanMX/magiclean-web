# Sprint J — Home restructure + conversion microcopy — 2026-04-27

## Objetivo

Dejar la home lista para lanzamiento con enfoque híbrido: branding premium (empresa nueva, aspiracional), conversión B2B (retail, horeca, distribuidores) y apoyo a ventas en Amazon y Mercado Libre. Sin claims agresivos vs competencia, manteniendo estética Apple-clean.

Ejecutado en 2 PRs secuenciales contra `main`, ambos squash-merged tras review explícita del dueño.

---

## PR #38 — `refactor(home): restructure section order for launch`

**Commit final en main:** `1bc1c64`
**Branch (eliminada):** `feat/home-restructure-launch`
**Diff:** 9 archivos modificados, +134/-47

### Qué se hizo

Reestructura de la home de 13 → 10 secciones con foco B2B + e-commerce.

**Nuevo orden:**

1. Hero — 3 CTAs de lanzamiento (Amazon, Mercado Libre, Solicitar catálogo)
2. MarketplacesRibbon *(nuevo)* — "Disponible en marketplaces líderes" + 3 marketplaces con peso visual idéntico
3. HeroFibras
4. DistribuidoresCTA — subido en orden + título B2B + descargas PDF
5. ProductHeroMop
6. NeoShield
7. BeneficiosClave — anchor `#como-funciona` preservado (antes vivía en HowItWorks)
8. Logistica
9. Nosotros
10. ContactForm

**Cambios estructurales:**

- Hero: 2 CTAs viejos ("Hablar con ventas", "Ver portafolio") reemplazados por 3 de lanzamiento (Amazon primary, ML outline, catálogo ghost). URLs marketplace en `#` placeholder con TODO marcado.
- DistribuidoresCTA: tagline "Para distribuidores, horeca y retail" + absorción de 2 PDFs descargables desde `CatalogDownloadsHome` (que se descontinúa).
- BeneficiosClave: `id="como-funciona"` agregado para preservar link del Footer al desaparecer `HowItWorks` de la home.
- `page.tsx`: drop de imports de `ElProblema`, `HowItWorks`, `SocialProof`, `CatalogDownloadsHome`. Archivos preservados en disco para rollback seguro.

**Cambios de copy (aprobados explícitamente en mid-sprint):**

| Sección | Cambio |
|---|---|
| Hero | Tagline B2B agregado: "Para cocina, horeca, retail y uso profesional" |
| Hero CTAs | Jerarquía: Amazon primary · ML outline · Catálogo ghost |
| FibraHeroPanel | "Más información" → "Ver producto", "Cotizar" → "Comprar" |
| DistribuidoresCTA | "Accede a precios de distribuidor y catálogo completo" sobre el CTA |
| NeoShield | Stat label: "Más duración vs competencia" → "Hasta 3x mayor duración vs fibras convencionales" |
| Logistica | h2 reemplazado: "Cómo llega a tus clientes" → "Cobertura nacional para distribuidores y empresas" |
| ContactForm | h2 reemplazado: "Tu operación merece una solución diseñada para ella." → "Hablemos de tu operación" |

### Anchors preservados

`#tecnologia` · `#como-funciona` · `#logistica` · `#distribuidores` · `#nosotros` · `#contacto` · `#sistemas-mop-m1`

### Checks CI

| Check | Resultado |
|---|---|
| Analyze (javascript-typescript) | ✅ pass |
| Analyze (python) | ✅ pass |
| CodeQL | ✅ pass |
| Vercel deploy | ✅ pass |

---

## PR #39 — `copy(home): Fase 3 conversion microcopy`

**Commit final en main:** `ed17797`
**Branch (eliminada):** `feat/home-conversion-fase3`
**Diff:** 4 archivos modificados, +28/-2

### Qué se hizo

Microcopy de conversión + segmentación implícita en hero. Cero cambios de layout, estilo global o estructura.

**Cambios:**

| Sección | Cambio aplicado |
|---|---|
| Hero | 2 líneas de microcopy bajo los 3 CTAs (segmentación por intención sin pickers): "Compra inmediata o solicita soluciones para tu negocio" + "Para hogar, negocio o compras a volumen" |
| FibraHeroPanel | "Disponible en Amazon y Mercado Libre" en cada tarjeta del grid |
| DistribuidoresCTA | "Respuesta en menos de 24h hábiles" bajo el CTA primario |
| ContactForm | Trust copy reescrito: lista punteada → "Te contactamos directamente — sin intermediarios. Respuesta en menos de 24h hábiles." |

### Iteraciones intermedias (squashed en el merge)

El PR pasó por 4 commits antes del squash:

1. Microcopy inicial (Hero · FibraHeroPanel · DistribuidoresCTA · ContactForm)
2. Experimento de segmentación en 2 grupos visuales (descartado — agregaba complejidad visual)
3. Vuelta a fila única con 2 líneas de microcopy
4. Micro-ajuste final: "tu operación" → "tu negocio"

### Checks CI

| Check | Resultado |
|---|---|
| Analyze (javascript-typescript) | ✅ pass (1m5s) |
| Analyze (python) | ✅ pass (54s) |
| CodeQL | ✅ pass (2s) |
| Vercel deploy | ✅ pass |

---

## Commits finales en `main`

```
ed17797 copy(home): Fase 3 conversion microcopy (#39)
1bc1c64 refactor(home): restructure section order for launch (#38)
```

Base del sprint: `3a115a1` (Sprint I close).

---

## Decisiones tomadas durante el sprint

1. **Branching**: workflow real del repo migró a PRs directos contra `main` (los últimos PRs #34-#37 ya iban así). `feat/brand-identity` que CLAUDE.md menciona como base ya no existe. Decisión: derivar branches desde `main`. Ratificado por el dueño antes del PR #38. CLAUDE.md queda con regla desactualizada para limpiar en sprint posterior.
2. **Borrado físico de componentes huérfanos**: NO ejecutado en este sprint. `ElProblema.tsx`, `HowItWorks.tsx`, `SocialProof.tsx`, `CatalogDownloadsHome.tsx` quedaron en disco sin imports. Decisión del dueño: rollback más seguro durante lanzamiento.
3. **Merge real `BeneficiosClave + ElProblema + HowItWorks → PorQueMagiClean`**: NO ejecutado. Requiere copy nuevo aprobado. Solo se preservó el anchor `#como-funciona`.
4. **Segmentación visual del Hero**: implementada y descartada en el mismo PR. La separación en 2 grupos rompía la estética Apple. Final: fila única + 2 líneas de microcopy con voice diferenciada.
5. **Logística h2**: "agregar título" interpretado como reemplazo del h2 existente, dado que dos h2 rompen jerarquía. Sin objeción del dueño en review visual.
6. **ContactForm**: el eyebrow "Hablemos" + h2 "Hablemos de tu operación" quedó con redundancia conocida. No se tocó por estar fuera del scope explícito; flageado para sprint posterior.

---

## Deuda pendiente

### Bloqueada por externalidades

- **URLs reales de marketplace** en `Hero.tsx`. Hoy `HERO_CTAS.amazon` y `HERO_CTAS.mercadoLibre` apuntan a `#`. Hasta tener storefronts oficiales, el path principal del hero no convierte. Reemplazo es de 2 líneas en el `HERO_CTAS` const.

### Limpieza diferida

- **Borrado físico** de 4 componentes huérfanos (`ElProblema.tsx`, `HowItWorks.tsx`, `SocialProof.tsx`, `CatalogDownloadsHome.tsx`). Sin imports activos. Sprint dedicado de cleanup.
- **`FAMILIAS` deprecated** en `src/lib/products.ts` pendiente de eliminar (T12, ya marcado en CLAUDE.md regla #7).

### Decisiones de copy/UX pendientes

- **Sweep de consistencia de verbos CTA**: la home usa hoy 6 verbos distintos (Comprar, Ver, Solicitar, Cotizar, Hablar, Quiero ser). Set canónico propuesto: Comprar / Ver producto / Solicitar catálogo / Hablar con ventas. Cambios concretos necesarios:
  - `ProductHeroMop` "Cotizar este sistema" → "Solicitar cotización" o "Hablar con ventas"
  - `DistribuidoresCTA` "Quiero ser distribuidor" → "Aplicar como distribuidor" o "Hablar con ventas"
- **"Comprar" en FibraHeroPanel** routea a `/#contacto`, no a marketplace. UX-lie pendiente. Mitigado parcialmente con la nueva microcopy "Disponible en Amazon y Mercado Libre".
- **"Solicitar catálogo" en Hero** va al formulario de contacto. Catálogo PDF ya existe en DistribuidoresCTA. Posible split: "Descargar PDF" (instantáneo) vs "Solicitar versión impresa" (formulario).
- **ContactForm eyebrow + h2 redundancia**: "Hablemos" + "Hablemos de tu operación".
- **Falta proof-social cerca de CTAs hero**: sin "★ ratings · X reseñas". Lift típico 10-15% en CTR.

### CLAUDE.md

- **Regla de branching desactualizada**: `feat/brand-identity` ya no existe. Workflow real es PR directo a `main`. Actualizar regla #4 / sección "Branch strategy" en próxima edición.

---

## Estado del producto al cierre

- Home rediseñada en producción (Vercel auto-deploy del último merge).
- 10 secciones en orden lanzamiento, todas con anchors funcionales.
- Microcopy de conversión activo en Hero · FibraHeroPanel · DistribuidoresCTA · ContactForm.
- 2 CTAs de marketplace con URL placeholder (`#`) — bloqueador externo.
- `npm run build` verde, 35 páginas estáticas generadas (igual que antes del sprint).

---

## Lecciones / notas para el futuro

- **Iteración rápida sobre Hero CTAs**: pasamos por 3 estructuras (separados / 2 grupos / fila única) en el mismo sprint. La estética Apple penaliza la complejidad visual; cuando dudes, default a fila única + microcopy.
- **Squash merge limpia experimentos**: el PR #39 tuvo 4 commits con un experimento descartado en el medio. El squash dejó un commit final limpio en `main`. Bueno para reviews, malo para bisect — pero acceptable en cambios de copy.
- **Pre-flight de branching**: detectar que `feat/brand-identity` no existía ANTES de empezar evitó fricción. Reforzar el chequeo `git branch -a` como parte del paso 0 de cualquier sprint.
- **Conservar archivos huérfanos durante lanzamiento**: dejar `.tsx` sin imports es deuda visible pero rollback seguro. Limpiar post-launch cuando la rampa de tráfico baje.

---

## Siguiente sprint sugerido

**Sprint K — CTA verb consistency + URLs reales + cleanup**

Trabajo concreto:

1. Recibir URLs reales de Amazon y Mercado Libre del dueño y reemplazar `HERO_CTAS` placeholders.
2. Sweep de verbos CTA: normalizar `ProductHeroMop`, `DistribuidoresCTA`, `Nosotros` al set canónico de 4 verbos.
3. Borrado físico de los 4 componentes huérfanos.
4. Actualizar CLAUDE.md regla de branching con el workflow real (PR contra `main`).
5. Decisión sobre eyebrow redundante en ContactForm.

Bloque opcional si hay capacidad:

6. Investigación: factibilidad de mostrar rating/reseñas reales de Amazon/ML cerca de los CTAs del hero.

---

Última actualización: 2026-04-27
