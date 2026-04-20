'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <main
          style={{
            minHeight: '100vh',
            backgroundColor: '#0A1628',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
          }}
        >
          <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
            <p
              style={{
                fontSize: '0.875rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#0076FF',
                marginBottom: '1rem',
              }}
            >
              Error
            </p>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              Algo salió mal.
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '2rem',
              }}
            >
              Ocurrió un error inesperado. Por favor recarga la página.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#0076FF',
                color: '#ffffff',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reintentar
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
