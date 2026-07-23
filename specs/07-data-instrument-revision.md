# Spec 07 — Data Instrument Revision

Version: 1.0  
Status: **Awaiting user review**  
Date: 2026-07-23  
Repo: clash-verge-themes · branch `develop`  
Skills applied: `grill-me` · `frontend-design` · `ui-ux-pro-max`

Supersedes visual direction of Spec 06 for the **next revision pass**.  
Architecture (core/ + themes/*/ modules) from Spec 06 remains; **delivery** changes to dist single-file.

---

## 0. Decisions locked (grill-me)

| # | Topic | Choice |
|---|--------|--------|
| 1 | Signature | **A — Data instrument** (tabular numbers + status colors are the hero) |
| 2 | Theme rollout | **2 — All three themes** share the signature; different atmospheres |
| 3 | Intensity | **Q — Quiet** (almost no glow; luminance hierarchy) |
| 4 | Mono scope | **D — Data only** (traffic / latency / status numerals) |
| 5 | Cyber accent | **C — Cyan kept**, only for selected nav / switches |
| 6 | Delivery | **F — `dist/*.css` single-file** for user `@import` |

---

## 1. Product / audience (frontend-design)

- **Subject:** Clash Verge — network control console for power users  
- **Audience:** Advanced users who stare at latency, throughput, and connection state  
- **Job of the theme:** Make stock v2.5.2 feel like a calm instrument panel, not a neon skin  
- **Anti-default:** Reject AI cluster “near-black + full-frame acid cyan glow”

---

## 2. Design system (ui-ux-pro-max aligned)

### Shared signature (all packs)

- Hero: **numeric readouts** (upload/download, latency, memory) in mono + tabular-nums  
- Status colors remain **locked** (`#22C55E` / `#FACC15` / `#EF4444`) — never theme accent  
- Depth from **background vs card luminance**, not box-shadow glow  
- Motion: 150–300ms; respect `prefers-reduced-motion`

### Per-theme atmosphere

| Theme | Atmosphere | Accent use |
|-------|-------------|------------|
| **Cyber Nexus** | OLED instrument bay | Cyan **only** on selected nav + switch ON |
| **Aurora Glass** | Quiet spatial / soft glass | Soft blue accent; blur allowed but restrained; no neon |
| **AI Operator** | Terminal console | Green/amber data tones; zero glow; sharp borders |

### Cyber Nexus palette (quiet revision)

| Token | Role | Direction |
|-------|------|-----------|
| `--cv-bg-primary` | Page | Near-OLED black (deeper than cards) |
| `--cv-surface-card` | Cards | Clearly lifted slate (ΔL visible without glow) |
| `--cv-primary` | Interaction | Cyan — selected / switch only |
| `--cv-effect-glow` | Elevation | **`none`** (or hairline border only) |
| `--cv-ambient` | Page wash | **`none`** or extremely subtle (prefer none) |

---

## 3. What changes in CSS

### Remove / reduce

- Card multi-layer cyan glow / ambient radial neon washes  
- Top neon gradient bars on every card (optional: remove for quiet)  
- `compatibility.css` / theme fights that re-introduce glow on Papers  

### Add / strengthen

- Clear **bg ↔ card** contrast (measurable step, not same navy-on-navy)  
- `.the-traffic` and latency numerals: mono + tabular-nums only (D)  
- Selected nav: left bar + muted fill (no bloom)  
- Switch ON: solid primary color, optional soft track — no large glow halo  

### Selectors

Keep targeting: `.enhanced-card`, `.cv-card`, `.the-traffic`, `.layout-*`, MUI stable classes.  
No Emotion hashes; no bare `svg`/`img`/`button`.

---

## 4. Delivery (F)

```
themes/<name>/     # source modules (index imports core + layers)
dist/
  cyber-nexus.css  # concatenated single file for injection
  aurora-glass.css
  ai-operator.css
scripts/build-dist.mjs  # flatten @import graph → dist/
```

**User-facing URL (after implement):**

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@<commit>/dist/cyber-nexus.css");
```

- Always **pin commit hash** (not `@develop`)  
- README: primary path = `dist/`; modules are for maintainers  

Build concatenates in Spec 06 order: tokens → reset → colors → components → states → animation → compatibility.

---

## 5. Implementation phases

| Phase | Work |
|-------|------|
| 1 | Add `scripts/build-dist.mjs` + wire README |
| 2 | Revise Cyber Nexus colors/components to quiet instrument |
| 3 | Align Aurora + AI Operator to shared signature (D + Q) |
| 4 | Build dist, push, give user commit-pinned `dist/` URLs |
| 5 | Screenshot review against “data-first, no neon skin” |

---

## 6. Acceptance

- [ ] Home cards read as **lifted panels** without glow  
- [ ] Traffic/latency numbers clearly mono; Chinese UI unchanged  
- [ ] Cyan appears on **selected nav / switch**, not every card border bloom  
- [ ] Status red/yellow/green unchanged  
- [ ] One-line `@import` of `dist/*.css` works (jsDelivr + commit pin)  
- [ ] User subjectively: “feels like an instrument, not a neon theme”

---

## 7. Approval

- [ ] User approved this spec  
- [ ] Proceed to implement on `develop`

**Reply 「批准」 to start implementation, or list change requests.**
