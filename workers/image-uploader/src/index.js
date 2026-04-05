/**
 * Memebuddy Image Uploader - With HTML UI
 */

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024;

const HTML_PAGE = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MEMEBUDDY · IMG</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --abyss: #050507;
      --carbon: #101010;
      --charcoal: #3d3a39;
      --emerald: #00d992;
      --snow: #f2f2f2;
      --parchment: #b8b3b0;
      --slate: #8b949e;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--abyss);
      color: var(--snow);
      min-height: 100vh;
      padding: 32px 16px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      font-size: 24px;
      font-weight: 400;
      letter-spacing: 4px;
      margin-bottom: 8px;
    }
    h1 span { color: var(--emerald); }
    .subtitle {
      color: var(--slate);
      font-size: 13px;
      margin-bottom: 32px;
      font-family: monospace;
    }
    .upload-zone {
      border: 2px dashed var(--charcoal);
      border-radius: 12px;
      padding: 48px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 24px;
    }
    .upload-zone:hover {
      border-color: var(--emerald);
      background: rgba(0, 217, 146, 0.03);
    }
    .upload-zone.dragover {
      border-color: var(--emerald);
      background: rgba(0, 217, 146, 0.08);
    }
    .icon { font-size: 48px; margin-bottom: 16px; opacity: 0.6; }
    .upload-text { color: var(--parchment); margin-bottom: 8px; }
    .upload-hint { color: var(--slate); font-size: 12px; }
    input[type="file"] { display: none; }
    
    .btn {
      padding: 12px 24px;
      background: var(--carbon);
      border: 1px solid var(--charcoal);
      border-radius: 6px;
      color: var(--emerald);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      margin-right: 8px;
    }
    .btn:hover {
      border-color: var(--emerald);
      box-shadow: 0 0 12px rgba(0, 217, 146, 0.2);
    }
    .btn-primary {
      background: var(--emerald);
      color: var(--abyss);
      font-weight: 600;
    }
    .btn-primary:hover {
      background: #00c785;
      box-shadow: 0 0 20px rgba(0, 217, 146, 0.4);
    }
    
    .result {
      display: none;
      margin-bottom: 24px;
      padding: 16px;
      background: var(--carbon);
      border: 1px solid var(--emerald);
      border-radius: 8px;
    }
    .result.show { display: block; }
    .result-url {
      background: var(--abyss);
      border: 1px solid var(--charcoal);
      border-radius: 4px;
      padding: 12px;
      font-family: monospace;
      font-size: 13px;
      color: var(--emerald);
      word-break: break-all;
      margin-bottom: 12px;
    }
    
    .gallery {
      margin-top: 32px;
    }
    .gallery h2 {
      font-size: 14px;
      font-weight: 400;
      color: var(--slate);
      margin-bottom: 16px;
      letter-spacing: 2px;
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 16px;
    }
    .gallery-item {
      background: var(--carbon);
      border: 1px solid var(--charcoal);
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.2s;
    }
    .gallery-item:hover {
      border-color: var(--emerald);
      transform: translateY(-2px);
    }
    .gallery-item img {
      width: 100%;
      height: 120px;
      object-fit: cover;
    }
    .gallery-item .info {
      padding: 8px;
      font-size: 11px;
      color: var(--slate);
      font-family: monospace;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .gallery-item .delete-btn {
      background: transparent;
      border: 1px solid #fb565b;
      color: #fb565b;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .gallery-item .delete-btn:hover {
      background: #fb565b;
      color: var(--abyss);
    }
    
    .error {
      display: none;
      padding: 16px;
      background: rgba(251, 86, 91, 0.1);
      border: 1px solid #fb565b;
      border-radius: 8px;
      color: #fb565b;
      margin-bottom: 24px;
    }
    .error.show { display: block; }
    
    .loading { opacity: 0.5; pointer-events: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1><span>MEME</span>BUDDY · IMG</h1>
    <p class="subtitle">// R2 Object Storage · Zero Cost</p>

    <div class="upload-zone" id="dropzone">
      <div class="icon">📤</div>
      <div class="upload-text">拖拽图片到这里，或点击选择</div>
      <div class="upload-hint">支持 JPG, PNG, GIF, WebP · 最大 5MB</div>
      <input type="file" id="fileInput" accept="image/*" multiple>
    </div>

    <button class="btn btn-primary" id="uploadBtn" onclick="uploadFiles()">上传图片</button>
    <button class="btn" onclick="loadGallery()">刷新列表</button>

    <div class="error" id="error"></div>

    <div class="result" id="result">
      <div style="color: var(--emerald); margin-bottom: 8px;">✓ 上传成功</div>
      <div class="result-url" id="resultUrl"></div>
      <button class="btn" onclick="copyUrl()">复制链接</button>
      <button class="btn" onclick="openUrl()">查看图片</button>
    </div>

    <div class="gallery">
      <h2>// GALLERY</h2>
      <div class="gallery-grid" id="gallery">
        <div style="color: var(--slate); font-size: 13px;">点击"刷新列表"加载图片</div>
      </div>
    </div>
  </div>

  <script>
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const result = document.getElementById('result');
    const resultUrl = document.getElementById('resultUrl');
    const error = document.getElementById('error');
    const gallery = document.getElementById('gallery');
    
    let selectedFiles = [];

    // Drag & drop
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', () => handleFiles(fileInput.files));

    function handleFiles(files) {
      selectedFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
      if (selectedFiles.length) {
        dropzone.querySelector('.upload-text').textContent = selectedFiles.length + ' 张图片已选择';
        dropzone.querySelector('.icon').textContent = '📎';
      }
    }

    async function uploadFiles() {
      if (!selectedFiles.length) {
        showError('请先选择图片');
        return;
      }
      
      error.classList.remove('show');
      uploadBtn.classList.add('loading');
      uploadBtn.textContent = '上传中...';
      
      for (const file of selectedFiles) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          
          const res = await fetch('/upload', { method: 'POST', body: formData });
          const data = await res.json();
          
          if (!data.success) throw new Error(data.error || '上传失败');
          
          resultUrl.textContent = data.url;
          result.classList.add('show');
        } catch (e) {
          showError(e.message);
        }
      }
      
      uploadBtn.classList.remove('loading');
      uploadBtn.textContent = '上传图片';
      selectedFiles = [];
      dropzone.querySelector('.upload-text').textContent = '拖拽图片到这里，或点击选择';
      dropzone.querySelector('.icon').textContent = '📤';
      
      loadGallery();
    }

    async function loadGallery() {
      gallery.innerHTML = '<div style="color: var(--slate);">加载中...</div>';
      
      try {
        const res = await fetch('/list');
        const data = await res.json();
        
        if (!data.images || !data.images.length) {
          gallery.innerHTML = '<div style="color: var(--slate);">暂无图片</div>';
          return;
        }
        
        gallery.innerHTML = data.images.reverse().map(img => \`
          <div class="gallery-item">
            <img src="\${img.url}" alt="\${img.filename}" loading="lazy">
            <div class="info">
              <span style="overflow:hidden;text-overflow:ellipsis;max-width:70%;">\${img.filename}</span>
              <button class="delete-btn" onclick="deleteImage('\${img.filename}')">删除</button>
            </div>
          </div>
        \`).join('');
      } catch (e) {
        gallery.innerHTML = '<div style="color: var(--slate);">加载失败</div>';
      }
    }

    function formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
      return (bytes/(1024*1024)).toFixed(1) + ' MB';
    }

    function showError(msg) {
      error.textContent = msg;
      error.classList.add('show');
    }

    function copyUrl() {
      navigator.clipboard.writeText(resultUrl.textContent);
      alert('已复制!');
    }

    function openUrl() {
      window.open(resultUrl.textContent, '_blank');
    }

    async function deleteImage(filename) {
      if (!confirm('确定删除 ' + filename + '？')) return;
      
      try {
        const res = await fetch('/' + filename, { method: 'DELETE' });
        const data = await res.json();
        
        if (data.success) {
          alert('已删除');
          loadGallery();
        } else {
          alert('删除失败: ' + data.error);
        }
      } catch (e) {
        alert('删除失败');
      }
    }

    // Load gallery on page load
    loadGallery();
  </script>
</body>
</html>
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Upload
    if (url.pathname === '/upload' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
          return jsonResponse({ error: 'No file provided' }, 400);
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
          return jsonResponse({ error: 'Invalid file type' }, 400);
        }

        if (file.size > MAX_SIZE) {
          return jsonResponse({ error: 'File too large (max 5MB)' }, 400);
        }

        const ext = file.name.split('.').pop() || 'jpg';
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;

        await env.MEMEBUDDY_IMAGES.put(filename, file.stream(), {
          httpMetadata: { contentType: file.type }
        });

        return jsonResponse({
          success: true,
          url: `${url.protocol}//${url.host}/${filename}`
        });

      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    // List images
    if (url.pathname === '/list' && request.method === 'GET') {
      const list = await env.MEMEBUDDY_IMAGES.list({ limit: 100 });
      const images = list.objects.map(obj => ({
        filename: obj.key,
        size: obj.size,
        uploaded: obj.uploaded,
        url: `${url.protocol}//${url.host}/${obj.key}`
      }));
      return jsonResponse({ images });
    }

    // Get/Download image
    if (request.method === 'GET' && url.pathname !== '/') {
      const filename = url.pathname.slice(1);
      const obj = await env.MEMEBUDDY_IMAGES.get(filename);
      
      if (!obj) return new Response('Not found', { status: 404 });

      return new Response(obj.body, {
        headers: {
          'Content-Type': obj.httpMetadata?.contentType || 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Delete image
    if (request.method === 'DELETE' && url.pathname !== '/') {
      const filename = url.pathname.slice(1);
      try {
        await env.MEMEBUDDY_IMAGES.delete(filename);
        return jsonResponse({ success: true, deleted: filename });
      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    // Home - return HTML
    return new Response(HTML_PAGE, {
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}