'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const familias = [
  {
    id: 'fibras-verdes',
    nombre: 'Fibras Verdes',
    subtitulo: 'Limpieza Pesada y Profunda',
    descripcion: 'Alta abrasividad para cocinas industriales. Modelos F1, F2 y F3 en tres tamaños.',
    modelos: ['F1', 'F2', 'F3'],
    badge: null,
    color: '#F0F7F0',
    accentColor: '#2D7A2D',
    abrasividad: 5,
    usos: ['Cocinas industriales', 'Ollas y sartenes', 'Superficies de acero'],
  },
  {
    id: 'fibra-dual',
    nombre: 'Fibra Esponja Dual F4',
    subtitulo: 'Dualidad Inteligente',
    descripcion: 'Fibra verde de alta abrasividad por un lado, esponja suave por el otro. El más versátil.',
    modelos: ['F4'],
    badge: 'Más popular',
    color: '#FFFBF0',
    accentColor: '#B45309',
    abrasividad: 5,
    usos: ['Vajilla', 'Ollas y sartenes', 'Encimeras de cocina'],
  },
  {
    id: 'fibras-especiales',
    nombre: 'Fibras Especiales',
    subtitulo: 'Para Cada Superficie',
    descripcion: 'F5 Negra para parrillas y hornos. F6 Blanca para baños. F7 Azul sin rayas para superficies delicadas.',
    modelos: ['F5', 'F6', 'F7'],
    badge: null,
    color: '#F0F4FF',
    accentColor: '#0052CC',
    abrasividad: null,
    usos: ['Parrillas y hornos', 'Baños', 'Cristal y cerámica'],
  },
  {
    id: 'borradores',
    nombre: 'Borradores Mágicos',
    subtitulo: 'Borra lo Imposible',
    descripcion: 'F8 con esponja para limpieza profunda. F9 el borrador puro. Eliminan manchas sin esfuerzo.',
    modelos: ['F8', 'F9'],
    badge: null,
    color: '#F5F0FF',
    accentColor: '#6D28D9',
    abrasividad: null,
    usos: ['Manchas difíciles', 'Paredes', 'Electrodomésticos'],
  },
  {
    id: 'sistemas-mop',
    nombre: 'Sistemas Mop',
    subtitulo: 'Trapeado Profesional',
    descripcion: 'Turbo Magic M1 con pedal, Spin Magic M2 sin pedal, Rectangular M5, Doble Función M6, Atomizador M9.',
    modelos: ['M1', 'M2', 'M5', 'M6', 'M9'],
    badge: 'HORECA Ready',
    color: '#EFF6FF',
    accentColor: '#0076FF',
    abrasividad: null,
    usos: ['Pisos comerciales', 'Hoteles y restaurantes', 'Uso doméstico'],
  },
  {
    id: 'accesorios',
    nombre: 'Accesorios',
    subtitulo: 'Complementos del Sistema',
    descripcion: 'Cubetas, cepillos, trapeador de silicón, recogedor-escoba y repuestos para todos los modelos.',
    modelos: ['M3', 'M4', 'M7', 'M16', 'M17', 'M18'],
    badge: null,
    color: '#F5F7FA',
    accentColor: '#ADB3BA',
    abrasividad: null,
    usos: ['Repuestos mopa', 'Cepillo de baño', 'Cubeta plegable'],
  },
]

export default function Categories() {
  return (
    <section id="productos" className="py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <p className="label-eyebrow text-[#FF2B2B] mb-4">La Colección</p>
            <h2 className="headline-editorial text-[2.6rem] lg:text-[3.4rem] text-[#1A1A1A] max-w-sm">
              Productos MagicClean
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-2">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076FF] hover:gap-3 transition-all duration-200"
            >
              Ver catálogo completo <ArrowRight size={14} />
            </a>
            <p className="label-eyebrow text-[#999]">23 modelos · 2 líneas de producto</p>
          </div>
        </motion.div>

        {/* Grid — 6 familias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {familias.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#contacto" className="group block cursor-pointer">
                {/* Imagen — aspect 4/5 */}
                <div
                  className="relative overflow-hidden rounded-2xl mb-4"
                  style={{ aspectRatio: '4/5' }}
                >
                  {/* Fondo */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ backgroundColor: f.color }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">

                      {/* Badge popular */}
                      {f.badge && (
                        <span
                          className="absolute top-5 left-5 text-white label-eyebrow text-[9px] px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: f.accentColor }}
                        >
                          {f.badge}
                        </span>
                      )}

                      {/* Modelos chips */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {f.modelos.map((m) => (
                          <div
                            key={m}
                            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-white"
                            style={{ boxShadow: `0 4px 16px ${f.accentColor}25` }}
                          >
                            <span
                              className="font-black text-[13px] leading-none"
                              style={{ color: f.accentColor }}
                            >
                              {m}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Nombre familia */}
                      <div className="text-center mt-2">
                        <p
                          className="font-black text-[18px] leading-tight mb-1"
                          style={{ color: f.accentColor }}
                        >
                          {f.nombre}
                        </p>
                        <p className="text-[11px] font-medium text-[#999] tracking-wider uppercase">
                          {f.subtitulo}
                        </p>
                      </div>

                      {/* Usos */}
                      <div className="flex flex-col gap-1 mt-1">
                        {f.usos.map((uso) => (
                          <div key={uso} className="flex items-center gap-1.5 justify-center">
                            <span
                              className="w-1 h-1 rounded-full shrink-0"
                              style={{ backgroundColor: f.accentColor }}
                            />
                            <span className="text-[11px] font-light text-[#777]">{uso}</span>
                          </div>
                        ))}
                      </div>

                      {/* Nivel abrasividad si aplica */}
                      {f.abrasividad && (
                        <div className="mt-3 flex flex-col items-center gap-1">
                          <p className="label-eyebrow text-[#999] text-[9px]">Nivel Abrasividad</p>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map((n) => (
                              <div
                                key={n}
                                className="w-4 h-1.5 rounded-full"
                                style={{
                                  backgroundColor: n <= (f.abrasividad ?? 0)
                                    ? f.accentColor
                                    : `${f.accentColor}25`
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/60 transition-all duration-400 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                      <p className="label-eyebrow text-white/60 mb-1">{f.modelos.length} modelo{f.modelos.length > 1 ? 's' : ''} disponibles</p>
                      <p className="text-white font-semibold text-[15px] mb-3">{f.nombre}</p>
                      <span className="inline-flex items-center gap-1.5 text-white text-[12px] font-semibold border border-white/40 rounded-full px-4 py-1.5 hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                        Descubrir <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info debajo */}
                <div className="px-1">
                  <p className="label-eyebrow text-[#999] mb-1">{f.subtitulo}</p>
                  <p
                    className="font-serif text-[1.05rem] font-medium text-[#1A1A1A] transition-colors duration-200"
                    style={{ color: undefined }}
                  >
                    {f.nombre}
                  </p>
                  <p className="text-[13px] font-light text-[#999] mt-0.5 line-clamp-2">{f.descripcion}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
