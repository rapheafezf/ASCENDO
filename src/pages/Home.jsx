import Seo from '../components/Seo'
import Divider from '../components/Divider'
import Marquee from '../components/Marquee'
import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import NewArrivals from '../components/home/NewArrivals'
import Editorial from '../components/home/Editorial'
import Stats from '../components/home/Stats'
import Lookbook from '../components/home/Lookbook'
import Newsletter from '../components/home/Newsletter'
import { PRODUCTS } from '../data/products'

// Données structurées produit (schema.org) pour les nouveautés mises en avant
const productsLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Nouveautés ASCENDO',
  itemListElement: PRODUCTS.slice(0, 8).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: `${p.name} ${p.color}`,
      description: p.description,
      brand: { '@type': 'Brand', name: 'ASCENDO' },
      material: p.material,
      url: `https://ascendo.fr/produit/${p.id}`,
      offers: {
        '@type': 'Offer',
        price: p.price.toFixed(2),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    },
  })),
}

export default function Home() {
  return (
    <>
      <Seo
        title="ASCENDO — Elevate Yourself | Streetwear premium"
        description="ASCENDO, streetwear premium minimaliste. Hoodies, t-shirts et pantalons en coton épais 380 g/m². Collection Automne-Hiver. Livraison offerte dès 80 €."
        jsonLd={productsLd}
      />
      <Hero />
      <div id="marquee">
        <Marquee />
      </div>
      <Categories />
      <NewArrivals />
      <Editorial />
      <Stats />
      <Divider className="-mt-12 mb-0 lg:-mt-20" />
      <Lookbook />
      <Newsletter />
    </>
  )
}
