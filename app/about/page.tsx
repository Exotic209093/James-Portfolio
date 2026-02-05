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
            <span className="text-white">Work </span>
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="space-y-6">
            <Card>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Customer Team Member
                  </h3>
                  <p className="text-purple-400 mb-2">Co-op</p>
                </div>
                <span className="text-gray-400 text-sm">June 2024 – Present</span>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Delivered customer service with professionalism and technical support for in-store devices</li>
                <li>• Maintained operational efficiency through teamwork, product handling, and store upkeep</li>
              </ul>
            </Card>

            <Card>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Warehouse Operative
                  </h3>
                  <p className="text-purple-400 mb-2">Tesco Distribution Centre</p>
                </div>
                <span className="text-gray-400 text-sm">June – August 2024</span>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Worked in a fast-paced logistics environment, accurately processing high-volume orders</li>
                <li>• Supported stock control processes and met strict operational deadlines</li>
              </ul>
            </Card>

            <Card>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Electrical Engineer (Internship)
                  </h3>
                  <p className="text-purple-400 mb-2">Uniper</p>
                </div>
                <span className="text-gray-400 text-sm">April – August 2023</span>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Diagnosed technical issues in a power generation setting and supported maintenance efforts</li>
                <li>• Coordinated with contractors and led daily operational briefings</li>
                <li>• Ensured compliance with regulatory and safety standards</li>
              </ul>
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
              <h2 className="text-2xl font-semibold text-white mb-4">About Me</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I&apos;m a passionate and driven junior software engineer with a solid technical 
                foundation and a strong interest in solving real-world problems through code. My 
                experience includes full-stack web development, systems programming, and scripting 
                automation. I am highly self-motivated, adaptable, and dedicated to writing clean, 
                efficient, and maintainable code.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I have worked on a variety of personal and collaborative software projects, ranging 
                from Windows kernel drivers to full-stack web applications with React and Flask. 
                I&apos;m particularly interested in system optimization, software architecture, and 
                improving user experience through thoughtful design.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I&apos;m now seeking a junior software engineering position where I can continue 
                learning, contribute to real-world products, and grow within a professional team. 
                I&apos;m available for full-time roles and open to hybrid or remote working arrangements.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Project Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Project </span>
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-semibold text-white mb-3">Windows Kernel Driver (C)</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Designed and developed a low-level Windows kernel driver with secure memory access and performance optimizations</li>
                <li>• Gained experience in system-level programming, driver signing, and hardware abstraction</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-white mb-3">Automation and Scripting (Python)</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Built a suite of automation scripts to reduce manual workflows and improve consistency</li>
                <li>• Used SQLite and MongoDB for lightweight local data storage and efficient querying</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-white mb-3">Full-Stack Web Applications</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Developed full-stack web applications with Flask, Django, and React</li>
                <li>• Implemented RESTful APIs, user authentication, and responsive UI designs</li>
                <li>• Created clean user interfaces with robust back-end logic</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-white mb-3">Collaborative Projects</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Contributed to various team-based software builds, participating in code reviews, planning, and testing</li>
                <li>• Regularly used Git and GitHub for version control and collaborative development</li>
              </ul>
            </Card>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Education & </span>
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="space-y-6">
            <Card>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Extended Diploma in Engineering
                  </h3>
                  <p className="text-purple-400 mb-2">Waterfront UTC, Kent</p>
                </div>
                <span className="text-gray-400 text-sm">Completed May 2023</span>
              </div>
              <p className="text-gray-300 mb-3">Focus: Mechanical, Electrical, and Software Engineering</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Built embedded systems using Arduino and Python</li>
                <li>• Designed and programmed custom PCBs for integrated engineering solutions</li>
              </ul>
            </Card>

            <Card>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">GCSEs</h3>
                  <p className="text-purple-400 mb-2">Waterfront UTC, Kent</p>
                </div>
                <span className="text-gray-400 text-sm">Completed July 2021</span>
              </div>
              <p className="text-gray-300 text-sm">Achieved strong academic performance, including Level 9 in Business</p>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-white mb-4">Certifications & Ongoing Learning</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Google UX Design Professional Certificate (in progress)</li>
                <li>• Amazon Junior Software Developer Certificate (in progress)</li>
                <li>• Committed to self-learning through open-source contributions and technical deep-dives</li>
              </ul>
            </Card>
          </div>
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


        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-white">Personal </span>
            <span className="gradient-text">Interests</span>
          </h2>
          <Card>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4 leading-relaxed">
                I have a strong personal interest in system optimization, software architecture, 
                and improving user experience through thoughtful design. I&apos;m committed to 
                continuous learning through open-source contributions and technical deep-dives.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Outside of coding, I&apos;m dedicated to fitness and powerlifting, applying the 
                same consistency, discipline, and focus to my technical work. This mindset helps 
                me tackle challenging problems and maintain steady progress on long-term projects.
              </p>
            </div>
          </Card>
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
