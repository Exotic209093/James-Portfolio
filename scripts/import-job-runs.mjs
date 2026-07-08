#!/usr/bin/env node
// Imports job-routine runs from the Claude-Skills repo into the portfolio's
// job dashboard data (lib/job-run-data.ts).
//
// Usage:
//   node scripts/import-job-runs.mjs <runs-dir>
//
// <runs-dir> holds one folder per run (named by date, e.g. 2026-07-02/), each
// containing the run's DIGEST.md plus one folder per application with the
// job-routine's package.json inside — i.e. the layout of
// Claude-Skills:jobs/applications/. When runs live on unmerged branches,
// materialise them first, e.g.:
//   git archive origin/<branch> jobs/applications/<date> | tar -x --strip-components=2
//
// Application details (title, company, salary, match notes, status, …) come
// straight from each package.json. Run-level context that only exists as
// prose in DIGEST.md (candidates seen, screened-out groups, notes) is
// curated by hand in RUN_META below — add an entry when importing a new run.
//
// The nightly runs between 2026-07-02 and 2026-07-08 each started from an
// unmerged baseline (their PRs were never merged, so seen-jobs.json never
// advanced past 2026-06-09) and therefore re-queued many of the same jobs.
// Each unique job (by the routine's jobKey) is attributed to the first run
// that queued it; repeats are counted per run and surfaced as a run note.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SEARCHES = [
  'Software Engineer (remote)',
  'Software Engineer (London)',
  'Software Engineer (Kent)',
  'Software Developer (remote)',
  'Software Developer (South East)',
  'Full Stack Developer (remote)',
  'Full Stack Developer (London)',
  'Full Stack Engineer (remote)',
  'Frontend Developer (remote)',
  'Frontend Developer (London)',
  'React Developer (remote)',
  'Back-End Developer (remote)',
  'Node.js Developer (remote)',
  'TypeScript Developer (remote)',
  'JavaScript Developer (remote)',
  'Web Developer (remote)',
  'Web Developer (London)',
  'Python Developer (remote)',
  'Salesforce Developer (remote)',
  'Salesforce Developer (London)',
  'Salesforce Administrator (remote)',
  'AI Engineer (remote)',
]

// Hand-curated per-run context from each run's DIGEST.md.
const RUN_META = {
  '2026-07-02': {
    candidatesSeen: 82,
    screenedOut: [
      { reason: 'Security clearance required', count: 9 },
      { reason: 'Excluded keyword ("principal" role)', count: 1 },
      { reason: 'Below minimum salary', count: 4 },
      { reason: 'Role-level mismatch (judgment call)', count: 1 },
      { reason: 'Title mismatch', count: 9 },
      { reason: 'On-site, outside allowed locations', count: 23 },
    ],
    notes: [
      'First successful run since 2026-06-09 — the 2026-07-01 run aborted before searching because the Indeed integration was unavailable, so this run cleared a ~3-week backlog across all 22 saved searches.',
      'A persistent Indeed API rate limit stopped screening partway through; 24 candidates were deferred (not persisted) so they resurface on the next run.',
      'The Akoova DevOps role carries a mandatory paid on-call rota that appears to conflict with the stated no-24/7-on-call deal-breaker — flagged for review before submission.',
    ],
  },
  '2026-07-03': {
    candidatesSeen: 87,
    screenedOut: [
      { reason: 'Security clearance required', count: 4 },
      { reason: 'Excluded keyword ("principal" role)', count: 1 },
      { reason: 'Below minimum salary', count: 3 },
      { reason: 'Not a genuine software role (field sales)', count: 1 },
    ],
    notes: [
      'The Indeed detail-fetch rate limit hit after ~34 candidates were screened; the remaining ~53 were deferred (not persisted) for the next run.',
    ],
  },
  '2026-07-04': {
    candidatesSeen: 93,
    screenedOut: [
      { reason: 'Security clearance required', count: 5 },
      { reason: 'Below minimum salary', count: 1 },
      { reason: 'Suspicious / non-GBP salary', count: 1 },
      { reason: 'Equity-only compensation', count: 1 },
      { reason: 'Title mismatch', count: 8 },
      { reason: 'On-site, outside allowed locations', count: 24 },
    ],
    notes: [
      'A persistent Indeed rate limit left 26 title/location-passing candidates unscreened; they were deferred (not persisted) for the next run.',
      'Every CGI posting checked this run (5) required UK Security Clearance, consistent with earlier runs.',
    ],
  },
  '2026-07-05': {
    candidatesSeen: 97,
    screenedOut: [
      { reason: 'Security clearance required', count: 4 },
      { reason: 'Excluded keyword ("principal" role)', count: 1 },
      { reason: 'Below minimum salary', count: 2 },
      { reason: 'Suspicious / non-GBP salary', count: 1 },
      { reason: 'Listing location contradicts description', count: 1 },
      { reason: 'No real job content in posting', count: 1 },
      { reason: 'Title mismatch', count: 6 },
      { reason: 'On-site, outside allowed locations', count: 24 },
    ],
    notes: [
      'The Indeed rate limit deferred 39 candidates that had already passed the cheap title/location screen.',
      'Two search-result titles were misleading against the fetched description (Client Server "Full Stack Engineer TypeScript Node" is really a Lead C#/.NET role; Performance Software "ROCHESTER" is really Cardiff/Cheltenham).',
      '"Information Tech Consultants" posted three near-identical urgent-start listings — a recruiter-mill pattern worth watching.',
    ],
  },
  '2026-07-06': {
    candidatesSeen: 95,
    screenedOut: [
      { reason: 'Security clearance required', count: 4 },
      { reason: 'Excluded keyword ("principal" role)', count: 1 },
      { reason: '24/7 on-call rota (deal-breaker)', count: 2 },
      { reason: 'Below minimum salary', count: 3 },
      { reason: 'Ambiguous / unverifiable salary', count: 1 },
      { reason: 'Occupation sanity check (not a real dev role)', count: 2 },
      { reason: 'Title or location mismatch', count: 30 },
    ],
    notes: [
      'Stretch applications dominate this batch — most queued roles disclose a material skills or seniority gap per the "apply broadly, disclose honestly" policy.',
      'Live Nation\'s Lead Software Engineer listing was screened out this run against the 24/7 on-call deal-breaker, even though an earlier run had queued it.',
      'The Indeed rate limit deferred ~25 candidates to the next run.',
    ],
  },
  '2026-07-07': {
    candidatesSeen: 92,
    screenedOut: [
      { reason: 'Security clearance required', count: 3 },
      { reason: 'Below minimum salary', count: 4 },
      { reason: 'Suspicious / non-GBP salary', count: 1 },
      { reason: 'Not a live vacancy (CV-database advert)', count: 1 },
      { reason: 'Stale posting / wrong domain', count: 1 },
    ],
    notes: [
      'The Indeed rate limit became persistent after 35 of 85 title-passing candidates were fully screened; the remaining ~50 were deferred (not persisted) for the next run.',
    ],
  },
  '2026-07-08': {
    candidatesSeen: 96,
    screenedOut: [
      { reason: 'Security clearance required', count: 4 },
      { reason: 'Title mismatch', count: 5 },
      { reason: 'Below minimum salary', count: 3 },
      { reason: 'Excluded keyword ("principal" role)', count: 1 },
      { reason: 'Stale posting', count: 1 },
      { reason: 'Location not allowed', count: 1 },
      { reason: 'Equity-only compensation', count: 1 },
      { reason: 'Current employer', count: 1 },
      { reason: 'Not a live vacancy (CV-database advert)', count: 1 },
    ],
    notes: [
      'Midday run. The Indeed rate limit hit after ~52 detail fetches; ~35 cheap-screened candidates were deferred (not persisted) for the next run.',
      '"Royal Tunbridge Wells" was initially rejected by an overly literal location match and corrected mid-run.',
      'The Minimal Viable Launch application is blocked on a completed 16Personalities test link that only the applicant can supply.',
    ],
  },
}

// Jobs whose cover letters disclose a material core-stack or seniority gap —
// the digests' "apply broadly, disclose gaps" stretch applications. Keyed by
// the routine's jobKey; curated from each run's DIGEST.md.
const STRETCH = new Set([
  'indeed:backend-software-engineer-c-rust-hft|client-server|london',
  'indeed:dynamics-365-ce-developer-power-platform-crm|cgi|united-kingdom',
  'indeed:lead-software-engineer-remote-united-kingdom|live-nation|remote',
  'indeed:net-developer|noir|london',
  'indeed:senior-software-developer-healthtech-java-aws|ashtons-hospital-pharmacy-services|remote',
  'indeed:senior-software-engineer|vladimer-avdalov-technologies-ltd|remote',
  'indeed:software-developer|holt-executive|west-sussex',
  'indeed:software-engineer|holt-executive|west-sussex',
  'indeed:software-engineer|longshot-systems-ltd|london',
  'indeed:software-engineer|unidays|london',
  'indeed:staff-software-engineer-back-end|capital-one|london',
  'indeed:java-developer|pulse-it-solutions|burgess-hill',
  'indeed:junior-big-data-developer|information-tech-consultants|greater-london',
  'indeed:lead-software-engineer-c-net-fintech|client-server|reigate',
  'indeed:net-developer-ai-projects|hastings-direct|bexhill',
  'indeed:net-developer|noir|withdean',
  'indeed:net-developer|noir|canterbury',
  'indeed:roblox-developer-gameplay-programmer|cinnamon-software|remote',
  'indeed:senior-full-stack-java-react-developer|skm-group|remote',
  'indeed:software-development-engineer-in-test|eckoh|hemel-hempstead',
  'indeed:software-engineer-imaging-systems-c-ai-enabled|photonic-science-and-engineering|st-leonards-on-sea',
  'indeed:software-engineer|tesla-engineering-ltd|pulborough',
  'indeed:backend-engineer-ruby-ai-engineering-duo-agent-platform-tools|gitlab-inc|remote',
  'indeed:senior-backend-engineer-ruby-ai-engineering-duo-agent-platform-tools|gitlab-inc|remote',
  'indeed:full-stack-engineer-typescript-node|client-server|london',
  'indeed:htp-software-engineer|amber-labs|remote',
  'indeed:intapp-engineer|ferox-partners|remote',
  'indeed:lead-full-stack-engineer-developer|tapi-carpets-floors|london',
  'indeed:senior-full-stack-engineer-developer|tapi-carpets-floors|london',
  'indeed:principle-software-engineer|eckoh|remote',
  'indeed:senior-full-stack-developer|sthree|london',
  'indeed:senior-java-full-stack-developer|robert-walters-outsourcing|london',
  'indeed:startup-founder-cto-for-health-care-full-stack-developer|healthos-uk|remote',
  'indeed:bi-developer|urban-empire-recruitment|london',
  'indeed:big-data-developer-with-python|information-tech-consultants|greater-london',
  'indeed:qa-engineer-product-operations-engineer-remote|remotestar|remote',
  'indeed:senior-frontend-developer|cygnet-digital|united-kingdom',
  'indeed:software-engineer-rochester-united-kingdom|performance-software|rochester',
  'indeed:frontend-vue-js-developer-data-dashboards|urban-environments-ltd|brighton',
  'indeed:integration-developer|rhp|teddington',
  'indeed:java-developer-payments|huxley|london',
  'indeed:senior-software-engineer|paxton-access|brighton',
  'indeed:software-engineer|computer-futures-solutions|london',
  'indeed:full-stack-developer-python-django-go-aws|client-server|london',
  'indeed:full-stack-engineer-java-javascript-healthtech|client-server|london',
  'indeed:sql-developer|information-tech-consultants|greater-london',
  'indeed:senior-software-engineer|unidays|london',
])

// Listings that got a new jobKey on Indeed (retitled) but are the same job —
// map the later key to the first-seen key so they dedupe together.
const JOBKEY_ALIASES = {
  'indeed:graduate-web-computer-programmer|fire-protection-online|canterbury':
    'indeed:graduate-web-computer-programmer-this-is-a-full-time-in-office-daily-position|fire-protection-online|canterbury',
}

// Extra "honest gaps" context discovered by later runs about a job that an
// earlier run queued.
const EXTRA_GAPS = {
  'indeed:python-web-developer|mksk-consulting|remote': [
    'Flag: later runs re-screened this listing as a likely junk posting (salary quoted in an unrecognised currency)',
  ],
  'indeed:lead-software-engineer-remote-united-kingdom|live-nation|remote': [
    'Flag: the 2026-07-06 run screened this same listing out against the 24/7 on-call deal-breaker',
  ],
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function applicationId(pkg, usedIds) {
  const companyBase = pkg.job.company.split('(')[0].split(',')[0].trim()
  const titleBase = pkg.job.title.replace(/\s*\([^)]*\)/g, '').trim()
  const base = `${slugify(companyBase)}-${slugify(titleBase)}`
  if (!usedIds.has(base)) return base
  const location = pkg.jobKey.split('|').pop()
  const withLocation = `${base}-${slugify(location)}`
  if (!usedIds.has(withLocation)) return withLocation
  let n = 2
  while (usedIds.has(`${withLocation}-${n}`)) n++
  return `${withLocation}-${n}`
}

// Slugs already used by the hand-written 2026-06-09 run in lib/jobs.ts.
const RESERVED_IDS = [
  'global-4-communications-full-stack-developer',
  'ramark-systems-web-developer',
  'value-tech-labs-web-developer',
  'trimble-software-engineer',
  'purplebricks-lead-backend-fullstack-engineer',
  'ramark-systems-software-test-engineer',
]

function main() {
  const runsDir = process.argv[2]
  if (!runsDir || !fs.existsSync(runsDir)) {
    console.error('Usage: node scripts/import-job-runs.mjs <runs-dir>')
    process.exit(1)
  }

  const runDates = fs
    .readdirSync(runsDir)
    .filter((name) => /^\d{4}-\d{2}-\d{2}/.test(name))
    .filter((name) => fs.statSync(path.join(runsDir, name)).isDirectory())
    .sort()

  const usedIds = new Set(RESERVED_IDS)
  const seenJobKeys = new Set()
  const runs = []

  for (const date of runDates) {
    const meta = RUN_META[date]
    if (!meta) {
      console.error(
        `No RUN_META entry for ${date} — add one (candidatesSeen, screenedOut, notes from its DIGEST.md) before importing. Skipping.`
      )
      continue
    }

    const runDir = path.join(runsDir, date)
    const applications = []
    let repeats = 0

    for (const entry of fs.readdirSync(runDir).sort()) {
      const pkgPath = path.join(runDir, entry, 'package.json')
      if (!fs.existsSync(pkgPath)) continue
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

      const jobKey = JOBKEY_ALIASES[pkg.jobKey] ?? pkg.jobKey
      if (seenJobKeys.has(jobKey)) {
        repeats++
        continue
      }
      seenJobKeys.add(jobKey)

      const id = applicationId(pkg, usedIds)
      usedIds.add(id)

      const gaps = [...(pkg.matchNotes?.gaps ?? []), ...(EXTRA_GAPS[jobKey] ?? [])]

      const application = {
        id,
        title: pkg.job.title,
        company: pkg.job.company,
        location: pkg.job.location || 'Not stated',
        salary: pkg.job.salary || 'Not stated',
        jobType: pkg.job.jobType || 'Not stated',
        source: pkg.source,
        applyUrl: pkg.applyUrl,
        status: pkg.status,
        summary: pkg.job.descriptionSummary,
        match: {
          strongFor: pkg.matchNotes?.strongFor ?? [],
          gaps,
        },
        needsInput: (pkg.needsInput ?? []).map((item) =>
          typeof item === 'string' ? item : item.key
        ),
        appliedDate: date,
      }
      if (STRETCH.has(jobKey)) application.stretch = true
      applications.push(application)
    }

    const notes = [...meta.notes]
    if (repeats > 0) {
      notes.push(
        `${repeats} of this run's queued packages were re-queues of jobs already queued by an earlier run (each nightly session ran against a stale dedupe baseline while the run branches sat unmerged); repeats are listed once, under the run that first queued them.`
      )
    }

    runs.push({
      id: date,
      date,
      searches: SEARCHES,
      candidatesSeen: meta.candidatesSeen,
      applications,
      screenedOut: meta.screenedOut,
      notes,
    })
  }

  const header = `// GENERATED FILE — do not edit by hand.
// Produced by scripts/import-job-runs.mjs from the Claude-Skills job-routine
// application packages. Re-run the script to refresh; see the script header
// for how to materialise run folders from unmerged branches.

import type { JobRun } from './jobs'

export const importedJobRuns: JobRun[] = `

  const outPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'lib',
    'job-run-data.ts'
  )
  fs.writeFileSync(outPath, header + JSON.stringify(runs, null, 2) + '\n')

  const total = runs.reduce((sum, run) => sum + run.applications.length, 0)
  console.log(
    `Wrote ${runs.length} runs, ${total} unique applications to ${path.relative(process.cwd(), outPath)}`
  )
}

main()
