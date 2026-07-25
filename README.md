# Clash Verge Themes — Neo Design System

Injectable CSS themes for
[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev)
(stock CSS Injection — no fork required).

**Spec 12** — five themes under a **two-family** system:

| Family | Themes | Ceiling |
|--------|--------|---------|
| **Spectacle** | Cyber Nexus, AI Operator | Bold material + type; glow/scan/locks OK |
| **Calm** | Aurora Glass, Apple Classic, Apple Liquid | Material/hierarchy; no neon/CRT |

## Themes

| Theme | Dist | Atmosphere |
|-------|------|------------|
| **Cyber Nexus** | `dist/cyber-nexus.css` | Night-deck HUD — chamfer, green signal, focus-only magenta/cyan |
| **AI Operator** | `dist/ai-operator.css` | Terminal console — `$` channels, mono thruput |
| **Aurora Glass** | `dist/aurora-glass.css` | Spatial glass — aurora wash, pill lift |
| **Apple Classic** | `dist/apple-classic.css` | iOS Settings HIG — list groups, green toggles, frosted header |
| **Apple Liquid Glass** | `dist/apple-liquid.css` | Same HIG tokens + frosted liquid materials, float/press |

All five ship **Light + Dark** via `prefers-color-scheme` (and `html[data-theme]`).

## Usage

1. Clash Verge → **Settings → Theme Setting → Edit CSS**
2. Paste **one** `@import` (use **`dist/`**)
3. Theme mode **系统** so light/dark follows OS
4. Save

Replace `<commit>` with the short hash from the push you care about:

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@<commit>/dist/cyber-nexus.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@<commit>/dist/ai-operator.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@<commit>/dist/aurora-glass.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@<commit>/dist/apple-classic.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@<commit>/dist/apple-liquid.css");
```

> ⚠️ **Do not use `raw.githubusercontent.com`.** Wrong MIME → stylesheet ignored.
>
> ⚠️ **Pin a commit hash, not `@develop`.** jsDelivr branch aliases cache hard.
>
> Work lives on **`develop`**.

## Build (maintainers)

```bash
npm run build
# → dist/cyber-nexus.css, ai-operator.css, aurora-glass.css,
#    apple-classic.css, apple-liquid.css
```

## Architecture

```
core/                  # tokens, reset, compatibility, emoji
themes/<name>/         # colors → components → states → animation
dist/<name>.css        # flattened single-file for injection
scripts/build-dist.mjs
specs/12-*.md          # Spec 12 design + plan
```

## Engineering rules

- No bare `*`, `div`, `span`, `button`, `img`, `svg` restyles outside reset
- No shell layout geometry changes
- Status colors locked in `core/tokens.css`
- Mono / tabular-nums only on `.the-traffic` and `.the-delay` (plus theme chrome labels)
- Never Emotion hashes
- Never triad default sidebar spines (Spec 12 glare rule)
