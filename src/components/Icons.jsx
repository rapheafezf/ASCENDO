/** Icônes au trait (24 px, stroke 1.6) — cohérentes avec le logo. */
const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'square',
  'aria-hidden': true,
}

export const SearchIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" className="origin-[15.5px_15.5px] transition-transform duration-300 ease-brand group-hover:scale-125" />
  </svg>
)

export const UserIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" className="transition-transform duration-300 ease-brand group-hover:-translate-y-0.5" />
    <path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6" />
  </svg>
)

export const HeartIcon = ({ filled, ...p }) => (
  <svg {...base} {...p}>
    <path
      d="M12 20.5s-8-4.7-8-10.6A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.9c0 5.9-8 10.6-8 10.6Z"
      strokeLinejoin="round"
      className={`transition-[fill] duration-300 ease-brand ${filled ? 'fill-current' : 'fill-transparent'}`}
    />
  </svg>
)

export const BagIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 8h15l-1.2 13H5.7L4.5 8Z" />
    <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" className="transition-transform duration-300 ease-brand group-hover:-translate-y-0.5" />
  </svg>
)

export const ArrowIcon = ({ direction = 'right', ...p }) => {
  const rot = { right: 0, left: 180, up: -90, down: 90 }[direction]
  return (
    <svg {...base} width={18} height={18} {...p} style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

export const CloseIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
)

/** Pictogrammes réseaux sociaux (remplis, monochromes). */
export const InstagramIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
)
export const TikTokIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8M14 3.5c.5 2.6 2.3 4.3 5 4.5" />
  </svg>
)
export const YoutubeIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
    <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
  </svg>
)
