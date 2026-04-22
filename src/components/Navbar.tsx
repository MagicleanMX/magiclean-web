'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import productsData from '@/lib/products.json'

type ProductCategoria = 'fibras' | 'mops' | 'accesorios' | 'repuestos'

type Product = {
  sku: string
  nombre: string
  variante: string | null
  categoria: ProductCategoria
  estado: 'activo' | 'descontinuado' | 'en_desarrollo'
}

const products = productsData as Product[]

const CATEGORIA_CONFIG: Record<ProductCategoria, { titulo: string; color: string }> = {
  fibras:     { titulo: 'Fibras Abrasivas',     color: '#FF2B2B' },
  mops:       { titulo: 'Sistemas Mop',         color: '#0076FF' },
  accesorios: { titulo: 'Accesorios',           color: '#1A1A1A' },
  repuestos:  { titulo: 'Repuestos Originales', color: '#9CA3AF' },
}

const CATEGORIA_ORDER: ProductCategoria[] = ['fibras', 'mops', 'accesorios', 'repuestos']

// SKUs que muestran badge "Popular" en el mega-menú.
// Subconjunto de los `destacado: true` del JSON: separa "ganador comercial"
// (dato del catálogo) de "qué resaltamos en este componente" (decisión de UI).
const BADGES_NAVBAR = new Set(['F4', 'F5', 'F7', 'M1', 'M2'])

const megaProductos = {
  columnas: CATEGORIA_ORDER.map((cat) => ({
    titulo: CATEGORIA_CONFIG[cat].titulo,
    color:  CATEGORIA_CONFIG[cat].color,
    items:  products
      .filter((p) => p.categoria === cat && p.estado === 'activo')
      .map((p) => ({
        codigo: p.sku,
        nombre: p.variante ? `${p.nombre} · ${p.variante}` : p.nombre,
        badge:  BADGES_NAVBAR.has(p.sku) ? 'Popular' : undefined,
      })),
  })),
}

const navLinks = [
  { label: 'Productos', href: '#productos', mega: true },
  { label: 'Tecnología', href: '#tecnologia', mega: false },
  { label: 'Distribuidores', href: '#distribuidores', mega: false },
  { label: 'Empresa', href: '#nosotros', mega: false },
]

const mobileLinks = [
  { label: 'Productos', href: '#productos' },
  { label: 'Tecnología', href: '#tecnologia' },
  { label: 'Distribuidores', href: '#distribuidores' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen]     = useState(false)

  // DOM refs
  const megaTriggerRef = useRef<HTMLButtonElement>(null)
  const megaPanelRef   = useRef<HTMLDivElement>(null)
  const hamburgerRef   = useRef<HTMLButtonElement>(null)
  const mobileMenuRef  = useRef<HTMLDivElement>(null)
  const megaTimeout    = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track whether the menu was opened via keyboard so hover closes don't steal focus
  const megaViaKeyboard   = useRef(false)
  const mobileViaKeyboard = useRef(false)

  // ── Scroll shadow ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // ── Mega-menu: focus first menuitem after keyboard open ────────────────────
  useEffect(() => {
    if (megaOpen && megaViaKeyboard.current) {
      const first = megaPanelRef.current?.querySelector<HTMLElement>('[role="menuitem"]')
      first?.focus()
    }
    // Reset flag when menu closes (whether hover or keyboard)
    if (!megaOpen) megaViaKeyboard.current = false
  }, [megaOpen])

  // ── Mobile menu: focus first item after keyboard open ─────────────────────
  useEffect(() => {
    if (mobileOpen && mobileViaKeyboard.current) {
      const first = mobileMenuRef.current?.querySelector<HTMLElement>('a, button')
      first?.focus()
    }
    if (!mobileOpen) mobileViaKeyboard.current = false
  }, [mobileOpen])

  // ── Hover helpers (desktop mega-menu) ─────────────────────────────────────
  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120)
  }

  // ── Keyboard navigation inside the mega-menu panel ────────────────────────
  function handleMegaKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      megaPanelRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    )
    const idx = items.indexOf(document.activeElement as HTMLElement)

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setMegaOpen(false)
        // Return focus to trigger only on Escape (not on hover-close or Tab)
        megaTriggerRef.current?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        items[idx < items.length - 1 ? idx + 1 : 0]?.focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        items[idx > 0 ? idx - 1 : items.length - 1]?.focus()
        break
      case 'Home':
        e.preventDefault()
        items[0]?.focus()
        break
      case 'End':
        e.preventDefault()
        items[items.length - 1]?.focus()
        break
      case 'Tab':
        // Close menu but let Tab move focus naturally — do NOT steal focus
        setMegaOpen(false)
        break
    }
  }

  // ── Focus trap + Escape for mobile menu ───────────────────────────────────
  function handleMobileKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!mobileMenuRef.current) return

    const focusable = Array.from(
      mobileMenuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    )
    const first  = focusable[0]
    const last   = focusable[focusable.length - 1]
    const active = document.activeElement

    if (e.key === 'Escape') {
      e.preventDefault()
      setMobileOpen(false)
      hamburgerRef.current?.focus()
      return
    }

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift+Tab on first element → wrap to last
        if (active === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        // Tab on last element → wrap to first
        if (active === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
  }

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? 'border-b border-[#E8EAED] shadow-[0_1px_12px_rgba(0,0,0,0.06)]' : ''
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <a href="#" aria-label="MagiClean — inicio" className="flex items-center shrink-0 group">
              <Image
                src="/images/brand/logo/magiclean-logo.webp"
                alt="MagiClean — Limpieza profesional"
                width={2000}
                height={610}
                priority
                className="h-8 lg:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.mega ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                  >
                    {/* Trigger button — keyboard: Enter/Space toggle; hover: openMega/closeMega */}
                    <button
                      ref={megaTriggerRef}
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                      aria-controls="mega-menu-productos"
                      onKeyDown={(e) => {
                        // Flag keyboard activation before onClick fires
                        if ((e.key === 'Enter' || e.key === ' ') && !megaOpen) {
                          megaViaKeyboard.current = true
                        }
                      }}
                      onClick={() => setMegaOpen((prev) => !prev)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        megaOpen
                          ? 'text-[#0076FF] bg-surface-blue'
                          : 'text-[#1A1A1A] hover:text-[#0076FF] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Mega dropdown */}
                    {megaOpen && (
                      <div
                        ref={megaPanelRef}
                        id="mega-menu-productos"
                        role="menu"
                        aria-label="Productos MagicClean"
                        className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-white border border-[#E8EAED] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden"
                        style={{ width: 720 }}
                        onMouseEnter={openMega}
                        onMouseLeave={closeMega}
                        onKeyDown={handleMegaKeyDown}
                      >
                        <div className="grid grid-cols-4 gap-0 p-5">
                          {megaProductos.columnas.map((col) => (
                            <div key={col.titulo} className="pr-3">
                              <p
                                className="label-eyebrow mb-2.5 text-[10px]"
                                style={{ color: col.color }}
                              >
                                {col.titulo}
                              </p>
                              <ul className="space-y-1">
                                {col.items.map((item) => (
                                  <li key={item.codigo}>
                                    <a
                                      href="#productos"
                                      role="menuitem"
                                      className="group/item flex items-start gap-2 py-1 px-1 -mx-1 rounded-md hover:bg-[#F5F7FA] transition-colors"
                                    >
                                      <span
                                        className="shrink-0 inline-flex items-center justify-center min-w-[28px] h-5 px-1.5 rounded text-[9px] font-black text-white mt-0.5"
                                        style={{ backgroundColor: col.color }}
                                      >
                                        {item.codigo}
                                      </span>
                                      <p className="text-[12px] font-medium text-[#1A1A1A] group-hover/item:text-[#0076FF] transition-colors leading-tight">
                                        {item.nombre}
                                        {item.badge && (
                                          <span className="ml-1.5 text-[10px] font-bold text-[#FF2B2B] bg-surface-red px-1.5 py-0.5 rounded-full">
                                            {item.badge}
                                          </span>
                                        )}
                                      </p>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Footer del mega menú */}
                        <div className="border-t border-[#E8EAED] px-5 py-2.5 bg-[#F5F7FA] flex items-center justify-between">
                          <p className="text-[11px] text-ink-muted font-normal">
                            <span className="font-semibold text-[#1A1A1A]">{products.length} modelos</span> disponibles · Línea Fibras y Línea Mops
                          </p>
                          <a
                            href="#contacto"
                            role="menuitem"
                            className="text-[11px] font-semibold text-[#0076FF] hover:underline underline-offset-2"
                          >
                            Solicitar catálogo completo →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 rounded-full text-sm font-medium text-[#1A1A1A] hover:text-[#0076FF] hover:bg-[#F5F7FA] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="#contacto"
                className="hidden lg:inline-flex items-center bg-[#0076FF] text-white px-5 py-2.5 rounded-full text-[13px] font-semibold hover:bg-[#0052CC] transition-colors duration-200"
              >
                Solicitar cotización
              </a>
              <button
                ref={hamburgerRef}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !mobileOpen) {
                    mobileViaKeyboard.current = true
                  }
                }}
                onClick={() => setMobileOpen((prev) => !prev)}
                className="lg:hidden p-2 text-[#1A1A1A] hover:text-[#0076FF] transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu — focus trap active while open */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          onKeyDown={handleMobileKeyDown}
          className="fixed inset-x-0 top-[68px] z-40 bg-white border-b border-[#E8EAED] shadow-lg lg:hidden"
        >
          <div className="px-6 py-5 flex flex-col gap-1">
            {mobileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-3.5 rounded-xl text-[15px] font-medium text-[#1A1A1A] hover:bg-[#F5F7FA] hover:text-[#0076FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="mt-3 bg-[#0076FF] text-white px-6 py-3.5 rounded-full text-[14px] font-semibold text-center hover:bg-[#1A1A1A] transition-colors"
            >
              Solicitar cotización
            </a>
          </div>
        </div>
      )}
    </>
  )
}
