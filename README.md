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

- **Home**: Hero section, about preview, featured projects, recent certifications preview, contact CTA
- **About**: Full bio, skills, experience, and a Recent Certifications preview
- **Projects**: Project listing and individual project pages
- **Certifications**: Certification listing and individual certification detail pages (data-driven from `lib/certifications.ts`)
- **Blog**: Blog listing and individual blog post pages (Markdown support)
- **Contact**: Contact form with API route

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **React Hook Form**
- **Zod**
- **Lucide React** (Icons)

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

Edit `lib/projects.ts` to add your projects. Each project should have:
- Title and description (short + long form)
- Category, status, and role
- Tech stack (`tech`) and grouped `techStack` for the detail page
- GitHub and live links (optional)
- `featured` flag — surfaces the project on the homepage
- `hidden` flag — when `true`, the project is excluded from public listings (useful for internal/work-in-progress projects)
- `date` (YYYY-MM-DD) — used for ordering

### Add Certifications

Edit `lib/certifications.ts` to add a certification. Each entry needs:
- `id` — slug used in the URL (`/certifications/<id>`)
- `title`, `issuer`, `platform`
- `issueDate` (YYYY-MM-DD), `credentialId`, `verifyUrl`
- `pdf` — path to the certificate PDF in `public/certifications/`
- `skills` and `topics` (optional)
- `summary` (optional, shown on the detail page)

Drop the certificate PDF into `public/certifications/` using the same filename as the `pdf` field.

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

### Contact Form

The contact form API route is at `app/api/contact/route.ts`. You'll need to integrate with an email service like:
- [Resend](https://resend.com)
- [SendGrid](https://sendgrid.com)
- [Formspree](https://formspree.io)
- Or any other email service

Currently, the form just logs submissions to the console. Update the route handler to send actual emails.

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
