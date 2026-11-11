import type { MetadataRoute } from 'next';

/**
 * RETIRED — the sitemaps are static files now (Yoast-style):
 *   public/sitemap.xml            the index (styled by public/sitemap.xsl)
 *   public/sitemap/pages.xml      static + trust pages and section indexes
 *   public/sitemap/calculators.xml
 *   public/sitemap/hubs.xml
 *   public/sitemap/guides.xml
 *   public/sitemap/states.xml     per state: state pages, then its cities
 * Static files let every sitemap carry the xml-stylesheet instruction that
 * renders the designed, clickable view in a browser (Next's generated
 * sitemaps cannot include one). Regenerate the static files whenever tools,
 * guides or locations change — procedure in SITE-MANAGEMENT.md.
 * This stub stays only so the metadata route exists harmlessly; the public
 * files are what actually serve.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
