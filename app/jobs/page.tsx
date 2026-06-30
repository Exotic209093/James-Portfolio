'use client'

import { motion } from 'framer-motion'
import { Send, Search, Filter, Target } from 'lucide-react'
import JobApplicationCard from '@/components/jobs/JobApplicationCard'
import ApplicantProfileCard from '@/components/jobs/ApplicantProfileCard'
import Card from '@/components/ui/Card'
import { getApplications, getLatestRun, getJobStats, getApplicantProfile } from '@/lib/jobs'
import { formatDate } from '@/lib/utils'

const applications = getApplications()
const latestRun = getLatestRun()
const stats = getJobStats()
const profile = getApplicantProfile()

const tiles = [
  { label: 'Applications prepared', value: stats.applications, icon: Send },
  { label: 'Candidates screened', value: stats.candidatesSeen, icon: Search },
  { label: 'Screened out', value: stats.screenedOut, icon: Filter },
  { label: 'Stretch applications', value: stats.stretchApplications, icon: Target },
]

export default function JobsPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Job Search </span>
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A live snapshot of my role search — every listing seen, the ones worth
            pursuing, and the tailored application behind each. Each run searches broadly,
            screens against my criteria, and queues honest applications (gaps disclosed,
            not hidden).
          </p>
        </motion.div>

        {/* Summary tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
            >
              <Card className="h-full flex flex-col gap-2">
                <tile.icon className="h-5 w-5 text-purple-400" />
                <span className="text-3xl font-bold text-white">{tile.value}</span>
                <span className="text-xs uppercase tracking-[0.15em] text-gray-400">
                  {tile.label}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Applicant details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <ApplicantProfileCard profile={profile} />
        </motion.div>

        {/* Latest run summary */}
        {latestRun && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <Card>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
                <h2 className="text-2xl font-bold text-white">Latest run</h2>
                <span className="text-sm text-gray-400">{formatDate(latestRun.date)}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-purple-400 mb-3">
                    Searches run ({latestRun.searches.length})
                  </h3>
                  <ul className="space-y-1.5">
                    {latestRun.searches.map((search) => (
                      <li key={search} className="text-sm text-gray-300 flex items-center gap-2">
                        <Search className="h-3.5 w-3.5 text-gray-600 shrink-0" />
                        {search}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-purple-400 mb-3">
                    Screened out — why
                  </h3>
                  <ul className="space-y-2">
                    {latestRun.screenedOut.map((group) => (
                      <li
                        key={group.reason}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="text-gray-300">{group.reason}</span>
                        <span className="text-gray-500 tabular-nums">{group.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {latestRun.notes && latestRun.notes.length > 0 && (
                <div className="mt-8 pt-6 border-t border-purple-800/30">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-purple-400 mb-3">
                    Notes
                  </h3>
                  <ul className="space-y-2">
                    {latestRun.notes.map((note, index) => (
                      <li key={index} className="text-sm text-gray-400 leading-relaxed">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Applications */}
        <h2 className="text-2xl font-bold text-white mb-6">
          Applications{' '}
          <span className="text-gray-500 text-lg font-normal">({applications.length})</span>
        </h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-400">
            New applications will appear here as each run completes.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application, index) => (
              <JobApplicationCard
                key={application.id}
                application={application}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
