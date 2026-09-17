'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Blocks, Check, CloudCog, Code2 } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const services = [
  {
    title: 'Web apps & product builds',
    description:
      'Responsive, production-ready experiences built around a clear business goal, from an early idea through to launch.',
    icon: Code2,
  },
  {
    title: 'Salesforce & automation',
    description:
      'Practical Salesforce solutions, document automation, integrations, and workflows that remove repetitive work.',
    icon: CloudCog,
  },
  {
    title: 'Internal tools & integrations',
    description:
      'Focused tools that connect your systems, simplify complex processes, and help your team move faster.',
    icon: Blocks,
  },
]

const engagementPoints = [
  'Clear scope and regular communication',
  'End-to-end engineering and delivery',
  'Available for remote freelance projects',
]

export default function Freelance() {
  return (
    <section
      id="freelance"
      data-portfolio-section
      aria-labelledby="freelance-title"
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div
        aria-hidden
        data-basic-hide
        className="absolute inset-x-0 top-1/3 mx-auto h-72 max-w-5xl rounded-full bg-purple-600/10 blur-3xl"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-300">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to freelance projects
            </div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-purple-300">
              Freelance
            </p>
            <h2 id="freelance-title" className="max-w-3xl text-3xl font-bold text-white md:text-5xl">
              Need an idea turned into{' '}
              <span className="gradient-text">working software?</span>
            </h2>
          </div>

          <p className="text-lg leading-relaxed text-gray-300">
            I partner with businesses and individuals to design, build, and improve useful digital products.
            Bring me a defined brief or an early-stage problem and we can shape the right solution together.
          </p>
        </motion.div>

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-purple-400/20 bg-gradient-to-b from-purple-950/35 to-black p-6 transition-colors hover:border-purple-400/50 sm:p-7"
              >
                <div className="mb-6 inline-flex rounded-xl border border-purple-400/20 bg-purple-500/10 p-3">
                  <Icon className="h-6 w-6 text-purple-300" aria-hidden />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{service.title}</h3>
                <p className="leading-relaxed text-gray-400">{service.description}</p>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          id="freelance-contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="scroll-mt-24 flex flex-col gap-7 rounded-2xl border border-purple-400/20 bg-purple-950/20 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <ul className="grid gap-3 text-sm text-gray-300 sm:grid-cols-3 sm:gap-5">
            {engagementPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ButtonLink href="/contact" variant="primary" className="shrink-0">
            Discuss your project
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  )
}
