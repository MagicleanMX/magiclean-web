import Image from 'next/image'

const STATS = [
  { value: '99%', label: 'Eliminación de bacterias' },
  { value: '3×',  label: 'Hasta 3x mayor duración vs fibras convencionales' },
  { value: '0',   label: 'Químicos adicionales' },
] as const

export default function NeoShield() {
  return (
    <section id="tecnologia" style={{ backgroundColor: '#020B18' }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '120px 32px',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: 24,
          }}
        >
          Nuestra Tecnología
        </p>

        {/* Title — clamp keeps the literal 80px target on desktop while
            scaling on mobile so "NeoShield™" never overflows 375px viewports. */}
        <h2
          style={{
            fontSize: 'clamp(48px, 13vw, 80px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            margin: '0 0 20px',
            lineHeight: 1,
          }}
        >
          NeoShield™
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 20,
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: 560,
            margin: '0 auto 64px',
            lineHeight: 1.5,
          }}
        >
          La tecnología que no ves. El resultado que sí.
        </p>

        {/* Glass pill — 3 stat columns separated by hairline dividers */}
        <div
          style={{
            display: 'grid',
            // minmax(0, 1fr) lets columns shrink below intrinsic content width
            // so "99%" / "3×" / "0" can stay in 3-up layout on 375px viewports.
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
            maxWidth: 600,
            margin: '0 auto 80px',
            border: '0.5px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 16,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.value}
              style={{
                padding: '32px 12px',
                borderLeft:
                  i > 0 ? '0.5px solid rgba(255, 255, 255, 0.12)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  // 52px is the desktop target; clamp scales down on narrow
                  // viewports so the bold weight does not push the grid wider
                  // than the section padding.
                  fontSize: 'clamp(36px, 12vw, 52px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1,
                  marginBottom: 12,
                  letterSpacing: '-0.02em',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.45)',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* NeoShield badge */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/images/brand/neoshield/neoshield-badge.webp"
            alt="NeoShield™ — sello de tecnología antibacterial"
            width={200}
            height={200}
          />
        </div>
      </div>
    </section>
  )
}
