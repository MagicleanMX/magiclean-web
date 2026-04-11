'use client'

import { motion } from 'framer-motion'
import { Shield, Sparkles, ShieldCheck, Zap } from 'lucide-react'

const valores = [
  { icon: Shield, label: 'Mayor duración' },
  { icon: Sparkles, label: 'No raya superficies' },
  { icon: ShieldCheck, label: 'Protección antibacterial' },
  { icon: Zap, label: 'Alto desempeño' },
]

const canales = ['HOGAR', 'RETAIL', 'HORECA', 'INDUSTRIAL']

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex flex-col justify-center pt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-20 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda: foto placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <div className="w-full min-h-[400px] lg:min-h-[500px] bg-[#E6E9EF] rounded-2xl flex items-center justify-center aspect-[4/3]">
              <span className="text-gray-400 text-sm font-light tracking-wide">Foto lifestyle</span>
            </div>
          </motion.div>

          {/* Columna derecha: contenido */}
          <div className="order-1 lg:order-2 flex flex-col">
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

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-[#1A1A1A] tracking-tight leading-[0.9] mb-8"
            >
              Tecnología profesional en limpieza y fibras
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-light text-xl text-gray-400 max-w-md leading-relaxed mb-10"
            >
              Del hogar al canal HORECA. Fibras abrasivas, microfibras y sistemas de trapeado
              diseñados para rendimiento superior y duración extraordinaria.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#productos"
                className="inline-flex items-center justify-center bg-[#0076FF] text-white px-10 py-4 rounded-full font-semibold text-base hover:bg-[#0052CC] transition-colors duration-300"
              >
                Explorar productos
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center border-2 border-[#0076FF] text-[#0076FF] px-10 py-4 rounded-full font-semibold text-base hover:bg-[#0076FF]/5 transition-colors duration-300"
              >
                Solicitar catálogo
              </a>
            </motion.div>

            {/* 4 valores */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {valores.map((v, i) => {
                const Icon = v.icon
                return (
                  <div key={v.label} className="flex items-center gap-3">
                    <Icon size={16} className="text-[#0076FF] shrink-0" />
                    <span className="text-sm font-medium text-[#1A1A1A]">{v.label}</span>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Barra de canales */}
      <div className="bg-[#E6E9EF] py-5">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {canales.map((canal, i) => (
              <span key={canal} className="flex items-center gap-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/50">
                  {canal}
                </span>
                {i < canales.length - 1 && (
                  <span className="text-[#1A1A1A]/20 select-none">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
