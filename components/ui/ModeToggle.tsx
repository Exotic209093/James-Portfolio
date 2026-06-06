'use client'

import { useMode } from '@/components/ModeProvider'

export default function ModeToggle() {
  const { mode, setMode } = useMode()
  if (!mode) return null
  const next = mode === 'exciting' ? 'basic' : 'exciting'
  return (
    <button
      onClick={() => setMode(next)}
      className="text-xs tracking-widest uppercase text-gray-500 hover:text-purple-400 transition-colors"
    >
      Switch to {next} mode
    </button>
  )
}
