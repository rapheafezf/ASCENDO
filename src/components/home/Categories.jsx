import { Link } from 'react-router'
import Reveal from '../Reveal'
import { ArrowIcon } from '../Icons'
import Placeholder from '../Placeholder'

const CATEGORIES = [
  { title: 'T-shirts', to: '/collection/t-shirts', count: '14 modèles', image: '1586790170083-2f9ceadc732d', alt: 'Homme barbu en t-shirt blanc ASCENDO sur fond clair' },
  { title: 'Hoodies', to: '/collection/hoodies', count: '9 modèles', image: '1556821840-3a63f95609a7', alt: 'Silhouette de dos en hoodie gris, capuche relevée' },
  { title: 'Pantalons', to: '/collection/pantalons', count: '7 modèles', image: '1473966968600-fa801b869a1a', alt: 'Pantalon chino porté avec des baskets blanches' },
]

export default function Categories() {
  return (
    <section className="section" aria-labelledby="cat-title">
      <div className="container-brand">
        <Reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <div>
            <p className="eyebrow mb-4 text-slate">Les essentiels</p>
            <h2 id="cat-title">Choisis ta base</h2>
          </div>
          <Link to="/collection/nouveautes" className="link-underline self-start font-display text-xs font-bold uppercase tracking-[0.16em] sm:self-auto">
            Tout voir
          </Link>
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {CATEGORIES.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 120}>
              <Link to={c.to} className="on-dark group relative block aspect-[3/4] overflow-hidden rounded-[2px] bg-navy text-white max-md:aspect-[4/5]">
                <Placeholder tone={i === 1 ? 'ink' : 'navy'} className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.06]" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden="true" />
                <span className="absolute inset-x-6 bottom-6 flex items-end justify-between lg:inset-x-8 lg:bottom-8">
                  <span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-white/80">{c.count}</span>
                    <span className="mt-2 block font-display text-2xl font-extrabold uppercase tracking-[0.1em] lg:text-3xl">{c.title}</span>
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/60 transition-[background-color,color,transform] duration-500 ease-brand group-hover:-rotate-45 group-hover:bg-white group-hover:text-ink" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
