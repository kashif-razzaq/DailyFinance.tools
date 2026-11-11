import type { Metadata } from "next"
import { CategoryHub } from "@/components/layout/CategoryHub"
import { generateCalculatorMetadata } from "@/config/metadata"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Creator Economy Calculators — YouTube, TikTok & Patreon",
  description: "Free creator calculators: YouTube and TikTok earnings, sponsorship pricing, Patreon and Substack take-home pay, platform fees and course launch revenue.",
  keywords: ["creator economy calculators", "youtube money calculator", "tiktok money calculator", "sponsorship pricing calculator", "patreon calculator"],
  slug: "creator",
  category: "Tools",
})

export default function Page() {
  return (
    <CategoryHub
      categorySlug="creator"
      quickAnswer={"Creator calculators turn views, subscribers and engagement into money estimates. YouTube income is views \u00d7 RPM for your niche; TikTok now pays through the Creator Rewards Program (roughly $0.40\u2013$1.00 per 1,000 qualified views on original videos over one minute \u2014 the old Creator Fund ended in December 2023); sponsorships are priced from reach and engagement, not follower count alone."}
      intro={[
      "Creator income is the hardest income to predict because every platform pays differently: YouTube shares ad revenue, TikTok pays from a rewards pool with strict eligibility, Patreon and Substack take platform and processing cuts, and brand deals are negotiated from engagement data. This hub models each platform with its real fee structure and current program rules, so an estimate here reflects what actually lands in your account.",
      "Use the earning estimators to sanity-check a niche before you commit months to it, the fee visualizer to see what each platform keeps, and the sponsorship calculator before you answer a brand's first email \u2014 creators who quote from data consistently earn more than creators who quote from hope. If you sell knowledge, the course launch tool connects your audience size to a realistic launch revenue range.",
      "Every estimate shows the RPM, rate or fee assumptions behind it, with ranges instead of false precision. Creator income varies by audience geography, season and content category, so treat results as planning ranges and update the assumptions with your own channel analytics as they grow."
]}
      decisions={[
      {
            "need": "Estimating YouTube income",
            "toolSlug": "youtube-adsense-estimator",
            "why": "projects earnings from views and niche RPM, long-form and Shorts."
      },
      {
            "need": "Pricing a brand deal",
            "toolSlug": "sponsorship-pricing-calculator",
            "why": "builds a rate from reach, engagement and usage rights."
      },
      {
            "need": "Checking what Patreon pays you",
            "toolSlug": "patreon-tier-optimization",
            "why": "models tiers after Patreon's platform and processing fees."
      },
      {
            "need": "Planning a course launch",
            "toolSlug": "course-launch-revenue-calculator",
            "why": "connects list size and conversion to launch revenue."
      },
      {
            "need": "Comparing platform cuts",
            "toolSlug": "platform-fee-visualizer",
            "why": "shows who keeps what from the same gross revenue."
      }
]}
      faqs={[
      {
            "question": "How accurate are creator income estimates?",
            "answer": "They are planning ranges built on published fee structures and typical RPM bands by niche. Your real RPM depends on audience country, watch time, season and advertiser demand \u2014 the tools let you adjust every assumption."
      },
      {
            "question": "Is the TikTok Creator Fund still active?",
            "answer": "No. TikTok closed the Creator Fund in December 2023 and replaced it with the Creativity Program, now called the Creator Rewards Program. Our TikTok calculator uses the current Rewards model."
      },
      {
            "question": "What RPM should I expect on YouTube?",
            "answer": "Finance and business channels often see $8\u2013$28 RPM, entertainment $1\u2013$4, with large variation by audience geography. The YouTube estimator includes niche presets you can override."
      },
      {
            "question": "Are these creator tools free?",
            "answer": "Yes, all of them, with no sign-up required."
      }
]}
    />
  )
}
