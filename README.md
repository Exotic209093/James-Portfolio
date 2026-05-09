# James Collard — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://jamescollard.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Personal portfolio site at **[jamescollard.vercel.app](https://jamescollard.vercel.app)** — featured projects, full project history, certifications with inline PDF previews, blog, and a direct contact route.

Built with the Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion. Black + deep-purple theme.

---

## Table of contents

- [Pages](#pages)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Content management](#content-management)
  - [Site config + skills](#site-config--skills)
  - [Projects](#projects)
  - [Certifications](#certifications)
  - [Blog posts](#blog-posts)
  - [Resume](#resume)
- [Deployment](#deployment)
- [License](#license)

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero (with open-to-work badge), featured projects, About preview, recent certifications. |
| `/about` | Bio, skills, "What I am targeting", education + certifications preview. |
| `/projects` | Featured + history grids backed by `lib/projects.ts`. Hidden projects (`hidden: true`) stay out of every listing. |
| `/projects/[slug]` | Per-project detail page with screenshot, role, highlights, tech stack, and live / GitHub links. |
| `/certifications` | Grid of every certification card with PDF + Verify links. |
| `/certifications/[id]` | Per-certification detail page — personal summary, topics covered, skills, inline PDF preview, Verify and direct PDF links. |
| `/blog` | Markdown-driven blog index. |
| `/blog/[slug]` | Per-post page rendered from `content/blog/*.md` via `gray-matter` + `remark`. |
| `/contact` | Mailto-based contact card (no server-side form, no `/api/contact` route). |

---

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3, custom dark / purple palette in `tailwind.config.ts` |
| Animation | Framer Motion 11 |
| Icons | lucide-react |
| Forms | react-hook-form + Zod (used in interactive components) |
| Markdown | gray-matter + remark + remark-html |
| Deployment | Vercel (zero-config) |

The portfolio also surfaces the broader skill set called out on the site itself — Bun, Hono, Three.js, Vite, Preact, Flask, Django, Prisma, Apex (Salesforce), Anthropic Agent SDK / Claude Opus 4.7, AWS S3, Docker, PostgreSQL, MongoDB, Chrome Extensions. See `lib/constants.ts` for the source list.

---

## Quick start

Requires Node.js 18.17+ (Next.js 14 minimum) and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

There are no required environment variables — the site is fully static / RSC and reaches no third-party services at runtime.

---

## Scripts

```bash
npm run dev     # Start the dev server on port 3000
npm run build   # Production build
npm run start   # Run the production build locally
npm run lint    # next lint
```

---

## Project structure

```
james-portfolio/
├── app/                    Next.js App Router routes
│   ├── about/
│   ├── blog/
│   ├── certifications/     /certifications + /certifications/[id]
│   ├── contact/            Mailto card (no API route)
│   ├── projects/           /projects + /projects/[slug]
│   ├── icon.svg            Favicon
│   ├── layout.tsx
│   └── page.tsx            Home
├── components/             Reusable UI (Card, Button/ButtonLink, FeaturedProjects, ...)
├── content/blog/           Markdown blog posts (frontmatter + body)
├── lib/                    Typed data + helpers
│   ├── constants.ts        Site config, navigation, skills, social links
│   ├── projects.ts         Project records (featured, history, hidden)
│   ├── certifications.ts   Certification records (id, summary, topics, skills, PDF)
│   ├── blog.ts             Markdown loader
│   └── utils.ts
├── public/
│   ├── certifications/     Cert PDFs referenced by lib/certifications.ts
│   ├── projects/           Project screenshots / SVG cards
│   └── resume.pdf          Optional — wired into the About + Hero download buttons
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Content management

All content is typed and lives in `lib/`. Edit the relevant module, push, and Vercel rebuilds.

### Site config + skills

`lib/constants.ts` holds the site name, description, social URLs, navigation, and the `skills` array rendered on the About page.

```ts
export const siteConfig = {
  name: 'James Collard',
  title: 'Software Engineer',
  description: '...',
  url: 'https://jamescollard.vercel.app',
  links: { twitter, github, linkedin, email, chromeStore },
}
```

### Projects

Add or edit entries in `lib/projects.ts`. Each record:

```ts
{
  slug: 'wavelink',
  title: 'WaveLink',
  description: '...',
  tech: ['TypeScript', 'Chrome Extension', 'Salesforce'],
  github: 'https://github.com/...',
  live: 'https://chromewebstore.google.com/...',
  image: '/projects/wavelink.png',   // optional — rendered on cards + detail page
  featured: true,                    // shown on the home page
  hidden: false,                     // optional — set true to hide from every listing
  // ...role, highlights, etc. for the detail page
}
```

The `hidden` flag lets you stage a project locally without surfacing it on the live site.

### Certifications

Add entries to `lib/certifications.ts`. Each card links to a PDF preview at `/certifications/[id]` plus an external Verify URL.

```ts
{
  id: 'meta-version-control',
  name: 'Version Control',
  issuer: 'Meta · Coursera',
  issuedDate: '2026-05',
  pdf: '/certifications/meta-version-control.pdf',
  verifyUrl: 'https://coursera.org/verify/...',
  summary: '...',                  // optional — personal narrative on detail page
  topics: ['Git basics', '...'],   // optional — topic chips on detail page
  skills: ['Git', 'GitHub'],       // optional — surfaced on detail page
}
```

Drop the corresponding PDF into `public/certifications/`. The cert appears on `/certifications` and in the recent-certifications strip on `/about`.

### Blog posts

Create a Markdown file in `content/blog/` with frontmatter:

```markdown
---
title: Your post title
date: 2026-05-01
excerpt: A one-line summary
tags: [next.js, typescript]
author: James Collard
---

Body in Markdown...
```

Loaded by `lib/blog.ts` via `gray-matter` and rendered with `remark` + `remark-html`.

### Resume

Drop a PDF at `public/resume.pdf` and the existing download buttons on the Hero and About page link to it automatically.

---

## Deployment

The site is configured for Vercel (`vercel.json` is committed and `next.config.js` ships defaults).

1. Push to GitHub.
2. Import the repo in Vercel.
3. Vercel detects Next.js and builds with no extra configuration.

There are no server secrets to wire up — `/contact` is a mailto card, not a serverless function. If a future contact form is added, drop the API key as a Vercel environment variable.

---

## License

MIT — see [LICENSE](LICENSE).
