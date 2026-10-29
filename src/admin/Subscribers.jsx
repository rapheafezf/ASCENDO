import { useEffect, useState } from 'react'
import { loadSubscribers, removeSubscriber } from './api'
import { Button, Card } from './fields'

/** Inscrits à la newsletter : consultation, export CSV, désinscription. */

const toCsv = (rows) =>
  ['email,date_inscription', ...rows.map((r) => `${r.email},${r.date.slice(0, 10)}`)].join('\n')

export default function Subscribers({ onAuthError }) {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadSubscribers()
      .then(setRows)
      .catch((e) => {
        if (e.status === 401) onAuthError()
        setError(e.message)
      })
  }, [onAuthError])

  const download = () => {
    const url = URL.createObjectURL(new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' }))
    const a = Object.assign(document.createElement('a'), { href: url, download: `ascendo-inscrits-${new Date().toISOString().slice(0, 10)}.csv` })
    a.click()
    URL.revokeObjectURL(url)
  }

  const remove = async (email) => {
    if (!window.confirm(`Désinscrire ${email} ? L'adresse est supprimée immédiatement.`)) return
    try {
      await removeSubscriber(email)
      setRows((r) => r.filter((x) => x.email !== email))
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <Card
      title={rows ? `${rows.length} inscrit${rows.length > 1 ? 's' : ''} à la newsletter` : 'Newsletter'}
      actions={rows?.length > 0 && <Button variant="outline" onClick={download}>Exporter en CSV</Button>}
    >
      <p className="-mt-2 mb-5 text-sm text-slate">
        Adresses laissées sur le site. Le fichier CSV s'importe dans Brevo, Mailchimp ou Klaviyo pour envoyer l'annonce du lancement.
      </p>
      {error && <p role="alert" className="mb-4 text-sm font-medium">{error}</p>}
      {!rows ? (
        !error && <p className="text-sm text-slate">Chargement…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-slate">Aucun inscrit pour l'instant.</p>
      ) : (
        <ul className="divide-y divide-ink/10">
          {rows.map((r) => (
            <li key={r.email} className="flex items-center justify-between gap-4 py-2.5 text-sm">
              <span className="min-w-0 truncate">{r.email}</span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-slate">{new Date(r.date).toLocaleDateString('fr-FR')}</span>
                <Button variant="ghost" className="!px-2" onClick={() => remove(r.email)} aria-label={`Désinscrire ${r.email}`}>
                  ✕
                </Button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
