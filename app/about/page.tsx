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
// Work history mirrors public/resume.pdf. Keep the two in step.
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
    title: 'Solutions Engineer: primary engineer, Infinity product suite',
    organisation: 'Apex Infinity Solutions',
    period: '2026 to present',
    points: [
      'Designed Infinity Dox end to end: a TypeScript monorepo with an orchestrator on AWS ECS Fargate and six worker pipelines (including LLM draft, fix and transform), a React portal, a 39-object Salesforce managed package and Terraform across 7 AWS environments.',
      'Built Infinity Platform and Vault: a shared portal and Command Center (Bun, Fastify, SQLite, React) with licensing and Anthropic SDK AI routes, and an S3 storage gateway designed so file content and keys never pass through the portal.',
      'Kept AI-speed delivery honest: 9 GitHub Actions workflows, a zero-debt lint gate, 3,600+ Apex test methods plus Vitest, Playwright and LWC Jest suites, and 93% Apex coverage. 4,400+ commits in six months.',
      'Built security in: RS256 tenant JWTs, HMAC-signed requests, fail-closed replay protection, SSRF guards and a hash-chained audit log. Ran a white- and black-box pentest across 5 surfaces and fixed 26 of 35 findings.',
      'Built an LLM support-ticket triage pipeline on AWS Lambda and SQS with the Anthropic API, and deliver client projects end to end, including a QuickBooks to Salesforce financial integration in MuleSoft.',
    ],
  },
  {
    lane: 'work',
    title: 'Founder',
    organisation: 'Everfrost',
    period: '2026 to present',
    points: [
      'Run my own company making business software for Salesforce teams. Everfrost Vault, which keeps record files in customer-owned S3 storage, is ready for onboarding; Everfrost Docs is planned.',
      'Build the products, customer platform and website, operate the infrastructure, and give the demos and support myself.',
    ],
  },
  {
    lane: 'work',
    title: 'Junior Software Developer',
    organisation: 'Apex Infinity Solutions',
    period: '2025 to 2026',
    points: [
      'Took technical ownership of a client system after my manager left: redesigned the data model and hardened portal security.',
      'Built backend services with Bun, Express, PostgreSQL and Redis on Docker and AWS ECS, and set up GitHub Actions CI/CD with automated tests and CodeQL and Snyk scanning.',
    ],
  },
  {
    lane: 'work',
    title: 'Contract Infrastructure & Web Services Engineer',
    organisation: 'Private client (online gaming community, under NDA)',
    period: '2023 to 2025',
    points: [
      'Built and maintained the client’s AWS server estate: provisioning, configuration, patching, backups, monitoring and uptime for game and web servers.',
      'Developed and ran player-facing web services, including in-game stores with account linking and automated delivery of purchases to the game servers.',
    ],
  },
  {
    lane: 'learning',
    title: 'Kernel driver development & vulnerability research',
    organisation: 'Independent security research',
    period: '2023 to present',
    summary:
      'I write Windows kernel-mode drivers in C and C++ and research published CVEs: root-cause analysis and proof-of-concept exploits in isolated labs. It feeds directly into my secure-design and pentesting work.',
  },
  {
    lane: 'learning',
    title: 'Meta Back-End Developer Professional Certificate',
    organisation: 'Meta, through Coursera',
    period: '2026',
    summary:
      'Python, Django, Django REST Framework, SQL, Git and REST APIs. Now working towards the Amazon Junior Software Developer and Google UX Design professional certificates.',
  },
  {
    lane: 'learning',
    title: 'Extended Diploma in Engineering',
    organisation: 'Waterfront UTC, Kent',
    period: '2023',
    summary: 'Mechanical, electrical and software engineering, with practical project work.',
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
        <PageIntro
          label={`${siteConfig.title} · ${siteConfig.locationLabel} · ${siteConfig.availability}`}
          title="About"
          lede={siteConfig.description}
        >
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
              I am a <strong>Solutions Engineer at Apex Infinity Solutions</strong>, a small UK Salesforce and technology
              consultancy. I joined in 2025 as a Junior Software Developer and was promoted within a year. Today I am
              the primary engineer behind the <strong>Infinity product suite</strong>: a multi-tenant
              document-generation SaaS with its portal, licensing and storage products. I designed it, built it and run
              it across TypeScript services, React, Salesforce, Terraform and AWS.
            </p>
            <p>
              I work <strong>AI-native</strong> by default, with Claude Code and Codex running parallel agents in
              worktrees. I keep that speed honest with CI quality gates, a critical review of every AI change, security
              testing and trade-offs that are written down. Before this role I spent two years running AWS
              infrastructure and web services on contract, and I research Windows kernel drivers and published CVEs.
            </p>
            <p>
              Outside work I run <strong>Everfrost</strong>, my company making business software for Salesforce
              teams, starting with Everfrost Vault. I also build <strong>Docify</strong>, a native Rust document
              renderer, <strong>WaveLink</strong>, a published Chrome extension for Salesforce data, and{' '}
              <strong>Thrift Map</strong>, a Flutter app live on Google Play.
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
