import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AmbientVideo } from '@/components/site/ambient-video'
import { ClipReveal, ParallaxImage, Reveal } from '@/components/site/motion'

export function AtelierSplit() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ClipReveal className="relative aspect-[3/4]">
            <AmbientVideo
              src="/videos/sketching.mp4"
              poster="/videos/sketching-poster.jpg"
              label="Designer sketching interior concepts by hand"
            />
          </ClipReveal>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Concept studio, Le Marais — every project begins on paper
          </p>
        </div>
        <div className="flex flex-col justify-between gap-12 lg:col-span-7">
          <Reveal>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">(06) — The Atelier</p>
            <h2 className="font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl text-balance">
              Where drawings become <span className="italic text-clay">timber, stone</span> and bronze.
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Thirty-two cabinetmakers, upholsterers and metalworkers work alongside our designers under one roof.
              It means nothing is compromised between idea and object — and every joint is one we would put our name to.
            </p>
            <Link
              href="/studio"
              className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm uppercase tracking-[0.2em] hover:border-clay hover:text-clay"
            >
              Inside the studio <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-5 gap-4">
            <ParallaxImage
              src="/images/atelier.png"
              alt="Craftsman hand-finishing a walnut chair in the Sauvé atelier"
              className="col-span-3 aspect-[4/3]"
              sizes="(min-width:1024px) 30vw, 60vw"
            />
            <ParallaxImage
              src="/images/materials.png"
              alt="Material samples of travertine, oak, bouclé and brass"
              className="col-span-2 mt-16 aspect-[3/4]"
              sizes="(min-width:1024px) 20vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
