/**
 * Build injectable theme CSS for stock Clash Verge DOM.
 * Source tokens: clash-verge-rev packs.scss
 * Strategy: specs/05-dom-injection.md
 */
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
  return m[1].replace(/\n\s*@include cv-legacy-aliases;\s*/g, '\n')
}

/** Parse --token: value; including multiline values. */
function parseTokens(mixinBody) {
  const tokens = {}
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);/g
  let m
  while ((m = re.exec(mixinBody))) {
    tokens[m[1]] = m[2].replace(/\s+/g, ' ').trim()
  }
  return tokens
}

/**
 * @param {Record<string,string>} t
 * @param {'media'|'dark'|'light'} mode
 *   media  → selectors under @media, rooted at `html body`
 *   dark   → `html[data-theme='dark'] body …`
 *   light  → `html[data-theme='light'] body …`
 */
function paintBlock(t, mode) {
  const root =
    mode === 'media'
      ? 'html body'
      : mode === 'dark'
        ? "html[data-theme='dark'] body"
        : "html[data-theme='light'] body"
  const bodySel = mode === 'media' ? 'body' : root

  return `
${bodySel} {
  --cv-color-accent: ${t['cv-color-accent']};
  --cv-color-accent-muted: ${t['cv-color-accent-muted']};
  --cv-color-secondary: ${t['cv-color-secondary']};
  --cv-color-text-primary: ${t['cv-color-text-primary']};
  --cv-color-text-secondary: ${t['cv-color-text-secondary']};
  --cv-color-text-disabled: ${t['cv-color-text-disabled']};
  --cv-color-info: ${t['cv-color-info']};
  --cv-color-success: ${t['cv-color-success']};
  --cv-color-warning: ${t['cv-color-warning']};
  --cv-color-error: ${t['cv-color-error']};
  --cv-color-latency-fast: ${t['cv-color-latency-fast']};
  --cv-color-latency-medium: ${t['cv-color-latency-medium']};
  --cv-color-latency-slow: ${t['cv-color-latency-slow']};
  --cv-color-latency-timeout: ${t['cv-color-latency-timeout']};
  --cv-surface-app: ${t['cv-surface-app']};
  --cv-surface-sidebar: ${t['cv-surface-sidebar']};
  --cv-surface-page: ${t['cv-surface-page']};
  --cv-surface-content: ${t['cv-surface-content']};
  --cv-surface-card: ${t['cv-surface-card']};
  --cv-surface-item: ${t['cv-surface-item']};
  --cv-surface-nav-active: ${t['cv-surface-nav-active']};
  --cv-surface-dialog: ${t['cv-surface-dialog']};
  --cv-surface-overlay: ${t['cv-surface-overlay']};
  --cv-border-subtle: ${t['cv-border-subtle']};
  --cv-border-strong: ${t['cv-border-strong']};
  --cv-border-focus: ${t['cv-border-focus']};
  --cv-radius-xs: ${t['cv-radius-xs']};
  --cv-radius-sm: ${t['cv-radius-sm']};
  --cv-radius-md: ${t['cv-radius-md']};
  --cv-radius-lg: ${t['cv-radius-lg']};
  --cv-radius-pill: ${t['cv-radius-pill']};
  --cv-font-sans: ${t['cv-font-sans']};
  --cv-font-mono: ${t['cv-font-mono']};
  --cv-effect-blur: ${t['cv-effect-blur']};
  --cv-effect-glow: ${t['cv-effect-glow']};
  --cv-selection-fg: ${t['cv-selection-fg']};
  --cv-scrollbar-bg: ${t['cv-scrollbar-bg']};
  --cv-scrollbar-thumb: ${t['cv-scrollbar-thumb']};
  --cv-motion-fast: ${t['cv-motion-fast']};
  --cv-motion-normal: ${t['cv-motion-normal']};
  --cv-motion-ease: ${t['cv-motion-ease']};

  --background-color: ${t['cv-surface-app']} !important;
  --divider-color: ${t['cv-border-subtle']} !important;
  --primary-main: ${t['cv-color-accent']} !important;
  --text-primary: ${t['cv-color-text-primary']} !important;
  --selection-color: ${t['cv-selection-fg']} !important;
  --scroller-color: ${t['cv-scrollbar-thumb']} !important;
  --background-color-alpha: ${t['cv-color-accent-muted']} !important;
  --window-border-color: ${t['cv-border-strong']} !important;
  --scrollbar-bg: ${t['cv-scrollbar-bg']} !important;
  --scrollbar-thumb: ${t['cv-scrollbar-thumb']} !important;
  --border-radius: ${t['cv-radius-md']} !important;

  background-color: ${t['cv-surface-app']} !important;
  color: ${t['cv-color-text-primary']} !important;
  font-family: ${t['cv-font-sans']};
}

${root} .MuiPaper-root.layout,
${root} .layout {
  background-color: ${t['cv-surface-app']} !important;
  color: ${t['cv-color-text-primary']} !important;
}

${root} .layout .layout-content__left {
  background-color: ${t['cv-surface-sidebar']} !important;
  border-right: 1px solid ${t['cv-border-subtle']} !important;
  backdrop-filter: blur(${t['cv-effect-blur']});
  -webkit-backdrop-filter: blur(${t['cv-effect-blur']});
}

${root} .layout .layout-content__right,
${root} .the-content {
  background-color: ${t['cv-surface-page']} !important;
}

${root} .base-page > header {
  background-color: transparent !important;
  border-bottom: 1px solid ${t['cv-border-subtle']} !important;
  color: ${t['cv-color-text-primary']} !important;
}

${root} .base-page .base-container,
${root} .base-page .base-container > section,
${root} .base-container,
${root} .base-container > section {
  background-color: ${t['cv-surface-content']} !important;
}

${root} .base-content {
  color: ${t['cv-color-text-primary']} !important;
}

${root} .base-content .MuiGrid-grid-xs-6 > .MuiBox-root,
${root} .base-content .MuiGrid-root > .MuiBox-root {
  background-color: ${t['cv-surface-card']} !important;
  border: 1px solid ${t['cv-border-subtle']} !important;
  border-radius: ${t['cv-radius-md']} !important;
  box-shadow: ${t['cv-effect-glow']} !important;
  color: ${t['cv-color-text-primary']} !important;
  overflow: hidden;
}

${root} .MuiListSubheader-root {
  color: ${t['cv-color-text-secondary']} !important;
  background-color: transparent !important;
}

${root} .MuiListItemText-primary,
${root} .MuiTypography-root {
  color: ${t['cv-color-text-primary']};
}

${root} .MuiListItemText-secondary,
${root} .MuiTypography-colorTextSecondary {
  color: ${t['cv-color-text-secondary']} !important;
}

${root} .MuiDivider-root {
  border-color: ${t['cv-border-subtle']} !important;
}

${root} .MuiDialog-root .MuiDialog-paper,
${root} .MuiModal-root .MuiDialog-paper,
${root} div.MuiDialog-paper {
  background-color: ${t['cv-surface-dialog']} !important;
  border: 1px solid ${t['cv-border-subtle']} !important;
  border-radius: ${t['cv-radius-md']} !important;
  color: ${t['cv-color-text-primary']} !important;
}

${root} .MuiBackdrop-root {
  background-color: ${t['cv-surface-overlay']} !important;
}

${root} .MuiPaper-root:not(.layout) {
  background-color: ${t['cv-surface-card']} !important;
  border-color: ${t['cv-border-strong']} !important;
  color: ${t['cv-color-text-primary']};
}

${root} .MuiButton-containedPrimary,
${root} .MuiButtonGroup-groupedContainedPrimary {
  background-color: ${t['cv-color-accent']} !important;
  box-shadow: none !important;
}

${root} .MuiButton-outlinedPrimary {
  border-color: ${t['cv-color-accent']} !important;
  color: ${t['cv-color-accent']} !important;
}

${root} .MuiSwitch-switchBase.Mui-checked {
  color: ${t['cv-color-accent']} !important;
}

${root} .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
  background-color: ${t['cv-color-accent']} !important;
}

${root} .the-menu .MuiListItemButton-root.Mui-selected,
${root} .MuiListItemButton-root.Mui-selected {
  background-color: ${t['cv-surface-nav-active']} !important;
  box-shadow: ${t['cv-effect-glow']} !important;
}

${root} .the-logo svg,
${root} .the-logo .st1 {
  fill: ${t['cv-color-text-primary']} !important;
}

${root} ::selection {
  color: ${t['cv-selection-fg']};
  background-color: ${t['cv-color-accent']};
}

${root} *::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: ${t['cv-scrollbar-bg']} !important;
}

${root} *::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: ${t['cv-scrollbar-thumb']} !important;
}
`.trim()
}

const flourishes = {
  obsidian: (t, root) => `
${root} .layout .layout-content__left {
  backdrop-filter: blur(${t['cv-effect-blur']}) !important;
  -webkit-backdrop-filter: blur(${t['cv-effect-blur']}) !important;
}
`,
  signal: (t, root) => `
${root} .layout .layout-content__left {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
${root} .base-content .MuiGrid-grid-xs-6 > .MuiBox-root,
${root} .MuiPaper-root:not(.layout) {
  backdrop-filter: none !important;
  box-shadow: none !important;
  border-radius: ${t['cv-radius-md']} !important;
}
${root} .the-menu .MuiListItemButton-root.Mui-selected {
  border-left: 3px solid ${t['cv-color-accent']} !important;
}
${root} .the-traffic {
  font-family: ${t['cv-font-mono']} !important;
  font-variant-numeric: tabular-nums;
}
`,
  paper: (t, root) => `
${root} .layout .layout-content__left {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
${root} .base-content .MuiGrid-grid-xs-6 > .MuiBox-root {
  box-shadow: ${t['cv-effect-glow']} !important;
}
`,
  neon: (t, root) => `
${root} .layout .layout-content__left {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
${root} .the-menu .MuiListItemButton-root.Mui-selected {
  border: 1px solid ${t['cv-border-focus']} !important;
  box-shadow: ${t['cv-effect-glow']} !important;
}
${root} .MuiButton-containedPrimary {
  color: #041018 !important;
}
`,
}

function rootFor(mode) {
  if (mode === 'media') return 'html body'
  if (mode === 'dark') return "html[data-theme='dark'] body"
  return "html[data-theme='light'] body"
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
  const lightT = parseTokens(extractMixin(`cv-${id}-light`))
  const darkT = parseTokens(extractMixin(`cv-${id}-dark`))
  const m = meta[id]
  const f = flourishes[id]

  if (!lightT['cv-font-sans'] || lightT['cv-font-sans'] === 'undefined') {
    throw new Error(`${id} light missing font-sans: ${lightT['cv-font-sans']}`)
  }
  if (!darkT['cv-font-sans']) {
    throw new Error(`${id} dark missing font-sans`)
  }

  const css = `/*
 * Clash Verge Themes — ${m.title} (DOM-aware v2)
 * Thesis: ${m.thesis}
 *
 * Stock Clash Verge CSS Injection:
 * - Light/Dark via prefers-color-scheme (no data-theme required)
 * - Direct paint + !important (beats html inline --vars & app post-import rules)
 * - Stable class targets only (.layout, .base-container, .the-menu, …)
 *
 * @import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@main/themes/${id}.css");
 */

@media (prefers-color-scheme: dark) {
${paintBlock(darkT, 'media')}
${f(darkT, rootFor('media'))}
}

${paintBlock(darkT, 'dark')}
${f(darkT, rootFor('dark'))}

@media (prefers-color-scheme: light) {
${paintBlock(lightT, 'media')}
${f(lightT, rootFor('media'))}
}

${paintBlock(lightT, 'light')}
${f(lightT, rootFor('light'))}
`

  const out = path.join(outDir, `${id}.css`)
  fs.writeFileSync(out, css, 'utf8')
  console.log('wrote', id, fs.statSync(out).size, 'bytes')
}
