import { guard, json } from './_lib/auth.js'
import { addSubscriber } from './_lib/storage.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Inscription publique à la newsletter. */
export function POST(request) {
  return guard(async () => {
    const { email, website } = await request.json().catch(() => ({}))
    // Champ invisible pour les humains : rempli, c'est un robot. On répond comme si tout allait bien.
    if (website) return json({ ok: true })
    const clean = typeof email === 'string' ? email.trim().toLowerCase() : ''
    if (clean.length > 254 || !EMAIL_RE.test(clean)) return json({ error: 'Merci de saisir une adresse e-mail valide.' }, 400)
    await addSubscriber(clean)
    return json({ ok: true })
  })
}
