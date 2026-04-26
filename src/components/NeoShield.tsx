const STATS = [
  { value: '99%', label: 'Eliminación de bacterias' },
  { value: '3×', label: 'Más duración vs competencia' },
  { value: '0', label: 'Químicos adicionales' },
]

export default function NeoShield() {
  return (
    <section id="tecnologia" className="bg-deep">
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '96px 32px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: 16,
          }}
        >
          Nuestra Tecnología
        </p>

        <h2
          style={{
            fontSize: 'clamp(56px, 9vw, 96px)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            color: '#ffffff',
            marginBottom: 20,
            lineHeight: 1,
          }}
        >
          NeoShield™
        </h2>

        <p
          style={{
            fontSize: 22,
            maxWidth: 560,
            margin: '0 auto 64px',
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.5,
          }}
        >
          La tecnología que no ves. El resultado que sí.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            marginBottom: 64,
            flexWrap: 'wrap',
          }}
        >
          {STATS.map((s) => (
            <div key={s.value} style={{ minWidth: 160 }}>
              <div
                style={{
                  fontSize: 'clamp(56px, 7vw, 72px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1,
                  marginBottom: 12,
                  letterSpacing: '-0.03em',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/showcase/F4-LIFESTYLE-HD-V3.jpeg"
            alt="NeoShield aplicado en superficie de cocina profesional"
            style={{
              width: '100%',
              maxWidth: 640,
              height: 340,
              objectFit: 'cover',
              borderRadius: 0,
              display: 'block',
            }}
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <span
            style={{
              display: 'inline-block',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '8px 20px',
              fontSize: 13,
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.04em',
            }}
          >
            Antibacterial certificado
          </span>
        </div>
      </div>
    </section>
  )
}
