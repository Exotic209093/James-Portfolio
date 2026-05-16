# Setup Guide

Follow these steps to get your portfolio website up and running.

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Your Information

### Update Site Configuration

Edit `lib/constants.ts` and update:
- `siteConfig.name` - Your name
- `siteConfig.title` - Your title/role
- `siteConfig.description` - Your description
- `siteConfig.links` - Your social media links and email

### Update Navigation

In `lib/constants.ts`, modify the `navigation` array if you want to change menu items.

### Update Skills

In `lib/constants.ts`, update the `skills` array with your actual skills organized by category.

## 3. Add Your Projects

Edit the `allProjects` array in `lib/projects.ts`. Each entry follows the
`Project` interface:
- `id` - Unique slug (used in the `/projects/[slug]` URL)
- `title` - Project name
- `description` - Short description for cards
- `longDescription` - Detailed body (optional)
- `category`, `status`, `role` - Optional metadata strings
- `highlights` - Optional string array of achievements
- `image` - Path under `public/projects/` (e.g. `/projects/<id>.svg`)
- `tech` - Array of technologies used
- `techStack` - Optional grouped tech: `{ category, items[] }[]`
- `github` - GitHub repository URL (optional)
- `live` - Live demo URL (optional)
- `featured` - Boolean to show on homepage
- `hidden` - `true` to exclude from all public listings (optional)
- `date` - Project date (`YYYY-MM-DD`; history sorts newest-first)

Place project images in `public/projects/`, named after the project `id`.

## 4. Add Your Resume

1. Create or export your resume as a PDF
2. Place it in the `public/` directory
3. Name it `resume.pdf`

## 5. Add Blog Posts (Optional)

1. Create a new Markdown file in `content/blog/`
2. Use the following frontmatter format:

```markdown
---
title: Your Post Title
date: 2024-01-15
excerpt: A brief description of your post
tags: [tag1, tag2, tag3]
author: Your Name
---

Your blog post content here in Markdown format...
```

## 6. Add Certifications (Optional)

Certifications are data-driven and require no server setup:

1. Drop the certificate PDF into `public/certifications/` using a
   `<issuer>-<course-slug>.pdf` filename (e.g. `meta-version-control.pdf`).
2. Add an entry to the `certifications` array in `lib/certifications.ts` with:
   `id`, `title`, `issuer`, `platform`, `issueDate` (`YYYY-MM-DD`),
   `credentialId`, `verifyUrl`, `pdf`, and the optional `skills`, `summary`,
   and `topics` fields.
3. The `/certifications` page, the per-certification detail pages, and the
   About-page preview pick it up automatically (sorted newest-first by
   `issueDate`).

See `public/certifications/README.md` for the full conventions.

## 7. Contact

No setup is needed. The Contact page is a `mailto:` link. Change the
destination address via the `email` field under `siteConfig.links` in
`lib/constants.ts`.

## 8. Customize Colors (Optional)

Edit `tailwind.config.ts` to customize the color scheme. The current theme uses:
- Background: Black
- Primary: Deep purple shades
- Accent: Purple gradients

## 9. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## 10. Build for Production

```bash
npm run build
npm start
```

## 11. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js
5. Deploy! (no environment variables are required)

Your site will be live at `your-project.vercel.app`

## Next Steps

- Add your project images to `public/projects/`
- Write blog posts in `content/blog/`
- Customize the design to match your brand
- Add analytics (Vercel Analytics, Google Analytics, etc.)
- Set up a custom domain in Vercel

Happy building! 🚀
