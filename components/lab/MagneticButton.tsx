'use client'

import { ReactNode, useRef, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Variant = 'primary' | 'outline' | 'ghost'

export default function MagneticButton({
  children,
  variant = 'primary',
  onClick,
}: {
  children: ReactNode
  variant?: Variant
  onClick?: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.35
    const dy = (e.clientY - cy) * 0.35
    x.set(dx)
    y.set(dy)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'relative inline-flex items-center justify-center font-medium tracking-wide rounded-full px-8 py-3 text-base transition-colors will-change-transform'
  const styles: Record<Variant, string> = {
    primary:
      'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-900/40',
    outline:
      'border border-purple-500/60 text-purple-200 hover:bg-purple-500/10',
    ghost: 'text-gray-200 hover:text-purple-300',
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.94 }}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </motion.button>
  )
}
