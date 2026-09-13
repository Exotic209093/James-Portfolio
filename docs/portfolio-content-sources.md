# Portfolio content refresh

Reviewed on 13 September 2026 against GitHub repositories and their default branches, including the connected account's private Galacia repositories.

| Content | Sources |
| --- | --- |
| Galacia brand and website | [Public website](https://galacia.app), private Galacia and Galacia-Website READMEs |
| Galacia Vault (formerly Nebula Vault) | [Public product page](https://galacia.app/galacia-vault/), private Galacia-Vault README |
| Title, location, skills, current focus | [Profile README](https://github.com/Exotic209093/Exotic209093/blob/main/README.md) |
| The Loft Zante | [Source](https://github.com/Exotic209093/the-loft-zante): package.json, app/page.tsx, components/MenuBrowser.tsx, components/Visit.tsx |
| File Insights | [README](https://github.com/Exotic209093/File-Insights#readme) |
| Infinite Idea | [README](https://github.com/Exotic209093/Infinity-Idea#readme) |
| Bloons Tower Defense | [README](https://github.com/Exotic209093/BloonsTD6#readme) |
| ExoCraft | [README](https://github.com/Exotic209093/ExoCraft#readme) |
| Flux Terminal | [README](https://github.com/Exotic209093/Flux-Terminal#readme), [v0.4.0 release](https://github.com/Exotic209093/Flux-Terminal/releases/tag/v0.4.0) |
| WaveLink | [README](https://github.com/Exotic209093/WaveLink#readme), [roadmap](https://github.com/Exotic209093/WaveLink/blob/main/roadmap.md) |

Updated project dates use GitHub repository pushed_at dates, or the reviewed release date, as activity dates. They are not original launch dates. Older project dates are retained.

WaveLink's roadmap takes precedence over older README migration claims. It records a narrower single-object copy direction and separates the published store version from newer development work. Do not describe roadmap milestones as shipped features.

The new SVG covers are illustrative artwork following the existing portfolio asset style, not screenshots. Repository forks were not added as original projects. Existing work history, education, certificates, resume, and other historical project entries were retained; this review does not independently verify them.

Galacia's website is live; Vault remains in development without public installation. Docs, Track, and Connect are planned concepts in discovery. Public project cards link to the website, not private code. The former Nebula Vault entry is updated rather than duplicated, and its old portfolio URL redirects permanently to Galacia Vault. Galacia's activity date comes from the website repository's latest local commit (10 September); the Vault rename was recorded on 9 September.

## Company and open-source pages

The `/galacia` company overview reuses the verified company/product context above. The public homepage and product URLs were checked again on 13 September 2026.

The original curated snapshot in `lib/contributions.ts` is now an offline fallback. Each saved entry was fetched from the upstream GitHub pull-request API and its author verified as `Exotic209093`.

- T3 Code: [#7861](https://github.com/pingdotgg/t3code/pull/7861), [#7814](https://github.com/pingdotgg/t3code/pull/7814), [#7801](https://github.com/pingdotgg/t3code/pull/7801), [#7815](https://github.com/pingdotgg/t3code/pull/7815) — open at review.
- Salesforce Inspector Reloaded: [#1172](https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1172) — merged 2 September 2026; [#1154](https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1154), [#1166](https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1166), [#1163](https://github.com/tprouvot/Salesforce-Inspector-reloaded/pull/1163) — open at review.

## Automatic contribution updates

`lib/github-contributions.ts` searches public upstream PRs by `Exotic209093` in the two repositories configured in `contributionProjects`. It discovers new PRs and reads their current titles, status, merge dates, and update times. Status comes from `merged_at`, `draft`, and `state`; closed alone never means merged. API content is rendered as text, without importing PR bodies or HTML.

`lib/contribution-feed.ts` caches each validated project response for 3,600 seconds using Next.js Data Cache. The `/open-source` page renders dynamically so it can request a refresh after the cache expires. This is request-driven revalidation, not a scheduled background job: after an idle period, a visit starts the refresh and subsequent requests receive the updated data. Open tabs do not poll automatically. No GitHub token, cron job, or recurring deployment is needed.

A failed background refresh retains the last successful cache entry. If no successful cache exists, the affected project uses the checked-in snapshot and explicitly displays its original date as saved data. Fallback values are never written into the successful-response cache. Requests have an eight-second timeout; HTTP errors, incomplete results, invalid response shapes, duplicate PRs, and unexpected authors/repositories are rejected. Successful empty searches remain empty.

The page includes up to 100 recently updated PRs per project, displaying six initially with an accessible native expansion control for the remainder. If a project has more than 100, it shows the actual total and links to the complete history on GitHub. Summary counts describe the feed, not lifetime totals. Sync timestamps belong to successful fetches, not page render times. Add another showcased project to `contributionProjects` when needed; PR updates within the configured projects need no manual edits.

Validation: `npm test` covers discovery and title/status changes, distinct status outcomes, partial results, untrusted result scope, independent fallback, empty results, HTTP 403/429/500, and the 100-item bound. The production build and lint pass. Browser checks confirmed 31 real upstream PRs, cached sync timestamps, expansion controls, and no overflow or browser errors at 390px and 1280px in both site modes.

Caching references: [Next.js unstable_cache](https://nextjs.org/docs/14/app/api-reference/functions/unstable_cache), [revalidation and error handling](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating).
