'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)

      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a, button, [data-cursor="hover"]')
      setHovering(!!interactive)
    }

    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [mouseX, mouseY, visible])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full border border-purple-400 bg-purple-400/10 backdrop-blur-sm"
        animate={{
          width: hovering ? 56 : 20,
          height: hovering ? 56 : 20,
          x: hovering ? -28 : -10,
          y: hovering ? -28 : -10,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </motion.div>
  )
}
