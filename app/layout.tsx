import type { Metadata } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ModeProvider from '@/components/ModeProvider'
import PortfolioAnalytics from '@/components/PortfolioAnalytics'
import CommandPalette, { type PaletteProject } from '@/components/CommandPalette'
import { siteConfig } from '@/lib/constants'
import { projects, trackById } from '@/lib/projects'
import { getProjectArt } from '@/lib/project-art'

// Archivo's width axis carries the display type: wide for names, normal for reading.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

// A slim list keeps the palette's payload small on every page.
const paletteProjects: PaletteProject[] = [...projects]
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
  .map((project) => ({
    id: project.id,
    title: project.title,
    label: getProjectArt(project.id).label,
    trackLabel: trackById[project.track].label,
    tech: project.tech,
  }))

// Applied before paint: text-only is opt-in; reduced motion defaults to calm motion.
// The hero's render pass plays once per visit; `hero-seen` holds its finished frame after that.
const modeScript = `(()=>{let m;try{m=localStorage.getItem('site-mode')}catch{}const r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const mode=m==='exciting'||m==='calm'||m==='basic'?m:(r?'calm':'exciting');const c=document.documentElement.classList;c.toggle('basic-mode',mode==='basic');c.toggle('calm-motion',mode!=='exciting');try{const k='hero-rendered';if(sessionStorage.getItem(k))c.add('hero-seen');else{sessionStorage.setItem(k,'1');setTimeout(()=>c.add('hero-seen'),2600)}}catch{}})()`

const description = siteConfig.description

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: '%s | James Collard',
  },
  description,
  keywords: [
    'James Collard',
    'software engineer',
    'solutions engineer',
    'Electron',
    'developer tooling',
    'Salesforce',
    'Apex',
    'AppExchange',
    'AI agents',
    'Anthropic Agent SDK',
    'TypeScript',
    'Python',
    'full-stack',
    'developer',
    'London',
    'UK',
  ],
  authors: [{ name: 'James Collard', url: siteConfig.url }],
  creator: 'James Collard',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description,
    type: 'website',
    url: siteConfig.url,
    siteName: 'James Collard',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.title}`,
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
      addressLocality: 'London',
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
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ModeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
            <Footer />
            <PortfolioAnalytics />
          </div>
          <CommandPalette projects={paletteProjects} />
        </ModeProvider>
      </body>
    </html>
  )
}
