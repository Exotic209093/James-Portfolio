'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import LetterReveal from '@/components/ui/LetterReveal'
import { siteConfig } from '@/lib/constants'

export default function Hero() {
  const showPhoto = false

  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Drive video currentTime from scroll progress so the droplet
  // scrubs forward as the visitor scrolls through the section.
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const video = videoRef.current
    if (!video || !videoReady) return
    const duration = video.duration
    if (!Number.isFinite(duration) || duration <= 0) return
    const target = Math.max(0, Math.min(duration - 0.05, latest * duration))
    if (Math.abs(video.currentTime - target) > 0.02) {
      video.currentTime = target
    }
  })

  // Prime the video so currentTime is seekable on iOS/Safari.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const ready = () => {
      setVideoReady(true)
      // Touch play/pause once so mobile browsers allow seeking.
      v.play().then(() => v.pause()).catch(() => {})
    }
    if (v.readyState >= 1) ready()
    else v.addEventListener('loadedmetadata', ready, { once: true })
    return () => v.removeEventListener('loadedmetadata', ready)
  }, [])

  // Content stays fully visible through the first 60% of scroll, then
  // softens and drifts upward as the droplet finishes dispersing.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.4])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-60px'])
  // Hint to the visitor that there's more — arrow fades as they descend.
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const scrollToExperience = () => {
    document.getElementById('experience-preview')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-20">
        {/* Scroll-scrubbed ink droplet */}
        <video
          ref={videoRef}
          src="/lab/ink-droplet.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          data-basic-hide
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/90"
          data-basic-hide
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.08),transparent_60%)]"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.08) 0%, transparent 60%)',
              'radial-gradient(circle at 60% 40%, rgba(147,51,234,0.12) 0%, transparent 60%)',
              'radial-gradient(circle at 40% 60%, rgba(147,51,234,0.08) 0%, transparent 60%)',
              'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.08) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          data-basic-hide
        />

        {/* Content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6"
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

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                  <span className="text-white">
                    <LetterReveal text="Hi, I'm " delay={0.1} />
                  </span>
                  <span className="gradient-text">
                    <LetterReveal text={siteConfig.name} delay={0.35} />
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
                  {siteConfig.title}
                </h2>
                <p className="text-lg sm:text-xl text-purple-400 mt-2">
                  Based in {siteConfig.location}
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                AI agents · Salesforce engineering · TypeScript · Python · Systems programming
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
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
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ opacity: arrowOpacity }}
          onClick={scrollToExperience}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-purple-400 transition-colors z-20"
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
