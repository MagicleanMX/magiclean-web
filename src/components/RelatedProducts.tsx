import Link from 'next/link'
import { CATEGORIA_LABELS, getChipColor } from '@/lib/categoryColors'
import type { ProductCategoria } from '@/lib/categoryColors'

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
          {related.map((p) => {
            const chipColor = getChipColor(p.sku, p.categoria)
            const fullName = p.variante ? `${p.nombre} · ${p.variante}` : p.nombre
            return (
              <Link key={p.sku} href={`/productos/${p.sku}`} className="group block">
                <div
                  className="relative aspect-square rounded-2xl border border-[#E8EAED] overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(160deg, ${chipColor}14 0%, #FFFFFF 70%)` }}
                >
                  <span
                    className="absolute top-3 left-3 inline-flex items-center justify-center min-w-[32px] h-6 px-2 rounded text-[10px] font-black text-white z-10"
                    style={{ backgroundColor: chipColor }}
                  >
                    {p.sku}
                  </span>
                  <p
                    className="absolute inset-0 flex items-center justify-center font-black text-[2.6rem] tracking-tighter leading-none select-none pointer-events-none"
                    style={{ color: `${chipColor}1F` }}
                  >
                    {p.sku}
                  </p>
                </div>
                <p className="text-[13px] font-medium text-[#1A1A1A] group-hover:text-[#0076FF] transition-colors leading-snug mt-3 px-1">
                  {fullName}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
