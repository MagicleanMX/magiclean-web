type Props = {
  antibacterial?: boolean
  sinQuimicos?: boolean
  destacado?: boolean
}

export default function ProductBadges({ antibacterial, sinQuimicos, destacado }: Props) {
  const visible = [antibacterial, sinQuimicos, destacado].some(Boolean)
  if (!visible) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {antibacterial && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0076FF]/10 text-[#0052CC]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF]" />
          NeoShield™
        </span>
      )}
      {sinQuimicos && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
          Sin químicos
        </span>
      )}
      {destacado && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFF0F0] text-[#FF2B2B]">
          Popular
        </span>
      )}
    </div>
  )
}
