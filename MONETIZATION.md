# Monetisation — Status, Gaps & Income Model (Nov 2026)

## How money is supposed to flow
1. **Free tier = traffic engine.** All calculators free, no sign-up wall (SEO/AEO traffic).
   Free + logged-out users see AdSense units (ToolLayout header / in-article / bottom / sidebar).
2. **Pro = $2.99/mo** (see /pricing). `users.subscription_status='active'` flips:
   ads off (ProDashboardWidget instead), unlimited Scenario Vault, CSV/XLSX exports,
   premium PDF, Cross-Data Analytics. Checked server-side in Navbar, ToolLayout,
   dashboard layout; enforced in calculator.actions (vault) + analytics page.
3. **Lead-gen**: TahirLeadGenCTA + consultation modal on tool pages (accounting leads) — no ad cost, highest margin per conversion.
4. **Embeds**: /embed calculators = backlinks + brand reach.

## Enforced rules (after Nov 2026 perfecting pass)
- Free account Vault limit: **3 saved scenarios** (FREE_VAULT_LIMIT in src/actions/calculator.actions.ts); updates/clones of existing rows respect it; Pro unlimited.
- /dashboard/analytics is Pro-gated server-side (free users get an upgrade panel; their data is untouched).
- Exports in gold-standard clients are Pro-gated via ProModal (client pattern: `if (!isPro) return setShowProModal(true)`).
- Ad slots render ONLY when NEXT_PUBLIC_ADSENSE_ID (+ slot envs) are set; in production without config they render nothing — no empty "Advertisement" boxes for visitors/reviewers. Dev shows dashed placeholders.
  Slot envs: NEXT_PUBLIC_ADSENSE_SLOT_HEADER / _INARTICLE / _BOTTOM / _SIDEBAR.

## THE ONE REMAINING BLOCKER — checkout
There is **no payment provider connected**. The pricing CTAs send users to /login;
nothing can currently set subscription_status except manual DB edits.
Recommended: **Lemon Squeezy** (merchant of record — handles global VAT/sales tax for a
digital subscription, simplest for a solo founder) or Stripe Billing.
Wiring (either provider): checkout link per signed-in user (client_reference_id / metadata
= Supabase user id) -> webhook on subscription created/renewed/cancelled -> update
public.users.subscription_status ('active' / 'canceled') -> user sees Pro instantly.
Estimated effort once an account exists: half a day.

## Income maths at the 50k-visits/month target (estimates, US-heavy traffic)
- AdSense (finance niche RPM ~$15–$40 / 1,000 sessions): **~$750–$2,000/mo**
- Pro: 50k visits -> ~8–12% register -> 1–3% of registered upgrade over time ->
  ~50–150 subscribers -> **~$150–$450/mo** (grows with return visits; the Vault is the retention hook)
- Lead-gen (accounting consultation leads): low volume, high value per lead; one converted
  client can exceed a month of ads.
- Verdict: the structure is right (free breadth for traffic, ads on free, Pro for power users,
  leads for margin). Traffic quality matters more than raw volume: US/UK/CA/AU visitors are
  worth 5–10x in RPM. Do NOT gate calculator content behind login — it would kill the SEO engine.
