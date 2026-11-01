'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import { Marquee, Reveal, ScrollWords } from '@/components/site/motion'

const STATS = [
  { value: 240, suffix: '+', label: 'Homes & hotels completed' },
  { value: 18, suffix: '', label: 'Countries' },
  { value: 32, suffix: '', label: 'Master craftspeople' },
  { value: 41, suffix: '', label: 'International awards' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value])
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  )
}

export function Intro() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-44">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(01) — The Studio</p>
          </Reveal>
          <ScrollWords
            className="font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl lg:col-span-9 lg:text-7xl text-balance"
            text="We believe a room should feel _inevitable_ — as if it could never have been any other way. Every line, every grain of timber, every pool of light is considered, so that what remains is calm, honest and deeply personal."
          />
        </div>

        <div className="mt-24 grid grid-cols-2 gap-y-12 border-t border-border pt-12 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <p className="font-serif text-6xl md:text-7xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-y border-border py-8">
        <Marquee
          className="font-serif text-4xl italic text-ink/80 md:text-5xl"
          items={[
            'AD100 2025',
            'Wallpaper* Design Awards',
            'Elle Decoration — Designer of the Year',
            'Dezeen Awards',
            'Frame Awards',
            'World Interiors News',
          ]}
        />
      </div>
    </section>
  )
}
