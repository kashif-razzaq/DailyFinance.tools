/**
 * The sitemap index, served at /sitemap.xml via a proxy rewrite.
 *
 * Why this exists: the retired src/app/sitemap.ts stub still generates an
 * (empty) /sitemap.xml metadata route that Vercel serves ahead of the
 * static public/sitemap.xml — so the proxy rewrites /sitemap.xml here,
 * where the real index (with the XSL stylesheet instruction that renders
 * the designed, clickable Yoast-style view) is returned.
 */
const INDEX_XML = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.dailyfinance.tools/sitemap/pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://www.dailyfinance.tools/sitemap/calculators.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://www.dailyfinance.tools/sitemap/hubs.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://www.dailyfinance.tools/sitemap/guides.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://www.dailyfinance.tools/sitemap/states.xml</loc>
  </sitemap>
</sitemapindex>
`

export async function GET() {
  return new Response(INDEX_XML, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
