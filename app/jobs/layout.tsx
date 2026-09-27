import type { Metadata } from 'next'

// Private job responses must be rendered per request behind proxy Basic Auth,
// never emitted as prerendered HTML or RSC assets. Robots metadata separately
// keeps authenticated pages out of search indexes; it is not an access control.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
