# gettheflockouttahere.org — Site Architecture Document

**Status:** Draft v0.1
**Last updated:** 2026-07-30
**Maintainer:** (fill in)

## 1. Purpose and scope

gettheflockouttahere.org (formerly deflockeaston.org, which now redirects to
it) is a static advocacy site opposing Flock Safety automated license plate
reader (ALPR) cameras already installed in Easton, Maryland. It exists to
explain the technology, document local government action, and direct
visitors to community channels for organizing toward removal and a local
ban ordinance.

This document describes the technical architecture: stack, repo layout,
content model, and deployment pipeline.

## 2. Goals and constraints

- Fully static. No form backends, no databases, no server-side logic.
- Fast, accessible, low-JS. Content and sourcing matter more than interactivity.
- Every factual claim (camera counts, timelines, quotes) traceable to a source.
- Easy for non-developers to review proposed content changes via pull request.

## 3. Tech stack

| Layer | Choice |
|---|---|
| Static site generator | Hugo (extended) |
| CSS | Tailwind CSS, compiled via CLI as a pre-build step |
| Hosting | Cloudflare Pages, deployed from Git |
| DNS | Cloudflare (same account as Pages project) |
| Version control | Git (GitHub) |
| Forms / backend | None. Community coordination happens off-site (Discord) |

## 4. Repository layout

```
deflockeaston/
├── content/
│   ├── _index.md
│   ├── what-is-flock/_index.md
│   ├── local-status/_index.md   # disabled: `_build: {render: false, list: false}`
│   ├── liberty-is-not-the-price-of-safety/
│   │   ├── _index.md
│   │   └── benjamin-franklin-liberty.jpg
│   ├── the-ordinance/
│   │   ├── _index.md
│   │   ├── easton-alpr-ban-ordinance.pdf
│   │   └── easton-alpr-ban-ordinance.odt
│   ├── take-action/_index.md
│   ├── faq/_index.md
│   ├── updates/
│   │   ├── _index.md
│   │   └── <slug>/index.md
│   └── about/_index.md
├── data/
│   └── council.yaml
├── themes/
│   └── deflock/                 # all visual/presentational elements live here
│       ├── theme.toml
│       ├── archetypes/
│       │   └── updates.md
│       ├── layouts/
│       │   ├── _default/
│       │   │   ├── baseof.html
│       │   │   ├── single.html
│       │   │   ├── single.txt.txt   # plain-text rendition, all pages
│       │   │   ├── list.html
│       │   │   └── list.txt.txt
│       │   ├── partials/
│       │   │   ├── head.html
│       │   │   ├── nav.html
│       │   │   └── footer.html
│       │   └── shortcodes/
│       │       ├── community-link.html
│       │       └── council-table.html
│       ├── assets/
│       │   └── css/
│       │       └── main.css     # Tailwind entry point
│       ├── tailwind.config.js   # theme's design tokens (color, type)
│       └── postcss.config.js
├── static/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── images/
│   ├── _headers                 # must live under static/ — Hugo only
│   └── _redirects               # copies static/*, not the repo root
├── config/
│   └── _default/
│       ├── hugo.yaml            # sets `theme: deflock`
│       ├── menus.yaml
│       └── params.yaml
├── package.json
├── wrangler.toml
└── CHANGELOG.md
```

Site-specific material (content, data, config, raw images) lives at the repo
root. Everything that defines how the site *looks* — templates, shortcodes,
archetypes, and the Tailwind design tokens — lives in `themes/deflock/`. This
keeps the theme swappable in principle, even though in practice it's built
only for this site and isn't published separately.

## 5. Content architecture

```
/                              Home: the issue, the ask, the stakes
/what-is-flock/                Explainer: ALPR, what cameras capture, how data flows
/liberty-is-not-the-price-of-safety/  Franklin-quote essay, the campaign's manifesto
/the-ordinance/                Draft ban ordinance text, plus PDF/ODT downloads
/take-action/                  Discord link, contact templates, meeting schedule
/faq/
/updates/                      Dated posts: council meetings, records requests, news
/updates/<slug>/
/about/
```

Every top-level article page (`what-is-flock`, `liberty-is-not-the-price-of-safety`,
`the-ordinance`, `take-action`, `faq`, `about`) is a **branch bundle**
(`_index.md`, defining its own section) and **must set `layout: single`**
in front matter, or Hugo silently renders it through `_default/list.html`'s
generic fallback instead — it still builds, still looks plausible, but
loses the eyebrow label, the correct heading scale, and the plain-text
link. This exact bug shipped on `the-ordinance` (front matter had every
other field except `layout: single`) before being caught by a rendering
diff against a known-good page. If a new top-level page looks slightly
off — no eyebrow, no `sm:` heading breakpoint — check this first.

A page bundle can carry real downloadable files alongside its `_index.md`
(see `the-ordinance/`) — Hugo publishes any non-content file sitting next
to it automatically, no template wiring required. Link to them with a
plain relative markdown link matching the filename
(`[PDF](easton-alpr-ban-ordinance.pdf)`). Files with a Hugo-recognized
content extension (`.md`, `.org`, ...) are the exception: those get
parsed as their own content page instead of published as a static
resource, which is almost never what you want for a source/working file —
keep drafts in `.org`/`.odt` out of `content/` entirely (see `drafts/` at
the repo root), and only keep the final artifact once it needs to be a
public download.

## 6. Data files

`data/council.yaml` holds current elected officials and contact info for
`/take-action/`, rendered via the `council-table` shortcode.

## 7. Plain-text output

Every page also renders a plain-text version alongside its HTML, linked
automatically ("Plain text version ↗") wherever the page itself renders —
`single.html` and `list.html` each check `.OutputFormats.Get "txt"` and
print the link only when it exists, so nothing needs wiring per-page.

- `config/_default/hugo.yaml` defines the `TXT` output format
  (`text/plain`, `baseName: index` → `index.txt`) and enables it for the
  `home`, `section`, and `page` Hugo kinds — i.e. everywhere.
- `themes/deflock/layouts/_default/single.txt.txt` and `list.txt.txt`
  render it: title, description, then `.Plain` (Hugo's tags-stripped
  rendition of the content) piped through `htmlUnescape`. That last part
  matters — `.Plain` strips HTML *tags* but leaves entities like `&rsquo;`
  from Goldmark's typographer extension (smart quotes) undecoded; without
  `htmlUnescape` the plain-text output has literal `&rsquo;` in it instead
  of `’`.
- `list.txt.txt` also enumerates child pages (title + permalink) for
  section-listing pages, skipped on the home page.

## 8. Theming

Custom, minimal Tailwind-based theme, packaged as a local Hugo theme at
`themes/deflock/` and activated via `theme: deflock` in
`config/_default/hugo.yaml`. No third-party Hugo theme dependency.

Tailwind compiles as a pre-build step, reading from and writing to paths
under the theme, with output landing in the site's `static/` so Hugo picks
it up like any other static asset:

```
npm install && npm run build:css && hugo --gc --minify
```

(`build:css` runs `tailwindcss --config ./themes/deflock/tailwind.config.js
-i ./themes/deflock/assets/css/main.css -o ./static/css/main.css --minify`.)

Output directory: `public`.

## 9. Deployment (Cloudflare Pages)

| Setting | Value |
|---|---|
| Build command | `npm install && npm run build:css && hugo --gc --minify` |
| Build output directory | `public` |
| Root directory | `/` |
| Environment variable | `HUGO_VERSION` pinned to extended edition |
| Environment variable | `NODE_VERSION` pinned to match local dev |
| Production branch | `main` |
| Preview deployments | Automatic on every PR branch |
| Custom domains | `gettheflockouttahere.org` (primary), `deflockeaston.org` (secondary) |

Both domains are attached to the same Cloudflare Pages project, with
`gettheflockouttahere.org` set as the primary domain — Cloudflare Pages
automatically 301-redirects the secondary domain to it. `baseURL` and all
canonical/OG URLs in the site config point at the primary domain.

Two ways to ship a build, both valid:

1. **Git integration** (dashboard-configured): the settings table above,
   connected to this repo. Cloudflare runs the build itself on every push
   and gets automatic preview deployments per PR branch for free.
2. **`wrangler.toml`** (repo root): either run `wrangler pages deploy
   public` yourself after building, or — what actually happens here, since
   the repo is *also* connected via Git integration — Cloudflare Pages'
   own build system detects `wrangler.toml`'s `pages_build_output_dir` and
   runs `wrangler pages deploy public` as its own deploy step, inside the
   build. That inner `wrangler` call needs a `CLOUDFLARE_API_TOKEN`
   environment variable set in the Pages project's build settings, with
   the **Cloudflare Pages: Edit** permission — without it, or if `name` in
   `wrangler.toml` doesn't exactly match the existing Pages project name,
   the deploy fails with a misleading `Authentication error [code:
   10000]` that looks like a token problem but usually isn't one. Project
   name: `gettheflockouttahere` (**no** `-org` suffix — check this first
   if a deploy fails with that error).

`static/_headers` (must live under `static/`, not the repo root — Hugo
only copies `static/*` into the build output):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
```

## 10. Changelog specification

`CHANGELOG.md` at the repo root is engineering-only: builds, layouts,
dependencies, config, deployment. Follows the Keep a Changelog format,
versioned by date since this project doesn't ship discrete numbered
releases.

Format:

```markdown
# Changelog

All notable changes to this repository are documented here.
Format based on Keep a Changelog (keepachangelog.com).

## [Unreleased]

## [2026-07-27]
### Added
- Tailwind CSS build step
- legal-ref shortcode and data/legal_refs.yaml
### Changed
- Replaced planned form backend with static Discord/Session links on /take-action/

## [2026-07-20]
### Added
- Initial Hugo scaffold and Cloudflare Pages config
```

Rules:
- Every merged PR that changes layouts, config, data schema, or deployment
  settings gets an entry.
- Categories: Added, Changed, Deprecated, Removed, Fixed, Security.
- Wording is technical and terse. This file is for maintainers and
  contributors, not the public.
- Dated entries, not semantic version numbers, since the site has no versioned
  releases in the software sense.

**There is no public-facing `/changelog/`.** An earlier draft of this site
had one — a visible correction log for published claims (cost figures,
legal citations, timeline facts). That was a misreading of what this site
needed: it was never meant to store public content, only to track
engineering changes. It has been removed (content, archetype, list-view
template branch, badge styling, permalink config). Don't reintroduce a
public changelog section without checking with the maintainer first — if
a published claim needs correcting, just correct it.

## 11. Open items

- Draft Discord house rules before publishing the invite link on
  `/take-action/`, given the topic is likely to attract bad-faith joiners.
