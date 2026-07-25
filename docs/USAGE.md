# 使用说明（Clash Verge Themes）

**当前版本：`v1.0.0`**（2026-07-25）

本仓库提供可注入到 Clash Verge Rev 的主题 CSS。应用端只需开启官方 **CSS Injection**，无需 fork。

---

## 1. 安装（推荐 CDN）

1. 打开 **Clash Verge**
2. 进入 **设置 → 外观 / Theme Setting → 编辑 CSS**
3. 清空旧自定义 CSS（或先备份）
4. 粘贴 **一行** `@import`（见下方）
5. 主题模式选 **系统**（跟随 OS 浅/深色）
6. 保存并观察主页 / 侧栏 / 流量卡是否刷新

### 正式版（钉标签）

把主题名换成你要的即可：

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@v1.0.0/dist/cyber-nexus.css");
```

| 主题 | URL 末尾文件 |
|------|----------------|
| Cyber Nexus | `dist/cyber-nexus.css` |
| AI Operator | `dist/ai-operator.css` |
| Aurora Glass | `dist/aurora-glass.css` |
| Apple Classic | `dist/apple-classic.css` |
| Apple Liquid Glass | `dist/apple-liquid.css` |

### 钉某个 commit（开发跟踪）

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@e20de43/dist/ai-operator.css");
```

> **不要**写 `@develop` 或 `@main` 分支别名。jsDelivr 对分支缓存很激进，容易看到旧版。

> **不要**用 `raw.githubusercontent.com`。返回 `text/plain` + `nosniff` 时，浏览器会忽略样式表。

---

## 2. 切换主题

每次只保留 **一条** `@import`。换主题 = 改文件名（或改整行 URL）后保存。

---

## 3. 浅色 / 深色

主题内部用：

- `prefers-color-scheme`
- 以及 `html[data-theme='light'|'dark']`（若宿主设置了）

Clash Verge 主题模式建议：**系统**。

---

## 4. 预览截图

仓库内壳层预览截图（气质参考）：

![Cyber Nexus](./screenshots/cyber-nexus.png)

![AI Operator](./screenshots/ai-operator.png)

![Aurora Glass](./screenshots/aurora-glass.png)

![Apple Classic](./screenshots/apple-classic.png)

![Apple Liquid](./screenshots/apple-liquid.png)

本地自己预览：

```bash
npx serve . -p 4173
```

打开对应主题页（每主题独立页面，避免查询参数被静态服务器丢掉）：

```
http://localhost:4173/docs/previews/cyber-nexus.html
http://localhost:4173/docs/previews/ai-operator.html
http://localhost:4173/docs/previews/aurora-glass.html
http://localhost:4173/docs/previews/apple-classic.html
http://localhost:4173/docs/previews/apple-liquid.html
```

通用壳（可改 `?theme=`，部分静态服务器会丢掉查询参数，优先用上面的独立页）：

```
http://localhost:4173/docs/previews/shell.html?theme=cyber-nexus&mode=dark
```

---

## 5. 故障排查

| 现象 | 处理 |
|------|------|
| 完全没变化 | 确认用的是 `dist/*.css` 单文件；确认保存成功；硬刷新 / 重启客户端 |
| 像旧主题 | 把 `@develop` 改成 `@v1.0.0` 或新 commit；清 CDN 缓存后重试 |
| 数字 / 国旗异常 | 升级到本仓库最新 dist（emoji / 字体栈已修过） |
| 开关异常发光 | 使用 ≥ v1.0.0 的 Cyber / 其它主题；勿叠加多份注入 |

---

## 6. 版本约定

遵循 [Semantic Versioning](https://semver.org/)：

- **MAJOR**：不兼容的主题结构 / 破坏性视觉变更
- **MINOR**：新主题或向后兼容的增强
- **PATCH**：修 bug / 文档 / 截图

发布流程（维护者）：

1. `develop` 完成并构建 `dist/`
2. 更新 `package.json` version + `CHANGELOG.md`
3. 合并到 `main`
4. 打 tag：`vX.Y.Z` 并 push tags
5. （可选）GitHub Release

当前稳定线：`main` @ **`v1.0.0`**
