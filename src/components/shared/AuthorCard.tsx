import Image from "next/image"
import Link from "next/link"

/**
 * The EEAT author bio card — Tahir Shehzad, ACMA. One shared component used
 * on tool pages (ToolLayout) and guides (GuideArticle) so the box stays
 * identical everywhere. The name links to /about, which carries his full bio.
 */
export function AuthorCard() {
  return (
    <section className="mt-10 md:mt-16 bg-card border border-border/50 rounded-2xl p-5 md:p-8 flex flex-col sm:flex-row gap-5 md:gap-8 items-start shadow-sm">
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border border-border/50 shadow-sm">
        <Image src="/team/tahir-shehzad.jpg" alt="Tahir Shehzad - ACMA" fill sizes="(max-width: 768px) 64px, 80px" className="object-cover" />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1 md:mb-2">
          <h3 className="text-lg md:text-2xl font-bold m-0 text-foreground tracking-tight">
            <Link href="/about" className="hover:underline underline-offset-4">Tahir Shehzad</Link>
          </h3>
          <a href="https://www.linkedin.com/in/tahir-shehzad-acma1993/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0a66c2] transition-colors" aria-label="Tahir Shehzad on LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full md:ml-1">ACMA Qualified</span>
        </div>
        <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-primary mb-3 mt-0">
          Assistant Manager, Accounts &amp; Finance
        </p>
        <p className="text-sm text-muted-foreground m-0 leading-relaxed max-w-2xl">
          Running finance for a multi-entity group — IFRS reporting, Odoo &amp; QuickBooks, payroll, taxation and SECP compliance. His models ensure that independent professionals price their services for sustainable, long-term profitability.
        </p>
      </div>
    </section>
  )
}
