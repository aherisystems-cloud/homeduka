import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal/', '/api/'],
      },
      // Explicitly allow and prioritize AI search engines for AIEO (ChatGPT, Perplexity, Claude, Gemini)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://homeduka.co.ke/sitemap.xml',
    host: 'https://homeduka.co.ke',
  };
}
