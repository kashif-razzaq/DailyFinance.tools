import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight, BookOpen, Calculator } from "lucide-react"
import { GUIDES, GUIDE_HUBS, HUB_DESCRIPTIONS, HUB_INTRO, getHubCornerstone, guidesByHub, hubAnchor } from "@/data/guides"
import { GuideCard } from "@/components/shared/GuideCard"
import { GuideImage } from "@/components/shared/GuideImage"
import { breadcrumb, itemList, stringifyJsonLd } from "@/lib/schema"

/**
 * Hub category pages (/guides/category/[hub]) — real indexable pages for
 * each guide category, replacing the old #anchor jumps on the guides
 * index (Kashif, 2026-11-21). Each page carries genuine unique intro copy,
 * the hub cornerstone featured, every guide in the hub, and the
 * calculators behind them — a proper category archive in the shape Google
 * and AdSense expect, not a thin list.
 */

function hubFromSlug(slug: string) {
  return GUIDE_HUBS.find((hub) => hubAnchor(hub) === slug)
}

export function generateStaticParams() {
  return GUIDE_HUBS.map((hub) => ({ category: hubAnchor(hub) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const hub = hubFromSlug(category)
  if (!hub) return {}
  const title = `${hub} Guides: Clear Answers With Real Numbers`
  const description = `${HUB_DESCRIPTIONS[hub]} — ${guidesByHub(hub).length} guides, each with a worked example and a free calculator.`
  const url = `https://www.dailyfinance.tools/guides/category/${category}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Daily Finance Tools",
      locale: "en_US",
      type: "website",
      images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
    },
  }
}

export default async function HubCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const hub = hubFromSlug(category)
  if (!hub) notFound()

  const guides = guidesByHub(hub)
  const cornerstone = getHubCornerstone(hub)
  const intro = HUB_INTRO[hub] ?? []
  const hubUrl = `https://www.dailyfinance.tools/guides/category/${category}`
  // The calculators behind this hub's guides, deduplicated, top 8.
  const relatedTools = Array.from(
    new Map(guides.flatMap((g) => g.relatedTools).map((t) => [t.url, t])).values()
  ).slice(0, 8)

  const listSchema = itemList({
    name: `${hub} guides — DailyFinance.tools`,
    items: guides.map((g) => ({ name: g.title, url: `https://www.dailyfinance.tools/guides/${g.slug}` })),
  })
  const crumbSchema = breadcrumb([
    { name: "Home", url: "https://www.dailyfinance.tools/" },
    { name: "Guides", url: "https://www.dailyfinance.tools/guides" },
    { name: hub, url: hubUrl },
  ])

  return (
    <main className="w-full bg-background min-h-screen">
      <script id="schema-hub-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(listSchema) }} />
      <script id="schema-hub-crumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(crumbSchema) }} />
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/guides" className="shrink-0 hover:text-foreground">Guides</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="text-foreground truncate">{hub}</span>
        </nav>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#064E3B] dark:text-emerald-400 mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4" /> Guides · {hub}
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 max-w-3xl">{hub} guides</h1>
        {intro.map((p) => (
          <p key={p.slice(0, 24)} className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">{p}</p>
        ))}

        {cornerstone && (
          <Link
            href={`/guides/${cornerstone.slug}`}
            className="group mt-8 mb-12 flex flex-col md:flex-row overflow-hidden rounded-3xl border border-border bg-card hover:border-[#064E3B] hover:shadow-md transition-all"
          >
            <span className="md:w-2/5 shrink-0">
              <GuideImage src={cornerstone.image} alt={cornerstone.imageAlt} imgClassName="aspect-video md:aspect-auto md:h-full w-full object-cover" />
            </span>
            <span className="flex flex-col p-6 md:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] dark:text-emerald-400 mb-2">Start here · the cornerstone guide</span>
              <span className="font-bold text-xl md:text-2xl leading-snug mb-2 group-hover:text-[#064E3B] dark:group-hover:text-emerald-400">{cornerstone.title}</span>
              <span className="text-sm text-muted-foreground leading-relaxed mb-4">{cornerstone.description}</span>
              <span className="mt-auto text-sm font-semibold text-[#064E3B] dark:text-emerald-400 inline-flex items-center gap-1.5">
                Read the guide <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </Link>
        )}

        <h2 className="text-2xl font-extrabold tracking-tight mb-5">All {hub} guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {guides.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>

        {relatedTools.length > 0 && (
          <section className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2"><Calculator className="h-5 w-5" /> The calculators behind these guides</h2>
            <p className="text-white/80 text-sm mb-5">Run the same math on your own numbers — free, no sign-up needed to use them.</p>
            <div className="flex flex-wrap gap-3">
              {relatedTools.map((t) => (
                <Link key={t.url} href={t.url} className="inline-flex items-center gap-2 bg-white text-[#064E3B] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-colors">
                  {t.name} <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="mt-10 text-sm text-muted-foreground">
          <Link href="/guides" className="font-medium text-[#064E3B] dark:text-emerald-400 underline underline-offset-2">← All guides</Link>
          {" · "}
          {GUIDE_HUBS.filter((h) => h !== hub).map((h, i) => (
            <span key={h}>
              {i > 0 && " · "}
              <Link href={`/guides/category/${hubAnchor(h)}`} className="font-medium text-[#064E3B] dark:text-emerald-400 underline underline-offset-2">{h}</Link>
            </span>
          ))}
        </p>
      </section>
    </main>
  )
}
