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

// Reviewed against the owning repositories on 27 September 2026. These describe
// implementation and release boundaries, not inferred customer impact. Docify's
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
    relatedProjectIds: ['salesforce-spreadsheet-formatter', 'galacia-vault'],
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
    relatedProjectIds: ['infinity-docs', 'file-insights'],
    sources: [],
  },
  galacia: {
    reviewedAt: '2026-09-27',
    problem: 'Galacia needed a public home that could explain its first product and show the longer-term direction without making future products look available. I built a product hub around clear availability information, preparation guides and a consistent visual identity.',
    role: 'I created the brand and public website, built the product explorer and optional Three.js glacier, and organised the product work into separate repositories. I also worked on the company account beta and the website deployment on the shared OVH VPS.',
    decisions: [
      {
        title: 'Make the visual layer optional',
        detail: 'The glacier begins as an SVG and adds the 3D scene only when motion and data preferences allow it. Keyboard navigation, reduced motion and the static fallback remain part of the main experience, with rendering stopped when the scene is paused or offscreen.',
      },
      {
        title: 'Separate a live website from a product launch',
        detail: 'Product pages distinguish development, prototypes and planned concepts. The account portal is a beta with account-data controls, while live payments stay disabled and customer production has separate release and infrastructure gates.',
      },
    ],
    outcome: 'The public website is live at galacia.app, with product pages, guides, support information and an account beta. It runs on the shared OVH VPS. Public-page checks cover responsive layouts, keyboard interaction and progressive enhancement.',
    boundary: 'Galacia Vault is the first product and remains in development. Docs, Track and Connect are discovery concepts; Hosting is a prototype without a public hosting service. Website availability does not establish customer product acceptance.',
    contactLabel: 'Discuss your website',
    contactPrompt: 'Tell me what your product needs to communicate, who it is for, and which visitor journey should work first.',
    relatedProjectIds: ['the-loft-zante', 'galacia-vault'],
    sources: [
      { label: 'Visit the public website', href: 'https://galacia.app' },
      { label: 'Vault availability and preparation', href: 'https://galacia.app/galacia-vault/' },
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
    relatedProjectIds: ['galacia', 'bloons-tower-defense'],
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
