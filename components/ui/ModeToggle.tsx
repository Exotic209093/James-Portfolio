'use client'

import { useMode, type Mode } from '@/components/ModeProvider'
import { cn } from '@/lib/utils'

const options: { mode: Mode; label: string; hint: string }[] = [
  { mode: 'exciting', label: 'Full', hint: 'Full motion' },
  { mode: 'calm', label: 'Calm', hint: 'The full design without animation' },
  { mode: 'basic', label: 'Text only', hint: 'A plain, text-first page' },
]

/**
 * `compact` is the header's text-only switch. The full control is the
 * footer's motion setting: Full, Calm or Text only.
 */
export default function ModeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode, systemMode } = useMode()

  if (compact) {
    const textOnly = mode === 'basic'
    return (
      <button
        type="button"
        disabled={!mode}
        onClick={() => setMode(textOnly ? (systemMode ?? 'exciting') : 'basic')}
        aria-pressed={textOnly}
        title={textOnly ? 'Return to the full design' : 'Switch to a plain, text-first page'}
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-line px-3 text-xs font-medium text-muted transition-colors hover:border-paper/40 hover:text-paper"
      >
        Text only
      </button>
    )
  }

  return (
    <div role="group" aria-label="Motion" className="flex flex-wrap items-center gap-2">
      <span className="label mr-1" aria-hidden="true">Motion</span>
      {options.map((option) => (
        <button
          key={option.mode}
          type="button"
          disabled={!mode}
          onClick={() => setMode(option.mode)}
          aria-pressed={mode === option.mode}
          title={option.hint}
          className={cn(
            'inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors',
            mode === option.mode
              ? 'border-paper bg-paper text-ink'
              : 'border-line text-muted hover:border-paper/40 hover:text-paper'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
