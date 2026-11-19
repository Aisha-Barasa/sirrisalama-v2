export default function Heart3D() {
  const heart = 'M200 350C70 250 30 190 30 125 30 75 70 40 115 40c35 0 65 20 85 55 20-35 50-55 85-55 45 0 85 35 85 85 0 65-40 125-170 225Z'
  return (
    <div className="relative mx-auto w-full max-w-md" role="img" aria-label="A glossy three-dimensional heart with a heartbeat line">
      <svg viewBox="0 0 400 420" className="float w-full drop-shadow-2xl">
        <defs>
          <radialGradient id="body" cx="35%" cy="28%" r="85%">
            <stop offset="0" stopColor="#F6A07A" /><stop offset=".45" stopColor="#C4472B" /><stop offset="1" stopColor="#7A2616" />
          </radialGradient>
          <radialGradient id="shine" cx="30%" cy="25%" r="40%">
            <stop offset="0" stopColor="#fff" stopOpacity=".65" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>
        <ellipse cx="200" cy="400" rx="110" ry="12" fill="#7A2616" opacity=".25" filter="url(#soft)" />
        <path d={heart} fill="#4A1509" transform="translate(6 12)" />
        <path d={heart} fill="url(#body)" />
        <path d={heart} fill="url(#shine)" />
        <ellipse cx="120" cy="95" rx="38" ry="20" fill="#fff" opacity=".35" transform="rotate(-35 120 95)" filter="url(#soft)" />
        <path d="M70 190h70l24-48 40 100 28-52h78" stroke="#F6E3B4" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  )
}
