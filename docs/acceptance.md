# Spec 03 — Acceptance Criteria

## AC-1 Structure
- [ ] `themes/obsidian.css` `signal.css` `paper.css` `neon.css` exist
- [ ] `specs/00-brief.md` `01-requirements.md` `02-design.md` `03-acceptance.md` exist
- [ ] `README.md` + `LICENSE` exist

## AC-2 Content
- [x] Each theme file contains Light + Dark token sets
- [x] Each sets Clash Verge legacy CSS variables listed in FR-4
- [x] Each styles `.layout`, `.base-container`, `.MuiDialog-paper` at minimum
- [x] Full `--cv-*` matrix ported from `packs.scss` (see spec 04)
- [x] Surfaces ported from `surfaces.scss` (+ pack flourishes)
- [x] No nested `@import` inside theme files
- [x] No SCSS syntax in published `themes/*.css`

## AC-3 Docs
- [ ] README shows copy-paste injection steps
- [ ] README lists all four jsDelivr URLs
- [ ] README states known limits (inline hardcodes)

## AC-4 Publish
- [ ] GitHub repo `endlessYoung/clash-verge-themes` exists (public)
- [ ] `main` branch pushed with initial commit
- [ ] jsDelivr URL pattern documented (may need short CDN cache delay after first push)

## Manual smoke (user)
1. Clash Verge → Theme Mode Dark
2. Theme Setting → CSS Injection → paste one `@import` line → Save
3. Expect sidebar/page background/accent shift toward pack character
