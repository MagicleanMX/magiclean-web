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
    // Editorial split — imagen izquierda, texto derecha. Sin padding vertical: edge-to-edge como Rolex
    <section id="fibra-dual-f4" className="relative overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Izquierda — imagen producto (fondo de color, sin márgenes) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#0A1628] min-h-[55vw] lg:min-h-0 order-1"
        >
          {/* Imagen placeholder — llenará toda la mitad */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            {/* Glow sutil */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-[#0076FF]/10 blur-[80px]" />
            </div>

            {/* Producto */}
            <div className="relative w-52 h-52 lg:w-72 lg:h-72 rounded-full bg-white/8 border border-white/12 flex items-center justify-center">
              <div className="text-center">
                <p className="font-black text-white text-5xl lg:text-7xl leading-none">F4</p>
                <p className="text-white/40 text-xs font-medium tracking-widest mt-2">NeoShield™</p>
              </div>
            </div>

            {/* Badge antibacterial */}
            <div className="absolute top-8 left-8 flex items-center gap-2 bg-[#FF2B2B] text-white px-3.5 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Antibacterial</span>
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
            className="label-eyebrow text-[#FF2B2B] mb-3"
          >
            Fibras Abrasivas — NeoShield™
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
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
            className="text-[1rem] font-light text-[#666] leading-[1.75] max-w-md mb-5"
          >
            La dualidad inteligente que tu cocina necesita. Fibra abrasiva de alta
            resistencia por un lado, esponja suave por el otro.
          </motion.p>

          {/* Quote elevada */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="border-l-2 border-[#0076FF] pl-5 mb-6"
          >
            <p className="text-[0.95rem] font-light text-[#666] italic leading-[1.7]">
              "El estándar se creó ayer. Hoy lo evolucionamos."
            </p>
          </motion.blockquote>

          {/* Specs — 3 métricas limpias */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
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
                <p className="label-eyebrow text-[#999] text-[9px]">{s.etiqueta}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA — outlined, estilo Rolex */}
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
