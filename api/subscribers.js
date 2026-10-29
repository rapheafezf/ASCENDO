import { guard, isAuthorized, json } from './_lib/auth.js'
import { listSubscribers, removeSubscriber } from './_lib/storage.js'

/** Liste des inscrits, réservée à l'admin. */
export function GET(request) {
  return guard(async () => {
    if (!isAuthorized(request)) return json({ error: 'Session expirée, reconnectez-vous.' }, 401)
    return json(await listSubscribers())
  })
}

/** Désinscription d'une adresse (demande de la personne, RGPD). */
export function DELETE(request) {
  return guard(async () => {
    if (!isAuthorized(request)) return json({ error: 'Session expirée, reconnectez-vous.' }, 401)
    const email = new URL(request.url).searchParams.get('email')?.trim().toLowerCase()
    if (!email) return json({ error: 'Adresse manquante.' }, 400)
    await removeSubscriber(email)
    return json({ ok: true })
  })
}
