'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import { navigation, siteConfig } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useMode } from '@/components/ModeProvider'
import ModeToggle from '@/components/ui/ModeToggle'

function Navigation({ pathname }: { pathname: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const { mode } = useMode()
  const basic = mode === 'basic'

  const focusDesktopLink = useCallback((href: string | null) => {
    const links = Array.from(desktopRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])
    const destination = links.find((link) => link.getAttribute('href') === href)
      ?? links.find((link) => link.getAttribute('aria-current') === 'page')
      ?? links[0]
    destination?.focus()
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)')
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
          window.matchMedia('(min-width: 1280px)').matches &&
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
        <div className="flex items-center justify-between gap-2 h-16 md:h-20">
          <motion.div whileHover={basic ? undefined : { scale: 1.05 }} whileTap={basic ? undefined : { scale: 0.95 }}>
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              {siteConfig.name}
            </Link>
          </motion.div>

          <div ref={desktopRef} className="hidden xl:flex items-center space-x-5">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'inline-flex min-h-11 items-center text-sm font-medium transition-colors relative',
                    isActive ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-purple-500" />
                  )}
                </Link>
              )
            })}
            <div className="flex items-center pl-2 border-l border-gray-700/40">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <ModeToggle compact />
            <button
              ref={toggleRef}
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-300 hover:text-purple-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          ref={mobileRef}
          initial={basic ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: basic ? 0 : 0.15 }}
          id="mobile-navigation"
          className="xl:hidden max-h-[calc(100dvh-4rem)] md:max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-black/95 backdrop-blur-md border-t border-purple-900/20"
        >
          <div className="container mx-auto px-4 py-2 sm:px-6 lg:px-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
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
                    'flex min-h-11 items-center rounded-md px-2 text-base font-medium transition-colors',
                    isActive ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    const frame = window.requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-purple-900/20' : 'bg-transparent'
      )}
    >
      {/* A route change resets the disclosure, including back/forward navigation. */}
      <Navigation key={pathname} pathname={pathname} />
    </header>
  )
}
