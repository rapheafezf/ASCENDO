import { useEffect, useState } from 'react'

const KEY = 'ascendo:preloaded'

/** Lecture protégée : sessionStorage peut être indisponible (navigation privée stricte). */
function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Preloader affiché une seule fois par session :
 * 0 → 1 s : la flèche se dessine ; 1 s : ASCENDO apparaît (letter-spacing qui se resserre) ;
 * 2,2 s : fondu de sortie.
 */
export default function Preloader() {
  const [phase, setPhase] = useState(() => (alreadySeen() ? 'done' : 'enter'))

  useEffect(() => {
    if (phase === 'done') return
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* stockage indisponible : le preloader se rejouera, sans gravité */
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.style.overflow = 'hidden'
    const exit = setTimeout(() => setPhase('exit'), reduced ? 300 : 2200)
    const done = setTimeout(() => setPhase('done'), reduced ? 400 : 2900)
    return () => {
      clearTimeout(exit)
      clearTimeout(done)
      document.documentElement.style.overflow = ''
    }
    // On ne veut lancer la séquence qu'au montage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (phase === 'done') document.documentElement.style.overflow = ''
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      role="status"
      aria-label="Chargement d'ASCENDO"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-navy text-white transition-opacity duration-700 ease-brand ${
        phase === 'exit' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="#FFFFFF" aria-hidden="true">
        <path d="M8 56 32 8l24 48" strokeWidth="2.5" pathLength="1" className="pre-draw" />
        <path d="M32 54V28M24 36l8-8 8 8" strokeWidth="2.5" pathLength="1" className="pre-draw pre-draw--late" />
      </svg>
      <span className="pre-word font-display text-2xl font-extrabold sm:text-3xl">ASCENDO</span>
      <style>{`
        .pre-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: pre-draw 1s cubic-bezier(0.22,1,0.36,1) forwards; }
        .pre-draw--late { animation-delay: .35s; animation-duration: .65s; }
        @keyframes pre-draw { to { stroke-dashoffset: 0; } }
        .pre-word { opacity: 0; letter-spacing: .6em; animation: pre-word 1s cubic-bezier(0.22,1,0.36,1) 1s forwards; }
        @keyframes pre-word { to { opacity: 1; letter-spacing: .2em; } }
        @media (prefers-reduced-motion: reduce) {
          .pre-draw { stroke-dashoffset: 0; }
          .pre-word { opacity: 1; letter-spacing: .2em; }
        }
      `}</style>
    </div>
  )
}
