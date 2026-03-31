import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'James Collard | Software Engineer',
  description:
    'Software engineer building production-grade tools — Salesforce platform, TypeScript, Python, and systems programming. Based in Kent, UK.',
  keywords: [
    'software engineer',
    'Salesforce',
    'Apex',
    'TypeScript',
    'Python',
    'full-stack',
    'developer',
    'UK',
  ],
  authors: [{ name: 'James Collard' }],
  openGraph: {
    title: 'James Collard — Software Engineer',
    description:
      'Production-grade software across Salesforce, TypeScript, Python, and systems programming.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
