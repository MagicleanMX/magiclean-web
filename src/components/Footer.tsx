const productLinks = [
  { href: '#productos', label: 'Fibras' },
  { href: '#productos', label: 'Sistemas de mop' },
  { href: '#productos', label: 'Químicos' },
  { href: '#horeca', label: 'Soluciones HORECA' },
]

const companyLinks = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#nosotros', label: 'Por qué MagiClean' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <a href="#" className="text-2xl tracking-tight leading-none inline-block mb-5">
              <span className="font-black text-[#FF2B2B]">Magi</span>
              <span className="font-black text-[#0076FF]">Clean</span>
            </a>
            <p className="text-white/35 text-sm font-light leading-relaxed max-w-xs mb-5">
              Proveedor B2B de soluciones de limpieza profesional para retail, mayoreo,
              HORECA e institucional en México.
            </p>
            <span className="inline-flex items-center bg-[#FF2B2B] text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
              NeoShield™
            </span>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="text-xs font-semibold text-white/25 uppercase tracking-wider mb-6">
                Productos
              </h4>
              <ul className="space-y-4">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/45 hover:text-white text-sm font-light transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white/25 uppercase tracking-wider mb-6">
                Empresa
              </h4>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/45 hover:text-white text-sm font-light transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 text-sm text-white/30 font-light">
            <span>contacto@magiclean.mx</span>
            <span className="hidden sm:inline text-white/10">·</span>
            <span>+52 55 1234 5678</span>
            <span className="hidden sm:inline text-white/10">·</span>
            <span>Ciudad de México</span>
          </div>
          <p className="text-white/20 text-xs">© 2025 MagiClean. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
