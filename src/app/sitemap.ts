import type { MetadataRoute } from 'next';
import { navigationCategories, getToolUrl } from '@/config/navigation'
import { US_STATES } from '@/data/locations/us-states'
import { US_CITIES } from '@/data/locations/us-cities';
import { GUIDES } from '@/data/guides';
import { HUBS } from '@/data/hubs';

const baseUrl = 'https://dailyfinance.tools';

/**
 * Yoast-style sitemap structure: /sitemap.xml is the index, and each content
 * family gets its own sitemap file —
 *   pages       static + trust pages and the section indexes
 *   calculators category landings, then every calculator grouped by category
 *   hubs        the /hubs/* pillar pages
 *   guides      the editorial guides
 *   states      per state, in hierarchy order: the state's three pages
 *               (locations, state guide, sales tax), then that state's
 *               city guides and city sales-tax pages
 */
export async function generateSitemaps() {
  return [
    { id: 'pages' },
    { id: 'calculators' },
    { id: 'hubs' },
    { id: 'guides' },
    { id: 'states' },
  ];
}

const entry = (path: string, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], priority: number) => ({
  url: `${baseUrl}${path}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
});

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;

  switch (id) {
    case 'pages':
      return [
        entry('/', 'weekly', 1.0),
        entry('/tools', 'weekly', 0.9),
        entry('/pricing', 'monthly', 0.8),
        entry('/guides', 'weekly', 0.85),
        entry('/guides/states', 'monthly', 0.8),
        entry('/locations', 'monthly', 0.8),
        entry('/about', 'monthly', 0.5),
        entry('/contact', 'monthly', 0.5),
        entry('/methodology', 'monthly', 0.6),
        entry('/editorial-policy', 'monthly', 0.6),
        entry('/privacy', 'yearly', 0.3),
        entry('/terms', 'yearly', 0.3),
        entry('/cookies', 'yearly', 0.3),
        entry('/disclaimer', 'yearly', 0.3),
      ];

    case 'calculators':
      return [
        ...navigationCategories.map((category) => entry(`/${category.slug}`, 'weekly', 0.85)),
        ...navigationCategories.flatMap((category) =>
          category.calculators.map((calc) => entry(getToolUrl(calc.slug), 'weekly', 0.7))
        ),
      ];

    case 'hubs':
      return HUBS.map((h) => entry(`/hubs/${h.slug}`, 'weekly', 0.85));

    case 'guides':
      return GUIDES.map((g) => entry(`/guides/${g.slug}`, 'monthly', 0.75));

    case 'states':
      return US_STATES.flatMap((s) => {
        const cities = US_CITIES.filter((c) => c.stateSlug === s.slug);
        return [
          entry(`/locations/${s.slug}`, 'monthly', 0.7),
          entry(`/guides/states/${s.slug}`, 'monthly', 0.7),
          entry(`/sales-tax/${s.slug}`, 'monthly', 0.7),
          ...cities.flatMap((c) => [
            entry(`/guides/states/${s.slug}/${c.slug}`, 'monthly', 0.65),
            entry(`/sales-tax/${s.slug}/${c.slug}`, 'monthly', 0.65),
          ]),
        ];
      });

    default:
      return [];
  }
}
