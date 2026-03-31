# Portfolio Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix broken functionality and improve recruiter appeal across the portfolio site.

**Architecture:** Six independent changes across existing files — no new dependencies, no new routes, no structural rework. Each task is self-contained and commits cleanly on its own.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, lucide-react

> **Note on testing:** This project has no test infrastructure (no Jest, no testing library). Verification for every task is: `npm run lint` (zero warnings/errors) + `npm run build` (must succeed). Visual check in the browser (`npm run dev`) is noted where the change is visual.

---

## File Map

| File | Change |
|------|--------|
| `.gitignore` | Add `.superpowers/` |
| `app/layout.tsx` | Broaden metadata title + description |
| `components/layout/Header.tsx` | Logo text → "James Collard", add GitHub + LinkedIn icons |
| `components/sections/Hero.tsx` | Add "open to work" badge, hidden photo slot, updated tagline |
| `app/contact/page.tsx` | Remove broken form, replace with mailto CTA card |
| `content/blog/example-post.md` | Delete |
| `content/blog/getting-started.md` | Create stub with correct author |

---

## Task 1: .gitignore — add `.superpowers/`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add `.superpowers/` to .gitignore**

Open `.gitignore` and add at the end:

```
# superpowers brainstorming sessions
.superpowers/
```

- [ ] **Step 2: Verify it's excluded**

```bash
git status
```

Expected: `.superpowers/` directory does NOT appear as untracked. If it still shows, run `git rm -r --cached .superpowers/` then check again.

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers/ brainstorming session files"
```

---

## Task 2: Page metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the metadata export**

In `app/layout.tsx`, replace the entire `metadata` export (lines 13–23) with:

```ts
export const metadata: Metadata = {
  title: 'James Collard | Software Engineer',
  description:
    'Software engineer building production-grade tools — Salesforce platform, TypeScript, Python, and systems programming. Based in Kent, UK.',
  keywords: [
    'software engineer',
    'Salesforce',
    'Apex',
    'TypeScript',
    'Python',
    'full-stack',
    'developer',
    'UK',
  ],
  authors: [{ name: 'James Collard' }],
  openGraph: {
    title: 'James Collard — Software Engineer',
    description:
      'Production-grade software across Salesforce, TypeScript, Python, and systems programming.',
    type: 'website',
  },
}
```

- [ ] **Step 2: Lint and build**

```bash
cd "e:/My projects/Portfolio Website"
npm run lint && npm run build
```

Expected: zero lint errors, build succeeds with no type errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "chore: broaden page metadata to reflect full engineering range"
```

---

## Task 3: Header — logo + social icons

**Files:**
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Update the logo text**

Find the logo `Link` element (around line 42–48). Change `"Portfolio"` to `siteConfig.name`:

```tsx
<Link
  href="/"
  className="text-xl md:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
>
  {siteConfig.name}
</Link>
```

`siteConfig.name` is `'James Collard'` — already imported via `import { navigation } from '@/lib/constants'`. You need to also import `siteConfig`:

```ts
import { navigation, siteConfig } from '@/lib/constants'
```

- [ ] **Step 2: Add GitHub icon import**

`lucide-react` already provides `Github`. Add it to the existing lucide import at the top of the file. The current import is:

```ts
import { Menu, X } from 'lucide-react'
```

Change to:

```ts
import { Menu, X, Github } from 'lucide-react'
```

- [ ] **Step 3: Add the social icons to the desktop nav**

Find the desktop nav `<div>` (the `hidden md:flex` block). It currently ends after the `navigation.map(...)`. Add the social icons block immediately after the closing `</div>` of the map, still inside the outer flex container:

Replace:
```tsx
<div className="hidden md:flex items-center space-x-8">
  {navigation.map((item, index) => {
    // ... existing nav links
  })}
</div>
```

With:
```tsx
<div className="hidden md:flex items-center space-x-8">
  {navigation.map((item, index) => {
    const isActive = pathname === item.href
    return (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
      >
        <Link
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors relative',
            isActive
              ? 'text-purple-400'
              : 'text-gray-300 hover:text-purple-400'
          )}
        >
          {item.name}
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500"
              initial={false}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </Link>
      </motion.div>
    )
  })}
  <div className="flex items-center gap-4 pl-4 border-l border-gray-700/40">
    <a
      href={siteConfig.links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-purple-400 transition-colors"
      aria-label="GitHub"
    >
      <Github className="h-5 w-5" />
    </a>
    <a
      href={siteConfig.links.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-purple-400 transition-colors"
      aria-label="LinkedIn"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </a>
  </div>
</div>
```

- [ ] **Step 4: Lint and build**

```bash
npm run lint && npm run build
```

Expected: zero lint errors, build succeeds.

- [ ] **Step 5: Visual check**

```bash
npm run dev
```

Open `http://localhost:3000`. Header should show "James Collard" as logo, and GitHub + LinkedIn icons to the right of the nav links separated by a faint vertical line. Both icons should turn purple on hover.

- [ ] **Step 6: Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat: personalise header logo and add GitHub/LinkedIn icons"
```

---

## Task 4: Hero — badge, photo slot, tagline

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Add the "Open to opportunities" badge**

Inside the innermost `motion.div` (the one wrapping `h1`/`h2`), add the badge as the first child, before the `h1`:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2, duration: 0.5 }}
  className="mb-6"
>
  {/* Open to opportunities badge */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15, duration: 0.4 }}
    className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6"
  >
    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
    <span className="text-green-300 text-xs font-medium tracking-widest uppercase">
      Open to Opportunities
    </span>
  </motion.div>

  {/* Photo slot — add /public/profile.jpg to make this visible */}
  <div className="hidden w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/40 mx-auto mb-6">
    <img src="/profile.jpg" alt="James Collard" className="w-full h-full object-cover" />
  </div>

  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
    <span className="text-white">Hi, I&apos;m </span>
    <span className="gradient-text">{siteConfig.name}</span>
  </h1>
  <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
    {siteConfig.title}
  </h2>
  <p className="text-lg sm:text-xl text-purple-400 mt-2">
    Based in {siteConfig.location}
  </p>
</motion.div>
```

- [ ] **Step 2: Update the hero tagline paragraph**

Find the `motion.p` that currently renders `{siteConfig.description}` (around line 57–64). Replace only the content — keep the motion wrapper and className unchanged:

```tsx
<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4, duration: 0.6 }}
  className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
>
  Salesforce platform engineering · TypeScript · Python · Systems programming
</motion.p>
```

- [ ] **Step 3: Lint and build**

```bash
npm run lint && npm run build
```

Expected: zero lint errors, build succeeds. The `<img>` tag inside the hidden div may trigger a Next.js lint warning about using `next/image` — this is acceptable since the element is `hidden` and the photo feature is intentionally deferred. If the warning fails the lint rule, replace with:

```tsx
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/profile.jpg" alt="James Collard" className="w-full h-full object-cover" />
```

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Open `http://localhost:3000`. Hero should show:
- Green "OPEN TO OPPORTUNITIES" badge with pulse dot above the name
- No visible photo slot (it's `hidden`)
- Name and title unchanged
- Tagline now reads: `Salesforce platform engineering · TypeScript · Python · Systems programming`

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add open-to-work badge and updated hero tagline"
```

---

## Task 5: Contact page — replace form with mailto CTA

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Rewrite the contact page**

Replace the entire contents of `app/contact/page.tsx` with:

```tsx
'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import Card from '@/components/ui/Card'
import { siteConfig } from '@/lib/constants'

const emailAddress = siteConfig.links.email.replace('mailto:', '')

export default function ContactPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Get In </span>
            <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The best way to reach me is directly by email.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card hover>
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="p-3 bg-purple-900/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Mail className="h-5 w-5 text-purple-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <span className="text-gray-400">{emailAddress}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card hover>
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="p-3 bg-purple-900/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <MapPin className="h-5 w-5 text-purple-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Location</h3>
                    <p className="text-gray-400">Available for remote work</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Mailto CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                <h2 className="text-2xl font-semibold text-white">Send me an email</h2>
                <p className="text-gray-300 max-w-md leading-relaxed">
                  I&apos;m currently open to new opportunities. Whether you have a role in mind or just want to connect, I&apos;m happy to hear from you.
                </p>
                <p className="text-purple-400 text-lg">{emailAddress}</p>
                <a
                  href={siteConfig.links.email}
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 px-8 py-4 text-lg"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send me an email
                </a>
                <p className="text-sm text-gray-500">Opens your email client</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Lint and build**

```bash
npm run lint && npm run build
```

Expected: zero lint errors, build succeeds.

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Open `http://localhost:3000/contact`. Should show:
- Email + location info cards on the left
- A card on the right with a "Send me an email" heading, the email address in purple, and a primary-styled button that opens the mail client when clicked

- [ ] **Step 4: Commit**

```bash
git add app/contact/page.tsx
git commit -m "fix: replace non-functional contact form with mailto link"
```

---

## Task 6: Blog — replace placeholder with real stub

**Files:**
- Delete: `content/blog/example-post.md`
- Create: `content/blog/getting-started.md`

- [ ] **Step 1: Delete the placeholder post**

```bash
rm "e:/My projects/Portfolio Website/content/blog/example-post.md"
```

- [ ] **Step 2: Create the stub post**

Create `content/blog/getting-started.md` with:

```md
---
title: "TODO: Add your post title here"
date: 2026-03-31
excerpt: "TODO: Add a 1-2 sentence excerpt that will appear on the blog listing page."
tags: [engineering]
author: James Collard
---

TODO: Write your post here (300–500 words is enough).

A good starting point: pick one thing you learned or a problem you solved while building
any of the projects in this portfolio. Describe the problem, what you tried, and what worked.

Example titles:
- "What I learned building a managed Salesforce package"
- "Why I used Preact instead of React for a Chrome extension"
- "Writing a Windows kernel driver: what surprised me"
```

- [ ] **Step 3: Lint and build**

```bash
npm run lint && npm run build
```

Expected: zero lint errors, build succeeds.

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Open `http://localhost:3000/blog`. Should show the stub post card with the TODO title (confirming the infrastructure works). No "Coming soon" message — only shown when zero posts exist.

- [ ] **Step 5: Commit**

```bash
git add content/blog/
git commit -m "content: replace example blog post stub with real author metadata"
```

---

## Task 7: Final build verification

- [ ] **Step 1: Clean build**

```bash
cd "e:/My projects/Portfolio Website"
npm run lint && npm run build
```

Expected output ends with:
```
Route (app)                              Size     First Load JS
┌ ○ /                                   ...
├ ○ /about                              ...
├ ○ /blog                               ...
├ ○ /contact                            ...
├ ○ /projects                           ...
...
✓ Compiled successfully
```

No type errors, no lint errors. If any appear, fix before marking complete.

- [ ] **Step 2: Full visual walkthrough**

```bash
npm run dev
```

Check each route:
- `/` — hero shows green badge + updated tagline, header shows "James Collard" logo + GitHub/LinkedIn icons
- `/about` — unchanged, works correctly
- `/projects` — all project cards render without broken images
- `/projects/nebula-vault` — detail page renders, GitHub link present
- `/blog` — stub post card visible, no "Coming soon" message
- `/contact` — mailto button visible, no form, clicking the button opens email client
