import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { Film } from '@/components/home/film'
import { ServicesList } from '@/components/home/services-list'
import { CollectionPreview } from '@/components/home/collection-preview'
import { AtelierSplit } from '@/components/home/atelier-split'
import { Testimonials } from '@/components/home/testimonials'
import { Cta } from '@/components/site/cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedProjects />
      <ServicesList />
      <Film />
      <CollectionPreview />
      <AtelierSplit />
      <Testimonials />
      <Cta />
    </>
  )
}
