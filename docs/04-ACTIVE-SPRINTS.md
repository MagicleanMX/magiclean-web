# 04 — Sprints Activos y Roadmap MagiClean

**Última actualización:** 2026-04-21

## Sprint activo

### Sprint 0 — Sistema de Continuidad

**Estado:** en ejecución
**Objetivo:** instalar CLAUDE.md + docs/ + project-log/ para memoria permanente del proyecto
**Branch:** `chore/sprint-0-continuity-system`
**Autorizado:** 2026-04-21 por Jacobo Levy

---

## Sprints ejecutados (histórico)

### Auditoría Total v2 — 2026-04-21

- **Entregable:** `project-log/audits/AUDIT_REPORT_v2_2026-04-21.md` (847 líneas)
- **Estado:** completada, revisada por dueño
- **Hallazgos principales:** 10 seguridad (0 críticos), 12 arquitectura (A-03 catálogo divergente crítico), 9 performance (CSP bloqueaba Sentry), 15 contraste AA, 3 estados de naming, 4 variantes de email, WhatsApp placeholder

### Sprint A — Fixes técnicos puros — 2026-04-21

- **Branch:** `fix/sprint-a-technical-debt` (8 commits, NO mergeada)
- **Logros medibles:**
  - Lighthouse mobile Performance 59 → 77 (+18)
  - LCP 5.4s → 2.8s
  - Color-contrast fails 15 → 3
  - Console errors 9 → 2
  - `public/` 8.1 MB → 2.9 MB
  - Lint 8 errors → 0 / 0
- **Detalle:** `project-log/sprints/sprint-a-cierre.md`

### Fix Legal (Entity Separation) — 2026-04-21

- **Branch:** `fix/sprint-a-technical-debt` (commit 9, junto a Sprint A)
- **Entrega:** 14 ocurrencias de entidad ficticia → 0. JSON-LD estructurado correcto. Aviso de privacidad y términos con responsable real. Footer con atribución IP correcta.
- **Detalle:** `project-log/sprints/sprint-legal-fix-cierre.md`

---

## Sprints planificados (no autorizados)

### Sprint B — Consolidar catálogo source of truth

- Crear `products.json` con SKUs activos para landing (23 — M7 excluido por descontinuación)
- Unificar Navbar / Categories / ProductHero* contra ese archivo
- Agregar sección Logística con presentaciones
- Linkear PDFs descargables de catálogo
- **Pre-requisito:** dueño sube PDFs de Fibras y Mops al repo
- **ETA:** 1 día Claude Code + validación dueño

### Sprint C — Elevación B2B

- Sección Logística con datos reales
- Sección Casos de uso sectorizada (hotel, restaurante, cocina industrial, retail)
- FAQ distribuidores (MOQ, pago, garantía, tiempos)
- Página dedicada `/distribuidores`
- Google Maps embed con ubicación fábrica
- Trust signals visibles en home (razón social, dirección, teléfono, año)
- Logos Amazon/ML/Walmart como imágenes verificables
- Formulario B2B con campos empresa, RFC, volumen estimado
- **ETA:** 3-5 días Claude Code + contenido del dueño

### Sprint D — Voice dual + fotografía

- Integración de fotos profesionales (los 23 SKUs faltantes)
- Copy ajustado a dual voice por sección
- Fichas técnicas descargables por SKU top
- Cleanup de "MagicClean" (doble C) → "MagiClean" global con review
- **Pre-requisito:** fotografía profesional de 10-23 SKUs activos (M7 fuera de landing)
- **ETA:** 2-3 días Claude Code + fotografía externa

### Sprint E — Preparación lanzamiento

- Testing cross-browser y mobile real
- Verificación SPF/DKIM del email (contra spam)
- Redirect magicleanproducts.com → magiclean.mx
- Schema.org completo y SEO técnico
- Soft launch a 5-10 distribuidores de confianza
- **ETA:** 1 día Claude Code + testing humano

### Sprint F — WordPress headless CMS (post-lanzamiento)

- Setup WP en Kinsta
- Custom fields para productos, blog, testimonios
- Integración Next.js ↔ WP via API
- Entrenamiento empleado no-técnico
- **ETA:** 1-2 días Claude Code + USD 300-600 dev externo + USD 35-50/mes hosting

---

## Decisiones pendientes del dueño

### Alta prioridad

- [ ] Verificar handles redes sociales @magiclean (si no son propios, reservar)
- [ ] Confirmar documento certificación NeoShield o ajustar copy a "en proceso"
- [ ] Confirmar fecha llegada número WhatsApp B2B
- [ ] Configurar DNS + SPF/DKIM del dominio magiclean.mx
- [ ] Activar emails hola@, ventas@, soporte@, noreply@ en magiclean.mx

### Media prioridad

- [ ] Subir `Catalogo_Fibras.pdf` + `Catalogo_Mops.pdf` al repo bajo `public/docs/`
- [x] Validar los SKUs reales → **Landing: 23 activos (M7 excluido). Catálogo físico: 24 totales. Consolidado 2026-04-23.**
- [ ] Decidir 10 SKUs prioritarios para fotografía profesional
- [ ] Contratar fotógrafo profesional CDMX (USD 200-400)

### Baja prioridad

- [ ] Confirmar folio IMPI MagiClean® y NeoShield™
- [ ] Decidir destino final de magicleanproducts.com

---

## Roadmap 4-6 semanas

```
Semana 1 (actual):  Auditoría ✅ + Sprint A ✅ + Fix Legal ✅ + Sprint 0 (en curso)
Semana 2:           Sprint B (catálogo consolidado) + arranque producción fotográfica
Semana 3:           Sprint C (elevación B2B) + fotos en proceso
Semana 4:           Llegan fotos + Sprint D (voice + fotos integradas)
Semana 5:           Sprint E (preparación lanzamiento) + testing
Semana 6:           Buffer + soft launch + ajustes + lanzamiento público
```

---

## Cómo actualizar este archivo

- Al iniciar un sprint: marcar "en ejecución"
- Al cerrar un sprint: crear `project-log/sprints/sprint-[id]-cierre.md` + mover a "Histórico"
- Al surgir bloqueo: agregar a "Decisiones pendientes"
- Revisar al inicio de cada sesión de trabajo
