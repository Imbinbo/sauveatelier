'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView } from 'motion/react'

export function Counter({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix])

  return (
    <div>
      <span ref={ref} className="block font-serif text-7xl tabular-nums md:text-8xl">
        0{suffix}
      </span>
      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
    </div>
  )
}
