import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { unstable_noStore as noStore } from 'next/cache'
import { getContributionFeeds } from '@/lib/contribution-feed'
import ContributionCard from '@/components/sections/ContributionCard'
import { contributionProjects, contributionSearchUrl, type Contribution } from '@/lib/contributions'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Open Source',
  description: 'James Collard’s contributions to T3 Code and Salesforce Inspector Reloaded: upstream pull requests, bug fixes, and regression coverage.',
  alternates: { canonical: '/open-source' },
}

function ContributionHighlights({ items, title, projectName }: { items: Contribution[]; title: string; projectName: string }) {
  if (items.length === 0) return null
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-white mb-4">{title} <span className="text-sm font-normal text-gray-400">({items.length})</span></h3>
      <div className="grid md:grid-cols-2 gap-4">
        {items.slice(0, 4).map((item) => <ContributionCard key={item.url} item={item} projectName={projectName} />)}
      </div>
      {items.length > 4 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-purple-300 hover:text-white rounded-lg border border-purple-800/30 p-4">
            More {title.toLowerCase()} in {projectName} ({items.length - 4})
          </summary>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {items.slice(4).map((item) => <ContributionCard key={item.url} item={item} projectName={projectName} />)}
          </div>
        </details>
      )}
    </div>
  )
}

function ContributionHistory({ items, title, projectName }: { items: Contribution[]; title: string; projectName: string }) {
  if (items.length === 0) return null
  return (
    <details className="mt-5 border-t border-purple-900/30 pt-5">
      <summary className="cursor-pointer text-sm text-gray-400 hover:text-white">{title} ({items.length})</summary>
      <ul className="divide-y divide-purple-900/30 mt-3">
        {items.map((item) => (
          <li key={item.url} className="py-3">
            <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${projectName} pull request #${item.number}: ${item.title}`} className="flex items-start gap-3 text-sm text-gray-300 hover:text-white">
              <span className="font-mono text-gray-400 shrink-0">#{item.number}</span>
              <span className="min-w-0 break-words">{item.title}</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0 ml-auto" />
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default async function OpenSourcePage() {
  noStore()
  const feeds = await getContributionFeeds()
  const contributions = feeds.flatMap((feed) => feed.items)
  const mergedCount = contributions.filter((item) => item.status === 'merged').length
  const openCount = contributions.filter((item) => item.status === 'open').length

  return (
    <div data-portfolio-section className="pt-28 md:pt-36 pb-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-purple-300 mb-4">Working with the community</p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">Open source.<br /><span className="gradient-text">Shared progress.</span></h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            I contribute fixes to tools I use: tracing the problem, making a focused change,
            and working through upstream review. Explore my merged contributions and
            open pull requests in T3 Code and Salesforce Inspector Reloaded.
          </p>
        </div>

        <dl className="grid grid-cols-3 divide-x divide-purple-900/40 rounded-2xl border border-purple-800/30 bg-black/30 py-6 mb-8">
          {[
            [String(mergedCount), 'Merged in this feed'],
            [String(openCount), 'Open for review'],
            [String(contributionProjects.length), 'Projects'],
          ].map(([value, label]) => (
            <div key={label} className="px-3 sm:px-6 flex flex-col-reverse gap-2">
              <dt className="text-xs sm:text-sm text-gray-400">{label}</dt>
              <dd className="text-3xl sm:text-4xl font-semibold text-white">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-gray-400 mb-12">
          Merged contributions first, then work open for review. Counts reflect this feed,
          refreshed hourly from GitHub. Drafts and closed history are available below each project.
        </p>

        <div className="space-y-16">
          {contributionProjects.map((project, index) => {
            const feed = feeds[index]
            const merged = feed.items.filter((item) => item.status === 'merged')
              .sort((a, b) => (b.mergedAt ?? b.updatedAt ?? '').localeCompare(a.mergedAt ?? a.updatedAt ?? '') || b.number - a.number)
            const open = feed.items.filter((item) => item.status === 'open')
            const drafts = feed.items.filter((item) => item.status === 'draft')
            const closed = feed.items.filter((item) => item.status === 'closed')
            return (
            <section key={project.id} id={project.id} aria-labelledby={`${project.id}-title`} className="scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-7">
                <div className="max-w-2xl">
                  <p className="text-xs font-mono text-gray-400 break-all mb-2">{project.repository}</p>
                  <h2 id={`${project.id}-title`} className="text-2xl sm:text-3xl font-semibold text-white mb-3">{project.name}</h2>
                  <p className="text-gray-300 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => <span key={tag} className="text-xs text-purple-200 border border-purple-800/40 rounded-full px-3 py-1">{tag}</span>)}
                  </div>
                </div>
                <a href={contributionSearchUrl(project.repository)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white shrink-0">
                  All my pull requests <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-gray-400 mb-5">
                {feed.source === 'snapshot' ? 'GitHub is temporarily unavailable. Showing saved contributions from ' : 'Last synced '}
                <time dateTime={feed.syncedAt}>
                  {formatDate(feed.syncedAt)}{feed.source === 'github' && ` at ${new Date(feed.syncedAt).toISOString().slice(11, 16)} UTC`}
                </time>.
                {feed.totalCount > feed.items.length && ` Showing the ${feed.items.length} most recently updated PRs of ${feed.totalCount}; the full history is on GitHub.`}
              </p>
              {feed.items.length === 0 && (
                <p className="text-gray-400 border border-purple-900/30 rounded-xl p-6">No public pull requests found yet.</p>
              )}
              <ContributionHighlights items={merged} title="Merged contributions" projectName={project.name} />
              <ContributionHighlights items={open} title="Open pull requests" projectName={project.name} />
              <ContributionHistory items={drafts} title="Drafts in progress" projectName={project.name} />
              <ContributionHistory items={closed} title="Closed without merge" projectName={project.name} />
            </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
