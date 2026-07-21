# Clash Verge Themes

Spec-driven theme CSS packs for [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev).  
Hosted for one-line `@import` via CSS Injection — no fork required.

> **Parity:** Theme tokens & surfaces are generated from the in-app implementation  
> (`clash-verge-rev` → `src/assets/styles/themes/packs.scss` + `surfaces.scss`).  
> See [`specs/04-parity.md`](./specs/04-parity.md).

## Themes

| Pack | File | Character |
|------|------|-----------|
| **Obsidian Glass** | `themes/obsidian.css` | Calm glass, ice blue |
| **Signal Instrument** | `themes/signal.css` | Sharp instrument panel |
| **Paper Atelier** | `themes/paper.css` | Warm editorial paper |
| **Neon Circuit** | `themes/neon.css` | Cyan / magenta energy |

Each file includes the **full `--cv-*` token matrix** (colors, surfaces, radius, semantic, latency, fonts, motion) + Light/Dark + surface rules + pack flourishes.

## Usage

1. Clash Verge → **Settings → Theme Setting → Edit CSS**
2. Paste **one** line (only one pack at a time)
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

## Rebuild from upstream packs

If you update tokens in the Clash Verge Rev checkout:

```bash
node scripts/build-from-packs.mjs
```

(Path to `packs.scss` is set inside the script.)

## Limits

- Shell / MUI surfaces / full CSS variables: strong coverage (aligned with in-app packs).
- Emotion/`sx` hardcoded colors in upstream builds may still win in some list items.
- Needs network for `@import`. jsDelivr may cache a few minutes after push.

## SDD

| Spec | Path |
|------|------|
| Brief | [`specs/00-brief.md`](./specs/00-brief.md) |
| Requirements | [`specs/01-requirements.md`](./specs/01-requirements.md) |
| Design | [`specs/02-design.md`](./specs/02-design.md) |
| Acceptance | [`specs/03-acceptance.md`](./specs/03-acceptance.md) |
| Parity | [`specs/04-parity.md`](./specs/04-parity.md) |

## License

MIT © endlessYoung
