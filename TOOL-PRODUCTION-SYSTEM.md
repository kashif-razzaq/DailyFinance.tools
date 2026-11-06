# The DailyFinance Tool Factory — Keyword → Tool → Traffic → Revenue System

One repeatable pipeline that turns keyword research into ranking, converting
calculator pages. The single source of truth is `src/config/tool-registry.ts`
(the Top 100). Every tool — live or planned — exists there first.

## Stage 1 — DISCOVER (keyword research)
Sources: Ahrefs/Semrush (volume, KD, parent topic), Google autocomplete +
"People also ask", SERP inspection, GSC queries (for existing pages),
competitor tool audits (calculator.net, omnicalculator, nerdwallet).
A keyword qualifies only if ALL are true:
- **Tool intent:** the SERP is dominated by calculators/tools, not articles.
- **Demand:** US volume ≥ 1,000/mo for Tier 1/2 (long-tail variants feed FAQs).
- **Winnability:** KD and incumbent quality leave a gap (weak content, slow
  pages, no Quick Answer, outdated rules — e.g. dead programs like the TikTok
  Creator Fund are opportunity signals).
- **Monetisation fit:** finance RPM potential, Pro-feature potential, or
  lead-gen adjacency.
Opportunity score = Volume × IntentFit × (1 / (KD + 10)) × MonetisationFactor.
Top scores enter the registry with rank, hub, keyword, volume, tier.

## Stage 2 — SPEC (one registry row = one build ticket)
For each tool, before any code: primary keyword + 3–5 secondary variants;
SEO title (keyword-first, benefit, year), meta description (benefit + "free,
no sign-up" + differentiator), H1 (keyword + outcome phrase); the formula in
plain notation; inputs/outputs; which shared engine it uses (amortization,
compound growth, tax, fee-stack, ratio, simulation…); the worked examples
chosen (realistic numbers, recomputed in Stage 5).

## Stage 3 — SEMANTIC ARCHITECTURE (per tool, decided from data — not blanket)
Each tool is assigned exactly one expansion class:
- **LOCATION-VARIANT** — separate state (and where data supports it, city)
  pages ONLY when the underlying rate/rule materially differs by place:
  sales tax (state + major city — built), income/paycheck tax (state),
  property tax (state). Data lives in `src/data/locations/`; one dataset
  generates every variant; each variant carries unique numbers, examples
  and FAQs (never boilerplate swaps).
- **SCENARIO-VARIANT** — amount/term/persona variants ("$500k mortgage",
  "retire at 55") live INSIDE the tool page as crawlable scenario tables,
  sensitivity grids and FAQs. No separate thin pages.
- **SINGLE CANONICAL** — one strong page; depth via formula, examples,
  mistakes, FAQs and internal links.
Rule: a separate URL exists only if its data or answer materially differs.
Thin duplicates are an AdSense and ranking liability, not an asset.

## Stage 4 — BUILD (one template, no exceptions)
Scaffold with `npm run new-tool -- <rank>` (scripts/new-tool.mjs), then build:
working calculator above the fold, pre-filled with the primary example →
Quick Answer (40–50 words, AEO-citable) → interpretation → formula (crawlable
HTML) → 2–3 verified worked examples → scenario/sensitivity table → common
mistakes → 5–8 FAQs → 6 related tools. 1,500–2,000 words. Schema stack:
SoftwareApplication + HowTo + FAQPage + BreadcrumbList. Save-to-Vault hook and
Pro gates wired via ToolLayout/isPro (see MONETIZATION.md).

## Stage 5 — CONVERT (every page is a funnel)
Above-fold: the tool itself + primary result in an emerald panel.
Mid-page: Vault save prompt (free, 3 saves) → Pro upgrade moments at export/
analytics gates → Tahir consultation CTA in sidebar → related-tools loop
(keeps sessions multi-page = more ad impressions + more Pro exposure).
Ad slots only where AdSlot renders them (never inside the calculator).

## Stage 6 — QA GATES (all must pass before publish)
1. `npx tsc --noEmit` = 0 errors. 2. `npm run build` passes.
3. Placeholder scan: no "coming soon / will be added" text anywhere.
4. Worked examples recomputed independently (script or hand-check).
5. Every internal link resolves (registry + navigation + sitemap agree).
6. Metadata/canonical/schema present; page renders same links every load.

## Stage 7 — PUBLISH & GROW
Flip the registry entry to `live` (menu + /tools directory update themselves),
confirm the URL enters sitemap.xml, request indexing in GSC, then monitor:
impressions → CTR → position for the primary keyword at 2/6/12 weeks.
Refresh loop: outdated rates/rules corrected via the dataset or page inputs
(see /methodology cadence); underperforming pages get title/Quick Answer/
internal-link upgrades before any new tool is started in the same hub.
Quarterly: re-run Stage 1 on GSC data; promote/demote registry tiers.

## AEO / GEO layer (built into every stage)
Quick Answers are written as standalone citable facts; formulas and rates are
plain HTML (never locked in JS); llms.txt lists every hub, tool and state
guide; FAQ + HowTo schema on every page; Methodology + named expert reviewer
for E-E-A-T. The goal: when an AI engine answers the keyword, DailyFinance is
the source it can quote.
