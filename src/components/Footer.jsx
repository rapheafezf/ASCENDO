import { Link } from 'react-router'
import Logo from './Logo'
import { InstagramIcon, TikTokIcon, YoutubeIcon } from './Icons'
import { useContent } from '../hooks/useContent'

const COLUMNS = [
  {
    title: 'Boutique',
    links: [
      ['Hoodies', '/collection/hoodies'],
      ['Lookbook', '/lookbook'],
    ],
  },
  {
    title: 'Aide',
    links: [
      ['Livraison', '/aide/livraison'],
      ['Retours & échanges', '/retours'],
      ['Guide des tailles', '/aide/tailles'],
      ['FAQ', '/contact#faq'],
      ['Suivre ma commande', '/compte'],
    ],
  },
  {
    title: 'Marque',
    links: [
      ['Notre histoire', '/a-propos'],
      ['Nos matières', '/a-propos#matieres'],
      ['Engagements', '/a-propos#valeurs'],
      ['Carrières', '/carrieres'],
    ],
  },
]

const PAYMENTS = ['VISA', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay']

export default function Footer() {
  const { footer } = useContent().site
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-brand grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:py-24">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-sm text-white/70">
            {footer.tagline}
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Réseaux sociaux">
            {[
              ['Instagram', InstagramIcon, footer.instagram],
              ['TikTok', TikTokIcon, footer.tiktok],
              ['YouTube', YoutubeIcon, footer.youtube],
            ].filter(([, , url]) => url).map(([name, Icon, url]) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`ASCENDO sur ${name}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-[background-color,color,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                >
                  <Icon width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="eyebrow !text-[12px] !leading-none">{col.title}</h2>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="link-underline transition-colors duration-300 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="eyebrow !text-[12px] !leading-none">Contact</h2>
          <address className="mt-6 space-y-3 text-sm not-italic text-white/70">
            <p>
              <a href={`mailto:${footer.email}`} className="link-underline hover:text-white">
                {footer.email}
              </a>
            </p>
            {footer.hours && <p>{footer.hours}</p>}
            {footer.address && <p className="whitespace-pre-line">{footer.address}</p>}
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-brand flex flex-col gap-6 py-8 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Moyens de paiement acceptés">
            {PAYMENTS.map((p) => (
              <li key={p} className="rounded-[2px] border border-white/20 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-white/80">
                {p}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link to="/cgv" className="link-underline hover:text-white">CGV</Link></li>
            <li><Link to="/confidentialite" className="link-underline hover:text-white">Confidentialité</Link></li>
            <li><Link to="/retours" className="link-underline hover:text-white">Politique de retours</Link></li>
            <li><Link to="/mentions-legales" className="link-underline hover:text-white">Mentions légales</Link></li>
          </ul>
          <p>© {new Date().getFullYear()} ASCENDO. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
