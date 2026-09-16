'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import ProjectCard from '@/components/projects/ProjectCard'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProjects } from '@/lib/projects'

const featuredProjects = getFeaturedProjects()
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 3)

export default function FeaturedProjects() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
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
            Recent projects that best reflect the kind of engineering work I
            want to do next
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
              <ProjectCard project={project} index={index} />
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
