import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import PageIntro from '@/components/ui/PageIntro'
import { ButtonLink } from '@/components/ui/Button'
import PageTransition, { NAV_FORWARD } from '@/components/PageTransition'
import { siteConfig } from '@/lib/constants'
import { projectEvidence } from '@/lib/project-evidence'
import s from '../about/About.module.css'

export const metadata: Metadata = {
  title: 'Everfrost',
  description:
    'Everfrost is James Collard’s company, making business software for Salesforce teams. Everfrost Vault is ready for onboarding; Everfrost Docs is planned.',
  alternates: { canonical: '/everfrost' },
}

// Statuses mirror the public product pages on everfrost.app. Keep them in step.
const products = [
  {
    name: 'Everfrost Vault',
    status: 'Ready for onboarding',
    summary: 'Every Salesforce file, kept in a cloud you own.',
    detail:
      'Files stay on the Salesforce record, where the team works. Their contents go to an Amazon S3 bucket in the customer’s own account and region. Everfrost installs, connects and tests it after a demo and a written offer.',
    href: `${siteConfig.links.everfrost}/everfrost-vault/`,
    caseStudy: '/projects/everfrost-vault',
  },
  {
    name: 'Everfrost Docs',
    status: 'Planned · Next product',
    summary: 'Documents for Salesforce teams, checked before they leave.',
    detail:
      'Document generation for Salesforce teams: one approved template, filled from the record and reviewed before export. It is in private development, with no release date or price.',
    href: `${siteConfig.links.everfrost}/everfrost-docs/`,
  },
]

const facts = [
  ['Operated by', 'James Collard'],
  ['First product', 'Everfrost Vault'],
  ['How it’s sold', 'Demo, written offer, then payment'],
  ['Setup', 'Installed and tested by Everfrost'],
]

const evidence = projectEvidence.everfrost

export default function EverfrostPage() {
  return (
    <PageTransition>
      <div data-portfolio-section className="pb-20 pt-20 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PageIntro
            label="The company I run"
            title={<>Everfrost.</>}
            lede="Business software for teams that run on Salesforce. I founded it, I build it, and I answer the support emails. It starts with Everfrost Vault."
          >
            <ButtonLink href={siteConfig.links.everfrost} target="_blank" rel="noopener noreferrer">
              Visit everfrost.app <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#products" variant="outline">
              See the products
            </ButtonLink>
          </PageIntro>

          <figure className="reveal mb-16 max-w-5xl md:mb-24">
            <div className="overflow-hidden rounded-xl border border-line bg-ink-raised">
              <Image
                src={evidence.image}
                alt={evidence.alt}
                width={1246}
                height={800}
                preload
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-muted">{evidence.caption}</figcaption>
          </figure>

          <dl className="reveal mb-20 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:mb-28 md:grid-cols-4">
            {facts.map(([term, value]) => (
              <div key={term} className="bg-ink-raised p-5">
                <dt className="label mb-2">{term}</dt>
                <dd className="text-paper">{value}</dd>
              </div>
            ))}
          </dl>

          <section className={`${s.section} ${s.overview}`} aria-labelledby="role-title">
            <div className={s.head}>
              <p className="label">My part</p>
              <h2 id="role-title">From the first line of Apex to the support inbox.</h2>
            </div>
            <div className={s.prose}>
              <p>
                Everfrost is <strong>my own company</strong>, run alongside my role at Apex Infinity Solutions. I build
                the Salesforce products in Apex and Lightning Web Components, and the transfer gateway that moves large
                files to customer storage. I also built the <strong>customer platform</strong> for accounts and product
                access, now in beta, and the <strong>public website</strong>.
              </p>
              <p>
                I run the infrastructure too: a self-managed server with HTTPS, PostgreSQL, encrypted off-host backups
                and a restore drill that passed. When a customer books a demo, I give it, and I install and support
                what they buy.
              </p>
              <p>
                Everfrost was called Galacia until November 2026. With the rename, I narrowed the lineup to Salesforce
                software: one product to sell now, one planned, and the earlier concepts parked with their research
                kept.
              </p>
            </div>
          </section>

          <section id="products" className={s.section} aria-labelledby="products-title">
            <div className={s.head}>
              <p className="label">Products</p>
              <h2 id="products-title">One available now. One planned.</h2>
            </div>
            <ul className="grid max-w-5xl gap-5 md:grid-cols-2">
              {products.map((product) => (
                <li key={product.name} className="reveal flex flex-col rounded-xl border border-line bg-ink-raised p-6 sm:p-8">
                  <p className="label mb-4">{product.status}</p>
                  <h3 className="mb-2 text-2xl font-semibold text-paper">{product.name}</h3>
                  <p className="mb-4 text-paper">{product.summary}</p>
                  <p className="mb-6 flex-1 leading-relaxed text-muted">{product.detail}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-house transition-colors hover:text-paper"
                    >
                      On everfrost.app <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                    {product.caseStudy && (
                      <Link
                        href={product.caseStudy}
                        transitionTypes={NAV_FORWARD}
                        className="inline-flex min-h-11 items-center gap-2 text-house transition-colors hover:text-paper"
                      >
                        How I built it <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className={`${s.closing} reveal`}>
            <p>Want the engineering detail, not the sales page?</p>
            <div className={s.actions}>
              <ButtonLink href="/projects/everfrost" variant="primary">
                Read the Everfrost case study
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
