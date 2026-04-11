'use client'

import { motion } from 'framer-motion'

const categories = [
  {
    name: 'Fibras Abrasivas',
    description: 'Línea completa F1-F6 para cada nivel de abrasividad',
  },
  {
    name: 'Microfibras',
    description: 'Limpieza delicada sin rayar. Cristales, baños y superficies premium',
  },
  {
    name: 'Sistemas de Mop',
    description: 'Cubetas y mopas para todo tipo de piso. Escurrido único',
  },
  {
    name: 'Químicos Especializados',
    description: 'Detergentes, desengrasantes y desinfectantes de alto rendimiento',
  },
  {
    name: 'Soluciones HORECA',
    description: 'Línea completa certificada para hoteles, restaurantes y catering',
  },
]

export default function Categories() {
  return (
    <section id="productos" className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[#FF2B2B] font-semibold text-xs uppercase tracking-widest mb-4">
            Nuestros productos
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight max-w-lg">
            Soluciones para cada sector
          </h2>
        </motion.div>

        {/* Grid: 3 arriba + 2 abajo centradas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 3).map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#E6E9EF] rounded-xl flex items-center justify-center mb-5 overflow-hidden">
                <span className="text-gray-400 text-sm font-light tracking-wide">{cat.name}</span>
              </div>
              <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">{cat.name}</h3>
              <p className="font-light text-gray-400 text-sm leading-relaxed">{cat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 2 centradas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 lg:max-w-[66%] lg:mx-auto">
          {categories.slice(3).map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i + 3) * 0.07 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#E6E9EF] rounded-xl flex items-center justify-center mb-5 overflow-hidden">
                <span className="text-gray-400 text-sm font-light tracking-wide">{cat.name}</span>
              </div>
              <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">{cat.name}</h3>
              <p className="font-light text-gray-400 text-sm leading-relaxed">{cat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
