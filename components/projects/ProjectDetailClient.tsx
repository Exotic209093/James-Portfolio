'use client'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight, Github } from 'lucide-react'
import { projects, type Project } from '@/lib/projects'
import { getProjectArt } from '@/lib/project-art'
import ProjectShowcase from './ProjectShowcase'
import styles from './ProjectEditorial.module.css'

export default function ProjectDetailClient({ project }: { project: Project }) {
  const art = getProjectArt(project.id)
  const next =
    projects[
      (projects.findIndex((item) => item.id === project.id) + 1) %
        projects.length
    ]
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
          <a href="#project-studio" className={styles.primaryAction}>
            Explore the interactive studio <ArrowDown size={17} />
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
          <h2 id="overview-heading">Behind the work.</h2>
          <p>{project.longDescription || project.description}</p>
        </div>
        <aside className={styles.role}>
          <p className={styles.kicker}>My contribution</p>
          <p>{project.role}</p>
          <div className={styles.cardTech}>
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </aside>
      </section>
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
      <Link href={`/projects/${next.id}`} className={styles.nextProject}>
        <div>
          <p className={styles.kicker}>Keep exploring</p>
          <h2>{next.title}</h2>
        </div>
        <ArrowUpRight size={36} />
      </Link>
    </article>
  )
}
