import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'James Collard — self-taught software engineer in Kent, UK. Background, skills, project history, work experience, and certifications.',
  alternates: { canonical: '/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
