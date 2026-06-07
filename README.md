# James Collard - Portfolio

Production portfolio site for James Collard, a software engineer focused on Salesforce platform engineering, AI agents, and full-stack tooling. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, deployed on Vercel.

**Live:** [jamescollard.dev](https://jamescollard.dev)

## Highlights

- **Featured projects** include Vastify (Cerebral Valley × Anthropic 4.7 Hackathon submission), [Git Navigator Pro](https://marketplace.visualstudio.com/items?itemName=Exotic209093.git-navigator-exotic209093) on the Visual Studio Marketplace, and [WaveLink](https://chromewebstore.google.com/detail/wavelink-salesforce-data/ccknhhibbedolfnbgnenomdohlmojblo) on the Chrome Web Store.
- **Certifications** page with per-credential detail views, including the full Meta Back-End Developer Professional Certificate track (umbrella, capstone, and all nine constituent courses).
- **Mobile-first dark theme** with deep purple accents, glass-morphism surfaces, and Framer Motion micro-interactions.
- **Static-by-default content model** — projects, certifications, skills, and blog posts are typed TypeScript modules and Markdown, no CMS required.

## Tech Stack

| Layer | Stack |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Markdown | gray-matter + remark / remark-html |
| Icons | lucide-react |
| Hosting | Vercel |

## Project Structure

```
james-portfolio/
├── app/                       Next.js App Router pages
│   ├── about/                   Bio, skills, recent certifications preview
│   ├── blog/                    Blog index + dynamic [slug] route
│   ├── certifications/          Certifications index + dynamic [id] route
│   ├── contact/                 Mailto-based contact page
│   ├── projects/                Projects index + dynamic [slug] route
│   ├── icon.svg                 Favicon
│   └── layout.tsx               Root layout, metadata, fonts
├── components/                Shared React components
├── content/blog/              Markdown blog posts (frontmatter + body)
├── lib/                       Typed content modules
│   ├── certifications.ts        Certification type + getCertifications() etc.
│   ├── projects.ts              Project type + featured / hidden / history helpers
│   └── constants.ts             Site config, navigation, skills
├── public/
│   ├── certifications/          PDF certificates served by /certifications/<id>
│   ├── projects/                Project images / SVGs
│   └── resume.pdf               Downloadable résumé
├── docs/                      Internal notes
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero with open-to-work badge, About preview, Featured Projects, Recent Certifications, contact CTA |
| `/about` | Full bio, skills (Frameworks & Runtimes, Languages, Tools), education, recent certifications preview |
| `/projects` | Listing of all visible projects, sorted by date |
| `/projects/[slug]` | Long-form project page with techStack, role, highlights, image, GitHub / live links |
| `/certifications` | Listing of all certifications, sorted by date |
| `/certifications/[id]` | Per-certification page with summary, topics, skills, inline PDF preview, Verify and direct PDF links |
| `/blog` | Markdown blog index |
| `/blog/[slug]` | Individual blog post |
| `/contact` | Mailto-based contact CTA (no API route, no form submission) |

## Local Development

Node 20+ recommended.

```bash
npm install
npm run dev
```

Opens on [http://localhost:3000](http://localhost:3000).

```bash
npm run lint     # ESLint (next/core-web-vitals)
npm run build    # Production build
npm start        # Run the production build locally
```

See [SETUP.md](SETUP.md) for a step-by-step walkthrough including content authoring, project / certification data, and deployment.

## Editing Content

All site content is data-driven — there's no CMS to log into and no backend.

| What you want to change | Where to edit |
|---|---|
| Site name, tagline, social links, navigation, skills | [`lib/constants.ts`](lib/constants.ts) |
| Projects (featured, hidden, history) | [`lib/projects.ts`](lib/projects.ts) |
| Certifications | [`lib/certifications.ts`](lib/certifications.ts) + drop PDF in [`public/certifications/`](public/certifications) |
| Project imagery | Drop into [`public/projects/`](public/projects) and reference by `image: '/projects/<file>'` |
| Blog posts | Add a Markdown file to [`content/blog/`](content/blog) with `title`, `date`, `excerpt`, `tags`, `author` frontmatter |
| Résumé | Replace [`public/resume.pdf`](public/resume.pdf) |
| Theme colours | [`tailwind.config.ts`](tailwind.config.ts) |

### Hiding a project without deleting it

Projects with `hidden: true` are excluded from `/projects`, the featured section, history, and the dynamic slug route. Use this for work that isn't ready for public view yet (Apex HQ uses this today).

### Adding a certification

1. Drop the PDF in `public/certifications/<id>.pdf`.
2. Append a `Certification` entry to the `certifications` array in [`lib/certifications.ts`](lib/certifications.ts) with matching `id`, `pdf`, optional `summary`, `topics`, and `skills`.
3. The `/certifications` index, the per-cert detail page, and the About-page preview pick it up automatically.

## Deployment

The site deploys to Vercel from `main`. Push to `main` and Vercel rebuilds automatically. There are no required environment variables.

For a manual deploy:

```bash
npm run build
vercel --prod
```

## License

MIT. See [LICENSE](LICENSE) if present, or use freely as a starting point for your own portfolio.
