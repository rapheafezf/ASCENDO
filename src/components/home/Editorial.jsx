import { Link } from 'react-router'
import Reveal from '../Reveal'
import Placeholder from '../Placeholder'
import { useContent } from '../../hooks/useContent'

export default function Editorial() {
  const { editorial } = useContent().site
  return (
    <section className="on-dark grid bg-navy text-white lg:grid-cols-2" aria-labelledby="story-title">
      <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[760px]">
        {editorial.image ? (
          <img src={editorial.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <Placeholder tone="ink" />
        )}
      </div>

      <div className="flex items-center px-4 py-24 sm:px-10 lg:px-[clamp(2.5rem,7vw,7.5rem)] lg:py-[140px]">
        <div className="max-w-[520px]">
          <Reveal>
            <p className="eyebrow mb-5 text-white/70">{editorial.eyebrow}</p>
            <h2 id="story-title">{editorial.title}</h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 space-y-5 text-white/80">
            {editorial.paragraph1 && <p>{editorial.paragraph1}</p>}
            {editorial.paragraph2 && <p>{editorial.paragraph2}</p>}
          </Reveal>
          <Reveal delay={220} className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/a-propos" className="btn btn-primary">
              {editorial.button}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
