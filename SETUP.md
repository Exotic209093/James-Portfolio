# Setup Guide

How to edit and run the portfolio locally, plus how to add content.

## 1. Install dependencies

```bash
npm install
```

## 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Hot reload covers
component edits, content under `lib/`, and Markdown under `content/`.

## 3. Edit site config

`lib/constants.ts` is the source of truth for:

- `siteConfig.name`, `siteConfig.title`, `siteConfig.description` — used in
  the hero, metadata, and OG tags.
- `siteConfig.url` — production URL, used by metadata.
- `siteConfig.location` — shown under the hero.
- `siteConfig.links` — `github`, `linkedin`, `twitter`, `email` (a
  `mailto:` URI), and `chromeStore`.
- `navigation` — top-nav links. Adding a route here also needs a page file
  under `app/<route>/page.tsx`.
- `skills` — `{ category, items[] }` groups rendered on `/about`.
- `socialLinks` — header + footer social icons (must match `lucide-react`
  icon names).

## 4. Add a project

Append a `Project` to the `allProjects` array in `lib/projects.ts`. The
shape (`lib/projects.ts`) supports:

| Field | Required | Purpose |
|---|---|---|
| `id` | yes | Slug used in `/projects/[slug]`. Lower-kebab-case. |
| `title`, `description` | yes | Card + listing copy. |
| `longDescription` | optional | Rendered on the detail page. |
| `category`, `status`, `role` | optional | Metadata badges on the detail page. |
| `highlights` | optional | Bullet list under the description. |
| `image` | yes | Path under `public/` (e.g. `/projects/foo.png`). |
| `tech` | yes | Short tech-tag list for the card. |
| `techStack` | optional | `{ category, items[] }` for the detail page. |
| `github`, `live` | optional | External links. |
| `featured` | yes | If `true`, surfaces on the home page. |
| `hidden` | optional | If `true`, omitted from public listings. |
| `date` | yes | ISO date (YYYY-MM-DD), used for sorting. |

Place the hero image in `public/projects/<id>.{png,svg,…}`.

## 5. Add a certification

Append a `Certification` to the `certifications` array in
`lib/certifications.ts`:

| Field | Purpose |
|---|---|
| `id` | Slug used in `/certifications/[id]`. |
| `title`, `issuer`, `platform` | Header copy on the card + detail page. |
| `issueDate` | ISO date (YYYY-MM-DD). |
| `credentialId`, `verifyUrl` | Linked from the **Verify on Credly** button. |
| `pdf` | Path under `public/certifications/` for the embedded PDF preview. |
| `skills` | Optional tag list. |
| `summary` | Optional one-paragraph blurb. |
| `topics` | Optional bullet list of covered topics. |

Put the credential PDF in `public/certifications/<filename>.pdf`.

## 6. Replace the resume

Drop your PDF at `public/resume.pdf`. The hero CTA and the About-page
download button both link there — no code change needed.

## 7. Write a blog post

Create `content/blog/<slug>.md` with frontmatter:

```markdown
---
title: Your Post Title
date: 2026-05-12
excerpt: A one-line description.
tags: [next.js, tooling]
author: James Collard
---

Markdown body…
```

The loader in `lib/blog.ts` reads frontmatter via `gray-matter` and renders
the body with `remark`. No registry to update.

## 8. Contact

The `/contact` page is a `mailto:` CTA. There is no API route, no form
handler, and no secret to provision. To change the destination address,
edit `siteConfig.links.email` in `lib/constants.ts`.

## 9. Customize the theme

`tailwind.config.ts` defines the colour palette (black background, deep
purple primaries, purple gradient accents). Fonts are configured in
`app/layout.tsx` (Inter via `next/font/google`).

## 10. Build for production

```bash
npm run build
npm start
```

## 11. Deploy

Push to the default branch. Vercel auto-builds via `vercel.json`. No
environment variables are required because the contact flow is mailto-only.

To use a custom domain, add it in the Vercel project's **Domains** tab and
update `siteConfig.url` in `lib/constants.ts` so metadata + OG tags resolve
correctly.

---

Happy shipping.
