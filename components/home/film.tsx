'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { AmbientVideo } from '@/components/site/ambient-video'

const REELS = [
  { src: '/videos/terrace.mp4', poster: '/videos/terrace-poster.jpg', title: 'Golden hour', caption: 'Light as a material' },
  { src: '/videos/fireplace.mp4', poster: '/videos/fireplace-poster.jpg', title: 'The hearth', caption: 'Warmth, by design' },
  { src: '/videos/swatches.mp4', poster: '/videos/swatches-poster.jpg', title: 'Palette', caption: 'Colour, slowly chosen' },
]

export function Film() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const inset = useTransform(scrollYProgress, [0, 1], [18, 0])
  const radius = useTransform(scrollYProgress, [0, 1], [24, 0])
  const clipPath = useTransform(
    [inset, radius],
    ([i, r]: number[]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`,
  )
  const titleY = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])

  const reel = REELS[active]

  return (
    <section ref={ref} className="relative bg-ink" aria-label="Studio film">
      <motion.div style={{ clipPath }} className="grain relative h-svh min-h-[600px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={reel.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <AmbientVideo src={reel.src} poster={reel.poster} label={`${reel.title} — ambient studio film`} />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/40" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 py-24 text-bone md:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-bone/70">(03) — In Motion</p>
          <motion.div style={{ y: titleY }}>
            <h2 className="font-serif text-[13vw] leading-[0.85] tracking-tight md:text-[9vw]">
              {reel.title.split(' ')[0]}{' '}
              <span className="italic text-clay">{reel.title.split(' ').slice(1).join(' ') || '.'}</span>
            </h2>
            <p className="mt-4 text-lg text-bone/80">{reel.caption}</p>

            <div role="tablist" aria-label="Choose film" className="mt-10 flex flex-wrap gap-3">
              {REELS.map((r, i) => (
                <button
                  key={r.src}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.2em] backdrop-blur-md transition-colors ${
                    i === active ? 'border-bone bg-bone text-ink' : 'border-bone/30 bg-ink/20 text-bone hover:border-bone'
                  }`}
                >
                  0{i + 1} · {r.title}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
