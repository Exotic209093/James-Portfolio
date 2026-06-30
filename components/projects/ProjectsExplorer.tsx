'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, LayoutGrid } from 'lucide-react'
import {
  projects as allProjects,
  projectTracks,
  type ProjectTrack,
} from '@/lib/projects'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectGitGraph from '@/components/projects/ProjectGitGraph'

type View = 'graph' | 'grid'

export default function ProjectsExplorer() {
  const [view, setView] = useState<View>('graph')
  const [activeTrack, setActiveTrack] = useState<ProjectTrack | null>(null)

  const sorted = useMemo(
    () => [...allProjects].sort((a, b) => (a.date < b.date ? 1 : -1)),
    []
  )

  const visible = activeTrack
    ? sorted.filter((p) => p.track === activeTrack)
    : sorted

  const countByTrack = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const p of allProjects) counts[p.track] = (counts[p.track] ?? 0) + 1
    return counts
  }, [])

  return (
    <div>
      {/* Controls: branch filter + view toggle */}
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        {/* Branch legend / filter */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by branch">
          <button
            type="button"
            onClick={() => setActiveTrack(null)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTrack === null
                ? 'border-purple-500 bg-purple-500/15 text-white'
                : 'border-purple-900/40 text-gray-400 hover:border-purple-700/60 hover:text-gray-200'
            }`}
          >
            All branches
            <span className="ml-1.5 text-xs text-gray-500">{allProjects.length}</span>
          </button>
          {projectTracks.map((track) => {
            const active = activeTrack === track.id
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveTrack(active ? null : track.id)}
                title={track.description}
                className="rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
                style={{
                  color: active ? '#fff' : track.color,
                  backgroundColor: active ? `${track.color}26` : 'transparent',
                  borderColor: active ? track.color : `${track.color}40`,
                }}
              >
                <span
                  className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
                  style={{ backgroundColor: track.color }}
                />
                {track.label}
                <span className="ml-1.5 text-xs opacity-60">{countByTrack[track.id] ?? 0}</span>
              </button>
            )
          })}
        </div>

        {/* View toggle */}
        <div className="flex shrink-0 rounded-lg border border-purple-900/40 bg-black/30 p-1">
          <ToggleButton
            active={view === 'graph'}
            onClick={() => setView('graph')}
            icon={<GitBranch className="h-4 w-4" />}
            label="Graph"
          />
          <ToggleButton
            active={view === 'grid'}
            onClick={() => setView('grid')}
            icon={<LayoutGrid className="h-4 w-4" />}
            label="Grid"
          />
        </div>
      </div>

      {view === 'graph' ? (
        <motion.div
          key="graph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-purple-900/30 bg-black/20 p-3 sm:p-5"
        >
          <ProjectGitGraph projects={sorted} activeTrack={activeTrack} />
          <p className="mt-4 px-3 text-center text-xs text-gray-600">
            One timeline — every project branches off it, newest first, colour-coded by discipline. Click a node to open it.
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

function ToggleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? 'bg-purple-600/30 text-white' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
