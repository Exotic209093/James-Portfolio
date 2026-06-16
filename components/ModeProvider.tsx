'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

type Mode = 'exciting' | 'basic'

const STORAGE_KEY = 'site-mode'

type ModeContext = {
  mode: Mode | null
  setMode: (mode: Mode) => void
}

const Ctx = createContext<ModeContext>({
  mode: null,
  setMode: () => {},
})

export function useMode() {
  return useContext(Ctx)
}

/**
 * Two experiences, switchable from the footer:
 *  - `exciting` (default): the clean, professional site with tasteful motion.
 *  - `basic`: a stripped, static, zero-animation version.
 *
 * New visitors land on `exciting`; anyone with OS "reduce motion" set is sent
 * to `basic` automatically. The choice is remembered in localStorage.
 */
export default function ModeProvider({ children }: { children: ReactNode }) {
  // `null` only during SSR + first paint, before the stored choice is read.
  const [mode, setModeState] = useState<Mode | null>(null)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Mode | null
      if (stored === 'exciting' || stored === 'basic') {
        setModeState(stored)
        return
      }
      const prefersReducedMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setModeState(prefersReducedMotion ? 'basic' : 'exciting')
    } catch {
      setModeState('exciting')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('basic-mode', mode === 'basic')
  }, [mode])

  const setMode = (next: Mode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    setModeState(next)
  }

  const reducedMotion = mode === 'basic' ? 'always' : 'user'

  return (
    <Ctx.Provider value={{ mode, setMode }}>
      <MotionConfig reducedMotion={reducedMotion}>{children}</MotionConfig>
    </Ctx.Provider>
  )
}
