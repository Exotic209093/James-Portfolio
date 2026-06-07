# Setup Guide

Step-by-step walkthrough for running the portfolio locally and personalising it. For a higher-level tour, see [README.md](README.md).

## Prerequisites

- Node.js 20 or newer
- npm (bundled with Node) — yarn or pnpm also work, but examples use npm

## 1. Install dependencies

```bash
npm install
```

## 2. Configure site identity

Edit [`lib/constants.ts`](lib/constants.ts):

- `siteConfig.name` — Your name
- `siteConfig.title` — Headline / role
- `siteConfig.description` — SEO description
- `siteConfig.links` — GitHub, LinkedIn, Twitter, Chrome Web Store, email
- `navigation` — Top-nav menu items
- `skills` — Skill groups rendered on the About page

## 3. Add projects

Edit [`lib/projects.ts`](lib/projects.ts) and append a `Project` entry. Required fields are `id`, `title`, `description`, `image`, `tech`, `featured`, and `date`. Optional fields cover `longDescription`, `category`, `status`, `role`, `highlights`, `techStack` groups, `github`, `live`, and `hidden`.

Project images live in [`public/projects/`](public/projects); reference them as `/projects/<file>`. Both PNG and SVG are fine — SVGs render via the same `<Image>` pipeline as photos.

Set `featured: true` to surface a project on the home page. Set `hidden: true` to keep a record in the source but exclude it from `/projects`, history, the featured grid, and the dynamic slug route (Apex HQ uses this today).

## 4. Add certifications

1. Drop the PDF in [`public/certifications/<id>.pdf`](public/certifications) using a slug-style filename.
2. Append an entry to the `certifications` array in [`lib/certifications.ts`](lib/certifications.ts):
   ```ts
   {
     id: 'meta-version-control',
     title: 'Version Control',
     issuer: 'Meta',
     platform: 'Coursera',
     issueDate: '2026-05-01',
     credentialId: 'IKI0O5RMNTSR',
     verifyUrl: 'https://coursera.org/verify/IKI0O5RMNTSR',
     pdf: '/certifications/meta-version-control.pdf',
     skills: ['Git', 'GitHub', 'Branching', 'Code review'],
     summary: 'Short personal summary that explains the credential.',
     topics: ['Working tree, staging area, and commits', '...'],
   }
   ```
3. The card on `/certifications`, the per-cert detail page at `/certifications/<id>`, and the Recent Certifications preview on `/about` pick it up automatically.

## 5. Add or replace your résumé

Drop the file at [`public/resume.pdf`](public/resume.pdf). The hero “Download résumé” button and the About page link to that path verbatim.

## 6. Write blog posts (optional)

Create a new Markdown file in [`content/blog/`](content/blog) with frontmatter:

```markdown
---
title: Your post title
date: 2026-05-08
excerpt: A one-sentence teaser
tags: [next.js, salesforce]
author: James Collard
---

Your content here.
```

Markdown is parsed with `gray-matter` and rendered with `remark` + `remark-html` at request time — no build step required.

## 7. Contact CTA

The contact page is a static mailto link. Update the email address in [`lib/constants.ts`](lib/constants.ts) (`siteConfig.links.email`) and the `app/contact/page.tsx` button label as needed. There is no API route, no form submission, and no third-party email service to configure.

## 8. Theme tweaks (optional)

- Colours: [`tailwind.config.ts`](tailwind.config.ts) under `theme.extend.colors`.
- Fonts: [`app/layout.tsx`](app/layout.tsx) (Inter is loaded via `next/font/google` by default).
- Favicon: [`app/icon.svg`](app/icon.svg).

## 9. Run, lint, and build

```bash
npm run dev      # http://localhost:3000
npm run lint     # next/core-web-vitals ESLint config
npm run build    # Production build
npm start        # Serve the production build locally
```

## 10. Deploy to Vercel

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — no environment variables required for the default config.
4. Subsequent pushes to `main` redeploy automatically.

Your site is now live at `your-project.vercel.app`. Add a custom domain from the Vercel dashboard when you're ready.
