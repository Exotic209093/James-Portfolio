'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

const emailAddress = siteConfig.links.email.replace('mailto:', '')

export default function ContactPage() {
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
            The best way to reach me is directly by email.
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
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="p-3 bg-purple-900/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Mail className="h-5 w-5 text-purple-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a
                      href={siteConfig.links.email}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>
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
                    className="p-3 bg-purple-900/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <MapPin className="h-5 w-5 text-purple-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Location</h3>
                    <p className="text-gray-400">Available for remote work</p>
                  </div>
                </div>
              </Card>
            </motion.div>
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
                  I&apos;m currently open to new opportunities. Whether you have a role in mind or just want to connect, I&apos;m happy to hear from you.
                </p>
                <p className="text-purple-400 text-lg">{emailAddress}</p>
                <ButtonLink href={siteConfig.links.email} variant="primary" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Send me an email
                </ButtonLink>
                <p className="text-sm text-gray-500">Opens your email client</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
