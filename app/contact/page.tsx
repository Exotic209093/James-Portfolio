'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, MapPin, Copy, Check, Download, ArrowUpRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button, { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

const emailAddress = siteConfig.links.email.replace('mailto:', '')

export default function ContactPage() {
  const emailField = useRef<HTMLInputElement>(null)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle')
  const [isCopying, setIsCopying] = useState(false)

  async function copyEmail() {
    setIsCopying(true)
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopyState('copied')
    } catch {
      emailField.current?.focus()
      emailField.current?.select()
      setCopyState('manual')
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Get In </span>
            <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a freelance project, role, or idea in mind? The best way to reach me is directly by email.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card hover>
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="shrink-0 p-3 bg-purple-900/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Mail className="h-5 w-5 text-purple-400" />
                  </motion.div>
                  <h2 className="text-white font-semibold">Email</h2>
                </div>
                <a href={siteConfig.links.email} className="block break-all text-gray-400 hover:text-purple-400 transition-colors">
                  {emailAddress}
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card hover>
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="shrink-0 p-3 bg-purple-900/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <MapPin className="h-5 w-5 text-purple-400" />
                  </motion.div>
                  <div>
                    <h2 className="text-white font-semibold mb-1">Location</h2>
                    <p className="text-gray-400">{siteConfig.location} · open to remote</p>
                  </div>
                </div>
              </Card>
            </motion.div>
            <Card>
              <h2 className="text-white font-semibold mb-3">Looking for my background?</h2>
              <div className="flex flex-col items-start gap-4">
                <a href="/resume.pdf" download className="inline-flex min-h-11 items-center gap-2 text-purple-300 hover:text-white">
                  <Download aria-hidden="true" className="h-4 w-4" /> Download my CV
                </a>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-purple-300 hover:text-white">
                  LinkedIn <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </Card>
          </div>

          {/* Mailto CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                <h2 className="text-2xl font-semibold text-white">Send me an email</h2>
                <p className="text-gray-300 max-w-md leading-relaxed">
                  I&apos;m currently open to freelance projects and new opportunities. Share what you&apos;re
                  looking to build, the problem you want to solve, and any timescale you have in mind.
                </p>
                <div className="w-full max-w-md">
                  <label htmlFor="contact-email" className="sr-only">Email address</label>
                  <input ref={emailField} id="contact-email" readOnly value={emailAddress} onFocus={(event) => event.currentTarget.select()} className="w-full min-w-0 rounded-lg border border-purple-800/40 bg-black/30 px-3 py-3 text-center text-purple-200" />
                </div>
                <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
                  <ButtonLink href={siteConfig.links.email} variant="primary">
                    <Mail aria-hidden="true" className="mr-2 h-5 w-5" /> Email me
                  </ButtonLink>
                  <Button type="button" variant="secondary" disabled={isCopying} onClick={copyEmail}>
                    {copyState === 'copied' ? <Check aria-hidden="true" className="mr-2 h-5 w-5" /> : <Copy aria-hidden="true" className="mr-2 h-5 w-5" />}
                    {copyState === 'copied' ? 'Email copied' : 'Copy email'}
                  </Button>
                </div>
                <p role="status" aria-live="polite" className="min-h-10 text-sm text-gray-400">
                  {copyState === 'copied' ? 'Email address copied to your clipboard.' : copyState === 'manual' ? 'The address is selected. Copy it using your keyboard or device menu.' : 'Email me opens your email app. You can also copy the address.'}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
