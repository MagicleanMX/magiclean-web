'use client'

import { motion } from 'framer-motion'

export default function ProductHeroM1() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Izquierda: imagen placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square bg-[#E6E9EF] rounded-2xl flex items-center justify-center">
              <span className="text-gray-400 text-sm font-light tracking-wide">M1 Turbo Magic</span>
            </div>
          </motion.div>

          {/* Derecha: contenido */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#0076FF] font-semibold text-xs uppercase tracking-widest mb-5"
            >
              Sistema completo
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight mb-6"
            >
              Turbo Magic M1
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-light text-gray-400 text-lg leading-relaxed mb-10 max-w-md"
            >
              El sistema de trapeado que cambió los estándares. Cubo de alta resistencia +
              mopa de microfibra premium + mecanismo de escurrido único. Para todo tipo de piso.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a
                href="#contacto"
                className="inline-flex items-center justify-center bg-[#0076FF] text-white px-10 py-4 rounded-full font-semibold text-base hover:bg-[#0052CC] transition-colors duration-300"
              >
                Ver sistema completo
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
