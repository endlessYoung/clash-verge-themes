# Spec 09 — Cyber Nexus · ION COCKPIT (bold rewrite)

Version: 1.0  
Status: **Approved by mandate** (user: ignore prior quiet/medium; show upper limit)  
Date: 2026-07-23  
Scope: Cyber Nexus only · `dist/cyber-nexus.css`

## Thesis

Not a recolored MUI app. A **hard-edge ion cockpit**: void bay, chamfered panels,
dense scan-grid, phosphor data bloom, tactical spine. Geometry is the hero;
glow is confined to **numerals and lock frames**.

## Anti-patterns (still banned)

- Soft 12px radius everywhere  
- Full-card cyan outer glow stacks  
- Purple-on-black generic AI skin as the whole UI  

## Palette

| Role | Hex |
|------|-----|
| Void | `#010308` |
| Bay | `#050a14` |
| Panel | `#0b1422` |
| Ion | `#3DF0FF` |
| Plasma (slash only) | `#8B5CFF` |
| Phosphor text | `#B8F7FF` |
| Hairline | `rgba(180,220,255,0.14)` |

Status colors remain locked from core tokens.

## Signature devices

1. Chamfered cards (`clip-path` octagon cut)  
2. Dense scan-grid + horizontal scan hairlines on page well  
3. Sidebar ion spine (segmented leading edge)  
4. Traffic = oversized phosphor lock box  
5. Header tactical strip (mono tracking, ion underline)  
6. Radius ≤ 2px; almost no soft elevation  

## Delivery

Rewrite `themes/cyber-nexus/{colors,components,animation}.css` → rebuild dist.
