'use client'

import { useMode } from '@/components/ModeProvider'
import { cn } from '@/lib/utils'

export default function ModeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useMode()
  const next = mode === 'basic' ? 'exciting' : 'basic'
  const label = `Switch to ${next} mode`

  return (
    <button
      type="button"
      disabled={!mode}
      onClick={() => setMode(next)}
      aria-label={compact ? 'Basic mode' : label}
      aria-pressed={compact ? mode === 'basic' : undefined}
      title={label}
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-md text-gray-300 hover:text-purple-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400',
        compact
          ? 'shrink-0 border border-gray-600 px-2 text-xs font-medium'
          : 'px-2 text-xs tracking-widest uppercase'
      )}
    >
      {compact ? 'Basic mode' : label}
    </button>
  )
}
