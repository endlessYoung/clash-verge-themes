# Spec 13 — Apple themes from apple-style skill

Date: 2026-07-25  
Source: `~/.claude/skills/apple-style/apple-style-demo.html`

## Internalized tokens

| Token | Light | Dark |
|-------|-------|------|
| Blue | `#007AFF` | `#0A84FF` |
| Green (toggle ON) | `#34C759` | `#30D158` |
| Page bg | `#F2F2F7` | `#000000` |
| Elevated | `#FFFFFF` | `#1C1C1E` |
| Label primary | `#000` | `#FFF` |
| Label secondary | `rgba(60,60,67,0.6)` | `rgba(235,235,245,0.6)` |
| Separator | `rgba(60,60,67,0.29)` | `rgba(84,84,88,0.6)` |
| Radius | 8 / 14 / 20 | same |
| Frost | `blur(20px) saturate(180%)` @ 72% opacity | same |
| Ease | spring `cubic-bezier(0.34,1.56,0.64,1)` · smooth `cubic-bezier(0.16,1,0.3,1)` |

## Theme split

- **apple-classic** — Settings list-group: solid elevated cards, frosted header, green switches, no lift spectacle
- **apple-liquid** — Same tokens; nav/sidebar/cards use frosted liquid glass; hover float + press scale

Status colors remain locked in `core/tokens.css` (not Apple semantic overrides).
