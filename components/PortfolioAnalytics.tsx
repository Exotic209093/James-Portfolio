'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { analyticsFrame, analyticsPath, engagementForLink, validMeasurementId } from '@/lib/analytics'

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
const preferenceKey = 'portfolio-analytics'

// A disposable document keeps the tag's document/history listeners separate
// from the app, and receives only fixed public-page values. This same-origin
// frame is not a security sandbox against code that deliberately reads parent.
export default function PortfolioAnalytics() {
  const pathname = usePathname()
  const [consent, setConsent] = useState<'yes' | 'no' | null>(null)
  const [available, setAvailable] = useState(false)
  const publicPath = analyticsPath(pathname)

  useEffect(() => {
    const permitted = validMeasurementId(measurementId)
      && window.location.origin === 'https://james-c.app'
      && navigator.doNotTrack !== '1'
      && !(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl
    // Browser preferences are an external store, read only after hydration.
    const sync = () => {
      setAvailable(permitted)
      try { setConsent(localStorage.getItem(preferenceKey) === 'yes' ? 'yes' : localStorage.getItem(preferenceKey) === 'no' ? 'no' : null) } catch { setConsent(null) }
    }
    const timer = window.setTimeout(sync, 0)
    window.addEventListener('storage', sync)
    return () => { window.clearTimeout(timer); window.removeEventListener('storage', sync) }
  }, [])

  useEffect(() => {
    if (!available || consent !== 'yes' || !publicPath) return
    const frame = document.createElement('iframe')
    frame.hidden = true
    frame.title = 'Optional usage analytics'
    frame.referrerPolicy = 'no-referrer'
    frame.srcdoc = analyticsFrame(measurementId, publicPath)
    let ready = false
    const pending: string[] = []
    function send(name: string) {
      frame.contentWindow?.postMessage({ type: 'portfolio-event', name }, window.location.origin)
    }
    function onReady(event: MessageEvent) {
      if (event.source !== frame.contentWindow || event.origin !== window.location.origin || event.data !== 'portfolio-analytics-ready') return
      ready = true
      pending.splice(0).forEach(send)
    }
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || !(event.target instanceof Element) || window.location.pathname !== publicPath) return
      const anchor = event.target.closest('a[href]')
      const action = anchor && engagementForLink(anchor.getAttribute('href') || '', publicPath!)
      if (action) {
        if (ready) send(action.name)
        else if (pending.length < 10) pending.push(action.name)
      }
    }
    window.addEventListener('message', onReady)
    document.addEventListener('click', onClick)
    document.body.appendChild(frame)
    return () => {
      window.removeEventListener('message', onReady)
      document.removeEventListener('click', onClick)
      frame.remove()
    }
  }, [available, consent, publicPath])

  function choose(value: 'yes' | 'no') {
    try { localStorage.setItem(preferenceKey, value) } catch { /* Choice still works for this visit. */ }
    setConsent(value)
  }

  if (!available || !publicPath) return null
  return (
    <div className="border-t border-purple-900/20 px-4 py-5 text-center text-sm text-gray-300" aria-label="Usage analytics preferences">
      <p className="mx-auto max-w-2xl leading-relaxed">
        Optional Google Analytics helps me understand which projects get viewed and when visitors click my CV or email links.
        It uses cookies after you allow it. Email clicks do not tell me whether a message was sent.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <span role="status">Usage analytics: {consent === 'yes' ? 'on' : 'off'}</span>
        {consent !== 'yes' && <button type="button" onClick={() => choose('yes')} className="min-h-11 rounded-md border border-purple-700 px-4 text-purple-200 hover:text-white">Allow analytics</button>}
        {consent !== 'no' && <button type="button" onClick={() => choose('no')} className="min-h-11 rounded-md border border-gray-600 px-4 hover:text-white">{consent === 'yes' ? 'Turn analytics off' : 'Keep analytics off'}</button>}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">Google privacy policy</a>
      </div>
    </div>
  )
}
