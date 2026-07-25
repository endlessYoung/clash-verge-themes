# Clash Verge 主题使用说明

**版本：v1.0.1**

用一行 CSS 给 [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) 换肤。无需改客户端源码。

---

## 安装步骤

1. 打开 **Clash Verge**
2. 进入 **设置 → 外观设置（Theme Setting）→ 编辑 CSS**
3. 清空旧内容（建议先复制备份）
4. 粘贴下面 **一行** `@import`
5. 主题模式选 **系统**
6. 保存

### 推荐写法（钉版本）

```css
@import url("https://cdn.jsdelivr.net/gh/endlessYoung/clash-verge-themes@v1.0.1/dist/cyber-nexus.css");
```

| 主题 | 文件 |
|------|------|
| Cyber Nexus | `dist/cyber-nexus.css` |
| AI Operator | `dist/ai-operator.css` |
| Aurora Glass | `dist/aurora-glass.css` |
| Apple Classic | `dist/apple-classic.css` |
| Apple Liquid Glass | `dist/apple-liquid.css` |

### 注意

- 不要用 `@main` / `@develop` 分支别名（CDN 缓存可能导致仍是旧主题）
- 不要用 `raw.githubusercontent.com`（可能导致样式不生效）
- 每次只保留 **一条** `@import`

---

## 预览图

![Cyber Nexus](./screenshots/cyber-nexus.png)

![AI Operator](./screenshots/ai-operator.png)

![Aurora Glass](./screenshots/aurora-glass.png)

![Apple Classic](./screenshots/apple-classic.png)

![Apple Liquid Glass](./screenshots/apple-liquid.png)

本地预览：

```bash
npx serve . -p 4173
```

打开 `http://localhost:4173/docs/previews/cyber-nexus.html` 等页面即可。

---

## 故障排查

| 现象 | 建议 |
|------|------|
| 界面无变化 | 确认 `dist/` 单文件 URL；保存后重启客户端 |
| 看起来还是旧主题 | 改用 `@v1.0.1` 或最新 commit；换浏览器缓存 / 重开软件 |
| 数字或国旗显示异常 | 升级到本仓库最新 `dist` 文件 |
| 多个主题混在一起 | 删除多余 `@import`，只留一行 |

---

## 返回主页

更多介绍见仓库根目录 [README.md](../README.md)。
