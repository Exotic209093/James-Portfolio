'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github, Linkedin, Search } from 'lucide-react'
import { navigation, siteConfig } from '@/lib/constants'
import { cn } from '@/lib/utils'
import ModeToggle from '@/components/ui/ModeToggle'
import { openCommandPalette, useShortcutLabel } from '@/components/CommandPalette'

const DESKTOP_QUERY = '(min-width: 1024px)'

function isCurrent(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
}

function Navigation({ pathname }: { pathname: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const shortcut = useShortcutLabel()

  const focusDesktopLink = useCallback((href: string | null) => {
    const links = Array.from(desktopRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])
    const destination = links.find((link) => link.getAttribute('href') === href)
      ?? links.find((link) => link.getAttribute('aria-current') === 'page')
      ?? links[0]
    destination?.focus()
  }, [])

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY)
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return
      // Do not strand keyboard focus inside links that just became hidden.
      if (mobileRef.current?.contains(document.activeElement) || document.activeElement === toggleRef.current) {
        focusDesktopLink(document.activeElement?.getAttribute('href') ?? null)
      }
      setIsMobileMenuOpen(false)
    }
    media.addEventListener('change', handleDesktopChange)
    return () => media.removeEventListener('change', handleDesktopChange)
  }, [focusDesktopLink])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleOutsidePointer)
    return () => document.removeEventListener('pointerdown', handleOutsidePointer)
  }, [isMobileMenuOpen])

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return
        // A browser may blur a CSS-hidden mobile link before its matchMedia
        // change event fires. Keep the original blur target for that ordering.
        if (
          !event.relatedTarget &&
          window.matchMedia(DESKTOP_QUERY).matches &&
          (mobileRef.current?.contains(event.target) || event.target === toggleRef.current)
        ) {
          focusDesktopLink(event.target.getAttribute('href'))
        }
        setIsMobileMenuOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isMobileMenuOpen) {
          event.preventDefault()
          setIsMobileMenuOpen(false)
          toggleRef.current?.focus()
        }
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 md:h-20">
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className="inline-flex min-h-11 min-w-0 items-center truncate text-base font-semibold tracking-tight text-paper transition-opacity font-wide hover:opacity-80 sm:text-lg md:text-xl"
          >
            {siteConfig.name}
          </Link>

          <div ref={desktopRef} className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const isActive = isCurrent(pathname, item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative inline-flex min-h-11 items-center rounded-full px-4 text-[15px] transition-colors',
                    isActive ? 'text-paper' : 'text-muted hover:text-paper'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span aria-hidden="true" className="absolute bottom-1.5 left-4 right-4 h-px bg-house" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={(event) => openCommandPalette(event.currentTarget)}
              aria-keyshortcuts="Control+K Meta+K"
              aria-haspopup="dialog"
              className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line px-3 text-sm text-muted transition-colors hover:border-paper/40 hover:text-paper"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              {/* The visible label is the accessible name; phones keep it for screen readers only. */}
              <span className="sr-only sm:not-sr-only">Search</span>
              {shortcut && (
                <kbd className="hidden font-mono text-xs text-muted xl:inline" aria-hidden="true">
                  {shortcut}
                </kbd>
              )}
            </button>
            <div className="hidden items-center xl:flex">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-paper"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-paper"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <ModeToggle compact />
            <button
              ref={toggleRef}
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-paper lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileRef}
          id="mobile-navigation"
          className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-ink md:h-[calc(100dvh-5rem)] lg:hidden"
        >
          <div className="container mx-auto px-4 py-4 sm:px-6">
            {navigation.map((item) => {
              const isActive = isCurrent(pathname, item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    if (pathname === item.href) toggleRef.current?.focus()
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex min-h-12 items-center border-b border-line/60 px-1 text-2xl font-medium font-wide transition-colors last:border-b-0',
                    isActive ? 'text-house' : 'text-paper hover:text-house'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // A sentinel at the top of the document replaces a scroll listener.
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setIsScrolled(!entry.isIntersecting))
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-5 w-px" />
      <header
        style={{ viewTransitionName: 'site-header' }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300',
          isScrolled ? 'border-line bg-ink/80 backdrop-blur-md' : 'border-transparent bg-transparent'
        )}
      >
        {/* A route change resets the disclosure, including back/forward navigation. */}
        <Navigation key={pathname} pathname={pathname} />
      </header>
    </>
  )
}
