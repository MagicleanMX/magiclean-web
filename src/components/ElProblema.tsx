'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, TrendingUp, Layers, type LucideIcon } from 'lucide-react'
import { PROBLEMAS } from '@/lib/products'

const ICONS: LucideIcon[] = [ShieldCheck, TrendingUp, Layers]

export default function ElProblema() {
  return (
    <section className="section-standard bg-white">
      <div className="max-w-[1440px] mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="label-eyebrow text-[#0052CC] mb-3">Por qué elegirnos</p>
          <h2 className="headline-editorial text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem] text-[#1A1A1A] max-w-2xl mb-6">
            Producto que rinde.<br />Margen que respeta.<br />Rotación que vende.
          </h2>
          <p className="text-[1.05rem] font-normal text-ink-muted leading-[1.7] max-w-2xl">
            Para HORECA, retail e institucional. Y para los distribuidores que confían en MagiClean para crecer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {PROBLEMAS.map(({ titulo, desc }, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={titulo}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="border-t-2 border-border-strong pt-8 pr-0 md:pr-14 pb-8 md:pb-0"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-blue flex items-center justify-center mb-6">
                  <Icon size={20} className="text-[#0076FF]" />
                </div>

                <h3 className="font-serif text-[1.15rem] font-medium text-[#1A1A1A] mb-3 leading-snug">
                  {titulo}
                </h3>
                <p className="text-[14px] font-normal text-ink-muted leading-[1.75]">
                  {desc}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
