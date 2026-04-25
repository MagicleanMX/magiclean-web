import Link from 'next/link'
import { CATEGORIA_LABELS } from '@/lib/categoryColors'
import type { ProductCategoria } from '@/lib/categoryColors'

type Props = {
  category: ProductCategoria
  productName: string
  productVariant?: string | null
}

export default function ProductBreadcrumb({ category, productName, productVariant }: Props) {
  const fullName = productVariant ? `${productName} · ${productVariant}` : productName
  return (
    <nav aria-label="Breadcrumb" className="text-[12px] text-ink-muted mb-6">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link href="/" className="hover:text-[#0076FF] transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-ink-muted/60">/</li>
        <li>
          <Link href="/productos" className="hover:text-[#0076FF] transition-colors">
            Productos
          </Link>
        </li>
        <li aria-hidden="true" className="text-ink-muted/60">/</li>
        <li>{CATEGORIA_LABELS[category]}</li>
        <li aria-hidden="true" className="text-ink-muted/60">/</li>
        <li className="text-[#1A1A1A] font-medium" aria-current="page">{fullName}</li>
      </ol>
    </nav>
  )
}
