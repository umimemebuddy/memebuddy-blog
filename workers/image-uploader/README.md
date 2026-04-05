# Memebuddy Image Uploader

基于 Cloudflare Workers + R2 的图床上传系统。

## 架构

```
用户图片 → Workers API → R2 Bucket → images.memebuddy.cc
```

## 部署步骤

### 1. 创建 R2 Bucket（已完成）
- Bucket 名称：`memebuddy-images`

### 2. 创建 Worker
1. 打开 [dash.cloudflare.com](https://dash.cloudflare.com)
2. Workers & Pages → Create Application → Create Worker
3. 名称：`memebuddy-image-uploader`
4. 点击 Deploy

### 3. 绑定 R2 Bucket
1. 在 Worker 详情页 → Settings → Variables
2. 滚动到 **R2 Bucket Bindings**
3. 点击 Add binding
4. Variable name: `MEMEBUDDY_IMAGES`
5. Bucket name: `memebuddy-images`
6. Save

### 4. 上传代码（两种方式）

#### 方式 A: Wrangler CLI（推荐）
```bash
cd workers/image-uploader
npx wrangler deploy
```

#### 方式 B: Cloudflare Dashboard
1. Worker → Edit Code
2. 复制 `src/index.js` 的内容粘贴
3. Save and Deploy

### 5. 绑定自定义域名
1. Worker → Triggers → Custom Domains
2. 添加：`images.memebuddy.cc`
3. 域名需要先在 Cloudflare 添加 DNS 记录（CNAME 指向 Worker）

## API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /upload | 上传图片 (multipart/form-data) |
| GET | /:filename | 查看图片 |
| GET | /list | 列出所有图片 |
| DELETE | /:filename | 删除图片（需授权） |
| GET | / | 服务信息 |

## 上传示例

```bash
# 使用 curl 上传
curl -X POST https://images.memebuddy.cc/upload \
  -F "file=@image.jpg"
```

响应：
```json
{
  "success": true,
  "filename": "171234567890-abc123.jpg",
  "url": "https://images.memebuddy.cc/171234567890-abc123.jpg",
  "size": 102400,
  "type": "image/jpeg"
}
```

## 本地开发

```bash
cd workers/image-uploader
npx wrangler dev
```

然后访问 `http://localhost:8787` 使用上传界面。

## 使用限制

- 文件大小：最大 5MB
- 支持格式：JPG, PNG, GIF, WebP
- 存储：R2 10GB/月免费额度
- 流量：R2 出站免费
