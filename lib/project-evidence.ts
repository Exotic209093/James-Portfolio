export interface ProjectEvidence {
  image: string
  alt: string
  caption: string
  sourceUrl?: string
  sourceLabel?: string
}

// Published screenshots and generated samples, kept separate from concept art.
// Provenance and verification limits: docs/portfolio-evidence-2026-09-27.md.
export const projectEvidence: Record<string, ProjectEvidence> = {
  docify: {
    image: '/projects/evidence/docify-sample.webp',
    alt: 'A one-page fictional project brief rendered by Docify, with headings, a styled deliverables table and an explicit synthetic-example notice.',
    caption: 'Actual Docify output generated on 27 September 2026 from a newly written, fictional HTML and CSS template. The same layout produced the page image and the downloadable PDF; no customer content was used.',
    sourceUrl: '/projects/evidence/docify-sample.pdf',
    sourceLabel: 'Open the generated PDF',
  },
  'wave-link': {
    image: '/projects/evidence/wavelink-export.webp',
    alt: 'WaveLink Export workspace with a SOQL query, export controls and redacted connection details.',
    caption: 'Actual extension screenshot from the packaged v0.6.0 release candidate, captured on 30 August 2026. Organisation, user and record identifiers were redacted before the original capture.',
    sourceUrl: 'https://github.com/Exotic209093/WaveLink/blob/e6a396b59e6e1c1febe5ec85c4765af74c971bf7/screenshots/README.md',
    sourceLabel: 'View the screenshot provenance',
  },
  galacia: {
    image: '/projects/evidence/galacia-live.webp',
    alt: 'Galacia’s live public homepage introducing Salesforce file storage and showing the development status of its products.',
    caption: 'The public Galacia website, captured on 27 September 2026. The website is live; Vault and Hosting remain in development, while Docs, Track and Connect are planned concepts.',
    sourceUrl: 'https://galacia.app',
    sourceLabel: 'Visit the live website',
  },
}
