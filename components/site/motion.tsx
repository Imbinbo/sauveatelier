'use client'

import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

export const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  delay = 0,
  className,
  y = 40,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function SplitHeading({
  text,
  as: Tag = 'h2',
  className,
  delay = 0,
  immediate = false,
}: {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  immediate?: boolean
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const show = immediate || inView
  const lines = text.split('\n')
  let wordIndex = 0

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(' ').map((word, wi) => {
            const i = wordIndex++
            const italic = word.startsWith('_') && word.endsWith('_')
            const clean = italic ? word.slice(1, -1) : word
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={cn('inline-block', italic && 'italic text-clay')}
                  initial={{ y: '110%' }}
                  animate={show ? { y: 0 } : { y: '110%' }}
                  transition={{ duration: 1.1, delay: delay + i * 0.06, ease: EASE }}
                >
                  {clean}
                  {'\u00A0'}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const italic = children.startsWith('_') && children.endsWith('_')
  return (
    <motion.span style={{ opacity }} className={cn('inline-block', italic && 'italic text-clay')}>
      {italic ? children.slice(1, -1) : children}
      {'\u00A0'}
    </motion.span>
  )
}

export function ParallaxImage({
  src,
  alt,
  className,
  strength = 12,
  priority,
  sizes = '100vw',
}: {
  src: string
  alt: string
  className?: string
  strength?: number
  priority?: boolean
  sizes?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y }} className="absolute inset-[-14%]">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  )
}

export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items]
  return (
    <div className={cn('relative flex overflow-hidden', className)} aria-hidden="true">
      <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span>{item}</span>
            <span className="size-2 rounded-full bg-clay" />
          </span>
        ))}
      </div>
    </div>
  )
}
