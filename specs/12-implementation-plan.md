# Spec 12 Five-Theme Redesign — Implementation Plan

> **For agentic workers:** Use inline execution (user requested 开始实现). Steps use checkbox syntax.

**Goal:** Ship five Spec-12 themes (Cyber, AI, Aurora, Apple Classic, Apple Liquid) as injectable `dist/*.css` on `develop`.

**Architecture:** Two-family system — Spectacle (Cyber, AI) vs Calm (Aurora, Classic, Liquid). Shared `core/*`; each theme owns colors/components/states/animation.

**Tech Stack:** Plain CSS modules, `node scripts/build-dist.mjs`, jsDelivr pin delivery.

## Global Constraints

- No shell geometry changes; no status color overrides; no triad sidebar spines; no DECKER slogans
- Chinese UI = system sans; digits/emoji stacks preserved via core
- Light + dark via `prefers-color-scheme` + `html[data-theme]`
- Commit pin after push; never `@develop`

---

### Task 1: Cyber Nexus Spec-12 rewrite

**Files:** `themes/cyber-nexus/{colors,components,animation,index}.css`

- [ ] Bold night-deck HUD: stronger chamfer, focus-only magenta/cyan, single green rail, THRUPUT lock, content sweep
- [ ] Build + visual sanity (no triad inset)

### Task 2: AI Operator Spec-12 rewrite

**Files:** `themes/ai-operator/**`

- [ ] Terminal console: matrix ambient, `$` channel selected, mono thruput, green/amber process colors, zero neon bloom

### Task 3: Aurora Glass Spec-12 rewrite

**Files:** `themes/aurora-glass/**`

- [ ] Spatial glass: large radii, aurora wash, pill nav lift, card float, slow ambient drift; no neon

### Task 4: Apple Classic (new)

**Files:** Create `themes/apple-classic/{index,colors,components,states,animation}.css`

- [ ] Native Settings: system gray + `#007AFF`/`#0A84FF`, grouped blocks, near-zero motion

### Task 5: Apple Liquid Glass (new)

**Files:** Create `themes/apple-liquid/{index,colors,components,states,animation}.css`

- [ ] Liquid glass: translucency, hairline highlights, float + press only

### Task 6: Build plumbing + docs ship

**Files:** `scripts/build-dist.mjs`, `README.md`, `specs/12-*.md` status, `dist/*`

- [ ] Register five themes in build; README five imports; `node scripts/build-dist.mjs`; commit + push; return five pinned URLs

## Self-review

- Spec §4–§8 covered by Tasks 1–6
- No placeholders
- Acceptance: build succeeds; five dist files; cyber has no triad inset in source
