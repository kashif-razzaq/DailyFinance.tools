import {
  Zap,
  Sigma,
  Calculator,
  Clock,
  ListOrdered,
  MessagesSquare,
  BookOpen,
} from "lucide-react"
import { TOOL_CONTENT, type ToolContentEntry } from "@/data/tool-content"
import { navigationCategories } from "@/config/navigation"

/**
 * ToolContent — renders the editorial content block under a calculator.
 *
 * The words are unique per tool (see src/data/tool-content.ts); the frame is
 * not allowed to be. Four genuinely different layouts rotate across tools,
 * assigned deterministically from the content key so a given tool always
 * renders the same design while neighbouring tools look crafted, not stamped:
 *
 *   V1 "Guide"     — quick-answer hero, numbered step cards, dark formula
 *                    banner, worksheet-style example card.
 *   V2 "Two-column"— slim quick-answer callout, prose column beside a sticky
 *                    rail holding the formula and the example.
 *   V3 "Story"     — plain lede, the example first as a dark scenario panel,
 *                    method after, formula as an inline code strip.
 *   V4 "Dashboard" — quick answer plus a stats strip derived from the entry
 *                    itself, method in a card grid, formula and example
 *                    side by side.
 *
 * FAQs are NOT rendered here: ToolLayout renders them from its faqs prop
 * (and emits the FAQ schema), so pages pass entry.faqs to ToolLayout.
 *
 * Every content key in use resolves to an entry (verified by
 * scripts/check-site.mjs), so a missing entry renders nothing rather than
 * any placeholder panel.
 */

type Variant = 0 | 1 | 2 | 3

/** FNV-1a hash of the content key → stable variant per tool. */
function variantFor(contentKey: string): Variant {
  let h = 0x811c9dc5
  for (let i = 0; i < contentKey.length; i++) {
    h ^= contentKey.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return ((h >>> 0) % 4) as Variant
}


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

function entryWordCount(entry: ToolContentEntry): number {
  const parts = [
    entry.quickAnswer,
    ...entry.howItWorks,
    entry.example.title,
    entry.example.body,
    entry.formula ?? "",
  ]
  return parts.join(" ").split(/\s+/).filter(Boolean).length
}

function readingMinutes(entry: ToolContentEntry): number {
  return Math.max(1, Math.round(entryWordCount(entry) / 200))
}

const eyebrow =
  "flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#064E3B] dark:text-emerald-400 mb-2"

/* ------------------------------------------------------------------ */
/* Shared pieces (each variant arranges and weights them differently)  */
/* ------------------------------------------------------------------ */

function FormulaBanner({ formula }: { formula: string }) {
  return (
    <section aria-label="Formula" className="not-prose my-10">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
        <Sigma className="h-4 w-4" /> The formula
      </p>
      <p className="font-mono text-sm md:text-base bg-[#064E3B] text-emerald-50 rounded-2xl px-6 py-5 leading-relaxed shadow-sm">
        {formula}
      </p>
    </section>
  )
}

function FormulaStrip({ formula }: { formula: string }) {
  return (
    <section
      aria-label="Formula"
      className="not-prose mt-10 flex items-start gap-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4"
    >
      <Sigma className="h-5 w-5 shrink-0 text-[#064E3B] dark:text-emerald-400 mt-0.5" />
      <p className="font-mono text-sm leading-relaxed m-0">
        <span className="font-sans font-bold text-neutral-900 dark:text-white mr-2">
          Formula:
        </span>
        {formula}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* V1 — "Guide": hero answer, numbered steps, banner, worksheet        */
/* ------------------------------------------------------------------ */

function VariantGuide({ entry, toolName }: { entry: ToolContentEntry; toolName: string }) {
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

      {entry.formula && <FormulaBanner formula={entry.formula} />}

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

/* ------------------------------------------------------------------ */
/* V2 — "Two-column": callout, prose + sticky rail                     */
/* ------------------------------------------------------------------ */

function VariantTwoColumn({ entry, toolName }: { entry: ToolContentEntry; toolName: string }) {
  return (
    <div>
      <section
        aria-label="Quick answer"
        className="not-prose border-l-4 border-[#064E3B] bg-[#064E3B]/5 dark:bg-emerald-400/10 rounded-r-2xl px-6 py-5 mb-10"
      >
        <p className={eyebrow}>
          <Zap className="h-4 w-4" /> Quick answer
        </p>
        <p className="text-base md:text-lg leading-relaxed text-neutral-800 dark:text-neutral-100 m-0">
          {entry.quickAnswer}
        </p>
      </section>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 items-start">
        <section aria-label="How it works" className="content-prose">
          <h2 className="mt-0">How the {toolName} works</h2>
          {entry.howItWorks.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>

        <aside className="not-prose mt-10 lg:mt-0 lg:sticky lg:top-24 space-y-5">
          {entry.formula && (
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50 dark:bg-neutral-900 p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-3">
                <Sigma className="h-4 w-4" /> The formula
              </p>
              <p className="font-mono text-[13px] leading-relaxed text-neutral-800 dark:text-neutral-100 m-0">
                {entry.formula}
              </p>
            </div>
          )}
          <div className="border border-[#064E3B]/20 dark:border-emerald-400/25 rounded-2xl bg-[#064E3B]/5 dark:bg-emerald-400/10 p-5">
            <p className={eyebrow}>
              <Calculator className="h-4 w-4" /> Worked example
            </p>
            <h2 className="text-base font-bold tracking-tight mb-2 text-neutral-900 dark:text-white">
              {entry.example.title}
            </h2>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 m-0">
              {entry.example.body}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* V3 — "Story": lede, example first, method after, inline formula     */
/* ------------------------------------------------------------------ */

function VariantStory({ entry, toolName }: { entry: ToolContentEntry; toolName: string }) {
  return (
    <div>
      <section aria-label="Quick answer" className="not-prose mb-10">
        <p className={eyebrow}>
          <BookOpen className="h-4 w-4" /> The short answer
        </p>
        <p className="text-xl md:text-2xl leading-relaxed font-medium text-neutral-900 dark:text-white m-0">
          {entry.quickAnswer}
        </p>
      </section>

      <section
        aria-label="Worked example"
        className="not-prose rounded-3xl bg-[#064E3B] text-white px-6 py-7 md:px-9 md:py-9 mb-12 shadow-md"
      >
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-200 mb-3">
          <Calculator className="h-4 w-4" /> See it with real numbers
        </p>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-white">
          {entry.example.title}
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-emerald-50/90 m-0">
          {entry.example.body}
        </p>
      </section>

      <section aria-label="How it works" className="content-prose">
        <h2>How the {toolName} works</h2>
        {entry.howItWorks.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>

      {entry.formula && <FormulaStrip formula={entry.formula} />}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* V4 — "Dashboard": answer + entry-derived stats, card grid, pair     */
/* ------------------------------------------------------------------ */

function VariantDashboard({ entry, toolName }: { entry: ToolContentEntry; toolName: string }) {
  const minutes = readingMinutes(entry)
  const tiles: { icon: React.ReactNode; value: string; label: string }[] = [
    {
      icon: <Clock className="h-4 w-4" />,
      value: `${minutes} min`,
      label: "Reading time for this guide",
    },
    {
      icon: <MessagesSquare className="h-4 w-4" />,
      value: String(entry.faqs.length),
      label: "Questions answered below",
    },
    entry.formula
      ? {
          icon: <Sigma className="h-4 w-4" />,
          value: "In full",
          label: "The formula, shown below",
        }
      : {
          icon: <ListOrdered className="h-4 w-4" />,
          value: String(entry.howItWorks.length),
          label: "Parts to how it works",
        },
  ]

  return (
    <div>
      <section
        aria-label="Quick answer"
        className="not-prose border border-neutral-200 dark:border-neutral-800 rounded-2xl px-6 py-5 bg-white dark:bg-neutral-950 mb-6"
      >
        <p className={eyebrow}>
          <Zap className="h-4 w-4" /> Quick answer
        </p>
        <p className="text-base md:text-lg leading-relaxed text-neutral-800 dark:text-neutral-100 m-0">
          {entry.quickAnswer}
        </p>
      </section>

      <dl
        aria-label="About this guide"
        className="not-prose grid grid-cols-3 gap-3 md:gap-4 mb-12"
      >
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50 dark:bg-neutral-900 px-4 py-4 text-center"
          >
            <dt className="order-2 flex items-center justify-center gap-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1">
              {tile.icon}
              {tile.label}
            </dt>
            <dd className="order-1 text-xl md:text-2xl font-extrabold tracking-tight text-[#064E3B] dark:text-emerald-400 m-0">
              {tile.value}
            </dd>
          </div>
        ))}
      </dl>

      <section aria-label="How it works">
        <div className="content-prose">
          <h2>How the {toolName} works</h2>
        </div>
        <div className="not-prose grid md:grid-cols-2 gap-4 mt-6">
          {entry.howItWorks.map((paragraph, i) => (
            <div
              key={i}
              className="border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-950 p-5 md:p-6"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#064E3B] dark:text-emerald-400 mb-2">
                Part {i + 1} of {entry.howItWorks.length}
              </p>
              <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 m-0">
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="not-prose grid md:grid-cols-2 gap-4 mt-10 items-stretch">
        {entry.formula ? (
          <section
            aria-label="Formula"
            className="border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50 dark:bg-neutral-900 p-6"
          >
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-3">
              <Sigma className="h-4 w-4" /> The formula
            </p>
            <p className="font-mono text-sm leading-relaxed text-neutral-800 dark:text-neutral-100 m-0">
              {entry.formula}
            </p>
          </section>
        ) : (
          <section
            aria-label="Worked example"
            className="border border-[#064E3B]/20 dark:border-emerald-400/25 rounded-2xl bg-[#064E3B]/5 dark:bg-emerald-400/10 p-6 md:col-span-2"
          >
            <p className={eyebrow}>
              <Calculator className="h-4 w-4" /> Worked example
            </p>
            <h2 className="text-lg font-bold tracking-tight mb-2 text-neutral-900 dark:text-white">
              {entry.example.title}
            </h2>
            <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 m-0">
              {entry.example.body}
            </p>
          </section>
        )}
        {entry.formula && (
          <section
            aria-label="Worked example"
            className="border border-[#064E3B]/20 dark:border-emerald-400/25 rounded-2xl bg-[#064E3B]/5 dark:bg-emerald-400/10 p-6"
          >
            <p className={eyebrow}>
              <Calculator className="h-4 w-4" /> Worked example
            </p>
            <h2 className="text-lg font-bold tracking-tight mb-2 text-neutral-900 dark:text-white">
              {entry.example.title}
            </h2>
            <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 m-0">
              {entry.example.body}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function ToolContent({ contentKey }: { contentKey: string }) {
  const entry = TOOL_CONTENT[contentKey]
  if (!entry) return null

  const toolName = toolNameFor(contentKey)
  switch (variantFor(contentKey)) {
    case 0:
      return <VariantGuide entry={entry} toolName={toolName} />
    case 1:
      return <VariantTwoColumn entry={entry} toolName={toolName} />
    case 2:
      return <VariantStory entry={entry} toolName={toolName} />
    case 3:
      return <VariantDashboard entry={entry} toolName={toolName} />
  }
}
