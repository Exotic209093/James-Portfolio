# James Collard — Portfolio

[![Live](https://img.shields.io/badge/Live-jamescollard.vercel.app-7c3aed?style=for-the-badge)](https://jamescollard.vercel.app)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Personal site for James Collard — software engineer building production
software across Salesforce / AppExchange, Next.js, Anthropic Agent SDK,
TypeScript browser extensions, and data-migration tooling. Deployed on
Vercel.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero with open-to-work badge, About preview, featured projects, contact CTA. |
| `/about` | Full bio, skills by category, resume download. |
| `/projects` | All non-hidden projects. |
| `/projects/[slug]` | Per-project detail page with longDescription, role, tech stack, highlights. |
| `/certifications` | Issued certifications list. |
| `/certifications/[id]` | Per-certification detail page with topics, skills, verify-on-Credly link, and PDF preview. |
| `/blog` | Markdown blog index. |
| `/blog/[slug]` | Individual posts. |
| `/contact` | Mailto-based contact CTA — no server-side form handler. |

## Content (current snapshot)

- **9 projects** authored in [`lib/projects.ts`](lib/projects.ts) — Vastify, Nebula Vault, WaveLink, Salesforce Spreadsheet Formatter, Apex HQ (hidden), AI Email Triage Automation, ExoCraft, Git Navigator, Exoware Kernel Driver.
- **10 certifications** authored in [`lib/certifications.ts`](lib/certifications.ts) — Meta Back-End Developer Professional Certificate plus the nine constituent course certificates (Intro to Back-End, Python, Version Control, Databases, Django, APIs, Full Stack, Coding Interview Prep, Capstone).
- **Blog** scaffold under [`content/blog/`](content/blog/) — one post at launch.
- **Assets** under `public/projects/` and `public/certifications/` (PDF originals).

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 + `tailwind-merge` |
| Animation | Framer Motion |
| Icons | `lucide-react` |
| Markdown | `gray-matter` + `remark` for `content/blog/` |
| Forms | None — contact uses `mailto:` |
| Hosting | Vercel |

## Quick start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To produce a production build:

```bash
npm run build
npm start
```

See [`SETUP.md`](SETUP.md) for the full editing guide — site config, adding
a project, adding a certification, replacing the resume PDF, writing a blog
post, and deploying to Vercel.

## Project layout

```
app/                     # Next.js App Router routes (see Pages table above)
components/              # Shared UI components
content/blog/            # Markdown blog posts (frontmatter + body)
lib/
  constants.ts           # siteConfig, navigation, skills, social links
  projects.ts            # Project[] — the source of truth for /projects
  certifications.ts      # Certification[] — the source of truth for /certifications
  blog.ts                # Markdown loader
  utils.ts               # cn() + small helpers
public/
  resume.pdf             # Linked from About + Hero
  projects/              # Project hero images
  certifications/        # Certification PDF originals
```

## Deployment

The site auto-deploys on Vercel when commits land on the default branch.
`vercel.json` pins Node defaults; no environment variables are required —
the contact CTA is a `mailto:` link, so there are no secrets to manage.

## License

[MIT](LICENSE) — fork it for your own portfolio.

---

Built with Next.js, TypeScript, and Tailwind CSS.
