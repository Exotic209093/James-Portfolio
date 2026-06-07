# James Collard — Portfolio

Personal portfolio site for [James Collard](https://jamescollard.vercel.app), a software engineer in Kent, UK. Built with Next.js 14 App Router, TypeScript, and Tailwind CSS, deployed to Vercel.

The site showcases shipped projects (a published Chrome extension, a published VS Code extension, an Anthropic hackathon submission, a Salesforce AppExchange package, and more), Coursera/Meta back-end certifications, and a small Markdown blog.

## Features

- **Modern dark UI** — black + deep-purple theme with a subtle glass-morphism palette
- **Fully responsive** — mobile-first layout, tested down to 360 px
- **Type-safe content** — projects, certifications, and blog posts are typed TypeScript modules, not runtime CMS calls
- **Per-cert detail pages** — every certification has its own `/certifications/<id>` route with summary, topics, skills, and inline PDF preview
- **Per-project detail pages** — `/projects/<id>` with role, highlights, and grouped tech stack
- **Markdown blog** — posts under `content/blog/` with frontmatter (title, date, excerpt, tags, author)
- **Static-first** — no API routes; the contact CTA is a `mailto:` link, no email-service vendor required
- **Fast** — optimised for Core Web Vitals, statically rendered where possible

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, featured projects, About preview, Recent Certifications preview, contact CTA |
| `/about` | Bio, skills, education, experience, recent certifications |
| `/projects` | All non-hidden projects from `lib/projects.ts` |
| `/projects/[id]` | Per-project detail page (long description, role, highlights, tech stack, links) |
| `/certifications` | All certifications from `lib/certifications.ts` |
| `/certifications/[id]` | Per-certification detail (summary, topics, skills, verify link, inline PDF) |
| `/blog` | Blog index, sourced from `content/blog/*.md` |
| `/blog/[slug]` | Individual post |
| `/contact` | `mailto:` CTA — there is no API route |

## Featured projects

Live list lives in [`lib/projects.ts`](lib/projects.ts). Current featured projects:

| Project | Status | Link |
|---|---|---|
| **Vastify** | Cerebral Valley × Anthropic 4.7 Hackathon submission — three Claude Opus 4.7 agents on the Anthropic Agent SDK | [GitHub](https://github.com/Exotic209093/Vastify) |
| **Git Navigator Pro** | Published on the Visual Studio Marketplace — sidebar git/GitHub workflow with a custom commit graph | [Marketplace](https://marketplace.visualstudio.com/items?itemName=Exotic209093.git-navigator-exotic209093) |
| **WaveLink** | Published on the Chrome Web Store — Salesforce data toolkit (push, SOQL, schema diff, faker test data, Ctrl+Z undo) | [Chrome Web Store](https://chromewebstore.google.com/detail/wavelink-salesforce-data/ccknhhibbedolfnbgnenomdohlmojblo) |
| **Nebula-Vault** | Salesforce AppExchange managed package — multi-cloud file storage (S3 / Azure / GCS / OneDrive / Dropbox) | [GitHub](https://github.com/Exotic209093/Nebula-Vault) |
| **Salesforce Spreadsheet Formatter** | Python CLI that normalises CSV / XLSX exports for Data Loader import | [GitHub](https://github.com/Exotic209093/Salesforce-Data-Formator) |
| **ExoCraft** | Three.js voxel sandbox with persistent saves and progression systems | [Live](https://exo-craft.vercel.app/) |

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3, custom dark theme in `tailwind.config.ts` |
| Animation | Framer Motion 11 |
| Forms / validation | React Hook Form + Zod (kept for future use; contact page is `mailto:`) |
| Icons | Lucide React |
| Markdown | gray-matter + remark + remark-html (for the blog) |
| Deployment | Vercel (config in `vercel.json`) |

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm start            # serve the production build locally
npm run lint         # next lint
```

## Customising for your own portfolio

This repo is a fork-friendly template. The pieces you most commonly edit:

| File | What it controls |
|---|---|
| `lib/constants.ts` | `siteConfig` (name, title, description, links), navigation items, skills |
| `lib/projects.ts` | Project catalogue + types — add objects to `allProjects`; set `hidden: true` to keep one out of public listings |
| `lib/certifications.ts` | Certifications catalogue + types — drop the PDF in `public/certifications/<id>.pdf` and the verify URL |
| `content/blog/*.md` | Blog posts (Markdown with frontmatter: `title`, `date`, `excerpt`, `tags`, `author`) |
| `public/projects/` | Project images (SVG or PNG); referenced by `image:` field |
| `public/certifications/` | Certification PDFs |
| `public/resume.pdf` | Resume — linked from the Hero and About pages |
| `app/layout.tsx` | Global metadata, fonts, structure |
| `tailwind.config.ts` | Colour scheme + theme tokens |

See [`SETUP.md`](SETUP.md) for a step-by-step walkthrough.

## Deployment

This site is deployed to [Vercel](https://vercel.com). Push to `main` triggers a production build automatically. The build is a vanilla Next.js project — Vercel auto-detects everything; no environment variables are required for the default configuration.

For a custom domain, configure it in the Vercel dashboard.

## Project structure

```
app/                  # Next.js App Router routes
  about/              # /about
  blog/               # /blog and /blog/[slug]
  certifications/     # /certifications and /certifications/[id]
  contact/            # /contact (mailto CTA)
  projects/           # /projects and /projects/[id]
  layout.tsx          # Root layout (metadata, fonts)
  page.tsx            # Home
components/           # Reusable React components (Hero, ProjectCard, etc.)
content/blog/         # Markdown blog posts
docs/                 # Internal docs (not rendered)
lib/                  # Typed content modules and helpers
  constants.ts        # Site config + skills + nav
  projects.ts         # Project catalogue
  certifications.ts   # Certification catalogue
public/               # Static assets (images, PDFs, favicon)
tailwind.config.ts    # Theme + colours
next.config.js        # Next.js config
vercel.json           # Vercel deployment config
```

## License

MIT — see [LICENSE](LICENSE) if present, otherwise `package.json`. Fork it and make it yours.
