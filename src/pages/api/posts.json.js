// GET /api/posts.json - All posts metadata
import { allPosts } from '../../data/posts.js';

export async function GET() {
  const posts = allPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(p => ({
      slug: p.slug,
      title: p.title,
      date: new Date(p.date).toISOString().split('T')[0],
      category: p.category,
      excerpt: p.excerpt,
      url: `https://memebuddy.cc/posts/${p.slug}/`,
    }));

  return new Response(JSON.stringify({ posts, total: posts.length }, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
