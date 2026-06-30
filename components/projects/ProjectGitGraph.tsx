'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, GitCommitHorizontal, X } from 'lucide-react'
import {
  projectTracks,
  trackById,
  type Project,
  type ProjectTrack,
} from '@/lib/projects'

/* ------------------------------------------------------------------ *
 * Geometry — the graph is a fixed-width SVG "gutter" on the left with
 * commit rows aligned to it on the right (GitHub network-graph style).
 * Lane columns are derived from `projectTracks` order plus the trunk.
 * ------------------------------------------------------------------ */
const ROW_H = 88
const TRUNK_X = 22
const COL_W = 26
const DOT_R = 6.5
const GUTTER_W = TRUNK_X + projectTracks.length * COL_W + 14

const laneX = (track: ProjectTrack) =>
  TRUNK_X + (projectTracks.findIndex((t) => t.id === track) + 1) * COL_W

function formatDate(date: string) {
  const d = new Date(`${date}T00:00:00`)
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

interface ProjectGitGraphProps {
  projects: Project[]
  activeTrack: ProjectTrack | null
}

export default function ProjectGitGraph({ projects, activeTrack }: ProjectGitGraphProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  // Newest commit at the top, like `git log`.
  const ordered = useMemo(
    () => [...projects].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [projects]
  )

  // For each track, find the index span of its commits so we can draw a
  // continuous lane that also passes *through* rows owned by other tracks.
  const laneSpan = useMemo(() => {
    const span: Partial<Record<ProjectTrack, { top: number; bottom: number }>> = {}
    ordered.forEach((p, i) => {
      const cur = span[p.track]
      span[p.track] = cur
        ? { top: Math.min(cur.top, i), bottom: Math.max(cur.bottom, i) }
        : { top: i, bottom: i }
    })
    return span
  }, [ordered])

  const height = Math.max(ordered.length * ROW_H, ROW_H)
  const openProject = ordered.find((p) => p.id === openId) ?? null

  return (
    <div className="relative">
      <div className="grid" style={{ gridTemplateColumns: `${GUTTER_W}px 1fr` }}>
        {/* ---- SVG graph gutter (spans all rows) ---- */}
        <div className="relative" style={{ height }}>
          <svg
            width={GUTTER_W}
            height={height}
            viewBox={`0 0 ${GUTTER_W} ${height}`}
            className="absolute inset-0"
            aria-hidden="true"
          >
            {/* main trunk */}
            <line
              x1={TRUNK_X}
              y1={ROW_H / 2}
              x2={TRUNK_X}
              y2={height}
              stroke="#6b7280"
              strokeWidth={2}
              strokeOpacity={activeTrack ? 0.35 : 0.6}
            />
            {/* HEAD node at the top of the trunk */}
            <circle cx={TRUNK_X} cy={ROW_H / 2} r={4} fill="#9ca3af" />

            {/* lanes + branch connectors */}
            {projectTracks.map((track) => {
              const span = laneSpan[track.id]
              if (!span) return null
              const x = laneX(track.id)
              const yTop = span.top * ROW_H + ROW_H / 2
              const yBottom = span.bottom * ROW_H + ROW_H / 2
              const dim = activeTrack && activeTrack !== track.id
              const opacity = dim ? 0.12 : 1
              // branch-off curve: oldest commit of the lane curves back to the trunk
              const branchY = yBottom + ROW_H / 2
              return (
                <g key={track.id} style={{ opacity }} className="transition-opacity duration-300">
                  <path
                    d={`M ${x} ${yBottom} C ${x} ${branchY}, ${TRUNK_X} ${yBottom}, ${TRUNK_X} ${branchY}`}
                    fill="none"
                    stroke={track.color}
                    strokeWidth={2}
                  />
                  {yBottom > yTop && (
                    <line
                      x1={x}
                      y1={yTop}
                      x2={x}
                      y2={yBottom}
                      stroke={track.color}
                      strokeWidth={2}
                    />
                  )}
                </g>
              )
            })}

            {/* commit dots */}
            {ordered.map((p, i) => {
              const x = laneX(p.track)
              const y = i * ROW_H + ROW_H / 2
              const dim = activeTrack && activeTrack !== p.track
              const color = trackById[p.track].color
              return (
                <g
                  key={p.id}
                  style={{ opacity: dim ? 0.2 : 1 }}
                  className="transition-opacity duration-300"
                >
                  <circle cx={x} cy={y} r={DOT_R + 3} fill={color} opacity={0.18} />
                  <circle
                    cx={x}
                    cy={y}
                    r={DOT_R}
                    fill="#0a0a0a"
                    stroke={color}
                    strokeWidth={2.5}
                  />
                </g>
              )
            })}
          </svg>
        </div>

        {/* ---- commit rows ---- */}
        <div>
          {ordered.map((p, i) => {
            const dim = activeTrack && activeTrack !== p.track
            const track = trackById[p.track]
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setOpenId(p.id)}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
                style={{ height: ROW_H }}
                className={`group flex w-full items-center gap-4 border-b border-purple-900/15 px-3 text-left transition-colors hover:bg-purple-900/10 focus:outline-none focus-visible:bg-purple-900/15 ${
                  dim ? 'opacity-40' : 'opacity-100'
                }`}
                aria-label={`Open details for ${p.title}`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-base font-semibold text-white group-hover:text-purple-300 sm:text-lg">
                      {p.title}
                    </h3>
                    <span
                      className="hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider sm:inline"
                      style={{
                        color: track.color,
                        backgroundColor: `${track.color}1a`,
                        border: `1px solid ${track.color}40`,
                      }}
                    >
                      {track.label}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-gray-400">{p.description}</p>
                </div>
                <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                  <span className="font-mono text-xs text-gray-500">{formatDate(p.date)}</span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-gray-600">
                    <GitCommitHorizontal className="h-3.5 w-3.5" />
                    {p.id.slice(0, 7)}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* ---- commit "window" modal ---- */}
      <AnimatePresence>
        {openProject && (
          <CommitWindow project={openProject} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
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
