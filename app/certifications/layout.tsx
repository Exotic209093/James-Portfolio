import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certifications',
  description:
    'Verified certifications held by James Collard, including the full Meta Back-End Developer Professional Certificate track.',
  alternates: { canonical: '/certifications' },
}

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
