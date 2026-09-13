import { z } from 'zod'
import { contributions, contributionProjects, contributionsReviewedAt, type Contribution } from './contributions'

export type ContributionProject = (typeof contributionProjects)[number]

export interface ContributionFeed {
  projectId: string
  items: Contribution[]
  syncedAt: string
  source: 'github' | 'snapshot'
  totalCount: number
}

const searchResponse = z.object({
  total_count: z.number().int().nonnegative(),
  incomplete_results: z.literal(false),
  items: z.array(z.object({
    number: z.number().int().positive(),
    title: z.string().min(1),
    html_url: z.string().url(),
    state: z.enum(['open', 'closed']),
    draft: z.boolean().optional(),
    user: z.object({ login: z.string() }),
    updated_at: z.string().datetime(),
    pull_request: z.object({ merged_at: z.string().datetime().nullable() }),
  })).max(100),
})

export async function fetchContributions(
  project: ContributionProject,
  request: typeof fetch = fetch,
  now: () => Date = () => new Date(),
): Promise<ContributionFeed> {
  const query = `repo:${project.repository} author:Exotic209093 is:pr is:public`
  const url = new URL('https://api.github.com/search/issues')
  url.search = new URLSearchParams({ q: query, sort: 'updated', order: 'desc', per_page: '100' }).toString()
  const response = await request(url, {
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'James-Collard-Portfolio',
    },
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error(`GitHub contribution request failed (${response.status})`)
  const data = searchResponse.parse(await response.json())
  if (data.items.length !== Math.min(data.total_count, 100)) {
    throw new Error('GitHub returned an incomplete contribution page')
  }
  const items = data.items.map((item): Contribution => {
    const expectedUrl = `https://github.com/${project.repository}/pull/${item.number}`
    if (item.user.login.toLowerCase() !== 'exotic209093' || item.html_url.toLowerCase() !== expectedUrl.toLowerCase()) {
      throw new Error('Unexpected contribution author or repository')
    }
    return {
      project: project.id,
      number: item.number,
      title: item.title,
      url: expectedUrl,
      // Closed and merged are different outcomes; draft only applies to open PRs.
      status: item.pull_request.merged_at ? 'merged' : item.state === 'closed' ? 'closed' : item.draft ? 'draft' : 'open',
      ...(item.pull_request.merged_at ? { mergedAt: item.pull_request.merged_at } : {}),
      updatedAt: item.updated_at,
    }
  })
  if (new Set(items.map((item) => item.number)).size !== items.length) {
    throw new Error('Duplicate pull requests in GitHub response')
  }
  items.sort((a, b) => b.updatedAt!.localeCompare(a.updatedAt!) || b.number - a.number)
  return { projectId: project.id, items, syncedAt: now().toISOString(), source: 'github', totalCount: data.total_count }
}

export async function loadContributionFeeds(
  read: (project: ContributionProject) => Promise<ContributionFeed> = fetchContributions,
): Promise<ContributionFeed[]> {
  return Promise.all(contributionProjects.map(async (project) => {
    try {
      return await read(project)
    } catch {
      // This catch is outside the cache: a failure must never replace a good snapshot.
      console.warn(`Using saved contributions for ${project.repository}`)
      const items = contributions.filter((item) => item.project === project.id)
      return {
        projectId: project.id,
        items,
        syncedAt: `${contributionsReviewedAt}T00:00:00.000Z`,
        source: 'snapshot' as const,
        totalCount: items.length,
      }
    }
  }))
}
