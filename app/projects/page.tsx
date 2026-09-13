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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">My </span>
            <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From Salesforce data tools and desktop apps to websites and browser games — explore my work by discipline and latest project activity. Switch to the grid for a classic card view.
          </p>
        </div>

        <ProjectsExplorer />
      </div>
    </div>
  )
}
