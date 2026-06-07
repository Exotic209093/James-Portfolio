'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import LetterReveal from '@/components/ui/LetterReveal'
import { siteConfig } from '@/lib/constants'

// Animation phase markers, tied to the ink-droplet timeline:
//   0.00 → 0.22  droplet falling
//   0.22 → 0.32  IMPACT (droplet hits water)
//   0.32 → 0.70  tendrils disperse outward
//   0.70 → 1.00  tendrils settle, scene quiets
const PHASES = {
  approach: { in: 0.0, settled: 0.05 },
  impact: { in: 0.22, settled: 0.32 },
  dispersion: { in: 0.35, settled: 0.5 },
  detail: { in: 0.55, settled: 0.7 },
  ctas: { in: 0.72, settled: 0.85 },
}

export default function Hero() {
  const showPhoto = false

  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const ready = () => {
      setVideoReady(true)
      v.play().then(() => v.pause()).catch(() => {})
    }
    if (v.readyState >= 1) ready()
    else v.addEventListener('loadedmetadata', ready, { once: true })

    let raf = 0
    const tick = () => {
      const duration = v.duration
      if (Number.isFinite(duration) && duration > 0) {
        const progress = smoothProgress.get()
        const target = Math.max(0, Math.min(duration - 0.05, progress * duration))
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
  }, [smoothProgress])

  // Phase-by-phase content choreography
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.5])
  const headingY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px'])

  // The "James" name pulses at the impact moment to punctuate it
  const namePunchScale = useTransform(
    scrollYProgress,
    [PHASES.impact.in - 0.04, PHASES.impact.in, PHASES.impact.settled, PHASES.impact.settled + 0.05],
    [1, 1.08, 1.02, 1]
  )

  // Impact accent — a thin gradient line that flashes when the droplet lands
  const impactAccentOpacity = useTransform(
    scrollYProgress,
    [PHASES.impact.in - 0.04, PHASES.impact.in, PHASES.impact.settled, PHASES.impact.settled + 0.08],
    [0, 1, 1, 0]
  )
  const impactAccentScale = useTransform(
    scrollYProgress,
    [PHASES.impact.in - 0.04, PHASES.impact.settled + 0.08],
    [0.2, 1.4]
  )

  const subtitleOpacity = useReveal(scrollYProgress, PHASES.dispersion.in, PHASES.dispersion.settled)
  const subtitleY = useRevealY(scrollYProgress, PHASES.dispersion.in, PHASES.dispersion.settled)

  const taglineOpacity = useReveal(scrollYProgress, PHASES.detail.in, PHASES.detail.settled)
  const taglineY = useRevealY(scrollYProgress, PHASES.detail.in, PHASES.detail.settled)

  const ctasOpacity = useReveal(scrollYProgress, PHASES.ctas.in, PHASES.ctas.settled)
  const ctasY = useRevealY(scrollYProgress, PHASES.ctas.in, PHASES.ctas.settled)

  const arrowOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const scrollToExperience = () => {
    document.getElementById('experience-preview')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-20">
        {/* Scroll-scrubbed ink droplet */}
        <video
          ref={videoRef}
          src="/lab/ink-droplet-v2-scrub.mp4"
          muted
          playsInline
          preload="auto"
          style={{ filter: 'brightness(1.22) contrast(1.12) saturate(1.35)' }}
          className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
          data-basic-hide
        />
        {/* Cinematic vignette — gentle dark corners so the centre pops */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 220px 40px rgba(0,0,0,0.55)' }}
          data-basic-hide
        />
        {/* Overlay: light in middle, darker at top (handoff from page top)
            and bottom (smooth handoff to the next video section) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/70"
          data-basic-hide
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_60%)]"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.05) 0%, transparent 60%)',
              'radial-gradient(circle at 60% 40%, rgba(147,51,234,0.08) 0%, transparent 60%)',
              'radial-gradient(circle at 40% 60%, rgba(147,51,234,0.05) 0%, transparent 60%)',
              'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.05) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          data-basic-hide
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge — visible the whole way */}
              <motion.div
                style={{ opacity: headingOpacity }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 text-xs font-medium tracking-widest uppercase">
                  Open to Opportunities
                </span>
              </motion.div>

              {showPhoto && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/40 mx-auto mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/profile.jpg" alt="James Collard" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Heading — punches slightly at the impact moment */}
              <motion.h1
                style={{ opacity: headingOpacity, y: headingY }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 relative"
              >
                <span className="text-white">
                  <LetterReveal text="Hi, I'm " delay={0.1} />
                </span>
                <motion.span style={{ scale: namePunchScale, display: 'inline-block' }} className="gradient-text">
                  <LetterReveal text={siteConfig.name} delay={0.35} />
                </motion.span>

                {/* Impact accent line — flashes when droplet lands */}
                <motion.span
                  aria-hidden
                  style={{ opacity: impactAccentOpacity, scaleX: impactAccentScale }}
                  className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-px w-40 sm:w-72 bg-gradient-to-r from-transparent via-purple-300 to-transparent origin-center"
                  data-basic-hide
                />
              </motion.h1>

              {/* Subtitle — drops in as tendrils start dispersing */}
              <motion.div style={{ opacity: subtitleOpacity, y: subtitleY }}>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-light">
                  {siteConfig.title}
                </h2>
                <p className="text-lg sm:text-xl text-purple-300 mt-2">
                  Based in {siteConfig.location}
                </p>
              </motion.div>

              {/* Tagline — appears mid-dispersion */}
              <motion.p
                style={{ opacity: taglineOpacity, y: taglineY }}
                className="text-lg sm:text-xl text-gray-300 mt-8 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                AI agents · Salesforce engineering · TypeScript · Python · Systems programming
              </motion.p>

              {/* CTAs — settle in last as the scene quiets */}
              <motion.div
                style={{ opacity: ctasOpacity, y: ctasY }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <ButtonLink href="/projects" variant="primary" size="lg">
                    View My Work
                  </ButtonLink>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <ButtonLink href="/resume.pdf" variant="outline" size="lg" download>
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </ButtonLink>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ opacity: arrowOpacity }}
          onClick={scrollToExperience}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 hover:text-purple-300 transition-colors z-20"
          aria-label="Scroll down"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}

// Reveal element opacity from 0 → 1 across a scroll window, then hold.
function useReveal(progress: MotionValue<number>, start: number, end: number) {
  return useTransform(progress, [start, end], [0, 1])
}

// Slide element up by 16px while revealing.
function useRevealY(progress: MotionValue<number>, start: number, end: number) {
  return useTransform(progress, [start, end], ['16px', '0px'])
}
