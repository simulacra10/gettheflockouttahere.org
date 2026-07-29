# gettheflockouttahere.org

**"Those who would give up essential Liberty, to purchase a little temporary
Safety, deserve neither Liberty nor Safety." — Benjamin Franklin, 1755**

This is the source for a campaign site opposing Flock Safety automatic
license plate reader (ALPR) cameras in Easton, Maryland — built to document
what these systems record, track what the town does about it, and organize
residents toward getting the cameras removed and a ban ordinance passed.

Live site: https://gettheflockouttahere.org/

## Copy it. Fork it. Use it against surveillance wherever you live.

This repository is **MIT licensed** (see [`LICENSE`](./LICENSE)) specifically
so that it's trivial to take. Fork it, strip out everything specific to
Easton, drop in your own town's facts, and stand up the same fight where you
live. No permission needed, no attribution required, no email to send us
first.

ALPR vendors are rolling out the same playbook in thousands of towns:
install first, ask forgiveness later, and count on nobody having the time
or tools to organize a response before the contract renews itself. A
license plate reader company can move faster than any one town's residents
— but it can't move faster than a hundred towns reusing the same toolkit.
That's the point of making this free and forkable: every fork is a little
more friction for a system that depends on nobody pushing back.

Concretely, that means you're free to:

- **Fork the whole site** and retarget it at your own town, county, or
  state — swap the logo, the facts, the officials, the news links, keep
  the structure.
- **Take just the pieces you want** — the public-changelog-for-corrections
  pattern, the sourced-citation shortcode, the council contact table, the
  "evidence dossier" design system — and drop them into something else
  entirely.
- **Modify anything.** Rewrite the argument, change the ask, translate it,
  redesign it. It's yours.
- **Use it for a different fight.** The mechanics here (sourced claims,
  public corrections, a direct ask, a way to contact power) aren't specific
  to ALPR cameras.

The only real request: if a fork of this helps get cameras out of your
town, we'd love to hear about it. Open an issue, or find us on
[Discord](https://discord.gg/qvJ8Mja4z). Not required — just genuinely
curious.

## What's in here

- **Hugo** static site (extended), no server, no database, no form backend.
- **Tailwind CSS**, compiled as a pre-build step.
- A custom theme at `themes/deflock/` — layouts, shortcodes, and the whole
  visual system are in there, separate from content.
- A **public changelog** (`/changelog/`) as a deliberate design pattern:
  when a published fact turns out to be wrong, it gets corrected in the
  open, not quietly edited away. Credibility is the whole asset on a page
  arguing against a surveillance company.
- `ARCHITECTURE.md` documents the stack, content model, and conventions in
  more detail than this file does.

## Running it locally

```sh
npm install
npm run build:css
hugo server -D
```

Build for production:

```sh
npm install
npm run build:css
hugo --gc --minify
```

Output lands in `public/`.

## License

MIT. See [`LICENSE`](./LICENSE). Do what you want with it.
