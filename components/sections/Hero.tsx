'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

export default function Hero() {
  const scrollToExperience = () => {
    const element = document.getElementById('experience-preview')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 40%, rgba(147,51,234,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 60%, rgba(147,51,234,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-white">Hi, I&apos;m </span>
              <span className="gradient-text">{siteConfig.name}</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
              {siteConfig.title}
            </h2>
            <p className="text-lg sm:text-xl text-purple-400 mt-2">
              Based in {siteConfig.location}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonLink href="/projects" variant="primary" size="lg">
                View My Work
              </ButtonLink>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonLink href="/resume.pdf" variant="outline" size="lg" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </ButtonLink>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToExperience}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-purple-400 transition-colors"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
