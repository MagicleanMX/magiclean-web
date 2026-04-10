const stats = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '500+', label: 'Clientes activos' },
  { value: '200+', label: 'Productos en catálogo' },
  { value: '30+', label: 'Ciudades con cobertura' },
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-[#0076FF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Por qué Magiclean?
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto text-base leading-relaxed">
            Líderes en suministros de limpieza B2B en México con décadas de experiencia
            y miles de clientes satisfechos en todo el país.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-5xl sm:text-6xl font-extrabold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-blue-100 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
