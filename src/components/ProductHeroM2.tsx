'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

const benefits = [
  'Compacto donde se necesita. Poderoso donde se exige.',
  'NeoShield™ elimina el 99.9% de bacterias.',
  'Sin mojarte, sin agacharte, sin esfuerzo.',
  'Precio imbatible. Calidad sin concesiones.',
]

export default function ProductHeroM2() {
  return (
    // Dirección invertida al M1 — imagen izquierda, texto derecha (alterna como Rolex)
    <section id="sistemas-mop-m2" className="relative overflow-hidden bg-[#0A1628]">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── Izquierda — imagen producto ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[55vw] lg:min-h-0 order-1 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0D1E3A 0%, #0A1628 60%, #061020 100%)' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">

            {/* Placeholder — reemplazar con imagen del M2 */}
            <div className="relative w-52 h-64 lg:w-64 lg:h-80 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(160deg, #1A3050 0%, #0F2040 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="text-center">
                <p className="font-black text-[#0076FF] text-5xl lg:text-6xl leading-none">M2</p>
                <p className="text-white/20 text-xs font-medium tracking-wider mt-2 uppercase">Sistema Mop</p>
                <div className="mt-4 mx-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{ background: 'rgba(0,118,255,0.1)', border: '1px solid rgba(0,118,255,0.2)' }}
                >
                  <ShieldCheck size={11} className="text-[#0076FF]" />
                  <span className="text-[10px] font-bold text-[#0076FF] uppercase tracking-wide">NeoShield™</span>
                </div>
              </div>
            </div>

            {/* Badge principal — 99.9% */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center rounded-2xl px-6 py-4 shadow-xl"
              style={{ background: 'rgba(0,118,255,0.08)', border: '1px solid rgba(0,118,255,0.15)' }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Elimina bacterias</p>
              <p className="text-3xl font-black text-white leading-none">99.9%</p>
              <p className="text-[10px] text-white/20 mt-1 font-light">Tecnología NeoShield™</p>
            </motion.div>

          </div>
        </motion.div>

        {/* ── Derecha — texto editorial ── */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-20 order-2">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-eyebrow text-[#0076FF] mb-3"
          >
            Sistema Mop M2 — Apartamentos · Oficinas · Jóvenes
          </motion.p>

          {/* Headline editorial */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5"
          >
            <h2 className="headline-editorial text-[2.8rem] lg:text-[3.6rem] xl:text-[4.2rem] text-white">
              Tu espacio{' '}
              <span className="italic text-[#0076FF]">habla</span>
              <br />
              por ti.
            </h2>
          </motion.div>

          {/* NeoShield claim */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: 'rgba(0,118,255,0.08)', border: '1px solid rgba(0,118,255,0.2)' }}
            >
              <ShieldCheck size={14} className="text-[#0076FF] shrink-0" />
              <span className="text-[#0076FF] text-[12px] font-bold tracking-wide">
                NeoShield™ — 99.9% bacterias eliminadas
              </span>
            </div>
          </motion.div>

          {/* Párrafo narrativo */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-[1rem] font-light text-white/50 leading-[1.75] max-w-md mb-3"
          >
            Piso impecable, ambiente fresco, bacterias eliminadas.
            En el tiempo que tarda un café.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[1rem] font-light text-white/50 leading-relaxed max-w-md mb-6"
          >
            Compacto donde otros estorban. Efectivo donde otros fallan.
            El M2 se adapta a tu espacio — chico, mediano o grande —
            y lo deja impecable al precio que siempre debió tener.
          </motion.p>

          {/* Benefits */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="space-y-3 mb-8"
          >
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,118,255,0.1)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF]" />
                </span>
                <span className="text-[14px] font-light text-white/50">{b}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 bg-[#0076FF] text-white px-8 py-3.5 rounded-full text-[13px] font-bold hover:bg-white hover:text-[#0A1628] transition-all duration-300 group"
            >
              Quiero el M2
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 text-white/50 px-8 py-3.5 rounded-full text-[13px] font-semibold hover:text-white transition-all duration-300"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Solicitar muestra
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
