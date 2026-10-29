import Seo from '../components/Seo'
import Divider from '../components/Divider'
import Marquee from '../components/Marquee'
import Hero from '../components/home/Hero'
import NewArrivals from '../components/home/NewArrivals'
import Editorial from '../components/home/Editorial'
import Stats from '../components/home/Stats'
import Lookbook from '../components/home/Lookbook'
import Newsletter from '../components/home/Newsletter'
import { totalStock, useContent } from '../hooks/useContent'

// Données structurées produit (schema.org) pour les hoodies mis en avant
const productsLd = (products) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Hoodies ASCENDO',
  itemListElement: products.slice(0, 8).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: `${p.name} ${p.color}`,
      description: p.description,
      brand: { '@type': 'Brand', name: 'ASCENDO' },
      material: p.material,
      audience: { '@type': 'PeopleAudience', suggestedGender: 'unisex' },
      ...(p.images?.[0] && { image: p.images[0] }),
      url: `https://ascendo.fr/produit/${p.id}`,
      offers: {
        '@type': 'Offer',
        price: p.price.toFixed(2),
        priceCurrency: 'EUR',
        availability: totalStock(p) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      },
    },
  })),
})

export default function Home() {
  const { products, site } = useContent()
  return (
    <>
      <Seo
        title={site.seo.title}
        description={site.seo.description}
        jsonLd={productsLd(products)}
      />
      <Hero />
      <div id="marquee">
        <Marquee />
      </div>
      <NewArrivals />
      <Editorial />
      <Stats />
      <Divider className="-mt-12 mb-0 lg:-mt-20" />
      <Lookbook />
      <Newsletter />
    </>
  )
}
