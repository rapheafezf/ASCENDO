/** Appels à l'API admin. Le jeton de session vit dans sessionStorage (fermé avec l'onglet). */
const TOKEN_KEY = 'ascendo-admin-token'

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token)
    else sessionStorage.removeItem(TOKEN_KEY)
  } catch {
    /* stockage indisponible : la session durera le temps de la page */
  }
}

async function request(path, { method = 'GET', body, type } = {}) {
  const token = getToken()
  const res = await fetch(path, {
    method,
    body,
    headers: { ...(type && { 'content-type': type }), ...(token && { authorization: `Bearer ${token}` }) },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.error || `Erreur ${res.status}`), { status: res.status })
  return data
}

export const login = (code) => request('/api/login', { method: 'POST', body: JSON.stringify({ code }), type: 'application/json' })
export const loadContent = () => request('/api/content?fresh=1')
export const saveContent = (content) =>
  request('/api/content', { method: 'PUT', body: JSON.stringify(content), type: 'application/json' })

export const loadSubscribers = () => request('/api/subscribers')
export const removeSubscriber = (email) => request(`/api/subscribers?email=${encodeURIComponent(email)}`, { method: 'DELETE' })

/** Réduit l'image à 1800 px de côté maximum (JPEG) avant l'envoi. */
async function shrink(file, max = 1800) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Image illisible.'))), 'image/jpeg', 0.86),
  )
}

export async function uploadImage(file) {
  const blob = await shrink(file)
  const { url } = await request('/api/upload', { method: 'POST', body: blob, type: blob.type })
  return url
}
