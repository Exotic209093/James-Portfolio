# Portfolio Website

A modern, clean portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a black and deep purple theme with smooth animations and excellent user experience.

## 🚀 Features

- **Modern Design**: Clean, black/deep purple theme with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Optimized for Core Web Vitals
- **SEO Friendly**: Built with Next.js for excellent SEO
- **Smooth Animations**: Framer Motion for delightful user interactions
- **Type Safe**: Full TypeScript support
- **Vercel Ready**: Optimized for Vercel deployment

## 📄 Pages

- **Home** (`/`): Hero section, about preview, featured projects, contact CTA
- **About** (`/about`): Full bio, skills, experience, and a "Recent Certifications" preview
- **Projects** (`/projects`, `/projects/[slug]`): Project listing and individual project detail pages
- **Certifications** (`/certifications`, `/certifications/[id]`): Certification listing and per-certification detail pages
- **Blog** (`/blog`, `/blog/[slug]`): Blog listing and individual blog post pages (Markdown support)
- **Contact** (`/contact`): Direct `mailto:` contact (no server-side form)

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **gray-matter** + **remark** / **remark-html** (Markdown blog rendering)
- **Lucide React** (Icons)

> `react-hook-form` and `zod` remain in `package.json` but are not used by the
> current contact flow, which is a plain `mailto:` link.

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Update Site Information

Edit `lib/constants.ts` to update:
- Your name and title
- Social media links
- Site description
- Navigation items

### Add Projects

Add or edit entries in the `allProjects` array in `lib/projects.ts`. Each entry
follows the `Project` interface:

| Field | Required | Notes |
| --- | --- | --- |
| `id` | yes | Unique slug, used in the `/projects/[slug]` URL |
| `title` | yes | Project name |
| `description` | yes | Short summary for cards |
| `longDescription` | no | Detailed body shown on the detail page |
| `category` | no | Grouping label (e.g. "Salesforce Tooling") |
| `status` | no | Free-text status (e.g. "Published on the Chrome Web Store") |
| `role` | no | Your role on the project |
| `highlights` | no | String array of bullet-point achievements |
| `image` | yes | Path under `public/projects/` (e.g. `/projects/<id>.svg` or `.png`) |
| `tech` | yes | Flat string array of technologies |
| `techStack` | no | Grouped tech: array of `{ category, items[] }` |
| `github` | no | Repository URL |
| `live` | no | Live/deployment URL |
| `featured` | yes | `true` to surface on the homepage |
| `hidden` | no | `true` to exclude from all public listings (kept for history) |
| `date` | yes | `YYYY-MM-DD`; project history is sorted newest-first |

Place the project image in `public/projects/` named after the project `id`.

### Add a Certification

Certifications are data-driven. To add one:

1. Drop the certificate PDF into `public/certifications/` using a
   `<issuer>-<course-slug>.pdf` filename (e.g. `meta-version-control.pdf`).
2. Add an entry to the `certifications` array in `lib/certifications.ts`
   following the `Certification` interface:

| Field | Required | Notes |
| --- | --- | --- |
| `id` | yes | Unique slug, used in the `/certifications/[id]` URL |
| `title` | yes | Certificate title |
| `issuer` | yes | Issuing organisation (e.g. "Meta") |
| `platform` | yes | Where it was earned (e.g. "Coursera") |
| `issueDate` | yes | `YYYY-MM-DD`; list is sorted newest-first |
| `credentialId` | yes | Credential identifier |
| `verifyUrl` | yes | Public verification URL |
| `pdf` | yes | Path to the PDF under `public/certifications/` |
| `skills` | no | String array of skills |
| `summary` | no | Paragraph shown on the detail page |
| `topics` | no | String array of topics covered |

The `/certifications` page and the About-page "Recent Certifications" preview
pick up new entries automatically. See
[`public/certifications/README.md`](public/certifications/README.md) for the
authoring conventions.

### Add Blog Posts

Create Markdown files in `content/blog/` directory. Each file should have frontmatter:

```markdown
---
title: Your Post Title
date: 2024-01-15
excerpt: A brief description
tags: [web development, next.js]
author: Your Name
---

Your blog post content here...
```

### Resume

Add your resume PDF file to the `public/` directory and name it `resume.pdf`. The download button on the About page and Hero section will automatically link to it.

### Contact

There is no server-side contact form or API route. The Contact page
(`app/contact/page.tsx`) is a direct `mailto:` link that opens the visitor's
email client. Change the destination address by editing the `email` field
under `siteConfig.links` in `lib/constants.ts`.

### Footer / Social Links

The footer "Connect" row and social icons are driven by `siteConfig.links`
and `socialLinks` in `lib/constants.ts`, including a Chrome Web Store link
(`siteConfig.links.chromeStore`). Update or remove entries there.

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme. The current theme uses:
- Background: Black (#000000)
- Primary: Deep purple shades
- Accent: Purple gradients

### Fonts

Fonts are configured in `app/layout.tsx`. Currently using Inter from Google Fonts.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your site will be live!

### Environment Variables

None are required. The site is fully static/SSG with no server-side secrets —
contact is a `mailto:` link and there are no API routes.

## 🗂️ Project Structure

```
app/                     App Router routes
  page.tsx               Home (/)
  about/                 /about (includes Recent Certifications preview)
  projects/              /projects and /projects/[slug]
  certifications/        /certifications and /certifications/[id]
  blog/                  /blog and /blog/[slug]
  contact/               /contact (mailto link)
components/              Reusable UI and section components
content/blog/            Markdown blog posts (frontmatter + body)
lib/
  constants.ts           Site config, navigation, skills, social links
  projects.ts            Project data + helpers (Project interface)
  certifications.ts      Certification data + helpers (Certification interface)
public/
  projects/              Project images (named after project id)
  certifications/        Certificate PDFs (see its README for conventions)
```

Content is data-driven: projects and certifications live in typed arrays under
`lib/`, blog posts are Markdown files under `content/blog/`.

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of notable changes.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

Built with ❤️ using Next.js and Tailwind CSS
