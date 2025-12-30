'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

// Sample projects - will be replaced with actual data
const featuredProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com',
    live: 'https://example.com',
    image: '/project-1.jpg',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com',
    live: 'https://example.com',
    image: '/project-2.jpg',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with location-based forecasts and interactive maps.',
    tech: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
    github: 'https://github.com',
    live: 'https://example.com',
    image: '/project-3.jpg',
  },
]

export default function FeaturedProjects() {
  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of my recent work showcasing my skills and expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card hover className="h-full flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-purple-900/30 text-purple-300 rounded border border-purple-800/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-purple-800/30">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    aria-label="View live site"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <ButtonLink href="/projects" variant="outline" size="lg">
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
