<div align="center">

<img src="images/tangshu/tangshuwenzilogo.png" alt="唐姝" width="320" />

# 唐姝 · Tang Shu

**当千年文化，遇见数字时代 — When Millennial Culture Meets the Digital Age**

一部关于唐代美学、数字文化与千年工艺的数字杂志，也是一位向世界讲述中国非物质文化遗产的 AI 向导。

[🌐 在线预览](https://tangshu.github.io) · [🤖 体验 AI 对话](https://tangshu.github.io/chat.html) · [📄 English Readme](README_EN.md)

![GitHub Pages](https://img.shields.io/website?url=https%3A%2F%2Ftangshu.github.io&label=GitHub%20Pages&logo=github)
![License: ISC](https://img.shields.io/badge/license-ISC-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![零依赖](https://img.shields.io/badge/%E9%9B%B6%E4%BE%9D%E8%B5%96-native-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![中文](https://img.shields.io/badge/zh-%E4%B8%AD%E6%96%87-C41E3A)
![English](https://img.shields.io/badge/en-English-blue)
![日本語](https://img.shields.io/badge/ja-%E6%97%A5%E6%9C%AC%E8%AA%9E-white)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🖥️ Pages](#️-pages)
- [🎨 Design System](#-design-system)
- [🤖 AI Chat System](#-ai-chat-system)
- [🚀 Quick Start](#-quick-start)
- [📦 Deploy to GitHub Pages](#-deploy-to-github-pages)
- [⚙️ Configuration](#️-configuration)
- [🔐 Security Note](#-security-note)
- [📁 Project Structure](#-project-structure)
- [🌐 Localization](#-localization)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

从初唐到晚唐二百八十九年的历史烟云，到刺绣、香道、珠宝、妆容、剪纸、丝绸六类手工艺的温润肌理，再到 AI 与传统文化碰撞的未来想象——**全部以纯原生 HTML / CSS / JavaScript 实现，无框架、无构建步骤、无后端依赖**。

| 功能                 | 说明                                                       |
| ------------------ | -------------------------------------------------------- |
| 🏯 沉浸式视觉叙事         | 六屏滚动结构 + 视差背景 + 三段式品牌进入动画                                |
| 🎞️ 随机背景系统         | 每次进入随机切换 2 组「灰度 / 点亮」背景图层                                |
| 🕰️ 唐代时间轴          | 初唐 → 晚唐 6 大时代，点击卡片弹出图文故事（每时代 4 段长文）                      |
| 🧵 手工艺轮播           | 6 类工艺横向无限滚动，`requestAnimationFrame` 驱动、子像素平滑             |
| 🎬 视频放映厅           | DPlayer 本地化集成（`js/lib`），SVG 环形文字播放按钮                     |
| 💡 交互彩蛋            | 滚动至第六屏：进度条推进，灯泡点亮，背景由灰转彩                                 |
| 🤖 AI 非遗向导         | DeepSeek 大模型流式对话：SSE 增量渲染、Enter 发送、可随时中断                 |
| 📝 自研 Markdown 渲染器 | 标题 / 表格 / 列表 / 引用 / 代码块 / 任务清单，另扩展 `[c:red]` 彩色文本 BBCode |
| 💬 多会话管理           | localStorage 持久化会话与模型选择，一键导出 Markdown                    |
| 🌐 三语支持            | 中文 / English / 日本語 全量内容翻译，导航一键切换                         |

---

## 🖥️ Pages

| 页面              | 语言      | 说明                   |
| --------------- | ------- | -------------------- |
| `index.html`    | 简体中文    | 六屏沉浸式落地页             |
| `index_EN.html` | English | 落地页完整英译（含时代故事）       |
| `index_jp.html` | 日本語     | 落地页完整日译（含时代故事）       |
| `chat.html`     | 多语言     | AI 对话页（模型按用户语言回答）    |
| `login.html`    | 简体中文    | 登录页（前端演示 Mock，无真实鉴权） |

### 落地页六屏导览

| 屏              | 主题     | 内容                                      |
| -------------- | ------ | --------------------------------------- |
| 1 · `TOP`      | 品牌开场   | 进入动画、Logo、顶部导航                          |
| 2 · `CULTURE`  | 数字文化   | 无缝卡片轮播 + 宣传片播放入口                        |
| 3 · `AI`       | AI × 唐 | 双图层主视觉画廊 + 缩略图交叉淡入切换                    |
| 4 · `TIMELINE` | 唐代时间轴  | 初唐气象 · 贞观之治 · 武周革命 · 开元盛世 · 安史之乱 · 落日余晖 |
| 5 · `CRAFTS`   | 手工艺    | 刺绣 · 香道 · 珠宝 · 妆容 · 剪纸 · 丝绸             |
| 6 · `FUTURE`   | 向未来    | 进度条 + 灯泡点亮 + 收官文案                       |

---

## 🎨 Design System

### 色彩

| 色值                             | 名称     | 用途                |
| ------------------------------ | ------ | ----------------- |
| <code>#C41E3A</code>           | 唐红（主色） | 品牌强调、按钮、进度、进入动画文字 |
| <code>#C9A96E</code>           | 鎏金（辅色） | 标题点缀、AI 对话彩色文本「金」 |
| <code>#0A0A0A – #1A1A1A</code> | 玄墨（底色） | 页面背景层级            |
| <code>#FFFFFF</code>           | 素白     | 正文文字、高光           |

> **主题变体**：英文 / 日文版使用「红黑反转」主题（黑色强调 + 唐红文字），中文版为「红底白字」——两套主题仅由同名 CSS 文件切换，无任何运行时逻辑差异。

### 字体

- 正文：`'Noto Serif SC', 'Source Han Serif SC', 'STSong', 'SimSun', 'Songti SC'` 宋体系列
- 环形文字 / 无衬线场景：`'Helvetica Neue', Arial, sans-serif`

### 动效规范

- **进入动画**：白字定格 1s → 变红（800ms）→ 淡出 + 遮罩下滑（800ms），解锁滚动
- **标题飞入**：`IntersectionObserver` 触发 `fly-in`，阈值 30%
- **徽标缩放**：滚动超过 65% 视口高度，Logo 平滑缩至 300px，顶栏切换为汉堡菜单
- **无限轮播**：内容复制一份实现无缝循环，按 `setWidth` 取模推进，帧率自适应

---

## 🤖 AI Chat System

对话页是项目的核心交互。架构如下：

```
用户输入 ──▶ chat.js ──▶ DeepSeek API（SSE 流式）
    ▲                        │
    │                        ▼
 渲染气泡 ◀── formatContent ◀── 增量分片解析
```

### 流式对话

- `fetch` + `ReadableStream` + `TextDecoder` 增量解析 SSE，逐 token 渲染
- `AbortController` 支持随时中断；中断后保留已生成内容
- 请求参数：`temperature 0.8`、`max_tokens 16384`、`stream: true`

### Markdown 渲染器（`js/chat.js` → `formatContent`）

自研五阶段渲染管线，全程在**转义之后**注入格式化，规避 XSS：

1. **保护**：提取代码块与行内代码，存入保护区
2. **转义**：对剩余全文做 HTML 转义
3. **BBCode 彩色**：`[c:red]…[/c:red]` → 彩色 `<span>`
4. **块级**：标题、表格、列表（有序/无序/任务）、引用、分隔线
5. **行内**：图片、链接、加粗、斜体、删除线；最后还原保护区

### 彩色文本语法（提示词引导模型使用）

| 标签           | 色值        | 语义         |
| ------------ | --------- | ---------- |
| `[c:red]`    | `#E57373` | 关键概念、重点标题  |
| `[c:gold]`   | `#C9A96E` | 文化瑰宝、历史人名  |
| `[c:green]`  | `#81C784` | 活态传承、可持续实践 |
| `[c:blue]`   | `#64B5F6` | 地理位置、水相关元素 |
| `[c:purple]` | `#CE93D8` | 哲学思想、精神概念  |
| `[c:cyan]`   | `#4DD0E1` | 技术术语、现代连接  |
| `[c:orange]` | `#FFB74D` | 节庆、欢庆内容    |

### 人物设定

AI 人设与输出规范集中在 **`js/prompt.js`**（`SYSTEM_PROMPT`）：唐姝是一位温润博学的非遗向导，按用户语言回答，强制 Markdown 结构化输出，并引导使用彩色文本——**改人设只需编辑这一个文件**。

---

## 🚀 Quick Start

项目是纯静态站点，**任何静态服务器**都可直接运行：

```bash
# 方式一：Python
python3 -m http.server 8000

# 方式二：Node
npx serve .

# 方式三：VS Code 安装 Live Server 扩展后右键打开
```

浏览器访问 `http://localhost:8000` 即可。

> 💡 直接双击打开 `index.html` 亦可浏览，但部分浏览器会对 `fetch` 请求有本地文件限制，本地开发建议起一个静态服务。

---

## 📦 Deploy to GitHub Pages

```bash
# 1. 初始化仓库并提交
git init
git add .
git commit -m "feat: init 唐姝"

# 2. 在 GitHub 新建仓库（命名为 <你的用户名>.github.io），然后推送
git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
git push -u origin main
```

3. 打开仓库 **Settings → Pages**，Source 选择 `Deploy from a branch`，分支 `main`，目录 `/(root)`，保存。

> ⚠️ 仓库根目录带有 `node_modules`（DPlayer 的 npm 包）——它并非运行所必需（`js/lib/DPlayer.min.js` 已是本地化副本），建议提交前先移除并添加 `.gitignore`。

---

## ⚙️ Configuration

所有配置集中在 `js/chat.js` 顶部的 `API_CONFIG`：

```js
const API_CONFIG = {
  chatUrl: 'https://api.deepseek.com/chat/completions', // 对话接口
  apiKey: 'sk-xxxx...',                                  // 密钥
};
```

| 配置项                  | 位置             | 说明                              |
| -------------------- | -------------- | ------------------------------- |
| `API_CONFIG.chatUrl` | `js/chat.js`   | 对话接口地址，`/models` 地址自动派生         |
| `API_CONFIG.apiKey`  | `js/chat.js`   | 模型密钥                            |
| `FALLBACK_MODELS`    | `js/chat.js`   | `/models` 接口不可用时的兜底模型列表         |
| `SYSTEM_PROMPT`      | `js/prompt.js` | AI 人设与输出规范                      |
| `STORAGE_KEY_*`      | `js/chat.js`   | localStorage 键名（会话 / 模型 / 当前对话） |

---

## 🔐 Security Note

> ⚠️ **当前版本将 API Key 直接写在 `js/chat.js` 前端源码中。** 一旦部署到公开的 GitHub Pages，任何人查看页面源码即可获取并盗用该密钥，消耗你的 API 额度。

**推荐做法（二选一）：**

1. **立即吊销泄露的 Key**，并在 DeepSeek 控制台重新生成；
2. **接入后端代理**，让密钥只存在于服务端。一个最小可用的 Cloudflare Worker 示例：

```js
// worker.js — 部署为你的 API 代理，chatUrl 指向该 Worker 地址
export default {
  async fetch(request) {
    const API_URL = 'https://api.deepseek.com/chat/completions';
    const API_KEY = '<仅存于服务端的密钥>';

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const body = await request.json();
    const upstream = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: { 'Content-Type': 'text/event-stream' }, // 透传 SSE 流
    });
  }
}
```

---

## 📁 Project Structure

```
tangshu.github.io/
├── index.html              # 落地页（简体中文）
├── index_EN.html           # 落地页（English）
├── index_jp.html           # 落地页（日本語）
├── chat.html               # AI 对话页
├── login.html              # 登录页（前端 Mock）
│
├── css/
│   ├── index.css           # 落地页样式（中文版 · 唐红主题）
│   ├── index_EN.css        # 落地页样式（英/日版 · 红黑反转主题）
│   ├── index_jp.css        # 同 index_EN.css，随页面引用
│   ├── chat.css            # 对话页样式（含 7 色彩色文本）
│   └── login.css           # 登录页样式
│
├── js/
│   ├── index.js            # 落地页逻辑（中文文案 / 时代故事）
│   ├── index_EN.js         # 落地页逻辑（英文文案 / 时代故事）
│   ├── index_jp.js         # 落地页逻辑（日文文案 / 时代故事）
│   ├── chat.js             # 对话逻辑（SSE 流式 / Markdown 渲染 / 会话管理）
│   ├── login.js            # 登录逻辑（Mock）
│   ├── prompt.js           # AI 系统提示词（人设定制入口）
│   └── lib/
│       └── DPlayer.min.js  # 视频播放器（本地化依赖，免 CDN）
│
└── images/
    ├── landing/            # 落地页素材（dynasty / crafts / ai / scenes / future…）
    ├── tangshu/            # 唐姝形象与品牌 Logo
    ├── assets/             # 背景图层与特效素材（含「点亮」变体）
    └── video/              # 宣传片 bg1.mp4（15MB）与 GIF 预览
```

---

## 🌐 Localization

三语版本为**全量翻译**而非运行时切换：HTML、CSS（主题变体）、JS（时代故事文案）各自成对存在。

新增语言步骤：

1. 复制 `index.html` → `index_<lang>.html`，翻译全部文案；
2. 复制 `css/index.css` → `css/index_<lang>.css`（可选：调整主题色）；
3. 复制 `js/index.js` → `js/index_<lang>.js`，翻译 `stories` 数组；
4. 在 `index.html` 与 `index_<lang>.html` 的导航语言切换中加入对应跳转。

> 💡 长期建议：将三份重复代码重构为「共享样式 + 语言包 JSON」，可大幅降低维护成本（详见 Roadmap）。

---

## 🗺️ Roadmap

- [x] 六屏沉浸式落地页（三语）
- [x] AI 流式对话 + 自研 Markdown 渲染器
- [ ] 服务端代理层（解决 API Key 暴露与 CORS 限制）
- [ ] 语言包重构：消除三份重复的 HTML / CSS / JS
- [ ] 真实注册 / 登录与云端会话同步
- [ ] 更多模型接入（Claude / OpenAI / 本地 Ollama）
- [ ] PWA 离线支持

---

## 🤝 Contributing

欢迎任何形式的贡献——Bug 修复、交互优化、文案润色、新语言翻译：

1. Fork 本仓库并创建特性分支（`git checkout -b feat/xxx`）；
2. 提交修改（遵循 Conventional Commits 规范）；
3. 发起 Pull Request，说明改动动机与影响范围。

> 注意：若涉及 `js/chat.js`，请勿提交真实 API Key。

---

## 📄 License

本项目基于 [ISC License](./LICENSE) 开源。

> 站点内的图片、视频与文字内容版权归原作者所有，仅供本项目展示使用。

---

<div align="center">

**唐姝** — 让沉睡千年的文化遗产，在数字世界中重新发声。

Made with ❤️ and a deep love for the Tang Dynasty.

</div>
