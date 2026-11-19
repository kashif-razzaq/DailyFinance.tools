import Link from "next/link"
import { ArrowRight, BookOpen, Calculator, CalendarDays, Clock, ExternalLink, ListOrdered } from "lucide-react"
import type { Guide } from "@/data/guides"
import { getHubCornerstone } from "@/data/guides"
import { blogPosting, faq, breadcrumb, webPage, stringifyJsonLd } from "@/lib/schema"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import { GuideImage } from "@/components/shared/GuideImage"
import { AuthorCard } from "@/components/shared/AuthorCard"

/** Renders an editorial guide: hero, TOC, prose body, related tools, FAQs, sources, author box, schema. */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
function formatGuideDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  if (!y || !m || !d) return iso
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

function slugify(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

export function GuideArticle({ guide }: { guide: Guide }) {
  const cornerstone = !guide.cornerstone ? getHubCornerstone(guide.hub) : undefined
  const inlineAfter = Math.floor(guide.sections.length / 2)
  return (
    <main className="w-full bg-background min-h-screen">
      <script id={`schema-article-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(blogPosting({ headline: guide.title, description: guide.description, url: `https://www.dailyfinance.tools/guides/${guide.slug}`, image: `https://www.dailyfinance.tools${guide.image}`, datePublished: guide.published, dateModified: guide.updated })) }} />
      <script id={`schema-webpage-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(webPage({ name: guide.title, url: `https://www.dailyfinance.tools/guides/${guide.slug}`, description: guide.description })) }} />
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
            <CalendarDays className="h-4 w-4 text-[#064E3B] dark:text-emerald-400" /> Published {formatGuideDate(guide.published)}
          </span>
          {guide.updated !== guide.published && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-[#064E3B] dark:text-emerald-400" /> Updated {formatGuideDate(guide.updated)}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-[2.6rem] font-extrabold tracking-tight leading-tight mb-5">{guide.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{guide.intro}</p>

        <GuideImage src={guide.image} alt={guide.imageAlt} caption="Illustration: DailyFinance.tools" priority className="mb-10" />

        <div className="mx-auto max-w-4xl">
        {guide.sections.length > 1 && (
          <nav aria-label="In this guide" className="mb-10 rounded-2xl border border-border/60 bg-card p-5 md:p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
              <ListOrdered className="h-4 w-4 text-[#064E3B] dark:text-emerald-400" /> In this guide
            </p>
            <ol className="m-0 list-none space-y-2 p-0">
              {guide.sections.map((s, i) => (
                <li key={s.heading} className="text-sm">
                  <a href={`#${slugify(s.heading)}`} className="text-muted-foreground hover:text-primary hover:underline underline-offset-2">
                    <span className="mr-2 font-mono text-xs text-muted-foreground/70">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </a>
                </li>
              ))}
              <li className="text-sm">
                <a href="#questions-answered" className="text-muted-foreground hover:text-primary hover:underline underline-offset-2">
                  <span className="mr-2 font-mono text-xs text-muted-foreground/70">{String(guide.sections.length + 1).padStart(2, "0")}</span>
                  Questions, answered
                </a>
              </li>
              {guide.sources.length > 0 && (
                <li className="text-sm">
                  <a href="#sources" className="text-muted-foreground hover:text-primary hover:underline underline-offset-2">
                    <span className="mr-2 font-mono text-xs text-muted-foreground/70">{String(guide.sections.length + 2).padStart(2, "0")}</span>
                    Sources
                  </a>
                </li>
              )}
            </ol>
          </nav>
        )}

        <div className="content-prose">
          {guide.sections.map((s, idx) => (
            <div key={s.heading}>
              <section id={slugify(s.heading)} className="scroll-mt-24">
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
              {guide.inlineImage && idx === inlineAfter - 1 && (
                <GuideImage src={guide.inlineImage} alt={guide.inlineImageAlt || guide.imageAlt} caption="Illustration: DailyFinance.tools" className="my-10" />
              )}
            </div>
          ))}
        </div>

        {cornerstone && (
          <p className="mt-10 rounded-2xl border border-border/60 bg-muted/30 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">The big picture:</strong>{" "}
            <Link href={`/guides/${cornerstone.slug}`} className="font-semibold text-primary hover:underline underline-offset-2">{cornerstone.title}</Link>
            {" "}— the cornerstone guide for {guide.hub}.
          </p>
        )}

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

        <section id="questions-answered" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">Questions, answered</h2>
          <FaqAccordion items={guide.faqs} />
        </section>

        {guide.sources.length > 0 && (
          <section id="sources" className="mt-12 scroll-mt-24">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">Sources</h2>
            <ul className="m-0 list-none space-y-2 p-0">
              {guide.sources.map((s) => (
                <li key={s.url} className="text-sm">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-2">
                    {s.label} <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <AuthorCard />

        <p className="mt-10 text-sm text-muted-foreground">
          Figures are checked against the sources listed above and our{" "}
          <Link href="/methodology" className="underline underline-offset-2">methodology page</Link>. This guide is education, not personal financial advice.
        </p>
        </div>
      </article>
    </main>
  )
}
