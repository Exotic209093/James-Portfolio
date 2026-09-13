import 'server-only'
import { unstable_cache } from 'next/cache'
import { fetchContributions, loadContributionFeeds } from './github-contributions'

// Cache successful, validated responses independently for each upstream project.
// Failed refreshes leave the last successful value available in Next's Data Cache.
const readCachedContributions = unstable_cache(
  fetchContributions,
  ['upstream-contributions-v1'],
  { revalidate: 3600 },
)

export function getContributionFeeds() {
  return loadContributionFeeds((project) => readCachedContributions(project))
}
