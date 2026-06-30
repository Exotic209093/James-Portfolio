import type { Metadata } from 'next'
import ProjectsExplorer from '@/components/projects/ProjectsExplorer'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected engineering work: AI agents on the Anthropic Agent SDK, a Salesforce AppExchange package, published Chrome and VS Code extensions, and developer tooling.',
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
            A commit history of what I&apos;ve shipped — each project sits on a branch by discipline, plotted by date. Switch to the grid for a classic card view.
          </p>
        </div>

        <ProjectsExplorer />
      </div>
    </div>
  )
}
