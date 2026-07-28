# gettheflockouttahere.org — Site Architecture Document

**Status:** Draft v0.1
**Last updated:** 2026-07-28
**Maintainer:** (fill in)

## 1. Purpose and scope

gettheflockouttahere.org (formerly deflockeaston.org, which now redirects to
it) is a static advocacy site opposing Flock Safety automated license plate
reader (ALPR) cameras already installed in Easton, Maryland. It exists to
explain the technology, document local government action, and direct
visitors to community channels for organizing toward removal and a local
ban ordinance.

This document describes the technical architecture: stack, repo layout, content
model, deployment pipeline, and the changelog system used to track both site
changes and factual corrections to published content.

## 2. Goals and constraints

- Fully static. No form backends, no databases, no server-side logic.
- Fast, accessible, low-JS. Content and sourcing matter more than interactivity.
- Every factual claim (camera counts, timelines, quotes) traceable to a source.
- Easy for non-developers to review proposed content changes via pull request.
- Transparent about corrections, since credibility is the core asset of an
  advocacy site on a factual/legal topic.

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
│   ├── local-status/_index.md
│   ├── take-action/_index.md
│   ├── faq/_index.md
│   ├── updates/
│   │   ├── _index.md
│   │   └── <slug>/index.md
│   ├── changelog/
│   │   ├── _index.md
│   │   └── <date>-<slug>.md
│   └── about/_index.md
├── data/
│   └── council.yaml
├── themes/
│   └── deflock/                 # all visual/presentational elements live here
│       ├── theme.toml
│       ├── archetypes/
│       │   ├── updates.md
│       │   └── changelog-entry.md
│       ├── layouts/
│       │   ├── _default/
│       │   │   ├── baseof.html
│       │   │   ├── single.html
│       │   │   └── list.html
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
│   └── images/
├── config/
│   └── _default/
│       ├── hugo.yaml            # sets `theme: deflock`
│       ├── menus.yaml
│       └── params.yaml
├── package.json
├── _headers
├── _redirects
└── CHANGELOG.md
```

Site-specific material (content, data, config, raw images) lives at the repo
root. Everything that defines how the site *looks* — templates, shortcodes,
archetypes, and the Tailwind design tokens — lives in `themes/deflock/`. This
keeps the theme swappable in principle, even though in practice it's built
only for this site and isn't published separately.

## 5. Content architecture

```
/                  Home: the issue, the ask, the stakes
/what-is-flock/    Explainer: ALPR, what cameras capture, how data flows
/local-status/     Where things stand in Easton / Talbot County
/take-action/      Discord link, contact templates, meeting schedule
/faq/
/updates/          Dated posts: council meetings, records requests, news
/updates/<slug>/
/changelog/        Public log of corrections and material updates to the site
/about/
```

## 6. Data files

`data/council.yaml` holds current elected officials and contact info for
`/take-action/`, rendered via the `council-table` shortcode.

## 7. Theming

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

## 8. Deployment (Cloudflare Pages)

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

`_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
```

## 9. Changelog specification

The site uses two separate changelogs, serving different audiences. Do not
merge them.

### 9.1 Repository changelog (`CHANGELOG.md`)

Tracks the codebase and site mechanics: builds, layouts, dependencies,
deployment config. Follows the Keep a Changelog format, versioned by date
since this project doesn't ship discrete numbered releases.

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

### 9.2 Public changelog (`/changelog/`)

A visible page on the site itself, distinct from the repo changelog. Tracks
corrections and material updates to published claims: cost figures, legal
citations, timeline facts, and any retraction. This exists because credibility
is the core asset of the site, and a visible, dated correction record heads
off "they just quietly changed the numbers" accusations.

Content model: one entry per correction/update, front matter driven so entries
can be listed and filtered.

`content/changelog/_index.md` front matter per entry (as a page bundle or
inline list, contributor's choice):

```yaml
date: 2026-07-27
title: "Corrected annual subscription estimate on /costs/"
type: correction   # correction | update | addition
summary: >
  The per-camera annual subscription figure was updated from $2,500 to
  $3,000 based on a public records response received 2026-07-24. The prior
  figure was estimated from a comparable jurisdiction's published contract.
affected_page: "/costs/"
source_url: "https://example.gov/records-response.pdf"
```

Rules:
- Anything that changes a number, a legal citation, a quote, or a factual claim
  after initial publication gets an entry here, no exceptions.
- Typo fixes, styling changes, and navigation changes do not go here; they go
  in `CHANGELOG.md` if they touch the repo at all.
- Each entry states what changed, why, and links the source that prompted the
  change. No entry states only "updated costs page."
- Entries are never deleted. If a correction is itself later found wrong, add
  a new entry rather than editing history.
- `/changelog/` isn't in the global nav or footer, but stays linked in-line
  from the pages that reference it (home, About) — reachable, not
  advertised as chrome.

### 9.3 Relationship between the two

| | Repo CHANGELOG.md | Public /changelog/ |
|---|---|---|
| Audience | Developers/contributors | General public |
| Tracks | Code, layout, config, deploy | Factual corrections, sourced updates |
| Location | Repo root | Live site page |
| Trigger | Any merged PR touching site mechanics | Any change to a published factual claim |
| Format | Keep a Changelog, dated | Structured entries with source links |

A single PR can require entries in both files if it, for example, both fixes a
shortcode bug and corrects a figure that was wrong because of that bug.

## 10. Open items

- Draft Discord house rules before publishing the invite link on
  `/take-action/`, given the topic is likely to attract bad-faith joiners.
