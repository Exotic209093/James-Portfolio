import type { Metadata } from 'next'
import ProjectIndex, { type IndexProject } from '@/components/projects/ProjectIndex'
import PageIntro from '@/components/ui/PageIntro'
import PageTransition from '@/components/PageTransition'
import { getProjectArt } from '@/lib/project-art'
import { projects, projectTracks, trackById } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore Salesforce data tooling, an Electron terminal, local Python utilities, Next.js web experiences, and browser games built by James Collard.',
  alternates: { canonical: '/projects' },
}

// A slim, serialisable list: the index never ships long case-study text.
const indexProjects: IndexProject[] = [...projects]
  .sort((a, b) => b.date.localeCompare(a.date) || Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title))
  .map((project) => {
    const art = getProjectArt(project.id)
    const stack = project.techStack?.flatMap((group) => group.items) ?? []
    return {
      id: project.id,
      title: project.title,
      label: art.label,
      track: project.track,
      trackLabel: trackById[project.track].label,
      date: project.date,
      year: project.date.slice(0, 4),
      tech: project.tech,
      image: project.image,
      accent: art.accent,
      description: project.description,
      searchText: [project.title, project.description, art.label, ...project.tech, ...stack].join(' ').toLowerCase(),
    }
  })

const tracks = projectTracks.map((track) => ({ id: track.id, label: track.label }))

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="pb-20 pt-20 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PageIntro
            label="Selected work · an ongoing collection"
            title="Ideas, made real."
            lede="Document engines, useful tools, and worlds you can play in. Explore the work, try an interactive example, and see what went into the build."
          />
          <ProjectIndex projects={indexProjects} tracks={tracks} />
        </div>
      </div>
    </PageTransition>
  )
}
