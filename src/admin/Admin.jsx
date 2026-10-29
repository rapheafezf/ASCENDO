import { useCallback, useEffect, useState } from 'react'
import Seo from '../components/Seo'
import { getToken, loadContent, login, saveContent, setToken } from './api'
import { Button } from './fields'
import { Dashboard, ProductEditor, ProductList, StockTable, newProduct } from './Products'
import { LookbookEditor, SiteEditor } from './ContentEditor'

/**
 * Espace d'administration (/admin, ou /.admin sur Vercel).
 * Les modifications restent locales jusqu'au clic sur « Enregistrer ».
 */

const TABS = [
  ['dashboard', 'Tableau de bord'],
  ['products', 'Produits'],
  ['stock', 'Stock'],
  ['site', 'Textes du site'],
  ['lookbook', 'Lookbook'],
]

function Login({ onSuccess }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const { token } = await login(code)
      setToken(token)
      onSuccess()
    } catch (err) {
      setError(err.message)
      setCode('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="on-dark grid min-h-svh place-items-center bg-navy px-4 text-white">
      <form onSubmit={submit} className="w-full max-w-xs text-center">
        <p className="eyebrow mb-3 text-white/60">ASCENDO</p>
        <h1 className="!text-3xl">Admin</h1>
        <label htmlFor="admin-code" className="mt-10 block text-sm text-white/80">
          Code d'accès
        </label>
        <input
          id="admin-code"
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-invalid={!!error}
          aria-describedby="admin-code-msg"
          className="mt-3 h-[52px] w-full rounded-[2px] border border-white/40 bg-transparent text-center font-display text-2xl tracking-[0.5em] text-white focus:border-white focus:outline-none"
        />
        <p id="admin-code-msg" role="alert" className="mt-3 min-h-[1.5em] text-sm font-medium">
          {error}
        </p>
        <button type="submit" disabled={busy || !code} className="btn btn-primary mt-4 w-full disabled:opacity-50">
          {busy ? 'Vérification…' : 'Entrer'}
        </button>
      </form>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => !!getToken())
  const [saved, setSaved] = useState(null) // dernière version enregistrée
  const [draft, setDraft] = useState(null) // version en cours d'édition
  const [tab, setTab] = useState('dashboard')
  const [editing, setEditing] = useState(null) // id du produit ouvert
  const [status, setStatus] = useState({ type: 'idle', msg: '' })

  const dirty = saved && draft && JSON.stringify(saved) !== JSON.stringify(draft)

  const logout = useCallback(() => {
    setToken(null)
    setAuthed(false)
  }, [])

  useEffect(() => {
    if (!authed) return
    loadContent()
      .then((c) => {
        setSaved(c)
        setDraft(c)
      })
      .catch((e) => setStatus({ type: 'error', msg: e.message }))
  }, [authed])

  // Prévient avant de quitter la page avec des modifications non enregistrées
  useEffect(() => {
    if (!dirty) return
    const onLeave = (e) => e.preventDefault()
    window.addEventListener('beforeunload', onLeave)
    return () => window.removeEventListener('beforeunload', onLeave)
  }, [dirty])

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />

  const save = async () => {
    setStatus({ type: 'busy', msg: 'Enregistrement…' })
    try {
      const next = await saveContent(draft)
      setSaved(next)
      setDraft(next)
      setStatus({ type: 'ok', msg: 'Enregistré. Le site est à jour.' })
    } catch (e) {
      if (e.status === 401) logout()
      setStatus({ type: 'error', msg: e.message })
    }
  }

  const updateProduct = (id, next) => {
    setDraft((d) => ({ ...d, products: d.products.map((p) => (p.id === id ? next : p)) }))
    if (next.id !== id) setEditing(next.id)
  }
  const addProduct = (base) => {
    const p = base
      ? { ...base, id: newProduct(draft.products).id, name: `${base.name} (copie)`, active: false }
      : newProduct(draft.products)
    setDraft((d) => ({ ...d, products: [...d.products, p] }))
    setTab('products')
    setEditing(p.id)
  }
  const removeProduct = (id) => {
    setDraft((d) => ({ ...d, products: d.products.filter((p) => p.id !== id) }))
    setEditing(null)
  }
  const moveProduct = (i, dir) =>
    setDraft((d) => {
      const products = [...d.products]
      ;[products[i], products[i + dir]] = [products[i + dir], products[i]]
      return { ...d, products }
    })

  const open = (id) => {
    setTab('products')
    setEditing(id)
  }
  const current = editing && draft?.products.find((p) => p.id === editing)

  return (
    <div className="min-h-svh bg-mist text-ink">
      <Seo title="Admin | ASCENDO" />
      <header className="on-dark sticky top-0 z-40 bg-navy text-white">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <a href="/" className="font-display text-sm font-extrabold tracking-[0.2em]" target="_blank" rel="noreferrer">
            ASCENDO <span className="font-bold text-white/50">ADMIN</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-white/70 sm:inline" aria-live="polite">
              {dirty ? 'Modifications non enregistrées' : status.type === 'ok' ? status.msg : ''}
            </span>
            <button
              type="button"
              onClick={save}
              disabled={!dirty || status.type === 'busy'}
              className="h-10 rounded-[2px] bg-white px-5 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-opacity disabled:opacity-40"
            >
              {status.type === 'busy' ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button type="button" onClick={logout} className="h-10 px-2 text-xs uppercase tracking-[0.14em] text-white/70 hover:text-white">
              Quitter
            </button>
          </div>
        </div>
        <nav aria-label="Sections de l'admin" className="mx-auto max-w-[1320px] overflow-x-auto px-4 sm:px-6 lg:px-10">
          <ul className="flex gap-6">
            {TABS.map(([key, label]) => (
              <li key={key}>
                <button
                  type="button"
                  aria-current={tab === key ? 'page' : undefined}
                  onClick={() => {
                    setTab(key)
                    setEditing(null)
                  }}
                  className={`h-11 whitespace-nowrap border-b-2 font-display text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    tab === key ? 'border-white text-white' : 'border-transparent text-white/60 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-10">
        {status.type === 'error' && (
          <div role="alert" className="mb-6 flex items-center justify-between gap-4 rounded-[2px] border border-ink bg-white px-4 py-3 text-sm">
            <span>{status.msg}</span>
            <Button variant="ghost" onClick={() => setStatus({ type: 'idle', msg: '' })}>
              Fermer
            </Button>
          </div>
        )}

        {!draft ? (
          status.type !== 'error' && <p className="text-sm text-slate">Chargement…</p>
        ) : tab === 'dashboard' ? (
          <Dashboard products={draft.products} onOpen={open} goTo={setTab} />
        ) : tab === 'products' && current ? (
          <ProductEditor
            product={current}
            allIds={draft.products.map((p) => p.id)}
            onChange={updateProduct}
            onDelete={() => removeProduct(current.id)}
            onDuplicate={() => addProduct(current)}
            onBack={() => setEditing(null)}
          />
        ) : tab === 'products' ? (
          <ProductList products={draft.products} onOpen={open} onAdd={() => addProduct()} onMove={moveProduct} />
        ) : tab === 'stock' ? (
          <StockTable products={draft.products} onChange={updateProduct} />
        ) : tab === 'site' ? (
          <SiteEditor site={draft.site} onChange={(site) => setDraft((d) => ({ ...d, site }))} />
        ) : (
          <LookbookEditor
            looks={draft.lookbook}
            onChange={(lookbook) => setDraft((d) => ({ ...d, lookbook }))}
            section={draft.site.lookbookSection}
            onSection={(lookbookSection) => setDraft((d) => ({ ...d, site: { ...d.site, lookbookSection } }))}
          />
        )}

        {draft?.updatedAt && (
          <p className="mt-10 text-xs text-slate">
            Dernier enregistrement : {new Date(draft.updatedAt).toLocaleString('fr-FR')} · version {draft.version}
          </p>
        )}
      </main>
    </div>
  )
}
