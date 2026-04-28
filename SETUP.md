# Setup Guide

End-to-end setup for working on this portfolio locally.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure your information

### Site config

Edit [`lib/constants.ts`](lib/constants.ts):

- `siteConfig.name`, `siteConfig.title`, `siteConfig.description`
- `siteConfig.url` — production URL (used for OG metadata)
- `siteConfig.location`
- `siteConfig.links` — `github`, `linkedin`, `twitter`, `email`, `chromeStore`

### Navigation

The `navigation` array drives the header. Add or rename entries to change the menu.

### Skills

The `skills` array on the About page is grouped by category — each entry is `{ category, items: string[] }`.

## 3. Add a project

Append a new entry to the `allProjects` array in [`lib/projects.ts`](lib/projects.ts):

```ts
{
  id: 'kebab-case-slug',          // also the URL: /projects/kebab-case-slug
  title: 'Project Title',
  description: 'One-sentence elevator pitch.',
  longDescription: 'Paragraph-form deeper explanation.',
  category: 'Category Label',
  status: 'Active build' | 'Production-ready' | 'Prototype' | …,
  role: 'What you did on it.',
  highlights: ['Bullet 1', 'Bullet 2', 'Bullet 3'],
  image: '/projects/your-image.png',
  tech: ['TypeScript', 'Next.js', …],
  techStack: [{ category: 'Frontend', items: ['…'] }, …],   // optional, deeper grouping
  github: 'https://github.com/…',                            // optional
  live: 'https://…',                                          // optional
  featured: true,                                             // surface on homepage
  hidden: false,                                              // hide from public listings
  date: '2026-04-26',
}
```

Drop the project image into [`public/projects/`](public/) — PNG or SVG both work.

## 4. Resume

Place `resume.pdf` in [`public/`](public/). The hero and About download buttons link to `/resume.pdf` automatically.

## 5. Add blog posts

Create a Markdown file in [`content/blog/`](content/blog/). Frontmatter is required:

```markdown
---
title: Your Post Title
date: 2026-04-26
excerpt: A brief description of the post.
tags: [tag1, tag2]
author: James Collard
---

Your content here, in Markdown.
```

The blog index is generated at build time — no extra configuration required.

## 6. Contact

Contact is handled via a `mailto:` link, so no backend setup is needed. To change the address, update `siteConfig.links.email` in [`lib/constants.ts`](lib/constants.ts).

## 7. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 8. Production build

```bash
npm run build   # generate the .next bundle
npm start       # serve the bundle on port 3000
```

## 9. Deploy

The site auto-deploys to Vercel on every push to `main`. To wire a new fork:

1. Push the repo to GitHub.
2. Import the repository at <https://vercel.com/new>.
3. Vercel detects Next.js and configures the build automatically.
4. Add a custom domain under **Settings → Domains** if you want one.

There are no required environment variables — the site is fully static apart from Markdown rendering.

## Next steps

- Add project images to [`public/projects/`](public/projects/).
- Write blog posts in [`content/blog/`](content/blog/).
- Set up Vercel Analytics or Plausible if you want traffic data.
- Configure a custom domain.
