'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const metricas = [
  { n: '3+',              label: 'Marketplaces activos' },
  { n: '23',              label: 'Modelos en portafolio' },
  { n: 'CDMX · GDL · MTY', label: 'Cobertura nacional' },
]

const marketplaces = ['MercadoLibre', 'Amazon', 'Walmart']

export default function SocialProof() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="label-eyebrow text-[#0076FF] mb-3">Presencia verificada</p>
          <h2 className="headline-editorial text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem] text-[#1A1A1A] max-w-xl">
            Donde ya estamos. Y a dónde vamos.
          </h2>
        </motion.div>

        {/* Marketplaces — prominentes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap items-center gap-10 mb-14 pb-14 border-b border-[#E8EAED]"
        >
          {marketplaces.map((m) => (
            <span
              key={m}
              className="text-[1.5rem] lg:text-[1.8rem] font-black text-[#1A1A1A]/25 hover:text-[#0076FF] transition-colors duration-300 cursor-default"
            >
              {m}
            </span>
          ))}
        </motion.div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-14">
          {metricas.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <p
                className="font-black text-[#1A1A1A] leading-none mb-2"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)' }}
              >
                {m.n}
              </p>
              <p className="label-eyebrow text-[#666666]">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* TODO: Agregar testimonios de distribuidores reales */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a
            href="#distribuidores"
            className="inline-flex items-center gap-2.5 bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#0076FF] transition-colors duration-300 group"
          >
            Únete a la red
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
