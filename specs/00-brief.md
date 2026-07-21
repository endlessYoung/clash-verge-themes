# Spec 00 — Project Brief

> Status: Accepted (derived from Clash Verge theme paradigm design + user decision to host via GitHub `@import`)  
> Date: 2026-07-21  
> Owner: endlessYoung

## Problem

Clash Verge Rev only exposes **CSS Injection** for end-user theming. Users need a stable, versioned place to host theme CSS and import with one line:

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@main/themes/obsidian.css");
```

## Goals

1. Publish **4 independent** theme CSS files (Obsidian / Signal / Paper / Neon).
2. Each file works for **Light + Dark** via `html[data-theme]` (with fallbacks).
3. Specs first (SDD): requirements → design → acceptance → then code.
4. Public GitHub repo under `endlessYoung`, CDN-friendly layout.

## Non-Goals

- Not a Node/React app.
- Not a fork of Clash Verge Rev.
- Not guaranteeing 100% override of inline `sx` hardcodes inside the app.
- Not multi-theme switcher UI (swap = change `@import` URL).

## Success Metrics

- One `@import` line applies a visible shell theme (sidebar, page bg, cards, dialogs, accents).
- jsDelivr / raw GitHub URLs resolve `200`.
- README documents copy-paste steps in Chinese + English.
