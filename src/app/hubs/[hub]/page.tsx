import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight, BookOpen, CheckCircle2, ChevronDown, XCircle, Zap } from "lucide-react"
import { HUBS, getHub } from "@/data/hubs"
import { TOOL_REGISTRY, EXTRA_LIVE_TOOLS } from "@/config/tool-registry"
import { getGuide } from "@/data/guides"

export function generateStaticParams() {
  return HUBS.map((h) => ({ hub: h.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ hub: string }> }): Promise<Metadata> {
  const { hub } = await params
  const h = getHub(hub)
  if (!h) return {}
  const url = `https://dailyfinance.tools/hubs/${h.slug}`
  return {
    title: `${h.title} | DailyFinance.tools`,
    description: h.description,
    alternates: { canonical: url },
    openGraph: {
      title: h.title,
      description: h.description,
      url,
      siteName: "DailyFinance.tools",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://dailyfinance.tools/images/og-base.jpg",
          width: 1376,
          height: 768,
          alt: h.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: h.title,
      description: h.description,
      images: ["https://dailyfinance.tools/images/og-base.jpg"],
    },
  }
}

export default async function HubPage({ params }: { params: Promise<{ hub: string }> }) {
  const { hub } = await params
  const h = getHub(hub)
  if (!h) notFound()

  const tools = TOOL_REGISTRY.filter((t) => t.hub === h.registryHub)
  const extras = EXTRA_LIVE_TOOLS.filter((t) => t.hub === h.registryHub)
  const guides = h.guideSlugs.map(getGuide).filter(Boolean)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: h.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dailyfinance.tools/" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://dailyfinance.tools/tools" },
      { "@type": "ListItem", position: 3, name: h.title, item: `https://dailyfinance.tools/hubs/${h.slug}` },
    ],
  }

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id={`schema-faq-hub-${h.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id={`schema-breadcrumb-hub-${h.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="container mx-auto px-4 md:px-8 py-14 max-w-6xl">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/tools" className="shrink-0 hover:text-foreground">Tools</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">{h.title}</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 max-w-3xl">{h.title}</h1>
        <div className="bg-primary/5 border border-primary/20 border-l-4 border-l-primary rounded-3xl p-6 md:p-8 max-w-3xl mb-12">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary mb-2">
            <Zap className="h-4 w-4" /> Quick Answer
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-foreground">{h.intro}</p>
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight mb-5">The tools ({tools.filter((t) => t.status === "live").length + extras.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {tools.map((t) =>
            t.status === "live" ? (
              <Link key={t.rank} href={t.url} className="border rounded-2xl p-5 hover:border-[#064E3B] hover:shadow-md transition-all bg-card group">
                <h3 className="font-bold group-hover:text-[#064E3B] dark:group-hover:text-emerald-400">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Answers: “{t.keyword}”</p>
              </Link>
            ) : (
              <div key={t.rank} className="border border-dashed rounded-2xl p-5 bg-card/60">
                <h3 className="font-bold text-muted-foreground">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">In production · {t.tier}</p>
              </div>
            )
          )}
          {extras.map((t) => (
            <Link key={t.url} href={t.url} className="border rounded-2xl p-5 hover:border-[#064E3B] hover:shadow-md transition-all bg-card group">
              <h3 className="font-bold group-hover:text-[#064E3B] dark:group-hover:text-emerald-400">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Also live on DailyFinance.tools</p>
            </Link>
          ))}
        </div>

        <article className="max-w-3xl space-y-14">
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-4">{h.decide.heading}</h2>
            <div className="content-prose">
              {h.decide.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {h.decide.bullets && (
              <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-7 mt-7">
                <ul className="space-y-3.5">
                  {h.decide.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="h-5 w-5 shrink-0 mt-1 text-[#064E3B] dark:text-emerald-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="bg-primary/5 border border-primary/15 rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-4">{h.example.heading}</h2>
            <div className="content-prose [&>*:last-child]:mb-0">
              {h.example.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-4">Mistakes that distort the answer</h2>
            <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-7">
              <ul className="space-y-3.5">
                {h.mistakes.map((m, i) => (
                  <li key={i} className="flex gap-3 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                    <XCircle className="h-5 w-5 shrink-0 mt-1 text-destructive" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-6">Questions, answered</h2>
            <div className="bg-card border border-border/60 rounded-3xl px-6 divide-y divide-border/60">
              {h.faqs.map((f) => (
                <details key={f.question} className="group py-5 first:pt-6 last:pb-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <ChevronDown className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="text-muted-foreground leading-relaxed mt-3">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {guides.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-5 flex items-center gap-2"><BookOpen className="h-6 w-6" /> Read deeper</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guides.map((g) => (
                  <Link key={g!.slug} href={`/guides/${g!.slug}`} className="border rounded-2xl p-5 hover:border-[#064E3B] hover:shadow-md transition-all bg-card group">
                    <h3 className="font-bold group-hover:text-[#064E3B] dark:group-hover:text-emerald-400">{g!.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{g!.description}</p>
                    <span className="text-sm font-semibold text-[#064E3B] dark:text-emerald-400 inline-flex items-center gap-1.5 mt-3">
                      Read the guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </section>
    </main>
  )
}
