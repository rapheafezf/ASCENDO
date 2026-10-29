/**
 * Contenu par défaut du site.
 * Sert au premier lancement (avant tout enregistrement depuis /admin) et de
 * secours si l'API est injoignable. Partagé entre le site et les fonctions /api.
 */

/** Couleurs proposées — strictement issues de la palette de marque. */
export const COLORS = {
  marine: { label: 'Bleu marine', hex: '#0B1F3A' },
  noir: { label: 'Noir', hex: '#0A0A0A' },
  blanc: { label: 'Blanc', hex: '#FFFFFF' },
  gris: { label: 'Gris clair', hex: '#F4F5F7' },
}

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const CATEGORIES = ['Hoodies']

/** Seuil en dessous duquel une taille est signalée « stock bas » dans l'admin. */
export const LOW_STOCK = 3

export const emptyStock = () => Object.fromEntries(SIZES.map((s) => [s, 0]))

export const DEFAULT_CONTENT = {
  version: 0,
  updatedAt: null,
  site: {
    seo: {
      title: 'ASCENDO — Elevate Yourself | Hoodies mixtes',
      description:
        'ASCENDO, streetwear premium mixte. Des hoodies épais pensés pour elle comme pour lui. Première collection bientôt disponible.',
    },
    // Fermée = pré-lancement : produits présentés « bientôt disponibles », aucun achat possible
    shop: { open: false, comingSoon: 'Bientôt disponible' },
    payments: ['Visa', 'Mastercard', 'Apple Pay'],
    announcement: 'Première collection bientôt disponible • Inscris-toi pour ne pas rater le lancement',
    hero: {
      eyebrow: 'Collection Automne-Hiver',
      title: 'Elevate Yourself',
      text: 'Des hoodies denses, nets et durables. Pensés pour elle comme pour lui, à chaque palier que vous franchissez.',
      ctaPrimary: 'Découvrir les hoodies',
      ctaSecondary: 'Le lookbook',
      image: '',
    },
    marquee: ['ASCENDO', 'RISE', 'ELEVATE', 'PROGRESS'],
    collection: {
      eyebrow: 'Première collection — Automne-Hiver',
      title: 'Les hoodies',
      button: 'Voir tous les hoodies',
    },
    editorial: {
      image: '',
      button: 'Notre histoire',
      eyebrow: 'Ascendo — « je monte »',
      title: 'Chaque marche compte',
      paragraph1:
        "ASCENDO part d'une idée simple : les vêtements qu'on porte pour progresser doivent être aussi exigeants que nous.",
      paragraph2:
        "Nous commençons par une seule pièce, le hoodie, et nous la dessinons bien. Coupe mixte, molleton épais, coutures renforcées. Le reste, c'est à vous de l'écrire.",
    },
    statsSection: { eyebrow: 'En chiffres', title: 'La progression se mesure' },
    stats: [
      { value: 380, suffix: ' g', label: 'Grammage de nos molletons' },
      { value: 100, suffix: ' %', label: 'Coton biologique' },
      { value: 30, suffix: ' j', label: 'Pour changer d’avis' },
      { value: 80, suffix: ' €', label: 'Livraison offerte dès' },
    ],
    lookbookSection: { eyebrow: 'Lookbook', title: 'Hors des sentiers' },
    newsletter: {
      eyebrow: 'Newsletter',
      title: 'Rejoins le mouvement',
      text: 'Laisse ton e-mail : on te prévient dès l’ouverture de la boutique.',
      note: 'Ton e-mail sert uniquement à te prévenir des sorties ASCENDO. Désinscription sur simple demande.',
      success: 'C’est noté. On t’écrit dès l’ouverture de la boutique.',
    },
    footer: {
      tagline: 'Streetwear premium mixte, pensé pour ceux qui avancent.',
      email: 'bonjour@ascendo.fr',
      hours: 'Du lundi au vendredi, 9 h – 18 h',
      address: '',
      instagram: '',
      tiktok: '',
      youtube: '',
    },
  },
  lookbook: [
    { caption: 'Hoodie Summit — Marine', image: '' },
    { caption: 'Hoodie Summit — Noir', image: '' },
    { caption: 'Hoodie Ridge — Zippé', image: '' },
    { caption: 'Coupe mixte', image: '' },
    { caption: 'Molleton 380 g/m²', image: '' },
    { caption: 'Essentiels', image: '' },
  ],
  products: [
    {
      id: 'hoodie-summit-marine',
      name: 'Hoodie Summit',
      color: 'Marine',
      category: 'Hoodies',
      price: 79,
      compareAt: null,
      badge: 'Nouveau',
      colors: ['marine', 'noir', 'gris'],
      images: [],
      description:
        "Notre pièce signature. Coupe mixte légèrement oversize, capuche doublée et poche kangourou renforcée.",
      material: 'Coton 100 % biologique, molleton gratté 380 g/m². Bord-côtes 2×2 avec élasthanne.',
      stock: emptyStock(),
      active: true,
    },
    {
      id: 'hoodie-summit-noir',
      name: 'Hoodie Summit',
      color: 'Noir',
      category: 'Hoodies',
      price: 79,
      compareAt: null,
      badge: 'Nouveau',
      colors: ['noir', 'marine', 'gris'],
      images: [],
      description:
        "Notre pièce signature. Coupe mixte légèrement oversize, capuche doublée et poche kangourou renforcée.",
      material: 'Coton 100 % biologique, molleton gratté 380 g/m². Bord-côtes 2×2 avec élasthanne.',
      stock: emptyStock(),
      active: true,
    },
    {
      id: 'hoodie-summit-gris',
      name: 'Hoodie Summit',
      color: 'Gris clair',
      category: 'Hoodies',
      price: 79,
      compareAt: null,
      badge: null,
      colors: ['gris', 'marine', 'noir'],
      images: [],
      description:
        "Notre pièce signature. Coupe mixte légèrement oversize, capuche doublée et poche kangourou renforcée.",
      material: 'Coton 100 % biologique, molleton gratté 380 g/m². Bord-côtes 2×2 avec élasthanne.',
      stock: emptyStock(),
      active: true,
    },
    {
      id: 'hoodie-ridge-noir',
      name: 'Hoodie Ridge',
      color: 'Noir',
      category: 'Hoodies',
      price: 85,
      compareAt: null,
      badge: null,
      colors: ['noir', 'marine'],
      images: [],
      description: 'Zip intégral, capuche à double épaisseur et poches zippées invisibles. Coupe mixte.',
      material: 'Coton 100 % biologique, molleton gratté 380 g/m². Zip métal mat.',
      stock: emptyStock(),
      active: true,
    },
  ],
}

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v)

/**
 * Complète un contenu enregistré avec les champs ajoutés depuis : un ancien
 * enregistrement reste valide quand de nouveaux textes deviennent éditables.
 */
export function withDefaults(content) {
  const site = { ...DEFAULT_CONTENT.site, ...content?.site }
  for (const [key, value] of Object.entries(DEFAULT_CONTENT.site)) {
    if (isObj(value)) site[key] = { ...value, ...(isObj(content?.site?.[key]) ? content.site[key] : {}) }
  }
  return { ...DEFAULT_CONTENT, ...content, site }
}
