'use client'

import { motion } from 'framer-motion'
import { ButtonLink } from '@/components/ui/Button'
import { skills } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

export default function AboutPreview() {
  return (
    <section id="about-preview" className="py-20 md:py-32 bg-gradient-to-b from-black to-purple-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="text-white">About </span>
            <span className="gradient-text">Me</span>
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 text-center leading-relaxed">
            I'm a passionate full-stack developer with a love for creating beautiful,
            functional, and user-friendly web applications. I enjoy turning complex
            problems into simple, elegant solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-6"
              >
                <h3 className="text-purple-400 font-semibold mb-3">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-gray-300 text-sm">
                      • {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <ButtonLink href="/about" variant="outline" size="lg">
              Learn More About Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
