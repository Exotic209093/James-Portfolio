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
          <Link href="/galacia" className={`${s.panel} reveal`} style={{ '--a': '#79e5d2' } as CSSProperties}>
            <p className={`label ${s.panelLabel}`}>Independent software</p>
            <h3>Galacia</h3>
            <p>
              My independent software brand, starting with Galacia Vault for Salesforce file storage. Explore the company
              and the products taking shape.
            </p>
            <span className={s.panelLink}>
              Meet Galacia <ArrowRight size={16} aria-hidden="true" />
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
