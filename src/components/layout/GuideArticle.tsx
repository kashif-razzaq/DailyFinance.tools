import Link from "next/link"
import { ArrowRight, BookOpen, Calculator, CalendarDays, Clock } from "lucide-react"
import type { Guide } from "@/data/guides"
import { article, faq, breadcrumb, stringifyJsonLd } from "@/lib/schema"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import { GuideImage } from "@/components/shared/GuideImage"

/** Renders an editorial guide: hero, prose body, related tools, FAQs, schema. */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
function formatGuideDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  if (!y || !m || !d) return iso
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

export function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <main className="w-full bg-background min-h-screen">
      <script id={`schema-article-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(article({ headline: guide.title, description: guide.description, url: `https://www.dailyfinance.tools/guides/${guide.slug}`, dateModified: guide.updated })) }} />
      <script id={`schema-faq-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(faq(guide.faqs)) }} />
      <script id={`schema-bc-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([
        { name: "Home", url: "https://www.dailyfinance.tools/" },
        { name: "Guides", url: "https://www.dailyfinance.tools/guides" },
        { name: guide.title, url: `https://www.dailyfinance.tools/guides/${guide.slug}` },
      ])) }} />
      <article className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/guides" className="shrink-0 hover:text-foreground">Guides</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="text-foreground truncate max-w-[220px] md:max-w-none">{guide.title}</span>
        </nav>
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#064E3B]/10 px-3 py-1 text-xs font-bold text-[#064E3B] dark:text-emerald-400">
            <BookOpen className="h-3.5 w-3.5" /> {guide.hub}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#064E3B] dark:text-emerald-400" /> {guide.readMinutes} min read
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-[#064E3B] dark:text-emerald-400" /> Updated {formatGuideDate(guide.updated)}
          </span>
        </div>
        <h1 className="text-3xl md:text-[2.6rem] font-extrabold tracking-tight leading-tight mb-5">{guide.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{guide.intro}</p>

        <GuideImage src={guide.image} alt={guide.imageAlt} caption="Illustration: DailyFinance.tools" priority className="mb-10" />

        <div className="mx-auto max-w-4xl">
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
          <FaqAccordion items={guide.faqs} />
        </section>

        <p className="mt-10 text-sm text-muted-foreground">
          Reviewed by Tahir Shehzad, ACMA. Figures are reviewed against the sources on our{" "}
          <Link href="/methodology" className="underline underline-offset-2">methodology page</Link>. This guide is education, not personal financial advice.
        </p>
        </div>
      </article>
    </main>
  )
}
