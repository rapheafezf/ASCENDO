import { useEffect } from 'react'

/** Met à jour title, meta description et données structurées propres à la page. */
export default function Seo({ title, description, jsonLd }) {
  useEffect(() => {
    document.title = title
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
  }, [title, description])

  return jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null
}
