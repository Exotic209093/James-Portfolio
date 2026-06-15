'use client'

import { ReactNode, useRef, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

export default function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(sy, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-10deg', '10deg'])
  const shineX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const shineY = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.25), transparent 50%)`

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className="relative will-change-transform"
    >
      <div style={{ transform: 'translateZ(40px)' }}>{children}</div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-soft-light"
        style={{ background: shine }}
      />
    </motion.div>
  )
}
