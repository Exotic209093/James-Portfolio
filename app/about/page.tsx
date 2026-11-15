import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Download } from 'lucide-react'
import PageIntro from '@/components/ui/PageIntro'
import { ButtonLink } from '@/components/ui/Button'
import CertificationCard from '@/components/sections/CertificationCard'
import { skills, siteConfig } from '@/lib/constants'
import { getProjectHistory } from '@/lib/projects'
import { getRecentCertifications, certifications } from '@/lib/certifications'
import { formatDate } from '@/lib/utils'
import s from './About.module.css'
import PageTransition, { NAV_FORWARD } from '@/components/PageTransition'

const recentCertifications = getRecentCertifications(3)
const projectHistory = getProjectHistory()

type Lane = 'work' | 'learning'

const lanes: Record<Lane, { label: string; color: string }> = {
  work: { label: 'Work', color: 'var(--lane-salesforce)' },
  learning: { label: 'Learning', color: 'var(--lane-ai)' },
}

// Newest first. Work and learning share one branch, each on its own lane colour.
const timeline: {
  lane: Lane
  title: string
  organisation: string
  period: string
  points?: string[]
  summary?: string
}[] = [
  {
    lane: 'work',
    title: 'Solutions Engineer',
    organisation: 'Apex Infinity Solutions',
    period: '2026 to present',
    points: [
      'Deliver client-facing Salesforce implementations from solution design through Apex and Lightning Web Component development, configuration, and release.',
      'Build document-generation tooling and integrations connecting Salesforce to external systems, including MuleSoft and QuickBooks workflows.',
      'Develop support automation with AWS Lambda, SQS, and language-model APIs, alongside Agentforce and Experience Cloud configuration.',
    ],
  },
  {
    lane: 'work',
    title: 'Junior Software Developer',
    organisation: 'Apex Infinity Solutions',
    period: '2024 to 2026',
    points: [
      'Owned Salesforce configuration and development across data models, record types, page layouts, and Experience Cloud access controls.',
      'Built backend services with Bun, Express, PostgreSQL, and Redis, deployed through Docker and AWS ECS.',
      'Implemented Salesforce integrations and GitHub Actions pipelines with automated testing and security checks.',
    ],
  },
  {
    lane: 'learning',
    title: 'Self-directed software learning',
    organisation: 'Independent study',
    period: 'Since 2023',
    summary:
      'Learning through projects across TypeScript, Python, Apex, and C++, including WaveLink for Salesforce data work, Flux Terminal for AI coding sessions, File Insights for local metadata editing, and browser games built with Three.js and Canvas.',
  },
  {
    lane: 'learning',
    title: 'Extended Diploma in Engineering',
    organisation: 'Waterfront UTC, Kent',
    period: 'May 2023',
    summary: 'Focused on mechanical, electrical, and software engineering with practical project work.',
  },
]

const sections = [
  ['overview', 'Overview'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ...(recentCertifications.length > 0 ? [['certifications', 'Certifications']] : []),
]

export default function AboutPage() {
  return (
    <PageTransition>
    <div className="pb-20 pt-20 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageIntro label={`${siteConfig.title} · London`} title="About" lede={siteConfig.description}>
          <ButtonLink href="/resume.pdf" variant="primary" download>
            <Download aria-hidden="true" className="mr-2 h-5 w-5" /> Download my CV
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">Get in touch</ButtonLink>
        </PageIntro>

        <nav aria-label="About page sections" className={s.subnav}>
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <section id="overview" className={`${s.section} ${s.overview}`} aria-labelledby="overview-title">
          <div className={s.head}>
            <p className="label">Overview</p>
            <h2 id="overview-title">What I do</h2>
          </div>
          <div className={s.prose}>
            <p>
              I am a <strong>Solutions Engineer at Apex Infinity Solutions</strong>, a Salesforce and technology
              consultancy. I deliver client-facing implementations, integrations, and document automation, following a
              Junior Software Developer role with the same team. Alongside that work, I build independent products and
              explore rendering, developer tools, and systems programming.
            </p>
            <p>
              I am building <strong>Galacia</strong>, my independent software brand, starting with Galacia Vault for
              Salesforce file storage. Its public website is live, while Vault remains in development and Docs, Track,
              and Connect are planned concepts. I also build <strong>Docify</strong>, a native Rust document renderer, and
              work on <strong>Infinity Docs</strong>, a Salesforce document-generation platform.
            </p>
            <p>
              My other work includes WaveLink, a Salesforce data workspace; Flux Terminal, an Electron app for exploring
              AI coding sessions; and File Insights, a Python tool for editing local file metadata. I also build web
              experiences such as The Loft Zante and Infinite Idea, and explore rendering and simulation through ExoCraft
              and a Canvas tower-defense game.
            </p>
          </div>
        </section>

        <section id="experience" className={s.section} aria-labelledby="experience-title">
          <div className={s.head}>
            <p className="label">Experience</p>
            <h2 id="experience-title">Work and learning, on one branch.</h2>
          </div>
          <div className={s.legend} aria-hidden="true">
            {(Object.keys(lanes) as Lane[]).map((lane) => (
              <span key={lane} style={{ '--lane': lanes[lane].color } as CSSProperties}>
                <i />
                {lanes[lane].label}
              </span>
            ))}
          </div>
          <ol className={s.timeline}>
            {timeline.map((entry) => (
              <li
                key={`${entry.organisation}-${entry.title}`}
                className={s.item}
                style={{ '--lane': lanes[entry.lane].color } as CSSProperties}
              >
                <p className={s.period}>{entry.period}</p>
                <span className={s.node} aria-hidden="true" />
                <div className={s.body}>
                  <h3>{entry.title}</h3>
                  <p className={s.org}>{entry.organisation}</p>
                  {entry.points && (
                    <ul className={s.points}>
                      {entry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                  {entry.summary && <p className={s.summary}>{entry.summary}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className={s.section} aria-labelledby="projects-title">
          <div className={s.head}>
            <p className="label">Projects</p>
            <h2 id="projects-title">What I built, and my part in it.</h2>
          </div>
          <ul className={s.projects}>
            {projectHistory.map((project) => (
              <li key={project.id}>
                <Link href={`/projects/${project.id}`} transitionTypes={NAV_FORWARD} className={s.projectRow}>
                  <span className={s.projectTitle}>{project.title}</span>
                  <span className={s.projectRole}>{project.role ?? project.description}</span>
                  <span className={s.projectDate}>{formatDate(project.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className={`${s.section} reveal`} aria-labelledby="skills-title">
          <div className={s.head}>
            <p className="label">Skills</p>
            <h2 id="skills-title">Tools I reach for.</h2>
          </div>
          <div className={s.skills}>
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="label">{group.category}</h3>
                <p>
                  {group.items.map((item, index) => (
                    <span key={item}>
                      <span className={s.skill}>{item}</span>
                      {index < group.items.length - 1 && (
                        <>
                          {' '}
                          <span className={s.sep} aria-hidden="true">
                            ·
                          </span>{' '}
                        </>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        {recentCertifications.length > 0 && (
          <section id="certifications" className={s.section} aria-labelledby="certifications-title">
            <div className={s.head}>
              <p className="label">Certifications</p>
              <h2 id="certifications-title">Recent, and verifiable.</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentCertifications.map((certification) => (
                <CertificationCard key={certification.id} certification={certification} />
              ))}
            </div>
            {certifications.length > recentCertifications.length && (
              <Link
                href="/certifications"
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-house transition-colors hover:text-paper"
              >
                View all certifications
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </section>
        )}

        <div className={`${s.closing} reveal`}>
          <p>Want the full picture? Download the CV or get in touch.</p>
          <div className={s.actions}>
            <ButtonLink href="/resume.pdf" variant="primary" download>
              <Download aria-hidden="true" className="mr-2 h-5 w-5" /> Download my CV
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">Get in touch</ButtonLink>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
