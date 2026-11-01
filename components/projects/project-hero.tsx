'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import type { Project } from '@/lib/data'
import { EASE, SplitHeading } from '@/components/site/motion'

export function ProjectHero({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="grain relative h-svh min-h-[600px] overflow-hidden bg-ink text-bone">
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
        initial={{ clipPath: 'inset(20% 20% 20% 20%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image src={project.image} alt={`${project.title} — ${project.location}`} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-12 md:px-10"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bone/70">
          {project.type} — {project.location}
        </p>
        <SplitHeading
          as="h1"
          immediate
          delay={0.6}
          text={project.title}
          className="font-serif text-[18vw] leading-[0.85] tracking-tight md:text-[12vw]"
        />
      </motion.div>
    </section>
  )
}
