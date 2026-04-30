# Setup guide

A step-by-step walkthrough for forking this site and making it your own. If you only need a high-level overview, start with the [README](./README.md).

## Prerequisites

- **Node.js 18.17+** (Next.js 14 requirement)
- **npm 9+** (or pnpm / yarn — the lockfile is npm)
- A code editor with TypeScript support

## 1. Install dependencies

```bash
npm install
```

## 2. Configure site metadata

Edit `lib/constants.ts`:

| Field                    | What it controls                                                  |
| ------------------------ | ----------------------------------------------------------------- |
| `siteConfig.name`        | Your name (used in metadata, footer, and the header logo).        |
| `siteConfig.title`       | Your role tagline.                                                |
| `siteConfig.description` | Used by `<meta>` description and OpenGraph.                       |
| `siteConfig.url`         | Canonical URL (set this to your deployed domain).                 |
| `siteConfig.location`    | Shown in the hero and footer.                                     |
| `siteConfig.links`       | `twitter`, `github`, `linkedin`, `email`, `chromeStore`.          |
| `navigation`             | Top-nav entries. Routes must exist under `app/`.                  |
| `skills`                 | Skill groups rendered on `/about`.                                |
| `socialLinks`            | Icon + href pairs for the footer connect row.                     |

> The footer expects `siteConfig.links.email` to be a `mailto:` URL — it powers the email entry in the connect row and the CTA on `/contact`.

## 3. Add your projects

Edit `lib/projects.ts`. Each entry follows the `Project` type:

```ts
{
  id: 'project-slug',           // URL slug for /projects/[slug]
  title: 'Project Title',
  description: 'One-line summary.',
  longDescription: '…',         // optional, rendered on detail page
  image: '/projects/slug.png',  // see step 3a
  tech: ['TypeScript', 'Next.js'],
  github: 'https://github.com/...',
  live: 'https://...',          // optional
  featured: true,               // shown on the homepage featured grid
  hidden: false,                // omit from public listings entirely
  date: '2026-04-26',
}
```

### 3a. Project images

Place each project image at `public/projects/<id>.png` (or `.svg`). The slug must match the project `id`. Real screenshots beat placeholder SVGs — the existing entries (Vastify, ExoCraft, WaveLink) use captured screenshots.

### 3b. Hiding a work-in-progress project

Set `hidden: true` to omit a project from the index, featured grid, history, and slug routes without deleting it. This is how Apex HQ stays parked until launch.

## 4. Add your certifications

Edit `lib/certifications.ts`. Each entry:

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
  skills: ['Python', 'OOP'],
}
```

Then drop the issued certificate PDF into `public/certifications/` so the linked download resolves. `getRecentCertifications(limit)` is consumed by the **Recent certifications** strip on `/about`.

## 5. Add your resume

1. Export your resume as a PDF.
2. Save it to `public/resume.pdf`.

The Hero and About download buttons link to `/resume.pdf` directly — no further wiring required.

## 6. Add blog posts (optional)

1. Create a Markdown file in `content/blog/` (the filename becomes the slug).
2. Add frontmatter:

```markdown
---
title: Your Post Title
date: 2026-04-30
excerpt: A single-sentence summary used on the index page.
tags: [next.js, typescript]
author: James Collard
---

Your post body in Markdown…
```

`lib/blog.ts` parses frontmatter with `gray-matter` and renders the body with `remark` + `remark-html`.

## 7. Wire up the contact page

`/contact` opens the user's mail client via a `mailto:` link sourced from `siteConfig.links.email` — there is **no backend route to configure**. The previously orphaned `/api/contact` route has been removed.

If you want a true server-side form later, add a new route under `app/api/` and integrate with [Resend](https://resend.com), [Formspree](https://formspree.io), or similar. There is no plumbing to remove first.

## 8. Customise the theme (optional)

- Colours, gradients, and font sizes live in `tailwind.config.ts` under `theme.extend`.
- Global CSS variables and base styles are in `app/globals.css`.
- Replace `app/icon.svg` to change the favicon.

## 9. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Hot reload picks up edits to `lib/`, `app/`, `components/`, and `content/` automatically.

## 10. Build for production

```bash
npm run build
npm start
```

`npm run build` should complete with no TypeScript or ESLint errors before you deploy.

## 11. Deploy to Vercel

1. Push the repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Vercel auto-detects Next.js — accept the defaults.
4. (Optional) Add a custom domain in the project settings.

No environment variables are required for the default build.

## Verification checklist

Before declaring it done, click through:

- [ ] `/` — hero, photo slot, featured grid, recent certifications strip, mailto CTA.
- [ ] `/about` — bio, skills sections, certifications, education entry.
- [ ] `/projects` — every visible project has an image and the right links.
- [ ] `/projects/[slug]` for at least one featured project — long description renders.
- [ ] `/certifications` — every PDF download resolves, every verify link opens the issuer page.
- [ ] `/blog` and one post — Markdown renders, frontmatter values appear.
- [ ] `/contact` — clicking the CTA opens a pre-filled compose window in the default mail client.
- [ ] Footer connect row — every icon links to the right URL, including the Chrome Web Store entry if you keep it.

## Next steps

- Add analytics (Vercel Analytics, Plausible, or GA4 via `app/layout.tsx`).
- Set up a custom domain in Vercel.
- Wire up a real backend for `/contact` if a mailto link is not enough.
- Replace placeholder project SVGs with real product screenshots as projects ship.

Happy building.
