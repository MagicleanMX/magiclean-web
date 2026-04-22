# Sprint 2 — Auditoría de diseño · MagicClean

**Fecha:** 2026-04-20
**Alcance:** Home completa (`src/app/page.tsx`) + componentes de la narrativa de marca + tokens globales.
**Metodología:** lectura de 12 secciones de home + tokens en `globals.css` + layout (fonts) + data en `src/lib/products.ts` + inventario de assets en `public/`.
**No incluye:** rutas legales, 404, error boundaries, formulario de contacto (solo chrome visual).
**Nota:** la skill `frontend-design` no está disponible en este entorno (`/mnt/skills/public/frontend-design/SKILL.md` no existe). La auditoría usa heurísticas estándar de diseño editorial + sistemas de diseño.

---

## A. Resumen ejecutivo

MagicClean tiene **un sistema de diseño sólido y coherente pero visualmente incompleto**. La arquitectura tipográfica (Playfair editorial + Montserrat sans), la paleta (azul `#0076FF` / rojo acento `#FF2B2B` / deep `#0A1628`) y el ritmo vertical de secciones están bien definidos y se aplican con consistencia. Lo que falla no es el sistema — es la **ausencia de producción fotográfica**.

**Diagnóstico en una línea:** el sitio está construido como un catálogo premium, pero renderiza como un wireframe estilizado porque **9 de 12 secciones tienen placeholders donde deberían ir fotografías**.

**Semáforo:**

| Dimensión              | Estado   | Observación                                                                                                                       |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Tokens de color        | 🟢 OK    | Paleta definida, aplicada con consistencia. Solo el overlay en DistribuidoresCTA rompe la jerarquía (usa `#0060DF` en vez de `#0076FF`). |
| Tipografía             | 🟢 OK    | Pairing editorial sólido. Escala razonable. Falta normalizar algunos clamps manuales.                                             |
| Ritmo vertical         | 🟡 Medio | Dos utilitarios (`.section-standard`, `.section-premium`) pero la Hero y ProductHero no los usan — inconsistencia.                |
| Assets de producto     | 🔴 Crítico | 2 imágenes reales (Hero + F4.jpg sin wire-up) vs. **~11 slots vacíos**.                                                         |
| Peso de imágenes       | 🔴 Crítico | `hero-main.png` = 5.4 MB. `F4.jpg` = 2.2 MB. Ambos deberían ser WebP/AVIF < 400 KB.                                              |
| Logos de marketplaces  | 🟡 Medio | Solo texto — sin logos reales de MercadoLibre / Amazon / Walmart. Resta credibilidad vs. competencia.                             |
| OG image / social      | 🟡 Medio | Placeholder genérico documentado en `layout.tsx:54` (`TODO(design)`).                                                             |
| Logo de marca          | 🟡 Medio | Letra "M" en círculo rojo + wordmark tipográfico. Funciona pero no aporta marca propia.                                          |
| Motion / micro-interacciones | 🟢 OK | Framer-motion con easing `[0.16, 1, 0.3, 1]` consistente. `useInView` para counters.                                         |
| Accesibilidad visual   | 🟢 OK    | Ya hubo sprint previo de WCAG AA (commit `5e6df48`). Contraste y focus bien.                                                      |

---

## B. Hallazgos por sección

### 1. Hero (`src/components/Hero.tsx`)

**Funciona:**
- Split 52/48 con split visual fuerte, tipografía editorial grande (clamp 2.8rem → 5.4rem).
- Eyebrow azul con dot, CTAs primario + secundario bien diferenciados.
- Stats row inferior con borde top = jerarquía clara.
- Channel ticker negro al fondo = prueba de canales.

**Problemas:**
1. **`hero-main.png` = 5.4 MB** → bloquea LCP. Debería ser WebP ~300–450 KB.
2. **Alt text desalineado:** dice "Fibra verde flotando sobre mármol" pero no sabemos si el foto actual es esto. Si el foto no matchea, es misinformación para screen readers.
3. **Aspect ratio mobile `4/5`** — ok, pero el contenido del header (68px fijo) se come parte del viewport y en móvil el orden es texto-arriba / foto-abajo, lo cual diluye el impacto visual premium.
4. **Stats row oculto en móvil** (`hidden sm:flex`) — se pierde credibilidad numérica donde más se necesita.
5. No hay indicador de scroll / chevron → usuario no sabe que hay más abajo.

**Prioridad:** 🔴 **CRÍTICO** (por el peso de imagen).

---

### 2. ElProblema (`src/components/ElProblema.tsx`)

**Funciona:**
- Eyebrow rojo conceptual ("el problema real") con iconos rojos en cajas `#FFF0F0` = coding visual consistente (rojo = fricción).
- Grid de 3 columnas con borde superior 2px — patrón editorial tipo New York Times.
- Headline "Tu proveedor actual te está costando más de lo que crees" = copy de alta calidad.

**Problemas:**
1. Sección completamente textual — la única sin soporte visual. En contexto de 12 secciones donde todas tienen imagen, aquí **el "salto" entre imagen/texto funciona a favor** (aire visual). No es problema, es decisión.
2. Los iconos `lucide-react` (`TrendingDown`, `ShieldOff`, `Layers`) son genéricos — no comunican el problema específico.

**Prioridad:** 🟢 **BAJO**.

---

### 3. NeoShield (`src/components/NeoShield.tsx`)

**Funciona:**
- Fondo `#0A1628` con glows decorativos = dramatismo / "tecnología seria".
- Counter animado con easing cúbico (on viewport) = interacción pulida.
- Stats grid 2×2 con hover state sutil (`#0d1f38`).

**Problemas:**
1. **SLOT de imagen tecnología vacío** (línea 87) — "Microscopía NeoShield™ placeholder". La credibilidad de la tecnología depende de una prueba visual. Hoy es un icon lupa genérico → contradice el claim.
2. Solo aparecen 4 de los 6 `NEOSHIELD_STATS` visibles (grid 2×2). Hay 6 stats en data → ¿se truncan?
3. El bloque de stats no tiene separación clara con el storytelling de la izquierda — pueden leerse como "flotando".

**Prioridad:** 🔴 **CRÍTICO** (la tecnología es el corazón del pitch).

---

### 4. BeneficiosClave (`src/components/BeneficiosClave.tsx`)

**Funciona:**
- 3 cards con icono azul + número gigante + título + descripción + `NeoShieldBadge`.
- Jerarquía numérica (`3×`, `99%`, `30%`) con clamp fluido = legible en cualquier breakpoint.
- Fondo `#FAFAFA` separa sutilmente del white section anterior.

**Problemas:**
1. Cards **muy verticales y con mucho aire** — ocupan pantalla completa en desktop. Podrían beneficiarse de una mini-ilustración o producto shot pequeño que refuerce cada beneficio.
2. El `NeoShieldBadge` se repite al pie de cada card — redundancia visual (ya sabemos que los 3 beneficios vienen de NeoShield).

**Prioridad:** 🟡 **MEDIO** (funciona sin fotos, pero se siente "plano").

---

### 5. Categories (`src/components/Categories.tsx`)

**Funciona:**
- Grid 3 columnas con cards `aspect-3/4` = ratio producto editorial.
- Color por familia (`f.color`, `f.accentColor`) — sistema de diseño paramétrico elegante.
- Hover CTA que sube desde el bottom = micro-interacción premium.
- Ghost-letter typography (letra gigante del primer modelo) = fallback estilizado inteligente.

**Problemas:**
1. **6 slots de imagen completamente vacíos.** Los códigos (F1, F2, M1, etc.) son bonitos pero no muestran producto. **Esta es la sección más perjudicada sin fotos** — es literalmente el "catálogo".
2. El usuario no sabe cómo se ve un "Borrador Mágico" ni una "Fibra Esponja Dual" → fricción directa para conversión B2B.
3. `anchor: '#contacto'` para 4 de 6 familias — llevan al formulario en vez de a detalle. Es OK para MVP pero el usuario B2B querría ver el producto antes.

**Prioridad:** 🔴 **CRÍTICO**. **La prioridad #1 de toda la producción fotográfica.**

---

### 6. ProductHeroF4 (`src/components/ProductHeroF4.tsx`)

**Funciona:**
- Split layout con "F4" tipográfico gigante como héroe visual.
- Dos swatches de material (verde abrasivo + beige esponja) = representación simbólica de la dualidad.
- Blockquote con border-left azul = prestigio editorial.

**Problemas:**
1. **`public/images/products/F4.jpg` EXISTE pero NO está wired-up.** La línea 26 tiene la imagen comentada. **Hay foto lista sin usar.**
2. Los swatches (cuadrados verde + beige) son simpáticos pero simulan un producto — **cuando hay foto real del F4 disponible**. Es un bug de assets, no de diseño.
3. `F4.jpg` = 2.2 MB sin optimizar → mismo problema de peso que el hero.

**Prioridad:** 🔴 **CRÍTICO** (quick win — solo hay que wire-up el asset existente).

---

### 7. ProductHeroMop (`src/components/ProductHeroMop.tsx`)

**Funciona:**
- Fondo `#0A1628` = coherente con NeoShield (misma "familia de sección tecnológica").
- Split M1 / M2 con misma estructura — comparable lado a lado.
- Pills de "También disponibles" (M5, M6, M9) = bridge al resto del portafolio sin saturar.

**Problemas:**
1. **Slots M1 y M2 vacíos.** Los mops son producto físico grande — sin foto no transmites "cubo con pedal" ni "sistema de escurrido". Dos productos flagship sin representación visual.
2. El SVG de cámara + "imagen próximamente" en los placeholders está honesto pero admite la carencia al usuario.
3. Microfibra NeoShield™ mencionada en specs — ninguna evidencia visual del material.

**Prioridad:** 🔴 **CRÍTICO**.

---

### 8. SocialProof (`src/components/SocialProof.tsx`)

**Funciona:**
- Marketplaces como pills grandes con hover azul — legible, ordenado.
- Métricas con tipografía gigante (`clamp(2.4rem, 5vw, 3.6rem)`).
- CTA "Únete a la red" negra con hover azul = jerarquía clara.

**Problemas:**
1. **Pills textuales "MercadoLibre / Amazon / Walmart"** — competidores serios muestran logos reales (requiere guidelines de uso de cada marketplace). Hoy se lee como un wireframe.
2. **TODO en código** (línea 66): "Agregar testimonios de distribuidores reales". Sin testimonios, social proof queda a medias.
3. 3 métricas solamente — se siente "thin" vs. el alarde de "23 modelos · 3 marketplaces".

**Prioridad:** 🟡 **MEDIO** (logos = legal; testimonios = contenido).

---

### 9. HowItWorks (`src/components/HowItWorks.tsx`)

**Funciona:**
- 01–04 con números gigantes gris claro que cambian a azul pálido en hover de grupo.
- Border-top 2px que pasa a azul en hover = patrón consistente con ElProblema.
- Serif para títulos de paso = ritmo editorial.

**Problemas:**
1. Sección puramente textual — similar a ElProblema, pero aquí **sí se notaría** que no hay imagen porque estamos a 2/3 de la página y el usuario ya vio muchas secciones visuales.
2. Los 4 pasos son genéricos ("Consulta → Propuesta → Entrega → Soporte") — aplicables a cualquier negocio. No hay diferenciación visual de marca.

**Prioridad:** 🟢 **BAJO**.

---

### 10. DistribuidoresCTA (`src/components/DistribuidoresCTA.tsx`)

**Funciona:**
- Fondo `#0060DF` (azul más saturado que primary) = pattern interrupt antes de Nosotros.
- Grid de ciudades con `MapPin` icons = tangible, territorial.
- CTA blanco sobre azul = contraste máximo.

**Problemas:**
1. **Color de fondo inconsistente**: usa `#0060DF` en lugar del token `--color-primary: #0076FF` o `--color-primary-dark: #0052CC`. Fuera del sistema.
2. Eyebrow rojo (`#FF2B2B`) sobre fondo azul profundo — funciona pero es la **única sección donde el rojo se usa como eyebrow** (resto del sitio usa rojo para iconos de problema o badges de "más popular"). Incongruencia semántica.
3. Sin mapa visual de México — solo pills de ciudades. Un mapa reforzaría la presencia territorial.

**Prioridad:** 🟡 **MEDIO**.

---

### 11. Nosotros (`src/components/Nosotros.tsx`)

**Funciona:**
- Headline con italic azul para énfasis (`El estándar que faltaba. Lo estamos construyendo.`).
- Stats 4 columnas grandes + divider + valores 2 columnas = ritmo variado.
- Marketplaces al pie refuerzan social proof.

**Problemas:**
1. **Banner corporativo 21:9 vacío** (línea 41) — "Fotografía corporativa próximamente". Es la única foto panorámica del sitio → máxima superficie, máximo vacío.
2. Los 4 `NOSOTROS_STATS` se cruzan con los del Hero (también son "3 años", "23 modelos", "3 marketplaces") → redundancia numérica.
3. Marketplaces aquí aparecen como texto centrado gris — tercera vez que aparecen (Hero, SocialProof, Nosotros). Overuse.

**Prioridad:** 🟡 **MEDIO** (por el banner vacío).

---

### 12. Footer (`src/components/Footer.tsx`)

**Funciona:**
- Fondo `#0A1628` + 4 columnas (brand / productos / empresa / contacto).
- Logo repetido + claim + badges + social icons + legal row.
- Todo con espaciado y tipografía consistentes.

**Problemas:**
1. Logo vuelve a ser el círculo rojo con "M" (tercera instancia — Navbar, StickyCtaBar, Footer). **El logo como sistema es débil**: una letra en un círculo no es una marca diferenciada. Competidores (3M, Scotch-Brite, Vileda) tienen logos distintivos.
2. Íconos sociales son SVG inline — peso bajo pero duplican los SVGs también presentes en Instagram / Facebook marks. Podría usarse `lucide-react` si ya está cargado.

**Prioridad:** 🟡 **MEDIO** (logo es un rediseño aparte, no urgente para Sprint 2).

---

### 13. Navbar + StickyCtaBar (chrome)

**Funciona:**
- Navbar con mega-menú de 4 columnas + producto destacado + footer del panel. Muy bien ejecutado.
- Mobile menu con focus-trap, ARIA roles, keyboard navigation completa.
- StickyCtaBar aparece a 300px de scroll y desaparece cuando `#contacto` está visible — smart UX.

**Problemas:**
1. El mega-menú tiene 4 columnas con ~20 productos — es mucha información para hover; en desktop grande (>1440px) funciona, en laptop 1280px se siente cargado.
2. StickyCtaBar solo tiene 1 CTA ("Solicitar cotización"). Oportunidad perdida de CTA secundario (ej. "Ver portafolio").

**Prioridad:** 🟢 **BAJO**.

---

## C. Recomendaciones específicas (qué cambiar y cómo)

### C.1 — Sistema de diseño (refinamiento)

| # | Cambio | Cómo |
|---|--------|------|
| D1 | Eliminar token muerto `--section-y: 9rem` | En `globals.css` línea 18. No se usa. |
| D2 | Normalizar fondo azul de DistribuidoresCTA | Cambiar `#0060DF` a `#0052CC` (token `--color-primary-dark`) o `#0076FF` (token primary). |
| D3 | Decidir uso semántico del rojo (`#FF2B2B`) | Hoy se mezclan 3 usos: problemas (ElProblema), badges "más popular" (F4), eyebrows (DistribuidoresCTA). Consolidar a **solo badges / acentos de urgencia**. Cambiar eyebrow de DistribuidoresCTA a azul o blanco. |
| D4 | Añadir token `--color-primary-saturated: #0060DF` si se decide mantener el azul actual de DistribuidoresCTA | Si el azul saturado es intencional, hacerlo token explícito. |
| D5 | Homologar paddings verticales de ProductHeroF4 y ProductHeroMop con `.section-standard` | Hoy usan paddings ad-hoc (`py-16`, `py-20`) — inconsistente. |

### C.2 — Fotografía y assets

| # | Cambio | Cómo |
|---|--------|------|
| F1 | Wire-up de `F4.jpg` existente | Descomentar `Image` en `ProductHeroF4.tsx:26` + optimizar JPG → WebP. **Quick win.** |
| F2 | Optimizar `hero-main.png` | Convertir a WebP progresivo, target < 450 KB. Considerar AVIF fallback. |
| F3 | Producción fotográfica de 6 familias (Categories) | Ver especificaciones técnicas en sección **E**. |
| F4 | Fotografía M1 + M2 hero | Ver sección **E**. |
| F5 | Activo de tecnología NeoShield (microscopía o abstracto) | Macro/render/stock calificado. Ver sección **E**. |
| F6 | Banner panorámico Nosotros | 21:9, operación/equipo/producto apilado. Ver sección **E**. |
| F7 | Logos reales de marketplaces | Descargar assets oficiales de MercadoLibre Brand Center, Amazon Brand Usage Guidelines, Walmart Media Kit. **Revisar licencias de uso.** |
| F8 | OG image final | Reemplazar `/og-image.jpg` placeholder. 1200×630. Composición: producto destacado + claim + logo. |

### C.3 — UX visual puntual

| # | Cambio | Cómo |
|---|--------|------|
| U1 | Hero: mostrar stats también en móvil | Quitar `hidden sm:flex` — stats siempre visibles. |
| U2 | Hero: añadir indicador de scroll | Chevron animado abajo-centro. |
| U3 | Hero: validar alt text vs. imagen real | Si la foto no es "fibra verde sobre mármol", actualizar alt. |
| U4 | NeoShield: revisar por qué solo 4 de 6 stats se ven | Grid `grid-cols-2` con 6 items se convierte en 3×2 — hoy está diseñado para 4. Decidir: mostrar 6 o reducir data a 4. |
| U5 | BeneficiosClave: remover `NeoShieldBadge` repetido | Dejarlo solo en la primera card o ponerlo una sola vez en el header de la sección. |
| U6 | Categories: los 4 items que enlazan a `#contacto` deberían ir a anchors de producto o a una página detalle | Fase 2 post-Sprint — requiere páginas `/productos/[slug]`. |
| U7 | SocialProof: sumar 2–3 testimonios reales (distribuidor + HORECA) | Bloque nuevo con foto del cliente + quote + nombre + empresa. |
| U8 | DistribuidoresCTA: añadir mapa de México con puntos de presencia | SVG simple con dots en las 6 ciudades listadas. |
| U9 | Nosotros: quitar stats duplicadas del Hero | Reemplazar las 4 stats por métricas únicas (ej. "+ de 100 clientes activos", "3 líneas de producto", etc.). |

---

## D. Gap visual — qué falta por sección

| Sección         | Asset faltante                                 | Tipo                  | Urgencia |
| --------------- | ---------------------------------------------- | --------------------- | -------- |
| Hero            | Foto hero optimizada (el PNG actual pesa 5.4MB) | Producto editorial    | 🔴       |
| ElProblema      | — (textual por diseño)                          | —                     | 🟢       |
| NeoShield       | Microscopía / render tecnológico NeoShield™    | Científico / abstracto| 🔴       |
| BeneficiosClave | (opcional) mini-illustración por beneficio     | Iconografía extendida | 🟡       |
| Categories      | 6 fotos de familia de producto                 | Producto flat-lay     | 🔴       |
| ProductHeroF4   | Foto F4 dual (verde + esponja) — ¡ya existe!   | Producto — wire-up    | 🔴       |
| ProductHeroMop  | Foto M1 (cubo con pedal)                        | Producto full         | 🔴       |
| ProductHeroMop  | Foto M2 (cubo sin pedal)                        | Producto full         | 🔴       |
| SocialProof     | Logos oficiales ML / Amazon / Walmart          | Brand assets          | 🟡       |
| SocialProof     | 2–3 testimonios con foto + quote               | Retrato + copy        | 🟡       |
| HowItWorks      | — (textual por diseño)                          | —                     | 🟢       |
| DistribuidoresCTA| Mapa de México con puntos de presencia        | SVG / ilustración     | 🟡       |
| Nosotros        | Banner panorámico 21:9 corporativo             | Lifestyle / operación | 🟡       |
| OG / social     | OG image final                                  | Composición social    | 🟡       |
| Marca           | Logo refinado (opcional)                        | Rediseño logo         | 🟢       |

**Total assets a producir:** ~12 fotos + 1 banner panorámico + 1 activo científico + logos + mapa + OG.

---

## E. Especificaciones técnicas de fotos

**Criterios globales aplicables a TODAS las fotos:**
- **Formato:** WebP primario (Q80–85) + AVIF como `<picture>` fallback vía `next/image` auto.
- **Color space:** sRGB.
- **Peso target:** < 400 KB para hero, < 200 KB para cards.
- **Resolución mínima:** 2× el display size (retina-ready).
- **Color matching:** fondos neutros que respeten la paleta (`#F0F7F0`, `#FFFBF0`, `#F0F4FF`, `#F5F0FF`, `#EFF6FF`, `#F5F7FA` según familia).
- **Estilo:** editorial / producto premium. Referencias: Apple products section, Aesop, Muji.

### E.1 — Hero principal

| Parámetro | Valor |
|-----------|-------|
| Dimensiones | 2400×3000 px (desktop portrait 4:5) + crop 2400×1600 (mobile) |
| Ratio | 4:5 en móvil, fill lg en desktop |
| Composición | Producto hero (fibra o mop) en ambiente contextual — mármol, cocina profesional, o similar |
| Ángulo | 45° o cenital con profundidad |
| Luz | Cool daylight, soft shadow — NO flash directo |
| Negative space | 35% derecha/inferior libre para overlay si se necesita |
| Peso target | < 450 KB WebP |

### E.2 — Categories (6 cards)

| Parámetro | Valor |
|-----------|-------|
| Dimensiones | 1200×1600 px cada una |
| Ratio | 3:4 exacto |
| Composición | Flat-lay o hero-prop del producto principal de cada familia, centrado |
| Fondo | Color matching del `familia.color` (`#F0F7F0` fibras verdes, `#FFFBF0` F4, `#F0F4FF` especiales, `#F5F0FF` borradores, `#EFF6FF` mops, `#F5F7FA` accesorios) |
| Sombra | Soft drop shadow (naturalista, no harsh) |
| Variantes | Un shot por familia — no collage |
| Consistencia | Todas shot con misma luz, mismo BG gradient, mismo ángulo |

### E.3 — F4 (wire-up del existente + opcional reshoot)

| Parámetro | Valor |
|-----------|-------|
| Estado | `F4.jpg` ya existe en `public/images/products/F4.jpg` (2.2 MB) |
| Acción inmediata | Optimizar a WebP < 250 KB y wire-up en `ProductHeroF4.tsx:26` |
| Opcional (mejor toma) | Dual-face composition: fibra verde al frente + esponja beige rotada 45° atrás, sobre fondo `#0A1628` deep navy |
| Ratio | 4:5 o libre (section split) |

### E.4 — M1 y M2 (mops)

| Parámetro | Valor |
|-----------|-------|
| Dimensiones | 1200×1600 px |
| Ratio | 3:4 exacto |
| Composición | M1: cubo con pedal + mopa separada en frente; M2: cubo compacto + mopa en la canasta |
| Fondo | `#060e1e` (mismo deep navy de la sección) con soft gradient |
| Ángulo | Frontal ligeramente elevado (15°) |
| Sombra | Ground shadow en contacto con piso imaginario |
| Luz | Rim light azul sutil (`#0076FF` al 20%) para conectar con el color de la marca |

### E.5 — NeoShield tecnológica

| Parámetro | Valor |
|-----------|-------|
| Dimensiones | 2400×1350 px |
| Ratio | 16:9 |
| Composición | Tres opciones:<br>**a)** Microscopía real de partículas de plata coloidal (requiere lab partner)<br>**b)** Render 3D abstracto: esferas plateadas flotando sobre fibra verde<br>**c)** Foto de fibra extreme-macro con aura/glow azul añadido en post |
| Fondo | `#060e1e` o degradado hacia `#0A1628` |
| Paleta | Azul primary (`#0076FF`), plata, verde fibra |
| Alt text | "NeoShield™ — micropartículas de plata coloidal integradas al polímero de la fibra." |

### E.6 — Nosotros panoramic

| Parámetro | Valor |
|-----------|-------|
| Dimensiones | 2520×1080 px |
| Ratio | 21:9 exacto |
| Composición | Tres opciones:<br>**a)** Equipo/operación en almacén — lifestyle B2B<br>**b)** Stack de todos los 23 productos como línea de montaje<br>**c)** Fábrica / laboratorio con tipografía "El estándar" impresa en marca |
| Overlay | Ya hay gradiente `linear-gradient(90deg, rgba(10,22,40,0.8) 0%, transparent 60%)` — el foto debe funcionar con 30% del izquierdo ensombrecido |
| Anclaje | `object-[30%_center]` — punto focal en el tercio derecho |

### E.7 — OG image

| Parámetro | Valor |
|-----------|-------|
| Dimensiones | 1200×630 px |
| Composición | Producto hero + logo MagicClean + claim "Fibras que duran. Tecnología que protege." |
| Fondo | Deep navy `#0A1628` con acento azul |
| Tipografía | Playfair para claim, Montserrat para logo + wordmark |
| Validación | Probar en [metatags.io](https://metatags.io) preview |

### E.8 — Mapa México (DistribuidoresCTA)

| Parámetro | Valor |
|-----------|-------|
| Formato | SVG inline (sin peso adicional, animable) |
| Composición | Silueta simplificada de México + 6 dots (CDMX, GDL, MTY, Puebla, Tijuana, Querétaro) |
| Color | Blanco 20% opacity sobre azul fondo; dots en rojo `#FF2B2B` con pulse animation |
| Alt | "Cobertura MagicClean — presencia en 6 ciudades principales de México" |

---

## F. Orden de ataque propuesto

**Lógica:** primero quick wins que desbloqueen credibilidad, luego producción fotográfica de mayor impacto en conversión.

### Fase 1 · Quick wins (0–1 día, sin producción)

1. **Wire-up de `F4.jpg`** — la foto está en el repo, solo falta descomentar. Ganancia enorme por cero costo.
2. **Optimizar `hero-main.png` a WebP** — pasar de 5.4 MB a ~400 KB. Mejora LCP directamente.
3. **Optimizar `F4.jpg` a WebP** — pasar de 2.2 MB a ~250 KB.
4. **Eliminar token muerto** `--section-y: 9rem` en `globals.css`.
5. **Normalizar color de fondo DistribuidoresCTA** a un token oficial.
6. **Quitar `NeoShieldBadge` duplicado** de cada card en BeneficiosClave.
7. **Actualizar alt text del Hero** según la imagen real.
8. **Investigar stats de NeoShield** (6 en data vs. 4 visibles).

### Fase 2 · Producción fotográfica crítica (depende de sesión de fotos)

9. **Categories — 6 fotos de familia** (mayor impacto de conversión).
10. **ProductHeroMop — M1 + M2** (dos flagships sin representar hoy).
11. **NeoShield — activo tecnológico** (refuerza el pitch principal).

### Fase 3 · Producción secundaria

12. **Hero — replace editorial con foto final** (si el actual no es definitivo).
13. **Nosotros — banner panorámico 21:9**.
14. **OG image final**.

### Fase 4 · Mejoras de percepción (requieren licencias o contenido adicional)

15. **Logos reales de MercadoLibre / Amazon / Walmart** (revisar guidelines).
16. **2–3 testimonios reales** con foto + quote.
17. **Mapa México SVG** para DistribuidoresCTA.
18. **Rediseño de logo** (opcional, no urgente para Sprint 2).

---

## Apéndice — Tokens detectados en `globals.css`

```css
/* Colores */
--color-primary:       #0076FF   /* azul de marca */
--color-primary-dark:  #0052CC   /* azul hover/pressed */
--color-accent:        #FF2B2B   /* rojo — badges, problemas */
--color-deep:          #0A1628   /* navy — fondos oscuros */
--color-ink:           #1A1A1A   /* texto principal */
--color-surface:       #F5F7FA   /* fondos sutiles */
--color-border:        #E8EAED   /* líneas divisorias */

/* Tipografía */
--font-sans:  Montserrat (weights 300–900, style normal)
--font-serif: Playfair Display (weights 400–700, style normal + italic)

/* Ritmo (solo 2 utilidades expuestas) */
.section-standard  →  padding: 5rem 0    (80px)
.section-premium   →  padding: 6rem 0    (96px)
--section-y: 9rem  →  NO USADO (dead token)

/* Utilidades tipográficas */
.headline-editorial  →  Playfair 400 + letter-spacing -0.03em + line-height 1.05
.label-eyebrow       →  0.68rem + 700 + letter-spacing 0.20em + uppercase
```

**Colores fuera de tokens (hardcoded) detectados:**

| Color      | Uso                                   | Ubicación                                     |
| ---------- | ------------------------------------- | --------------------------------------------- |
| `#FAFAFA`  | Fondo de BeneficiosClave              | `BeneficiosClave.tsx:12`                      |
| `#F0F5FF`  | Fondo de icon box + hover pills       | Varios                                         |
| `#FFF0F0`  | Fondo de icon box rojo en ElProblema  | `ElProblema.tsx:39`                           |
| `#0060DF`  | Fondo de DistribuidoresCTA            | `DistribuidoresCTA.tsx:35`                    |
| `#060e1e`  | Deep navy placeholder de image slots  | NeoShield, ProductHeroMop                      |
| `#666666`  | Texto secundario                       | Ubiquitous                                    |
| `#8B92A0`  | Micro-texto B2B en Hero               | `Hero.tsx:51`                                 |
| `#D0D0D0`  | Border de CTA secundario del Hero     | `Hero.tsx:65`                                 |
| `#E0E3E8`  | Border top en ElProblema / HowItWorks | Múltiples                                      |
| `#D8E4FF`  | Hover de números gigantes en HowItWorks | `HowItWorks.tsx:45`                          |

**Recomendación:** elevar los más usados a tokens (`--color-surface-warm` para `#FAFAFA`, `--color-text-muted` para `#666666`, `--color-border-soft` para `#E0E3E8`).

---

**Fin del reporte.** En pausa — esperando revisión.
