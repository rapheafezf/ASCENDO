import { Link } from 'react-router'
import { COLORS, formatPrice } from '../data/products'
import Placeholder from './Placeholder'
import { useStore } from '../hooks/useStore'
import { BagIcon, HeartIcon } from './Icons'

/**
 * Carte produit : image 3:4, seconde image au survol, badge, favoris,
 * ajout rapide, nom, prix et pastilles de couleur.
 */
export default function ProductCard({ product, sizes = '(min-width: 1024px) 25vw, 50vw' }) {
  const { addToCart, wishlist, toggleWishlist } = useStore()
  const liked = wishlist.includes(product.id)
  const url = `/produit/${product.id}`
  const title = `${product.name} ${product.color}`

  return (
    <article className="group/card relative">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-mist">
        <Link to={url} aria-label={title} className="absolute inset-0">
          <span className="sr-only">{product.alt[0]}</span>
          <Placeholder tone="white" label={product.category} className="transition-transform duration-700 ease-brand group-hover/card:scale-[1.06]" />
          <Placeholder tone="navy" label={product.name} className="opacity-0 transition-opacity duration-700 ease-brand group-hover/card:opacity-100" />
        </Link>

        {product.badge && (
          <span
            className={`pointer-events-none absolute left-3 top-3 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] ${
              product.badge === 'Nouveau' ? 'bg-ink text-white' : 'bg-navy text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={liked}
          aria-label={liked ? `Retirer ${title} des favoris` : `Ajouter ${title} aux favoris`}
          className="group absolute right-2 top-2 grid h-10 w-10 place-items-center text-ink transition-transform duration-300 ease-brand hover:scale-110"
        >
          <HeartIcon filled={liked} width={20} height={20} />
        </button>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="absolute inset-x-3 bottom-3 flex h-11 items-center justify-center gap-2 bg-white font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink opacity-0 shadow-soft transition-[opacity,transform,background-color,color] duration-500 ease-brand hover:bg-ink hover:text-white focus-visible:translate-y-0 focus-visible:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100 max-lg:opacity-100 lg:translate-y-3"
          aria-label={`Ajouter ${title} au panier, taille M`}
        >
          <BagIcon width={16} height={16} />
          <span className="max-sm:hidden">Ajout rapide</span>
          <span className="sm:hidden">Ajouter</span>
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-[13px] font-bold uppercase tracking-[0.12em]">
            <Link to={url} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-slate">{product.color}</p>
        </div>
        <p className="shrink-0 text-right text-sm font-medium">
          {product.compareAt && (
            <span className="mr-2 text-slate line-through">
              <span className="sr-only">Prix initial </span>
              {formatPrice(product.compareAt)}
            </span>
          )}
          <span className="sr-only">Prix </span>
          {formatPrice(product.price)}
        </p>
      </div>

      <ul className="mt-3 flex gap-2" aria-label="Coloris disponibles">
        {product.colors.map((c) => (
          <li key={c}>
            <span
              title={COLORS[c].label}
              className="block h-3.5 w-3.5 rounded-full border border-slate/40"
              style={{ background: COLORS[c].hex }}
            >
              <span className="sr-only">{COLORS[c].label}</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}
