'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Leaf } from 'lucide-react'

const beneficios = [
  {
    Icon: Zap,
    numero: '3×',
    titulo: 'Durabilidad',
    descripcion: 'Más duración que una fibra convencional. Abrasividad constante de inicio a fin. Sin deterioro con el uso. Menos reposición, mejor costo por unidad.',
  },
  {
    Icon: Shield,
    numero: '99.9%',
    titulo: 'Antibacterial',
    descripcion: 'Bacterias eliminadas. Micropartículas de plata coloidal integradas al polímero. No se lavan, no se deterioran. Sin químicos adicionales. Certificado por laboratorio independiente.',
  },
  {
    Icon: Leaf,
    numero: '30%',
    titulo: 'Eco-Friendly',
    descripcion: 'Materiales eco-friendly en cada producto. Menos reposición equivale a menos desperdicio. Rendimiento profesional con responsabilidad ambiental.',
  },
]

export default function BeneficiosClave() {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
        >
          <div>
            <p className="label-eyebrow text-[#0076FF] mb-3">Por qué MagicClean</p>
            <h2 className="headline-editorial text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem] text-[#1A1A1A] max-w-lg">
              Tecnología que se demuestra. Beneficios que se miden.
            </h2>
          </div>
          <a
            href="#tecnologia"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076FF] hover:gap-3 transition-all duration-200 self-start lg:self-auto shrink-0"
          >
            Conocer la tecnología <ArrowRight size={14} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {beneficios.map(({ Icon, numero, titulo, descripcion }, i) => (
            <motion.div
              key={titulo}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl p-10 border border-[#E8EAED] flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F0F5FF] flex items-center justify-center mb-8">
                <Icon size={20} className="text-[#0076FF]" />
              </div>

              <p className="font-black text-[#1A1A1A] leading-none mb-2"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 4.2rem)' }}>
                {numero}
              </p>
              <p className="font-semibold text-[#1A1A1A] text-[1.05rem] mb-5">{titulo}</p>

              <p className="text-[13.5px] font-light text-[#666666] leading-[1.75] mb-8 flex-1">
                {descripcion}
              </p>

              <div className="inline-flex items-center gap-1.5 self-start bg-[#0076FF]/6 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF]" />
                <span className="text-[10px] font-bold text-[#0076FF] uppercase tracking-wide">NeoShield™</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
