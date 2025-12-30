'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import Card from '@/components/ui/Card'
import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/projects/${project.id}`}>
        <Card hover className="h-full flex flex-col group cursor-pointer">
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-purple-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-purple-500/30">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-purple-900/30 text-purple-300 rounded border border-purple-800/50"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{project.tech.length - 3} more
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
  )
}
