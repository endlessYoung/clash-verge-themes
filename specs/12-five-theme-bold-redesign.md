# Spec 12 — Five-Theme Bold Redesign (Two-Family System)

Version: 1.0  
Status: **Implemented on develop (pending user visual QA)**  
Date: 2026-07-23  
Repo: `endlessYoung/clash-verge-themes` (`develop`)  
Skills applied: brainstorming · frontend-skill (app-surface restraint + motion budget)

---

## 1. Goal

Redesign the injectable theme pack into **five distinct themes** under a **two-family** discipline:

| Family | Themes | Boldness ceiling |
|--------|--------|------------------|
| **Spectacle** | Cyber Nexus, AI Operator | Material + typography both bold; glow / scan / locks allowed |
| **Calm** | Aurora Glass, Apple Classic, Apple Liquid Glass | Material + hierarchy bold; no neon / CRT / terminal slogans |

**Delivery cadence (user choice C):** design → user approves this Spec → implementation plan → then code. Cyber triad-spine glare already fixed in `5a005d4` as a stopgap; full Cyber redesign still in scope here.

---

## 2. Non-goals

- No Clash Verge Rev fork / in-app pack UI changes required for this Spec
- No shell layout geometry changes (sidebar width, grid, page structure)
- No recoloring of locked status tokens (`--cv-success` / `--cv-warning` / `--cv-error`)
- No decorative header slogans (e.g. `DECKER // ONLINE`)
- No default full-height multi-color sidebar spines (known glare failure)

---

## 3. Architecture (two-family)

### 3.1 Shared engineering rules

- Status colors locked in `core/tokens.css`
- Stock DOM bridges stay in `core/compatibility.css` + `core/emoji.css`
- Digit / flag / emoji font stack regressions must not return
- Source: `themes/<id>/{index,colors,components,states,animation}.css`
- Ship: `dist/<id>.css` via `scripts/build-dist.mjs`
- Users pin `@commit` on jsDelivr (never `@develop`, never `raw.githubusercontent.com`)

### 3.2 Theme IDs

| ID | Display name | Family |
|----|--------------|--------|
| `cyber-nexus` | Cyber Nexus | Spectacle |
| `ai-operator` | AI Operator | Spectacle |
| `aurora-glass` | Aurora Glass | Calm |
| `apple-classic` | Apple Classic | Calm |
| `apple-liquid` | Apple Liquid Glass | Calm |

### 3.3 Family shared discipline

**Spectacle**

- Allowed: scan beams, edge filaments, data locks, strong type ladder, instrument chrome
- Forbidden: default triad inset bars; large glow washing body copy; useless slogans

**Calm**

- Allowed: material, blur, soft light, whitespace, lift hierarchy
- Forbidden: neon triad, CRT scanlines, Orbitron chrome, terminal `$` cosplay, phosphor bloom

---

## 4. Visual theses (one line each)

1. **Cyber Nexus** — Night-deck HUD: chamfer panels + green primary signal; magenta/cyan only on focus accents.
2. **AI Operator** — Deep terminal console: mono data lock, channel rows, green/amber as process colors (not neon signage).
3. **Aurora Glass** — Aurora spatial glass: large soft radii, cool blue–violet wash, lift not stroke.
4. **Apple Classic** — Native Settings feel: system grays, single system blue, grouped lists, near-zero motion.
5. **Apple Liquid Glass** — Contemporary liquid glass: translucent stacks, hairline highlights, press/float only.

---

## 5. Component language

### 5.1 Sidebar

| Theme | Shape |
|-------|--------|
| Cyber | Chamfer items; selected = single left signal + inner wash; **no** triad spine |
| AI | Near-square channel rows; selected reads as active channel; faint matrix rows |
| Aurora | Large-radius pills; selected via lift shadow, not hard neon stroke |
| Classic | System list: small radius, gray selected fill, system-blue label/icon |
| Liquid | Translucent rail; selected = floating glass capsule |

### 5.2 Cards / large panels

| Theme | Default | Hover / focus-within |
|-------|---------|----------------------|
| Cyber | Matte chamfer bay; faint micro-grid | Filament + soft outer light; body text stays matte |
| AI | Dark terminal panel; denser row grid | Thin thruput lock chrome (utility, not slogan) |
| Aurora | Large-radius glass; ambient wash | Rise 2–4px; shadow one step deeper |
| Classic | Grouped white/dark blocks; hairline dividers | Background shift only; no showy lift |
| Liquid | Translucent stack + hairline highlight | Clear float + stronger edge highlight |

### 5.3 Data surfaces (traffic / latency)

- **Spectacle:** tabular mono + strong contrast; lock-scan / channel pulse allowed
- **Calm:** same readability; **no** scan décor; Classic sparsest; Liquid may only bump weight

---

## 6. Type & color

### 6.1 Type

| Theme | UI sans | Data mono | Display |
|-------|---------|-----------|---------|
| Cyber | CJK system stack | JetBrains Mono | Orbitron (English chrome only, restrained) |
| AI | CJK system stack | JetBrains Mono primary | No Orbitron |
| Aurora | CJK system stack | Mono only on data | No display face |
| Classic | `-apple-system` / Segoe / CJK system | System mono | None |
| Liquid | Same as Classic | System mono | None |

Chinese UI never uses Orbitron / display faces.

### 6.2 Primary palettes (character locks; hex may tune ±)

| Theme | Primary | Accent discipline |
|-------|---------|-------------------|
| Cyber | `#00FF88` | Magenta / cyan **focus-only** |
| AI | `#7EE787` dark / deep green light | Amber only beside warning semantics; zero neon bloom |
| Aurora | `#0A84FF` | Violet only as ambient wash, not second primary |
| Classic | `#007AFF` / `#0A84FF` | Grayscale + that single blue |
| Liquid | Same system blue | Hierarchy from translucency, not a second chroma |

### 6.3 Motion budget (2–3 beats max)

| Theme | Beats |
|-------|--------|
| Cyber | Content sweep · selected edge light · traffic lock scan |
| AI | Ultra-light caret pulse · channel bar pulse · hover row highlight |
| Aurora | Card hover lift · ultra-slow ambient drift |
| Classic | Essentially none; standard hover color only |
| Liquid | Card float · control press |

Respect `prefers-reduced-motion: reduce` → disable spectacle animations.

---

## 7. Implementation scope (after plan approval)

1. Rewrite `themes/cyber-nexus/**` under Spec 12 (keep no-triad-spine rule)
2. Rewrite `themes/ai-operator/**` (material + type both bold)
3. Rewrite `themes/aurora-glass/**` (Calm ceiling)
4. Add `themes/apple-classic/**` + dist
5. Add `themes/apple-liquid/**` + dist
6. Update `scripts/build-dist.mjs` theme list, README (5 imports), short Spec 12 note in tree
7. Build → push `develop` → publish five pinned `@import` URLs

**Out of this Spec’s code phase until plan approved:** no theme CSS edits beyond what user already shipped for the spine fix.

---

## 8. Acceptance

1. Five themes instantly distinguishable; family ceilings feel correct
2. Cyber default sidebar has **no** three-color vertical bars; focused text remains readable
3. Apple Classic + Liquid have no neon / CRT / terminal slogan chrome
4. Light + dark both work via `prefers-color-scheme` / `html[data-theme]`
5. Traffic digits and flag emoji do not regress
6. Each `dist/<id>.css` is a single injectable file; jsDelivr pin works
7. No shell geometry breakage; status colors unchanged

---

## 9. Decisions log (from brainstorming)

- Scope cadence: **C** — fix Cyber spine immediately; design AI/Aurora/Apple first (spine shipped `5a005d4`)
- Apple: **both** Classic HIG **and** Liquid Glass → two themes
- Catalog size: **A** — five themes total
- Boldness for AI/Aurora: **C** — material + typography
- Cyber in this redesign: **C** — full bold redesign (not freeze)
- Glare ceiling: **C** — per-theme; Cyber/AI flashier; Aurora + Apples restrained
- Program structure: **3** — two-family system

---

## 10. Spec self-review

- [x] No TBD / TODO placeholders left in requirements
- [x] Family rules consistent with per-theme theses
- [x] Scope = five themes + shared core; single implementation plan after approval
- [x] Ambiguities resolved: Apple = two IDs; Cyber included; no triad spine; status colors locked
