'use client'

import { motion } from 'framer-motion'

const specs = [
  { value: '3×', label: 'Mayor durabilidad' },
  { value: '99.9%', label: 'Acción antibacterial' },
  { value: '0', label: 'Contaminación cruzada' },
]

export default function ProductHeroF4() {
  return (
    <section className="py-32 bg-[#0A1628] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge rojo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center bg-[#FF2B2B] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-8">
              NeoShield™ — Antibacterial
            </span>
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white tracking-tight mb-6"
          >
            Fibra Esponja Dual F4
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-light text-lg text-white/60 max-w-lg leading-relaxed mb-6"
          >
            La dualidad inteligente que tu cocina necesita. Fibra abrasiva por un lado,
            esponja suave por el otro. Antibacterial. Adaptabilidad total.
          </motion.p>

          {/* Claim */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/40 italic text-base mb-20"
          >
            El estándar se creó ayer. Hoy lo evolucionamos.
          </motion.p>

          {/* Producto placeholder circular */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3 }}
            className="relative mb-20"
          >
            <div className="absolute inset-0 rounded-full bg-[#0076FF] opacity-[0.12] blur-3xl scale-150 pointer-events-none" />
            <div className="w-64 h-64 rounded-full bg-white/10 border border-white/20 flex items-center justify-center relative">
              <p className="text-white font-black text-4xl tracking-tight">F4</p>
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
