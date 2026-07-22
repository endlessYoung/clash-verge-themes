# Phase 1 — CSS Audit (pre-Neo)

Date: 2026-07-22
Scope: legacy `themes/{obsidian,signal,paper,neon}.css` (deleted in this phase) + `scripts/build-from-packs.mjs` pipeline.

## Findings

| Issue | Where | Resolution in Neo |
|-------|-------|--------------------|
| Relied on `html[data-theme]` which stock v2.5.2 never sets | all 4 legacy files | Neo uses `prefers-color-scheme` as primary switch (see Spec 05) |
| Token reassignment on `:root`/`html` lost to inline `style=""` vars set by app | all 4 legacy files | Neo redefines tokens on `body`, paints concrete selectors directly |
| Duplicate full token block repeated per media/data-theme branch (~800 lines/file) | all 4 legacy files | Neo splits into `core/tokens.css` (shared) + theme `colors.css` (values only) |
| `!important` scattered across every rule, no single ownership | all 4 legacy files | Neo confines `!important` to `core/compatibility.css` |
| No status-color lock — theme accent could leak onto success/warning/error | all 4 legacy files | Neo locks status tokens in `core/tokens.css`; themes must not redefine them |
| Selector `*::-webkit-scrollbar` etc. mixed into theme file | all 4 legacy files | Moved to `core/compatibility.css` (shared, theme-agnostic shape; theme-specific colors via var()) |
| Build script coupled to `clash-verge-rev` local checkout path (`D:/OpenSourceCode/...`), not portable, not part of Neo contract | `scripts/build-from-packs.mjs` | Removed. Neo themes are hand-authored token files, no cross-repo build dependency |

## Selectors carried forward into `core/compatibility.css` (justified, DOM-driven)

These remain necessary because stock DOM has no `data-theme` and ships inline vars / late `!important` rules (see Spec 05 §"Failures of previous hosted CSS"):

- `body` (token redeclare + base paint)
- `html body .layout`, `.layout-content__left/right`
- `html body .base-container`, `.base-container > section` (beats inline `style="background-color:rgb(...)"`)
- `html body .MuiDialog-root .MuiDialog-paper` / `div.MuiDialog-paper` (beats app's post-import `.MuiDialog-paper{!important}`)
- `html body .MuiBackdrop-root`
- `*::-webkit-scrollbar`, `*::-webkit-scrollbar-thumb`

No bare `button`, `svg`, `img`, `div`, `span`, or universal `*` restyle rules are carried forward (audit confirms legacy files also avoided bare-element restyle except reset-like scrollbar pseudo-elements, which are pseudo-elements, not element restyles, and are kept).

## Action items for Phase 2+

- [x] Extract shared token *names* + status lock → `core/tokens.css`
- [x] Minimal `core/reset.css` (box-sizing / focus-ring normalization only)
- [x] `core/compatibility.css` using `var(--cv-*)` set by theme, not hardcoded colors
- [x] Delete `themes/{obsidian,signal,paper,neon}.css`
- [x] Delete `scripts/build-from-packs.mjs`
- [ ] Implement `themes/cyber-nexus/*` (P0)
- [ ] Implement `themes/ai-operator/*` (P1)
- [ ] Implement `themes/aurora-glass/*` (P2)
