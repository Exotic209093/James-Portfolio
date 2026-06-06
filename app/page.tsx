import Hero from '@/components/sections/Hero'
import WhatIDoVideo from '@/components/sections/WhatIDoVideo'
import ProfessionalExperiencePreview from '@/components/sections/ProfessionalExperiencePreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIDoVideo />
      <ProfessionalExperiencePreview />
      <FeaturedProjects />
      <ContactCTA />
    </>
  )
}
