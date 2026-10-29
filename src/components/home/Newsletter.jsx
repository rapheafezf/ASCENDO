import { useId, useState } from 'react'
import Reveal from '../Reveal'
import { ArrowIcon } from '../Icons'
import { useContent } from '../../hooks/useContent'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Newsletter() {
  const { newsletter } = useContent().site
  const id = useId()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // piège à robots, invisible
  const [status, setStatus] = useState('idle') // idle | busy | error | fail | success

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error')
      return
    }
    setStatus('busy')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      setStatus(res.ok ? 'success' : res.status === 400 ? 'error' : 'fail')
    } catch {
      setStatus('fail')
    }
  }

  return (
    <section className="on-dark section relative overflow-hidden bg-navy text-white" aria-labelledby="nl-title">
      {/* Rappel graphique des lignes ascendantes du hero */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <path d="M-20 560 L300 380 L420 440 L760 200 L880 260 L1460 -20" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1.5" />
        <path d="M-20 640 L380 420 L500 480 L860 240 L980 300 L1460 60" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1.5" />
      </svg>

      <div className="container-brand relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 text-white/70">{newsletter.eyebrow}</p>
          <h2 id="nl-title">{newsletter.title}</h2>
          <p className="mt-5 text-white/80">{newsletter.text}</p>

          {status === 'success' ? (
            <p role="status" className="mx-auto mt-10 max-w-lg border border-white/30 px-6 py-5 font-display text-sm font-bold uppercase tracking-[0.14em]">
              {newsletter.success}
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mx-auto mt-10 max-w-lg">
              <div className="relative flex flex-col gap-3 sm:flex-row">
                <label htmlFor={`${id}-email`} className="sr-only">
                  Adresse e-mail
                </label>
                <input
                  id={`${id}-email`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="ton@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error' || status === 'fail') setStatus('idle')
                  }}
                  aria-invalid={status === 'error'}
                  aria-describedby={`${id}-msg`}
                  className="h-[52px] flex-1 rounded-[2px] border border-white/40 bg-transparent px-5 text-white placeholder:text-white/50 transition-colors duration-300 focus:border-white focus:outline-none focus-visible:outline-2 focus-visible:outline-white aria-[invalid=true]:border-white"
                />
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />
                <button type="submit" disabled={status === 'busy'} className="btn btn-primary group disabled:opacity-60">
                  {status === 'busy' ? 'Envoi…' : "S'inscrire"}
                  <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                </button>
              </div>
              <p id={`${id}-msg`} className="mt-4 min-h-[1.6em] text-sm text-white/70" aria-live="polite">
                {status === 'error' ? (
                  <span className="font-medium text-white">Merci de saisir une adresse e-mail valide.</span>
                ) : status === 'fail' ? (
                  <span className="font-medium text-white">L'inscription n'a pas abouti. Réessaie dans un instant.</span>
                ) : (
                  newsletter.note
                )}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
