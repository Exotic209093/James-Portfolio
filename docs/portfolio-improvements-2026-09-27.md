# Portfolio improvements — 27 September 2026

The owner requested a batch of improvements to the personal portfolio and authorized committing and merging the work. Source belongs in James-Portfolio; Vault release acceptance is separate.

## Delivered behavior

- Project search matches public names, descriptions and technologies, intersects branch filters, and uses identical results in grid and timeline views. Clear/reset actions, announced counts and an empty state make filtering reversible. Hidden projects remain excluded from the displayed collection.
- About provides CV/contact actions and section shortcuts near the top, puts professional experience before project history, and links project titles to their case studies.
- Contact supports copying the email address. If clipboard access fails, the labelled read-only address is focused and selected for manual copying; a status message explains the result. Native CV download and LinkedIn links are available alongside the email action.
- Navigation has a skip link, visible focus, 44 px mobile controls and a header display-mode toggle. Mobile navigation dismisses on Escape, outside interaction, focus leaving, route changes and desktop resize, with focus restoration. A resize/blur ordering race discovered in Chromium was corrected.
- Basic mode has opaque header/menu backgrounds. OS motion preferences work even when local storage throws; explicit choices persist where storage is available and synchronize across tabs.
- Basic mode removes the ambient backdrop. Homepage decorative loops stop when hidden, the scroll cue stops offscreen, and these effects honor reduced-motion/data-saving preferences. Hero and expertise content is present in server HTML.
- The 404 page offers project discovery as well as a route home.

## Validation

Production build and TypeScript pass. All 11 contribution-feed tests pass. ESLint has zero errors and the four previously documented warnings. Production authentication, cache, download, social-image and private-asset checks pass: 58 public files checked against 435 private-data markers, zero matches.

Twenty production-browser views cover Home, About, Projects, Contact and Open Source at 1440 px and 320 px in Basic and animated modes. No horizontal overflow, browser errors or WCAG A/AA scan violations were found after scrolling the page and allowing entrance animations to settle. Desktop and mobile screenshots were reviewed.

Interaction checks in both modes cover search/filter intersections, matching graph results, hidden-project exclusion, empty-state recovery, copy success and denied-clipboard fallback, CV download and the Experience jump. Dedicated navigation checks cover keyboard order, all menu dismissal paths, resize focus transfer, blocked storage before hydration, OS changes, reload persistence and real cross-tab storage events.

Homepage motion checks cover Basic, OS reduced motion, explicit animated mode with OS reduced motion, Save Data and slow 2G. Normal movement, offscreen stopping and a synthetic hidden-tab notification were verified. These checks establish behavior, not a measured battery or Core Web Vitals improvement.

## Separate experimental route

The unlisted `/lab` route exposed an existing React `removeChild` error during its imperative canvas initialization (`LabPlayground` clears a React-owned placeholder). That source is unchanged in this batch. A proposed `VideoHero` optimization was omitted because this existing lab failure prevented runtime qualification. Public portfolio flows above passed; this document does not claim the experimental lab passed.

Deployment and exact merge evidence are recorded in the owning pull request.
