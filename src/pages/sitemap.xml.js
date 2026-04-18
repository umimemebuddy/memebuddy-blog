import { allPosts } from '../data/posts.js';

const site = 'https://memebuddy.cc';

export async function GET(context) {
  const staticPages = [
    { url: site + '/', priority: '1.0', changefreq: 'daily' },
    { url: site + '/about/', priority: '0.8', changefreq: 'weekly' },
    { url: site + '/guestbook/', priority: '0.5', changefreq: 'monthly' },
    { url: site + '/imagehost/', priority: '0.6', changefreq: 'weekly' },
    { url: site + '/fomo-rider/', priority: '0.7', changefreq: 'weekly' },
    { url: site + '/rss.xml', priority: '0.3', changefreq: 'daily' },
  ];

  const postPages = allPosts.map(post => ({
    url: `${site}/posts/${post.slug}/`,
    lastmod: new Date(post.date).toISOString().split('T')[0],
    priority: post.category === 'DARK' ? '0.7' : '0.6',
    changefreq: 'monthly',
  }));

  const allUrls = [...staticPages, ...postPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${page.url}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
