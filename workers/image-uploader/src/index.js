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
  <title>IMG · MEMEBUDDY</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    /* Nothing Design Language */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    :root {
      --surface: #0a0a0a;
      --surface-raised: #111111;
      --border: #262626;
      --text-display: #ffffff;
      --text-primary: #e5e5e5;
      --text-secondary: #8b8b8b;
      --text-disabled: #4d4d4d;
      --accent-up: #00d953;
      --accent-down: #d71921;
    }
    
    body {
      font-family: 'Space Grotesk', -apple-system, sans-serif;
      background: var(--surface);
      color: var(--text-primary);
      min-height: 100vh;
      padding: 48px 24px;
    }
    
    .container {
      max-width: 720px;
      margin: 0 auto;
    }
    
    /* Header - 3 Layer Hierarchy */
    header {
      margin-bottom: 48px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }
    
    .label {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    
    .title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 32px;
      font-weight: 300;
      color: var(--text-display);
      letter-spacing: -0.5px;
    }
    
    .title span {
      font-weight: 500;
    }
    
    /* Upload Zone - Mechanical */
    .upload-zone {
      border: 1px solid var(--border);
      padding: 64px 48px;
      text-align: center;
      cursor: pointer;
      transition: all 0.15s ease-out;
      margin-bottom: 24px;
      position: relative;
      overflow: hidden;
    }
    
    .upload-zone::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 4px,
        rgba(255, 255, 255, 0.01) 4px,
        rgba(255, 255, 255, 0.01) 8px
      );
      pointer-events: none;
    }
    
    .upload-zone:hover {
      background: var(--surface-raised);
      border-color: var(--text-disabled);
    }
    
    .upload-zone.dragover {
      border-color: var(--accent-up);
      background: rgba(0, 217, 83, 0.05);
    }
    
    .upload-icon {
      font-family: 'Space Mono', monospace;
      font-size: 48px;
      font-weight: 300;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }
    
    .upload-text {
      font-size: 16px;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    
    .upload-hint {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      color: var(--text-disabled);
      letter-spacing: 0.5px;
    }
    
    input[type="file"] { display: none; }
    
    /* Buttons - Industrial */
    .btn-group {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
    }
    
    .btn {
      padding: 14px 24px;
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-primary);
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.15s ease-out;
      text-transform: uppercase;
    }
    
    .btn:hover {
      background: var(--surface-raised);
      border-color: var(--text-disabled);
    }
    
    .btn-primary {
      background: var(--accent-up);
      border-color: var(--accent-up);
      color: var(--surface);
    }
    
    .btn-primary:hover {
      background: #00c24a;
      border-color: #00c24a;
    }
    
    /* Result - Monospace */
    .result {
      display: none;
      margin-bottom: 24px;
      padding: 16px;
      background: var(--surface-raised);
      border: 1px solid var(--accent-up);
    }
    
    .result.show { display: block; }
    
    .result-label {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      color: var(--accent-up);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    
    .result-url {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 12px;
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      color: var(--text-primary);
      word-break: break-all;
      margin-bottom: 12px;
    }
    
    /* Error */
    .error {
      display: none;
      padding: 16px;
      background: rgba(215, 25, 33, 0.1);
      border: 1px solid var(--accent-down);
      color: var(--accent-down);
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      margin-bottom: 24px;
    }
    
    .error.show { display: block; }
    
    /* Gallery - Grid */
    .gallery {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid var(--border);
    }
    
    .gallery-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 16px;
    }
    
    .gallery-title {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    
    .gallery-count {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      color: var(--text-disabled);
    }
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1px;
      background: var(--border);
      border: 1px solid var(--border);
    }
    
    .gallery-item {
      background: var(--surface);
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.15s ease-out;
    }
    
    .gallery-item:hover {
      background: var(--surface-raised);
    }
    
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(20%);
      transition: filter 0.15s ease-out;
    }
    
    .gallery-item:hover img {
      filter: grayscale(0%);
    }
    
    .gallery-item .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.15s ease-out;
    }
    
    .gallery-item:hover .overlay {
      opacity: 1;
    }
    
    .delete-btn {
      padding: 8px 16px;
      background: transparent;
      border: 1px solid var(--accent-down);
      color: var(--accent-down);
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.15s ease-out;
    }
    
    .delete-btn:hover {
      background: var(--accent-down);
      color: var(--surface);
    }
    
    .loading { opacity: 0.5; pointer-events: none; }
    
    .empty-state {
      grid-column: 1 / -1;
      padding: 48px;
      text-align: center;
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      color: var(--text-disabled);
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .title { font-size: 24px; }
    }
    
    @media (max-width: 480px) {
      body { padding: 24px 16px; }
      .upload-zone { padding: 48px 24px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="label">Image Storage</div>
      <h1 class="title"><span>IMG</span> · MEMEBUDDY</h1>
    </header>

    <div class="upload-zone" id="dropzone">
      <div class="upload-icon">[ + ]</div>
      <div class="upload-text">拖拽图片到这里，或点击选择</div>
      <div class="upload-hint">JPG · PNG · GIF · WebP // MAX 5MB</div>
      <input type="file" id="fileInput" accept="image/*" multiple>
    </div>

    <div class="btn-group">
      <button class="btn btn-primary" id="uploadBtn" onclick="uploadFiles()">UPLOAD</button>
      <button class="btn" onclick="loadGallery()">REFRESH</button>
    </div>

    <div class="error" id="error"></div>

    <div class="result" id="result">
      <div class="result-label">// UPLOADED</div>
      <div class="result-url" id="resultUrl"></div>
      <div class="btn-group">
        <button class="btn" onclick="copyUrl()">COPY URL</button>
        <button class="btn" onclick="openUrl()">VIEW</button>
      </div>
    </div>

    <div class="gallery">
      <div class="gallery-header">
        <span class="gallery-title">Gallery</span>
        <span class="gallery-count" id="galleryCount">—</span>
      </div>
      <div class="gallery-grid" id="gallery">
        <div class="empty-state">[ NO IMAGES ]</div>
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
    const galleryCount = document.getElementById('galleryCount');
    
    let selectedFiles = [];

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
        dropzone.querySelector('.upload-icon').textContent = '[ ' + selectedFiles.length + ' ]';
      }
    }

    async function uploadFiles() {
      if (!selectedFiles.length) {
        showError('请先选择图片');
        return;
      }
      
      error.classList.remove('show');
      uploadBtn.classList.add('loading');
      uploadBtn.textContent = 'UPLOADING...';
      
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
      uploadBtn.textContent = 'UPLOAD';
      selectedFiles = [];
      dropzone.querySelector('.upload-text').textContent = '拖拽图片到这里，或点击选择';
      dropzone.querySelector('.upload-icon').textContent = '[ + ]';
      
      loadGallery();
    }

    async function loadGallery() {
      gallery.innerHTML = '<div class="empty-state">[ LOADING... ]</div>';
      
      try {
        const res = await fetch('/list');
        const data = await res.json();
        
        if (!data.images || !data.images.length) {
          gallery.innerHTML = '<div class="empty-state">[ NO IMAGES ]</div>';
          galleryCount.textContent = '0';
          return;
        }
        
        galleryCount.textContent = data.images.length;
        
        gallery.innerHTML = data.images.reverse().map(img => \`
          <div class="gallery-item" onclick="window.open('\${img.url}', '_blank')">
            <img src="\${img.url}" alt="\${img.filename}" loading="lazy">
            <div class="overlay" onclick="event.stopPropagation()">
              <button class="delete-btn" onclick="deleteImage('\${img.filename}')">DELETE</button>
            </div>
          </div>
        \`).join('');
      } catch (e) {
        gallery.innerHTML = '<div class="empty-state">[ LOAD FAILED ]</div>';
      }
    }

    function showError(msg) {
      error.textContent = '[ ERROR ] ' + msg;
      error.classList.add('show');
    }

    function copyUrl() {
      navigator.clipboard.writeText(resultUrl.textContent);
      alert('已复制到剪贴板');
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
          loadGallery();
        } else {
          alert('删除失败: ' + data.error);
        }
      } catch (e) {
        alert('删除失败');
      }
    }

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