import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getProjectBySlug, projects } from '@/lib/projects'
import { projectCaseStudies } from '@/lib/project-case-studies'
import ProjectDetailClient from '@/components/projects/ProjectDetailClient'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug)
  if (!project) {
    return { title: 'Project not found' }
  }
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} — James Collard`,
      description: project.description,
      type: 'article',
      url: `/projects/${project.id}`,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectBySlug((await params).slug)

  if (!project) {
    notFound()
  }
  const reviewedAt = projectCaseStudies[project.id]?.reviewedAt ?? project.date

  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        {/* Review date is distinct from a product launch date. */}
        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
            <span className="text-sm">Last reviewed <time dateTime={reviewedAt}>{new Date(`${reviewedAt}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time></span>
          </div>
        </div>

        <ProjectDetailClient project={project} />
      </div>
    </div>
  )
}
