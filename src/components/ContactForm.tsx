'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'
import { track, AnalyticsEvents } from '@/lib/analytics'

interface FormData {
  nombre: string
  empresa: string
  email: string
  telefono: string
  canal: string
  ciudad: string
  mensaje: string
  website: string // honeypot — invisible para humanos, los bots lo llenan
}

const inputClass =
  'w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#0076FF] transition-colors duration-300'

const labelClass = 'block text-white/70 text-sm font-semibold uppercase tracking-widest mb-2'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    canal: '',
    ciudad: '',
    mensaje: '',
    website: '', // honeypot
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pre-seleccionar canal si viene de ?canal=distribuidor (link "Quiero ser distribuidor")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const canalParam = params.get('canal')
    if (canalParam) {
      // One-shot read of a URL param on mount; setFormData runs at most once.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({ ...prev, canal: canalParam }))
    }
  }, [])

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

      track(AnalyticsEvents.ContactFormSubmit, {
        channel: formData.canal,
        source: 'contact_form',
      })
      setSubmitted(true)
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="contacto-ok" className="section-standard bg-deep">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#0076FF]/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-[#0076FF]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Solicitud enviada con éxito.
              </h2>
              <p className="text-white/50 font-normal text-base leading-relaxed">
                Nuestro equipo especializado revisará tu solicitud y te contactará en{' '}
                <span className="text-white/80">menos de 24 horas hábiles</span> con una
                propuesta adaptada a tu operación.
              </p>
              <p className="text-white/50 text-xs mt-6">
                Revisa tu bandeja de entrada — te enviamos una confirmación.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="section-standard bg-deep">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <p className="text-[#FF2B2B] font-semibold text-xs uppercase tracking-widest mb-4">
            Hablemos
          </p>
          <h2 className="headline-editorial text-[2rem] sm:text-[2.6rem] lg:text-[3.4rem] text-white max-w-lg mb-4">
            Hablemos de tu operación
          </h2>
          <p className="text-white/60 font-normal text-base max-w-lg leading-[1.75]">
            No tenemos catálogos genéricos. Cuéntanos qué operas, cuánto volumen manejas
            y qué te duele hoy en tu proceso de limpieza. Te respondemos en menos de
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
                aria-required="true"
                value={formData.canal}
                onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`}
                disabled={loading}
              >
                <option value="" disabled className="bg-deep text-white/50">
                  ¿Cómo nos vas a usar?
                </option>
                <option value="distribuidor"  className="bg-deep text-white">Distribuidor mayorista</option>
                <option value="horeca"        className="bg-deep text-white">HORECA (Hotel · Restaurant · Cafetería)</option>
                <option value="retail"        className="bg-deep text-white">Retail / Cadena de tiendas</option>
                <option value="institucional" className="bg-deep text-white">Institucional (Hospital · Escuela · Gobierno)</option>
                <option value="hogar"         className="bg-deep text-white">Hogar / Consumidor final</option>
                <option value="otro"          className="bg-deep text-white">Otro</option>
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

          <div className="mb-6">
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

          {/* Honeypot anti-spam — invisible para humanos, los bots lo llenan */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />

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
              'Solicitar cotización'
            )}
          </button>

          <p className="text-white/70 text-[11px] font-light text-center mt-4">
            Sin compromiso · Sin intermediarios · Propuesta personalizada en 24h hábiles
          </p>
        </motion.form>
      </div>
    </section>
  )
}
