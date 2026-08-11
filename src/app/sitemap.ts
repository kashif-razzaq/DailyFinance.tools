import type { MetadataRoute } from 'next';
import { navigationCategories } from '@/config/navigation';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dailyfinance.tools';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const calculatorPages: MetadataRoute.Sitemap = navigationCategories.flatMap((category) =>
    category.calculators.map((calc) => ({
      url: `${baseUrl}/tools/${calc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...calculatorPages];
}
