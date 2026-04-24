# Logo MagiClean — Frequency & Contrast Audit

**Fecha:** 2026-04-24
**Scope:** landing pública servida desde `src/app/page.tsx` + legal pages + metadata + shell del browser.
**Método:** inventario estático (grep + lectura JSX/Tailwind de cada surface). Sin screenshots — audit sólo-lectura.
**Branch activa:** `feat/sprint-c-real-data-integration` (PR #16 pending).

---

## 1. Inventario completo — 6 instancias

| # | Archivo:línea | Asset usado | Tipo | Visible al usuario |
|---|---|---|---|---|
| 1 | `src/components/Navbar.tsx:201` | `/images/brand/logo/magiclean-logo.webp` | wordmark completo color | ✅ todas las rutas, siempre en viewport (sticky top) |
| 2 | `src/components/Footer.tsx:82` | `/images/brand/logo/magiclean-logo.webp` | wordmark completo color | ✅ todas las rutas al scrollear al fondo |
| 3 | `src/components/StickyCtaBar.tsx:58` | `/images/brand/isotipo/magiclean-mc.webp` | **isotipo MC** (escudo, no wordmark) | ✅ desktop con scroll > 300px y fuera de `#contacto` |
| 4 | `src/app/opengraph-image.tsx:17` | `public/images/brand/logo/magiclean-logo.png` (build-time) | wordmark completo color, PNG para OG render | ✅ al compartir URL en FB/Twitter/LinkedIn/Slack (1200×630) |
| 5 | `src/app/icon.png` | asset estático | favicon | ✅ tab del browser, historial, bookmarks |
| 6 | `src/app/apple-icon.png` | asset estático | touch icon iOS | ✅ solo si usuario "Add to Home Screen" en iOS |

### Surface adicional — referenciado pero NO renderiza imagen (SEO metadata)

| Archivo:línea | Uso | Valor |
|---|---|---|
| `src/app/layout.tsx:82` | JSON-LD `Organization.logo` | `${siteUrl}/images/logo.svg` |
| `src/app/layout.tsx:96` | JSON-LD `Brand.logo` | `${siteUrl}/images/logo.svg` |

Ambas URLs apuntan a `/images/logo.svg` — ver Hallazgo #2 abajo.

---

## 2. Análisis de contraste — instancias visibles 1, 2, 3

### Instancia 1 — Navbar (`src/components/Navbar.tsx:190-208`)

| Atributo | Valor |
|---|---|
| **Contenedor** | `<nav>` con `bg-white` + (cuando scrolleado) `border-b border-[#E8EAED] shadow-[0_1px_12px_rgba(0,0,0,0.06)]` |
| **Color de fondo** | `#FFFFFF` (blanco puro) |
| **Tamaño renderizado** | `h-8 lg:h-10 w-auto` → **32px alto mobile / 40px alto desktop** (ancho auto-proporcional desde 2000×610 natural) |
| **Variante usada** | wordmark color (azul + rojo acento) |
| **Riesgo contraste** | **LOW** — wordmark color diseñado para fondo claro. Esta es la instancia "de casa" del logo, lee bien |
| **Caveat** | Asset fuente tiene ghost brackets grises (ver Hallazgo #3) que se notan más sobre blanco puro que sobre fondos pigmentados |
| **Frecuencia de exposición** | Máxima — sticky en top, presente en el 100% del tiempo que el usuario está en el sitio, salvo rutas que no montan Navbar (error/loading puros, pero `aviso-de-privacidad` y `terminos-de-uso` SÍ montan Navbar) |

### Instancia 2 — Footer (`src/components/Footer.tsx:71-88`)

| Atributo | Valor |
|---|---|
| **Contenedor** | `<footer>` con `bg-[#0A1628] text-white` |
| **Color de fondo** | `#0A1628` (navy oscuro, casi negro — dark slate) |
| **Tamaño renderizado** | `h-12 w-auto` → **48px alto** (ancho auto-proporcional) |
| **Variante usada** | wordmark color (el mismo asset que Navbar) |
| **Riesgo contraste** | **HIGH** — el asset es color-over-light: contiene glifos en azul brand (probablemente `#0076FF` o cercano) que se aproximan mucho al fondo navy `#0A1628`. El rojo acento sí sobrevive al contraste, pero el cuerpo azul del wordmark se apaga |
| **Evidencia externa** | `validation.png` (referenciado por Jacobo, no en repo) mostró este defecto: el wordmark azul "desaparece" sobre fondo brand azul oscuro |
| **Frecuencia de exposición** | Al final de la landing — usuarios que hacen scroll completo, que en B2B es proporción relevante (mayor que consumer) |

### Instancia 3 — StickyCtaBar (`src/components/StickyCtaBar.tsx:42-76`)

| Atributo | Valor |
|---|---|
| **Contenedor** | `<motion.div>` con `bg-[#1A1A1A]` + `borderTop: '1px solid rgba(255,255,255,0.08)'` |
| **Color de fondo** | `#1A1A1A` (near-black) |
| **Tamaño renderizado** | `h-7 w-auto` → **28px alto** (ancho auto-proporcional desde 1670×975 natural) |
| **Variante usada** | **isotipo MC** (escudo monograma, no wordmark). Asset distinto al 1 y 2 |
| **Visibilidad** | `hidden md:flex` — solo desktop ≥ 768px. En mobile la barra renderiza sin isotipo (solo el CTA "Solicitar cotización") |
| **Riesgo contraste** | **MEDIUM** — el isotipo MC contiene glifos brand blue + rojo sobre fondo del escudo; sobre `#1A1A1A` puede leer razonable pero los detalles finos del escudo se compactan a 28px. Además, la paleta brand blue sobre near-black tiene el mismo patrón que la Instancia 2 (blue-over-dark = low contrast) |
| **Frecuencia de exposición** | Media — aparece post-scroll 300px, desaparece cuando `#contacto` entra al viewport. Ventana temporal entre hero-end y contact-form |

---

## 3. Hallazgos

### Hallazgo #1 — No existe variante blanca/monocroma del logo en assets

**Qué:** en `public/images/brand/` solo hay un set de archivos:
```
logo/magiclean-logo.png + .webp  (wordmark color, único)
isotipo/magiclean-mc.png + .webp  (isotipo color, único)
```

No hay `magiclean-logo-white.webp`, ni `magiclean-logo-mono.webp`, ni SVG vectorial. Todas las instancias — Navbar (blanco), Footer (navy), StickyCtaBar (near-black) — usan **el mismo asset color**, pensado originalmente para fondo claro.

**Impacto:** los dos surfaces oscuros (Footer, StickyCtaBar) arrastran riesgo de contraste inherente. El Navbar sobre blanco es el único caso donde el asset está en su contexto natural.

**Costo de remediar:** producir 1-2 variantes adicionales (blanco sólido + negro sólido) de cada asset. Estimado: 30 min si hay SVG fuente editable; 2-3h si hay que reconstruir desde raster.

### Hallazgo #2 — 404 silenciosa en JSON-LD: `/images/logo.svg` no existe

**Qué:** `src/app/layout.tsx:82` y `:96` ambas declaran:

```tsx
logo: `${siteUrl}/images/logo.svg`,
```

Pero el árbol real es:

```
public/images/brand/logo/magiclean-logo.png
public/images/brand/logo/magiclean-logo.webp
```

No hay `public/images/logo.svg`. Requests a `https://magiclean.mx/images/logo.svg` devuelven 404.

**Impacto:** Google Knowledge Graph + rich snippets consumen este campo para renderizar el logo oficial en Knowledge Panel, Google Business Profile, resultados enriquecidos. Hoy el feed apunta a un asset inexistente → Google probablemente cachea "no logo available" o degrada a un generic favicon fallback. **Pérdida de brand signaling en SEO.**

**Costo de remediar:** una de dos opciones:
1. Generar `public/images/logo.svg` vectorial y servirlo en esa ruta (fix "quirúrgico", respeta el schema.org)
2. Cambiar las 2 líneas de `layout.tsx` a `/images/brand/logo/magiclean-logo.png` o `.webp` (schema.org acepta PNG/WebP también — menos "limpio" pero funciona)

**Nota:** este hallazgo **no es visual** (no lo ve un usuario cargando la landing), pero sí es consecuencia del estado actual del logo y pertenece al audit. Sprint D u otro dedicated sprint.

### Hallazgo #3 — Asset fuente `magiclean-logo.webp` tiene corchetes grises fantasma debajo del wordmark

**Qué:** según `validation.png` (referencia externa que Jacobo tiene aparte — no está en el repo), el asset exportado incluye **corchetes grises fantasma** debajo del wordmark. Es defecto del SVG fuente o del export (alpha sucio / artefactos de slicing).

**Evidencia en repo:** no verificable sin abrir el archivo en un editor de imagen o browser (el grep + análisis JSX no detecta artefactos visuales). Se acepta como hallazgo basado en observación externa del dueño.

**Impacto visual:**
- Sobre fondo blanco (Navbar): los corchetes grises son visibles como "ruido" bajo el wordmark. Baja la percepción de calidad del asset, especialmente en displays HiDPI donde el artefacto se vuelve más pronunciado.
- Sobre fondos oscuros (Footer, StickyCtaBar): los corchetes se atenúan contra el fondo pero pueden crear una "sombra" no intencional.

**Costo de remediar:** re-exportar desde el SVG fuente con alpha limpio. Si no hay SVG fuente editable, requiere reconstruir el asset desde cero (tracing o rebuild tipográfico). Estimado: 15 min con fuente SVG; 2-4h sin fuente.

**Relación con Hallazgo #1:** si se opta por generar variantes blanca/monocroma (Hallazgo #1), el re-export corrige ambos defectos en la misma pasada.

---

## 4. Decisión pendiente — dos opciones

### Opción A — Arreglar SVG fuente + crear variante blanca para fondos oscuros

**Alcance técnico:**
1. Re-exportar `magiclean-logo.{png,webp}` con alpha limpio (elimina corchetes fantasma, Hallazgo #3)
2. Crear variantes adicionales: `magiclean-logo-white.{png,webp}` (wordmark monocromo blanco para fondos oscuros)
3. Opcional: `magiclean-logo.svg` para satisfacer JSON-LD `logo` (Hallazgo #2) — o dejar el schema apuntando a PNG
4. Editar 2 componentes:
   - `Footer.tsx:82` → usar `magiclean-logo-white.webp`
   - `StickyCtaBar.tsx:58` → usar isotipo en variante clara (o wordmark blanco, según decisión estética)

**Pros:**
- Preserva la identidad visual del wordmark actual (no re-diseño de marca)
- Resuelve los 3 hallazgos en una sola intervención técnica
- Bajo riesgo de scope creep

**Contras:**
- Depende de acceso al SVG fuente editable — si no existe, costo sube sustancialmente
- Acumula 2 variantes adicionales de asset → más archivos que mantener cuando el branding evolucione
- No resuelve el tema estratégico de si el wordmark actual es el deseado a largo plazo (Jacobo tiene una decisión branding abierta — ver `project_magicclean_wip.md` item 7)

### Opción B — Reemplazar logo bitmap por wordmark tipográfico (sacar isotipo)

**Alcance técnico:**
1. Reemplazar las instancias del logo bitmap por un `<span>`/`<h1>` con el texto `MAGICLEAN` en la tipografía de marca (probablemente Montserrat 900 o similar del stack Tailwind ya configurado)
2. Control total del color vía `text-white` / `text-[#1A1A1A]` / `text-[#0076FF]` según surface — sin necesitar assets per surface
3. StickyCtaBar: isotipo MC se convierte en decisión separada — mantenerlo como asset visual o reemplazarlo también por texto "MC" estilizado
4. Componentes afectados: mismos 3 visibles (Navbar, Footer, StickyCtaBar) + OG image que sigue necesitando asset de imagen render-time

**Pros:**
- Cero problema de contraste (color del texto es CSS, se adapta a cada fondo sin assets adicionales)
- Cero problema de corchetes fantasma (no hay asset que los tenga)
- Zero dependencies on source SVG editor access
- Menor peso en deploy (se remueven 2 assets, se agrega 0)
- Alineado con decisión branding abierta "wordmark puro vs rediseño profesional"

**Contras:**
- Pérdida de identidad visual del wordmark actual diseñado (si tiene elementos gráficos específicos como el tilde/acento/dot sobre la "i")
- OG image sigue necesitando asset (Facebook/Twitter no renderizan HTML, requieren imagen fija) — habría que generar el wordmark tipográfico como PNG para OG de todas formas
- Afecta percepción de madurez de marca si el wordmark actual tiene trabajo gráfico significativo
- Decisión tiene relación directa con item 7 de `project_magicclean_wip.md` (Logo MagiClean — decisión pendiente del dueño: rediseño profesional vs wordmark puro)

### Criterio recomendado para decidir

- **Si existe SVG fuente editable** + si Jacobo quiere preservar la identidad visual actual → **Opción A**, bajo costo, resuelve todo
- **Si no hay SVG fuente** + si Jacobo ya estaba inclinado hacia "wordmark puro" en la decisión branding pendiente → **Opción B**, aprovecha el impulso de simplificar
- **Ninguna opción resuelve la decisión estratégica branding** — ambas son tácticas sobre el estado actual. La decisión de largo plazo (rediseñar con agencia vs wordmark puro) queda separada.

---

## Próximos pasos (cuando Jacobo decida)

- [ ] Confirmar disponibilidad de SVG fuente editable (determina costo de Opción A)
- [ ] Decidir A vs B
- [ ] Si A: producir assets + 2 edits de componentes + opcional `logo.svg` para JSON-LD
- [ ] Si B: diseño tipográfico in-code + 3 edits de componentes + regenerar OG image
- [ ] En cualquier caso: arreglar Hallazgo #2 (JSON-LD 404) — es independiente y siempre gana resolverlo

---

## Referencias cruzadas

- `project_magicclean_wip.md` item 7 "Logo MagiClean — decisión pendiente" (branding estratégico)
- `CLAUDE.md` regla #5 "NO borrar logos, badges o assets de marca" (aplica: cualquier remediación debe respetar esto)
- `validation.png` (fuera de repo — Jacobo): evidencia visual de los defectos #2 contraste Footer + #3 corchetes fantasma
