'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StickyScrollText({
  lines,
  eyebrow,
}: {
  lines: string[]
  eyebrow?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    // Progress runs only while the sticky element is locked in the viewport:
    // 0 when section top hits viewport top, 1 when section bottom hits viewport bottom.
    offset: ['start start', 'end end'],
  })

  // Tall enough that every word gets ~20vh of scroll to reveal.
  return (
    <section ref={ref} className="relative" style={{ height: `${lines.length * 120 + 50}vh` }}>
      {eyebrow && (
        <p className="absolute top-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-purple-400/70 uppercase z-10">
          {eyebrow}
        </p>
      )}
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
          {lines.map((line, i) => {
            const start = i / lines.length
            const end = (i + 1) / lines.length
            return (
              <Line key={i} text={line} start={start} end={end} scrollYProgress={scrollYProgress} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Line({
  text,
  start,
  end,
  scrollYProgress,
}: {
  text: string
  start: number
  end: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const words = text.split(' ')
  return (
    <p className="mb-2">
      {words.map((w, i) => {
        const wStart = start + (end - start) * (i / words.length)
        const wEnd = start + (end - start) * ((i + 1) / words.length)
        return <Word key={i} word={w} start={wStart} end={wEnd} scrollYProgress={scrollYProgress} />
      })}
    </p>
  )
}

function Word({
  word,
  start,
  end,
  scrollYProgress,
}: {
  word: string
  start: number
  end: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ['rgb(80,80,90)', 'rgb(245,235,255)']
  )
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-3">
      {word}
    </motion.span>
  )
}
