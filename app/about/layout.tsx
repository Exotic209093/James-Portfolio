import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'James Collard, Solutions Engineer in Kent, UK and open to London hybrid. Experience, skills, project history and certifications.',
  alternates: { canonical: '/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
