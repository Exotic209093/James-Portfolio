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
  date: string
}

export const projects: Project[] = [
  {
    id: 'wave-link',
    title: 'WaveLink',
    description:
      'Chrome extension for Salesforce migration, schema comparison, validation, and dependency-aware data operations.',
    longDescription:
      'WaveLink is a browser-based Salesforce data migration tool focused on real migration workflows. It includes multi-object migration planning, schema gap analysis, validation, rollback support, record comparison, data cleansing, and support for REST collections and bulk-style operations. The project demonstrates product design, complex state handling, and robust TypeScript implementation inside a Chrome extension.',
    category: 'Salesforce Tooling',
    status: 'Active build',
    role: 'Designed and built a browser-based migration workflow tool aimed at Salesforce administrators and consultants handling complex cross-org data work.',
    highlights: [
      'Implemented migration-oriented features such as dependency ordering, ID remapping, validation, and rollback support.',
      'Built a Chrome extension UI with TypeScript and Preact instead of a simple single-page demo.',
      'Added automated tests around key data-handling behaviour to keep complex workflows stable.',
    ],
    image: '/projects/wavelink.jpg',
    tech: ['TypeScript', 'Preact', 'Webpack', 'Jest', 'Salesforce APIs', 'Chrome Extension'],
    techStack: [
      { category: 'Frontend', items: ['TypeScript', 'Preact', 'Shadow DOM UI', 'Command Palette', 'Keyboard Shortcuts'] },
      { category: 'Data Workflows', items: ['Schema Diffing', 'Dependency Ordering', 'ID Remapping', 'Validation Rules', 'Rollback Support'] },
      { category: 'Platform', items: ['Chrome Extension APIs', 'Salesforce REST APIs', 'Local Storage', 'Packaged Release Builds'] },
      { category: 'Quality', items: ['Jest', 'ESLint', 'Type Checking', 'Unit Tests'] },
    ],
    github: 'https://github.com/jc-wave/wave-link',
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
    image: '/projects/salesforce-formatter.jpg',
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
    image: '/projects/apex-hq.jpg',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Tailwind CSS'],
    techStack: [
      { category: 'Application Stack', items: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS'] },
      { category: 'Backend', items: ['NextAuth.js', 'Prisma ORM', 'PostgreSQL', 'Route Handlers'] },
      { category: 'Architecture', items: ['App Router', 'Role-Based Access', 'Feature-Oriented Structure', 'Deployment Docs'] },
      { category: 'Developer Experience', items: ['ESLint', 'Type Safety', 'Environment Configuration', 'Admin Bootstrap Script'] },
    ],
    github: 'https://github.com/Exotic209093/Apex-HQ',
    featured: true,
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
    image: '/projects/email-triage.jpg',
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
    image: '/projects/exocraft.jpg',
    tech: ['TypeScript', 'Three.js', 'Vite', 'IndexedDB', 'Game Systems'],
    techStack: [
      { category: 'Rendering', items: ['Three.js', 'Voxel World', 'Lighting', 'Camera and Input Handling'] },
      { category: 'Gameplay Systems', items: ['Crafting', 'Inventory', 'Hostile AI', 'Objectives', 'Branch Progression'] },
      { category: 'Persistence', items: ['IndexedDB', 'Autosave', 'World State Serialization'] },
    ],
    github: 'https://github.com/Exotic209093/ExoCraft',
    featured: false,
    date: '2026-03-05',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.id === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}

export function getProjectHistory(): Project[] {
  return [...projects].sort((a, b) => (a.date < b.date ? 1 : -1))
}
