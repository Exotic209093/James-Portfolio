'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProjects } from '@/lib/projects'

const featuredProjects = getFeaturedProjects().slice(0, 3)

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
              <Link href={`/projects/${project.id}`}>
                <Card hover className="h-full flex flex-col group cursor-pointer">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-purple-900/30 text-purple-300 rounded border border-purple-800/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-purple-800/30">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                        aria-label="View live site"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </Card>
              </Link>
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
