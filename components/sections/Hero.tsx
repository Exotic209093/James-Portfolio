'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

// Staggered, restrained entrance — each line eases up into place.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const scrollToNext = () => {
    document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Availability badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-medium tracking-widest uppercase">
              Open to Opportunities
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="gradient-text">{siteConfig.name}</span>
          </motion.h1>

          <motion.h2
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light"
          >
            {siteConfig.title}
          </motion.h2>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-base sm:text-lg text-purple-300 mt-2"
          >
            Based in {siteConfig.location}
          </motion.p>

          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg sm:text-xl text-gray-400 mt-8 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            AI agents · Salesforce engineering · TypeScript · Python · Systems programming
          </motion.p>

          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <ButtonLink href="/projects" variant="primary" size="lg">
              View My Work
            </ButtonLink>
            <ButtonLink href="/resume.pdf" variant="outline" size="lg" download>
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={scrollToNext}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-purple-400 transition-colors"
        data-basic-hide
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  )
}
