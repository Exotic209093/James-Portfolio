'use client'

import { useRef, type ReactNode } from 'react'
import s from './Home.module.css'

function motionAllowed() {
  return (
    !document.documentElement.classList.contains('calm-motion') &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * The hero name. Hovering it with a mouse, or tapping it, runs the render pass
 * again: the source code sweeps back into display type. Decorative only, so
 * calm motion and reduced motion leave it still.
 */
export default function HeroName({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const playing = useRef(false)

  const replay = () => {
    const heading = ref.current
    if (!heading || playing.current || !motionAllowed()) return
    playing.current = true
    heading.classList.remove(s.replay)
    void heading.offsetWidth // restart the CSS animation
    heading.classList.add(s.replay)
    window.setTimeout(() => {
      playing.current = false
    }, 1400)
  }

  return (
    <h1
      ref={ref}
      id="hero-name"
      className={s.renderBox}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') replay()
      }}
      onClick={replay}
    >
      {children}
    </h1>
  )
}
