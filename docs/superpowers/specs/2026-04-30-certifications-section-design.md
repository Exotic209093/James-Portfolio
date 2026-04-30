# Certifications section — design

## Goal

Add a dedicated home for Coursera (and future) certificates on the portfolio site, plus a folder where new cert PDFs can be dropped in with minimal ceremony.

## Approach

- **Data-driven, typed entries.** A new `lib/certifications.ts` module mirrors the pattern already established by `lib/projects.ts`. Each cert is a typed object with title, issuer, platform, issue date, credential ID, verification URL, PDF path, and optional skill tags.
- **Static PDFs in `public/certifications/`.** Files are renamed to slug-style names (`<issuer>-<course-slug>.pdf`) so URLs stay clean and don't depend on Coursera's opaque credential IDs.
- **Two render targets, one source of truth.** A dedicated `/certifications` page lists every cert; the `/about` page surfaces the three most recent as a preview that links to the full list.
- **Manual registration step is intentional.** Rather than auto-discovering files in `public/certifications/`, every cert requires a small object in `lib/certifications.ts`. This keeps issuer, date, and verification URL as first-class metadata (which auto-discovery can't capture) at the cost of ~30 seconds per cert.

## Components

### `lib/certifications.ts`

```ts
export type Certification = {
  id: string                  // slug, used as React key
  title: string               // "Introduction to Back-End Development"
  issuer: string              // "Meta"
  platform: string            // "Coursera"
  issueDate: string           // ISO "2026-04-30"
  credentialId: string        // "2EEHSP7IQGKJ"
  verifyUrl: string           // https://coursera.org/verify/...
  pdf: string                 // /certifications/<filename>.pdf
  skills?: string[]
}

export const certifications: Certification[] = [...]
export function getCertifications(): Certification[]   // sorted newest-first
```

Seed entries:

- `meta-intro-back-end-development` — "Introduction to Back-End Development", Meta via Coursera, 2026-04-30, credential `2EEHSP7IQGKJ`, skills `['HTTP', 'REST APIs', 'Web servers', 'Back-end fundamentals']`.
- `meta-programming-in-python` — "Programming in Python", Meta via Coursera, 2026-04-30, credential `M9H29EYRUWME`, skills `['Python', 'OOP', 'Data structures', 'Algorithms']`.

### `components/sections/CertificationCard.tsx`

Reuses the existing `Card` component for visual continuity. Layout:

- Title (h3, white)
- Subtitle: "Issued by {issuer} · via {platform}"
- Completion date (formatted via `formatDate`)
- Optional skill chips (purple-tag style matching project cards)
- Action row: `View certificate` (PDF, opens new tab, `download` allowed) and `Verify` (Coursera URL, opens new tab)

### `app/certifications/page.tsx`

Standalone page using the same vertical rhythm as the other routes (`pt-20 md:pt-32 pb-20`, `container mx-auto`). Header is gradient-text "Certifications" with a one-line intro. Renders a responsive grid (1/2/3 cols) of every certification. Framer-motion fade-up matches `/about`.

### `app/about/page.tsx` — additions

- New "Recent Certifications" section inserted between Education and the Resume CTA (animation delay around 0.55).
- Renders the 3 most recent entries via `CertificationCard`.
- "View all certifications →" link to `/certifications`.
- Removes the trailing sentence in the existing self-directed-learning education entry that says "Formal certifications in progress: Google UX Design and Amazon Junior Software Developer." — it becomes redundant once those land as actual entries here.

### `lib/constants.ts` — nav update

Add `{ name: 'Certifications', href: '/certifications' }` between Projects and Blog.

### `public/certifications/`

New folder containing:

- `meta-intro-back-end-development.pdf` (copied from `~/Downloads/Coursera 2EEHSP7IQGKJ.pdf`)
- `meta-programming-in-python.pdf` (copied from `~/Downloads/Coursera M9H29EYRUWME.pdf`)
- `README.md` documenting the drop-in workflow:
  1. Save the cert PDF here using a slug filename (`<issuer>-<course-slug>.pdf`).
  2. Add an entry to `lib/certifications.ts`.
  3. The dedicated page and About preview pick it up automatically.

## Data flow

```
public/certifications/<file>.pdf   <-- physical file
            ^
            | referenced by `pdf:` field
            |
lib/certifications.ts (typed list, sorted newest-first)
            |
            +--> app/certifications/page.tsx (full grid)
            |
            +--> app/about/page.tsx        (top 3 preview + "View all")
                       |
                       +--> CertificationCard (shared)
```

## Error handling

- Build-time TypeScript catches typos in field names.
- Runtime: if a `pdf` field references a missing file, the link 404s but the page still renders. Acceptable at this scale; not worth a build-time validator now.
- No external network dependency: verification links open `coursera.org/verify/...` in a new tab, but the cert grid renders fully offline.

## Out of scope

- Auto-discovery of PDFs in `public/certifications/`.
- Issuer-logo image rendering (text wordmark only for now).
- Filtering / search on the certifications page.
- Build-time validation that PDFs referenced in data actually exist.

These can be added later without changing the data model.
