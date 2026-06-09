'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { MotionConfig, AnimatePresence, motion } from 'framer-motion'

type Mode = 'exciting' | 'basic'

const STORAGE_KEY = 'site-mode'

type ModeContext = {
  mode: Mode | null
  setMode: (mode: Mode) => void
  clearMode: () => void
}

const Ctx = createContext<ModeContext>({
  mode: null,
  setMode: () => {},
  clearMode: () => {},
})

export function useMode() {
  return useContext(Ctx)
}

export default function ModeProvider({ children }: { children: ReactNode }) {
  // `null` = not yet read (SSR + first paint), 'unset' = no choice stored
  const [mode, setModeState] = useState<Mode | 'unset' | null>(null)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Mode | null
      if (stored === 'exciting' || stored === 'basic') {
        setModeState(stored)
        return
      }
      // No explicit choice yet — honor the OS "reduce motion" preference by
      // defaulting to basic (skips the scroll-scrubbed video heroes and the
      // interstitial). Not persisted, so the footer toggle still lets them opt in.
      const prefersReducedMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setModeState(prefersReducedMotion ? 'basic' : 'unset')
    } catch {
      setModeState('unset')
    }
  }, [])

  useEffect(() => {
    if (mode === 'basic') {
      document.documentElement.classList.add('basic-mode')
    } else {
      document.documentElement.classList.remove('basic-mode')
    }
  }, [mode])

  const setMode = (next: Mode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    setModeState(next)
  }

  const clearMode = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setModeState('unset')
  }

  const reducedMotion = mode === 'basic' ? 'always' : 'user'

  return (
    <Ctx.Provider
      value={{
        mode: mode === 'unset' || mode === null ? null : mode,
        setMode,
        clearMode,
      }}
    >
      <MotionConfig reducedMotion={reducedMotion}>
        {children}
        <AnimatePresence>{mode === 'unset' && <ModeInterstitial onPick={setMode} />}</AnimatePresence>
      </MotionConfig>
    </Ctx.Provider>
  )
}

function ModeInterstitial({ onPick }: { onPick: (mode: Mode) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md px-6"
    >
      <div className="max-w-4xl w-full">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-xs tracking-[0.3em] text-purple-400/80 uppercase mb-4"
        >
          Pick your experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-3xl sm:text-5xl font-bold mb-12"
        >
          How do you want to view this site?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Choice
            delay={0.3}
            onClick={() => onPick('exciting')}
            badge="Recommended"
            accent
            title="Exciting"
            subtitle="The full ride"
            description="Animated backgrounds, scroll effects, motion, the works. Best on desktop with a modern browser."
            cta="Take me in →"
          />
          <Choice
            delay={0.4}
            onClick={() => onPick('basic')}
            title="Basic HTML"
            subtitle="Just the content"
            description="Static, lightweight, zero animations. Same content, faster to load, easier on the eyes. You can switch back any time."
            cta="Keep it simple →"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-500 mt-8"
        >
          Your choice is remembered. Switch any time from the footer.
        </motion.p>
      </div>
    </motion.div>
  )
}

function Choice({
  title,
  subtitle,
  description,
  cta,
  badge,
  accent,
  delay,
  onClick,
}: {
  title: string
  subtitle: string
  description: string
  cta: string
  badge?: string
  accent?: boolean
  delay: number
  onClick: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative text-left rounded-2xl border p-8 transition-colors h-full ${
        accent
          ? 'border-purple-500/60 bg-gradient-to-br from-purple-900/40 to-black hover:border-purple-400'
          : 'border-white/15 bg-white/[0.03] hover:border-white/30'
      }`}
    >
      {badge && (
        <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase bg-purple-500 text-white px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <p className={`text-xs tracking-[0.3em] uppercase mb-2 ${accent ? 'text-purple-300' : 'text-gray-500'}`}>
        {subtitle}
      </p>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
      <p className={`text-sm font-medium ${accent ? 'text-purple-300' : 'text-gray-300'}`}>{cta}</p>
    </motion.button>
  )
}
