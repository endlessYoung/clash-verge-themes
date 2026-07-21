# Spec 01 — Requirements

## Functional

| ID | Requirement |
|----|-------------|
| FR-1 | Provide exactly four theme packs: `obsidian`, `signal`, `paper`, `neon`. |
| FR-2 | Each pack is a **single self-contained** `.css` file under `/themes`. |
| FR-3 | Each pack defines Light and Dark tokens using `html[data-theme='light'|'dark']`. |
| FR-4 | Each pack maps to Clash Verge legacy variables: `--primary-main`, `--background-color`, `--divider-color`, `--selection-color`, `--scroller-color`, `--window-border-color`, `--scrollbar-bg`, `--scrollbar-thumb`, `--background-color-alpha`, `--text-primary`. |
| FR-5 | Each pack styles shell surfaces: `body`, `.layout`, `.layout-content__left`, `.base-container`, `.MuiPaper-root`, `.MuiDialog-paper`, primary buttons, switches, selected list items. |
| FR-6 | README shows `@import` via **jsDelivr** (preferred) and raw.githubusercontent.com. |
| FR-7 | Optional `themes/all.css` is **not** required; packs stay independent. |

## Non-Functional

| ID | Requirement |
|----|-------------|
| NFR-1 | No build step required to consume themes. |
| NFR-2 | No `@import` inside theme files (consumers import the file; nesting breaks easily). |
| NFR-3 | Prefer higher specificity / targeted `!important` only where needed to beat app defaults. |
| NFR-4 | Files must be valid CSS (no SCSS). |
| NFR-5 | License: MIT. |

## Constraints

- Target app: Clash Verge Rev CSS injection (`#verge-theme`).
- When injection contains `@import`, app skips `@scope` wrapping — remote import works.
- App may append its own rules after injection; theme CSS should set variables aggressively.
