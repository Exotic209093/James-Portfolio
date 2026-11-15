'use client'

import { ViewTransition, useEffect, useRef, useState, type CSSProperties, type FocusEvent, type PointerEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { NAV_FORWARD } from '@/components/PageTransition'
import { WRAP } from './layout'
import h from './Home.module.css'
import s from './Scenes.module.css'

export interface SceneProject {
  id: string
  title: string
  description: string
  accent: string
  label: string
  trackLabel: string
  tech: string[]
  proof: string
  image: string
  /** A real screenshot or generated output, kept apart from the concept art. */
  evidence?: { image: string; alt: string; label: string }
}

function motionAllowed() {
  return (
    !document.documentElement.classList.contains('calm-motion') &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

const pad = (value: number) => String(value).padStart(2, '0')

/**
 * Selected work as a sequence of full-screen scenes. While a scene is pinned,
 * its artwork opens from a card to the full frame, the name wipes in left to
 * right (the hero's render pass, at scene scale), then the details arrive.
 * As the scene leaves it recedes and dims while the next one opens beneath it.
 *
 * Everything is CSS scroll-driven animation over each scene's own runway.
 * Without support, or with calm motion, the scenes are still full-bleed panels.
 */
export default function Scenes({ projects }: { projects: SceneProject[] }) {
  const [evidenceShown, setEvidenceShown] = useState<Record<string, boolean>>({})
  const lightFrame = useRef(0)
  useEffect(() => () => cancelAnimationFrame(lightFrame.current), [])

  // The scene's light eases towards a mouse pointer.
  const moveLight = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !motionAllowed()) return
    const stage = event.currentTarget
    const { clientX, clientY } = event
    cancelAnimationFrame(lightFrame.current)
    lightFrame.current = requestAnimationFrame(() => {
      const box = stage.getBoundingClientRect()
      stage.style.setProperty('--mx', `${((clientX - box.left) / box.width) * 100}%`)
      stage.style.setProperty('--my', `${((clientY - box.top) / box.height) * 100}%`)
    })
  }
  const restLight = (event: PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(lightFrame.current)
    event.currentTarget.style.removeProperty('--mx')
    event.currentTarget.style.removeProperty('--my')
  }

  // Keyboard focus lands in a scene's hold phase, where everything is visible.
  const holdOnFocus = (event: FocusEvent<HTMLElement>) => {
    const scene = event.currentTarget
    const stage = scene.querySelector<HTMLElement>(`.${s.stage}`)
    if (!stage || getComputedStyle(stage).position !== 'sticky') return
    const top = scene.getBoundingClientRect().top + window.scrollY
    const target = top + (scene.offsetHeight - window.innerHeight) * 0.62
    if (Math.abs(window.scrollY - target) > 4) window.scrollTo({ top: target, behavior: 'instant' })
  }

  return (
    <section id="work" className={s.work} aria-labelledby="work-title">
      <div className={`${WRAP} ${s.head}`}>
        <div className={h.secHead}>
          <p className="label">Selected work</p>
          <h2 id="work-title">Four builds. Four kinds of problem.</h2>
          <p>
            A Chrome extension for Salesforce data, a native document renderer, a workspace for AI coding sessions and a
            live product website. Each one opens into a case study.
          </p>
        </div>
      </div>

      {projects.map((project, index) => {
        const view = project.evidence && evidenceShown[project.id] ? 'evidence' : 'art'
        return (
          <article
            key={project.id}
            id={`scene-${project.id}`}
            className={s.scene}
            data-scene={index}
            aria-labelledby={`scene-title-${project.id}`}
            style={{ '--a': project.accent } as CSSProperties}
            onFocus={holdOnFocus}
          >
            <div className={s.stage} onPointerMove={moveLight} onPointerLeave={restLight}>
              <div className={s.media}>
                <ViewTransition name={`art-${project.id}`} share="morph" default="none">
                  <Link
                    href={`/projects/${project.id}`}
                    transitionTypes={NAV_FORWARD}
                    className={s.frame}
                    tabIndex={-1}
                    aria-hidden="true"
                    data-view={view}
                  >
                    <Image src={project.image} alt="" fill sizes="100vw" className={s.art} />
                    {project.evidence && (
                      <Image src={project.evidence.image} alt="" fill sizes="100vw" className={s.evidence} />
                    )}
                  </Link>
                </ViewTransition>
                <div className={s.scrim} aria-hidden="true" />
              </div>

              <div className={s.progress} aria-hidden="true">
                <span />
              </div>

              <ol className={s.rail} aria-hidden="true">
                {projects.map((item, railIndex) => (
                  <li key={item.id} data-current={railIndex === index}>
                    <a href={`#scene-${item.id}`} tabIndex={-1}>
                      <span>{pad(railIndex + 1)}</span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>

              <div className={`${WRAP} ${s.copy}`}>
                <p className={s.index}>
                  <span>{pad(index + 1)}</span> / {pad(projects.length)}
                </p>
                <h3 id={`scene-title-${project.id}`} className={s.title}>
                  {project.title}
                </h3>
                <div className={s.details}>
                  <p className={`label ${s.kicker}`}>
                    {project.trackLabel} · {project.label}
                  </p>
                  <p className={s.description}>{project.description}</p>
                  <p className={s.proof}>{project.proof}</p>
                  <div className={s.actions}>
                    <Link href={`/projects/${project.id}`} transitionTypes={NAV_FORWARD} className={s.cta}>
                      Read the case study
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                    {project.evidence && (
                      <div className={s.toggle} role="group" aria-label={`${project.title} image`}>
                        {(['art', 'evidence'] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={view === option}
                            onClick={() => setEvidenceShown((shown) => ({ ...shown, [project.id]: option === 'evidence' }))}
                          >
                            {option === 'art' ? 'Artwork' : project.evidence?.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
