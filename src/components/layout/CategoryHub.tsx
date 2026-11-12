import React from "react"
import { ReviewLine } from "@/components/locations/ReviewLine"
import Link from "next/link"
import { navigationCategories, getToolUrl } from "@/config/navigation"
import { itemList, faq, breadcrumb, stringifyJsonLd, SITE_URL } from "@/lib/schema"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import { ArrowRight, CheckCircle2, ChevronDown, Crown, Zap } from "lucide-react"

export interface HubFAQ { question: string; answer: string }

interface CategoryHubProps {
  categorySlug: string
  quickAnswer: string
  intro: string[]
  decisions: { need: string; toolSlug: string; why: string }[]
  faqs: HubFAQ[]
}

export function CategoryHub({ categorySlug, quickAnswer, intro, decisions, faqs }: CategoryHubProps) {
  const category = navigationCategories.find((c) => c.slug === categorySlug)
  if (!category) return null
  const Icon = category.icon

  return (
    <main className="w-full bg-background min-h-screen">
      <script id={`schema-hub-list-${category.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(itemList({ name: `${category.name} Financial Calculators`, items: category.calculators.map((calc) => ({ name: calc.title, url: `${SITE_URL}${getToolUrl(calc.slug)}` })) })) }} />
      <script id={`schema-hub-faq-${category.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(faq(faqs)) }} />
      <script id={`schema-hub-crumb-${category.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([
        { name: "Home", url: "https://www.dailyfinance.tools/" },
        { name: `${category.name} Tools`, url: `https://www.dailyfinance.tools/${category.slug}` },
      ])) }} />

      <section className="mx-auto w-full max-w-7xl px-6 pt-14 pb-10 lg:px-8">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground transition-colors">Home</Link>
          <span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">{category.name} Tools</span>
        </nav>
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-3 rounded-2xl ${category.colorClass}`}>
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">{category.name} Financial Calculators</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-3xl">{category.description}</p>
          </div>
        </div>
        <div className="bg-primary/5 border border-primary/20 border-l-4 border-l-primary rounded-3xl p-6 md:p-8 max-w-4xl">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary mb-2">
            <Zap className="h-4 w-4" /> Quick Answer
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-foreground">{quickAnswer}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">All {category.name} Tools ({category.calculators.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {category.calculators.map((calc) => {
            const CalcIcon = calc.icon
            return (
              <Link key={calc.slug} href={getToolUrl(calc.slug)} className="group bg-card border border-border/60 rounded-3xl p-6 hover:border-primary/40 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${category.colorClass}`}><CalcIcon className="h-5 w-5" /></div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{calc.title}</h3>
                  {calc.isPremium && (
                    <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-[#D97706]/10 px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-[#D97706]">
                      <Crown className="h-3 w-3" /> PRO
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{calc.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Use this calculator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-8 min-w-0 space-y-14">
            <div className="content-prose">
              {intro.map((para, i) => (<p key={i}>{para}</p>))}
            </div>

            <section>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-6">Which {category.name} calculator should you use?</h2>
              <ol className="space-y-4">
                {decisions.map((d, i) => {
                  const tool = category.calculators.find((c) => c.slug === d.toolSlug)
                  return (
                    <li key={d.toolSlug} className="flex gap-4 bg-card border border-border/60 rounded-3xl p-5 md:p-6 hover:border-primary/40 transition-colors">
                      <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-extrabold">{i + 1}</span>
                      <div className="min-w-0">
                        <h3 className="font-bold text-foreground leading-snug">{d.need}</h3>
                        <p className="text-muted-foreground leading-relaxed mt-1.5">
                          {tool ? <Link href={getToolUrl(d.toolSlug)} className="font-semibold text-[#064E3B] dark:text-emerald-400 underline decoration-emerald-600/30 underline-offset-2 hover:decoration-emerald-600">{tool.title}</Link> : d.toolSlug} — {d.why}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-4">Why use DailyFinance for {category.name.toLowerCase()} calculations?</h2>
              <div className="content-prose">
                <p>Every calculator on this page shows its formula, works through real-number examples, and explains what your result actually means — including the mistakes that make most online estimates wrong. Your inputs are calculated in your browser; if you create a free account you can save scenarios and come back to them, but no tool on this site requires sign-up. All tools are reviewed by Tahir Shehzad, ACMA, and updated for the current tax year and current platform fees where those apply.</p>
              </div>
              <ul className="flex flex-wrap gap-2.5 mt-6">
                {["Free, no sign-up required", "Formula shown for every result", "Reviewed by a qualified finance professional"].map((label) => (
                  <li key={label} className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-sm font-semibold text-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {label}
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="lg:col-span-4 bg-card border border-border/60 rounded-3xl p-6 lg:sticky lg:top-24">
            <h3 className="font-bold text-lg mb-2">Frequently Asked Questions</h3>
            <FaqAccordion items={faqs} variant="compact" />
            <ReviewLine compact scope="general" />
          </aside>
        </div>
      </section>
    </main>
  )
}
