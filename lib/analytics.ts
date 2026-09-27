import { projects } from './projects'

const publicPages = new Set([
  '/', '/about', '/projects', '/contact', '/galacia', '/open-source', '/certifications',
  ...projects.map((project) => `/projects/${project.id}`),
])

// An allowlist keeps private, unknown, preview and future routes out by default.
export function analyticsPath(pathname: string): string | null {
  return publicPages.has(pathname) ? pathname : null
}

export function redactAnalyticsUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl)
    const path = analyticsPath(url.pathname)
    return url.origin === 'https://james-c.app' && path ? `${url.origin}${path}` : null
  } catch {
    return null
  }
}

export function engagementForLink(href: string, pathname: string) {
  const page = analyticsPath(pathname)
  if (!page) return null
  if (href.startsWith('mailto:')) return { name: 'email_link_click', page }
  try {
    const target = new URL(href, 'https://james-c.app')
    if (target.origin === 'https://james-c.app' && target.pathname === '/resume.pdf') {
      return { name: 'cv_download_click', page }
    }
  } catch { /* Invalid links never become event properties. */ }
  return null
}

export function validMeasurementId(value: string) {
  return /^G-[A-Z0-9]{6,20}$/.test(value)
}

export function analyticsFrame(measurementId: string, pathname: string): string {
  const url = redactAnalyticsUrl(`https://james-c.app${pathname}`)
  if (!validMeasurementId(measurementId) || !url || !analyticsPath(pathname)) return ''
  // Only validated constants enter this document. Our integration does not
  // forward parent URLs, titles, referrers, arbitrary event data or private state.
  // Third-party tag behavior still requires verification against the real stream.
  const config = JSON.stringify({
    send_page_view: false, page_location: url, page_title: pathname,
    page_referrer: '', allow_google_signals: false, allow_ad_personalization_signals: false,
    cookie_flags: 'SameSite=Lax;Secure',
  })
  return `<!doctype html><html lang="en"><head><meta name="referrer" content="no-referrer"><title>Usage analytics</title></head><body><script>
window.dataLayer = [];
function gtag(){dataLayer.push(arguments)}
gtag('consent', 'default', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
gtag('js', new Date());
gtag('config', ${JSON.stringify(measurementId)}, ${config});
gtag('event', 'page_view', {page_location:${JSON.stringify(url)},page_title:${JSON.stringify(pathname)}});
window.addEventListener('message', function(event) {
  if(event.source !== parent || event.origin !== 'https://james-c.app' || event.data?.type !== 'portfolio-event') return;
  if(!['cv_download_click','email_link_click'].includes(event.data.name)) return;
  gtag('event', event.data.name, {page_path:${JSON.stringify(pathname)},page_location:${JSON.stringify(url)},page_title:${JSON.stringify(pathname)}});
});
parent.postMessage('portfolio-analytics-ready', 'https://james-c.app');
</script><script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script></body></html>`
}
