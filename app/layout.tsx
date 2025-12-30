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
  title: 'James Collard | Salesforce Software Developer',
  description: 'Salesforce Software Developer specializing in custom Apex code solutions and external integrations. Based in the UK.',
  keywords: ['Salesforce', 'Apex', 'developer', 'portfolio', 'integration', 'Salesforce developer', 'UK'],
  authors: [{ name: 'James Collard' }],
  openGraph: {
    title: 'James Collard - Salesforce Software Developer',
    description: 'Specializing in custom Apex solutions and external integrations',
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
