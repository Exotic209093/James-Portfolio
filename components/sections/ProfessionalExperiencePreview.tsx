'use client'

import { motion } from 'framer-motion'
import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { ArrowRight } from 'lucide-react'

export default function ProfessionalExperiencePreview() {
  return (
    <section id="experience-preview" className="py-20 md:py-32 bg-gradient-to-b from-black to-purple-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="text-white">What I&apos;ve </span>
            <span className="gradient-text">Built</span>
          </h2>
          
          <p className="text-lg text-gray-300 mb-10 text-center leading-relaxed max-w-2xl mx-auto">
            A collection of personal and collaborative software projects showcasing my technical abilities
            and passion for solving real-world problems through code.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card hover>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">
                  Windows Kernel Driver (C)
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Low-level system programming with secure memory access, driver signing, 
                  and hardware abstraction.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card hover>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">
                  Full-Stack Web Apps
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Built with Flask, Django, and React. RESTful APIs, authentication, 
                  and responsive UI designs.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card hover>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">
                  Automation Scripts (Python)
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Suite of automation tools reducing manual workflows. SQLite and 
                  MongoDB for efficient data storage.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card hover>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">
                  Collaborative Projects
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Team-based development using Git/GitHub. Code reviews, planning, 
                  testing, and version control.
                </p>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonLink href="/about" variant="outline" size="lg">
                Learn More About Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </ButtonLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
