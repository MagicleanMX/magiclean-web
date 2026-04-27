'use client'

import { motion } from 'framer-motion'
import { Truck, MapPin, Package } from 'lucide-react'

// Presentaciones derivadas de products.json (snapshot 2026-04-23). Cobertura
// refleja operación real: surtido nacional vía paquetería/CEDIS desde bodega
// CDMX, presencia operativa directa solo CDMX hoy con expansión programada 2026.

const tiempos = [
  { zona: 'CDMX y zona metropolitana',       plazo: '3-5 días hábiles' },
  { zona: 'Resto de México (paquetería)',    plazo: '4-7 días hábiles' },
  { zona: 'CEDIS con transporte coordinado', plazo: '1-3 días hábiles' },
  { zona: 'LATAM',                           plazo: 'Cotizar por proyecto' },
]

const coberturaSubBloques = [
  {
    label: 'CÓMO LLEGA',
    items: [
      {
        subtitulo: 'Cobertura Nacional',
        descripcion: 'Surtimos a toda la República Mexicana desde nuestra bodega en CDMX.',
        pills: ['Paquetería profesional', 'Entrega en CEDIS'],
      },
    ],
  },
  {
    label: 'DÓNDE OPERAMOS',
    items: [
      {
        subtitulo: 'Operación Directa',
        descripcion: 'CDMX y zona metropolitana.',
        pills: [],
      },
      {
        subtitulo: 'Expansión 2026',
        descripcion: 'Distribución directa programada en:',
        pills: ['Guadalajara', 'Monterrey', 'Tijuana', 'Puebla', 'Querétaro'],
      },
      {
        subtitulo: 'LATAM',
        descripcion: 'Exportación bajo evaluación de proyecto.',
        pills: [],
      },
    ],
  },
]

const presentaciones = [
  {
    linea: 'Línea Fibras',
    editorial: 'Empacadas para distribución profesional.',
    dato: 'Paquetes de 1-3 piezas · Caja máster 24 paquetes',
  },
  {
    linea: 'Línea Mops',
    editorial: 'Sistemas completos listos para retail y HORECA.',
    dato: 'Unidad individual · Caja máster a cotizar por volumen',
  },
]

export default function Logistica() {
  return (
    <section id="logistica" className="section-standard bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Header editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14"
        >
          <p className="label-eyebrow text-[#0052CC] mb-3">Operación</p>
          <h2 className="headline-editorial text-[2.8rem] lg:text-[3.6rem] text-[#1A1A1A] mb-4">
            Cobertura nacional para distribuidores y empresas
          </h2>
          <p className="text-[1rem] font-normal text-ink-muted leading-[1.75]">
            Cobertura nacional desde CDMX. Operación directa en zona metro.
          </p>
        </motion.div>

        {/* Grid 3 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Col A — Tiempos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8EAED]">
              <Truck size={18} className="text-[#0076FF]" />
              <p className="label-eyebrow text-[#1A1A1A]">Tiempos de entrega</p>
            </div>
            <ul className="space-y-4">
              {tiempos.map((t) => (
                <li key={t.zona}>
                  <p className="text-[14px] font-semibold text-[#1A1A1A]">{t.plazo}</p>
                  <p className="text-[13px] font-normal text-ink-muted">{t.zona}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col B — Cobertura */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8EAED]">
              <MapPin size={18} className="text-[#0076FF]" />
              <p className="label-eyebrow text-[#1A1A1A]">Cobertura</p>
            </div>
            <div className="space-y-6">
              {coberturaSubBloques.map((bloque) => (
                <div key={bloque.label}>
                  <p className="text-[11px] font-semibold tracking-wide text-[#0052CC] mb-3">
                    {bloque.label}
                  </p>
                  <div className="space-y-4">
                    {bloque.items.map((item) => (
                      <div key={item.subtitulo}>
                        <p className="text-[12px] font-semibold text-[#1A1A1A] mb-1">
                          {item.subtitulo}
                        </p>
                        <p className="text-[13px] font-normal text-ink-muted leading-[1.6] mb-2">
                          {item.descripcion}
                        </p>
                        {item.pills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.pills.map((p) => (
                              <span
                                key={p}
                                className="inline-block px-2.5 py-1 text-[11px] font-medium text-[#1A1A1A] bg-[#F5F7FA] rounded-md"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Col C — Presentaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8EAED]">
              <Package size={18} className="text-[#0076FF]" />
              <p className="label-eyebrow text-[#1A1A1A]">Presentaciones</p>
            </div>
            <div className="space-y-5">
              {presentaciones.map((p) => (
                <div key={p.linea}>
                  <p className="text-[14px] font-semibold text-[#1A1A1A] mb-1">{p.linea}</p>
                  <p className="text-[13px] font-normal text-ink-muted leading-[1.6] mb-1.5">{p.editorial}</p>
                  <p className="text-[12px] font-medium text-[#0052CC]">{p.dato}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pie MOQ + flete */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-6 border-t border-[#E8EAED] text-[12px] font-normal text-ink-muted leading-[1.6]"
        >
          <strong className="font-semibold text-[#1A1A1A]">MOQ inicial:</strong> consultar según volumen y modalidad ·{' '}
          <strong className="font-semibold text-[#1A1A1A]">Flete:</strong> incluido en CDMX y zona metro · Otras modalidades con tarifa o negociación
        </motion.p>
      </div>
    </section>
  )
}
