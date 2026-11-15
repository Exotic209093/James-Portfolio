'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { WRAP } from './layout'
import s from './Home.module.css'

export interface HistoryRow {
  id: string
  title: string
  label: string
  track: string
  trackLabel: string
  date: string
  tech: string[]
}

export interface HistoryTrack {
  id: string
  label: string
}

const ROW = 60
const SPINE = 8
const LANE_X = [30, 48, 66, 84]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const TECH_FILTERS: { name: string; test: (tech: string[]) => boolean }[] = [
  { name: 'TypeScript', test: (tech) => tech.includes('TypeScript') },
  { name: 'Apex', test: (tech) => tech.some((item) => item.startsWith('Apex')) },
  { name: 'React', test: (tech) => tech.includes('React') },
  { name: 'Python', test: (tech) => tech.includes('Python') },
  { name: 'Node.js', test: (tech) => tech.includes('Node.js') },
  { name: 'Lightning Web Components', test: (tech) => tech.some((item) => item === 'LWC' || item.startsWith('Lightning Web Components')) },
  { name: 'Claude and LLMs', test: (tech) => tech.some((item) => /^(Anthropic|Claude|LLM)/.test(item)) },
  { name: 'Rust', test: (tech) => tech.includes('Rust') },
  { name: 'Electron', test: (tech) => tech.includes('Electron') },
  { name: 'Three.js', test: (tech) => tech.includes('Three.js') },
  { name: 'AWS', test: (tech) => tech.some((item) => item.startsWith('AWS')) },
  { name: 'C++', test: (tech) => tech.includes('C++') },
]

function formatMonth(date: string) {
  const [year, month] = date.split('-')
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year
}

const laneColor = (track: string) => `var(--lane-${track})`

/**
 * Every project on its branch, newest first. The spine draws itself as the
 * graph scrolls through the viewport and each commit fills as it passes the
 * middle. Filters dim rather than remove, so the graph keeps its shape.
 */
export default function HistoryGraph({ rows, tracks }: { rows: HistoryRow[]; tracks: HistoryTrack[] }) {
  const [trackFilter, setTrackFilter] = useState<string | null>(null)
  const [techFilter, setTechFilter] = useState<number | null>(null)

  const laneX = useMemo(() => Object.fromEntries(tracks.map((track, index) => [track.id, LANE_X[index] ?? 84])), [tracks])
  const techOptions = useMemo(
    () =>
      TECH_FILTERS.map((filter, index) => ({ ...filter, index, count: rows.filter((row) => filter.test(row.tech)).length }))
        .filter((filter) => filter.count > 1)
        .sort((a, b) => b.count - a.count),
    [rows]
  )

  const matches = (row: HistoryRow) =>
    (!trackFilter || row.track === trackFilter) && (techFilter === null || TECH_FILTERS[techFilter].test(row.tech))
  const shown = rows.filter(matches).length
  const activeNames = [
    trackFilter ? tracks.find((track) => track.id === trackFilter)?.label : null,
    techFilter !== null ? TECH_FILTERS[techFilter].name : null,
  ].filter(Boolean)
  const total = rows.length * ROW

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

        <div className={s.graph} style={{ height: total }}>
          <svg width="100" height={total} viewBox={`0 0 100 ${total}`} aria-hidden="true" focusable="false">
            {tracks.map((track) => (
              <line key={track.id} className={s.laneLine} x1={laneX[track.id]} y1="0" x2={laneX[track.id]} y2={total} />
            ))}
            <path className={s.spineBase} d={`M${SPINE} 0 V${total}`} />
            {rows.map((row, index) => {
              const y = index * ROW + ROW / 2
              const x = laneX[row.track]
              return (
                <path
                  key={row.id}
                  className={`${s.conn}${matches(row) ? '' : ` ${s.dim}`}`}
                  style={{ stroke: laneColor(row.track) }}
                  d={`M${SPINE} ${y - 26} C ${SPINE} ${y - 8}, ${x} ${y - 16}, ${x} ${y}`}
                />
              )
            })}
            <path className={s.spineDraw} d={`M${SPINE} 0 V${total}`} pathLength={1} />
          </svg>
          <ul className="m-0 list-none p-0">
            {rows.map((row) => (
              <li key={row.id}>
                <Link
                  href={`/projects/${row.id}`}
                  className={`${s.row}${matches(row) ? '' : ` ${s.rowDim}`}`}
                  style={{ '--lane': laneColor(row.track) } as CSSProperties}
                >
                  <span className={s.node} style={{ left: laneX[row.track] }} aria-hidden="true" />
                  <span className={s.rowMain}>
                    <span className={s.rowTitle}>{row.title}</span>
                    <span className={s.rowMeta}>
                      {row.label} · {row.trackLabel}
                    </span>
                  </span>
                  <span className={s.rowDate}>{formatMonth(row.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.graphFoot}>
          <Link href="/projects" className={s.pill}>
            Open the full project explorer
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <p>Dates show the latest reviewed activity on each project.</p>
        </div>
      </div>
    </section>
  )
}
