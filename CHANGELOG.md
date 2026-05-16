# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Certifications system: a `/certifications` listing page and per-certification
  detail pages at `/certifications/[id]`, plus a "Recent Certifications" preview
  on the About page.
- Ten Meta / Coursera certification entries (Back-End Developer Professional
  Certificate, Back-End Developer Capstone, The Full Stack, Coding Interview
  Preparation, APIs, Django Web Framework, Introduction to Databases, Version
  Control, Introduction to Back-End Development, Programming in Python).
- Git Navigator project (published VS Code extension) and the Vastify hackathon
  project, both with rich `techStack`, `highlights`, and image rendering.
- Chrome Web Store link in the footer "Connect" row, configured via
  `siteConfig.links.chromeStore` in `lib/constants.ts`.
- Open-to-work badge and an updated hero tagline.
- Live deployment link and real gameplay screenshot for the ExoCraft project.

### Changed

- Expanded the WaveLink project entry and swapped its screenshot.
- Refreshed portfolio copy, skills, and page metadata to reflect the full
  engineering range.
- Projects can now be hidden from public listings via a `hidden: true` flag on
  the `Project` interface (used to hide the Apex HQ project).
- Personalised the header logo and standardised icon sizing.

### Removed

- The non-functional contact form and its orphaned API route
  (`app/api/contact/route.ts`). The Contact page now uses a `mailto:` link
  driven by `siteConfig.links.email`.

### Fixed

- Project card hydration mismatch.
- Open-to-work badge animation timing and a guard around the photo slot render.
