# 02 — Catálogo de Productos MagiClean

**Última actualización:** 2026-04-23

> **Catálogo consolidado en Sprint B (2026-04-23).** Landing web y `src/lib/products.json` tienen **23 SKUs activos**. Catálogo comercial físico (PDFs en `public/docs/`) tiene **24 SKUs totales**. La diferencia es **M7 (Q-Beta) excluido intencional** por proceso de descontinuación en curso — NO es divergencia pendiente, es decisión de posicionamiento B2B. Cuando M7 termine de saldarse, queda discontinuado permanente.

## Fuentes de verdad (post Sprint B)

| Fuente | Cuenta | Estado |
|---|---|---|
| **`src/lib/products.json`** | **23 SKUs activos** | **Source of truth del landing**. Consolidado en Sprint B. M7 excluido intencional. |
| `src/components/Navbar.tsx` mega-menú | 23 SKUs | Lee de `products.json`. Migrado en Sprint B (`4b40db3`). |
| `src/components/Categories.tsx` | 23 SKUs | Lee de `products.json`. Migrado en Sprint B (`843c8df`). |
| `src/components/ProductHero*.tsx` | 23 SKUs | Lee de `products.json`. Migrado en Sprint B (`ceb42e6`). |
| Copy público web | "23 soluciones" | Unificado en T8a (`8568386`, `45655dc`). |
| PDFs físicos (`public/docs/Catalogo_Fibras.pdf` + `Catalogo_Mops.pdf`) | 24 SKUs | En repo desde T9 (`b5219f1`). Incluyen M7 hasta agotar stock — descontinuación en curso. |
| `src/lib/products.ts` (legacy `FAMILIAS`) | 23 en copy hardcoded | Deprecated. Eliminación pendiente en T12. |

## Sprint B — estado

1. ~~Dueño sube `Catalogo_Fibras.pdf` y `Catalogo_Mops.pdf`~~ ✅ En `public/docs/` desde T9.
2. ~~`products.json` como source of truth único~~ ✅ En `src/lib/products.json` con 23 SKUs activos.
3. ~~Navbar, Categories, ProductHero* leen del mismo archivo~~ ✅ Migrados (`4b40db3`, `843c8df`, `ceb42e6`).
4. ~~Copy "23 modelos" → número real~~ ✅ Unificado a "23 soluciones" (`8568386`, `45655dc`).
5. Eliminar `FAMILIAS` deprecated en `products.ts` — pendiente en T12.

## Líneas de producto

### Fibras (F1 – F9)

| SKU | Nombre | Color | Uso | Estado en landing |
|---|---|---|---|---|
| F1 | Fibra Verde Pesada | Verde | Cocinas industriales | Solo texto, sin foto, calidad débil vs Scotch-Brite |
| F2 | Fibra Verde Pesada | Verde | Doméstico pesado | Solo texto, calidad débil |
| F3 | Fibra Verde Pesada | Verde | Doméstico | Solo texto, calidad débil |
| F4 | Fibra Esponja Dual | Verde+amarillo | Cocina + delicado | **Único con foto y hero propio**, calidad débil |
| F5 | Fibra Negra Parrillas | Negro | Parrillas, hornos | Sin foto, **PRODUCTO GANADOR** |
| F6 | Fibra Blanca Baños | Blanco | Cristales, cromo | Sin foto, **PRODUCTO GANADOR** |
| F7 | Fibra Azul Esponja | Azul | Cristales delicados | Sin foto, **PRODUCTO GANADOR** |
| F8 | Borrador Mágico + Esponja | Blanco+azul | Multiusos | Sin foto |
| F9 | Borrador Mágico Solo | Blanco | Multiusos | Sin foto |

### Mops y accesorios (M1 – M10)

| SKU | Nombre | Tipo | Estado |
|---|---|---|---|
| M1 | Turbo Magic | Mop con cubeta + pedal | Hero compartido con M2, **GANADOR** |
| M2 | Spin Magic | Mop con cubeta manual | Hero compartido con M1, **GANADOR** |
| M3 | Repuesto microfibra | Repuesto M1/M2 | Solo texto |
| M4 | Dispositivo baños | Escobilla WC con cartuchos | Solo texto |
| M5 | Squeezed Magic | Mop plano con escurridor | Chip en ProductHeroMop |
| M6 | Speed Clean | Mop triangular spin | Chip |
| M7 | Q-Beta | Mop plano giratorio 360° | **EXCLUIDO DEL LANDING** — descontinuación en curso (saldando inventario). Aparece en PDF físico hasta agotar stock. |
| M8 | [pendiente confirmar] | [pendiente] | NO EN CÓDIGO |
| M9 | Atomized Magic | Mop con atomizador | Chip |
| M10 | Repuestos M4 | 32 cartuchos + detergente | NO EN CÓDIGO (solo Navbar) |

### SKUs extra a verificar

- M16, M17, M18 — aparecen en `products.ts` pero no en catálogos PDF. Pendiente verificación.

## Tecnología transversal: NeoShield™

Todos los productos con tratamiento antibacterial llevan marcaje NeoShield™.

Según ficha técnica del BioBase PRO futuro:
- Agente: Ag-zeolita tipo A o ZSM-5
- Concentración: 80-160 ppm Ag en film seco
- Eficacia: ≥99% reducción E. coli y S. aureus a 4h (JIS Z 2801)
- Durabilidad: ≥5 ciclos de lavado a 40°C

## Producto en desarrollo: BioBase PRO + Antibacterial

Ficha técnica en `project-log/decisions/` cuando el dueño la suba.

- Timing: 2-4 meses desde abril 2026
- Línea destino: **MagiClean PRO** (premium)
- Objetivo: superar Scotch-Brite P-94 sin infringir patente P-96

## Precios y márgenes (confidencial)

- **Margen distribuidor:** 40-45%
- **Precios públicos:** en definición por canal (Sprint C)
- **MOQ por SKU:** a documentar en Sprint C

---

**Próxima revisión:** Sprint D (voice dual + fotografía profesional), o cuando M7 termine de saldarse para marcarlo discontinuado permanente.
