import { z } from 'zod'

export interface LatestActivity {
  /** What happened, phrased to follow "Latest:", e.g. "pushed to". */
  action: string
  /** Repository name, without the owner when it is my own. */
  repository: string
  url: string
  /** ISO timestamp from GitHub. */
  at: string
}

const OWNER = 'Exotic209093'

const eventsResponse = z.array(
  z.object({
    type: z.string(),
    created_at: z.string().datetime(),
    public: z.boolean().optional(),
    repo: z.object({ name: z.string().regex(/^[\w.-]+\/[\w.-]+$/) }),
  })
).max(100)

// Only events that describe work; stars, forks and follows are not activity.
const ACTIONS: Record<string, string> = {
  PushEvent: 'pushed to',
  PullRequestEvent: 'opened a pull request in',
  PullRequestReviewEvent: 'reviewed a pull request in',
  ReleaseEvent: 'published a release of',
}

/**
 * Read my most recent public work from GitHub's public events feed.
 * Returns null when there is nothing worth showing.
 */
export async function fetchLatestActivity(request: typeof fetch = fetch): Promise<LatestActivity | null> {
  const response = await request(`https://api.github.com/users/${OWNER}/events/public?per_page=30`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'James-Collard-Portfolio',
    },
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error(`GitHub activity request failed (${response.status})`)
  const events = eventsResponse.parse(await response.json())
  const latest = events.find((event) => event.public !== false && event.type in ACTIONS)
  if (!latest) return null
  const [owner, name] = latest.repo.name.split('/')
  return {
    action: ACTIONS[latest.type],
    repository: owner.toLowerCase() === OWNER.toLowerCase() ? name : latest.repo.name,
    url: `https://github.com/${latest.repo.name}`,
    at: latest.created_at,
  }
}
