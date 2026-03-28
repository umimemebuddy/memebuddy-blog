import fs from 'fs';
import path from 'path';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 读取 HTML 文件
    const htmlPath = path.join(process.cwd(), 'dist', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
};
