import { Layers, Droplets, FlaskConical, UtensilsCrossed, ShieldCheck, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Layers,
    title: 'Fibras',
    description:
      'Fibras de limpieza de alta durabilidad para superficies delicadas, industriales y de alto tráfico.',
  },
  {
    icon: Droplets,
    title: 'Sistemas de mop',
    description:
      'Mops y cubetas profesionales para pisos de cualquier tipo: madera, cerámica, concreto y más.',
  },
  {
    icon: FlaskConical,
    title: 'Químicos',
    description:
      'Detergentes, desengrasantes y desinfectantes de alto rendimiento con fórmulas de última generación.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Soluciones HORECA',
    description:
      'Productos especializados para hoteles, restaurantes y catering que cumplen normativas sanitarias.',
  },
  {
    icon: ShieldCheck,
    title: 'Tecnología antibacterial',
    description:
      'Línea antimicrobiana certificada para entornos de alta exigencia sanitaria e institucional.',
  },
  {
    icon: Package,
    title: 'Accesorios',
    description:
      'Complementos y herramientas para optimizar cada protocolo de limpieza en tu operación.',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nuestros productos y servicios
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Portfolio completo para cubrir todas las necesidades de limpieza de tu operación, sin importar el sector.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group p-6 rounded-xl border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0076FF] transition-colors duration-200">
                  <Icon
                    size={24}
                    className="text-[#0076FF] group-hover:text-white transition-colors duration-200"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
