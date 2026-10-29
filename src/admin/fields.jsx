import { useId, useRef, useState } from 'react'
import { uploadImage } from './api'

/** Petits composants de formulaire partagés par les écrans de l'admin. */

const inputCls =
  'h-11 w-full rounded-[2px] border border-ink/15 bg-white px-3 text-sm text-ink transition-colors duration-200 focus:border-navy focus:outline-none'

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[11px] font-bold uppercase tracking-[0.14em] text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate">{hint}</span>}
    </label>
  )
}

export function Text({ label, hint, value, onChange, ...rest }) {
  return (
    <Field label={label} hint={hint}>
      <input className={inputCls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...rest} />
    </Field>
  )
}

export function Area({ label, hint, value, onChange, rows = 3 }) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        rows={rows}
        className={`${inputCls} h-auto py-2.5 leading-relaxed`}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  )
}

/** Nombre entier ou décimal ; une saisie vide renvoie `null` quand `nullable`. */
export function NumberInput({ label, hint, value, onChange, nullable, min = 0, step = 1, className = '' }) {
  const input = (
    <input
      type="number"
      inputMode="decimal"
      min={min}
      step={step}
      className={`${inputCls} ${className}`}
      value={value ?? ''}
      onChange={(e) => {
        const raw = e.target.value
        if (raw === '') return onChange(nullable ? null : 0)
        const n = Number(raw)
        if (Number.isFinite(n)) onChange(Math.max(min, step === 1 ? Math.round(n) : n))
      }}
    />
  )
  return label ? <Field label={label} hint={hint}>{input}</Field> : input
}

export function Toggle({ label, checked, onChange }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-sm">
      <span className="relative inline-flex">
        <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="h-6 w-11 rounded-full bg-ink/15 transition-colors duration-300 peer-checked:bg-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform duration-300 ease-brand peer-checked:translate-x-5" />
      </span>
      {label}
    </label>
  )
}

export function Button({ variant = 'dark', className = '', ...rest }) {
  const styles = {
    dark: 'bg-ink text-white hover:bg-navy',
    outline: 'border border-ink/20 text-ink hover:border-ink',
    danger: 'border border-ink/20 text-ink hover:bg-ink hover:text-white',
    ghost: 'text-slate hover:text-ink',
  }
  return (
    <button
      type="button"
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-[2px] px-4 font-display text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 ${styles[variant]} ${className}`}
      {...rest}
    />
  )
}

export function Card({ title, actions, children, className = '' }) {
  return (
    <section className={`rounded-[2px] border border-ink/10 bg-white p-5 sm:p-6 ${className}`}>
      {(title || actions) && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="!text-sm !tracking-[0.14em]">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  )
}

/** Envoi d'une ou plusieurs images ; appelle `onUploaded(url)` pour chacune. */
export function ImageUpload({ onUploaded, multiple, label = 'Ajouter une photo' }) {
  const id = useId()
  const input = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const onFiles = async (files) => {
    setError('')
    setBusy(true)
    try {
      for (const f of files) onUploaded(await uploadImage(f))
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div>
      <input
        ref={input}
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={multiple}
        className="sr-only"
        onChange={(e) => e.target.files.length && onFiles([...e.target.files])}
      />
      <label
        htmlFor={id}
        className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-[2px] border border-dashed border-ink/30 px-4 font-display text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 hover:border-ink ${
          busy ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        {busy ? 'Envoi…' : `+ ${label}`}
      </label>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-ink">
          {error}
        </p>
      )}
    </div>
  )
}

export function Thumb({ src, className = '' }) {
  return src ? (
    <img src={src} alt="" className={`h-full w-full object-cover ${className}`} />
  ) : (
    <span className={`grid h-full w-full place-items-center bg-mist text-[10px] uppercase tracking-[0.14em] text-slate ${className}`}>
      Photo
    </span>
  )
}
