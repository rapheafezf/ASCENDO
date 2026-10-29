import { guard, json } from './_lib/auth.js'
import { IMAGE_NAME, readImage } from './_lib/storage.js'

/** Sert une image du store Blob privé. Appelée via la réécriture /uploads/:name (vercel.json). */
export function GET(request) {
  return guard(async () => {
    const name = new URL(request.url).searchParams.get('name') || ''
    if (!IMAGE_NAME.test(name)) return json({ error: 'Image introuvable.' }, 404)
    const res = await readImage(name)
    if (!res) return json({ error: 'Image introuvable.' }, 404)
    // Le nom est unique à chaque envoi : l'image ne change jamais, elle peut rester en cache
    return new Response(res.stream, {
      headers: { 'content-type': res.blob.contentType, 'cache-control': 'public, max-age=31536000, immutable' },
    })
  })
}
