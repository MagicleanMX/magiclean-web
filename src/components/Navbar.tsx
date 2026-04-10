'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#nosotros', label: 'Por qué nosotros' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo bicolor */}
          <a href="#" className="text-2xl tracking-tight leading-none">
            <span className="font-black text-[#FF2B2B]">Magi</span>
            <span className="font-black text-[#0076FF]">Clean</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#1A1A1A] font-medium text-sm hover:text-[#0076FF] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contacto"
              className="hidden sm:inline-flex bg-[#0076FF] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#0052CC] transition-colors duration-300"
            >
              Cotizar
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[#1A1A1A] hover:text-[#0076FF] transition-colors"
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#1A1A1A] font-medium text-base hover:text-[#0076FF] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="bg-[#0076FF] text-white px-6 py-3 rounded-full text-sm font-semibold text-center hover:bg-[#0052CC] transition-colors"
          >
            Cotizar
          </a>
        </div>
      )}
    </nav>
  )
}
