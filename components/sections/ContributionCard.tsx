import { ArrowUpRight, GitPullRequest, GitMerge, GitPullRequestClosed, GitPullRequestDraft } from 'lucide-react'
import type { Contribution } from '@/lib/contributions'
import { formatDate } from '@/lib/utils'

const statuses = {
  merged: { label: 'Merged', icon: GitMerge, style: 'border-purple-400/30 bg-purple-400/10 text-purple-300' },
  open: { label: 'Open PR', icon: GitPullRequest, style: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' },
  closed: { label: 'Closed', icon: GitPullRequestClosed, style: 'border-red-400/30 bg-red-400/10 text-red-300' },
  draft: { label: 'Draft', icon: GitPullRequestDraft, style: 'border-gray-400/30 bg-gray-400/10 text-gray-300' },
}

export default function ContributionCard({ item, projectName }: { item: Contribution; projectName: string }) {
  const status = statuses[item.status]
  const Icon = status.icon
  return (
    <article className="rounded-xl border border-purple-800/30 bg-gradient-to-br from-purple-950/30 to-black/60 p-6 flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className="font-mono text-sm text-gray-400">#{item.number}</span>
        <span className={`inline-flex items-center gap-1.5 text-xs rounded-full border px-2.5 py-1 ${status.style}`}>
          <Icon className="w-3.5 h-3.5" />{status.label}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-3 break-words flex-1">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">{item.title}</a>
      </h3>
      {item.description && <p className="text-sm leading-relaxed text-gray-300">{item.description}</p>}
      <div className="mt-6 pt-4 border-t border-purple-900/30 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-gray-400">
          {item.mergedAt ? <>Merged <time dateTime={item.mergedAt}>{formatDate(item.mergedAt)}</time></>
            : item.status === 'closed' ? 'Closed without merge'
            : item.status === 'draft' ? 'Work in progress'
            : 'Submitted for upstream review'}
        </span>
        <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${projectName} pull request #${item.number}`} className="inline-flex items-center gap-1 text-sm text-purple-300 hover:text-white">
          View PR <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  )
}
