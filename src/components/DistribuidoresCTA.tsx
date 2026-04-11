'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

const zonas = ['CDMX', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Querétaro']

export default function DistribuidoresCTA() {
  return (
    <section id="distribuidores" className="relative overflow-hidden bg-[#0076FF] py-28">
      {/* Textura decorativa */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #fff 0%, transparent 60%)' }} />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-eyebrow text-white/60 mb-5">Únete a la red</p>
            <h2 className="headline-editorial text-[2.4rem] lg:text-[3.2rem] text-white mb-6 max-w-md">
              Conviértete en distribuidor MagicClean
            </h2>
            <p className="text-[1rem] font-light text-white/70 leading-relaxed max-w-md mb-8">
              Accede a márgenes exclusivos, capacitación técnica y soporte de ventas.
              Expandimos nuestra red en todo México y Latinoamérica.
            </p>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 bg-white text-[#0076FF] px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#F0F5FF] transition-colors duration-300 group"
            >
              Quiero ser distribuidor
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

          {/* Zonas disponibles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-eyebrow text-white/50 mb-5">Zonas disponibles</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {zonas.map((z) => (
                <div
                  key={z}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors duration-200 rounded-xl px-4 py-3 cursor-default"
                >
                  <MapPin size={12} className="text-white/60 shrink-0" />
                  <span className="text-[13px] font-medium text-white">{z}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] font-light text-white/40 mt-4">
              + 24 zonas más disponibles a nivel nacional
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
