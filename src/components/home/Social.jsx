import Reveal from '../Reveal'
import { InstagramIcon, TikTokIcon } from '../Icons'
import Placeholder from '../Placeholder'

const POSTS = [
  { id: '1517836357463-d25dfeac3438', net: 'Instagram', alt: 'Athlète en salle de sport près d’une barre de musculation' },
  { id: '1503342217505-b0a15ec3261c', net: 'TikTok', alt: 'Femme en t-shirt noir graphique devant un mur rose' },
  { id: '1516826957135-700dedea698c', net: 'Instagram', alt: 'Homme assis sur un muret en sweat clair' },
  { id: '1541534741688-6078c6bfb5c5', net: 'TikTok', alt: 'Athlète en brassière effectuant une traction' },
  { id: '1576871337622-98d48d1cf531', net: 'Instagram', alt: 'T-shirts noirs ASCENDO alignés sur un portant' },
  { id: '1552374196-1ab2a1c593e8', net: 'Instagram', alt: 'Homme assis en veste camel et pantalon clair' },
]

export default function Social() {
  return (
    <section className="section" aria-labelledby="social-title">
      <div className="container-brand">
        <Reveal className="mb-12 flex flex-col items-center text-center lg:mb-16">
          <p className="eyebrow mb-4 text-slate">@ascendo.official</p>
          <h2 id="social-title">#ASCENDO</h2>
          <p className="mt-5 max-w-md text-slate">Partage ta progression avec #ASCENDO pour apparaître ici et dans nos stories.</p>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {POSTS.map((p, i) => {
            const Icon = p.net === 'TikTok' ? TikTokIcon : InstagramIcon
            return (
              <Reveal as="li" key={p.id} delay={i * 70}>
                <a
                  href="#"
                  aria-label={`Voir la publication ${p.net} : ${p.alt}`}
                  className="on-dark group relative block aspect-square overflow-hidden rounded-[2px] bg-navy"
                >
                  <Placeholder tone={i % 2 ? 'ink' : 'navy'} className="transition-transform duration-700 ease-brand group-hover:scale-[1.06]" />
                  <span className="absolute inset-0 grid place-items-center bg-navy/0 text-white opacity-0 transition-[opacity,background-color] duration-500 ease-brand group-hover:bg-navy/60 group-hover:opacity-100 group-focus-visible:bg-navy/60 group-focus-visible:opacity-100">
                    <Icon width={28} height={28} />
                  </span>
                </a>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
