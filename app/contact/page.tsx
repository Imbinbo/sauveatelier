import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { InquiryForm } from '@/components/contact/inquiry-form'
import { ParallaxImage, Reveal } from '@/components/site/motion'
import { LiveClock } from '@/components/contact/live-clock'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Begin a commission with Sauvé Atelier. Studios in Paris, Milan and New York.',
}

const STUDIOS = [
  { city: 'Paris', zone: 'Europe/Paris', address: '14 Rue de Turenne, 75004', phone: '+33 1 42 71 00 00', image: '/images/atelier.png' },
  { city: 'Milan', zone: 'Europe/Rome', address: 'Via Solferino 22, 20121', phone: '+39 02 6555 0000', image: '/images/project-milan.png' },
  { city: 'New York', zone: 'America/New_York', address: '88 Franklin St, Tribeca 10013', phone: '+1 212 555 0140', image: '/images/project-tribeca.png' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact — Begin a commission" title={"Let's begin\n_together._"} />
      <section className="mx-auto grid max-w-[1600px] gap-16 px-5 pb-28 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Tell us a little about your space and what you imagine for it. Every inquiry is read by a senior designer.
            </p>
            <div className="mt-10 space-y-6 border-t border-border pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">General</p>
                <a href="mailto:studio@sauve-atelier.com" className="mt-1 block font-serif text-2xl hover:text-clay">studio@sauve-atelier.com</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Press</p>
                <a href="mailto:press@sauve-atelier.com" className="mt-1 block font-serif text-2xl hover:text-clay">press@sauve-atelier.com</a>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <InquiryForm />
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-36">
          <h2 className="mb-14 font-serif text-5xl md:text-7xl">
            Our <span className="italic text-clay">studios</span>
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {STUDIOS.map((s, i) => (
              <Reveal key={s.city} delay={i * 0.1}>
                <article className="group">
                  <ParallaxImage src={s.image} alt={`Sauvé ${s.city} studio`} className="aspect-[4/5]" sizes="(min-width:768px) 33vw, 100vw" />
                  <div className="mt-6 flex items-baseline justify-between">
                    <h3 className="font-serif text-4xl">{s.city}</h3>
                    <LiveClock zone={s.zone} />
                  </div>
                  <p className="mt-3 text-muted-foreground">{s.address}</p>
                  <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="mt-1 block text-muted-foreground hover:text-clay">{s.phone}</a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
