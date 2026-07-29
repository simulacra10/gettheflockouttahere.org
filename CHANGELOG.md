# Changelog

All notable changes to this repository are documented here.
Format based on Keep a Changelog (keepachangelog.com).

## [Unreleased]

## [2026-07-29]
### Fixed
- `.page-hero img` on the Liberty essay: removed the grayscale filter per
  feedback (full color now), and replaced `object-position: top` with
  `center 30%`. The source portrait has a lot of headroom above the head;
  `top` cropped on blank background and cut off the chin — worst on short
  viewports (~700px tall), where it cut through the eyes entirely.
  Verified across mobile, short-desktop, and tall-desktop heights.
- `object-position: center 30%` still wasn't right on normal-height desktop
  (cropped his hairline) — root cause was `h-[Nvh]` sizing the hero off
  *viewport height*, so the same crop percentage landed differently on
  every window size. Switched to a fixed `aspect-[3/4] sm:aspect-[16/9]`
  (driven by container width, which is far more constrained) so the crop
  is deterministic, then tuned `object-position` once against that.
  Verified identical framing at 900px, 700px, and 500px viewport heights
  at the same width, plus mobile.

### Changed
- Redesigned rendering of `/liberty-is-not-the-price-of-safety/` as a proper
  broadside/pamphlet page rather than plain prose:
  - `.page-hero`/`.hero-quote` CSS added (`main.css`) — these classes were
    already in the page's markdown but were never styled, so the Franklin
    portrait and pull-quote rendered as plain unstyled elements. Portrait
    gets a duotone (grayscale) treatment; the quote gets a dark ink panel
    with an oversized decorative quotation mark and mono attribution.
  - Added a `.proclamation` component for the page's closing call to
    action, using the same dark-panel "voice" as the hero quote so
    Franklin's historical judgment and the present-day ask visually rhyme.
  - `.prose-site` headings had no type scale at all (Tailwind's preflight
    normalizes every heading to the same size), so h1/h2/h3 were visually
    identical — fixed with real sizes and a top-rule divider on h2 for part
    breaks. Also styled bare `<blockquote>` (previously invisible).
  - Fixed heading levels in the content itself: the page had four H1s (the
    template's own title plus three `#` part-dividers in the body) — the
    three body dividers are now `##`, and their `##` subheads are now
    `###`, giving one clean two-tier structure under the page's real H1.
  - `single.html`'s type badge (correction/update/addition, meant only for
    changelog entries) was firing for *any* page with a Hugo `type` front
    matter value, rendering a meaningless "PAGE" badge here. Scoped it to
    `.Section == "changelog"`. Added an eyebrow label ("A PAMPHLET FOR
    EASTON") for this page.

### Added
- Added `/liberty-is-not-the-price-of-safety/` (new page bundle with hero
  image) to the main nav, right after "What is Flock?"
  (`config/_default/menus.yaml`).

## [2026-07-28]
### Changed
- Disabled `/local-status/` rather than deleting it: added
  `_build: {render: false, list: false}` to `content/local-status/_index.md`
  so it produces no page, no sitemap entry, and 404s even by direct URL,
  while keeping the source in the repo for a future re-enable. Removed it
  from the nav (`config/_default/menus.yaml`) and its eyebrow-label entry
  in `single.html`. No other page linked to it.

### Removed
- Eliminated Session as a community channel: dropped the "Join on Session"
  button from `/take-action/`, the `session_url` param, the FAQ mention,
  and simplified the `community-link` shortcode to Discord-only (no more
  `platform` param). Updated `ARCHITECTURE.md` accordingly. Set the real
  Discord invite (`discord_url`) at the same time.

### Added
- Appended an "In the news" section to the home page, sourced from
  `drafts/index.org` — ten Flock Safety news links as plain paragraphs (no
  list markers, per explicit preference).

### Fixed
- `.prose-site` had no list-marker styles at all — Tailwind's preflight
  strips default `ol`/`ul` markers, and nothing re-enabled them, so any
  numbered or bulleted list in page content (e.g. the capture-field list on
  `/what-is-flock/`) silently rendered with no visible markers. Added
  `list-decimal`/`list-disc` rules in `main.css`.

### Changed
- Moved `About` from footer-only into the main nav. Removed `Changelog`
  from the footer (`config/_default/menus.yaml`); the page itself is
  untouched and still reachable via in-content links (home, About, FAQ).
  Updated the corresponding rule in `ARCHITECTURE.md` § 9.2.

### Changed
- Swept remaining "proposed"/"considering" framing left over from the
  original site (which treated Flock cameras as a pending decision) and
  replaced it with the current facts: two cameras already installed in
  Easton, campaign goal is removal plus a ban ordinance. Updated home page
  `description`, `local-status/` (which previously said "no confirmed
  contract" — no longer accurate), `about/`, `what-is-flock/`,
  `take-action/`, and the site-launch update's `summary`.

### Removed
- Deleted `/costs/` and `/legal/` sections as no longer relevant to the
  campaign: `content/costs/`, `content/legal/`, `data/costs.yaml`,
  `data/legal_refs.yaml`, and the `legal-ref`/`stat-card`/`stat-grid`
  shortcodes and `stat-card` partial that only existed to render them.
  Removed both from nav (`config/_default/menus.yaml`) and from the
  per-section eyebrow lookup (`single.html`). Fixed the resulting dead
  links in `/faq/`, `/what-is-flock/`, and the site-launch update post.
  The existing public changelog entry about a `/costs/` correction is left
  in place as historical record, per this site's own "entries are never
  deleted" policy.

### Fixed
- The homepage hero's "scan panel" originally presented invented specifics
  (a fabricated 99.7% read-confidence figure, a joke plate read, "RETENTION:
  UNDISCLOSED" stated as fact) captioned "Not a mockup" — an unsourced claim
  of literal accuracy on a site whose stated policy is that every factual
  claim is sourced. Rewrote it as explicitly illustrative: bracketed
  placeholder values, a "Specimen" stamp, and a caption that says so
  outright and points to `/costs/` and `/legal/` for what's actually
  confirmed.

### Changed
- Redesigned the visual system around an "evidence dossier" concept built
  from the subject's own materials: ALPR capture overlays, DMV citation
  tickets, and the Maryland license plate. New palette (plate-white ground,
  ink text, hotlist red accent, citation amber, scanner green reserved for
  the dark capture panel) and type system (Overpass display/UI, Overpass
  Mono for data/timestamps, system serif for long-form reading) in
  `tailwind.config.js` / `assets/css/main.css`.
- Added a signature hero element on `/`: a dark "scan panel" showing the
  exact field set a Flock camera logs per vehicle, per pass — makes the
  abstract capture concrete before a word of body copy is read.
- Added per-section "eyebrow" labels (BUDGET RECORD, CITATION INDEX, ...)
  naming what kind of record each page is, driven from `single.html` /
  `list.html`, no per-page front matter needed.
- Restyled cards (stat-card, legal-ref), badges (changelog type tags),
  buttons (primary/secondary), and the council table around the same
  ticket/plate motif (bolt-hole card corners, dashed ticket-stub badges).
- Added a skip-to-content link and visible focus outline (`baseof.html`,
  `main.css`) as part of the redesign's accessibility floor.

### Fixed
- `legal-ref` shortcode rendered an `<a>` as its root element wrapping
  nested `<p>` tags; when multiple calls appeared with no blank line
  between them (as on `/legal/`), Goldmark merged them into one Markdown
  paragraph, producing invalid nested-`<p>` HTML that browsers silently
  mangled into fragmented, broken-looking cards. This predates today's
  redesign — the new bolt-corner card styling just made it visible. Fixed
  by making the card root a `<div>` (a tag Goldmark's HTML-block parser
  recognizes) with the real link stretched over it via `::after`, and by
  adding blank lines between calls in `content/legal/_index.md`.

### Added
- Filled in `data/council.yaml` with current Town of Easton officials
  (Mayor, Council President, four ward councilmembers) on `/take-action/`.

### Removed
- Deleted superseded logo drafts `static/images/image.jpg` and
  `static/images/flock1.jpg`, unused anywhere in the site.

### Changed
- Extracted all presentational code into a local Hugo theme at
  `themes/deflock/`: layouts, partials, shortcodes, archetypes, and the
  Tailwind config/CSS entry point. Site config now sets `theme: deflock`.
  Content, data, and site config remain at the repo root.
- Updated `package.json` build:css to invoke Tailwind against the theme's
  config and CSS source, still outputting to root `static/css/main.css`.
- Replaced the logo with the new design, named
  `static/images/DeFlockEaston-v2.{jpg,png,svg,webm}`, added a cropped
  square mark (`static/images/DeFlockEaston-v2-mark.png`) as the favicon
  source, and regenerated `static/favicon.ico` from it. Hero image
  (`themes/deflock/layouts/_default/list.html`) and `social_image`
  (`config/_default/params.yaml`) updated to match.
- Removed the logo image from the nav bar (text wordmark only); the mark
  file is kept only as the favicon source.
- Primary domain changed to `gettheflockouttahere.org`; `deflockeaston.org`
  becomes a secondary domain that redirects to it. Updated `baseURL` and
  `static/robots.txt` accordingly.
- Added the full logo as a hero image on the home page.

## [2026-07-27]
### Added
- Initial Hugo scaffold per ARCHITECTURE.md: config, content sections,
  data files, layouts/partials/shortcodes.
- Tailwind CSS build step (`npm run build:css`).
- `legal-ref`, `stat-card`, `stat-grid`, and `council-table` shortcodes,
  and `data/legal_refs.yaml`, `data/costs.yaml`, `data/council.yaml`.
- `community-link` shortcode for Discord/Session links on `/take-action/`.
- Public `/changelog/` section and repository `CHANGELOG.md`.
- `_headers` and `_redirects` for Cloudflare Pages.
