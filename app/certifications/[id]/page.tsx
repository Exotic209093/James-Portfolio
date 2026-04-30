import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Award, BadgeCheck, Calendar, FileText } from 'lucide-react'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import { certifications, getCertificationById } from '@/lib/certifications'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  return certifications.map((certification) => ({
    id: certification.id,
  }))
}

export default function CertificationDetailPage({ params }: { params: { id: string } }) {
  const certification = getCertificationById(params.id)

  if (!certification) {
    notFound()
  }

  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          href="/certifications"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Certifications
        </Link>

        <div className="flex items-center gap-2 text-purple-400 mb-4">
          <Award className="h-5 w-5" />
          <span className="text-xs uppercase tracking-[0.2em]">Certificate</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="gradient-text">{certification.title}</span>
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-400 mb-8">
          <div className="text-sm">
            Issued by <span className="text-purple-300">{certification.issuer}</span>
            <span className="text-gray-600"> · via </span>
            <span className="text-purple-300">{certification.platform}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(certification.issueDate)}
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-gray-500 px-2 py-1 rounded border border-purple-800/40 bg-purple-900/20">
            Credential {certification.credentialId}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <ButtonLink
            href={certification.pdf}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="mr-2 h-5 w-5" />
            View certificate (PDF)
          </ButtonLink>
          <ButtonLink
            href={certification.verifyUrl}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BadgeCheck className="mr-2 h-5 w-5" />
            Verify on Coursera
          </ButtonLink>
        </div>

        {certification.summary && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">What I covered</h2>
            <Card>
              <p className="text-gray-300 leading-relaxed">{certification.summary}</p>
            </Card>
          </div>
        )}

        {certification.topics && certification.topics.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Topics covered</h2>
            <Card>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {certification.topics.map((topic) => (
                  <li key={topic} className="flex items-start text-gray-300 text-sm">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-1.5 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {certification.skills && certification.skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {certification.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm bg-purple-900/30 text-purple-200 rounded-md border border-purple-800/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white mb-4">Certificate</h2>
          <div className="rounded-xl overflow-hidden border border-purple-800/40 bg-black/40">
            <object
              data={certification.pdf}
              type="application/pdf"
              className="w-full"
              style={{ height: '70vh' }}
              aria-label={`${certification.title} certificate PDF preview`}
            >
              <div className="p-8 text-center">
                <p className="text-gray-300 mb-4">
                  Your browser can&apos;t render the PDF inline.
                </p>
                <ButtonLink
                  href={certification.pdf}
                  variant="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Open the certificate PDF
                </ButtonLink>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  )
}
