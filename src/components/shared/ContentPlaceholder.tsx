import Link from "next/link"
import { BookOpen, PenLine, ArrowRight } from "lucide-react"

/**
 * ContentPlaceholder — reserves the editorial space under a calculator.
 * Kashif's plan (2026-11-06): tools ship fully functional now; the long-form
 * guide content for each tool page is written later into this slot.
 * Renders an honest "guide in preparation" panel plus internal links so the
 * page still routes readers to finished content (guides + state guides).
 */
export function ContentPlaceholder({ toolName, hubHref, hubName }: { toolName: string; hubHref?: string; hubName?: string }) {
  return (
    <section className="border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl p-6 md:p-10 mb-12 bg-neutral-50/60 dark:bg-neutral-900/40">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-11 h-11 rounded-xl bg-[#064E3B]/10 flex items-center justify-center">
          <PenLine className="h-5 w-5 text-[#064E3B] dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-2">The {toolName} guide is being written</h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            The calculator above is complete and fully working. The in-depth guide for this page — worked examples,
            the formula explained step by step, common mistakes and answers to frequent questions — is in preparation
            and will be published here. Until then, these finished guides cover the same ground:
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-semibold bg-[#064E3B] text-white px-4 py-2.5 rounded-full hover:bg-[#053f30] transition-colors">
              <BookOpen className="h-4 w-4" /> Browse all guides
            </Link>
            <Link href="/guides/states" className="inline-flex items-center gap-2 text-sm font-semibold border border-neutral-300 dark:border-neutral-700 px-4 py-2.5 rounded-full hover:border-[#064E3B] hover:text-[#064E3B] dark:hover:text-emerald-400 transition-colors">
              State-by-state guides <ArrowRight className="h-4 w-4" />
            </Link>
            {hubHref && hubName && (
              <Link href={hubHref} className="inline-flex items-center gap-2 text-sm font-semibold border border-neutral-300 dark:border-neutral-700 px-4 py-2.5 rounded-full hover:border-[#064E3B] hover:text-[#064E3B] dark:hover:text-emerald-400 transition-colors">
                More {hubName} tools <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
