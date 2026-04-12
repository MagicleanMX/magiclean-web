'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { CategoriesSection } from '@/lib/wordpress'

// Fallback values — used when WordPress is unreachable or field group not yet published
const FALLBACK: CategoriesSection = {
  eyebrow:  'La Colección',
  headline: 'Un portafolio completo. Un solo proveedor.',
  ctaText:  'Ver catálogo completo',
  ctaLink:  '#contacto',
  microtext: 'Fibras, sistemas mop y accesorios — todo con NeoShield™. Para hogar, retail, HORECA e institucional.',
}

interface CategoriesProps {
  data?: CategoriesSection | null
}

const familias = [
  {
    id: 'fibras-verdes',
    anchor: '#contacto',
    nombre: 'Fibras Verdes',
    subtitulo: 'Limpieza Pesada y Profunda',
    descripcion: 'Alta abrasividad para cocinas industriales. Modelos F1, F2 y F3 en tres tamaños.',
    modelos: ['F1', 'F2', 'F3'],
    canal: 'HORECA · Industrial · Hogar',
    badge: null,
    color: '#F0F7F0',
    accentColor: '#2D7A2D',
    abrasividad: 5,
    usos: ['Cocinas industriales', 'Ollas y sartenes', 'Superficies de acero'],
  },
  {
    id: 'fibra-dual',
    anchor: '#fibra-dual-f4',
    nombre: 'Fibra Esponja Dual F4',
    subtitulo: 'Dualidad Inteligente',
    descripcion: 'Fibra verde de alta abrasividad por un lado, esponja suave por el otro. El más versátil.',
    modelos: ['F4'],
    canal: 'Hogar · Retail · HORECA',
    badge: 'Más popular',
    color: '#FFFBF0',
    accentColor: '#B45309',
    abrasividad: 5,
    usos: ['Vajilla', 'Ollas y sartenes', 'Encimeras de cocina'],
  },
  {
    id: 'fibras-especiales',
    anchor: '#contacto',
    nombre: 'Fibras Especiales',
    subtitulo: 'Para Cada Superficie',
    descripcion: 'F5 Negra para parrillas y hornos. F6 Blanca para baños. F7 Azul sin rayas para superficies delicadas.',
    modelos: ['F5', 'F6', 'F7'],
    canal: 'Hogar · HORECA · Institucional',
    badge: null,
    color: '#F0F4FF',
    accentColor: '#0052CC',
    abrasividad: null,
    usos: ['Parrillas y hornos', 'Baños', 'Cristal y cerámica'],
  },
  {
    id: 'borradores',
    anchor: '#contacto',
    nombre: 'Borradores Mágicos',
    subtitulo: 'Borra lo Imposible',
    descripcion: 'F8 con esponja para limpieza profunda. F9 el borrador puro. Eliminan manchas sin esfuerzo.',
    modelos: ['F8', 'F9'],
    canal: 'Hogar · Retail',
    badge: null,
    color: '#F5F0FF',
    accentColor: '#6D28D9',
    abrasividad: null,
    usos: ['Manchas difíciles', 'Paredes', 'Electrodomésticos'],
  },
  {
    id: 'sistemas-mop',
    anchor: '#sistemas-mop-m1',
    nombre: 'Sistemas Mop',
    subtitulo: 'Trapeado Profesional',
    descripcion: 'Turbo Magic M1 con pedal, Spin Magic M2 sin pedal, Rectangular M5, Doble Función M6, Atomizador M9.',
    modelos: ['M1', 'M2', 'M5', 'M6', 'M9'],
    canal: 'HORECA · Industrial · Hogar',
    badge: 'HORECA Ready',
    color: '#EFF6FF',
    accentColor: '#0076FF',
    abrasividad: null,
    usos: ['Pisos comerciales', 'Hoteles y restaurantes', 'Uso doméstico'],
  },
  {
    id: 'accesorios',
    anchor: '#contacto',
    nombre: 'Accesorios',
    subtitulo: 'Complementos del Sistema',
    descripcion: 'Cubetas, cepillos, trapeador de silicón, recogedor-escoba y repuestos para todos los modelos.',
    modelos: ['M3', 'M4', 'M7', 'M16', 'M17', 'M18'],
    canal: 'Todos los canales',
    badge: null,
    color: '#F5F7FA',
    accentColor: '#ADB3BA',
    abrasividad: null,
    usos: ['Repuestos mopa', 'Cepillo de baño', 'Cubeta plegable'],
  },
]

export default function Categories({ data }: CategoriesProps) {
  const eyebrow  = data?.eyebrow  || FALLBACK.eyebrow
  const headline = data?.headline || FALLBACK.headline
  const ctaText  = data?.ctaText  || FALLBACK.ctaText
  const ctaLink  = data?.ctaLink  || FALLBACK.ctaLink
  const microtext = data?.microtext || FALLBACK.microtext

  return (
    <section id="productos" className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <p className="label-eyebrow text-[#0076FF] mb-3">{eyebrow}</p>
            <h2 className="headline-editorial text-[2.8rem] lg:text-[3.6rem] text-[#1A1A1A] mb-4">
              {headline}
            </h2>
            <p className="text-[1rem] font-light text-[#666666] leading-[1.75]">{microtext}</p>
          </div>
          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076FF] hover:gap-3 transition-all duration-200 self-start lg:self-end shrink-0"
          >
            {ctaText} <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Grid — 6 familias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {familias.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href={f.anchor} className="group block cursor-pointer">

                {/* Card visual — producto domina */}
                <div
                  className="relative overflow-hidden rounded-2xl mb-4 transition-shadow duration-300 group-hover:shadow-xl"
                  style={{ aspectRatio: '3/4', backgroundColor: f.color }}
                >
                  {/* Subtle gradient overlay for depth */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(160deg, ${f.accentColor}08 0%, transparent 60%)` }}
                  />

                  {/* Ghost large letter — typographic backdrop */}
                  <p
                    className="absolute inset-0 flex items-center justify-center font-black text-[11rem] leading-none select-none pointer-events-none"
                    style={{ color: `${f.accentColor}12` }}
                  >
                    {f.modelos[0].charAt(0)}
                  </p>

                  {/* Badge — refined pill top-left */}
                  {f.badge && (
                    <span
                      className="absolute top-5 left-5 label-eyebrow text-[9px] px-3 py-1.5 rounded-full text-white z-10"
                      style={{ backgroundColor: f.accentColor }}
                    >
                      {f.badge}
                    </span>
                  )}

                  {/* Model count — top-right */}
                  <span className="absolute top-5 right-5 label-eyebrow text-[9px] px-2.5 py-1 rounded-full z-10"
                    style={{ backgroundColor: `${f.accentColor}15`, color: f.accentColor }}
                  >
                    {f.modelos.length} modelo{f.modelos.length > 1 ? 's' : ''}
                  </span>

                  {/* Product codes — centered, editorial */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {f.modelos.slice(0, 4).map((m) => (
                        <div
                          key={m}
                          className="rounded-xl px-4 py-3 flex items-center justify-center"
                          style={{
                            backgroundColor: `${f.accentColor}10`,
                            border: `1px solid ${f.accentColor}20`,
                          }}
                        >
                          <span
                            className="font-black text-[1.1rem] leading-none tracking-tight"
                            style={{ color: f.accentColor }}
                          >
                            {m}
                          </span>
                        </div>
                      ))}
                      {f.modelos.length > 4 && (
                        <div
                          className="rounded-xl px-4 py-3 flex items-center justify-center"
                          style={{
                            backgroundColor: `${f.accentColor}08`,
                            border: `1px solid ${f.accentColor}15`,
                          }}
                        >
                          <span
                            className="font-bold text-[0.85rem] leading-none"
                            style={{ color: `${f.accentColor}80` }}
                          >
                            +{f.modelos.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover CTA — slides up from bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <div
                      className="rounded-xl px-4 py-3 flex items-center justify-between"
                      style={{ backgroundColor: f.accentColor }}
                    >
                      <span className="text-white text-[12px] font-semibold">Ver familia</span>
                      <ArrowRight size={13} className="text-white/80" />
                    </div>
                  </div>
                </div>

                {/* Info debajo — limpia, tipografía fuerte */}
                <div className="px-1">
                  <p className="font-serif text-[1.15rem] font-medium text-[#1A1A1A] group-hover:text-[#0076FF] transition-colors duration-200 leading-snug mb-1">
                    {f.nombre}
                  </p>
                  <p className="text-[12.5px] font-light text-[#666666] leading-snug">
                    {f.subtitulo}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
