'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { getProjectHistory } from '@/lib/projects'
import { formatDate } from '@/lib/utils'

const featuredHistory = getProjectHistory().slice(0, 4)

export default function ProfessionalExperiencePreview() {
  return (
    <section id="experience-preview" className="relative py-20 md:py-32 bg-gradient-to-b from-black to-purple-950/10 overflow-hidden">
      {/* Ambient purple glow at the top — visual handoff from the video sections */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(147,51,234,0.18), transparent 70%)', filter: 'blur(40px)' }}
        data-basic-hide
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="text-white">Recent </span>
            <span className="gradient-text">Project History</span>
          </h2>

          <p className="text-lg text-gray-300 mb-10 text-center leading-relaxed max-w-3xl mx-auto">
            I focused this portfolio on projects that are useful in a hiring conversation: software with clear users,
            real workflows, and evidence of maintainable engineering work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {featuredHistory.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <Card hover className="h-full">
                  <p className="text-sm uppercase tracking-[0.2em] text-purple-400 mb-3">{formatDate(entry.date)}</p>
                  <h3 className="text-lg font-semibold text-white mb-3">{entry.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{entry.description}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{entry.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <ButtonLink href="/about" variant="outline" size="lg">
                View Full History
                <ArrowRight className="ml-2 h-5 w-5" />
              </ButtonLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
