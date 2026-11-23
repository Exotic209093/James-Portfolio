import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { contributionProjects } from '@/lib/contributions'
import { WRAP } from '@/components/home/layout'
import s from '@/components/home/Home.module.css'

export interface ContributionSummary {
  merged: number
  open: number
  /** True when the counts come from the live GitHub feed rather than the saved snapshot. */
  live: boolean
}

export default function CompanyAndCommunity({ contributions }: { contributions: ContributionSummary }) {
  return (
    <section data-portfolio-section className={s.company} aria-labelledby="company-community-title">
      <div className={WRAP}>
        <div className={s.secHead}>
          <p className="label">Company and community</p>
          <h2 id="company-community-title">Building my own. Contributing to yours.</h2>
        </div>
        <div className={s.panels}>
          <Link href="/everfrost" className={`${s.panel} reveal`} style={{ '--a': '#a8dfeb' } as CSSProperties}>
            <p className={`label ${s.panelLabel}`}>My company</p>
            <h3>Everfrost</h3>
            <p>
              Business software for Salesforce teams. Everfrost Vault keeps every record file in a cloud the customer
              owns, and it is ready for onboarding. I build it, install it and support it.
            </p>
            <span className={s.panelLink}>
              Meet Everfrost <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
          <Link href="/open-source" className={`${s.panel} reveal`}>
            <p className={`label ${s.panelLabel}`}>Open source</p>
            <h3>Upstream fixes</h3>
            <div className={s.figure}>
              <b>{contributions.merged}</b>
              <span>
                merged pull requests
                <br />
                {contributions.open > 0 ? `${contributions.open} open · ` : ''}
                {contributions.live ? 'live from GitHub' : 'from the saved feed'}
              </span>
            </div>
            <p>Focused fixes and reviews in {contributionProjects.map((project) => project.name).join(' and ')}.</p>
            <span className={s.panelLink}>
              Explore contributions <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
