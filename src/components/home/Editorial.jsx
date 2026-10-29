import { Link } from 'react-router'
import Reveal from '../Reveal'
import Placeholder from '../Placeholder'

const IMAGE = '1503341504253-dff4815485f1'

export default function Editorial() {
  return (
    <section className="on-dark grid bg-navy text-white lg:grid-cols-2" aria-labelledby="story-title">
      <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[760px]">
        <Placeholder tone="ink" />
      </div>

      <div className="flex items-center px-4 py-24 sm:px-10 lg:px-[clamp(2.5rem,7vw,7.5rem)] lg:py-[140px]">
        <div className="max-w-[520px]">
          <Reveal>
            <p className="eyebrow mb-5 text-white/70">Ascendo — « je monte »</p>
            <h2 id="story-title">Chaque marche compte</h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 space-y-5 text-white/80">
            <p>
              ASCENDO est né sur une piste d'athlétisme, à 6 h du matin, d'une idée simple : les vêtements qu'on porte
              pour progresser doivent être aussi exigeants que nous.
            </p>
            <p>
              Nous dessinons peu de pièces, mais nous les dessinons bien. Coton biologique de 380 g/m², coutures
              renforcées, coupes testées sur le terrain puis en ville. Le reste, c'est à vous de l'écrire.
            </p>
          </Reveal>
          <Reveal delay={220} className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/a-propos" className="btn btn-primary">
              Notre histoire
            </Link>
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/60">Paris — Porto</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
