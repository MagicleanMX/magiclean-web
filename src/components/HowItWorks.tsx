'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Consulta',
    description: 'Cuéntanos las necesidades de limpieza de tu negocio.',
  },
  {
    number: '02',
    title: 'Cotización',
    description: 'Recibe tu propuesta personalizada en menos de 24 horas.',
  },
  {
    number: '03',
    title: 'Entrega rápida',
    description: 'Productos en tu puerta con logística eficiente.',
  },
  {
    number: '04',
    title: 'Soporte continuo',
    description: 'Acompañamiento técnico y reposición garantizada.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[#FF2B2B] font-semibold text-xs uppercase tracking-widest mb-4">
            Proceso
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight max-w-sm">
            Simple y transparente
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              {/* Ghost number detrás */}
              <span
                aria-hidden="true"
                className="absolute -top-4 left-0 text-8xl font-black leading-none select-none pointer-events-none text-[#E6E9EF]"
              >
                {step.number}
              </span>
              {/* Contenido encima */}
              <div className="relative pt-14">
                <h3 className="text-base font-bold text-[#1A1A1A] mb-3">{step.title}</h3>
                <p className="font-light text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
