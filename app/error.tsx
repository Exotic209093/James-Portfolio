'use client'

import { useEffect } from 'react'

/**
 * Route-level error boundary. Replaces Next's bare "a client-side exception has
 * occurred" white screen with a recoverable, on-brand fallback so one failing
 * client component can't take the whole page down.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the real error in the console for debugging.
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold mb-4">
          <span className="gradient-text">Something went wrong</span>
        </h1>
        <p className="text-gray-400 mb-8">
          An unexpected error occurred while rendering this page. You can try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-500"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
