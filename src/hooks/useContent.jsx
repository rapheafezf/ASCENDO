import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_CONTENT, withDefaults } from '../data/defaults'

/**
 * Contenu éditable du site (textes, produits, stock, lookbook), chargé depuis
 * /api/content. En cas d'échec, le site s'affiche avec le contenu par défaut.
 */
const ContentContext = createContext(null)

export const totalStock = (p) => Object.values(p.stock || {}).reduce((n, v) => n + v, 0)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    let alive = true
    fetch('/api/content')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .catch(() => DEFAULT_CONTENT)
      .then((c) => alive && setContent(withDefaults(c)))
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo(() => {
    if (!content) return null
    return { ...content, products: content.products.filter((p) => p.active !== false) }
  }, [content])

  // Rien n'est rendu avant le chargement : évite d'afficher puis de remplacer les textes par défaut
  if (!value) return <div className="min-h-svh bg-navy" aria-busy="true" />
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export const useContent = () => useContext(ContentContext)
