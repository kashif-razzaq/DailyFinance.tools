import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Script from "next/script"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import React from "react"
import { TahirLeadGenCTA } from "@/components/shared/TahirLeadGenCTA"
import { RelatedToolsWidget } from "@/components/shared/RelatedToolsWidget"
import { SidebarAdSpace } from "@/components/shared/SidebarAdSpace"
import { ProDashboardWidget } from "@/components/shared/ProDashboardWidget"
import { AdSlot } from "@/components/shared/AdSlot"
import { getCategoryForTool } from "@/config/navigation"

export interface FAQ {
  question: string;
  answer: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  slug: string;
  faqs: FAQ[];
  calculator: (isPro: boolean) => React.ReactNode;
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
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } }
  
  if (user && supabase) {
    const { data: profile } = await supabase.from('users').select('subscription_status').eq('id', user.id).single()
    if (profile?.subscription_status === 'active') {
      isPro = true
    }
    
    // Fetch total vault count
    const { count } = await supabase
      .from('saved_calculators')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      
    vaultCount = count || 0
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "url": `https://dailyfinance.tools/${category ? category.slug + "/" : ""}${slug}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": description
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": { "@type": "Person", "name": "Tahir Shehzad" },
    "publisher": { "@type": "Organization", "name": "DailyFinance.tools" }
  }

  const toolUrl = `https://dailyfinance.tools/${category ? category.slug + "/" : ""}${slug}`
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
      ...(category
        ? [{ "@type": "ListItem", "position": 2, "name": category.name, "item": `https://dailyfinance.tools/${category.slug}` }]
        : []),
      { "@type": "ListItem", "position": category ? 3 : 2, "name": title, "item": toolUrl },
    ],
  }

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {faqs.length > 0 && (
        <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Script id="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Main Interactive Tool Area */}
      <section className="container mx-auto px-4 md:px-8 pt-12 pb-2 md:pb-8" aria-label={`${title} Tool`}>
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-border/40 pb-2 md:pb-8 mb-8">
          <div className="lg:col-span-7">
            {/* Dynamic Breadcrumbs */}
            {category && (
              <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <span className="text-border">/</span>
                <Link href={`/${category.slug}`} className="hover:text-foreground transition-colors">{category.name}</Link>
                <span className="text-border">/</span>
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

        {calculator(isPro)}
      </section>

      {/* SEO Content & Article */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 w-full min-w-0" aria-label="Educational Content">
        {/* Pre-Article Ad Space */}
        {!isPro && (
          <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE} label="Editorial Sponsor Placement" className="mb-12 w-full min-h-[120px]" />
        )}

        <div>
          {children(isPro)}

          {/* Dynamic FAQ Section */}
          {faqs.length > 0 && (
            <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 mt-16">
              <h2 id="faq" className="text-2xl md:text-3xl font-extrabold mb-8 mt-0 text-foreground scroll-mt-24">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {faqs.map((faq, i) => (
                  <article key={i}>
                    <h3 className="text-lg font-bold mt-0 mb-2 scroll-mt-24">{faq.question}</h3>
                    <p className="text-muted-foreground m-0">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* EEAT Author Bio - Elevated Card Style */}
          <section className="mt-10 md:mt-16 bg-card border border-border/50 rounded-2xl p-5 md:p-8 flex flex-col sm:flex-row gap-5 md:gap-8 items-start shadow-sm">
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border border-border/50 shadow-sm">
              <Image src="/team/tahir-shehzad.jpg" alt="Tahir Shehzad - ACMA" fill sizes="(max-width: 768px) 64px, 80px" className="object-cover" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <h3 className="text-lg md:text-2xl font-bold m-0 text-foreground tracking-tight">Tahir Shehzad</h3>
                <a href="https://www.linkedin.com/in/tahir-shehzad-acma1993/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0a66c2] transition-colors" aria-label="Tahir Shehzad on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full md:ml-1">ACMA Qualified</span>
              </div>
              <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-primary mb-3 mt-0">
                Assistant Manager, Accounts & Finance 
              </p>
              <p className="text-sm text-muted-foreground m-0 leading-relaxed max-w-2xl">
                Running finance for a multi-entity group — IFRS reporting, Odoo & QuickBooks, payroll, taxation and SECP compliance. His models ensure that independent professionals price their services for sustainable, long-term profitability.
              </p>
            </div>
          </section>

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
