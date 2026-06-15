'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useMode } from '@/components/ModeProvider'

/**
 * Thin gradient bar pinned to the top of the viewport that fills as you scroll
 * the page — the small continuous signal that ties the whole journey together.
 * Hidden in basic mode (and for reduced-motion users, who resolve to basic).
 */
export default function ScrollProgressBar() {
  const { mode } = useMode()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  if (mode === 'basic') return null

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500"
    />
  )
}
