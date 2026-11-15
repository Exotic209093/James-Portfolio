import { ViewTransition, type ReactNode } from 'react'

/** Links that go deeper (into a case study) carry this type; links back out carry `NAV_BACK`. */
export const NAV_FORWARD = ['nav-forward']
export const NAV_BACK = ['nav-back']

const directional = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }

/**
 * Wraps a page so it slides left when you go deeper and right when you come
 * back. Untyped navigations (the header, browser back) swap instantly. The
 * header is anchored in globals.css; calm motion and reduced motion zero it.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      <div>{children}</div>
    </ViewTransition>
  )
}
