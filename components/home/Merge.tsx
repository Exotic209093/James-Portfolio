import Link from 'next/link'
import { Download, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import s from './Home.module.css'

/** The branch ends here: one clear next step for an employer, one line for clients. */
export default function Merge() {
  return (
    <section id="merge" className={s.merge} aria-labelledby="merge-title">
      <div className={`${s.wrap} ${s.mergeInner}`}>
        <p className={`label ${s.mergeNode}`}>Ready to merge</p>
        <h2 id="merge-title" className={s.mergeTitle}>
          Hiring a Solutions Engineer?
        </h2>
        <p className={s.mergeCopy}>
          I am open to opportunities where Salesforce, automation and product engineering meet. I also take on
          freelance work: Salesforce solutions, internal tools and web builds.
        </p>
        <div className={s.cta}>
          <a href={siteConfig.links.email} className={`${s.pill} ${s.pillSolid}`}>
            <Mail size={17} aria-hidden="true" />
            Email me
          </a>
          <a href="/resume.pdf" download className={s.pill}>
            <Download size={17} aria-hidden="true" />
            Download CV
          </a>
          <Link href="/contact" className={s.pill}>
            Other ways to reach me
          </Link>
        </div>
      </div>
    </section>
  )
}
