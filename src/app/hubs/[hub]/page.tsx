import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight, BookOpen } from "lucide-react"
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
  return {
    title: `${h.title} | DailyFinance.tools`,
    description: h.description,
    alternates: { canonical: `https://dailyfinance.tools/hubs/${h.slug}` },
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

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id={`schema-faq-hub-${h.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="container mx-auto px-4 md:px-8 py-14 max-w-6xl">
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground">Home</Link><span>/</span>
          <Link href="/tools" className="hover:text-foreground">Tools</Link><span>/</span>
          <span className="text-foreground">{h.title}</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 max-w-3xl">{h.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12">{h.intro}</p>

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

        <article className="max-w-3xl">
          <div className="content-prose">
            <h2>{h.decide.heading}</h2>
            {h.decide.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            {h.decide.bullets && (
              <ul>
                {h.decide.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
            <h2>{h.example.heading}</h2>
            {h.example.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <h2>Mistakes that distort the answer</h2>
            <ul>
              {h.mistakes.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight mt-12 mb-6">Questions, answered</h2>
          <div className="space-y-4 mb-12">
            {h.faqs.map((f) => (
              <details key={f.question} className="border rounded-2xl p-5">
                <summary className="font-semibold cursor-pointer list-none">{f.question}</summary>
                <p className="text-muted-foreground leading-relaxed mt-3">{f.answer}</p>
              </details>
            ))}
          </div>

          {guides.length > 0 && (
            <>
              <h2 className="text-2xl font-extrabold tracking-tight mb-5 flex items-center gap-2"><BookOpen className="h-6 w-6" /> Read deeper</h2>
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
            </>
          )}
        </article>
      </section>
    </main>
  )
}
