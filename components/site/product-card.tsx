import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, type Product } from '@/lib/data'

export function ProductCard({ product, sizes = '(min-width:1024px) 25vw, 50vw' }: { product: Product; sizes?: string }) {
  return (
    <Link href={`/collection/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-card">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.material}`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-bone/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] backdrop-blur">
          {product.category}
        </span>
        <span className="absolute inset-x-4 bottom-4 translate-y-4 rounded-full bg-ink py-3 text-center text-xs uppercase tracking-[0.2em] text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Discover piece
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl">{product.name}</h3>
        <span className="text-sm tabular-nums text-muted-foreground">{formatPrice(product.price)}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{product.material}</p>
    </Link>
  )
}
