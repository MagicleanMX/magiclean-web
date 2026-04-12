'use client'

import { motion } from 'framer-motion'
import type { HomeMetrics } from '@/lib/wordpress'

// Fallback values — shown when WordPress is unreachable or field group not yet published
const FALLBACK: HomeMetrics = {
  growthYears:  '3',
  marketplaces: 'ML · AMZ · WMT',
  modelsCount:  '23',
}

interface MetricsProps {
  data?: HomeMetrics | null
}

export default function Metrics({ data }: MetricsProps) {
  const growthYears  = data?.growthYears  || FALLBACK.growthYears
  const marketplaces = data?.marketplaces || FALLBACK.marketplaces
  const modelsCount  = data?.modelsCount  || FALLBACK.modelsCount

  const items = [
    { value: growthYears,  label: 'Años de crecimiento' },
    { value: marketplaces, label: 'Marketplaces activos' },
    { value: modelsCount,  label: 'Modelos especializados' },
  ]

  return (
    <section className="bg-[#1A1A1A] py-10">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x sm:divide-white/10">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center sm:px-10"
            >
              <p className="font-black text-white text-[2.8rem] lg:text-[3.4rem] leading-none mb-2 tracking-tight">
                {item.value}
              </p>
              <p className="label-eyebrow text-white/40 text-[10px]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
