# Setup Guide

Get a local copy of the portfolio running and customised in about ten minutes.

## 1. Install dependencies

```bash
npm install
```

Requires Node.js 18+ (Next.js 14 requirement).

## 2. Configure your information

Edit [`lib/constants.ts`](lib/constants.ts):

- `siteConfig.name` — your name
- `siteConfig.title` — your title / role
- `siteConfig.description` — used in `<meta>` tags and the OG card
- `siteConfig.url` — your deployed URL
- `siteConfig.location` — optional, surfaced in the About page
- `siteConfig.links` — `twitter`, `github`, `linkedin`, `email` (use `mailto:`), and any extra link such as `chromeStore`

Update the `navigation` array if you want to add or remove top-nav items. Update the `skills` array — it's grouped by category and rendered on the About page.

## 3. Add your projects

Projects live in [`lib/projects.ts`](lib/projects.ts). Each entry conforms to the `Project` type:

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Used in the URL: `/projects/<id>` |
| `title` | Yes | Display name |
| `description` | Yes | One-paragraph card summary |
| `longDescription` | No | Detail-page paragraph |
| `category` / `status` / `role` | No | Surfaced on the detail page |
| `highlights` | No | Bulleted achievements |
| `image` | Yes | Path under `public/` (e.g. `/projects/foo.png`) |
| `tech` | Yes | Flat list rendered on the card |
| `techStack` | No | Grouped tech list rendered on the detail page |
| `github` / `live` | No | Link icons on the card |
| `featured` | Yes | If `true`, shown on the home page |
| `hidden` | No | If `true`, the project is filtered out of all public listings |
| `date` | Yes | `YYYY-MM-DD`; used for sorting |

## 4. Add your certifications

Certifications live in [`lib/certifications.ts`](lib/certifications.ts). Each entry conforms to the `Certification` type:

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Used in the URL: `/certifications/<id>` |
| `title` / `issuer` / `platform` | Yes | Card heading text |
| `issueDate` | Yes | `YYYY-MM-DD`; used for sorting |
| `credentialId` / `verifyUrl` | Yes | Verify link on the card |
| `pdf` | Yes | Path under `public/certifications/` (e.g. `/certifications/meta-django-web-framework.pdf`) — rendered inline on the detail page |
| `skills` | No | Pill list rendered on the detail page |
| `summary` / `topics` | No | Personal write-up + topics-covered checklist on the detail page |

Drop the PDF in `public/certifications/` so the inline preview can load.

## 5. Add your resume

Export your CV as a PDF and save it to `public/resume.pdf`. The Hero and About pages link to it automatically.

## 6. Add blog posts (optional)

Create Markdown files in `content/blog/` with frontmatter:

```markdown
---
title: Your Post Title
date: 2026-01-15
excerpt: A brief description of the post.
tags: [web-development, next-js]
author: Your Name
---

Your post content here in Markdown…
```

## 7. Customise the theme (optional)

Edit [`tailwind.config.ts`](tailwind.config.ts) to change the colour palette. The default theme is black (`#000`) + deep purple. Fonts are configured in [`app/layout.tsx`](app/layout.tsx) — Inter from Google Fonts by default.

## 8. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## 9. Build and deploy

```bash
npm run build        # production build
npm start            # serve the build locally
```

Deploy to [Vercel](https://vercel.com):

1. Push to GitHub.
2. Import the repo in Vercel — it auto-detects Next.js.
3. (Optional) Configure a custom domain in the Vercel dashboard.

No environment variables are required for the default configuration.

## Next steps

- Add project images to `public/projects/` (SVG or PNG)
- Add certification PDFs to `public/certifications/`
- Write blog posts in `content/blog/`
- Wire up Vercel Analytics or your analytics provider of choice
- Set up a custom domain in Vercel
