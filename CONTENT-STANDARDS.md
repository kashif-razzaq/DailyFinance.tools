# Content Standards — DailyFinance.tools

The standing rules for ALL content on this site (guides, tool pages, location
pages). Set 2026-11-11 from the AdSense / YMYL playbook Kashif supplied, merged
with the rules the site was already built under. Read alongside
`TONE-OF-VOICE.md` (voice) and `SITE-MANAGEMENT.md` (operations).

Finance is YMYL (Your Money Your Life). Google — and AdSense review — judge
the finished page's helpfulness, accuracy and trust signals, not how the draft
was produced. Mass-produced, unedited AI content is the fastest route to a
"low-value content" rejection. AI is a first-draft assistant here, never the
publisher.

## The rules

1. **Data before drafting.** Every page starts from verified data: a working
   calculator, a published formula, an official schedule (IRS, SSA, state
   Departments of Revenue, platform fee tables). No page exists without a
   verified number, a worked example, or a working tool.
2. **Human enrichment is the publish gate.** Every figure, rate, threshold
   and formula is checked against its primary source before publish. Generic
   paragraphs that could appear unchanged on any finance site do not ship —
   rewrite into the specifics of the calculation, with local context where
   location changes the answer.
3. **Self-contained answer block (AEO).** Every guide opens with a 40–60 word
   intro that answers the title question on its own. Every tool page renders
   its `quickAnswer`. Location pages keep their Quick Answer box. AI search
   engines cite pages whose answers stand alone.
4. **Original value on every page.** Worked examples with real numbers,
   comparison tables, our own charts (TaxCompareChart on location pages),
   featured illustrations in the brand set. Structure: short paragraphs,
   H2/H3 order, summary boxes — no walls of text.
5. **Trust furniture is mandatory.** Named reviewer (Tahir Shehzad, ACMA)
   visible on calculator pages; reviewed-by + updated date on guides;
   "Estimates, not advice" disclaimer on every tool page and in the footer;
   About, Methodology, Editorial Policy, Disclaimer, Contact, Privacy and
   Terms pages live and footer-linked.
6. **No thin or spun variants (semantic-expansion rule, 2026-11-06).**
   Separate pages only where the data/answer materially differs by place or
   scenario. Variants live inside the tool/guide, never as near-duplicate
   pages.
7. **Update cadence.** Tax-year figures refresh on IRS publication; platform
   fees re-checked quarterly (AI citations decay — stale pages lose both
   rankings and citations); state/city data at least twice a year and on any
   announced change. Update the page's `updated` date when you touch it.
8. **No placeholders, ever** (2026-11-09) — enforced by `npm run check-site`.
9. **Honesty in claims.** Estimates are labelled estimates; averages are
   labelled averages with their basis; nothing promises returns, approval or
   savings the maths does not show.

## Workflow for a new page

1. Research & intent: find the genuine question (search demand, Trends,
   forums), map it to the calculator/data that answers it.
2. Draft: structured draft (AI-assisted is fine) built around the verified
   data, the quick answer, the formula/method, and a worked example.
3. Enrich & verify: source-check every number; add the example, table or
   chart; cut anything generic.
4. Optimise: answer block at top, internal links to the pillar hub and the
   related calculators, FAQ set with schema, meta title ≤60 / description
   ≤155, updated date set.

## Where this is implemented

- Guides: `src/data/guides.ts` (intro = answer block, `updated`, FAQs) via
  `GuideArticle` (reviewer line, disclaimer line, FAQ schema).
- Tools: `ToolContent` entries (`quickAnswer`, `howItWorks`, `example`,
  FAQs) via `ToolLayout` (author bio, disclaimer block, FAQ schema).
- Locations: single dataset `src/data/locations/us-states.ts` + templates;
  Dept-of-Revenue verification notes on every page.
- Trust pages: `/about`, `/methodology`, `/editorial-policy`, `/disclaimer`,
  `/contact`, `/privacy`, `/terms` — all in the footer.
