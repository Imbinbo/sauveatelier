import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { ServicesList } from '@/components/home/services-list'
import { Process } from '@/components/services/process'
import { AmbientVideo } from '@/components/site/ambient-video'
import { ClipReveal, Reveal } from '@/components/site/motion'
import { Cta } from '@/components/site/cta'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Interior architecture, full-service interiors, bespoke furniture and hospitality design — one studio, from first sketch to final installation.',
}

const ENGAGEMENTS = [
  { name: 'Consultation', price: 'From $2,500', items: ['Half-day on-site session', 'Spatial & light study', 'Material direction', 'Written recommendations'] },
  { name: 'Design Concept', price: 'From $18,000', items: ['Full concept & mood', 'Floor plans & elevations', 'Furniture & lighting schedule', 'Procurement handover'], featured: true },
  { name: 'Turnkey Interior', price: 'Bespoke fee', items: ['Architecture to styling', 'Bespoke atelier pieces', 'Project management', 'Installation & reveal day'] },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services — What we do"
        title={'Design, made\n_whole._'}
        intro="We work across scales — a single room, a family estate, a forty-key hotel — but always the same way: closely, carefully, and with every discipline under one roof."
      />
      <div className="relative mx-5 aspect-[16/9] overflow-hidden md:mx-10 md:aspect-[21/9]">
        <ClipReveal className="absolute inset-0">
          <AmbientVideo src="/videos/swatches.mp4" poster="/videos/swatches-poster.jpg" label="Designer reviewing colour swatches" />
        </ClipReveal>
      </div>
      <ServicesList />
      <Process />
      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">Ways to engage</p>
          <h2 className="mb-16 max-w-3xl font-serif text-5xl leading-none tracking-tight md:text-7xl text-balance">
            Begin where it <span className="italic text-clay">feels right.</span>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {ENGAGEMENTS.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.1}>
              <article
                className={`flex h-full flex-col justify-between gap-12 rounded-sm p-8 transition-transform duration-700 hover:-translate-y-2 md:p-10 ${
                  e.featured ? 'bg-ink text-bone' : 'bg-card'
                }`}
              >
                <div>
                  <p className={`text-xs uppercase tracking-[0.25em] ${e.featured ? 'text-bone/60' : 'text-muted-foreground'}`}>0{i + 1}</p>
                  <h3 className="mt-6 font-serif text-4xl">{e.name}</h3>
                  <p className={`mt-2 ${e.featured ? 'text-clay' : 'text-clay'}`}>{e.price}</p>
                </div>
                <ul className="space-y-3">
                  {e.items.map((it) => (
                    <li key={it} className={`border-t pt-3 text-sm ${e.featured ? 'border-bone/15' : 'border-border'}`}>
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <Cta image="/images/project-kyoto.png" />
    </>
  )
}
