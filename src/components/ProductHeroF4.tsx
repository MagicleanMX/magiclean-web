'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const specs = [
  { valor: '3×', etiqueta: 'Mayor durabilidad' },
  { valor: 'Dual', etiqueta: 'Caras funcionales' },
  { valor: '0', etiqueta: 'Contaminación cruzada' },
]

export default function ProductHeroF4() {
  return (
    <section id="fibra-dual-f4" className="relative overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Izquierda — composición editorial Dual */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[65vw] sm:min-h-[55vw] lg:min-h-0 order-1 overflow-hidden bg-[#0A1628]"
        >
          {/* Badge popular — top left */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#FF2B2B] text-white px-3.5 py-2 rounded-full z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Más popular</span>
          </div>

          {/* Contenido principal */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 z-10">

            {/* Código F4 — héroe tipográfico */}
            <div className="text-center">
              <p
                className="font-black leading-none tracking-tight text-[#0076FF]"
                style={{ fontSize: 'clamp(4.5rem, 14vw, 8rem)' }}
              >
                F4
              </p>
              <p className="label-eyebrow text-white/20 text-[9px] tracking-[0.3em] mt-2">
                FIBRA ESPONJA DUAL
              </p>
            </div>

            {/* Separador */}
            <div className="w-12 h-px bg-[#0076FF]/40" />

            {/* Las dos caras — swatches de material */}
            <div className="flex gap-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col items-center gap-2.5"
              >
                <div
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #1e5c1e 0%, #0f300f 100%)',
                    border: '1px solid rgba(45,122,45,0.35)',
                  }}
                />
                <p className="label-eyebrow text-white/20 text-[9px]">Abrasiva</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col items-center gap-2.5"
              >
                <div
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #c8b97a 0%, #a09058 100%)',
                    border: '1px solid rgba(200,185,122,0.25)',
                  }}
                />
                <p className="label-eyebrow text-white/20 text-[9px]">Esponja</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Derecha — texto editorial */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-20 order-2 bg-white">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-eyebrow text-[#0076FF] mb-3"
          >
            Fibras Abrasivas — NeoShield™
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="headline-editorial text-[2.6rem] lg:text-[3.4rem] xl:text-[4.2rem] text-[#1A1A1A] mb-6"
          >
            Fibra Esponja<br />
            <span className="italic text-[#0076FF]">Dual F4</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[1rem] font-light text-[#666666] leading-[1.75] max-w-md mb-5"
          >
            Fibra abrasiva de alta resistencia por un lado, esponja suave por el otro.
            Un producto. Dos herramientas.
          </motion.p>

          {/* Quote elevada */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="border-l-2 border-[#0076FF] pl-5 mb-6"
          >
            <p className="text-[0.95rem] font-light text-[#666666] italic leading-[1.7]">
              "El estándar se creó ayer. Hoy lo evolucionamos."
            </p>
          </motion.blockquote>

          {/* Specs — 3 métricas limpias */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-8 py-6 border-t border-b border-[#E8EAED] mb-8"
          >
            {specs.map((s) => (
              <div key={s.etiqueta}>
                <p className="font-black text-[#1A1A1A] text-2xl lg:text-3xl leading-none mb-1">
                  {s.valor}
                </p>
                <p className="label-eyebrow text-[#666666] text-[9px]">{s.etiqueta}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 group"
            >
              Hablar con nuestro equipo
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
