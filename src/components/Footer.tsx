const cols = [
  {
    titulo: 'Productos',
    links: [
      { label: 'Fibras Verdes F1 · F2 · F3', href: '#productos' },
      { label: 'Fibra Esponja Dual F4', href: '#productos' },
      { label: 'Fibras Especiales F5 · F6 · F7', href: '#productos' },
      { label: 'Borradores Mágicos F8 · F9', href: '#productos' },
      { label: 'Sistemas Mop M1 · M2 · M5', href: '#productos' },
      { label: 'Accesorios y Repuestos', href: '#productos' },
    ],
  },
  {
    titulo: 'Empresa',
    links: [
      { label: 'Quiénes somos', href: '#nosotros' },
      { label: 'Tecnología NeoShield™', href: '#tecnologia' },
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Red de Distribuidores', href: '#distribuidores' },
      { label: 'Catálogo completo', href: '#contacto' },
    ],
  },
  {
    titulo: 'Contacto LATAM',
    links: [
      { label: 'contacto@magicleanproducts.com', href: 'mailto:contacto@magicleanproducts.com' },
      { label: 'CDMX · Guadalajara · Monterrey', href: '#contacto' },
      { label: 'Exportaciones LATAM', href: '#contacto' },
      { label: 'Solicitar cotización', href: '#contacto' },
    ],
  },
]

const socialLinks = [
  {
    nombre: 'Facebook',
    href: 'https://www.facebook.com/magiclean',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    nombre: 'Instagram',
    href: 'https://www.instagram.com/magiclean',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    nombre: 'LinkedIn',
    href: 'https://www.linkedin.com/company/magiclean',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    nombre: 'TikTok',
    href: 'https://www.tiktok.com/@magiclean',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">

      {/* Main footer content */}
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-12 lg:gap-8">

          {/* Brand column */}
          <div>
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 mb-6 group">
              <div className="w-7 h-7 rounded-full bg-[#FF2B2B] flex items-center justify-center">
                <span className="text-white font-black text-[11px] leading-none">M</span>
              </div>
              <span className="text-[1.1rem] tracking-tight">
                <span className="font-black text-white">Magi</span>
                <span className="font-black text-[#0076FF]">Clean</span>
              </span>
            </a>

            <p className="text-[13px] font-light text-white/35 leading-relaxed max-w-[220px] mb-6">
              Proveedor B2B de soluciones de limpieza profesional para retail,
              mayoreo, HORECA e institucional en México y LATAM.
            </p>

            {/* Badges */}
            <div className="flex flex-col gap-2 mb-8">
              <span className="inline-flex items-center gap-2 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B]" />
                <span className="label-eyebrow text-white/30 text-[9px]">NeoShield™ Technology</span>
              </span>
              <span className="inline-flex items-center gap-2 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF]" />
                <span className="label-eyebrow text-white/30 text-[9px]">MercadoLibre · Amazon · Walmart</span>
              </span>
            </div>

            {/* Redes sociales */}
            <div>
              <p className="label-eyebrow text-white/20 text-[9px] mb-3">Síguenos</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.nombre}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.nombre}
                    className="w-8 h-8 rounded-full bg-white/8 hover:bg-[#0076FF] flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.titulo}>
              <p className="label-eyebrow text-white/25 mb-6">{col.titulo}</p>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] font-light text-white/40 hover:text-white transition-colors duration-200 leading-snug block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1440px] mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            {['Aviso de privacidad', 'Términos de uso', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] font-light text-white/20 hover:text-white/50 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-[11px] font-light text-white/15">
            © {new Date().getFullYear()} MagicClean S.A. de C.V. · México · Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
