'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Leaf } from 'lucide-react'

// Los 3 niveles de abrasividad — progresión editorial
const niveles = [
  {
    codigo: 'F1',
    nombre: 'Industrial',
    descripcion: 'Máxima potencia. Grasa difícil, cocinas industriales, líneas de producción.',
    canal: 'Industrial · HORECA',
    barras: 3,
    color: '#0052CC',
  },
  {
    codigo: 'F2',
    nombre: 'Dual',
    descripcion: 'Lo mejor de los dos mundos. Eficiente en entornos profesionales y en casa.',
    canal: 'Industrial · Hogar',
    barras: 2,
    color: '#0076FF',
  },
  {
    codigo: 'F3',
    nombre: 'Hogar',
    descripcion: 'Suavidad inteligente. Cuida tus utensilios y superficies del día a día.',
    canal: 'Hogar · Retail · Ama de casa',
    barras: 1,
    color: '#74B9FF',
  },
]

// Los 5 diferenciadores — ninguna fibra del mercado los tiene juntos
const diferenciadores = [
  {
    icon: '✦',
    titulo: 'No raya teflón ni antiadherentes.',
    sub: 'Limpia con fuerza. Cuida con inteligencia.',
  },
  {
    icon: '✦',
    titulo: 'Dura 3 veces más que una fibra convencional.',
    sub: 'Menos reposición. Mejor costo por uso.',
  },
  {
    icon: '✦',
    titulo: 'Abrasividad constante de inicio a fin.',
    sub: 'No pierde su fuerza con el uso.',
  },
  {
    icon: '✦',
    titulo: 'NeoShield™ — 99.9% bacterias eliminadas.',
    sub: 'Tecnología antibacterial integrada al polímero.',
  },
  {
    icon: '✦',
    titulo: '30% materiales eco-friendly.',
    sub: 'Limpias tu cocina. Cuidas el planeta.',
  },
]

export default function ProductHeroF123() {
  return (
    <section id="fibras-verdes-f1-f2-f3" className="relative overflow-hidden bg-white">

      {/* ── Parte superior — headline editorial ── */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-24 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Izquierda — copy editorial */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="label-eyebrow text-[#0076FF] mb-6"
            >
              Fibras Verdes — F1 · F2 · F3
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="headline-editorial text-[2.6rem] lg:text-[3.6rem] xl:text-[4.2rem] text-[#1A1A1A] leading-tight mb-6"
            >
              Tu cocina merece
              <br />
              lo mejor.{' '}
              <span className="italic text-[#0076FF]">
                Tus utensilios,
              </span>
              <br />
              también.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[1.05rem] font-light text-[#777] leading-relaxed max-w-md mb-8"
            >
              En MagicClean nos comprometemos a cuidar lo que tú cuidas.
              Esa sartén que elegiste con cuidado, esa olla que usas cada día —
              la F1·F2·F3 las deja impecables sin quitarles un solo día de vida.
            </motion.p>

            {/* Tagline de familia */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-[1rem] font-semibold text-[#1A1A1A] tracking-wide mb-10 italic"
            >
              "Fuerza que limpia. Tecnología que cuida."
            </motion.p>

            {/* Badges de tecnología */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <div className="inline-flex items-center gap-2 bg-[#0076FF]/8 border border-[#0076FF]/20 rounded-full px-4 py-2">
                <ShieldCheck size={14} className="text-[#0076FF] shrink-0" />
                <span className="text-[#0076FF] text-[12px] font-bold tracking-wide">
                  NeoShield™ · 99.9% antibacterial
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-500/8 border border-green-500/20 rounded-full px-4 py-2">
                <Leaf size={14} className="text-green-600 shrink-0" />
                <span className="text-green-700 text-[12px] font-bold tracking-wide">
                  30% Eco-Friendly
                </span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contacto"
                className="inline-flex items-center gap-2.5 bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold hover:bg-[#0076FF] transition-all duration-300 group"
              >
                Solicitar muestras F1 · F2 · F3
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>
          </div>

          {/* Derecha — los 5 diferenciadores */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="pt-4"
          >
            <p className="text-[#999] text-[11px] font-semibold uppercase tracking-widest mb-6">
              Lo que ninguna otra fibra tiene junto
            </p>
            <div className="space-y-0">
              {diferenciadores.map((d, i) => (
                <motion.div
                  key={d.titulo}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex gap-4 py-5 border-b border-[#F0F0F0] last:border-0"
                >
                  <span className="text-[#0076FF] text-[10px] mt-1 shrink-0 font-black">✦</span>
                  <div>
                    <p className="text-[14px] font-semibold text-[#1A1A1A] leading-snug mb-0.5">
                      {d.titulo}
                    </p>
                    <p className="text-[12px] font-light text-[#999]">{d.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Parte inferior — los 3 niveles de abrasividad ── */}
      <div className="bg-[#F5F7FA] mt-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#999] text-[11px] font-semibold uppercase tracking-widest mb-10 text-center"
          >
            Tres niveles. Una sola tecnología.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {niveles.map((n, i) => (
              <motion.div
                key={n.codigo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="bg-white rounded-2xl p-8 border border-[#EAECEF] hover:shadow-md transition-shadow duration-300"
              >
                {/* Barras de abrasividad — F1 llena, F2 media, F3 suave */}
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: dot <= n.barras ? n.color : '#E5E7EB',
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black leading-none" style={{ color: n.color }}>
                    {n.codigo}
                  </span>
                  <span className="text-[13px] font-semibold text-[#1A1A1A]">
                    {n.nombre}
                  </span>
                </div>

                {/* Canal chip */}
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-3"
                   style={{ color: n.color }}>
                  {n.canal}
                </p>

                <p className="text-[13px] font-light text-[#777] leading-relaxed mb-5">
                  {n.descripcion}
                </p>

                {/* NeoShield — todas lo tienen */}
                <div className="inline-flex items-center gap-1.5 bg-[#0076FF]/6 rounded-full px-3 py-1.5">
                  <ShieldCheck size={11} className="text-[#0076FF]" />
                  <span className="text-[10px] font-bold text-[#0076FF] uppercase tracking-wide">
                    NeoShield™ antibacterial
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Frase cierre */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-center text-[#999] text-[13px] font-light mt-10 max-w-lg mx-auto"
          >
            Los tres niveles comparten la misma tecnología NeoShield™,
            la misma durabilidad 3x y el mismo compromiso de no rayar
            tus utensilios. Solo cambia la intensidad.
          </motion.p>

        </div>
      </div>

    </section>
  )
}
