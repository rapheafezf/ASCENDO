import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import Logo from './Logo'
import { BagIcon, CloseIcon, HeartIcon, SearchIcon, UserIcon } from './Icons'
import { useStore } from '../hooks/useStore'

export const NAV = [
  { label: 'Nouveautés', to: '/collection/nouveautes' },
  { label: 'Homme', to: '/collection/homme' },
  { label: 'Femme', to: '/collection/femme' },
  { label: 'Accessoires', to: '/collection/accessoires' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'À propos', to: '/a-propos' },
]

const ANNOUNCE_H = 36

/**
 * Barre d'annonce + header sticky.
 * Sur l'accueil, le header est transparent au-dessus du hero puis passe en
 * bleu marine flouté au scroll ; la barre d'annonce se replie.
 */
export default function Header() {
  const { pathname } = useLocation()
  const { cartCount, cartPulse, wishlist } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bump, setBump] = useState(false)
  const overHero = pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Rebond de l'icône panier à chaque ajout
  useEffect(() => {
    if (!cartPulse) return
    setBump(true)
    const t = setTimeout(() => setBump(false), 600)
    return () => clearTimeout(t)
  }, [cartPulse])

  // Menu mobile : fermeture au changement de page et avec Échap, scroll bloqué
  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const iconBtn = 'group relative grid h-11 w-11 place-items-center transition-opacity duration-300 hover:opacity-70'

  return (
    <>
      <div
        className="on-dark fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-brand"
        style={{ transform: scrolled ? `translateY(-${ANNOUNCE_H}px)` : 'none' }}
      >
        <p
          className="flex items-center justify-center bg-ink px-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-white sm:text-xs"
          style={{ height: ANNOUNCE_H }}
        >
          Livraison offerte dès 80&nbsp;€ <span className="mx-3" aria-hidden="true">•</span> Retours 30&nbsp;jours
        </p>

        <header
          className={`text-white transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-brand ${
            overHero ? 'bg-transparent' : 'bg-navy/90 shadow-soft backdrop-blur-md'
          }`}
        >
          <div className="container-brand grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
            <div className="flex items-center">
              <button
                type="button"
                className="-ml-2.5 grid h-11 w-11 place-items-center lg:hidden"
                aria-label="Ouvrir le menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(true)}
              >
                <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
                  <span className="h-px w-full bg-white" />
                  <span className="h-px w-4 bg-white" />
                </span>
              </button>
              <span className="hidden lg:block">
                <Logo />
              </span>
            </div>

            <span className="lg:hidden">
              <Logo />
            </span>

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {NAV.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className="link-underline font-display text-[12px] font-bold uppercase tracking-[0.16em]">
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="-mr-2.5 flex items-center justify-end">
              <button type="button" className={`${iconBtn} hidden sm:grid`} aria-label="Rechercher">
                <SearchIcon />
              </button>
              <NavLink to="/compte" className={`${iconBtn} hidden sm:grid`} aria-label="Mon compte">
                <UserIcon />
              </NavLink>
              <NavLink to="/favoris" className={`${iconBtn} hidden sm:grid`} aria-label={`Favoris (${wishlist.length})`}>
                <HeartIcon filled={wishlist.length > 0} />
              </NavLink>
              <button type="button" className={iconBtn} aria-label={`Panier, ${cartCount} article${cartCount > 1 ? 's' : ''}`}>
                <span className={bump ? 'animate-bounce-once' : ''}>
                  <BagIcon />
                </span>
                {cartCount > 0 && (
                  <span className="absolute right-1 top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-ink">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Menu mobile plein écran */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
        className={`on-dark fixed inset-0 z-[60] flex flex-col bg-navy text-white transition-[opacity,visibility] duration-500 ease-brand lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="container-brand flex h-[72px] items-center justify-between">
          <Logo />
          <button type="button" className="-mr-2.5 grid h-11 w-11 place-items-center" aria-label="Fermer le menu" onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Navigation mobile" className="container-brand flex flex-1 flex-col justify-center">
          <ul className="space-y-2">
            {NAV.map((item, i) => (
              <li
                key={item.to}
                className={`transition-[opacity,transform] duration-700 ease-brand ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : '0ms' }}
              >
                <NavLink to={item.to} className="block py-2 font-display text-3xl font-extrabold uppercase tracking-[0.08em]">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-brand flex gap-6 border-t border-white/15 py-6 text-sm uppercase tracking-[0.14em]">
          <NavLink to="/compte">Mon compte</NavLink>
          <NavLink to="/favoris">Favoris</NavLink>
          <NavLink to="/contact">Aide</NavLink>
        </div>
      </div>
    </>
  )
}
