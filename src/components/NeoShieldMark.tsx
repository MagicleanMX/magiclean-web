// Reusable NeoShield™ brand mark — shield icon + wordmark.
// ShieldIcon  : just the SVG, size/color configurable
// NeoShieldBadge : pill badge used in cards and footers

export function ShieldIcon({
  size = 14,
  color = '#0076FF',
}: {
  size?: number
  color?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L3.5 6.5V12c0 5.1 3.84 9.87 8.5 11.1C16.66 21.87 20.5 17.1 20.5 12V6.5L12 2z" />
    </svg>
  )
}

export function NeoShieldBadge({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 ${
        dark ? 'bg-[#0076FF]/15' : 'bg-[#0076FF]/6'
      }`}
    >
      <ShieldIcon size={10} color="#0076FF" />
      <span className="text-[10px] font-bold text-[#0076FF] uppercase tracking-wide">
        NeoShield™
      </span>
    </div>
  )
}
