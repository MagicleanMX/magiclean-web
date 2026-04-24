import {
  LOGO_VIEW_BOX,
  LOGO_RED_PATH_D,
  LOGO_BLUE_PATH_D,
  LOGO_RED_FILL,
  LOGO_BLUE_FILL,
} from './logo-paths'

type LogoVariant = 'color' | 'white'

type LogoProps = {
  variant?: LogoVariant
  className?: string
}

// 'color' — red "Magi · " + blue "Clean" over light backgrounds.
// 'white' — all paths in white for use on brand blue (#0076FF) or dark bgs
//           per manual: wordmark unified in single color, no red/blue split.
export default function Logo({ variant = 'color', className }: LogoProps) {
  const redFill  = variant === 'white' ? '#FFFFFF' : LOGO_RED_FILL
  const blueFill = variant === 'white' ? '#FFFFFF' : LOGO_BLUE_FILL

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={LOGO_VIEW_BOX}
      role="img"
      aria-label="MagiClean"
      className={className}
    >
      <path fill={redFill} d={LOGO_RED_PATH_D} />
      <path fill={blueFill} d={LOGO_BLUE_PATH_D} />
    </svg>
  )
}
