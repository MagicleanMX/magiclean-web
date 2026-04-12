'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import type { DistribuidoresSection } from '@/lib/wordpress'

// Fallback values — used when WordPress is unreachable or field group not yet published
const FALLBACK: DistribuidoresSection = {
  eyebrow:  'Únete a la red',
  headline: 'Conviértete en distribuidor MagicClean',
  body:     'Accede a márgenes exclusivos, capacitación técnica y soporte de ventas. Expandimos nuestra red en todo México y Latinoamérica.',
  ctaLabel: 'Quiero ser distribuidor',
  ctaUrl:   '#contacto',
  note:     '+ 24 zonas más disponibles a nivel nacional',
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
  const zonas    = (data?.zones || FALLBACK.zones)
    .split(',')
    .map((z) => z.trim())
    .filter(Boolean)

  return (
    <section id="distribuidores" className="relative overflow-hidden bg-[#0076FF] py-16">
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
            <p className="label-eyebrow text-white/60 mb-5">{eyebrow}</p>
            <h2 className="headline-editorial text-[2.6rem] lg:text-[3.4rem] text-white mb-6 max-w-md">
              {headline}
            </h2>
            <p className="text-[1rem] font-light text-white/75 leading-[1.75] max-w-md mb-8">
              {body}
            </p>

            <a
              href={ctaUrl}
              className="inline-flex items-center gap-2.5 bg-white text-[#0076FF] px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#F0F5FF] transition-colors duration-300 group"
            >
              {ctaLabel}
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

          {/* Zonas disponibles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-eyebrow text-white/50 mb-5">Zonas disponibles</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {zonas.map((z) => (
                <div
                  key={z}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors duration-200 rounded-xl px-4 py-3 cursor-default"
                >
                  <MapPin size={12} className="text-white/60 shrink-0" />
                  <span className="text-[13px] font-medium text-white">{z}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] font-light text-white/40 mt-4">{note}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
