'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const QUOTES = [
  {
    quote:
      'Sauvé did not decorate our home — they listened to how we live and gave it back to us, quieter and more beautiful than we imagined.',
    name: 'Isabelle & Marc Delacroix',
    project: 'Casa Oliva, Mykonos',
  },
  {
    quote:
      'Guests touch the walls. They ask who made the chairs. Two years on, Hotel Alma still feels like it was always meant to be here.',
    name: 'Rui Almeida',
    project: 'Founder, Hotel Alma Lisbon',
  },
  {
    quote:
      'The rarest thing: a studio with real restraint. Every piece they made for us will outlive us — and that is exactly the point.',
    name: 'Hana Morimoto',
    project: 'Kumo House, Kyoto',
  },
]

export function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 7000)
    return () => clearInterval(t)
  }, [])
  const q = QUOTES[i]

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40" aria-label="Client testimonials">
      <div className="grid gap-10 lg:grid-cols-12">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground lg:col-span-3">(07) — Kind Words</p>
        <div className="lg:col-span-9">
          <div className="relative min-h-[20rem] md:min-h-[24rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="font-serif text-3xl leading-[1.15] md:text-5xl lg:text-6xl text-balance">
                  <span className="text-clay">{'“'}</span>
                  {q.quote}
                  <span className="text-clay">{'”'}</span>
                </blockquote>
                <figcaption className="mt-10">
                  <p className="font-medium">{q.name}</p>
                  <p className="text-sm text-muted-foreground">{q.project}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex gap-3">
            {QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                aria-current={idx === i}
                className="relative h-0.5 w-16 overflow-hidden bg-border"
              >
                {idx === i && (
                  <motion.span
                    className="absolute inset-0 origin-left bg-clay"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 7, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
