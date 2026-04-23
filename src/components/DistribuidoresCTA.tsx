'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { DistribuidoresSection } from '@/lib/wordpress'

// Info logística (tiempos, MOQ, cobertura) vive en <Logistica />. Esta sección
// es 100% CTA de reclutamiento B2B. Si WordPress envía `zones` lo ignoramos —
// la cobertura se muestra en la sección anterior como 3 tiers temporales.

const BENEFITS = [
  { label: 'Márgenes competitivos', detail: 'Estructura B2B optimizada' },
  { label: 'Capacitación técnica',  detail: 'Producto y NeoShield™' },
  { label: 'Soporte dedicado',      detail: 'Ventas + postventa' },
  { label: 'Marca editorial',       detail: 'Premium en canal B2B' },
]

// Fallback values — used when WordPress is unreachable or field group not yet published
const FALLBACK: DistribuidoresSection = {
  eyebrow:  'Únete a la red',
  headline: 'Conviértete en distribuidor MagicClean',
  body:     'Márgenes competitivos frente a multinacionales. Capacitación técnica sobre NeoShield™. Soporte de ventas dedicado. Una marca B2B con recorrido en marketplaces y visión editorial para el canal.',
  ctaLabel: 'Quiero ser distribuidor',
  ctaUrl:   '?canal=distribuidor#contacto',
  note:     'Cobertura operativa y tiempos de entrega detallados en la sección anterior.',
  zones:    'CDMX, Guadalajara, Monterrey, Puebla, Tijuana, Querétaro',
}

interface DistribuidoresCTAProps {
  data?: DistribuidoresSection | null
}

export default function DistribuidoresCTA({ data }: DistribuidoresCTAProps) {
  const eyebrow  = data?.eyebrow  || FALLBACK.eyebrow
  const headline = data?.headline || FALLBACK.headline
  const body     = data?.body     || FALLBACK.body
  const ctaLabel = data?.ctaLabel || FALLBACK.ctaLabel
  const ctaUrl   = data?.ctaUrl   || FALLBACK.ctaUrl
  const note     = data?.note     || FALLBACK.note

  return (
    <section id="distribuidores" className="relative overflow-hidden bg-[var(--color-primary-dark)] py-16">
      {/* Textura decorativa */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #fff 0%, transparent 60%)' }} />

      <div className="relative max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-eyebrow text-[#FF2B2B] mb-5">{eyebrow}</p>
            <h2 className="headline-editorial text-[2rem] sm:text-[2.6rem] lg:text-[3.4rem] text-white mb-6 max-w-md">
              {headline}
            </h2>
            <p className="text-[1rem] font-normal text-white leading-[1.75] max-w-md mb-8">
              {body}
            </p>

            <a
              href={ctaUrl}
              className="inline-flex items-center gap-2.5 bg-white text-[#0076FF] px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-surface-blue transition-colors duration-300 group"
            >
              {ctaLabel}
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

          {/* Beneficios como distribuidor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-eyebrow text-white mb-5">Qué recibes como distribuidor</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFITS.map((b) => (
                <div
                  key={b.label}
                  className="bg-white/10 hover:bg-white/20 transition-colors duration-200 rounded-xl px-4 py-3 cursor-default"
                >
                  <p className="text-[13px] font-semibold text-white">{b.label}</p>
                  <p className="text-[11px] font-normal text-white/60 mt-0.5">{b.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-[12px] font-normal text-white/50 mt-4">{note}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
