'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

const benefits = [
  'Sin agacharte. Sin mojarte las manos.',
  'Microfibra NeoShield™ activa en cada pasada.',
  'Compatible con todo tipo de pisos.',
  'Escurrido fácil — sin esfuerzo.',
]

export default function ProductHeroM1() {
  return (
    <section id="sistemas-mop-m1" className="relative overflow-hidden bg-[#F5F7FA]">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── Izquierda — texto editorial ── */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-20 order-2 lg:order-1">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-eyebrow text-[#0076FF] mb-3"
          >
            Sistema Mop M1 — Hogar · Retail
          </motion.p>

          {/* Headline editorial — Variante 4 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <h2 className="headline-editorial text-[2.8rem] lg:text-[3.6rem] xl:text-[4.2rem] text-[#1A1A1A]">
              Rápida.{' '}
              <span className="italic text-[#0076FF]">Poderosa.</span>
              <br />
              Sin rodillas en el suelo.
            </h2>
          </motion.div>

          {/* NeoShield badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="inline-flex items-center gap-2 bg-[#0076FF]/8 border border-[#0076FF]/20 rounded-full px-4 py-2">
              <ShieldCheck size={14} className="text-[#0076FF] shrink-0" />
              <span className="text-[#0076FF] text-[12px] font-bold tracking-wide">
                NeoShield™ — Elimina el 99.9% de bacterias
              </span>
            </div>
          </motion.div>

          {/* Segunda línea narrativa */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[0.95rem] font-light text-[#888] tracking-wide mb-6"
          >
            Así debió ser siempre.
          </motion.p>

          {/* Párrafo narrativo */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[1rem] font-light text-[#666] leading-[1.75] max-w-md mb-6"
          >
            El M1 limpia a fondo sin que tú te agaches, te mojes ni te esfuerces.
            Su microfibra con NeoShield™ integrado elimina el 99.9% de bacterias
            en cada pasada — sin químicos adicionales, sin complicaciones.
          </motion.p>

          {/* Benefits */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="space-y-3 mb-8"
          >
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#0076FF]/10 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF]" />
                </span>
                <span className="text-[14px] font-light text-[#555]">{b}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 bg-[#0076FF] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#0052CC] transition-all duration-300 group"
            >
              Quiero el M1 en mi tienda
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 border border-[#1A1A1A]/20 text-[#555] px-8 py-3.5 rounded-full text-[13px] font-semibold hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-300"
            >
              Solicitar muestra
            </a>
          </motion.div>
        </div>

        {/* ── Derecha — imagen producto ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white min-h-[55vw] lg:min-h-0 order-1 lg:order-2 overflow-hidden"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">

            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 rounded-full bg-[#0076FF]/5 blur-[100px]" />
            </div>

            {/* Placeholder producto */}
            <div className="relative w-56 h-72 lg:w-72 lg:h-96 rounded-2xl bg-gradient-to-b from-[#F0F4FF] to-[#E8EEFF] border border-[#D0DEFF] flex items-center justify-center shadow-sm">
              <div className="text-center">
                <p className="font-black text-[#0076FF] text-5xl lg:text-6xl leading-none">M1</p>
                <p className="text-[#999] text-xs font-medium tracking-wider mt-2 uppercase">Sistema Mop</p>
                <div className="mt-4 mx-auto inline-flex items-center gap-1.5 bg-[#0076FF]/10 rounded-full px-3 py-1">
                  <ShieldCheck size={11} className="text-[#0076FF]" />
                  <span className="text-[10px] font-bold text-[#0076FF] uppercase tracking-wide">NeoShield™</span>
                </div>
              </div>
            </div>

            {/* Badge 99.9% */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#0A1628] text-white rounded-2xl px-6 py-4 text-center shadow-xl"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Elimina bacterias</p>
              <p className="text-3xl font-black leading-none">99.9%</p>
              <p className="text-[10px] text-white/40 mt-1 font-light">Tecnología NeoShield™</p>
            </motion.div>

            {/* Badge rapidez */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute bottom-8 left-8 bg-white border border-[#E8EAED] rounded-xl px-4 py-2.5 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#555]">Listo en</p>
              <p className="text-xl font-black text-[#1A1A1A] leading-tight">5 min</p>
            </motion.div>

            {/* Badge sin químicos */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute top-8 right-8 bg-white border border-[#E8EAED] rounded-xl px-4 py-2.5 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0076FF]">Sin químicos</p>
              <p className="text-[10px] font-light text-[#999]">adicionales</p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
