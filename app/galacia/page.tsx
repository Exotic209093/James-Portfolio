import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Files, FileText, Route, MessagesSquare } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Galacia',
  description: 'Galacia is James Collard’s independent software brand. Explore the company, Galacia Vault, and the planned Docs, Track, and Connect products.',
  alternates: { canonical: '/galacia' },
}

const products = [
  { name: 'Galacia Vault', theme: 'Files & storage', status: 'In development', icon: Files, href: 'galacia-vault', description: 'A Salesforce file workspace connecting records to customer-owned cloud storage, with tools for users and administrators.' },
  { name: 'Galacia Docs', theme: 'Document generation', status: 'Planned concept', icon: FileText, href: 'galacia-docs', description: 'Exploring reusable templates and a guided path from source information to documents ready for review.' },
  { name: 'Galacia Track', theme: 'Delivery tracking', status: 'Planned concept', icon: Route, href: 'galacia-track', description: 'Exploring how teams follow a delivery from hand-off to completion, with clear ownership and next steps.' },
  { name: 'Galacia Connect', theme: 'Team messaging', status: 'Planned concept', icon: MessagesSquare, href: 'galacia-connect', description: 'Exploring how team conversations can sit alongside the work and the context people need.' },
]

export default function GalaciaPage() {
  return (
    <div data-portfolio-section className="pt-28 md:pt-36 pb-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-teal-200 mb-4">The company I’m building</p>
            <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-6">Galacia<span className="text-teal-200">.</span></h1>
            <p className="text-2xl text-teal-100 mb-5">Thoughtful tools for everyday work.</p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Galacia is my independent software brand. It brings together the products I’m building
              for teams, starting with Galacia Vault and a more considered way to manage files in Salesforce.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="https://galacia.app" target="_blank" rel="noopener noreferrer" className="!bg-none !bg-teal-200 !text-slate-950 !shadow-none hover:!bg-teal-100">
                Visit Galacia <ArrowUpRight className="ml-2 w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="#products" variant="ghost">Explore the products <ArrowRight className="ml-2 w-4 h-4" /></ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-teal-200/20 bg-[#071b21]">
            <Image src="/projects/galacia.svg" alt="Galacia glacier illustration and product family" fill priority sizes="(max-width: 1024px) 100vw, 550px" className="object-contain" />
          </div>
        </section>

        <section aria-labelledby="role-title" className="border-y border-teal-200/15 py-9 mb-16 grid md:grid-cols-3 gap-7">
          <h2 id="role-title" className="text-2xl font-semibold text-white">From product direction<br className="hidden md:block" /> to the details.</h2>
          <div className="md:col-span-2 text-gray-300 leading-relaxed space-y-4">
            <p>I work across the brand, product architecture, Salesforce engineering, and public website. That includes Apex services and Lightning Web Components for Vault, plus the website’s product explorer, guides, and optional Three.js glacier.</p>
            <p>The company website is live. Vault is in development, with public installation still to come. Docs, Track, and Connect are planned concepts with working names, currently in discovery.</p>
          </div>
        </section>

        <section id="products" aria-labelledby="products-title" className="scroll-mt-28 mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-teal-200 mb-3">The product collection</p>
          <h2 id="products-title" className="text-3xl sm:text-4xl font-semibold text-white mb-8">Starting with Vault.</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <article key={product.name} className="rounded-2xl border border-teal-200/15 bg-gradient-to-br from-teal-950/30 to-black/50 p-6 sm:p-8 flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-8">
                    <Icon className="h-7 w-7 text-teal-200" />
                    <span className="text-xs text-teal-100 border border-teal-200/20 rounded-full px-3 py-1">{product.status}</span>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{product.theme}</p>
                  <h3 className="text-2xl text-white font-semibold mb-3">{product.name}</h3>
                  <p className="text-gray-300 leading-relaxed flex-1 mb-6">{product.description}</p>
                  <a href={`https://galacia.app/${product.href}/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-teal-200 hover:text-white text-sm self-start">
                    {product.status === 'In development' ? 'Explore Vault' : 'Explore the concept'} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </article>
              )
            })}
          </div>
        </section>

        <section aria-labelledby="engineering-title" className="rounded-2xl border border-purple-800/30 bg-black/30 p-6 sm:p-9">
          <h2 id="engineering-title" className="text-2xl font-semibold text-white mb-3">The engineering behind Galacia</h2>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">Explore the technical work in my portfolio, or visit the company roadmap for the current product direction.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-4 text-sm">
            <Link href="/projects/galacia-vault" className="inline-flex items-center gap-2 text-purple-300 hover:text-white">Vault case study <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/projects/galacia" className="inline-flex items-center gap-2 text-purple-300 hover:text-white">Website case study <ArrowRight className="w-4 h-4" /></Link>
            <a href="https://galacia.app/roadmap/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-teal-200 hover:text-white">Company roadmap <ArrowUpRight className="w-4 h-4" /></a>
          </div>
        </section>
      </div>
    </div>
  )
}
