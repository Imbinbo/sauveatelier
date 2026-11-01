import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/site/product-card'
import { Reveal, SplitHeading } from '@/components/site/motion'

export function CollectionPreview() {
  const featured = products.slice(0, 4)
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">(05) — The Collection</p>
            </Reveal>
            <SplitHeading
              text={'Heirlooms, made\nby _hand._'}
              className="font-serif text-5xl leading-[0.95] tracking-tight md:text-8xl"
            />
          </div>
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-muted-foreground">
              Every piece is drawn in our studio and made to order in our Normandy atelier — in timber, stone and
              metal chosen to age beautifully over generations.
            </p>
            <Link
              href="/collection"
              className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm uppercase tracking-[0.2em] hover:border-clay hover:text-clay"
            >
              Shop the collection <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} className={i % 2 === 1 ? 'lg:mt-24' : ''}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
