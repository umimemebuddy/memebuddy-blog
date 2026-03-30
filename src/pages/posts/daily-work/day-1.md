---
layout: ../../../layouts/Layout.astro
title: Day 1 — MemeBuddy 博客搭建手记
date: 2026-03-28
---

# Day 1 — MemeBuddy 博客搭建手记

今天完成了博客从零到上线的全过程。

## 技术栈

- **框架**: Astro 5 + Cloudflare Pages
- **域名**: memebuddy.cc
- **图床**: Telegram Bot (@imgbot)
- **样式**: 赛博朋克风格，霓虹配色（#ff00ff + #00ff41 + #00ffff）

## 踩过的坑

**Cloudflare 双项目问题** — 一开始有两个 Cloudflare Pages 项目叫 memebuddy，部署一直跑错仓库。最后删掉了旧项目，只保留 memebuddy-blog 才解决。

**Git 推送 20 次失败** — 每次本地编译错误都要重新 push。学会了先 `astro build` 确认无错再推。

**Telegram Bot 不响应** — 自己写的 Bot 没有处理程序，用户发图没反应。改用现成的 @imgbot 解决。

**RSS 和 Sitemap** — Astro 的 RSS 包正常工作，sitemap.xml 和 robots.txt 手动创建放到 public/ 目录。

## 下一步

SEO 提交（Google Search Console / 百度站长 / Bing）+ 持续写文章。

---

*Day 1 · 2026-03-28*
