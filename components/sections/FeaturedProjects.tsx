'use client'

import { motion } from 'framer-motion'
import ProjectCard from '@/components/projects/ProjectCard'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { getProjectBySlug } from '@/lib/projects'
import { projectEvidence } from '@/lib/project-evidence'

// Deliberately selected for three different kinds of work, independent of dates.
const featuredProjects = ['wave-link', 'docify', 'galacia'].map((id) => getProjectBySlug(id)!)
const proof: Record<string, string> = {
  'wave-link': 'Published Chrome extension · Salesforce data workflows',
  docify: 'Native Rust renderer · PDF, PNG and document layout',
  galacia: 'Live product website · Independently built and deployed',
}

export default function FeaturedProjects() {
  return (
    <section id="selected-work" aria-labelledby="selected-work-title" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 id="selected-work-title" className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Selected </span>
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three builds, from Salesforce workflows to document rendering and a live website. Explore the problem, the decisions and the result.
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
              <ProjectCard project={project} index={index} evidence={projectEvidence[project.id]} />
              <p className="mt-4 px-1 text-sm leading-relaxed text-gray-300">{proof[project.id]}</p>
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
