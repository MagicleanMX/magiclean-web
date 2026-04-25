import Link from 'next/link'
import { getChipColor } from '@/lib/categoryColors'
import type { ProductCategoria } from '@/lib/categoryColors'

type ProductMin = {
  sku: string
  nombre: string
  variante: string | null
  categoria: ProductCategoria
}

type Props = {
  product: ProductMin
}

// Editorial placeholder card used while product photography is in production.
// Renders gradient backdrop tinted with the product's category color, SKU chip
// top-left, and the product name centered in small uppercase tracking — visible
// but understated. When `imagen_path` becomes available for a SKU the swap to
// a photo card happens at the consumer level (catalog or related sections),
// not here.
export default function ProductCardPlaceholder({ product }: Props) {
  const chipColor = getChipColor(product.sku, product.categoria)
  const fullName = product.variante
    ? `${product.nombre} · ${product.variante}`
    : product.nombre

  return (
    <Link href={`/productos/${product.sku}`} className="group block">
      <div
        className="relative aspect-square rounded-2xl border border-[#E8EAED] overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5"
        style={{
          background: `linear-gradient(160deg, ${chipColor}30 0%, #FFFFFF 70%)`,
        }}
      >
        {/* SKU chip — top-left, anchor for inventory legibility */}
        <span
          className="absolute top-3 left-3 inline-flex items-center justify-center min-w-[32px] h-6 px-2 rounded text-[10px] font-black text-white z-10"
          style={{ backgroundColor: chipColor }}
        >
          {product.sku}
        </span>

        {/* Centered product name — editorial, watermark-like */}
        <div className="absolute inset-0 flex items-center justify-center px-5 pointer-events-none select-none">
          <p
            className="label-eyebrow text-[10px] text-center leading-[1.4]"
            style={{ color: `${chipColor}99` }}
          >
            {product.nombre}
          </p>
        </div>
      </div>

      {/* Name below — full name including variant, with hover state */}
      <p className="text-[13px] font-medium text-[#1A1A1A] group-hover:text-[#0076FF] transition-colors leading-snug mt-3 px-1">
        {fullName}
      </p>
    </Link>
  )
}
