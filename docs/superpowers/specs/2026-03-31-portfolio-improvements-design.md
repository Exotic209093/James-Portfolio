# Portfolio Improvements Design

**Date:** 2026-03-31
**Goal:** Fix broken functionality and improve recruiter appeal for both Salesforce-specific and general software engineering roles.

---

## Context

James Collard's portfolio is a Next.js 14 App Router site with a dark purple theme. The project data and copy are strong. Several things are broken or weak from a recruiter perspective.

**Target audience:** Both Salesforce-specific roles (Apex dev, ISV) and general software engineering roles (full-stack, TypeScript/Python).

---

## Scope — Approach B

Fix all broken things, then add targeted recruiter-facing improvements. No structural layout rework.

---

## 1. Hero Section

**File:** `components/sections/Hero.tsx`

Three additions:

### 1a. "Open to opportunities" badge
- Renders above the name/title line
- Green pulse dot + "OPEN TO OPPORTUNITIES" text
- Styled: `bg-green-500/10 border border-green-500/30 rounded-full text-green-300`

### 1b. Photo slot
- Circular avatar (`w-24 h-24 rounded-full`) between the badge and the title
- Default state: `display: none` — invisible to recruiter until a photo is added
- When a photo exists at `/profile.jpg`, the slot becomes visible with `object-cover`
- Comment in code marks where to drop the image file

### 1c. Updated tagline
- Replace the long `siteConfig.description` sentence with a scannable line specific to the hero:
  `Salesforce platform engineering · TypeScript · Python · Systems programming`
- Keep `siteConfig.description` unchanged (used elsewhere on About page)
- Add the tagline as a hardcoded string directly in `Hero.tsx`

---

## 2. Header

**File:** `components/layout/Header.tsx`

Two changes:

### 2a. Logo text
- Change `"Portfolio"` → `"James Collard"`

### 2b. GitHub + LinkedIn icons
- Add after the desktop nav links, separated by a subtle vertical divider (`w-px h-4 bg-gray-700/50`)
- GitHub icon → `siteConfig.links.github` (opens `target="_blank"`)
- LinkedIn icon → `siteConfig.links.linkedin` (opens `target="_blank"`)
- Use SVG icons from `lucide-react` (`Github`) and a manual LinkedIn SVG (lucide doesn't include LinkedIn)
- Hover: `hover:text-purple-400 transition-colors`
- Icons are desktop-only in the main nav row; mobile menu already links to About/Contact which has social links

---

## 3. Contact Page

**File:** `app/contact/page.tsx`

Replace the non-functional contact form with a clean mailto section.

- Remove the `<form>`, all `useState` hooks, `handleSubmit`, `handleChange`, `isSubmitting`, `submitStatus`
- Keep the page layout and the location/email info cards on the left
- Replace the form card (right column) with a simple card:
  - Heading: "The best way to reach me"
  - Email address displayed as text
  - A primary `ButtonLink` with `href={siteConfig.links.email}` (the `mailto:` URL)
  - Label: "Opens your email client"
- Remove unused imports: `Send`, `react-hook-form` (not installed anyway), `useState`
- The `Phone` icon import in the current file is already unused — remove it

---

## 4. Blog

**Files:** `content/blog/example-post.md` (delete), `content/blog/getting-started.md` (create)

- Delete `content/blog/example-post.md`
- Create `content/blog/getting-started.md` with correct metadata:

```md
---
title: "<!-- James fills in title -->"
date: 2026-03-31
excerpt: "<!-- James fills in excerpt -->"
tags: [engineering]
author: James Collard
---

<!-- James writes 300–500 words here -->
```

- The blog infrastructure is complete — it just needs real content from James
- Leave `TODO` comments in the stub so the blanks are obvious

---

## 5. Page Metadata

**File:** `app/layout.tsx`

Update the `metadata` export:

```ts
title: 'James Collard | Software Engineer',
description: 'Software engineer building production-grade tools — Salesforce platform, TypeScript, Python, and systems programming. Based in Kent, UK.',
keywords: ['software engineer', 'Salesforce', 'Apex', 'TypeScript', 'Python', 'UK', 'full-stack', 'developer'],
openGraph: {
  title: 'James Collard — Software Engineer',
  description: 'Production-grade software across Salesforce, TypeScript, Python, and systems programming.',
}
```

---

## 6. .gitignore

**File:** `.gitignore`

Add `.superpowers/` to prevent brainstorming session files from being committed.

---

## Out of Scope

- Email sending backend (deliberately replaced with mailto)
- Profile photo (slot ready, photo not provided yet)
- GitHub stats section (Approach C — not selected)
- Two-column hero redesign (Approach C — not selected)
- Mobile header social icons (icons visible on desktop nav only; footer already has social links visible on mobile)
- Blog content (James writes this)
