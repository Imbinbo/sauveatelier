'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/data'
import { cn } from '@/lib/utils'

const FILTERS = ['All', 'Residential', 'Retreat', 'Hospitality'] as const
const LAYOUT = [
  'md:col-span-7 aspect-[4/3]',
  'md:col-span-5 aspect-[4/5] md:mt-40',
  'md:col-span-5 aspect-[4/5]',
  'md:col-span-7 aspect-[4/3] md:mt-24',
  'md:col-span-6 md:col-start-2 aspect-[5/4]',
  'md:col-span-5 aspect-[4/5] md:mt-32',
]

export function ProjectsGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const list = projects.filter((p) => filter === 'All' || p.type === filter)

  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-32 md:px-10">
      <div role="tablist" aria-label="Filter projects" className="mb-14 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              'relative rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors',
              filter === f ? 'border-ink text-bone' : 'border-border hover:border-ink',
            )}
          >
            {filter === f && (
              <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-x-8 gap-y-20 md:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={cn(filter === 'All' ? LAYOUT[i % LAYOUT.length].replace(/aspect-\S+/, '') : 'md:col-span-6')}
            >
              <Link href={`/projects/${p.slug}`} className="group block">
                <div
                  className={cn(
                    'relative overflow-hidden',
                    filter === 'All' ? LAYOUT[i % LAYOUT.length].match(/aspect-\S+/)?.[0] : 'aspect-[4/3]',
                  )}
                >
                  <Image
                    src={p.image}
                    alt={`${p.title} interior, ${p.location}`}
                    fill
                    sizes="(min-width:768px) 55vw, 100vw"
                    className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 to-transparent p-6 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <p className="max-w-sm text-sm text-bone">{p.summary}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="font-serif text-4xl transition-all duration-500 group-hover:italic md:text-5xl">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {p.location} — {p.type}
                    </p>
                  </div>
                  <span className="flex items-center gap-3 text-sm text-muted-foreground">
                    {p.year}
                    <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-clay" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
