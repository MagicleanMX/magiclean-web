'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { HeroSection } from '@/lib/wordpress'
import { CANALES } from '@/lib/products'

// Fallback values — used when WordPress is unreachable or fields are empty
const FALLBACK: HeroSection = {
  eyebrow:       'Proveedor B2B · Canal Profesional México',
  headline:      'Limpieza profesional, repensada.',
  subheadline:   'Solución integral con NeoShield™ en cada producto. Más duración. Cero contaminación cruzada. Para HORECA, retail e institucional.',
  heroMicrotext: 'México · LATAM',
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
            <span className="label-eyebrow text-[#0052CC]">{eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="headline-editorial text-[2.8rem] sm:text-[3.8rem] lg:text-[4.4rem] xl:text-[5.4rem] text-[#1A1A1A] mb-6 max-w-xl">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-[1rem] font-normal text-ink-muted leading-[1.75] max-w-sm mb-3">
            {subheadline}
          </p>

          {/* Micro-texto B2B */}
          <p className="text-[0.8rem] font-normal text-ink-subtle tracking-wide mb-8">
            {heroMicrotext}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center bg-[#0076FF] text-white px-8 py-3.5 rounded-full text-[13px] font-semibold tracking-wide hover:bg-[#0052CC] transition-colors duration-300"
            >
              Hablar con ventas
            </a>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center border border-[#D0D0D0] text-[#1A1A1A] px-8 py-3.5 rounded-full text-[13px] font-semibold tracking-wide hover:border-[#1A1A1A] transition-colors duration-300"
            >
              Ver portafolio completo
            </Link>
          </div>
        </div>

        {/* Derecha — slot visual para fotografía de producto */}
        <div
          className="relative order-2 overflow-hidden aspect-[4/5] lg:aspect-auto"
          style={{ backgroundColor: '#0A1628' }}
        >
          <Image
            src="/images/hero/hero-kitchen.webp"
            alt="MagicClean F1 — Fibra profesional flotando sobre encimera de mármol en cocina editorial con luz natural"
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
                <span className="label-eyebrow text-white text-[10px]">{c}</span>
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
