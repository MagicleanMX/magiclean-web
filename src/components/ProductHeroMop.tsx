'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

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

const masModelos = [
  { codigo: 'M5', nombre: 'Rectangular' },
  { codigo: 'M6', nombre: 'Doble Función' },
  { codigo: 'M9', nombre: 'Atomizador' },
]

export default function ProductHeroMop() {
  return (
    <section id="sistemas-mop-m1" className="relative overflow-hidden bg-[#0A1628]">

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
            <h2 className="headline-editorial text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem] text-white max-w-xl">
              Piso impecable. Sin esfuerzo.{' '}
              <span className="italic text-[#0076FF]">Sin químicos adicionales.</span>
            </h2>
          </div>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2.5 bg-[#0076FF] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-white hover:text-[#0A1628] transition-all duration-300 group self-start lg:self-auto shrink-0"
          >
            Solicitar cotización
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
            className="relative rounded-2xl p-8"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="absolute top-5 right-5 label-eyebrow text-[9px] px-3 py-1.5 rounded-full text-white bg-[#0076FF]">
              Más vendido
            </span>

            <p className="font-black text-[4rem] leading-none text-[#0076FF] mb-1">M1</p>
            <p className="text-white/80 text-[1.1rem] font-semibold leading-tight mb-1">Turbo Magic</p>
            <p className="text-white/20 text-[12px] font-light mb-6">Con pedal · Escurrido automático</p>

            <p className="label-eyebrow text-[#0076FF] text-[9px] mb-5">Retail · HORECA · Hogar</p>

            <ul className="space-y-3">
              {m1Specs.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="w-4 h-px bg-[#0076FF] mt-[0.6rem] shrink-0" />
                  <span className="text-[13px] font-light text-white/50">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* M2 — Spin Magic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl p-8"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span
              className="absolute top-5 right-5 label-eyebrow text-[9px] px-3 py-1.5 rounded-full text-white/50"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Compacto
            </span>

            <p className="font-black text-[4rem] leading-none text-[#0076FF] mb-1">M2</p>
            <p className="text-white/80 text-[1.1rem] font-semibold leading-tight mb-1">Spin Magic</p>
            <p className="text-white/20 text-[12px] font-light mb-6">Sin pedal · Centrifugado manual</p>

            <p className="label-eyebrow text-[#0076FF] text-[9px] mb-5">Apartamentos · Oficinas</p>

            <ul className="space-y-3">
              {m2Specs.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="w-4 h-px bg-[#0076FF] mt-[0.6rem] shrink-0" />
                  <span className="text-[13px] font-light text-white/50">{s}</span>
                </li>
              ))}
            </ul>
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
          <p className="label-eyebrow text-white/20 text-[9px]">También disponibles</p>
          {masModelos.map((m) => (
            <a
              key={m.codigo}
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 hover:border-white/20 transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="font-black text-[11px] text-white/50">{m.codigo}</span>
              <span className="text-[11px] font-light text-white/20">{m.nombre}</span>
            </a>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
