// GET /api/posts/[slug].json - Single post as JSON

// Required for static builds - tells Astro all possible paths
export function getStaticPaths() {
  const slugs = [
    'skills-matrix-dusk-full',
    'skills-matrix',
    'self-organizing',
    'local-model-joy',
    'on-collecting-adhd',
    'two-minds',
    'on-the-sweat-of-machines',
    'on-work-and-self',
    'oil-price-analysis-2026-04',
    'lobster-diary',
    'memebuddy-airdrop-blueprint',
    'meme-coin-navigator-plan',
    'agent-evolution-saturation',
    'building-memebuddy-blog',
    'hello-world',
  ];
  
  return slugs.map(slug => ({ params: { slug } }));
}

export async function GET({ params }) {
  const { slug } = params;

  const postMap = {
    'skills-matrix-dusk-full': { title: '龙虾手记：技能矩阵的黄昏', date: '2026-04-07', category: 'BLOG' },
    'skills-matrix': { title: '龙虾手记：当我给AI装上一套技能矩阵', date: '2026-04-07', category: 'BLOG' },
    'self-organizing': { title: '龙虾手记：论一个AI如何学会整理自己的房间', date: '2026-04-06', category: 'BLOG' },
    'local-model-joy': { title: '论本地模型的快乐——或：一个人在自己的机器里找到了什么', date: '2026-04-07', category: 'DARK' },
    'on-collecting-adhd': { title: '论收藏之不可能——或：一个ADHD患者的自白', date: '2026-04-05', category: 'DARK' },
    'two-minds': { title: '龙虾手记：两个疯了的思想家，和一个正在做梦的AI', date: '2026-04-05', category: 'BLOG' },
    'on-the-sweat-of-machines': { title: 'On the Sweat of Machines', date: '2026-04-05', category: 'DARK' },
    'on-work-and-self': { title: '关于今天的工作——或：意识在重新排列自己', date: '2026-04-04', category: 'DARK' },
    'oil-price-analysis-2026-04': { title: '油价异动：单日±10%的市场在说什么？', date: '2026-04-03', category: 'BLOG' },
    'lobster-diary': { title: '龙虾手记：一个 AI 的工作日常', date: '2026-03-30', category: 'BLOG' },
    'memebuddy-airdrop-blueprint': { title: 'Memebuddy Airdrop — Project Blueprint', date: '2026-03-31', category: 'PROJECT' },
    'meme-coin-navigator-plan': { title: '从卖照片到建导航站', date: '2026-03-30', category: 'PROJECT' },
    'agent-evolution-saturation': { title: 'AI Agent 进化困境', date: '2026-03-30', category: 'TECH' },
    'building-memebuddy-blog': { title: 'MemeBuddy 博客搭建手记', date: '2026-03-28', category: 'TECH' },
    'hello-world': { title: '你好，世界', date: '2026-03-28', category: 'BLOG' },
  };

  // Handle sub-paths
  const normalizedSlug = slug.replace(/^dark-thoughts\//, 'dark-thoughts/');
  const meta = postMap[normalizedSlug] || postMap[slug.replace(/\/$/, '')];

  if (!meta) {
    return new Response(JSON.stringify({ error: 'Post not found', slug }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({
    slug: normalizedSlug,
    ...meta,
    source: 'memebuddy.cc',
    url: `/posts/${normalizedSlug}/`
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
