import { guard, isAuthorized, json } from './_lib/auth.js'
import { readContent, writeContent } from './_lib/storage.js'
import { validateContent } from './_lib/validate.js'

const MAX_BYTES = 1_000_000

export function GET(request) {
  return guard(async () => {
    const content = await readContent()
    const fresh = new URL(request.url).searchParams.has('fresh')
    // Le site public est servi depuis le cache CDN quelques secondes ; l'admin lit toujours la dernière version
    return json(content, 200, fresh ? {} : { 'cache-control': 'public, s-maxage=10, stale-while-revalidate=60' })
  })
}

export function PUT(request) {
  return guard(async () => {
    if (!isAuthorized(request)) return json({ error: 'Session expirée, reconnectez-vous.' }, 401)
    const raw = await request.text()
    if (raw.length > MAX_BYTES) return json({ error: 'Contenu trop volumineux.' }, 413)

    let body
    try {
      body = JSON.parse(raw)
    } catch {
      return json({ error: 'JSON invalide.' }, 400)
    }
    const error = validateContent(body)
    if (error) return json({ error }, 400)

    // Empêche d'écraser une version enregistrée entre-temps depuis un autre onglet ou appareil
    const current = await readContent()
    if ((current.version ?? 0) !== body.version) {
      return json({ error: 'Le contenu a été modifié ailleurs entre-temps. Rechargez la page avant d’enregistrer.' }, 409)
    }

    const next = { ...body, version: body.version + 1, updatedAt: new Date().toISOString() }
    await writeContent(next)
    return json(next)
  })
}
