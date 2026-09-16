'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { getProjectArt } from '@/lib/project-art'
import styles from './ProjectEditorial.module.css'

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project
  index?: number
}) {
  const art = getProjectArt(project.id)
  return (
    <Link
      href={`/projects/${project.id}`}
      className={styles.card}
      style={{ '--project-accent': art.accent } as CSSProperties}
    >
      <div className={styles.cardImage}>
        <Image
          src={project.image}
          alt={`${project.title} concept artwork`}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className={styles.cover}
        />
        <div className={styles.imageShade} />
        <span className={styles.cardNumber}>
          {String(index + 1).padStart(2, '0')} / {project.track}
        </span>
        <span className={styles.cardArrow}>
          <ArrowUpRight size={22} />
        </span>
        <span className={styles.cardInvitation}>
          Explore the project <span>↗</span>
        </span>
      </div>
      <div className={styles.cardCopy}>
        <p className={styles.kicker}>{art.label}</p>
        <h2>{project.title}</h2>
        <p className={styles.cardDescription}>{project.description}</p>
        <div className={styles.cardTech}>
          {project.tech.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
