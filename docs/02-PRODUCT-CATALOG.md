# 02 — Catálogo de Productos MagiClean

**Última actualización:** 2026-04-21

> **Advertencia de integridad:** El catálogo real del negocio tiene 24 SKUs, pero el código tiene divergencias pendientes de consolidar en Sprint B.

## Fuentes de verdad actuales

| Fuente | Cuenta | Estado |
|---|---|---|
| `src/lib/products.ts` | 20 SKUs | Hardcoded, faltan M8, M10, y repuestos |
| `src/components/Navbar.tsx` mega-menú | 22 SKUs | Hardcoded, divergente de products.ts |
| Copy "23 modelos" en 4 lugares | 23 | Número histórico no verificado |
| PDFs físicos (Catalogo_Fibras, Catalogo_Mops) | 24 SKUs | No están en repo todavía (en Desktop del dueño) |
| **Realidad del negocio** | **24 SKUs** | Source of truth pendiente de consolidar |

## Divergencias a resolver en Sprint B

1. Dueño sube `Catalogo_Fibras.pdf` y `Catalogo_Mops.pdf` al repo bajo `public/docs/`
2. Claude Code estructura `products.json` como source of truth único
3. Navbar, Categories, ProductHero* todos leen del mismo archivo
4. Copy "23 modelos" se actualiza al número real

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
| M7 | Q-Beta | Mop plano giratorio 360° | Solo texto |
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

**Próxima revisión:** Sprint B (consolidación de source of truth)
