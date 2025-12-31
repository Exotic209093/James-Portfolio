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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <Link href={`/projects/${project.id}`}>
        <Card hover className="h-full flex flex-col group cursor-pointer overflow-hidden">
          <motion.div 
            className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-purple-900/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-black/50" />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ 
                background: [
                  'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.span 
                className="text-4xl font-bold text-purple-500/30"
                whileHover={{ scale: 1.2, color: 'rgba(147, 51, 234, 0.5)' }}
                transition={{ duration: 0.2 }}
              >
                {project.title.charAt(0)}
              </motion.span>
            </motion.div>
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.slice(0, 3).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + techIndex * 0.05 }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(147, 51, 234, 0.4)' }}
                  className="px-2 py-1 text-xs bg-purple-900/30 text-purple-300 rounded border border-purple-800/50 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
              {project.tech.length > 3 && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="px-2 py-1 text-xs text-gray-500"
                >
                  +{project.tech.length - 3} more
                </motion.span>
              )}
            </div>
          </div>

          <motion.div 
            className="flex gap-3 pt-4 border-t border-purple-800/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="View live site"
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            )}
          </motion.div>
        </Card>
      </Link>
    </motion.div>
  )
}
