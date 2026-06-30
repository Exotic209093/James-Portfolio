'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, X } from 'lucide-react'
import { trackById, type Project } from '@/lib/projects'

function formatDate(date: string) {
  const d = new Date(`${date}T00:00:00`)
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

interface ProjectGitGraphProps {
  projects: Project[]
  activeTrack: string | null
}

/**
 * A single animated "main" line running down the page. Every project is a
 * commit that branches off it — alternating left/right on desktop, all to the
 * right on mobile — with the branch spur + node coloured by its track.
 */
export default function ProjectGitGraph({ projects, activeTrack }: ProjectGitGraphProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const ordered = useMemo(
    () => [...projects].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [projects]
  )

  const openProject = ordered.find((p) => p.id === openId) ?? null

  return (
    <div className="relative py-2">
      {/* ---- the single main line ---- */}
      <div className="pointer-events-none absolute inset-y-0 left-[27px] w-[2px] -translate-x-1/2 overflow-hidden rounded-full bg-gradient-to-b from-purple-500/0 via-purple-500/40 to-purple-500/0 md:left-1/2">
        {/* travelling glow that makes the line feel alive */}
        <motion.div
          className="absolute left-0 h-28 w-full bg-gradient-to-b from-transparent via-purple-300 to-transparent"
          initial={{ y: '-30%' }}
          animate={{ y: '460%' }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* HEAD marker at the top of the line */}
      <div className="relative mb-6 flex justify-start md:justify-center">
        <span className="ml-[27px] -translate-x-1/2 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 font-mono text-[11px] tracking-wider text-purple-300 md:ml-0 md:translate-x-0">
          HEAD · now
        </span>
      </div>

      {/* ---- commit nodes ---- */}
      <div>
        {ordered.map((project, i) => (
          <TimelineNode
            key={project.id}
            project={project}
            index={i}
            dimmed={Boolean(activeTrack && activeTrack !== project.track)}
            onOpen={() => setOpenId(project.id)}
          />
        ))}
      </div>

      {/* origin marker at the bottom */}
      <div className="relative mt-2 flex justify-start md:justify-center">
        <span className="ml-[27px] -translate-x-1/2 rounded-full border border-gray-700/60 bg-black/40 px-3 py-1 font-mono text-[11px] tracking-wider text-gray-500 md:ml-0 md:translate-x-0">
          init · {new Date(`${ordered[ordered.length - 1]?.date}T00:00:00`).getFullYear()}
        </span>
      </div>

      <AnimatePresence>
        {openProject && (
          <CommitWindow project={openProject} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * One commit: a dot on the main line + a branch spur out to a card.
 * Alternates sides on desktop; always branches right on mobile.
 * ------------------------------------------------------------------ */
function TimelineNode({
  project,
  index,
  dimmed,
  onOpen,
}: {
  project: Project
  index: number
  dimmed: boolean
  onOpen: () => void
}) {
  const track = trackById[project.track]
  const onLeft = index % 2 === 1 // odd commits branch left on desktop

  return (
    <div
      className={`relative md:grid md:grid-cols-2 md:items-center ${
        dimmed ? 'opacity-30' : 'opacity-100'
      } transition-opacity duration-300`}
    >
      {/* node dot sitting on the line */}
      <span
        className="absolute left-[27px] top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
        style={{
          borderColor: track.color,
          background: '#0a0a0a',
          boxShadow: `0 0 0 4px ${track.color}1f, 0 0 14px ${track.color}66`,
        }}
        aria-hidden="true"
      />

      {/* branch spur — mobile (always to the right) */}
      <span
        className="absolute left-[27px] top-[34px] h-[2px] w-7 md:hidden"
        style={{ background: track.color, opacity: 0.6 }}
        aria-hidden="true"
      />
      {/* branch spur — desktop (toward the card side) */}
      <span
        className={`absolute top-1/2 hidden h-[2px] w-10 md:block ${
          onLeft ? 'right-1/2' : 'left-1/2'
        }`}
        style={{ background: track.color, opacity: 0.6 }}
        aria-hidden="true"
      />

      {/* the project card that "comes off" the line */}
      <motion.div
        initial={{ opacity: 0, x: onLeft ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45 }}
        className={`py-4 pl-16 pr-2 md:py-6 ${
          onLeft ? 'md:col-start-1 md:pl-2 md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12 md:pr-2'
        }`}
      >
        <button
          type="button"
          onClick={onOpen}
          className="group w-full rounded-xl border border-purple-900/30 bg-gradient-to-br from-purple-900/15 to-black/40 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/10 focus:outline-none focus-visible:border-purple-500"
          style={{ borderLeftColor: `${track.color}66`, borderLeftWidth: 3 }}
          aria-label={`Open details for ${project.title}`}
        >
          <div
            className={`mb-1.5 flex items-center gap-2 ${onLeft ? 'md:flex-row-reverse' : ''}`}
          >
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
              style={{
                color: track.color,
                backgroundColor: `${track.color}1a`,
                border: `1px solid ${track.color}40`,
              }}
            >
              {track.label}
            </span>
            <span className="font-mono text-[11px] text-gray-500">{formatDate(project.date)}</span>
          </div>
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-400">{project.description}</p>
        </button>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * The interactive "window" that opens when a commit is clicked.
 * ------------------------------------------------------------------ */
function CommitWindow({ project, onClose }: { project: Project; onClose: () => void }) {
  const track = trackById[project.track]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-purple-800/40 bg-gradient-to-br from-[#15101f] to-black shadow-2xl shadow-purple-950/40"
      >
        {/* window chrome — reads like an editor/terminal title bar */}
        <div className="flex items-center justify-between border-b border-purple-900/30 bg-black/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-3 font-mono text-xs text-gray-500">
              {project.track}/{project.id}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                color: track.color,
                backgroundColor: `${track.color}1a`,
                border: `1px solid ${track.color}40`,
              }}
            >
              {track.label}
            </span>
            {project.status && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-gray-300">
                {project.status}
              </span>
            )}
            <span className="ml-auto font-mono text-xs text-gray-500">
              {formatDate(project.date)}
            </span>
          </div>

          <h2 className="mb-3 text-2xl font-bold text-white">{project.title}</h2>

          {project.image && (
            <div className="relative mb-4 h-44 w-full overflow-hidden rounded-lg bg-purple-900/20 sm:h-52">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <p className="mb-5 text-sm leading-relaxed text-gray-300">
            {project.longDescription || project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                What it does
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start text-sm text-gray-300">
                    <span
                      className="mr-2.5 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: track.color }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-purple-800/50 bg-purple-900/30 px-2 py-1 text-xs text-purple-200"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 text-sm font-medium text-white transition-all hover:from-purple-500 hover:to-purple-600"
            >
              Full case study
            </Link>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-purple-800/50 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-purple-600/60 hover:text-white"
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-purple-800/50 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-purple-600/60 hover:text-white"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
