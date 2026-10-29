import { useEffect, useState } from 'react'
import { Link } from 'react-router'

/** Lignes ascendantes « escalier / montagne » tracées en arrière-plan. */
const LINES = [
  'M-40 820 L180 640 L300 700 L520 460 L640 540 L900 260 L1040 360 L1480 -40',
  'M-40 900 L260 700 L380 760 L640 500 L760 580 L1060 300 L1180 380 L1480 80',
  'M-40 980 L340 760 L460 820 L760 540 L880 620 L1220 340 L1480 200',
]

export default function Hero() {
  const [drawn, setDrawn] = useState(false)

  // Les tracés démarrent juste après le montage (et après le preloader s'il est actif)
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="on-dark relative flex h-svh min-h-[600px] items-end overflow-hidden bg-navy text-white" aria-labelledby="hero-title">
      {/* Overlay : dégradé marine → noir pour garantir le contraste du texte */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-navy/60 to-navy/30" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/70 to-transparent" aria-hidden="true" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        {LINES.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#FFFFFF"
            strokeOpacity="0.1"
            strokeWidth="1.5"
            pathLength="1"
            className={`draw transition-[stroke-dashoffset] ease-brand ${drawn ? 'is-drawn' : ''}`}
            style={{ transitionDuration: '1500ms', transitionDelay: `${i * 220}ms` }}
          />
        ))}
      </svg>

      <div className="container-brand relative pb-28 sm:pb-32 lg:pb-36">
        <p className="eyebrow mb-5 text-white/80 animate-page-in">Collection Automne-Hiver</p>
        <h1 id="hero-title" className="max-w-[12ch] animate-page-in [animation-delay:120ms]">
          Elevate Yourself
        </h1>
        <p className="mt-6 max-w-md text-white/80 animate-page-in [animation-delay:220ms]">
          Des pièces denses, nettes et durables. Conçues pour chaque palier que vous franchissez.
        </p>
        <div className="relative mt-10 flex flex-col gap-3 animate-page-in [animation-delay:320ms] sm:flex-row sm:items-center sm:gap-4">
          <Link to="/collection/homme" className="btn btn-primary">
            Acheter Homme
          </Link>
          <Link to="/collection/femme" className="btn btn-secondary">
            Acheter Femme
          </Link>
          {/* Flèche flottante à côté des CTA */}
          <svg viewBox="0 0 40 56" className="ml-4 hidden h-14 w-10 animate-float sm:block" fill="none" stroke="#FFFFFF" strokeWidth="1.5" aria-hidden="true">
            <path d="M20 54V4M8 16 20 4l12 12" />
          </svg>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <a
        href="#marquee"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-white sm:flex"
        aria-label="Faire défiler vers le contenu"
      >
        <span className="relative h-9 w-[22px] rounded-full border border-white/60" aria-hidden="true">
          <span className="absolute left-1/2 top-2 h-1.5 w-[3px] -translate-x-1/2 rounded-full bg-white animate-scroll-dot" />
        </span>
        Scroll
      </a>
    </section>
  )
}
