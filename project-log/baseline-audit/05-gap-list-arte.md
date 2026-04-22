# GAP LIST — ANTES DE INICIAR PRODUCCIÓN FOTOGRÁFICA
**Fecha:** 20 de abril de 2026  
**Propósito:** Lista definitiva de lo que DEBE estar resuelto antes de que el fotógrafo/director de arte empiece a trabajar.

---

## BLOQUEANTES TÉCNICOS (deben estar en verde antes de arte)

### ❌ 1. Rate limiting funcional en formulario de contacto
**Por qué bloquea:** Si se lanza el sitio con el formulario durante/después de la sesión de fotos y hay tráfico real, el formulario puede ser abusado. Resuelve antes de hacer público el sitio.  
**Acción:** Implementar Vercel KV / Upstash Redis para rate limiting persistente.  
**Responsable:** IA  
**Tiempo:** 2-4 horas

### ❌ 2. Verificar RLS activo en Supabase
**Por qué bloquea:** No se puede lanzar con leads expuestos. Verificación de 5 minutos en el dashboard.  
**Acción:** Jacobo verifica en Supabase dashboard → Table Editor → leads → RLS toggle ON.  
**Responsable:** Jacobo  
**Tiempo:** 5 minutos

### ❌ 3. Imagen OG de 1200×630px
**Por qué bloquea:** Si alguien comparte el sitio durante o después de la sesión de fotos, la preview en WhatsApp/redes saldrá mal.  
**Acción:** Crear placeholder de marca 1200×630px. No necesita las fotos finales.  
**Responsable:** Jacobo (Canva/Figma) o IA (si se da acceso a assets)  
**Tiempo:** 1 hora

---

## PRERREQUISITOS DE DIRECCIÓN DE ARTE (deben definirse antes de la sesión)

### ⚠️ 4. Brief fotográfico con referencias visuales aprobadas
**Estado:** No encontrado en el repositorio.  
**Qué se necesita:** Un moodboard con 5-10 referencias de fotos de producto que definan el estilo. Responde: ¿Fondo blanco o negro? ¿Producto en contexto o aislado? ¿Mano sosteniendo el producto? ¿Micro-detalles o toma general?  
**Dónde guardar:** `audit-evidence/arte/moodboard-referencias.pdf`

### ⚠️ 5. Definir si el hero será el F4 o el Mop
**Estado:** El código actual en `hero-main.png` tiene una imagen temporal. El hero es el 40% de la primera impresión.  
**Qué se necesita:** Decisión ejecutiva: ¿qué producto representa mejor la marca en la posición de mayor visibilidad?  
**Responsable:** Jacobo

### ⚠️ 6. Definir colores de fondo por familia de producto (slots 02-07)
**Estado:** `products.ts` define colores por familia (`f.color`), pero no se ha confirmado si esos colores son los que se usarán en la sesión fotográfica o solo para el placeholder.  
**Qué se necesita:** Confirmar qué color de fondo se fotografiará cada familia para que la foto y el CSS sean coherentes.

### ⚠️ 7. Confirmar cuáles SKUs se fotografían en esta sesión
**Estado:** Hay 24 SKUs (según el brief del proyecto MagicClean B2B), pero los slots de imagen solo muestran 6 familias + 2 productos hero. ¿Se fotografían 6 representantes (uno por familia) o todos los SKUs?  
**Responsable:** Jacobo

---

## CHECKLIST TÉCNICO PREVIO A ARTE (estado actual)

| Item | Estado | Notas |
|------|--------|-------|
| Aspect ratios fijos en todos los slots | ✅ | `3/4`, `4/5`, `16/9`, `21/9` — sin CLS |
| `ProductImageSlot` swap-ready | ✅ | Descomentar src= activa la imagen sin cambios de layout |
| `object-cover` en todos los slots | ✅ | Funciona con cualquier foto que llegue |
| Fallback tipográfico si falta imagen | ✅ | No hay broken images |
| `priority` en hero image | ✅ | LCP optimizado |
| `sizes` responsive en hero | ✅ | `(max-width: 1024px) 100vw, 48vw` |
| AVIF/WebP habilitado | ✅ | En `next.config.ts` |
| Carpeta `/public/images/` creada | ✅ | Con subcarpetas hero/ y products/ |
| Naming convention definida | ✅ | Ver `04-inventario-fotografia.md` |
| Contenedores oscuros para overlays | ✅ | `#0A1628` en slots hero/F4/Mop |

---

## PENDIENTES OPCIONALES (no bloquean, pero mejoran el resultado)

| # | Item | Descripción | Esfuerzo |
|---|------|-------------|----------|
| A | Blur-up placeholders | Agregar `blurDataURL` a cada slot para transición suave al cargar | S |
| B | `picture` con art-direction | Hero diferente composición en mobile vs desktop | M |
| C | Lazy loading en slots below-fold | Solo el hero tiene `priority`, el resto está bien | ✅ |
| D | Supabase Storage para assets | Si las fotos van a CMS en lugar de `/public` | M |

---

## Resumen ejecutivo

El sitio está **técnicamente listo para recibir las fotos** en términos de estructura (aspect ratios, contenedores, fallbacks). Lo que falta antes de iniciar la producción fotográfica es:

1. **3 items técnicos** que deben resolverse para el lanzamiento (ver bloqueantes arriba)
2. **4 decisiones de dirección de arte** que deben tomarse antes de la sesión
3. **Confirmación** de RLS en Supabase (5 minutos de Jacobo)

Una vez resuelto el Sprint 1 del plan de remediación + las decisiones de arte, el proyecto está listo para pasar a la fase fotográfica con confianza total.
