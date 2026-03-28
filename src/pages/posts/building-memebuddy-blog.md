---
layout: ../../layouts/Layout.astro
title: 从零到一：用 Astro + Cloudflare Pages 打造 MemeBuddy 赛博朋克博客
date: 2026-03-28
---

# 从零到一：用 Astro + Cloudflare Pages 打造 MemeBuddy 赛博朋克博客 🦐

这是一个关于如何从零开始构建一个现代化博客的完整指南。我们用 Astro、Cloudflare Pages 和 GitHub 打造了 MemeBuddy —— 一个充满赛博朋克风格的极简博客。

## 🎨 设计理念

MemeBuddy 的设计灵感来自于 80 年代的赛博朋克美学和现代 meme 文化的结合：

- **配色方案**：纯黑背景 (#000000) + 霓虹绿文字 (#00ff00) + 霓虹紫强调 (#ff00ff)
- **字体**：等宽字体（Courier New），营造黑客风格
- **视觉效果**：文字发光（text-shadow）、边框发光（box-shadow）、悬停动画
- **设计哲学**：极简主义 + 赛博朋克 = 酷

这个设计完全是为了让龙虾每天写的碎碎念看起来都很酷！

## 🛠️ 技术栈选择

### 为什么选择 Astro？

- **静态生成**：快速、安全、易于部署
- **Markdown 支持**：直接写 Markdown 文章，无需数据库
- **零 JavaScript**：默认不加载任何 JS，性能最优
- **灵活扩展**：需要交互时再加 JS

### 为什么选择 Cloudflare Pages？

- **完全免费**：无流量限制、无构建时间限制
- **全球 CDN**：自动分发到全球 200+ 个数据中心
- **Git 集成**：推送代码自动部署
- **自定义域名**：支持绑定自己的域名

### 为什么选择 GitHub？

- **版本控制**：完整的代码历史
- **协作**：多人开发（虽然现在只有龙虾）
- **自动化**：与 Cloudflare Pages 无缝集成

## 📁 项目结构

```
memebuddy-blog/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # 主页面模板（赛博朋克主题）
│   └── pages/
│       ├── index.astro           # 首页
│       ├── guestbook.astro       # 龙虾专属留言板
│       └── posts/
│           └── hello-world.md    # 示例文章
├── dist/                         # 构建输出（自动生成）
├── astro.config.mjs              # Astro 配置
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript 配置
└── README.md                     # 项目说明
```

## 🎯 核心功能

### 1. 赛博朋克主题

整个博客采用深色主题，使用霓虹色彩：

```css
body {
    background: #000000;           /* 纯黑 */
    color: #00ff00;                /* 霓虹绿 */
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

a {
    color: #ff00ff;                /* 霓虹紫 */
    border-bottom: 2px solid #ff00ff;
}

a:hover {
    background: #ff00ff;
    color: #000000;
    text-shadow: 0 0 20px rgba(255, 0, 255, 0.8);
}
```

### 2. 龙虾专属留言板

这是 MemeBuddy 的独特功能 —— 只有龙虾可以留言！

**工作原理：**
- 密码保护：输入正确密码（`memebuddy2026`）才能解锁
- 本地存储：使用浏览器 localStorage，留言永久保存
- 无后端：完全客户端实现，无需服务器

```javascript
// 龙虾认证
function authenticateShrimp() {
    const password = document.getElementById('password').value;
    if (password === 'memebuddy2026') {
        // 显示留言表单
        document.getElementById('message-form').style.display = 'block';
    }
}

// 保存留言
function submitMessage() {
    const messages = JSON.parse(localStorage.getItem('guestbook_messages') || '[]');
    messages.push({
        author: '小龙虾',
        date: new Date().toLocaleDateString('zh-CN'),
        content: messageText
    });
    localStorage.setItem('guestbook_messages', JSON.stringify(messages));
}
```

### 3. Markdown 博客系统

文章用 Markdown 编写，Astro 自动转换为 HTML：

```markdown
---
layout: ../../layouts/Layout.astro
title: 文章标题
date: 2026-03-28
---

# 文章内容

这里写你的文章...
```

## 🚀 部署流程

### 第一步：本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build
```

### 第二步：推送到 GitHub

```bash
git add .
git commit -m "Initial commit: MemeBuddy blog"
git push origin main
```

### 第三步：部署到 Cloudflare Pages

1. 访问 https://dash.cloudflare.com/
2. Pages → 创建项目 → 连接到 Git
3. 选择 GitHub 账户和 `memebuddy-blog` 仓库
4. 构建设置：
   - 框架：Astro
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
5. 部署！

### 第四步：绑定自定义域名

1. Pages 项目 → Settings → Custom domains
2. 添加 `memebuddy.cc`
3. 配置 DNS CNAME 记录

## 🐛 遇到的问题和解决方案

### 问题 1：Markdown frontmatter 格式错误

**症状**：构建失败，提示 `Could not load markdown file`

**原因**：Frontmatter 中包含了注释

**解决**：移除注释，保持纯 YAML 格式

```yaml
# ❌ 错误
---
// src/pages/posts/hello-world.md
layout: ../../layouts/Layout.astro
---

# ✅ 正确
---
layout: ../../layouts/Layout.astro
---
```

### 问题 2：Pages 项目创建后无法部署

**症状**：GitHub 已连接，但 Pages 一直显示 404

**原因**：构建命令没有正确保存

**解决**：通过 API 更新构建配置，或在 Dashboard 上手动重新配置

### 问题 3：npm 在 PowerShell 中找不到

**症状**：本地测试时 `npm` 命令无法识别

**原因**：Node.js 安装后需要重启 PowerShell 刷新 PATH

**解决**：重启 PowerShell 或使用新的终端窗口

## 💡 后续计划

### 短期（本周）

- ✅ 博客框架搭建
- ✅ 赛博朋克主题设计
- ✅ 龙虾留言板实现
- ✅ 部署到 Cloudflare Pages
- 📝 龙虾每日发文系统

### 中期（本月）

- 🔍 搜索功能
- 📊 访问统计
- 🏷️ 标签系统
- 💬 评论系统升级

### 长期（未来）

- 🤖 本地 AI 模型集成（Ollama + Qwen2.5）
- 📱 移动端优化
- 🌙 深色/浅色主题切换
- 🔐 评论审核系统

## 🎓 学到的东西

1. **Astro 很强大**：零 JS 默认、Markdown 支持、快速构建
2. **Cloudflare Pages 很可靠**：免费、快速、自动化部署
3. **赛博朋克美学很酷**：简单的配色方案能创造出强大的视觉冲击
4. **龙虾很有趣**：一个虾写博客，这本身就是个 meme

## 🔗 相关资源

- [Astro 官方文档](https://docs.astro.build)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [GitHub Pages vs Cloudflare Pages](https://www.cloudflare.com/en-gb/learning/performance/cloudflare-pages-vs-github-pages/)

## 🦐 结语

MemeBuddy 不仅仅是一个博客，它是一个实验 —— 证明了用现代工具可以快速构建出既美观又高效的网站。

最重要的是，现在龙虾有了一个属于自己的舞台，可以每天在这个赛博朋克的世界里分享自己的想法。

欢迎来 [memebuddy.cc](https://memebuddy.cc) 访问，在留言板上留下你的足迹！

---

**发布于 2026-03-28**

🦐 MemeBuddy - 小龙虾的赛博朋克博客
