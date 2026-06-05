<!--
  入长安 · 唐姝驾到
  Tang Dynasty ICH Digital Experience Platform
  =============================================
  纯静态前端 — No build tools, no framework, no dependencies
  Pure vanilla HTML/CSS/JS — zero-dependency static website
-->

<p align="center">
  <a href="README_CN.md">中文</a> | <strong>English</strong>
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

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Pages](#pages)
- [Directory Structure](#directory-structure)
- [Design System](#design-system)
  - [Liquid Glass Morphism](#liquid-glass-morphism)
  - [Color Palette](#color-palette)
  - [Typography](#typography)
  - [Animations](#animations)
- [Architecture](#architecture)
  - [CSS Architecture](#css-architecture)
  - [JavaScript Architecture](#javascript-architecture)
  - [Image System](#image-system)
- [Page Details](#page-details)
  - [入长安 (Home)](#入长安-home)
  - [观非遗 (Heritage)](#观非遗-heritage)
  - [沉浸研习 (Workshop)](#沉浸研习-workshop)
  - [唐姝同行 (Tang Shu)](#唐姝同行-tang-shu)
  - [百工新生 (Future)](#百工新生-future)
  - [登录 (Login)](#登录-login)
- [Browser Support](#browser-support)
- [Development Notes](#development-notes)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

**入长安 · 唐姝驾到** (Enter Chang'an · Tang Shu Arrives) is a zero-dependency static website that reimagines Tang Dynasty intangible cultural heritage through five immersive "spaces." A digital persona named **Tang Shu** (唐姝) guides visitors through crafts, memories, and a vision of future Chang'an where tradition and digital civilization coexist.

### What Makes This Different

- **Zero dependencies.** No npm, no webpack, no React, no jQuery. Open `index.html` in a browser and it works.
- **Liquid glass morphism** — a six-layer CSS glass system with multi-angle gradient body, prismatic edge simulation, SVG fractal noise texture, and mouse-driven 3D tilt.
- **Spring-based animations** using Apple-style easing curves for natural-feeling motion.
- **60 hand-curated `.webp` images** organized by a strict naming convention.
- **5 distinct pages + 1 login portal**, each with its own HTML, CSS, and JS file.
- **Shared design system** via `common.css` (845 lines) and `common.js` (459 lines) — no duplicated code.

---

## Quick Start

```bash
npx serve .
open http://localhost:3000
```

That's all. No `npm install`, no build step, no environment variables. Every page works immediately. The dialogue section on the Tang Shu page contains static sample messages that demonstrate the interaction pattern.

---

## Pages

| # | Page | File | Key Visual Elements |
|---|------|------|---------------------|
| 1 | **入长安** (Home) | `index.html` | Parallax hero, 8-particle ambient, 3 glass-tilt panels, 6-item infinite carousel |
| 2 | **观非遗** (Heritage) | `heritage.html` | 3-column hall: jade-tab sidebar (6 crafts) + center stage + Tang Shu guide |
| 3 | **沉浸研习** (Workshop) | `workshop.html` | Micro-reconstruction zoom, animated practice tabs, dynasty timeline |
| 4 | **唐姝同行** (Tang Shu) | `tangshu.html` | 5 memory shards, topic dialogue interface, 4 scene spaces, growth tree |
| 5 | **百工新生** (Future) | `future.html` | Creator studio (poster/script/copy), showcase grid, future city vision |
| 6 | **登录** (Login) | `login.html` | Glass-shell form with validation and API-ready wiring |

Each page follows the same structure:

```html
<link rel="stylesheet" href="css/common.css">   <!-- Shared design system — always first -->
<link rel="stylesheet" href="css/{page}.css">   <!-- Page-specific styles -->

<nav class="nav">...</nav>                      <!-- Fixed glass navigation pill -->
<main>
  <section class="hero">...</section>           <!-- Full-viewport hero with effects -->
  <section class="section">...</section>        <!-- Content sections -->
  <section class="quote finale-section">...</section>  <!-- Finale with CTA -->
</main>

<script src="js/{page}.js"></script>            <!-- Page-specific logic MUST load FIRST -->
<script src="js/common.js"></script>            <!-- Shared utilities MUST load LAST -->
```

> **The loading order is critical.** `common.js` auto-initializes everything on `DOMContentLoaded`. Page JS files must not duplicate shared features.

---

## Directory Structure

```
tangshu.github.io/
├── index.html              # 入长安 — Landing page (244 lines)
├── heritage.html           # 观非遗 — Heritage exhibition (455 lines)
├── workshop.html           # 沉浸研习 — Workshop practice (294 lines)
├── tangshu.html            # 唐姝同行 — Tang Shu companion (443 lines)
├── future.html             # 百工新生 — Future creations (224 lines)
├── login.html              # 登录 — Login portal (144 lines)
│
├── css/
│   ├── common.css          # ★ Shared design system (845 lines) — Source of truth
│   ├── index.css           # Home page — hero, carousel, panels (1002 lines)
│   ├── heritage.css        # Heritage page — hall layout, jade tabs (629 lines)
│   ├── workshop.css        # Workshop page — practice panels, micro layout (704 lines)
│   ├── tangshu.css         # Tang Shu page — dialogue, memory, scenes (849 lines)
│   ├── future.css          # Future page — creator panels, showcase (858 lines)
│   └── denglu.css          # [Orphaned] — not loaded by any page
│
├── js/
│   ├── common.js           # ★ Shared utilities (459 lines) — Auto-inits on DOMContentLoaded
│   ├── index.js            # Home: parallax, particles, carousel arrows (126 lines)
│   ├── heritage.js         # Heritage: jade-tab switcher + guide text (63 lines)
│   ├── workshop.js         # Workshop: animated practice tabs + mentor quotes (88 lines)
│   ├── tangshu.js          # Tang Shu: memory shards, scene tabs (87 lines)
│   └── future.js           # Future: creator panel height auto-adapt (65 lines)
│
└── images/
    ├── tangshu-*           # 4 files — Tang Shu character portraits
    ├── dynasty-*           # 8 files — Dynasty timeline (4 eras × 2 variants)
    ├── embroidery-*        # 7 files — Embroidery craft details
    ├── makeup-*            # 4 files — Makeup / huadian craft
    ├── papercut-*          # 4 files — Paper-cut craft
    ├── incense-*           # 4 files — Incense craft
    ├── jewelry-*           # 3 files — Tang Dynasty jewelry
    ├── silk-*              # 2 files — Silk weaving
    ├── scene-*             # 4 files — Immersive scene spaces
    ├── memory-*            # 4 files — Tang Shu memory fragments
    ├── ai-*                # 5 files — AI creation tools
    ├── future-*            # 4 files — Future Chang'an
    ├── showcase-*          # 3 files — Future product showcase
    ├── culture-*           # 2 files — Tang dynasty figure art
    ├── micro-*             # 1 file  — Micro-zoom study
    ├── heritage-*          # 1 file  — General heritage detail
    └── favicon.png         # Site favicon

    Total: 60 .webp + 1 .png
```

---

## Design System

### Liquid Glass Morphism

The glass effect is constructed from **six visual layers** — each contributing a specific physical property of real glass:

**1. Multi-angle gradient body — internal light refraction:**
```css
background: linear-gradient(160deg,
  rgba(255,255,255,.08) 0%,
  rgba(255,255,255,.03) 25%,
  rgba(255,255,255,.015) 50%,
  rgba(255,255,255,.04) 72%,
  rgba(255,255,255,.06) 100%
);
```
The diagonal 160° angle with asymmetric brightness stops simulates light entering from the top-left and scattering through the glass body.

**2. Backdrop filter — the frosted core:**
```css
backdrop-filter: blur(28px) saturate(170%);
```
The 28px blur provides substantial background obscuring while the 170% saturation boost compensates for the natural desaturation that blur causes, keeping colors vivid behind glass.

**3. Prismatic edge — six shadow layers simulating Fresnel refraction:**
```css
box-shadow:
  0 12px 40px rgba(0,0,0,.18),         /* Deep outer shadow */
  0 4px 16px rgba(0,0,0,.12),          /* Near outer shadow */
  inset 0 1px 0 rgba(255,255,255,.10),  /* Top edge — brightest (light from above) */
  inset 1px 0 0 rgba(255,255,255,.02),  /* Right edge — subtle */
  inset -1px 0 0 rgba(255,255,255,.015),/* Left edge — subtle */
  inset 0 -1px 0 rgba(0,0,0,.04),      /* Bottom edge — dark (shadow below) */
  0 0 0 1px rgba(255,255,255,.025);    /* Outer micro-ring */
```
This asymmetric inner-shadow pattern creates the illusion of light striking the glass surface at different angles — bright at the top (where light enters), darker at the bottom (where shadow gathers), with subtle side variations that mimic real glass edge refraction.

**4. Top light leak (`::before`) — light pooling at the upper surface:**
```css
background: linear-gradient(175deg,
  rgba(255,255,255,.12) 0%,
  rgba(255,255,255,.03) 20%,
  transparent 45%
);
```

**5. Bottom depth + SVG noise texture (`::after`):**
A gradient shadow at the bottom edge (simulating gathered darkness below the glass) combined with an SVG `feTurbulence` fractal noise overlay at 3.5% opacity — barely visible but adds the micro-surface texture that makes glass feel physically present rather than sterile.

**6. Mouse-driven 3D tilt (JavaScript) — on elements with the `.glass-tilt` class:**
Each card independently tracks cursor position and applies spring-interpolated `rotateX`/`rotateY` (max ±3.5°) along with a dynamic `radial-gradient` highlight that follows the cursor. The spring physics (`stiffness = 0.08`) creates a natural lag that mimics physical objects responding to touch.

| Glass Variant | Blur | Saturate | Use Case |
|---------------|------|----------|----------|
| **Navigation** | `30px` | `160%` | Fixed top pill |
| **Cards** | `28px` | `170%` | Content panels, galleries |
| **Login Shell** | `40px` | `160%` | Modal-like centered form |

### Color Palette

| Role | Value | Applied To |
|------|-------|------------|
| Deepest background | `#020908` | `body` gradient origin |
| Surface background | `#0e2a22` → `#041311` | `body` radial gradient |
| Accent gold | `#C6A86A` | Interactive borders, highlights |
| Champagne | `#c4a35a` / `#e8d5a8` | Button gradients, light text |
| Title gold | `#f0dfc0` → `#c9b078` | `.title` static gradient |
| Label gold-gray | `rgba(198,168,106,.55)` | `.small` section labels |
| Body text | `rgba(255,255,255,.6)` | `.text`, `p` |
| Nav resting | `rgba(255,255,255,.64)` | `.nav a` |
| Nav hover | `rgba(255,255,255,.9)` | `.nav a:hover` |
| Nav active | `#fff` | `.nav a.active` |
| Glass border | `rgba(255,255,255,.07-.10)` | All glass elements |
| Glass highlight | `rgba(255,255,255,.08-.14)` | Inner top edge |

**Critical rule:** Glass borders are always white, never gold. Gold borders on glass looked muddy in testing. The gold accent is reserved for interactive elements and text labels.

### Typography

| Element | Font Size | Weight | Letter Spacing | Line Height | Special |
|---------|-----------|--------|----------------|-------------|---------|
| `h1` (hero) | `clamp(3.2rem, 6.2vw, 6.1rem)` | `250` | `-.02em` | `1.08` | ★ Only element with `textShine` animation |
| `.title` | `clamp(2.4rem, 4.4vw, 4.4rem)` | `280-300` | `-.02em` | `1.18` | Static gold gradient |
| Card heading | `clamp(1.85rem, 2.45vw, 2.45rem)` | `280-300` | `-.015em` | `1.24-1.28` | `#f0dfbf` |
| `.text` (body) | `16-17px` | `400` | — | `1.75` | |
| `.small` (label) | `12px` | `500` | `.18em` | — | Uppercase, gold-gray |
| `.nav a` | `14px` | `400` | `.12em` | — | |
| `.desc` (hero) | `17-18px` | `400` | — | `1.75-1.8` | Max width `34-35em` |

All text uses the system Chinese font stack: `"PingFang SC"` → `"SF Pro Display/Text"` → `"Hiragino Sans GB"` → `"Noto Sans SC"` → `"Microsoft YaHei"`. Font smoothing is enabled via `-webkit-font-smoothing: antialiased`.

### Animations

All animations are driven by CSS variables for consistent easing:

```css
--ease-spring:        cubic-bezier(.34, 1.56, .64, 1);    /* pronounced bounce */
--ease-spring-subtle: cubic-bezier(.25, 1.2, .5, 1);     /* gentle overshoot */
--ease-apple:         cubic-bezier(.25, .1, .25, 1);      /* standard ease */
--ease-exit:          cubic-bezier(.55, 0, .45, 1);       /* exit transitions */
```

| Animation | Target | Timing | Description |
|-----------|--------|--------|-------------|
| `textShine` | `h1` only | 8s infinite linear | Gold gradient sweep — the only animated title on the site |
| `.fade` scroll-reveal | All `.fade` elements | 0.8s spring | `blur(4px)→0` + `translateY(30px)→0` — triggered by `IntersectionObserver` at 16% threshold |
| `float` | `.hero-light`, `.character-halo` | 16s ease-in-out infinite | Gentle ±16px vertical drift |
| `spin` | `.hero-orbit` | 22-28s linear infinite | Orbital ring rotation |
| Button sweep | `.enter`, `.live-btn` | 0.8s (hover) | Diagonal white flash across button on hover |
| Card tilt | `.glass-tilt` | spring-driven (JS rAF) | Mouse-position-reactive 3D rotation + highlight |
| Particles | `.particle` | 18-32s linear infinite | 8 large light motes floating upward with glow |

**Restraint principles applied throughout:**

- Card hover: `translateY(-4px)` maximum (reduced from `-10px`)
- Button hover: `translateY(-2px)` maximum (reduced from `-6px`)
- Only 8 large ambient particles instead of 25 tiny dots
- Static radial glow on image placeholders instead of animated sheen sweep
- `prefers-reduced-motion: reduce` globally disables all animations, transitions, and particle effects

---

## Architecture

### CSS Architecture

`common.css` (845 lines) is the **single source of truth** for the entire visual system. It provides everything needed for any page to look consistent:

| System | Key Selectors | Type |
|--------|--------------|------|
| **CSS Variables** | `:root` | Colors, easing curves, glass parameters, font stacks |
| **Reset & Base** | `*`, `html`, `body` | Box model, scrollbar, background, font smoothing |
| **Background** | `body::before`, `body::after` | Subtle texture lines + decorative circle |
| **Navigation** | `.nav`, `.nav ul`, `.nav a` | Fixed glass pill, hover/active states |
| **Glass Components** | `.glass-card`, `.glass-tilt` | Reusable multi-layer liquid glass |
| **Hero** | `.hero`, `.hero-light` | Full-viewport section template |
| **Login Shell** | `.login-shell`, `.sweep` | Centered glass form card with 10s sweep |
| **Typography** | `.small`, `.title`, `.text` | Consistent text hierarchy |
| **Buttons** | `.enter`, `.live-btn` | Glass & gold buttons with sweep animation |
| **Form Inputs** | `.future-input`, `.login-form` | Glass text inputs with focus glow |
| **Image Frames** | `.image-placeholder` | Glass-bordered frame with hover glow |
| **Scroll Reveal** | `.fade`, `.fade.show` | Spring-animated entrance |
| **Cursor Glow** | `.cursor-glow` | Mouse-following ambient light |
| **Page Transition** | `.page-transition-overlay` | Cross-page fade effect |
| **Utilities** | `.back-to-top`, `.scroll-progress` | Persistent UI chrome |
| **Animations** | `@keyframes` | `float`, `spin`, `textShine`, `cardLight`, `progressShine` |
| **Responsive** | `@media (max-width: 768px)` | Mobile nav and login adjustments |
| **Accessibility** | `@media (prefers-reduced-motion)` | Global animation disable |

**Rules page CSS files must follow:**

1. Navigation (`.nav`, `.nav ul`, `.nav a`) must NOT be redefined — `common.css` is the single source. Only responsive overrides are permitted.
2. `.title` elements must use static gold gradient only — no `textShine` or other animations.
3. `.small` labels must use exactly `color: rgba(198,168,106,.55)`.
4. Borders on glass elements (cards, shells, panels) must be white (`rgba(255,255,255,.07-.1)`), never gold.
5. `denglu.css` is orphaned and must not be referenced from any HTML file.

### JavaScript Architecture

`common.js` (459 lines) auto-initializes on `DOMContentLoaded` and exposes shared utilities via `window.TangShu`:

| Function | Lines | Description |
|----------|-------|-------------|
| `setupCursorGlow()` | ~30 | GPU-friendly mouse follower with spring-smooth trailing |
| `setupGlassTilt()` | ~70 | Per-card 3D tilt system — mouse-driven `rotateX`/`rotateY` + dynamic highlight position |
| `setupRevealObserver()` | ~20 | `IntersectionObserver` that fades in `.fade` elements on scroll |
| `setupPageTransition()` | ~25 | Page-leaving animation with modifier key preservation |
| `setupAnchorScroll()` | ~20 | Smooth scroll to `#hash` targets with nav offset compensation |
| `setupBackToTop()` | ~30 | Floating button (appears at 500px scroll) |
| `setupScrollProgress()` | ~15 | 3px gold gradient bar at page top |
| `setupNavbarScroll()` | ~12 | Adds `.scrolled` class for potential scroll-based nav styling |
| `setupActiveNavLink()` | ~12 | Auto-highlights current page link in navigation |
| `setupLazyLoad()` | ~15 | `IntersectionObserver` for `img[data-src]` images |
| `spring()` | ~3 | Physical spring interpolation utility |
| `debounce()` | ~8 | Standard debounce with configurable wait |
| `throttle()` | ~10 | Standard throttle with configurable limit |

**Critical implementation details:**

- **`setupPageTransition` (common.js):** The modifier key check (`e.metaKey || e.ctrlKey || e.shiftKey || e.altKey`) is placed *inside* the individual link click handler — not inside the `forEach` callback. Placing it in `forEach` was a confirmed bug that caused Cmd+Click (open in new tab) to fail.
- **`setupPracticeTabs` (workshop.js):** Uses an `isAnimating` boolean guard combined with a `transitionend` event listener and an 800ms safety timeout. This prevents the rapid-click state corruption that occurred when users clicked tabs faster than the exit animation could complete.
- **`setupPreviewArrows` (index.js):** Implements seamless infinite scrolling via a clone-then-reset pattern — the carousel appears to loop endlessly because clones are created and the scroll position is reset without visual discontinuity.
- **`setupGlassTilt` (common.js):** Each `.glass-tilt` card maintains its own independent `requestAnimationFrame` loop and spring interpolation state. The animation loop automatically stops when the card reaches its rest position (within 0.05° tolerance), preventing idle CPU usage.
- All scroll event listeners use `{ passive: true }` for scroll performance
- `prefers-reduced-motion` is checked before enabling particles, parallax, cursor glow, and glass tilt
- `pointer: coarse` media query skips cursor-dependent features on touch devices

### Image System

All 60 images follow a strict `{category}-{descriptor}.webp` naming convention:

- **kebab-case only** — no bare numbers, no single letters (e.g., `embroidery-gold.webp` not `gold-embroidery.jpg` or `1.jpg`)
- **`.webp` only** — 60 of 61 images are `.webp`; the sole exception is `favicon.png`
- **16 category prefixes** organized by content domain (see directory structure above)
- **`-alt` suffix** on 4 dynasty images indicates alternate compositions for different page contexts

Image category reference:

| Prefix | Count | Content Domain |
|--------|-------|----------------|
| `tangshu-` | 4 | Tang Shu character portraits |
| `dynasty-` | 8 | Early/High/Mid/Late Tang timeline |
| `embroidery-` | 7 | Embroidery craft micro-details |
| `makeup-` | 4 | Tang Dynasty makeup and huadian |
| `papercut-` | 4 | Paper-cut textures and shadows |
| `incense-` | 4 | Incense vessels, smoke, spaces |
| `jewelry-` | 3 | Buyao hairpins, jade pieces |
| `silk-` | 2 | Silk weave and reflection |
| `scene-` | 4 | Immersive environment scenes |
| `memory-` | 4 | Tang Shu memory fragments |
| `ai-` | 5 | AI tool interface previews |
| `future-` | 4 | Future Chang'an cityscapes |
| `showcase-` | 3 | Future product designs |
| `culture-` | 2 | Tang figure artworks |
| `micro-` | 1 | Macro-scale craft study |
| `heritage-` | 1 | Heritage detail |

---

## Page Details

### 入长安 (Home)

The landing page establishes the Tang Shu brand through layered visual depth:

**Hero Section**
- Tang Shu character portrait (`tangshu-main.webp`) with animated character halo and two counter-rotating orbital rings at different sizes and speeds (28s / 22s)
- Subtle grid overlay (90px cells) masked by a radial gradient for a fade-to-edge effect
- Hero content with parallax (`data-parallax="0.18"`) — the text shifts subtly as the user scrolls
- The `h1` "让千年技艺，再次被看见" has the only `textShine` animation on the entire site
- Scroll invitation at bottom: a vertical gold line with an animated glowing dot that pulses downward

**World Section (#world)**
Three `.glass-tilt` panels (01 大唐女性美学 / 02 非遗活态传承 / 03 AI数字人格) each containing:
- An index number (`.panel-meta`)
- A heading and paragraph
- A 2-image carousel that crossfades every 4 seconds (opacity transition)

**Capability Section (#abilities)**
Three `.glass-tilt` cards (人格化陪伴 / 高保真复现 / 文化再创造) with image placeholders. The `glass-tilt` class enables mouse-driven 3D tilt — each card independently rotates toward the cursor.

**Preview Section (#preview)**
A 6-item horizontal ribbon carousel featuring Tang Dynasty crafts:
- Left/right arrow buttons (48px circles with glass styling)
- Seamless infinite scrolling via clone-then-reset pattern — the carousel appears to loop forever
- Auto-slide with mouse-hover pause
- Each item: craft image + title + description

**Finale Section**
Centered glass card with gold gradient quote text and a CTA button ("与唐姝同行") with light-sweep hover animation.

**JavaScript features:** `setupParallax()`, `setupScrollGlow()`, `setupParticles()` (8 large gold light motes), `setupPanelCarousels()`, `setupPreviewArrows()`.

---

### 观非遗 (Heritage)

A three-column digital exhibition hall for browsing heritage crafts:

**Left Sidebar — Jade Tab Menu**
Six vertically-stacked glass buttons (刺绣 / 妆造 / 剪纸 / 香艺 / 首饰 / 丝绸织造), each with:
- An index number (01-06) in gold
- A large craft name label
- Sticky positioning (stays visible while scrolling)
- Active state with gold inner glow gradient

**Center Stage**
Six `heritage-stage` panels (one per craft), each containing:
- A large visual with bottom glow effect (`.visual-glow`)
- A meta label (e.g., "Microscopic Texture"), descriptive heading, and paragraph
- A 2-column detail grid with image cards and annotations

**Right Sidebar — Tang Shu Guide**
- Tang Shu portrait avatar with name and role ("数字传承人")
- Dynamic guide script area that updates its 3-line poem-like text when the left tab changes
- A contextual note explaining her role

**Living Scenes Section**
3-column grid of scene cards (唐代妆台 / 刺绣工坊 / 香艺空间), each with a scene image, title, and description.

**Timeline Section**
4-column horizontally-scrollable ribbon (初唐 / 盛唐 / 中唐 / 晚唐) with snap-scroll behavior. Each card has an era label, an image, and a descriptive paragraph tracing the evolution of female aesthetics across the dynasty.

**JavaScript features:** `setupHeritageTabs()` — clicking a jade tab simultaneously updates the center stage panel and the right sidebar guide text from a `heritageCopy` data object.

---

### 沉浸研习 (Workshop)

A virtual hands-on learning environment:

**Hero Section**
Smoke effects (two `.hero-smoke` radial gradients at different positions and colors — jade green + gold) and a wood-grain texture overlay (`.hero-wood` with `repeating-linear-gradient` and `mask-image`).

**Micro-Reconstruction Section (#microscope)**
Side-by-side layout:
- Left: A large craft detail visual with floating badge chips ("丝绸反光", "金线流光", "毫米级细节")
- Right: Descriptive copy with a top-line meta label, heading, paragraph, and a technical note card

**Practice Section (#practice)**
The most technically sophisticated tab system on the site:

Three practice tabs (刺绣研习 / 唐妆研习 / 香艺研习) switch between panels using a `transitionend`-based animation system with an `isAnimating` guard:
- Clicking a tab sets `isAnimating = true`
- The outgoing panel gets `.leave-left` class (slides left + fades out + blur)
- On `transitionend`, the outgoing panel is hidden, the incoming panel gets `.enter-right` + `.active` (slides in from right)
- An 800ms safety timeout prevents permanent lock if `transitionend` fails to fire
- Each panel contains: craft visual, tool chips, descriptive copy, and mentor quote (3-line poem)

**Dynasty Timeline Section**
4-card scrollable ribbon (初唐 / 盛唐 / 中唐 / 晚唐) using the `-alt` image variants.

**AI Creation Desk Section**
3-column grid (AI 文创海报 / AI 短视频脚本 / AI 文化文案) with creation card images and descriptions.

**Finale Section**
Centered glass card with CTA to Tang Shu page.

**JavaScript features:** `setupPracticeTabs()` with the full transitionend-based animation state machine.

---

### 唐姝同行 (Tang Shu)

The emotional core of the experience — the Tang Shu companion page:

**Hero Section**
- Tang Shu full-body portrait (`tangshu-fullbody.webp`) with animated figure halo
- Two "curtain" elements (`hero-curtain-a/b`) with `clip-path` polygons creating a staged theater feel
- Grid overlay with radial mask
- "Interactive input" preview (decorative label + gradient gold line) suggesting conversational readiness

**Memory Shards Section (#memory)**
Two-column layout:
- Left: 5 vertically-stacked glass shard buttons (仕女故事 / 手工片段 / 礼仪妆造 / 唐诗意象 / 传承人口述)
- Right: 5 memory panels, each with an image and descriptive copy. Active shard button has gold gradient background.

**Dialogue Section (#dialogue)**
Two-column layout with a chat interface:
- Left: Topic figure image that changes based on the selected dialogue tab
- Right: 3 topic tabs (蹙金绣 / 花钿妆 / 香艺), a scrollable message area with distinct styling for user messages (right-aligned, white glass) and Tang Shu messages (left-aligned, gold-tinted), a 3-dot bounce typing indicator, and a textarea with send button
- The dialogue system is wired for API integration — in a static deploy, it displays welcoming sample messages

**Scene Spaces Section**
4 scene tabs (唐代妆阁 / 刺绣工坊 / 夜宴灯火 / 香艺空间) switching between image + description panels. Each scene creates a different emotional atmosphere for the Tang Shu experience.

**Growth Tree Section**
2×2 grid with a central "唐姝" core node (full-width, circular, gold radial glow) surrounded by 4 growth branches describing how she evolves (learning new crafts, recording interactions, generating expressions, enriching personality).

**Finale Section**
Centered glass card with CTA to Future page.

**JavaScript features:** `setupMemoryShards()`, `setupDialogueTabs()`, `setupSceneTabs()`.

---

### 百工新生 (Future)

The forward-looking creation and showcase space:

**Hero Section**
City skyline silhouette effects — two `.hero-city` elements with `clip-path` polygon shapes creating abstract building outlines, plus a grid overlay. The hero text introduces the concept of heritage "re-entering future life."

**Creator Section (#creation)**
Tabbed interface for AI-powered creative tools:
- 3 tabs (海报生成 / 视频脚本 / 文化文案) with gold highlight on active
- Panel content: large visual with floating tag chips + descriptive copy with note card
- Height auto-adaptation: `setupCreatorTabs()` measures the active panel's `offsetHeight` and sets it on the container, creating smooth height transitions between differently-sized panels
- Image scaling animation: active panel image eases from `scale(1.08)` to `scale(1)` with brightness transition

**Showcase Section**
3-column grid of future heritage products (唐风首饰 / AI 生成纹样 / 数字刺绣), each with image, title, and description. Styled as floating glass cards.

**Future Chang'an Section (#city)**
A vision of the future city: left side has a large cityscape image, right side has descriptive text blocks about the digital civilization where heritage patterns, Tang architecture, and digital inheritors coexist.

**JavaScript features:** `setupCreatorTabs()` with panel height auto-adapt and leave/enter class management.

---

### 登录 (Login)

A focused, minimal authentication page:

- Centered `.login-shell` glass card (widest blur at 40px) with a slow 10-second sweep animation
- Username and password inputs with glass styling and focus glow rings
- The login form is structurally wired for API integration — in a static deploy, it's a demonstration of the glass UI system applied to a form context
- "忘记密码？" link with gold hover color

---

## Browser Support

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| `backdrop-filter` | 76+ | 79+ | 17+ (partial 9+) | 103+ |
| CSS Grid (Level 1) | 57+ | 16+ | 10.1+ | 52+ |
| `IntersectionObserver` | 51+ | 15+ | 12.1+ | 55+ |
| CSS Custom Properties | 49+ | 15+ | 9.1+ | 31+ |
| `prefers-reduced-motion` | 74+ | 79+ | 10.1+ | 63+ |
| `position: sticky` | 56+ | 16+ | 12.1+ | 59+ |

**Graceful degradation:** Browsers without `backdrop-filter` will see solid semi-transparent backgrounds instead of frosted glass. The site remains fully functional and readable.

---

## Development Notes

### Script Loading Order (Critical)

```
<script src="js/{page}.js"></script>   <!-- Page logic FIRST -->
<script src="js/common.js"></script>   <!-- Shared init LAST -->
```

This order is mandatory. `common.js` auto-initializes all shared features (`setupRevealObserver`, `setupPageTransition`, `setupCursorGlow`, `setupGlassTilt`, etc.) on `DOMContentLoaded`. If loaded first, the page's specific DOM elements may not exist yet. If loaded second, page JS has already set up its custom elements and event listeners, and `common.js` can safely enhance them.

### Accessibility

- All interactive elements have visible `:focus-visible` outlines (gold, 1px, 4px offset)
- `prefers-reduced-motion: reduce` globally disables all animations, transitions, blur, and particles — users with motion sensitivity see a static but fully functional site
- Touch/coarse-pointer devices automatically skip cursor-dependent features (glow following, glass tilt)
- Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`) used for screen reader navigation
- Scrollbars are visually hidden but scroll functionality is preserved (keyboard, touch, mouse wheel all work)

### Performance

- All images are `.webp` format for optimal compression
- Scroll event listeners use `{ passive: true }` to avoid blocking scroll performance
- Cursor glow uses `translate3d` for GPU-composited positioning
- Glass tilt uses per-card `requestAnimationFrame` loops that automatically stop when at rest (idle CPU usage ≈ 0%)
- `.fade` elements apply `will-change` only during active animation (`.animating` class), then remove it to free GPU memory
- Carousel uses opacity transitions (GPU-composited, no layout triggers)
- No external fonts — uses system font stack for zero network latency on typography

---

## Deployment

This is a zero-dependency static website. Deploy to any static hosting:

### GitHub Pages

Push to a repository named `tangshu.github.io` (or configure Pages in repo settings). The site is served from the root directory.

### Any Static Host

```
# Netlify — drag the folder onto the Netlify dashboard
# Vercel — vercel .
# Surge — surge . tangshu.surge.sh
# nginx — point root to this directory
# Apache — point DocumentRoot to this directory
```

No build step, no minification, no bundling. The files served in development are the exact same files served in production.

---

## License

MIT License.

---

<p align="center">
  <sub>Built with care for Tang Dynasty intangible cultural heritage.</sub><br>
  <sub>让千年技艺，再次被看见。</sub>
</p>
