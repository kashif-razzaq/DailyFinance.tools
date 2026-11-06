/**
 * Scaffold a planned tool from the registry.
 * Usage: npm run new-tool -- <rank>
 * Creates src/app/<menuCategory>/<slug>/ with page.tsx + CalculatorClient.tsx
 * skeletons pre-filled from the registry entry (keyword, title formula, hub).
 * Skeletons are DEV starting points — complete them to the Stage-4 standard
 * and pass the Stage-6 QA gates before flipping the registry entry to live.
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs"

const rank = parseInt(process.argv[2], 10)
if (!rank) { console.error("Usage: npm run new-tool -- <rank>"); process.exit(1) }

const registry = readFileSync("src/config/tool-registry.ts", "utf8")
const entries = [...registry.matchAll(/^\s*(\{"rank".*\}),?$/gm)].map((m) => JSON.parse(m[1]))
const tool = entries.find((e) => e.rank === rank)
if (!tool) { console.error(`Rank ${rank} not found in registry`); process.exit(1) }
if (tool.status === "live") { console.error(`#${rank} ${tool.name} is already live at ${tool.url}`); process.exit(1) }

const category = tool.menuCategory || "personal-wealth"
const slug = tool.plannedUrl.split("/").filter(Boolean).pop()
const dir = `src/app/${category}/${slug}`
if (existsSync(dir)) { console.error(`Folder already exists: ${dir}`); process.exit(1) }
mkdirSync(dir, { recursive: true })

writeFileSync(`${dir}/CalculatorClient.tsx`, `"use client"

// TODO (Stage 4): implement the calculator for "${tool.name}".
// Primary keyword: ${tool.keyword}. Follow the gold-standard pattern in
// src/app/freelance/freelance-hourly-rate-calculator/CalculatorClient.tsx:
// useState inputs, useMemo results, emerald result panel, font-mono numbers.
import React from "react"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  return <div>{/* calculator UI */}</div>
}
`)

writeFileSync(`${dir}/page.tsx`, `import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"

// TODO (Stage 2/4): replace title/description with the researched spec and
// write the full content set: Quick Answer, formula, 2 verified examples,
// mistakes, FAQs (5). See TOOL-PRODUCTION-SYSTEM.md.
export const metadata: Metadata = generateCalculatorMetadata({
  title: "${tool.name} – Free, Instant Results (2026)",
  description: "TODO: benefit-led meta description for ${tool.keyword}.",
  keywords: ["${tool.keyword}"],
  slug: "${category}/${slug}",
  category: "Tools",
})

const faqs: { question: string; answer: string }[] = []

export default function Page() {
  return (
    <ToolLayout title="${tool.name}" description="" slug="${slug}" faqs={faqs}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>{/* article content */}</>)}
    </ToolLayout>
  )
}
`)
console.log(`Scaffolded #${rank} ${tool.name} -> ${dir}`)
console.log("Next: complete to Stage-4 standard, pass Stage-6 QA, flip registry status to 'live'.")
