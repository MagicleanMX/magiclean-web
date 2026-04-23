'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import type { CategoriesSection } from '@/lib/wordpress'
import { CATEGORY_COLORS, FIBRAS_SUBGRUPOS } from '@/lib/categoryColors'
import type { FibraSubgrupo, ProductCategoria } from '@/lib/categoryColors'
import productsData from '@/lib/products.json'
import { track, AnalyticsEvents } from '@/lib/analytics'

type Product = {
  sku: string
  nombre: string
  variante: string | null
  categoria: ProductCategoria
  estado: 'activo' | 'descontinuado' | 'en_desarrollo'
}

const products = productsData as Product[]
const productsBySku = new Map(products.map((p) => [p.sku, p]))
const activeProducts = products.filter((p) => p.estado === 'activo')

// Fallback values — used when WordPress is unreachable or field group not yet published
const FALLBACK: CategoriesSection = {
  eyebrow:  'La Colección',
  headline: 'Un portafolio completo. Un solo proveedor.',
  ctaText:  'Solicitar Catálogo Profesional',
  ctaLink:  '#contacto',
  microtext: 'Fibras, sistemas mop y accesorios — todo con NeoShield™. Para hogar, retail, HORECA e institucional.',
}

// Subset of `destacado: true` highlighted as "Popular" in this UI surface.
// Kept in sync with the Navbar BADGES_NAVBAR set.
const BADGES_CATEGORIES = new Set(['F4', 'F5', 'F7', 'M1', 'M2'])

// Cards rendered as wide hero variant: sole popular SKU in their sub-grupo.
const FEATURED_CARDS = new Set(['F4', 'F5'])

type Section =
  | { kind: 'with-subgrupos'; id: ProductCategoria; titulo: string; color: string; subgrupos: readonly FibraSubgrupo[] }
  | { kind: 'flat';           id: ProductCategoria; titulo: string; color: string }

const SECTIONS: Section[] = [
  {
    kind: 'with-subgrupos',
    id: 'fibras',
    titulo: 'Fibras Abrasivas',
    color: CATEGORY_COLORS.fibras,
    subgrupos: FIBRAS_SUBGRUPOS,
  },
  { kind: 'flat', id: 'mops',       titulo: 'Sistemas Mop',         color: CATEGORY_COLORS.mops },
  { kind: 'flat', id: 'accesorios', titulo: 'Accesorios',           color: CATEGORY_COLORS.accesorios },
  { kind: 'flat', id: 'repuestos',  titulo: 'Repuestos Originales', color: CATEGORY_COLORS.repuestos },
]

function activeBySection(cat: ProductCategoria): Product[] {
  return activeProducts.filter((p) => p.categoria === cat)
}

interface CategoriesProps {
  data?: CategoriesSection | null
}

function ProductCard({
  product,
  chipColor,
  bgColor,
  delay,
  featured = false,
}: {
  product: Product
  chipColor: string
  bgColor: string
  delay: number
  featured?: boolean
}) {
  const nombreFull = product.variante ? `${product.nombre} · ${product.variante}` : product.nombre
  const isPopular  = BADGES_CATEGORIES.has(product.sku)

  const aspectClass  = featured ? 'aspect-[2/1]'   : 'aspect-square'
  const borderClass  = featured ? 'border-2'       : 'border'
  const colSpanClass = featured ? 'sm:col-span-2'  : ''
  const ghostClass   = featured ? 'text-[5.5rem]'  : 'text-[2.6rem] tracking-tighter'
  const nombreClass  = featured ? 'text-[14px] font-semibold' : 'text-[13px] font-medium'
  const cardBorderColor = featured ? bgColor : '#E8EAED'

  return (
    <motion.a
      href={`#contacto?producto=${product.sku}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group block ${colSpanClass}`}
    >
      {/* Card visual con slot reservado para foto futura */}
      <div
        className={`relative overflow-hidden rounded-2xl ${aspectClass} ${borderClass} transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5`}
        style={{
          background:  `linear-gradient(160deg, ${bgColor}14 0%, #FFFFFF 70%)`,
          borderColor: cardBorderColor,
        }}
      >
        {/* SKU chip top-left */}
        <span
          className="absolute top-3 left-3 inline-flex items-center justify-center min-w-[32px] h-6 px-2 rounded text-[10px] font-black text-white z-10"
          style={{ backgroundColor: chipColor }}
        >
          {product.sku}
        </span>

        {/* Popular badge top-right */}
        {isPopular && (
          <span className="absolute top-3 right-3 text-[9px] font-bold text-[#FF2B2B] bg-surface-red px-2 py-0.5 rounded-full z-10">
            Popular
          </span>
        )}

        {/* Ghost SKU — typographic backdrop until product photo arrives */}
        <p
          className={`absolute inset-0 flex items-center justify-center font-black ${ghostClass} leading-none select-none pointer-events-none`}
          style={{ color: `${bgColor}1F` }}
        >
          {product.sku}
        </p>

        {/* T11 reserva: NeoShield badge va en esquina inferior-derecha del slot */}
      </div>

      {/* Info debajo */}
      <div className="px-1 mt-3">
        {featured && (
          <span className="block label-eyebrow text-[9px] mb-1" style={{ color: bgColor }}>
            Producto destacado
          </span>
        )}
        <p className={`${nombreClass} text-[#1A1A1A] group-hover:text-[#0076FF] transition-colors leading-snug`}>
          {nombreFull}
        </p>
      </div>
    </motion.a>
  )
}

function CatalogCTABlock({ ctaText, ctaLink }: { ctaText: string; ctaLink: string }) {
  const handlePdfClick = (catalog: 'fibras' | 'mops') => {
    track(AnalyticsEvents.CatalogDownload, { catalog })
  }

  return (
    <div className="flex flex-col gap-3 self-start lg:self-end shrink-0">
      <a
        href={ctaLink}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0076FF] hover:bg-[#0052CC] text-white text-[14px] font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {ctaText} <ArrowRight size={16} />
      </a>
      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href="/docs/Catalogo_Fibras.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Descargar Catálogo Fibras en PDF, 12 megabytes"
          onClick={() => handlePdfClick('fibras')}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-ink-muted hover:text-[#0076FF] border border-[#E8EAED] hover:border-[#0076FF] rounded-md transition-colors duration-200"
        >
          <Download size={12} />
          Catálogo Fibras (PDF · 12MB)
        </a>
        <a
          href="/docs/Catalogo_Mops.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Descargar Catálogo Mops en PDF, 3 megabytes"
          onClick={() => handlePdfClick('mops')}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-ink-muted hover:text-[#0076FF] border border-[#E8EAED] hover:border-[#0076FF] rounded-md transition-colors duration-200"
        >
          <Download size={12} />
          Catálogo Mops (PDF · 3MB)
        </a>
      </div>
    </div>
  )
}

export default function Categories({ data }: CategoriesProps) {
  const eyebrow   = data?.eyebrow   || FALLBACK.eyebrow
  const headline  = data?.headline  || FALLBACK.headline
  const ctaText   = data?.ctaText   || FALLBACK.ctaText
  const ctaLink   = data?.ctaLink   || FALLBACK.ctaLink
  const microtext = data?.microtext || FALLBACK.microtext

  return (
    <section id="productos" className="section-standard bg-white">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <p className="label-eyebrow text-[#0052CC] mb-3">{eyebrow}</p>
            <h2 className="headline-editorial text-[2.8rem] lg:text-[3.6rem] text-[#1A1A1A] mb-4">
              {headline}
            </h2>
            <p className="text-[1rem] font-normal text-ink-muted leading-[1.75]">{microtext}</p>
          </div>
          <CatalogCTABlock ctaText={ctaText} ctaLink={ctaLink} />
        </motion.div>

        {/* Sections — 4 niveles: Fibras (sub-grupos por uso), Mops, Accesorios, Repuestos */}
        <div className="space-y-16">
          {SECTIONS.map((section) => {
            const sectionCount = activeBySection(section.id).length

            return (
              <div key={section.id}>
                {/* Section header — line divider con cap sólido al inicio (Bloomberg-style) */}
                <div
                  className="relative flex items-baseline gap-4 mb-7 pb-3 border-b-2"
                  style={{ borderColor: `${section.color}20` }}
                >
                  <span
                    className="absolute bottom-0 left-0 w-12 h-[3px] -mb-[2px]"
                    style={{ backgroundColor: section.color }}
                  />
                  <h3
                    className="text-[1.6rem] lg:text-[2rem] font-black tracking-tight"
                    style={{ color: section.color }}
                  >
                    {section.titulo}
                  </h3>
                  <span className="text-[12px] font-medium text-ink-muted">
                    {sectionCount} {sectionCount === 1 ? 'solución' : 'soluciones'}
                  </span>
                </div>

                {section.kind === 'with-subgrupos' ? (
                  <div className="space-y-10">
                    {section.subgrupos.map((sg) => (
                      <div key={sg.id}>
                        {/* Sub-grupo eyebrow + separator */}
                        <div className="flex items-center gap-3 mb-5">
                          <span className="label-eyebrow text-[10px]" style={{ color: sg.color }}>
                            {sg.titulo}
                          </span>
                          <span className="flex-1 h-px" style={{ backgroundColor: `${sg.color}30` }} />
                        </div>

                        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,200px))] gap-5 justify-start">
                          {sg.skus.map((sku, i) => {
                            const p = productsBySku.get(sku)
                            if (!p || p.estado !== 'activo') return null
                            return (
                              <ProductCard
                                key={p.sku}
                                product={p}
                                chipColor={sg.color}
                                bgColor={sg.color}
                                delay={i * 0.05}
                                featured={FEATURED_CARDS.has(p.sku)}
                              />
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,200px))] gap-5 justify-start">
                    {activeBySection(section.id).map((p, i) => (
                      <ProductCard
                        key={p.sku}
                        product={p}
                        chipColor={section.color}
                        bgColor={section.color}
                        delay={i * 0.05}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
