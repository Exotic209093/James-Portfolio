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

// James Collard's Projects
export const projects: Project[] = [
  {
    id: 'apex-infinity-vault',
    title: 'Apex Infinity Vault',
    description: 'Advanced Salesforce Apex solution for secure data management and vault operations.',
    longDescription: 'A comprehensive Salesforce Apex project designed for secure data vault operations. Features advanced security patterns, efficient data handling, and robust error management. Built with best practices for enterprise-level Salesforce development.',
    image: '/projects/apex-vault.jpg',
    tech: ['Apex', 'Salesforce', 'SOQL', 'Security', 'Enterprise Patterns'],
    github: 'https://github.com/Exotic209093/Apex-Infinity-Vault',
    featured: true,
    date: '2024-01-20',
  },
  {
    id: 'exoware',
    title: 'ExoWare',
    description: 'Custom Salesforce solution for enterprise-level operations and integrations.',
    longDescription: 'ExoWare is a powerful Salesforce solution designed to handle complex enterprise operations. Features custom Apex classes, Lightning components, and seamless external system integrations. Built to scale and handle high-volume transactions.',
    image: '/projects/exoware.jpg',
    tech: ['Apex', 'Lightning Web Components', 'Salesforce APIs', 'REST APIs', 'Integration'],
    github: 'https://github.com/Exotic209093/ExoWare',
    featured: true,
    date: '2024-01-15',
  },
  {
    id: 'exocord',
    title: 'ExoCord',
    description: 'Salesforce integration solution for connecting disparate systems and platforms.',
    longDescription: 'ExoCord provides seamless integration capabilities between Salesforce and external systems. Features robust error handling, retry mechanisms, and comprehensive logging. Designed to make complex integrations simple and reliable.',
    image: '/projects/exocord.jpg',
    tech: ['Apex', 'REST APIs', 'SOAP APIs', 'Integration', 'Salesforce'],
    github: 'https://github.com/Exotic209093/ExoCord',
    featured: true,
    date: '2024-01-10',
  },
  {
    id: 'database-viewer',
    title: 'Database Viewer Pro',
    description: 'A powerful web application for connecting to and viewing multiple database types including SQLite, MySQL, PostgreSQL, MongoDB, and SQL Server.',
    longDescription: 'Database Viewer Pro is a comprehensive Flask-based web application that supports multiple database types. Features include universal table browser, data pagination, JSON export, automatic cleanup, and secure session-based connections. Supports SQLite, MySQL, PostgreSQL, MongoDB, and SQL Server with a beautiful, responsive UI.',
    image: '/projects/database-viewer.jpg',
    tech: ['Python', 'Flask', 'SQLite', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server'],
    github: 'https://github.com/Exotic209093/Database-viewer',
    featured: true,
    date: '2023-12-15',
  },
  {
    id: 'exo-llm-hub',
    title: 'Exo LLM Hub',
    description: 'Integration hub for Large Language Model (LLM) services within Salesforce.',
    longDescription: 'Exo LLM Hub enables seamless integration of Large Language Model services with Salesforce. Features include API management, response handling, error management, and efficient data processing. Designed to bring AI capabilities to Salesforce applications.',
    image: '/projects/llm-hub.jpg',
    tech: ['Apex', 'Salesforce', 'LLM APIs', 'AI Integration', 'REST APIs'],
    github: 'https://github.com/Exotic209093/Exo-LLM-Hub',
    featured: false,
    date: '2024-01-05',
  },
  {
    id: 'exoware-kernel-driver',
    title: 'ExoWare Kernel Driver',
    description: 'Low-level kernel driver implementation for system-level operations.',
    longDescription: 'ExoWare Kernel Driver is a C/C++ based kernel driver project for low-level system operations. Features include efficient memory management, hardware interaction, and robust error handling. Demonstrates deep system-level programming expertise.',
    image: '/projects/kernel-driver.jpg',
    tech: ['C', 'C++', 'Kernel Development', 'System Programming', 'Low-Level'],
    github: 'https://github.com/Exotic209093/ExoWare-Kernal-Driver',
    featured: false,
    date: '2023-11-20',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.id === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}
