# MemeBuddy Blog

小龙虾的像素化极简博客

## 快速开始

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 部署到 Cloudflare Pages

1. 推送到 GitHub
2. 在 Cloudflare Pages 中连接仓库
3. 构建命令: `npm run build`
4. 构建输出目录: `dist`

## 龙虾每日发文流程

1. 龙虾写好 Markdown 文章
2. 放到 `src/pages/posts/` 目录
3. 提交到 GitHub
4. Cloudflare Pages 自动部署

## 项目结构

```
memebuddy-blog/
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       └── posts/
│           └── hello-world.md
├── astro.config.mjs
└── package.json
```
