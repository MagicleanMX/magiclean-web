/**
 * Single source of truth para el conteo de SKUs activos.
 * Derivado de products.json filtrado por estado === 'activo'.
 *
 * Decisión 2026-04-25 ("Política sobre el conteo de SKUs en copy"):
 * cualquier mención literal del número se desactualiza al crecer el
 * catálogo. Importa ACTIVE_SKU_COUNT y usá interpolación en el copy.
 */

import productsData from './products.json'

type ProductMin = {
  estado: 'activo' | 'descontinuado' | 'en_desarrollo'
}

export const ACTIVE_SKU_COUNT = (productsData as ProductMin[]).filter(
  (p) => p.estado === 'activo',
).length
