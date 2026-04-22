# INVENTARIO DE FOTOGRAFÍA — MAGICLEAN WEB LAUNCH
**Fecha:** 20 de abril de 2026  
**Propósito:** Guía completa para la sesión fotográfica. Cada slot está definido con dimensiones, aspecto, contenido esperado y requisitos técnicos.

---

## Resumen ejecutivo

| Categoría | Slots | Estado actual |
|-----------|-------|---------------|
| Hero principal | 1 | ⚠️ Placeholder temporal (hero-main.png 2752×1536) |
| Cards de categorías (6 familias) | 6 | ❌ Sin imagen (código comentado) |
| Showcase F4 Fibra Dual | 1 | ❌ Sin imagen (código comentado) |
| Showcase Mop (M1 + M2) | 2 | ❌ Sin imagen (código comentado) |
| NeoShield tecnología | 1 | ❌ Sin imagen (código comentado) |
| Nosotros/empresa banner | 1 | ❌ Sin imagen (código comentado) |
| Open Graph (redes sociales) | 1 | ⚠️ Usando hero-main.png (dimensiones incorrectas) |
| **TOTAL** | **13** | 1 parcial, 11 pendientes, 1 OG pendiente |

---

## SLOT 01 — Hero Principal (Sección Above the Fold)

| Campo | Valor |
|-------|-------|
| **Archivo destino** | `/public/images/hero/hero-main.jpg` |
| **Componente** | `Hero.tsx` — panel derecho |
| **Dimensiones mínimas** | 2560×3200px (fuente master) |
| **Aspect ratio pantalla** | Mobile: `4:5` portrait / Desktop: ocupa ~48% del viewport (libre en alto) |
| **Display en CSS** | `object-cover object-center` con `fill` |
| **Formato entrega** | WebP + AVIF (next/image convierte automáticamente desde JPG) |
| **Peso máximo** | 800KB (JPG fuente, next/image optimiza) |
| **Contenido esperado** | Producto estrella (F4 Fibra Esponja Dual o mop de alta gama) sobre superficie de mármol blanco o fondo oscuro navy. Producto flotando o en uso elegante. Iluminación estudio tipo Apple/luxury brand. |
| **Espacio negativo** | NO necesario — el texto está en el panel izquierdo. La foto puede ser full-bleed. |
| **Mood** | Premium, limpio, técnico. Referencia: Apple product shots, Herman Miller catalog. |
| **Color fondo sugerido** | Navy `#0A1628` o blanco puro `#FFFFFF`. Evitar grises medios. |
| **Notas** | Es la imagen más crítica del sitio. Define el tono visual de toda la landing. Prioridad máxima en producción. |

---

## SLOT 02-07 — Cards de Categorías (6 Familias de Producto)

Componente: `Categories.tsx` — grid de 6 cards con aspect-ratio `3:4` (portrait)

| Slot | Archivo destino | Familia | Color fondo actual | Descripción contenido |
|------|-----------------|---------|-------------------|----------------------|
| 02 | `/public/images/products/cat-fibra-dual.jpg` | Fibras Dual | (definido en products.ts) | F4 fibra bicolor verde/amarillo sobre superficie blanca |
| 03 | `/public/images/products/cat-fibra-ultra.jpg` | Fibras Ultra | (definido en products.ts) | Fibra alta densidad, textura visible |
| 04 | `/public/images/products/cat-mop-piso.jpg` | Mops de Piso | (definido en products.ts) | Mop en uso sobre piso de cerámica o mármol |
| 05 | `/public/images/products/cat-mop-ventana.jpg` | Mops Ventana | (definido en products.ts) | Mop limpiando superficie de vidrio, luz natural |
| 06 | `/public/images/products/cat-accesorios.jpg` | Accesorios | (definido en products.ts) | Set de accesorios en composición estudio |
| 07 | `/public/images/products/cat-institucional.jpg` | Institucional | (definido en products.ts) | Producto en contexto hotel/hospital (si aplica) |

**Especificaciones comunes para slots 02-07:**

| Campo | Valor |
|-------|-------|
| **Aspect ratio** | `3:4` (portrait) — FIJO en CSS |
| **Dimensiones mínimas** | 900×1200px |
| **Display** | `object-cover object-center` |
| **Formato** | JPG fuente (next/image convierte a AVIF/WebP) |
| **Peso máximo** | 400KB cada una |
| **Espacio negativo** | No necesario — el texto de la card está fuera de la imagen |
| **Hover** | La imagen se escala 1.05× en hover — la composición debe funcionar ligeramente recortada |
| **Consistency** | Mismo fondo y temperatura de luz en las 6. Sesión coordinada para look cohesivo. |

---

## SLOT 08 — Showcase F4 Fibra Esponja Dual

| Campo | Valor |
|-------|-------|
| **Archivo destino** | `/public/images/products/f4-hero.webp` |
| **Componente** | `ProductHeroF4.tsx` — panel izquierdo |
| **Aspect ratio** | Mobile: `4:5` / Desktop: full height del panel izquierdo |
| **Dimensiones mínimas** | 1200×1500px |
| **Display** | `object-cover object-center` con `fill` |
| **Contenido esperado** | El producto F4 mostrando AMBAS caras (verde esponja + azul microfibra). Composición editorial que resalte el concepto "Dual". Puede ser split visual o producto rotado mostrando los dos lados. |
| **Espacio negativo** | Sí, importante: hay overlays de texto (badge "Más popular", código "F4", specs de material). La imagen debe tener áreas oscuras o claras donde el texto sea legible. El fondo CSS es `#0A1628` navy. |
| **Tip de arte** | El overlay de texto blanco está en el centro. Composición con el producto desplazado arriba o abajo para no competir con el texto. |

---

## SLOT 09-10 — Showcase Mops M1 y M2

| Campo | Valor |
|-------|-------|
| **Archivo M1** | `/public/images/products/m1-product.webp` |
| **Archivo M2** | `/public/images/products/m2-product.webp` |
| **Componente** | `ProductHeroMop.tsx` — dos columnas |
| **Aspect ratio** | `3:4` cada una |
| **Dimensiones mínimas** | 900×1200px cada una |
| **Display** | `object-cover object-center` |
| **Contenido esperado M1** | M1 Turbo Magic — mop con sistema de estrujado. Producto sobre superficie reflectante o en acción. |
| **Contenido esperado M2** | M2 Spin Magic — mop con cubo de centrifugado. Producto completo con el cubo visible si es posible. |
| **Consistency** | Misma temperatura de luz, mismo fondo para que las dos columnas se vean coordinadas. |

---

## SLOT 11 — NeoShield™ Tecnología (Imagen científica/editorial)

| Campo | Valor |
|-------|-------|
| **Archivo destino** | `/public/images/neoshield-tech.webp` |
| **Componente** | `NeoShield.tsx` — imagen central `16:9` |
| **Aspect ratio** | `16:9` widescreen |
| **Dimensiones mínimas** | 1920×1080px |
| **Display** | `object-cover object-center` |
| **Contenido esperado** | Microscopía electrónica o imagen técnica de las micropartículas de plata coloidal de NeoShield™. Alternativa: foto macro del tejido de la fibra con iluminación de laboratorio. O composición de equipo científico (microscopio, pipetas) sobre fondo oscuro con overlay de la fibra. |
| **Mood** | Científico, técnico, credibilidad. Referencia: Intel inside visuals, 3M product photography. |
| **Espacio negativo** | Sí: hay texto overlay a la derecha (desktop) con las features de NeoShield. La parte izquierda/central puede ser la imagen más densa. |

---

## SLOT 12 — Nosotros / Historia de marca (Banner panorámico)

| Campo | Valor |
|-------|-------|
| **Archivo destino** | `/public/images/nosotros-banner.webp` |
| **Componente** | `Nosotros.tsx` — banner full-width `21:9` |
| **Aspect ratio** | `21:9` ultra-wide (cinema) |
| **Dimensiones mínimas** | 2520×1080px |
| **Display** | `object-cover object-[30%_center]` (ligeramente desplazado a la izquierda) |
| **Contenido esperado** | Instalaciones de MagicClean, equipo de trabajo, o toma editorial del proceso de producción. Puede ser también una toma de producto en contexto profesional (restaurante, hospital, hotel). |
| **Mood** | Confianza, escala, profesionalismo. Amplio, con aire. |
| **Espacio negativo** | No crítico — el texto está fuera de la imagen (encima y debajo del banner). |

---

## SLOT 13 — Open Graph / Redes Sociales

| Campo | Valor |
|-------|-------|
| **Archivo destino** | `/public/og-image.jpg` |
| **Uso** | Preview en WhatsApp, Twitter/X, LinkedIn, Facebook, iMessage |
| **Dimensiones exactas** | **1200×630px** (obligatorio) |
| **Formato** | JPG (no WebP — mejor compatibilidad con parsers de OG) |
| **Peso máximo** | 300KB |
| **Contenido esperado** | Logo MagicClean + producto hero + tagline en texto. Diseño que funcione como thumbnail en feed de redes sociales. |
| **Urgencia** | ALTA — debe crearse antes del lanzamiento, puede ser placeholder de marca mientras llega el arte final. |

---

## Categorización para producción fotográfica

### Grupo A — Estudio producto sobre fondo controlado (6 slots: 02-07)
Prioridad: Sesión de producto en estudio. Fondo blanco o navy. Iluminación controlada. 6 tomas.

### Grupo B — Showcase editorial (3 slots: 01, 08, 09-10)
Prioridad: Fotos hero de producto. Mayor presupuesto de producción. Iluminación dramática.

### Grupo C — Imagen técnica/científica (1 slot: 11)
Puede ser adquirida como stock photography de alta calidad (microscopía de materiales textiles, tejidos técnicos) o producida internamente.

### Grupo D — Corporativa/instalaciones (1 slot: 12)
Reportaje fotográfico en las instalaciones. Puede hacerse en cualquier momento.

### Grupo E — Digital/diseño (1 slot: 13 — OG)
Se puede crear con Canva o Figma en < 1 hora. No requiere sesión.

---

## Naming convention de archivos

```
/public/images/
├── hero/
│   └── hero-main.jpg           # SLOT 01
├── products/
│   ├── cat-fibra-dual.jpg      # SLOT 02
│   ├── cat-fibra-ultra.jpg     # SLOT 03
│   ├── cat-mop-piso.jpg        # SLOT 04
│   ├── cat-mop-ventana.jpg     # SLOT 05
│   ├── cat-accesorios.jpg      # SLOT 06
│   ├── cat-institucional.jpg   # SLOT 07
│   ├── f4-hero.webp            # SLOT 08
│   ├── m1-product.webp         # SLOT 09
│   └── m2-product.webp         # SLOT 10
├── neoshield-tech.webp         # SLOT 11
├── nosotros-banner.webp        # SLOT 12
└── og-image.jpg                # SLOT 13
```
