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

## 6. Wire Up Contact

The contact page is a static `mailto:` CTA — there is no API route or server-side form.

1. Open `lib/constants.ts`.
2. Set `siteConfig.links.email` to the address that should receive mail.

That's it. The button on `/contact` and the email link in the footer both read from that value.

## 7. Add Certifications (Optional)

1. Drop the certificate PDF into `public/certifications/` using a slug-style filename
   (e.g. `meta-version-control.pdf`).
2. Add an entry to `lib/certifications.ts`:

   ```ts
   {
     id: 'meta-version-control',
     title: 'Version Control',
     issuer: 'Meta',
     platform: 'Coursera',
     issueDate: '2026-05-15',
     credentialId: 'XXXXXXXXXXXX',
     verifyUrl: 'https://coursera.org/verify/XXXXXXXXXXXX',
     pdf: '/certifications/meta-version-control.pdf',
     skills: ['Git', 'GitHub', 'Branching'],
   },
   ```

The `/certifications` listing, the per-credential `/certifications/[id]` detail page,
and the "Recent Certifications" preview on `/about` all pick it up automatically.

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
