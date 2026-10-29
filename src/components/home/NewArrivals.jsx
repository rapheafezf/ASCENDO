import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Reveal from '../Reveal'
import ProductCard from '../ProductCard'
import { ArrowIcon } from '../Icons'
import { useContent } from '../../hooks/useContent'

/**
 * Carrousel des nouveautés. Repose sur le scroll natif avec scroll-snap :
 * glisser tactile, trackpad et clavier fonctionnent sans librairie.
 */
export default function NewArrivals() {
  const { products, site } = useContent()
  const items = products.slice(0, 8)
  const track = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const [progress, setProgress] = useState(0)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 })
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scrollBy = (dir) => {
    const el = track.current
    const card = el?.querySelector('li')
    if (!card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  const arrowBtn =
    'grid h-[52px] w-[52px] place-items-center rounded-full border border-ink transition-[background-color,color,opacity,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30'

  return (
    <section className="section bg-mist" aria-labelledby="new-title">
      <div className="container-brand">
        <Reveal className="mb-12 flex items-end justify-between gap-6 lg:mb-16">
          <div>
            <p className="eyebrow mb-4 text-slate">{site.collection.eyebrow}</p>
            <h2 id="new-title">{site.collection.title}</h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button type="button" className={arrowBtn} onClick={() => scrollBy(-1)} disabled={edges.start} aria-label="Produits précédents">
              <ArrowIcon direction="left" />
            </button>
            <button type="button" className={arrowBtn} onClick={() => scrollBy(1)} disabled={edges.end} aria-label="Produits suivants">
              <ArrowIcon />
            </button>
          </div>
        </Reveal>
      </div>

      {/* Le rail déborde du conteneur à droite pour suggérer la suite */}
      <div className="container-brand !pr-0 lg:!pr-10">
        <ul
          ref={track}
          onScroll={update}
          tabIndex={0}
          aria-label="Carrousel des hoodies, faites défiler horizontalement"
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 focus-visible:outline-offset-8 lg:gap-6"
        >
          {items.map((p, i) => (
            <Reveal
              as="li"
              key={p.id}
              delay={Math.min(i, 4) * 90}
              className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <ProductCard product={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 72vw" />
            </Reveal>
          ))}
          <li className="w-4 shrink-0 lg:hidden" aria-hidden="true" />
        </ul>
      </div>

      <div className="container-brand mt-10 flex items-center gap-8">
        <div className="relative h-px flex-1 bg-ink/15" aria-hidden="true">
          <span
            className="absolute inset-y-0 left-0 w-1/4 bg-ink transition-transform duration-300 ease-brand"
            style={{ transform: `translateX(${progress * 300}%)` }}
          />
        </div>
        <Link to="/collection/hoodies" className="btn btn-dark shrink-0">
          {site.collection.button}
        </Link>
      </div>
    </section>
  )
}
