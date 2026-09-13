import Link from 'next/link'
import { ArrowRight, Mountain, GitPullRequest } from 'lucide-react'
import { contributionProjects } from '@/lib/contributions'

export default function CompanyAndCommunity() {
  return (
    <section data-portfolio-section aria-labelledby="company-community-title" className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.3em] text-purple-300 uppercase mb-3">Company & community</p>
        <h2 id="company-community-title" className="text-3xl md:text-4xl font-bold text-white mb-8">Building my own. Contributing to yours.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/galacia" className="group rounded-2xl border border-teal-200/20 bg-gradient-to-br from-teal-950/40 to-black p-7 sm:p-9 hover:border-teal-200/50 transition-colors flex flex-col">
            <Mountain className="w-8 h-8 text-teal-200 mb-7" />
            <h3 className="text-3xl font-semibold text-white mb-4">Galacia</h3>
            <p className="text-gray-300 leading-relaxed mb-7 flex-1">My independent software brand, starting with Galacia Vault for Salesforce file storage. Explore the company and the products taking shape.</p>
            <span className="inline-flex items-center gap-2 text-teal-200 text-sm">Meet Galacia <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/open-source" className="group rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-950/40 to-black p-7 sm:p-9 hover:border-purple-400/50 transition-colors flex flex-col">
            <GitPullRequest className="w-8 h-8 text-purple-300 mb-7" />
            <h3 className="text-3xl font-semibold text-white mb-4">Open source</h3>
            <p className="text-gray-300 leading-relaxed mb-5 flex-1">Focused fixes, upstream reviews, and improvements to the tools I use. Follow my contributions from the problem to the pull request.</p>
            <p className="text-xs text-gray-400 mb-7">{contributionProjects.map((project) => project.name).join(' · ')}</p>
            <span className="inline-flex items-center gap-2 text-purple-300 text-sm">Explore contributions <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </section>
  )
}
