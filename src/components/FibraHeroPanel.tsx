'use client'

import Link from 'next/link'
import { MARKETPLACES, withUTM } from '@/lib/marketplaces'
import { track, AnalyticsEvents } from '@/lib/analytics'

export type ShowcaseData = {
  titleMain: string
  titleAccent: string
  tagline: string
  slotType: 'cutout' | 'lifestyle'
  image: string
  accentColor: string
  bgGradient: string
  bgPosition?: string
  shadowFilter?: string
  textColor?: string
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
  const isLifestyle = showcase.slotType === 'lifestyle'
  const productFilter = showcase.shadowFilter ?? DEFAULT_SHADOW

  return (
    <article
      className="fhp-slot relative overflow-hidden"
      style={{
        aspectRatio: '16 / 11',
        background: isLifestyle
          ? `url(${showcase.image}) ${showcase.bgPosition ?? 'center 55%'}/cover no-repeat`
          : showcase.bgGradient,
        borderRadius: 0,
        padding: isLifestyle
          ? 0
          : 'clamp(40px, 4vw, 56px) clamp(28px, 4vw, 48px) clamp(28px, 3vw, 40px)',
        fontFamily: APPLE_FONT,
        color: showcase.textColor ?? '#ffffff',
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
          justifyContent: 'flex-start',
          alignItems: 'center',
          textAlign: 'center',
          padding: isLifestyle
            ? 'clamp(20px, 2.5vw, 28px) clamp(18px, 2vw, 26px) 0'
            : undefined,
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
            {showcase.titleAccent}
          </h2>
          <p
            className="fhp-tagline"
            style={{
              fontSize: 'clamp(18px, 1.4vw, 19px)',
              fontWeight: 400,
              lineHeight: 1.3,
              marginTop: 12,
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
            aria-label={`Más información sobre ${showcase.titleMain} ${showcase.titleAccent}`}
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
            Ver producto
          </Link>
        </div>

        {/* Marketplace buttons — replace the previous generic "Comprar"
            (which routed to a form, not checkout) with explicit per-store
            buy paths. UTM placement = product_card. Single tracked event
            per click with sku + origen. */}
        <div className="fhp-marketplaces flex flex-wrap gap-2 items-center justify-center mt-3">
          <a
            href={withUTM(MARKETPLACES.amazon, 'amazon', 'product_card')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(AnalyticsEvents.ClickProducto, { producto: sku, origen: 'card' })}
            aria-label={`Comprar ${showcase.titleMain} ${showcase.titleAccent} en Amazon`}
            className="fhp-mp-btn"
            style={{
              padding: '7px 14px',
              borderRadius: 980,
              fontSize: 11,
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid currentColor',
              opacity: 0.85,
            }}
          >
            Comprar en Amazon
          </a>
          <a
            href={withUTM(MARKETPLACES.ml, 'mercado_libre', 'product_card')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(AnalyticsEvents.ClickProducto, { producto: sku, origen: 'card' })}
            aria-label={`Comprar ${showcase.titleMain} ${showcase.titleAccent} en Mercado Libre`}
            className="fhp-mp-btn"
            style={{
              padding: '7px 14px',
              borderRadius: 980,
              fontSize: 11,
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid currentColor',
              opacity: 0.85,
            }}
          >
            Comprar en Mercado Libre
          </a>
          <a
            href={withUTM(MARKETPLACES.walmart, 'walmart', 'product_card')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(AnalyticsEvents.ClickProducto, { producto: sku, origen: 'card' })}
            aria-label={`Comprar ${showcase.titleMain} ${showcase.titleAccent} en Walmart`}
            className="fhp-mp-btn"
            style={{
              padding: '7px 14px',
              borderRadius: 980,
              fontSize: 11,
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid currentColor',
              opacity: 0.85,
            }}
          >
            Comprar en Walmart
          </a>
        </div>
      </div>
    </article>
  )
}
