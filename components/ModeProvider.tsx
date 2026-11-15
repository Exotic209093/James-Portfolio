'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

/**
 * - exciting: full motion
 * - calm: the full design with every motion moment at its finished frame
 * - basic: the opt-in text-only reading mode
 */
export type Mode = 'exciting' | 'calm' | 'basic'

const STORAGE_KEY = 'site-mode'

function validMode(value: string | null): Mode | null {
  return value === 'exciting' || value === 'calm' || value === 'basic' ? value : null
}

type ModeContext = {
  mode: Mode | null
  setMode: (mode: Mode) => void
  /** The mode used when no choice is saved: calm under reduced motion. */
  systemMode: Mode | null
}

const Ctx = createContext<ModeContext>({
  mode: null,
  setMode: () => {},
  systemMode: null,
})

export function useMode() {
  return useContext(Ctx)
}

export function applyModeClasses(mode: Mode) {
  const classes = document.documentElement.classList
  classes.toggle('basic-mode', mode === 'basic')
  classes.toggle('calm-motion', mode !== 'exciting')
}

/**
 * Follow the system's reduced-motion preference (as calm motion) until a
 * visitor chooses a mode. An explicit choice lasts for this visit even if
 * browser storage is unavailable.
 */
export default function ModeProvider({ children }: { children: ReactNode }) {
  // Keep the server and first client render identical. The head script applies
  // the initial classes before paint, and they stay in place until we know the mode.
  const [mode, setModeState] = useState<Mode | null>(null)
  const [systemMode, setSystemMode] = useState<Mode | null>(null)
  const explicitMode = useRef<Mode | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fromSystem = (reduced: boolean): Mode => (reduced ? 'calm' : 'exciting')
    let stored: Mode | null = null
    try {
      stored = validMode(window.localStorage.getItem(STORAGE_KEY))
    } catch {}
    explicitMode.current = stored
    setSystemMode(fromSystem(media.matches))
    setModeState(stored ?? fromSystem(media.matches))

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setSystemMode(fromSystem(event.matches))
      if (!explicitMode.current) setModeState(fromSystem(event.matches))
    }
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return
      try {
        if (event.storageArea !== window.localStorage) return
      } catch {
        return
      }
      const choice = validMode(event.newValue)
      explicitMode.current = choice
      setModeState(choice ?? fromSystem(media.matches))
    }

    media.addEventListener('change', handleMotionChange)
    window.addEventListener('storage', handleStorageChange)
    return () => {
      media.removeEventListener('change', handleMotionChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (mode !== null) applyModeClasses(mode)
  }, [mode])

  const setMode = (next: Mode) => {
    explicitMode.current = next
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    setModeState(next)
  }

  const reducedMotion = mode === 'calm' || mode === 'basic' ? 'always' : 'user'

  return (
    <Ctx.Provider value={{ mode, setMode, systemMode }}>
      <MotionConfig reducedMotion={reducedMotion}>{children}</MotionConfig>
    </Ctx.Provider>
  )
}
