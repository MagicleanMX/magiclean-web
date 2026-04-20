'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: report to Sentry once ERR-SENTRY-01 lands
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-6">
      <div className="max-w-lg text-center text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-[#0076FF] mb-4">
          Error
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Algo salió mal.
        </h1>
        <p className="text-white/70 mb-8">
          Tuvimos un problema al cargar esta sección. Intenta de nuevo o
          contáctanos si el error persiste.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-[#0076FF] hover:bg-[#0052CC] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  )
}
