'use client'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight, Github } from 'lucide-react'
import { projects, type Project } from '@/lib/projects'
import { getProjectArt } from '@/lib/project-art'
import { getRelatedProjects, projectCaseStudies } from '@/lib/project-case-studies'
import { projectEvidence } from '@/lib/project-evidence'
import ProjectShowcase from './ProjectShowcase'
import styles from './ProjectEditorial.module.css'

export default function ProjectDetailClient({ project }: { project: Project }) {
  const art = getProjectArt(project.id)
  const caseStudy = projectCaseStudies[project.id]
  const evidence = projectEvidence[project.id]
  const related = getRelatedProjects(project, projects)
  const contactLabel = caseStudy?.contactLabel
    ?? (project.track === 'salesforce' ? 'Discuss a Salesforce integration' : 'Discuss a similar project')
  return (
    <article
      className={styles.detail}
      style={{ '--project-accent': art.accent } as CSSProperties}
    >
      <header className={styles.intro}>
        <p className={styles.kicker}>
          {art.label} <span>/ Selected work</span>
        </p>
        <h1>{project.title}</h1>
        <p className={styles.dek}>{project.description}</p>
        <div className={styles.actions}>
          <a href={caseStudy ? '#case-study' : '#project-studio'} className={styles.primaryAction}>
            {caseStudy ? 'Read the case study' : 'Explore the interactive studio'} <ArrowDown size={17} aria-hidden="true" />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              {project.liveLabel ||
                (project.id === 'git-navigator'
                  ? 'View on Marketplace'
                  : 'Open live project')}{' '}
              <ArrowUpRight size={17} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github size={17} /> Source code
            </a>
          )}
        </div>
      </header>
      <figure className={styles.hero}>
        <Image
          src={project.image}
          alt={`${project.title} editorial concept artwork`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1152px"
          className={styles.cover}
        />
        <div className={styles.imageShade} />
        <span className={styles.heroStatus}>{project.status}</span>
        <figcaption>
          Concept artwork <span> / {art.label}</span>
        </figcaption>
      </figure>
      <section className={styles.overview} aria-labelledby="overview-heading">
        <div>
          <p className={styles.kicker}>01 / The project</p>
          <h2 id="overview-heading">{caseStudy ? 'The problem to solve.' : 'Behind the work.'}</h2>
          <p>{caseStudy?.problem || project.longDescription || project.description}</p>
        </div>
        <aside className={styles.role}>
          <p className={styles.kicker}>My contribution</p>
          <p>{caseStudy?.role || project.role}</p>
          <div className={styles.cardTech}>
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </aside>
      </section>
      {caseStudy && (
        <section id="case-study" className={styles.caseStudy} aria-labelledby="case-study-heading">
          <p className={styles.kicker}>Decisions / Scope / Result</p>
          <h2 id="case-study-heading">How I approached it.</h2>
          <div className={styles.decisions}>
            {caseStudy.decisions.map((decision) => (
              <div key={decision.title}>
                <h3>{decision.title}</h3>
                <p>{decision.detail}</p>
              </div>
            ))}
          </div>
          <div className={styles.outcome}>
            <h3>What came out of the work</h3>
            <p>{caseStudy.outcome}</p>
            <p className={styles.boundary}>{caseStudy.boundary}</p>
          </div>
          {caseStudy.sources.length > 0 && (
            <ul className={styles.sourceLinks} aria-label="Case study sources">
              {caseStudy.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} <ArrowUpRight size={15} aria-hidden="true" /></a>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      {evidence && (
        <section className={styles.proof} aria-labelledby="proof-heading">
          <p className={styles.kicker}>From the project</p>
          <h2 id="proof-heading">A closer look at the real work.</h2>
          <figure>
            <a href={evidence.image} target="_blank" rel="noopener noreferrer" className={styles.proofImage} aria-label={`Open ${project.title} project image at full size`}>
              <Image src={evidence.image} alt={evidence.alt} fill sizes="(max-width: 1200px) 100vw, 1152px" className={styles.proofScreenshot} />
            </a>
            <figcaption>
              <p>{evidence.caption}</p>
              {evidence.sourceUrl && (
                <a href={evidence.sourceUrl} target="_blank" rel="noopener noreferrer">{evidence.sourceLabel || 'View image source'} <ArrowUpRight size={15} aria-hidden="true" /></a>
              )}
            </figcaption>
          </figure>
        </section>
      )}
      <div id="project-studio" className={styles.studioAnchor}>
        <ProjectShowcase projectId={project.id} />
      </div>
      <section className={styles.build} aria-labelledby="build-heading">
        <p className={styles.kicker}>03 / The build</p>
        <h2 id="build-heading">Details that matter.</h2>
        <div className={styles.highlights}>
          {project.highlights?.map((highlight, index) => (
            <div key={highlight}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{highlight}</p>
            </div>
          ))}
        </div>
        {project.techStack && (
          <div className={styles.stack}>
            {project.techStack.map((group) => (
              <div key={group.category}>
                <h3>{group.category}</h3>
                <p>{group.items.join(' / ')}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className={styles.contact} aria-labelledby="project-contact-heading">
        <div>
          <p className={styles.kicker}>Have a related challenge?</p>
          <h2 id="project-contact-heading">Let’s talk about your project.</h2>
          <p>{caseStudy?.contactPrompt || 'Tell me what you are trying to build, who it is for, and what a useful result would look like.'}</p>
        </div>
        <Link href={`/contact?project=${encodeURIComponent(project.id)}`}>{contactLabel} <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </section>
      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-heading">
          <p className={styles.kicker}>Keep exploring</p>
          <h2 id="related-heading">Related work.</h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.id} href={`/projects/${item.id}`} className={styles.nextProject}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ArrowUpRight size={24} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
