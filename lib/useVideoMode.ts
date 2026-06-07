'use client'

import { useEffect, useState } from 'react'

export type VideoMode = 'scrub' | 'loop' | 'static'

/**
 * Decides how a hero video should behave based on the device:
 *  - 'static' — prefers-reduced-motion: just the poster frame, no playback
 *  - 'loop'   — touch / coarse pointer: cheap autoplay loop (per-frame
 *               currentTime seeking is janky and battery-hungry on mobile)
 *  - 'scrub'  — fine pointer + motion OK: full scroll-tied scrubbing
 *
 * Starts as 'static' on the server / first paint so nothing heavy runs
 * until we've checked the environment on the client.
 */
export function useVideoMode(): VideoMode {
  const [mode, setMode] = useState<VideoMode>('static')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setMode('static')
      return
    }
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setMode(coarse ? 'loop' : 'scrub')
  }, [])

  return mode
}
