import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getProjectBySlug, projects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import ProjectDetailClient from '@/components/projects/ProjectDetailClient'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        {/* Date */}
        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{formatDate(project.date)}</span>
          </div>
        </div>

        <ProjectDetailClient project={project} />
      </div>
    </div>
  )
}
