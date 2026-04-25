import FibraHeroPanel from '@/components/FibraHeroPanel'

const fibras = [
  {
    sku: 'F4',
    nombre: 'Fibra Esponja Dual',
    tagline: 'Dos superficies. Un solo movimiento.',
    color: '#F59E0B',
    gradientStart: '#F59E0B25',
    gradientEnd: '#FFFFFF',
  },
  {
    sku: 'F1',
    nombre: 'Fibra Verde Pesada',
    tagline: 'Resistencia donde más importa.',
    color: '#10B981',
    gradientStart: '#10B98130',
    gradientEnd: '#FFFFFF',
  },
  {
    sku: 'F6',
    nombre: 'Fibra Blanca Delicada',
    tagline: 'Delicadeza profesional. Sin compromisos.',
    color: '#3B82F6',
    gradientStart: '#3B82F625',
    gradientEnd: '#FFFFFF',
  },
  {
    sku: 'F7',
    nombre: 'Fibra Esponja Azul',
    tagline: 'El equilibrio que el oficio reconoce.',
    color: '#3B82F6',
    gradientStart: '#3B82F635',
    gradientEnd: '#FFFFFF',
  },
]

export default function HeroFibras() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <p className="label-eyebrow text-[#0076FF] text-[12px] tracking-widest uppercase mb-6">
          LA COLECCIÓN
        </p>
        <h2 className="font-serif text-[3rem] md:text-[4rem] leading-tight mb-4">
          Cuatro fibras.<br />Cuatro estándares.
        </h2>
        <p className="text-[1.125rem] text-ink-muted max-w-[640px] mb-16">
          Cada producto con tecnología NeoShield™. Diseñado para el oficio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fibras.map((fibra) => (
            <FibraHeroPanel key={fibra.sku} {...fibra} />
          ))}
        </div>
      </div>
    </section>
  )
}
