'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BranchGraph, { laneColor, type HistoryRow, type HistoryTrack } from './BranchGraph'
import { TECH_FILTERS } from './tech-filters'
import { WRAP } from './layout'
import s from './Home.module.css'

export type { HistoryRow, HistoryTrack }

/**
 * Every project on its branch, newest first, with branch and technology
 * filters that dim rather than remove so the graph keeps its shape.
 */
export default function HistoryGraph({ rows, tracks }: { rows: HistoryRow[]; tracks: HistoryTrack[] }) {
  const [trackFilter, setTrackFilter] = useState<string | null>(null)
  const [techFilter, setTechFilter] = useState<number | null>(null)

  const techOptions = useMemo(
    () =>
      TECH_FILTERS.map((filter, index) => ({ ...filter, index, count: rows.filter((row) => filter.test(row.tech)).length }))
        .filter((filter) => filter.count > 1)
        .sort((a, b) => b.count - a.count),
    [rows]
  )

  const isMatch = (row: HistoryRow) =>
    (!trackFilter || row.track === trackFilter) && (techFilter === null || TECH_FILTERS[techFilter].test(row.tech))
  const filtering = trackFilter !== null || techFilter !== null
  const shown = rows.filter(isMatch).length
  const activeNames = [
    trackFilter ? tracks.find((track) => track.id === trackFilter)?.label : null,
    techFilter !== null ? TECH_FILTERS[techFilter].name : null,
  ].filter(Boolean)

  return (
    <section id="history" className={s.history} aria-labelledby="history-title">
      <div className={WRAP}>
        <div className={s.secHead}>
          <p className="label">History</p>
          <h2 id="history-title">Every project, on its branch.</h2>
          <p>
            Salesforce, developer tooling, AI and automation, and systems work, newest first. Filter by branch or by
            technology.
          </p>
        </div>

        <div className={s.graphTools}>
          <div className={s.filters} role="group" aria-label="Filter by branch">
            <span className="label" aria-hidden="true">Branch</span>
            <div className={s.chipRow}>
              <button type="button" className={s.chip} aria-pressed={trackFilter === null} onClick={() => setTrackFilter(null)}>
                All <span className={s.count}>{rows.length}</span>
              </button>
              {tracks.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  className={s.chip}
                  aria-pressed={trackFilter === track.id}
                  onClick={() => setTrackFilter(trackFilter === track.id ? null : track.id)}
                  style={{ '--lane': laneColor(track.id) } as CSSProperties}
                >
                  <span className={s.swatch} aria-hidden="true" />
                  {track.label}
                  <span className={s.count}>{rows.filter((row) => row.track === track.id).length}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={s.filters} role="group" aria-label="Filter by technology">
            <span className="label" aria-hidden="true">Technology</span>
            <div className={s.chipRow}>
              {techOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className={s.chip}
                  aria-pressed={techFilter === option.index}
                  onClick={() => setTechFilter(techFilter === option.index ? null : option.index)}
                >
                  {option.name} <span className={s.count}>{option.count}</span>
                </button>
              ))}
            </div>
          </div>
          <p className={s.status} role="status" aria-live="polite">
            {activeNames.length
              ? `${shown} of ${rows.length} projects match ${activeNames.join(' and ')}`
              : `All ${rows.length} projects`}
          </p>
        </div>

        <BranchGraph rows={rows} tracks={tracks} isMatch={isMatch} filtering={filtering} />

        <div className={s.graphFoot}>
          <Link href="/projects" className={s.pill}>
            Open the full project index
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <p>Dates show the latest reviewed activity on each project.</p>
        </div>
      </div>
    </section>
  )
}
