'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import productsData from '@/lib/products.json'

type Product = {
  sku: string
  nombre: string
  variante: string | null
  categoria: 'fibras' | 'mops' | 'accesorios' | 'repuestos'
  estado: 'activo' | 'descontinuado' | 'en_desarrollo'
}

const products = productsData as Product[]
const productsBySku = new Map(products.map((p) => [p.sku, p]))

function getProduct(sku: string): Product {
  const p = productsBySku.get(sku)
  if (!p) throw new Error(`Product ${sku} not found in products.json`)
  return p
}

const M1 = getProduct('M1')
const M2 = getProduct('M2')

// Footer "También disponibles": resto de mops para piso, excluyendo M1/M2 (heros)
// y M4 (Dispositivo Limpieza Baños — funcionalmente baño, no piso).
const ALSO_AVAILABLE_SKUS = ['M5', 'M6', 'M9', 'M18']
const masModelos = ALSO_AVAILABLE_SKUS.map((sku) => {
  const p = getProduct(sku)
  return {
    codigo: p.sku,
    nombre: p.variante ? `${p.nombre} · ${p.variante}` : p.nombre,
  }
})

const m1Specs = [
  'Cubo con pedal — escurrido sin agacharse',
  'Mopa de microfibra NeoShield™ incluida',
  'Compatible con repuesto M3',
]

const m2Specs = [
  'Diseño compacto — ideal para espacios medianos',
  'Centrifugado manual, sin pedal',
  'Precio imbatible en el mercado',
]

export default function ProductHeroMop() {
  return (
    <section id="sistemas-mop-m1" className="relative overflow-hidden bg-deep py-20">

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-8 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p className="label-eyebrow text-[#0076FF] mb-3">Sistemas Mop</p>
            <h2 className="headline-editorial text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem] text-white max-w-xl mb-4">
              Piso impecable. Sin esfuerzo.{' '}
              <span className="italic text-[#0076FF]">Sin químicos adicionales.</span>
            </h2>
            <p className="text-[1rem] font-normal text-white/50 leading-[1.75] max-w-lg">
              Dos sistemas con microfibra NeoShield™. El M1 para quien exige potencia. El M2 para quien necesita eficiencia.
            </p>
          </div>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2.5 bg-[#0076FF] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-white hover:text-[#0A1628] transition-all duration-300 group self-start lg:self-auto shrink-0"
          >
            Cotizar este sistema
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>

      {/* Split M1 | M2 */}
      <div className="max-w-[1440px] mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* M1 — Turbo Magic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* === SLOT DE IMAGEN 3:4 — placeholder editorial hasta llegada de foto === */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <div className="absolute inset-0 bg-deep-darker" />
              {/* Cuando llegue la foto: comentar este bloque placeholder y descomentar el <Image> */}
              {/* <Image src="/products/m1-product.webp" alt="M1 Turbo Magic" fill className="object-cover object-center" /> */}

              {/* Bloomberg-cap — firma visual top-left */}
              <span className="absolute top-0 left-0 w-12 h-[3px] bg-[#0076FF] z-20" />

              {/* Placeholder editorial — composición tipográfica monumental */}
              <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none px-6">
                <p className="text-white/15 text-[0.875rem] sm:text-[1rem] font-medium uppercase tracking-[0.35em] mb-4 text-center leading-tight">
                  {M1.nombre.toUpperCase()}
                </p>
                <p className="font-black text-[#0076FF]/15 leading-none tracking-tight text-[clamp(8rem,15vw,14rem)]">
                  {M1.sku}
                </p>
                <p className="label-eyebrow text-[#0076FF]/40 text-[10px] mt-4">
                  NeoShield™ Engineered
                </p>
              </div>

              {/* Badge superpuesto */}
              <span className="absolute top-5 right-5 label-eyebrow text-[10px] px-3 py-1.5 rounded-full text-white bg-[#0076FF] z-10">
                Más vendido
              </span>
            </div>

            {/* Texto debajo de la imagen */}
            <div className="p-8">
              <p className="font-black text-[4rem] leading-none text-[#0076FF] mb-1">{M1.sku}</p>
              <p className="text-white/80 text-[1.1rem] font-semibold leading-tight mb-1">{M1.nombre}</p>
              <p className="text-white/50 font-normal text-[13px] mb-6">Con pedal · Escurrido automático</p>

              <p className="label-eyebrow text-[#0076FF] text-[10px] mb-5">Retail · HORECA · Hogar</p>

              <ul className="space-y-3">
                {m1Specs.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="w-4 h-px bg-[#0076FF] mt-[0.6rem] shrink-0" />
                    <span className="text-[13px] font-normal text-white/50">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* M2 — Spin Magic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* === SLOT DE IMAGEN 3:4 — placeholder editorial hasta llegada de foto === */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <div className="absolute inset-0 bg-deep-darker" />
              {/* Cuando llegue la foto: comentar este bloque placeholder y descomentar el <Image> */}
              {/* <Image src="/products/m2-product.webp" alt="M2 Spin Magic" fill className="object-cover object-center" /> */}

              {/* Bloomberg-cap — firma visual top-left */}
              <span className="absolute top-0 left-0 w-12 h-[3px] bg-[#0076FF] z-20" />

              {/* Placeholder editorial — composición tipográfica monumental */}
              <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none px-6">
                <p className="text-white/15 text-[0.875rem] sm:text-[1rem] font-medium uppercase tracking-[0.35em] mb-4 text-center leading-tight">
                  {M2.nombre.toUpperCase()}
                </p>
                <p className="font-black text-[#0076FF]/15 leading-none tracking-tight text-[clamp(8rem,15vw,14rem)]">
                  {M2.sku}
                </p>
                <p className="label-eyebrow text-[#0076FF]/40 text-[10px] mt-4">
                  NeoShield™ Engineered
                </p>
              </div>

              {/* Badge superpuesto */}
              <span
                className="absolute top-5 right-5 label-eyebrow text-[10px] px-3 py-1.5 rounded-full text-white/50 z-10"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                Compacto
              </span>
            </div>

            {/* Texto debajo de la imagen */}
            <div className="p-8">
              <p className="font-black text-[4rem] leading-none text-[#0076FF] mb-1">{M2.sku}</p>
              <p className="text-white/80 text-[1.1rem] font-semibold leading-tight mb-1">{M2.nombre}</p>
              <p className="text-white/50 font-normal text-[13px] mb-6">Sin pedal · Centrifugado manual</p>

              <p className="label-eyebrow text-[#0076FF] text-[10px] mb-5">Apartamentos · Oficinas</p>

              <ul className="space-y-3">
                {m2Specs.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="w-4 h-px bg-[#0076FF] mt-[0.6rem] shrink-0" />
                    <span className="text-[13px] font-normal text-white/50">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Más modelos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mt-5"
        >
          <p className="label-eyebrow text-white/60 text-[10px]" aria-hidden="true">También disponibles</p>
          {masModelos.map((m) => (
            <a
              key={m.codigo}
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 hover:border-white/20 transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="font-black text-[13px] text-white/50">{m.codigo}</span>
              <span className="text-[13px] font-normal text-white/50">{m.nombre}</span>
            </a>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
