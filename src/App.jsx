import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import BackToTop from './components/BackToTop'

/** Gabarit commun : preloader, header, transition de page, footer. */
export default function App() {
  const { pathname, hash } = useLocation()

  // Remonte en haut à chaque changement de page (sauf ancre)
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[110] bg-white px-4 py-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu
      </a>
      <Preloader />
      <Header />
      {/* key = pathname : rejoue l'animation d'entrée à chaque navigation */}
      <main id="contenu" key={pathname} className="animate-page-in">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
