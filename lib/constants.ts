export const siteConfig = {
  name: 'James Collard',
  title: 'Solutions Engineer',
  description:
    'Full-stack engineer working AI-native across TypeScript, Python and AWS. Primary engineer on the Infinity product suite at Apex Infinity Solutions, and founder of Everfrost, a company building Salesforce software.',
  url: 'https://james-c.app',
  ogImage: '/og-image.jpg',
  location: 'Chatham, Kent, United Kingdom',
  /** Short form for labels: where I am, and where I will work. */
  locationLabel: 'Kent, UK',
  availability: 'Open to London hybrid',
  links: {
    twitter: 'https://twitter.com/Exotic209093',
    github: 'https://github.com/Exotic209093',
    linkedin: 'https://www.linkedin.com/in/james-collard-6b925a313/',
    email: 'mailto:jamescollard2005@gmail.com',
    chromeStore: 'https://chromewebstore.google.com/detail/wavelink-salesforce-data/ccknhhibbedolfnbgnenomdohlmojblo',
    everfrost: 'https://everfrost.app',
  },
}

// Four destinations keep the full navigation on one line from 1024px.
// Everfrost and Certifications stay reachable from Work, About, the footer and
// the command palette.
export const navigation = [
  { name: 'Work', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Open source', href: '/open-source' },
  { name: 'Contact', href: '/contact' },
]

export const sitePages = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Everfrost', href: '/everfrost' },
  { name: 'Open source', href: '/open-source' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Contact', href: '/contact' },
]

// Mirrors the Core Skills section of public/resume.pdf. Keep the two in step.
export const skills = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Apex', 'Bash', 'C / C++', 'Rust'],
  },
  {
    category: 'Backend & Data',
    items: ['Node.js', 'Bun', 'Fastify', 'Hono', 'Express', 'Django / DRF', 'REST API design & versioning', 'PostgreSQL', 'SQLite', 'DynamoDB', 'Redis'],
  },
  {
    category: 'AI & LLMs',
    items: ['Anthropic API / SDK', 'LLM pipelines', 'Classifier / executor agents', 'Draft / fix / transform workers', 'Einstein / Agentforce', 'Claude Code', 'Codex', 'Custom agent skills'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS EC2', 'ECS Fargate', 'Lambda', 'SQS', 'S3', 'DynamoDB', 'ECR', 'Secrets Manager', 'Terraform', 'Docker', 'Linux server administration', 'GitHub Actions (OIDC)', 'CodeBuild'],
  },
  {
    category: 'Security & Quality',
    items: ['JWT (RS256)', 'HMAC request signing', 'Audit logging', 'Pentesting & remediation', 'Windows kernel drivers', 'CVE analysis', 'Vitest', 'Playwright', 'Jest', 'Apex tests', 'CodeQL', 'Snyk'],
  },
  {
    category: 'Frontend & Salesforce',
    items: ['React', 'Vite', 'Next.js', 'Tailwind CSS', 'Flutter', 'Apex', 'Lightning Web Components', '2GP managed packages', 'Experience Cloud', 'MuleSoft'],
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
    name: 'WaveLink on the Chrome Web Store',
    href: siteConfig.links.chromeStore,
    icon: 'chrome',
  },
  {
    name: 'Email',
    href: siteConfig.links.email,
    icon: 'mail',
  },
]
