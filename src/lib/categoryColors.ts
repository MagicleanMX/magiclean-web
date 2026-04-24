// Single source of truth for category and sub-group colors used across
// Navbar, Categories, and any future product surface. Keep palette decisions
// here so chip / header / divider colors stay coherent across components.

export type ProductCategoria = 'fibras' | 'mops' | 'accesorios' | 'repuestos'

// Top-level category colors — used for section headers, flat-list chips,
// and navbar column eyebrows.
export const CATEGORY_COLORS: Record<ProductCategoria, string> = {
  fibras:     '#1A1A1A', // grafito editorial
  mops:       '#0076FF', // azul MagiClean
  accesorios: '#374151', // carbón
  repuestos:  '#9CA3AF', // gris claro
}

// Sub-grupos within Fibras — used for chip color and section sub-headers
// in Categories, and for chip color in Navbar.
export type FibraSubgrupo = {
  id: string
  titulo: string
  color: string
  skus: readonly string[]
}

export const FIBRAS_SUBGRUPOS: readonly FibraSubgrupo[] = [
  { id: 'ligero',  titulo: 'Uso Ligero',    color: '#3B82F6', skus: ['F6', 'F7', 'F8', 'F9'] },
  { id: 'medio',   titulo: 'Uso Medio',     color: '#10B981', skus: ['F1', 'F2', 'F3'] },
  { id: 'esponja', titulo: 'Fibra Esponja', color: '#F59E0B', skus: ['F4'] },
  { id: 'pesado',  titulo: 'Uso Pesado',    color: '#1A1A1A', skus: ['F5'] },
] as const

const FIBRAS_SUBGRUPO_BY_SKU: Map<string, FibraSubgrupo> = new Map(
  FIBRAS_SUBGRUPOS.flatMap((sg) => sg.skus.map((sku) => [sku, sg] as const))
)

export function getFibraSubgrupo(sku: string): FibraSubgrupo | undefined {
  return FIBRAS_SUBGRUPO_BY_SKU.get(sku)
}

/**
 * Color del chip de SKU. Para fibras devuelve el color del sub-grupo
 * (Ligero/Medio/Esponja/Pesado); para otras categorías devuelve el color
 * de la categoría madre.
 */
export function getChipColor(sku: string, categoria: ProductCategoria): string {
  if (categoria === 'fibras') {
    const sg = getFibraSubgrupo(sku)
    if (sg) return sg.color
  }
  return CATEGORY_COLORS[categoria]
}
