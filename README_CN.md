<p align="center">
  <a href="README.md">English</a> | <strong>中文</strong>
</p>

<p align="center">
  <img src="images/favicon.png" width="96" height="96" alt="唐姝驾到">
</p>

<h1 align="center">入长安 · 唐姝驾到</h1>

<p align="center">
  <strong>让千年技艺，再次被看见</strong><br>
  <sub>Tang Dynasty Intangible Cultural Heritage · Immersive Digital Experience</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/stack-vanilla_HTML_%2F_CSS_%2F_JS-000000?style=flat-square" alt="Stack: Vanilla">
  <img src="https://img.shields.io/badge/build-none_required-brightgreen?style=flat-square" alt="Build: None">
  <img src="https://img.shields.io/badge/deploy-GitHub_Pages-222222?style=flat-square" alt="Deploy: GitHub Pages">
  <img src="https://img.shields.io/badge/dependencies-zero-blue?style=flat-square" alt="Dependencies: Zero">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License: MIT">
</p>

---

## 目录

- [项目概述](#项目概述)
- [快速开始](#快速开始)
- [页面一览](#页面一览)
- [目录结构](#目录结构)
- [设计系统](#设计系统)
  - [液态玻璃拟态](#液态玻璃拟态)
  - [色彩体系](#色彩体系)
  - [字体排版](#字体排版)
  - [动画系统](#动画系统)
- [架构设计](#架构设计)
  - [CSS 架构](#css-架构)
  - [JavaScript 架构](#javascript-架构)
  - [图片系统](#图片系统)
- [页面详情](#页面详情)
  - [入长安 (首页)](#入长安-首页)
  - [观非遗 (非遗展示)](#观非遗-非遗展示)
  - [沉浸研习 (工坊研习)](#沉浸研习-工坊研习)
  - [唐姝同行 (唐姝陪伴)](#唐姝同行-唐姝陪伴)
  - [百工新生 (未来创造)](#百工新生-未来创造)
  - [登录](#登录)
- [浏览器支持](#浏览器支持)
- [开发笔记](#开发笔记)
- [部署指南](#部署指南)
- [许可证](#许可证)

---

## 项目概述

**入长安 · 唐姝驾到**是一个零依赖的静态网站，通过五个沉浸式"空间"重新演绎唐代非物质文化遗产。数字人格**唐姝**引导访客探索传统技艺、历史记忆，以及一个传统与数字文明共生的未来长安愿景。

### 项目亮点

- **零依赖。** 无 npm、无 webpack、无 React、无 jQuery。直接在浏览器中打开 `index.html` 即可运行。
- **液态玻璃拟态** — 六层 CSS 玻璃系统，包含多角度渐变主体、棱镜边缘模拟、SVG 分形噪声纹理和鼠标驱动的 3D 倾斜。
- **弹性动画** — 采用 Apple 风格的缓动曲线，带来自然流畅的动效体验。
- **60 张精选 `.webp` 图片**，按严格命名规范组织。
- **5 个独立页面 + 1 个登录入口**，每个页面都拥有独立的 HTML、CSS 和 JS 文件。
- **共享设计系统** — 通过 `common.css`（845 行）和 `common.js`（459 行）实现零重复代码。

---

## 快速开始

```bash
npx serve .
open http://localhost:3000
```

仅此而已。无需 `npm install`、无需构建步骤、无需环境变量。每个页面都可以立即使用。唐姝页面的对话区包含静态示例消息，用于展示交互模式。

---

## 页面一览

| # | 页面 | 文件 | 核心视觉元素 |
|---|------|------|-------------|
| 1 | **入长安** (首页) | `index.html` | 视差英雄区、8 粒子环境光、3 个玻璃倾斜面板、6 项无限轮播 |
| 2 | **观非遗** (非遗展示) | `heritage.html` | 三栏展厅：玉质标签栏（6 种技艺）+ 中央舞台 + 唐姝导览 |
| 3 | **沉浸研习** (工坊) | `workshop.html` | 微距复原缩放、动画研习标签、朝代时间轴 |
| 4 | **唐姝同行** (唐姝) | `tangshu.html` | 5 个记忆碎片、话题对话界面、4 个场景空间、成长树 |
| 5 | **百工新生** (未来) | `future.html` | 创作工坊（海报/脚本/文案）、作品展示、未来长安愿景 |
| 6 | **登录** | `login.html` | 玻璃拟态登录表单，含表单验证和 API 集成接口 |

每个页面遵循相同的结构：

```html
<link rel="stylesheet" href="css/common.css">   <!-- 共享设计系统 — 始终最先加载 -->
<link rel="stylesheet" href="css/{page}.css">   <!-- 页面专属样式 -->

<nav class="nav">...</nav>                      <!-- 固定玻璃导航栏 -->
<main>
  <section class="hero">...</section>           <!-- 全屏英雄区带特效 -->
  <section class="section">...</section>        <!-- 内容区块 -->
  <section class="quote finale-section">...</section>  <!-- 压轴 CTA 区块 -->
</main>

<script src="js/{page}.js"></script>            <!-- 页面专属逻辑必须最先加载 -->
<script src="js/common.js"></script>            <!-- 共享工具必须最后加载 -->
```

> **加载顺序至关重要。** `common.js` 在 `DOMContentLoaded` 时自动初始化所有功能。页面 JS 文件不得重复包含共享功能。

---

## 目录结构

```
tangshu.github.io/
├── index.html              # 入长安 — 首页（244 行）
├── heritage.html           # 观非遗 — 非遗展厅（455 行）
├── workshop.html           # 沉浸研习 — 工坊研习（294 行）
├── tangshu.html            # 唐姝同行 — 唐姝陪伴（443 行）
├── future.html             # 百工新生 — 未来创造（224 行）
├── login.html              # 登录入口（144 行）
│
├── css/
│   ├── common.css          # ★ 共享设计系统（845 行）— 唯一设计标准
│   ├── index.css           # 首页 — 英雄区、轮播、面板（1002 行）
│   ├── heritage.css        # 非遗页 — 展厅布局、玉质标签（629 行）
│   ├── workshop.css        # 工坊页 — 研习面板、微距布局（704 行）
│   ├── tangshu.css         # 唐姝页 — 对话、记忆、场景（849 行）
│   ├── future.css          # 未来页 — 创作者面板、作品展示（858 行）
│   └── denglu.css          # [已废弃] — 未被任何页面加载
│
├── js/
│   ├── common.js           # ★ 共享工具库（459 行）— DOMContentLoaded 时自动初始化
│   ├── index.js            # 首页：视差、粒子、轮播箭头（126 行）
│   ├── heritage.js         # 非遗：玉质标签切换 + 导览文字（63 行）
│   ├── workshop.js         # 工坊：动画研习标签 + 匠人语录（88 行）
│   ├── tangshu.js          # 唐姝：记忆碎片、场景标签（87 行）
│   └── future.js           # 未来：创作者面板高度自适应（65 行）
│
└── images/
    ├── tangshu-*           # 4 张 — 唐姝角色肖像
    ├── dynasty-*           # 8 张 — 朝代时间轴（4 个时代 × 2 种变体）
    ├── embroidery-*        # 7 张 — 刺绣工艺细节
    ├── makeup-*            # 4 张 — 妆容/花钿工艺
    ├── papercut-*          # 4 张 — 剪纸工艺
    ├── incense-*           # 4 张 — 香道工艺
    ├── jewelry-*           # 3 张 — 唐代首饰
    ├── silk-*              # 2 张 — 丝绸织造
    ├── scene-*             # 4 张 — 沉浸式场景空间
    ├── memory-*            # 4 张 — 唐姝记忆碎片
    ├── ai-*                # 5 张 — AI 创作工具
    ├── future-*            # 4 张 — 未来长安
    ├── showcase-*          # 3 张 — 未来作品展示
    ├── culture-*           # 2 张 — 唐代人物艺术
    ├── micro-*             # 1 张 — 微距研究图
    ├── heritage-*          # 1 张 — 非遗细节
    └── favicon.png         # 网站图标

    总计：60 张 .webp + 1 张 .png
```

---

## 设计系统

### 液态玻璃拟态

玻璃效果由**六个视觉层次**构成——每一层贡献真实玻璃的特定物理特性：

**1. 多角度渐变主体 — 内部光线折射：**
```css
background: linear-gradient(160deg,
  rgba(255,255,255,.08) 0%,
  rgba(255,255,255,.03) 25%,
  rgba(255,255,255,.015) 50%,
  rgba(255,255,255,.04) 72%,
  rgba(255,255,255,.06) 100%
);
```
160° 对角线角度配合非对称亮度断点，模拟光线从左上角进入并在玻璃体内散射的效果。

**2. 背景模糊滤镜 — 磨砂核心：**
```css
backdrop-filter: blur(28px) saturate(170%);
```
28px 的模糊提供充分的背景遮挡，170% 的饱和度增强补偿了模糊带来的自然褪色，使玻璃后的色彩依然鲜明。

**3. 棱镜边缘 — 六层阴影模拟菲涅尔折射：**
```css
box-shadow:
  0 12px 40px rgba(0,0,0,.18),         /* 深层外阴影 */
  0 4px 16px rgba(0,0,0,.12),          /* 近层外阴影 */
  inset 0 1px 0 rgba(255,255,255,.10),  /* 顶部边缘 — 最亮（光从上方来） */
  inset 1px 0 0 rgba(255,255,255,.02),  /* 右侧边缘 — 微妙 */
  inset -1px 0 0 rgba(255,255,255,.015),/* 左侧边缘 — 微妙 */
  inset 0 -1px 0 rgba(0,0,0,.04),      /* 底部边缘 — 暗色（下方阴影） */
  0 0 0 1px rgba(255,255,255,.025);    /* 外层微光环 */
```
这种非对称内阴影模式营造了光线以不同角度照射玻璃表面的错觉——顶部最亮（光线进入处），底部较暗（阴影积聚处），两侧的微妙变化模拟真实玻璃边缘的折射。

**4. 顶部光晕（`::before`）— 上表面聚光：**
```css
background: linear-gradient(175deg,
  rgba(255,255,255,.12) 0%,
  rgba(255,255,255,.03) 20%,
  transparent 45%
);
```

**5. 底部深度 + SVG 噪声纹理（`::after`）：**
底部边缘的渐变阴影（模拟玻璃下方积聚的暗影），结合 SVG `feTurbulence` 分形噪声叠加层（3.5% 透明度）——几乎不可见，但增添了让玻璃具有真实物理质感而非冷硬平面的微表面纹理。

**6. 鼠标驱动的 3D 倾斜（JavaScript）— 针对具有 `.glass-tilt` 类的元素：**
每张卡片独立追踪光标位置，应用弹性插值的 `rotateX`/`rotateY`（最大 ±3.5°），以及跟随光标的动态 `radial-gradient` 高光。弹性物理（`stiffness = 0.08`）产生自然的滞后感，模拟真实物体对手触碰的响应。

| 玻璃变体 | 模糊值 | 饱和度 | 使用场景 |
|---------|--------|--------|---------|
| **导航栏** | `30px` | `160%` | 固定顶部导航条 |
| **卡片** | `28px` | `170%` | 内容面板、画廊 |
| **登录面板** | `40px` | `160%` | 居中模态表单 |

### 色彩体系

| 角色 | 颜色值 | 应用范围 |
|------|--------|---------|
| 最深背景 | `#020908` | `body` 渐变起点 |
| 表面背景 | `#0e2a22` → `#041311` | `body` 径向渐变 |
| 点缀金色 | `#C6A86A` | 交互边框、高光 |
| 香槟色 | `#c4a35a` / `#e8d5a8` | 按钮渐变、浅色文本 |
| 标题金色 | `#f0dfc0` → `#c9b078` | `.title` 静态渐变 |
| 标签金灰 | `rgba(198,168,106,.55)` | `.small` 区域标签 |
| 正文文本 | `rgba(255,255,255,.6)` | `.text`、`p` |
| 导航默认 | `rgba(255,255,255,.64)` | `.nav a` |
| 导航悬停 | `rgba(255,255,255,.9)` | `.nav a:hover` |
| 导航激活 | `#fff` | `.nav a.active` |
| 玻璃边框 | `rgba(255,255,255,.07-.10)` | 所有玻璃元素 |
| 玻璃高光 | `rgba(255,255,255,.08-.14)` | 内部顶部边缘 |

**关键规则：** 玻璃边框始终使用白色，绝不用金色。实测发现金色边框在玻璃上显得浑浊。金色仅用于交互元素和文本标签的点缀。

### 字体排版

| 元素 | 字号 | 字重 | 字间距 | 行高 | 特殊说明 |
|------|------|------|--------|------|---------|
| `h1`（英雄区） | `clamp(3.2rem, 6.2vw, 6.1rem)` | `250` | `-.02em` | `1.08` | ★ 唯一使用 `textShine` 动画的元素 |
| `.title` | `clamp(2.4rem, 4.4vw, 4.4rem)` | `280-300` | `-.02em` | `1.18` | 静态金色渐变 |
| 卡片标题 | `clamp(1.85rem, 2.45vw, 2.45rem)` | `280-300` | `-.015em` | `1.24-1.28` | `#f0dfbf` |
| `.text`（正文） | `16-17px` | `400` | — | `1.75` | |
| `.small`（标签） | `12px` | `500` | `.18em` | — | 大写、金灰色 |
| `.nav a` | `14px` | `400` | `.12em` | — | |
| `.desc`（描述） | `17-18px` | `400` | — | `1.75-1.8` | 最大宽度 `34-35em` |

所有文本使用系统中文字体栈：`"PingFang SC"` → `"SF Pro Display/Text"` → `"Hiragino Sans GB"` → `"Noto Sans SC"` → `"Microsoft YaHei"`。通过 `-webkit-font-smoothing: antialiased` 启用字体平滑渲染。

### 动画系统

所有动画由 CSS 变量驱动，确保一致的缓动效果：

```css
--ease-spring:        cubic-bezier(.34, 1.56, .64, 1);    /* 明显回弹 */
--ease-spring-subtle: cubic-bezier(.25, 1.2, .5, 1);     /* 柔和过冲 */
--ease-apple:         cubic-bezier(.25, .1, .25, 1);      /* 标准缓动 */
--ease-exit:          cubic-bezier(.55, 0, .45, 1);       /* 退出过渡 */
```

| 动画 | 目标 | 时长 | 说明 |
|------|------|------|------|
| `textShine` | 仅 `h1` | 8s 循环线性 | 金色渐变扫光 — 全站唯一有动画的标题 |
| `.fade` 滚动显示 | 所有 `.fade` 元素 | 0.8s 弹性 | `blur(4px)→0` + `translateY(30px)→0` — 由 `IntersectionObserver` 在 16% 阈值时触发 |
| `float` | `.hero-light`、`.character-halo` | 16s 缓入缓出循环 | 柔和 ±16px 垂直漂浮 |
| `spin` | `.hero-orbit` | 22-28s 线性循环 | 轨道环旋转 |
| 按钮扫光 | `.enter`、`.live-btn` | 0.8s（悬停） | 悬停时对角线白色闪光扫过按钮 |
| 卡片倾斜 | `.glass-tilt` | 弹性驱动（JS rAF） | 鼠标位置响应的 3D 旋转 + 高光 |
| 粒子 | `.particle` | 18-32s 线性循环 | 8 个大型光点向上飘浮带发光效果 |

**整站应用的克制原则：**

- 卡片悬停：最大 `translateY(-4px)`（从 `-10px` 降低）
- 按钮悬停：最大 `translateY(-2px)`（从 `-6px` 降低）
- 仅 8 个大型环境粒子（而非 25 个小点）
- 图片占位符使用静态径向渐变光晕，取代动画扫光
- `prefers-reduced-motion: reduce` 全局禁用所有动画、过渡和粒子效果

---

## 架构设计

### CSS 架构

`common.css`（845 行）是整个视觉系统的**唯一设计标准**。它提供了任何页面保持视觉一致性所需的一切：

| 系统 | 关键选择器 | 类型 |
|------|-----------|------|
| **CSS 变量** | `:root` | 颜色、缓动曲线、玻璃参数、字体栈 |
| **重置与基础** | `*`、`html`、`body` | 盒模型、滚动条、背景、字体平滑 |
| **背景层** | `body::before`、`body::after` | 微妙纹理线条 + 装饰圆形 |
| **导航** | `.nav`、`.nav ul`、`.nav a` | 固定玻璃导航条，悬停/激活状态 |
| **玻璃组件** | `.glass-card`、`.glass-tilt` | 可复用的多层液态玻璃 |
| **英雄区** | `.hero`、`.hero-light` | 全屏区域模板 |
| **登录面板** | `.login-shell`、`.sweep` | 居中玻璃表单卡片，10s 扫光动画 |
| **排版** | `.small`、`.title`、`.text` | 统一的文本层级 |
| **按钮** | `.enter`、`.live-btn` | 玻璃和金色按钮，带扫光动画 |
| **表单输入** | `.future-input`、`.login-form` | 玻璃文本输入框，聚焦发光 |
| **图片框架** | `.image-placeholder` | 玻璃边框框架，悬停发光 |
| **滚动显示** | `.fade`、`.fade.show` | 弹性动画入场效果 |
| **光标光晕** | `.cursor-glow` | 跟随鼠标的环境光 |
| **页面过渡** | `.page-transition-overlay` | 跨页面淡入淡出效果 |
| **实用工具** | `.back-to-top`、`.scroll-progress` | 常驻 UI 组件 |
| **动画** | `@keyframes` | `float`、`spin`、`textShine`、`cardLight`、`progressShine` |
| **响应式** | `@media (max-width: 768px)` | 移动端导航和登录布局调整 |
| **无障碍** | `@media (prefers-reduced-motion)` | 全局动画禁用 |

**页面 CSS 文件必须遵守的规则：**

1. 导航栏（`.nav`、`.nav ul`、`.nav a`）不得重新定义 — `common.css` 是唯一标准。仅允许响应式覆盖。
2. `.title` 元素必须仅使用静态金色渐变 — 不得使用 `textShine` 或其他动画。
3. `.small` 标签必须使用精确的 `color: rgba(198,168,106,.55)`。
4. 玻璃元素（卡片、面板、表单）的边框必须是白色（`rgba(255,255,255,.07-.1)`），绝不用金色。
5. `denglu.css` 已废弃，不得在任何 HTML 文件中引用。

### JavaScript 架构

`common.js`（459 行）在 `DOMContentLoaded` 时自动初始化，并通过 `window.TangShu` 暴露共享工具：

| 函数 | 行数 | 说明 |
|------|------|------|
| `setupCursorGlow()` | ~30 | GPU 友好的鼠标跟踪，带弹性平滑跟随 |
| `setupGlassTilt()` | ~70 | 每卡片独立 3D 倾斜系统 — 鼠标驱动 `rotateX`/`rotateY` + 动态高光定位 |
| `setupRevealObserver()` | ~20 | `IntersectionObserver`，滚动时淡入显示 `.fade` 元素 |
| `setupPageTransition()` | ~25 | 页面离开动画，保留修饰键行为 |
| `setupAnchorScroll()` | ~20 | 平滑滚动到 `#hash` 目标，带导航栏偏移补偿 |
| `setupBackToTop()` | ~30 | 浮动的返回顶部按钮（滚动 500px 后出现） |
| `setupScrollProgress()` | ~15 | 页面顶部 3px 金色渐变进度条 |
| `setupNavbarScroll()` | ~12 | 添加 `.scrolled` 类用于潜在的滚动导航样式 |
| `setupActiveNavLink()` | ~12 | 自动高亮当前页面的导航链接 |
| `setupLazyLoad()` | ~15 | `IntersectionObserver` 实现 `img[data-src]` 懒加载 |
| `spring()` | ~3 | 物理弹性插值工具函数 |
| `debounce()` | ~8 | 标准防抖函数，可配置等待时间 |
| `throttle()` | ~10 | 标准节流函数，可配置时间限制 |

**关键实现细节：**

- **`setupPageTransition`（common.js）：** 修饰键检查（`e.metaKey || e.ctrlKey || e.shiftKey || e.altKey`）放在*单个链接的点击处理函数内部*——而非 `forEach` 回调内部。放在 `forEach` 中是一个已被确认的 bug，会导致 Cmd+Click（新标签页打开）失效。
- **`setupPracticeTabs`（workshop.js）：** 使用 `isAnimating` 布尔锁结合 `transitionend` 事件监听器和 800ms 安全超时。防止用户点击速度快于退出动画完成时出现的状态错乱问题。
- **`setupPreviewArrows`（index.js）：** 通过克隆后重置的模式实现无缝无限滚动——轮播看起来无限循环，因为创建了克隆并在无视觉中断的情况下重置了滚动位置。
- **`setupGlassTilt`（common.js）：** 每张 `.glass-tilt` 卡片维护自己独立的 `requestAnimationFrame` 循环和弹性插值状态。当卡片达到静止位置（0.05° 容差内）时，动画循环自动停止，防止空闲 CPU 消耗。
- 所有滚动事件监听器使用 `{ passive: true }` 以保证滚动性能
- 在启用粒子、视差、光标光晕和玻璃倾斜之前检查 `prefers-reduced-motion`
- `pointer: coarse` 媒体查询在触控设备上跳过光标依赖功能

### 图片系统

全部 60 张图片遵循严格的 `{类别}-{描述}.webp` 命名规范：

- **仅使用短横线命名** — 无裸数字、无单字母（例如 `embroidery-gold.webp` 而非 `gold-embroidery.jpg` 或 `1.jpg`）
- **仅 `.webp` 格式** — 61 张图片中 60 张为 `.webp`；唯一的例外是 `favicon.png`
- **16 个类别前缀**按内容领域组织（见上方目录结构）
- **`-alt` 后缀**标记 4 张时间轴图片的替代构图，用于不同页面场景

图片类别参考：

| 前缀 | 数量 | 内容领域 |
|------|------|---------|
| `tangshu-` | 4 | 唐姝角色肖像 |
| `dynasty-` | 8 | 初唐/盛唐/中唐/晚唐时间轴 |
| `embroidery-` | 7 | 刺绣工艺微距细节 |
| `makeup-` | 4 | 唐代妆容与花钿 |
| `papercut-` | 4 | 剪纸纹理与光影 |
| `incense-` | 4 | 香炉、香烟、香道空间 |
| `jewelry-` | 3 | 步摇发簪、玉饰 |
| `silk-` | 2 | 丝绸织法与反光 |
| `scene-` | 4 | 沉浸式环境场景 |
| `memory-` | 4 | 唐姝记忆碎片 |
| `ai-` | 5 | AI 工具界面预览 |
| `future-` | 4 | 未来长安城市景观 |
| `showcase-` | 3 | 未来产品设计 |
| `culture-` | 2 | 唐代人物艺术 |
| `micro-` | 1 | 超微距工艺研究 |
| `heritage-` | 1 | 非遗细节 |

---

## 页面详情

### 入长安 (首页)

首页通过层次化的视觉深度建立唐姝品牌：

**英雄区**
- 唐姝角色肖像（`tangshu-main.webp`），带角色光晕动画和两个不同大小、不同速度（28s / 22s）的反向旋转轨道环
- 微妙的网格叠加层（90px 单元格），由径向渐变遮罩实现边缘渐隐效果
- 英雄区内容带视差效果（`data-parallax="0.18"`）——文本随用户滚动微微偏移
- `h1` 标题"让千年技艺，再次被看见"拥有全站唯一的 `textShine` 动画
- 底部滚动引导：一条垂直金色线 + 向下脉动的动画发光点

**世界板块 (#world)**
三张 `.glass-tilt` 面板（01 大唐女性美学 / 02 非遗活态传承 / 03 AI数字人格），每张包含：
- 序号（`.panel-meta`）
- 标题和段落
- 每 4 秒交替淡入淡出的 2 图轮播（透明度过渡）

**能力板块 (#abilities)**
三张 `.glass-tilt` 卡片（人格化陪伴 / 高保真复现 / 文化再创造）带图片占位符。`glass-tilt` 类启用鼠标驱动的 3D 倾斜——每张卡片独立朝向光标旋转。

**预览板块 (#preview)**
一个 6 项水平带状轮播，展示唐代技艺：
- 左右箭头按钮（48px 圆形，玻璃样式）
- 通过克隆后重置模式实现无缝无限滚动——轮播看起来永远循环
- 鼠标悬停暂停的自动轮播
- 每项：技艺图片 + 标题 + 描述

**压轴板块**
居中玻璃卡片，金色渐变引用文本和 CTA 按钮（"与唐姝同行"），带光线扫过悬停动画。

**JavaScript 功能：** `setupParallax()`、`setupScrollGlow()`、`setupParticles()`（8 个大型金色光点）、`setupPanelCarousels()`、`setupPreviewArrows()`。

---

### 观非遗 (非遗展示)

浏览非遗技艺的三栏数字展览厅：

**左侧边栏 — 玉质标签菜单**
六个垂直堆叠的玻璃按钮（刺绣 / 妆造 / 剪纸 / 香艺 / 首饰 / 丝绸织造），每个带有：
- 金色序号（01-06）
- 大字技艺名称标签
- 粘性定位（滚动时保持可见）
- 激活状态带金色内部发光渐变

**中央舞台**
六个 `heritage-stage` 面板（每种技艺一个），每个包含：
- 带底部发光效果的大型视觉图（`.visual-glow`）
- 元数据标签（如"显微纹理"）、描述性标题和段落
- 带图片卡片和注解的 2 列细节网格

**右侧边栏 — 唐姝导览**
- 唐姝肖像头像，带名字和角色（"数字传承人"）
- 动态导览文字区域，当左侧标签切换时更新其 3 行诗歌式文本
- 说明她角色的背景说明

**生活场景板块**
3 列场景卡片网格（唐代妆台 / 刺绣工坊 / 香艺空间），每张带场景图片、标题和描述。

**时间轴板块**
4 列水平可滚动带状区域（初唐 / 盛唐 / 中唐 / 晚唐），带吸附滚动行为。每张卡片包含时代标签、图片和描述段落，追溯整个朝代女性审美的发展历程。

**JavaScript 功能：** `setupHeritageTabs()` — 点击玉质标签会同时更新中央舞台面板和右侧边栏导览文字，数据来自 `heritageCopy` 数据对象。

---

### 沉浸研习 (工坊研习)

虚拟动手学习环境：

**英雄区**
烟雾效果（两个 `.hero-smoke` 径向渐变，不同位置和颜色——翠绿 + 金色）和木纹纹理叠加层（`.hero-wood`，使用 `repeating-linear-gradient` 和 `mask-image`）。

**微距复原板块 (#microscope)**
并排布局：
- 左侧：大型工艺细节视觉图，带浮动标签芯片（"丝绸反光"、"金线流光"、"毫米级细节"）
- 右侧：描述文案，带顶部元数据标签、标题、段落和技术说明卡片

**研习板块 (#practice)**
全站技术最复杂的标签切换系统：

三个研习标签（刺绣研习 / 唐妆研习 / 香艺研习）通过基于 `transitionend` 的动画系统和 `isAnimating` 锁来切换面板：
- 点击标签设置 `isAnimating = true`
- 当前面板获得 `.leave-left` 类（向左滑出 + 淡出 + 模糊）
- 在 `transitionend` 触发时，当前面板隐藏，新面板获得 `.enter-right` + `.active`（从右侧滑入）
- 800ms 安全超时防止 `transitionend` 未能触发时的永久锁定
- 每个面板包含：工艺视觉图、工具标签芯片、描述文案和匠人语录（3 行诗）

**朝代时间轴板块**
4 卡片可滚动带状区域（初唐 / 盛唐 / 中唐 / 晚唐），使用 `-alt` 图片变体。

**AI 创作台板块**
3 列网格（AI 文创海报 / AI 短视频脚本 / AI 文化文案），带创作卡片图片和描述。

**压轴板块**
居中玻璃卡片，带跳转唐姝页面的 CTA 按钮。

**JavaScript 功能：** `setupPracticeTabs()`，完整的 transitionend 动画状态机。

---

### 唐姝同行 (唐姝)

整个体验的情感核心——唐姝陪伴页面：

**英雄区**
- 唐姝全身肖像（`tangshu-fullbody.webp`），带角色形象光晕动画
- 两个"帷幕"元素（`hero-curtain-a/b`），使用 `clip-path` 多边形营造舞台剧场感
- 带径向遮罩的网格叠加层
- "交互式输入"预览（装饰性标签 + 渐变金色线），暗示对话已就绪

**记忆碎片板块 (#memory)**
两栏布局：
- 左侧：5 个垂直堆叠的玻璃碎片按钮（仕女故事 / 手工片段 / 礼仪妆造 / 唐诗意象 / 传承人口述）
- 右侧：5 个记忆面板，每个带图片和描述文案。激活的碎片按钮有金色渐变背景。

**对话板块 (#dialogue)**
带聊天界面的两栏布局：
- 左侧：根据选中对话标签切换的主题人物图片
- 右侧：3 个话题标签（蹙金绣 / 花钿妆 / 香艺）、可滚动的消息区域，用户消息（右对齐、白色玻璃）和唐姝消息（左对齐、金色调）有明显的样式区分、3 点弹跳输入指示器和带发送按钮的文本区域
- 对话系统已为 API 集成做好结构准备——在静态部署时，展示欢迎示例消息

**场景空间板块**
4 个场景标签（唐代妆阁 / 刺绣工坊 / 夜宴灯火 / 香艺空间），切换图片 + 描述面板。每个场景为唐姝体验营造不同的情感氛围。

**成长树板块**
2×2 网格，中央"唐姝"核心节点（全宽、圆形、金色径向发光），周围 4 个成长分支，描述她的演化（学习新技艺、记录交互、生成表情、丰富人格）。

**压轴板块**
居中玻璃卡片，带跳转未来页面的 CTA 按钮。

**JavaScript 功能：** `setupMemoryShards()`、`setupDialogueTabs()`、`setupSceneTabs()`。

---

### 百工新生 (未来)

面向未来的创作与展示空间：

**英雄区**
城市天际线剪影效果——两个 `.hero-city` 元素使用 `clip-path` 多边形形状创建抽象建筑轮廓，加网格叠加层。英雄区文字介绍非遗"重新走入未来生活"的理念。

**创作者板块 (#creation)**
AI 驱动创意工具的标签化界面：
- 3 个标签（海报生成 / 视频脚本 / 文化文案），激活时带金色高光
- 面板内容：大型视觉图 + 浮动标签芯片 + 描述文案及注释卡片
- 高度自适应：`setupCreatorTabs()` 测量激活面板的 `offsetHeight` 并设置到容器上，在不同大小面板之间实现平滑的高度过渡
- 图片缩放动画：激活面板的图片从 `scale(1.08)` 缓动到 `scale(1)`，并伴随亮度过渡

**作品展示板块**
3 列未来非遗产品网格（唐风首饰 / AI 生成纹样 / 数字刺绣），每项带图片、标题和描述。以浮空玻璃卡片样式呈现。

**未来长安板块 (#city)**
未来城市愿景：左侧大型城市景观图片，右侧描述文本块，讲述非遗纹样、唐风建筑和数字传承人共存的数字文明。

**JavaScript 功能：** `setupCreatorTabs()`，带面板高度自适应和离开/进入类管理。

---

### 登录

简洁专注的认证页面：

- 居中 `.login-shell` 玻璃卡片（全站最大模糊 40px），带 10 秒慢速扫光动画
- 用户名和密码输入框，玻璃样式，聚焦时带发光环
- 登录表单在结构上已为 API 集成做好准备——在静态部署中，这是玻璃 UI 系统应用于表单场景的示范
- "忘记密码？" 链接，悬停时呈金色

---

## 浏览器支持

| 特性 | Chrome | Edge | Safari | Firefox |
|------|--------|------|--------|---------|
| `backdrop-filter` | 76+ | 79+ | 17+（9+ 部分支持） | 103+ |
| CSS Grid（Level 1） | 57+ | 16+ | 10.1+ | 52+ |
| `IntersectionObserver` | 51+ | 15+ | 12.1+ | 55+ |
| CSS 自定义属性 | 49+ | 15+ | 9.1+ | 31+ |
| `prefers-reduced-motion` | 74+ | 79+ | 10.1+ | 63+ |
| `position: sticky` | 56+ | 16+ | 12.1+ | 59+ |

**优雅降级：** 不支持 `backdrop-filter` 的浏览器将看到半透明实色背景而非磨砂玻璃。网站保持完全可用和可读。

---

## 开发笔记

### 脚本加载顺序（至关重要）

```
<script src="js/{page}.js"></script>   <!-- 页面逻辑最先加载 -->
<script src="js/common.js"></script>   <!-- 共享初始化最后加载 -->
```

此顺序是强制的。`common.js` 在 `DOMContentLoaded` 时自动初始化所有共享功能（`setupRevealObserver`、`setupPageTransition`、`setupCursorGlow`、`setupGlassTilt` 等）。如果先加载，页面的特定 DOM 元素可能尚不存在。如果后加载，页面 JS 已经设置好自定义元素和事件监听器，`common.js` 可以安全地增强它们。

### 无障碍性

- 所有交互元素具有可见的 `:focus-visible` 轮廓（金色、1px、4px 偏移）
- `prefers-reduced-motion: reduce` 全局禁用所有动画、过渡、模糊和粒子效果 — 运动敏感用户看到的是完全静态但功能完整的网站
- 触控/粗指针设备自动跳过光标依赖功能（光晕跟随、玻璃倾斜）
- 使用语义化 HTML 元素（`<nav>`、`<main>`、`<section>`、`<article>`）便于屏幕阅读器导航
- 滚动条视觉上隐藏但滚动功能保留（键盘、触摸、鼠标滚轮均可用）

### 性能优化

- 所有图片使用 `.webp` 格式以获得最佳压缩率
- 滚动事件监听器使用 `{ passive: true }` 避免阻塞滚动性能
- 光标光晕使用 `translate3d` 实现 GPU 合成定位
- 玻璃倾斜使用每卡片独立的 `requestAnimationFrame` 循环，静止时自动停止（空闲 CPU 使用率 ≈ 0%）
- `.fade` 元素仅在活动动画期间（`.animating` 类）应用 `will-change`，然后移除以释放 GPU 内存
- 轮播使用透明度过渡（GPU 合成，不触发布局重排）
- 无外部字体 — 使用系统字体栈，排版零网络延迟

---

## 部署指南

这是一个零依赖的静态网站。可部署到任何静态托管服务：

### GitHub Pages

推送到名为 `tangshu.github.io` 的仓库（或在仓库设置中配置 Pages）。站点从根目录提供。

### 任意静态托管

```
# Netlify — 将文件夹拖放到 Netlify 仪表板
# Vercel — vercel .
# Surge — surge . tangshu.surge.sh
# nginx — 将 root 指向此目录
# Apache — 将 DocumentRoot 指向此目录
```

无构建步骤、无代码压缩、无打包。开发环境提供的文件与生产环境完全一致。

---

## 许可证

MIT License.

---

<p align="center">
  <sub>为唐代非物质文化遗产倾心打造。</sub><br>
  <sub>让千年技艺，再次被看见。</sub>
</p>
