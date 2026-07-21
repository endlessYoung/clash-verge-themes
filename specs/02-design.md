# Spec 02 — Design

## Repository Layout

```
clash-verge-themes/
├── specs/                 # SDD specs (source of truth)
├── themes/
│   ├── obsidian.css
│   ├── signal.css
│   ├── paper.css
│   └── neon.css
├── docs/
│   └── acceptance.md
├── README.md
├── LICENSE
└── .gitignore
```

## Theme Architecture

Each file structure:

1. **Header comment** — pack name, visual thesis, usage `@import` example.
2. **Token block (Light)** — `html[data-theme='light']` + fallback `:root` where safe.
3. **Token block (Dark)** — `html[data-theme='dark']`.
4. **Surface rules** — layout / base-page / MUI overrides consuming those variables.
5. **Pack-specific flourishes** — blur (obsidian), mono hint (signal), warm paper, neon glow on selected only.

## Color Source

Aligned with Clash Verge paradigm doc (`2026-07-21-ui-theme-paradigms-design.md`):

| Pack | Light accent | Dark accent | Character |
|------|--------------|-------------|-----------|
| obsidian | `#2563EB` | `#60A5FA` | glass, calm |
| signal | `#0F766E` | `#2DD4BF` | instrument, sharp |
| paper | `#C25C3A` | `#E89573` | warm editorial |
| neon | `#007A99` | `#00F0FF` | dual-tone energy |

## Delivery URLs (post-publish)

```text
https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@main/themes/{pack}.css
https://raw.githubusercontent.com/endlessYoung/clash-verge-themes/main/themes/{pack}.css
```

## Risk Mitigations

| Risk | Mitigation |
|------|------------|
| Inline hardcodes win | Document limitation; override shell + MUI classes aggressively |
| `data-theme` missing | Also style via variables set on `:root` when possible; document user must set theme mode in app |
| GitHub raw flaky | Prefer jsDelivr in README |
| Cascade order vs app globals | Set CSS variables first; use `!important` on critical surfaces |
