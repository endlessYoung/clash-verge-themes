# Spec 04 — Parity with clash-verge-rev in-app implementation

> Date: 2026-07-21  
> Status: Required (gap fix)

## Gap analysis (v1 hosted themes vs in-app)

| Area | In-app (`packs.scss` + `surfaces.scss`) | Hosted v1 | Action |
|------|------------------------------------------|-----------|--------|
| Token namespace | Full `--cv-color-*`, `--cv-surface-*`, radius ladder, semantic, latency, font, motion | Only legacy vars + few surfaces | Port full token matrix |
| Legacy aliases | `--background-color` ← `--cv-surface-app` etc. | Partial direct legacy only | Mirror `cv-legacy-aliases` |
| Surfaces | body/layout/base-page/cv-card/cv-item/MUI/scrollbar | Partial shell only | Port `surfaces.scss` |
| Pack flourishes | blur off (signal/paper/neon), mono (signal), neon glow on selected | Weak / missing | Port pack-specific blocks |
| Stock hardcodes | App TSX uses `var(--cv-*)` after our patch | Upstream still `#282a36` / `#1e1f27` | Extra injection overrides for Paper/base-container |

## Source of truth (must stay aligned)

1. `clash-verge-rev/src/assets/styles/themes/packs.scss`
2. `clash-verge-rev/src/assets/styles/themes/surfaces.scss`
3. Design paradigm: `docs/superpowers/specs/2026-07-21-ui-theme-paradigms-design.md`

## Delivery rule

Each `themes/{pack}.css` MUST contain:

1. Complete Light token block (all `--cv-*` from corresponding mixin)
2. Complete Dark token block
3. Legacy alias mapping (same as `cv-legacy-aliases`)
4. Shared surface application rules (from `surfaces.scss`, without `data-theme-pack` gating — file itself IS the pack)
5. Pack-specific flourish rules
6. Stock-app hardening (Paper / base-container / common MUI text)

Consumers still `@import` a single file; no nested `@import`.
