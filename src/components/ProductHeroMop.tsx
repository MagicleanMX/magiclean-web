'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

const m1Benefits = [
  'Cubo con pedal — escurrido sin agacharse',
  'Mopa de microfibra incluida',
  'Compatible con repuesto M3',
]

const m2Benefits = [
  'Diseño compacto — ideal para espacios medianos',
  'Centrifugado manual, sin pedal',
  'Precio imbatible en el mercado',
]

const masModelos = [
  { codigo: 'M5', nombre: 'Rectangular' },
  { codigo: 'M6', nombre: 'Doble Función' },
  { codigo: 'M9', nombre: 'Atomizador' },
]

export default function ProductHeroMop() {
  return (
    <section id="sistemas-mop-m1" className="relative overflow-hidden bg-[#0A1628] py-20">

      {/* Glow decorativo */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] rounded-full bg-[#0076FF]/6 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="label-eyebrow text-[#0076FF] mb-3">Sistemas Mop — La línea completa</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="headline-editorial text-[2.8rem] lg:text-[3.6rem] xl:text-[4.2rem] text-white max-w-lg">
              Limpieza profesional.{' '}
              <span className="italic" style={{ color: '#74B9FF' }}>Sin esfuerzo.</span>
            </h2>
            <p className="text-[14px] font-light text-white/40 max-w-xs leading-relaxed">
              M1 y M2 lideran ventas en MercadoLibre y Amazon México.
            </p>
          </div>
        </motion.div>

        {/* Cards M1 + M2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">

          {/* M1 — Turbo Magic */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl p-8 flex flex-col"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Badge */}
            <span
              className="absolute top-5 right-5 label-eyebrow text-[9px] px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: '#0076FF' }}
            >
              Más vendido
            </span>

            {/* Visual placeholder */}
            <div className="mb-6 flex items-end gap-4">
              <p className="font-black text-[3.5rem] sm:text-[5rem] leading-none text-[#0076FF]">M1</p>
              <div className="mb-2">
                <p className="text-white/60 text-[0.95rem] font-semibold leading-tight">Turbo Magic</p>
                <p className="text-white/30 text-[12px] font-light">Con pedal · Escurrido automático</p>
              </div>
            </div>

            {/* Canal */}
            <p className="label-eyebrow text-[#0076FF] text-[9px] mb-5">Retail · HORECA · Hogar</p>

            {/* Benefits */}
            <ul className="space-y-3 mb-8 flex-1">
              {m1Benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="w-4 h-px bg-[#0076FF] mt-[0.6rem] shrink-0" />
                  <span className="text-[13px] font-light text-white/50">{b}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 bg-[#0076FF] text-white px-6 py-3 rounded-full text-[13px] font-semibold hover:bg-[#0052CC] transition-colors duration-300 group self-start"
            >
              Quiero el M1
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

          {/* M2 — Spin Magic */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl p-8 flex flex-col"
            style={{ background: 'rgba(116,185,255,0.04)', border: '1px solid rgba(116,185,255,0.1)' }}
          >
            {/* Badge */}
            <span
              className="absolute top-5 right-5 label-eyebrow text-[9px] px-3 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(116,185,255,0.15)', color: '#74B9FF' }}
            >
              Compacto
            </span>

            {/* Visual placeholder */}
            <div className="mb-6 flex items-end gap-4">
              <p className="font-black text-[3.5rem] sm:text-[5rem] leading-none" style={{ color: '#74B9FF' }}>M2</p>
              <div className="mb-2">
                <p className="text-white/60 text-[0.95rem] font-semibold leading-tight">Spin Magic</p>
                <p className="text-white/30 text-[12px] font-light">Sin pedal · Centrifugado manual</p>
              </div>
            </div>

            {/* Canal */}
            <p className="label-eyebrow text-[9px] mb-5" style={{ color: '#74B9FF' }}>Apartamentos · Oficinas · Jóvenes</p>

            {/* Benefits */}
            <ul className="space-y-3 mb-8 flex-1">
              {m2Benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="w-4 h-px mt-[0.6rem] shrink-0" style={{ backgroundColor: '#74B9FF' }} />
                  <span className="text-[13px] font-light text-white/50">{b}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 text-white px-6 py-3 rounded-full text-[13px] font-semibold transition-all duration-300 group self-start"
              style={{ border: '1px solid rgba(116,185,255,0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(116,185,255,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Quiero el M2
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>

        {/* Más modelos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3"
        >
          <p className="label-eyebrow text-white/25 text-[9px]">También disponibles</p>
          {masModelos.map((m) => (
            <a
              key={m.codigo}
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 hover:border-white/20 transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="font-black text-[11px] text-white/50">{m.codigo}</span>
              <span className="text-[11px] font-light text-white/25">{m.nombre}</span>
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
