'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'

interface CounterProps {
  target: number
  suffix: string
}

function AnimatedCounter({ target, suffix }: CounterProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target])

  return (
    <div ref={ref}>
      <p className="text-7xl lg:text-8xl font-black text-[#0076FF] leading-none tracking-tight">
        {value}
        {suffix}
      </p>
    </div>
  )
}

const stats = [
  { target: 15, suffix: '+', label: 'Años de experiencia' },
  { target: 500, suffix: '+', label: 'Clientes activos' },
  { target: 200, suffix: '+', label: 'Productos en catálogo' },
  { target: 30, suffix: '+', label: 'Ciudades con cobertura' },
]

export default function WhyUs() {
  return (
    <section id="nosotros" className="py-32 bg-[#E6E9EF]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            ¿Por qué MagiClean?
          </h2>
        </motion.div>

        {/* Stats sin cards, solo números */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
