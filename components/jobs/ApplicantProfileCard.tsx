import { Linkedin, Globe, Home, Laptop, Car, UserCheck } from 'lucide-react'
import Card from '@/components/ui/Card'
import type { ApplicantProfile } from '@/lib/jobs'

interface ApplicantProfileCardProps {
  profile: ApplicantProfile
}

export default function ApplicantProfileCard({ profile }: ApplicantProfileCardProps) {
  const linkedinHandle = profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')
  const portfolioLabel = profile.portfolio.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

  return (
    <Card>
      <div className="flex items-center gap-2 text-purple-400 mb-4">
        <UserCheck className="h-5 w-5" />
        <span className="text-xs uppercase tracking-[0.2em]">Applicant details</span>
      </div>

      <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div className="flex items-start gap-2.5">
          <Linkedin className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
          <div>
            <dt className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">LinkedIn</dt>
            <dd>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-200 transition-colors break-all"
              >
                {linkedinHandle}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Globe className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
          <div>
            <dt className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Portfolio</dt>
            <dd>
              <a
                href={profile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-200 transition-colors break-all"
              >
                {portfolioLabel}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Laptop className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
          <div>
            <dt className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Work style</dt>
            <dd className="text-gray-300">{profile.workStyle}</dd>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Home className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
          <div>
            <dt className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Relocation</dt>
            <dd className="text-gray-300">{profile.relocation}</dd>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Car className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
          <div>
            <dt className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Driving licence</dt>
            <dd className="text-gray-300">{profile.drivingLicence}</dd>
          </div>
        </div>
      </dl>
    </Card>
  )
}
