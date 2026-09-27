# Portfolio Website

A modern, clean portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. Features a black and deep purple theme with smooth animations and a readable Basic mode.

## 🚀 Features

- **Modern Design**: Clean, black/deep purple theme with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Optimized for Core Web Vitals
- **SEO Friendly**: Built with Next.js for excellent SEO
- **Smooth Animations**: Framer Motion for delightful user interactions
- **Type Safe**: Full TypeScript support
- **Vercel Ready**: Optimized for Vercel deployment

## 📄 Pages

- **Home**: Introduction, expertise, company/community links, experience preview, featured projects, and freelance services; the ambient backdrop and scroll cue pause while the page is hidden
- **About**: Full bio, skills, project history, work/education, and recent certifications, with section shortcuts and a CV download near the top
- **Projects**: Search public projects by name, description or technology, combine branch filters, and explore matching grid/timeline views. Case studies include custom interactive showcases for all 16 public projects. Each showcase uses illustrative local data; live product links remain separate.
- **Galacia**: Company overview, product availability, and links to the public company website
- **Open Source**: Automatically updated upstream PRs for T3 Code and Salesforce Inspector Reloaded, highlighting merged contributions and open reviews, with drafts and closed history collapsed, sync timestamps, and saved-data fallback
- **Certifications**: Certification listing and detail pages with downloadable PDFs
- **Blog**: Markdown-based routes retained; hidden from navigation and the sitemap until posts are available
- **Contact**: Direct email (mailto), a copy-address action with manual selection fallback, CV download and LinkedIn

Keyboard users can skip directly to the main content. Mobile navigation supports
Escape, closes on route changes, and uses larger touch targets. Display mode can
be changed from the header or footer; the system reduced-motion preference is
respected until a visitor chooses a mode, including when local storage is blocked.

## 🛠️ Tech Stack

- **Next.js 16** (App Router) and **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **React Hook Form**
- **Zod**
- **Lucide React** (Icons)

## 📦 Installation

Use Node.js 24.x (validated with Node.js 24.13.1). Production and
development builds explicitly retain Webpack. ESLint runs separately from the
Next.js build.

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

Run `npm test`, `npm run lint`, and `npm run build` before publishing.
After building, `npm run test:production` starts temporary loopback servers to
verify public routes, downloads and the private `/jobs` authentication boundary
with synthetic credentials. `proxy.ts` keeps that dashboard locked when
`JOBS_DASHBOARD_PASSWORD` is absent. Private job data is marked server-only and
rendered per authenticated request with private/no-store responses; job pages
are not prerendered. The production check also verifies that distinctive private
values are absent from public static assets. Do not place deployment credentials in Git.

The [27 September 2026 review](docs/website-readiness-2026-09-27.md) records the
framework migration, browser checks and remaining validation limits.

## 🔧 Configuration

### Update Site Information

Edit `lib/constants.ts` to update:
- Your name and title
- Social media links
- Site description
- Navigation items

### Add Projects

Edit `lib/projects.ts` to add your projects. Each project should have:
- Title and description
- Tech stack
- GitHub and live links
- Featured flag

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

The Contact page (`app/contact/page.tsx`) uses a direct `mailto:` link rather than a form,
so there's no API route or email service to configure. Update the email address in
`lib/constants.ts` (`siteConfig.links.email`).

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

If you're using an email service, add your API keys as environment variables in Vercel.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

Built with ❤️ using Next.js and Tailwind CSS
