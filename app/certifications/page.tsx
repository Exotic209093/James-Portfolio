'use client'

import CertificationCard from '@/components/sections/CertificationCard'
import Reveal from '@/components/ui/Reveal'
import { getCertifications } from '@/lib/certifications'

const certifications = getCertifications()

export default function CertificationsPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">My </span>
            <span className="gradient-text">Certifications</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Coursera certificates I have completed. Each one is independently verifiable through
            Coursera&apos;s credential checker — the verify link on every card opens the public
            verification record.
          </p>
        </Reveal>

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
                index={index % 3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

