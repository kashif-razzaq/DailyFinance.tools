/**
 * The six Top-100 hub pages (/hubs/<slug>). Each hub groups the registry tools
 * for one area of money, with written guidance in the site voice
 * (TONE-OF-VOICE.md): the decisions the tools support, a worked example,
 * common mistakes, and links into the matching guides.
 */

export interface HubContent {
  slug: string
  registryHub: string
  title: string
  description: string
  intro: string
  decide: { heading: string; paragraphs: string[]; bullets?: string[] }
  example: { heading: string; paragraphs: string[] }
  mistakes: string[]
  faqs: { question: string; answer: string }[]
  guideSlugs: string[]
}

export const HUBS: HubContent[] = [
  {
    slug: "personal-finance",
    registryHub: "Personal Finance",
    title: "Personal finance calculators",
    description: "Savings, interest, budgeting and goal calculators — the tools for money you already have and the plans you are building with it.",
    intro: "Personal finance runs on a handful of calculations repeated for years: what savings grow into, what a goal costs per month, whether a budget balances. These calculators cover that ground. None of them needs an account, and each one shows its working so the result can be checked, not just believed.",
    decide: {
      heading: "Which calculation do you need?",
      paragraphs: [
        "Start from the question, not the product. \"What will this become?\" is a compounding question. \"What must I save each month?\" is a goal question — the same maths run backwards. \"Where does the money go?\" is a budget question, and it should be answered before the other two, because the savings rate it reveals is the input every projection depends on.",
      ],
      bullets: [
        "Growing money you have: compound interest, interest and future value calculators.",
        "Reaching a target: savings goal and emergency fund calculators.",
        "Comparing accounts: APY and high-yield savings calculators.",
        "Spending structure: budget and 50/30/20 calculators.",
      ],
    },
    example: {
      heading: "A worked example",
      paragraphs: [
        "Saving $400 a month into an account paying 4.5% APY, starting from $5,000: after 10 years you have deposited $53,000 and the balance is about $66,400. The $13,400 difference is interest — meaningful, but note the deposits did most of the work. At a 9% long-run investment return the same habit reaches roughly $82,000. The gap between those outcomes is the real planning question: how much return do you need, and what risk comes with it?",
      ],
    },
    mistakes: [
      "Projecting with a nominal return and spending the result in real terms — subtract inflation before planning purchases a decade out.",
      "Comparing accounts by headline rate instead of APY, which already accounts for compounding frequency.",
      "Setting a savings goal without a date; the monthly amount is meaningless until the deadline fixes it.",
    ],
    faqs: [
      { question: "How much should I keep in savings versus investing?", answer: "Hold the emergency fund (three to six months of essentials) in savings. Money needed within about three years usually belongs in savings too. Longer horizons are where investing's higher expected return has time to absorb its swings." },
      { question: "What APY should I expect from a savings account?", answer: "High-yield accounts have recently paid around 4–5% while traditional bank savings often pay under 0.5%. Rates move with the Federal Reserve's rate, so recheck rather than assume." },
    ],
    guideSlugs: ["how-compound-interest-works", "how-to-build-an-emergency-fund", "50-30-20-rule-explained"],
  },
  {
    slug: "mortgage-and-real-estate",
    registryHub: "Mortgage & Real Estate",
    title: "Mortgage and real estate calculators",
    description: "Mortgage payments, affordability, refinance break-evens, rent-vs-buy and rental property returns — the full cost of a home, not just the payment.",
    intro: "A house is the largest purchase most people make, and the listing price is the smallest part of its true cost. Interest over the term can exceed the price itself; taxes, insurance and maintenance add a second, quieter mortgage. These calculators price the whole commitment before you sign for part of it.",
    decide: {
      heading: "How to use these tools, in order",
      paragraphs: [
        "Affordability first: it sets the ceiling from your income and debts. Then the mortgage calculator for the payment at a given price, term and rate. If you already own, the payoff and refinance calculators answer the next questions — what extra payments save, and whether a new loan's closing costs repay themselves before you move. Rent vs buy settles the prior question of whether buying beats your current rent over the years you will actually stay.",
      ],
      bullets: [
        "Buying: affordability, down payment, closing cost, mortgage payment.",
        "Owning: payoff, refinance, home equity.",
        "Investing: cap rate and rental returns — judge property like a business, on NOI, not appreciation hopes.",
      ],
    },
    example: {
      heading: "A worked example",
      paragraphs: [
        "A $425,000 home, 20% down, 6.75% for 30 years: the loan is $340,000 and the principal-and-interest payment is $2,205. Add property tax at 1.1% ($390/month), insurance ($185) and the payment most households actually budget is about $2,780 — before maintenance at roughly 1% of value per year. Total interest across the term: about $454,000. None of this makes the purchase wrong; it makes it priced.",
      ],
    },
    mistakes: [
      "Budgeting from the lender's pre-approval maximum instead of a payment that leaves room to save.",
      "Refinancing on the rate alone, without the break-even month on closing costs.",
      "Counting principal repayment as a cost of owning while ignoring rent as a cost of renting — the rent-vs-buy guide separates recoverable from unrecoverable costs on both sides.",
    ],
    faqs: [
      { question: "How much down payment do I need?", answer: "20% avoids PMI and lowers the payment, but many loans allow 3–5% down. The right answer weighs PMI cost against years spent saving while prices and rents move." },
      { question: "Is a 15-year mortgage worth the higher payment?", answer: "It carries a lower rate and builds equity far faster, saving six figures of interest on typical loans. It is worth it if the payment still fits the budget with an emergency fund intact; otherwise, a 30-year loan with voluntary extra payments keeps the flexibility." },
    ],
    guideSlugs: ["how-mortgage-amortization-works", "how-much-house-can-i-afford", "rent-vs-buy-guide"],
  },
  {
    slug: "loans-and-debt",
    registryHub: "Loans & Debt",
    title: "Loan and debt calculators",
    description: "Loan payments, true APR, credit card payoff, debt payoff strategies and consolidation — what borrowing costs, in total, before you sign.",
    intro: "Every loan is sold as a monthly payment and priced as a total. The payment fits a budget; the total decides what the borrowed money really cost. These calculators translate between the two — payment, total interest, payoff date, and the true APR once fees are counted.",
    decide: {
      heading: "Which calculation do you need?",
      paragraphs: [
        "Before borrowing, the loan and APR calculators answer the shopping questions: what payment does this amount, rate and term produce, and what is the loan's real annual cost after fees? For specific loans — car, personal, student — the dedicated calculators include their fees and typical structures. Already in debt: the payoff calculator orders multiple debts avalanche or snowball style, and the consolidation calculator tests whether combining them actually saves money or merely stretches it.",
      ],
      bullets: [
        "Shopping: loan calculator, APR calculator, DTI calculator (what lenders will allow).",
        "Specific loans: auto, personal, student loan calculators.",
        "Getting out: debt payoff, credit card, consolidation calculators.",
      ],
    },
    example: {
      heading: "A worked example",
      paragraphs: [
        "A $28,000 car loan at 8.5% for 72 months costs $494 a month and $7,550 in interest. The same loan over 48 months costs $690 a month and $5,130 in interest. The shorter term 'costs' $196 more each month and saves $2,420 overall — and leaves two years with no payment at all. Term length is the most expensive slider on any loan page, and the one dealers adjust first.",
      ],
    },
    mistakes: [
      "Judging a loan by its payment; extending the term always shrinks the payment and grows the total.",
      "Comparing loans by nominal rate when fees differ — APR exists precisely to make that comparison honest.",
      "Consolidating debts into a longer term and calling the lower payment a saving; it is frequently the opposite.",
    ],
    faqs: [
      { question: "What debt-to-income ratio do lenders want?", answer: "For mortgages, total debts under 36–43% of gross income is the common band; lower is better priced. The DTI calculator shows where you stand." },
      { question: "Does paying a loan off early hurt my credit?", answer: "Scores may dip slightly when an account closes because average age and mix change, but the effect is small and temporary, and it is never worth paying interest to avoid." },
    ],
    guideSlugs: ["avalanche-vs-snowball-debt-payoff", "how-credit-card-interest-works"],
  },
  {
    slug: "salary-tax-and-investing",
    registryHub: "Salary, Tax, Retirement & Investing",
    title: "Salary, tax, retirement and investing calculators",
    description: "Paycheck and income tax calculators, retirement projections, IRA comparisons, Social Security and RMD tools — what you keep, and what it becomes.",
    intro: "Gross pay is a headline; take-home is the fact. Between the two sit brackets, FICA, deductions and state rules — and beyond them, the retirement accounts that turn kept income into future income. These calculators cover both halves: what a salary actually pays, and what saving it actually builds.",
    decide: {
      heading: "How to use these tools, in order",
      paragraphs: [
        "Start with the paycheck and tax calculators to establish real take-home pay for a salary, a raise or a move between states. Then the retirement calculator for the long projection, the IRA tools to choose where contributions go, and the Social Security and RMD calculators for the two income sources and obligations that arrive on the government's schedule, not yours.",
      ],
      bullets: [
        "Keeping more: paycheck, income tax, take-home pay, overtime, capital gains.",
        "Building more: retirement, Roth IRA, traditional IRA, investment calculators.",
        "Later life: Social Security estimates and required minimum distributions.",
      ],
    },
    example: {
      heading: "A worked example",
      paragraphs: [
        "On a $95,000 salary, single, in 2026: federal income tax after the standard deduction is about $12,300, FICA takes $7,268, and a 5% state tax adds roughly $4,300 — take-home near $71,100 before benefits and retirement contributions. Saving 12% of gross into a 401(k) removes $11,400 from taxable income and cuts the federal bill by about $2,500, because pre-tax contributions come out of the top bracket first. The paycheck and retirement calculators together show both effects of the same decision.",
      ],
    },
    mistakes: [
      "Believing a raise can cut take-home pay by crossing a bracket — brackets tax slices, never the whole income at the new rate.",
      "Comparing job offers on gross salary across states with different income taxes and housing costs.",
      "Projecting retirement with a return assumption but no inflation assumption; the pair decides the answer, not either alone.",
    ],
    faqs: [
      { question: "What is a good savings rate for retirement?", answer: "A common planning band is 12–15% of gross income including any employer match, started early. Starting at 35 instead of 25 roughly doubles the required rate for the same outcome." },
      { question: "When do RMDs start?", answer: "Required minimum distributions from traditional retirement accounts currently begin at age 73 (75 for younger cohorts under SECURE 2.0). The RMD calculator applies the IRS Uniform Lifetime Table." },
    ],
    guideSlugs: ["how-federal-income-tax-brackets-work", "how-to-read-your-paycheck", "roth-vs-traditional-ira", "social-security-benefits-explained"],
  },
  {
    slug: "freelance-and-business",
    registryHub: "Freelance & Business",
    title: "Freelance and business calculators",
    description: "Rates, self-employment tax, quarterly estimates, S-corp savings and project pricing — the financial operating system of one-person businesses.",
    intro: "Freelancing replaces a payroll department with you. The rate must cover taxes an employer used to hide, the tax itself arrives quarterly instead of per-paycheck, and every hour is either billable or overhead. These calculators were the site's original tools, built from that reality, and they remain the most complete set here.",
    decide: {
      heading: "Which calculation do you need?",
      paragraphs: [
        "Pricing comes first: the hourly rate calculator builds a rate from your costs and real billable hours, and the project pricing tool converts it to flat fees. Tax comes second: self-employment tax, quarterly estimates, and the S-corp comparison once profits justify it. Operations follow: billable hours, client lifetime value, payment processor fees, and the W-2 vs 1099 comparison for anyone weighing an offer against employment.",
      ],
      bullets: [
        "Pricing: hourly rate, project pricing, salary-to-hourly.",
        "Tax: self-employment tax, 1099 tax, quarterly estimates, S-corp savings.",
        "Operations: billable hours, client LTV, Stripe & PayPal fees, emergency fund for variable income.",
      ],
    },
    example: {
      heading: "A worked example",
      paragraphs: [
        "A designer wants to replace an $85,000 salary. Adding self-employment tax, self-bought health insurance, retirement contributions and software brings the revenue target near $118,000. At a realistic 1,150 billable hours a year, the rate is about $103 an hour — not the $43 that dividing the salary by 2,000 hours suggests. Most underpricing is this single arithmetic error, repeated.",
      ],
    },
    mistakes: [
      "Dividing a target salary by 2,080 hours to set a rate, ignoring both taxes and non-billable time.",
      "Treating all revenue as income in good months and meeting the tax bill in April with a credit card.",
      "Electing S-corp status too early, when payroll and accounting costs exceed the SE tax saved.",
    ],
    faqs: [
      { question: "How much should I set aside for tax?", answer: "A common working rule is 25–30% of net profit, adjusted after your first filed return. The quarterly calculator turns your actual figures into the four payment amounts." },
      { question: "When does an S-corp pay off?", answer: "Often once net profit passes roughly $80–100k, when the SE tax saved on distributions exceeds payroll taxes on a reasonable salary plus the extra admin. The S-corp calculator runs your numbers." },
    ],
    guideSlugs: ["self-employment-tax-explained", "how-to-price-freelance-work"],
  },
  {
    slug: "creator-and-ecommerce",
    registryHub: "Creator & E-Commerce",
    title: "Creator and e-commerce calculators",
    description: "YouTube, TikTok, Instagram and Twitch earnings; Etsy, eBay, Amazon and Shopify fees and margins — what platforms pay, and what they keep.",
    intro: "Platform income has two sides: what the audience generates and what the platform keeps. Creators quote the first number; sellers feel the second. These calculators work both sides — earnings estimates from views and engagement, and fee and margin tools that show what a sale is worth after every percentage has taken its cut.",
    decide: {
      heading: "Which calculation do you need?",
      paragraphs: [
        "Creators: start with the money calculators for your platform (YouTube, TikTok, Instagram, Twitch), then the CPM/RPM and engagement tools to understand the rate behind the total — the rate is what strategy can change. Sellers: run every product through the fee calculator for its platform before pricing, then the margin, markup and break-even tools to set a price that survives fees, ads and returns.",
      ],
      bullets: [
        "Creator earnings: YouTube money, TikTok, Instagram money, Twitch.",
        "Rates and reach: YouTube CPM/RPM, Instagram engagement rate.",
        "Seller fees: Etsy, eBay, sales tax & VAT.",
        "Pricing: profit margin, markup, ROI, break-even ROAS.",
      ],
    },
    example: {
      heading: "A worked example",
      paragraphs: [
        "A $45 Etsy sale (item plus shipping) loses about $5.35 to listing, transaction and processing fees — roughly 12% — before materials. If an Offsite Ads fee attaches, another 12–15% leaves. A seller who priced for a 40% margin on materials alone can discover the platform stack consumed most of it. The fee calculators exist so that discovery happens before the listing goes live, in the price, not after it, in the payout.",
      ],
    },
    mistakes: [
      "Quoting YouTube CPM as earnings; RPM, after the platform share and unmonetised views, is the number that reaches the bank.",
      "Pricing products on material cost plus a markup, without the platform fee stack and return rate.",
      "Treating sales tax as a cost of the product rather than a collected amount to remit — and missing nexus obligations in states you ship into.",
    ],
    faqs: [
      { question: "Why do two channels with equal views earn so differently?", answer: "Advertisers pay for audience intent and geography. A US personal-finance viewer can be worth ten times a general entertainment viewer elsewhere; niche and country mix explain most earnings gaps." },
      { question: "Which marketplace is cheapest to sell on?", answer: "At base rates, Etsy is usually cheaper than eBay; with advertising fees triggered, the order can flip. Run your own price point through both fee calculators — the answer depends on the sale." },
    ],
    guideSlugs: ["how-youtube-pays-creators", "etsy-and-ebay-fees-explained"],
  },
]

export const getHub = (slug: string) => HUBS.find((h) => h.slug === slug)
