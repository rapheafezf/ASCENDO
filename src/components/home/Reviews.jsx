import { useInView } from '../../hooks/useInView'
import Reveal from '../Reveal'

const REVIEWS = [
  {
    name: 'Yanis B.',
    city: 'Lyon',
    product: 'Hoodie Summit Marine',
    rating: 5,
    photo: '1500648767791-00dcc994a43e',
    text: "Épais, lourd, la capuche tient toute seule. Après dix lavages il n'a pas bougé d'un millimètre. Je ne porte presque plus que ça.",
  },
  {
    name: 'Inès M.',
    city: 'Bordeaux',
    product: 'T-shirt Apex Blanc',
    rating: 5,
    photo: '1438761681033-6461ffad8d80',
    text: "Enfin un t-shirt blanc qui n'est pas transparent. La coupe est parfaite, et la livraison est arrivée en deux jours.",
  },
  {
    name: 'Thomas R.',
    city: 'Paris',
    product: 'Pantalon Cargo Altitude',
    rating: 4.5,
    photo: '1506794778202-cad84cf45f1d',
    text: "Je le porte à la salle et au bureau. Les poches sont bien pensées, rien ne pend. J'ai pris ma taille habituelle, c'est juste.",
  },
]

const STAR = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z'

/** Étoiles avec remplissage progressif (clip animé, demi-étoiles gérées). */
function Stars({ rating, start, idx }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Note : ${String(rating).replace('.', ',')} sur 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        const clipId = `star-${idx}-${i}`
        return (
          <svg key={i} viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
            <defs>
              <clipPath id={clipId}>
                <rect
                  x="0"
                  y="0"
                  height="24"
                  width={start ? 24 * fill : 0}
                  style={{ transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)', transitionDelay: `${300 + i * 120}ms` }}
                />
              </clipPath>
            </defs>
            <path d={STAR} fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.2" strokeLinejoin="round" />
            <path d={STAR} fill="#FFFFFF" clipPath={`url(#${clipId})`} />
          </svg>
        )
      })}
    </div>
  )
}

export default function Reviews() {
  const [ref, visible] = useInView({ threshold: 0.3 })
  return (
    <section ref={ref} className="on-dark section bg-ink text-white" aria-labelledby="reviews-title">
      <div className="container-brand">
        <Reveal className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4 text-white/70">Ils en parlent</p>
            <h2 id="reviews-title">Portés, testés, validés</h2>
          </div>
          <p className="text-white/70">
            <strong className="font-display text-2xl font-extrabold text-white">4,8/5</strong>
            <span className="ml-3">sur 2 340 avis vérifiés</span>
          </p>
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal as="li" key={r.name} delay={i * 120}>
              <figure className="flex h-full flex-col rounded-[2px] border border-white/10 p-8 transition-colors duration-500 ease-brand hover:border-white/30 lg:p-10">
                <Stars rating={r.rating} start={visible} idx={i} />
                <blockquote className="mt-6 flex-1 text-white/85">
                  <p>« {r.text} »</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/20 font-display text-sm font-bold tracking-[0.08em]" aria-hidden="true">
                    {r.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                  <div>
                    <p className="font-display text-[13px] font-bold uppercase tracking-[0.12em]">{r.name}</p>
                    <p className="text-sm text-white/60">
                      {r.city} · {r.product}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
