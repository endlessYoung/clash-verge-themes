# Spec 08 — Cyber Nexus · Structural Aviation HUD

Version: 1.0  
Status: **Approved — implemented**  
Date: 2026-07-23  
Repo: clash-verge-themes · branch `develop`  
Scope: **Cyber Nexus only** (Aurora / AI Operator unchanged)

Supersedes Spec 07 visual intensity **for Cyber Nexus**.  
Keeps Spec 07 delivery (`dist/*.css`), mono-on-data, locked status colors, and  
“no full-frame acid glow” anti-pattern.

---

## 0. Decisions locked

| # | Topic | Choice |
|---|--------|--------|
| 1 | Signature | **C — Aviation HUD / combat terminal** |
| 2 | Density | **M — Medium** |
| 3 | Scope | **1 — Cyber Nexus only** |
| 4 | Execution | **Approach 1 — Structural HUD** (pseudo-element chrome; no scan pulse) |

Success test: user feels “这是作战终端面板”，not “换了个青色的普通深色主题”.

---

## 1. Subject & job

- **Product:** Clash Verge — network control console  
- **Job of this skin:** Make the stock shell read as a **tactical instrument bay**  
- **Hero:** Structure (brackets, grid, tactical rail, locked readout) — not wallpaper glow  
- **Anti-defaults:**  
  - No every-card cyan bloom  
  - No purple-on-black AI skin  
  - No decoration that doesn’t encode “panel / readout / selected channel”

---

## 2. Signature system (what you remember)

One composition language, four devices:

1. **Micro-grid** — faint square grid on `.base-container` (page well), not on every card  
2. **Corner brackets** — 4 hairline L-corners on `.enhanced-card` / `.cv-card` (and settings Grid cards)  
3. **Tactical rail** — left sidebar: darker bay + 2px cyan leading edge (not full neon fill)  
4. **Locked readout** — `.the-traffic` framed as a small HUD lock box (brackets + mono numerals)

Cyan (`--cv-primary`) appears on: bracket tips, rail edge, selected nav bar, switch ON, readout frame.  
Cards themselves stay matte elevated panels (luminance lift), **no** multi-layer glow.

Optional (static only): 1px top hairline on page header — **no** animated scan sweep in v1.

---

## 3. Token direction (Cyber colors.css)

| Token | Direction |
|-------|-----------|
| `--cv-bg-primary` | Near-black instrument bay (`#03050a` class) |
| `--cv-bg-secondary` | Sidebar bay, slightly lifted |
| `--cv-surface-card` | Clear ΔL vs page (matte slate) |
| `--cv-primary` | HUD cyan — chrome & interaction only |
| `--cv-border-strong` | Cool neutral, not loud cyan |
| `--cv-effect-glow` | `none` (depth = luminance + brackets) |
| `--cv-ambient` | Soft grid via `background-image` on container (not radial neon wash) |
| `--cv-hud-bracket` | New helper: cyan at ~0.55–0.75 alpha for corners |
| `--cv-hud-grid` | New helper: ultra-low-contrast grid lines |

---

## 4. Component paint (Cyber components.css)

### 4.1 Page well

- `.base-container` / section: solid bay color + **micro-grid** background (CSS repeating-linear-gradient or tiny SVG data URI)  
- Opacity low enough that cards remain readable

### 4.2 Sidebar

- Darker than content  
- `border-left` or inset leading edge: 2px `var(--cv-primary)` at ~0.7 alpha  
- Selected nav: left bar + muted cyan wash (no bloom shadow)

### 4.3 Cards — corner brackets

Prefer **box-shadow hairlines** or **linear-gradient borders** if `::before`/`::after` are already used;  
if free, use two pseudo-elements with 4 corner strokes via multiple backgrounds.

Rules:

- Bracket arm length ~10–14px, stroke 1px  
- On hover: bracket alpha ↑ slightly; **no** translate bounce, **no** glow bloom  
- Remove any leftover top neon gradient bar from earlier revisions

### 4.4 Traffic readout

```
html body .the-traffic { … mono + tabular-nums … }
```

Wrap visually with padding + corner brackets / thin frame so the number cluster reads as a **lock target**.  
Do not mono the whole Chinese UI.

### 4.5 Delay numerals

Keep `.the-delay` mono + tabular-nums (Spec 07 · D).

### 4.6 Motion

- Transitions ≤ 200ms on border/bracket alpha only  
- `prefers-reduced-motion: reduce` → disable even those  
- No scanline animation in this revision

---

## 5. Delivery

- Edit `themes/cyber-nexus/{colors,components,states?,animation?}.css`  
- `npm run build` → refresh `dist/cyber-nexus.css`  
- Pin commit hash in user `@import`  
- Do not change Aurora / AI Operator sources

---

## 6. Acceptance

- [x] At a glance: micro-grid + corner brackets + tactical rail visible  
- [x] Traffic cluster reads as locked HUD readout  
- [x] No full-card cyan glow / ambient neon orbs  
- [x] Status green/yellow/red unchanged  
- [x] Chinese labels remain sans; only traffic/delay mono  
- [ ] Subjective: “有航电终端感”，不是“只换了颜色”

---

## 7. Approval

- [x] User approved this spec (2026-07-23)
- [x] Implemented on `develop`
