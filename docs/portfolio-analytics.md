# Portfolio measurement

The owner selected **Google Analytics 4 standard (free)**, then explicitly deferred
account setup and activation on 27 September 2026. The integration is ready
for a web-stream Measurement ID but collection is **not active**: Analytics redirects
to Google sign-in in this workspace and no `G-…` ID has been provided. No paid
subscription, Vercel analytics package or upgrade is required.

## Connect the account

1. Create/select a free GA4 property and a web data stream for `https://james-c.app`.
2. Turn **Enhanced Measurement off** for that stream. This integration sends explicit
   pageviews and clicks; automatic history, form, download, search and outbound-link
   events would duplicate the intended measurements.
3. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-…` in the Production environment and rebuild.
   This identifier is public; it is not a password or API secret. Leave it empty to
   disable both tracking and analytics preference controls.
4. Opt in using the usage-analytics controls below the footer on the deployed site.
   Verify the events in GA4 Realtime/DebugView before treating collection as live.

## What is counted

- `page_view`: public pages, including each project detail path.
- `cv_download_click`: clicking the CV link; it does not prove the transfer completed.
- `email_link_click`: opening a mail link; it does not prove a message was sent or
  received. Neither the address nor the subject/body is sent as an event property.

Only known public paths enter event data. `/jobs`, hidden projects, unknown paths,
API routes and the lab are excluded by default. URLs contain no query or fragment,
page titles come from the controlled path, and no parent referrer is forwarded.
Google signals and ad-personalisation settings are disabled.

Collection requires an explicit visitor opt-in and the exact production origin.
Do Not Track and Global Privacy Control suppress the tag and preference controls.
Previews and localhost do not collect. Visitors can turn tracking off using the same
controls; the tag is then destroyed. A stored preference remembers the choice. If
storage is unavailable, the choice applies only to the current page session.

The Google tag runs in a hidden, disposable `srcdoc` document with a neutral URL,
not in the parent application. It receives only validated constant paths and the two
allowed click names. This gives the tag a separate document and history to observe;
our integration does not forward parent navigation, contact queries or private
content. The frame shares the site's origin for cookie support and is not a security
sandbox against third-party code deliberately accessing its parent. A route change replaces the document;
entering an excluded route removes it entirely. No arbitrary event properties are
accepted through its message channel. Google may set analytics cookies after opt-in;
turning it off stops further collection but does not delete previously collected data.

## Acceptance and interpretation

Unit tests cover route allowlisting, URL redaction and intent-only click classification.
Browser validation must additionally check opt-in/revocation, route transitions,
DNT/GPC, exact-origin restrictions, and network payloads with a sentinel query string.
Final receipt in the owner's GA4 dashboard remains pending the Measurement ID and
stream configuration. Blocked and non-consenting visits will not appear; these are
interest signals, not complete traffic or sales totals.

References: [free Google Analytics](https://marketingplatform.google.com/about/analytics/),
[manual pageviews and Enhanced Measurement](https://developers.google.com/analytics/devguides/collection/ga4/views),
[event setup](https://developers.google.com/analytics/devguides/collection/ga4/events).
