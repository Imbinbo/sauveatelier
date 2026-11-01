'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/lib/data'
import { Reveal } from '@/components/site/motion'

const IMAGES = ['/images/project-milan.png', '/images/bedroom.png', '/images/atelier.png', '/images/project-lisbon.png']

export function ServicesList() {
  const [hovered, setHovered] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 22 })
  const sy = useSpring(y, { stiffness: 180, damping: 22 })

  return (
    <section
      className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
      }}
    >
      <div className="mb-16 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(04) — Disciplines</p>
        </Reveal>
        <Reveal className="lg:col-span-9" delay={0.1}>
          <h2 className="font-serif text-5xl leading-none tracking-tight md:text-7xl text-balance">
            One studio, from the first <span className="italic text-clay">sketch</span> to the last stitch.
          </h2>
        </Reveal>
      </div>

      <ul className="border-t border-border" onPointerLeave={() => setHovered(null)}>
        {services.map((s, i) => (
          <li key={s.no} className="border-b border-border">
            <Link
              href="/services"
              onPointerEnter={() => setHovered(i)}
              className="group grid items-center gap-4 py-8 md:grid-cols-12 md:py-10"
            >
              <span className="text-sm text-muted-foreground md:col-span-1">{s.no}</span>
              <h3 className="font-serif text-4xl transition-all duration-500 group-hover:translate-x-4 group-hover:italic md:col-span-5 md:text-6xl">
                {s.title}
              </h3>
              <p className="max-w-md text-muted-foreground md:col-span-5">{s.body}</p>
              <span className="hidden justify-self-end md:col-span-1 md:block">
                <span className="grid size-12 place-items-center rounded-full border border-border transition-colors duration-500 group-hover:border-clay group-hover:bg-clay group-hover:text-bone">
                  <ArrowUpRight className="size-5" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
      >
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              className="relative -translate-x-1/2 -translate-y-1/2 h-72 w-56 overflow-hidden rounded-sm shadow-2xl"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={IMAGES[hovered]} alt="" fill sizes="224px" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
