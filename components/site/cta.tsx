import Link from 'next/link'
import { ParallaxImage, SplitHeading, Reveal } from '@/components/site/motion'

export function Cta({ image = '/images/bedroom.png' }: { image?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <ParallaxImage src={image} alt="" className="absolute inset-0 opacity-50" strength={10} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 to-ink/80" />
      <div className="relative mx-auto flex min-h-[90svh] max-w-[1600px] flex-col items-center justify-center px-5 py-32 text-center md:px-10">
        <Reveal>
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-bone/60">Begin a commission</p>
        </Reveal>
        <SplitHeading
          text={"Let's shape something\n_extraordinary._"}
          className="font-serif text-5xl leading-[0.95] tracking-tight md:text-8xl lg:text-9xl"
        />
        <Reveal delay={0.4}>
          <Link
            href="/contact"
            className="group relative mt-14 grid size-40 place-items-center rounded-full border border-bone/40 text-sm uppercase tracking-[0.2em] transition-colors duration-500 hover:border-clay md:size-48"
          >
            <span className="absolute inset-0 scale-0 rounded-full bg-clay transition-transform duration-700 ease-out group-hover:scale-100" />
            <span className="relative">Get in touch</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
