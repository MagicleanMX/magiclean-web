import Link from 'next/link'

export type ShowcaseData = {
  titleMain: string
  titleAccent: string
  tagline: string
  slotType: 'cutout' | 'lifestyle'
  image: string
  accentColor: string
  bgGradient: string
  shadowFilter?: string
}

type Props = {
  sku: string
  showcase: ShowcaseData
}

const APPLE_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif'

const DEFAULT_SHADOW =
  'drop-shadow(0 18px 30px rgba(15,23,42,0.18)) drop-shadow(0 6px 12px rgba(15,23,42,0.10))'

export default function FibraHeroPanel({ sku, showcase }: Props) {
  const isDarkBg = showcase.accentColor === '#F5E9D7'
  const isLifestyle = showcase.slotType === 'lifestyle'
  const productFilter = showcase.shadowFilter ?? DEFAULT_SHADOW

  return (
    <article
      className="fhp-slot relative overflow-hidden"
      style={{
        aspectRatio: '16 / 11',
        background: isLifestyle
          ? `url(${showcase.image}) center/cover no-repeat`
          : showcase.bgGradient,
        borderRadius: 0,
        padding: 'clamp(40px, 4vw, 56px) clamp(28px, 4vw, 48px) clamp(28px, 3vw, 40px)',
        fontFamily: APPLE_FONT,
        color: '#ffffff',
      }}
    >
      {isLifestyle && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: showcase.bgGradient,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        className="flex flex-col items-center text-center h-full"
        style={{
          position: 'relative',
          zIndex: 1,
          justifyContent: isLifestyle ? 'flex-end' : undefined,
        }}
      >
        <div className="fhp-text-zone w-full">
          <h2
            className="fhp-h2"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              letterSpacing: '-0.022em',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {showcase.titleMain}{' '}
            <em
              style={{
                fontStyle: 'italic',
                fontWeight: 600,
                color: showcase.accentColor,
              }}
            >
              {showcase.titleAccent}
            </em>
          </h2>
          <p
            className="fhp-tagline"
            style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.3,
              marginTop: 12,
              opacity: isDarkBg ? 0.92 : 0.78,
            }}
          >
            {showcase.tagline}
          </p>
        </div>

        {!isLifestyle && (
          <div className="fhp-product flex-1 flex items-center justify-center w-full min-h-0 py-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={showcase.image}
              alt={`${showcase.titleMain} ${showcase.titleAccent}`}
              style={{
                maxWidth: '78%',
                maxHeight: '100%',
                objectFit: 'contain',
                filter: productFilter,
              }}
            />
          </div>
        )}

        <div className="fhp-ctas flex gap-3 items-center justify-center">
          <Link
            href={`/productos/${sku}`}
            className="fhp-btn"
            style={{
              backgroundColor: '#0071e3',
              color: 'white',
              padding: '11px 22px',
              borderRadius: 980,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Más información
          </Link>
          <Link
            href={`/#contacto?producto=${sku}`}
            className="fhp-btn"
            style={{
              border: `1.5px solid ${isDarkBg ? 'rgba(255,255,255,0.40)' : '#0071e3'}`,
              color: isDarkBg ? '#f5f5f7' : '#1d1d1f',
              padding: '11px 22px',
              borderRadius: 980,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: isDarkBg ? 'transparent' : 'white',
            }}
          >
            Cotizar
          </Link>
        </div>
      </div>
    </article>
  )
}
