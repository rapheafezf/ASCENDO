import { Link, useLocation } from 'react-router'
import Seo from '../components/Seo'

/** Page provisoire pour les routes qui seront construites à l'étape suivante. */
export default function ComingSoon() {
  const { pathname } = useLocation()
  return (
    <section className="on-dark flex min-h-[80svh] items-center bg-navy pt-[108px] text-white">
      <Seo title="Bientôt disponible | ASCENDO" />
      <div className="container-brand py-24">
        <p className="eyebrow mb-5 text-white/70">{pathname}</p>
        <h1 className="max-w-[14ch]">Prochaine étape</h1>
        <p className="mt-6 max-w-md text-white/80">Cette page arrive très vite. En attendant, la collection vous attend sur l'accueil.</p>
        <Link to="/" className="btn btn-primary mt-10">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  )
}
