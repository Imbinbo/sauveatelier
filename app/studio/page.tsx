import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/site/page-hero'
import { AmbientVideo } from '@/components/site/ambient-video'
import { ClipReveal, ParallaxImage, Reveal, ScrollWords } from '@/components/site/motion'
import { Counter } from '@/components/studio/counter'
import { Cta } from '@/components/site/cta'

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Founded in Paris in 2009, Sauvé Atelier is a studio of designers, architects and makers creating quietly extraordinary interiors.',
}

const VALUES = [
  { title: 'Restraint', body: 'We remove until only what matters is left — then make that one thing exceptional.' },
  { title: 'Material honesty', body: 'Real timber, real stone, real linen. Finishes that age, patina and tell the story of a life.' },
  { title: 'Made by hand', body: 'Our own atelier means every bespoke piece is drawn, built and finished by people we know by name.' },
  { title: 'Longevity', body: 'We design for decades, not seasons. The most sustainable room is the one you never redo.' },
]

const TIMELINE = [
  ['2009', 'Élodie Sauvé opens a two-desk studio in Le Marais, Paris.'],
  ['2013', 'The Normandy atelier opens with four master cabinetmakers.'],
  ['2017', 'First hospitality commission — Hotel Alma, Lisbon.'],
  ['2021', 'Launch of the Sauvé furniture collection, Edition 01.'],
  ['2024', 'New studios open in Milan and New York.'],
  ['2025', 'AD100 and Maison & Objet Designer of the Year.'],
]

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="The Studio — Paris, Milan, New York"
        title={'Quietly\n_extraordinary._'}
        intro="A studio of forty-eight designers, architects and makers who believe a home should feel inevitable — as though it could never have been any other way."
      />

      <section className="mx-auto grid max-w-[1600px] gap-10 px-5 md:grid-cols-12 md:px-10">
        <ClipReveal className="relative aspect-[3/4] md:col-span-5">
          <Image src="/images/founder.png" alt="Élodie Sauvé, founder and creative director" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
        </ClipReveal>
        <div className="flex flex-col justify-end gap-10 md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">A note from our founder</p>
          </Reveal>
          <ScrollWords
            className="font-serif text-3xl leading-[1.2] md:text-5xl"
            text="I have always believed the most beautiful rooms are the ones you feel before you see. Light on a limewashed wall. The weight of an oak door. A chair that holds you just _so_"
          />
          <Reveal>
            <p className="font-serif text-2xl italic">Élodie Sauvé</p>
            <p className="text-sm text-muted-foreground">Founder &amp; Creative Director</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-2 gap-y-12 border-y border-border py-12 md:grid-cols-4">
          <Counter to={16} suffix="" label="Years of practice" />
          <Counter to={240} suffix="+" label="Completed interiors" />
          <Counter to={48} suffix="" label="Designers & makers" />
          <Counter to={19} suffix="" label="Countries" />
        </div>
      </section>

      <section className="relative h-[90svh] overflow-hidden">
        <AmbientVideo src="/videos/terrace.mp4" poster="/videos/terrace-poster.jpg" label="Golden hour on a terrace overlooking the sea" />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="relative mx-auto flex h-full max-w-[1600px] items-center px-5 md:px-10">
          <Reveal>
            <h2 className="max-w-4xl font-serif text-5xl leading-none text-bone md:text-8xl text-balance">
              We design for the <span className="italic text-clay">hours</span> you actually live.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="mb-16 text-xs uppercase tracking-[0.3em] text-muted-foreground">What we believe</p>
        </Reveal>
        <div className="grid gap-px overflow-hidden bg-border md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="group bg-background p-8 transition-colors duration-700 hover:bg-card md:p-14">
              <span className="text-sm text-clay">0{i + 1}</span>
              <h3 className="mt-8 font-serif text-4xl transition-all duration-500 group-hover:italic md:text-5xl">{v.title}</h3>
              <p className="mt-4 max-w-md text-muted-foreground">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-serif text-5xl leading-none md:text-7xl">
                Sixteen <span className="italic text-clay">years</span>
              </h2>
              <ParallaxImage src="/images/atelier.png" alt="The Normandy atelier" className="mt-10 aspect-[4/3]" sizes="(min-width:1024px) 40vw, 100vw" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {TIMELINE.map(([year, text], i) => (
              <Reveal key={year} delay={i * 0.05} className="grid grid-cols-[6rem_1fr] gap-6 border-b border-border py-10 md:grid-cols-[9rem_1fr]">
                <span className="font-serif text-4xl text-clay md:text-5xl">{year}</span>
                <p className="pt-2 text-lg">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta image="/images/project-mykonos.png" />
    </>
  )
}
