'use client'

import { motion } from 'framer-motion'
import { TrendingDown, ShieldOff, Layers } from 'lucide-react'

const problemas = [
  {
    Icon: TrendingDown,
    titulo: 'Se deterioran en días',
    desc: 'La abrasividad de una fibra convencional cae un 40% en la primera semana. Reemplazas más. Gastas más. Y el resultado es el mismo.',
  },
  {
    Icon: ShieldOff,
    titulo: 'Acumulan lo que deberían eliminar',
    desc: 'Sin protección antibacterial, cada uso redistribuye contaminación en vez de eliminarla. Limpiar no es lo mismo que desinfectar.',
  },
  {
    Icon: Layers,
    titulo: 'Un proveedor para cada cosa',
    desc: 'Fibras de un lado, mops de otro, accesorios de otro. Sin estándar, sin soporte, sin una sola llamada que lo resuelva.',
  },
]

export default function ElProblema() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="label-eyebrow text-[#0076FF] mb-3">El problema real</p>
          <h2 className="headline-editorial text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem] text-[#1A1A1A] max-w-xl">
            Tu proveedor actual te está costando más de lo que crees.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {problemas.map(({ Icon, titulo, desc }, i) => (
            <motion.div
              key={titulo}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="border-t-2 border-[#E0E3E8] pt-8 pr-0 md:pr-14 pb-8 md:pb-0"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF0F0] flex items-center justify-center mb-6">
                <Icon size={20} className="text-[#FF2B2B]" />
              </div>

              <h3 className="font-serif text-[1.15rem] font-medium text-[#1A1A1A] mb-3 leading-snug">
                {titulo}
              </h3>
              <p className="text-[14px] font-light text-[#666666] leading-[1.75]">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
