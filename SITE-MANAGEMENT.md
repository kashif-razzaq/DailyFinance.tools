# Site management — how Muse runs DailyFinance.tools

The operations manual for any future Muse session managing this site. The
site is data-driven: content, tools, menus, sitemap and llms.txt all generate
from a small set of data files. Almost every change is an edit to a data file
plus one verification command — not a code change.

Read alongside: `TOOL-PRODUCTION-SYSTEM.md` (keyword → tool pipeline),
`TONE-OF-VOICE.md` (how all copy is written), `MONETIZATION.md` (revenue
model and status), `ADSENSE-SETUP.md` (ad go-live steps).

## Architecture map — where everything lives

| What | Where | Notes |
|---|---|---|
| Tool registry (source of truth) | `src/config/tool-registry.ts` | `TOOL_REGISTRY` = researched Top 100 (`status: "live" \| "planned"`, `url`, `plannedUrl`, `menuCategory`). `EXTRA_LIVE_TOOLS` = live tools beyond the Top 100. A tool is not published until its registry entry says `live` with the real `url`. |
| Navigation / menus | `src/config/navigation.ts` | `navigationCategories` (7 route categories: freelance, creator, ecommerce, real-estate, personal-wealth, loans, tax). Mega menu, mobile menu, footer and the mobile bottom nav all iterate this file. `getToolUrl(slug)` builds `/{category}/{slug}`. |
| Tool page content | `src/data/tool-content-a.ts`, `src/data/tool-content-b.ts` | Merged by `src/data/tool-content.ts` into `TOOL_CONTENT`, keyed `"category/slug"`. Entry shape: `quickAnswer`, `howItWorks[]`, `formula?`, `example{title, body}`, `faqs[]`. Split of files is arbitrary — put new entries in `-b`. |
| Tool page rendering | `src/components/shared/ToolContent.tsx` + `src/components/layout/ToolLayout.tsx` | Each tool `page.tsx` passes `faqs={TOOL_CONTENT[key]?.faqs ?? []}` to ToolLayout (which renders the FAQs and emits FAQPage schema) and renders `<ToolContent contentKey="category/slug" />` as children (Quick Answer, How it works, formula, worked example). |
| Editorial guides | `src/data/guides.ts` | `GUIDES` — 16 guides; each carries `relatedTools` links. Rendered at `/guides/[slug]`. |
| Topic hubs | `src/data/hubs.ts` | The 6 plan hubs at `/hubs/[slug]`, plus the 7 category hub pages from navigation. Homepage Hubs + Guides sections read these files. |
| Location data | `src/data/locations/us-states.ts` (50 states + DC), `us-cities.ts` (30 cities) | Generates `/locations`, `/locations/[state]`, `/sales-tax/[state]`, `/sales-tax/[state]/[city]`, `/guides/states/**`. One dataset edit updates every variant page. |
| Metadata | `src/config/metadata.ts` | `generateCalculatorMetadata` — every tool page uses it (title, description, canonical, OG/Twitter with `/api/og` image). |
| Sitemap + llms.txt | `src/app/sitemap.ts`, `src/app/llms.txt/route.ts` | Auto-generated from registry/navigation/guides/locations data. Never edit by hand; if a URL is missing, the data files disagree — `npm run check-site` finds it. |
| Calculators | `src/app/<category>/<slug>/CalculatorClient.tsx` | Client component, house pattern: local MoneyInput/slider helpers, `lg:grid-cols-12` (inputs 7 / results 5), dark-green `#064E3B` result card. `page.tsx` beside it is the thin wired shell. |
| Pro / free gating | Supabase `users.subscription_status = 'active'` → `isPro` | Free Vault limit 3 saves (`src/actions/calculator.actions.ts`); `/dashboard/analytics` is Pro-gated. See MONETIZATION.md. |

## Add a tool end-to-end

1. **Research first** (TOOL-PRODUCTION-SYSTEM.md Stages 1–2): keyword,
   volume, tier, formula, one primary example with realistic numbers.
2. **Scaffold** — `scripts/new-tool.mjs` generates a fully wired page in the
   current standard (metadata block, ToolLayout + TOOL_CONTENT faqs,
   ToolContent children, and a working starter CalculatorClient in the house
   layout):
   - Planned Top-100 tool: add/confirm its registry entry (`status:
     "planned"`, `plannedUrl`), then `npm run new-tool -- <rank>`.
   - Brand-new tool: `npm run new-tool -- <category>/<slug> --name "…" 
     --keyword "…" [--hub "…"]`. This also appends the registry
     (EXTRA_LIVE_TOOLS) and navigation entries automatically — both edits
     are idempotent; re-running the scaffold never duplicates or overwrites.
   The scaffold prints a follow-up checklist. Follow it exactly.
3. **Write the content entry** in `src/data/tool-content-b.ts` (the scaffold
   prints the snippet): answer-first `quickAnswer` (40–50 words),
   `howItWorks`, `formula`, one worked `example`, ≥5 `faqs`. Voice rules
   below. Until this entry exists the page renders the ContentPlaceholder
   fallback and check-site fails — by design.
4. **Replace the starter formula** in the generated `CalculatorClient.tsx`
   with the tool's real formula. The starter is a generic compound-growth
   model that makes the page work end to end; it is never the shipped maths.
5. **Publish (rank mode only):** flip the registry entry to `status: "live"`,
   set `url` to the real path, and add the navigation entry (snippet is in
   the scaffold checklist). Slug mode already did registry + navigation.
6. **Verify** (ritual below), then **push** (flow below). After deploy,
   confirm the URL is in `sitemap.xml` and request indexing in Search
   Console.

## Update existing content

- Tool page copy: edit its entry in `tool-content-a.ts` / `tool-content-b.ts`.
  Nothing else changes — FAQs, schema and the page re-render from the entry.
- Guide copy: edit `src/data/guides.ts`. Hub copy: `src/data/hubs.ts`.
- Rates and rules (tax brackets, sales-tax rates, fee schedules): edit the
  dataset that generates the pages (`src/data/locations/*` for place data;
  the tool's client + content entry for rates quoted in copy). Never patch a
  generated page variant one by one.
- Menu/footer/homepage links: `src/config/navigation.ts` and the data files
  above — the components iterate the data.

## Content rules (standing — do not relitigate)

- **Voice:** TONE-OF-VOICE.md — professional, direct, plain language,
  concrete numbers only, no filler or hype, sentence-case headings,
  sufficiency over length.
- **Worked-example accuracy rule:** every number in an example is recomputed
  (by hand or script) before it ships. A wrong figure is worse than no
  example. Tax figures are estimates for the current year and are labelled
  "verify with the IRS / state DOR" where the page says so.
- **No placeholder text, ever** (Kashif's standing rule, 2026-11-09): no
  "being written", "coming soon", "lorem", TODO copy — on any page. A page
  that is not ready is not linked and not in the registry as live.
  check-site enforces this.
- **Semantic expansion rule:** a separate variant page exists only where the
  data or answer materially differs by place (sales tax state + city — done;
  income/paycheck and property tax are state-level when built). Scenario
  variants ("$500k mortgage", "retire at 55") live inside the tool page as
  tables and FAQs, never as thin duplicate pages.
- The 12 original freelance pages carry their content inline in `page.tsx`
  (the gold standard). Leave them inline; do not migrate them into
  TOOL_CONTENT.

## SEO / AEO rules

- Quick Answers are written answer-first as standalone citable facts — AI
  engines (ChatGPT, Perplexity, Gemini) quote them; keep the number in the
  first sentence.
- FAQ schema flows from the content entry: `faqs` → ToolLayout prop →
  rendered FAQs + FAQPage JSON-LD. SoftwareApplication + BreadcrumbList come
  from ToolLayout; Organization + WebSite from the root layout. Do not add
  schema by hand to a tool page.
- Every tool page keeps its `generateCalculatorMetadata` block verbatim in
  shape: unique title, description, canonical, OG/Twitter.
- `llms.txt` and the sitemap regenerate from the data files; a missing URL
  means the data files disagree (check-site check 6), not that the generator
  needs editing.
- robots.txt explicitly allows the major AI crawlers. Do not block them.

## Monetization — status and the $5,000/month goal

**Goal (Kashif, 2026-11-09): $5,000/month within 6–12 months (target window
roughly May–Nov 2027).** Revenue levers, in the order they unlock:

1. **AdSense** — the site is built and compliant (policy pages, consent
   banner, no thin or placeholder pages, env-gated `AdSenseScript` +
   `AdSlot`). At 50k visits/month of US-heavy finance traffic this is
   roughly $750–$2,000/month on its own (MONETIZATION.md).
2. **Pro checkout — $2.99/mo** — gating is fully built (Vault limits,
   analytics gate, ads off for Pro); only the payment provider is missing.
   Pro alone will not reach $5k; it compounds with traffic and retention
   (Vault saves are the return-visit hook).
3. **Lead-gen** — the accounting consultation CTA (TahirLeadGenCTA) is the
   highest margin per conversion; one converted client can exceed a month
   of ads.

**Blocked on Kashif (nothing Muse can do alone):**
- AdSense publisher ID → set `NEXT_PUBLIC_ADSENSE_ID` (+ slot envs) and
  create `public/ads.txt` with the real pub number. Never invent one.
  Steps: ADSENSE-SETUP.md.
- A payment provider account — Lemon Squeezy recommended (merchant of
  record; handles global VAT/sales tax for a solo founder) or Stripe
  Billing. Once the account exists, wiring is ~half a day: checkout link
  carrying the Supabase user id → webhook on subscription
  created/renewed/cancelled → update `users.subscription_status`.

**Never** gate calculator content behind login — free breadth is the traffic
engine the whole model stands on.

## Verification ritual (run all of it, in this order, before any push)

1. `npm run check-site` — data integrity: every live tool has a page +
   client, every wired page has a content entry, no placeholder text
   anywhere, navigation + guide links resolve, sitemap covers every live
   URL. Exit 1 on any failure. **Do not push while it fails.**
2. `npx tsc --noEmit` — zero errors.
3. `npm run build` — production build passes.
4. Smoke test the built site (`npm run start` or the Vercel preview): the
   changed routes return 200, an unknown URL 404s, and the new/changed
   pages show their real content (no placeholder panel).

## Push flow (GitHub connector — read before starting)

There are no git credentials in the VM (SSH/HTTPS push is blocked), so code
reaches GitHub through the connector's `push_files` tool:

- Payloads are capped at ~128KB per call — chunk changesets to ~100KB of
  JSON per call, one snapshot commit per chunk.
- **Every call raises a user approval card.** Warn Kashif before starting
  how many cards to expect, or offer the alternative: a zip of the changes
  plus the git commands for him to run on his own machine.
- `package-lock.json` exceeds the cap and is excluded from connector pushes
  (its diffs so far were install-metadata churn only; it syncs on any future
  normal git push from Kashif's machine).
- After pushing, verify: remote head commit + blob-SHA spot checks against
  the local tree. Vercel auto-deploys `master`; confirm the new routes on
  the live deployment before reporting done.

## State note (Round 3, 2026-11-09)

The management system above was put in place while the Round-3 content
wiring was still landing. At that moment `npm run check-site` reported 58
placeholder failures: 57 tool pages still rendering ContentPlaceholder
(their TOOL_CONTENT entries were written; the page swaps were in flight)
and one pre-existing "Coming Soon" badge string in the dashboard tools page
(`src/app/dashboard/tools/page.tsx`), which is a logged-in UI badge, not
public page content. Pages, content, navigation, guides and sitemap checks
were all green, and `npx tsc --noEmit` was clean. Re-run check-site to get
the current truth — it is the single command that answers "is the site
whole?"
