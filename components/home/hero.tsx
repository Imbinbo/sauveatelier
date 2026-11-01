'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { SplitHeading, EASE } from '@/components/site/motion'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="grain relative h-svh min-h-[640px] overflow-hidden bg-ink text-bone">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.25, clipPath: 'inset(12% 12% 12% 12%)' }}
          animate={{ scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, delay: 1.7, ease: EASE }}
        >
          <Image
            src="/images/hero.png"
            alt="Sunlit living room with a curved bouclé sofa, travertine coffee table and walnut-panelled fireplace wall"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" aria-hidden="true" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-10 md:px-10 md:pb-14"
      >
        <motion.p
          className="mb-3 text-xs uppercase tracking-[0.25em] text-bone/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4, ease: EASE }}
        >
          Interior Architecture — Furniture Atelier
        </motion.p>
        <SplitHeading
          as="h1"
          immediate
          delay={2.2}
          text={'Spaces that\n_breathe,_ objects\nthat endure.'}
          className="font-serif text-[12vw] leading-[0.85] tracking-tighter sm:text-[9vw] lg:text-[7vw]"
        />
        <motion.div
          className="mt-6 flex flex-col gap-4 border-t border-bone/20 pt-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.9 }}
        >
          <p className="max-w-md text-pretty text-sm leading-relaxed text-bone/75 md:text-base">
            For fifteen years, Sauvé has shaped homes, retreats and hotels around light, material and
            the rituals of everyday life — then furnished them with pieces made by hand in our own atelier.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/projects"
              className="group relative overflow-hidden rounded-full bg-bone px-7 py-4 text-sm uppercase tracking-[0.18em] text-ink"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-bone">View projects</span>
              <span className="absolute inset-0 translate-y-full rounded-full bg-clay transition-transform duration-500 ease-out group-hover:translate-y-0" />
            </Link>
            <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-bone/60 md:flex">
              <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
              Scroll
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
