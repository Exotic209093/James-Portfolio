'use client'

import { MouseEvent, useRef, useState } from 'react'

const ROWS = 8
const COLS = 14

export default function SpotlightGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos(null)}
      className="relative w-full aspect-[14/8] rounded-2xl border border-purple-900/40 bg-black overflow-hidden"
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: ROWS * COLS }).map((_, i) => (
          <div key={i} className="border border-purple-900/20" />
        ))}
      </div>
      {pos && (
        <div
          className="pointer-events-none absolute h-64 w-64 rounded-full"
          style={{
            left: pos.x - 128,
            top: pos.y - 128,
            background:
              'radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      )}
    </div>
  )
}
