# Changelog

All notable changes to this portfolio are documented in this file.

The format is based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Certifications section** — top-level `/certifications` listing plus a per-credential detail page at `/certifications/[id]` rendered from [`lib/certifications.ts`](lib/certifications.ts). Each detail page embeds the issuer-supplied PDF, summarises skills + topics, and links to the official verify URL.
- **Meta certifications** — APIs, Coding Interview Preparation, Django Web Framework, Introduction to Databases, Version Control (and earlier additions) — all with verify links and downloadable PDFs.
- **About preview** on the homepage.
- **Open-to-work badge** in the hero, alongside an updated tagline.
- **Project additions** — Vastify (hackathon), Git Navigator, Chrome Web Store extension link in the footer Connect row.
- **WaveLink** updated with new screenshots; **ExoCraft** now links to its live deployment with real gameplay imagery.

### Changed
- **Skills + portfolio copy** refreshed to reflect current focus.
- **Contact** — the broken Next.js form was replaced with a clickable `mailto:` link, and the orphaned `app/api/contact/route.ts` was deleted. The address is now a clickable mailto everywhere it appears (footer + contact page).
- **Header** uses the official `Linkedin` lucide icon and a corrected icon size.
- **Apex HQ project** is hidden from public listings via the `hidden` flag in `lib/projects.ts`.
- **Blog stub** swapped for a real first post with proper author metadata.
- **ButtonLink** is now reused for the contact CTA.

### Fixed
- Card hydration mismatch on the projects grid.
- Badge animation timing and a missing `null` guard around the photo slot in the hero.

### Removed
- `app/api/contact/route.ts` (see *Changed* above).

## How to read this file

Each release is a single section. Within a release, changes are
grouped under `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`,
and `Security`. Tag a new release by promoting `[Unreleased]` to
`[X.Y.Z] — YYYY-MM-DD` and starting a fresh `[Unreleased]` block.
