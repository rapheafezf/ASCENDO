import { useEffect, useState } from 'react'
import { ArrowIcon } from './Icons'

const R = 22
const C = 2 * Math.PI * R

/** Bouton retour en haut avec cercle SVG indiquant la progression du scroll. */
export default function BackToTop() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const visible = progress > 0.08

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Revenir en haut de la page"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-40 grid h-[52px] w-[52px] place-items-center rounded-full bg-navy text-white shadow-soft transition-[opacity,transform] duration-500 ease-brand hover:-translate-y-0.5 sm:bottom-8 sm:right-8 ${
        visible ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg viewBox="0 0 52 52" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="26" cy="26" r={R} fill="none" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.5" />
        <circle
          cx="26"
          cy="26"
          r={R}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
      </svg>
      <ArrowIcon direction="up" className="relative transition-transform duration-300 ease-brand group-hover:-translate-y-0.5" />
    </button>
  )
}
