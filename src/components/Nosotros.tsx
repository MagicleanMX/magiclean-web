'use client'

import { motion } from 'framer-motion'
import { NOSOTROS_STATS, NOSOTROS_VALORES, MARKETPLACES } from '@/lib/products'

export default function Nosotros() {
  return (
    <section id="nosotros" className="section-standard bg-white">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-6"
        >
          <p className="label-eyebrow text-[#0052CC] mb-3">La Empresa</p>
          <h2 className="headline-editorial text-[2.8rem] lg:text-[3.6rem] text-[#1A1A1A] mb-6">
            El estándar que faltaba.
            <span className="italic text-[#0076FF]"> Lo estamos construyendo.</span>
          </h2>
          <p className="text-[1rem] font-normal text-ink-muted leading-[1.75]">
            MagicClean nació con una idea simple: que la limpieza profesional merecía mejor
            tecnología, mejor diseño y mejor precio. Desarrollamos NeoShield™ — tecnología
            antibacterial propia — y la integramos en cada producto. Hoy operamos en los 3
            marketplaces líderes de México. El siguiente capítulo es la distribución a escala nacional.
          </p>
        </motion.div>

        {/* Banner corporativo panorámico */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl mb-12"
          style={{ aspectRatio: '21/9', backgroundColor: '#0A1628' }}
        >
          {/* <Image src="/nosotros-banner.webp" alt="MagicClean — El estándar que faltaba" fill className="object-cover object-[30%_center]" /> */}

          {/* Overlay gradiente — legibilidad para texto futuro */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(10,22,40,0.8) 0%, transparent 60%)' }}
          />

          {/* Placeholder premium */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 select-none pointer-events-none">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0076FF" strokeWidth="1.5" opacity="0.3">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#0076FF]/30">
              Fotografía corporativa próximamente
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10 pb-10 border-b border-[#E8EAED]"
        >
          {NOSOTROS_STATS.map((s) => (
            <div key={s.label}>
              <p className="font-black text-[3.4rem] lg:text-[4rem] text-[#1A1A1A] leading-none mb-2">
                {s.n}
              </p>
              <p className="label-eyebrow text-ink-muted">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Valores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {NOSOTROS_VALORES.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex gap-5"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-surface-blue flex items-center justify-center mt-0.5">
                <span className="font-black text-[#0076FF] text-[12px]">{v.num}</span>
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A] text-[0.95rem] mb-2">{v.titulo}</p>
                <p className="text-[13.5px] font-normal text-ink-muted leading-[1.7]">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marketplaces — logos textuales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 pt-8 border-t border-[#E8EAED]"
        >
          <p className="label-eyebrow text-ink-muted mb-8 text-center">Ya disponibles en</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {MARKETPLACES.map((m) => (
              <span key={m} className="text-[1.1rem] font-bold text-[#1A1A1A]/40 hover:text-[#0076FF] transition-colors duration-300 cursor-default">
                {m}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="font-semibold text-[#1A1A1A] text-[1.1rem] mb-1">
              ¿Quieres ser parte de este crecimiento?
            </p>
            <p className="text-[14px] font-normal text-ink-muted">
              Distribuidores, retail y HORECA — hablemos.
            </p>
          </div>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#0076FF] transition-colors duration-300"
          >
            Solicitar cotización
          </a>
        </motion.div>

      </div>
    </section>
  )
}
