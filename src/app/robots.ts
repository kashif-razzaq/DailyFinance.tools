import type { MetadataRoute } from 'next';

const PRIVATE_PATHS = ['/dashboard/', '/login', '/auth/', '/api/', '/embed/'];

// OG/social images are served from /api/og — they must stay fetchable even
// though the rest of /api/ is private (most-specific rule wins, so this Allow
// beats the /api/ Disallow for OG URLs only).
const OG_ALLOW = '/api/og';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', OG_ALLOW],
        disallow: PRIVATE_PATHS,
      },
      {
        // AI answer-engine crawlers are explicitly welcome (AEO/GEO): the
        // site publishes llms.txt and structured data so its calculators and
        // guides can be cited. Private/app paths stay disallowed for them too.
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'CCBot',
          'Applebot-Extended',
          'Meta-ExternalAgent',
          'cohere-ai',
        ],
        allow: ['/', OG_ALLOW],
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: 'https://www.dailyfinance.tools/sitemap.xml',
  };
}
