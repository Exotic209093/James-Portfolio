'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import CertificationCard from '@/components/sections/CertificationCard'
import { skills, siteConfig } from '@/lib/constants'
import { getProjectHistory } from '@/lib/projects'
import { getRecentCertifications, certifications } from '@/lib/certifications'
import { formatDate } from '@/lib/utils'

const recentCertifications = getRecentCertifications(3)

const projectHistory = getProjectHistory()
const highlightedProjects = projectHistory.slice(0, 3)

const workExperience = [
  {
    title: 'Customer Team Member',
    company: 'Co-op',
    period: 'June 2024 to present',
    points: [
      'Built reliability in a customer-facing environment and handled fast-moving operational work.',
      'Strengthened communication, prioritisation, and day-to-day problem solving under pressure.',
    ],
  },
  {
    title: 'Warehouse Operative',
    company: 'Tesco Distribution Centre',
    period: 'June 2024 to August 2024',
    points: [
      'Worked accurately at pace in a process-heavy environment with strict operational targets.',
      'Supported stock flow, order handling, and consistent execution across shift work.',
    ],
  },
  {
    title: 'Electrical Engineer Intern',
    company: 'Uniper',
    period: 'April 2023 to August 2023',
    points: [
      'Supported fault diagnosis and maintenance work on industrial electrical systems at an active power generation facility — a setting where accuracy and safety procedures were non-negotiable.',
      'Worked directly alongside contractors and qualified engineers, building practical exposure to industrial-scale systems and the documentation and sign-off processes that govern them.',
      'Developed the habit of working precisely under constraint — a discipline that carries directly into software debugging, incident response, and production deployments.',
    ],
  },
]

const education = [
  {
    title: 'Extended Diploma in Engineering',
    organisation: 'Waterfront UTC, Kent',
    period: 'Completed May 2023',
    summary: 'Focused on mechanical, electrical, and software engineering with practical project work.',
  },
  {
    title: 'Self-directed software learning',
    organisation: 'Independent study',
    period: 'Ongoing since 2023',
    summary:
      'Built and shipped production-grade personal projects across TypeScript, Python, Apex, C++, and automation tooling — including a Cerebral Valley × Anthropic 4.7 Hackathon submission powered by Claude Opus 4.7 agents, an AppExchange managed package, a Chrome extension for Salesforce migration, and a Windows kernel driver.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card>
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-4">What I am targeting</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I am looking for a software engineering role where I can contribute quickly — building
                internal platforms, developer tooling, automation, and data-heavy workflows. I am self-taught,
                and the projects in this portfolio reflect how I actually work: with real integration points,
                tested behaviour, and a preference for maintainable code over quick demos.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My strongest recent work spans AI agent engineering with the Anthropic Agent SDK
                (delivered live at the Cerebral Valley × Anthropic 4.7 Hackathon), Salesforce platform
                engineering including an AppExchange managed package, and TypeScript browser extension
                development — but I am comfortable moving across the stack and picking up new platforms quickly.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Project </span>
            <span className="gradient-text">History</span>
          </h2>
          <div className="space-y-6">
            {projectHistory.map((entry) => (
              <Card key={entry.id}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{entry.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{entry.description}</p>
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] text-purple-400 whitespace-nowrap">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{entry.role}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Why These </span>
            <span className="gradient-text">Projects Matter</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {highlightedProjects.map((project) => (
              <Card key={project.id} hover className="h-full">
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 text-xs bg-purple-900/30 text-purple-300 rounded border border-purple-800/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

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
                transition={{ delay: 0.45 + index * 0.1, duration: 0.5 }}
              >
                <Card hover>
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">{skillGroup.category}</h3>
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Work & </span>
            <span className="gradient-text">Education</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {workExperience.map((role) => (
                <Card key={`${role.company}-${role.title}`}>
                  <div className="flex flex-col gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-white">{role.title}</h3>
                    <p className="text-purple-400">{role.company}</p>
                    <span className="text-sm text-gray-400">{role.period}</span>
                  </div>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    {role.points.map((point) => (
                      <li key={point} className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              {education.map((item) => (
                <Card key={`${item.organisation}-${item.title}`}>
                  <div className="flex flex-col gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-purple-400">{item.organisation}</p>
                    <span className="text-sm text-gray-400">{item.period}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.summary}</p>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>

        {recentCertifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-white">Recent </span>
              <span className="gradient-text">Certifications</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCertifications.map((certification, index) => (
                <CertificationCard
                  key={certification.id}
                  certification={certification}
                  index={index}
                />
              ))}
            </div>
            {certifications.length > recentCertifications.length && (
              <div className="text-center mt-8">
                <Link
                  href="/certifications"
                  className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors"
                >
                  View all certifications
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
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
