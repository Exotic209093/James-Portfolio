'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { useMode, type Mode } from '@/components/ModeProvider'
import { siteConfig, sitePages } from '@/lib/constants'
import styles from './CommandPalette.module.css'

export interface PaletteProject {
  id: string
  title: string
  label: string
  trackLabel: string
  tech: string[]
}

type Item = {
  id: string
  group: 'Projects' | 'Pages' | 'Actions' | 'Motion'
  title: string
  sub: string
  keys: string
  hint: string
  href?: string
  external?: boolean
  /** Plain data rather than closures, so building the list never touches refs. */
  action?: 'copy-email' | Mode
}

const MOTION_OPTIONS: { mode: Mode; title: string; sub: string }[] = [
  { mode: 'exciting', title: 'Full motion', sub: 'Scroll-linked motion and transitions' },
  { mode: 'calm', title: 'Calm motion', sub: 'The full design at its finished frame' },
  { mode: 'basic', title: 'Text only', sub: 'A plain, text-first page' },
]

const OPEN_EVENT = 'command-palette:open'

/** Open the palette from any control; focus returns to `opener` on close. */
export function openCommandPalette(opener?: HTMLElement | null) {
  window.dispatchEvent(new CustomEvent<HTMLElement | null>(OPEN_EVENT, { detail: opener ?? null }))
}

const noSubscribe = () => () => {}
const shortcutSnapshot = () =>
  /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || '') ? '⌘K' : 'Ctrl K'

/** "⌘K" or "Ctrl K" after hydration; empty in the server HTML. */
export function useShortcutLabel() {
  return useSyncExternalStore(noSubscribe, shortcutSnapshot, () => '')
}

const email = siteConfig.links.email.replace('mailto:', '')

export default function CommandPalette({ projects }: { projects: PaletteProject[] }) {
  const router = useRouter()
  const { mode, setMode } = useMode()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const toastTimer = useRef<number>(0)
  const baseId = useId()
  const optionId = (index: number) => `${baseId}-option-${index}`

  const notify = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 3600)
  }, [])

  const items = useMemo<Item[]>(() => {
    return [
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        group: 'Projects' as const,
        title: project.title,
        sub: `${project.label} · ${project.trackLabel}`,
        keys: `${project.tech.join(' ')} ${project.trackLabel} project case study`,
        hint: 'Open',
        href: `/projects/${project.id}`,
      })),
      ...sitePages.map((page) => ({
        id: `page-${page.href}`,
        group: 'Pages' as const,
        title: page.name,
        sub: `james-c.app${page.href === '/' ? '' : page.href}`,
        keys: 'page',
        hint: 'Go',
        href: page.href,
      })),
      { id: 'cv', group: 'Actions', title: 'Download CV', sub: 'resume.pdf', keys: 'resume cv pdf', hint: 'Open', href: '/resume.pdf', external: true },
      {
        id: 'copy-email',
        group: 'Actions',
        title: 'Copy email address',
        sub: email,
        keys: 'email contact mail hire',
        hint: 'Copy',
        action: 'copy-email',
      },
      { id: 'github', group: 'Actions', title: 'GitHub', sub: 'github.com/Exotic209093', keys: 'code source github', hint: 'Open', href: siteConfig.links.github, external: true },
      { id: 'linkedin', group: 'Actions', title: 'LinkedIn', sub: 'Professional profile', keys: 'linkedin profile', hint: 'Open', href: siteConfig.links.linkedin, external: true },
      ...MOTION_OPTIONS.map((option) => ({
        id: `motion-${option.mode}`,
        group: 'Motion' as const,
        title: option.title,
        sub: option.sub,
        keys: 'motion animation accessibility reduce calm settings',
        hint: mode === option.mode ? 'On' : 'Set',
        action: option.mode,
      })),
    ]
  }, [projects, mode])

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (!terms.length) return items
    return items.filter((item) => {
      const haystack = `${item.title} ${item.sub} ${item.keys}`.toLowerCase()
      return terms.every((term) => haystack.includes(term))
    })
  }, [items, query])

  const close = useCallback(() => {
    setOpen(false)
    const opener = openerRef.current
    openerRef.current = null
    if (opener?.isConnected) opener.focus({ preventScroll: true })
  }, [])

  const show = useCallback((opener: HTMLElement | null) => {
    openerRef.current = opener ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    setQuery('')
    setActive(0)
    setOpen(true)
  }, [])

  useEffect(() => {
    const handleOpen = (event: Event) => show((event as CustomEvent<HTMLElement | null>).detail)
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (open) close()
        else show(null)
      }
    }
    window.addEventListener(OPEN_EVENT, handleOpen)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener(OPEN_EVENT, handleOpen)
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, show, close])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [open])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  useEffect(() => {
    if (!open) return
    document.getElementById(optionId(active))?.scrollIntoView({ block: 'nearest' })
    // optionId is derived from a stable id.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open])

  const run = (item: Item | undefined) => {
    if (!item) return
    close()
    if (item.action === 'copy-email') {
      if (!navigator.clipboard) {
        notify(`Email: ${email}`)
        return
      }
      navigator.clipboard.writeText(email).then(
        () => notify(`Copied ${email}`),
        () => notify(`Email: ${email}`)
      )
    } else if (item.action) {
      setMode(item.action)
      notify(`${MOTION_OPTIONS.find((option) => option.mode === item.action)?.title} is on.`)
    } else if (item.href && item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
    } else if (item.href) {
      router.push(item.href)
    }
  }

  const move = (delta: number) => {
    if (!results.length) return
    setActive((current) => (current + delta + results.length) % results.length)
  }

  const activeIndex = Math.min(active, Math.max(0, results.length - 1))
  let lastGroup = ''

  return (
    <>
      {open && (
        <div
          className={styles.overlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div className={styles.palette} role="dialog" aria-modal="true" aria-label="Search the site">
            <div className={styles.inputRow}>
              <Search className={styles.icon} aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActive(0)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    move(1)
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault()
                    move(-1)
                  } else if (event.key === 'Enter') {
                    event.preventDefault()
                    run(results[activeIndex])
                  } else if (event.key === 'Escape') {
                    event.preventDefault()
                    close()
                  } else if (event.key === 'Tab') {
                    // Focus stays in the dialog; arrows move through results.
                    event.preventDefault()
                  }
                }}
                role="combobox"
                aria-expanded="true"
                aria-controls={`${baseId}-list`}
                aria-autocomplete="list"
                aria-activedescendant={results.length ? optionId(activeIndex) : undefined}
                aria-label="Search projects, pages and actions"
                placeholder="Project, page, technology or action"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <ul id={`${baseId}-list`} className={styles.list} role="listbox" aria-label="Results">
              {results.length === 0 && (
                <li className={styles.empty} role="presentation">
                  Nothing matches “{query.trim()}”. Try a project name, a technology such as Rust, or “CV”.
                </li>
              )}
              {results.map((item, index) => {
                const heading = item.group !== lastGroup ? item.group : null
                lastGroup = item.group
                return (
                  <li key={item.id} role="presentation">
                    {heading && <p className={`label ${styles.group}`} aria-hidden="true">{heading}</p>}
                    <div
                      id={optionId(index)}
                      role="option"
                      aria-selected={index === activeIndex}
                      className={styles.option}
                      onMouseMove={() => index !== activeIndex && setActive(index)}
                      onClick={() => run(item)}
                    >
                      <span className={styles.title}>{item.title}</span>
                      <span className={styles.sub}>{item.sub}</span>
                      <span className={styles.hint}>{item.hint}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className={styles.foot} aria-hidden="true">
              <span>↑ ↓ to move</span>
              <span>Enter to open</span>
              <span>Esc to close</span>
            </div>
          </div>
        </div>
      )}
      <div className={`${styles.toast}${toast ? ` ${styles.toastShown}` : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  )
}
