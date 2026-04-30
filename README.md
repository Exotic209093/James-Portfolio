# James Collard — Portfolio

[![Deploy](https://img.shields.io/badge/deploy-Vercel-000?logo=vercel&logoColor=white)](https://jamescollard.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](#license)

The personal portfolio of **James Collard** — software engineer building AI agents, Salesforce AppExchange packages, and full-stack TypeScript apps. Live at **[jamescollard.vercel.app](https://jamescollard.vercel.app)**.

A statically rendered Next.js 14 site with a black / deep-purple theme, framer-motion micro-interactions, and a Markdown-driven blog.

---

## Table of contents

- [Highlights](#highlights)
- [Pages](#pages)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Configuration](#configuration)
  - [Site metadata](#site-metadata)
  - [Projects](#projects)
  - [Certifications](#certifications)
  - [Blog posts](#blog-posts)
  - [Resume](#resume)
  - [Theme](#theme)
- [Deployment](#deployment)
- [Accessibility & performance](#accessibility--performance)
- [License](#license)

---

## Highlights

- **App Router (Next.js 14)** with TypeScript end-to-end and zero client-side data fetching on content pages.
- **Content as code**: projects, certifications, and skills live in typed modules under `lib/`; blog posts are Markdown files under `content/blog/` parsed with `gray-matter` + `remark`.
- **Interactive polish**: framer-motion fades, animated open-to-work badge, global Lucide icon set, and a hydration-safe project card pattern.
- **Recruiter-ready surfaces**: hero CTA + photo slot, About preview of recent certifications, footer connect-row including the WaveLink Chrome Web Store listing, and a one-click mailto flow on `/contact`.

## Pages

| Route                 | Purpose                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| `/`                   | Hero, featured projects, recent certifications preview, contact CTA.    |
| `/about`              | Bio, skills grouped by layer, recent certifications, education.         |
| `/projects`           | Full project index. Apex HQ is hidden via the `hidden` flag.            |
| `/projects/[slug]`    | Per-project detail with image, long description, tech stack, and links. |
| `/certifications`     | All issued certifications with verify links and downloadable PDFs.      |
| `/blog`               | Markdown-backed blog index.                                             |
| `/blog/[slug]`        | Rendered blog post.                                                     |
| `/contact`            | Email-first contact page (opens the user's mail client via `mailto:`).  |

## Tech stack

| Layer            | Choice                                                          |
| ---------------- | --------------------------------------------------------------- |
| Framework        | Next.js 14 (App Router)                                         |
| Language         | TypeScript 5                                                    |
| Styling          | Tailwind CSS 3, custom black / deep-purple theme                |
| Animation        | Framer Motion 11                                                |
| Forms            | React Hook Form + Zod (used on incidental forms)                |
| Icons            | Lucide React                                                    |
| Content pipeline | `gray-matter` + `remark` + `remark-html` for Markdown blog      |
| Hosting          | Vercel                                                          |

## Project structure

```
app/                 # Next.js App Router routes
  about/             # /about page + recent certifications strip
  blog/              # /blog index and [slug]
  certifications/    # /certifications page (added 2026-04-30)
  contact/           # /contact page (mailto flow)
  projects/          # /projects index and [slug]
  layout.tsx         # Root layout, metadata, fonts
  icon.svg           # Site favicon
components/          # Reusable UI (Hero, ProjectCard, Toast, ButtonLink, …)
content/
  blog/              # Markdown blog posts with frontmatter
docs/                # Internal documentation
lib/
  blog.ts            # Markdown loader + post helpers
  certifications.ts  # Typed certification list + getRecentCertifications()
  constants.ts       # siteConfig, navigation, skills, socialLinks
  projects.ts        # Typed project list + history/featured helpers
  utils.ts           # cn() and small helpers
public/
  certifications/    # Certificate PDFs referenced by lib/certifications.ts
  projects/          # Project images (PNGs / themed SVGs)
  resume.pdf         # Downloadable resume
```

## Quick start

Requires **Node.js 18.17+** and **npm 9+**.

```bash
git clone https://github.com/Exotic209093/James-Portfolio.git
cd James-Portfolio
npm install
npm run dev
```

The dev server starts on [http://localhost:3000](http://localhost:3000).

For a more guided walkthrough — including how to swap in your own content — see [`SETUP.md`](./SETUP.md).

## Scripts

| Command         | Purpose                                       |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the Next.js dev server with hot reload. |
| `npm run build` | Produce an optimised production build.        |
| `npm start`     | Serve the production build locally.           |
| `npm run lint`  | Run `eslint-config-next` over the codebase.   |

## Configuration

All site content lives in typed modules — there is no CMS and no database.

### Site metadata

`lib/constants.ts` exports:

- `siteConfig` — name, title, description, canonical URL, og image, location, and social/email links (including the WaveLink Chrome Web Store listing surfaced in the footer).
- `navigation` — the top-nav entries (`Home`, `About`, `Projects`, `Certifications`, `Blog`, `Contact`).
- `skills` — skills grouped into `Languages`, `Frameworks & Runtimes`, and `Platforms & Tools`.
- `socialLinks` — icon + href pairs consumed by the footer connect row.

### Projects

`lib/projects.ts` is the source of truth for the projects index, featured grid, and history list. Each entry is a typed `Project`:

```ts
{
  id: 'project-slug',           // used as the URL slug
  title: 'Project Title',
  description: 'One-line summary.',
  longDescription: '…',         // optional, rendered on the detail page
  image: '/projects/slug.png',  // place the asset under public/projects/
  tech: ['TypeScript', 'Next.js'],
  github: 'https://github.com/...',
  live: 'https://...',          // optional
  featured: true,               // shown on the homepage featured grid
  hidden: false,                // omit from public listings (see Apex HQ)
  date: '2026-04-26',
}
```

### Certifications

`lib/certifications.ts` is the source of truth for `/certifications` and the **Recent certifications** strip on `/about`. Each entry:

```ts
{
  id: 'meta-programming-in-python',
  title: 'Programming in Python',
  issuer: 'Meta',
  platform: 'Coursera',
  issueDate: '2026-04-30',
  credentialId: 'M9H29EYRUWME',
  verifyUrl: 'https://coursera.org/verify/M9H29EYRUWME',
  pdf: '/certifications/meta-programming-in-python.pdf',
  skills: ['Python', 'OOP', 'Data structures', 'Algorithms'],
}
```

Drop the certificate PDF into `public/certifications/` so the linked download resolves. `getRecentCertifications(limit)` powers the homepage/about preview.

### Blog posts

Add a Markdown file to `content/blog/` with frontmatter:

```markdown
---
title: Your Post Title
date: 2026-04-30
excerpt: A short, single-sentence summary.
tags: [next.js, typescript]
author: James Collard
---

Your post body in Markdown…
```

`lib/blog.ts` parses frontmatter via `gray-matter` and renders the body with `remark` + `remark-html`.

### Resume

Place your PDF at `public/resume.pdf`. The Hero and About download buttons link to it directly.

### Theme

The black + deep-purple palette and gradients live in `tailwind.config.ts` under `theme.extend.colors`. Global styles and CSS variables are in `app/globals.css`.

## Deployment

The site is deployed on **Vercel** at [jamescollard.vercel.app](https://jamescollard.vercel.app).

To deploy your own fork:

1. Push the repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Vercel auto-detects Next.js — no build configuration required.
4. (Optional) Set a custom domain.

There are no required environment variables. The contact page uses a `mailto:` link and does **not** call any backend; the previously orphaned `/api/contact` route was removed.

## Accessibility & performance

- Skip-to-content link in the root layout.
- `aria-label` / `aria-hidden` on icon-only buttons across the site.
- `role="dialog"` + `aria-modal` on modal surfaces.
- Static generation for all content pages keeps Core Web Vitals green out of the box.
- Hydration-safe `ProjectCard` pattern: the Link wrapping the card is an absolutely-positioned overlay, so nested anchors (GitHub / live) render as siblings rather than nested `<a>` tags.

## License

[MIT](./LICENSE) © James Collard. Fork it, adapt it, make it yours.
