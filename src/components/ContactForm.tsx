'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface FormData {
  nombre: string
  empresa: string
  email: string
  telefono: string
  canal: string
  ciudad: string
  mensaje: string
}

const inputClass =
  'w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#0076FF] transition-colors duration-300'

const labelClass = 'block text-white/50 text-xs font-semibold uppercase tracking-widest mb-2'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    canal: '',
    ciudad: '',
    mensaje: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="contacto" className="py-32 bg-[#0A1628]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#0076FF]/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-[#0076FF]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">¡Solicitud enviada!</h2>
              <p className="text-white/40 font-light text-base leading-relaxed">
                Nuestro equipo te responderá en menos de 24 horas hábiles.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="py-32 bg-[#0A1628]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#FF2B2B] font-semibold text-xs uppercase tracking-widest mb-4">
            Cotización
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-lg mb-4">
            Solicita tu cotización personalizada
          </h2>
          <p className="text-white/40 font-light text-lg max-w-lg leading-relaxed">
            Miles de negocios en México confían en MagiClean. Únete al estándar profesional.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="max-w-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="nombre" className={labelClass}>Nombre completo *</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="empresa" className={labelClass}>Empresa *</label>
              <input
                id="empresa"
                name="empresa"
                type="text"
                required
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Nombre de tu empresa"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@empresa.com"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="telefono" className={labelClass}>Teléfono</label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+52 55 1234 5678"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="canal" className={labelClass}>Canal *</label>
              <select
                id="canal"
                name="canal"
                required
                value={formData.canal}
                onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" disabled className="bg-[#0A1628] text-white/50">
                  Selecciona un canal
                </option>
                <option value="hogar" className="bg-[#0A1628] text-white">Hogar</option>
                <option value="retail" className="bg-[#0A1628] text-white">Retail</option>
                <option value="horeca" className="bg-[#0A1628] text-white">HORECA</option>
                <option value="industrial" className="bg-[#0A1628] text-white">Industrial</option>
              </select>
            </div>
            <div>
              <label htmlFor="ciudad" className={labelClass}>Ciudad *</label>
              <input
                id="ciudad"
                name="ciudad"
                type="text"
                required
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Ciudad de México"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-10">
            <label htmlFor="mensaje" className={labelClass}>Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Cuéntanos sobre tus necesidades de limpieza..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0076FF] text-white py-4 rounded-full font-semibold text-base hover:bg-[#0052CC] transition-colors duration-300"
          >
            Enviar solicitud
          </button>
        </motion.form>
      </div>
    </section>
  )
}
