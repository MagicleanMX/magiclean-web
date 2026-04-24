import { ImageResponse } from 'next/og'
import fs from 'node:fs'
import path from 'node:path'

export const alt = 'MagiClean — Limpieza profesional con tecnología NeoShield™'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function dataUrl(rel: string): string {
  // turbopackIgnore placed inside path.join so Turbopack doesn't trace the
  // whole project into the NFT list for this build-time file read.
  const buf = fs.readFileSync(path.join(/*turbopackIgnore: true*/ process.cwd(), rel))
  return `data:image/png;base64,${buf.toString('base64')}`
}

export default async function Image() {
  const logo = dataUrl('public/images/brand/logo/magiclean-logo.png')
  const neoshield = dataUrl('public/images/brand/neoshield/neoshield-badge.png')

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: 80,
          backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7FF 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <img src={logo} width={600} alt="" style={{ display: 'block' }} />
        <div
          style={{
            marginTop: 40,
            fontSize: 30,
            fontWeight: 500,
            color: '#1F2937',
            textAlign: 'center',
            letterSpacing: '-0.01em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            lineHeight: 1.2,
          }}
        >
          <div>Limpieza profesional con</div>
          <div>tecnología NeoShield™</div>
        </div>
        <img
          src={neoshield}
          width={260}
          alt=""
          style={{ position: 'absolute', bottom: 40, right: 40 }}
        />
      </div>
    ),
    { ...size }
  )
}
