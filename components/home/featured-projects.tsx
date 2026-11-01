'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/data'

export function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%'])
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section ref={ref} className="relative h-[420vh] bg-ink text-bone" aria-label="Featured projects">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-[1600px] items-end justify-between px-5 md:px-10">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bone/50">(02) — Selected Work</p>
            <h2 className="font-serif text-5xl leading-none md:text-7xl">
              Recent <span className="italic text-clay">commissions</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden items-center gap-2 text-sm uppercase tracking-[0.2em] text-bone/70 hover:text-bone md:flex"
          >
            All projects <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <motion.div style={{ x }} className="flex gap-6 pl-5 md:gap-10 md:pl-10">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group relative block w-[78vw] shrink-0 md:w-[46vw] lg:w-[36vw]"
            >
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                <Image
                  src={p.image}
                  alt={`${p.title}, ${p.location}`}
                  fill
                  sizes="(min-width:1024px) 36vw, 78vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
                <span className="absolute left-5 top-5 font-serif text-2xl text-bone">0{i + 1}</span>
                <span className="absolute right-5 top-5 grid size-12 scale-0 place-items-center rounded-full bg-bone text-ink transition-transform duration-500 group-hover:scale-100">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-3xl md:text-4xl">{p.title}</h3>
                <p className="text-right text-xs uppercase tracking-[0.2em] text-bone/50">
                  {p.location} · {p.year}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="mx-auto mt-12 w-full max-w-[1600px] px-5 md:px-10">
          <div className="h-px w-full bg-bone/15">
            <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-clay" />
          </div>
        </div>
      </div>
    </section>
  )
}
