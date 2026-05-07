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

Edit `lib/projects.ts` and replace the sample projects with your own. Each project needs:
- `id` - Unique identifier (used in URL)
- `title` - Project name
- `description` - Short description
- `longDescription` - Detailed description (optional)
- `image` - Path to project image (place in `public/` folder)
- `tech` - Array of technologies used
- `github` - GitHub repository URL (optional)
- `live` - Live demo URL (optional)
- `featured` - Boolean to show on homepage
- `date` - Project date (YYYY-MM-DD format)

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

## 5a. Add Certifications

Each certification has a typed entry in `lib/certifications.ts` and a PDF in
`public/certifications/`. The detail route (`/certifications/[slug]`) renders
the PDF inline; the cards on `/certifications` link to the entry.

1. **Drop the PDF** at `public/certifications/<slug>.pdf` — the `<slug>` must
   match the entry below. Naming convention is documented in
   [`public/certifications/README.md`](public/certifications/README.md).

2. **Append a typed entry** to `lib/certifications.ts`:

```ts
{
  slug: 'meta-version-control',         // matches the PDF filename
  title: 'Version Control',
  issuer: 'Meta',
  platform: 'Coursera',
  issued: '2026-04-12',                 // YYYY-MM-DD
  url: 'https://coursera.org/verify/…', // verification link
  skills: ['Git', 'GitHub', 'PR review'],
  summary: 'Branching, merging, and PR-based collaboration workflows.',
}
```

3. **(Optional) Surface on the home page** — the home component pulls the
   N most recent entries by `issued` date; bumping the count lives in
   `lib/constants.ts` (`certifications.previewCount`).

## 6. Contact

This portfolio uses a **`mailto:`** CTA on `/contact`; there is no contact
form, no API route, and no email-service integration. If you want to bring
back the form, the previous implementation is in git history.

## 7. Customize Colors (Optional)

Edit `tailwind.config.ts` to customize the color scheme. The current theme uses:
- Background: Black
- Primary: Deep purple shades
- Accent: Purple gradients

## 8. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## 9. Build for Production

```bash
npm run build
npm start
```

## 10. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js
5. Add environment variables if needed (for email service)
6. Deploy!

Your site will be live at `your-project.vercel.app`

## Next Steps

- Add your project images to `public/projects/`
- Write blog posts in `content/blog/`
- Customize the design to match your brand
- Add analytics (Vercel Analytics, Google Analytics, etc.)
- Set up a custom domain in Vercel

Happy building! 🚀
