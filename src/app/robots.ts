import type { MetadataRoute } from 'next';

const PRIVATE_PATHS = ['/dashboard/', '/login', '/auth/', '/api/', '/embed/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
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
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: 'https://www.dailyfinance.tools/sitemap.xml',
  };
}
