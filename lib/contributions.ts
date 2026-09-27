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
export const contributionsReviewedAt = '2026-09-27'

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
    "number": 7815,
    "title": "fix(desktop): give the SSH readiness probe room for high-RTT links",
    "url": "https://github.com/pingdotgg/t3code/pull/7815",
    "status": "open",
    "updatedAt": "2026-09-22T07:54:16Z"
  },
  {
    "project": "t3-code",
    "number": 11616,
    "title": "fix(web): allow reverting interrupted turns to edit and restart",
    "url": "https://github.com/pingdotgg/t3code/pull/11616",
    "status": "closed",
    "updatedAt": "2026-09-19T05:14:13Z"
  },
  {
    "project": "t3-code",
    "number": 7814,
    "title": "fix(server): recover skill frontmatter Claude Code itself accepts",
    "url": "https://github.com/pingdotgg/t3code/pull/7814",
    "status": "closed",
    "updatedAt": "2026-09-19T05:07:06Z"
  },
  {
    "project": "t3-code",
    "number": 7801,
    "title": "fix(server): self-heal a non-executable bundled resource-monitor binary",
    "url": "https://github.com/pingdotgg/t3code/pull/7801",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:38Z"
  },
  {
    "project": "t3-code",
    "number": 11612,
    "title": "fix(mobile): render markdown in question cards",
    "url": "https://github.com/pingdotgg/t3code/pull/11612",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:36Z"
  },
  {
    "project": "t3-code",
    "number": 11614,
    "title": "fix(mobile): prevent text clipping on iOS chat messages",
    "url": "https://github.com/pingdotgg/t3code/pull/11614",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:33Z"
  },
  {
    "project": "t3-code",
    "number": 11608,
    "title": "fix(client-runtime): map cancelled and interrupted subagent terminal statuses",
    "url": "https://github.com/pingdotgg/t3code/pull/11608",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:30Z"
  },
  {
    "project": "t3-code",
    "number": 11619,
    "title": "fix(desktop): serve complete assets via t3code:// protocol",
    "url": "https://github.com/pingdotgg/t3code/pull/11619",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:27Z"
  },
  {
    "project": "t3-code",
    "number": 11624,
    "title": "fix(server): prevent preview_snapshot from bricking sessions with oversized images",
    "url": "https://github.com/pingdotgg/t3code/pull/11624",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:25Z"
  },
  {
    "project": "t3-code",
    "number": 11620,
    "title": "fix(web): fully hide terminal cursor edges during blink off phase",
    "url": "https://github.com/pingdotgg/t3code/pull/11620",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:22Z"
  },
  {
    "project": "t3-code",
    "number": 11621,
    "title": "fix(web): allow changing keybindings in settings",
    "url": "https://github.com/pingdotgg/t3code/pull/11621",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:19Z"
  },
  {
    "project": "t3-code",
    "number": 11622,
    "title": "fix(web): close new tab selector when clicking an open tab",
    "url": "https://github.com/pingdotgg/t3code/pull/11622",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:17Z"
  },
  {
    "project": "t3-code",
    "number": 11629,
    "title": "fix(web): show all project instances in filter across multiple machines",
    "url": "https://github.com/pingdotgg/t3code/pull/11629",
    "status": "closed",
    "updatedAt": "2026-09-19T04:38:14Z"
  },
  {
    "project": "t3-code",
    "number": 7861,
    "title": "fix(codex): surface app permission requests as approvable",
    "url": "https://github.com/pingdotgg/t3code/pull/7861",
    "status": "merged",
    "mergedAt": "2026-09-19T04:36:31Z",
    "updatedAt": "2026-09-19T04:36:31Z"
  },
  {
    "project": "t3-code",
    "number": 11611,
    "title": "fix(mobile): prevent overlapping text and UI on Android chat messages",
    "url": "https://github.com/pingdotgg/t3code/pull/11611",
    "status": "merged",
    "mergedAt": "2026-09-17T18:12:49Z",
    "updatedAt": "2026-09-17T18:13:24Z"
  },
  {
    "project": "t3-code",
    "number": 11625,
    "title": "fix(server): correctly report usage limits with multi-account Codex routing",
    "url": "https://github.com/pingdotgg/t3code/pull/11625",
    "status": "closed",
    "updatedAt": "2026-09-16T13:23:54Z"
  },
  {
    "project": "t3-code",
    "number": 11610,
    "title": "fix(web): prevent initials badge from obscuring provider icon at small sizes",
    "url": "https://github.com/pingdotgg/t3code/pull/11610",
    "status": "closed",
    "updatedAt": "2026-09-15T17:47:11Z"
  },
  {
    "project": "t3-code",
    "number": 7866,
    "title": "fix(desktop): stop spellcheck underlines on the composer",
    "url": "https://github.com/pingdotgg/t3code/pull/7866",
    "status": "closed",
    "updatedAt": "2026-09-07T22:23:04Z"
  },
  {
    "project": "t3-code",
    "number": 7867,
    "title": "fix(mobile): stop the changed files widget from crashing",
    "url": "https://github.com/pingdotgg/t3code/pull/7867",
    "status": "closed",
    "updatedAt": "2026-09-07T07:18:28Z"
  },
  {
    "project": "t3-code",
    "number": 7987,
    "title": "fix(server): cancel pending questions on stop",
    "url": "https://github.com/pingdotgg/t3code/pull/7987",
    "status": "closed",
    "updatedAt": "2026-09-05T02:30:17Z"
  },
  {
    "project": "t3-code",
    "number": 7799,
    "title": "fix(web): stop tool-name prefix from duplicating command detail",
    "url": "https://github.com/pingdotgg/t3code/pull/7799",
    "status": "closed",
    "updatedAt": "2026-09-04T01:55:32Z"
  },
  {
    "project": "t3-code",
    "number": 7859,
    "title": "fix(mobile): stop silently swallowing taps on out-of-workspace file links",
    "url": "https://github.com/pingdotgg/t3code/pull/7859",
    "status": "closed",
    "updatedAt": "2026-09-04T01:55:26Z"
  },
  {
    "project": "t3-code",
    "number": 7869,
    "title": "fix(codex): accept ChatGPT Edu Plus accounts",
    "url": "https://github.com/pingdotgg/t3code/pull/7869",
    "status": "closed",
    "updatedAt": "2026-09-04T01:55:21Z"
  },
  {
    "project": "t3-code",
    "number": 7819,
    "title": "fix(server): alias Grok's product-name model slug to a valid ACP modelId",
    "url": "https://github.com/pingdotgg/t3code/pull/7819",
    "status": "closed",
    "updatedAt": "2026-09-02T01:48:53Z"
  },
  {
    "project": "t3-code",
    "number": 7868,
    "title": "fix(web): keep the send action visible during active turns",
    "url": "https://github.com/pingdotgg/t3code/pull/7868",
    "status": "closed",
    "updatedAt": "2026-08-28T08:06:29Z"
  },
  {
    "project": "t3-code",
    "number": 7862,
    "title": "fix(server): normalize full repository URLs in GitLab lookups",
    "url": "https://github.com/pingdotgg/t3code/pull/7862",
    "status": "closed",
    "updatedAt": "2026-08-28T08:05:29Z"
  },
  {
    "project": "t3-code",
    "number": 7860,
    "title": "fix(web): close hover tooltips when the chat timeline scrolls",
    "url": "https://github.com/pingdotgg/t3code/pull/7860",
    "status": "closed",
    "updatedAt": "2026-08-28T08:04:22Z"
  },
  {
    "project": "t3-code",
    "number": 7988,
    "title": "fix(server): strip terminal escape sequences from opencode CLI output",
    "url": "https://github.com/pingdotgg/t3code/pull/7988",
    "status": "closed",
    "updatedAt": "2026-08-28T07:56:01Z"
  },
  {
    "project": "t3-code",
    "number": 7864,
    "title": "fix(web): keep thread sidebar populated across Settings round-trips",
    "url": "https://github.com/pingdotgg/t3code/pull/7864",
    "status": "closed",
    "updatedAt": "2026-08-27T11:26:27Z"
  },
  {
    "project": "t3-code",
    "number": 7802,
    "title": "fix(server): price Daybreak models under their LiteLLM alias",
    "url": "https://github.com/pingdotgg/t3code/pull/7802",
    "status": "closed",
    "updatedAt": "2026-08-27T11:26:22Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1160,
    "title": "fix: Improve selected text visibility on highlighted rows",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1160",
    "status": "merged",
    "mergedAt": "2026-09-23T09:58:26Z",
    "updatedAt": "2026-09-23T09:58:26Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1157,
    "title": "fix: Strip markdown code block tags from Agentforce SOQL output",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1157",
    "status": "closed",
    "updatedAt": "2026-09-23T09:23:36Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1374,
    "title": "Add Markdown copy format to Data Export",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1374",
    "status": "open",
    "updatedAt": "2026-09-20T09:52:20Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1377,
    "title": "Restore Data Export section resizing",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1377",
    "status": "open",
    "updatedAt": "2026-09-19T03:04:19Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1376,
    "title": "Add autocomplete suggestion filters",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1376",
    "status": "open",
    "updatedAt": "2026-09-19T02:59:55Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1375,
    "title": "Add pinning for persistent query tabs",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1375",
    "status": "open",
    "updatedAt": "2026-09-19T02:57:26Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1373,
    "title": "Fix multiline debug log filtering",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1373",
    "status": "open",
    "updatedAt": "2026-09-19T02:53:25Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1166,
    "title": "fix: Auto-retry with fresh session on 401 Unauthorized",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1166",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:30Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1165,
    "title": "fix: Align Field Creator defaults with Salesforce defaults",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1165",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:29Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1164,
    "title": "fix: Prevent keyboard shortcuts from executing outside Salesforce",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1164",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:28Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1163,
    "title": "fix: Debounce metadata search filter to prevent UI freezing",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1163",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:27Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1162,
    "title": "chore: Remove leftover scrollOnFlowBuilder reference from tests",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1162",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:26Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1161,
    "title": "fix: Show warning instead of error when field permissions fail",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1161",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:25Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1158,
    "title": "fix: Make filter field dropdown auto-width for long field names",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1158",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:23Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1156,
    "title": "fix: Add enhanced setup page shortcuts for Users, Roles, Permission Sets",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1156",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:21Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1155,
    "title": "feat: Add Excel download option to Data Export",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1155",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:20Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1154,
    "title": "[fix] Retry batch-level SOAP failures individually to isolate invalid rows (#1151)",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1154",
    "status": "open",
    "updatedAt": "2026-09-19T02:40:19Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1172,
    "title": "fix: debounce debug log preview filter to keep focus while typing",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1172",
    "status": "merged",
    "mergedAt": "2026-09-02T12:48:25Z",
    "updatedAt": "2026-09-02T12:48:25Z"
  },
  {
    "project": "salesforce-inspector-reloaded",
    "number": 1159,
    "title": "fix: Ensure underscores visible in custom field names at all zoom levels",
    "url": "https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1159",
    "status": "closed",
    "updatedAt": "2026-08-21T17:11:18Z"
  }
]

export function contributionSearchUrl(repository: string) {
  return `https://github.com/${repository}/pulls?q=${encodeURIComponent('is:pr author:Exotic209093')}`
}
