import Link from 'next/link'
import { navigationCategories, getToolUrl } from '@/config/navigation'
import { Logo } from '@/components/layout/Logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

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
    <footer className="border-t bg-background pt-16 pb-8 relative overflow-hidden">
      
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

        {/* Middle Tier: The SEO Mega Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-12 mb-16">
          {navigationCategories.map((category) => (
            <div key={category.slug} className="flex flex-col gap-4">
              <Link 
                href={`/tools/${category.seoSlug}`}
                className="font-semibold text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                {category.name} Tools
              </Link>
              <ul className="flex flex-col gap-2.5">
                {category.calculators.map((calc) => (
                  <li key={calc.slug}>
                    <Link 
                      href={getToolUrl(calc.slug)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors leading-tight line-clamp-2"
                    >
                      {calc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Financial Disclaimer */}
        <div className="pt-8 pb-4 text-center">
          <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-5xl mx-auto">
            <strong className="text-muted-foreground font-semibold">Disclaimer:</strong> The calculators, estimators, and tools provided by DailyFinance are designed for educational and informational purposes only. They do not constitute professional financial, tax, or legal advice. While we strive for absolute mathematical accuracy, your specific financial situation is unique. You should always consult with a qualified financial advisor, CPA, or certified professional before making any significant financial or business decisions.
          </p>
        </div>

        {/* Bottom Tier: Legal & GEO */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>&copy; {currentYear} DailyFinance.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>    <Link href="https://facebook.com/invisibl3jin"  className="text-xs text-muted-foreground hover:text-foreground transition-colors" target="_blank">
              Design & Developed by <span className="font-semibold text-foreground">wpkashif</span>
            </Link></span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
