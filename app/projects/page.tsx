import type { Metadata } from 'next'
import ProjectsExplorer from '@/components/projects/ProjectsExplorer'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore Salesforce data tooling, an Electron terminal, local Python utilities, Next.js web experiences, and browser games built by James Collard.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-purple-300 mb-5">
            Selected work / an ongoing collection
          </p>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6">
            Ideas, made real.
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Document engines, useful tools, and worlds you can play in. Explore
            the work, try an interactive example, and see what went into the
            build.
          </p>
        </div>

        <ProjectsExplorer />
      </div>
    </div>
  )
}
