import ContactContent from '@/components/ContactContent'
import PageTransition from '@/components/PageTransition'
import { getProjectBySlug } from '@/lib/projects'

export default async function ContactPage({ searchParams }: {
  searchParams: Promise<{ project?: string | string[] }>
}) {
  const { project } = await searchParams
  const selected = typeof project === 'string' ? getProjectBySlug(project) : undefined
  return (
    <PageTransition>
      <ContactContent projectTitle={selected?.title} />
    </PageTransition>
  )
}
