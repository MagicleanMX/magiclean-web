const cols = [
  {
    titulo: 'Productos',
    links: [
      { label: 'Fibras Abrasivas', href: '#productos' },
      { label: 'Microfibras', href: '#productos' },
      { label: 'Sistemas de Mop', href: '#productos' },
      { label: 'Químicos Especializados', href: '#productos' },
      { label: 'Soluciones HORECA', href: '#productos' },
    ],
  },
  {
    titulo: 'Empresa',
    links: [
      { label: 'Tecnología NeoShield™', href: '#tecnologia' },
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Distribuidores', href: '#distribuidores' },
      { label: 'Quiénes somos', href: '#nosotros' },
    ],
  },
  {
    titulo: 'Contacto LATAM',
    links: [
      { label: 'México · contacto@magiclean.mx', href: '#' },
      { label: '+52 55 1234 5678', href: '#' },
      { label: 'CDMX · Guadalajara · Monterrey', href: '#' },
      { label: 'Exportaciones LATAM', href: '#contacto' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">

      {/* Main footer content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
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
              mayoreo, HORECA e institucional en México.
            </p>

            {/* Badges */}
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B]" />
                <span className="label-eyebrow text-white/30 text-[9px]">NeoShield™ Technology</span>
              </span>
              <span className="inline-flex items-center gap-2 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF]" />
                <span className="label-eyebrow text-white/30 text-[9px]">15+ Años en el mercado</span>
              </span>
            </div>
          </div>

          {/* Link columns — 4 columnas como Rolex */}
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

      {/* Bottom bar — como Rolex */}
      <div className="border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
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
            © 2024 MagicClean S.A. de C.V. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
