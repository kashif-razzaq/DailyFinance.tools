import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { navigationCategories } from '@/config/navigation'
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  PieChart,
  Shield,
  Lock,
  Eye,
  Server,
  ChevronDown,
  Sparkles,
  Check,
  LineChart,
  BarChart3,
  Activity,
  Box
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'DailyFinance | 50+ Free Professional Financial Calculators',
  description:
    'Precision-engineered financial calculators for smarter decisions. Optimize taxes, investments, cash flow, and wealth building with 50+ free tools. No signup required.',
  openGraph: {
    title: 'DailyFinance | Professional Financial Calculators',
    description:
      '50+ free financial calculators covering taxes, investments, real estate, e-commerce, and wealth building. Used by professionals worldwide.',
    url: 'https://dailyfinance.tools',
    siteName: 'DailyFinance Tools',
    type: 'website',
  },
}

// FAQ data for both rendering and schema
const faqData = [
  {
    q: 'What is DailyFinance?',
    a: 'DailyFinance is a free suite of 50+ professional-grade financial calculators organized across 5 categories: Freelance, Creator Economy, E-Commerce, Real Estate, and Personal Wealth. Each calculator provides real-time, interactive results with visual charts to help you make data-driven financial decisions.',
  },
  {
    q: 'Are the calculators completely free?',
    a: 'Yes. All 50+ calculators are 100% free to use with no signup required. You get full access to every calculator, real-time charts, and responsive mobile support at zero cost. The optional Pro plan ($2.99/month) adds advanced features like scenario saving, data exports, and cross-data analytics.',
  },
  {
    q: 'What does the Pro plan include?',
    a: 'DailyFinance Pro costs $2.99 per month and includes: unlimited Scenario Vault storage with version history, instant CSV and Excel exports, premium PDF report generation, Cross-Data Analytics with net worth tracking and debt waterfalls, zero display ads, and priority feature requests.',
  },
  {
    q: 'Do I need to create an account to use the calculators?',
    a: 'No. Every calculator works instantly in your browser without any account or signup. Creating a free account is only needed if you want to save scenarios to your personal Vault or upgrade to Pro for exports and analytics.',
  },
  {
    q: 'How accurate are the calculations?',
    a: 'Each calculator uses industry-standard financial formulas and is regularly reviewed for accuracy. All formulas are transparent — you can see exactly how results are derived. For tax-related calculators, we use current IRS brackets and rates, updated annually.',
  },
  {
    q: 'Can I export my results?',
    a: 'With DailyFinance Pro, you can export any calculation as a CSV spreadsheet, Excel (XLSX) file, or a professionally formatted PDF report. Free users can share results via direct URL links.',
  },
  {
    q: 'Is my data secure?',
    a: 'DailyFinance uses Supabase for authentication with industry-standard encryption. Your calculation inputs are processed entirely in your browser — we never store or transmit your raw financial data to external servers. Saved scenarios are encrypted and accessible only to your account.',
  },
  {
    q: 'Who built DailyFinance?',
    a: 'DailyFinance is built by a team of financial professionals and software engineers. Our accounting tools are reviewed by accredited management accountants with expertise in tax optimization and financial modeling.',
  },
]

export default function HomePage() {
  // Build JSON-LD Schema Graph
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://dailyfinance.tools/#organization',
        name: 'DailyFinance Tools',
        url: 'https://dailyfinance.tools',
        logo: {
          '@type': 'ImageObject',
          url: 'https://dailyfinance.tools/icon.png',
          caption: 'DailyFinance Tools Logo',
        },
        sameAs: [
          'https://twitter.com/dailyfinance',
          'https://www.linkedin.com/company/dailyfinancetools',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://dailyfinance.tools/#website',
        url: 'https://dailyfinance.tools',
        name: 'DailyFinance Tools',
        publisher: { '@id': 'https://dailyfinance.tools/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://dailyfinance.tools/tools?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://dailyfinance.tools/#software',
        name: 'DailyFinance Financial Calculator Suite',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All modern web browsers',
        provider: { '@id': 'https://dailyfinance.tools/#organization' },
        description:
          'A comprehensive suite of 50+ free, professional-grade financial calculators covering freelance rates, taxes, investments, real estate, e-commerce, and personal wealth planning.',
        featureList: [
          '50+ interactive financial calculators',
          'Real-time visual charts and graphs',
          'Scenario Vault for saving calculations',
          'CSV, Excel, and PDF exports',
          'Cross-Data Analytics dashboard',
          'Multi-currency support',
        ],
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '0',
          highPrice: '2.99',
          offerCount: '2',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://dailyfinance.tools/#faq',
        mainEntity: faqData.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 
        MAIN WRAPPER 
        Using a soft, warm off-white bg for light mode and deep slate for dark.
        Text selection is styled for premium feel.
      */}
      <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        
        {/* ═══════════════════════════════════════════════
            SECTION 1 — HERO & DASHBOARD SHOWCASE
        ═══════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
          {/* Subtle Background Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] opacity-30 dark:opacity-20 blur-[100px] bg-primary/10 rounded-full pointer-events-none -z-10" />
          
          <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/40 text-sm font-medium text-muted-foreground mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Version 2.0 is now live</span>
            </div>

            {/* Huge Typography */}
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-foreground mb-8 max-w-5xl leading-[1.05]">
              Precision financial tools for <span className="text-primary/90">smarter decisions.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Stop guessing with spreadsheets. Access 50+ free, interactive calculators designed for freelancers, creators, and modern entrepreneurs. No signup required.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 md:mb-24 w-full sm:w-auto">
              <Link
                href="/tools"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#064e3b] text-white hover:bg-[#064e3b]/90 font-medium rounded-xl transition-all shadow-[0_4px_14px_0_rgb(6,78,59,0.39)] text-base"
              >
                Browse all 50+ tools
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-[#d97706]/30 text-[#d97706] hover:bg-[#d97706]/10 font-medium rounded-xl transition-all shadow-sm text-base"
              >
                Unlock Pro Vault
              </Link>
            </div>

            {/* 
                Real App Previews
            */}
            <div className="w-full max-w-[1400px] mx-auto relative perspective-[2000px] px-2 md:px-0">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-[#064e3b]/10 blur-[100px] rounded-[4rem] transform -translate-y-12 z-0 pointer-events-none" />
              
              <div className="relative z-10 w-full flex flex-col items-center group">
                 {/* Main Image (Vault) */}
                 <div className="w-full rounded-2xl md:rounded-[2rem] border border-border/40 shadow-2xl overflow-hidden bg-card relative z-20 transform rotate-x-[1deg] hover:rotate-x-0 transition-transform duration-700">
                   <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl md:rounded-[2rem] pointer-events-none" />
                   <img src="/dashboard-vault.png" alt="DailyFinance Scenario Vault" className="w-full h-auto object-cover" />
                 </div>

                 {/* Secondary Image (Library) Peeking from behind */}
                 <div className="w-[95%] md:w-[90%] -mt-16 md:-mt-32 lg:-mt-48 rounded-b-2xl md:rounded-b-[2rem] border-x border-b border-border/40 shadow-xl overflow-hidden bg-card relative z-10 transform translate-y-4 group-hover:translate-y-8 transition-transform duration-700">
                   <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none z-10 ring-1 ring-inset ring-white/10 rounded-b-2xl md:rounded-b-[2rem]" />
                   <img src="/dashboard-library.png" alt="DailyFinance Pro Tools Library" className="w-full h-auto object-cover" />
                 </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 2 — TRUST METRICS
        ═══════════════════════════════════════════════ */}
        <section className="py-12 border-y border-border/30 bg-card/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 items-center text-center">
              {[
                { value: '50+', label: 'Professional Tools' },
                { value: 'Zero', label: 'Signup Required' },
                { value: '100%', label: 'Browser Processed' },
                { value: '5', label: 'Core Categories' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-1">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 3 — ASYMMETRIC BENTO GRID
        ═══════════════════════════════════════════════ */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-16 md:mb-24 md:max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                Everything you need to <br/> model your financial future.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We've categorized over 50 precision tools into 5 distinct pillars. Whether you're optimizing an e-commerce store or planning early retirement, the math is ready.
              </p>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
              
              {/* Feature 1 (Large, spans 2 cols) */}
              <Link href="/tools#freelance" className="group col-span-1 md:col-span-2 bg-card rounded-[2rem] p-8 md:p-10 border border-border/40 hover:border-border/80 transition-all shadow-sm hover:shadow-md relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                    <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Freelance & Gig</h3>
                  <p className="text-muted-foreground max-w-md">Hourly rate reverse engineering, quarterly tax estimation, and irregular income buffering tools.</p>
                </div>
                <div className="relative z-10 mt-8 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                  Explore 10 tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Feature 2 */}
              <Link href="/tools#creator" className="group col-span-1 bg-card rounded-[2rem] p-8 md:p-10 border border-border/40 hover:border-border/80 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <PieChart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">Creator Economy</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">AdSense calculators, sponsorship pricing, and platform fee visualizers.</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-primary font-medium text-sm">
                  Explore 10 tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Feature 3 */}
              <Link href="/tools#ecommerce" className="group col-span-1 bg-card rounded-[2rem] p-8 md:p-10 border border-border/40 hover:border-border/80 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                    <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">E-Commerce</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Target ROAS, Shopify margins, and inventory reorder point calculators.</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm">
                  Explore 10 tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Feature 4 (Large, spans 2 cols) */}
              <Link href="/tools#personal-wealth" className="group col-span-1 md:col-span-2 bg-card rounded-[2rem] p-8 md:p-10 border border-border/40 hover:border-border/80 transition-all shadow-sm hover:shadow-md relative overflow-hidden flex flex-col justify-between">
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors" />
                <div className="relative z-10 md:flex md:gap-12 md:items-center">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                      <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Wealth & Real Estate</h3>
                    <p className="text-muted-foreground max-w-md">Coast FIRE, Debt Avalanche, House Hacking ROI, and Mortgage Amortization simulators.</p>
                    <div className="mt-8 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                      Explore 20 tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  {/* Abstract illustration right side */}
                  <div className="hidden md:block w-48 h-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-2xl border border-indigo-500/20 transform rotate-6" />
                    <div className="absolute inset-0 bg-card rounded-2xl border border-border/40 transform -rotate-3 p-4 shadow-sm flex flex-col justify-between">
                       <div className="h-2 w-12 bg-indigo-500/40 rounded-full" />
                       <div className="space-y-2">
                         <div className="h-1.5 w-full bg-muted rounded-full" />
                         <div className="h-1.5 w-4/5 bg-muted rounded-full" />
                         <div className="h-1.5 w-2/3 bg-muted rounded-full" />
                       </div>
                    </div>
                  </div>
                </div>
              </Link>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 4 — HORIZONTAL FEATURED CALCULATORS
        ═══════════════════════════════════════════════ */}
        <section className="py-24 border-y border-border/30 bg-muted/10">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
                  Featured Instruments
                </h2>
                <p className="text-muted-foreground">
                  The most highly utilized tools this week.
                </p>
              </div>
              <Link href="/tools" className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2 border-b border-border hover:border-primary pb-1">
                View directory <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Hourly Rate Reverse Engineer',
                  desc: 'Calculate exact hourly rates required to hit post-tax monthly income targets.',
                  slug: 'hourly-rate-reverse-engineer-calculator',
                  icon: Calculator,
                },
                {
                  title: 'Quarterly Estimated Taxes',
                  desc: 'Project IRS 1099 quarterly obligations based on dynamic income and deductions.',
                  slug: 'quarterly-estimated-taxes-calculator',
                  icon: TrendingUp,
                },
                {
                  title: 'S-Corp Salary vs Dividend',
                  desc: 'Optimize W2 payroll ratios to minimize self-employment tax liabilities.',
                  slug: 's-corp-salary-dividend-calculator',
                  icon: BarChart3,
                },
              ].map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-card border border-border/40 rounded-2xl hover:border-primary/30 transition-all hover:shadow-sm"
                >
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="shrink-0 pt-4 sm:pt-0">
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 5 — HOW IT WORKS (Minimalist)
        ═══════════════════════════════════════════════ */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                  Complex math. <br/> Zero friction.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  Every tool is engineered for speed. No sign-ups blocking your way, no clunky spreadsheets to download. Just instant, browser-based processing.
                </p>
                
                <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-border/60">
                  {[
                    { title: 'Select a tool', desc: 'Find the exact calculator for your scenario from our curated directory.' },
                    { title: 'Input variables', desc: 'Enter your data. Watch charts and projections update in real-time.' },
                    { title: 'Take action', desc: 'Export reports, save to your Vault, or share the direct URL with clients.' }
                  ].map((step, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-[400px] md:h-[500px] w-full bg-card rounded-[2rem] border border-border/40 overflow-hidden shadow-sm flex items-center justify-center">
                {/* Abstract visualization of speed/processing */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                   <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                   <div className="absolute inset-4 border border-primary/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                   <div className="absolute inset-8 border border-primary/60 rounded-full animate-[spin_8s_linear_infinite]" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                       <Calculator className="w-6 h-6 text-primary-foreground" />
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 6 — PRO FEATURES (Clean SaaS Table)
        ═══════════════════════════════════════════════ */}
        <section className="py-24 bg-card/50 border-y border-border/30">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                Scale your financial operations.
              </h2>
              <p className="text-lg text-muted-foreground">
                The free tier gives you all 50+ calculators. The Pro tier gives you the infrastructure to manage them.
              </p>
            </div>

            <div className="bg-background rounded-3xl border border-border/40 p-6 md:p-10 shadow-sm">
               <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-border/40">
                 <div className="col-span-1" />
                 <div className="col-span-1 text-center">
                   <h3 className="font-semibold text-lg text-foreground">Free</h3>
                   <p className="text-sm text-muted-foreground mt-1">$0 / forever</p>
                 </div>
                 <div className="col-span-1 text-center">
                   <h3 className="font-semibold text-lg text-primary">Pro</h3>
                   <p className="text-sm text-muted-foreground mt-1">$2.99 / month</p>
                 </div>
               </div>

               <div className="space-y-6">
                 {[
                  { label: 'Access to 50+ Tools', free: true, pro: true },
                  { label: 'Real-time Charting', free: true, pro: true },
                  { label: 'URL Sharing', free: true, pro: true },
                  { label: 'Scenario Vault Storage', free: false, pro: true },
                  { label: 'CSV / Excel Export', free: false, pro: true },
                  { label: 'PDF Report Generation', free: false, pro: true },
                  { label: 'Cross-Data Analytics', free: false, pro: true },
                  { label: 'Zero Display Ads', free: false, pro: true },
                 ].map((row, i) => (
                   <div key={i} className="grid grid-cols-3 gap-4 items-center group">
                     <div className="col-span-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                       {row.label}
                     </div>
                     <div className="col-span-1 flex justify-center">
                       {row.free ? <Check className="w-5 h-5 text-foreground" /> : <div className="w-1.5 h-1.5 rounded-full bg-border" />}
                     </div>
                     <div className="col-span-1 flex justify-center">
                       {row.pro ? <Check className="w-5 h-5 text-primary" /> : <div className="w-1.5 h-1.5 rounded-full bg-border" />}
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-12 flex justify-center">
                 <Link
                   href="/pricing"
                   className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all text-sm w-full md:w-auto justify-center"
                 >
                   Upgrade to Pro Vault
                 </Link>
               </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 7 — TRUST & SECURITY
        ═══════════════════════════════════════════════ */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                Enterprise-grade privacy.
              </h2>
              <p className="text-lg text-muted-foreground">
                Your financial data is your business. We engineered DailyFinance so it stays that way.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 text-center md:text-left">
              {[
                {
                  icon: Lock,
                  title: 'Secure Auth',
                  desc: 'Supabase-powered authentication with enterprise-grade session encryption.',
                },
                {
                  icon: Eye,
                  title: 'Browser Local',
                  desc: 'Calculations occur in your browser. Raw data never touches our servers.',
                },
                {
                  icon: Shield,
                  title: 'Data Sovereignty',
                  desc: 'We do not track, aggregate, or sell any personal financial inputs.',
                },
                {
                  icon: Server,
                  title: 'Encrypted Transit',
                  desc: '100% of platform traffic is secured via modern TLS protocols.',
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col md:items-start items-center">
                  <item.icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 8 — FAQ (Borderless Accordion)
        ═══════════════════════════════════════════════ */}
        <section className="py-24 border-t border-border/30 bg-card/20">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
              Questions & Answers
            </h2>

            <div className="space-y-1">
              {faqData.map((item) => (
                <details key={item.q} className="group border-b border-border/30 last:border-0">
                  <summary className="flex items-center justify-between cursor-pointer py-6 text-foreground font-medium hover:text-primary transition-colors list-none select-none text-lg">
                    {item.q}
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300 shrink-0 ml-4" />
                  </summary>
                  <p className="pb-8 text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 9 — FINAL CTA BANNER
        ═══════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 px-4 md:px-8">
          <div className="container mx-auto max-w-5xl bg-foreground text-background rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            {/* Soft background glows within the dark container */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-[1.1]">
                Ready to model <br/> your next move?
              </h2>
              <p className="text-lg md:text-xl text-background/70 max-w-xl mx-auto mb-10">
                Join thousands of modern professionals using DailyFinance to bring clarity to their cash flow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="/tools"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-background text-foreground font-medium rounded-xl hover:bg-background/90 transition-all text-base shadow-sm"
                >
                  Explore the directory
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
