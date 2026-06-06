'use client'

import { motion } from 'framer-motion'

export default function LetterReveal({
  text,
  delay = 0,
  stagger = 0.03,
  trigger = 'mount',
}: {
  text: string
  delay?: number
  stagger?: number
  trigger?: 'mount' | 'inView'
}) {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const letter = {
    hidden: { y: '100%', opacity: 0 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 400, damping: 30 },
    },
  }

  const animateProps =
    trigger === 'inView'
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.4 } }
      : { initial: 'hidden', animate: 'show' }

  return (
    <motion.span variants={container} {...animateProps} className="inline-block">
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={letter} className="inline-block">
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
