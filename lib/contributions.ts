export type ContributionStatus = 'open' | 'merged' | 'closed' | 'draft'

export interface Contribution {
  project: string
  number: number
  title: string
  description?: string
  url: string
  status: ContributionStatus
  mergedAt?: string
  updatedAt?: string
}

// Offline fallback only. Live entries come from the upstream GitHub API.
export const contributionsReviewedAt = '2026-09-13'

export const contributionProjects = [
  {
    id: 't3-code',
    name: 'T3 Code',
    repository: 'pingdotgg/t3code',
    description: 'An open-source workspace for AI coding agents. My contributions focus on provider integration, skill discovery, desktop reliability, and remote connections.',
    tags: ['TypeScript', 'Developer tooling', 'Regression tests'],
  },
  {
    id: 'salesforce-inspector-reloaded',
    name: 'Salesforce Inspector Reloaded',
    repository: 'tprouvot/Salesforce-Inspector-reloaded',
    description: 'A browser extension for Salesforce development and administration. My contributions focus on responsive interfaces, import behaviour, and session recovery.',
    tags: ['JavaScript', 'Salesforce APIs', 'Browser extensions'],
  },
]

export const contributions: Contribution[] = [
  {
    "project": "t3-code",
    "number": 7861,
    "title": "Make app permissions actionable",
    "description": "Added a proposed approval flow for connector permissions across web and mobile, including cancellation handling so Stop can resolve a waiting request.",
    "url": "https://github.com/pingdotgg/t3code/pull/7861",
    "status": "open"
  },
  {
    "project": "t3-code",
    "number": 7814,
    "title": "Recover skills with lenient frontmatter",
    "description": "Proposed a focused parser fallback so skills accepted by Claude Code remain discoverable when their descriptions fail strict YAML parsing.",
    "url": "https://github.com/pingdotgg/t3code/pull/7814",
    "status": "open"
  },
  {
    "project": "t3-code",
    "number": 7801,
    "title": "Repair bundled resource-monitor permissions",
    "description": "Proposed restoring executable permissions on bundled telemetry binaries on Linux and macOS, while leaving user-supplied paths untouched.",
    "url": "https://github.com/pingdotgg/t3code/pull/7801",
    "status": "open"
  },
  {
    "project": "t3-code",
    "number": 7815,
    "title": "Handle slower SSH connections",
    "description": "Proposed longer readiness probes for high-latency SSH connections, with regression coverage for connection and tunnel reuse.",
    "url": "https://github.com/pingdotgg/t3code/pull/7815",
    "status": "open"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1172,
    "title": "Keep the debug-log filter focused",
    "description": "Debounced preview filtering and kept the input editable, so typing no longer drops focus while the log preview is processed.",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1172",
    "status": "merged",
    "mergedAt": "2026-09-02"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1154,
    "title": "Isolate invalid import rows",
    "description": "Proposed retrying a rejected SOAP batch row by row so a type mismatch in one record does not mark valid records as failed.",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1154",
    "status": "open"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1166,
    "title": "Recover an expired Salesforce session",
    "description": "Proposed retrieving a fresh browser session after a 401 response and retrying once, with a guard against repeated retries.",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1166",
    "status": "open"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1163,
    "title": "Keep metadata search responsive",
    "description": "Proposed deferring expensive metadata filtering until typing pauses, while updating the input immediately.",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1163",
    "status": "open"
  }
]

export function contributionSearchUrl(repository: string) {
  return `https://github.com/${repository}/pulls?q=${encodeURIComponent('is:pr author:Exotic209093')}`
}
