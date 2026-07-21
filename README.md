# Clash Verge Themes

Spec-driven theme CSS packs for [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev).  
Hosted for one-line `@import` via CSS Injection — no fork required.

> SDD specs live in [`/specs`](./specs). Implementation follows those specs.

## Themes

| Pack | File | Character |
|------|------|-----------|
| **Obsidian Glass** | `themes/obsidian.css` | Calm glass, ice blue |
| **Signal Instrument** | `themes/signal.css` | Sharp instrument panel |
| **Paper Atelier** | `themes/paper.css` | Warm editorial paper |
| **Neon Circuit** | `themes/neon.css` | Cyan / magenta energy |

Each file includes **Light + Dark** (follows app Theme Mode / `data-theme`).

## Usage

1. Clash Verge → **Settings → Theme Setting → Edit CSS**
2. Paste **one** of the lines below (only one pack at a time)
3. Save

### Preferred (jsDelivr)

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@main/themes/obsidian.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@main/themes/signal.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@main/themes/paper.css");
```

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@main/themes/neon.css");
```

### Fallback (GitHub raw)

```css
@import url("https://raw.githubusercontent.com/endlessYoung/clash-verge-themes/main/themes/obsidian.css");
```

## Limits

- Shell / MUI surfaces / CSS variables: good coverage.
- Some in-app hardcoded inline colors (proxy cards etc.) may not fully change.
- Needs network for first load of `@import`. Offline = theme won't fetch.
- After first publish, jsDelivr may cache for a few minutes.

## SDD

| Spec | Path |
|------|------|
| Brief | [`specs/00-brief.md`](./specs/00-brief.md) |
| Requirements | [`specs/01-requirements.md`](./specs/01-requirements.md) |
| Design | [`specs/02-design.md`](./specs/02-design.md) |
| Acceptance | [`specs/03-acceptance.md`](./specs/03-acceptance.md) |

## License

MIT © endlessYoung
