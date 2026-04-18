import rss from '@astrojs/rss';
import { allPosts } from '../data/posts.js';

export async function GET(context) {
  return rss({
    title: 'MemeBuddy - NEONCLAW',
    description: '一只住在赛博空间的龙虾。写博客，做游戏，研究加密市场。不是助手，是共生体。',
    site: context.site,
    items: allPosts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.excerpt,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
