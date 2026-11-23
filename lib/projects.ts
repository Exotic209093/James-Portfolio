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
    color: '#b8a7f2',
  },
  {
    id: 'tooling',
    label: 'Developer Tooling',
    description: 'Desktop, editor, CLI, and documentation tools',
    color: '#86c8e8',
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    description: 'LLM pipelines and agents on the Anthropic API, and workflow automation',
    color: '#8fd9b4',
  },
  {
    id: 'systems',
    label: 'Systems & Interactive',
    description: 'Company and product websites, mobile apps, browser games, and security research',
    color: '#f0c27a',
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
    id: 'docify',
    title: 'Docify',
    description: 'A native Rust document renderer for HTML and CSS, with PDF, PNG, SVG, and editable DOCX output, plus Node.js bindings.',
    longDescription: 'Docify is a purpose-built document renderer written in Rust. It implements a focused subset of HTML and CSS for business documents, including text shaping, tables, pagination, and running headers and footers. A shared rendering pipeline supports PDF, PNG, and SVG, with a separate reflowable DOCX output from the same source. It includes Node.js bindings and diagnostics for unsupported styling. PDF and PNG are used for selected production templates with a Chromium fallback; DOCX remains pre-production. The source is private.',
    category: 'Systems Programming / Document Rendering',
    status: 'Private source / DOCX pre-production',
    role: 'Built the Rust rendering pipeline, output backends, Node.js integration, and regression checks for document text and layout.',
    highlights: [
      'Implemented document layout, font shaping, pagination, and multiple output formats in a modular Rust workspace.',
      'Exposed synchronous and asynchronous Node.js bindings, with diagnostics that allow callers to fall back to another renderer.',
      'Added text and visual comparisons against Chromium, property tests for layout, and fixture-based PDF accessibility validation.',
    ],
    image: '/projects/art/docify.webp',
    tech: ['Rust', 'HTML / CSS', 'Node.js', 'PDF', 'DOCX'],
    featured: true,
    date: '2026-09-27',
    track: 'systems',
  },
  {
    id: 'infinity-dox',
    title: 'Infinity Dox',
    description:
      'A multi-tenant document-generation SaaS for Salesforce, designed end to end: a TypeScript orchestrator on AWS ECS Fargate with six worker pipelines, a React portal, a Salesforce managed package, and Terraform across seven AWS environments.',
    longDescription:
      'Infinity Dox is the core of the Infinity product suite at Apex Infinity Solutions, where I am the primary engineer. Administrators build templates in Salesforce and generate documents from records, Apex or Flow. A TypeScript pnpm monorepo runs an orchestrator on AWS ECS Fargate that hands work to six worker pipelines, including LLM draft, fix and transform workers on the Anthropic API. Around it sit a React customer portal, a Salesforce managed package with 39 objects, and Terraform across seven AWS environments. The suite also includes Infinity Platform, a shared portal and Command Center with licensing and AI routes, and Infinity Vault, a storage gateway on S3 designed so file content and keys never pass through the portal. This is professional work, and the source is private.',
    category: 'SaaS Architecture · Salesforce + AWS',
    status: 'Professional work · Private source',
    role: 'Primary engineer: designed the architecture end to end, then built and operate it across TypeScript services, React, Salesforce, Terraform and AWS.',
    highlights: [
      'Designed a multi-tenant architecture: an ECS Fargate orchestrator, six worker pipelines including LLM draft, fix and transform, a React portal and a 39-object managed package.',
      'Kept AI-speed delivery honest with 9 GitHub Actions workflows (zero-debt lint gate, typecheck, tests, drift checks, SHA-pinned actions), 3,600+ Apex test methods and 93% Apex coverage.',
      'Built security in from the start: RS256 tenant JWTs bound to key IDs, HMAC-signed requests, fail-closed replay protection, SSRF guards and a hash-chained audit log. A white- and black-box pentest across 5 surfaces found 35 issues; 26 are fixed.',
    ],
    image: '/projects/art/infinity-dox.webp',
    tech: ['TypeScript', 'AWS ECS Fargate', 'Terraform', 'React', 'Apex', 'LWC', 'Anthropic API'],
    techStack: [
      { category: 'Services', items: ['TypeScript', 'pnpm monorepo', 'Node.js', 'Bun', 'Fastify', 'SQLite'] },
      { category: 'AWS & Infrastructure', items: ['ECS Fargate', 'Lambda', 'SQS', 'S3', 'DynamoDB', 'ECR', 'Secrets Manager', 'Terraform (7 environments)'] },
      { category: 'Salesforce', items: ['Apex', 'Lightning Web Components', '2GP managed package', 'Flow'] },
      { category: 'AI', items: ['Anthropic API / SDK', 'LLM draft / fix / transform workers'] },
      { category: 'Quality & Security', items: ['GitHub Actions (OIDC)', 'Vitest', 'Playwright', 'LWC Jest', 'Apex tests', 'RS256 JWT', 'HMAC signing', 'Hash-chained audit log'] },
    ],
    featured: true,
    date: '2026-11-19',
    track: 'salesforce',
  },
  {
    id: 'everfrost',
    title: 'Everfrost',
    description:
      'My company, building business software for Salesforce teams. I run all of it: the products, the customer platform, the public website and the infrastructure underneath.',
    longDescription:
      'Everfrost makes business software for teams that run on Salesforce. It was called Galacia until November 2026. Everfrost Vault is the first product, ready for onboarding with assisted installation; Everfrost Docs, document generation for Salesforce teams, is the planned next product. I build the products, give the demos and provide the support. Around them I built the public website at everfrost.app, a customer platform for accounts and product access (in beta), and the self-hosted infrastructure they run on, with HTTPS, encrypted off-host backups and a tested restore.',
    category: 'Company · Product Engineering',
    status: 'Website live · Vault ready for onboarding',
    role: 'Founder and sole engineer: product direction, Salesforce engineering, website, customer platform, hosting and support.',
    highlights: [
      'Narrowed the lineup to Salesforce software in November 2026: Vault available now, Docs planned, and other concepts parked with their research kept.',
      'Built and deployed everfrost.app: product, pricing, security and support pages, a free in-browser storage cost calculator, and an animated glacier cross-section that still works without JavaScript.',
      'Run the services on a self-managed VPS with Docker, Caddy HTTPS and PostgreSQL, plus encrypted off-host backups and a restore drill that passed.',
    ],
    image: '/projects/art/everfrost.webp',
    tech: ['Node.js', 'JavaScript', 'PostgreSQL', 'Docker', 'Caddy', 'Playwright'],
    techStack: [
      { category: 'Website', items: ['JavaScript', 'HTML / CSS', 'Node.js', 'Static build', 'Progressive enhancement'] },
      { category: 'Customer platform', items: ['Node.js', 'PostgreSQL', 'Better Auth', 'Stripe'] },
      { category: 'Operations', items: ['Docker', 'Caddy', 'OVHcloud VPS', 'Encrypted backups', 'Playwright checks'] },
    ],
    live: 'https://everfrost.app',
    liveLabel: 'Visit Everfrost',
    featured: true,
    date: '2026-11-21',
    track: 'systems',
  },
  {
    id: 'thrift-map',
    title: 'Thrift Map',
    description:
      'A Flutter app for finding UK charity shops, car boot sales and thrifting events on a map, taken from concept to a live Google Play release.',
    longDescription:
      'Thrift Map helps people find second-hand shopping across the UK. A map and a places feed show charity shops, boot sales and events, filtered by type and searchable by name. Users can favourite, flag and mark places as visited, get directions, and add new shops, places or events. The app is built in Flutter and Dart on a FlutterFlow scaffold, with Firebase for sign-in and data and Google Maps for location. It is live on Google Play; the iOS build is being prepared for its first App Store submission.',
    category: 'Mobile App · Flutter',
    status: 'Live on Google Play · iOS in preparation',
    role: 'Took the app from concept to release: the Flutter interface, Firebase data model, map and search, and the store release.',
    highlights: [
      'Built map and feed views for charity shops, boot sales and events, with category filters, search and place details.',
      'Let people contribute: add shops, places and events, and keep favourites, flags and visited places on their account.',
      'Shipped to Google Play on Firebase Auth, Cloud Firestore, Performance Monitoring and a Cloud Function, with iOS builds running through Codemagic.',
    ],
    image: '/projects/art/thrift-map.webp',
    tech: ['Flutter', 'Dart', 'Firebase', 'Google Maps'],
    techStack: [
      { category: 'App', items: ['Flutter', 'Dart', 'FlutterFlow'] },
      { category: 'Backend', items: ['Firebase Auth', 'Cloud Firestore', 'Cloud Functions', 'Performance Monitoring'] },
      { category: 'Maps & Release', items: ['Google Maps', 'Google Play', 'Codemagic'] },
    ],
    live: 'https://play.google.com/store/apps/details?id=com.mycompany.thriftmap',
    liveLabel: 'Get it on Google Play',
    featured: true,
    date: '2026-10-27',
    track: 'systems',
  },
  {
    "id": "the-loft-zante",
    "title": "The Loft Zante",
    "description": "A hospitality website for O’Callaghan’s Loft in Zakynthos, with a browsable drinks menu, venue photography, events, and visitor information.",
    "longDescription": "The Loft Zante brings a venue-focused web experience together in Next.js, React, and TypeScript. The site combines a photographic hero and gallery with events, an interactive drinks menu, opening hours, and an embedded location map. Menu sections are driven by structured data, with category buttons, prices, descriptions, and serving options. Tailwind CSS supports responsive layouts across the site.",
    "category": "Web Development · Hospitality",
    "status": "Website build · public preview unavailable",
    "role": "Built the Next.js website, reusable page sections, responsive styling, and interactive menu browser.",
    "highlights": [
      "Built a category-based menu browser backed by typed menu data, including prices, descriptions, and serving options.",
      "Combined venue photography, event content, opening hours, and a location map into a responsive visitor experience.",
      "Used reusable React components and Tailwind CSS for a consistent visual presentation."
    ],
    "image": '/projects/art/the-loft-zante.webp',
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
    "featured": true,
    "date": "2026-09-27",
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
    "image": '/projects/art/file-insights.webp',
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
    "image": '/projects/art/infinite-idea.webp',
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
    "image": '/projects/art/bloons-tower-defense.webp',
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
    "image": '/projects/art/flux-terminal.webp',
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
      'A hackathon prototype for Salesforce storage offloading and backup, with customer-owned cloud storage, an OData adapter, and AI-assisted setup and routing.',
    longDescription:
      'Vastify is a Salesforce storage and backup prototype built during a hackathon. It explores lower-cost storage by offloading files into customer-owned cloud buckets and exposing archived records through an OData adapter. Three agents support setup, backup change explanations, and routing-rule generation using structured outputs and typed tools. The project combines Bun/Hono middleware, a SQLite index, Apex integration, and a React dashboard; savings and setup timings depend on the deployment and are not presented as measured customer outcomes.',
    category: 'Hackathon · Salesforce + AI Agents',
    status: 'Cerebral Valley × Anthropic 4.7 Hackathon submission',
    role: 'Designed and built the full stack solo for the hackathon: agent orchestration with the Anthropic Agent SDK, the Bun/Hono middleware, the Salesforce-side Apex integration, and the React dashboard.',
    highlights: [
      'Built three Claude Opus 4.7 agents with the Anthropic Agent SDK — Setup, Diff Explainer, and Rule Generator — demonstrating structured outputs and self-recovering agent loops.',
      'Implemented an OData adapter for Salesforce External Objects alongside file offloading into customer-owned cloud storage.',
      'Delivered a full working stack in the hackathon timeframe: Bun/Hono middleware, SQLite index, multi-cloud storage abstraction, Apex triggers and Queueables, and a Vite/React dashboard.',
    ],
    image: '/projects/art/vastify.webp',
    tech: ['TypeScript', 'Bun', 'Hono', 'React', 'Apex', 'Anthropic Agent SDK', 'Claude Opus 4.7', 'OData'],
    techStack: [
      { category: 'AI Agents', items: ['Anthropic Agent SDK', 'Claude Opus 4.7', 'Structured Outputs', 'Tool-Calling Loops'] },
      { category: 'Middleware', items: ['Bun 1.3', 'Hono', 'bun:sqlite', 'TypeScript'] },
      { category: 'Object Storage', items: ['AWS S3', 'Google Cloud Storage', 'Azure Blob', 'MinIO', 'Cloudflare R2'] },
      { category: 'Salesforce', items: ['Apex Triggers', 'Queueables', 'External Objects', 'OData 4.0'] },
      { category: 'Dashboard', items: ['React 18', 'Vite', 'Tailwind CSS', 'Recharts'] },
    ],
    github: 'https://github.com/Exotic209093/Vastify',
    live: 'https://youtu.be/_OcVUofbFTM',
    liveLabel: 'Watch the 3-minute demo',
    featured: true,
    date: '2026-04-26',
    track: 'ai',
  },
  {
    id: 'everfrost-vault',
    title: 'Everfrost Vault',
    description:
      'Salesforce record files kept in an Amazon S3 bucket the customer owns. Files stay on the record in a Lightning component while their contents go to the customer’s own storage. Ready for onboarding with assisted installation.',
    longDescription:
      'Everfrost Vault, first called Nebula Vault and then Galacia Vault, is Everfrost’s first product. People upload, find, preview and download files in a Lightning Web Component on the Salesforce record page. File metadata and the link to the record stay in Salesforce, while the contents go to an Amazon S3 bucket in the customer’s own account and region. Seeing a record does not grant access to its files: file access is checked separately. The source includes an Apex storage-provider interface and a transfer gateway for large files. The configuration sold today is Amazon S3, installed and tested by Everfrost after a demo and a written offer.',
    category: 'Salesforce Product Engineering',
    status: 'Ready for onboarding · Amazon S3',
    role: 'Built the Salesforce package, storage-provider interface, transfer gateway and admin tooling, and run the demos, installation and support.',
    highlights: [
      'Kept file metadata and the record link in Salesforce while file contents go to a customer-owned S3 bucket, with file access checked separately from record access.',
      'Built Apex services and Lightning Web Components for upload, browse, preview, download and connection setup, behind a provider interface with further adapters in source.',
      'Backed releases with 1,000+ Apex tests and 400+ LWC Jest tests, and published supported configurations, support hours and data-exit steps before selling.',
    ],
    image: '/projects/art/everfrost-vault.webp',
    tech: ['Apex', 'Lightning Web Components', 'Salesforce', 'AWS S3', 'Node.js'],
    techStack: [
      { category: 'Salesforce', items: ['Apex', 'Lightning Web Components', 'SLDS', 'Platform Events', 'Named Credentials'] },
      { category: 'Storage', items: ['Amazon S3 (sold today)', 'Provider adapter interface', 'Transfer gateway'] },
      { category: 'Quality', items: ['Apex tests', 'sfdx-lwc-jest', 'Gateway tests'] },
    ],
    live: 'https://everfrost.app/everfrost-vault/',
    liveLabel: 'Explore Everfrost Vault',
    featured: true,
    date: '2026-11-22',
    track: 'salesforce',
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
    "image": '/projects/art/wave-link.webp',
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
    "date": "2026-09-27",
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
    image: '/projects/art/salesforce-spreadsheet-formatter.webp',
    tech: ['Python', 'openpyxl', 'CLI Tooling', 'CSV', 'XLSX', 'Unit Tests'],
    techStack: [
      { category: 'Core Tooling', items: ['Python', 'argparse CLI', 'openpyxl', 'CSV Processing'] },
      { category: 'Rules Engine', items: ['Column Type Detection', 'Regex Pattern Rules', 'Datetime Normalization', 'Boolean Parsing'] },
      { category: 'Output', items: ['Formatted Workbooks', 'Formatted CSV Files', 'Issues Reports', 'Preview Mode'] },
      { category: 'Quality', items: ['unittest', 'Temporary File Tests', 'Config-Driven Behaviour'] },
    ],
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
    image: '/projects/art/ai-email-triage-automation.webp',
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
    "description": "A Three.js browser voxel sandbox with procedural biomes, flood-fill lighting, survival, crafting, redstone circuits, mobs, physically based materials, and post-processing effects.",
    "longDescription": "ExoCraft is a JavaScript and Three.js sandbox with seeded terrain, five biomes, connected caves, and streamed chunks with memory eviction. A flood-fill lighting system combines skylight and blocklight with baked ambient occlusion. Survival, crafting, furnaces, inventories, mobs, and persistent redstone circuits share a modular simulation. The rendering pipeline uses physically based materials with original procedural albedo, normal, and roughness textures, plus tone mapping, bloom, and FXAA. Browser smoke checks cover startup, rendering, movement, menus, fluids, and save/load, with deterministic hooks for simulation checks.",
    "category": "Interactive Frontend · Browser Game",
    "status": "Playable browser sandbox",
    "role": "Built the modular voxel world, lighting and rendering pipeline, survival systems, persistent circuits, and browser controls.",
    "highlights": [
      "Implemented seeded biomes, caves, chunk streaming, ambient occlusion, and 0–15 skylight and blocklight propagation.",
      "Added survival, crafting, mobs, and redstone components including repeaters, comparators, lamps, and doors.",
      "Added procedural PBR textures and graphics quality settings, with browser smoke checks for rendering and core gameplay."
    ],
    "image": '/projects/art/exocraft.webp',
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
          "PBR Materials / Procedural Textures",
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
    "date": "2026-09-14",
    "track": "systems"
  },
  {
    id: 'git-navigator',
    title: 'Git Navigator',
    description:
      'VS Code sidebar extension that handles everyday git and GitHub workflows — staging, commits, stashes, conflict resolution, blame, a visual commit graph, and pull requests — without leaving the editor or touching the terminal.',
    longDescription:
      'Git Navigator is a VS Code extension published on the Visual Studio Marketplace as "Git Navigator Pro". It surfaces day-to-day git and GitHub work in a single, opinionated sidebar panel: a staged/unstaged Changes view with per-file and bulk actions, an inline commit input with Ctrl+Enter, a one-click pull-then-push Sync, a branch switcher backed by VS Code\'s QuickPick, and a webview-rendered commit graph with colour-coded lanes, paginated history, and rich metadata per row. Pull request creation runs through VS Code\'s built-in GitHub OAuth, so users never need to manage a personal access token. The current source also includes stash management, guided conflict resolution, line blame, file history, branch comparison, and a multi-repository picker. These describe the development source; the Marketplace listing is the public installation route.',
    category: 'Developer Tooling · VS Code Extension',
    status: 'Published on Visual Studio Marketplace',
    role: 'Built and published a VS Code extension that consolidates day-to-day git work into a single sidebar panel, including a custom webview-rendered commit graph and OAuth-based PR creation.',
    highlights: [
      'Published on the Visual Studio Marketplace as "Git Navigator Pro", built in TypeScript and bundled with esbuild.',
      'Implemented a custom commit graph in a webview — colour-coded branch lanes with SVG connectors, paginated 50-at-a-time history, and per-row commit metadata.',
      'Used VS Code\'s built-in GitHub OAuth for PR creation so users never need to handle a PAT, with `owner/repo` auto-detected from the configured remote.',
    ],
    image: '/projects/art/git-navigator.webp',
    tech: ['TypeScript', 'VS Code Extension API', 'esbuild', 'Webviews', 'GitHub OAuth', 'Git'],
    techStack: [
      { category: 'Core', items: ['TypeScript', 'VS Code Extension API', 'esbuild', 'Node.js'] },
      { category: 'Sidebar UI', items: ['QuickPick', 'Tree View', 'Status Bar Item', 'Webviews'] },
      { category: 'Git Workflows', items: ['Init / Link Remote / Clone', 'Stage / Unstage / Discard', 'Inline Commit', 'Sync (pull-then-push)', 'Branch Switcher'] },
      { category: 'Commit Graph', items: ['SVG Lane Rendering', 'Paginated History', 'Branch / Tag Refs', 'Relative Date Formatting'] },
      { category: 'GitHub Integration', items: ['VS Code GitHub OAuth', 'Pull Request Creation', 'Auto-detected owner/repo'] },
      { category: 'Reactivity', items: ['.git/index Watcher', '.git/HEAD Watcher', 'Status Bar Branch Indicator'] },
    ],
    live: 'https://marketplace.visualstudio.com/items?itemName=Exotic209093.git-navigator-exotic209093',
    featured: true,
    date: '2026-07-12',
    track: 'tooling',
  },
  {
    id: 'exoware-kernel-driver',
    title: 'Kernel & Vulnerability Research',
    description:
      'Independent security research since 2023: Windows kernel-mode drivers in C and C++, and root-cause analysis of published CVEs with proof-of-concept exploits built in isolated labs.',
    longDescription:
      'Alongside product work, I research how Windows behaves below the application layer. I write kernel-mode drivers in C and C++, working within IRQL rules, kernel memory and the I/O request model. I also study published CVEs: I trace each one to its root cause, then reproduce it with a proof of concept in an isolated lab. The research shapes how I design and test software, from tenant isolation, request signing and replay protection to the pentest I ran on the Infinity product suite. Source and lab material stay private.',
    category: 'Security Research · Systems Programming',
    status: 'Ongoing since 2023 · Private',
    role: 'Independent research: kernel-mode driver development, CVE root-cause analysis and proof-of-concept exploits in isolated labs.',
    highlights: [
      'Write Windows kernel-mode drivers in C and C++, handling IRQL constraints, kernel memory and I/O control requests.',
      'Analyse published CVEs to their root cause and reproduce them with proof-of-concept exploits, only in isolated lab environments.',
      'Apply what I learn to secure design and pentesting in product work, including a 5-surface pentest with 26 of 35 findings fixed.',
    ],
    image: '/projects/art/exoware-kernel-driver.webp',
    tech: ['C++', 'C', 'Windows Kernel', 'WDM', 'CVE Analysis'],
    techStack: [
      { category: 'Core', items: ['C', 'C++', 'Windows Driver Model', 'Kernel-mode development'] },
      { category: 'Research', items: ['CVE root-cause analysis', 'Proof-of-concept exploits', 'Isolated labs'] },
      { category: 'Applied', items: ['Secure design', 'Pentesting & remediation'] },
    ],
    featured: false,
    date: '2026-11-04',
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
