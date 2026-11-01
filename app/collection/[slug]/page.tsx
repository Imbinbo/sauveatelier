import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products } from '@/lib/data'
import { ProductDetail } from '@/components/collection/product-detail'
import { ProductCard } from '@/components/site/product-card'
import { SplitHeading } from '@/components/site/motion'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = products.find((x) => x.slug === slug)
  return p ? { title: p.name, description: p.description } : {}
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()
  const related = products.filter((p) => p.slug !== slug && p.category === product.category).concat(products.filter((p) => p.category !== product.category)).slice(0, 4)

  return (
    <>
      <ProductDetail product={product} />
      <section className="bg-secondary">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <SplitHeading text="You may also _love_" className="mb-12 font-serif text-4xl md:text-6xl" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
