'use client'

import { motion } from 'framer-motion'

const stats = [
  { n: '15+', label: 'Años en el mercado' },
  { n: '500+', label: 'Clientes activos' },
  { n: '23', label: 'Modelos de producto' },
  { n: '5', label: 'Canales de distribución' },
]

const valores = [
  {
    titulo: 'Innovación continua',
    desc: 'Desarrollamos tecnología de fibra antibacterial NeoShield™ para superar los estándares de la industria.',
  },
  {
    titulo: 'Canal profesional',
    desc: 'Atendemos Retail, Mayoreo, HORECA, Institucional e Industrial con soluciones a medida.',
  },
  {
    titulo: 'Cobertura nacional',
    desc: 'Red de distribución activa en CDMX, Guadalajara, Monterrey y principales ciudades de México.',
  },
  {
    titulo: 'Respaldo LATAM',
    desc: 'Exportaciones a Centro y Sudamérica con procesos de certificación y cadena de suministro eficiente.',
  },
]

export default function Nosotros() {
  return (
    <section id="nosotros" className="py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-20"
        >
          <p className="label-eyebrow text-[#0076FF] mb-4">La Empresa</p>
          <h2 className="headline-editorial text-[2.6rem] lg:text-[3.4rem] text-[#1A1A1A] mb-6">
            Quiénes somos
          </h2>
          <p className="text-[1.05rem] font-light text-[#777] leading-relaxed">
            MagicClean es un proveedor B2B líder en soluciones de limpieza profesional en México.
            Desde hace más de 15 años desarrollamos y distribuimos fibras, sistemas de mop y
            accesorios para el canal profesional, con tecnología antibacterial propia.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 pb-24 border-b border-[#E8EAED]"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-black text-[3rem] lg:text-[3.5rem] text-[#1A1A1A] leading-none mb-2">
                {s.n}
              </p>
              <p className="label-eyebrow text-[#999]">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Valores — grid 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {valores.map((v, i) => (
            <motion.div
              key={v.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex gap-5"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-[#F0F5FF] flex items-center justify-center mt-0.5">
                <span className="font-black text-[#0076FF] text-[13px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A] text-[1rem] mb-2">{v.titulo}</p>
                <p className="text-[14px] font-light text-[#777] leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Empresa */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-16 border-t border-[#E8EAED] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="font-semibold text-[#1A1A1A] text-[1.1rem] mb-1">¿Listo para distribuir MagicClean?</p>
            <p className="text-[14px] font-light text-[#999]">Únete a nuestra red de más de 500 distribuidores activos en México.</p>
          </div>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#0076FF] transition-colors duration-300"
          >
            Solicitar información
          </a>
        </motion.div>
      </div>
    </section>
  )
}
