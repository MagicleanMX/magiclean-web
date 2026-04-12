'use client'

import { motion } from 'framer-motion'

const stats = [
  { n: '15+', label: 'Años en el mercado' },
  { n: '500+', label: 'Clientes activos' },
  { n: '30+', label: 'Ciudades con cobertura' },
  { n: '5', label: 'Canales de distribución' },
]

const valores = [
  {
    num: '01',
    titulo: 'NeoShield™: 3 años de I+D exclusivo',
    desc: 'Desarrollamos tecnología de fibra antibacterial propia, validada en laboratorio. La protección no se lava ni se deteriora — está en la estructura del polímero.',
  },
  {
    num: '02',
    titulo: 'Red activa en 30+ ciudades',
    desc: 'Entrega directa en CDMX, Guadalajara y Monterrey en 48h. Cobertura nacional por red de distribuidores y exportaciones activas a LATAM.',
  },
  {
    num: '03',
    titulo: 'Un portafolio para cada canal',
    desc: '23 modelos entre fibras, mops y accesorios. Hogar, retail, HORECA, industrial e institucional — cada canal tiene su solución específica.',
  },
  {
    num: '04',
    titulo: 'Soporte técnico de por vida',
    desc: 'Capacitación de producto, reposición garantizada y acompañamiento de ventas para cada distribuidor. No vendemos y nos desaparecemos.',
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
            Construimos el estándar profesional de la limpieza en México
          </h2>
          <p className="text-[1.05rem] font-light text-[#777] leading-relaxed">
            Más de 15 años desarrollando y distribuyendo soluciones para quienes no pueden
            permitirse que el equipo falle. Desde una cocina de hotel en Monterrey hasta
            una línea de producción en Guadalajara.
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
                <p className="font-semibold text-[#1A1A1A] text-[1rem] mb-2">{v.titulo}</p>
                <p className="text-[14px] font-light text-[#777] leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-16 border-t border-[#E8EAED] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="font-semibold text-[#1A1A1A] text-[1.1rem] mb-1">
              ¿Listo para distribuir MagicClean?
            </p>
            <p className="text-[14px] font-light text-[#999]">
              Únete a la red de más de 500 distribuidores activos en México.
            </p>
          </div>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#0076FF] transition-colors duration-300"
          >
            Conocer cómo trabajamos
          </a>
        </motion.div>
      </div>
    </section>
  )
}
