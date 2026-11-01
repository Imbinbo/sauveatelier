'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/projects', label: 'Projects', image: '/images/project-milan.png' },
  { href: '/collection', label: 'Collection', image: '/images/product-dune-sofa.png' },
  { href: '/services', label: 'Services', image: '/images/materials.png' },
  { href: '/studio', label: 'Studio', image: '/images/atelier.png' },
  { href: '/contact', label: 'Contact', image: '/images/bedroom.png' },
]

const EASE = [0.76, 0, 0.24, 1] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  useEffect(() => setOpen(false), [pathname])

  const darkHero = pathname === '/' || /^\/projects\/.+/.test(pathname)
  const light = open || (darkHero && !scrolled)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[color,background-color,border-color,box-shadow] duration-500',
          light ? 'text-bone' : 'text-ink',
          open
            ? 'border-transparent bg-transparent'
            : light
              ? 'border-bone/15 bg-ink/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl backdrop-saturate-150'
              : 'border-ink/10 bg-background/55 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between px-5 transition-[padding] duration-500 md:px-10',
            scrolled ? 'py-4' : 'py-5 md:py-6',
          )}
        >
          <Link href="/" className="font-serif text-3xl leading-none tracking-tight" aria-label="Sauvé home">
            Sauvé
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-9 text-[13px] uppercase tracking-[0.2em] lg:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="group relative py-1">
                {item.label}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100',
                    pathname.startsWith(item.href) && 'scale-x-100',
                  )}
                />
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 text-[13px] uppercase tracking-[0.2em] lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span className="relative flex h-3 w-6 flex-col justify-between" aria-hidden="true">
              <span className={cn('h-px w-full bg-current transition-transform duration-500', open && 'translate-y-[5.5px] rotate-45')} />
              <span className={cn('h-px w-full bg-current transition-transform duration-500', open && '-translate-y-[5.5px] -rotate-45')} />
            </span>
          </button>
          <Link
            href="/contact"
            className="hidden text-[13px] uppercase tracking-[0.2em] lg:block"
          >
            Book a consultation
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex bg-ink text-bone"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-5 pt-20 md:px-10">
              {NAV.map((item, i) => (
                <div key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHovered(i)}
                      className="group flex items-baseline gap-4 font-serif text-6xl leading-[1.05] md:text-8xl"
                    >
                      <span className="font-sans text-xs tracking-[0.2em] text-bone/40">0{i + 1}</span>
                      <span className="transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-clay">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
              <motion.div
                className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm text-bone/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <a href="mailto:studio@sauve.design" className="hover:text-bone">studio@sauve.design</a>
                <span>Paris · Milan · New York</span>
              </motion.div>
            </nav>
            <div className="relative hidden w-[38%] overflow-hidden md:block">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={hovered}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <Image src={NAV[hovered].image} alt="" fill sizes="40vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
