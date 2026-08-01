<div align="center">

<img src="images/tangshu/tangshuwenzilogo.png" alt="Tang Shu" width="320" />

# 唐姝 · Tang Shu

**When Millennial Culture Meets the Digital Age**

A digital magazine of Tang Dynasty aesthetics, intangible cultural heritage, and digital culture — and an AI guide that tells the stories of China's living heritage to the world.

[🌐 Live Preview](https://tangshu.github.io) · [🤖 Try the AI Chat](https://tangshu.github.io/chat.html) · [📄 中文 Readme](README.md)

![GitHub Pages](https://img.shields.io/website?url=https%3A%2F%2Ftangshu.github.io&label=GitHub%20Pages&logo=github)
![License: ISC](https://img.shields.io/badge/license-ISC-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Zero Dependencies](https://img.shields.io/badge/zero--dependency-native-green)
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

From the 289 years of the Tang Dynasty's rise and fall, to the texture of six traditional crafts — embroidery, incense, jewelry, makeup, papercut, and silk — to a vision of AI colliding with ancient culture: **everything is built with pure vanilla HTML / CSS / JavaScript. No frameworks, no build step, no backend required.**

| Feature | Description |
|---|---|
| 🏯 Immersive visual storytelling | Six-screen scrolling narrative + parallax background + staged brand intro animation |
| 🎞️ Randomized background system | Two «grey / lit» background layer sets, randomly picked on every load |
| 🕰️ Tang Dynasty timeline | Six eras from Early Tang to Late Tang; click any card to open a rich illustrated story (4 passages per era) |
| 🧵 Infinite craft carousels | Six craft categories scrolling horizontally with sub-pixel smoothness, driven by `requestAnimationFrame` |
| 🎬 Video theater | DPlayer bundled locally (`js/lib`), with an SVG circular-text play button |
| 💡 Interactive easter egg | On Screen 6, the progress bar fills, the bulb lights up, and the background fades from grey to color |
| 🤖 AI heritage guide | Streaming conversations via the DeepSeek LLM: SSE incremental rendering, Enter to send, interruptible at any time |
| 📝 Hand-rolled Markdown renderer | Headings / tables / lists / quotes / code blocks / task lists, extended with `[c:red]` BBCode-style colored text |
| 💬 Multi-session management | Conversations and model preference persisted in localStorage; one-click Markdown export |
| 🌐 Trilingual support | Fully translated content in 中文 / English / 日本語, switchable from the nav bar |

---

## 🖥️ Pages

| Page | Language | Description |
|---|---|---|
| `index.html` | Simplified Chinese | Six-screen immersive landing page |
| `index_EN.html` | English | Full English translation of the landing page (incl. era stories) |
| `index_jp.html` | 日本語 | Full Japanese translation of the landing page (incl. era stories) |
| `chat.html` | Multi-lingual | AI chat page (the model answers in the user's language) |
| `login.html` | Simplified Chinese | Login page (front-end mock only, no real auth) |

### The Six Screens of the Landing Page

| Screen | Theme | Content |
|---|---|---|
| 1 · `TOP` | Brand opening | Intro animation, logo, top navigation |
| 2 · `CULTURE` | Digital culture | Seamless card carousel + video trailer entry |
| 3 · `AI` | AI × Tang | Dual-layer hero gallery with cross-fading thumbnail switching |
| 4 · `TIMELINE` | Tang Dynasty timeline | Early Tang · Zhenguan Reign · Wu Zhou Revolution · High Tang Golden Age · An Lushan Rebellion · Dusk of the Dynasty |
| 5 · `CRAFTS` | Crafts | Embroidery · Incense · Jewelry · Makeup · Papercut · Silk |
| 6 · `FUTURE` | Toward the future | Progress bar + bulb lighting moment + closing narrative |

---

## 🎨 Design System

### Colors

| Value | Name | Usage |
|---|---|---|
| <code>#C41E3A</code> | Tang Red (primary) | Brand accent, buttons, progress, intro animation text |
| <code>#C9A96E</code> | Gilded Gold (secondary) | Heading accents, "gold" colored text in the AI chat |
| <code>#0A0A0A – #1A1A1A</code> | Ink Black (base) | Page background layers |
| <code>#FFFFFF</code> | Pure White | Body text, highlights |

> **Theme variant**: The English / Japanese versions use an inverted "black-on-red" theme (black accents + Tang-red text) instead of the Chinese version's "red-on-white" — the two themes are swapped purely via the corresponding CSS file, with zero runtime logic differences.

### Typography

- Body: `'Noto Serif SC', 'Source Han Serif SC', 'STSong', 'SimSun', 'Songti SC'` serif stack
- Circular text / sans-serif scenes: `'Helvetica Neue', Arial, sans-serif`

### Motion Guidelines

- **Intro animation**: white text holds 1s → fades to red (800ms) → fades out while the overlay slides down (800ms), then scroll unlocks
- **Title fly-in**: triggered by `IntersectionObserver` with a 30% threshold
- **Logo scaling**: past 65% of the viewport height, the logo smoothly scales to 300px and the top nav swaps to a hamburger menu
- **Infinite carousels**: content is duplicated for seamless looping, progress advances modulo `setWidth`, frame-rate adaptive

---

## 🤖 AI Chat System

The chat page is the project's core interaction. Architecture:

```
user input ──▶ chat.js ──▶ DeepSeek API (SSE stream)
     ▲                        │
     │                        ▼
  rendered bubble ◀── formatContent ◀── incremental chunk parsing
```

### Streaming

- `fetch` + `ReadableStream` + `TextDecoder` incrementally parse SSE, rendering token by token
- `AbortController` allows interrupting at any time; partial content is preserved on interrupt
- Request parameters: `temperature 0.8`, `max_tokens 16384`, `stream: true`

### Markdown Renderer (`js/chat.js` → `formatContent`)

A hand-rolled five-phase rendering pipeline that injects formatting **only after escaping**, keeping XSS at bay:

1. **Protect**: extract fenced and inline code blocks into a protected zone
2. **Escape**: HTML-escape the remaining text
3. **BBCode colors**: `[c:red]…[/c:red]` → colored `<span>`
4. **Block-level**: headings, tables, lists (ordered / unordered / task), quotes, rules
5. **Inline**: images, links, bold, italic, strikethrough; finally restore the protected zone

### Colored Text Syntax (prompted to the model)

| Tag | Value | Semantics |
|---|---|---|
| `[c:red]` | `#E57373` | Key concepts, important headings |
| `[c:gold]` | `#C9A96E` | Cultural treasures, historical names |
| `[c:green]` | `#81C784` | Living traditions, sustainable practices |
| `[c:blue]` | `#64B5F6` | Geographic locations, water-related elements |
| `[c:purple]` | `#CE93D8` | Philosophical ideas, spiritual concepts |
| `[c:cyan]` | `#4DD0E1` | Technical terms, modern connections |
| `[c:orange]` | `#FFB74D` | Festivals, joyful content |

### The Persona

The AI's persona and output rules live in **`js/prompt.js`** (`SYSTEM_PROMPT`): Tang Shu is a warm, scholarly guide to intangible cultural heritage who answers in the user's language, always formats output as structured Markdown, and uses colored text sparingly — **to change the persona, edit this one file.**

---

## 🚀 Quick Start

The project is a fully static site — **any static file server** works:

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node
npx serve .

# Option 3: VS Code — install the Live Server extension and open from the editor
```

Then visit `http://localhost:8000`.

> 💡 Double-clicking `index.html` works for browsing, but some browsers restrict `fetch` on `file://` — start a static server for local development.

---

## 📦 Deploy to GitHub Pages

```bash
# 1. Initialize the repository and commit
git init
git add .
git commit -m "feat: init 唐姝"

# 2. Create a GitHub repo (name it <your-username>.github.io), then push
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

3. In the repo, go to **Settings → Pages**, set Source to `Deploy from a branch`, branch `main`, directory `/(root)`, and save.

> ⚠️ The repo root currently contains `node_modules` (the DPlayer npm package). It is **not required at runtime** — `js/lib/DPlayer.min.js` is already a vendored copy — so remove it and add a `.gitignore` before pushing.

---

## ⚙️ Configuration

All configuration lives at the top of `js/chat.js` in `API_CONFIG`:

```js
const API_CONFIG = {
  chatUrl: 'https://api.deepseek.com/chat/completions', // chat endpoint
  apiKey: 'sk-xxxx...',                                  // secret key
};
```

| Setting | Location | Description |
|---|---|---|
| `API_CONFIG.chatUrl` | `js/chat.js` | Chat endpoint; the `/models` URL is derived automatically |
| `API_CONFIG.apiKey` | `js/chat.js` | Model API key |
| `FALLBACK_MODELS` | `js/chat.js` | Fallback model list when the `/models` endpoint is unavailable |
| `SYSTEM_PROMPT` | `js/prompt.js` | AI persona and output rules |
| `STORAGE_KEY_*` | `js/chat.js` | localStorage keys (sessions / model / active chat) |

---

## 🔐 Security Note

> ⚠️ **The current version hardcodes the API key directly in the `js/chat.js` front-end source.** Once deployed to public GitHub Pages, anyone can view the page source, extract the key, and drain your API quota.

**Recommended actions (either):**

1. **Immediately revoke the leaked key** and regenerate it in the DeepSeek console;
2. **Route through a backend proxy** so the key never leaves the server. Here is a minimal Cloudflare Worker:

```js
// worker.js — deploy as your API proxy, then point chatUrl at the Worker
export default {
  async fetch(request) {
    const API_URL = 'https://api.deepseek.com/chat/completions';
    const API_KEY = '<server-side-key-only>';

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
      headers: { 'Content-Type': 'text/event-stream' }, // pass the SSE stream through
    });
  }
}
```

---

## 📁 Project Structure

```
tangshu.github.io/
├── index.html              # Landing page (Simplified Chinese)
├── index_EN.html           # Landing page (English)
├── index_jp.html           # Landing page (日本語)
├── chat.html               # AI chat page
├── login.html              # Login page (front-end mock)
│
├── css/
│   ├── index.css           # Landing styles (Chinese · Tang Red theme)
│   ├── index_EN.css        # Landing styles (EN/JP · inverted theme)
│   ├── index_jp.css        # Same as index_EN.css, referenced by its page
│   ├── chat.css            # Chat styles (incl. 7 colored-text classes)
│   └── login.css           # Login styles
│
├── js/
│   ├── index.js            # Landing logic (Chinese copy / era stories)
│   ├── index_EN.js         # Landing logic (English copy / era stories)
│   ├── index_jp.js         # Landing logic (Japanese copy / era stories)
│   ├── chat.js             # Chat logic (SSE streaming / Markdown / sessions)
│   ├── login.js            # Login logic (mock)
│   ├── prompt.js           # AI system prompt (persona customization entry)
│   └── lib/
│       └── DPlayer.min.js  # Video player (vendored, no CDN needed)
│
└── images/
    ├── landing/            # Landing assets (dynasty / crafts / ai / scenes / future…)
    ├── tangshu/            # Tang Shu character and brand logo
    ├── assets/             # Background layers & effects (incl. "lit" variants)
    └── video/              # Trailer bg1.mp4 (15MB) and GIF preview
```

---

## 🌐 Localization

The three languages are **fully translated copies** rather than runtime switching: HTML, CSS (theme variants), and JS (era story copy) each exist per language.

To add a language:

1. Copy `index.html` → `index_<lang>.html` and translate all copy;
2. Copy `css/index.css` → `css/index_<lang>.css` (optionally adjust the theme);
3. Copy `js/index.js` → `js/index_<lang>.js` and translate the `stories` array;
4. Add the language entry to the nav switcher in both files.

> 💡 Long term, we recommend refactoring the three duplicated copies into «shared styles + a language-pack JSON» to cut maintenance cost significantly (see Roadmap).

---

## 🗺️ Roadmap

- [x] Six-screen immersive landing page (trilingual)
- [x] AI streaming chat + hand-rolled Markdown renderer
- [ ] Server-side proxy layer (fixes API key exposure and CORS restrictions)
- [ ] Language-pack refactor: eliminate the three duplicated HTML / CSS / JS copies
- [ ] Real sign-up / sign-in with cloud-synced conversations
- [ ] More model providers (Claude / OpenAI / local Ollama)
- [ ] PWA offline support

---

## 🤝 Contributing

Contributions of any kind are welcome — bug fixes, interaction polish, copy improvements, new language translations:

1. Fork the repo and create a feature branch (`git checkout -b feat/xxx`);
2. Commit your changes (Conventional Commits style);
3. Open a Pull Request explaining the motivation and scope of the change.

> Note: if touching `js/chat.js`, never commit a real API key.

---

## 📄 License

Open-sourced under the [ISC License](./LICENSE).

> Images, videos, and copy in this site belong to their respective creators and are used for demonstration in this project only.

---

<div align="center">

**Tang Shu** — letting a thousand years of sleeping heritage speak again in the digital world.

Made with ❤️ and a deep love for the Tang Dynasty.

</div>
