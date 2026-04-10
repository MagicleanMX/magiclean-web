const productLinks = [
  { href: '#servicios', label: 'Fibras' },
  { href: '#servicios', label: 'Sistemas de mop' },
  { href: '#servicios', label: 'Químicos' },
  { href: '#servicios', label: 'Soluciones HORECA' },
]

const companyLinks = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#por-que-magiclean', label: 'Por qué Magiclean' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Magiclean</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Proveedor B2B de soluciones de limpieza profesional para retail, mayoreo,
              HORECA e institucional en México.
            </p>
          </div>

          {/* Products + Company */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Productos
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Empresa
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact row */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-400">
            <span>contacto@magiclean.mx</span>
            <span className="hidden sm:inline text-gray-700">·</span>
            <span>+52 55 1234 5678</span>
            <span className="hidden sm:inline text-gray-700">·</span>
            <span>Ciudad de México, México</span>
          </div>
          <p className="text-gray-600 text-sm">© 2025 Magiclean. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
