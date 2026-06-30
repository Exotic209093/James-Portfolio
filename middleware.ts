import { NextResponse, type NextRequest } from 'next/server'

// Gate the private job-search dashboard behind HTTP Basic Auth.
//
// The dashboard surfaces personal job-search data (which roles I'm pursuing,
// salary expectations, candid skill gaps), so it must not be publicly readable.
// The password is read from an environment variable — set JOBS_DASHBOARD_PASSWORD
// (and optionally JOBS_DASHBOARD_USER, default "james") in Vercel and in a local
// .env.local. If no password is configured the dashboard stays locked (fail closed),
// so it can never be accidentally public.

export const config = {
  matcher: ['/jobs', '/jobs/:path*'],
}

function unauthorized(): NextResponse {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Job Dashboard", charset="UTF-8"',
    },
  })
}

// Length-aware, constant-time-ish comparison so a match doesn't leak via timing.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export function middleware(request: NextRequest): NextResponse {
  const expectedPassword = process.env.JOBS_DASHBOARD_PASSWORD
  if (!expectedPassword) {
    return unauthorized()
  }
  const expectedUser = process.env.JOBS_DASHBOARD_USER || 'james'

  const header = request.headers.get('authorization')
  if (header?.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice('Basic '.length))
      const separator = decoded.indexOf(':')
      const user = decoded.slice(0, separator)
      const password = decoded.slice(separator + 1)
      if (safeEqual(user, expectedUser) && safeEqual(password, expectedPassword)) {
        return NextResponse.next()
      }
    } catch {
      // Malformed header — fall through to the auth challenge.
    }
  }

  return unauthorized()
}
