import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import productsData from '@/lib/products.json'
import { CATEGORIA_LABELS, getChipColor } from '@/lib/categoryColors'
import type { ProductCategoria } from '@/lib/categoryColors'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyCtaBar from '@/components/StickyCtaBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import DistribuidoresCTA from '@/components/DistribuidoresCTA'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import ProductImageBlock from '@/components/ProductImageBlock'
import ProductBadges from '@/components/ProductBadges'
import RelatedProducts from '@/components/RelatedProducts'

type Product = {
  sku: string
  nombre: string
  variante: string | null
  categoria: ProductCategoria
  color: string | null
  uso_principal: string
  descripcion_corta: string
  descripcion_larga: string
  recomendado_para: string[]
  presentacion: { unidad: string; caja: string | null }
  linea: 'standard' | 'ambas'
  estado: 'activo' | 'descontinuado' | 'en_desarrollo'
  antibacterial_neoshield: boolean
  sin_quimicos: boolean
  destacado: boolean
  foto_disponible: boolean
  imagen_path: string | null
  compatible_con: string[] | null
  notas: string | null
  medida?: string
  abrasividad?: number
  unidades_paquete?: number
  color_ficha?: string
  color_ficha_secundario?: string
  aplicaciones_si?: string[]
  aplicaciones_no?: string[]
  upc_paquete?: string | null
  upc_cajex?: string | null
  upc_cajex_desc?: string | null
  upc_master?: string | null
  upc_master_desc?: string | null
  composicion?: string
  duracion?: string
  metodo_uso?: string
  subtitulo_hero?: string
  nombre_display?: string
}

const products = productsData as Product[]
const productsBySku = new Map(products.map((p) => [p.sku, p]))

const CANAL_LABELS: Record<string, string> = {
  hogar: 'Hogar',
  horeca: 'HORECA',
  industrial: 'Industrial',
  oficinas: 'Oficinas',
  retail: 'Retail',
}

type ArtExtra = 'dual' | 'negro' | 'blanco' | 'borrador' | null
type FichaExtras = {
  colorDark: string
  artExtra: ArtExtra
  familia?: { variantes: { sku: string; desc: string }[]; sharedDesc: string }
}

const FAMILIA_F1_F3 = {
  variantes: [
    { sku: 'F1', desc: '220×140×8 mm — Grande' },
    { sku: 'F2', desc: '150×140×8 mm — Mediana' },
    { sku: 'F3', desc: '135×80×8 mm — Estándar' },
  ],
  sharedDesc:
    'Misma composición 100% Poliéster y abrasividad 5/5. Elige la medida según la superficie a limpiar.',
}

const SHEET_DATA: Record<string, FichaExtras> = {
  F1: { colorDark: '#145524', artExtra: null, familia: FAMILIA_F1_F3 },
  F2: { colorDark: '#145524', artExtra: null, familia: FAMILIA_F1_F3 },
  F3: { colorDark: '#145524', artExtra: null, familia: FAMILIA_F1_F3 },
  F4: { colorDark: '#185e26', artExtra: 'dual' },
  F5: { colorDark: '#111111', artExtra: 'negro' },
  F6: { colorDark: '#153a75', artExtra: 'blanco' },
  F7: { colorDark: '#133a75', artExtra: null },
  F8: { colorDark: '#134f85', artExtra: 'borrador' },
  F9: { colorDark: '#134f85', artExtra: 'borrador' },
}

const ICONS: Record<string, string> = {
  'Superficies resistentes': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="1"/><path d="M2 10h20M8 14h8"/></svg>`,
  'Cocinas industriales': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18M5 7V5h2M17 7V5h2M5 17h14a2 2 0 002-2V9H3v6a2 2 0 002 2z"/><path d="M8 13h8"/></svg>`,
  'Cocinas profesionales': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18M5 7V5h2M17 7V5h2M5 17h14a2 2 0 002-2V9H3v6a2 2 0 002 2z"/><path d="M8 13h8"/></svg>`,
  Cocinas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18M5 7V5h2M17 7V5h2M5 17h14a2 2 0 002-2V9H3v6a2 2 0 002 2z"/></svg>`,
  'Ollas y sartenes': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h12M6 12a2 2 0 01-2-2V8h16v2a2 2 0 01-2 2M6 12v4a1 1 0 001 1h10a1 1 0 001-1v-4"/><path d="M9 8V6M15 8V6"/></svg>`,
  'Superficies de acero': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 8h18M7 12h10M7 16h6"/></svg>`,
  Vajilla: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="9" rx="7" ry="4"/><path d="M5 9v4c0 2.2 3.1 4 7 4s7-1.8 7-4V9"/></svg>`,
  'Encimeras de cocina': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="12" rx="1"/><path d="M2 12h20"/><circle cx="7" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="17" cy="5" r="2"/></svg>`,
  Parrillas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 10h16M4 14h16M6 6v8M10 6v8M14 6v8M18 6v8"/><path d="M8 14l-2 4M16 14l2 4"/></svg>`,
  'Parrillas y asadores': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 10h16M4 14h16M6 6v8M10 6v8M14 6v8M18 6v8"/><path d="M8 14l-2 4M16 14l2 4"/></svg>`,
  Asadores: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18M6 7v10M18 7v10"/><path d="M6 12h12"/><path d="M9 17l-1 3M15 17l1 3"/></svg>`,
  Hornos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="18" rx="1"/><path d="M2 9h20M7 6h2M15 6h2"/><rect x="6" y="12" width="12" height="7" rx="1"/></svg>`,
  'Hornos industriales': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="18" rx="1"/><path d="M2 9h20M7 6h2M15 6h2"/><rect x="6" y="12" width="12" height="7" rx="1"/></svg>`,
  'Superficies de fierro': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="0"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,
  'Cochambre incrustado': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="0"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,
  'Cristales y espejos': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 3l18 18M21 3L3 21"/></svg>`,
  'Mamparas de ducha': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="10" height="20" rx="1"/><path d="M14 6h4a1 1 0 011 1v13a1 1 0 01-1 1h-4"/><path d="M7 7v10"/></svg>`,
  Baño: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z"/><path d="M4 12V6a2 2 0 012-2h1a2 2 0 012 2v1"/><path d="M9 20v2M15 20v2"/></svg>`,
  Baños: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z"/><path d="M4 12V6a2 2 0 012-2h1a2 2 0 012 2v1"/><path d="M9 20v2M15 20v2"/></svg>`,
  'Baño y sanitarios': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z"/><path d="M4 12V6a2 2 0 012-2h1a2 2 0 012 2v1"/><path d="M9 20v2M15 20v2"/></svg>`,
  Cromo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2"/><circle cx="12" cy="12" r="3"/></svg>`,
  'Ollas delicadas': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 11h12M6 11a3 3 0 01-3-3V7h18v1a3 3 0 01-3 3M6 11v5a1 1 0 001 1h10a1 1 0 001-1v-5"/><path d="M9 7V5M15 7V5"/></svg>`,
  Vidrio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8l2 5H6zM6 8l-1 13h14L18 8"/></svg>`,
  'Vidrio y cristalería': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8l2 5H6zM6 8l-1 13h14L18 8"/></svg>`,
  'Tenis y calzado': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14c0 0 2-2 6-2s8 3 12 3v3H3v-4z"/><path d="M3 14l4-7h3l-2 5"/><path d="M11 10l4-1 3 5"/></svg>`,
  'Juntas de pisos': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/></svg>`,
  'Rayón de crayón': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-9 9-4-4 9-9zM3 21l4-4 4 4-4 4-4-4z"/><path d="M15 5l4 4"/></svg>`,
  'Óxido, grasa y rayones': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>`,
  'Oxido y grasa': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>`,
  'Vidrio y cristal': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8l2 5H6zM6 8l-1 13h14L18 8"/><path d="M10 13v4M14 13v4"/></svg>`,
  'Superficies delicadas': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="11" r="5"/><path d="M7 18c0 1.7 2.2 3 5 3s5-1.3 5-3"/></svg>`,
  'Cerámica sensible': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M8.5 12a3.5 3.5 0 017 0"/></svg>`,
  Cerámica: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M8.5 12a3.5 3.5 0 017 0"/></svg>`,
  'Cerámica delicada': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M9 9l6 6M15 9l-6 6"/></svg>`,
  'Superficies metálicas': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="0"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,
  Fierro: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16"/><path d="M4 4l16 16M20 4L4 20"/></svg>`,
  'Fierro y acero rudo': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16"/><path d="M4 4l16 16M20 4L4 20"/></svg>`,
  'Superficies muy abrasivas': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20L12 4l9 16H3z"/><path d="M12 12v4M12 17v1"/></svg>`,
}

const DEFAULT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8"/></svg>`

function iconFor(label: string): string {
  return ICONS[label] ?? DEFAULT_ICON
}

const SHIELD_SVG = `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="38" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="2"/>
  <path d="M40 14L56 21v16c0 12-16 21-16 21S24 49 24 37V21z" fill="#0076FF" fill-opacity="0.12"/>
  <path d="M40 14L56 21v16c0 12-16 21-16 21S24 49 24 37V21z" stroke="#0076FF" stroke-width="2.2" stroke-linejoin="round"/>
  <polyline points="29,39 37,47 53,29" stroke="#0076FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

function fibraArtBg(color: string, artExtra: ArtExtra): string {
  if (artExtra === 'dual')
    return `linear-gradient(to bottom, ${color} 55%, #C8960A 55%), repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0 9px, rgba(255,255,255,0.04) 9px 24px)`
  if (artExtra === 'negro')
    return `repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0 9px, rgba(0,0,0,0.3) 9px 24px), ${color}`
  if (artExtra === 'blanco')
    return `repeating-linear-gradient(90deg, #DDEEFF 0 3px, #EEF5FF 3px 12px), #EAF0FA`
  if (artExtra === 'borrador')
    return `linear-gradient(to bottom, ${color} 45%, #F5F5F5 45%)`
  return `repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0 9px, rgba(255,255,255,0.04) 9px 24px), ${color}`
}

function boxSvg(color: string, tipo: string, sku: string, uds?: number): string {
  const labels: Record<string, string> = {
    Paquete: `${sku} · ${uds ?? ''} uds`,
    Cajex: 'Cajex',
    Master: 'Master',
  }
  const lbl = labels[tipo] ?? tipo
  return `<svg width="88" height="66" viewBox="0 0 88 66" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="10" width="72" height="48" fill="#E8EDF2" stroke="#CBD5E1" stroke-width="1"/>
    <path d="M8 22h72" stroke="#CBD5E1"/>
    <path d="M26 10v12M62 10v12" stroke="#CBD5E1"/>
    <rect x="16" y="28" width="56" height="24" fill="${color}" fill-opacity="0.8"/>
    <text x="44" y="42" font-size="8" text-anchor="middle" fill="white" font-weight="800" font-family="system-ui">${lbl}</text>
  </svg>`
}

export async function generateStaticParams() {
  return products.filter((p) => p.estado === 'activo').map((p) => ({ sku: p.sku }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sku: string }>
}): Promise<Metadata> {
  const { sku } = await params
  const product = productsBySku.get(sku)
  if (!product || product.estado !== 'activo') return {}
  const fullName = product.variante ? `${product.nombre} — ${product.variante}` : product.nombre
  return {
    title: `${fullName} (${product.sku}) — MagiClean`,
    description: product.descripcion_corta,
    openGraph: {
      title: `${fullName} — MagiClean`,
      description: product.descripcion_corta,
    },
  }
}

const APPLE_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif'

function FichaFibra({ product, extras }: { product: Product; extras: FichaExtras }) {
  const sku = product.sku
  const color = product.color_ficha ?? '#0076FF'
  const colorDark = extras.colorDark
  const titleLines = (product.nombre_display ?? product.nombre).split('\n')

  const specRows: [string, string][] = []
  if (product.medida) specRows.push(['Medida', product.medida])
  if (product.composicion) specRows.push(['Composición', product.composicion])
  if (product.presentacion?.unidad) specRows.push(['Presentación', product.presentacion.unidad])
  if (product.duracion) specRows.push(['Duración', product.duracion])
  if (product.metodo_uso) specRows.push(['Método', product.metodo_uso])
  if (product.antibacterial_neoshield) specRows.push(['Tecnología', 'NeoShield™'])

  const familia = extras.familia
  const ok = product.aplicaciones_si ?? []
  const no = product.aplicaciones_no ?? []
  const aplicacionesAll = [
    ...ok.map((t) => ({ t, ok: true })),
    ...no.map((t) => ({ t, ok: false })),
  ].slice(0, 6)

  type Pack = { tipo: 'Paquete' | 'Cajex' | 'Master'; upc: string | null; nombre: string; dim?: string }
  const packs: Pack[] = []
  if (product.upc_paquete) {
    packs.push({ tipo: 'Paquete', upc: product.upc_paquete, nombre: product.presentacion.unidad })
  }
  if (product.upc_cajex || product.upc_cajex_desc) {
    const parts = product.upc_cajex_desc?.split(' · ')
    packs.push({
      tipo: 'Cajex',
      upc: product.upc_cajex ?? null,
      nombre: parts?.[0] ?? 'Cajex',
      dim: parts?.[1],
    })
  }
  if (product.upc_master || product.upc_master_desc) {
    const parts = product.upc_master_desc?.split(' · ')
    packs.push({
      tipo: 'Master',
      upc: product.upc_master ?? null,
      nombre: parts?.[0] ?? 'Master',
      dim: parts?.[1],
    })
  }

  return (
    <div style={{ background: '#f5f5f7', fontFamily: APPLE_FONT, color: '#1d1d1f' }}>
      <div className="max-w-[1100px] mx-auto py-10 lg:py-16 px-5">
        <p
          className="text-center mb-3"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#6e6e73',
            paddingTop: 32,
            paddingBottom: 12,
          }}
        >
          Ficha técnica · Modelo {sku}
        </p>

        <article className="bg-white overflow-hidden mb-16" style={{ border: '1px solid #d2d2d7' }}>
          {/* HERO */}
          <div
            className="text-center text-white"
            style={{
              background: `linear-gradient(170deg, ${color} 0%, ${colorDark} 100%)`,
              padding: '72px 48px 0',
              overflow: 'hidden',
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.72,
                marginBottom: 16,
              }}
            >
              Ficha técnica · Modelo {sku}
            </p>
            <h1
              style={{
                fontSize: 'clamp(52px, 8vw, 96px)',
                fontWeight: 900,
                letterSpacing: '-0.06em',
                lineHeight: 0.9,
                marginBottom: 20,
              }}
            >
              {titleLines.map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {line}
                </span>
              ))}
            </h1>
            <p
              style={{
                fontSize: 19,
                fontWeight: 400,
                lineHeight: 1.5,
                opacity: 0.88,
                maxWidth: 580,
                margin: '0 auto 32px',
              }}
            >
              {product.subtitulo_hero ?? product.descripcion_corta}
            </p>

            <div
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 56,
              }}
            >
              <Link
                href={`/#contacto?producto=${sku}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '12px 24px',
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  background: '#fff',
                  color,
                }}
              >
                Cotizar {sku}
              </Link>
              <a
                href="tel:+525570959011"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '12px 24px',
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  background: 'transparent',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.45)',
                }}
              >
                Llamar para más información
              </a>
            </div>

            <div style={{ width: 'min(520px, 80%)', margin: '0 auto', display: 'block' }}>
              <div
                style={{
                  aspectRatio: '2.4 / 1',
                  border: '1px solid rgba(255,255,255,0.18)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: fibraArtBg(color, extras.artExtra),
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    background: '#fff',
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: '0.03em',
                    padding: '7px 18px',
                    color,
                  }}
                >
                  MagiClean {sku}
                </div>
              </div>
            </div>
          </div>

          {/* SPECS STRIP */}
          {(product.medida ||
            product.abrasividad !== undefined ||
            product.unidades_paquete !== undefined) && (
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{
                background: '#fff',
                borderTop: '1px solid #d2d2d7',
                borderBottom: '1px solid #d2d2d7',
              }}
            >
              {product.medida && (
                <div
                  className="border-b md:border-b-0 md:border-r"
                  style={{ padding: '26px 36px', borderColor: '#d2d2d7' }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#6e6e73',
                      marginBottom: 10,
                    }}
                  >
                    Medida
                  </div>
                  <div
                    style={{
                      fontSize: product.medida.length > 12 ? 22 : 28,
                      fontWeight: 900,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {product.medida}
                  </div>
                </div>
              )}
              {product.abrasividad !== undefined && (
                <div
                  className="border-b md:border-b-0 md:border-r"
                  style={{ padding: '26px 36px', borderColor: '#d2d2d7' }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#6e6e73',
                      marginBottom: 10,
                    }}
                  >
                    Abrasividad
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em' }}>
                    {product.abrasividad} / 5
                  </div>
                  <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        style={{
                          height: 6,
                          flex: 1,
                          background: n <= (product.abrasividad ?? 0) ? color : '#d2d2d7',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {product.unidades_paquete !== undefined && (
                <div style={{ padding: '26px 36px' }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#6e6e73',
                      marginBottom: 10,
                    }}
                  >
                    Presentación
                  </div>
                  <div
                    style={{
                      fontSize: product.presentacion.unidad.length > 12 ? 20 : 28,
                      fontWeight: 900,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {product.presentacion.unidad}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* G2 */}
          {specRows.length > 0 && (
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 1, background: '#d2d2d7' }}
            >
              <div style={{ background: '#fff', padding: '40px 44px' }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#6e6e73',
                    marginBottom: 18,
                  }}
                >
                  Especificaciones técnicas
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {specRows.map(([l, v], i) => (
                      <tr
                        key={l}
                        style={{
                          borderBottom: i === specRows.length - 1 ? 'none' : '1px solid #e8e8ed',
                        }}
                      >
                        <td style={{ padding: '10px 0', fontSize: 15, color: '#6e6e73' }}>{l}</td>
                        <td
                          style={{
                            padding: '10px 0',
                            fontSize: 15,
                            fontWeight: 700,
                            textAlign: 'right',
                          }}
                        >
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ background: '#f5f5f7', padding: '40px 44px' }}>
                {familia ? (
                  <>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#6e6e73',
                        marginBottom: 18,
                      }}
                    >
                      Variantes de medida · Misma familia
                    </div>
                    {familia.variantes.map((v, i) => (
                      <div
                        key={v.sku}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          padding: '10px 0',
                          borderBottom:
                            i === familia.variantes.length - 1 ? 'none' : '1px solid #e8e8ed',
                        }}
                      >
                        <Link
                          href={`/productos/${v.sku}`}
                          style={{
                            fontSize: 18,
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            color,
                            textDecoration: 'none',
                          }}
                        >
                          {v.sku}
                        </Link>
                        <span style={{ fontSize: 13, color: '#6e6e73' }}>{v.desc}</span>
                      </div>
                    ))}
                    <div
                      style={{
                        marginTop: 18,
                        background: '#f5f5f7',
                        padding: '14px 16px',
                        fontSize: 13,
                        color: '#6e6e73',
                        lineHeight: 1.6,
                        borderLeft: `3px solid ${color}`,
                      }}
                    >
                      {familia.sharedDesc}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#6e6e73',
                        marginBottom: 18,
                      }}
                    >
                      Aplicaciones principales
                    </div>
                    {aplicacionesAll.map((a, i) => (
                      <div
                        key={`${a.t}-${i}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          padding: '10px 0',
                          borderBottom:
                            i === aplicacionesAll.length - 1 ? 'none' : '1px solid #e8e8ed',
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            background: a.ok ? '#e4f5e9' : '#fdecea',
                            color: '#555',
                          }}
                          dangerouslySetInnerHTML={{ __html: iconFor(a.t) }}
                        />
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: a.ok ? '#1d1d1f' : '#6e6e73',
                          }}
                        >
                          {a.t}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {/* APPS GRID */}
          {(ok.length > 0 || no.length > 0) && (
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 1, background: '#d2d2d7' }}
            >
              <div style={{ background: '#f2faf4', padding: '36px 44px' }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#166534',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 22,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 22,
                      height: 22,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#166534',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    <svg viewBox="0 0 12 12" width="11" height="11" fill="none">
                      <polyline
                        points="2,6 5,9 10,3"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Recomendado para
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {ok.map((a, i) => (
                    <div
                      key={a}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '12px 0',
                        borderBottom: i === ok.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          background: '#e4f5e9',
                          color: '#555',
                        }}
                        dangerouslySetInnerHTML={{ __html: iconFor(a) }}
                      />
                      <span style={{ fontSize: 15, fontWeight: 600 }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff8f8', padding: '36px 44px' }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#9f1239',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 22,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 22,
                      height: 22,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#9f1239',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    <svg viewBox="0 0 12 12" width="11" height="11" fill="none">
                      <line
                        x1="3"
                        y1="3"
                        x2="9"
                        y2="9"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <line
                        x1="9"
                        y1="3"
                        x2="3"
                        y2="9"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  No recomendado para
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {no.length > 0 ? (
                    no.map((a, i) => (
                      <div
                        key={a}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          padding: '12px 0',
                          borderBottom:
                            i === no.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                        }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            background: '#fdecea',
                            color: '#555',
                          }}
                          dangerouslySetInnerHTML={{ __html: iconFor(a) }}
                        />
                        <span style={{ fontSize: 15, fontWeight: 600 }}>{a}</span>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: '20px 0',
                        fontSize: 14,
                        color: '#6e6e73',
                        fontStyle: 'italic',
                      }}
                    >
                      Sin restricciones de uso específicas.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* NEOSHIELD STRIP */}
          {product.antibacterial_neoshield && (
            <div
              className="grid items-center"
              style={{
                gridTemplateColumns: '72px 1fr auto',
                gap: 28,
                padding: '40px 44px',
                background: '#fff',
                borderTop: '1px solid #d2d2d7',
                borderBottom: '1px solid #d2d2d7',
              }}
            >
              <div
                style={{ width: 72, height: 72, flexShrink: 0 }}
                dangerouslySetInnerHTML={{ __html: SHIELD_SVG }}
              />
              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    marginBottom: 6,
                  }}
                >
                  NeoShield™ Surface Protección
                </div>
                <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.6, maxWidth: 520 }}>
                  Tecnología antibacterial exclusiva incluida en cada unidad MagiClean. Ayuda a
                  remover el 99% de bacterias en uso correcto. No retiene olores, no se deforma,
                  mantiene su forma.
                </p>
              </div>
              <div
                style={{
                  background: '#1d1d1f',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  padding: '10px 20px',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                Incluido en {sku}
              </div>
            </div>
          )}

          {/* PRESENTACIÓN COMERCIAL */}
          {packs.length > 0 && (
            <div style={{ background: '#f5f5f7', padding: '48px 44px' }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#6e6e73',
                  marginBottom: 20,
                }}
              >
                Presentación comercial — {sku}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    packs.length === 2 ? '1fr 1fr' : packs.length === 1 ? '1fr' : 'repeat(3, 1fr)',
                  gap: 1,
                  background: '#d2d2d7',
                  border: '1px solid #d2d2d7',
                }}
              >
                {packs.map((p) => (
                  <div key={p.tipo} style={{ background: '#fff', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: 108,
                        background: '#f5f5f7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid #d2d2d7',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: boxSvg(color, p.tipo, sku, product.unidades_paquete),
                      }}
                    />
                    <div style={{ padding: '18px 22px' }}>
                      {p.upc && (
                        <span
                          style={{
                            display: 'inline-block',
                            color: '#fff',
                            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '5px 10px',
                            letterSpacing: '0.03em',
                            marginBottom: 12,
                            background: color,
                          }}
                        >
                          {p.upc}
                        </span>
                      )}
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: '#6e6e73',
                          marginBottom: 4,
                        }}
                      >
                        {p.tipo}
                      </div>
                      <div
                        style={{
                          fontSize: 17,
                          fontWeight: 800,
                          letterSpacing: '-0.02em',
                          marginBottom: 3,
                        }}
                      >
                        {p.nombre}
                      </div>
                      {p.dim && <div style={{ fontSize: 12, color: '#6e6e73' }}>{p.dim}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FINAL CTAs */}
          <div
            style={{
              padding: '36px 44px',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexWrap: 'wrap',
              background: '#fff',
              borderTop: '1px solid #d2d2d7',
            }}
          >
            <Link
              href={`/#contacto?producto=${sku}`}
              style={{
                color: '#fff',
                padding: '13px 26px',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                background: color,
              }}
            >
              Cotizar {sku}
            </Link>
            <a
              href="tel:+525570959011"
              style={{
                background: 'transparent',
                color: '#1d1d1f',
                padding: '13px 26px',
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                border: '1.5px solid #d2d2d7',
              }}
            >
              Llamar para más información
            </a>
          </div>

          {/* SHEET FOOTER */}
          <div
            style={{
              padding: '18px 44px',
              background: '#f5f5f7',
              borderTop: '1px solid #d2d2d7',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 12, color: '#6e6e73' }}>
              Limpieza profesional, repensada. · México · LATAM
            </span>
            <Link
              href="/"
              style={{ fontSize: 12, color: '#0076FF', fontWeight: 600, textDecoration: 'none' }}
            >
              magiclean.mx
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

function FichaGenerica({
  product,
  fullName,
  chipColor,
}: {
  product: Product
  fullName: string
  chipColor: string
}) {
  return (
    <main>
      <section className="bg-white pt-[100px] lg:pt-[120px] pb-16 lg:pb-20">
        <div className="max-w-[1440px] mx-auto px-8">
          <ProductBreadcrumb
            category={product.categoria}
            productName={product.nombre}
            productVariant={product.variante}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-14 items-start">
            <ProductImageBlock
              imagePath={product.imagen_path}
              alt={`${fullName}. ${product.descripcion_corta}`}
              sku={product.sku}
              productName={product.nombre}
            />

            <div>
              <p className="label-eyebrow text-[10px] mb-3" style={{ color: chipColor }}>
                {CATEGORIA_LABELS[product.categoria]} · {product.sku}
              </p>
              <h1 className="headline-editorial text-[2.4rem] lg:text-[3.4rem] text-[#1A1A1A] mb-2 leading-[1.05]">
                {product.nombre}
              </h1>
              {product.variante && (
                <p className="text-[1.1rem] font-normal text-ink-muted mb-5">{product.variante}</p>
              )}
              <p className="text-[1rem] font-normal text-[#1A1A1A] leading-[1.7] mb-7 max-w-prose">
                {product.descripcion_corta}
              </p>

              <div className="mb-8">
                <ProductBadges
                  antibacterial={product.antibacterial_neoshield}
                  sinQuimicos={product.sin_quimicos}
                  destacado={product.destacado}
                />
              </div>

              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center gap-2 bg-[#0076FF] hover:bg-[#0052CC] text-white px-7 py-3 rounded-full text-[14px] font-semibold transition-colors duration-200"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deep py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="max-w-3xl">
            <p className="label-eyebrow text-white/60 text-[10px] mb-4">Uso principal</p>
            <p className="text-[1.4rem] lg:text-[1.6rem] font-medium text-white leading-[1.4] mb-10">
              {product.uso_principal}
            </p>
            <p className="text-[1rem] font-normal text-white/80 leading-[1.8] mb-10">
              {product.descripcion_larga}
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="label-eyebrow text-white/60 text-[10px] mr-1">Recomendado para</span>
              {product.recomendado_para.map((canal) => (
                <span
                  key={canal}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/90 text-[12px] font-medium"
                >
                  {CANAL_LABELS[canal] ?? canal}
                </span>
              ))}
            </div>
            <p className="text-[12px] text-white/60">
              Línea:{' '}
              <span className="text-white/90 font-medium">
                {product.linea === 'ambas' ? 'Standard y PRO' : 'Standard'}
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="max-w-3xl">
            <p className="label-eyebrow text-[#0052CC] text-[10px] mb-4">Presentación comercial</p>
            <h2 className="headline-editorial text-[1.8rem] lg:text-[2.2rem] text-[#1A1A1A] mb-8">
              Volúmenes y unidades de venta
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="border border-[#E8EAED] rounded-2xl p-6">
                <p className="label-eyebrow text-ink-muted text-[10px] mb-3">Unidad</p>
                <p className="text-[1.2rem] font-semibold text-[#1A1A1A]">
                  {product.presentacion.unidad}
                </p>
              </div>
              {product.presentacion.caja && (
                <div className="border border-[#E8EAED] rounded-2xl p-6">
                  <p className="label-eyebrow text-ink-muted text-[10px] mb-3">Caja completa</p>
                  <p className="text-[1.2rem] font-semibold text-[#1A1A1A]">
                    {product.presentacion.caja}
                  </p>
                </div>
              )}
            </div>

            {product.compatible_con && product.compatible_con.length > 0 && (
              <div className="mb-10">
                <p className="label-eyebrow text-ink-muted text-[10px] mb-3">Compatible con</p>
                <div className="flex flex-wrap gap-2">
                  {product.compatible_con.map((cs) => {
                    const compat = productsBySku.get(cs)
                    if (!compat) return null
                    return (
                      <Link
                        key={cs}
                        href={`/productos/${cs}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8EAED] hover:border-[#0076FF] hover:bg-[#F0F5FF] text-[12px] font-medium text-[#1A1A1A] transition-colors"
                      >
                        <span className="font-bold text-[#0076FF]">{compat.sku}</span>
                        {compat.nombre}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0076FF] text-[#0076FF] hover:bg-[#0076FF] hover:text-white px-7 py-3 rounded-full text-[14px] font-semibold transition-colors duration-200"
            >
              Solicitar cotización por volumen
            </Link>
          </div>
        </div>
      </section>

      <RelatedProducts currentSku={product.sku} category={product.categoria} products={products} />
      <DistribuidoresCTA data={null} />
    </main>
  )
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sku: string }>
}) {
  const { sku } = await params
  const product = productsBySku.get(sku)
  if (!product || product.estado !== 'activo') notFound()

  const fullName = product.variante ? `${product.nombre} — ${product.variante}` : product.nombre
  const chipColor = getChipColor(product.sku, product.categoria)
  const fibraExtras =
    product.categoria === 'fibras' ? SHEET_DATA[product.sku] : undefined

  return (
    <>
      <Navbar />
      {fibraExtras ? (
        <main className="pt-[64px]">
          <FichaFibra product={product} extras={fibraExtras} />
        </main>
      ) : (
        <FichaGenerica product={product} fullName={fullName} chipColor={chipColor} />
      )}
      <Footer />
      <StickyCtaBar />
      <WhatsAppButton />
    </>
  )
}
