# Setup Guide

Step-by-step checklist for running and personalising this portfolio. See
`README.md` for the full reference.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure site information

Edit `lib/constants.ts`:

- `siteConfig.name`, `siteConfig.title`, `siteConfig.description`,
  `siteConfig.url`, `siteConfig.location`
- `siteConfig.links` — `github`, `linkedin`, `twitter`, `email` (keep the
  `mailto:` prefix), `chromeStore`
- `navigation` — header menu items
- `skills` — skills grouped by category

## 3. Add your projects

Edit the `allProjects` array in `lib/projects.ts`. Required fields: `id`,
`title`, `description`, `image`, `tech`, `featured`, `date`. Optional:
`longDescription`, `category`, `status`, `role`, `highlights`, `techStack`,
`github`, `live`, `hidden`. Put images in `public/projects/`. See the
"Add a project" section of `README.md` for the full shape and field meanings.

## 4. Add your certifications

Save the certificate PDF in `public/certifications/` as
`<issuer>-<course-slug>.pdf`, then add an entry to `lib/certifications.ts`
(`id`, `title`, `issuer`, `platform`, `issueDate`, `credentialId`,
`verifyUrl`, `pdf`; optional `skills`, `summary`, `topics`). It appears on
`/certifications` and the `/about` preview automatically, newest-first.

## 5. Add your resume

Place your resume PDF at `public/resume.pdf`.

## 6. Add blog posts (optional)

Create a Markdown file in `content/blog/` with frontmatter:

```markdown
---
title: Your Post Title
date: 2026-05-01
excerpt: A brief description of your post
tags: [tag1, tag2]
author: James Collard
---

Your content in Markdown...
```

## 7. Contact

The contact page is a static `mailto:` link — there is no form or backend.
Set the address via `siteConfig.links.email` in `lib/constants.ts`.

## 8. Customise colours (optional)

Edit `tailwind.config.ts` to adjust the theme (black background, deep-purple
primary, purple gradient accents). Fonts are configured in `app/layout.tsx`
(Inter from Google Fonts).

## 9. Run, lint, and build

```bash
npm run dev      # http://localhost:3000
npm run lint     # ESLint
npm run build    # production build
npm start        # serve the production build
```

## 10. Deploy to Vercel

1. Push to the repository.
2. Import the repo at [vercel.com](https://vercel.com) — Next.js is
   auto-detected.
3. `vercel.json` pins the build region to `iad1`; no environment variables
   are required.

Your site goes live at the assigned Vercel URL (custom domains configurable
in the Vercel dashboard).
