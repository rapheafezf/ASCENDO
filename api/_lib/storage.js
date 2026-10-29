/**
 * Stockage du contenu et des images.
 * - Sur Vercel : Vercel Blob (variable BLOB_READ_WRITE_TOKEN ajoutée en
 *   connectant un store Blob au projet).
 * - En local : dossier .data/ à la racine du projet.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { get, put } from '@vercel/blob'
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
    const res = await get(CONTENT_PATH, { access: 'public', useCache: false })
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
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    })
    return
  }
  await mkdir(LOCAL_DIR, { recursive: true })
  await writeFile(path.join(LOCAL_DIR, CONTENT_PATH), body)
}

/** Enregistre une image et renvoie son URL publique. */
export async function saveImage(buffer, contentType, ext) {
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  if (backend() === 'blob') {
    const blob = await put(`uploads/${name}`, buffer, { access: 'public', contentType, addRandomSuffix: true })
    return blob.url
  }
  const dir = path.join(LOCAL_DIR, 'uploads')
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, name), buffer)
  return `/uploads/${name}`
}

export const LOCAL_UPLOADS = path.join(LOCAL_DIR, 'uploads')
