'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al enviar. Por favor intenta de nuevo.')
        return
      }

      setSubmitted(true)
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="contacto-ok" className="py-32 bg-[#0A1628]">
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
              <h2 className="text-3xl font-bold text-white mb-4">
                Solicitud enviada con éxito.
              </h2>
              <p className="text-white/40 font-light text-base leading-relaxed">
                Nuestro equipo especializado revisará tu solicitud y te contactará en{' '}
                <span className="text-white/70">menos de 24 horas hábiles</span> con una
                propuesta adaptada a tu operación.
              </p>
              <p className="text-white/25 text-xs mt-6">
                Revisa tu bandeja de entrada — te enviamos una confirmación.
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
            Hablemos
          </p>
          <h2 className="headline-editorial text-[2.4rem] lg:text-[3.2rem] text-white tracking-tight max-w-lg mb-4">
            Su operación merece una solución diseñada para ella.
          </h2>
          <p className="text-white/40 font-light text-lg max-w-lg leading-relaxed">
            No tenemos catálogos genéricos. Cuéntenos qué opera, cuánto volumen maneja
            y qué le duele hoy en su proceso de limpieza. Le respondemos en menos de
            24 horas hábiles con una propuesta específica.
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email corporativo *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@empresa.com"
                className={inputClass}
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            {/* Canal — campo clave de calificación */}
            <div>
              <label htmlFor="canal" className={labelClass}>Canal de operación *</label>
              <select
                id="canal"
                name="canal"
                required
                value={formData.canal}
                onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`}
                disabled={loading}
              >
                <option value="" disabled className="bg-[#0A1628] text-white/50">
                  ¿Cómo nos vas a usar?
                </option>
                <option value="distribuidor"  className="bg-[#0A1628] text-white">Distribuidor mayorista</option>
                <option value="horeca"        className="bg-[#0A1628] text-white">HORECA (Hotel · Restaurant · Cafetería)</option>
                <option value="retail"        className="bg-[#0A1628] text-white">Retail / Cadena de tiendas</option>
                <option value="institucional" className="bg-[#0A1628] text-white">Institucional (Hospital · Escuela · Gobierno)</option>
                <option value="hogar"         className="bg-[#0A1628] text-white">Hogar / Consumidor final</option>
                <option value="otro"          className="bg-[#0A1628] text-white">Otro</option>
              </select>
            </div>

            <div>
              <label htmlFor="ciudad" className={labelClass}>Ciudad / Estado *</label>
              <input
                id="ciudad"
                name="ciudad"
                type="text"
                required
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Ciudad de México"
                className={inputClass}
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-10">
            <label htmlFor="mensaje" className={labelClass}>
              ¿Qué necesitas? (opcional)
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Cuéntanos sobre tu operación: volumen, frecuencia, tipo de superficie, lo que necesites..."
              className={`${inputClass} resize-none`}
              disabled={loading}
            />
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0076FF] text-white py-4 rounded-full font-semibold text-base
                       hover:bg-[#0052CC] transition-colors duration-300 flex items-center justify-center
                       gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Enviando solicitud…
              </>
            ) : (
              'Iniciar conversación'
            )}
          </button>

          <p className="text-white/25 text-[11px] font-light text-center mt-4">
            Sin compromiso · Sin intermediarios · Propuesta personalizada en 24h hábiles
          </p>
        </motion.form>
      </div>
    </section>
  )
}
