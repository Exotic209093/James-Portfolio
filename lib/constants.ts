export const siteConfig = {
  name: 'James Collard',
  title: 'Solutions Engineer',
  description:
    'I build software end to end — from Galacia, my independent software brand, and Salesforce data tools to desktop terminals and interactive web experiences. My work combines TypeScript, Python, and systems programming with a focus on useful products and thoughtful details.',
  url: 'https://james-c.app',
  ogImage: '/og-image.jpg',
  location: 'London, United Kingdom',
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
  { name: 'Galacia', href: '/galacia' },
  { name: 'Open Source', href: '/open-source' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export const skills = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'C++', 'C', 'Apex (Salesforce)', 'Dart', 'C#', 'SQL'],
  },
  {
    category: 'Frameworks & Runtimes',
    items: ['Next.js', 'React', 'Node.js', 'Electron', 'Flask', 'Three.js', 'Preact', 'Vite', 'tldraw', 'Flutter', 'Bun', 'Hono'],
  },
  {
    category: 'Platforms & Tools',
    items: ['Salesforce / Apex / LWC', 'Chrome Extensions', 'xterm.js / node-pty', 'HTML5 Canvas', 'SQLite / FTS5', 'AWS', 'Docker', 'GitHub Actions', 'Git', 'Jest', 'Vitest', 'Playwright', 'pytest'],
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
