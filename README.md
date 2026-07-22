# Clash Verge Themes

Spec-driven theme CSS packs for [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev).  
Hosted for one-line `@import` via CSS Injection — no fork required.

> **v2 (DOM-aware):** Stock Clash Verge has **no** `data-theme` on `<html>`, and sets  
> legacy CSS vars as **inline styles** on `<html>`. Themes therefore **paint real DOM  
> selectors** with `!important`, and switch Light/Dark via `prefers-color-scheme`.  
> See [`specs/05-dom-injection.md`](./specs/05-dom-injection.md).

## Themes

| Pack | File | Character |
|------|------|-----------|
| **Obsidian Glass** | `themes/obsidian.css` | Calm glass, ice blue |
| **Signal Instrument** | `themes/signal.css` | Sharp instrument panel |
| **Paper Atelier** | `themes/paper.css` | Warm editorial paper |
| **Neon Circuit** | `themes/neon.css` | Cyan / magenta energy |

Tokens come from in-app `packs.scss`; application targets stock classes  
(`.layout`, `.base-container`, `.the-menu`, `.MuiDialog-paper`, …).

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

- Beats most shell / settings-card / dialog / nav surfaces on stock v2.5.x.
- Emotion hashed classes and some inline `style=` colors may still leak.
- Theme mode in app should stay **系统** so OS light/dark matches the CSS media query.
- Needs network for `@import`. jsDelivr may cache several minutes after push — prefer raw GitHub URL to verify.

## SDD

| Spec | Path |
|------|------|
| Brief | [`specs/00-brief.md`](./specs/00-brief.md) |
| Requirements | [`specs/01-requirements.md`](./specs/01-requirements.md) |
| Design | [`specs/02-design.md`](./specs/02-design.md) |
| Acceptance | [`specs/03-acceptance.md`](./specs/03-acceptance.md) |
| Parity | [`specs/04-parity.md`](./specs/04-parity.md) |
| DOM injection | [`specs/05-dom-injection.md`](./specs/05-dom-injection.md) |

## License

MIT © endlessYoung
