'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

interface FormData {
  nombre: string
  empresa: string
  email: string
  telefono: string
  ciudad: string
  mensaje: string
}

const inputClass =
  'w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0076FF] focus:border-transparent transition'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    ciudad: '',
    mensaje: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: conectar a backend (Resend, SendGrid, etc.)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              ¡Solicitud enviada!
            </h2>
            <p className="text-gray-500 text-base">
              Gracias por contactarnos. Nuestro equipo te responderá en menos de 24 horas hábiles.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Solicita una cotización
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Cuéntanos sobre tu negocio y te asesoramos con la mejor solución de limpieza.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 mb-2">
                Nombre *
              </label>
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
              <label htmlFor="empresa" className="block text-sm font-medium text-gray-900 mb-2">
                Empresa *
              </label>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email *
              </label>
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
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-900 mb-2">
                Teléfono
              </label>
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
            <div className="md:col-span-2">
              <label htmlFor="ciudad" className="block text-sm font-medium text-gray-900 mb-2">
                Ciudad *
              </label>
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

          <div className="mb-8">
            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-900 mb-2">
              Mensaje
            </label>
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

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0076FF] text-white px-10 py-3.5 rounded-lg font-semibold text-base hover:bg-[#0052CC] transition-colors"
            >
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
