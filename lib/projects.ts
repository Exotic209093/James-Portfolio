export interface TechStack {
  category: string
  items: string[]
}

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
}

const allProjects: Project[] = [
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
  },
  {
    id: 'wave-link',
    title: 'WaveLink',
    description:
      'Chrome extension for Salesforce data work — push CSV/JSON/Excel, run SOQL with autocomplete, compare schemas across orgs, generate test data, and recover from mistakes with one-click undo.',
    longDescription:
      'WaveLink (published on the Chrome Web Store as "WaveLink - Salesforce Data Seeding") is a browser-based toolkit that compresses the most common Salesforce data tasks into a single extension. It handles bulk data push from CSV, JSON, or Excel via the REST Collections API or Bulk API 2.0; a structured SOQL editor with autocomplete, query folders, and performance metrics; a schema explorer with relationship graphs and side-by-side org diffing; a visual pipeline builder for filter/transform/lookup/aggregate steps; faker.js-driven test data generation with relationship ID injection; cross-org data comparison with selective sync; duplicate detection (exact, Levenshtein, Soundex); cross-object cloning with topological ordering; and full Push History with one-click Ctrl+Z undo. The UI ships in three modes — popup, in-page side panel, and full-page app — with a Ctrl+K command palette and Shadow DOM isolation for the in-page panel.',
    category: 'Salesforce Tooling',
    status: 'Published on the Chrome Web Store',
    role: 'Designed and built a published Chrome extension that consolidates everyday Salesforce data work — pushes, SOQL, schema diffing, test data generation, and recovery — into one toolkit aimed at admins and consultants.',
    highlights: [
      'Shipped to the Chrome Web Store with a broad feature surface: data push, SOQL editor, schema explorer, pipeline builder, test data generator, duplicate detection, cross-object cloning, and Ctrl+Z undo.',
      'Built three UI modes (popup, in-page side panel, full-page app) with a command palette and Shadow DOM isolation so the in-page panel never collides with Salesforce styling.',
      'Treated reliability as a feature — automatic capture of inserted IDs for one-click rollback, push history with error grouping, and data quality scorecards before write.',
    ],
    image: '/projects/wavelink.png',
    tech: ['TypeScript', 'Preact', 'Webpack', 'Jest', 'Salesforce APIs', 'Chrome Extension', 'Bulk API 2.0'],
    techStack: [
      { category: 'Frontend', items: ['TypeScript', 'Preact', 'Shadow DOM UI', 'Command Palette (Ctrl+K)', 'Three UI Modes', 'Dark Mode'] },
      { category: 'Data Operations', items: ['REST Collections API', 'Bulk API 2.0', 'CSV/JSON/Excel Ingest', 'Pipeline Builder', 'Field Mapping', 'faker.js Test Data'] },
      { category: 'Querying & Schema', items: ['SOQL Editor with Autocomplete', 'Schema Explorer', 'Relationship Graph', 'Cross-Org Schema Diff', 'Field Usage Analytics'] },
      { category: 'Cross-Org & Quality', items: ['Multi-Org Switching', 'Data Comparison', 'Duplicate Detection (Levenshtein, Soundex)', 'Data Quality Scorecards'] },
      { category: 'Recovery & Platform', items: ['Push History', 'Undo / Rollback (Ctrl+Z)', 'Chrome Extension APIs', 'chrome.storage.local', 'Jest'] },
    ],
    github: 'https://github.com/Exotic209093/WaveLink',
    live: 'https://chromewebstore.google.com/detail/wavelink-salesforce-data/ccknhhibbedolfnbgnenomdohlmojblo',
    featured: true,
    date: '2026-03-24',
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
