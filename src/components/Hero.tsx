export default function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-[#003580] to-[#0076FF] flex items-center pt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">
            Proveedor B2B · México
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Limpieza profesional
            <br />
            para tu negocio
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-xl leading-relaxed">
            Soluciones completas de limpieza para retail, mayoreo, HORECA e institucional.
            Productos de calidad, entrega confiable y soporte experto en toda la República.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="bg-white text-[#0076FF] px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-blue-50 transition-colors text-center"
            >
              Solicitar cotización
            </a>
            <a
              href="#servicios"
              className="border-2 border-white text-white px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-white/10 transition-colors text-center"
            >
              Ver servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
