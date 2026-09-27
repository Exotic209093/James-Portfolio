'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

type Mode = 'exciting' | 'basic'

const STORAGE_KEY = 'site-mode'

function validMode(value: string | null): Mode | null {
  return value === 'exciting' || value === 'basic' ? value : null
}

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
 * Follow the system's reduced-motion preference until a visitor chooses a mode.
 * An explicit choice lasts for this visit even if browser storage is unavailable.
 */
export default function ModeProvider({ children }: { children: ReactNode }) {
  // Keep the server and first client render identical. The head script applies
  // the initial theme before paint, and it stays in place until we know the mode.
  const [mode, setModeState] = useState<Mode | null>(null)
  const explicitMode = useRef<Mode | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let stored: Mode | null = null
    try {
      stored = validMode(window.localStorage.getItem(STORAGE_KEY))
    } catch {}
    explicitMode.current = stored
    setModeState(stored ?? (media.matches ? 'basic' : 'exciting'))

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (!explicitMode.current) {
        setModeState(event.matches ? 'basic' : 'exciting')
      }
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
      setModeState(choice ?? (media.matches ? 'basic' : 'exciting'))
    }

    media.addEventListener('change', handleMotionChange)
    window.addEventListener('storage', handleStorageChange)
    return () => {
      media.removeEventListener('change', handleMotionChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (mode !== null) {
      document.documentElement.classList.toggle('basic-mode', mode === 'basic')
    }
  }, [mode])

  const setMode = (next: Mode) => {
    explicitMode.current = next
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
