'use client'

import { ViewTransition, useEffect, useRef, useState, type CSSProperties, type FocusEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { WRAP } from './layout'
import s from './Home.module.css'

export interface ExhibitRoom {
  id: string
  title: string
  description: string
  accent: string
  label: string
  trackLabel: string
  tech: string[]
  proof: string
  image: string
}

function prefersStill() {
  return (
    document.documentElement.classList.contains('calm-motion') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Four rooms. Where scroll-driven animation runs, the stage pins and the rooms
 * pan sideways while the light takes on each project's accent. Elsewhere the
 * rooms are a snapping sideways scroller with buttons. Both are server HTML.
 */
export default function Exhibition({ rooms }: { rooms: ExhibitRoom[] }) {
  const runwayRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const count = rooms.length

  const isPinned = () => stageRef.current !== null && getComputedStyle(stageRef.current).position === 'sticky'

  const goTo = (index: number, instant = false) => {
    const target = Math.max(0, Math.min(count - 1, index))
    const behavior: ScrollBehavior = instant || prefersStill() ? 'auto' : 'smooth'
    const runway = runwayRef.current
    const scroller = scrollerRef.current
    if (!runway || !scroller) return
    if (isPinned()) {
      // The pan runs across the runway's "contain" range.
      const top = runway.getBoundingClientRect().top + window.scrollY
      const travel = runway.offsetHeight - window.innerHeight
      window.scrollTo({ top: top + (travel * target) / Math.max(1, count - 1), behavior })
    } else {
      scroller.scrollTo({ left: target * scroller.clientWidth, behavior })
    }
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(Number((entry.target as HTMLElement).dataset.room))
        }
      },
      { root: scroller, threshold: 0.6 }
    )
    scroller.querySelectorAll('[data-room]').forEach((room) => observer.observe(room))
    return () => observer.disconnect()
  }, [])

  // Keyboard focus must never land in a room that is panned out of view.
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    const room = (event.target as HTMLElement).closest<HTMLElement>('[data-room]')
    if (!room) return
    const index = Number(room.dataset.room)
    if (isPinned()) {
      goTo(index, true)
    } else {
      scrollerRef.current?.scrollTo({ left: index * (scrollerRef.current?.clientWidth ?? 0), behavior: 'auto' })
    }
  }

  const accents = Object.fromEntries(rooms.map((room, index) => [`--a${index}`, room.accent]))

  return (
    <section
      id="work"
      className={s.exhibit}
      aria-labelledby="work-title"
      style={{ '--n': String(count), ...accents } as CSSProperties}
    >
      <div className={`${WRAP} ${s.exhibitHead}`}>
        <div className={s.secHead}>
          <p className="label">Selected work</p>
          <h2 id="work-title">Four builds. Four kinds of problem.</h2>
          <p>
            A Chrome extension for Salesforce data, a native document renderer, a workspace for AI coding sessions
            and a live product website. Each one opens into a case study.
          </p>
        </div>
      </div>

      <div ref={runwayRef} className={s.runway}>
        <div
          ref={stageRef}
          className={s.stage}
          style={
            {
              '--room-accent': rooms[current]?.accent,
              '--rail': String((current + 1) / count),
            } as CSSProperties
          }
        >
          <div ref={scrollerRef} className={s.scroller} onFocus={handleFocus}>
            <div className={s.track}>
              {rooms.map((room, index) => (
                <article
                  key={room.id}
                  className={s.room}
                  data-room={index}
                  aria-labelledby={`room-${room.id}`}
                  style={{ '--a': room.accent } as CSSProperties}
                >
                  <div className={`${WRAP} ${s.roomInner}`}>
                    <ViewTransition name={`art-${room.id}`} share="morph" default="none">
                      <Link href={`/projects/${room.id}`} className={s.roomArt} tabIndex={-1} aria-hidden="true">
                        <Image src={room.image} alt="" fill sizes="(max-width: 760px) 92vw, 620px" />
                      </Link>
                    </ViewTransition>
                    <div className={s.roomCopy}>
                      <p className={`label ${s.roomLabel}`}>
                        {room.trackLabel} · {room.label}
                      </p>
                      <h3 id={`room-${room.id}`} className={s.roomTitle}>
                        {room.title}
                      </h3>
                      <p className={s.roomDesc}>{room.description}</p>
                      <p className={s.roomProof}>{room.proof}</p>
                      <ul className={s.chips} aria-label="Technologies">
                        {room.tech.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                      <Link href={`/projects/${room.id}`} className={`${s.pill} ${s.pillAccent}`}>
                        Read the case study
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={`${WRAP} ${s.exhibitBar}`}>
            <div className={s.exhibitNames}>
              {rooms.map((room, index) => (
                <button
                  key={room.id}
                  type="button"
                  aria-current={index === current ? 'true' : undefined}
                  aria-label={`Show ${room.title}`}
                  onClick={() => goTo(index)}
                >
                  {room.title}
                </button>
              ))}
            </div>
            <div className={s.exhibitRail} aria-hidden="true">
              <span />
            </div>
            <div className={s.exhibitNav}>
              <button
                type="button"
                className={s.pill}
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                aria-label="Previous project"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={s.pill}
                onClick={() => goTo(current + 1)}
                disabled={current === count - 1}
                aria-label="Next project"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
