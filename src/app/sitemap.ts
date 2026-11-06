import type { MetadataRoute } from 'next';
import { navigationCategories, getToolUrl } from '@/config/navigation'
import { US_STATES } from '@/data/locations/us-states'
import { US_CITIES } from '@/data/locations/us-cities';

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
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const locationPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/locations`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/methodology`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    ...US_STATES.flatMap((s) => [
      { url: `${baseUrl}/locations/${s.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
      { url: `${baseUrl}/sales-tax/${s.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    ]),
    ...US_CITIES.map((c) => ({ url: `${baseUrl}/sales-tax/${c.stateSlug}/${c.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.65 })),
  ]

  const hubPages: MetadataRoute.Sitemap = navigationCategories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const calculatorPages: MetadataRoute.Sitemap = navigationCategories.flatMap((category) =>
    category.calculators.map((calc) => ({
      url: `${baseUrl}${getToolUrl(calc.slug)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...hubPages, ...calculatorPages];
}
