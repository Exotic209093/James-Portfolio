# James Collard — Portfolio

Personal portfolio site for [James Collard](https://jamescollard.vercel.app). Next.js 14 (App Router), TypeScript, Tailwind CSS, deployed on Vercel.

## Pages

| Path | Purpose |
|---|---|
| `/` | Hero, "open to work" badge, featured projects, contact CTA |
| `/about` | Bio, skills, photo |
| `/projects` | Full project listing with filters and sort |
| `/projects/[id]` | Individual project page — long description, role, highlights, tech stack |
| `/blog` | Blog index (Markdown-backed; see `content/blog/`) |
| `/blog/[slug]` | Individual blog post with frontmatter metadata |
| `/contact` | Contact CTA — opens the system mail client via `mailto:` |

## Project list

Projects are defined in [`lib/projects.ts`](lib/projects.ts). Currently shipped:

| Project | Status |
|---|---|
| **Vastify** — Salesforce storage-offload + three Claude Opus 4.7 agents | Cerebral Valley × Anthropic 4.7 Hackathon submission |
| **Nebula-Vault** — Salesforce AppExchange managed package, multi-cloud storage routing | Active build |
| **WaveLink** — Chrome extension for Salesforce data work | Published on the Chrome Web Store |
| **Git Navigator** — VS Code extension for git/GitHub workflows | Published on the Visual Studio Marketplace |
| **Salesforce Spreadsheet Formatter** — Python CLI for migration prep | Production-ready utility |
| **AI Email Triage Automation** — n8n + Node bridge → structured action recommendations | Prototype |
| **ExoCraft** — Three.js voxel sandbox with persistence and progression | [Live on Vercel](https://exo-craft.vercel.app/) |
| **ExoWare Kernel Driver** — Windows kernel-mode driver in C++ | Prototype |
| **Apex HQ** — Internal staff portal foundation (Next.js 14 + Prisma + NextAuth) | Hidden from public listings |

To add a project, append a new entry to the `allProjects` array in `lib/projects.ts` and drop a matching image into `public/projects/`. Set `featured: true` to surface on the homepage and `hidden: true` to keep an item out of public listings.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a black + deep-purple theme
- **Framer Motion** for hover and section animations
- **Lucide React** for icons
- **Markdown blog** via `gray-matter` + `remark` (no CMS)
- **Vercel** hosting

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Pushing to `main` auto-deploys to Vercel. The production site lives at <https://jamescollard.vercel.app>.

```bash
npm run build   # local production build
npm start       # serve the production bundle
```

## Customising

| To change… | Edit |
|---|---|
| Name, title, social links, location | [`lib/constants.ts`](lib/constants.ts) |
| Project list | [`lib/projects.ts`](lib/projects.ts) |
| Skills | `skills` array in [`lib/constants.ts`](lib/constants.ts) |
| Theme colours / fonts | [`tailwind.config.ts`](tailwind.config.ts), [`app/layout.tsx`](app/layout.tsx) |
| Blog posts | Markdown files in [`content/blog/`](content/blog/) |
| Resume PDF | Drop `resume.pdf` into [`public/`](public/) |

## Contact

Contact is handled via a `mailto:` link rather than an API-backed form. There is no contact API route to configure — the previous `/api/contact` endpoint was removed. See [`components/layout/Footer.tsx`](components/layout/Footer.tsx) and the contact CTAs across the site for the live wiring.

## Responsive breakpoints

- Mobile: < 640 px
- Tablet: 640 – 1024 px
- Desktop: > 1024 px

## License

MIT.
