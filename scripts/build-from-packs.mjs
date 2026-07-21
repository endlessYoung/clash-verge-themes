import fs from 'node:fs'
import path from 'node:path'

const packsSrc =
  'D:/OpenSourceCode/ClashVerge/clash-verge-rev/src/assets/styles/themes/packs.scss'
const outDir = 'D:/IProjects/Front end projects/clash-verge-themes/themes'

const packs = fs.readFileSync(packsSrc, 'utf8')

function extractMixin(name) {
  const re = new RegExp(`@mixin ${name} \\{([\\s\\S]*?)\\n\\}`)
  const m = packs.match(re)
  if (!m) throw new Error('mixin missing: ' + name)
  return m[1].replace(/\n\s*@include cv-legacy-aliases;\s*/g, '\n').trimEnd()
}

const legacyAliases = `
  --background-color: var(--cv-surface-app);
  --divider-color: var(--cv-border-subtle);
  --primary-main: var(--cv-color-accent);
  --text-primary: var(--cv-color-text-primary);
  --selection-color: var(--cv-selection-fg);
  --scroller-color: var(--cv-scrollbar-thumb);
  --background-color-alpha: var(--cv-color-accent-muted);
  --window-border-color: var(--cv-border-strong);
  --scrollbar-bg: var(--cv-scrollbar-bg);
  --scrollbar-thumb: var(--cv-scrollbar-thumb);
  --border-radius: var(--cv-radius-md);`

const sharedSurfaces = `
body {
  background-color: var(--cv-surface-app) !important;
  color: var(--cv-color-text-primary) !important;
  font-family: var(--cv-font-sans);
  transition:
    background-color var(--cv-motion-normal) var(--cv-motion-ease),
    color var(--cv-motion-normal) var(--cv-motion-ease);
}

.layout {
  background-color: var(--cv-surface-app) !important;
  color: var(--cv-color-text-primary);
}

.layout .layout-content__left {
  background-color: var(--cv-surface-sidebar) !important;
  backdrop-filter: blur(var(--cv-effect-blur));
  -webkit-backdrop-filter: blur(var(--cv-effect-blur));
  border-right: 1px solid var(--cv-border-subtle) !important;
}

.layout .layout-content__right {
  background-color: var(--cv-surface-page) !important;
}

.base-page > header {
  border-bottom-color: var(--cv-border-subtle) !important;
  color: var(--cv-color-text-primary) !important;
}

.base-page .base-container,
.base-page .base-container > section,
.base-container,
.base-container > section {
  background-color: var(--cv-surface-content) !important;
}

.cv-card,
.enhanced-card {
  background-color: var(--cv-surface-card) !important;
  border: 1px solid var(--cv-border-subtle) !important;
  border-radius: var(--cv-radius-md) !important;
  box-shadow: var(--cv-effect-glow) !important;
  backdrop-filter: blur(var(--cv-effect-blur));
  -webkit-backdrop-filter: blur(var(--cv-effect-blur));
  color: var(--cv-color-text-primary) !important;
  transition:
    background-color var(--cv-motion-fast) var(--cv-motion-ease),
    border-color var(--cv-motion-fast) var(--cv-motion-ease),
    box-shadow var(--cv-motion-fast) var(--cv-motion-ease);
}

.cv-item {
  background-color: var(--cv-surface-item) !important;
  border-radius: var(--cv-radius-sm);
  border: 1px solid transparent;
  transition:
    background-color var(--cv-motion-fast) var(--cv-motion-ease),
    border-color var(--cv-motion-fast) var(--cv-motion-ease),
    box-shadow var(--cv-motion-fast) var(--cv-motion-ease);
}

.cv-item:hover {
  border-color: var(--cv-border-subtle);
}

.cv-item.is-selected,
.cv-item[data-selected='true'] {
  background-color: var(--cv-surface-nav-active) !important;
  border-color: var(--cv-border-focus);
  box-shadow: var(--cv-effect-glow);
}

.MuiDialog-paper {
  background-color: var(--cv-surface-dialog) !important;
  border: 1px solid var(--cv-border-subtle) !important;
  border-radius: var(--cv-radius-md) !important;
  color: var(--cv-color-text-primary) !important;
}

.MuiPaper-root {
  background-color: var(--cv-surface-card) !important;
  border-color: var(--cv-border-strong) !important;
  color: var(--cv-color-text-primary);
}

.MuiButton-containedPrimary,
.MuiButtonGroup-groupedContainedPrimary {
  background-color: var(--cv-color-accent) !important;
  box-shadow: none !important;
}

.MuiButton-outlinedPrimary {
  border-color: var(--cv-color-accent) !important;
  color: var(--cv-color-accent) !important;
}

.MuiSwitch-switchBase.Mui-checked {
  color: var(--cv-color-accent) !important;
}

.MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
  background-color: var(--cv-color-accent) !important;
}

.MuiListItemButton-root.Mui-selected {
  background-color: var(--cv-surface-nav-active) !important;
}

.MuiListItemText-primary {
  color: var(--cv-color-text-primary) !important;
}

.MuiListItemText-secondary {
  color: var(--cv-color-text-secondary) !important;
}

.MuiTypography-colorTextSecondary {
  color: var(--cv-color-text-secondary) !important;
}

.MuiDivider-root {
  border-color: var(--cv-border-subtle) !important;
}

.MuiBackdrop-root {
  background-color: var(--cv-surface-overlay) !important;
}

::selection {
  color: var(--cv-selection-fg);
  background-color: var(--cv-color-accent);
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: var(--cv-scrollbar-bg);
}

*::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: var(--cv-scrollbar-thumb);
}

/* Stock Clash Verge hardcode beaters (upstream without our TSX patch) */
.base-container[style],
.base-container > section[style] {
  background-color: var(--cv-surface-content) !important;
}
`

const flourishes = {
  obsidian: `/* Pack flourish: Obsidian glass */
.layout .layout-content__left {
  border-right: 1px solid var(--cv-border-subtle);
}`,
  signal: `/* Pack flourish: Signal instrument */
.layout .layout-content__left {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.cv-card,
.enhanced-card,
.MuiPaper-root {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  box-shadow: none !important;
  border-radius: var(--cv-radius-md) !important;
}

.cv-mono,
.latency,
.traffic-text,
[class*='delay'] {
  font-family: var(--cv-font-mono) !important;
  font-variant-numeric: tabular-nums;
}

.MuiListItemButton-root.Mui-selected {
  border-left: 3px solid var(--cv-color-accent);
}`,
  paper: `/* Pack flourish: Paper atelier */
.layout .layout-content__left {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.base-page > header {
  letter-spacing: 0.01em;
}

.cv-card,
.enhanced-card,
.MuiPaper-root {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}`,
  neon: `/* Pack flourish: Neon circuit */
.layout .layout-content__left {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-right: 1px solid var(--cv-border-subtle);
}

.cv-card,
.enhanced-card {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.cv-item.is-selected,
.cv-item[data-selected='true'],
.MuiListItemButton-root.Mui-selected,
.the-menu .Mui-selected {
  box-shadow: var(--cv-effect-glow) !important;
  border: 1px solid var(--cv-border-focus) !important;
}

html[data-theme='dark'] .MuiButton-containedPrimary,
html[data-theme='dark'] .MuiButtonGroup-groupedContainedPrimary {
  color: #041018 !important;
}`,
}

const meta = {
  obsidian: {
    title: 'Obsidian Glass',
    thesis: 'calm glass console — soft depth, ice-blue accent',
  },
  signal: {
    title: 'Signal Instrument',
    thesis: 'flight-instrument panel — high contrast, sharp, data-first',
  },
  paper: {
    title: 'Paper Atelier',
    thesis: 'editorial paper — warm white space, terracotta ink',
  },
  neon: {
    title: 'Neon Circuit',
    thesis:
      'night circuit board — cyan primary, magenta secondary, restrained glow',
  },
}

for (const id of ['obsidian', 'signal', 'paper', 'neon']) {
  const light = extractMixin(`cv-${id}-light`)
  const dark = extractMixin(`cv-${id}-dark`)
  const m = meta[id]
  const css = `/*
 * Clash Verge Themes — ${m.title}
 * Thesis: ${m.thesis}
 *
 * Ported from clash-verge-rev:
 *   src/assets/styles/themes/packs.scss  (cv-${id}-*)
 *   src/assets/styles/themes/surfaces.scss
 *
 * Usage (Clash Verge → Theme Setting → CSS Injection):
 * @import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@main/themes/${id}.css");
 */

/* ========== Tokens: Light (full --cv-* matrix) ========== */
html[data-theme='light'],
:root:not([data-theme='dark']) {
${light}
${legacyAliases}
}

/* ========== Tokens: Dark (full --cv-* matrix) ========== */
html[data-theme='dark'] {
${dark}
${legacyAliases}
}

/* ========== Surfaces (from surfaces.scss) ========== */
${sharedSurfaces}

${flourishes[id]}
`
  const out = path.join(outDir, `${id}.css`)
  fs.writeFileSync(out, css, 'utf8')
  console.log('wrote', id, fs.statSync(out).size, 'bytes')
}
