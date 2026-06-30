'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Banknote } from 'lucide-react'
import Card from '@/components/ui/Card'
import type { JobApplication } from '@/lib/jobs'
import { formatDate } from '@/lib/utils'

interface JobApplicationCardProps {
  application: JobApplication
  index?: number
}

const statusStyles: Record<string, string> = {
  queued: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  applied: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  interviewing: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  offer: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  rejected: 'bg-red-500/15 text-red-300 border-red-500/30',
  screened_out: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  closed: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
}

function statusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function JobApplicationCard({ application, index = 0 }: JobApplicationCardProps) {
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
          href={`/jobs/${application.id}`}
          aria-label={`View application for ${application.title} at ${application.company}`}
          className="absolute inset-0 z-10"
        />

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Briefcase className="h-5 w-5 shrink-0" />
            <span className="text-xs uppercase tracking-[0.2em]">Application</span>
          </div>
          <div className="flex items-center gap-2">
            {application.stretch && (
              <span className="text-[0.65rem] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 whitespace-nowrap">
                Stretch
              </span>
            )}
            <span
              className={`text-[0.65rem] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border whitespace-nowrap ${
                statusStyles[application.status] ?? statusStyles.queued
              }`}
            >
              {statusLabel(application.status)}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-1 leading-snug group-hover:text-purple-400 transition-colors">
          {application.title}
        </h3>
        <p className="text-sm text-purple-300 mb-4">{application.company}</p>

        <div className="space-y-1.5 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-gray-500" />
            <span>{application.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4 shrink-0 text-gray-500" />
            <span>{application.salary}</span>
          </div>
        </div>

        {application.match.strongFor.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {application.match.strongFor.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-1 rounded-md bg-purple-900/30 border border-purple-800/40 text-purple-200"
              >
                {skill}
              </span>
            ))}
            {application.match.strongFor.length > 4 && (
              <span className="text-xs px-2 py-1 text-gray-500">
                +{application.match.strongFor.length - 4} more
              </span>
            )}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-4">
          Prepared {formatDate(application.appliedDate)}
        </p>
      </Card>
    </motion.div>
  )
}
