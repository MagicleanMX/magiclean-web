'use client'

import { motion } from 'framer-motion'

const stats = [
  { n: '3',  label: 'Años de crecimiento acelerado' },
  { n: '23', label: 'Modelos especializados' },
  { n: '3',  label: 'Marketplaces líderes' },
  { n: '5+', label: 'Líneas de producto activas' },
]

const valores = [
  {
    num: '01',
    titulo: 'Tecnología NeoShield™ — Desarrollada para ganar',
    desc: 'Fibra antibacterial con micropartículas integradas al polímero. No se lava, no se deteriora. La misma tecnología que nos llevó a liderar en MercadoLibre y Amazon.',
  },
  {
    num: '02',
    titulo: 'Nacimos en e-commerce. Ahora vamos al retail.',
    desc: 'Nuestro M2 es uno de los mops más vendidos en MercadoLibre y Amazon México. El M1 crece con fuerza. Y apenas estamos entrando al canal retail y distribución.',
  },
  {
    num: '03',
    titulo: '23 modelos. Un portafolio para cada canal.',
    desc: 'Fibras, sistemas mop y accesorios para hogar, retail, HORECA e institucional. Cada producto diseñado con propósito — no fabricamos volumen, fabricamos soluciones.',
  },
  {
    num: '04',
    titulo: 'Crecimiento con respaldo real',
    desc: 'Presencia activa en MercadoLibre, Amazon y Walmart Marketplace. Cada distribuidor tiene seguimiento directo con nuestro equipo comercial — sin intermediarios, sin formularios perdidos.',
  },
]

export default function Nosotros() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-10"
        >
          <p className="label-eyebrow text-[#0076FF] mb-3">La Empresa</p>
          <h2 className="headline-editorial text-[2.8rem] lg:text-[3.6rem] text-[#1A1A1A] mb-6">
            No vinimos a repetir
            lo de siempre.
            <span className="italic text-[#0076FF]"> Vinimos a cambiarlo.</span>
          </h2>
          <p className="text-[1rem] font-light text-[#666666] leading-[1.75]">
            MagicClean nació hace 3 años con una convicción: que la limpieza profesional
            merecía mejor tecnología, mejor diseño y mejor precio. Hoy nuestros productos
            lideran en MercadoLibre y Amazon — y el retail es el siguiente capítulo.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10 pb-10 border-b border-[#E8EAED]"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-black text-[3.4rem] lg:text-[4rem] text-[#1A1A1A] leading-none mb-2">
                {s.n}
              </p>
              <p className="label-eyebrow text-[#666666]">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Valores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {valores.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex gap-5"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-[#F0F5FF] flex items-center justify-center mt-0.5">
                <span className="font-black text-[#0076FF] text-[12px]">{v.num}</span>
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A] text-[0.95rem] mb-2">{v.titulo}</p>
                <p className="text-[13.5px] font-light text-[#666666] leading-[1.7]">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marketplaces — logos textuales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 pt-8 border-t border-[#E8EAED]"
        >
          <p className="label-eyebrow text-[#666666] mb-8 text-center">Ya disponibles en</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {['MercadoLibre', 'Amazon', 'Walmart'].map((m) => (
              <span key={m} className="text-[1.1rem] font-bold text-[#1A1A1A]/40 hover:text-[#0076FF] transition-colors duration-300 cursor-default">
                {m}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="font-semibold text-[#1A1A1A] text-[1.1rem] mb-1">
              ¿Quieres ser parte de este crecimiento?
            </p>
            <p className="text-[14px] font-light text-[#666666]">
              Distribuidores, retail y HORECA — hablemos.
            </p>
          </div>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#0076FF] transition-colors duration-300"
          >
            Iniciar conversación
          </a>
        </motion.div>

      </div>
    </section>
  )
}
