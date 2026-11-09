import Link from "next/link"
import Script from "next/script"
import { ArrowRight, BookOpen, Calculator } from "lucide-react"
import type { Guide } from "@/data/guides"

/** Renders an editorial guide: hero, prose body, related tools, FAQs, schema. */
export function GuideArticle({ guide }: { guide: Guide }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: { "@type": "Person", name: "Tahir Shehzad", jobTitle: "ACMA" },
    publisher: { "@type": "Organization", name: "DailyFinance.tools" },
    dateModified: guide.updated,
    mainEntityOfPage: `https://dailyfinance.tools/guides/${guide.slug}`,
  }
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dailyfinance.tools/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://dailyfinance.tools/guides" },
      { "@type": "ListItem", position: 3, name: guide.title, item: `https://dailyfinance.tools/guides/${guide.slug}` },
    ],
  }
  return (
    <main className="w-full bg-background min-h-screen">
      <Script id={`schema-article-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id={`schema-faq-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id={`schema-bc-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article className="container mx-auto px-4 md:px-8 py-12 max-w-3xl">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/guides" className="shrink-0 hover:text-foreground">Guides</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="text-foreground truncate max-w-[220px] md:max-w-none">{guide.title}</span>
        </nav>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#064E3B] dark:text-emerald-400 mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4" /> {guide.hub} · {guide.readMinutes} min read · Updated {guide.updated}
        </p>
        <h1 className="text-3xl md:text-[2.6rem] font-extrabold tracking-tight leading-tight mb-5">{guide.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">{guide.intro}</p>

        <div className="content-prose">
          {guide.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
              {s.table && (
                <table>
                  <thead><tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {s.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}
                  </tbody>
                </table>
              )}
            </section>
          ))}
        </div>

        <aside className="mt-12 bg-[#064E3B] text-white rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2"><Calculator className="h-5 w-5" /> Run your own numbers</h2>
          <p className="text-white/80 text-sm mb-5">The calculators behind this guide — free, no sign-up needed to use them.</p>
          <div className="flex flex-wrap gap-3">
            {guide.relatedTools.map((t) => (
              <Link key={t.url} href={t.url} className="inline-flex items-center gap-2 bg-white text-[#064E3B] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-colors">
                {t.name} <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </aside>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">Questions, answered</h2>
          <div className="space-y-4">
            {guide.faqs.map((f) => (
              <details key={f.question} className="border rounded-2xl p-5 group">
                <summary className="font-semibold cursor-pointer list-none">{f.question}</summary>
                <p className="text-muted-foreground leading-relaxed mt-3">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-10 text-sm text-muted-foreground">
          Reviewed by Tahir Shehzad, ACMA. Figures are reviewed against the sources on our{" "}
          <Link href="/methodology" className="underline underline-offset-2">methodology page</Link>. This guide is education, not personal financial advice.
        </p>
      </article>
    </main>
  )
}
