'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const features = [
  'Cubo de alta resistencia UV',
  'Mopa de microfibra premium 360°',
  'Mecanismo de escurrido patentado',
  'Compatible con todos los pisos',
]

export default function ProductHeroM1() {
  return (
    // Editorial split — texto izquierda, imagen derecha. Dirección opuesta a F4 (como Rolex alterna)
    <section className="relative overflow-hidden bg-[#F5F7FA]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">

        {/* Izquierda — texto editorial */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-20 order-2 lg:order-1">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-eyebrow text-[#0076FF] mb-6"
          >
            Sistemas de Mop — Colección Pro
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="headline-editorial text-[2.4rem] lg:text-[3.2rem] xl:text-[3.8rem] text-[#1A1A1A] mb-6"
          >
            Turbo Magic<br />
            <span className="italic text-[#0076FF]">M1</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[1rem] font-light text-[#777] leading-relaxed max-w-md mb-10"
          >
            El sistema de trapeado que cambió los estándares del sector.
            Diseñado para rendimiento continuo en entornos de alta demanda.
          </motion.p>

          {/* Features list — como Rolex enumera características técnicas */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-3 mb-12"
          >
            {features.map((f, i) => (
              <li key={f} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#0076FF]/10 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF]" />
                </span>
                <span className="text-[14px] font-light text-[#555]">{f}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 group"
            >
              Ver sistema completo
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>

        {/* Derecha — imagen producto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white min-h-[55vw] lg:min-h-0 order-1 lg:order-2"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-[#0076FF]/6 blur-[80px]" />
            </div>

            {/* Producto */}
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl bg-[#F5F7FA] border border-[#E8EAED] flex items-center justify-center shadow-sm">
              <div className="text-center">
                <p className="font-black text-[#0076FF] text-4xl lg:text-5xl leading-none">M1</p>
                <p className="text-[#999] text-xs font-medium tracking-wider mt-2">Turbo Magic</p>
              </div>
            </div>

            {/* Spec badge */}
            <div className="bg-[#F5F7FA] border border-[#E8EAED] rounded-xl px-5 py-3 text-center">
              <p className="font-black text-[#1A1A1A] text-xl leading-none">360°</p>
              <p className="label-eyebrow text-[#999] text-[9px] mt-1">Escurrido único</p>
            </div>

            {/* Canales badge */}
            <div className="absolute bottom-8 right-8 bg-[#0076FF] text-white rounded-xl px-4 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-widest">HORECA Ready</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
