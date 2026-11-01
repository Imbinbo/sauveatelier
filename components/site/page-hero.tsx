'use client'

import { motion } from 'motion/react'
import { SplitHeading, EASE } from './motion'

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  children?: React.ReactNode
}) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-16 pt-40 md:px-10 md:pb-24 md:pt-52">
      <motion.p
        className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {eyebrow}
      </motion.p>
      <SplitHeading
        as="h1"
        immediate
        delay={0.1}
        text={title}
        className="font-serif text-[14vw] leading-[0.88] tracking-tight md:text-[10vw] lg:text-[8.5vw]"
      />
      {(intro || children) && (
        <motion.div
          className="mt-12 flex flex-col justify-between gap-8 border-t border-border pt-8 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
        >
          {intro && <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{intro}</p>}
          {children}
        </motion.div>
      )}
    </section>
  )
}
