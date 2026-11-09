/**
 * Scaffold a tool page in the CURRENT site standard (post Round-3 wiring).
 *
 * Usage:
 *   npm run new-tool -- <rank>                       planned Top-100 tool from the registry
 *   npm run new-tool -- <category>/<slug> [flags]    brand-new tool (goes to EXTRA_LIVE_TOOLS)
 *     flags: --name "Percentage Calculator"  (default: title-cased slug)
 *            --keyword "percentage calculator" (default: name, lowercased)
 *            --hub "Personal Finance"          (default: mapped from category)
 *
 * What it generates (fully wired, no empty shells):
 *   src/app/<category>/<slug>/page.tsx            generateCalculatorMetadata +
 *                                                 ToolLayout (faqs from TOOL_CONTENT) +
 *                                                 <ToolContent contentKey> children
 *   src/app/<category>/<slug>/CalculatorClient.tsx working starter calculator in the
 *                                                 house layout (inputs left, emerald
 *                                                 result panel right). Its growth
 *                                                 formula is a STARTER — replace it
 *                                                 with the tool's real formula.
 *
 * Slug mode also performs the two mechanical data edits (idempotent — safe to
 * re-run; existing entries are detected and skipped):
 *   - appends the tool to EXTRA_LIVE_TOOLS in src/config/tool-registry.ts
 *   - appends the tool to its category in src/config/navigation.ts
 * Rank mode leaves registry/navigation untouched: flipping a planned tool live
 * is a publish decision (TOOL-PRODUCTION-SYSTEM.md Stage 7) — the printed
 * checklist gives the exact edits.
 *
 * The TOOL_CONTENT entry is NEVER auto-written: real content is an editorial
 * step (voice + worked-example accuracy rules in SITE-MANAGEMENT.md). The
 * checklist prints the exact snippet to paste. Until the entry exists the page
 * renders the ContentPlaceholder fallback and `npm run check-site` FAILS —
 * that is deliberate: no placeholder page can slip through.
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs"

const args = process.argv.slice(2)
const positional = args.filter((a) => !a.startsWith("--"))
const flag = (name) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : undefined
}
const target = positional[0]
if (!target) {
  console.error("Usage: npm run new-tool -- <rank> | <category>/<slug> [--name \"...\"] [--keyword \"...\"] [--hub \"...\"]")
  process.exit(1)
}

const HUB_BY_CATEGORY = {
  "personal-wealth": "Personal Finance",
  "real-estate": "Mortgage & Real Estate",
  "loans": "Loans & Debt",
  "tax": "Salary, Tax, Retirement & Investing",
  "freelance": "Freelance & Business",
  "creator": "Creator & E-Commerce",
  "ecommerce": "Creator & E-Commerce",
}
const titleCase = (slug) =>
  slug.split("-").map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(" ")

let category, slug, name, keyword, hub, mode
if (/^\d+$/.test(target)) {
  // ---- rank mode: planned tool from the registry ----
  mode = "rank"
  const rank = parseInt(target, 10)
  const registry = readFileSync("src/config/tool-registry.ts", "utf8")
  const entries = [...registry.matchAll(/^\s*(\{"rank".*\}),?$/gm)].map((m) => JSON.parse(m[1]))
  const tool = entries.find((e) => e.rank === rank)
  if (!tool) { console.error(`Rank ${rank} not found in registry`); process.exit(1) }
  if (tool.status === "live") { console.error(`#${rank} ${tool.name} is already live at ${tool.url}`); process.exit(1) }
  const parts = tool.plannedUrl.split("/").filter(Boolean)
  category = parts[0]
  slug = parts.slice(1).join("/")
  name = tool.name
  keyword = tool.keyword
  hub = tool.hub
} else if (target.includes("/")) {
  // ---- slug mode: brand-new tool ----
  mode = "slug"
  const parts = target.split("/").filter(Boolean)
  category = parts[0]
  slug = parts.slice(1).join("/")
  if (!HUB_BY_CATEGORY[category]) {
    console.error(`Unknown category "${category}". Use one of: ${Object.keys(HUB_BY_CATEGORY).join(", ")}`)
    process.exit(1)
  }
  name = flag("name") || titleCase(slug)
  keyword = flag("keyword") || name.toLowerCase()
  hub = flag("hub") || HUB_BY_CATEGORY[category]
} else {
  console.error(`"${target}" is neither a rank nor a <category>/<slug> path.`)
  process.exit(1)
}

const contentKey = `${category}/${slug}`
const url = `/${contentKey}`
const year = new Date().getFullYear()
const dir = `src/app/${contentKey}`
const description = `Use our free ${name} to calculate ${keyword} results instantly. Includes the formula, a worked example and FAQs. No signup required.`

// ---------- CalculatorClient.tsx (working starter, house pattern) ----------
const calculatorClient = `/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

// STARTER MODEL for "${name}": the layout, inputs and result panel follow the
// house standard, but the maths below is a generic compound-growth model.
// Replace the formula inside useMemo with this tool's real formula before
// publishing (SITE-MANAGEMENT.md, "Add a tool end-to-end", step 4).
const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function PctSlider({ label, value, onChange, min = 0, max = 20, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [principal, setPrincipal] = useState(10000)
  const [monthly, setMonthly] = useState(250)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(10)

  const r = useMemo(() => {
    const m = rate / 100 / 12
    const n = Math.max(0, Math.round(years * 12))
    const growth = Math.pow(1 + m, n)
    const futureValue = principal * growth + (m > 0 ? monthly * ((growth - 1) / m) : monthly * n)
    const contributed = principal + monthly * n
    return { futureValue, contributed, interest: futureValue - contributed }
  }, [principal, monthly, rate, years])

  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Starting amount" value={principal} onChange={setPrincipal} />
      <MoneyInput label="Monthly contribution" value={monthly} onChange={setMonthly} />
      <PctSlider label="Annual rate" value={rate} onChange={setRate} min={0} max={15} step={0.1} />
      <div className="space-y-2"><label className="text-sm font-semibold">Years</label>
        <Input type="number" value={years === 0 ? '' : years} onChange={(e) => setYears(num(e.target.value))} className="font-mono" /></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="${name} — result">
        <div className="text-4xl font-black font-mono">{fmt(r.futureValue)}</div>
        <p className="text-white/80 mt-2 text-sm">Projected value after {years} years at {rate}%</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">You contribute</p><p className="font-mono text-xl font-bold">{fmt(r.contributed)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Growth</p><p className="font-mono text-xl font-bold">{fmt(r.interest)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6 text-sm text-muted-foreground leading-relaxed"><strong className="text-foreground">Starter model.</strong> This calculator ships with a generic compound-growth model so the page works end to end. Replace it with the real ${keyword} formula before publishing.{isPro ? '' : ''}</div>
    </div></div>)
}
`

// ---------- page.tsx (current wired standard) ----------
const pageTsx = `import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: '${name} – Free, Instant Results (${year})', description: '${description}', keywords: ['${keyword}'], slug: "${contentKey}", category: "${hub}" });

export default function Page() {
  return (
    <ToolLayout title="${name}" description="${description}" slug="${slug}" faqs={TOOL_CONTENT["${contentKey}"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="${contentKey}" />}
    </ToolLayout>
  )
}
`

// ---------- write files (idempotent: never overwrite) ----------
mkdirSync(dir, { recursive: true })
const written = []
for (const [file, body] of [["page.tsx", pageTsx], ["CalculatorClient.tsx", calculatorClient]]) {
  const path = `${dir}/${file}`
  if (existsSync(path)) { written.push(`SKIP ${path} (already exists)`); continue }
  writeFileSync(path, body)
  written.push(`WROTE ${path}`)
}

// ---------- mechanical data edits (slug mode only, idempotent) ----------
const dataEdits = []
if (mode === "slug") {
  // registry: append to EXTRA_LIVE_TOOLS
  const regPath = "src/config/tool-registry.ts"
  let reg = readFileSync(regPath, "utf8")
  if (reg.includes(`"url": "${url}"`)) {
    dataEdits.push(`SKIP registry (EXTRA_LIVE_TOOLS already has ${url})`)
  } else {
    const extraAt = reg.indexOf("EXTRA_LIVE_TOOLS")
    const closeAt = reg.indexOf("\n]", extraAt)
    if (extraAt < 0 || closeAt < 0) { console.error("Could not locate EXTRA_LIVE_TOOLS array end — add the registry entry by hand."); process.exit(1) }
    const line = `  {"name": "${name}", "hub": "${hub}", "status": "live", "url": "${url}"},`
    reg = reg.slice(0, closeAt) + `\n${line}` + reg.slice(closeAt)
    writeFileSync(regPath, reg)
    dataEdits.push(`DONE registry: appended EXTRA_LIVE_TOOLS entry for ${url}`)
  }
  // navigation: append to the category's calculators array
  const navPath = "src/config/navigation.ts"
  let nav = readFileSync(navPath, "utf8")
  const catHead = nav.indexOf(`    slug: "${category}",`)
  if (catHead < 0) { console.error(`Navigation category "${category}" not found — add the navigation entry by hand.`); process.exit(1) }
  const arrStart = nav.indexOf("calculators: [", catHead)
  const arrEnd = nav.indexOf("\n    ]", arrStart)
  const block = nav.slice(arrStart, arrEnd)
  if (block.includes(`slug: "${slug}"`)) {
    dataEdits.push(`SKIP navigation (${category} already lists ${slug})`)
  } else {
    const item = `      { title: "${name}", slug: "${slug}", description: "${name} — free, instant results.", icon: Calculator },`
    nav = nav.slice(0, arrEnd) + `\n${item}` + nav.slice(arrEnd)
    writeFileSync(navPath, nav)
    dataEdits.push(`DONE navigation: appended ${slug} to category "${category}"`)
  }
}

// ---------- checklist ----------
console.log(`\nScaffolded "${name}" -> ${dir} (${mode} mode)`)
for (const w of written) console.log(`  ${w}`)
for (const d of dataEdits) console.log(`  ${d}`)
console.log(`
FOLLOW-UP CHECKLIST — the tool is NOT publishable until every box is done:
  [ ] 1. Replace the starter growth formula in ${dir}/CalculatorClient.tsx
         with the real ${keyword} formula; keep the house layout.
  [ ] 2. Add the TOOL_CONTENT entry — paste this into the newest src/data/tool-content-* part file (add a new part + merger import if it would exceed ~75 KB)
         (before the closing brace of TOOL_CONTENT_B) and write REAL content
         (TONE-OF-VOICE.md; recompute the example numbers by hand):

  "${contentKey}": {
    quickAnswer: "40-50 words, answer-first: the number/fact the searcher wants, then how the tool gets it.",
    howItWorks: ["Paragraph 1: what the user enters.", "Paragraph 2: the method.", "Paragraph 3: how to read the result."],
    formula: "The formula in plain text.",
    example: { title: "Worked example with round numbers", body: "Inputs, the arithmetic, and the result — every figure recomputed." },
    faqs: [
      { question: "...", answer: "..." },
      // 5 FAQs minimum, each answer self-contained and citable.
    ],
  },
${mode === "rank" ? `  [ ] 3. Publish edits (Stage 7): in src/config/tool-registry.ts set this tool's
         "status" to "live" and "url" to "${url}"; add the navigation entry
         to category "${category}" in src/config/navigation.ts:
           { title: "${name}", slug: "${slug}", description: "${name} — free, instant results.", icon: Calculator },
` : `  [x] 3. Registry + navigation entries: DONE automatically above.
`}  [ ] 4. Verify: npm run check-site && npx tsc --noEmit && npm run build
  [ ] 5. Push via the GitHub connector flow (SITE-MANAGEMENT.md) — never push
         while check-site fails: the content entry is what removes the
         placeholder fallback from this page.`)
