import type { Metadata } from 'next'
import { Download } from 'lucide-react'

import productsData from '@/lib/products.json'
import { CATEGORY_COLORS, CATEGORIA_LABELS } from '@/lib/categoryColors'
import type { ProductCategoria } from '@/lib/categoryColors'
import { CATALOG_PDFS } from '@/lib/catalog-assets'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyCtaBar from '@/components/StickyCtaBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import ProductCardPlaceholder from '@/components/ProductCardPlaceholder'

type Product = {
  sku: string
  nombre: string
  variante: string | null
  categoria: ProductCategoria
  estado: 'activo' | 'descontinuado' | 'en_desarrollo'
}

const products = productsData as Product[]
const activeProducts = products.filter((p) => p.estado === 'activo')

const CATEGORIA_ORDER: ProductCategoria[] = ['fibras', 'mops', 'accesorios', 'repuestos']

export const metadata: Metadata = {
  title: 'Catálogo completo — MagiClean',
  description: `Catálogo profesional MagiClean: ${activeProducts.length} soluciones de limpieza B2B con tecnología NeoShield™. Fibras, sistemas mop, accesorios y repuestos.`,
  openGraph: {
    title: 'Catálogo completo — MagiClean',
    description: `${activeProducts.length} soluciones profesionales con tecnología NeoShield™.`,
  },
}

export default function CatalogPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Header */}
        <section className="pt-[100px] lg:pt-[120px] pb-12 lg:pb-16">
          <div className="max-w-[1440px] mx-auto px-8">
            <p className="label-eyebrow text-[#0052CC] mb-3">Catálogo completo</p>
            <h1 className="headline-editorial text-[2.8rem] lg:text-[4rem] text-[#1A1A1A] mb-4 leading-[1.05]">
              {activeProducts.length} soluciones profesionales.
            </h1>
            <p className="text-[1.1rem] font-normal text-ink-muted leading-[1.7] max-w-2xl">
              Fibras, sistemas mop, accesorios y repuestos. Todo con tecnología NeoShield™ antibacterial.
              Cada producto con ficha técnica, presentaciones comerciales y opciones de cotización.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {CATALOG_PDFS.map((pdf) => (
                <a
                  key={pdf.id}
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Descargar ${pdf.label} en PDF, ${pdf.sizeA11y}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-ink-muted hover:text-[#0076FF] border border-[#E8EAED] hover:border-[#0076FF] rounded-md transition-colors duration-200"
                >
                  <Download size={14} />
                  {pdf.label} ({pdf.sizeLabel})
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="pb-20 lg:pb-32">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="space-y-16">
              {CATEGORIA_ORDER.map((cat) => {
                const items = activeProducts.filter((p) => p.categoria === cat)
                if (items.length === 0) return null
                const sectionColor = CATEGORY_COLORS[cat]
                return (
                  <div key={cat} id={cat}>
                    <div
                      className="relative flex items-baseline gap-4 mb-7 pb-3 border-b-2"
                      style={{ borderColor: `${sectionColor}20` }}
                    >
                      <span
                        className="absolute bottom-0 left-0 w-12 h-[3px] -mb-[2px]"
                        style={{ backgroundColor: sectionColor }}
                      />
                      <h2
                        className="text-[1.6rem] lg:text-[2rem] font-black tracking-tight"
                        style={{ color: sectionColor }}
                      >
                        {CATEGORIA_LABELS[cat]}
                      </h2>
                      <span className="text-[12px] font-medium text-ink-muted">
                        {items.length} {items.length === 1 ? 'solución' : 'soluciones'}
                      </span>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,200px))] gap-5 justify-start">
                      {items.map((p) => (
                        <ProductCardPlaceholder key={p.sku} product={p} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCtaBar />
      <WhatsAppButton />
    </>
  )
}
