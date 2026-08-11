import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Script from "next/script"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import React from "react"

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
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  let isPro = false
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    const { data: profile } = await supabase.from('users').select('subscription_status').eq('id', user.id).single()
    if (profile?.subscription_status === 'active') {
      isPro = true
    }
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "url": `https://dailyfinance.tools/tools/${slug}`,
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

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {faqs.length > 0 && (
        <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Script id="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Main Interactive Tool Area */}
      <section className="container mx-auto px-4 md:px-8 pt-12 pb-8" aria-label={`${title} Tool`}>
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-border/40 pb-8 mb-8">
          <div className="lg:col-span-7">
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
          
          {/* Top Ad Space */}
          <div className="lg:col-span-5 flex w-full">
            {!isPro && (
              <aside className="w-full h-[90px] bg-muted/10 border border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em] mb-1">Advertisement</span>
                <span className="text-xs font-semibold text-foreground/40">Premium Ad Space</span>
              </aside>
            )}
          </div>
        </header>

        {calculator(isPro)}
      </section>

      {/* SEO Content & Article */}
      <article className="container mx-auto px-4 md:px-8 py-24 max-w-4xl" aria-label="Educational Content">
        {/* Pre-Article Ad Space */}
        {!isPro && (
          <aside className="mb-12 w-full h-[150px] md:h-[250px] bg-muted/10 border border-dashed border-border/40 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em] mb-2">Advertisement</span>
            <span className="text-sm font-semibold text-foreground/40">Editorial Sponsor Placement</span>
          </aside>
        )}

        <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
          
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

          {/* EEAT Author Bio - Scandinavian Style */}
          <section className="mt-20 bg-transparent border-t border-border/40 pt-12 flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border border-border/50">
              <Image src="/team/tahir-shehzad.jpg" alt="Tahir Shehzad - ACMA" fill sizes="(max-width: 768px) 80px, 96px" className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl md:text-2xl font-bold m-0 text-foreground tracking-tight">Tahir Shehzad</h3>
                <a href="https://www.linkedin.com/in/tahir-shehzad-acma1993/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0a66c2] transition-colors" aria-label="Tahir Shehzad on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full ml-1">ACMA Qualified</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-4 mt-0">
                Assistant Manager, Accounts & Finance 
              </p>
              <p className="text-sm text-muted-foreground m-0 leading-relaxed max-w-2xl">
                Running finance for a multi-entity group — IFRS reporting, Odoo & QuickBooks, payroll, taxation and SECP compliance. His models ensure that independent professionals price their services for sustainable, long-term profitability.
              </p>
            </div>
          </section>

          {/* Bottom Article Ad Space */}
          {!isPro && (
            <aside className="mt-16 w-full h-[150px] bg-muted/10 border border-dashed border-border/40 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-semibold text-foreground/40">Footer AdSense Space</span>
            </aside>
          )}

        </div>
      </article>
    </main>
  )
}
