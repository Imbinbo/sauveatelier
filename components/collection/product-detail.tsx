'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Check, Minus, Plus } from 'lucide-react'
import { formatPrice, type Product } from '@/lib/data'
import { EASE } from '@/components/site/motion'
import { cn } from '@/lib/utils'

const FINISHES = [
  { name: 'Natural', swatch: '#D9C9AE' },
  { name: 'Smoked', swatch: '#6B5444' },
  { name: 'Ebonised', swatch: '#2A2521' },
]

const VIEWS = (p: Product) => [
  { src: p.image, alt: `${p.name} — studio view` },
  { src: '/images/materials.png', alt: 'Material and finish samples' },
  { src: '/images/atelier.png', alt: `${p.name} being made by hand in the atelier` },
]

export function ProductDetail({ product }: { product: Product }) {
  const views = VIEWS(product)
  const [view, setView] = useState(0)
  const [finish, setFinish] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [open, setOpen] = useState<number | null>(0)

  const details = [
    { title: 'Materials', body: product.material },
    { title: 'Dimensions', body: product.dimensions },
    { title: 'Lead time & delivery', body: `Made to order in ${product.leadTime}. White-glove delivery and installation worldwide.` },
    { title: 'Care', body: 'Dust with a soft dry cloth. Re-oil timber annually. Every piece includes a lifetime structural guarantee.' },
  ]

  return (
    <section className="mx-auto grid max-w-[1600px] gap-10 px-5 pb-24 pt-28 md:px-10 md:pt-32 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden bg-card">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={view}
              className="absolute inset-0"
              initial={{ clipPath: 'inset(0 0 0 100%)' }}
              animate={{ clipPath: 'inset(0 0 0 0%)' }}
              exit={{ opacity: 0.6 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <Image src={views[view].src} alt={views[view].alt} fill priority={view === 0} sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {views.map((v, i) => (
            <button
              key={v.src}
              onClick={() => setView(i)}
              aria-label={`Show view ${i + 1}`}
              aria-pressed={view === i}
              className={cn('relative aspect-square overflow-hidden bg-card transition-opacity', view === i ? 'opacity-100 ring-1 ring-ink ring-offset-2 ring-offset-background' : 'opacity-60 hover:opacity-100')}
            >
              <Image src={v.src} alt="" fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <Link href="/collection" className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-ink">
            <ArrowLeft className="size-4" /> Collection
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {product.category} — by {product.designer}
          </p>
          <h1 className="mt-4 font-serif text-6xl leading-none tracking-tight md:text-7xl">{product.name}</h1>
          <p className="mt-6 font-serif text-3xl tabular-nums">{formatPrice(product.price * qty)}</p>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">{product.description}</p>

          <fieldset className="mt-10">
            <legend className="mb-4 text-xs uppercase tracking-[0.25em]">
              Finish — <span className="text-muted-foreground">{FINISHES[finish].name}</span>
            </legend>
            <div className="flex gap-3">
              {FINISHES.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setFinish(i)}
                  aria-label={f.name}
                  aria-pressed={finish === i}
                  className={cn('size-11 rounded-full ring-offset-2 ring-offset-background transition', finish === i ? 'ring-1 ring-ink' : 'hover:scale-110')}
                  style={{ backgroundColor: f.swatch }}
                />
              ))}
            </div>
          </fieldset>

          <div className="mt-10 flex gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid size-14 place-items-center hover:text-clay">
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center tabular-nums" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity" className="grid size-14 place-items-center hover:text-clay">
                <Plus className="size-4" />
              </button>
            </div>
            <button
              onClick={() => setAdded(true)}
              className="group relative flex-1 overflow-hidden rounded-full bg-ink text-sm uppercase tracking-[0.2em] text-bone"
            >
              <span className="absolute inset-0 translate-y-full bg-clay transition-transform duration-500 group-hover:translate-y-0" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={String(added)}
                  className="relative flex items-center justify-center gap-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                >
                  {added ? (<><Check className="size-4" /> Added to inquiry</>) : 'Reserve this piece'}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Prefer to see it in person?{' '}
            <Link href="/contact" className="underline underline-offset-4 hover:text-clay">Book a showroom visit</Link>
          </p>

          <div className="mt-12 border-t border-border">
            {details.map((d, i) => (
              <div key={d.title} className="border-b border-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="font-serif text-xl">{d.title}</span>
                  <Plus className={cn('size-4 transition-transform duration-500', open === i && 'rotate-45')} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-muted-foreground">{d.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
