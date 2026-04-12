'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return <span ref={ref}>{value}{suffix}</span>
}

const stats = [
  { target: 15, suffix: '+', label: 'Años en el mercado' },
  { target: 500, suffix: '+', label: 'Clientes activos' },
  { target: 200, suffix: '+', label: 'Productos en catálogo' },
  { target: 30, suffix: '+', label: 'Ciudades con cobertura' },
  { target: 99, suffix: '%', label: 'Eliminación de bacterias' },
  { target: 3, suffix: '×', label: 'Mayor duración vs competencia' },
]

export default function NeoShield() {
  return (
    <section id="tecnologia" className="relative overflow-hidden bg-[#0A1628] py-36">
      {/* Glow decorativo */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0076FF]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF2B2B]/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Split: texto izquierda / stats derecha — como Rolex "Our Watchmaking" */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Izquierda — storytelling */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-eyebrow text-[#FF2B2B] mb-6">Nuestra Tecnología</p>

            <h2 className="headline-editorial text-[2.8rem] lg:text-[4rem] xl:text-[4.8rem] text-white mb-8 leading-[1.05]">
              NeoShield™
            </h2>

            <p className="text-[1rem] font-light text-white/50 leading-relaxed max-w-md mb-6">
              Desarrollada en laboratorio después de 3 años de investigación,
              NeoShield™ es la tecnología de fibra más avanzada del mercado mexicano.
              Elimina el 99% de las bacterias sin productos químicos adicionales.
            </p>

            <p className="text-[0.9rem] font-light text-white/30 leading-relaxed max-w-md mb-12">
              Cada fibra incorpora micropartículas de plata coloidal enlazadas
              a la estructura del polímero. La protección no se lava ni se deteriora.
            </p>

            <div className="flex flex-col gap-3 mb-10">
              {[
                'Micropartículas de plata coloidal integradas al polímero',
                'Acción antibacterial permanente — no se lava, no se deteriora',
                'Validado por laboratorio certificado independiente',
                'Compatible con todos los protocolos de higiene HORECA',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <span className="w-4 h-px bg-[#0076FF] shrink-0" />
                  <span className="text-[13px] font-light text-white/50">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA NeoShield */}
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 border border-white/20 text-white/60 hover:text-white hover:border-white/50 px-6 py-3 rounded-full text-[12px] font-semibold transition-all duration-300"
            >
              Recibir catálogo por correo →
            </a>
          </motion.div>

          {/* Derecha — stats en grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="bg-[#0A1628] px-8 py-8 hover:bg-[#0d1f38] transition-colors duration-300"
              >
                <p className="font-black text-white text-[2.2rem] lg:text-[2.8rem] leading-none mb-2">
                  <Counter target={s.target} suffix={s.suffix} />
                </p>
                <p className="label-eyebrow text-white/30 text-[9px]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
