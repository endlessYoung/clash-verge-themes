# Clash Verge Themes — Neo Design System

A modular, spec-driven **Design System** delivered as injectable CSS for
[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) (stock,
CSS Injection only — no fork required).

Visual direction (Spec 07): **quiet data instrument** — tabular traffic /
latency numerals are the hero; almost no glow; accent color only on selected
nav and switches.

## Themes

| Theme | Dist (preferred) | Atmosphere |
|-------|------------------|------------|
| **Cyber Nexus** | `dist/cyber-nexus.css` | **DECKER HUD** — Orbitron + triad neon + CRT scanlines (Spec 10) |
| **AI Operator** | `dist/ai-operator.css` | Terminal console; green/amber data tones; zero glow |
| **Aurora Glass** | `dist/aurora-glass.css` | Quiet spatial glass; soft blue; restrained blur |

All three ship **full Light + Dark** via `prefers-color-scheme` (and
`html[data-theme]` when the host sets it).

## Usage

1. Clash Verge → **Settings → Theme Setting → Edit CSS**
2. Paste **one** `@import` line (use **`dist/`** — single file, no nested imports)
3. Keep app theme mode on **系统** so light/dark follows the OS
4. Save

Replace `<commit>` with the short hash from the latest push you care about:

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@<commit>/dist/cyber-nexus.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@<commit>/dist/ai-operator.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@<commit>/dist/aurora-glass.css");
```

> ⚠️ **Do not use `raw.githubusercontent.com`.** Wrong MIME (`text/plain` +
> `nosniff`) → stylesheet silently ignored.
>
> ⚠️ **Pin a commit hash, not `@develop`.** jsDelivr branch aliases cache
> aggressively. Update the hash after each push you care about.
>
> Work lives on **`develop`**. `main` is intentionally a placeholder.

## Build (maintainers)

```bash
npm run build
# → dist/cyber-nexus.css, dist/ai-operator.css, dist/aurora-glass.css
```

Source modules under `themes/*/` remain the edit surface; `dist/` is the
user-facing delivery.

## Architecture

```
core/
  tokens.css           # shared token names, LOCKED status colors
  reset.css
  compatibility.css    # stock-DOM bridges (!important concentrated here)

themes/<name>/         # source: colors → components → states → animation
dist/<name>.css        # flattened single-file for CSS Injection
scripts/build-dist.mjs
```

## Engineering rules

- No bare `*`, `div`, `span`, `button`, `img`, `svg` restyles outside reset
- No shell layout geometry changes
- Status colors locked in `core/tokens.css`
- Mono / tabular-nums only on `.the-traffic` and `.the-delay`
- Target stable classes — never Emotion hashes

## SDD

| Spec | Path |
|------|------|
| DOM injection | [`specs/05-dom-injection.md`](./specs/05-dom-injection.md) |
| Neo Design System | [`specs/06-neo-design-system.md`](./specs/06-neo-design-system.md) |
| **Data instrument revision (current)** | [`specs/07-data-instrument-revision.md`](./specs/07-data-instrument-revision.md) |

## License

MIT © endlessYoung
