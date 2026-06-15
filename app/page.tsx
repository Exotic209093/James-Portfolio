import Hero from '@/components/sections/Hero'
import WhatIDoVideo from '@/components/sections/WhatIDoVideo'
import ProfessionalExperiencePreview from '@/components/sections/ProfessionalExperiencePreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ContactCTA from '@/components/sections/ContactCTA'
import ScrollProgressBar from '@/components/sections/ScrollProgressBar'
import ScrollStage from '@/components/sections/ScrollStage'
import HomeScrollSnap from '@/components/sections/HomeScrollSnap'

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <HomeScrollSnap />
      <Hero />
      {/* WhatIDoVideo owns its own pinned scroll-scrub — leave it unstaged. */}
      <WhatIDoVideo />
      {/* parallax={0}: a transform on the wrapper would offset the section's
          scroll-snap target, so the staged sections fade only and let snap
          carry the vertical movement. */}
      <ScrollStage parallax={0}>
        <ProfessionalExperiencePreview />
      </ScrollStage>
      <ScrollStage parallax={0}>
        <FeaturedProjects />
      </ScrollStage>
      <ScrollStage parallax={0} fade={false}>
        <ContactCTA />
      </ScrollStage>
    </>
  )
}
