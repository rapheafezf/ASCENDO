/**
 * Emplacement visuel aux couleurs de la marque, en attendant les photos définitives.
 * Remplit son parent (qui doit être positionné) : remplacer par une <img> le moment venu.
 */
const TONES = {
  navy: 'bg-navy text-white/15',
  ink: 'bg-ink text-white/12',
  mist: 'bg-mist text-navy/10',
  white: 'bg-white text-navy/10',
}

export default function Placeholder({ tone = 'navy', label, className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${TONES[tone]} ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" fill="none">
        <path d="M-20 360 L80 270 L130 300 L210 200 L250 230 L320 150" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-20 390 L110 290 L160 320 L240 240 L280 265 L320 230" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {/* Flèche centrée à part, pour rester entière quel que soit le format de la tuile */}
      <svg className="absolute left-1/2 top-[18%] h-16 w-12 -translate-x-1/2" viewBox="0 0 48 64" fill="none">
        <path d="M24 62 V4 M8 20 L24 4 L40 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
      {label && (
        <span
          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center font-display text-[11px] font-bold uppercase tracking-[0.2em] ${
            tone === 'mist' || tone === 'white' ? 'text-navy/50' : 'text-white/45'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  )
}
