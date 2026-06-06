'use client'

import { motion } from 'framer-motion'
import LetterReveal from '@/components/ui/LetterReveal'

export default function VideoHero({
  src,
  poster,
  eyebrow,
  headline,
  sub,
  ctaText,
  ctaHref,
  overlay = 'dark',
}: {
  src?: string
  poster?: string
  eyebrow?: string
  headline: string
  sub?: string
  ctaText?: string
  ctaHref?: string
  overlay?: 'dark' | 'gradient' | 'none'
}) {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden rounded-2xl border border-purple-900/40">
      {/* Video layer */}
      {src ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <PlaceholderBackground poster={poster} />
      )}

      {/* Overlay */}
      {overlay !== 'none' && (
        <div
          className={`absolute inset-0 ${
            overlay === 'dark'
              ? 'bg-black/55'
              : 'bg-gradient-to-b from-black/30 via-black/55 to-black/85'
          }`}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-8 text-center">
        <div className="max-w-3xl">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.3em] text-purple-300 uppercase mb-6"
            >
              {eyebrow}
            </motion.p>
          )}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <LetterReveal text={headline} trigger="inView" />
          </h2>
          {sub && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto"
            >
              {sub}
            </motion.p>
          )}
          {ctaText && ctaHref && (
            <motion.a
              href={ctaHref}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex mt-8 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium px-8 py-3 transition-colors"
            >
              {ctaText}
            </motion.a>
          )}
        </div>
      </div>

      {/* Source label so you can spot which clip is playing */}
      {src && (
        <p className="absolute bottom-4 right-4 z-10 text-[10px] tracking-widest uppercase text-white/40 font-mono">
          {src.split('/').pop()}
        </p>
      )}
    </div>
  )
}

function PlaceholderBackground({ poster }: { poster?: string }) {
  if (poster) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
    )
  }
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-fuchsia-900 to-indigo-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white/40 text-sm tracking-widest uppercase">
          Drop an AI-generated video URL into the <code>src</code> prop
        </p>
      </div>
    </div>
  )
}
