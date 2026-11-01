'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/site/product-card'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Seating', 'Tables', 'Lighting', 'Storage'] as const
const SORTS = { featured: 'Featured', 'price-asc': 'Price — low to high', 'price-desc': 'Price — high to low' } as const

export function CollectionGrid() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('All')
  const [sort, setSort] = useState<keyof typeof SORTS>('featured')

  const list = useMemo(() => {
    const filtered = products.filter((p) => cat === 'All' || p.category === cat)
    if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [cat, sort])

  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-32 md:px-10">
      <div className="sticky top-0 z-30 -mx-5 mb-12 flex flex-col gap-4 border-b border-border bg-background/85 px-5 py-4 backdrop-blur-md md:-mx-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                'relative rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors',
                cat === c ? 'border-ink text-bone' : 'border-border hover:border-ink',
              )}
            >
              {cat === c && (
                <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground tabular-nums">{list.length} pieces</span>
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as keyof typeof SORTS)}
            className="rounded-full border border-border bg-transparent px-4 py-2 text-xs uppercase tracking-[0.15em] focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {Object.entries(SORTS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-14 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
