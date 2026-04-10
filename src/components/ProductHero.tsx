'use client'

import { motion } from 'framer-motion'

const specs = [
  { value: '3×', label: 'Mayor durabilidad' },
  { value: '99.9%', label: 'Acción antibacterial' },
  { value: '0', label: 'Contaminación cruzada' },
]

export default function ProductHero() {
  return (
    <section className="py-32 bg-[#0A1628] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center bg-[#FF2B2B] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
              NeoShield™
            </span>
          </motion.div>

          {/* Product name */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-4"
          >
            Fibra Pro Elite
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-light text-lg text-white/50 max-w-sm leading-relaxed mb-20"
          >
            Alta resistencia. Superficie antibacterial certificada.
            Rendimiento sostenido en entornos de alta exigencia.
          </motion.p>

          {/* Product visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3 }}
            className="relative w-64 h-64 lg:w-80 lg:h-80 mb-20"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-[#0076FF] opacity-[0.12] blur-3xl scale-150 pointer-events-none" />
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-white/8" />
            {/* Inner circle */}
            <div className="absolute inset-8 rounded-full border border-white/5 bg-white/4 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-semibold">
                  Producto estrella
                </p>
                <p className="text-white font-black text-3xl tracking-tight">F1 Pro</p>
                <p className="text-[#0076FF] text-xs font-semibold mt-2 uppercase tracking-widest">
                  NeoShield™
                </p>
              </div>
            </div>
          </motion.div>

          {/* Specs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 lg:gap-20 border-t border-white/10 pt-12 w-full max-w-lg"
          >
            {specs.map((spec) => (
              <div key={spec.label} className="text-center">
                <p className="text-white font-black text-2xl lg:text-3xl mb-2">{spec.value}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">
                  {spec.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
