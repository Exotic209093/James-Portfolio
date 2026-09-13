export interface TechStack {
  category: string
  items: string[]
}

/**
 * A "track" is a branch in the project git-graph — the lane a project's commit
 * sits on. Tracks double as the top-level sections of the work (Salesforce,
 * tooling, AI, systems) so the graph and any filtering share one source of truth.
 */
export type ProjectTrack = 'salesforce' | 'tooling' | 'ai' | 'systems'

export interface TrackMeta {
  id: ProjectTrack
  label: string
  /** Short blurb used in the legend / branch label. */
  description: string
  /** Hex colour used for the SVG lane + dots. */
  color: string
}

// Ordered newest-discipline-first; this order also fixes the lane columns in the graph.
export const projectTracks: TrackMeta[] = [
  {
    id: 'salesforce',
    label: 'Salesforce',
    description: 'Platform engineering, AppExchange packages, and admin tooling',
    color: '#a855f7',
  },
  {
    id: 'tooling',
    label: 'Developer Tooling',
    description: 'Desktop, editor, CLI, and documentation tools',
    color: '#38bdf8',
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    description: 'Agents on the Anthropic SDK and workflow automation',
    color: '#34d399',
  },
  {
    id: 'systems',
    label: 'Systems & Interactive',
    description: 'Websites, browser games, and low-level systems work',
    color: '#fbbf24',
  },
]

export const trackById: Record<ProjectTrack, TrackMeta> = projectTracks.reduce(
  (acc, track) => {
    acc[track.id] = track
    return acc
  },
  {} as Record<ProjectTrack, TrackMeta>
)

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  category?: string
  status?: string
  role?: string
  highlights?: string[]
  image: string
  tech: string[]
  techStack?: TechStack[]
  github?: string
  live?: string
  liveLabel?: string
  featured: boolean
  hidden?: boolean
  date: string
  /** Branch this project's commit sits on in the git-graph view. */
  track: ProjectTrack
}

// Dates reflect the latest reviewed project activity, not original launch dates.
const allProjects: Project[] = [
  {
    "id": "galacia",
    "title": "Galacia",
    "description": "My independent software brand and public product website, starting with Galacia Vault for Salesforce file storage, with an interactive product explorer and a Three.js glacier.",
    "longDescription": "Galacia brings my product work together under one brand. I built and deployed its public website with product pages, preparation guides, support information, and a roadmap that distinguishes development from planned concepts. The site uses a static build and a Node.js server, with an optional Three.js glacier layered over an SVG fallback. Galacia Vault is the first product and remains in development; Galacia Docs, Track, and Connect are planned concepts in discovery.",
    "category": "Product Engineering · Company Website",
    "status": "Website live · Vault in development",
    "role": "Created the Galacia brand and product hub, built the public website and interactive experience, and organised the product work into independent repositories.",
    "highlights": [
      "Built a public product hub with keyboard-accessible product tabs, guides, support pages, and explicit availability information.",
      "Added an optional Three.js glacier with an SVG fallback, reduced-motion support, a pause control, and rendering that stops off-screen.",
      "Deployed the website on Railway with custom domains, HTTPS, redirects, and automated HTTP and browser regression checks."
    ],
    "image": "/projects/galacia.svg",
    "tech": [
      "JavaScript",
      "Node.js",
      "Three.js",
      "SVG",
      "Playwright",
      "Railway"
    ],
    "techStack": [
      {
        "category": "Website",
        "items": [
          "JavaScript",
          "HTML / CSS",
          "Node.js",
          "Static Site Build"
        ]
      },
      {
        "category": "Experience",
        "items": [
          "Three.js",
          "SVG Fallback",
          "Keyboard Navigation",
          "Reduced Motion"
        ]
      },
      {
        "category": "Delivery",
        "items": [
          "Docker",
          "Railway",
          "Playwright",
          "HTTP Regression Tests"
        ]
      }
    ],
    "live": "https://galacia.app",
    "liveLabel": "Visit Galacia",
    "featured": true,
    "date": "2026-09-10",
    "track": "systems"
  },
  {
    "id": "the-loft-zante",
    "title": "The Loft Zante",
    "description": "A hospitality website for O’Callaghan’s Loft in Zakynthos, with a browsable drinks menu, venue photography, events, and visitor information.",
    "longDescription": "The Loft Zante brings a venue-focused web experience together in Next.js, React, and TypeScript. The site combines a photographic hero and gallery with events, an interactive drinks menu, opening hours, and an embedded location map. Menu sections are driven by structured data, with category buttons, prices, descriptions, and serving options. Tailwind CSS supports responsive layouts across the site.",
    "category": "Web Development · Hospitality",
    "status": "Live website",
    "role": "Built the Next.js website, reusable page sections, responsive styling, and interactive menu browser.",
    "highlights": [
      "Built a category-based menu browser backed by typed menu data, including prices, descriptions, and serving options.",
      "Combined venue photography, event content, opening hours, and a location map into a responsive visitor experience.",
      "Used reusable React components and Tailwind CSS for a consistent visual presentation."
    ],
    "image": "/projects/the-loft-zante.svg",
    "tech": [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS"
    ],
    "techStack": [
      {
        "category": "Application",
        "items": [
          "Next.js",
          "React",
          "TypeScript"
        ]
      },
      {
        "category": "Interface",
        "items": [
          "Tailwind CSS",
          "Responsive Layouts",
          "Interactive Menu",
          "Photo Gallery"
        ]
      }
    ],
    "github": "https://github.com/Exotic209093/the-loft-zante",
    "live": "https://the-loft-zante.vercel.app",
    "featured": true,
    "date": "2026-09-12",
    "track": "systems"
  },
  {
    "id": "file-insights",
    "title": "File Insights",
    "description": "A local Python utility for viewing and editing file metadata in the browser — photo EXIF, audio tags, PDF properties, timestamps, and on-demand checksums.",
    "longDescription": "File Insights runs a Flask server on the user’s own machine and presents file metadata in a browser interface. It reads filesystem attributes, image EXIF, audio tags, PDF information, and Office document properties. Supported edits include renaming, timestamps, permissions, EXIF cleanup, audio tags, and PDF metadata. Format handlers are optional, browsing is confined to a selected root folder, and a CLI can inspect a file as JSON without opening the interface.",
    "category": "Developer Tooling · Python Utility",
    "status": "Available from source",
    "role": "Built the Python CLI, Flask JSON API, browser interface, and optional format handlers for local metadata inspection and editing.",
    "highlights": [
      "Kept processing on the local machine with a loopback-only server and browsing restricted to a configured root folder.",
      "Added optional handlers for photo EXIF, audio tags, and PDF metadata, alongside built-in Office document property inspection.",
      "Supported GPS removal, EXIF stripping, file renaming, platform-specific timestamp edits, and on-demand checksums."
    ],
    "image": "/projects/file-insights.svg",
    "tech": [
      "Python",
      "Flask",
      "JavaScript",
      "Pillow",
      "mutagen",
      "pypdf"
    ],
    "techStack": [
      {
        "category": "Core",
        "items": [
          "Python",
          "Flask",
          "CLI",
          "JSON API"
        ]
      },
      {
        "category": "File Formats",
        "items": [
          "Pillow",
          "piexif",
          "mutagen",
          "pypdf",
          "Office Document Properties"
        ]
      },
      {
        "category": "Interface & Quality",
        "items": [
          "HTML / CSS / JavaScript",
          "pytest",
          "Root-Scoped File Access"
        ]
      }
    ],
    "github": "https://github.com/Exotic209093/File-Insights",
    "featured": true,
    "date": "2026-08-08",
    "track": "tooling"
  },
  {
    "id": "infinite-idea",
    "title": "Infinite Idea",
    "description": "A browser-based documentation canvas with Salesforce-aware diagram blocks, metadata importers, reusable templates, and PDF, PNG, and SVG export.",
    "longDescription": "Infinite Idea is a Next.js and tldraw application for building client-facing documentation on a freeform canvas. It combines general diagram blocks with Salesforce-specific shapes for objects, Apex classes, flows, permissions, and queries. Metadata importers turn supported Salesforce files or pasted data into canvas content. Work stays client-side: users download a versioned .infidoc.json file to resume later, or export finished documents to PDF, PNG, or SVG.",
    "category": "Web App · Documentation Tooling",
    "status": "Live web app",
    "role": "Built the canvas editor, custom diagram blocks, Salesforce importers, save-file workflow, and document exports.",
    "highlights": [
      "Extended tldraw with 20 native blocks and six starter templates for process flows, roadmaps, org charts, and Salesforce documentation.",
      "Added Salesforce metadata importers and structured editing for fields, members, permissions, and table cells.",
      "Implemented client-side save/resume and PDF, PNG, and SVG export, with Vitest save-file tests and Playwright smoke tests."
    ],
    "image": "/projects/infinite-idea.svg",
    "tech": [
      "Next.js",
      "TypeScript",
      "tldraw",
      "Tailwind CSS",
      "pdf-lib"
    ],
    "techStack": [
      {
        "category": "Canvas",
        "items": [
          "Next.js",
          "React",
          "TypeScript",
          "tldraw"
        ]
      },
      {
        "category": "Documents",
        "items": [
          "Salesforce Metadata Importers",
          "Versioned JSON Saves",
          "pdf-lib",
          "PNG / SVG Export"
        ]
      },
      {
        "category": "Quality",
        "items": [
          "Vitest",
          "Playwright"
        ]
      }
    ],
    "github": "https://github.com/Exotic209093/Infinity-Idea",
    "live": "https://infinity-idea.vercel.app",
    "featured": false,
    "date": "2026-04-26",
    "track": "tooling"
  },
  {
    "id": "bloons-tower-defense",
    "title": "Bloons Tower Defense",
    "description": "A Bloons-inspired browser game built with TypeScript and HTML5 Canvas: 20 rounds, six tower types, layered enemies, upgrades, and targeting priorities.",
    "longDescription": "This tower-defense project implements a complete browser game loop without a game engine or runtime dependencies. Players place and upgrade towers, manage cash and lives, and defend against 20 rounds of enemies with different layers and damage immunities. The code separates simulation, path geometry, entity definitions, wave configuration, and rendering, with Vite handling development and production bundling.",
    "category": "Interactive Frontend · Browser Game",
    "status": "Playable browser game",
    "role": "Built the TypeScript simulation, Canvas renderer, tower-placement controls, economy, and wave progression.",
    "highlights": [
      "Implemented six tower types with upgrades and four targeting priorities, plus layered enemies with distinct damage immunities.",
      "Separated simulation, geometry, wave data, and rendering into focused modules without a game engine.",
      "Added pause, speed controls, placement constraints, and a 20-round progression ending in a boss wave."
    ],
    "image": "/projects/bloons-tower-defense.svg",
    "tech": [
      "TypeScript",
      "HTML5 Canvas",
      "Vite",
      "Game Systems"
    ],
    "techStack": [
      {
        "category": "Core",
        "items": [
          "TypeScript",
          "HTML5 Canvas",
          "Vite"
        ]
      },
      {
        "category": "Game Systems",
        "items": [
          "Wave Simulation",
          "Projectile Handling",
          "Tower Upgrades",
          "Path Geometry",
          "Economy"
        ]
      }
    ],
    "github": "https://github.com/Exotic209093/BloonsTD6",
    "live": "https://bloons-td-6-wheat.vercel.app",
    "featured": false,
    "date": "2026-06-29",
    "track": "systems"
  },
  {
    "id": "flux-terminal",
    "title": "Flux Terminal",
    "description": "An Electron terminal and workspace for Claude Code sessions, with live dashboards, multi-session monitoring, searchable transcripts, and split terminal panes.",
    "longDescription": "Flux Terminal combines a real node-pty terminal with a React interface for exploring Claude Code sessions. It tracks sessions live, displays token and cost metrics, and lets users resume conversations from a rich session view. Mission Control groups sessions by activity, while a persisted session index feeds SQLite FTS5 transcript search. The app also includes terminal tabs and split panes, launch profiles, notifications, onboarding, and downloadable Windows installers with automatic updates.",
    "category": "Developer Tooling · Desktop App",
    "status": "Released · v0.4.0",
    "role": "Built the Electron app, PTY bridge, React interface, session indexing and search, live dashboards, and Windows release packaging.",
    "highlights": [
      "Combined node-pty and xterm.js with terminal tabs, split panes, saved launch profiles, and scrollback search.",
      "Built a persisted session index and incremental SQLite FTS5 search with role, tool, file, project, and error filters.",
      "Added Mission Control, session notifications, guided onboarding, and Windows installers with automatic updates."
    ],
    "image": "/projects/flux-terminal.svg",
    "tech": [
      "JavaScript",
      "Electron",
      "React",
      "xterm.js",
      "node-pty",
      "SQLite FTS5"
    ],
    "techStack": [
      {
        "category": "Desktop",
        "items": [
          "Electron",
          "node-pty",
          "ConPTY",
          "contextBridge IPC"
        ]
      },
      {
        "category": "Interface",
        "items": [
          "React",
          "xterm.js",
          "Split Terminal Panes",
          "Mission Control"
        ]
      },
      {
        "category": "Sessions & Search",
        "items": [
          "Incremental Session Index",
          "SQLite FTS5",
          "Live Transcript Updates",
          "Token / Cost Metrics"
        ]
      },
      {
        "category": "Distribution",
        "items": [
          "Windows NSIS Installer",
          "Automatic Updates",
          "Onboarding",
          "Local Crash Logs"
        ]
      }
    ],
    "github": "https://github.com/Exotic209093/Flux-Terminal",
    "live": "https://github.com/Exotic209093/Flux-Terminal/releases",
    "liveLabel": "Download Release",
    "featured": true,
    "date": "2026-06-14",
    "track": "tooling"
  },
  {
    id: 'vastify',
    title: 'Vastify',
    description:
      'Hackathon-built Salesforce storage-offload platform that routes files into customer-owned cloud buckets while staying transparent to dependent apps — driven by three Claude Opus 4.7 agents.',
    longDescription:
      'Vastify is a transparent storage and backup platform for Salesforce, built during the Cerebral Valley × Anthropic 4.7 Hackathon. It reduces Salesforce data storage costs by approximately 90% by proxying the OData endpoint and offloading files into customer-owned object storage (S3, GCS, Azure Blob, MinIO, or Cloudflare R2) — without breaking any Salesforce app that depends on the original data. The submission centres on three Claude Opus 4.7 agents built with the Anthropic Agent SDK: a Setup Agent that provisions the system in 42 seconds across six autonomous tool calls, a Diff Explainer that produces structured per-object verdicts on backup change-sets, and a Rule Generator that converts plain-English routing intent into validated JSON rules.',
    category: 'Hackathon · Salesforce + AI Agents',
    status: 'Cerebral Valley × Anthropic 4.7 Hackathon submission',
    role: 'Designed and built the full stack solo for the hackathon: agent orchestration with the Anthropic Agent SDK, the Bun/Hono middleware, the Salesforce-side Apex integration, and the React dashboard.',
    highlights: [
      'Built three Claude Opus 4.7 agents with the Anthropic Agent SDK — Setup, Diff Explainer, and Rule Generator — demonstrating structured outputs and self-recovering agent loops.',
      'Implemented a transparent OData proxy so Salesforce apps continue to function identically even after files are offloaded into a customer-owned cloud bucket.',
      'Delivered a full working stack in the hackathon timeframe: Bun/Hono middleware, SQLite index, multi-cloud storage abstraction, Apex triggers and Queueables, and a Vite/React dashboard.',
    ],
    image: '/projects/vastify.png',
    tech: ['TypeScript', 'Bun', 'Hono', 'React', 'Apex', 'Anthropic Agent SDK', 'Claude Opus 4.7', 'OData'],
    techStack: [
      { category: 'AI Agents', items: ['Anthropic Agent SDK', 'Claude Opus 4.7', 'Structured Outputs', 'Tool-Calling Loops'] },
      { category: 'Middleware', items: ['Bun 1.3', 'Hono', 'bun:sqlite', 'TypeScript'] },
      { category: 'Object Storage', items: ['AWS S3', 'Google Cloud Storage', 'Azure Blob', 'MinIO', 'Cloudflare R2'] },
      { category: 'Salesforce', items: ['Apex Triggers', 'Queueables', 'External Objects', 'OData 4.0'] },
      { category: 'Dashboard', items: ['React 18', 'Vite', 'Tailwind CSS', 'Recharts'] },
    ],
    github: 'https://github.com/Exotic209093/Vastify',
    featured: true,
    date: '2026-04-26',
    track: 'ai',
  },
  {
    "id": "galacia-vault",
    "title": "Galacia Vault",
    "description": "A Salesforce-native file storage platform in development, connecting record-based file workflows to customer-owned cloud storage through Apex and Lightning Web Components.",
    "longDescription": "Galacia Vault, formerly Nebula Vault, is the first product in the Galacia collection. Its source combines an Apex provider abstraction with Lightning Web Components for file management, uploads, storage configuration, and migration workflows. Provider integrations cover AWS S3 and compatible storage, Azure Blob, Google Cloud Storage, OneDrive, SharePoint, Dropbox, Google Drive, and Box. The project also includes a transfer gateway and work on permissions, audit trails, retention, and file governance. The public website explains the product direction and evaluation preparation; public installation and release validation remain outstanding.",
    "category": "Salesforce Platform Engineering",
    "status": "In development · Public installation not yet available",
    "role": "Built the Salesforce product and cloud-provider abstraction, with user and admin interfaces, a transfer gateway, and release-readiness work.",
    "highlights": [
      "Implemented a shared storage-provider interface across eight provider families, including S3-compatible services.",
      "Built Apex services and Lightning Web Components for file browsing, uploads, connection setup, and migration management.",
      "Developed file-governance workflows around permissions, audit trails, retention, and record context, with release validation tracked separately from source progress."
    ],
    "image": "/projects/galacia-vault.svg",
    "tech": [
      "Apex",
      "Salesforce",
      "Lightning Web Components",
      "AWS S3",
      "Azure Blob",
      "GCS"
    ],
    "techStack": [
      {
        "category": "Salesforce",
        "items": [
          "Apex",
          "Lightning Web Components",
          "SLDS",
          "Platform Events",
          "Scheduled Jobs"
        ]
      },
      {
        "category": "Storage",
        "items": [
          "AWS S3 / S3-compatible",
          "Azure Blob",
          "Google Cloud Storage",
          "OneDrive / SharePoint",
          "Dropbox",
          "Google Drive",
          "Box"
        ]
      },
      {
        "category": "Architecture & Quality",
        "items": [
          "Provider Adapter Pattern",
          "Transfer Gateway",
          "Apex Tests",
          "sfdx-lwc-jest"
        ]
      }
    ],
    "live": "https://galacia.app/galacia-vault/",
    "liveLabel": "Explore Galacia Vault",
    "featured": false,
    "date": "2026-09-09",
    "track": "salesforce"
  },
  {
    "id": "wave-link",
    "title": "WaveLink",
    "description": "A Chrome extension for Salesforce data work: SOQL exports, guided imports, offline conversion, comparisons, and repeatable data jobs in a local browser workspace.",
    "longDescription": "WaveLink brings Salesforce export, import, comparison, and data preparation into one Chrome extension. It supports SOQL exports to CSV, JSON, Excel, and XML, with import workflows using Salesforce REST and Bulk APIs. Recent development focuses on guided workflows, saved jobs, activity and recovery views, and a bounded Copy between orgs flow for one object at a time. The current roadmap replaces the older multi-object migration product with this narrower workflow and tracks reliability work towards 1.0. A version is published on the Chrome Web Store; the repository contains newer development work.",
    "category": "Salesforce Tooling · Chrome Extension",
    "status": "Published extension · 1.0 in development",
    "role": "Built and iterated on a Salesforce data extension, bringing export, import, comparison, and repeatable workflows into a shared browser workspace.",
    "highlights": [
      "Combined SOQL exports, offline format conversion, comparison, and guided import workflows using Salesforce REST and Bulk APIs.",
      "Refocused cross-org work on a controlled single-object copy workflow, replacing the larger migration navigation surface.",
      "Developed saved-job and activity workflows, with a public roadmap covering write correctness, scheduling reliability, and data fidelity before 1.0."
    ],
    "image": "/projects/wavelink.png",
    "tech": [
      "TypeScript",
      "Preact",
      "Chrome Extension",
      "Salesforce APIs",
      "Bulk API 2.0",
      "Jest"
    ],
    "techStack": [
      {
        "category": "Frontend",
        "items": [
          "TypeScript",
          "Preact",
          "Shadow DOM",
          "Command Palette"
        ]
      },
      {
        "category": "Data Workflows",
        "items": [
          "SOQL",
          "CSV / JSON / Excel / XML",
          "REST Collections API",
          "Bulk API 2.0",
          "Offline Comparison"
        ]
      },
      {
        "category": "Platform & Quality",
        "items": [
          "Chrome Manifest V3",
          "chrome.storage.local",
          "Webpack",
          "Jest",
          "GitHub Actions"
        ]
      }
    ],
    "github": "https://github.com/Exotic209093/WaveLink",
    "live": "https://chromewebstore.google.com/detail/wavelink/ccknhhibbedolfnbgnenomdohlmojblo",
    "liveLabel": "Chrome Web Store",
    "featured": true,
    "date": "2026-09-09",
    "track": "salesforce"
  },
  {
    id: 'salesforce-spreadsheet-formatter',
    title: 'Salesforce Spreadsheet Formatter',
    description:
      'Python CLI for cleaning CSV and XLSX Salesforce exports before migration or Data Loader import.',
    longDescription:
      'This command-line tool normalizes spreadsheet exports into import-friendly values. It detects common Salesforce fields, preserves IDs as text, standardizes booleans and date formats, writes clean output files, and generates an issues report when values cannot be converted safely. The project is small but highly practical, and it includes automated tests around rule precedence, date handling, and file processing.',
    category: 'Developer Tooling',
    status: 'Production-ready utility',
    role: 'Built a focused Python CLI to remove spreadsheet cleanup work from Salesforce migration prep and make import failures easier to diagnose.',
    highlights: [
      'Normalizes IDs, booleans, dates, datetimes, and numeric values into import-friendly strings.',
      'Uses config-driven rules and preview modes so the tool can adapt to different export structures.',
      'Includes unit tests covering rule matching and workbook or CSV processing behaviour.',
    ],
    image: '/projects/salesforce-formatter.svg',
    tech: ['Python', 'openpyxl', 'CLI Tooling', 'CSV', 'XLSX', 'Unit Tests'],
    techStack: [
      { category: 'Core Tooling', items: ['Python', 'argparse CLI', 'openpyxl', 'CSV Processing'] },
      { category: 'Rules Engine', items: ['Column Type Detection', 'Regex Pattern Rules', 'Datetime Normalization', 'Boolean Parsing'] },
      { category: 'Output', items: ['Formatted Workbooks', 'Formatted CSV Files', 'Issues Reports', 'Preview Mode'] },
      { category: 'Quality', items: ['unittest', 'Temporary File Tests', 'Config-Driven Behaviour'] },
    ],
    github: 'https://github.com/Exotic209093/Salesforce-Data-Formator',
    featured: true,
    date: '2026-03-24',
    track: 'salesforce',
  },
  {
    id: 'apex-hq',
    title: 'Apex HQ',
    description:
      'Next.js staff portal foundation with PostgreSQL, Prisma, authentication, and a structure designed for team-facing internal tools.',
    longDescription:
      'Apex HQ is an internal portal foundation built with Next.js 14 App Router. The project sets up authentication with NextAuth, a PostgreSQL-backed Prisma data layer, role-aware access patterns, and a deployment-ready structure for future staff, project, and activity management features. It is a strong example of full-stack groundwork rather than a toy demo.',
    category: 'Full-Stack App',
    status: 'Foundation complete',
    role: 'Built the first iteration of an internal staff portal architecture with a focus on authentication, maintainable structure, and team-ready expansion.',
    highlights: [
      'Set up a Prisma and PostgreSQL data layer with Next.js 14 App Router.',
      'Integrated authentication and role-aware access patterns with NextAuth.',
      'Documented architecture and deployment so the project could be extended beyond the initial scaffold.',
    ],
    image: '/projects/apex-hq.svg',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Tailwind CSS'],
    techStack: [
      { category: 'Application Stack', items: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS'] },
      { category: 'Backend', items: ['NextAuth.js', 'Prisma ORM', 'PostgreSQL', 'Route Handlers'] },
      { category: 'Architecture', items: ['App Router', 'Role-Based Access', 'Feature-Oriented Structure', 'Deployment Docs'] },
      { category: 'Developer Experience', items: ['ESLint', 'Type Safety', 'Environment Configuration', 'Admin Bootstrap Script'] },
    ],
    github: 'https://github.com/Exotic209093/Apex-HQ',
    featured: false,
    hidden: true,
    date: '2025-12-31',
    track: 'tooling',
  },
  {
    id: 'ai-email-triage-automation',
    title: 'AI Email Triage Automation',
    description:
      'n8n-based workflow that receives inbound email, sends it through a local Node bridge, and returns structured action recommendations.',
    longDescription:
      'This automation project combines n8n workflows with a local HTTP service that calls an LLM CLI to classify incoming mail. It returns structured fields such as importance, action requirements, summary, suggested next steps, and deadline mentions. The project is useful because it shows practical integration work: workflow orchestration, a local service boundary, and a structured output contract for downstream automation.',
    category: 'Automation',
    status: 'Prototype',
    role: 'Connected off-the-shelf workflow tooling to a local Node service so inbound email could be triaged into structured next actions.',
    highlights: [
      'Uses n8n workflows to receive and route messages into a local processing service.',
      'Returns structured fields instead of raw text so the output can feed follow-on automation.',
      'Shows pragmatic AI integration through a clear service boundary rather than bolting prompts into UI code.',
    ],
    image: '/projects/email-triage.svg',
    tech: ['n8n', 'Node.js', 'Workflow Automation', 'HTTP Services', 'LLM Integration'],
    techStack: [
      { category: 'Workflow Layer', items: ['n8n', 'IMAP Trigger', 'Workflow JSON', 'Smoke-Test Workflow'] },
      { category: 'Bridge Service', items: ['Node.js', 'HTTP Endpoint', 'CLI Invocation', 'Structured JSON Output'] },
      { category: 'AI Output', items: ['Importance Scoring', 'Needs-Action Flags', 'Summaries', 'Suggested Actions'] },
    ],
    featured: false,
    date: '2026-03-25',
    track: 'ai',
  },
  {
    "id": "exocraft",
    "title": "ExoCraft",
    "description": "A Three.js browser voxel sandbox with procedural biomes, flood-fill lighting, survival, crafting, redstone circuits, mobs, and post-processing effects.",
    "longDescription": "ExoCraft is a JavaScript and Three.js sandbox with seeded terrain, five biomes, connected caves, and streamed chunks with memory eviction. A flood-fill lighting system combines skylight and blocklight with baked ambient occlusion. Survival, crafting, furnaces, inventories, mobs, and persistent redstone circuits share a modular simulation. The rendering pipeline adds tone mapping, bloom, and FXAA, while deterministic debugging hooks expose game state and simulation stepping for automated checks.",
    "category": "Interactive Frontend · Browser Game",
    "status": "Playable browser sandbox",
    "role": "Built the modular voxel world, lighting and rendering pipeline, survival systems, persistent circuits, and browser controls.",
    "highlights": [
      "Implemented seeded biomes, caves, chunk streaming, ambient occlusion, and 0–15 skylight and blocklight propagation.",
      "Added survival, crafting, mobs, and redstone components including repeaters, comparators, lamps, and doors.",
      "Combined bloom and FXAA post-processing with persistent settings, saves, and deterministic simulation hooks."
    ],
    "image": "/projects/exocraft.png",
    "tech": [
      "JavaScript",
      "Three.js",
      "Vite",
      "WebGL",
      "Game Systems"
    ],
    "techStack": [
      {
        "category": "World & Rendering",
        "items": [
          "Three.js",
          "Procedural Terrain",
          "Chunk Streaming",
          "Flood-Fill Lighting",
          "Bloom / FXAA"
        ]
      },
      {
        "category": "Simulation",
        "items": [
          "Survival",
          "Crafting",
          "Redstone Circuits",
          "Hostile & Passive Mobs"
        ]
      },
      {
        "category": "Persistence & Debugging",
        "items": [
          "World Saves",
          "Local Settings",
          "Deterministic Simulation Hooks"
        ]
      }
    ],
    "github": "https://github.com/Exotic209093/ExoCraft",
    "live": "https://exo-craft.vercel.app",
    "featured": false,
    "date": "2026-07-12",
    "track": "systems"
  },
  {
    id: 'git-navigator',
    title: 'Git Navigator',
    description:
      'VS Code sidebar extension that handles everyday git and GitHub workflows — staging, commits, branches, a visual commit graph, and PR creation — without leaving the editor or touching the terminal.',
    longDescription:
      'Git Navigator is a VS Code extension published on the Visual Studio Marketplace as "Git Navigator Pro". It surfaces day-to-day git and GitHub work in a single, opinionated sidebar panel: a staged/unstaged Changes view with per-file and bulk actions, an inline commit input with Ctrl+Enter, a one-click pull-then-push Sync, a branch switcher backed by VS Code\'s QuickPick, and a webview-rendered commit graph with colour-coded lanes, paginated history, and rich metadata per row. Pull request creation runs through VS Code\'s built-in GitHub OAuth, so users never need to manage a personal access token. File-system watchers on `.git/index` and `.git/HEAD` keep the panel in sync when you also work from the terminal, and a status-bar branch indicator stays visible at all times.',
    category: 'Developer Tooling · VS Code Extension',
    status: 'Published on Visual Studio Marketplace',
    role: 'Built and published a VS Code extension that consolidates day-to-day git work into a single sidebar panel, including a custom webview-rendered commit graph and OAuth-based PR creation.',
    highlights: [
      'Published on the Visual Studio Marketplace as "Git Navigator Pro" with a 5-star rating; built in TypeScript and bundled with esbuild.',
      'Implemented a custom commit graph in a webview — colour-coded branch lanes with SVG connectors, paginated 50-at-a-time history, and per-row commit metadata.',
      'Used VS Code\'s built-in GitHub OAuth for PR creation so users never need to handle a PAT, with `owner/repo` auto-detected from the configured remote.',
    ],
    image: '/projects/git-navigator.svg',
    tech: ['TypeScript', 'VS Code Extension API', 'esbuild', 'Webviews', 'GitHub OAuth', 'Git'],
    techStack: [
      { category: 'Core', items: ['TypeScript', 'VS Code Extension API', 'esbuild', 'Node.js'] },
      { category: 'Sidebar UI', items: ['QuickPick', 'Tree View', 'Status Bar Item', 'Webviews'] },
      { category: 'Git Workflows', items: ['Init / Link Remote / Clone', 'Stage / Unstage / Discard', 'Inline Commit', 'Sync (pull-then-push)', 'Branch Switcher'] },
      { category: 'Commit Graph', items: ['SVG Lane Rendering', 'Paginated History', 'Branch / Tag Refs', 'Relative Date Formatting'] },
      { category: 'GitHub Integration', items: ['VS Code GitHub OAuth', 'Pull Request Creation', 'Auto-detected owner/repo'] },
      { category: 'Reactivity', items: ['.git/index Watcher', '.git/HEAD Watcher', 'Status Bar Branch Indicator'] },
    ],
    github: 'https://github.com/Exotic209093/Git-Navigator',
    live: 'https://marketplace.visualstudio.com/items?itemName=Exotic209093.git-navigator-exotic209093',
    featured: true,
    date: '2026-02-25',
    track: 'tooling',
  },
  {
    id: 'exoware-kernel-driver',
    title: 'ExoWare Kernel Driver',
    description:
      'Windows kernel-mode driver written in C++ for secure memory access and low-level system interaction.',
    longDescription:
      'A Windows kernel driver project exploring low-level systems programming in C++. The driver implements secure memory access patterns and performance-aware operations within the kernel address space — territory that requires precise pointer management, adherence to Windows Driver Model constraints, and careful handling of system stability. Built as a standalone learning project to complement the higher-level application work in the rest of the portfolio.',
    category: 'Systems Programming',
    status: 'Prototype',
    role: 'Explored kernel-mode development in C++ to understand low-level Windows system architecture and memory access patterns.',
    highlights: [
      'Implemented a Windows kernel-mode driver following WDM conventions for memory access and I/O handling.',
      'Applied C++ with strict discipline around pointer safety, IRQL constraints, and kernel-space memory management.',
      'Demonstrated willingness to work at the systems layer — below the abstraction level of most application developers.',
    ],
    image: '/projects/exoware-kernel-driver.svg',
    tech: ['C++', 'Windows Kernel', 'WDM', 'Systems Programming'],
    techStack: [
      { category: 'Core', items: ['C++', 'Windows Driver Model', 'Kernel-Mode Development'] },
      { category: 'Systems', items: ['Memory Management', 'Pointer Safety', 'IRQL Handling', 'I/O Control'] },
    ],
    github: 'https://github.com/Exotic209093/ExoWare-Kernal-Driver',
    featured: false,
    date: '2026-03-12',
    track: 'systems',
  },
]

export const projects: Project[] = allProjects.filter((project) => !project.hidden)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.id === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}

export function getProjectHistory(): Project[] {
  return [...projects].sort((a, b) => (a.date < b.date ? 1 : -1))
}
