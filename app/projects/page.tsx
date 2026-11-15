import type { Metadata } from 'next'
import ProjectsExplorer from '@/components/projects/ProjectsExplorer'
import PageIntro from '@/components/ui/PageIntro'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore Salesforce data tooling, an Electron terminal, local Python utilities, Next.js web experiences, and browser games built by James Collard.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageIntro
          label="Selected work · an ongoing collection"
          title="Ideas, made real."
          lede="Document engines, useful tools, and worlds you can play in. Explore the work, try an interactive example, and see what went into the build."
        />

        <ProjectsExplorer />
      </div>
    </div>
  )
}
