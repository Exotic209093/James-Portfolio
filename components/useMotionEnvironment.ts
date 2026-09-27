'use client'

import { useSyncExternalStore } from 'react'
import { useMode } from '@/components/ModeProvider'

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string }

const REDUCED_MOTION = 1
const SAVE_DATA = 2
const VISIBLE = 4

function connection() {
  return (navigator as Navigator & { connection?: Connection }).connection
}

function snapshot() {
  const network = connection()
  return (
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? REDUCED_MOTION : 0) |
    (network?.saveData || /^(slow-)?2g$/.test(network?.effectiveType ?? '') ? SAVE_DATA : 0) |
    (document.visibilityState === 'visible' ? VISIBLE : 0)
  )
}

function subscribe(notify: () => void) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const network = connection()
  motion.addEventListener('change', notify)
  network?.addEventListener('change', notify)
  document.addEventListener('visibilitychange', notify)
  return () => {
    motion.removeEventListener('change', notify)
    network?.removeEventListener('change', notify)
    document.removeEventListener('visibilitychange', notify)
  }
}

// Avoid starting decorative work before browser preferences are known. The
// primitive snapshot also keeps preference/visibility updates free of polling.
const serverSnapshot = () => 0

export function useMotionEnvironment() {
  const { mode } = useMode()
  const environment = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  return {
    mode,
    canAnimate: mode === 'exciting' && !(environment & (REDUCED_MOTION | SAVE_DATA)),
    isPageVisible: Boolean(environment & VISIBLE),
  }
}
