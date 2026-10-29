import { useContent } from '../hooks/useContent'

/** Bandeau défilant infini. Le contenu est dupliqué pour une boucle sans à-coup. */
export default function Marquee() {
  const words = useContent().site.marquee.filter((w) => w.trim())
  if (!words.length) return null
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-y border-white/10 bg-navy py-5 text-white" aria-label={words.join(', ')}>
      <div className="flex w-max animate-marquee motion-reduce:animate-none" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <li key={i} className="flex items-center font-display text-2xl font-extrabold tracking-[0.2em] sm:text-4xl">
                <span className={i % 2 ? 'text-transparent [-webkit-text-stroke:1px_#FFFFFF]' : ''}>{w}</span>
                <span className="mx-8 text-base sm:mx-12">•</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
