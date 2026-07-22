# Spec 06 — Clash Verge Neo Design System

Version: 1.0  
Status: **Awaiting user review**  
Date: 2026-07-22  
Repo: [endlessYoung/clash-verge-themes](https://github.com/endlessYoung/clash-verge-themes)  
Branch: `develop`

---

## 0. Decisions locked

| Item | Choice |
|------|--------|
| Scope | **A** — themes repo only (CSS Injection for stock Clash Verge Rev **v2.5.2**) |
| Architecture | **1** — modular tree; each theme has `index.css` entry (no required `dist/` build) |
| Legacy packs | **A** — delete `obsidian` / `signal` / `paper` / `neon` |
| New themes | Cyber Nexus → AI Operator → Aurora Glass |
| Default branch exposure | `main` stays placeholder; work lives on `develop` |

Related: [`05-dom-injection.md`](./05-dom-injection.md) (cascade constraints).

---

## 1. Positioning

**From:** a pile of CSS beautify files  
**To:** Clash Verge **Neo Design System** delivered as injectable CSS modules:

```
Design Token → Component Style → State System → Motion → Theme Layer
```

Emotional target on first open: *a calm, professional network control console for developers* — not cheap cyberpunk, not game UI, not heavy neon spam.

Keywords: Professional · Future · Calm · Elegant · Technical

---

## 2. Goals & non-goals

### Goals

- One-line `@import` of a theme `index.css` works on stock v2.5.2
- Preserve usable theming (colors, surfaces, nav/card/dialog polish)
- Fix injection failures caused by html inline vars / post-import app rules
- Stable, extensible folder layout for new themes
- Semantic status colors that themes must not override
- Unified spacing / radius / motion language

### Non-goals (this repo)

- Changing Clash Verge Rev React / MUI source
- Hiding layout structure (`display:none`, absolute repositioning of shell)
- Shipping an in-app theme pack picker (belongs to future app fork)

---

## 3. Repository layout

```
clash-verge-themes/
├── core/
│   ├── tokens.css           # Shared token *names*, status locks, spacing/radius/motion defaults
│   ├── reset.css            # Narrow; no broad element restyling
│   └── compatibility.css    # Stock DOM + MUI bridges; ONLY place for concentrated !important
├── themes/
│   ├── cyber-nexus/
│   │   ├── index.css        # Entry: imports core + local layers
│   │   ├── colors.css
│   │   ├── components.css
│   │   ├── states.css
│   │   └── animation.css
│   ├── aurora-glass/        # same shape
│   └── ai-operator/         # same shape (AI Operator / terminal console)
├── specs/                   # SDD
├── docs/
├── scripts/                 # optional helpers later; not required for v1 import path
├── README.md
└── LICENSE
```

**Delete on implementation:**  
`themes/obsidian.css`, `themes/signal.css`, `themes/paper.css`, `themes/neon.css`, and the old `scripts/build-from-packs.mjs` pipeline tied to Rev `packs.scss` (or rewrite later if needed — not blocking Neo scaffold).

---

## 4. Import contract (user-facing)

Theme mode in app should remain **系统** so `prefers-color-scheme` matches.

```css
@import url("https://raw.githubusercontent.com/endlessYoung/clash-verge-themes/develop/themes/cyber-nexus/index.css");
```

`index.css` order (mandatory):

1. `../../core/tokens.css`
2. `../../core/reset.css`
3. `./colors.css`
4. `./components.css`
5. `./states.css`
6. `./animation.css`
7. `../../core/compatibility.css` **last** (wins over theme where needed for stock DOM)

Relative `@import` inside the entry must resolve when the entry URL is fetched (GitHub raw / jsDelivr). Prefer **same-origin relative imports** from the entry file so one user `@import` pulls the graph.

Fallback note: if a host fails nested `@import`, document a future optional single-file bundle — **not** Phase 1 scope under Architecture 1.

---

## 5. Design tokens

### 5.1 Required color / surface tokens

Each theme’s `colors.css` must define (on `body` and/or scoped via media / optional `html[data-theme]`):

```css
--cv-bg-primary
--cv-bg-secondary
--cv-surface
--cv-surface-elevated      /* floating / dialog */
--cv-primary
--cv-secondary
--cv-text-primary
--cv-text-secondary
--cv-success
--cv-warning
--cv-error
```

Also map legacy stock vars for descendants (on `body`, not fighting `html` inline alone):

```css
--background-color
--primary-main
--divider-color
--text-primary
--scrollbar-bg
--scrollbar-thumb
--window-border-color
--background-color-alpha
```

### 5.2 Surface ladder

| Layer | Role | Guidance |
|-------|------|----------|
| Background | App chrome | No pure `#000` |
| Surface | Sidebar / page | Slightly lifted |
| Floating | Dialog / popover | Elevated + soft border |
| Interactive | Buttons / selected nav | Accent muted fills |

Example dark baseline (Cyber Nexus):

- Background `#080B12`
- Surface `#111827`
- Card `rgba(255,255,255,0.06)`

### 5.3 Spacing (8px grid)

Allowed: `4 8 12 16 24 32 48 64`  
Tokens: `--cv-space-1` … or explicit use of these steps only.

### 5.4 Radius

| Token | Value |
|-------|-------|
| `--cv-radius-sm` | 8px |
| `--cv-radius-md` | 12px |
| `--cv-radius-lg` | 16px |
| `--cv-radius-float` | 24px |

### 5.5 Motion

| Token | Value |
|-------|-------|
| `--cv-motion-fast` | 120ms |
| `--cv-motion-normal` | 200ms |
| `--cv-motion-premium` | 400ms |

Hover pattern (cards / interactive rows): `translateY(-2px)` + shadow increase — only on selectors that already support transform safely (cards), never on layout shell.

---

## 6. State system (highest priority)

Semantic status colors are **locked in `core/tokens.css`** and reinforced in `states.css`. Themes may tune neutrals/accents but **must not recolor**:

| State | Color | Use |
|-------|-------|-----|
| Success | `#22C55E` | Available / pass / healthy |
| Warning | `#FACC15` | Untested / partial / unsupported soft |
| Error | `#EF4444` | Fail / unsupported hard / connect error |

Latency bands may align to these semantics (fast→success, medium→warning, timeout→error).

Rule: **status color beats theme primary** (e.g. failed node stays red, never theme cyan).

---

## 7. CSS engineering rules

### 7.1 Selector policy

**Forbidden** (except narrow `reset.css` with documented justification):

- Universal `*`
- Bare `div`, `span`, `button`, `img`, `svg`, `body` restyles that affect all controls

**Preferred:**

- Stable shell: `.layout`, `.layout-content__left`, `.the-menu`, `.base-page`, `.base-container`, `.base-content`
- MUI classes: `.MuiButton-root`, `.MuiPaper-root`, `.MuiDialog-paper`, `.MuiChip-root`, `.MuiListItemButton-root.Mui-selected`
- Avoid Emotion hashes (`css-xxxxx`)

### 7.2 Property policy

**Allowed:** color, background, border, shadow, radius, font, opacity, backdrop-filter, transform (hover), animation  

**Forbidden without explicit compatibility fix comment:**

- `display: none`
- `position: absolute/fixed` on shell
- Arbitrary `width` / `height` that reflow the app chrome

### 7.3 `!important`

- **Default:** avoid
- **Allowed:** only in `core/compatibility.css` for beating stock post-import rules / inline backgrounds on `.base-container`
- Theme `colors.css` / `components.css` should set variables and non-important paints first; compatibility layer applies necessary `!important` bridges

### 7.4 Icons & flags

Do not globally restyle `svg` / `img`. Logo fills may target `.the-logo svg` only. Flag images in proxy lists must remain untouched.

---

## 8. Component design targets (visual)

### 8.1 Navigation (sidebar)

- Floating / glass feel where theme allows
- Active state: **left accent bar + soft halo + stronger label** — not a heavy solid block

### 8.2 Header

- Target height feel ~56px (padding/line-height only; do not force layout breakage)
- Minimal: title + actions

### 8.3 Proxy / setting cards

- Surface card treatment, subtle border, soft shadow
- Hover lift `-2px` where safe
- Structure content (country / name / latency / status) is app-owned; theme only paints

### 8.4 Dialog / Paper

- Use elevated surface tokens
- Compatibility must beat stock `#2E303D !important` on `.MuiDialog-paper` via **higher specificity**, e.g. `html body .MuiDialog-root .MuiDialog-paper`

---

## 9. Three themes

### Theme A — Cyber Nexus (P0)

- Network control center; Linear / Raycast / calm HUD
- BG `#080B12`, Primary `#00E5FF`, Secondary `#8B5CF6`
- Micro-glow, glass, restrained — not disco

### Theme B — AI Operator (P1)

- AI agent console; Cursor / Claude Code energy
- Prefer monospace accents (`JetBrains Mono` via `font-family` where safe — traffic / latency, not entire UI if it breaks CJK)
- Terminal-flavored surfaces, high contrast text

### Theme C — Aurora Glass (P2)

- Apple / VisionOS calm
- Light `#F5F5F7`, Dark `#1D1D1F`
- Large breathing room, soft shadows, translucency
- Full light + dark via `prefers-color-scheme`

Each theme must support **light + dark** (Aurora especially; Cyber/AI may be dark-first with a coherent light variant).

---

## 10. Light / Dark strategy

Primary: `@media (prefers-color-scheme: light|dark)`  
Secondary: `html[data-theme='light'|'dark']` when present  

Do **not** rely on `data-theme` alone (often missing on stock builds).

Paint strategy: redefine tokens on `body`; paint concrete backgrounds on stable selectors; use compatibility layer for inline/`!important` fights (see Spec 05).

---

## 11. Phased execution

| Phase | Work | Exit criteria |
|-------|------|----------------|
| **1 Audit** | Review deleted-legacy patterns + Spec 05; list banned selectors still needed in compatibility | Written audit notes in `docs/` or specs appendix |
| **2 Core** | Add `core/tokens.css`, `reset.css`, `compatibility.css` | Tokens + status locks exist; compatibility covers layout/dialog/base-container |
| **3 Components** | Shared component recipes live per-theme `components.css` (theme-specific) using tokens | Nav/header/card/button/chip/dialog covered without layout breakage |
| **4 Themes** | Implement Cyber Nexus → AI Operator → Aurora Glass; delete old four files; update README | Three entries importable; acceptance checklist green |

---

## 12. Acceptance checklist

### Functional

- [ ] One `@import` of theme `index.css` applies
- [ ] Shell UI remains usable (no collapsed nav / missing controls)
- [ ] Flags / MUI icons / buttons / chips / tooltips / dialogs OK
- [ ] Error / fail states stay red; warning stays yellow; success stays green

### Visual

- [ ] Unified surface ladder; no pure-black / pure-white card clichés
- [ ] Calm professional look; no excessive glow
- [ ] Comfortable for long sessions

### Engineering

- [ ] Modular folders match §3
- [ ] New theme = copy folder + edit colors/components
- [ ] `!important` confined to compatibility
- [ ] No global `svg`/`img`/`button` restyles

---

## 13. Out of scope reminders

- Forking Clash Verge Rev for Design System runtime
- Changing `main` to host full themes (stay on `develop`)
- Keeping Obsidian/Signal/Paper/Neon

---

## 14. Approval

- [ ] User approved this spec  
- [ ] Implementation plan next (`writing-plans` / Phase 1 start)

**Reply “批准” or list change requests.** After approval, implementation begins on `develop`.
