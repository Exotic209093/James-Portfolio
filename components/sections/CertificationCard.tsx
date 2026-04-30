'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import Card from '@/components/ui/Card'
import type { Certification } from '@/lib/certifications'
import { formatDate } from '@/lib/utils'

interface CertificationCardProps {
  certification: Certification
  index?: number
}

export default function CertificationCard({ certification, index = 0 }: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card hover className="relative h-full flex flex-col group cursor-pointer">
        <Link
          href={`/certifications/${certification.id}`}
          aria-label={`View details for ${certification.title}`}
          className="absolute inset-0 z-10"
        />

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Award className="h-5 w-5 shrink-0" />
            <span className="text-xs uppercase tracking-[0.2em]">Certificate</span>
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {formatDate(certification.issueDate)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-purple-400 transition-colors">
          {certification.title}
        </h3>

        <p className="text-sm text-gray-400 mb-4">
          Issued by <span className="text-purple-300">{certification.issuer}</span>
          <span className="text-gray-600"> · via </span>
          <span className="text-purple-300">{certification.platform}</span>
        </p>

        {certification.skills && certification.skills.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {certification.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-purple-900/30 text-purple-300 rounded border border-purple-800/50"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  )
}
