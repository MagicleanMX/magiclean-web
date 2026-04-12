'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { HeroSection } from '@/lib/wordpress'

const canales = ['HOGAR', 'RETAIL', 'HORECA', 'INDUSTRIAL', 'INSTITUCIONAL']

// Fallback values — used when WordPress is unreachable or fields are empty
const FALLBACK: HeroSection = {
  eyebrow:       'Proveedor B2B · Canal Profesional México',
  headline:      'El arte de la limpieza perfecta',
  subheadline:   'Fibras, sistemas de mop y soluciones especializadas para el canal profesional.',
  heroMicrotext: 'Distribuidores · Retail · HORECA · Institucional · México y LATAM',
}

interface HeroProps {
  data?: HeroSection | null
}

export default function Hero({ data }: HeroProps) {
  const eyebrow       = data?.eyebrow       || FALLBACK.eyebrow
  const headline      = data?.headline      || FALLBACK.headline
  const subheadline   = data?.subheadline   || FALLBACK.subheadline
  const heroMicrotext = data?.heroMicrotext || FALLBACK.heroMicrotext
  return (
    <section className="relative min-h-screen flex flex-col pt-[68px]">

      {/* Main hero — split layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[52%_48%] min-h-[calc(100vh-68px)]">

        {/* Izquierda — contenido */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20 lg:py-0 order-2 lg:order-1">

          {/* Eyebrow — posicionamiento B2B claro */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] shrink-0" />
            <span className="label-eyebrow text-[#999]">{eyebrow}</span>
          </motion.div>

          {/* Headline — tagline de marca, mantener */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="headline-editorial text-[2.8rem] sm:text-[3.8rem] lg:text-[4.4rem] xl:text-[5.4rem] text-[#1A1A1A] mb-6 max-w-xl"
          >
            {headline}
          </motion.h1>

          {/* Subheadline — con claridad B2B */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[1rem] font-light text-[#666] leading-[1.75] max-w-sm mb-3"
          >
            {subheadline}
          </motion.p>

          {/* Micro-texto B2B */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[0.8rem] font-light text-[#B8BDC5] tracking-wide mb-8"
          >
            {heroMicrotext}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#contacto"
              className="inline-flex items-center justify-center bg-[#0076FF] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold tracking-wide hover:bg-[#0052CC] transition-colors duration-300"
            >
              Solicitar cotización B2B
            </a>
            <a
              href="#productos"
              className="inline-flex items-center justify-center border border-[#D0D0D0] text-[#1A1A1A] px-8 py-3.5 rounded-full text-[13px] font-semibold tracking-wide hover:border-[#1A1A1A] transition-colors duration-300"
            >
              Ver portafolio completo
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex items-center gap-10 mt-10 pt-6 border-t border-[#E8EAED]"
          >
            {[
              { n: '3', label: 'Años de crecimiento' },
              { n: 'ML · AMZ · WMT', label: 'Marketplaces activos' },
              { n: '23', label: 'Modelos especializados' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-[#1A1A1A] leading-none mb-1">{s.n}</p>
                <p className="label-eyebrow text-[#999]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Derecha — visual editorial (mientras llega la foto real) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative order-1 lg:order-2 min-h-[50vw] lg:min-h-0 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D2040 50%, #061018 100%)' }}
        >
          {/* Glow de fondo */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #0076FF 0%, transparent 70%)' }} />
          </div>

          {/* Centro — producto hero visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">

              {/* Círculo de producto */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-48 h-48 lg:w-64 lg:h-64 rounded-full mx-auto mb-8 flex items-center justify-center relative"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,118,255,0.1)', border: '1px solid rgba(0,118,255,0.2)' }}
                >
                  <div className="text-center">
                    <p className="font-black text-white text-3xl lg:text-4xl leading-none tracking-tight">Magic</p>
                    <p className="font-black text-[#0076FF] text-3xl lg:text-4xl leading-none tracking-tight">Clean</p>
                  </div>
                </div>
              </motion.div>

              {/* Tagline secundario */}
              <p className="text-white/20 text-[11px] font-semibold uppercase tracking-[0.2em]">
                Tecnología Profesional
              </p>
            </div>
          </div>

          {/* Badge NeoShield — top right */}
          <div className="absolute top-8 right-8 rounded-2xl px-4 py-3 flex items-center gap-2 z-10"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF2B2B]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">NeoShield™</span>
          </div>

          {/* Badge 99.9% bacterias — bottom left */}
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-8 left-8 rounded-2xl px-5 py-3 z-10"
            style={{ background: 'rgba(0,118,255,0.15)', border: '1px solid rgba(0,118,255,0.3)' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#74B9FF] mb-0.5">Elimina bacterias</p>
            <p className="text-2xl font-black text-white leading-none">99.9%</p>
          </motion.div>

          {/* Badge 3x durabilidad — bottom right */}
          <div className="absolute bottom-8 right-8 rounded-xl px-4 py-2.5 z-10"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Durabilidad</p>
            <p className="text-lg font-black text-white leading-tight">3×</p>
          </div>
        </motion.div>
      </div>

      {/* Canal ticker */}
      <div className="bg-[#1A1A1A] py-3.5">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {canales.map((c, i) => (
              <span key={c} className="flex items-center gap-8">
                <span className="label-eyebrow text-white/50 text-[10px]">{c}</span>
                {i < canales.length - 1 && (
                  <span className="text-white/20 select-none text-xs">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
