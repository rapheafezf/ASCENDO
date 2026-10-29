import { COLORS, LOW_STOCK, SIZES } from '../data/defaults'
import { formatPrice } from '../data/products'
import { totalStock } from '../hooks/useContent'
import { Area, Button, Card, Field, ImageUpload, NumberInput, Text, Thumb, Toggle } from './fields'

/** Tableau de bord, liste et fiche produit, gestion du stock. */

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)

export function newProduct(existing) {
  const base = 'nouveau-hoodie'
  let id = base
  for (let i = 2; existing.some((p) => p.id === id); i++) id = `${base}-${i}`
  return {
    id,
    name: 'Nouveau hoodie',
    color: '',
    category: 'Hoodies',
    price: 79,
    compareAt: null,
    badge: 'Nouveau',
    colors: ['noir'],
    images: [],
    description: '',
    material: '',
    stock: Object.fromEntries(SIZES.map((s) => [s, 0])),
    active: false,
  }
}

function StockPill({ n }) {
  const cls = n === 0 ? 'bg-ink text-white' : n <= LOW_STOCK ? 'bg-slate text-white' : 'bg-mist text-ink'
  return <span className={`inline-block min-w-8 rounded-[2px] px-2 py-0.5 text-center text-xs font-bold ${cls}`}>{n}</span>
}

export function Dashboard({ products, onOpen, goTo }) {
  const units = products.reduce((n, p) => n + totalStock(p), 0)
  const value = products.reduce((n, p) => n + totalStock(p) * p.price, 0)
  const online = products.filter((p) => p.active).length
  const alerts = products.flatMap((p) =>
    SIZES.filter((s) => (p.stock[s] ?? 0) <= LOW_STOCK).map((s) => ({ p, size: s, n: p.stock[s] ?? 0 })),
  )

  const tiles = [
    ['Produits en ligne', `${online} / ${products.length}`],
    ['Pièces en stock', units.toLocaleString('fr-FR')],
    ['Valeur du stock', formatPrice(value)],
    ['Tailles à réassortir', alerts.length],
  ]

  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {tiles.map(([label, v]) => (
          <li key={label} className="rounded-[2px] border border-ink/10 bg-white p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-slate">{label}</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-navy">{v}</p>
          </li>
        ))}
      </ul>

      <Card title={`Stock bas (${LOW_STOCK} pièces ou moins)`} actions={<Button variant="outline" onClick={() => goTo('stock')}>Gérer le stock</Button>}>
        {alerts.length === 0 ? (
          <p className="text-sm text-slate">Toutes les tailles ont plus de {LOW_STOCK} pièces.</p>
        ) : (
          <ul className="divide-y divide-ink/10">
            {alerts.map(({ p, size, n }) => (
              <li key={`${p.id}-${size}`} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <button type="button" className="text-left hover:underline" onClick={() => onOpen(p.id)}>
                  {p.name} {p.color} <span className="text-slate">· taille {size}</span>
                </button>
                <span className="flex items-center gap-2">
                  {n === 0 && <span className="text-xs uppercase tracking-[0.1em] text-slate">Rupture</span>}
                  <StockPill n={n} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}

export function ProductList({ products, onOpen, onAdd, onMove }) {
  return (
    <Card title={`${products.length} produit${products.length > 1 ? 's' : ''}`} actions={<Button onClick={onAdd}>+ Nouveau produit</Button>}>
      {products.length === 0 && <p className="text-sm text-slate">Aucun produit. Ajoutez votre premier hoodie.</p>}
      <ul className="divide-y divide-ink/10">
        {products.map((p, i) => (
          <li key={p.id} className="flex items-center gap-4 py-3">
            <span className="flex flex-col">
              <button type="button" className="px-1 text-slate hover:text-ink disabled:opacity-20" disabled={i === 0} onClick={() => onMove(i, -1)} aria-label={`Monter ${p.name}`}>
                ▲
              </button>
              <button type="button" className="px-1 text-slate hover:text-ink disabled:opacity-20" disabled={i === products.length - 1} onClick={() => onMove(i, 1)} aria-label={`Descendre ${p.name}`}>
                ▼
              </button>
            </span>
            <span className="relative block h-16 w-12 shrink-0 overflow-hidden rounded-[2px]">
              <Thumb src={p.images[0]} />
            </span>
            <button type="button" onClick={() => onOpen(p.id)} className="min-w-0 flex-1 text-left">
              <span className="block truncate font-display text-[13px] font-bold uppercase tracking-[0.1em]">
                {p.name} {p.color && <span className="text-slate">— {p.color}</span>}
              </span>
              <span className="mt-0.5 block text-sm text-slate">
                {formatPrice(p.price)} · {totalStock(p)} en stock
              </span>
            </button>
            <span className={`hidden rounded-[2px] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] sm:inline ${p.active ? 'bg-navy text-white' : 'bg-mist text-slate'}`}>
              {p.active ? 'En ligne' : 'Masqué'}
            </span>
            <Button variant="outline" onClick={() => onOpen(p.id)}>
              Modifier
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function StockTable({ products, onChange }) {
  const setQty = (p, size, n) => onChange(p.id, { ...p, stock: { ...p.stock, [size]: n } })

  return (
    <Card title="Stock par taille">
      <p className="-mt-2 mb-5 text-sm text-slate">
        Saisissez les quantités restantes, puis cliquez sur « Enregistrer ». En noir : rupture. En gris : {LOW_STOCK} pièces ou moins.
      </p>
      <div className="-mx-5 overflow-x-auto px-5 sm:-mx-6 sm:px-6">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left font-display text-[11px] uppercase tracking-[0.14em]">
              <th className="py-3 pr-4">Produit</th>
              {SIZES.map((s) => (
                <th key={s} className="px-1 py-3 text-center">
                  {s}
                </th>
              ))}
              <th className="py-3 pl-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-ink/10">
                <th scope="row" className="py-3 pr-4 text-left font-normal">
                  <span className="block font-medium">{p.name}</span>
                  <span className="text-slate">{p.color}</span>
                </th>
                {SIZES.map((s) => {
                  const n = p.stock[s] ?? 0
                  const tone = n === 0 ? 'border-ink bg-ink text-white' : n <= LOW_STOCK ? 'border-slate bg-slate text-white' : ''
                  return (
                    <td key={s} className="px-1 py-3">
                      <label className="sr-only" htmlFor={`stk-${p.id}-${s}`}>
                        {p.name} {p.color}, taille {s}
                      </label>
                      <span className="flex justify-center">
                        <NumberInput className={`!h-10 !w-16 text-center ${tone}`} value={n} onChange={(v) => setQty(p, s, v)} />
                      </span>
                    </td>
                  )
                })}
                <td className="py-3 pl-3 text-right font-display font-bold">{totalStock(p)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export function ProductEditor({ product, allIds, onChange, onDelete, onDuplicate, onBack }) {
  const set = (patch) => onChange(product.id, { ...product, ...patch })
  const toggleColor = (c) =>
    set({ colors: product.colors.includes(c) ? product.colors.filter((x) => x !== c) : [...product.colors, c] })
  const moveImage = (i, dir) => {
    const images = [...product.images]
    ;[images[i], images[i + dir]] = [images[i + dir], images[i]]
    set({ images })
  }
  const idTaken = allIds.filter((id) => id === product.id).length > 1

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack} className="!px-0">
          ← Tous les produits
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onDuplicate}>
            Dupliquer
          </Button>
          <Button
            variant="danger"
            onClick={() => window.confirm(`Supprimer « ${product.name} ${product.color} » ? Cette action prend effet à l'enregistrement.`) && onDelete()}
          >
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card title="Informations">
            <div className="grid gap-4 sm:grid-cols-2">
              <Text label="Nom" value={product.name} onChange={(name) => set({ name })} />
              <Text label="Coloris affiché" hint="Ex. Marine, Noir, Gris clair" value={product.color} onChange={(color) => set({ color })} />
              <Text
                label="Identifiant (URL)"
                hint={idTaken ? 'Déjà utilisé par un autre produit.' : `ascendo.fr/produit/${product.id}`}
                value={product.id}
                onChange={(v) => onChange(product.id, { ...product, id: slugify(v) })}
              />
              <Text label="Badge" hint="Ex. Nouveau, Édition limitée. Vide = aucun." value={product.badge ?? ''} onChange={(v) => set({ badge: v.trim() ? v : null })} />
            </div>
            <div className="mt-4 space-y-4">
              <Area label="Description" rows={4} value={product.description} onChange={(description) => set({ description })} />
              <Area label="Matière et entretien" rows={2} value={product.material} onChange={(material) => set({ material })} />
            </div>
          </Card>

          <Card title="Photos" actions={<ImageUpload multiple label="Ajouter des photos" onUploaded={(url) => set({ images: [...product.images, url] })} />}>
            {product.images.length === 0 ? (
              <p className="text-sm text-slate">
                Aucune photo : le site affiche un bloc aux couleurs de la marque. La 1re photo est l'image principale, la 2e apparaît au survol.
              </p>
            ) : (
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {product.images.map((src, i) => (
                  <li key={src} className="group relative aspect-[3/4] overflow-hidden rounded-[2px] border border-ink/10">
                    <Thumb src={src} />
                    {i === 0 && <span className="absolute left-1.5 top-1.5 bg-ink px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">Principale</span>}
                    <span className="absolute inset-x-0 bottom-0 flex justify-between bg-white/95 p-1 text-xs">
                      <button type="button" className="px-1.5 disabled:opacity-20" disabled={i === 0} onClick={() => moveImage(i, -1)} aria-label="Déplacer à gauche">
                        ◀
                      </button>
                      <button type="button" className="px-1.5 font-bold" onClick={() => set({ images: product.images.filter((_, j) => j !== i) })} aria-label="Retirer la photo">
                        ✕
                      </button>
                      <button type="button" className="px-1.5 disabled:opacity-20" disabled={i === product.images.length - 1} onClick={() => moveImage(i, 1)} aria-label="Déplacer à droite">
                        ▶
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Publication">
            <Toggle label={product.active ? 'Visible sur le site' : 'Masqué du site'} checked={product.active} onChange={(active) => set({ active })} />
          </Card>

          <Card title="Prix">
            <div className="grid grid-cols-2 gap-4">
              <NumberInput label="Prix (€)" step={0.01} value={product.price} onChange={(price) => set({ price })} />
              <NumberInput
                label="Prix barré (€)"
                hint="Uniquement pour une vraie promo."
                nullable
                step={0.01}
                value={product.compareAt}
                onChange={(compareAt) => set({ compareAt })}
              />
            </div>
          </Card>

          <Card title={`Stock · ${totalStock(product)} pièces`}>
            <div className="grid grid-cols-3 gap-3">
              {SIZES.map((s) => (
                <NumberInput key={s} label={s} value={product.stock[s] ?? 0} onChange={(n) => set({ stock: { ...product.stock, [s]: n } })} />
              ))}
            </div>
          </Card>

          <Card title="Pastilles de couleur">
            <Field label="Coloris proposés">
              <div className="flex flex-wrap gap-2">
                {Object.entries(COLORS).map(([key, c]) => {
                  const on = product.colors.includes(key)
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleColor(key)}
                      className={`flex h-10 items-center gap-2 rounded-[2px] border px-3 text-sm transition-colors ${on ? 'border-ink' : 'border-ink/15 text-slate'}`}
                    >
                      <span className="h-4 w-4 rounded-full border border-slate/40" style={{ background: c.hex }} />
                      {c.label}
                    </button>
                  )
                })}
              </div>
            </Field>
          </Card>
        </div>
      </div>
    </div>
  )
}
