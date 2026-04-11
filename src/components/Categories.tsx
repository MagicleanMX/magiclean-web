'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const productos = [
  {
    codigo: 'F1',
    nombre: 'Fibra Suave F1',
    categoria: 'Fibras Abrasivas',
    descripcion: 'Para superficies delicadas. Sin rayar.',
    color: '#E8F0FF',
    textColor: '#0076FF',
  },
  {
    codigo: 'F4',
    nombre: 'Fibra Dual F4',
    categoria: 'NeoShield™ — Antibacterial',
    descripcion: 'Doble cara. El más vendido de la línea.',
    color: '#FFF0F0',
    textColor: '#FF2B2B',
    badge: 'Más popular',
  },
  {
    codigo: 'F6',
    nombre: 'Fibra Ultra F6',
    categoria: 'Fibras Abrasivas',
    descripcion: 'Máxima abrasividad para cocinas industriales.',
    color: '#F0F5FF',
    textColor: '#0052CC',
  },
  {
    codigo: 'MF',
    nombre: 'Microfibra Premium',
    categoria: 'Microfibras',
    descripcion: 'Cristales, baños y superficies premium.',
    color: '#F0FFF4',
    textColor: '#00875A',
  },
  {
    codigo: 'M1',
    nombre: 'Turbo Magic M1',
    categoria: 'Sistemas de Mop',
    descripcion: 'Sistema completo de trapeado profesional.',
    color: '#FFFBF0',
    textColor: '#B45309',
  },
  {
    codigo: 'HR',
    nombre: 'Kit HORECA',
    categoria: 'Soluciones HORECA',
    descripcion: 'Línea certificada para hoteles y restaurantes.',
    color: '#F5F0FF',
    textColor: '#6D28D9',
  },
]

export default function Categories() {
  return (
    <section id="productos" className="py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header — estilo Rolex: eyebrow + Playfair headline */}
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
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076FF] hover:gap-3 transition-all duration-200 self-start lg:self-auto"
          >
            Ver catálogo completo <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Grid — aspect-ratio 4/5, estilo Rolex watches grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {productos.map((p, i) => (
            <motion.div
              key={p.codigo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#contacto" className="group block cursor-pointer">
                {/* Imagen — aspect 4/5 con hover overlay */}
                <div
                  className="relative overflow-hidden rounded-2xl mb-4"
                  style={{ aspectRatio: '4/5' }}
                >
                  {/* Fondo y producto placeholder */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ backgroundColor: p.color }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      {/* Badge popular */}
                      {p.badge && (
                        <span className="absolute top-5 left-5 bg-[#FF2B2B] text-white label-eyebrow text-[9px] px-2.5 py-1 rounded-full">
                          {p.badge}
                        </span>
                      )}

                      {/* Código del producto */}
                      <div
                        className="w-28 h-28 rounded-full bg-white shadow-sm flex items-center justify-center border border-white"
                        style={{ boxShadow: `0 8px 32px ${p.textColor}20` }}
                      >
                        <span
                          className="font-black text-3xl leading-none"
                          style={{ color: p.textColor }}
                        >
                          {p.codigo}
                        </span>
                      </div>

                      <p className="text-[11px] font-semibold text-[#999] tracking-wider uppercase">
                        MagicClean
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay — estilo Rolex: aparece info + CTA */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/60 transition-all duration-400 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                      <p className="label-eyebrow text-white/60 mb-1">{p.categoria}</p>
                      <p className="text-white font-semibold text-[15px] mb-3">{p.nombre}</p>
                      <span className="inline-flex items-center gap-1.5 text-white text-[12px] font-semibold border border-white/40 rounded-full px-4 py-1.5 hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                        Descubrir <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info debajo — como Rolex: nombre + categoría */}
                <div className="px-1">
                  <p className="label-eyebrow text-[#999] mb-1">{p.categoria}</p>
                  <p className="font-serif text-[1.05rem] font-medium text-[#1A1A1A] group-hover:text-[#0076FF] transition-colors duration-200">
                    {p.nombre}
                  </p>
                  <p className="text-[13px] font-light text-[#999] mt-0.5">{p.descripcion}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
