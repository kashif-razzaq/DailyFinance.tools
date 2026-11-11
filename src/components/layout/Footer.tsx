import Link from 'next/link'
import { GUIDES } from '@/data/guides'
import { navigationCategories } from '@/config/navigation'
import { FooterAccordion } from '@/components/layout/FooterAccordion'
import { Logo } from '@/components/layout/Logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, ShieldCheck } from 'lucide-react'

// Custom SVGs for Social Icons to avoid version/export issues with lucide
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background pt-16 pb-28 md:pb-8 relative overflow-hidden">
      
      {/* Giant Background Watermark */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none flex items-center justify-center opacity-[0.02] dark:opacity-[0.03]">
        <span className="text-[12vw] font-black tracking-tighter whitespace-nowrap text-primary">
          DAILYFINANCE
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Tier: Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          
          <div className="max-w-sm">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Logo className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                DailyFinance
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              High-speed, precision-engineered financial calculators for freelancers, creators, and modern entrepreneurs.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" aria-label="X / Twitter" className="text-muted-foreground hover:text-primary transition-colors p-2 -ml-2 rounded-full hover:bg-primary/5">
                <XIcon className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                <GitHubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="w-full lg:max-w-md bg-muted/30 p-6 rounded-2xl border backdrop-blur-sm">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Join the Weekly Compound
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Get one actionable financial model or calculator breakdown sent to your inbox every Sunday. No fluff.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="name@example.com" 
                className="bg-background h-10 rounded-xl"
              />
              <Button type="button" className="h-10 rounded-xl font-semibold px-6 bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Middle Tier (mobile): Categories as a stacked accordion.
            All tool links stay in the DOM for SEO; see FooterAccordion. */}
        <FooterAccordion />

        {/* Middle Tier (desktop): 3 decorated columns on the left, Guides card on the
            right — the same width as the newsletter box above (28rem). No hub links
            (Kashif, 2026-11-12): column 1 is the 8 category pages. */}
        <div className="hidden md:flex md:flex-col lg:flex-row gap-6 lg:gap-10 mb-16">
          <div className="flex-1 rounded-3xl border border-border/60 bg-muted/20 p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Categories</h4>
                  <span aria-hidden="true" className="mt-2 block h-0.5 w-6 rounded bg-[#D97706]" />
                </div>
                <ul className="flex flex-col gap-2.5">
                  {navigationCategories.map((category) => (
                    <li key={category.slug}>
                      <Link href={`/${category.slug}`} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-tight">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Important</h4>
                  <span aria-hidden="true" className="mt-2 block h-0.5 w-6 rounded bg-[#D97706]" />
                </div>
                <ul className="flex flex-col gap-2.5">
                  {[["About", "/about"], ["Contact", "/contact"], ["Pricing", "/pricing"], ["Methodology", "/methodology"], ["Editorial Policy", "/editorial-policy"], ["Sitemap", "/sitemap"]].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-tight">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Legal</h4>
                  <span aria-hidden="true" className="mt-2 block h-0.5 w-6 rounded bg-[#D97706]" />
                </div>
                <ul className="flex flex-col gap-2.5">
                  {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookies"], ["Disclaimer", "/disclaimer"]].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-tight">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full shrink-0 rounded-3xl border border-[#064E3B]/15 bg-[#064E3B]/5 p-6 md:p-8 lg:w-[28rem]">
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-foreground">Guides</h4>
              <span aria-hidden="true" className="mt-2 block h-0.5 w-6 rounded bg-[#D97706]" />
            </div>
            <ul className="mb-5 flex flex-col gap-3">
              {GUIDES.slice(0, 4).map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/guides/${guide.slug}`} className="text-[14px] font-medium leading-snug text-foreground/90 transition-colors hover:text-[#064E3B] dark:hover:text-emerald-400">
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2">
              <Link href="/guides" className="text-xs font-semibold text-primary hover:underline underline-offset-2">
                All guides &rarr;
              </Link>
              <Link href="/guides/states" className="text-xs font-semibold text-primary hover:underline underline-offset-2">
                State tax guides &rarr;
              </Link>
            </div>
          </div>
        </div>

                {/* Bottom Tier: Legal & GEO */}
        <div className="pt-8 border-t flex flex-col gap-5">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground md:order-3 md:w-full md:justify-between md:border-t md:border-border/50 md:pt-6">
            <span>&copy; {currentYear} DailyFinance.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>    <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Design & Developed by <span className="font-semibold text-foreground">wpkashif</span>
            </Link></span>
          </div>

          <p className="mx-auto max-w-2xl text-center text-xs leading-relaxed text-muted-foreground md:hidden">
            DailyFinance.tools offers free educational calculators and guides. Results are estimates only — not financial, tax or investment advice.
          </p>


          {/* Desktop only: the disclaimer as a designed strip in the same slot */}
          <div className="hidden items-start gap-3 rounded-2xl border border-[#064E3B]/15 bg-[#064E3B]/5 px-5 py-4 md:order-2 md:flex">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#064E3B] dark:text-emerald-400" />
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">Estimates, not advice.</strong>{" "}
              DailyFinance.tools offers free educational calculators and guides — every result is an estimate based on the inputs and assumptions shown, not financial, tax or investment advice. For decisions about your own money, verify the figures with official sources or a qualified professional. Read the full{" "}
              <Link href="/disclaimer" className="font-semibold text-[#064E3B] hover:underline dark:text-emerald-400">Disclaimer</Link>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:hidden">
            <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/methodology" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Methodology
            </Link>
            <Link href="/editorial-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Editorial Policy
            </Link>
            <Link href="/sitemap" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </Link>
            <Link href="/guides" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Guides
            </Link>
            <Link href="/guides/states" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              State Tax Guides
            </Link>
            <Link href="/tools" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              All 100 Tools
            </Link>
            <Link href="/locations" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Calculators by State
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
            <Link href="/disclaimer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
