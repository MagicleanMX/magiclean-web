'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const megaProductos = {
  columnas: [
    {
      titulo: 'Fibras Abrasivas',
      color: '#2D7A2D',
      items: [
        { codigo: 'F1', nombre: 'Fibra Verde Grande', detalle: '220×140mm · Limpieza pesada' },
        { codigo: 'F2', nombre: 'Fibra Verde Mediana', detalle: '150×140mm · Limpieza pesada' },
        { codigo: 'F3', nombre: 'Fibra Verde Chica', detalle: '135×82mm · Limpieza pesada' },
        { codigo: 'F4', nombre: 'Fibra Esponja Dual', detalle: 'Verde + esponja · Multiusos', badge: 'Popular' },
        { codigo: 'F5', nombre: 'Fibra Negra', detalle: 'Parrillas y hornos' },
        { codigo: 'F6', nombre: 'Fibra Blanca Baños', detalle: 'Uso exclusivo sanitarios' },
        { codigo: 'F7', nombre: 'Fibra Azul 0 Rayas', detalle: 'Superficies delicadas' },
        { codigo: 'F8', nombre: 'Borrador Mágico + Esponja', detalle: 'Con esponja integrada' },
        { codigo: 'F9', nombre: 'Borrador Mágico', detalle: 'Elimina manchas difíciles' },
      ],
    },
    {
      titulo: 'Sistemas Mop',
      color: '#0076FF',
      items: [
        { codigo: 'M1', nombre: 'Turbo Magic', detalle: 'Cubo con pedal + microfibra', badge: 'Estrella' },
        { codigo: 'M2', nombre: 'Spin Magic', detalle: 'Cubo sin pedal + microfibra' },
        { codigo: 'M5', nombre: 'Mop Rectangular', detalle: 'Giratorio 360° · Rincones' },
        { codigo: 'M6', nombre: 'Mop Doble Función', detalle: 'Separación agua sucia' },
        { codigo: 'M9', nombre: 'Mop Atomizador', detalle: 'Spray sin baterías' },
      ],
    },
    {
      titulo: 'Limpieza de Baños',
      color: '#6D28D9',
      items: [
        { codigo: 'M4', nombre: 'Cepillo Baño', detalle: '16 cartuchos desechables' },
        { codigo: 'M10', nombre: 'Repuesto M4', detalle: '32 cartuchos + detergente' },
      ],
    },
    {
      titulo: 'Accesorios',
      color: '#ADB3BA',
      items: [
        { codigo: 'M3', nombre: 'Repuesto Mopa', detalle: 'Compatible M1, M2 y otros' },
        { codigo: 'M7', nombre: 'Cubeta Saldo', detalle: 'Escurrido eficiente' },
        { codigo: 'M8', nombre: 'Cepillo Mops', detalle: 'Para bastones giratorios' },
        { codigo: 'M16', nombre: 'Cubeta Plegable', detalle: '10 litros · Compacta' },
        { codigo: 'M17', nombre: 'Recogedor Escoba', detalle: 'Nylon · Alta durabilidad' },
        { codigo: 'M18', nombre: 'Trapeador Silicon', detalle: 'Goma natural · Madera y cerámica' },
      ],
    },
  ],
  destacado: {
    badge: 'Más popular',
    codigo: 'F4',
    nombre: 'Fibra Esponja Dual F4',
    descripcion: 'Doble cara. Antibacterial. El más vendido de la línea.',
    color: '#B45309',
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
                        style={{ width: 860 }}
                        onMouseEnter={openMega}
                        onMouseLeave={closeMega}
                      >
                        <div className="flex">
                          {/* Columnas */}
                          <div className="flex-1 grid grid-cols-4 gap-0 p-6">
                            {megaProductos.columnas.map((col) => (
                              <div key={col.titulo} className="pr-4">
                                <p
                                  className="label-eyebrow mb-3 text-[10px]"
                                  style={{ color: col.color }}
                                >
                                  {col.titulo}
                                </p>
                                <ul className="space-y-2.5">
                                  {col.items.map((item) => (
                                    <li key={item.codigo}>
                                      <a
                                        href="#productos"
                                        className="group/item flex items-start gap-2"
                                      >
                                        <span
                                          className="shrink-0 w-7 h-5 rounded flex items-center justify-center text-[9px] font-black text-white mt-0.5"
                                          style={{ backgroundColor: col.color }}
                                        >
                                          {item.codigo}
                                        </span>
                                        <div>
                                          <p className="text-[12px] font-medium text-[#1A1A1A] group-hover/item:text-[#0076FF] transition-colors leading-tight">
                                            {item.nombre}
                                            {item.badge && (
                                              <span className="ml-1.5 text-[9px] font-bold text-[#FF2B2B] bg-[#FFF0F0] px-1.5 py-0.5 rounded-full">
                                                {item.badge}
                                              </span>
                                            )}
                                          </p>
                                          <p className="text-[10px] text-[#999] font-light leading-tight mt-0.5">
                                            {item.detalle}
                                          </p>
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Producto destacado */}
                          <div className="w-44 bg-[#FFFBF0] flex flex-col items-center justify-center gap-3 p-6 text-center border-l border-[#E8EAED]">
                            <span className="label-eyebrow text-[#FF2B2B] text-[9px]">
                              {megaProductos.destacado.badge}
                            </span>
                            <div
                              className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#E8EAED]"
                              style={{ boxShadow: `0 4px 20px ${megaProductos.destacado.color}30` }}
                            >
                              <span
                                className="font-black text-xl leading-none"
                                style={{ color: megaProductos.destacado.color }}
                              >
                                {megaProductos.destacado.codigo}
                              </span>
                            </div>
                            <div>
                              <p className="text-[12px] font-semibold text-[#1A1A1A] leading-snug">
                                {megaProductos.destacado.nombre}
                              </p>
                              <p className="text-[10px] text-[#999] font-light mt-1 leading-snug">
                                {megaProductos.destacado.descripcion}
                              </p>
                            </div>
                            <a
                              href="#productos"
                              className="text-[11px] font-semibold text-[#0076FF] hover:underline underline-offset-2"
                            >
                              Ver más →
                            </a>
                          </div>
                        </div>

                        {/* Footer del mega menú */}
                        <div className="border-t border-[#E8EAED] px-6 py-3 bg-[#F5F7FA] flex items-center justify-between">
                          <p className="text-[11px] text-[#999] font-light">
                            <span className="font-semibold text-[#1A1A1A]">23 modelos</span> disponibles · Línea Fibras y Línea Mops
                          </p>
                          <a
                            href="#contacto"
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
        <div className="fixed inset-x-0 top-[68px] z-40 bg-white border-b border-[#E8EAED] shadow-lg lg:hidden overflow-y-auto max-h-[calc(100vh-68px)]">
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

            {/* Categorías mobile */}
            {megaProductos.columnas.map((col) => (
              <div key={col.titulo} className="mt-3 pt-3 border-t border-[#E8EAED]">
                <p
                  className="label-eyebrow px-3 mb-2 text-[10px]"
                  style={{ color: col.color }}
                >
                  {col.titulo}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {col.items.map((item) => (
                    <a
                      key={item.codigo}
                      href="#productos"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5F7FA] transition-colors"
                    >
                      <span
                        className="shrink-0 w-7 h-5 rounded flex items-center justify-center text-[9px] font-black text-white"
                        style={{ backgroundColor: col.color }}
                      >
                        {item.codigo}
                      </span>
                      <span className="text-[12px] font-medium text-[#444]">{item.nombre}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

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
