# James Collard — Portfolio

Personal portfolio site for **James Collard**, a Software Engineer based in
Kent, United Kingdom. It showcases production-grade projects (AI agents,
Salesforce AppExchange packages, browser and editor extensions, data tooling),
the full Meta Back-End Developer certification track, and a Markdown-driven
blog.

**Live:** https://jamescollard.vercel.app

## Tech stack

- **Framework:** Next.js 14 (App Router) + React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS (black / deep-purple theme)
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Content:** Markdown blog rendered with `gray-matter` + `remark` / `remark-html`
- **Utilities:** `clsx`, `tailwind-merge`
- **Hosting:** Vercel (`vercel.json` pins the build region to `iad1`)

> `react-hook-form`, `zod`, and `@hookform/resolvers` are listed as
> dependencies but are not currently used — the contact page is a static
> `mailto:` link, not a form. Keep them if you plan to add a form; otherwise
> they can be removed.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint (`next lint`) |

No test suite is configured.

## Project structure

```
app/
  page.tsx                Home (hero, experience preview, featured projects, contact CTA)
  about/                  Bio, skills, experience, recent certifications, resume
  projects/               Project listing
  projects/[slug]/        Project detail
  certifications/         Certification listing
  certifications/[id]/    Certification detail (PDF embed, verify link, topics)
  blog/                   Blog listing
  blog/[slug]/            Blog post
  contact/                Contact (static mailto, no form)
components/
  layout/  projects/  sections/  ui/
content/
  blog/                   Markdown blog posts
lib/
  constants.ts            Site config, navigation, skills, social links
  projects.ts             Project data, interface, and helpers
  certifications.ts       Certification data, interface, and helpers
  blog.ts                 Markdown post loading
  utils.ts                Shared helpers
public/
  certifications/         Certificate PDFs
  projects/               Project images
  resume.pdf              Downloadable resume
docs/                     Internal design specs / plans (not contributor docs)
```

## Content authoring

### Site configuration

Edit `lib/constants.ts`:

- `siteConfig` — name, title, description, URL, location, and social/email links
- `navigation` — header menu items
- `skills` — skills grouped by category

### Add a project

Add an entry to the `allProjects` array in `lib/projects.ts`:

```ts
{
  id: 'my-project',                 // URL slug -> /projects/my-project
  title: 'My Project',
  description: 'One-line summary shown on cards.',
  longDescription: 'Full paragraph for the detail page.', // optional
  category: 'Salesforce Tooling',   // optional
  status: 'Published',              // optional
  role: 'What you did on it.',      // optional
  highlights: ['Key point', '...'], // optional, bulleted on detail page
  image: '/projects/my-project.png',
  tech: ['TypeScript', 'Next.js'],  // chips
  techStack: [                      // optional, grouped on detail page
    { category: 'Frontend', items: ['React', 'Tailwind CSS'] },
  ],
  github: 'https://github.com/...', // optional
  live: 'https://...',              // optional
  featured: true,                   // show on the home page
  hidden: false,                    // true = excluded from all listings
  date: '2026-05-01',               // YYYY-MM-DD, drives ordering
}
```

Place the image in `public/projects/`. `featured: true` surfaces the project
on the home page; `hidden: true` removes it from every listing.

### Add a certification

Drop the PDF in `public/certifications/` using a slug filename
(`<issuer>-<course-slug>.pdf`) and add an entry to `lib/certifications.ts`:

```ts
{
  id: 'meta-version-control',
  title: 'Version Control',
  issuer: 'Meta',
  platform: 'Coursera',
  issueDate: '2026-05-01',          // YYYY-MM-DD, newest-first sort
  credentialId: 'XXXXXXXXXXXX',
  verifyUrl: 'https://coursera.org/verify/XXXXXXXXXXXX',
  pdf: '/certifications/meta-version-control.pdf',
  skills: ['Git', 'GitHub', 'Branching'],                  // optional, chips
  summary: 'One-paragraph description for the detail page.', // optional
  topics: ['Topic one', 'Topic two'],                       // optional, bulleted
}
```

`/certifications` and the "Recent Certifications" preview on `/about` pick it
up automatically. `summary` and `topics` populate the detail page — omitting
them renders a thin page. See `public/certifications/README.md` for the same
workflow.

### Add a blog post

Create a Markdown file in `content/blog/` with frontmatter:

```markdown
---
title: Post Title
date: 2026-05-01
excerpt: Short description for the listing.
tags: [nextjs, typescript]
author: James Collard
---

Post content in Markdown...
```

### Resume

Replace `public/resume.pdf`. The About page and hero download button link to
it automatically.

## Contact

The `/contact` page is static and links directly to the email address in
`lib/constants.ts` (`siteConfig.links.email`). There is **no contact form, API
route, or email-service integration**. To change the address, edit
`siteConfig.links.email` (keep the `mailto:` prefix).

## Deployment

Hosted on Vercel. Pushing to the deployment branch triggers a build; Vercel
auto-detects Next.js and `vercel.json` pins the build region to `iad1`. No
environment variables are required.

## License

MIT.
