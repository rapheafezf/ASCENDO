import { useInView } from '../hooks/useInView'

/** Séparateur de section : un trait ascendant qui se dessine à l'entrée dans l'écran. */
export default function Divider({ tone = 'dark', className = '' }) {
  const [ref, visible] = useInView({ threshold: 0.6 })
  const stroke = tone === 'light' ? '#FFFFFF' : '#0B1F3A'
  return (
    <div ref={ref} className={`container-brand ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1320 24" preserveAspectRatio="none" className="h-6 w-full" fill="none">
        <path
          d="M0 20H560L600 4L640 20H1320"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
          className={`draw transition-[stroke-dashoffset] duration-[1500ms] ease-brand ${visible ? 'is-drawn' : ''}`}
        />
      </svg>
    </div>
  )
}
