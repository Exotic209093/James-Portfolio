'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Shared scroll-reveal wrapper. One easing curve + trigger behaviour across
 * the whole site so every section animates in consistently as it enters the
 * viewport (instead of some pages firing everything on mount).
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode
  delay?: number
  direction?: Direction
  className?: string
  amount?: number
  once?: boolean
}) {
  const offset = OFFSETS[direction]
  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
