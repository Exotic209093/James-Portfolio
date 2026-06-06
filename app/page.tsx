import Hero from '@/components/sections/Hero'
import AboutStatement from '@/components/sections/AboutStatement'
import ProfessionalExperiencePreview from '@/components/sections/ProfessionalExperiencePreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutStatement />
      <ProfessionalExperiencePreview />
      <FeaturedProjects />
      <ContactCTA />
    </>
  )
}
