import { CATEGORIA_LABELS } from '@/lib/categoryColors'
import type { ProductCategoria } from '@/lib/categoryColors'
import ProductCardPlaceholder from './ProductCardPlaceholder'

type ProductMin = {
  sku: string
  nombre: string
  variante: string | null
  categoria: ProductCategoria
  estado: 'activo' | 'descontinuado' | 'en_desarrollo'
}

type Props = {
  currentSku: string
  category: ProductCategoria
  products: ProductMin[]
  limit?: number
}

export default function RelatedProducts({ currentSku, category, products, limit = 4 }: Props) {
  const related = products
    .filter((p) => p.estado === 'activo' && p.categoria === category && p.sku !== currentSku)
    .slice(0, limit)

  if (related.length === 0) return null

  return (
    <section className="bg-surface-alt py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8">
        <p className="label-eyebrow text-[#0052CC] text-[10px] mb-3">También te puede interesar</p>
        <h2 className="headline-editorial text-[1.8rem] lg:text-[2.2rem] text-[#1A1A1A] mb-10">
          Más en {CATEGORIA_LABELS[category]}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p) => (
            <ProductCardPlaceholder key={p.sku} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
