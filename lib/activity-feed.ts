import 'server-only'
import { unstable_cache } from 'next/cache'
import { fetchLatestActivity, type LatestActivity } from './github-activity'

// Cache successful reads for an hour. A failed refresh is not cached, so the
// last good value stays in Next's Data Cache.
const readCachedActivity = unstable_cache(() => fetchLatestActivity(), ['github-latest-activity-v1'], {
  revalidate: 3600,
})

/** The latest public activity, or null if GitHub is unavailable. Never throws. */
export async function getLatestActivity(): Promise<LatestActivity | null> {
  try {
    return await readCachedActivity()
  } catch {
    console.warn('GitHub activity is unavailable; hiding the latest-activity line')
    return null
  }
}
