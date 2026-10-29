import { useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import Reveal from '../Reveal'

const STATS = [
  { value: 380, suffix: ' g', label: 'Grammage de nos molletons', ratio: 0.76 },
  { value: 100, suffix: ' %', label: 'Coton biologique', ratio: 1 },
  { value: 30, suffix: ' j', label: 'Pour changer d’avis', ratio: 0.3 },
  { value: 80, suffix: ' €', label: 'Livraison offerte dès', ratio: 0.8 },
]

const R = 54
const C = 2 * Math.PI * R
const DURATION = 1500
const ease = (t) => 1 - Math.pow(1 - t, 4)

/** Cercle de progression + compteur animé, déclenchés à l'entrée dans l'écran. */
function StatCircle({ value, suffix, label, ratio, start }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value)
      return
    }
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min((now - t0) / DURATION, 1)
      setN(Math.round(value * ease(t)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value])

  return (
    <figure className="flex flex-col items-center text-center">
      <div className="relative h-36 w-36 lg:h-40 lg:w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={R} fill="none" stroke="#0B1F3A" strokeOpacity="0.1" strokeWidth="2" />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="#0B1F3A"
            strokeWidth="2"
            strokeDasharray={C}
            strokeDashoffset={start ? C * (1 - ratio) : C}
            style={{ transition: `stroke-dashoffset ${DURATION}ms cubic-bezier(0.22,1,0.36,1)` }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-2xl font-extrabold tracking-[0.04em] text-navy lg:text-[28px]">
          {/* Le lecteur d'écran lit la valeur finale, pas le compteur intermédiaire */}
          <span aria-hidden="true">
            {n.toLocaleString('fr-FR')}
            {suffix}
          </span>
          <span className="sr-only">
            {value.toLocaleString('fr-FR')}
            {suffix}
          </span>
        </span>
      </div>
      <figcaption className="mt-6 max-w-[22ch] font-display text-xs font-bold uppercase tracking-[0.16em]">{label}</figcaption>
    </figure>
  )
}

export default function Stats() {
  const [ref, visible] = useInView({ threshold: 0.35 })
  return (
    <section ref={ref} className="section" aria-labelledby="stats-title">
      <div className="container-brand">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center lg:mb-20">
          <p className="eyebrow mb-4 text-slate">En chiffres</p>
          <h2 id="stats-title">La progression se mesure</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCircle key={s.label} {...s} start={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
