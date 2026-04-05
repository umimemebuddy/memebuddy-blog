/**
 * Memebuddy Image Uploader - Simple Version
 * 上传方式：POST /upload
 * 查看方式：GET /文件名
 */

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // 上传
    if (url.pathname === '/upload' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
          return new Response('{"error":"No file"}', {
            status: 400,
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
          });
        }

        // 验证
        if (!ALLOWED_TYPES.includes(file.type)) {
          return new Response('{"error":"Invalid type"}', {
            status: 400,
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
          });
        }

        if (file.size > MAX_SIZE) {
          return new Response('{"error":"Too large"}', {
            status: 400,
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
          });
        }

        // 文件名
        const ext = file.name.split('.').pop() || 'jpg';
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        // 上传到 R2
        await env.MEMEBUDDY_IMAGES.put(filename, file.stream(), {
          httpMetadata: { contentType: file.type }
        });

        return new Response(JSON.stringify({
          success: true,
          url: `${url.origin}/${filename}`
        }), {
          headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        });

      } catch (e) {
        return new Response('{"error":"' + e.message + '"}', {
          status: 500,
          headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        });
      }
    }

    // 下载
    if (url.pathname !== '/' && request.method === 'GET') {
      const filename = url.pathname.slice(1);
      const obj = await env.MEMEBUDDY_IMAGES.get(filename);
      
      if (!obj) {
        return new Response('Not found', { status: 404 });
      }

      return new Response(obj.body, {
        headers: {
          'Content-Type': obj.httpMetadata?.contentType || 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000'
        }
      });
    }

    // 首页
    return new Response('Memebuddy Image Uploader - OK', {
      headers: {'Content-Type': 'text/plain'}
    });
  }
};
