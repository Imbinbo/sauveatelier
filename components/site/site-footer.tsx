import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { NewsletterForm } from './newsletter-form'

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { href: '/projects', label: 'Projects' },
      { href: '/collection', label: 'Collection' },
      { href: '/services', label: 'Services' },
      { href: '/studio', label: 'Studio' },
    ],
  },
  {
    title: 'Studios',
    links: [
      { href: '/contact', label: 'Paris — Le Marais' },
      { href: '/contact', label: 'Milan — Brera' },
      { href: '/contact', label: 'New York — Tribeca' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 pb-10 pt-24 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-serif text-4xl leading-tight md:text-5xl text-balance">
            Letters from the atelier — new collections, projects and <span className="italic text-clay">quiet ideas</span>.
          </p>
          <NewsletterForm />
        </div>
        <div className="grid grid-cols-2 gap-10 lg:col-span-4 lg:col-start-7">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-bone/40">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-bone/80 transition-colors hover:text-clay">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2">
          <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-bone/40">Social</h3>
          <ul className="space-y-3">
            {['Instagram', 'Pinterest', 'LinkedIn'].map((s) => (
              <li key={s}>
                <a href="#" className="group inline-flex items-center gap-1 text-bone/80 hover:text-clay">
                  {s}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p
          aria-hidden="true"
          className="select-none font-serif text-[30vw] leading-[0.8] tracking-tight text-bone/[0.06] md:text-[24vw]"
        >
          Sauvé
        </p>
      </div>
      <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-2 border-t border-bone/10 px-5 py-6 text-xs text-bone/40 md:flex-row md:px-10">
        <span>© {new Date().getFullYear()} Sauvé Atelier. All rights reserved.</span>
        <span>Interior architecture · Furniture · Objects</span>
      </div>
    </footer>
  )
}
