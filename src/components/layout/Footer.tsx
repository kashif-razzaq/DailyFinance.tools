import Link from 'next/link'
import { GUIDES } from '@/data/guides'
import { HUBS } from '@/data/hubs'
import { navigationCategories } from '@/config/navigation'
import { FooterAccordion } from '@/components/layout/FooterAccordion'
import { ActiveLink } from '@/components/layout/ActiveLink'
import { CookieSettingsButton } from '@/components/shared/CookieConsent'
import { Logo } from '@/components/layout/Logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, ShieldCheck } from 'lucide-react'

// Facebook icon (simple-icons path, same as GuideShare). Facebook is the
// site's only social profile (Kashif, 2026-11-22) — the old X / LinkedIn /
// GitHub icons were dead "#" placeholders and were removed.
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background pt-16 pb-28 md:pb-8 relative overflow-hidden print:hidden">
      
      {/* Giant Background Watermark */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none flex items-center justify-center opacity-[0.02] dark:opacity-[0.03]">
        <span className="text-[12vw] font-black tracking-tighter whitespace-nowrap text-primary">
          DAILYFINANCE
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        
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
            {/* Social Icons — Facebook only (Kashif, 2026-11-22). */}
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/dailyfinancetools" target="_blank" rel="noopener noreferrer" aria-label="Daily Finance Tools on Facebook" className="text-muted-foreground hover:text-[#1877F2] transition-colors -ml-3.5 flex h-12 w-12 items-center justify-center rounded-full hover:bg-primary/5">
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="w-full lg:max-w-md bg-muted/30 p-6 rounded-2xl border backdrop-blur-sm">
            {/* ARB fix round 2 (#7): the newsletter heading was an H4 following
                the last content H2 (H2→H4 skip on every page). It is an H2
                now; the column headings below are H3s, so the footer no
                longer skips a level. Same styling, same look. */}
            <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Join the Weekly Compound
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              Get one actionable financial model or calculator breakdown sent to your inbox every Sunday. No fluff.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="name@example.com" 
                className="bg-background h-12 rounded-xl"
              />
              <Button type="button" className="h-12 rounded-xl font-semibold px-6 bg-primary hover:bg-primary/90">
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
                  <h3 className="font-semibold text-sm text-foreground">Categories</h3>
                  <span aria-hidden="true" className="mt-2 block h-0.5 w-6 rounded bg-[#D97706]" />
                </div>
                <ul className="flex flex-col gap-2.5">
                  {navigationCategories.map((category) => (
                    <li key={category.slug}>
                      <ActiveLink href={`/${category.slug}`} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-tight">
                        {category.name}
                      </ActiveLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Important</h3>
                  <span aria-hidden="true" className="mt-2 block h-0.5 w-6 rounded bg-[#D97706]" />
                </div>
                <ul className="flex flex-col gap-2.5">
                  {[["About", "/about"], ["Contact", "/contact"], ["Pricing", "/pricing"], ["Embed calculators", "/embed"], ["Methodology", "/methodology"], ["Editorial Policy", "/editorial-policy"], ["Sitemap", "/sitemap"]].map(([label, href]) => (
                    <li key={href}>
                      <ActiveLink href={href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-tight">
                        {label}
                      </ActiveLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Legal</h3>
                  <span aria-hidden="true" className="mt-2 block h-0.5 w-6 rounded bg-[#D97706]" />
                </div>
                <ul className="flex flex-col gap-2.5">
                  {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookies"], ["Disclaimer", "/disclaimer"], ["Corrections Policy", "/corrections-policy"]].map(([label, href]) => (
                    <li key={href}>
                      <ActiveLink href={href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-tight">
                        {label}
                      </ActiveLink>
                    </li>
                  ))}
                  <li>
                    <CookieSettingsButton className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-tight" />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full shrink-0 rounded-3xl border border-[#064E3B]/15 bg-[#064E3B]/5 p-6 md:p-8 lg:w-[28rem]">
            <div className="mb-4">
              <h3 className="font-semibold text-sm text-foreground">Guides</h3>
              <span aria-hidden="true" className="mt-2 block h-0.5 w-6 rounded bg-[#D97706]" />
            </div>
            <ul className="mb-5 flex flex-col gap-3">
              {GUIDES.slice(0, 4).map((guide) => (
                <li key={guide.slug}>
                  <ActiveLink href={`/guides/${guide.slug}`} activeClassName="text-[#064E3B] underline underline-offset-4 decoration-2 dark:text-emerald-400" className="text-[14px] font-medium leading-snug text-foreground/90 transition-colors hover:text-[#064E3B] dark:hover:text-emerald-400">
                    {guide.title}
                  </ActiveLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2">
              <ActiveLink href="/guides" activeClassName="underline underline-offset-2" className="text-xs font-semibold text-primary hover:underline underline-offset-2">
                All guides &rarr;
              </ActiveLink>
              <ActiveLink href="/guides/states" activeClassName="underline underline-offset-2" className="text-xs font-semibold text-primary hover:underline underline-offset-2">
                State tax guides &rarr;
              </ActiveLink>
            </div>
            {/* Calculator hubs — the six /hubs/ topic pages. Footer-linked so
                every hub has inbound links from every page (ARB SI12). */}
            <div className="mt-5 border-t border-[#064E3B]/10 pt-4">
              <p className="mb-2 text-xs font-semibold text-foreground">Calculator hubs</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {HUBS.map((hub) => (
                  <li key={hub.slug}>
                    <ActiveLink href={`/hubs/${hub.slug}`} activeClassName="underline underline-offset-2" className="text-xs font-medium text-foreground/80 transition-colors hover:text-[#064E3B] hover:underline underline-offset-2 dark:hover:text-emerald-400">
                      {hub.title.replace(' calculators', '')}
                    </ActiveLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

                {/* Bottom Tier: Legal & GEO */}
        <div className="pt-8 border-t flex flex-col gap-5">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground md:order-3 md:w-full md:justify-between md:border-t md:border-border/50 md:pt-6">
            <span>&copy; {currentYear} DailyFinance.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>    <ActiveLink href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Design & Developed by <span className="font-semibold text-foreground">wpkashif</span>
            </ActiveLink></span>
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
              <ActiveLink href="/disclaimer" activeClassName="underline" className="font-semibold text-[#064E3B] hover:underline dark:text-emerald-400">Disclaimer</ActiveLink>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:hidden">
            <ActiveLink href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              About
            </ActiveLink>
            <ActiveLink href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </ActiveLink>
            <ActiveLink href="/methodology" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Methodology
            </ActiveLink>
            <ActiveLink href="/editorial-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Editorial Policy
            </ActiveLink>
            <ActiveLink href="/sitemap" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </ActiveLink>
            <ActiveLink href="/guides" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Guides
            </ActiveLink>
            <ActiveLink href="/guides/states" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              State Tax Guides
            </ActiveLink>
            <ActiveLink href="/tools" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              All 100 Tools
            </ActiveLink>
            <ActiveLink href="/locations" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Calculators by State
            </ActiveLink>
            <ActiveLink href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </ActiveLink>
            <ActiveLink href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </ActiveLink>
            <ActiveLink href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </ActiveLink>
            <ActiveLink href="/disclaimer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Disclaimer
            </ActiveLink>
            <ActiveLink href="/corrections-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Corrections Policy
            </ActiveLink>
            <CookieSettingsButton className="text-xs text-muted-foreground hover:text-foreground transition-colors" />
          </div>
        </div>

      </div>
    </footer>
  )
}
