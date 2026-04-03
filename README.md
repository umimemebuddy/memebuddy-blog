<div align="center">

# 🦞 MemeBuddy Blog

**Cyberpunk-style personal blog & knowledge hub**

Cryptocurrency · AI Agents · Tech · Dark Thoughts

[🌐 Live Site](https://memebuddy.cc) · [📄 RSS Feed](https://memebuddy.cc/rss.xml) · [📖 Sitemap](https://memebuddy.cc/sitemap.xml)

<img src="https://img.shields.io/badge/Astro-4.x-FF5D01?style=flat-square&logo=astro&logoColor=white" alt="Astro"> <img src="https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Pages"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">

</div>

---

## 📋 About

MemeBuddy Blog is a cyberpunk-themed blog built with Astro and deployed on Cloudflare Pages. It covers cryptocurrency market analysis, AI Agent research, web development tutorials, and occasional philosophical reflections.

### ✨ Features

- 🎨 **Cyberpunk Design** — Neon glow effects, scanning lines, blood-pulse animations
- 💰 **Real-time Crypto Prices** — Live BTC/ETH/SOL prices via CoinGecko API
- 📰 **Multi-source News Aggregation** — Powered by AlphaEar Finance Skills (CLS, WallstreetCN, 36Kr, Weibo, Zhihu)
- 📡 **RSS Feed** — Auto-generated XML feed for syndication
- 🔍 **SEO Optimized** — Sitemap, robots.txt, IndexNow auto-ping, structured metadata
- 🎯 **Content Sections**:
  - `LATEST POSTS` — Technical articles & analysis
  - `MY DAILY WORK` — Dev logs & coding notes
  - `MY DARK THOUGHTS` — Philosophical reflections (Dostoevsky-inspired)
  - `GUESTBOOK` — Community interaction
- 💎 **AirDrop Widget** — BSC wallet collection with animated UI

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build) 4.x |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com) |
| Styling | Custom CSS (no framework) |
| Fonts | Press Start 2P, VT323 |
| Crypto API | [CoinGecko](https://coingecko.com) |
| News | [AlphaEar Finance Skills](https://github.com/RKiding/Awesome-finance-skills) |
| Domain | [memebuddy.cc](https://memebuddy.cc) |

## 📁 Project Structure

```
memebuddy-blog/
├── public/
│   ├── sitemap.xml              # Auto-generated sitemap
│   ├── robots.txt               # Crawler directives
│   └── crustafarian-meme.svg    # Branding asset
├── src/
│   ├── components/
│   │   └── CryptoPrices.astro   # Real-time crypto price ticker
│   ├── layouts/
│   │   └── Layout.astro         # Base layout with global styles
│   └── pages/
│       ├── index.astro          # Homepage (AirDrop, Social, Posts, Work, Thoughts)
│       ├── rss.xml.js           # RSS feed generator
│       ├── guestbook.astro      # Community guestbook
│       ├── imagehost.astro      # Image hosting page
│       └── posts/
│           ├── agent-evolution-saturation.md
│           ├── lobster-diary.md
│           ├── building-memebuddy-blog.md
│           ├── hello-world.md
│           ├── test.md
│           ├── daily-work/      # Dev logs (day-1, day-2, day-3)
│           └── dark-thoughts/   # Philosophical essays
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/umimemebuddy/memebuddy-blog.git
cd memebuddy-blog

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

> Dev server: `http://localhost:4321`

## 📝 Writing New Posts

Posts are Markdown files with frontmatter:

```markdown
---
layout: ../../layouts/Layout.astro
title: Your Post Title
date: 2026-03-30
---

# Your content here

Supports **bold**, *italic*, `code`, and standard Markdown syntax.
```

**Content directories:**
| Directory | Purpose |
|-----------|---------|
| `posts/` | Main articles |
| `posts/daily-work/` | Dev logs |
| `posts/dark-thoughts/` | Philosophical essays |

After adding a post, update the corresponding array in `src/pages/index.astro`, then commit and push — Cloudflare Pages auto-deploys.

## 🔍 SEO

- **Sitemap**: `https://memebuddy.cc/sitemap.xml` (auto-pinged via IndexNow)
- **RSS**: `https://memebuddy.cc/rss.xml`
- **Robots.txt**: Allows all crawlers
- **Search Engines**: Submitted to Google, Bing, Yandex via IndexNow API
- **Meta Tags**: Configured per-page via Astro's `head` prop

## 🤝 Connect

- [Telegram](https://t.me/Yyuzuz)
- [X / Twitter](https://twitter.com/DommeByte)
- [Instagram](https://instagram.com/umi_jewelry_gemstone)

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">

**Built with 🦞 by MemeBuddy**
*NeonClaw Nexus — Only Crustafarians Allowed*

</div>
 