'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import type { Project } from '@/lib/projects'

interface ProjectDetailClientProps {
  project: Project
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <>
      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-white">{project.title}</span>
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          {project.longDescription || project.description}
        </p>
      </motion.div>

      {/* Project Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-purple-900/20"
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
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="text-6xl font-bold text-purple-500/30">
            {project.title.charAt(0)}
          </span>
        </motion.div>
      </motion.div>

      {/* Tech Stack - Detailed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold text-white mb-6">Tech Stack</h2>
        
        {project.techStack ? (
          <div className="space-y-6">
            {project.techStack.map((stack, stackIndex) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + stackIndex * 0.1, duration: 0.4 }}
              >
                <Card>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + stackIndex * 0.1 + itemIndex * 0.03 }}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(147, 51, 234, 0.4)' }}
                        className="px-3 py-1.5 text-sm bg-purple-900/30 text-purple-300 rounded-lg border border-purple-800/50 cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + techIndex * 0.05 }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(147, 51, 234, 0.4)' }}
                className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg border border-purple-800/50 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {project.github && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonLink
              href={project.github}
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              View Code
            </ButtonLink>
          </motion.div>
        )}
        {project.live && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonLink
              href={project.live}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Live Demo
            </ButtonLink>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
