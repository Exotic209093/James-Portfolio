'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <MessageCircle className="h-16 w-16 text-purple-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Let's Work </span>
              <span className="gradient-text">Together</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Have a project in mind? I'd love to hear about it. Let's create
              something amazing together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <ButtonLink href="/contact" variant="primary" size="lg">
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </ButtonLink>
            <a
              href={siteConfig.links.email}
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              {siteConfig.links.email.replace('mailto:', '')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
