'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useMode } from '@/components/ModeProvider'

// Tags scatter in from these px offsets (relative to centre) and
// converge to (0, 0) as the ink gathers in the reversed video.
const TECH_TAGS = [
  { label: 'Salesforce', startX: -320, startY: -80 },
  { label: 'TypeScript', startX: 300, startY: -130 },
  { label: 'Python', startX: -240, startY: 90 },
  { label: 'AI agents', startX: 300, startY: 100 },
  { label: 'Apex', startX: 0, startY: -180 },
  { label: 'Node.js', startX: -140, startY: 170 },
  { label: 'Systems programming', startX: 180, startY: 200 },
]

export default function WhatIDoVideo() {
  const { mode } = useMode()
  const showVideo = mode !== 'basic'
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const ready = () => {
      v.play().then(() => v.pause()).catch(() => {})
    }
    if (v.readyState >= 1) ready()
    else v.addEventListener('loadedmetadata', ready, { once: true })

    let raf = 0
    const tick = () => {
      const duration = v.duration
      if (Number.isFinite(duration) && duration > 0) {
        const target = Math.max(0, Math.min(duration - 0.05, smooth.get() * duration))
        if (Math.abs(v.currentTime - target) > 0.03) {
          v.currentTime = target
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      v.removeEventListener('loadedmetadata', ready)
    }
  }, [smooth])

  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0.4])
  const statementOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
  const statementY = useTransform(scrollYProgress, [0.5, 0.7], ['20px', '0px'])

  return (
    <section ref={sectionRef} className="relative h-[200vh] md:h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Reversed ink clip — tendrils gather, sphere forms, droplet pulls up */}
        {showVideo && (
          <video
            ref={videoRef}
            src="/lab/ink-coalesce-v2.mp4"
            muted
            playsInline
            preload="auto"
            style={{ filter: 'brightness(1.22) contrast(1.12) saturate(1.35)' }}
            className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
            data-basic-hide
          />
        )}
        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 220px 40px rgba(0,0,0,0.55)' }}
          data-basic-hide
        />
        {/* Dark on both ends so the video reveals in the middle — handoff
            from the Hero's dark bottom (top) and to the dark content
            sections below (bottom) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black/90"
          data-basic-hide
        />

        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
          <div className="relative w-full max-w-5xl text-center">
            <motion.p
              style={{ opacity: eyebrowOpacity }}
              className="text-xs tracking-[0.3em] text-purple-300 uppercase mb-12"
            >
              What I bring together
            </motion.p>

            {/* Convergence stage — tags scatter, then converge, then the
                statement materialises in the same space */}
            <div className="relative h-80 sm:h-96 mb-8">
              {TECH_TAGS.map((tag) => (
                <TechTag key={tag.label} progress={scrollYProgress} {...tag} />
              ))}

              <motion.div
                style={{ opacity: statementOpacity, y: statementY }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
                    <span className="text-white">I build </span>
                    <span className="gradient-text">production-grade tools.</span>
                  </h2>
                  <p className="mt-4 text-gray-300 text-base sm:text-lg">
                    Disparate platforms. One coherent build.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TechTag({
  label,
  startX,
  startY,
  progress,
}: {
  label: string
  startX: number
  startY: number
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, [0.05, 0.22, 0.48, 0.6], [0, 1, 1, 0])
  const x = useTransform(progress, [0.22, 0.55], [startX, 0])
  const y = useTransform(progress, [0.22, 0.55], [startY, 0])
  const scale = useTransform(progress, [0.5, 0.6], [1, 0.6])

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.span
        style={{ x, y, opacity, scale }}
        className="inline-block px-4 py-2 rounded-full border border-purple-400/40 bg-black/30 backdrop-blur-sm text-purple-100 text-sm sm:text-base font-medium tracking-wide whitespace-nowrap"
      >
        {label}
      </motion.span>
    </div>
  )
}
