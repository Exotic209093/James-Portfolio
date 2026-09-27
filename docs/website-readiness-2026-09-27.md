# Website review — 27 September 2026

The public portfolio was reviewed at <https://james-c.app> on desktop and mobile.
Homepage, project and contact navigation worked in the inspected views. Public
pages and the actual resume PDF responded successfully. Review found an
unnecessary PDF route-prefetch failure, an unsupported framework dependency,
and low-contrast text in the Basic mode used for reduced motion.
The subsequent source/build review also confirmed a privacy flaw: the private
dashboard imported job data into a client component, so an anonymous request
could retrieve that data from a local production JavaScript asset even though
the `/jobs` page required authentication. The reproduction logged counts only.

## Source changes

- Upgrade Next.js 14 to 16.3.6, React to 19.2.8 and the matching Next ESLint
  configuration. Lucide 0.475.0 supports the React 19 peer dependency; the
  existing Framer Motion 11.18.2 remains in place.
- Await dynamic route parameters in project, certification, job and blog pages
  and metadata. Rename the private dashboard guard to `proxy.ts`, preserving
  its fail-closed behavior. Explicitly retain Webpack for dev and production.
- Run ESLint directly because Next 16 removed `next lint`. The upgraded rules
  expose four existing animation-related warnings. They remain scoped and
  visible: browser-state initialization in three components and imperative
  canvas particle mutation. No blanket rule disable or animation rewrite was
  introduced. ESLint 9 is retained because the installed React lint plugin does
  not declare ESLint 10 compatibility.
- Initialize the canvas animation-frame ref explicitly for React 19 types.
  Keep the generated TypeScript automatic JSX runtime setting.
- Download buttons use a native anchor, avoiding Next's RSC prefetch request
  for PDFs. Public pages still use client navigation for ordinary page links.
- Apply the existing Basic-mode text palette consistently to body content.
  Pale colors from the dark theme previously reduced readability against the
  Basic mode's white background. Preserve selected filters, keyboard focus and
  readable labels over project artwork. Increase contrast for the two shared
  footer labels in the animated dark theme.
- Keep contact email text within its card at 320 px by allowing the flex item
  to shrink and the address to wrap.
- Load private job data exclusively in server components; pass only dashboard
  summary fields to its client presentation. Mark the data modules server-only
  and preserve that guard in the import generator. Private job pages render per
  request and use `private, no-store` responses. The asset regression rejects
  private values in any public build asset and checks the prerender manifest.

The migration follows the official [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
and [support policy](https://nextjs.org/support-policy). Next 14 is unsupported;
Next 16 is the Active LTS line. The project selects Node.js 24.x, supported by
[Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions);
local validation used Node.js 24.13.1. The first Vercel preview failed because the
Open Graph Edge function was 1.08 MB, exceeding the plan's 1 MB limit. The image
now uses Node.js and is generated at build time, avoiding that Edge bundle. The
old Edge setting was a Windows renderer workaround; the installed Next 16 Node
renderer uses `fileURLToPath` for its font and WASM files. Linux production build
and image checks cover the replacement; Windows rendering is not yet rechecked.
The rebuilt route is static in the prerender manifest and absent from Edge
functions. Production checks verify its PNG signature and 1200 × 630 dimensions,
alongside the existing authentication and private-asset regressions. The build,
production checks and lint pass (the same four scoped lint warnings remain).

## Validation evidence

Validation is against a local production build, with synthetic credentials for
private-route checks. Public live checks were read-only. No real email was sent,
no account was created and no private authentication credential was requested.

- `npm test`: 11 tests pass for the contribution feed and fallback behavior.
- `npm run lint`: zero errors; four scoped migration warnings described above.
- `npm run build`: production compilation, TypeScript and route generation pass.
- `npm audit`: zero reported vulnerabilities in the final installed dependency
  tree, compared with 11 in the baseline audit. This is a package advisory check,
  not evidence of exploitation or a complete security review.
- `npm run test:production`: starts two temporary loopback servers. Missing
  credentials fail closed even with a supplied Authorization header. The
  configured server rejects missing, malformed and incorrect credentials and
  an attempted middleware-subrequest bypass; nested/RSC routes remain gated.
  Synthetic valid authentication reaches the dashboard and a dynamic detail
  route. Public routes, unknown dynamic-route 404s, PDF bytes and the generated
  Open Graph PNG are checked. Blog content is empty, so its dynamic-route check
  covers the missing-post response.

- `npm run test:private-assets`: 59 public assets checked against 435 private
  source markers, with zero matching files or private-value matches. Private job
  routes are absent from the prerender manifest. Authenticated HTML provides a
  positive control for the marker detector; denied and route-alias responses
  contain no matching private values.
- Public browser checks cover seven routes at 1440, 375 and 320 px in both Basic
  and animated modes (42 views). No horizontal overflow, browser errors, failed
  requests or PDF RSC prefetches remain. Actual PDF download and keyboard menu
  dismissal pass. WCAG A/AA scans at desktop and 320 px were clear in Basic mode;
  the animated-mode scans found only the two shared footer contrast failures
  corrected in this revision.
- The rebuilt final source passes 16 focused views and WCAG A/AA scans across
  the homepage, projects, Vault project detail and contact pages at 1440 and
  320 px in both modes, with zero reported violations. Selected-filter colors
  and keyboard focus are asserted; project artwork labels and mobile contact
  layouts were visually inspected. Download and menu checks also pass again.

## Artifacts and release boundary

Generated local logs are stored outside Git under
`/tmp/galacia-portfolio-{build,lint,tests,production-test,browser,targeted}.log` and
`/tmp/galacia-portfolio-audit-final.json`. Browser screenshots and scan details
are in `/tmp/galacia-portfolio-qa/`. Live screenshots were captured through the
collaborative browser on 27 September; the public URL above is the reachable
live review location, while local artifacts describe unreleased source.
The `basic-` and `exciting-` screenshot prefixes identify the broad mode-specific
pass; `final-basic-` and `final-exciting-` identify the final targeted checks.
Unprefixed files in that temporary directory are earlier investigation images.

Review the exact PR revision and its Vercel preview before merging. A clean
local build, passing synthetic tests or a draft PR does not establish that this
revision has replaced the live website. No live private dashboard data was used
as a test fixture or copied into review notes.

The confirmed anonymous data retrieval was against a local build. The current
production deployment is recorded at source
`6f56f7a923352fab0ca9b0c7cbe5b68d92cc6948`, the pre-fix baseline, but this review
did not retrieve private values from live assets. A corrected deployment stops
the new build from exposing those values; it cannot retroactively erase old
browser/CDN caches or previously published immutable deployment URLs. Review
historical deployments and cache handling with the hosting operator separately.
Read-only checks of the previous generated production hostname returned Vercel
authentication redirects for the root, `/jobs` and a synthetic asset path. This
narrows the historical-deployment concern but does not establish that former
custom-domain assets or browser caches have been removed.
