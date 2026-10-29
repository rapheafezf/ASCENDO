import { Area, Button, Card, ImageUpload, NumberInput, Text, Thumb } from './fields'

/** Édition des textes du site et du lookbook. */

/** Photo unique : aperçu, envoi et retrait. */
function SiteImage({ label, hint, value, onChange }) {
  return (
    <div>
      <p className="mb-1.5 font-display text-[11px] font-bold uppercase tracking-[0.14em]">{label}</p>
      <div className="flex items-center gap-3">
        <span className="relative block h-16 w-24 shrink-0 overflow-hidden rounded-[2px] border border-ink/10">
          <Thumb src={value} />
        </span>
        <ImageUpload label={value ? 'Changer' : 'Photo'} onUploaded={onChange} />
        {value && (
          <Button variant="ghost" onClick={() => onChange('')}>
            Retirer
          </Button>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-slate">{hint}</p>}
    </div>
  )
}

export function SiteEditor({ site, onChange }) {
  const set = (key, patch) => onChange({ ...site, [key]: { ...site[key], ...patch } })
  const setStat = (i, patch) => onChange({ ...site, stats: site.stats.map((s, j) => (j === i ? { ...s, ...patch } : s)) })
  const setWord = (i, w) => onChange({ ...site, marquee: site.marquee.map((x, j) => (j === i ? w : x)) })

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Référencement Google">
        <div className="space-y-4">
          <Text label="Titre de l'onglet" value={site.seo.title} onChange={(title) => set('seo', { title })} />
          <Area label="Description Google" hint="150 à 160 caractères conseillés." value={site.seo.description} onChange={(description) => set('seo', { description })} />
        </div>
      </Card>

      <Card title="Bandeau d'annonce">
        <Text label="Texte en haut de page" value={site.announcement} onChange={(announcement) => onChange({ ...site, announcement })} />
      </Card>

      <Card title="Hero (haut de l'accueil)">
        <div className="space-y-4">
          <Text label="Sur-titre" value={site.hero.eyebrow} onChange={(eyebrow) => set('hero', { eyebrow })} />
          <Text label="Titre" value={site.hero.title} onChange={(title) => set('hero', { title })} />
          <Area label="Texte" value={site.hero.text} onChange={(text) => set('hero', { text })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Text label="Bouton principal" value={site.hero.ctaPrimary} onChange={(ctaPrimary) => set('hero', { ctaPrimary })} />
            <Text label="Bouton secondaire" value={site.hero.ctaSecondary} onChange={(ctaSecondary) => set('hero', { ctaSecondary })} />
          </div>
          <SiteImage label="Photo de fond" hint="Assombrie automatiquement pour garder le texte lisible." value={site.hero.image} onChange={(image) => set('hero', { image })} />
        </div>
      </Card>

      <Card
        title="Bandeau défilant"
        actions={
          <Button variant="outline" onClick={() => onChange({ ...site, marquee: [...site.marquee, ''] })}>
            + Mot
          </Button>
        }
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {site.marquee.map((w, i) => (
            <li key={i} className="flex items-end gap-2">
              <span className="flex-1">
                <Text label={`Mot ${i + 1}`} value={w} onChange={(v) => setWord(i, v)} />
              </span>
              <Button variant="ghost" className="!px-2" onClick={() => onChange({ ...site, marquee: site.marquee.filter((_, j) => j !== i) })} aria-label={`Supprimer le mot ${i + 1}`}>
                ✕
              </Button>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Section produits">
        <div className="space-y-4">
          <Text label="Sur-titre" value={site.collection.eyebrow} onChange={(eyebrow) => set('collection', { eyebrow })} />
          <Text label="Titre" value={site.collection.title} onChange={(title) => set('collection', { title })} />
          <Text label="Bouton" value={site.collection.button} onChange={(button) => set('collection', { button })} />
        </div>
      </Card>

      <Card title="Histoire de la marque">
        <div className="space-y-4">
          <Text label="Sur-titre" value={site.editorial.eyebrow} onChange={(eyebrow) => set('editorial', { eyebrow })} />
          <Text label="Titre" value={site.editorial.title} onChange={(title) => set('editorial', { title })} />
          <Area label="Paragraphe 1" rows={4} value={site.editorial.paragraph1} onChange={(paragraph1) => set('editorial', { paragraph1 })} />
          <Area label="Paragraphe 2" rows={4} value={site.editorial.paragraph2} onChange={(paragraph2) => set('editorial', { paragraph2 })} />
          <Text label="Bouton" value={site.editorial.button} onChange={(button) => set('editorial', { button })} />
          <SiteImage label="Photo" value={site.editorial.image} onChange={(image) => set('editorial', { image })} />
        </div>
      </Card>

      <Card title="Chiffres clés">
        <p className="-mt-2 mb-4 text-sm text-slate">N'affichez que des chiffres vrais et vérifiables.</p>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <Text label="Sur-titre" value={site.statsSection.eyebrow} onChange={(eyebrow) => set('statsSection', { eyebrow })} />
          <Text label="Titre" value={site.statsSection.title} onChange={(title) => set('statsSection', { title })} />
        </div>
        <ul className="space-y-4">
          {site.stats.map((s, i) => (
            <li key={i} className="grid grid-cols-[5rem_4.5rem_1fr] items-end gap-3">
              <NumberInput label="Valeur" value={s.value} onChange={(value) => setStat(i, { value })} />
              <Text label="Unité" value={s.suffix} onChange={(suffix) => setStat(i, { suffix })} />
              <Text label="Légende" value={s.label} onChange={(label) => setStat(i, { label })} />
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Newsletter">
        <div className="space-y-4">
          <Text label="Sur-titre" value={site.newsletter.eyebrow} onChange={(eyebrow) => set('newsletter', { eyebrow })} />
          <Text label="Titre" value={site.newsletter.title} onChange={(title) => set('newsletter', { title })} />
          <Area label="Texte" value={site.newsletter.text} onChange={(text) => set('newsletter', { text })} />
          <Text label="Petite ligne sous le champ" value={site.newsletter.note} onChange={(note) => set('newsletter', { note })} />
          <Area label="Message après inscription" rows={2} value={site.newsletter.success} onChange={(success) => set('newsletter', { success })} />
        </div>
      </Card>

      <Card title="Pied de page et contact" className="lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <Area label="Phrase sous le logo" rows={2} value={site.footer.tagline} onChange={(tagline) => set('footer', { tagline })} />
          <Area label="Adresse" hint="Vide = non affichée." rows={2} value={site.footer.address} onChange={(address) => set('footer', { address })} />
          <Text label="E-mail de contact" type="email" value={site.footer.email} onChange={(email) => set('footer', { email })} />
          <Text label="Horaires" value={site.footer.hours} onChange={(hours) => set('footer', { hours })} />
          <Text label="Lien Instagram" type="url" placeholder="https://instagram.com/…" hint="Vide = icône masquée." value={site.footer.instagram} onChange={(instagram) => set('footer', { instagram: instagram.trim() })} />
          <Text label="Lien TikTok" type="url" placeholder="https://tiktok.com/@…" hint="Vide = icône masquée." value={site.footer.tiktok} onChange={(tiktok) => set('footer', { tiktok: tiktok.trim() })} />
          <Text label="Lien YouTube" type="url" placeholder="https://youtube.com/@…" hint="Vide = icône masquée." value={site.footer.youtube} onChange={(youtube) => set('footer', { youtube: youtube.trim() })} />
        </div>
      </Card>
    </div>
  )
}

export function LookbookEditor({ looks, onChange, section, onSection }) {
  const setLook = (i, patch) => onChange(looks.map((l, j) => (j === i ? { ...l, ...patch } : l)))
  const move = (i, dir) => {
    const next = [...looks]
    ;[next[i], next[i + dir]] = [next[i + dir], next[i]]
    onChange(next)
  }

  return (
    <div className="space-y-6">
    <Card title="Titres de la section">
      <div className="grid gap-4 sm:grid-cols-2">
        <Text label="Sur-titre" value={section.eyebrow} onChange={(eyebrow) => onSection({ ...section, eyebrow })} />
        <Text label="Titre" value={section.title} onChange={(title) => onSection({ ...section, title })} />
      </div>
    </Card>
    <Card
      title="Lookbook (6 tuiles sur l'accueil)"
      actions={
        looks.length < 6 && (
          <Button variant="outline" onClick={() => onChange([...looks, { caption: '', image: '' }])}>
            + Ajouter une tuile
          </Button>
        )
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {looks.map((l, i) => (
          <li key={i} className="rounded-[2px] border border-ink/10 p-3">
            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-[2px]">
              <Thumb src={l.image} />
              <span className="absolute left-2 top-2 bg-ink px-1.5 py-0.5 text-[10px] font-bold text-white">0{i + 1}</span>
            </div>
            <Text label="Légende" value={l.caption} onChange={(caption) => setLook(i, { caption })} />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <ImageUpload label={l.image ? 'Changer' : 'Photo'} onUploaded={(image) => setLook(i, { image })} />
              {l.image && (
                <Button variant="ghost" onClick={() => setLook(i, { image: '' })}>
                  Retirer
                </Button>
              )}
              <span className="ml-auto flex gap-1">
                <Button variant="ghost" className="!px-2" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Avancer la tuile">
                  ◀
                </Button>
                <Button variant="ghost" className="!px-2" disabled={i === looks.length - 1} onClick={() => move(i, 1)} aria-label="Reculer la tuile">
                  ▶
                </Button>
                <Button variant="ghost" className="!px-2" onClick={() => onChange(looks.filter((_, j) => j !== i))} aria-label="Supprimer la tuile">
                  ✕
                </Button>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
    </div>
  )
}
