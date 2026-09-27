# Portfolio evidence reviewed on 27 September 2026

The assets in `public/projects/evidence/` are separate from the existing concept
art and illustrative studios. `lib/project-evidence.ts` supplies the factual
captions and links. No customer metrics or production-product acceptance claims
are inferred from these images.

## Docify

- Assets: `docify-sample.webp`, 1191 × 1685, and `docify-sample.pdf`.
- The owner-authorised private renderer was built in an isolated local checkout
  at commit `1cf0f5a380176c4bab749b2153a1c9b257d83091`. Its source and existing
  templates were not published or copied into this portfolio.
- Newly authored synthetic inputs are retained as
  [HTML](evidence/docify-sample.html) and [CSS](evidence/docify-sample.css). They
  contain no customer data or real project records. The sample identifies itself
  as fictional in both its visible content and PDF title.
- A small local driver passed these inputs to `Document::from_html(...)
  .with_css(...)`, registered regular and bold Outfit faces, and called
  `layout()` once. It then emitted PDF and PNG from that same result. The bundled
  Outfit font is licensed under the SIL Open Font License; no standalone font
  files are added to the portfolio.
- The successful run reported **one page and no renderer diagnostics**. PNG was
  emitted at 144 DPI, visually reviewed, and converted to WebP without changing
  its content. The PDF file header was verified. PDF tagging was enabled, but no
  new PDF/UA or wider accessibility certification is claimed for this sample.
- Toolchain: Rust 1.98.1, debug build. The private repository does not commit a
  Cargo lockfile; dependency resolution produced a local lockfile and the final
  sample was rendered with `--locked`. Build output and the renderer remain
  outside the portfolio repository.
- This demonstrates a real render of the supplied sample. It is not a benchmark,
  a customer outcome, or acceptance of every document format and template.

## WaveLink

- Asset: `wavelink-export.webp`, 1280 × 800.
- Source: the public repository's
  [Export screenshot](https://github.com/Exotic209093/WaveLink/blob/e6a396b59e6e1c1febe5ec85c4765af74c971bf7/screenshots/screenshot-02-export.png).
- The pinned [screenshot README](https://github.com/Exotic209093/WaveLink/blob/e6a396b59e6e1c1febe5ec85c4765af74c971bf7/screenshots/README.md)
  identifies this as a packaged v0.6.0 release-candidate capture from 30 August
  2026 and states that organisation, user and record identifiers were redacted
  before capture.
- Visually reviewed before reuse: the connection label is generic, a record
  identifier is explicitly redacted, and no customer records or credentials
  appear. The portfolio copy was converted to WebP without altering the view.
- This is evidence of the captured interface, not a claim that this exact
  release candidate is currently published or that an export was executed in
  this portfolio session.
- The older `public/projects/wavelink.png` was reviewed but not selected: its
  header contains a development-organisation hostname. The original asset was
  left unchanged.

## Galacia

- Asset: `galacia-live.webp`, 1246 × 800.
- Fresh anonymous capture of [galacia.app](https://galacia.app/) using the
  approved collaborative browser on 27 September 2026 at 22:59 UTC.
- The browser showed the public homepage and its explicit availability text.
  No account was opened and no private account information was captured.
- Converted to WebP without changing the view. The captured website is live;
  the screenshot does not establish that its advertised products have launched.

## The Loft Zante: no live image published

The advertised public URL, `https://the-loft-zante.vercel.app`, returned HTTP 404
with Vercel's `DEPLOYMENT_NOT_FOUND` response. The public repository homepage
still names that URL. GitHub records a successful production deployment on
12 September 2026 (deployment 6413458211), but its generated URL and the current
project/main aliases redirect anonymous requests to Vercel login.

No login bypass was attempted, and no local recreation or error page is being
presented as live evidence. Galacia supplies verified live website evidence for
this batch. The Loft repository remains a source reference rather than a
verified public live destination.
