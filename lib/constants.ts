export const siteConfig = {
  name: 'James Collard',
  title: 'Junior Software Engineer',
  description: 'Passionate and driven software engineer with expertise in full-stack web development, systems programming, and automation. Seeking opportunities to solve real-world problems through clean, efficient code.',
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
    items: ['Python', 'C++', 'C#', 'JavaScript', 'Arduino C++', 'SQL', 'Bash'],
  },
  {
    category: 'Frameworks & Tools',
    items: ['Flask', 'Django', 'React', 'Node.js', 'Vue.js', 'Qt5', 'Git', 'Docker', 'Linux'],
  },
  {
    category: 'Database & Systems',
    items: ['MySQL', 'SQLite', 'MongoDB', 'REST APIs', 'Multithreading', 'Real-time Systems'],
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
