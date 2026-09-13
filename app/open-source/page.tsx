import type { Metadata } from 'next'
import { ArrowUpRight, GitPullRequest, GitMerge } from 'lucide-react'
import { contributionProjects, contributions, contributionsReviewedAt, contributionSearchUrl } from '@/lib/contributions'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Open Source',
  description: 'James Collard’s contributions to T3 Code and Salesforce Inspector Reloaded: upstream pull requests, bug fixes, and regression coverage.',
  alternates: { canonical: '/open-source' },
}

const statusStyles = {
  merged: 'border-purple-400/30 bg-purple-400/10 text-purple-300',
  open: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  closed: 'border-red-400/30 bg-red-400/10 text-red-300',
  draft: 'border-gray-400/30 bg-gray-400/10 text-gray-300',
}

export default function OpenSourcePage() {
  const mergedCount = contributions.filter((item) => item.status === 'merged').length

  return (
    <div data-portfolio-section className="pt-28 md:pt-36 pb-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-purple-300 mb-4">Working with the community</p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">Open source.<br /><span className="gradient-text">Shared progress.</span></h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            I contribute fixes to tools I use: tracing the problem, making a focused change,
            and working through upstream review. Here is a selection of my work in T3 Code
            and Salesforce Inspector Reloaded.
          </p>
        </div>

        <dl className="grid grid-cols-3 divide-x divide-purple-900/40 rounded-2xl border border-purple-800/30 bg-black/30 py-6 mb-8">
          {[
            [String(contributionProjects.length), 'Projects'],
            [String(contributions.length), 'Selected PRs'],
            [String(mergedCount), 'Merged in selection'],
          ].map(([value, label]) => (
            <div key={label} className="px-3 sm:px-6 flex flex-col-reverse gap-2">
              <dt className="text-xs sm:text-sm text-gray-400">{label}</dt>
              <dd className="text-3xl sm:text-4xl font-semibold text-white">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-gray-400 mb-12">
          Status reviewed <time dateTime={contributionsReviewedAt}>{formatDate(contributionsReviewedAt)}</time>.
          {' '}These are selected pull requests; GitHub has the latest review and merge status.
        </p>

        <div className="space-y-16">
          {contributionProjects.map((project) => (
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
              <div className="grid md:grid-cols-2 gap-4">
                {contributions.filter((item) => item.project === project.id).map((item) => (
                  <article key={item.url} className="rounded-xl border border-purple-800/30 bg-gradient-to-br from-purple-950/30 to-black/60 p-6 flex flex-col">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="font-mono text-sm text-gray-400">#{item.number}</span>
                      <span className={`inline-flex items-center gap-1.5 text-xs rounded-full border px-2.5 py-1 ${statusStyles[item.status]}`}>
                        {item.status === 'merged' ? <GitMerge className="w-3.5 h-3.5" /> : <GitPullRequest className="w-3.5 h-3.5" />}
                        {item.status === 'open' ? 'Open PR' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">{item.title}</a>
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-300 flex-1">{item.description}</p>
                    <div className="mt-6 pt-4 border-t border-purple-900/30 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-gray-400">
                        {item.mergedAt ? <>Merged <time dateTime={item.mergedAt}>{formatDate(item.mergedAt)}</time></> : 'Submitted for upstream review'}
                      </span>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} pull request #${item.number}`} className="inline-flex items-center gap-1 text-sm text-purple-300 hover:text-white">
                        View PR <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
