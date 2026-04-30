# Certification detail pages — design

## Goal

Promote each certificate from a card-and-PDF link to a full project-style detail page, so visitors can read the personal framing, see topics covered, view the embedded PDF inline, and reach the Coursera verification link from one place.

## Approach

- **Mirror the existing project-detail pattern.** New route `app/certifications/[id]/page.tsx`, server component, `generateStaticParams` over the `certifications` array. Shape and feel matches `app/projects/[slug]/page.tsx`.
- **Whole-card-click navigation.** `CertificationCard` becomes a single link target — no more in-card action buttons. The detail page owns the PDF and Verify links. Matches `ProjectCard` behaviour.
- **Additive data model.** Two new optional fields: `summary` (short prose) and `topics` (string array). Existing certificates remain valid; detail sections only render when their corresponding field is populated.

## Components

### `lib/certifications.ts` — extension

```ts
export interface Certification {
  // existing fields unchanged
  summary?: string
  topics?: string[]
}

export function getCertificationById(id: string): Certification | undefined
```

Seed both existing entries with `summary` and `topics`.

### `components/sections/CertificationCard.tsx` — change

- Wrap the card body in `<Link href={`/certifications/${certification.id}`}>` matching `ProjectCard`'s overlay pattern (absolute-inset link with the card content underneath).
- Remove the bottom action row (`View certificate` + `Verify` links).
- Keep title styling consistent: `group-hover:text-purple-400` on the heading.
- Keep the date, issuer line, and skill chips exactly as they are.

### `app/certifications/[id]/page.tsx` — new route

Layout sections, top-to-bottom, in a `max-w-4xl` container:

1. **Back link** to `/certifications`.
2. **Header**: gradient-text h1 title, sub-line `Issued by {issuer} · via {platform}`, completion date with calendar icon, credential-id pill.
3. **Action row**: primary `View certificate (PDF)` (target=_blank), secondary `Verify on Coursera` (target=_blank).
4. **What I covered** (renders only if `summary` set) — `Card` with prose.
5. **Topics covered** (renders only if `topics` non-empty) — two-column bullet grid, purple dots.
6. **Skills** — purple chip row, slightly larger than the list-card variant.
7. **Inline PDF preview** — `<object data={pdf} type="application/pdf">` at ~70vh, fallback message with a download link inside the object for browsers that can't render it.

Server component renders static metadata; client interactivity isn't needed for this layout.

### Routing & SSG

- `generateStaticParams()` returns `certifications.map(c => ({ id: c.id }))` so every cert prerenders at build time.
- `notFound()` when an id is missing — Next.js renders the existing 404 page.

## Data flow

```
public/certifications/<file>.pdf
            ^
            | rendered inline via <object data=pdf>
            |
lib/certifications.ts (typed list, helpers)
            |
            +--> /certifications              (grid of clickable cards)
            +--> /certifications/[id]         (full detail per cert)
            +--> /about (Recent Certifications) (grid of clickable cards)
```

## Error handling

- Missing id → `notFound()` → static 404.
- Browser without PDF rendering → `<object>` fallback content shows a "Download the PDF directly" link.
- Empty `topics` array or unset `summary` → corresponding section is skipped, page still renders cleanly.
- Build-time typecheck catches any reference to `getCertificationById` returning undefined that isn't guarded.

## Out of scope

- PDF.js client-side renderer (heavyweight; native browser rendering is good enough).
- Cert thumbnails on the listing page (PDF first-page extraction is a separate problem; current cards are textual).
- A "related certifications" section.

These can be added later without changing the data model.
