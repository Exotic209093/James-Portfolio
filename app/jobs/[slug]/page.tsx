import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Banknote,
  Calendar,
  ExternalLink,
  Check,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import { getApplications, getApplicationById } from '@/lib/jobs'
import { formatDate } from '@/lib/utils'

const needsInputLabels: Record<string, string> = {
  linkedin: 'LinkedIn profile URL',
  portfolio: 'Portfolio / personal site URL',
  relocation: 'Willingness to relocate',
  remote_preference: 'Remote working preference',
  driving_licence: 'Driving licence',
  kafka_experience: 'Kafka / message-broker experience',
}

function statusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export async function generateStaticParams() {
  return getApplications().map((application) => ({
    slug: application.id,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const application = getApplicationById(params.slug)
  if (!application) {
    return { title: 'Application not found' }
  }
  return {
    title: `${application.title} — ${application.company}`,
    description: application.summary,
    alternates: { canonical: `/jobs/${application.id}` },
  }
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const application = getApplicationById(params.slug)

  if (!application) {
    notFound()
  }

  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          href="/jobs"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-purple-400">
            <Briefcase className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.2em]">Application</span>
          </div>
          {application.stretch && (
            <span className="text-xs uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300">
              Stretch
            </span>
          )}
          <span className="text-xs uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/15 text-purple-300">
            {statusLabel(application.status)}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
          <span className="gradient-text">{application.title}</span>
        </h1>
        <p className="text-xl text-purple-200 mb-8">{application.company}</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-400 mb-8">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {application.location}
          </div>
          <div className="flex items-center text-sm">
            <Banknote className="h-4 w-4 mr-2" />
            {application.salary}
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            Prepared {formatDate(application.appliedDate)}
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-gray-500 px-2 py-1 rounded border border-purple-800/40 bg-purple-900/20">
            {application.jobType} · via {application.source}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <ButtonLink
            href={application.applyUrl}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            View listing
          </ButtonLink>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">The role</h2>
          <Card>
            <p className="text-gray-300 leading-relaxed">{application.summary}</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-400" />
              Strong fit
            </h2>
            <Card className="h-full">
              <ul className="space-y-2.5">
                {application.match.strongFor.map((item) => (
                  <li key={item} className="flex items-start text-gray-300 text-sm">
                    <Check className="h-4 w-4 text-emerald-400 mr-2.5 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Honest gaps
            </h2>
            <Card className="h-full">
              <ul className="space-y-2.5">
                {application.match.gaps.map((item) => (
                  <li key={item} className="flex items-start text-gray-300 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mr-2.5 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {application.needsInput.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-purple-400" />
              Still needs input
            </h2>
            <Card>
              <div className="flex flex-wrap gap-2">
                {application.needsInput.map((key) => (
                  <span
                    key={key}
                    className="px-3 py-1.5 text-sm bg-purple-900/30 text-purple-200 rounded-md border border-purple-800/50"
                  >
                    {needsInputLabels[key] ?? key}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
