import Hero from '@/components/sections/Hero'
import WhatIDoVideo from '@/components/sections/WhatIDoVideo'
import ProfessionalExperiencePreview from '@/components/sections/ProfessionalExperiencePreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ContactCTA from '@/components/sections/ContactCTA'
import ScrollProgressBar from '@/components/sections/ScrollProgressBar'
import ScrollStage from '@/components/sections/ScrollStage'

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <Hero />
      {/* WhatIDoVideo owns its own pinned scroll-scrub — leave it unstaged. */}
      <WhatIDoVideo />
      <ScrollStage>
        <ProfessionalExperiencePreview />
      </ScrollStage>
      <ScrollStage>
        <FeaturedProjects />
      </ScrollStage>
      <ScrollStage fade={false}>
        <ContactCTA />
      </ScrollStage>
    </>
  )
}
