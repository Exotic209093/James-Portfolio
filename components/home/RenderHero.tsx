import { ArrowDown, Download } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { WRAP } from './layout'
import HeroName from './HeroName'
import type { LatestActivity } from '@/lib/github-activity'
import s from './Home.module.css'

const formatDay = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'Europe/London' })

/**
 * The name arrives as source code and renders into display type, the way
 * Docify turns markup into a page. The finished frame is the server HTML;
 * the render pass is CSS only and plays once per visit.
 */
export default function RenderHero({
  projectCount,
  branchCount,
  activity,
}: {
  projectCount: number
  branchCount: number
  activity: LatestActivity | null
}) {
  const [firstName, ...rest] = siteConfig.name.split(' ')
  return (
    <section className={s.render} aria-labelledby="hero-name">
      <div className={`${WRAP} ${s.renderInner}`}>
        <p className={`label ${s.after}`}>
          <span className={s.nowrap}>{siteConfig.title}</span> · <span className={s.nowrap}>London</span> ·{' '}
          <span className={s.nowrap}>Open to opportunities</span>
        </p>
        <HeroName>
          <span className={s.renderOut}>
            <span>{firstName}</span> <span>{rest.join(' ')}</span>
          </span>
          <span className={s.renderSrc} aria-hidden="true">
            <span className={s.tag}>&lt;h1&gt;</span>
            {siteConfig.name}
            <span className={s.tag}>&lt;/h1&gt;</span>
          </span>
          <span className={s.renderScan} aria-hidden="true" />
        </HeroName>
        <p className={`${s.renderSub} ${s.after}`}>
          I build <strong>Salesforce tools</strong>, <strong>document automation</strong> and the software people
          use every day, from the first workflow to the finished product.
        </p>
        <div className={`${s.cta} ${s.after}`}>
          <a href="/resume.pdf" download className={`${s.pill} ${s.pillSolid}`}>
            <Download size={17} aria-hidden="true" />
            Download CV
          </a>
          <a href="#work" className={s.pill}>
            Explore the work
            <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <p className={`${s.renderMeta} ${s.after}`}>
          <span>
            <b>{projectCount}</b> projects
          </span>
          <span>
            <b>{branchCount}</b> branches
          </span>
          {activity && (
            <span>
              Latest:{' '}
              <a href={activity.url} target="_blank" rel="noopener noreferrer" className={s.activityLink}>
                {activity.action} <b>{activity.repository}</b>
              </a>{' '}
              · <time dateTime={activity.at}>{formatDay(activity.at)}</time>
            </span>
          )}
          <span className="hidden lg:inline">
            Press <b>⌘K</b> or <b>Ctrl K</b> to search
          </span>
        </p>
      </div>
    </section>
  )
}
