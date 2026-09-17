import Hero from '@/components/sections/Hero'
import Expertise from '@/components/sections/Expertise'
import ProfessionalExperiencePreview from '@/components/sections/ProfessionalExperiencePreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import CompanyAndCommunity from '@/components/sections/CompanyAndCommunity'
import Freelance from '@/components/sections/Freelance'

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <CompanyAndCommunity />
      <ProfessionalExperiencePreview />
      <FeaturedProjects />
      <Freelance />
    </>
  )
}
