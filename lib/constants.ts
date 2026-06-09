export const siteConfig = {
  name: 'James Collard',
  title: 'Software Engineer',
  description:
    'I build production-grade software across the full stack — from AI agents on the Anthropic Agent SDK and Salesforce AppExchange packages to TypeScript browser extensions and data migration tooling.',
  url: 'https://james-c.app',
  ogImage: '/og-image.jpg',
  location: 'Kent, United Kingdom',
  links: {
    twitter: 'https://twitter.com/Exotic209093',
    github: 'https://github.com/Exotic209093',
    linkedin: 'https://www.linkedin.com/in/james-collard-6b925a313/',
    email: 'mailto:jamescollard2005@gmail.com',
    chromeStore: 'https://chromewebstore.google.com/detail/wavelink-salesforce-data/ccknhhibbedolfnbgnenomdohlmojblo',
  },
}

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export const skills = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Apex (Salesforce)', 'C++', 'SQL', 'Bash'],
  },
  {
    category: 'Frameworks & Runtimes',
    items: ['Next.js', 'React', 'Node.js', 'Bun', 'Hono', 'Three.js', 'Preact', 'Vite', 'Flask', 'Django', 'Prisma', 'Jest'],
  },
  {
    category: 'Platforms & Tools',
    items: ['Salesforce / AppExchange', 'Anthropic Agent SDK', 'Claude Opus 4.7', 'AWS S3', 'Docker', 'Linux', 'Git', 'PostgreSQL', 'MongoDB', 'Chrome Extensions', 'REST APIs'],
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
