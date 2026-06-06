'use client'

import { ReactNode, useRef, useState, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Variant = 'primary' | 'outline' | 'ghost'

export default function MagneticButton({
  children,
  variant = 'primary',
  strength = 0.4,
  fieldPadding = 40,
  onClick,
}: {
  children: ReactNode
  variant?: Variant
  strength?: number
  fieldPadding?: number
  onClick?: () => void
}) {
  const fieldRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 })

  // Inner content moves at 50% of the shell — parallax depth
  const innerX = useTransform(springX, (v) => v * 0.5)
  const innerY = useTransform(springY, (v) => v * 0.5)

  const [hovered, setHovered] = useState(false)
  const [fill, setFill] = useState({ x: 50, y: 50 })

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    x.set(dx)
    y.set(dy)
  }

  const handleEnter = (e: MouseEvent<HTMLDivElement>) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    setFill({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
    setHovered(true)
  }

  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
    const btn = btnRef.current
    if (btn) {
      const rect = btn.getBoundingClientRect()
      setFill({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  const variants: Record<Variant, { base: string; text: string; fill: string; ring: string }> = {
    primary: {
      base: 'bg-purple-600 text-white',
      text: 'text-white',
      fill: 'bg-purple-400',
      ring: 'shadow-[0_0_40px_-8px_rgba(168,85,247,0.6)]',
    },
    outline: {
      base: 'bg-transparent border border-purple-500/60 text-purple-200',
      text: 'text-purple-100',
      fill: 'bg-purple-500/40',
      ring: 'shadow-[0_0_30px_-10px_rgba(168,85,247,0.5)]',
    },
    ghost: {
      base: 'bg-transparent text-gray-200',
      text: 'text-purple-200',
      fill: 'bg-purple-500/20',
      ring: '',
    },
  }
  const v = variants[variant]

  return (
    <div
      ref={fieldRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ padding: fieldPadding }}
      className="relative inline-block"
    >
      <motion.button
        ref={btnRef}
        onClick={onClick}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.95 }}
        className={`relative overflow-hidden rounded-full px-8 py-3 text-base font-medium tracking-wide transition-shadow duration-300 will-change-transform ${v.base} ${
          hovered ? v.ring : ''
        }`}
      >
        {/* Circular wipe-in fill from cursor entry point */}
        <motion.span
          aria-hidden
          className={`absolute rounded-full pointer-events-none ${v.fill}`}
          style={{
            left: `${fill.x}%`,
            top: `${fill.y}%`,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            width: hovered ? 360 : 0,
            height: hovered ? 360 : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Inner content moves at half the shell speed */}
        <motion.span
          style={{ x: innerX, y: innerY }}
          className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-300 ${
            hovered ? v.text : ''
          }`}
        >
          {children}
        </motion.span>
      </motion.button>
    </div>
  )
}
