'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export default function Marquee({
  children,
  speed = 40,
  reverse = false,
}: {
  children: ReactNode
  speed?: number
  reverse?: boolean
}) {
  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  )
}
