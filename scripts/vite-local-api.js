/**
 * Fait tourner les fonctions de /api et sert les images envoyées (.data/uploads)
 * avec `vite` et `vite preview`, comme le fera Vercel en production.
 */
import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp', avif: 'image/avif' }

async function handle(req, res, next) {
  const url = new URL(req.url, 'http://localhost')

  if (url.pathname.startsWith('/uploads/')) {
    const name = path.basename(decodeURIComponent(url.pathname))
    const file = path.join(process.cwd(), '.data', 'uploads', name)
    if (!existsSync(file)) return next()
    res.setHeader('content-type', MIME[name.split('.').pop()] || 'application/octet-stream')
    return createReadStream(file).pipe(res)
  }

  const match = url.pathname.match(/^\/api\/([a-z-]+)$/)
  if (!match) return next()
  const file = path.resolve('api', `${match[1]}.js`)
  if (!existsSync(file)) return next()

  const mod = await import(pathToFileURL(file).href)
  const fn = mod[req.method]
  if (!fn) {
    res.statusCode = 405
    return res.end()
  }

  const chunks = []
  for await (const c of req) chunks.push(c)
  const headers = Object.entries(req.headers).filter(([k]) => !k.startsWith(':'))
  const request = new Request(url.href, {
    method: req.method,
    headers,
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
  })

  const response = await fn(request)
  res.statusCode = response.status
  response.headers.forEach((v, k) => res.setHeader(k, v))
  res.end(Buffer.from(await response.arrayBuffer()))
}

export default function localApi() {
  const middleware = (req, res, next) =>
    handle(req, res, next).catch((e) => {
      console.error(e)
      res.statusCode = 500
      res.end('Erreur API locale')
    })
  return {
    name: 'ascendo-local-api',
    // Corps entre accolades : une valeur renvoyée serait prise pour un hook « post » par Vite
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}
