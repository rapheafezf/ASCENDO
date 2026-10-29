/**
 * Stockage du contenu et des images.
 * - Sur Vercel : store Vercel Blob privé, connecté au projet (BLOB_STORE_ID,
 *   authentifié par OIDC). Les images sont servies par /api/image via /uploads/….
 * - En local : dossier .data/ à la racine du projet.
 */
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import { del, get, list, put } from '@vercel/blob'
import { DEFAULT_CONTENT, withDefaults } from '../../src/data/defaults.js'

const CONTENT_PATH = 'content.json'
const LOCAL_DIR = path.join(process.cwd(), '.data')

export class StorageError extends Error {}

function backend() {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) return 'blob'
  if (process.env.VERCEL) {
    throw new StorageError('Stockage non configuré : connectez un store Vercel Blob au projet, puis redéployez.')
  }
  return 'local'
}

export async function readContent() {
  return withDefaults(await readRaw())
}

async function readRaw() {
  if (backend() === 'blob') {
    const res = await get(CONTENT_PATH, { access: 'private', useCache: false })
    if (!res || res.statusCode !== 200) return DEFAULT_CONTENT
    return new Response(res.stream).json()
  }
  try {
    return JSON.parse(await readFile(path.join(LOCAL_DIR, CONTENT_PATH), 'utf8'))
  } catch (e) {
    if (e.code === 'ENOENT') return DEFAULT_CONTENT
    throw e
  }
}

export async function writeContent(content) {
  const body = JSON.stringify(content)
  if (backend() === 'blob') {
    await put(CONTENT_PATH, body, {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return
  }
  await mkdir(LOCAL_DIR, { recursive: true })
  await writeFile(path.join(LOCAL_DIR, CONTENT_PATH), body)
}

/** Enregistre une image et renvoie son chemin public (/uploads/…). */
export async function saveImage(buffer, contentType, ext) {
  const name = `${Date.now()}-${randomBytes(6).toString('hex')}.${ext}`
  if (backend() === 'blob') {
    await put(`uploads/${name}`, buffer, { access: 'private', contentType, addRandomSuffix: false })
    return `/uploads/${name}`
  }
  const dir = path.join(LOCAL_DIR, 'uploads')
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, name), buffer)
  return `/uploads/${name}`
}

export const LOCAL_UPLOADS = path.join(LOCAL_DIR, 'uploads')

export const IMAGE_NAME = /^[0-9]+-[a-z0-9]+\.(jpg|png|webp|avif)$/

/** Lit une image du store privé ; null si absente. */
export async function readImage(name) {
  const res = await get(`uploads/${name}`, { access: 'private' })
  return res?.statusCode === 200 ? res : null
}

/**
 * Inscrits à la newsletter : un fichier par adresse, nommé d'après l'adresse
 * encodée. Deux inscriptions simultanées ne peuvent pas s'écraser, et la liste
 * se lit sans ouvrir chaque fichier.
 */
const SUBS = 'subscribers/'
const subKey = (email) => Buffer.from(email).toString('base64url')
const subEmail = (key) => Buffer.from(key, 'base64url').toString()

export async function addSubscriber(email) {
  const key = subKey(email)
  if (backend() === 'blob') {
    await put(`${SUBS}${key}`, '{}', { access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true })
    return
  }
  const dir = path.join(LOCAL_DIR, SUBS)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, key), '{}')
}

export async function listSubscribers() {
  const out = []
  if (backend() === 'blob') {
    let cursor
    do {
      const page = await list({ prefix: SUBS, cursor, limit: 1000 })
      for (const b of page.blobs) out.push({ email: subEmail(b.pathname.slice(SUBS.length)), date: new Date(b.uploadedAt).toISOString() })
      cursor = page.hasMore ? page.cursor : undefined
    } while (cursor)
  } else {
    const dir = path.join(LOCAL_DIR, SUBS)
    const names = await readdir(dir).catch(() => [])
    for (const n of names) out.push({ email: subEmail(n), date: (await stat(path.join(dir, n))).mtime.toISOString() })
  }
  return out.sort((a, b) => b.date.localeCompare(a.date))
}

export async function removeSubscriber(email) {
  const key = subKey(email)
  if (backend() === 'blob') return del(`${SUBS}${key}`)
  await rm(path.join(LOCAL_DIR, SUBS, key), { force: true })
}
