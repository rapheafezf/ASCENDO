import { guard, isAuthorized, json } from './_lib/auth.js'
import { saveImage } from './_lib/storage.js'

const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' }
// Les fonctions Vercel acceptent 4,5 Mo par requête ; l'admin réduit les images avant envoi
const MAX_BYTES = 4 * 1024 * 1024

export function POST(request) {
  return guard(async () => {
    if (!isAuthorized(request)) return json({ error: 'Session expirée, reconnectez-vous.' }, 401)
    const type = request.headers.get('content-type')?.split(';')[0]
    if (!TYPES[type]) return json({ error: 'Format accepté : JPG, PNG, WebP ou AVIF.' }, 415)
    const buffer = Buffer.from(await request.arrayBuffer())
    if (buffer.length > MAX_BYTES) return json({ error: 'Image trop lourde (4 Mo maximum).' }, 413)
    return json({ url: await saveImage(buffer, type, TYPES[type]) })
  })
}
