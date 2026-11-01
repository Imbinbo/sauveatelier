import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { CollectionGrid } from '@/components/collection/collection-grid'
import { AmbientVideo } from '@/components/site/ambient-video'
import { Marquee } from '@/components/site/motion'
import { Cta } from '@/components/site/cta'

export const metadata: Metadata = {
  title: 'Collection',
  description: 'Heirloom furniture designed in Paris and handmade to order in the Sauvé Normandy atelier — seating, tables, lighting and storage.',
}

export default function CollectionPage() {
  return (
    <>
      <PageHero
        eyebrow="The Sauvé Collection — Edition 07"
        title={'Made slowly,\nto be _kept._'}
        intro="Designed in Paris and made to order by hand in Normandy. Solid timbers, natural stone and living finishes that deepen with every year of use."
      />
      <div className="relative mx-5 mb-20 aspect-[21/9] overflow-hidden md:mx-10">
        <AmbientVideo src="/videos/fireplace.mp4" poster="/videos/fireplace-poster.jpg" label="Fire burning in a stone hearth" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-6 md:p-10">
          <p className="max-w-lg font-serif text-3xl text-bone md:text-5xl">
            Pieces for the <span className="italic text-clay">long evenings.</span>
          </p>
        </div>
      </div>
      <CollectionGrid />
      <div className="border-y border-border py-8">
        <Marquee
          className="font-serif text-4xl text-ink/80 md:text-6xl"
          items={['Solid walnut', 'Roman travertine', 'Wool bouclé', 'Lost-wax bronze', 'Fluted oak', 'Saddle leather']}
        />
      </div>
      <Cta image="/images/atelier.png" />
    </>
  )
}
