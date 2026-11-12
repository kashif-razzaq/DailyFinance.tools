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
      "A newsletter with 5,000 free subscribers growing 8% a month, converting 5% to paid at $8, reaches about 630 paid subscribers and $4,198 of net monthly revenue in a year — $34,166 of cumulative net revenue. Growth compounds: every new free reader adds paid subscribers without any change in price.",
    howItWorks: [
      "Enter your current free subscribers, monthly growth rate, paid conversion rate, monthly price and paid churn rate, plus the projection horizon. The simulator grows the free list month by month, converts a share of it to paid, applies churn, and returns the free and paid subscriber counts and net monthly recurring revenue for each month.",
      "The fee stack has two layers in this model: Substack takes 10% of paid subscription revenue, and Stripe processing takes about 2.9% plus $0.30 per charge. On an $8 subscription that is $0.80 to Substack and $0.53 to Stripe, leaving about $6.67. Stripe also charges a 0.7% recurring-billing fee on subscriptions, which this simulator does not model — the true net per $8 subscriber is about $6.61.",
      "Conversion is the lever the simulator exists to test. Substack's own benchmark is 5 to 10% of free subscribers converting to paid, while most publications land at 2 to 5%. At 3% conversion the example below reaches about $2,519 of net monthly revenue by month 12; at 8% it reaches about $6,717. The difference between the bottom and top of the realistic range is nearly threefold.",
      "Churn works against you exactly as growth works for you. The simulator applies your churn rate to paid subscribers each month, then tops paid back up from conversions of new free readers — so while the list grows, paid subscribers track your conversion rate applied to the free list. Churn bites when growth stalls: a list that stops growing sees paid subscribers shrink by the churn rate every month.",
      "Annual plans change the arithmetic in three ways: priced at roughly ten times the monthly rate (two months free), they bring cash forward, pay the $0.30 fixed fee once instead of twelve times, and reduce churn decisions to one a year. Most publications offer both monthly and annual. Substack's minimum price is $5 a month or $30 a year, so the model cannot price below that floor.",
    ],
    formula:
      "Paid subscribers = free subscribers x conversion rate, adjusted monthly for growth and churn. Net monthly revenue = paid x price x (1 - 10% Substack fee - 2.9% Stripe) - paid x $0.30.",
    example: {
      title: "Worked example: 12-month projection for a growing newsletter",
      body: "Start: 5,000 free subscribers, growing 8% a month; conversion 5%; price $8 a month; paid churn 3% a month. Month 1: the free list reaches 5,400 and paid subscribers reach 270, grossing $2,160 and netting about $1,800 after Substack's $216, Stripe's $62.64 and $81 of fixed per-charge fees. By month 12 the free list reaches 12,591, paid subscribers reach about 630 and net monthly revenue is about $4,198. Cumulative net revenue across the year totals about $34,166, against about $20,000 if the list had not grown at all.",
    },
    faqs: [
      {
        question: "How much does Substack take from paid subscriptions?",
        answer:
          "10% of the subscription price, plus Stripe's processing of about 2.9% + $0.30 per charge, plus a 0.7% Stripe Billing fee on recurring charges. On an $8 monthly subscription the creator nets about $6.67 before the billing fee (about $6.61 with it); on an $80 annual plan, about $69.38 — the single $0.30 fixed fee is why annual plans net a slightly higher share.",
      },
      {
        question: "What paid conversion rate is realistic?",
        answer:
          "Substack's own guidance puts typical free-to-paid conversion at 5 to 10%, while most publications land at 2 to 5%, with around 5% a serviceable planning figure. Publications converting below 3% usually have a free tier that gives away the core value; above 8% usually means the paid tier carries something scarce — data, community access, professional necessity — rather than more posts.",
      },
      {
        question: "How many subscribers do I need to earn $5,000 a month?",
        answer:
          "At $8 a month netting about $6.67, $5,000 needs about 750 paying subscribers. At a 5% conversion rate that is a free list of roughly 15,000; at 8% conversion, about 9,375. Raising price to $12 cuts the requirement to about 493 paid subscribers. The three levers — list size, conversion, price — are interchangeable in the arithmetic and very different in effort.",
      },
      {
        question: "Monthly or annual pricing — which earns more?",
        answer:
          "Annual plans (usually priced at 10x monthly, giving two months free) bring cash forward, cut processing fees and reduce churn decisions to one a year; monthly plans convert more subscribers because the entry price is lower. Most publications offer both. In projections, model annual subscribers at a lower churn rate and monthly ones at a higher conversion rate.",
      },
    ],
  },
};
