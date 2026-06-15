'use client'

import { RefObject, useEffect, useRef } from 'react'
import { MotionValue, useInView, useMotionValue, useReducedMotion } from 'framer-motion'

type Mode = 'exciting' | 'basic' | null

/**
 * Drives a "play once, then settle" intro for a section's background video.
 *
 * The home page used to scrub these clips with scroll — each section was
 * 200–300vh tall with a pinned inner screen, so you had to scroll the whole
 * way through to play the transition. This hook flips that: the clip plays
 * itself when the section scrolls into view and publishes its progress
 * (0 → 1) as a MotionValue. Every existing useTransform phase reads this
 * exactly like it used to read scrollYProgress — only the driver changed.
 *
 * Progress advances on a wall clock rather than the video's currentTime, so
 * the reveal always lands on schedule even if autoplay is blocked or the clip
 * stalls. The video's playbackRate is matched to the same target length so
 * picture and text stay in lock-step regardless of the clip's real duration.
 */
export function useVideoReveal({
  mode,
  targetSeconds = 5,
}: {
  mode: Mode
  targetSeconds?: number
}): {
  sectionRef: RefObject<HTMLElement>
  videoRef: RefObject<HTMLVideoElement>
  progress: MotionValue<number>
} {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.4 })
  const prefersReduced = useReducedMotion()
  const progress = useMotionValue(0)

  useEffect(() => {
    const v = videoRef.current
    const cleanups: Array<() => void> = []
    let raf = 0

    // Run `fn` once the clip's metadata (duration) is available.
    const onMeta = (fn: () => void) => {
      if (!v) return
      if (v.readyState >= 1) {
        fn()
      } else {
        v.addEventListener('loadedmetadata', fn, { once: true })
        cleanups.push(() => v.removeEventListener('loadedmetadata', fn))
      }
    }

    // Reduced motion, or a chosen "Basic" experience: show the settled state
    // with no animation and rest the clip on its final frame.
    if (mode === 'basic' || (mode === 'exciting' && prefersReduced)) {
      progress.set(1)
      onMeta(() => {
        if (v && Number.isFinite(v.duration) && v.duration > 0) {
          try {
            v.currentTime = Math.max(0, v.duration - 0.05)
          } catch {}
        }
      })
      return () => cleanups.forEach((c) => c())
    }

    // Undecided (first paint / experience interstitial still open): stay hidden
    // so the intro plays fresh the moment "exciting" is chosen.
    if (mode !== 'exciting') {
      progress.set(0)
      return
    }

    if (!inView) return

    // Play once, advancing progress on a wall clock.
    let start = 0
    const targetMs = targetSeconds * 1000

    onMeta(() => {
      if (!v) return
      const d = v.duration
      if (Number.isFinite(d) && d > 0) {
        v.playbackRate = Math.min(2.2, Math.max(0.5, d / targetSeconds))
      }
      try {
        v.currentTime = 0
      } catch {}
      // Autoplay blocked is fine — the clock below still drives the reveal.
      v.play().catch(() => {})
    })

    const tick = (now: number) => {
      if (!start) start = now
      const p = Math.min(1, (now - start) / targetMs)
      progress.set(p)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      cleanups.forEach((c) => c())
    }
  }, [mode, prefersReduced, inView, progress, targetSeconds])

  return { sectionRef, videoRef, progress }
}
