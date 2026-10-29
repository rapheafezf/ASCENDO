import { Link } from 'react-router'

/**
 * Logo ASCENDO : le « A » est dessiné en SVG avec une flèche ascendante
 * intégrée. Au survol, la flèche se redessine (keyframe via la classe group).
 */
export default function Logo({ className = '' }) {
  return (
    <Link to="/" aria-label="ASCENDO, retour à l'accueil" className={`group inline-flex items-center gap-1 ${className}`}>
      <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M3 26 14 3l11 23" strokeWidth="2.6" strokeLinejoin="miter" />
        <path
          d="M14 25V13M10 17l4-4 4 4"
          strokeWidth="2.2"
          pathLength="1"
          className="logo-arrow"
        />
      </svg>
      <span className="font-display text-[17px] font-extrabold tracking-[0.2em]">SCENDO</span>
      <style>{`
        .logo-arrow { stroke-dasharray: 1; stroke-dashoffset: 0; }
        .group:hover .logo-arrow, .group:focus-visible .logo-arrow {
          animation: logo-draw 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes logo-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
      `}</style>
    </Link>
  )
}
