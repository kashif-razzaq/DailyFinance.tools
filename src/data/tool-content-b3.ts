/**
 * Tool content — part B: tax, ecommerce, creator and the two new freelance tools.
 * Written in the TONE-OF-VOICE.md voice (professional, direct, concrete numbers).
 * Keyed by URL path without the leading slash, e.g. "tax/paycheck-calculator".
 * Tax figures use the same projected 2026 federal brackets and standard
 * deduction as the calculators themselves, and are labelled estimates.
 */
export interface ToolContentEntry {
  quickAnswer: string
  howItWorks: string[]
  formula?: string
  example: { title: string; body: string }
  faqs: { question: string; answer: string }[]
}

export const TOOL_CONTENT_B3: Record<string, ToolContentEntry> = {
  "creator/substack-growth-predictor-simulator": {
    quickAnswer:
      "Ten thousand free subscribers converting at 5% give 500 paying readers; at $8 a month that is $4,000 gross, and about $3,470 after Substack's 10% and card processing. Growth compounds: adding 300 free subscribers a month at the same conversion lifts paid revenue every month without any change in price.",
    howItWorks: [
      "Enter your current free subscribers, monthly growth (new free subscribers), paid conversion rate, monthly or annual price and churn. The simulator projects free and paid subscribers month by month, and the monthly recurring revenue that results.",
      "Substack takes 10% of paid subscription revenue; Stripe processing (about 2.9% plus $0.30 per transaction) comes out as well. Annual plans pay the processing fixed fee once instead of twelve times, which is part of why annual subscribers are worth more than their headline discount suggests.",
      "Conversion benchmarks: 3-10% of free subscribers converting to paid is the range Substack reports as typical for active publications, with most clustered near 5%. The simulator's value is in testing your position in that range — at 3% the example above yields about $2,080 net; at 8%, about $5,550.",
      "Churn compounds against you exactly as growth compounds for you. Paid monthly churn of 3-6% is typical for newsletters; annual plans churn less because the decision comes once a year. The projection includes churn so the revenue line does not grow on subscribers who have already left.",
    ],
    formula:
      "Paid subscribers = free subscribers x conversion rate, adjusted monthly for growth and churn. Net revenue = paid x price x (1 - 10% Substack fee) - processing.",
    example: {
      title: "Worked example: 12-month projection for a growing newsletter",
      body: "Start: 10,000 free subscribers, growing by 400 a month; conversion 5%; price $8 a month; paid churn 4% a month. Month 1: 500 paid, gross $4,000, net after Substack and processing roughly $3,470. By month 12 the free list reaches about 14,400; with conversions from new readers offsetting churn, paid subscribers reach roughly 700 and net monthly revenue about $4,860. Annual net revenue across the year totals roughly $50,000 — against about $41,600 if the list had not grown at all.",
    },
    faqs: [
      {
        question: "How much does Substack take from paid subscriptions?",
        answer:
          "10% of the subscription price, plus Stripe's processing of about 2.9% + $0.30 per charge (plus a small recurring-billing fee). On an $8 monthly subscription the creator nets about $6.94; on an $80 annual plan, about $69.47 — the single $0.30 fixed fee is why annual plans net a slightly higher share.",
      },
      {
        question: "What paid conversion rate is realistic?",
        answer:
          "Substack's own guidance puts typical free-to-paid conversion at 3-10%, with around 5% a serviceable planning figure. Publications converting below 3% usually have a free tier that gives away the core value; above 8% usually means the paid tier carries something scarce — data, community access, professional necessity — rather than more posts.",
      },
      {
        question: "How many subscribers do I need to earn $5,000 a month?",
        answer:
          "At $8 a month netting about $6.94, $5,000 needs about 720 paying subscribers. At a 5% conversion rate that is a free list of roughly 14,400; at 8% conversion, about 9,000. Raising price to $12 cuts the requirement to about 480 paid subscribers. The three levers — list size, conversion, price — are interchangeable in the arithmetic and very different in effort.",
      },
      {
        question: "Monthly or annual pricing — which earns more?",
        answer:
          "Annual plans (usually priced at 10x monthly, giving two months free) bring cash forward, cut processing fees and reduce churn decisions to one a year; monthly plans convert more subscribers because the entry price is lower. Most publications offer both. In projections, model annual subscribers at a lower churn rate and monthly ones at a higher conversion rate.",
      },
    ],
  },
};
