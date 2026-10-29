import { Link } from 'react-router'
import Reveal from '../Reveal'
import Placeholder from '../Placeholder'
import { useContent } from '../../hooks/useContent'

/** Mosaïque asymétrique : les classes de grille définissent le rythme des tuiles. */
const SPANS = ['col-span-2 row-span-2 lg:col-span-2 lg:row-span-2', 'lg:row-span-2', '', '', 'col-span-2', 'col-span-2']

export default function Lookbook() {
  const { lookbook, site } = useContent()
  const looks = lookbook.slice(0, SPANS.length)
  if (!looks.length) return null
  return (
    <section className="section bg-mist" aria-labelledby="look-title">
      <div className="container-brand">
        <Reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <div>
            <p className="eyebrow mb-4 text-slate">{site.lookbookSection.eyebrow}</p>
            <h2 id="look-title">{site.lookbookSection.title}</h2>
          </div>
          <Link to="/lookbook" className="link-underline self-start font-display text-xs font-bold uppercase tracking-[0.16em] sm:self-auto">
            Voir le lookbook
          </Link>
        </Reveal>

        <ul className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:auto-rows-[260px] lg:grid-cols-4 lg:gap-6">
          {looks.map((l, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 100} className={SPANS[i]}>
              <figure className="on-dark group relative h-full overflow-hidden rounded-[2px] bg-navy">
                {l.image ? (
                  <img
                    src={l.image}
                    alt={l.caption}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.06]"
                  />
                ) : (
                  <Placeholder tone={i % 2 ? 'ink' : 'navy'} className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.06]" />
                )}
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-0 items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-5 pt-16 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-[opacity,transform] duration-500 ease-brand lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  {l.caption}
                  <span aria-hidden="true">0{i + 1}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
