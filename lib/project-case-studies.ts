import type { Project } from '@/lib/projects'

export interface ProjectCaseStudy {
  reviewedAt: string
  problem: string
  role: string
  decisions: { title: string; detail: string }[]
  outcome: string
  boundary: string
  contactLabel: string
  contactPrompt: string
  relatedProjectIds: string[]
  sources: { label: string; href: string }[]
}

// Reviewed against the owning repositories on 27 September 2026; Infinity Dox and
// Everfrost were added on 23 November 2026. Infinity Dox figures match the public CV.
// These describe implementation and release boundaries, not inferred customer
// impact. Docify's
// private README confirms only the scope already described in this portfolio;
// private templates, output files and internal links are deliberately not copied.
export const projectCaseStudies: Partial<Record<string, ProjectCaseStudy>> = {
  'wave-link': {
    reviewedAt: '2026-09-27',
    problem: 'I built WaveLink to connect the steps around a Salesforce data task: write a query, inspect an export, prepare a file, then review an import. The aim is a reusable browser workspace where the active org and the intended operation stay visible throughout the job.',
    role: 'I built and iterated on the extension interface, Salesforce API integration and local job workflows. My work includes SOQL exports, guided imports, file conversion and comparison, plus the move towards saved jobs and a shared activity view.',
    decisions: [
      {
        title: 'Keep the workspace in the browser',
        detail: 'A Chrome extension can work alongside the Salesforce session and keep file conversion and comparison local. The tradeoff is taking responsibility for browser storage limits, service-worker restarts and interrupted jobs; these are explicit reliability items in the roadmap.',
      },
      {
        title: 'Narrow the cross-org promise',
        detail: 'I replaced the broad migration navigation with a single-object Copy between orgs workflow. This makes the source, destination and review step easier to describe, while deliberately excluding dependency migration and migration-wide rollback from that workflow.',
      },
    ],
    outcome: 'The project has a published Chrome extension and public source. Newer repository work brings the core workflows into one workspace, with a separate roadmap towards 1.0. A packaged build and a passing automated suite are not substitutes for verifying real Salesforce writes.',
    boundary: 'The public roadmap still tracks write correctness, scheduling reliability and data fidelity before the 1.0 release. Screenshots below show the identified release candidate, not a claim that every screen is in the store version.',
    contactLabel: 'Discuss a Salesforce integration',
    contactPrompt: 'Tell me which Salesforce data task you need to simplify, and where the current process breaks down.',
    relatedProjectIds: ['salesforce-spreadsheet-formatter', 'everfrost-vault'],
    sources: [
      { label: 'Source and product overview', href: 'https://github.com/Exotic209093/WaveLink' },
      { label: 'Scope decisions and release roadmap', href: 'https://github.com/Exotic209093/WaveLink/blob/main/roadmap.md' },
    ],
  },
  docify: {
    reviewedAt: '2026-09-27',
    problem: 'Business documents need consistent text, tables and page breaks across several output formats. I built Docify around that document-layout problem, with a native Rust pipeline that can be called from a Node.js service.',
    role: 'I built the rendering pipeline, document layout and pagination, output backends and Node.js bindings. I also added regression checks for both text content and visual layout so a document that looks close cannot silently contain different text.',
    decisions: [
      {
        title: 'Support a defined document subset',
        detail: 'The engine implements a focused subset of HTML and CSS instead of embedding a browser. That gives the rendering stages a clear contract, but means unsupported styling must produce diagnostics so the caller can choose a fallback renderer.',
      },
      {
        title: 'Share layout where the format allows it',
        detail: 'PDF, PNG and SVG are emitted from a shared layout and display pipeline. Editable DOCX needs a different treatment: Word reflows the document, so its output has separate structural checks and remains pre-production.',
      },
    ],
    outcome: 'The implementation includes document layout, font shaping, pagination, PDF/PNG/SVG output and Node.js integration. Qualification compares extracted text and rendered pages against Chromium, alongside layout and output-format tests.',
    boundary: 'The renderer source is private and DOCX remains pre-production. No private templates or customer documents are published here; the interactive studio is an illustrative explanation, not a browser build of the renderer.',
    contactLabel: 'Discuss document automation',
    contactPrompt: 'Tell me what creates your documents today, the formats you need, and which layout or integration constraints matter.',
    relatedProjectIds: ['infinity-dox', 'file-insights'],
    sources: [],
  },
  'infinity-dox': {
    reviewedAt: '2026-11-23',
    problem: 'Salesforce teams generate proposals, contracts and handover packs from record data, and every customer org needs its own isolated, auditable rendering. The Infinity product suite had to be multi-tenant and secure by default, and maintainable by a very small team moving at AI speed.',
    role: 'I am the primary engineer on the Infinity product suite. I designed the architecture end to end, and I build and operate it: TypeScript services, the React portal, the Salesforce managed package, Terraform and AWS. I work AI-native, with Claude Code and Codex running parallel agents in worktrees, and I review every AI change before it merges.',
    decisions: [
      {
        title: 'Let the quality gates set the pace',
        detail: 'Agents write code faster than anyone can read it, so the gate decides what merges, not the author. Nine GitHub Actions workflows enforce a zero-debt lint gate, typecheck, tests, drift checks and SHA-pinned actions. A bad day means slower merges, but the speed never turns into silent debt.',
      },
      {
        title: 'Fail closed between tenants',
        detail: 'Each tenant authenticates with RS256 JWTs bound to key IDs. Requests are HMAC-signed, replay protection fails closed and outbound calls pass SSRF guards. Sensitive actions land in a hash-chained audit log, and the storage gateway is designed so file content and keys never pass through the portal.',
      },
      {
        title: 'Lock the public API, write down the debt',
        detail: 'Once a managed package is installed, its public API is effectively permanent. I locked it with a CI guard test and moved non-v1 code out of the package. Trade-offs such as staging cost against uptime are recorded in the changelog and runbooks rather than left in people’s heads.',
      },
    ],
    outcome: '4,400+ commits in six months. 3,600+ Apex test methods alongside Vitest, Playwright and LWC Jest suites, with 93% Apex coverage. Terraform manages seven AWS environments. A white- and black-box pentest across five surfaces found 35 issues, and 26 of them are fixed.',
    boundary: 'This is professional work at Apex Infinity Solutions, so the source, customer material and internal links stay private. The figures above come from the repositories and CI as of November 2026. Nine pentest findings were still open at that point.',
    contactLabel: 'Discuss a SaaS or Salesforce build',
    contactPrompt: 'Tell me what you are building, who uses it, and whether security, scale or delivery speed is the constraint.',
    relatedProjectIds: ['docify', 'everfrost-vault'],
    sources: [],
  },
  everfrost: {
    reviewedAt: '2026-11-23',
    problem: 'Selling my own software takes more than writing it. People need a product they can evaluate, a clear way to buy it, support I can actually promise, and infrastructure I can recover. Everfrost started with a broad lineup, then in November 2026 narrowed to one market: teams that run on Salesforce.',
    role: 'I run Everfrost on my own. I build the products, the customer platform and the website, operate the server, give the demos and answer support.',
    decisions: [
      {
        title: 'Sell one product, park the rest',
        detail: 'The original lineup had five products. I cut it to Vault, available now, and Docs, planned, and parked Track and Connect with their research kept. With fewer products, every claim on the site can be backed up.',
      },
      {
        title: 'Label everything for what it is',
        detail: 'Every product page carries its status: a planned product is called planned, and an illustration is labelled as one. The support page names the support hours and says there is no backup cover yet. Buying is a demo, then a written offer, then payment, so nothing is charged before the scope is agreed.',
      },
    ],
    outcome: 'everfrost.app is live with product, pricing, security and support pages, a free storage cost calculator, and an 18-second recording of Vault on a real Salesforce record. Vault is ready for onboarding and the customer platform is in beta. The services run on a self-managed VPS with encrypted off-host backups and a restore drill that passed.',
    boundary: 'No customer or revenue figures are claimed here. Everfrost Docs has no release date or price, and the product repositories are private. Everfrost was called Galacia until 17 November 2026.',
    contactLabel: 'Discuss your product',
    contactPrompt: 'Tell me what you are building, who it is for, and what has to be true before you can sell it.',
    relatedProjectIds: ['everfrost-vault', 'wave-link'],
    sources: [
      { label: 'Visit the public website', href: 'https://everfrost.app' },
      { label: 'Everfrost Vault: how it works, limits and pricing', href: 'https://everfrost.app/everfrost-vault/' },
    ],
  },
  'the-loft-zante': {
    reviewedAt: '2026-09-27',
    problem: 'A hospitality website needs to help visitors picture the venue and answer practical questions quickly: what is on the menu, what is happening, and how to get there. I brought those needs together in one responsive website for The Loft Zante.',
    role: 'I built the Next.js website, reusable React sections, responsive styling and category-based menu browser. The implementation brings together venue imagery, event content, menu data and visitor information.',
    decisions: [
      {
        title: 'Make the menu structured content',
        detail: 'Menu categories, item descriptions, prices and serving options live in typed data and render through a reusable browser. This keeps presentation consistent and makes content changes explicit in the source; it does not provide a separate menu-management service.',
      },
      {
        title: 'Keep the visit information close',
        detail: 'The page combines photography and events with hours, location and a map. Category controls expose their selected state, while responsive sections keep the same information available across screen sizes.',
      },
    ],
    outcome: 'The public repository contains the complete website and menu interaction. Its menu is explicitly labelled as sample content, so the case study demonstrates the implementation without presenting those prices as a current venue menu.',
    boundary: 'The previously linked Vercel preview was unavailable when reviewed. Source is available below; no visitor, booking or revenue impact is claimed.',
    contactLabel: 'Discuss your website',
    contactPrompt: 'Tell me about your business, who the website should help, and what visitors need to do.',
    relatedProjectIds: ['everfrost', 'bloons-tower-defense'],
    sources: [
      { label: 'Website source', href: 'https://github.com/Exotic209093/the-loft-zante' },
      { label: 'Menu implementation and sample-content label', href: 'https://github.com/Exotic209093/the-loft-zante/blob/main/components/MenuBrowser.tsx' },
    ],
  },
}

export function getRelatedProjects(project: Project, catalog: Project[], limit = 2): Project[] {
  const selected = projectCaseStudies[project.id]?.relatedProjectIds ?? []
  const technologies = new Set(project.tech.map((item) => item.toLowerCase()))
  const relevance = (candidate: Project) => {
    const preferred = selected.indexOf(candidate.id)
    if (preferred !== -1) return 100 - preferred
    return (candidate.track === project.track ? 10 : 0)
      + candidate.tech.filter((item) => technologies.has(item.toLowerCase())).length * 2
  }
  return catalog
    .filter((candidate) => candidate.id !== project.id && !candidate.hidden)
    .sort((a, b) => relevance(b) - relevance(a) || a.title.localeCompare(b.title))
    .slice(0, limit)
}
