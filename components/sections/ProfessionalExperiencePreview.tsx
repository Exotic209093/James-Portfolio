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
          
          <Card className="mb-10">
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
                <li>• Develop custom Apex classes and triggers for enterprise-level Salesforce implementations</li>
                <li>• Design and implement REST and SOAP API integrations with external systems</li>
                <li>• Build Lightning Web Components and Aura Components for enhanced user experiences</li>
                <li>• Architect complex system integrations and data synchronization solutions</li>
              </ul>
            </div>
          </Card>

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
