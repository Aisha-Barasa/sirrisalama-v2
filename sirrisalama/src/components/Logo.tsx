export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 42C10 31 5 24 5 16.5 5 11 9 7 14 7c4 0 8 2.5 10 6 2-3.5 6-6 10-6 5 0 9 4 9 9.5C43 24 38 31 24 42Z" stroke="#1F6F78" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 24h8l3-6 5 12 3-6h9" stroke="#C4472B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark />
      <span className="leading-none">
        <span className={`block font-display text-2xl ${light ? 'text-white' : 'text-ink'}`}>SirriSalama</span>
        <span className={`text-xs ${light ? 'text-marigold' : 'text-teal'}`}>Together with you</span>
      </span>
    </span>
  )
}
