'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMode } from '@/components/ModeProvider'

/**
 * Wraps a home-page section in scroll-linked motion so the page reads as one
 * continuous animated journey (cryptowl.io feel) rather than a stack of static
 * blocks. As the section travels through the viewport it drifts vertically
 * (parallax) and eases its opacity at the very edges, so each part dissolves
 * into the next instead of hard-cutting.
 *
 * In basic mode (and therefore for reduced-motion users) it renders the section
 * untouched — no transforms, no parallax.
 */
export default function ScrollStage({
  children,
  parallax = 60,
  fade = true,
}: {
  children: ReactNode
  /** Vertical drift in px across the full pass through the viewport. */
  parallax?: number
  /** Ease opacity in/out at the entry and exit edges. */
  fade?: boolean
}) {
  const { mode } = useMode()
  const ref = useRef<HTMLDivElement>(null)

  // 0 when the section top reaches the viewport bottom; 1 when its bottom
  // leaves the viewport top — i.e. the section's full travel across the screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    fade ? [0.25, 1, 1, 0.25] : [1, 1, 1, 1]
  )

  // basic mode: opt out of all scroll motion.
  if (mode === 'basic') {
    return <div ref={ref}>{children}</div>
  }

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="will-change-transform">
      {children}
    </motion.div>
  )
}
