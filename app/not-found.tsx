import Link from 'next/link'
import { Home } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="text-white">404</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-300">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <ButtonLink href="/" variant="primary" size="lg">
          <Home className="mr-2 h-5 w-5" />
          Go Home
        </ButtonLink>
      </div>
    </div>
  )
}
