'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const EASE = [0.76, 0, 0.24, 1] as const

export function Preloader() {
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame = 0
    const start = performance.now()
    const duration = 1600
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) frame = requestAnimationFrame(tick)
      else setTimeout(() => setVisible(false), 250)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-bone md:p-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-bone/60">
            <span>Sauvé Atelier</span>
            <span>Est. 2009</span>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="font-serif text-[18vw] leading-none md:text-[12vw]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE }}
            >
              Sauv<span className="italic text-clay">é</span>
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <span className="max-w-[16rem] text-sm text-bone/60">
              Interior architecture &amp; heirloom furniture
            </span>
            <span className="font-serif text-6xl tabular-nums md:text-8xl">{count}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
