import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/**
 * État boutique minimal (panier + favoris) partagé par toute l'application.
 * Le drawer panier complet sera branché sur ce même contexte.
 */
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  // Incrémenté à chaque ajout : sert à déclencher le rebond de l'icône panier
  const [cartPulse, setCartPulse] = useState(0)

  const addToCart = useCallback((product, size = 'M') => {
    setCart((items) => {
      const key = `${product.id}-${size}`
      const existing = items.find((i) => i.key === key)
      if (existing) return items.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      return [...items, { key, id: product.id, size, qty: 1, price: product.price }]
    })
    setCartPulse((n) => n + 1)
  }, [])

  const toggleWishlist = useCallback((id) => {
    setWishlist((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
  }, [])

  const value = useMemo(
    () => ({
      cart,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
      cartPulse,
      addToCart,
      wishlist,
      toggleWishlist,
    }),
    [cart, cartPulse, addToCart, wishlist, toggleWishlist],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
