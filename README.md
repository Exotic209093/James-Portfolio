# James Portfolio

A modern, performance-first portfolio site built with Next.js 14 (App Router),
TypeScript, and Tailwind CSS. Showcases shipped projects, Meta back-end
developer certifications, and long-form writing — with no contact form,
no third-party tracking, and a black/deep-purple theme tuned for low light.

## Pages

| Path | Purpose |
|---|---|
| `/` | Hero, "open to work" badge, about preview, featured projects, recent certifications |
| `/about` | Bio, skills, experience |
| `/projects` | All public projects with images |
| `/projects/[slug]` | Per-project detail page |
| `/certifications` | All Meta back-end certifications |
| `/certifications/[slug]` | Per-certification detail page (PDF embed + transcript link) |
| `/blog` | Markdown blog index |
| `/blog/[slug]` | Per-post page |
| `/contact` | `mailto:` CTA (no form, no API route) |

## Content

### Projects

Visible projects are defined in [`lib/projects.ts`](lib/projects.ts):

| Project | Featured | Notes |
|---|---|---|
| Vastify | yes | Hackathon project; renders project images |
| Nebula-Vault | yes | |
| WaveLink | yes | Chrome Web Store listing linked from the footer |
| Salesforce Spreadsheet Formatter | yes | |
| AI Email Triage Automation | no | |
| ExoCraft | no | Live deployment + real gameplay screenshot |
| Git Navigator | yes | |
| ExoWare Kernel Driver | no | |

Apex HQ is intentionally `hidden: true` — kept in the data file for future
re-listing but not rendered in any public route.

### Certifications

All entries live in [`lib/certifications.ts`](lib/certifications.ts) and
PDFs in [`public/certifications/`](public/certifications/) — see
[`public/certifications/README.md`](public/certifications/README.md) for the
file-naming convention.

| # | Certification | Issuer |
|---|---|---|
| 1 | Meta Back-End Developer **Professional Certificate** | Meta (Coursera) |
| 2 | Back-End Developer Capstone | Meta (Coursera) |
| 3 | The Full Stack | Meta (Coursera) |
| 4 | APIs | Meta (Coursera) |
| 5 | Coding Interview Preparation | Meta (Coursera) |
| 6 | Django Web Framework | Meta (Coursera) |
| 7 | Introduction to Databases for Back-End Development | Meta (Coursera) |
| 8 | Version Control | Meta (Coursera) |
| 9 | Introduction to Back-End Development | Meta (Coursera) |
| 10 | Programming in Python | Meta (Coursera) |

## Tech stack

- **Next.js 14** (App Router) on Node 18+
- **TypeScript** (strict)
- **Tailwind CSS 3** (utility-first; deep-purple theme)
- **Framer Motion** (page + element animations)
- **React Hook Form + Zod** (form validation, kept for future use)
- **Lucide React** (icons)
- **gray-matter + remark + remark-html** (Markdown blog pipeline)
- **Vercel** (hosting + edge cache)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

## Repository layout

```
app/                 Next.js App Router routes
components/          Reusable UI (Hero, ProjectCard, Footer, …)
content/blog/        Markdown blog posts (frontmatter + body)
lib/                 Data sources (projects, certifications, blog),
                     site constants, utility helpers
public/              Static assets — favicons, project images,
                     certifications/<slug>.pdf
docs/                Long-form notes
SETUP.md             Step-by-step content authoring workflow
CHANGELOG.md         Dated release notes (Keep a Changelog format)
```

## Authoring content

See [`SETUP.md`](SETUP.md) for the full workflow. Quick reference:

- **Add a project** — append to `lib/projects.ts` (use `featured: true` to
  surface on the home page; use `hidden: true` to keep in data without
  rendering).
- **Add a certification** — append to `lib/certifications.ts` and place the
  PDF at `public/certifications/<slug>.pdf`.
- **Add a blog post** — drop a Markdown file into `content/blog/` with
  frontmatter (`title`, `date`, `excerpt`, `tags`, `author`).
- **Update site identity** — `lib/constants.ts`.

## Deployment

The site is hosted on **Vercel** with the configuration in
[`vercel.json`](vercel.json). Pushes to the default branch deploy to
production; PR branches get preview deployments automatically.

## Resume

Drop the latest CV at `public/resume.pdf`. The hero CTA and About-page
download button link to it; no other configuration is required.

## License

MIT — see [`LICENSE`](LICENSE) (if present) or the package metadata.

## Changelog

Dated release notes live in [`CHANGELOG.md`](CHANGELOG.md), formatted per
[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) and
following [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).
