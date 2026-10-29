/**
 * Authentification de l'espace admin.
 * Le code n'est jamais envoyé au navigateur : il est comparé côté serveur
 * (variable ADMIN_CODE, 1234 par défaut), qui renvoie un jeton signé de 12 h.
 */
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { StorageError } from './storage.js'

const TTL_MS = 12 * 60 * 60 * 1000

const sha = (s) => createHash('sha256').update(String(s)).digest()

function secret() {
  const s = process.env.ADMIN_SECRET || process.env.BLOB_READ_WRITE_TOKEN
  if (s) return s
  if (process.env.VERCEL) throw new StorageError('ADMIN_SECRET manquant dans les variables Vercel.')
  return 'ascendo-local-dev'
}

const sign = (payload) => createHmac('sha256', secret()).update(payload).digest('base64url')

export function checkCode(code) {
  return timingSafeEqual(sha(code), sha(process.env.ADMIN_CODE || '1234'))
}

export function createToken() {
  const exp = String(Date.now() + TTL_MS)
  return `${exp}.${sign(exp)}`
}

export function isAuthorized(request) {
  const token = (request.headers.get('authorization') || '').replace(/^Bearer /, '')
  const [exp, sig] = token.split('.')
  if (!exp || !sig || Number(exp) < Date.now()) return false
  const expected = Buffer.from(sign(exp))
  const given = Buffer.from(sig)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  })

/** Exécute un handler en convertissant les erreurs en réponses JSON lisibles. */
export async function guard(fn) {
  try {
    return await fn()
  } catch (e) {
    if (e instanceof StorageError) return json({ error: e.message }, 503)
    console.error(e)
    return json({ error: 'Erreur serveur, réessayez.' }, 500)
  }
}
