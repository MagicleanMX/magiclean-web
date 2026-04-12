'use client'

import { motion } from 'framer-motion'
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
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-0 order-1">

          {/* Eyebrow — posicionamiento B2B claro */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] shrink-0" />
            <span className="label-eyebrow text-[#0076FF]">{eyebrow}</span>
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
            className="text-[1rem] font-light text-[#666666] leading-[1.75] max-w-sm mb-3"
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
            className="flex items-center gap-6 sm:gap-10 mt-10 pt-6 border-t border-[#E8EAED] flex-wrap"
          >
            {[
              { n: '3', label: 'Años de crecimiento' },
              { n: 'ML · AMZ · WMT', label: 'Marketplaces activos' },
              { n: '23', label: 'Modelos especializados' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl sm:text-2xl font-black text-[#1A1A1A] leading-none mb-1">{s.n}</p>
                <p className="label-eyebrow text-[#666666]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Derecha — portafolio editorial (slot para foto de producto) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative order-2 min-h-[500px] sm:min-h-[420px] lg:min-h-0 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #0D2040 0%, #0A1628 50%, #060E1C 100%)' }}
        >
          {/* Glow suave — sin distracciones */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #0076FF 0%, transparent 65%)' }} />
          </div>

          {/* ── Sistema de producto — grid editorial ── */}
          <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 lg:px-14 pb-16 lg:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[340px]"
            >
              {/* Header del panel */}
              <div className="flex items-center justify-between mb-6">
                <p className="label-eyebrow text-white/20 text-[9px] tracking-[0.25em]">Portafolio completo</p>
                <p className="label-eyebrow text-white/20 text-[9px] tracking-[0.15em]">23 modelos</p>
              </div>

              {/* Tabla de producto — 2 columnas */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>

                {/* Header columnas */}
                <div className="grid grid-cols-2">
                  <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'rgba(255,43,43,0.08)', borderBottom: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B]" />
                    <p className="label-eyebrow text-[#FF2B2B] text-[9px]">Línea Fibras</p>
                  </div>
                  <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'rgba(0,118,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF]" />
                    <p className="label-eyebrow text-[#0076FF] text-[9px]">Línea Mops</p>
                  </div>
                </div>

                {/* Filas de producto */}
                {[
                  {
                    fibra: { codes: 'F1 · F2 · F3', name: 'Fibras Verdes', dot: '#FF2B2B' },
                    mop:   { codes: 'M1', name: 'Turbo Magic', star: true, dot: '#0076FF' },
                  },
                  {
                    fibra: { codes: 'F4', name: 'Dual ★', dot: '#FF2B2B' },
                    mop:   { codes: 'M2', name: 'Spin Magic', star: true, dot: '#0076FF' },
                  },
                  {
                    fibra: { codes: 'F5 · F6 · F7', name: 'Especiales', dot: '#FF2B2B' },
                    mop:   { codes: 'M5 · M6', name: 'Rect. y Doble', dot: '#0076FF' },
                  },
                  {
                    fibra: { codes: 'F8 · F9', name: 'Borradores', dot: '#FF2B2B' },
                    mop:   { codes: 'M9', name: 'Atomizador', dot: '#0076FF' },
                  },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-2" style={{ borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div className="px-5 py-3.5 flex items-center gap-2.5" style={{ borderRight: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.fibra.dot }} />
                      <div>
                        <p className="text-white font-black text-[11px] leading-none tracking-tight">{row.fibra.codes}</p>
                        <p className="text-white/20 text-[9px] font-light mt-0.5">{row.fibra.name}</p>
                      </div>
                    </div>
                    <div className="px-5 py-3.5 flex items-center gap-2.5" style={{ background: 'rgba(0,118,255,0.03)' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.mop.dot }} />
                      <div>
                        <p className="text-white font-black text-[11px] leading-none tracking-tight">{row.mop.codes}</p>
                        <p className="text-white/20 text-[9px] font-light mt-0.5">{row.mop.name}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Footer — accesorios */}
                <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <p className="text-white/20 text-[10px] font-light">M3 · M4 · M7 · M8 · M10 · M16 · M17 · M18 — Accesorios</p>
                </div>
              </div>

              {/* NeoShield note */}
              <p className="text-white/20 text-[9px] font-light text-center mt-4 tracking-wide">
                Todos con tecnología NeoShield™ · Antibacterial permanente
              </p>
            </motion.div>
          </div>

          {/* Badge 99.9% — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute bottom-8 left-8 rounded-2xl px-5 py-3 z-10"
            style={{ background: 'rgba(0,118,255,0.15)', border: '1px solid rgba(0,118,255,0.25)' }}
          >
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/80 mb-0.5">Elimina bacterias</p>
            <p className="text-2xl font-black text-white leading-none">99.9%</p>
          </motion.div>

          {/* Badge 3× — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-8 right-8 rounded-xl px-4 py-2.5 z-10"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">Durabilidad</p>
            <p className="text-lg font-black text-white leading-tight">3×</p>
          </motion.div>
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
