# Spec 05 — Real DOM injection constraints (Clash Verge stock UI)

> Captured from live DOM dump 2026-07-22  
> App: Clash Verge v2.5.2 stock (CSS Injection only)

## Failures of previous hosted CSS

| Assumption | Reality |
|------------|---------|
| `html[data-theme='dark']` exists | **Missing.** Only `data-css-injection-root="true"` |
| Setting `--background-color` on `:root`/`html` works | **Fails.** App sets the same vars as **inline style on `<html>`**, which beats stylesheets |
| `@import` rules win | **Partial.** App appends after import: `.MuiDialog-paper { background:#2E303D !important }` and `* { box-shadow:none !important }` |
| Emotion hash classes stable | **Unstable.** `css-3e4wjh` etc. change per build — do not target |

## Live structure (must style)

```
html[style=--legacy-vars]
  body
    #root
      .MuiPaper-root.layout.windows
        .layout-content
          .layout-content__left
            .the-logo / .the-menu / .the-traffic
          .layout-content__right
            .the-content
              .base-page
                > header
                .base-container[style=background inline]
                  > section[style=background inline]
                    .base-content
                      .MuiGrid-container
                        .MuiGrid-grid-xs-6 > .MuiBox-root  ← setting cards
```

## Injection strategy (v2)

1. **Do not rely on `data-theme`.** Use `@media (prefers-color-scheme: dark|light)` (+ optional `[data-theme]` if present).
2. **Do not fight `html` inline CSS variables.** Paint **direct properties** (`background-color`, `color`, `border-color`) with `!important` on concrete selectors.
3. **Re-declare theme vars on `body` / `.layout`** so descendants that resolve `var(--*)` can inherit our values (overrides inherited html inline for children).
4. **Beat post-import app rules** with higher specificity, e.g. `html body .MuiDialog-paper`.
5. **Beat inline base-container** with `html body .base-container` / `section` + `!important`.
6. **Setting cards:** `.base-content .MuiGrid-grid-xs-6 > .MuiBox-root` (stable structure).
7. **Selected nav:** `.the-menu .MuiListItemButton-root.Mui-selected`.
8. Glow must use **class** selectors (beats `* { box-shadow:none !important }` by specificity).

## Token source

Still from `clash-verge-rev` `packs.scss` mixins — but applied as paint values, not only as html-level CSS variables.
