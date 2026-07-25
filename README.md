# Clash Verge Themes

**Version `1.0.0`** · Injectable CSS themes for
[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev)
（官方 **CSS Injection**，无需改源码 / fork）

[![release](https://img.shields.io/badge/release-v1.0.0-blue)](https://github.com/endlessYoung/clash-verge-themes/releases/tag/v1.0.0)
[![license](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## 预览

| Cyber Nexus | AI Operator |
|-------------|-------------|
| ![Cyber Nexus](docs/screenshots/cyber-nexus.png) | ![AI Operator](docs/screenshots/ai-operator.png) |

| Aurora Glass | Apple Classic |
|--------------|---------------|
| ![Aurora Glass](docs/screenshots/aurora-glass.png) | ![Apple Classic](docs/screenshots/apple-classic.png) |

| Apple Liquid Glass |
|--------------------|
| ![Apple Liquid](docs/screenshots/apple-liquid.png) |

> 截图来自仓库内壳层预览页（`docs/previews/shell.html`），用于展示主题气质；实际 Clash Verge 窗口细节可能略有差异。

## 主题一览

| 主题 | 文件 | 气质 |
|------|------|------|
| **Cyber Nexus** | `dist/cyber-nexus.css` | Neural OS — 青/紫玻璃信号层 |
| **AI Operator** | `dist/ai-operator.css` | Agent desk — Linear / Cursor 蓝锌 |
| **Aurora Glass** | `dist/aurora-glass.css` | 极光空间玻璃 |
| **Apple Classic** | `dist/apple-classic.css` | iOS Settings HIG |
| **Apple Liquid Glass** | `dist/apple-liquid.css` | 液态毛玻璃 |

五套均支持 **浅色 / 深色**（跟随系统 `prefers-color-scheme`，或 `html[data-theme]`）。

## 30 秒上手

1. 打开 Clash Verge → **设置 → 外观设置 → 编辑 CSS**（Theme Setting → Edit CSS）
2. 粘贴下面 **一行** `@import`（只用 `dist/` 单文件）
3. 主题模式建议选 **系统**
4. 保存

推荐钉 **版本标签** `v1.0.0`（或 commit hash），**不要**用 `@develop` / `@main` 分支别名（jsDelivr 缓存很凶）。

### Cyber Nexus

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@v1.0.0/dist/cyber-nexus.css");
```

### AI Operator

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@v1.0.0/dist/ai-operator.css");
```

### Aurora Glass

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@v1.0.0/dist/aurora-glass.css");
```

### Apple Classic

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@v1.0.0/dist/apple-classic.css");
```

### Apple Liquid Glass

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@v1.0.0/dist/apple-liquid.css");
```

更完整的说明（切换主题、故障排查、本地预览）见 **[docs/USAGE.md](docs/USAGE.md)**。

## 版本与分支

| 项 | 约定 |
|----|------|
| SemVer | `MAJOR.MINOR.PATCH`（见 `package.json` + `CHANGELOG.md`） |
| 当前正式版 | **`v1.0.0`** |
| `main` | 稳定发布线（用户应钉 tag / release） |
| `develop` | 开发线 |
| 变更日志 | [CHANGELOG.md](./CHANGELOG.md) |

升级：把 `@v1.0.0` 换成新 tag，或换成具体 commit short hash。

## 开发（维护者）

```bash
npm run build
# → dist/cyber-nexus.css …
```

```
core/                  # tokens / reset / compatibility / emoji
themes/<name>/         # colors → components → states → animation
dist/<name>.css        # 注入用单文件
docs/previews/         # 壳层预览
docs/screenshots/      # README 截图
specs/                 # 设计 Spec
```

本地预览：

```bash
npx serve . -p 4173
# http://localhost:4173/docs/previews/cyber-nexus.html
```

## 工程约束

- 不改壳层布局几何
- 状态色锁定于 `core/tokens.css`
- 禁止 `raw.githubusercontent.com`（MIME 错误会导致样式静默失败）
- 禁止在 CSS 注释里写会提前闭合的 `*/` 路径片段

## License

MIT
