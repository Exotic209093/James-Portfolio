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
    description: 'Desktop, editor, and CLI tools that other developers use',
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
    description: 'Low-level systems work and interactive browser frontends',
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
  featured: boolean
  hidden?: boolean
  date: string
  /** Branch this project's commit sits on in the git-graph view. */
  track: ProjectTrack
}

const allProjects: Project[] = [
  {
    id: 'flux-terminal',
    title: 'Flux Terminal',
    description:
      'Electron desktop terminal built for Claude Code — a fully-capable terminal that records, replays, and analyses your coding sessions with live token, cost, and tool-usage metrics.',
    longDescription:
      'Flux Terminal is a cross-platform desktop application that wraps a production-grade terminal in a rich interface designed around Claude Code. It runs real shell sessions (claude, PowerShell, git, and anything else) on a true pseudo-terminal, while capturing each session so it can be navigated and replayed afterwards on a scrubable timeline. A live dashboard tracks tokens, model-specific cost, and tool calls in real time, and cross-session analytics surface activity charts, streaks, and plan-limit gauges. The app is built on Electron with xterm.js for the terminal surface, node-pty (with Windows ConPTY support) for the PTY bridge, and a React renderer — with a hardened IPC boundary exposed through a contextBridge preload.',
    category: 'Developer Tooling · Desktop App',
    status: 'Active build',
    role: 'Designed and built the full desktop app solo: the Electron main process and PTY bridging, the contextBridge IPC surface, and the React + xterm.js renderer, plus the session-capture, replay, and metrics systems.',
    highlights: [
      'Wraps a real pseudo-terminal (node-pty with ConPTY on Windows) in an Electron app, so claude, git, and shell commands run exactly as they would natively.',
      'Captures Claude Code sessions and replays them on a scrubable timeline with token, cost, and tool-usage metrics computed per model.',
      'Adds cross-session analytics — activity charts, streaks, achievements, and plan-limit gauges — on top of a hardened contextBridge IPC boundary.',
    ],
    image: '/projects/flux-terminal.svg',
    tech: ['JavaScript', 'Electron', 'React', 'xterm.js', 'node-pty', 'ConPTY'],
    techStack: [
      { category: 'Desktop Shell', items: ['Electron', 'node-pty', 'ConPTY (Windows)', 'contextBridge IPC'] },
      { category: 'Terminal UI', items: ['xterm.js', 'React', 'Theme Presets', 'Live Dashboards'] },
      { category: 'Sessions', items: ['Session Capture', 'Timeline Scrubbing & Replay', 'Resume & Send'] },
      { category: 'Analytics', items: ['Token / Cost Metrics', 'Tool-Usage Tracking', 'Activity Charts & Streaks', 'Plan-Limit Gauges'] },
    ],
    github: 'https://github.com/Exotic209093/Flux-Terminal',
    featured: true,
    date: '2026-06-09',
    track: 'tooling',
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
    id: 'nebula-vault',
    title: 'Nebula-Vault',
    description:
      'Salesforce AppExchange managed package that replaces native file storage with configurable cloud backends across AWS S3, Azure Blob, GCS, OneDrive, and Dropbox.',
    longDescription:
      'Nebula-Vault is a production-grade Salesforce AppExchange managed package designed to solve the storage limitations inherent in native Salesforce file handling. It provides a unified API for routing file operations to AWS S3, Azure Blob Storage, Google Cloud Storage, Microsoft OneDrive, or Dropbox — configurable per org without code changes. The project demonstrates enterprise Salesforce platform engineering, multi-cloud provider abstraction, and the packaging and deployment constraints specific to the AppExchange.',
    category: 'Salesforce Platform Engineering',
    status: 'Active build',
    role: 'Designed and built a multi-cloud storage abstraction layer for Salesforce orgs, packaged as an AppExchange managed package with configurable provider support.',
    highlights: [
      'Implemented a unified file-routing API that abstracts across five cloud providers (AWS S3, Azure Blob, GCS, OneDrive, Dropbox) behind a consistent Salesforce interface.',
      'Built as an AppExchange managed package — enforcing the namespacing, security review readiness, and metadata packaging constraints of the Salesforce ISV model.',
      'Designed the provider configuration layer to be admin-configurable per org without requiring code changes or redeployment.',
    ],
    image: '/projects/nebula-vault.svg',
    tech: ['Apex', 'Salesforce', 'AWS S3', 'Azure Blob', 'GCS', 'OneDrive', 'Dropbox', 'AppExchange'],
    techStack: [
      { category: 'Platform', items: ['Apex', 'Salesforce Metadata API', 'Managed Package', 'AppExchange'] },
      { category: 'Cloud Providers', items: ['AWS S3', 'Azure Blob Storage', 'Google Cloud Storage', 'OneDrive', 'Dropbox'] },
      { category: 'Architecture', items: ['Provider Abstraction Layer', 'Admin-Configurable Routing', 'Namespaced Packaging'] },
    ],
    github: 'https://github.com/Exotic209093/Nebula-Vault',
    featured: true,
    date: '2026-03-31',
    track: 'salesforce',
  },
  {
    id: 'wave-link',
    title: 'WaveLink',
    description:
      'Published Chrome extension for Salesforce data work — query out to CSV/JSON/Excel/XML, push via REST or Bulk API, schedule recurring snapshots, run multi-object migrations with dependency ordering, and diff data across orgs. All processing stays local.',
    longDescription:
      'WaveLink (published on the Chrome Web Store as "WaveLink - Salesforce Data Seeding") is a browser-based toolkit that compresses the most common Salesforce data tasks into a single extension — with every operation running locally against the Salesforce APIs, no external server in the loop. It pairs a structured SOQL builder (aggregates, GROUP BY, subqueries, syntax highlighting) with scheduled recurring exports and offline conversion between CSV, JSON, Excel, and XML. Bulk data push runs through the REST Collections API or Bulk API 2.0 with field mapping, dry-run validation, and live progress. Beyond simple pushes it handles multi-object migration projects with dependency graphing and topological ordering, cross-object cloning with automatic ID remapping, bulk delete with safety confirmations, duplicate detection (exact, Levenshtein, Soundex), and a visual pipeline builder for transform workflows. A schema layer adds relationship graphs, cross-org schema gap analysis, and field usage analytics, while a governor-limit dashboard and org-health view keep an eye on the org itself. The UI ships in three modes — popup, in-page side panel, and full-page app — with a Ctrl+K command palette and Shadow DOM isolation for the in-page panel.',
    category: 'Salesforce Tooling',
    status: 'Published on the Chrome Web Store',
    role: 'Designed and built a published Chrome extension that consolidates everyday Salesforce data work — exports, pushes, scheduled snapshots, migrations, schema diffing, and org monitoring — into one local-first toolkit aimed at admins and consultants.',
    highlights: [
      'Expanded well beyond a seeding tool: scheduled recurring exports, offline CSV/JSON/Excel/XML conversion, multi-object migration projects with dependency graphing and topological ordering, and bulk delete with safety confirmations.',
      'Added an org-awareness layer — cross-org schema gap analysis, field usage analytics, a governor-limit dashboard, and org-health monitoring — on top of the existing SOQL builder, relationship graphs, and pipeline builder.',
      'Kept everything local-first: all processing happens in chrome.storage.local with no external server beyond the Salesforce API, across three UI modes (popup, side panel, full-page app) with a Ctrl+K command palette and Shadow DOM isolation.',
    ],
    image: '/projects/wavelink.png',
    tech: ['TypeScript', 'Preact', 'Webpack', 'Jest', 'Salesforce APIs', 'Chrome Extension', 'Bulk API 2.0'],
    techStack: [
      { category: 'Frontend', items: ['TypeScript', 'Preact', 'Shadow DOM UI', 'Command Palette (Ctrl+K)', 'Three UI Modes', 'Dark Mode'] },
      { category: 'Export & Import', items: ['SOQL Builder (Aggregates, GROUP BY, Subqueries)', 'Scheduled Recurring Exports', 'CSV/JSON/Excel/XML', 'REST Collections API', 'Bulk API 2.0', 'Dry-Run Validation'] },
      { category: 'Data Operations', items: ['Multi-Object Migration Projects', 'Dependency Graphing & Topological Ordering', 'Cross-Object Cloning + ID Remap', 'Bulk Delete', 'Duplicate Detection (Levenshtein, Soundex)', 'Pipeline Builder', 'faker.js Test Data'] },
      { category: 'Schema & Analytics', items: ['Schema Explorer', 'Relationship Graph', 'Cross-Org Schema Gap Analysis', 'Field Usage Analytics', 'Governor-Limit Dashboard', 'Org-Health Monitoring'] },
      { category: 'Cross-Org & Platform', items: ['Multi-Org Connections + Environment Badges', 'Record-Level Data Comparison', 'Selective Sync', 'Local-First (chrome.storage.local)', 'Jest'] },
    ],
    github: 'https://github.com/Exotic209093/WaveLink',
    live: 'https://chromewebstore.google.com/detail/wavelink-salesforce-data/ccknhhibbedolfnbgnenomdohlmojblo',
    featured: true,
    date: '2026-06-08',
    track: 'salesforce',
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
    id: 'exocraft',
    title: 'ExoCraft',
    description:
      'Three.js voxel sandbox with world persistence, progression systems, combat loops, and browser-based save-state management.',
    longDescription:
      'ExoCraft is a browser game project built with Three.js and Vite. It includes world generation, inventory and crafting systems, furnace progression, hostile mob behaviour, branch-based objectives, and persistent save data. While it is not enterprise software, it is credible engineering work that demonstrates complex state management, rendering logic, and iterative feature delivery.',
    category: 'Interactive Frontend',
    status: 'Active prototype',
    role: 'Built and iterated on a browser sandbox game to explore rendering, persistence, and layered gameplay systems in a single codebase.',
    highlights: [
      'Implemented world generation, inventory, crafting, and progression systems with persistent saves.',
      'Handled state-heavy interactions such as combat, furnace processing, and objective tracking.',
      'Used the project as a proving ground for iterative feature delivery and browser performance tradeoffs.',
    ],
    image: '/projects/exocraft.png',
    tech: ['TypeScript', 'Three.js', 'Vite', 'IndexedDB', 'Game Systems'],
    techStack: [
      { category: 'Rendering', items: ['Three.js', 'Voxel World', 'Lighting', 'Camera and Input Handling'] },
      { category: 'Gameplay Systems', items: ['Crafting', 'Inventory', 'Hostile AI', 'Objectives', 'Branch Progression'] },
      { category: 'Persistence', items: ['IndexedDB', 'Autosave', 'World State Serialization'] },
    ],
    github: 'https://github.com/Exotic209093/ExoCraft',
    live: 'https://exo-craft.vercel.app/',
    featured: false,
    date: '2026-03-05',
    track: 'systems',
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
