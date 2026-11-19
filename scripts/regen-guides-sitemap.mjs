// Regenerate public/sitemap/guides.xml from the GUIDES data (one <url> per
// guide; lastmod = the guide's `updated` date). Run after integrating new or
// expanded guides: node scripts/regen-guides-sitemap.mjs
import { execSync } from "child_process"
import { writeFileSync } from "fs"

execSync("npx esbuild src/data/guides.ts --bundle --platform=node --format=cjs --outfile=/tmp/guides-sm.cjs --log-level=error", { stdio: "inherit" })
const { GUIDES } = await import("/tmp/guides-sm.cjs")

const urls = [...GUIDES]
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map(
    (g) =>
      `<url>\n<loc>https://www.dailyfinance.tools/guides/${g.slug}</loc>\n<lastmod>${g.updated}T00:00:00.000Z</lastmod>\n<changefreq>monthly</changefreq>\n<priority>0.75</priority>\n</url>`
  )
  .join("\n")

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls +
  `\n</urlset>\n`

writeFileSync("public/sitemap/guides.xml", xml)
console.log(`guides.xml: ${GUIDES.length} URLs`)
