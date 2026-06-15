'use client'

import { useEffect } from 'react'
import { useMode } from '@/components/ModeProvider'

/**
 * Turns the home page into a full-viewport scroll-snap journey: each scroll
 * gesture carries you one section at a time, and that section's animations play
 * as you land on it. Implemented purely with CSS scroll-snap (no scroll
 * hijacking), and only enabled in "exciting" mode — the CSS itself further
 * restricts it to desktop fine-pointer devices and bows out for reduced motion,
 * so mobile and accessibility-sensitive users keep normal scrolling.
 *
 * Renders nothing; just toggles the `snap-home` class on <html> while mounted.
 */
export default function HomeScrollSnap() {
  const { mode } = useMode()

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'exciting') {
      root.classList.add('snap-home')
    } else {
      root.classList.remove('snap-home')
    }
    return () => root.classList.remove('snap-home')
  }, [mode])

  return null
}
