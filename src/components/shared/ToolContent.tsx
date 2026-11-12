import { Zap, Sigma, Calculator } from "lucide-react"
import { TOOL_CONTENT, type ToolContentEntry } from "@/data/tool-content"
import { navigationCategories } from "@/config/navigation"

/**
 * ToolContent — renders the editorial content block under a calculator.
 *
 * ONE layout for every tool (Kashif, 2026-11-12): all 114 tool pages share
 * the same structure so the site reads as one crafted product, not a set of
 * experiments. The words are unique per tool (see src/data/tool-content.ts);
 * the frame is identical:
 *
 *   1. Quick-answer hero (40–60 words, AEO) — no meta blocks (no read time,
 *      no counts; Kashif, 2026-11-12: keep it a clean tool content page)
 *   2. "How the <Tool> works, step by step" — numbered step cards
 *   3. The formula — dark banner (when the tool has one)
 *   4. Worked example — worksheet-style dashed card, with real numbers
 *
 * FAQs are NOT rendered here: ToolLayout renders them from its faqs prop
 * (and emits the FAQ schema), so pages pass entry.faqs to ToolLayout.
 *
 * Every content key in use resolves to an entry (verified by
 * scripts/check-site.mjs), so a missing entry renders nothing rather than
 * any placeholder panel.
 */

const HEADING_STOPWORDS = new Set(["vs", "and", "or", "of", "the", "to", "a", "an"])

/** Display name for the tool a content entry belongs to — the exact
 *  navigation title when the slug is registered, else a title-cased slug.
 *  Used so section headings carry the tool's keyword (Brian Dean on-page
 *  guidance: descriptive, keyword-bearing H2s) instead of a generic label. */
function toolNameFor(contentKey: string): string {
  const slug = contentKey.split("/").pop() ?? contentKey
  for (const cat of navigationCategories) {
    const tool = cat.calculators.find((c) => c.slug === slug)
    if (tool) return tool.title
  }
  return slug
    .split("-")
    .map((w, i) => {
      if (w === "401k") return "401(k)"
      if (i > 0 && HEADING_STOPWORDS.has(w)) return w
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(" ")
}

const eyebrow =
  "flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#064E3B] dark:text-emerald-400 mb-2"

export function ToolContent({ contentKey }: { contentKey: string }) {
  const entry = TOOL_CONTENT[contentKey]
  if (!entry) return null

  const toolName = toolNameFor(contentKey)

  return (
    <div>
      <section
        aria-label="Quick answer"
        className="not-prose rounded-3xl bg-gradient-to-br from-[#064E3B]/10 via-[#064E3B]/5 to-transparent dark:from-emerald-400/15 dark:via-emerald-400/5 border border-[#064E3B]/15 dark:border-emerald-400/20 px-6 py-6 md:px-8 md:py-7 mb-12"
      >
        <p className={eyebrow}>
          <Zap className="h-4 w-4" /> Quick answer
        </p>
        <p className="text-lg md:text-xl leading-relaxed font-medium text-neutral-900 dark:text-white m-0">
          {entry.quickAnswer}
        </p>
      </section>

      <section aria-label="How it works">
        <div className="content-prose">
          <h2>How the {toolName} works, step by step</h2>
        </div>
        <ol className="not-prose space-y-4 mt-6 list-none p-0">
          {entry.howItWorks.map((paragraph, i) => (
            <li
              key={i}
              className="flex gap-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 md:p-6"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#064E3B] text-white text-sm font-extrabold"
              >
                {i + 1}
              </span>
              <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 m-0 pt-1">
                {paragraph}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {entry.formula && (
        <section aria-label="Formula" className="not-prose my-10">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
            <Sigma className="h-4 w-4" /> The formula
          </p>
          <p className="font-mono text-sm md:text-base bg-[#064E3B] text-emerald-50 rounded-2xl px-6 py-5 leading-relaxed shadow-sm">
            {entry.formula}
          </p>
        </section>
      )}

      <section
        aria-label="Worked example"
        className="not-prose mt-12 border-2 border-dashed border-[#064E3B]/30 dark:border-emerald-400/30 rounded-2xl bg-white dark:bg-neutral-950 overflow-hidden"
      >
        <p className="flex items-center gap-2 bg-[#064E3B]/5 dark:bg-emerald-400/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#064E3B] dark:text-emerald-400 m-0">
          <Calculator className="h-4 w-4" /> Worked example — try it on the
          calculator above
        </p>
        <div className="px-6 py-6 md:px-8">
          <h2 className="text-lg md:text-xl font-bold tracking-tight mb-3 text-neutral-900 dark:text-white">
            {entry.example.title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 m-0">
            {entry.example.body}
          </p>
        </div>
      </section>
    </div>
  )
}
