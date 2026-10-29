/**
 * Images de démonstration (Unsplash).
 * Pour passer aux visuels définitifs, remplacer l'identifiant ou la fonction
 * `img()` par le chemin de vos fichiers (ex. `/images/hoodie-summit-1.jpg`).
 */
export const img = (id, w = 800, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}${h ? `&h=${h}` : ''}`

/** Génère un srcset responsive pour une image Unsplash en ratio fixe. */
export const srcSet = (id, ratio, widths = [360, 540, 720, 960, 1280]) =>
  widths.map((w) => `${img(id, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`).join(', ')

/** Couleurs proposées — strictement issues de la palette de marque. */
export const COLORS = {
  marine: { label: 'Bleu marine', hex: '#0B1F3A' },
  noir: { label: 'Noir', hex: '#0A0A0A' },
  blanc: { label: 'Blanc', hex: '#FFFFFF' },
  gris: { label: 'Gris clair', hex: '#F4F5F7' },
}

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const PRODUCTS = [
  {
    id: 'hoodie-summit-marine',
    name: 'Hoodie Summit',
    color: 'Marine',
    category: 'Hoodies',
    gender: 'Unisexe',
    price: 79,
    badge: 'Nouveau',
    colors: ['marine', 'noir', 'gris'],
    images: ['1556821840-3a63f95609a7', '1517841905240-472988babdf9'],
    alt: ['Hoodie Summit vu de dos, capuche relevée', 'Mannequin portant le hoodie Summit sous une veste en jean'],
    description:
      "Notre pièce signature. Coupe légèrement oversize, capuche doublée et poche kangourou renforcée. Pensé pour l'échauffement du matin comme pour la ville le soir.",
    material: 'Coton 100 % biologique, molleton gratté 380 g/m². Bord-côtes 2×2 avec élasthanne pour un maintien durable.',
  },
  {
    id: 't-shirt-apex-noir',
    name: 'T-shirt Apex',
    color: 'Noir',
    category: 'T-shirts',
    gender: 'Homme',
    price: 39,
    badge: 'Nouveau',
    colors: ['noir', 'blanc', 'marine'],
    images: ['1583743814966-8936f5b7be1a', '1503341504253-dff4815485f1'],
    alt: ['T-shirt Apex noir sur cintre', 'Homme portant le t-shirt Apex noir sur fond clair'],
    description:
      "Le t-shirt qui tient sa forme lavage après lavage. Col côtelé resserré, épaules tombantes et longueur étudiée pour se porter rentré ou non.",
    material: 'Jersey de coton 100 % peigné, 240 g/m². Pré-rétréci, sans couture latérale.',
  },
  {
    id: 'pantalon-cargo-altitude',
    name: 'Pantalon Cargo Altitude',
    color: 'Noir',
    category: 'Pantalons',
    gender: 'Homme',
    price: 89,
    badge: null,
    colors: ['noir', 'marine'],
    images: ['1624378439575-d8705ad7ae80', '1544441893-675973e31985'],
    alt: ['Pantalon Cargo Altitude noir posé à plat', 'Pantalon Cargo Altitude porté avec des baskets blanches'],
    description:
      "Six poches, dont deux cargo à soufflet, taille élastiquée avec cordon et chevilles ajustables. La liberté de mouvement d'un jogger, l'allure d'un vrai pantalon.",
    material: 'Twill de coton 98 %, élasthanne 2 %, 320 g/m². Finition déperlante.',
  },
  {
    id: 'veste-zenith',
    name: 'Veste Zenith',
    color: 'Noir',
    category: 'Vestes',
    gender: 'Homme',
    price: 129,
    badge: 'Nouveau',
    colors: ['noir', 'marine'],
    images: ['1551028719-00167b16eac5', '1520975954732-35dd22299614'],
    alt: ['Veste Zenith noire posée sur fond blanc', 'Homme accroupi portant la veste Zenith en ville'],
    description:
      "Une veste structurée au tombé net, fermeture zippée métal mat et col montant. Elle se porte seule à la mi-saison ou sur un hoodie quand le froid s'installe.",
    material: 'Extérieur 100 % polyamide recyclé enduit. Doublure en coton matelassé.',
  },
  {
    id: 't-shirt-apex-blanc',
    name: 'T-shirt Apex',
    color: 'Blanc',
    category: 'T-shirts',
    gender: 'Femme',
    price: 39,
    badge: null,
    colors: ['blanc', 'noir', 'marine'],
    images: ['1521572163474-6864f9cf17ab', '1627225924765-552d49cf47ad'],
    alt: ['T-shirt Apex blanc porté de face', 'T-shirt Apex blanc porté avec un jean'],
    description:
      "La version immaculée de notre essentiel. Un blanc dense, non transparent, avec la même coupe nette que l'Apex noir.",
    material: 'Jersey de coton 100 % peigné, 240 g/m². Pré-rétréci, sans couture latérale.',
  },
  {
    id: 'hoodie-ridge-noir',
    name: 'Hoodie Ridge',
    color: 'Noir',
    category: 'Hoodies',
    gender: 'Homme',
    price: 85,
    badge: null,
    colors: ['noir', 'marine'],
    images: ['1550246140-5119ae4790b8', '1492562080023-ab3db95bfbce'],
    alt: ['Homme assis portant le hoodie Ridge noir', 'Homme souriant portant le hoodie Ridge sous une veste'],
    description:
      'Zip intégral, capuche à double épaisseur et poches zippées invisibles. Le hoodie technique pour ceux qui ne s’arrêtent jamais.',
    material: 'Coton 100 % biologique, molleton gratté 380 g/m². Zip métal mat.',
  },
  {
    id: 'sweat-crest-blanc',
    name: 'Sweat Crest',
    color: 'Blanc cassé',
    category: 'Sweats',
    gender: 'Femme',
    price: 69,
    badge: null,
    colors: ['blanc', 'gris', 'marine'],
    images: ['1620799140408-edc6dcb6d633', '1586790170083-2f9ceadc732d'],
    alt: ['Sweat col rond Crest blanc posé à plat', 'Sweat Crest porté de face'],
    description:
      "Un col rond sans fioritures, brodé ton sur ton d'une flèche discrète à la poitrine. La pièce qui s'accorde avec tout.",
    material: 'Coton 100 %, molleton 380 g/m². Broderie ton sur ton.',
  },
  {
    id: 't-shirt-oversize-peak',
    name: 'T-shirt Oversize Peak',
    color: 'Noir',
    category: 'T-shirts',
    gender: 'Unisexe',
    price: 45,
    badge: null,
    colors: ['noir', 'blanc'],
    images: ['1618354691373-d851c5c3a990', '1618517351616-38fb9c5210c6'],
    alt: ['T-shirt Peak noir sur cintre avec logo circulaire', 'Homme portant le t-shirt oversize Peak noir en plein soleil'],
    description:
      "Coupe boxy, manches mi-longues et sérigraphie circulaire au dos. Le t-shirt qui donne de l'allure sans effort.",
    material: 'Jersey de coton 100 % épais, 280 g/m². Sérigraphie à l’eau.',
  },
  {
    id: 'jean-ascent-brut',
    name: 'Jean Ascent',
    color: 'Brut',
    category: 'Pantalons',
    gender: 'Femme',
    price: 95,
    badge: null,
    colors: ['marine', 'noir'],
    images: ['1542272604-787c3835535d', '1512353087810-25dfcd100962'],
    alt: ['Jean Ascent brut en détail', 'Homme marchant en ville en jean Ascent'],
    description:
      "Coupe droite, taille mi-haute, denim brut qui se patine avec vous. Chaque usure raconte votre progression.",
    material: 'Denim 100 % coton, 13,5 oz. Rivets cuivre mat.',
  },
  {
    id: 'casquette-horizon',
    name: 'Casquette Horizon',
    color: 'Blanc',
    category: 'Accessoires',
    gender: 'Unisexe',
    price: 29,
    badge: null,
    colors: ['blanc', 'noir', 'marine'],
    images: ['1588850561407-ed78c282e89b', '1622445275463-afa2ab738c34'],
    alt: ['Casquette Horizon blanche posée sur fond blanc', 'Homme portant la casquette Horizon'],
    description: 'Six panneaux, visière pré-courbée et réglage à boucle métal. Brodée ASCENDO à l’arrière.',
    material: 'Sergé de coton 100 % lavé. Bandeau intérieur absorbant.',
  },
  {
    id: 'sac-a-dos-ascent',
    name: 'Sac à dos Ascent',
    color: 'Marine',
    category: 'Accessoires',
    gender: 'Unisexe',
    price: 69,
    badge: 'Nouveau',
    colors: ['marine', 'noir'],
    images: ['1553062407-98eeb64c6a62', '1588117305388-c2631a279f82'],
    alt: ['Sac à dos Ascent bleu marine', 'Jeune femme assise en tenue urbaine'],
    description: '22 litres, compartiment ordinateur 16 pouces, poche dorsale anti-vol. Du vestiaire au bureau.',
    material: 'Polyester recyclé 600D enduit, déperlant. Fermetures YKK.',
  },
  {
    id: 'veste-denim-ridge',
    name: 'Veste Denim Ridge',
    color: 'Indigo',
    category: 'Vestes',
    gender: 'Femme',
    price: 95,
    badge: null,
    colors: ['marine', 'noir'],
    images: ['1611312449408-fcece27cdbb7', '1544022613-e87ca75a784a'],
    alt: ['Veste en jean Ridge sur cintre', 'Femme en bonnet portant une veste ample'],
    description: 'Une veste en jean à col velours, coupe légèrement courte. L’intemporel revu par ASCENDO.',
    material: 'Denim 100 % coton, 12 oz. Col en velours côtelé.',
  },
]

export const formatPrice = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
