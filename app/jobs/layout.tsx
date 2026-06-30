import type { Metadata } from 'next'

// The job dashboard is private (gated by middleware Basic Auth). Keep it out of
// search indexes as well, so the gated page is never surfaced or cached publicly.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
