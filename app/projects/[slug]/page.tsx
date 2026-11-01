import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { projects, products } from '@/lib/data'
import { ParallaxImage, Reveal, ScrollWords, SplitHeading } from '@/components/site/motion'
import { ProjectHero } from '@/components/projects/project-hero'
import { ProductCard } from '@/components/site/product-card'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = projects.find((x) => x.slug === slug)
  return p ? { title: p.title, description: p.summary } : {}
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const gallery = projects.filter((p) => p.slug !== slug).slice(0, 2)
  const pieces = products.slice(index % 4, (index % 4) + 3)

  return (
    <>
      <ProjectHero project={project} />

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <dl className="mb-24 grid grid-cols-2 gap-8 border-y border-border py-8 md:grid-cols-4">
          {[
            ['Location', project.location],
            ['Year', project.year],
            ['Typology', project.type],
            ['Area', project.area],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{k}</dt>
              <dd className="mt-2 font-serif text-2xl md:text-3xl">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground lg:col-span-3">The brief</p>
          <ScrollWords
            className="font-serif text-3xl leading-[1.15] md:text-5xl lg:col-span-9 text-balance"
            text={`${project.summary} We began with the light — studying how it moved through each room across a full year — and let it decide where people would gather, rest and _linger_`}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-6 px-5 md:grid-cols-12 md:px-10">
        <ParallaxImage
          src="/images/materials.png"
          alt="Material palette for the project"
          className="aspect-[4/5] md:col-span-5"
          sizes="(min-width:768px) 40vw, 100vw"
        />
        <div className="flex flex-col justify-between gap-10 md:col-span-6 md:col-start-7">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl">
              Palette &amp; <span className="italic text-clay">materials</span>
            </h2>
            <div className="mt-10 flex gap-3">
              {project.palette.map((c) => (
                <div key={c} className="flex-1">
                  <div className="aspect-[2/3] rounded-sm" style={{ backgroundColor: c }} />
                  <p className="mt-2 font-mono text-xs uppercase text-muted-foreground">{c}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="divide-y divide-border border-y border-border">
              {project.materials.map((m, i) => (
                <li key={m} className="flex items-baseline justify-between py-4">
                  <span className="font-serif text-2xl">{m}</span>
                  <span className="text-xs text-muted-foreground">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <ParallaxImage src={project.image} alt={`${project.title} detail view`} className="aspect-[16/9]" strength={8} />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {gallery.map((g) => (
            <ParallaxImage
              key={g.slug}
              src={g.image}
              alt={`Related interior, ${g.title}`}
              className="aspect-[4/3]"
              sizes="(min-width:768px) 50vw, 100vw"
            />
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex items-end justify-between">
            <SplitHeading text="Pieces in this _home_" className="font-serif text-4xl md:text-6xl" />
            <Link href="/collection" className="hidden items-center gap-2 text-sm uppercase tracking-[0.2em] hover:text-clay md:flex">
              Collection <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {pieces.map((p) => (
              <ProductCard key={p.slug} product={p} sizes="(min-width:768px) 33vw, 50vw" />
            ))}
          </div>
        </div>
      </section>

      <Link href={`/projects/${next.slug}`} className="group relative block h-[80svh] overflow-hidden bg-ink text-bone">
        <Image
          src={next.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50 transition-all duration-[1.6s] ease-out group-hover:scale-105 group-hover:opacity-70"
        />
        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-bone/70">Next project</p>
          <p className="font-serif text-[16vw] leading-none tracking-tight transition-all duration-700 group-hover:italic md:text-[10vw]">
            {next.title}
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-bone/70">{next.location}</p>
        </div>
      </Link>
    </>
  )
}
