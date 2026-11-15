'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ViewTransition, type CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { getProjectArt } from '@/lib/project-art'
import styles from './ProjectEditorial.module.css'
import { NAV_FORWARD } from '@/components/PageTransition'

export default function ProjectCard({
  project,
  index = 0,
  evidence,
}: {
  project: Project
  index?: number
  evidence?: { image: string; alt: string }
}) {
  const art = getProjectArt(project.id)
  return (
    <Link
      href={`/projects/${project.id}`} transitionTypes={NAV_FORWARD}
      className={styles.card}
      style={{ '--project-accent': art.accent } as CSSProperties}
    >
      {/* Pairs with the case study cover so the image morphs into place. */}
      <ViewTransition name={`art-${project.id}`} share="morph" default="none">
        <div className={styles.cardImage}>
          <Image
            src={evidence?.image || project.image}
            alt={evidence?.alt || `${project.title} concept artwork`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className={styles.cover}
          />
          <div className={styles.imageShade} />
          <span className={styles.cardNumber}>
            {String(index + 1).padStart(2, '0')} / {project.track}
          </span>
          <span className={styles.cardArrow}>
            <ArrowUpRight size={22} aria-hidden="true" />
          </span>
          <span className={styles.cardInvitation}>
            Explore the project <span>↗</span>
          </span>
        </div>
      </ViewTransition>
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
