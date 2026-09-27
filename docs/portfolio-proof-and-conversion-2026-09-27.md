# Portfolio proof and contact pass — 27 September 2026

Branch: `feat/portfolio-proof-and-conversion`, based on main `1535ec3`.
The owner authorised implementation, PR creation and merge.

## Delivered changes

- Homepage leads with manually selected WaveLink, Docify and Galacia case studies,
  using real evidence images, before expertise and history. Positioning describes
  Salesforce tools, document automation and websites in plain terms.
- Four reviewed narratives explain the problem, contribution, decisions, outcome
  and current scope. Actual evidence remains separate from concept artwork and
  the illustrative studios. Sources are linked where public.
- Case studies offer a relevant contact action and related projects selected by
  relevance. Contact resolves a known public project into a prefilled email subject;
  unknown or repeated query values fall back to generic contact.
- Review dates are labelled, Galacia hosting references use OVH, and Loft's broken
  Vercel link is removed. Loft remains a source-backed website build with an
  explicitly unavailable public preview; Galacia supplies the live website example.
- Lab canvas ownership, disposal and protected-pixel fallback are fixed. The lab
  is described as unlisted/experimental, not private.
- Optional free GA4 measurement is implemented without an added package. It requires
  a configured Measurement ID and explicit visitor opt-in. The owner explicitly deferred analytics activation
  and dashboard receipt until a future account setup; see the
  [activation guide](portfolio-analytics.md). No paid plan was activated.

Evidence asset sources and the genuine Docify synthetic render are documented in
[portfolio evidence](portfolio-evidence-2026-09-27.md). No customer records or private
renderer sources were published.

## Validation

The source build, unit suite, lint and production private-data/authentication checks
passed during implementation. Lint retains four existing warnings and no errors.
The public-asset check found zero matches across 435 distinctive private values.

Lab checks passed in Basic and Exciting modes at desktop/mobile widths, with zero
page or console errors. Six Strict Mode mount/unmount cycles verified fresh canvas
creation and disposal. Final case-study/mobile/accessibility and analytics-control
browser results are recorded in the PR before merge.

## Remaining external setup

Google Analytics activation was explicitly deferred by the owner on 27 September
2026: “let's leave that for now and move on note it down though”. The free standard
service remains the selected provider. Future activation needs the public `G-…`
web-stream Measurement ID and Enhanced Measurement disabled, followed by the
dashboard receipt check in the activation guide. Until then the deployed site
sends no analytics events. No further setup is required for this PR.

This portfolio work does not close Salesforce/Vault customer-readiness gates or
restore the separate Loft deployment.
