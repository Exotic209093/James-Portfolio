export const siteConfig = {
  name: 'James Collard',
  title: 'Software Engineer',
  description:
    'I build practical software with TypeScript, Python, and Salesforce tooling, with recent work spanning browser extensions, migration automation, internal tools, and data-focused workflows.',
  url: 'https://jamescollard.vercel.app',
  ogImage: '/og-image.jpg',
  location: 'Kent, United Kingdom',
  links: {
    twitter: 'https://twitter.com/Exotic209093',
    github: 'https://github.com/Exotic209093',
    linkedin: 'https://linkedin.com/in/james-collard',
    email: 'mailto:jamescollard2005@gmail.com',
  },
}

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export const skills = [
  {
    category: 'Languages',
    items: ['TypeScript', 'Python', 'JavaScript', 'SQL', 'Apex', 'C++'],
  },
  {
    category: 'Frameworks & Tools',
    items: ['Next.js', 'React', 'Preact', 'Node.js', 'Prisma', 'Jest', 'Webpack', 'Git'],
  },
  {
    category: 'Platform & Delivery',
    items: ['PostgreSQL', 'Salesforce APIs', 'Chrome Extensions', 'CSV/XLSX Processing', 'REST APIs', 'Workflow Automation'],
  },
]

export const projectHistory = [
  {
    period: 'March 2026',
    title: 'WaveLink',
    summary:
      'Built a Chrome extension for Salesforce migration and data operations, including schema diffing, validation, dependency-aware record moves, and rollback support.',
    impact: 'Shows product thinking, TypeScript frontend work, API integration, and testable migration logic.',
  },
  {
    period: 'March 2026',
    title: 'Salesforce Spreadsheet Formatter',
    summary:
      'Created a Python CLI that normalizes CSV and XLSX exports before Data Loader imports, with config-driven rules and issues reporting for failed conversions.',
    impact: 'Demonstrates practical automation, data quality handling, and unit-tested tooling for a real migration workflow.',
  },
  {
    period: 'January 2026',
    title: 'Apex HQ',
    summary:
      'Designed an internal staff portal foundation using Next.js 14, Prisma, PostgreSQL, and NextAuth with role-based access and deployment-oriented architecture.',
    impact: 'Useful evidence of full-stack application structure, auth flows, and maintainable project setup.',
  },
  {
    period: 'March 2026',
    title: 'AI Email Triage Automation',
    summary:
      'Connected n8n workflows to a local Node service that classifies inbound email into structured actions and summaries using an LLM CLI bridge.',
    impact: 'Highlights workflow automation, local service integration, and pragmatic use of AI in operations tooling.',
  },
  {
    period: 'March 2026',
    title: 'ExoCraft',
    summary:
      'Built a browser voxel sandbox in Three.js with persistence, progression systems, crafting, combat loops, and save-state handling.',
    impact: 'Shows strong self-directed engineering, state management, and interactive frontend problem solving.',
  },
]

export const socialLinks = [
  {
    name: 'GitHub',
    href: siteConfig.links.github,
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: 'linkedin',
  },
  {
    name: 'Twitter',
    href: siteConfig.links.twitter,
    icon: 'twitter',
  },
  {
    name: 'Email',
    href: siteConfig.links.email,
    icon: 'mail',
  },
]
