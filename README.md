# Clash Verge Themes — Neo Design System

A modular, spec-driven **Design System** delivered as injectable CSS for
[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) (stock,
CSS Injection only — no fork required).

> Not "a pretty CSS file". A token + component + state + motion system with
> three interchangeable theme skins. See
> [`specs/06-neo-design-system.md`](./specs/06-neo-design-system.md).

## Themes

| Theme | Entry | Positioning |
|-------|-------|-------------|
| **Cyber Nexus** (P0) | `themes/cyber-nexus/index.css` | Calm network control center — Linear / Raycast, restrained HUD glow |
| **AI Operator** (P1) | `themes/ai-operator/index.css` | AI agent console — Cursor / Claude Code energy, terminal-flavored |
| **Aurora Glass** (P2) | `themes/aurora-glass/index.css` | Apple / VisionOS calm — soft translucency, generous radius |

All three ship **full Light + Dark** via `prefers-color-scheme` (and
`html[data-theme]` when the host sets it).

## Usage

1. Clash Verge → **Settings → Theme Setting → Edit CSS**
2. Paste **one** `@import` line
3. Keep app theme mode on **系统** so light/dark follows the OS
4. Save

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@567d7fa/themes/cyber-nexus/index.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@567d7fa/themes/ai-operator/index.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@567d7fa/themes/aurora-glass/index.css");
```

> ⚠️ **Do not use `raw.githubusercontent.com`.** It serves `.css` as
> `Content-Type: text/plain` with `X-Content-Type-Options: nosniff`.
> Browsers/WebViews refuse to apply a stylesheet with the wrong MIME type
> under strict MIME checking — the `@import` silently does nothing.
>
> ⚠️ **Pin a commit hash, not `@develop`.** jsDelivr's branch alias
> (`@develop`) is aggressively cached; even after `purge.jsdelivr.net`
> it can keep serving yesterday's CSS for hours. Pinning the commit
> (e.g. `@567d7fa`) makes nested `@import`s resolve to the same revision
> and guarantees you see the latest theme. Update the hash after each
> push you care about.

> Work lives on **`develop`**. `main` is intentionally a placeholder.

## Architecture

```
core/
  tokens.css           # shared token names, spacing/radius/motion, LOCKED status colors
  reset.css            # narrow: focus ring + transition ergonomics only
  compatibility.css    # stock-DOM/MUI bridges — the ONLY file with concentrated !important

themes/
  cyber-nexus/    { index, colors, components, states, animation }.css
  ai-operator/    { index, colors, components, states, animation }.css
  aurora-glass/   { index, colors, components, states, animation }.css
```

Each theme's `index.css` imports, **in order**: `core/tokens.css` →
`core/reset.css` → local `colors.css` → `components.css` → `states.css` →
`animation.css` → `core/compatibility.css` (last, so it can win against
the app's post-import rules and `<html>` inline style vars — see
[`specs/05-dom-injection.md`](./specs/05-dom-injection.md)).

## Engineering rules (enforced by review, not lint)

- No bare `*`, `div`, `span`, `button`, `img`, `svg`, `body` restyles outside `core/reset.css`
- No `display`/`position`/`width`/`height` changes to the app shell
- `!important` confined to `core/compatibility.css`
- Status colors (`--cv-success` / `--cv-warning` / `--cv-error`) are locked in
  `core/tokens.css` — themes must never redefine them
- Target stable classes (`.layout`, `.base-container`, `.the-menu`,
  `.MuiDialog-paper`, …) — never Emotion hashes (`css-xxxxx`)

## Add a new theme

```bash
cp -r themes/cyber-nexus themes/my-theme
# edit colors.css (palette), components.css (surfaces), states.css, animation.css
# index.css import paths stay the same shape
```

## Limits

- Emotion hashed classes and rare inline `style=` colors may still leak on some list rows.
- Needs network for `@import`. Use jsDelivr **only** — raw GitHub URLs are broken (wrong MIME type, see warning above).

## SDD

| Spec | Path |
|------|------|
| Brief | [`specs/00-brief.md`](./specs/00-brief.md) |
| Requirements | [`specs/01-requirements.md`](./specs/01-requirements.md) |
| Design | [`specs/02-design.md`](./specs/02-design.md) |
| Acceptance | [`specs/03-acceptance.md`](./specs/03-acceptance.md) |
| Parity (legacy, archived) | [`specs/04-parity.md`](./specs/04-parity.md) |
| DOM injection constraints | [`specs/05-dom-injection.md`](./specs/05-dom-injection.md) |
| **Neo Design System (current)** | [`specs/06-neo-design-system.md`](./specs/06-neo-design-system.md) |
| Phase 1 audit | [`docs/phase1-audit.md`](./docs/phase1-audit.md) |

## License

MIT © endlessYoung
