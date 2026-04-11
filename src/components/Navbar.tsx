'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const megaProductos = {
  columnas: [
    {
      titulo: 'Fibras Abrasivas',
      links: ['Fibra F1 — Suave', 'Fibra F2 — Media', 'Fibra F4 — Dual NeoShield™', 'Fibra F6 — Ultra fuerte'],
    },
    {
      titulo: 'Microfibras',
      links: ['Microfibra Premium', 'Microfibra para vidrios', 'Microfibra para baños'],
    },
    {
      titulo: 'Sistemas de Mop',
      links: ['M1 Turbo Magic', 'Cubeta Escurridor Pro', 'Mopa Plana 40cm'],
    },
    {
      titulo: 'Químicos',
      links: ['Desengrasante Industrial', 'Desinfectante HORECA', 'Multiusos Neutro'],
    },
  ],
  destacado: {
    badge: 'Nuevo',
    codigo: 'F4',
    nombre: 'Fibra Dual F4',
    descripcion: 'Tecnología NeoShield™ antibacterial',
  },
}

const navLinks = [
  { label: 'Productos', href: '#productos', mega: true },
  { label: 'Tecnología', href: '#tecnologia', mega: false },
  { label: 'Distribuidores', href: '#distribuidores', mega: false },
  { label: 'Empresa', href: '#nosotros', mega: false },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120)
  }

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? 'border-b border-[#E8EAED] shadow-[0_1px_12px_rgba(0,0,0,0.06)]' : ''
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-7 h-7 rounded-full bg-[#FF2B2B] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-black text-[11px] leading-none select-none">M</span>
              </div>
              <span className="text-[1.2rem] tracking-tight leading-none">
                <span className="font-black text-[#1A1A1A]">Magi</span>
                <span className="font-black text-[#0076FF]">Clean</span>
              </span>
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
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        megaOpen
                          ? 'text-[#0076FF] bg-[#F0F5FF]'
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
                        className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-white border border-[#E8EAED] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden"
                        style={{ width: 720 }}
                        onMouseEnter={openMega}
                        onMouseLeave={closeMega}
                      >
                        <div className="flex">
                          {/* Columnas de categorías */}
                          <div className="flex-1 grid grid-cols-4 gap-0 p-7">
                            {megaProductos.columnas.map((col) => (
                              <div key={col.titulo} className="pr-4">
                                <p className="label-eyebrow text-[#0076FF] mb-3">{col.titulo}</p>
                                <ul className="space-y-2">
                                  {col.links.map((item) => (
                                    <li key={item}>
                                      <a
                                        href="#productos"
                                        className="block text-[13px] text-[#666] hover:text-[#1A1A1A] transition-colors duration-150 font-light leading-snug"
                                      >
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Producto destacado */}
                          <div className="w-44 bg-[#F5F7FA] flex flex-col items-center justify-center gap-3 p-6 text-center border-l border-[#E8EAED]">
                            <span className="label-eyebrow text-[#FF2B2B]">
                              {megaProductos.destacado.badge}
                            </span>
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#E8EAED]">
                              <span className="font-black text-[#0076FF] text-xl leading-none">
                                {megaProductos.destacado.codigo}
                              </span>
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-[#1A1A1A]">
                                {megaProductos.destacado.nombre}
                              </p>
                              <p className="text-[11px] text-[#999] font-light mt-0.5 leading-snug">
                                {megaProductos.destacado.descripcion}
                              </p>
                            </div>
                            <a
                              href="#productos"
                              className="text-[12px] font-semibold text-[#0076FF] hover:underline underline-offset-2"
                            >
                              Ver más →
                            </a>
                          </div>
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
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#1A1A1A] hover:text-[#0076FF] transition-colors"
                aria-label="Abrir menú"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[68px] z-40 bg-white border-b border-[#E8EAED] shadow-lg lg:hidden">
          <div className="px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-medium text-[#1A1A1A] hover:bg-[#F5F7FA] hover:text-[#0076FF] transition-colors"
              >
                {link.label}
                {link.mega && <ChevronDown size={14} className="text-[#999]" />}
              </a>
            ))}

            {/* Mobile categories */}
            <div className="mt-2 pt-4 border-t border-[#E8EAED]">
              <p className="label-eyebrow text-[#999] px-3 mb-3">Categorías</p>
              <div className="grid grid-cols-2 gap-1">
                {megaProductos.columnas.map((col) => (
                  <a
                    key={col.titulo}
                    href="#productos"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#444] hover:bg-[#F5F7FA] hover:text-[#0076FF] transition-colors"
                  >
                    {col.titulo}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-[#0076FF] text-white px-6 py-3.5 rounded-full text-[14px] font-semibold text-center hover:bg-[#0052CC] transition-colors"
            >
              Solicitar cotización
            </a>
          </div>
        </div>
      )}
    </>
  )
}
