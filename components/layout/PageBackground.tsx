'use client'

import { motion } from 'framer-motion'

/**
 * One persistent ambient backdrop for the whole site. Sits fixed behind
 * every section (-z-10) so the purple "ink" energy from the hero videos
 * carries continuously down the page instead of each section painting its
 * own background band. Content sections are transparent so this shows
 * through; the opaque hero videos cover it during their pinned scroll.
 */
export default function PageBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      data-basic-hide
    >
      {/* Base wash — a touch of depth above pure black */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

      {/* Slowly drifting ink-purple blobs */}
      <motion.div
        className="absolute top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-purple-700/10 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[45%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-700/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[30%] w-[45vw] h-[45vw] rounded-full bg-indigo-700/10 blur-3xl"
        animate={{ x: [0, 70, 0], y: [0, -30, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Faint grain so the gradients don't band */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />
    </div>
  )
}
