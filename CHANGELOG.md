# Changelog

All notable changes to the **James Portfolio** site are documented in this
file.

The format is based on
[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/), and this
project adheres to
[Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html). The site
itself is versionless from a deployment standpoint — Vercel deploys every
push to the default branch — but tagged release notes here help recruiters
and visitors track meaningful content additions.

## [Unreleased]

### Added — Meta Back-End Developer track

The full Meta Back-End Developer Professional Certificate path landed on
the site over the last week. Each certification has a typed entry in
[`lib/certifications.ts`](lib/certifications.ts), a PDF in
[`public/certifications/`](public/certifications/), and renders on a
detail page at `/certifications/<slug>`.

- Meta Back-End Developer **Professional Certificate** (umbrella)
  ([fbd42c9])
- Back-End Developer **Capstone** ([fbd42c9])
- The **Full Stack** ([fbd42c9])
- **APIs** ([7f9183a])
- **Coding Interview Preparation** ([7f9183a])
- **Django Web Framework** ([7da8562])
- **Introduction to Databases for Back-End Development** ([44a5ded])
- **Version Control** ([de1f371])
- *(plus the previously-shipped Programming in Python and Introduction to
  Back-End Development entries)*

### Added — Certifications surface

- New `/certifications` page listing every Meta entry with issuer,
  issued date, and skills ([a846580]).
- New `/certifications/[slug]` detail pages embedding the verification
  PDF ([a456d18]).
- Recent-certifications preview on the home page's About section
  ([a846580]).

### Added — Projects

- **Vastify** — hackathon project; project image rendering pipeline
  introduced ([a22d50f]).
- **Git Navigator** — new project entry; **WaveLink** expanded with a
  fresh image ([dd44a6f]).
- Footer "Connect" row now links to the **WaveLink Chrome Web Store**
  listing ([1621305]).
- **ExoCraft** — live deployment URL + real gameplay screenshot
  ([9c9e6ef]).

### Changed

- Hero copy + skills list refreshed; project card hydration bug fixed
  ([b7ad88c]).
- Page-level metadata broadened to reflect a full engineering range
  ([a23575c]).
- Header now uses Lucide LinkedIn icon and consistent icon sizes
  ([06b560a]).
- Header logo personalised with GitHub / LinkedIn icons ([b077ae7]).
- Hero tagline updated and an **"Open to work"** badge added
  ([81fdc69]); badge animation timing and photo-slot render guard
  fixed ([31bb9af]).

### Removed

- **Apex HQ** project hidden from public listings (entry retained in
  data with `hidden: true`) ([a05d404]).
- Non-functional contact form replaced with a `mailto:` link
  ([8258317]); orphaned `app/api/contact/route.ts` deleted; email
  address made clickable ([d9956f2]).
- Example blog-post stub replaced with real author metadata
  ([e253a98]).

### Fixed

- Recruiter-experience improvements + assorted small bugs ([e1ad9ef]).
- `.eslintrc` `root: true` added to prevent worktree config inheritance
  ([b7d87d8]).
- Contact-page CTA refactored to use the shared `ButtonLink` component
  ([44d3739]).

[Unreleased]: https://github.com/exotic209093/james-portfolio/compare/main...HEAD

[fbd42c9]: https://github.com/exotic209093/james-portfolio/commit/fbd42c9
[7f9183a]: https://github.com/exotic209093/james-portfolio/commit/7f9183a
[7da8562]: https://github.com/exotic209093/james-portfolio/commit/7da8562
[44a5ded]: https://github.com/exotic209093/james-portfolio/commit/44a5ded
[de1f371]: https://github.com/exotic209093/james-portfolio/commit/de1f371
[a456d18]: https://github.com/exotic209093/james-portfolio/commit/a456d18
[a846580]: https://github.com/exotic209093/james-portfolio/commit/a846580
[a05d404]: https://github.com/exotic209093/james-portfolio/commit/a05d404
[1621305]: https://github.com/exotic209093/james-portfolio/commit/1621305
[dd44a6f]: https://github.com/exotic209093/james-portfolio/commit/dd44a6f
[9c9e6ef]: https://github.com/exotic209093/james-portfolio/commit/9c9e6ef
[b7ad88c]: https://github.com/exotic209093/james-portfolio/commit/b7ad88c
[a22d50f]: https://github.com/exotic209093/james-portfolio/commit/a22d50f
[e1ad9ef]: https://github.com/exotic209093/james-portfolio/commit/e1ad9ef
[44d3739]: https://github.com/exotic209093/james-portfolio/commit/44d3739
[e253a98]: https://github.com/exotic209093/james-portfolio/commit/e253a98
[d9956f2]: https://github.com/exotic209093/james-portfolio/commit/d9956f2
[8258317]: https://github.com/exotic209093/james-portfolio/commit/8258317
[31bb9af]: https://github.com/exotic209093/james-portfolio/commit/31bb9af
[81fdc69]: https://github.com/exotic209093/james-portfolio/commit/81fdc69
[06b560a]: https://github.com/exotic209093/james-portfolio/commit/06b560a
[b7d87d8]: https://github.com/exotic209093/james-portfolio/commit/b7d87d8
[b077ae7]: https://github.com/exotic209093/james-portfolio/commit/b077ae7
[a23575c]: https://github.com/exotic209093/james-portfolio/commit/a23575c
