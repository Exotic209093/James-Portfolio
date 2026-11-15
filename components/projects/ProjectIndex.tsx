'use client'

import {
  ViewTransition,
  addTransitionType,
  startTransition,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, GitBranch, List, Search } from 'lucide-react'
import BranchGraph, { laneColor, type HistoryRow, type HistoryTrack } from '@/components/home/BranchGraph'
import { TECH_FILTERS } from '@/components/home/tech-filters'
import { NAV_FORWARD } from '@/components/PageTransition'
import s from './ProjectIndex.module.css'

export interface IndexProject extends HistoryRow {
  accent: string
  year: string
  description: string
  /** Lower-case text the search runs against. */
  searchText: string
}

type View = 'index' | 'branches'

const FILTER = 'work-filter'
const pad = (value: number) => String(value).padStart(2, '0')

// Rows move to their new places when a chip or view changes; nothing animates on navigation.
const rowMotion = {
  enter: { [FILTER]: 'work-enter', default: 'none' },
  exit: { [FILTER]: 'work-exit', default: 'none' },
  update: { [FILTER]: 'work-move', default: 'none' },
}

/**
 * The full project index. Large rows in display type; a preview of the
 * artwork follows a mouse pointer; filters animate rows into place with
 * view transitions. "Branches" shows the same selection as the branch graph.
 */
export default function ProjectIndex({ projects, tracks }: { projects: IndexProject[]; tracks: HistoryTrack[] }) {
  const [view, setView] = useState<View>('index')
  const [track, setTrack] = useState<string | null>(null)
  const [tech, setTech] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const searchInput = useRef<HTMLInputElement>(null)

  // Chip and view changes run as typed transitions so the rows animate.
  const animate = (update: () => void) =>
    startTransition(() => {
      addTransitionType(FILTER)
      update()
    })

  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  const searched = projects.filter((project) => terms.every((term) => project.searchText.includes(term)))
  const visible = searched.filter(
    (project) => (!track || project.track === track) && (tech === null || TECH_FILTERS[tech].test(project.tech))
  )
  const techOptions = useMemo(
    () =>
      TECH_FILTERS.map((filter, index) => ({ ...filter, index, count: projects.filter((p) => filter.test(p.tech)).length }))
        .filter((filter) => filter.count > 1)
        .sort((a, b) => b.count - a.count),
    [projects]
  )
  const hasFilters = Boolean(terms.length || track || tech !== null)
  const activeNames = [
    terms.length ? `“${query.trim()}”` : null,
    track ? tracks.find((item) => item.id === track)?.label : null,
    tech !== null ? TECH_FILTERS[tech].name : null,
  ].filter(Boolean)

  // Floating preview: follows a fine pointer, mounted on first hover.
  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [previewReady, setPreviewReady] = useState(false)
  const placePreview = (clientX: number, clientY: number) => {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview) return
    const box = list.getBoundingClientRect()
    const x = clientX - box.left
    const left = x + 32 + preview.offsetWidth > box.width ? x - 32 - preview.offsetWidth : x + 32
    preview.style.transform = `translate3d(${left}px, ${clientY - box.top}px, 0) translateY(-50%)`
  }
  const showPreview = (event: PointerEvent<HTMLAnchorElement>, id: string) => {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) return
    setPreviewReady(true)
    setPreviewId(id)
    placePreview(event.clientX, event.clientY)
  }

  const clearFilters = () => {
    setQuery('')
    animate(() => {
      setTrack(null)
      setTech(null)
    })
    searchInput.current?.focus()
  }

  return (
    <div>
      <div className={s.controls}>
        <div className={s.searchRow}>
          <label className={s.search}>
            <Search aria-hidden="true" className={s.searchIcon} />
            <span className="sr-only">Search projects</span>
            <input
              ref={searchInput}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-controls="project-results"
              placeholder="Search by name, description or technology"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <div className={s.views} role="group" aria-label="Project view">
            {(
              [
                ['index', 'Index', List],
                ['branches', 'Branches', GitBranch],
              ] as const
            ).map(([id, label, Icon]) => (
              <button key={id} type="button" aria-pressed={view === id} onClick={() => animate(() => setView(id))}>
                <Icon size={15} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={s.chips} role="group" aria-label="Filter by branch">
          <button type="button" aria-pressed={track === null} onClick={() => animate(() => setTrack(null))}>
            All branches
          </button>
          {tracks.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={track === item.id}
              onClick={() => animate(() => setTrack(track === item.id ? null : item.id))}
              style={{ '--lane': laneColor(item.id) } as CSSProperties}
            >
              <span className={s.swatch} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
        <div className={s.chips} role="group" aria-label="Filter by technology">
          {techOptions.map((option) => (
            <button
              key={option.name}
              type="button"
              aria-pressed={tech === option.index}
              onClick={() => animate(() => setTech(tech === option.index ? null : option.index))}
            >
              {option.name}
            </button>
          ))}
        </div>

        <div className={s.statusRow}>
          <p role="status" aria-live="polite" aria-atomic="true">
            {hasFilters
              ? `${visible.length} of ${projects.length} projects match ${activeNames.join(' and ')}`
              : `All ${projects.length} projects, newest first`}
          </p>
          {hasFilters && (
            <button type="button" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div id="project-results">
        {visible.length === 0 ? (
          <div className={s.empty}>
            <p>No projects match {activeNames.join(' and ')}.</p>
            <button type="button" onClick={clearFilters}>
              Show every project
            </button>
          </div>
        ) : view === 'branches' ? (
          <ViewTransition key="branches" enter={{ [FILTER]: 'work-enter', default: 'none' }} default="none">
            <div>
              <BranchGraph rows={visible} tracks={tracks} />
            </div>
          </ViewTransition>
        ) : (
          <div
            ref={listRef}
            className={s.listWrap}
            onPointerMove={(event) => previewId && placePreview(event.clientX, event.clientY)}
            onPointerLeave={() => setPreviewId(null)}
          >
            {previewReady && (
              <div ref={previewRef} className={s.preview} data-shown={previewId !== null} aria-hidden="true">
                {visible.map((project) => (
                  <Image
                    key={project.id}
                    src={project.image}
                    alt=""
                    fill
                    sizes="380px"
                    className={s.previewImage}
                    data-active={project.id === previewId}
                  />
                ))}
              </div>
            )}
          <ol className={s.list}>
            {visible.map((project, index) => (
              <ViewTransition key={project.id} name={`work-${project.id}`} {...rowMotion} default="none">
                <li className={s.item} style={{ '--i': Math.min(index, 10) } as CSSProperties}>
                  <Link
                    href={`/projects/${project.id}`}
                    transitionTypes={NAV_FORWARD}
                    className={s.row}
                    style={{ '--a': project.accent, '--lane': laneColor(project.track) } as CSSProperties}
                    onPointerEnter={(event) => showPreview(event, project.id)}
                    onFocus={() => setPreviewId(null)}
                  >
                    <span className={s.number}>{pad(index + 1)}</span>
                    <span className={s.thumb} aria-hidden="true">
                      <Image src={project.image} alt="" fill sizes="96px" />
                    </span>
                    <span className={s.main}>
                      <span className={s.title}>{project.title}</span>
                      <span className={s.description}>{project.description}</span>
                    </span>
                    <span className={s.meta}>
                      <span className={s.branch}>
                        <span className={s.swatch} aria-hidden="true" />
                        {project.trackLabel}
                      </span>
                      <span>{project.label}</span>
                    </span>
                    <span className={s.year}>{project.year}</span>
                    <ArrowUpRight className={s.arrow} aria-hidden="true" />
                  </Link>
                </li>
              </ViewTransition>
            ))}
          </ol>
          </div>
        )}
      </div>
    </div>
  )
}
