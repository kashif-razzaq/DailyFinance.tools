import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Link from "next/link"
import { CheckCircle2, ExternalLink, ListOrdered } from "lucide-react"
import Image from "next/image"
import React from "react"
import { TahirLeadGenCTA } from "@/components/shared/TahirLeadGenCTA"
import { AuthorCard } from "@/components/shared/AuthorCard"
import { RelatedToolsWidget } from "@/components/shared/RelatedToolsWidget"
import { SidebarAdSpace } from "@/components/shared/SidebarAdSpace"
import { ProDashboardWidget } from "@/components/shared/ProDashboardWidget"
import { AdSlot } from "@/components/shared/AdSlot"
import { PreferredSourceButton } from "@/components/shared/PreferredSourceButton"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import { getCategoryForTool } from "@/config/navigation"
import { safeGetUser } from "@/utils/supabase/safe-user"
import { webApp, faq, article, breadcrumb, howTo, webPage, stringifyJsonLd, CONTENT_REVIEWED } from "@/lib/schema"
import { TOOL_CONTENT } from "@/data/tool-content"
import { getGuidesForTool } from "@/data/guides"

export interface FAQ {
  question: string;
  answer: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  slug: string;
  faqs: FAQ[];
  calculator: (isPro: boolean, isLoggedIn?: boolean) => React.ReactNode;
  children: (isPro: boolean) => React.ReactNode;
}

export async function ToolLayout({
  title,
  description,
  slug,
  faqs,
  calculator,
  children
}: ToolLayoutProps) {
  const cookieStore = await cookies()
  const category = getCategoryForTool(slug)
  let isPro = false
  let vaultCount = 0
  // Resilience: tool pages must render (free layout) even if Supabase env is
  // missing in a given environment — auth is an enhancement, not a dependency.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const supabase = supabaseUrl && supabaseKey
    ? createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
        },
      })
    : null
  const user = supabase ? await safeGetUser(supabase) : null

  if (user && supabase) {
    try {
      const { data: profile } = await supabase.from('users').select('subscription_status').eq('id', user.id).single()
      if (profile?.subscription_status === 'active') {
        isPro = true
      }

      // Fetch total vault count (share-link rows are not Vault saves)
      const { count } = await supabase
        .from('saved_calculators')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_share_link', false)

      vaultCount = count || 0
    } catch {
      // Supabase hiccup mid-render: serve the page with free defaults
      // rather than failing the whole navigation.
    }
  }

  const toolUrl = `https://www.dailyfinance.tools/${category ? category.slug + "/" : ""}${slug}`
  const toolPath = `/${category ? category.slug + "/" : ""}${slug}`
  const relatedGuides = getGuidesForTool(toolPath)
  const entry = category ? TOOL_CONTENT[`${category.slug}/${slug}`] : undefined
  const steps = entry?.howItWorks

  return (
    <main className="w-full bg-background min-h-screen">
      <script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(webApp({ name: title, url: toolUrl, description })) }} />
      {faqs.length > 0 && (
        <script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(faq(faqs)) }} />
      )}
      <script id="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(article({ headline: title, description, url: toolUrl, dateModified: CONTENT_REVIEWED, datePublished: CONTENT_REVIEWED })) }} />
      <script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(webPage({ name: title, url: toolUrl, description })) }} />
      <script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([
        { name: "Home", url: "https://www.dailyfinance.tools/" },
        ...(category ? [{ name: category.name, url: `https://www.dailyfinance.tools/${category.slug}` }] : []),
        { name: title, url: toolUrl },
      ])) }} />
      {steps && steps.length > 0 && (
        <script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(howTo({ name: `How to use the ${title}`, steps: steps.map((text) => ({ text })) })) }} />
      )}

      {/* Main Interactive Tool Area */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-12 pb-2 md:pb-8 lg:px-8" aria-label={`${title} Tool`}>
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-border/40 pb-2 md:pb-8 mb-8">
          <div className="lg:col-span-7">
            {/* Dynamic Breadcrumbs */}
            {category && (
              <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
                <Link href="/" className="shrink-0 hover:text-foreground transition-colors">Home</Link>
                <span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
                <Link href={`/${category.slug}`} className="shrink-0 hover:text-foreground transition-colors">{category.name}</Link>
                <span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
                <span className="text-foreground truncate max-w-[200px] md:max-w-none" title={title}>{title}</span>
              </nav>
            )}
            
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
              {title}
            </h1>
            <p className="text-base text-muted-foreground max-w-xl">
              {description}
            </p> 
            <br/>
            {/* EEAT Trust Badge - Scandinavian Premium */}
            <div className="flex items-center gap-4 mb-8 pt-4 border-t border-border/30 w-fit">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border/50">
                  <Image src="/team/tahir-shehzad.jpg" alt="Tahir Shehzad" fill sizes="32px" className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground tracking-tight">Reviewed by Tahir Shehzad, ACMA</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mt-0.5">Updated for {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
            {/* Google Preferred Sources ask — under title, description and the Reviewed-by badge */}
            <PreferredSourceButton />
          </div>
          
          {/* Top Ad Space or Pro Widget */}
          <div className="lg:col-span-5 flex w-full h-full items-center justify-end">
            {!isPro ? (
              <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Premium Ad Space" className="w-full min-h-[90px]" />
            ) : (
              <ProDashboardWidget userName={user?.user_metadata?.full_name} vaultCount={vaultCount} />
            )}
          </div>
        </header>

        {calculator(isPro, !!user)}
      </section>

      {/* SEO Content & Article */}
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 w-full min-w-0" aria-label="Educational Content">
        {/* Pre-Article Ad Space */}
        {!isPro && (
          <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE} label="Editorial Sponsor Placement" className="mb-12 w-full min-h-[120px]" />
        )}

        <div>
          {entry && (
            <nav aria-label="On this page" className="mb-10 rounded-2xl border border-border/60 bg-card p-5 md:p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                <ListOrdered className="h-4 w-4 text-[#064E3B] dark:text-emerald-400" /> On this page
              </p>
              <ol className="m-0 list-none space-y-2 p-0">
                <li className="text-sm"><a href="#quick-answer" className="text-muted-foreground hover:text-primary hover:underline underline-offset-2"><span className="mr-2 font-mono text-xs text-muted-foreground/70">01</span>Quick answer</a></li>
                <li className="text-sm"><a href="#how-it-works" className="text-muted-foreground hover:text-primary hover:underline underline-offset-2"><span className="mr-2 font-mono text-xs text-muted-foreground/70">02</span>How the {title} works, step by step</a></li>
                {entry.formula && (
                  <li className="text-sm"><a href="#formula" className="text-muted-foreground hover:text-primary hover:underline underline-offset-2"><span className="mr-2 font-mono text-xs text-muted-foreground/70">03</span>The formula</a></li>
                )}
                <li className="text-sm"><a href="#worked-example" className="text-muted-foreground hover:text-primary hover:underline underline-offset-2"><span className="mr-2 font-mono text-xs text-muted-foreground/70">{entry.formula ? "04" : "03"}</span>Worked example</a></li>
                {faqs.length > 0 && (
                  <li className="text-sm"><a href="#faq" className="text-muted-foreground hover:text-primary hover:underline underline-offset-2"><span className="mr-2 font-mono text-xs text-muted-foreground/70">{entry.formula ? "05" : "04"}</span>Frequently asked questions</a></li>
                )}
                {entry.sources && entry.sources.length > 0 && (
                  <li className="text-sm"><a href="#sources" className="text-muted-foreground hover:text-primary hover:underline underline-offset-2"><span className="mr-2 font-mono text-xs text-muted-foreground/70">{entry.formula ? "06" : "05"}</span>Sources</a></li>
                )}
                {relatedGuides.length > 0 && (
                  <li className="text-sm"><a href="#learn-more" className="text-muted-foreground hover:text-primary hover:underline underline-offset-2"><span className="mr-2 font-mono text-xs text-muted-foreground/70">{entry.formula ? "07" : "06"}</span>Learn more</a></li>
                )}
              </ol>
            </nav>
          )}

          {children(isPro)}

          {/* Dynamic FAQ Section */}
          {faqs.length > 0 && (
            <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 mt-16">
              <h2 id="faq" className="text-2xl md:text-3xl font-extrabold mb-8 mt-0 text-foreground scroll-mt-24">Frequently Asked Questions</h2>
              <FaqAccordion items={faqs} variant="bare" />
            </section>
          )}

          {/* Sources — the primary sources behind the figures on this page */}
          {entry?.sources && entry.sources.length > 0 && (
            <section id="sources" className="mt-10 md:mt-16 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold m-0 mb-4 text-foreground tracking-tight">Sources</h2>
              <ul className="m-0 list-none space-y-2 p-0">
                {entry.sources.map((s) => (
                  <li key={s.url} className="text-sm">
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-2">
                      {s.label} <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Learn more — guides that explain this tool's topic in depth */}
          {relatedGuides.length > 0 && (
            <section id="learn-more" className="mt-10 md:mt-16 bg-card border border-border/50 rounded-2xl p-5 md:p-8 shadow-sm scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold m-0 mb-2 text-foreground tracking-tight">Learn more</h2>
              <p className="text-sm text-muted-foreground m-0 mb-5 leading-relaxed">
                In-depth guides that explain the ideas behind this calculator.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-4">
                {relatedGuides.map((guide) => (
                  <li key={guide.slug}>
                    <Link href={`/guides/${guide.slug}`} className="font-semibold text-primary hover:underline text-base">
                      {guide.title}
                    </Link>
                    <p className="text-sm text-muted-foreground m-0 mt-1 leading-relaxed">{guide.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <AuthorCard />

          {/* How-this-was-checked note (ARB TD15): an honest restatement of
              the documented review process (see /methodology and
              /editorial-policy) — no invented testing narrative. */}
          <p className="mt-6 text-sm text-muted-foreground">
            <strong className="font-semibold text-foreground">How this calculator was checked:</strong>{" "}
            its formula comes from a published source, the worked example&apos;s arithmetic was verified, and the model was reviewed by Tahir Shehzad, ACMA — see our{" "}
            <Link href="/methodology" className="underline underline-offset-2">methodology page</Link>.
          </p>

          {/* Estimates disclaimer (YMYL) */}
          <p className="mt-6 rounded-2xl border border-border/60 bg-muted/30 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">Estimates, not advice.</strong>{" "}
            This calculator provides educational estimates based on the inputs you enter and the assumptions shown on this page. It is not financial, tax or investment advice, and it cannot see your full situation. Verify important figures against official sources, and consider a qualified professional for decisions about your own money. See our{" "}
            <Link href="/disclaimer" className="font-semibold text-primary hover:underline">Disclaimer</Link>{" "}
            and{" "}
            <Link href="/methodology" className="font-semibold text-primary hover:underline">Methodology</Link>.
          </p>

          {/* Bottom Article Ad Space */}
          {!isPro && (
          <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} label="Footer AdSense Space" className="mb-12 w-full min-h-[120px]" />
        )}

        </div>
      </article>

      {/* Sticky Sidebar (Right Column) */}
      <aside className="hidden lg:flex lg:col-span-4 flex-col gap-8 sticky top-24">
        <TahirLeadGenCTA />
        <RelatedToolsWidget currentSlug={slug} />
        {!isPro && <SidebarAdSpace />}
      </aside>
      
      {/* Mobile Sidebar Content (Below article) */}
      <aside className="lg:hidden flex flex-col gap-8 mt-8 pt-8 md:mt-16 md:pt-16 border-t border-border/40">
        <RelatedToolsWidget currentSlug={slug} />
        {!isPro && <SidebarAdSpace />}
      </aside>

    </div>
  </div>
    </main>
  )
}
