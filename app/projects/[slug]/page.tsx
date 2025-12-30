import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react'
import { getProjectBySlug, projects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/Button'

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

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">{project.title}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">{formatDate(project.date)}</span>
            </div>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Project Image */}
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-purple-900/20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-purple-500/30">
              {project.title.charAt(0)}
            </span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg border border-purple-800/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4">
          {project.github && (
            <ButtonLink
              href={project.github}
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              View Code
            </ButtonLink>
          )}
          {project.live && (
            <ButtonLink
              href={project.live}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Live Demo
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  )
}
