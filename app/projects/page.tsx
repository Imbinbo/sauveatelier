import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { ProjectsGrid } from '@/components/projects/projects-grid'
import { Cta } from '@/components/site/cta'
import { projects } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected residential, retreat and hospitality interiors by Sauvé Atelier across Europe, Asia and North America.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work — 2023 / 2025"
        title={'Rooms with a\n_point of view._'}
        intro="Homes, retreats and hotels shaped around light, material and the people who live in them. Each project is a single, uninterrupted conversation — from architecture to the last object."
      >
        <p className="font-serif text-6xl">
          {String(projects.length).padStart(2, '0')}
          <span className="ml-2 align-top font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Projects</span>
        </p>
      </PageHero>
      <ProjectsGrid />
      <Cta image="/images/project-gstaad.png" />
    </>
  )
}
