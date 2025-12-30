export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  tech: string[]
  github?: string
  live?: string
  featured: boolean
  date: string
}

// Sample projects data - replace with your actual projects
export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.',
    longDescription: 'A comprehensive e-commerce platform built with Next.js and TypeScript. Features include user authentication, product management, shopping cart, payment processing with Stripe, order tracking, and an admin dashboard for managing products and orders.',
    image: '/projects/ecommerce.jpg',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    date: '2024-01-15',
  },
  {
    id: 'task-management',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    longDescription: 'A modern task management application built with React and Node.js. Features real-time collaboration using Socket.io, drag-and-drop task organization, team workspaces, file attachments, and notifications.',
    image: '/projects/task-manager.jpg',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    date: '2023-11-20',
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with location-based forecasts and interactive maps.',
    longDescription: 'An elegant weather dashboard that provides detailed weather forecasts, interactive maps, and location-based weather data. Built with React and TypeScript, featuring beautiful data visualizations and responsive design.',
    image: '/projects/weather.jpg',
    tech: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'Leaflet'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    date: '2023-09-10',
  },
  {
    id: 'blog-platform',
    title: 'Blog Platform',
    description: 'A modern blog platform with markdown support, syntax highlighting, and SEO optimization.',
    image: '/projects/blog.jpg',
    tech: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
    date: '2023-07-05',
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    description: 'A responsive portfolio website showcasing projects, skills, and experience with smooth animations.',
    image: '/projects/portfolio.jpg',
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
    date: '2023-05-15',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.id === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}
