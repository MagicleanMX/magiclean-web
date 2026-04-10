'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex flex-col justify-center pt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-24 w-full flex-1 flex flex-col justify-center">
        {/* Badge NeoShield */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="text-[#FF2B2B] text-lg leading-none select-none">•</span>
          <span className="text-gray-400 font-semibold text-xs uppercase tracking-widest">
            Tecnología NeoShield™
          </span>
        </motion.div>

        {/* H1 gigante */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-7xl lg:text-9xl font-black text-[#1A1A1A] tracking-tight leading-[0.88] mb-8"
        >
          Limpieza
          <br />
          de precisión
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-light text-xl text-gray-400 max-w-md leading-relaxed mb-14"
        >
          Soluciones B2B de limpieza profesional para retail, HORECA e institucional
          en toda la República Mexicana.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contacto"
            className="inline-flex items-center justify-center bg-[#0076FF] text-white px-10 py-4 rounded-full font-semibold text-base hover:bg-[#0052CC] transition-colors duration-300"
          >
            Solicitar cotización
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center border-2 border-[#0076FF] text-[#0076FF] px-10 py-4 rounded-full font-semibold text-base hover:bg-[#0076FF]/5 transition-colors duration-300"
          >
            Ver servicios
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="text-gray-200"
        >
          <ChevronDown size={28} />
        </motion.div>
      </div>
    </section>
  )
}
