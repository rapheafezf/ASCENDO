/** Contrôle minimal de la structure envoyée par l'admin avant enregistrement. */
const isStr = (v) => typeof v === 'string'
const isNum = (v) => typeof v === 'number' && Number.isFinite(v)
const isUrl = (v) => isStr(v) && (v === '' || /^(https:\/\/|\/uploads\/)/.test(v))

export function validateContent(c) {
  if (!c || typeof c !== 'object') return 'Contenu manquant.'
  if (!isNum(c.version)) return 'Version manquante.'
  if (!c.site || typeof c.site !== 'object') return 'Textes du site manquants.'
  if (!Array.isArray(c.products)) return 'Liste de produits manquante.'
  if (!Array.isArray(c.lookbook)) return 'Lookbook manquant.'

  const ids = new Set()
  for (const p of c.products) {
    const label = p?.name || p?.id || 'sans nom'
    if (!isStr(p.id) || !/^[a-z0-9-]{1,80}$/.test(p.id)) return `Identifiant invalide pour « ${label} ».`
    if (ids.has(p.id)) return `Deux produits ont le même identifiant (${p.id}).`
    ids.add(p.id)
    if (!isStr(p.name) || !p.name.trim()) return 'Un produit n’a pas de nom.'
    if (p.category !== 'Hoodies') return `« ${label} » doit être un hoodie : la boutique ne vend que des hoodies.`
    if (!isNum(p.price) || p.price < 0) return `Prix invalide pour « ${label} ».`
    if (p.compareAt != null && (!isNum(p.compareAt) || p.compareAt < 0)) return `Prix barré invalide pour « ${label} ».`
    if (!p.stock || typeof p.stock !== 'object') return `Stock manquant pour « ${label} ».`
    for (const n of Object.values(p.stock)) {
      if (!Number.isInteger(n) || n < 0) return `Stock invalide pour « ${label} ».`
    }
    if (!Array.isArray(p.images) || !p.images.every(isUrl)) return `Image invalide pour « ${label} ».`
  }
  if (!c.lookbook.every((l) => isStr(l.caption) && isUrl(l.image))) return 'Entrée de lookbook invalide.'
  if (!isUrl(c.site.hero?.image ?? '') || !isUrl(c.site.editorial?.image ?? '')) return 'Image du site invalide.'
  if (!Array.isArray(c.site.marquee) || !c.site.marquee.every(isStr)) return 'Bandeau défilant invalide.'
  for (const k of ['instagram', 'tiktok', 'youtube']) {
    const v = c.site.footer?.[k] ?? ''
    if (!isStr(v) || (v && !/^https:\/\//.test(v))) return `Lien ${k} invalide : il doit commencer par https://`
  }
  return null
}
