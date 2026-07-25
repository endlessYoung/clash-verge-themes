# Spec 14 — Cyber vs AI Operator differentiation

Date: 2026-07-25  
Research: Nocturne / stellae cyberpunk HUD · neo-terminal / Design Rails terminal · sysui Neon vs Terminal themes

## Problem

Cyber Nexus and AI Operator both read as “dark + green + mono chrome”, so users cannot tell them apart.

## Axis of difference (locked)

| Axis | **Cyber Nexus** (HUD) | **AI Operator** (console) |
|------|------------------------|---------------------------|
| Metaphor | Night-city tactical display | Phosphor CRT / CLI agent console |
| Palette | Green **+ cyan + magenta** (focus) | Phosphor green **+ amber only** — **no cyan/magenta/purple** |
| Shape | Chamfer / clip-path, HUD brackets | Near-square 1–2px; **corner ticks**, no chamfer glow |
| Type | Sans UI + Orbitron English chrome + mono data | **Mono-first** (labels, chrome, buttons); CJK sans fallback |
| Atmosphere | Scanlines + neon wash + sweep beam + glow | Dot-grid + soft scanline; **zero neon bloom** |
| Motion | Sweep, lock-scan, filament | Caret blink, channel pulse only |
| Borders | Luminous multi-hue edges | Flat `#1d3a2f`-class green borders / dashed dividers |

## Do / Don’t

**Cyber MUST**
- Keep chamfer cards, outer HUD frame, triad accents on focus only
- Allow glow on instruments/CTA
- Never use triad sidebar spine (Spec 12)

**AI MUST**
- Ban magenta, electric cyan, Orbitron, multi-hue progress gradients
- Ban outer glow bloom and clip-path chamfers
- Use `$` / `>` channel chrome and amber as process/warn accent only

## Acceptance

Side-by-side screenshot: different silhouette (chamfer vs square), different accent count (3 vs 2), different type voice (HUD vs CLI).
