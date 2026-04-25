import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import productsData from '@/lib/products.json'
import { CATEGORIA_LABELS, getChipColor } from '@/lib/categoryColors'
import type { ProductCategoria } from '@/lib/categoryColors'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyCtaBar from '@/components/StickyCtaBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import DistribuidoresCTA from '@/components/DistribuidoresCTA'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import ProductImageBlock from '@/components/ProductImageBlock'
import ProductBadges from '@/components/ProductBadges'
import RelatedProducts from '@/components/RelatedProducts'

type Product = {
  sku: string
  nombre: string
  variante: string | null
  categoria: ProductCategoria
  color: string | null
  uso_principal: string
  descripcion_corta: string
  descripcion_larga: string
  recomendado_para: string[]
  presentacion: { unidad: string; caja: string | null }
  linea: 'standard' | 'ambas'
  estado: 'activo' | 'descontinuado' | 'en_desarrollo'
  antibacterial_neoshield: boolean
  sin_quimicos: boolean
  destacado: boolean
  foto_disponible: boolean
  imagen_path: string | null
  compatible_con: string[] | null
  notas: string | null
}

const products = productsData as Product[]
const productsBySku = new Map(products.map((p) => [p.sku, p]))

const CANAL_LABELS: Record<string, string> = {
  hogar:      'Hogar',
  horeca:     'HORECA',
  industrial: 'Industrial',
  oficinas:   'Oficinas',
  retail:     'Retail',
}

export async function generateStaticParams() {
  return products
    .filter((p) => p.estado === 'activo')
    .map((p) => ({ sku: p.sku }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sku: string }>
}): Promise<Metadata> {
  const { sku } = await params
  const product = productsBySku.get(sku)
  if (!product || product.estado !== 'activo') return {}
  const fullName = product.variante ? `${product.nombre} — ${product.variante}` : product.nombre
  return {
    title: `${fullName} (${product.sku}) — MagiClean`,
    description: product.descripcion_corta,
    openGraph: {
      title: `${fullName} — MagiClean`,
      description: product.descripcion_corta,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sku: string }>
}) {
  const { sku } = await params
  const product = productsBySku.get(sku)
  if (!product || product.estado !== 'activo') notFound()

  const fullName = product.variante ? `${product.nombre} — ${product.variante}` : product.nombre
  const chipColor = getChipColor(product.sku, product.categoria)

  return (
    <>
      <Navbar />

      <main>
        {/* Section 1 — Hero */}
        <section className="bg-white pt-[100px] lg:pt-[120px] pb-16 lg:pb-20">
          <div className="max-w-[1440px] mx-auto px-8">
            <ProductBreadcrumb
              category={product.categoria}
              productName={product.nombre}
              productVariant={product.variante}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-14 items-start">
              <ProductImageBlock
                imagePath={product.imagen_path}
                alt={`${fullName}. ${product.descripcion_corta}`}
                sku={product.sku}
                productName={product.nombre}
              />

              <div>
                <p
                  className="label-eyebrow text-[10px] mb-3"
                  style={{ color: chipColor }}
                >
                  {CATEGORIA_LABELS[product.categoria]} · {product.sku}
                </p>
                <h1 className="headline-editorial text-[2.4rem] lg:text-[3.4rem] text-[#1A1A1A] mb-2 leading-[1.05]">
                  {product.nombre}
                </h1>
                {product.variante && (
                  <p className="text-[1.1rem] font-normal text-ink-muted mb-5">
                    {product.variante}
                  </p>
                )}
                <p className="text-[1rem] font-normal text-[#1A1A1A] leading-[1.7] mb-7 max-w-prose">
                  {product.descripcion_corta}
                </p>

                <div className="mb-8">
                  <ProductBadges
                    antibacterial={product.antibacterial_neoshield}
                    sinQuimicos={product.sin_quimicos}
                    destacado={product.destacado}
                  />
                </div>

                <Link
                  href="/#contacto"
                  className="inline-flex items-center justify-center gap-2 bg-[#0076FF] hover:bg-[#0052CC] text-white px-7 py-3 rounded-full text-[14px] font-semibold transition-colors duration-200"
                >
                  Solicitar cotización
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Detalle (bg-deep) */}
        <section className="bg-deep py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="max-w-3xl">
              <p className="label-eyebrow text-white/60 text-[10px] mb-4">Uso principal</p>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-medium text-white leading-[1.4] mb-10">
                {product.uso_principal}
              </p>

              <p className="text-[1rem] font-normal text-white/80 leading-[1.8] mb-10">
                {product.descripcion_larga}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="label-eyebrow text-white/60 text-[10px] mr-1">Recomendado para</span>
                {product.recomendado_para.map((canal) => (
                  <span
                    key={canal}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/90 text-[12px] font-medium"
                  >
                    {CANAL_LABELS[canal] ?? canal}
                  </span>
                ))}
              </div>

              <p className="text-[12px] text-white/60">
                Línea:{' '}
                <span className="text-white/90 font-medium">
                  {product.linea === 'ambas' ? 'Standard y PRO' : 'Standard'}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 — Presentación comercial */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="max-w-3xl">
              <p className="label-eyebrow text-[#0052CC] text-[10px] mb-4">Presentación comercial</p>
              <h2 className="headline-editorial text-[1.8rem] lg:text-[2.2rem] text-[#1A1A1A] mb-8">
                Volúmenes y unidades de venta
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="border border-[#E8EAED] rounded-2xl p-6">
                  <p className="label-eyebrow text-ink-muted text-[10px] mb-3">Unidad</p>
                  <p className="text-[1.2rem] font-semibold text-[#1A1A1A]">
                    {product.presentacion.unidad}
                  </p>
                </div>
                {product.presentacion.caja && (
                  <div className="border border-[#E8EAED] rounded-2xl p-6">
                    <p className="label-eyebrow text-ink-muted text-[10px] mb-3">Caja completa</p>
                    <p className="text-[1.2rem] font-semibold text-[#1A1A1A]">
                      {product.presentacion.caja}
                    </p>
                  </div>
                )}
              </div>

              {product.compatible_con && product.compatible_con.length > 0 && (
                <div className="mb-10">
                  <p className="label-eyebrow text-ink-muted text-[10px] mb-3">Compatible con</p>
                  <div className="flex flex-wrap gap-2">
                    {product.compatible_con.map((cs) => {
                      const compat = productsBySku.get(cs)
                      if (!compat) return null
                      return (
                        <Link
                          key={cs}
                          href={`/productos/${cs}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8EAED] hover:border-[#0076FF] hover:bg-[#F0F5FF] text-[12px] font-medium text-[#1A1A1A] transition-colors"
                        >
                          <span className="font-bold text-[#0076FF]">{compat.sku}</span>
                          {compat.nombre}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0076FF] text-[#0076FF] hover:bg-[#0076FF] hover:text-white px-7 py-3 rounded-full text-[14px] font-semibold transition-colors duration-200"
              >
                Solicitar cotización por volumen
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4 — Productos relacionados */}
        <RelatedProducts
          currentSku={product.sku}
          category={product.categoria}
          products={products}
        />

        {/* Section 5 — CTA cierre (reuses DistribuidoresCTA fallback content) */}
        <DistribuidoresCTA data={null} />
      </main>

      <Footer />
      <StickyCtaBar />
      <WhatsAppButton />
    </>
  )
}
