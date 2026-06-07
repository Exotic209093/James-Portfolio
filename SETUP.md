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
- `image` - Path to project image (place in `public/projects/` folder)
- `tech` - Array of technologies used
- `techStack` - Grouped breakdown shown on the detail page (optional)
- `category`, `status`, `role`, `highlights` - Detail-page metadata (optional)
- `github` - GitHub repository URL (optional)
- `live` - Live demo URL (optional)
- `featured` - Boolean to show on homepage
- `hidden` - Boolean to exclude from public listings (defaults to `false`)
- `date` - Project date (YYYY-MM-DD format)

## 4. Add Your Certifications

Edit `lib/certifications.ts` to list your certifications. Each entry needs:
- `id` - Unique slug used in the URL (`/certifications/<id>`)
- `title`, `issuer`, `platform`
- `issueDate` (YYYY-MM-DD), `credentialId`, `verifyUrl`
- `pdf` - path to the certificate PDF
- `skills`, `topics`, `summary` (optional)

Then drop the certificate PDF into `public/certifications/` using the same filename you referenced in the `pdf` field.

## 5. Add Your Resume

1. Create or export your resume as a PDF
2. Place it in the `public/` directory
3. Name it `resume.pdf`

## 6. Add Blog Posts (Optional)

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

## 7. Set Up Contact Form

The contact form currently logs submissions to the console. To enable email sending:

1. Choose an email service (Resend, SendGrid, etc.)
2. Get your API key
3. Add it as an environment variable (e.g., `RESEND_API_KEY`)
4. Update `app/api/contact/route.ts` to use your email service

Example with Resend:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'your-email@example.com',
  subject: `Portfolio Contact: ${subject}`,
  html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
})
```

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
- Add your certificate PDFs to `public/certifications/`
- Write blog posts in `content/blog/`
- Customize the design to match your brand
- Add analytics (Vercel Analytics, Google Analytics, etc.)
- Set up a custom domain in Vercel

Happy building! 🚀
