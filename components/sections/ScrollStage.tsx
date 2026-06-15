'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMode } from '@/components/ModeProvider'

/**
 * Wraps a home-page section in scroll-linked motion so the page reads as one
 * continuous animated journey (cryptowl.io feel) rather than a stack of static
 * blocks. As the section travels through the viewport it drifts vertically
 * (parallax) and eases its opacity at the very edges, so each part dissolves
 * into the next instead of hard-cutting.
 *
 * The scroll wiring is isolated in StagedMotion, which only renders once the
 * component has mounted on the client. That keeps framer-motion's scroll hooks
 * out of SSR and the first client paint of this statically-prerendered page —
 * SSR and first render emit the section untouched, so there's no hydration
 * mismatch and no scroll work before the DOM exists. In basic mode (and for
 * reduced-motion users) it stays untouched permanently.
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted || mode === 'basic') {
    return <>{children}</>
  }

  return (
    <StagedMotion parallax={parallax} fade={fade}>
      {children}
    </StagedMotion>
  )
}

function StagedMotion({
  children,
  parallax,
  fade,
}: {
  children: ReactNode
  parallax: number
  fade: boolean
}) {
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

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="will-change-transform">
      {children}
    </motion.div>
  )
}
