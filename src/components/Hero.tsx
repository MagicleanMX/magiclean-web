'use client'

import Image from 'next/image'
import type { HeroSection } from '@/lib/wordpress'
import { CANALES } from '@/lib/products'

// Fallback values — used when WordPress is unreachable or fields are empty
const FALLBACK: HeroSection = {
  eyebrow:       'Proveedor B2B · Canal Profesional México',
  headline:      'Fibras que duran. Tecnología que protege.',
  subheadline:   '23 modelos con NeoShield™ — la única tecnología antibacterial certificada para el canal profesional en México. Más duración. Cero contaminación cruzada. Un solo proveedor.',
  heroMicrotext: 'Distribuidores · Retail · HORECA · Institucional · México y LATAM',
}

interface HeroProps {
  data?: HeroSection | null
}

export default function Hero({ data }: HeroProps) {
  const eyebrow       = data?.eyebrow       || FALLBACK.eyebrow
  const headline      = data?.headline      || FALLBACK.headline
  const subheadline   = data?.subheadline   || FALLBACK.subheadline
  const heroMicrotext = data?.heroMicrotext || FALLBACK.heroMicrotext

  return (
    <section className="relative min-h-screen flex flex-col pt-[68px]">

      {/* Main hero — split layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[52%_48%] min-h-[calc(100vh-68px)]">

        {/* Izquierda — contenido, siempre visible */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-0 order-1">

          {/* Eyebrow — azul como en secciones premium */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF] shrink-0" />
            <span className="label-eyebrow text-[#0076FF]">{eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="headline-editorial text-[2.8rem] sm:text-[3.8rem] lg:text-[4.4rem] xl:text-[5.4rem] text-[#1A1A1A] mb-6 max-w-xl">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-[1rem] font-normal text-[#666666] leading-[1.75] max-w-sm mb-3">
            {subheadline}
          </p>

          {/* Micro-texto B2B */}
          <p className="text-[0.8rem] font-normal text-[#8B92A0] tracking-wide mb-8">
            {heroMicrotext}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center bg-[#0076FF] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold tracking-wide hover:bg-[#0052CC] transition-colors duration-300"
            >
              Solicitar cotización
            </a>
            <a
              href="#productos"
              className="inline-flex items-center justify-center border border-[#D0D0D0] text-[#1A1A1A] px-8 py-3.5 rounded-full text-[13px] font-semibold tracking-wide hover:border-[#1A1A1A] transition-colors duration-300"
            >
              Ver portafolio completo
            </a>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-6 sm:gap-10 mt-10 pt-6 border-t border-[#E8EAED] flex-wrap">
            {[
              { n: '3',            label: 'Años de crecimiento' },
              { n: 'ML · AMZ · WMT', label: 'Marketplaces activos' },
              { n: '23',           label: 'Modelos especializados' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl sm:text-2xl font-black text-[#1A1A1A] leading-none mb-1">{s.n}</p>
                <p className="label-eyebrow text-[#666666]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Derecha — slot visual para fotografía de producto */}
        <div
          className="relative order-2 overflow-hidden aspect-[4/5] lg:aspect-auto"
          style={{ backgroundColor: '#0A1628' }}
        >
          <Image
            src="/images/hero/hero-main.webp"
            alt="Fibra verde abrasiva MagicClean flotando sobre encimera de mármol en una cocina profesional iluminada por luz natural."
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Canal ticker */}
      <div className="bg-[#1A1A1A] py-3.5">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {CANALES.map((c, i) => (
              <span key={c} className="flex items-center gap-8">
                <span className="label-eyebrow text-white/50 text-[10px]">{c}</span>
                {i < CANALES.length - 1 && (
                  <span className="text-white/20 select-none text-xs">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
