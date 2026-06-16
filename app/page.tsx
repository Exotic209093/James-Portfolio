import Hero from '@/components/sections/Hero'
import Expertise from '@/components/sections/Expertise'
import ProfessionalExperiencePreview from '@/components/sections/ProfessionalExperiencePreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <ProfessionalExperiencePreview />
      <FeaturedProjects />
      <ContactCTA />
    </>
  )
}
