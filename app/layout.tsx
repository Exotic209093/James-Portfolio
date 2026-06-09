import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageBackground from '@/components/layout/PageBackground'
import ModeProvider from '@/components/ModeProvider'
import { siteConfig } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const description =
  'Software engineer building production-grade tools — Salesforce platform, AI agents, TypeScript, Python, and systems programming. Based in Kent, UK.'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'James Collard | Software Engineer',
    template: '%s | James Collard',
  },
  description,
  keywords: [
    'James Collard',
    'software engineer',
    'Salesforce',
    'Apex',
    'AppExchange',
    'AI agents',
    'Anthropic Agent SDK',
    'TypeScript',
    'Python',
    'full-stack',
    'developer',
    'Kent',
    'UK',
  ],
  authors: [{ name: 'James Collard', url: siteConfig.url }],
  creator: 'James Collard',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'James Collard — Software Engineer',
    description,
    type: 'website',
    url: siteConfig.url,
    siteName: 'James Collard',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'James Collard — Software Engineer',
    description,
    creator: '@Exotic209093',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.title,
    email: siteConfig.links.email.replace('mailto:', ''),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kent',
      addressCountry: 'GB',
    },
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
    knowsAbout: [
      'Salesforce',
      'Apex',
      'AI agents',
      'TypeScript',
      'Python',
      'Systems programming',
    ],
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var m=localStorage.getItem('site-mode');if(m==='basic')document.documentElement.classList.add('basic-mode');}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ModeProvider>
          <PageBackground />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ModeProvider>
      </body>
    </html>
  )
}
