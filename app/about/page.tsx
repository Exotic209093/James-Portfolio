'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import { skills, siteConfig } from '@/lib/constants'

export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">About </span>
            <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {siteConfig.description}
          </p>
        </motion.div>

        {/* Professional Experience Section - Now First */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Professional </span>
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="space-y-6">
            <Card>
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
                  <li>• Create maintainable, scalable code following Salesforce best practices</li>
                </ul>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card>
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-4">My Story</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I&apos;m a Salesforce Software Developer based in the United Kingdom, specializing
                in custom Apex code solutions and external integrations. My passion lies in
                solving complex business challenges by building robust, scalable solutions that
                seamlessly connect Salesforce with external systems.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                While I&apos;m primarily a backend developer with deep expertise in Apex and
                Salesforce architecture, I also have frontend capabilities when needed. I
                specialize in making the impossible possible - taking complex integration
                requirements and turning them into elegant, maintainable solutions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My work spans from enterprise-level Salesforce implementations to low-level
                system programming. I enjoy pushing the boundaries of what&apos;s possible with
                Salesforce and creating solutions that drive real business value.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Skills & </span>
            <span className="gradient-text">Technologies</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <Card hover>
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-3">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <ButtonLink href="/resume.pdf" variant="primary" size="lg" download>
            <Download className="mr-2 h-5 w-5" />
            Download My Resume
          </ButtonLink>
        </motion.div>
      </div>
    </div>
  )
}
