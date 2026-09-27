'use client'

import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, LayoutGrid, Search } from 'lucide-react'
import {
  projects as publicProjects,
  projectTracks,
  type ProjectTrack,
} from '@/lib/projects'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectGitGraph from '@/components/projects/ProjectGitGraph'

type View = 'graph' | 'grid'

export default function ProjectsExplorer() {
  const [view, setView] = useState<View>('grid')
  const [activeTrack, setActiveTrack] = useState<ProjectTrack | null>(null)
  const [query, setQuery] = useState('')
  const searchInput = useRef<HTMLInputElement>(null)

  const sorted = useMemo(
    () => [...publicProjects].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)),
    []
  )

  const searchMatches = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    return sorted.filter((project) => {
      const text = [
        project.title,
        project.description,
        ...project.tech,
        ...(project.techStack?.flatMap((group) => group.items) ?? []),
      ].join(' ').toLowerCase()
      return terms.every((term) => text.includes(term))
    })
  }, [query, sorted])

  const visible = activeTrack
    ? searchMatches.filter((p) => p.track === activeTrack)
    : searchMatches
  const selectedTrack = projectTracks.find((track) => track.id === activeTrack)
  const hasFilters = Boolean(query.trim() || activeTrack)

  const countByTrack = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const p of searchMatches) counts[p.track] = (counts[p.track] ?? 0) + 1
    return counts
  }, [searchMatches])

  function clearFilters() {
    setQuery('')
    setActiveTrack(null)
    searchInput.current?.focus()
  }

  return (
    <div>
      <div role="search" aria-label="Search projects" className="mb-6 max-w-2xl">
        <label htmlFor="project-search" className="mb-2 block text-sm font-medium text-white">
          Search projects
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-purple-800/40 bg-black/30 px-4 focus-within:border-purple-400">
          <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-400" />
          <input
            ref={searchInput}
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-describedby="project-search-hint"
            aria-controls="project-results"
            placeholder="Try Salesforce, Rust or React"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent py-3 text-base text-white placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                searchInput.current?.focus()
              }}
              className="shrink-0 rounded-md py-2 text-sm text-purple-300 hover:text-white"
            >
              Clear search
            </button>
          )}
        </div>
        <p id="project-search-hint" className="mt-2 text-sm text-gray-400">
          Find work by name, description or technology. Combine your search with a branch below.
        </p>
      </div>

      {/* Controls: branch filter + view toggle */}
      <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        {/* Branch legend / filter */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by branch">
          <button
            type="button"
            aria-pressed={activeTrack === null}
            onClick={() => setActiveTrack(null)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTrack === null
                ? 'border-purple-500 bg-purple-500/15 text-white'
                : 'border-purple-900/40 text-gray-400 hover:border-purple-700/60 hover:text-gray-200'
            }`}
          >
            All branches
            <span className="ml-1.5 text-xs text-gray-400">{searchMatches.length}</span>
          </button>
          {projectTracks.map((track) => {
            const active = activeTrack === track.id
            return (
              <button
                key={track.id}
                type="button"
                aria-pressed={active}
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
                <span className="ml-1.5 text-xs">{countByTrack[track.id] ?? 0}</span>
              </button>
            )
          })}
        </div>

        {/* View toggle */}
        <div role="group" aria-label="Project view" className="flex shrink-0 self-start rounded-lg border border-purple-900/40 bg-black/30 p-1">
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

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-gray-400">
          Showing {visible.length} of {sorted.length} projects{selectedTrack ? ` in ${selectedTrack.label}` : ''}.
        </p>
        {hasFilters && (
          <button type="button" onClick={clearFilters} className="rounded-md text-sm text-purple-300 hover:text-white">
            Clear all filters
          </button>
        )}
      </div>

      <div id="project-results">
        {visible.length === 0 ? (
          <div className="rounded-xl border border-purple-900/30 bg-black/20 px-6 py-12 text-center">
            <h2 className="mb-3 text-xl font-semibold text-white">No matching projects</h2>
            <p className="text-gray-400">Try a different search or select another branch.</p>
            <button type="button" onClick={clearFilters} className="mt-5 rounded-lg border border-purple-700/50 px-4 py-2 text-sm text-purple-300 hover:border-purple-400 hover:text-white">
              Show all projects
            </button>
          </div>
        ) : view === 'graph' ? (
          <motion.div
            key="graph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-purple-900/30 bg-black/20 p-3 sm:p-5"
          >
            <ProjectGitGraph projects={visible} activeTrack={activeTrack} />
            <p className="mt-4 px-3 text-center text-xs text-gray-400">
              {hasFilters ? 'Matching projects' : 'All projects'}, newest first and colour-coded by discipline. Select a node to open its details.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
          >
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}
      </div>
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
