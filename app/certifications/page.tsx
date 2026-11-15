'use client'

import CertificationCard from '@/components/sections/CertificationCard'
import PageIntro from '@/components/ui/PageIntro'
import { getCertifications } from '@/lib/certifications'
import PageTransition from '@/components/PageTransition'

const certifications = getCertifications()

export default function CertificationsPage() {
  return (
    <PageTransition>
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageIntro
          label="Verified learning"
          title="Certifications"
          lede={
            <>
              Coursera certificates I have completed. Each one is independently verifiable through
              Coursera&apos;s credential checker — the verify link on every card opens the public
              verification record.
            </>
          }
        />

        {certifications.length === 0 ? (
          <p className="text-center text-gray-400">
            New certificates will appear here as they are completed.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((certification, index) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  )
}
