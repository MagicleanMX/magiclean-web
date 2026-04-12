'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const canales = ['HOGAR', 'RETAIL', 'HORECA', 'INDUSTRIAL', 'INSTITUCIONAL']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col pt-[68px]">

      {/* Main hero — split layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[52%_48%] min-h-[calc(100vh-68px)]">

        {/* Izquierda — contenido */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20 lg:py-0 order-2 lg:order-1">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] shrink-0" />
            <span className="label-eyebrow text-[#999]">Colección 2024 — NeoShield™</span>
          </motion.div>

          {/* Headline — Playfair Display, estilo Rolex */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="headline-editorial text-[2.8rem] sm:text-[3.6rem] lg:text-[4.2rem] xl:text-[5rem] text-[#1A1A1A] mb-7 max-w-lg"
          >
            El arte de la limpieza perfecta
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[1.05rem] font-light text-[#777] leading-relaxed max-w-sm mb-10"
          >
            Tecnología de fibra avanzada para el canal profesional. Del hogar
            al sector HORECA e industrial en México.
          </motion.p>

          {/* CTAs — estilo Rolex: outlined + ghost */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#productos"
              className="inline-flex items-center justify-center bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold tracking-wide hover:bg-[#0076FF] transition-colors duration-300"
            >
              Explorar colección
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center border border-[#D0D0D0] text-[#1A1A1A] px-8 py-3.5 rounded-full text-[13px] font-semibold tracking-wide hover:border-[#1A1A1A] transition-colors duration-300"
            >
              Solicitar catálogo
            </a>
          </motion.div>

          {/* Stats mínimos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex items-center gap-10 mt-16 pt-10 border-t border-[#E8EAED]"
          >
            {[
              { n: '15+', label: 'Años en el mercado' },
              { n: '500+', label: 'Clientes activos' },
              { n: '200+', label: 'Productos' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-[#1A1A1A] leading-none mb-1">{s.n}</p>
                <p className="label-eyebrow text-[#999]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Derecha — imagen producto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative bg-[#F5F7FA] order-1 lg:order-2 min-h-[50vw] lg:min-h-0 overflow-hidden"
        >
          {/* Imagen real del hero — coloca hero-main.jpg en public/images/hero/ */}
          <Image
            src="/images/hero/hero-main.jpg"
            alt="MagicClean — Tecnología profesional en limpieza"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 48vw"
            onError={(e) => {
              // Fallback: oculta la imagen si no existe, muestra placeholder
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />

          {/* Overlay sutil para texto legible sobre la foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Badge flotante — NeoShield */}
          <div className="absolute top-8 right-8 bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#E8EAED] flex items-center gap-2 z-10">
            <span className="w-2 h-2 rounded-full bg-[#FF2B2B]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]">NeoShield™</span>
          </div>

          {/* Tag producto abajo */}
          <div className="absolute bottom-8 left-8 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#E8EAED] z-10">
            <p className="text-[11px] font-bold text-[#1A1A1A]">Tecnología Profesional</p>
            <p className="text-[10px] text-[#999] font-light">Antibacterial · Alta durabilidad</p>
          </div>
        </motion.div>
      </div>

      {/* Canal ticker — barra inferior estilo Rolex */}
      <div className="bg-[#1A1A1A] py-3.5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {canales.map((c, i) => (
              <span key={c} className="flex items-center gap-8">
                <span className="label-eyebrow text-white/50 text-[10px]">{c}</span>
                {i < canales.length - 1 && (
                  <span className="text-white/20 select-none text-xs">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
