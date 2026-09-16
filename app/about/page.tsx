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
    title: 'Solutions Engineer',
    company: 'Apex Infinity Solutions',
    period: '2026 to present',
    points: [
      'Deliver client-facing Salesforce implementations from solution design through Apex and Lightning Web Component development, configuration, and release.',
      'Build document-generation tooling and integrations connecting Salesforce to external systems, including MuleSoft and QuickBooks workflows.',
      'Develop support automation with AWS Lambda, SQS, and language-model APIs, alongside Agentforce and Experience Cloud configuration.',
    ],
  },
  {
    title: 'Junior Software Developer',
    company: 'Apex Infinity Solutions',
    period: '2024 to 2026',
    points: [
      'Owned Salesforce configuration and development across data models, record types, page layouts, and Experience Cloud access controls.',
      'Built backend services with Bun, Express, PostgreSQL, and Redis, deployed through Docker and AWS ECS.',
      'Implemented Salesforce integrations and GitHub Actions pipelines with automated testing and security checks.',
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
      'Learning through projects across TypeScript, Python, Apex, and C++ — including WaveLink for Salesforce data work, Flux Terminal for AI coding sessions, File Insights for local metadata editing, and browser games built with Three.js and Canvas.',
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
              <h2 className="text-2xl font-semibold text-white mb-4">What I do</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I am a Solutions Engineer at Apex Infinity Solutions, a Salesforce and technology
                consultancy. I deliver client-facing implementations, integrations, and document
                automation, following a Junior Software Developer role with the same team. Alongside
                that work, I build independent products and explore rendering, developer tools, and
                systems programming.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I am building Galacia, my independent software brand, starting with Galacia Vault for
                Salesforce file storage. Its public website is live, while Vault remains in development
                and Docs, Track, and Connect are planned concepts. I also build Docify, a native Rust
                document renderer, and work on Infinity Docs, a Salesforce document-generation platform.
                My other work includes WaveLink,
                a Salesforce data workspace; Flux Terminal, an Electron
                app for exploring AI coding sessions; and File Insights, a Python tool for editing local
                file metadata. I also build web experiences such as The Loft Zante and Infinite Idea,
                and explore rendering and simulation through ExoCraft and a Canvas tower-defense game.
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
