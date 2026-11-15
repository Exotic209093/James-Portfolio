// Rendered only inside client components (HistoryGraph, ProjectIndex), so it
// needs no 'use client' entry of its own and can take function props.
import { useMemo, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NAV_FORWARD } from '@/components/PageTransition'
import s from './Home.module.css'

export interface HistoryRow {
  id: string
  title: string
  label: string
  track: string
  trackLabel: string
  date: string
  tech: string[]
  image: string
}

export interface HistoryTrack {
  id: string
  label: string
}

const ROW = 60
const SPINE = 8
const LANE_X = [30, 48, 66, 84]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatMonth(date: string) {
  const [year, month] = date.split('-')
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year
}

export const laneColor = (track: string) => `var(--lane-${track})`

/**
 * Projects as commits on four lanes. The spine draws itself as the graph
 * scrolls through the viewport and each commit fills as it passes the middle.
 * `isMatch` dims rows rather than removing them, so the graph keeps its shape;
 * with a filter on, matching branches draw brighter. A preview of each
 * project's artwork follows a mouse pointer.
 */
export default function BranchGraph({
  rows,
  tracks,
  isMatch = () => true,
  filtering = false,
}: {
  rows: HistoryRow[]
  tracks: HistoryTrack[]
  isMatch?: (row: HistoryRow) => boolean
  filtering?: boolean
}) {
  const laneX = useMemo(() => Object.fromEntries(tracks.map((track, index) => [track.id, LANE_X[index] ?? 84])), [tracks])
  const graphRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [previewReady, setPreviewReady] = useState(false)
  const total = rows.length * ROW

  const placePreview = (clientX: number, clientY: number) => {
    const graph = graphRef.current
    const preview = previewRef.current
    if (!graph || !preview) return
    const box = graph.getBoundingClientRect()
    const x = clientX - box.left
    // Flip to the pointer's left when the card would run past the graph's edge.
    const left = x + 28 + preview.offsetWidth > box.width ? x - 28 - preview.offsetWidth : x + 28
    preview.style.transform = `translate3d(${left}px, ${clientY - box.top}px, 0) translateY(-50%)`
  }

  const showPreview = (event: PointerEvent<HTMLAnchorElement>, id: string) => {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) return
    setPreviewReady(true)
    setPreviewId(id)
    placePreview(event.clientX, event.clientY)
  }

  return (
    <div
      ref={graphRef}
      className={s.graph}
      style={{ height: total }}
      onPointerMove={(event) => previewId && placePreview(event.clientX, event.clientY)}
      onPointerLeave={() => setPreviewId(null)}
    >
      {previewReady && (
        <div ref={previewRef} className={s.preview} data-shown={previewId !== null} aria-hidden="true">
          {rows.map((row) => (
            <Image
              key={row.id}
              src={row.image}
              alt=""
              fill
              sizes="300px"
              className={s.previewImage}
              data-active={row.id === previewId}
            />
          ))}
        </div>
      )}
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
              className={`${s.conn}${isMatch(row) ? (filtering ? ` ${s.bright}` : '') : ` ${s.dim}`}`}
              style={{ stroke: laneColor(row.track), color: laneColor(row.track) }}
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
              transitionTypes={NAV_FORWARD}
              className={`${s.row}${isMatch(row) ? '' : ` ${s.rowDim}`}`}
              style={{ '--lane': laneColor(row.track) } as CSSProperties}
              onPointerEnter={(event) => showPreview(event, row.id)}
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
  )
}
