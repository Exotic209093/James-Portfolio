import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, Chrome } from 'lucide-react'
import { siteConfig, sitePages, socialLinks } from '@/lib/constants'
import ModeToggle from '@/components/ui/ModeToggle'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  chrome: Chrome,
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-deep">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-md">
            <p className="text-xl font-semibold tracking-tight text-paper font-wide">{siteConfig.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {siteConfig.title} in London. Salesforce tools, document automation and software people use.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="label mb-4">Pages</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:max-w-xs">
              {sitePages.filter((page) => page.href !== '/').map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-paper">
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-4">Connect</p>
            <ul className="flex flex-wrap gap-1">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap]
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target={social.icon === 'mail' ? undefined : '_blank'}
                      rel={social.icon === 'mail' ? undefined : 'noopener noreferrer'}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-paper/40 hover:text-paper"
                      aria-label={social.name}
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}
