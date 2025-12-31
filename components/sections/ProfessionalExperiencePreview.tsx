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
            <span className="text-white">Professional </span>
            <span className="gradient-text">Experience</span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card hover className="mb-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Software Developer
                  </h3>
                  <p className="text-purple-400 mb-2">Apex Infinity Solutions</p>
                </div>
                <span className="text-gray-400 text-sm">United Kingdom</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-3">
                Specialized in developing custom Apex solutions and building complex integrations
                between Salesforce and external systems. Focus on creating scalable, maintainable
                code that solves real business problems.
              </p>
              <div className="mt-4 pt-4 border-t border-purple-800/30">
                <h4 className="text-purple-400 font-semibold mb-2">Key Responsibilities:</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  {[
                    'Develop custom Apex classes and triggers for enterprise-level Salesforce implementations',
                    'Design and implement REST and SOAP API integrations with external systems',
                    'Build Lightning Web Components and Aura Components for enhanced user experiences',
                    'Architect complex system integrations and data synchronization solutions',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      • {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
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
