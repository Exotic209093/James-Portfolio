'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { skills, siteConfig } from '@/lib/constants'

export default function Expertise() {
  return (
    <section id="expertise" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-purple-400 uppercase mb-3">What I do</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Engineering across </span>
            <span className="gradient-text">the full stack</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">{siteConfig.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card hover className="h-full">
                <h3 className="text-lg font-semibold text-white mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs bg-purple-900/30 text-purple-300 rounded border border-purple-800/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
