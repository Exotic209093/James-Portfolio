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
                I'm a passionate full-stack developer with a deep love for creating
                beautiful, functional, and user-friendly web applications. My journey
                in web development started several years ago, and I've been continuously
                learning and growing ever since.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I specialize in building modern web applications using cutting-edge
                technologies. I enjoy turning complex problems into simple, elegant
                solutions and am always eager to take on new challenges.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge with
                the developer community.
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

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Experience</span>
          </h2>
          <div className="space-y-6">
            {/* Sample experience - replace with actual data */}
            <Card>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Senior Full-Stack Developer
                  </h3>
                  <p className="text-purple-400 mb-2">Company Name</p>
                </div>
                <span className="text-gray-400 text-sm">2022 - Present</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Leading development of modern web applications using React, Next.js,
                and Node.js. Collaborating with cross-functional teams to deliver
                high-quality software solutions.
              </p>
            </Card>
            <Card>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Full-Stack Developer
                  </h3>
                  <p className="text-purple-400 mb-2">Previous Company</p>
                </div>
                <span className="text-gray-400 text-sm">2020 - 2022</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Developed and maintained multiple web applications, implemented new
                features, and optimized application performance.
              </p>
            </Card>
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
