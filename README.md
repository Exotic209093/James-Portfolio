# Portfolio Website

Personal portfolio site built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Black canvas with a deep-purple accent palette, Framer Motion micro-interactions, MDX-style Markdown blog, and a Markdown-free content layer driven by typed TS modules under `lib/`.

## Pages

- **Home** (`/`) — hero, about preview, featured projects, contact CTA.
- **About** (`/about`) — full bio, skills grid, downloadable résumé.
- **Projects** (`/projects`, `/projects/[slug]`) — listing + per-project detail page with image, tech stack, role, highlights, and GitHub / live links.
- **Certifications** (`/certifications`, `/certifications/[id]`) — listing + per-certification detail page with summary, topics covered, skills, embedded PDF preview, and credential-verify link.
- **Blog** (`/blog`, `/blog/[slug]`) — Markdown-driven blog with frontmatter metadata.
- **Contact** (`/contact`) — direct-email page (clickable `mailto:` CTA + location card). No form, no API route — keeps the deployment a pure static export.

## Tech stack

- **Next.js 14** — App Router, server components, static export-friendly.
- **TypeScript** — strict mode across `app/`, `components/`, `lib/`.
- **Tailwind CSS** — utility-first styling; theme tokens in `tailwind.config.ts`.
- **Framer Motion** — entry animations, hover micro-interactions.
- **Lucide React** — icon set used across navigation, cards, and the social rail.
- **gray-matter + remark** — Markdown frontmatter parsing for the blog.

## Repository layout

```
james-portfolio/
├── app/                       # Next.js App Router routes
│   ├── about/
│   ├── blog/[slug]/
│   ├── certifications/[id]/
│   ├── contact/
│   ├── projects/[slug]/
│   ├── layout.tsx
│   └── page.tsx
├── components/                # Shared UI (Card, Button, Hero, ProjectCard, …)
├── content/blog/              # Markdown blog posts (frontmatter + body)
├── lib/                       # Typed content + helpers
│   ├── certifications.ts      # Certification[] — issuer / topics / skills / verify URL
│   ├── projects.ts            # Project[] — featured / hidden flags, image, tech, links
│   ├── constants.ts           # siteConfig, navigation, skills, social links
│   ├── blog.ts                # frontmatter loader for content/blog/*.md
│   └── utils.ts
├── public/                    # Static assets
│   ├── certifications/        # PDF certificates served via the cert detail page
│   ├── projects/              # Project hero images
│   └── resume.pdf             # Download target for the About page CTA
└── docs/superpowers/          # Design specs + plans (internal)
```

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

## Configuration

### Site identity (`lib/constants.ts`)

- `siteConfig.name` / `title` / `description` / `url` / `ogImage` / `location`
- `siteConfig.links` — `github`, `linkedin`, `twitter`, `email` (must use `mailto:` prefix), and any extra outbound links (e.g. `chromeStore`).
- `navigation[]` — top-bar links (currently Home / About / Projects / Certifications / Blog / Contact).
- `skills[]` — grouped skill chips rendered on the About page.

### Projects (`lib/projects.ts`)

Each `Project` accepts: `id`, `title`, `description`, optional `longDescription` / `category` / `status` / `role` / `highlights[]`, `image` (path under `public/projects/`), `tech[]` plus optional `techStack[]` (categorised), optional `github` / `live` URLs, `featured` flag (drives the home page rail), `hidden` flag (omits from public listings while keeping the detail page reachable), and `date`.

### Certifications (`lib/certifications.ts`)

Each `Certification` accepts: `id`, `title`, `issuer`, `platform`, `issueDate`, `credentialId`, `verifyUrl`, `pdf` (path under `public/certifications/`), and optional `skills[]` / `summary` / `topics[]`. Drop the issuer-supplied PDF into `public/certifications/<id>.pdf` to match the `pdf` field — the cert detail page renders it inline.

### Blog (`content/blog/*.md`)

Each post is a Markdown file with frontmatter:

```markdown
---
title: Your Post Title
date: 2026-03-31
excerpt: A 1–2 sentence summary used on the listing page.
tags: [engineering, salesforce]
author: James Collard
---

Body in Markdown…
```

### Résumé

Drop a PDF at `public/resume.pdf`. The hero CTA and the About page download link both target this path.

### Theme

Colour scale lives in `tailwind.config.ts` under `theme.extend.colors`. The current palette is black background with the Tailwind `purple-*` ramp plus a custom `purple` set (`dark` / `deep` / `accent` / `light`) used by gradients. Fonts are wired in `app/layout.tsx` (Inter from `next/font/google`).

## Responsive breakpoints

Tailwind defaults — `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. The layout is mobile-first; cards, hero, and navigation collapse cleanly under `md`.

## Deployment

### Vercel

1. Push to GitHub.
2. Import the repository in Vercel.
3. Vercel auto-detects Next.js — no env vars are required for the default build (the contact page is a `mailto:` CTA, so there's no email-service integration to wire up).

### Other hosts

The app builds with the standard `next build` output. For a fully static export, add `output: 'export'` to `next.config.js`; nothing in this codebase relies on server-only features.

## License

No license file is committed. Treat the source as "all rights reserved" — fork for personal reference, ask before redistributing.
