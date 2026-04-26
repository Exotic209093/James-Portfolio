'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProjects } from '@/lib/projects'

const featuredProjects = getFeaturedProjects()
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 3)

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
            Recent projects that best reflect the kind of engineering work I want to do next
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
              <Card hover className="relative h-full flex flex-col group cursor-pointer overflow-hidden">
                <Link
                  href={`/projects/${project.id}`}
                  aria-label={`View project: ${project.title}`}
                  className="absolute inset-0 z-10"
                />
                {project.image && (
                  <div className="relative w-full h-44 mb-4 rounded-lg overflow-hidden bg-purple-900/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
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
                <div className="relative z-20 flex gap-3 pt-4 border-t border-purple-800/30">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      aria-label={`${project.title} live site`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
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
