'use client'

import { motion } from 'framer-motion'
import { Layers, Droplets, FlaskConical, UtensilsCrossed, ShieldCheck, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Layers,
    title: 'Fibras profesionales',
    description:
      'Alta durabilidad para superficies delicadas, industriales y de alto tráfico. Tecnología NeoShield™ integrada en cada fibra.',
  },
  {
    icon: Droplets,
    title: 'Sistemas de mop',
    description:
      'Mops y cubetas profesionales para pisos de cualquier tipo: madera, cerámica, concreto y más.',
  },
  {
    icon: FlaskConical,
    title: 'Químicos premium',
    description:
      'Detergentes, desengrasantes y desinfectantes de alto rendimiento con fórmulas de última generación.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Soluciones HORECA',
    description:
      'Especializado para hoteles, restaurantes y catering. Cumple las normativas sanitarias más exigentes.',
  },
  {
    icon: ShieldCheck,
    title: 'Tecnología antibacterial',
    description:
      'Línea antimicrobiana certificada para entornos de alta exigencia sanitaria e institucional.',
  },
  {
    icon: Package,
    title: 'Accesorios',
    description:
      'Complementos y herramientas para optimizar cada protocolo de limpieza en tu operación.',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-32 bg-white">
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
            Portfolio completo
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight max-w-lg">
            Productos para cada necesidad
          </h2>
        </motion.div>

        {/* Grid con divisores tipo Rolex */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group bg-white px-8 py-12"
              >
                <div className="mb-6 inline-block transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon size={28} className="text-[#0076FF]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">{service.title}</h3>
                <p className="font-light text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
