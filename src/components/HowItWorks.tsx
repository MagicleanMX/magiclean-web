'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const pasos = [
  {
    num: '01',
    titulo: 'Consulta',
    desc: 'Cuéntanos las necesidades específicas de tu negocio. Analizamos tu canal y volumen.',
  },
  {
    num: '02',
    titulo: 'Propuesta',
    desc: 'Recibe tu cotización personalizada en menos de 24 horas hábiles.',
  },
  {
    num: '03',
    titulo: 'Entrega',
    desc: 'Logística eficiente a todo México. Tu pedido en tiempo y forma.',
  },
  {
    num: '04',
    titulo: 'Soporte',
    desc: 'Acompañamiento técnico continuo y reposición garantizada.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-[#F5F7FA]">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
        >
          <div>
            <p className="label-eyebrow text-[#0076FF] mb-3">El Proceso</p>
            <h2 className="headline-editorial text-[2.8rem] lg:text-[3.6rem] text-[#1A1A1A] max-w-xs">
              Simple y transparente
            </h2>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076FF] hover:gap-3 transition-all duration-200 self-start lg:self-auto"
          >
            Iniciar ahora <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* 4 pasos horizontales — como Rolex "Your Rolex" journey */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {pasos.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative border-t-2 border-[#E0E3E8] pt-8 pr-0 lg:pr-8 pb-0 group hover:border-[#0076FF] transition-colors duration-300"
            >
              {/* Número ghost grande */}
              <p className="font-black text-[5rem] leading-none text-[#E8EAED] select-none mb-4 group-hover:text-[#D8E4FF] transition-colors duration-300">
                {p.num}
              </p>

              {/* Contenido */}
              <h3 className="font-serif text-[1.05rem] font-medium text-[#1A1A1A] mb-2.5">
                {p.titulo}
              </h3>
              <p className="text-[13px] font-light text-[#666666] leading-[1.7]">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
