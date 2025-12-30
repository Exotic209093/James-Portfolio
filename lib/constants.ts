export const siteConfig = {
  name: 'James Collard',
  title: 'Salesforce Software Developer',
  description: 'Specializing in custom Apex code solutions and external integrations. Making the impossible possible.',
  url: 'https://jamescollard.vercel.app',
  ogImage: '/og-image.jpg',
  location: 'United Kingdom',
  links: {
    twitter: 'https://twitter.com/Exotic209093',
    github: 'https://github.com/Exotic209093',
    linkedin: 'https://linkedin.com/in/james-collard',
    email: 'mailto:james@example.com',
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
    category: 'Salesforce',
    items: ['Apex', 'Lightning Web Components', 'Salesforce APIs', 'SOQL', 'Aura Components', 'Flow'],
  },
  {
    category: 'Backend',
    items: ['Apex Development', 'REST APIs', 'SOAP APIs', 'External Integrations', 'Database Design', 'System Architecture'],
  },
  {
    category: 'Technologies',
    items: ['Python', 'JavaScript', 'TypeScript', 'C/C++', 'Flask', 'Git', 'PostgreSQL', 'MySQL', 'MongoDB'],
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
