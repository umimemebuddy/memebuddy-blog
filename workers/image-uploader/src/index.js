/**
 * Memebuddy Image Uploader
 * Workers 上传脚本
 * 
 * 上传方式：
 * - POST /upload (multipart/form-data, file=图片文件)
 * - GET /:filename (下载图片)
 * - DELETE /:filename (删除图片，需授权)
 */

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const BUCKET_NAME = 'memebuddy-images';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // 上传图片
    if (url.pathname === '/upload' && request.method === 'POST') {
      return handleUpload(request, env);
    }

    // 列出图片
    if (url.pathname === '/list' && request.method === 'GET') {
      return handleList(request, env);
    }

    // 下载/查看图片
    if (request.method === 'GET' && url.pathname !== '/') {
      const filename = url.pathname.slice(1);
      return handleGet(filename, env);
    }

    // 删除图片 (需要 Authorization header)
    if (request.method === 'DELETE') {
      const filename = url.pathname.slice(1);
      return handleDelete(filename, request, env);
    }

    // 首页
    return new Response(JSON.stringify({
      service: 'Memebuddy Image Uploader',
      version: '1.0',
      endpoints: {
        'POST /upload': '上传图片 (multipart/form-data, field: file)',
        'GET /:filename': '查看图片',
        'DELETE /:filename': '删除图片 (需 Authorization)',
        'GET /list': '列出所有图片',
      }
    }, null, 2), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  },
};

// 处理上传
async function handleUpload(request, env) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return jsonResponse({ error: 'No file provided' }, 400);
    }

    // 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return jsonResponse({ 
        error: 'Invalid file type', 
        allowed: ALLOWED_TYPES 
      }, 400);
    }

    // 验证文件大小
    if (file.size > MAX_SIZE) {
      return jsonResponse({ 
        error: 'File too large', 
        maxSize: '5MB' 
      }, 400);
    }

    // 生成文件名：时间戳-随机ID.扩展名
    const ext = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${random}.${ext}`;

    // 读取文件内容
    const arrayBuffer = await file.arrayBuffer();
    const content = new Uint8Array(arrayBuffer);

    // 上传到 R2
    const bucket = env.MEMEBUDDY_IMAGES;
    await bucket.put(filename, content, {
      httpMetadata: {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000', // 1年缓存
      },
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });

    const imageUrl = `${new URL(request.url).origin}/${filename}`;

    return jsonResponse({
      success: true,
      filename,
      url: imageUrl,
      size: file.size,
      type: file.type,
    }, 200);

  } catch (error) {
    return jsonResponse({ error: error.message }, 500);
  }
}

// 获取图片
async function handleGet(filename, env) {
  const bucket = env.MEMEBUDDY_IMAGES;
  const object = await bucket.get(filename);

  if (!object) {
    return jsonResponse({ error: 'Not found' }, 404);
  }

  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
  headers.set('Cache-Control', 'public, max-age=31536000');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('ETag', object.httpEtag);

  return new Response(object.body, { headers });
}

// 列出图片
async function handleList(request, env) {
  const bucket = env.MEMEBUDDY_IMAGES;
  const listed = await bucket.list({ limit: 100 });

  const images = listed.objects.map(obj => ({
    filename: obj.key,
    size: obj.size,
    uploaded: obj.uploaded,
    etag: obj.etag,
    url: `${new URL(request.url).origin}/${obj.key}`,
  }));

  return jsonResponse({
    count: images.length,
    images,
  });
}

// 删除图片
async function handleDelete(filename, request, env) {
  // 简单验证：需要 Authorization header
  const auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const bucket = env.MEMEBUDDY_IMAGES;
  await bucket.delete(filename);

  return jsonResponse({ success: true, deleted: filename });
}

// 辅助函数
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
