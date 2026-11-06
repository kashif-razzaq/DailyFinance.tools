# AdSense Readiness — Setup & Checklist

## To go live with ads (5 minutes, after AdSense approval)
1. In Vercel/hosting env vars set: `NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX` (your publisher ID).
2. Create `public/ads.txt` with exactly one line:
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` (replace with YOUR pub number — do not ship a placeholder ads.txt).
3. Redeploy. The loader in `src/components/shared/AdSenseScript.tsx` activates automatically; replace placeholder ad slots in ToolLayout with real `<ins class="adsbygoogle">` units (or enable Auto Ads in the AdSense console, which needs no slot code).
4. In the AdSense console: add dailyfinance.tools, confirm the privacy/consent (CMP) settings for EEA/UK, and submit for review if not already approved.

## Readiness checklist (status after Phase 0 rebuild, Nov 2026)
- [x] Privacy Policy at /privacy — includes Google AdSense / DoubleClick cookie disclosure + opt-out links
- [x] Cookie Policy at /cookies, Terms at /terms, Disclaimer at /disclaimer (footer links all resolve)
- [x] Substantive About (/about) and Contact (/contact) pages
- [x] Category hub pages for all 5 categories; no breadcrumb/footer/sitemap 404s
- [x] No "coming soon" / placeholder tool pages — every indexed tool has a working calculator + full content
- [x] Original, substantial content on every tool page (formula, examples, FAQs)
- [x] ads.txt step documented above (needs the real publisher ID)
- [ ] Add a public contact email to /contact and the Privacy Policy once chosen
- [ ] Connect Google Search Console + verify sitemap.xml submits cleanly after deploy

## Ad placement rules used on this site
- No ads inside the calculator widget itself; slots sit in header / pre-article / sidebar / footer areas of ToolLayout.
- Minimum 350–400 words of content between interactive elements and ad units.
- Never place ads near buttons where accidental clicks are likely (AdSense policy).
