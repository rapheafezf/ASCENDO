import { Link } from 'react-router'
import Reveal from '../Reveal'
import Placeholder from '../Placeholder'

/** Mosaïque asymétrique : les classes de grille définissent le rythme des tuiles. */
const LOOKS = [
  { id: '1488161628813-04466f872be2', caption: 'Hoodie Summit · Cargo Altitude', alt: 'Homme assis sur un tabouret en tenue décontractée', span: 'col-span-2 row-span-2 lg:col-span-2 lg:row-span-2' },
  { id: '1485968579580-b6d095142e6e', caption: 'Manteau Zenith — Femme', alt: 'Femme en manteau sombre marchant dans une rue pavée', span: 'lg:row-span-2' },
  { id: '1520975661595-6453be3f7070', caption: 'Veste Zenith · Total black', alt: 'Homme en veste noire et lunettes de soleil dans une rue', span: '' },
  { id: '1564859228273-274232fdb516', caption: 'T-shirt Apex Blanc', alt: 'Homme de dos en t-shirt blanc et casquette face à la mer', span: '' },
  { id: '1545291730-faff8ca1d4b0', caption: 'Silhouette nocturne', alt: 'Femme en combinaison grise dans un tunnel éclairé', span: 'col-span-2' },
  { id: '1544441893-675973e31985', caption: 'Cargo Altitude · Essentiels', alt: 'Pantalon sombre et baskets blanches posés à plat', span: 'col-span-2' },
]

export default function Lookbook() {
  return (
    <section className="section bg-mist" aria-labelledby="look-title">
      <div className="container-brand">
        <Reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <div>
            <p className="eyebrow mb-4 text-slate">Lookbook AH</p>
            <h2 id="look-title">Hors des sentiers</h2>
          </div>
          <Link to="/lookbook" className="link-underline self-start font-display text-xs font-bold uppercase tracking-[0.16em] sm:self-auto">
            Voir le lookbook
          </Link>
        </Reveal>

        <ul className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:auto-rows-[260px] lg:grid-cols-4 lg:gap-6">
          {LOOKS.map((l, i) => (
            <Reveal as="li" key={l.id} delay={(i % 3) * 100} className={l.span}>
              <figure className="on-dark group relative h-full overflow-hidden rounded-[2px] bg-navy">
                <Placeholder tone={i % 2 ? 'ink' : 'navy'} className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.06]" />
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
