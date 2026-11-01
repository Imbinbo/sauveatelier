'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

const STEPS = [
  { title: 'Listen', body: 'We spend time in your space and your routine — how mornings feel, where you read, what you keep. The brief is written together.' },
  { title: 'Imagine', body: 'Hand sketches, physical material boards and light studies. You hold the palette in your hands before anything is drawn in CAD.' },
  { title: 'Craft', body: 'Our atelier makes the bespoke pieces while our project team orchestrates builders, artisans and every delivery.' },
  { title: 'Reveal', body: 'We install, style and light every room in the final week, then hand you the keys to a home that is entirely finished.' },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-62%'])
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink text-bone" aria-label="Our process">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-12 flex w-full max-w-[1600px] items-end justify-between px-5 md:px-10">
          <h2 className="font-serif text-5xl leading-none md:text-8xl">
            The <span className="italic text-clay">process</span>
          </h2>
          <div className="hidden w-64 md:block">
            <div className="h-px bg-bone/15">
              <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-clay" />
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-bone/60">Four movements</p>
          </div>
        </div>
        <motion.ol style={{ x }} className="flex gap-6 px-5 md:px-10">
          {STEPS.map((s, i) => (
            <Step key={s.title} index={i} step={s} progress={scrollYProgress} />
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

function Step({ index, step, progress }: { index: number; step: (typeof STEPS)[number]; progress: MotionValue<number> }) {
  const start = index / STEPS.length
  const opacity = useTransform(progress, [Math.max(0, start - 0.2), start], [0.35, 1])
  return (
    <motion.li
      style={{ opacity }}
      className="flex h-[60svh] w-[80vw] shrink-0 flex-col justify-between border border-bone/15 p-8 md:w-[42vw] md:p-12"
    >
      <span className="font-serif text-[9rem] leading-none text-clay/80 md:text-[12rem]">0{index + 1}</span>
      <div>
        <h3 className="font-serif text-5xl md:text-6xl">{step.title}</h3>
        <p className="mt-4 max-w-md text-bone/70">{step.body}</p>
      </div>
    </motion.li>
  )
}
