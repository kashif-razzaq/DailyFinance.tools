/**
 * Tool content — freelance lane: the 12 freelance calculators.
 * Written in the TONE-OF-VOICE.md voice (professional, direct, concrete numbers).
 * Keyed by URL path without the leading slash, e.g. "freelance/billable-hours-calculator".
 * Tax figures are the verified 2026 IRS/SSA numbers (Rev. Proc. 2025-32) and are
 * labelled estimates. Worked examples use each calculator's own defaults and formulas.
 */
import type { ToolContentEntry } from "./tool-content";

export const TOOL_CONTENT_FREELANCE: Record<string, ToolContentEntry> = {
  "freelance/freelance-hourly-rate-calculator": {
    quickAnswer:
      "A freelancer targeting $75,000 take-home pay, with $5,000 of expenses, a 25% tax rate and 1,152 billable hours a year, needs a minimum acceptable rate of about $100 an hour. The rate rises fast when billable hours fall: at 60% utilization, 40% of your working week earns nothing.",
    howItWorks: [
      "Enter your target take-home pay — the annual income you want after tax — plus your yearly business expenses: software, insurance, equipment, coworking and accounting. The calculator first grosses up your target for tax, because at a 25% tax rate you must earn $100,000 before tax to keep $75,000. Expenses are added on top, since clients must fund them as well as your salary.",
      "Billable hours are where most rate math goes wrong. The calculator takes (52 − weeks off) × weekly hours × billable utilization: with 4 weeks off, a 40-hour week and 60% utilization, that is 48 × 40 × 60% = 1,152 hours, not 2,080. The other 40% — admin, marketing, invoicing, business development — is real work that no client pays for directly.",
      "The tax rate slider is a single combined estimate for self-employment tax plus income tax — the default is 25%. Self-employment tax alone is 15.3% of 92.35% of net profit, so the slider should sit above 15.3% for almost every US freelancer. Set it from last year's actual effective rate if you have one; the 20% QBI deduction can push the real figure lower.",
      "The profit buffer — 10% by default — is the margin that turns a survival rate into a sustainable one. It funds equipment replacement, slow months, retirement contributions and reinvestment, and it is applied after tax and expenses, so the gross revenue target is (pre-tax income + expenses) × (1 + buffer). A 0% buffer means one bad month eats your take-home pay.",
      "The result is your minimum acceptable rate (MAR) — a floor, not a price. The calculator also shows a day rate (MAR × your average hours per day) and a monthly retainer (gross revenue ÷ 12), plus a breakdown of where each dollar goes. Charge above the floor when the market allows; never accept work below it for long, because the gap comes out of your tax bill or your savings.",
    ],
    formula:
      "Minimum acceptable rate = [(target take-home pay ÷ (1 − tax rate)) + annual expenses] × (1 + profit buffer) ÷ billable hours, where billable hours = (52 − weeks off) × weekly hours × utilization.",
    example: {
      title: "Worked example: $75,000 target income at 60% utilization",
      body: "Target take-home pay is $75,000, expenses are $5,000, the tax rate is 25%, with 4 weeks off, a 40-hour week, 60% utilization and a 10% profit buffer. Grossing up for tax gives $75,000 ÷ 0.75 = $100,000; adding expenses makes $105,000, and the buffer lifts gross revenue to $115,500. Billable hours are 48 × 40 × 60% = 1,152, so the minimum acceptable rate is $115,500 ÷ 1,152 = $100.26 an hour. The day rate is $802 and the monthly retainer is $9,625. At 100% utilization the same inputs would give $60.16 an hour — the utilization assumption, not the salary target, is what sets the rate.",
    },
    faqs: [
      {
        question: "How do you calculate a freelance hourly rate?",
        answer:
          "Add your target annual take-home pay, grossed up for tax, to your annual business expenses, then add a profit buffer and divide by your true billable hours — usually 1,000 to 1,200 a year, not 2,080. At the defaults here ($75,000 target, 25% tax, 1,152 billable hours) the minimum acceptable rate is about $100 an hour.",
      },
      {
        question: "What is the difference between billable and non-billable hours?",
        answer:
          "Billable hours are the hours a client pays for — work on their project. Non-billable hours keep the business running: marketing, proposals, invoicing, admin and learning. Most freelancers bill 50–60% of their working hours, which is why the utilization slider moves your minimum rate more than any other input.",
      },
      {
        question: "Why shouldn't I just charge what my competitors charge?",
        answer:
          "Competitor rates tell you what the market will bear — your ceiling. Your minimum acceptable rate tells you what your costs demand — your floor. Competitors have different expenses, tax situations and utilization, so copying their rate can leave you working at a loss. Price above your floor; use market rates to judge how far above it you can go.",
      },
      {
        question: "When should I move from hourly rates to value-based pricing?",
        answer:
          "When your speed stops being the thing clients pay for. Hourly billing pays you less as you get faster; flat fees and value-based prices pay for the outcome, so efficiency raises your effective rate instead of cutting it. Use your minimum acceptable rate as the floor for any flat quote, then price on the result's value to the client.",
      },
    ],
  },

  "freelance/quarterly-estimated-tax-calculator": {
    quickAnswer:
      "On $85,000 of net freelance income in 2026, total tax comes to about $20,968 — $5,242 per quarter — at a 4.5% state rate with the QBI deduction claimed. Self-employment tax alone is $12,010, more than half the bill, because no employer withholds anything from 1099 income.",
    howItWorks: [
      "Enter your net business income — revenue minus Schedule C expenses — your state income tax rate, and whether you claim the QBI deduction. The calculator models a single filer for tax year 2026, using the $16,100 standard deduction and the 2026 federal brackets. It estimates federal income tax, self-employment tax and state tax, then divides the total into four equal quarterly payments.",
      "Self-employment tax comes first. Your net income is multiplied by 92.35% to find net earnings from self-employment, then taxed at 15.3%: 12.4% for Social Security on earnings up to the $184,500 wage base for 2026, plus 2.9% for Medicare on all earnings. Half of the resulting tax is deductible from your income, which softens the blow on the income-tax side.",
      "Federal income tax is calculated on what is left. Adjusted gross income is net income minus half the self-employment tax; then the $16,100 standard deduction and the 20% QBI deduction come off. The QBI deduction is permanent from 2026 under the One Big Beautiful Bill Act, and the full 20% applies below $201,750 of taxable income for single filers. The 2026 brackets then apply: 10% to $12,400, 12% to $50,400 and 22% to $105,700.",
      "State tax is estimated as your adjusted gross income multiplied by the state rate you enter — 4.5% by default. Add the three taxes together and divide by four for the quarterly payment, due April 15, June 15 and September 15, 2026, with the final installment on January 15, 2027. The calculator also shows your effective tax rate: total tax divided by net income.",
      "The safe harbor rule decides whether a short payment draws a penalty. Pay at least the smaller of 90% of this year's tax or 100% of last year's tax in four on-time installments, and no underpayment penalty applies; the prior-year figure rises to 110% if last year's adjusted gross income exceeded $150,000. You must make estimated payments if you expect to owe $1,000 or more after withholding and credits.",
    ],
    formula:
      "Quarterly payment = (self-employment tax + federal income tax + state tax) ÷ 4, where self-employment tax = net income × 92.35% × 15.3%, with the 12.4% Social Security portion capped at the $184,500 wage base.",
    example: {
      title: "Worked example: $85,000 net income, single filer, 2026",
      body: "Net income is $85,000 and the state rate is 4.5%, with the QBI deduction claimed. Self-employment earnings are $85,000 × 92.35% = $78,497.50; Social Security tax is $9,733.69 and Medicare is $2,276.43, for $12,010.12 of self-employment tax. Adjusted gross income is $78,994.94, the QBI deduction is $15,798.99, and taxable income after the $16,100 standard deduction is $47,095.95. Federal income tax is $5,403.51 and state tax is $3,554.77, so the total is $20,968.40 — a quarterly payment of $5,242.10 and an effective rate of 24.7%. The Social Security portion stays below the $184,500 wage base, so the cap does not bind at this income; it starts to matter above roughly $200,000 of net income.",
    },
    faqs: [
      {
        question: "How do you calculate 1099 quarterly estimated taxes?",
        answer:
          "Multiply net freelance income by 92.35% and apply the 15.3% self-employment tax. Subtract half that tax and the $16,100 standard deduction, apply the 20% QBI deduction if eligible, then run the result through the federal brackets and add state tax. Divide the total annual liability by four for each quarterly payment.",
      },
      {
        question: "What is the self-employment tax rate for freelancers in 2026?",
        answer:
          "The rate is 15.3%: 12.4% for Social Security on net earnings up to the $184,500 wage base, plus 2.9% for Medicare on all net earnings. It applies to 92.35% of net profit, not the full amount. Above $200,000 of earnings ($250,000 married filing jointly), an additional 0.9% Medicare tax applies.",
      },
      {
        question: "What are the IRS safe harbor rules for quarterly payments?",
        answer:
          "Pay the smaller of 90% of this year's total tax or 100% of last year's total tax, in four on-time installments, and the underpayment penalty does not apply. If last year's adjusted gross income exceeded $150,000 ($75,000 married filing separately), the prior-year figure becomes 110%. The penalty is avoided even if you still owe a balance at filing.",
      },
      {
        question: "What happens if I miss a quarterly estimated tax payment?",
        answer:
          "Pay it as soon as possible — the underpayment penalty works like interest and accrues daily until the shortfall is paid. The IRS rate was 7% for most of 2026 (6% for April through June). The penalty is calculated on Form 2210 and can apply even if you pay in full with your return, because the installments themselves were late.",
      },
    ],
  },

  "freelance/freelance-emergency-fund-calculator": {
    quickAnswer:
      "A freelancer spending $4,000 a month with volatile income needs about $20,000 — five months of expenses — as an emergency fund. The calculator sizes the buffer from your actual income swings, your biggest client's share of revenue and how slowly clients pay, not from a generic months-of-expenses rule.",
    howItWorks: [
      "Enter your essential monthly living costs plus your business overhead — the two together are your baseline monthly burn, $4,000 by default. Then add your income for the last six months, the share your largest client contributes, your average days to get paid, your current savings and how many months you want to take building the buffer. Six months of history is the minimum for a meaningful volatility reading.",
      "The volatility index measures how wildly your income swings: the standard deviation of your monthly income divided by its average. Below 20% counts as low, 20–40% as medium, and above 40% as high. The calculator starts from a 3-month base and adds nothing for low volatility, 1.5 months for medium and 3 months for high — a feast-or-famine income needs roughly double the buffer of a steady one.",
      "Two more risks add months. If your largest client provides 40% or more of your income, the calculator adds 1.5 months, because losing that client is a sudden income shock rather than a slow decline. Slow payment adds half a month for every 30 days of average payment time — a 60-day average adds a full month, since your bills arrive long before your invoices are settled.",
      "A second method cross-checks the result against your worst months. It takes three months of baseline expenses and adds four times the shortfall in a lean month — the 25th percentile of your income history. If your lean month brings in $3,200 against $4,000 of expenses, that adds $3,200 to the target. The final recommendation is the larger of the two methods.",
      "The output is a target buffer, the gap between it and your current savings, and a monthly savings figure: the gap divided by the months you set to build it. Re-run the calculation when your income pattern changes — landing a retainer or losing a big client moves the volatility index, and the right buffer moves with it. Keep the fund in a separate, instantly accessible account.",
    ],
    formula:
      "Recommended buffer = the larger of (baseline expenses × months required) and (3 × baseline + 4 × lean-month shortfall). Months required = 3 + volatility adjustment + concentration adjustment + (days to get paid ÷ 30) × 0.5.",
    example: {
      title: "Worked example: $4,000 monthly burn and volatile income",
      body: "Essential living costs are $3,500 and business overhead is $500, so the baseline is $4,000 a month. Six months of income — $5,000, $3,200, $7,500, $2,800, $6,000 and $4,100 — average $4,767 with a volatility index of 37%, which counts as medium and adds 1.5 months. The top client is 35% of income, below the 40% trigger, and 30-day payment terms add 0.5 months, so 5 months are required: 5 × $4,000 = $20,000. The lean-month check uses the $3,200 low month: 3 × $4,000 + 4 × $800 = $15,200, so the volatility method stands. With $4,000 saved, the gap is $16,000 — $2,667 a month over six months.",
    },
    faqs: [
      {
        question: "How many months of emergency fund does a freelancer need?",
        answer:
          "Employees are usually told 3 to 6 months; freelancers generally need 6 to 12, because income is irregular and a lost client can cut revenue overnight. This calculator starts from 3 months and adds more for income volatility, client concentration and slow payment — at the defaults it recommends 5 months, or $20,000.",
      },
      {
        question: "What is the income volatility index?",
        answer:
          "It is the coefficient of variation of your monthly income: the standard deviation divided by the average. A score below 20% is low volatility, 20–40% is medium and above 40% is high. At the defaults, six months ranging from $2,800 to $7,500 give an index of 37% — medium — which adds 1.5 months to the recommended buffer.",
      },
      {
        question: "What is single-client concentration risk?",
        answer:
          "It is the danger of one client dominating your income. If a client paying 40% or more of your revenue leaves, your cash flow collapses before you can replace them, so the calculator adds 1.5 months to your buffer at that level. A common guideline is that no single client should exceed 20–25% of revenue.",
      },
      {
        question: "What is days sales outstanding (DSO) for freelancers?",
        answer:
          "DSO is the average number of days between sending an invoice and getting paid. A 45- to 60-day DSO ties up your cash for two months, so you live off your buffer while waiting. The calculator adds half a month to the recommended buffer for every 30 days of average payment time.",
      },
    ],
  },

  "freelance/stripe-paypal-fee-calculator": {
    quickAnswer:
      "On a $2,500 invoice paid from the US to Europe at a 0.92 exchange rate, Wise keeps €2,289.70, Stripe €2,176.54 and PayPal €2,119.41. PayPal costs €170.29 more than Wise per invoice — €2,043 a year on 12 invoices — mostly through its 3.5% currency-conversion spread.",
    howItWorks: [
      "Enter your invoice amount, the two currencies, the mid-market exchange rate and how many such invoices you send a year. The calculator first works out the true value — invoice amount × mid-market rate — then shows what each payment rail actually delivers after its fees and exchange-rate markup. The gap between the two is the total drag on your invoice.",
      "Stripe charges 2.9% plus 30 cents on a domestic US card payment, plus 1.5% when the card was issued outside the US, giving 4.4% plus 30 cents for an international card. On top of that, Stripe adds a 1% currency-conversion fee when the payment has to be converted into your settlement currency. The calculator applies both layers in sequence.",
      "PayPal charges 2.99% plus 49 cents on a domestic card payment, plus a 1.5% cross-border surcharge, giving 4.49% plus 49 cents for an international commercial transaction. The larger cost is the currency-conversion spread of 3–4%, which PayPal builds into its exchange rate instead of itemizing — the calculator uses 3.5%, the middle of that range.",
      "Wise converts at the mid-market rate with no spread and charges a small variable fee instead — the calculator models 0.43% plus a $0.45 fixed fee for the USD-to-EUR route. Wise's fee varies by currency pair, from 0.23% upward, so check the quote for your own corridor before switching rails on the strength of the comparison.",
      "The result shows each provider's net payout, its total drag as a percentage of the true value, and the annual saving from switching to the cheapest rail. The fixed fees matter most on small invoices: 30 or 49 cents is trivial on $2,500 but 5% of a $10 payment, so the cheapest rail for large invoices is not always the cheapest for small ones. Fees change: Stripe and PayPal have both adjusted their schedules in recent years, so re-check their published fee pages quarterly and treat the calculator's rates as the defaults for its comparison, not a live quote.",
    ],
    formula:
      "Net payout = (invoice − percentage fee − fixed fee) × mid-market rate × (1 − conversion spread). Total drag = (true value − net payout) ÷ true value, where true value = invoice × mid-market rate.",
    example: {
      title: "Worked example: $2,500 invoice, USD to EUR, 12 a year",
      body: "A $2,500 invoice at a 0.92 mid-market rate is truly worth €2,300. Stripe takes 4.4% plus $0.30 ($110.30), then converts the remaining $2,389.70 at a rate 1% below mid-market, paying out €2,176.54 — a 5.37% drag. PayPal takes 4.49% plus $0.49 ($112.74), then converts at a rate 3.5% below mid-market, paying out €2,119.41 — a 7.85% drag. Wise takes 0.43% plus $0.45 ($11.20) and converts at the mid-market rate, paying out €2,289.70 — a 0.45% drag. Over 12 invoices a year, Wise saves €1,357.89 against Stripe and €2,043.44 against PayPal.",
    },
    faqs: [
      {
        question: "What is an FX spread?",
        answer:
          "An FX spread is the markup a payment provider builds into its exchange rate. If the mid-market rate is $1 = €0.92, a provider with a 3.5% spread converts at about €0.89, keeping the difference. It never appears as a line item, which is why PayPal's true cost is far higher than its headline 4.49% fee suggests.",
      },
      {
        question: "How do PayPal cross-border fees work?",
        answer:
          "PayPal stacks three charges on an international commercial payment: the 2.99% plus $0.49 domestic card fee, a 1.5% cross-border surcharge (4.49% plus $0.49 in total), and a currency-conversion spread of 3–4% when the money changes currency. On a converted payment the combined cost runs to roughly 8% of the invoice.",
      },
      {
        question: "How can freelancers avoid FX fees?",
        answer:
          "Use a multi-currency account such as Wise or Payoneer: give the client local bank details in their currency, receive the funds without a cross-border fee, then convert at the mid-market rate for a small transparent fee. On the calculator's defaults, Wise costs 0.45% of the invoice against PayPal's 7.85% — a €2,043 annual difference on 12 invoices.",
      },
      {
        question: "Is Stripe cheaper than PayPal for international clients?",
        answer:
          "Generally, yes. Stripe charges 4.4% plus 30 cents for an international card plus a 1% conversion fee, while PayPal charges 4.49% plus 49 cents plus a 3–4% conversion spread. On the calculator's $2,500 default invoice, Stripe pays out €2,176.54 against PayPal's €2,119.41 — €57.13 more per invoice.",
      },
    ],
  },

  "freelance/freelance-project-pricing-calculator": {
    quickAnswer:
      "A 40-hour project at $100 an hour, with a 20% communication buffer and medium risk, should be quoted at $7,800 flat — not $4,000. The buffer and risk premium add $2,240, and a 25% value multiplier lifts the quote to an effective $195 an hour.",
    howItWorks: [
      "Enter your estimated execution hours, your target hourly rate, a communication buffer percentage, a risk level, and the financial return the project will generate for the client. The calculator builds a flat-fee quote from your costs first, then checks it against what the work is worth to the client — and quotes the higher of the two.",
      "The communication buffer covers the hours a project consumes beyond execution: emails, calls, status updates, revision rounds and admin. A 20% buffer turns 40 estimated hours into 48 billed hours. Freelancers who skip this step quote their execution time and donate the rest; the buffer is where that unpaid work gets priced. The buffer is a percentage of execution hours, not a fixed number of hours, so it scales with the project: a 200-hour engagement at 20% prices 40 hours of communication, which is realistic for a project with weekly status calls and several stakeholders.",
      "The risk multiplier prices the uncertainty you absorb by quoting flat. Low risk multiplies the buffered cost by 1.15, medium by 1.30 and high by 1.55 — use high for vague requirements, new technology, difficult clients or tight deadlines. The result is your cost-plus floor: buffered hours × hourly rate × risk multiplier.",
      "The value check compares that floor with an ROI anchor: the client's expected return multiplied by your share of it, 10% by default. The quote is the larger of the floor × 1.25 (a value multiplier) and the ROI anchor. If the project makes the client $250,000, a 10% share prices it at $25,000 regardless of your hours.",
      "The output shows the flat fee, your effective hourly rate (fee ÷ estimated hours), a 50/50 deposit and milestone split, and a fee for an extra revision round — 15% of estimated hours at your rate. Quote the flat fee in the proposal; keep the effective rate for yourself, as the check that the project is worth taking.",
    ],
    formula:
      "Flat fee = the larger of (buffered hours × hourly rate × risk multiplier × 1.25) and (client ROI × ROI share %), where buffered hours = estimated hours × (1 + communication buffer %) and the risk multiplier is 1.15, 1.30 or 1.55.",
    example: {
      title: "Worked example: 40-hour project at $100 an hour",
      body: "A 40-hour project at $100 an hour starts at $4,000 of execution cost. A 20% communication buffer lifts it to 48 hours, and the medium risk multiplier of 1.30 gives a cost-plus floor of $6,240. The 1.25 value multiplier raises that to $7,800. The ROI anchor is $25,000 × 10% = $2,500, so the cost-plus price stands and the flat fee is $7,800 — an effective $195 an hour. The deposit and final milestone are $3,900 each, and an extra revision round is priced at $600 (15% of 40 hours at $100).",
    },
    faqs: [
      {
        question: "How do you calculate a flat fee for a project?",
        answer:
          "Multiply your estimated execution hours by your hourly rate, add a communication buffer of 15–20% for emails, calls and admin, then apply a risk premium of 15–55% depending on how uncertain the scope is. Compare the result with a share of the client's expected return and quote the higher figure — at the defaults here, that is $7,800 for a 40-hour project.",
      },
      {
        question: "Why should freelancers charge flat fees instead of hourly?",
        answer:
          "Hourly billing punishes efficiency: the faster you finish, the less you earn. A flat fee pays for the outcome, so better systems and experience raise your effective hourly rate instead of cutting it. At the defaults, a $7,800 flat fee on a 40-hour project is $195 an hour — nearly double the $100 rate it was built from.",
      },
      {
        question: "What is a risk premium in project pricing?",
        answer:
          "A risk premium is the markup that compensates you for absorbing uncertainty on a flat-fee project: unclear requirements, scope creep, difficult clients and technical surprises all cost you hours you cannot bill separately. This calculator applies a 1.15 multiplier for low risk, 1.30 for medium and 1.55 for high risk.",
      },
      {
        question: "How do I handle scope creep on a flat-fee project?",
        answer:
          "Define what is out of scope in the statement of work before you start, and price extra work through a change order when a request falls outside it. The calculator prices an extra revision round at 15% of estimated hours — $600 on the defaults — so you can quote the addition immediately instead of absorbing it.",
      },
    ],
  },

  "freelance/client-lifetime-value-calculator": {
    quickAnswer:
      "A $2,500-a-month retainer client who stays 20 months at 80% gross margin is worth $44,000 in lifetime profit. That caps what you can spend to win one at $11,000 on a 4:1 LTV-to-CAC ratio — and the cost pays back in 5.5 months.",
    howItWorks: [
      "Enter your average monthly retainer, your monthly churn rate, your gross margin, the expansion you expect from upsells and rate rises, and your target LTV-to-CAC ratio. The calculator turns those five inputs into a lifetime value, a maximum acquisition cost and a payback period — the three numbers that decide whether a marketing channel is worth paying for.",
      "Client lifespan is 1 ÷ monthly churn rate, capped at 60 months. At 5% monthly churn, the average client stays 20 months; at 10%, only 10 months. Small churn changes swing lifetime value hard, which is why retention work — onboarding, regular check-ins, quick responses — usually pays better than new-client marketing. The 60-month cap keeps the math honest for very low churn: at 1% monthly churn the raw formula would claim a 100-month lifespan, which no freelancer should plan around.",
      "Gross lifetime value is the monthly retainer × lifespan × (1 + expansion %). The expansion input captures the retainer growing over the relationship: a 10% expansion on a $2,500 retainer adds $250 a month of eventual value. Net lifetime value then applies your gross margin, because revenue is not value — subcontractors, software and delivery time come out first.",
      "Maximum CAC is net lifetime value ÷ your target ratio. At 4:1, a client worth $44,000 justifies up to $11,000 of acquisition cost. The payback period divides that maximum by monthly gross profit: $11,000 ÷ $2,000 a month is 5.5 months before the client has paid back what they cost to win.",
      "The health rating reads the result back to you: churn above 15% a month is critical, a payback longer than 6 months is at risk, longer than 3 months is fair, and anything shorter is strong. Use the maximum CAC as a hard ceiling when pricing ads, referral fees or platform commissions — a channel that costs more per client than the ceiling loses money however good it looks.",
    ],
    formula:
      "Net LTV = monthly retainer × (1 ÷ monthly churn rate) × (1 + expansion %) × gross margin %. Maximum CAC = net LTV ÷ target LTV:CAC ratio. Payback = maximum CAC ÷ monthly gross profit.",
    example: {
      title: "Worked example: $2,500 retainer, 5% monthly churn",
      body: "A $2,500 monthly retainer with 5% monthly churn gives a lifespan of 1 ÷ 0.05 = 20 months. Gross lifetime value is $2,500 × 20 × 1.10 (10% expansion) = $55,000, and at 80% gross margin the net lifetime value is $44,000. On a 4:1 target ratio, the maximum acquisition cost is $44,000 ÷ 4 = $11,000. Monthly gross profit is $2,500 × 80% = $2,000, so the payback period is $11,000 ÷ $2,000 = 5.5 months, rated Fair. If churn doubled to 10%, lifespan would halve to 10 months and net lifetime value would fall to $22,000.",
    },
    faqs: [
      {
        question: "What is client LTV?",
        answer:
          "Client lifetime value is the total gross profit a client generates over the whole relationship, after delivery costs. It is the monthly retainer × how many months the client stays × your gross margin, with expansion from upsells added. At the defaults — $2,500 a month, 20 months, 80% margin — one client is worth $44,000.",
      },
      {
        question: "What is a good LTV to CAC ratio for freelancers?",
        answer:
          "A healthy ratio is 3:1 or higher: each dollar spent winning a client returns at least three dollars of lifetime profit. This calculator defaults to 4:1, which caps acquisition cost at $11,000 for a client worth $44,000. Below 1:1 you lose money on every client you win, however busy the business looks.",
      },
      {
        question: "How do you calculate LTV for retainer clients?",
        answer:
          "Divide your average monthly profit per client by your monthly churn rate. At $2,000 of monthly gross profit and 5% churn, lifetime value is $2,000 ÷ 0.05 = $40,000 before expansion. This calculator adds an expansion factor for upsells and rate rises, then applies your gross margin to get net lifetime value.",
      },
      {
        question: "Why should I include gross margin in my LTV calculation?",
        answer:
          "Revenue is vanity; profit is what you can spend. If a client pays $5,000 a month but costs $4,000 in subcontractors and software to serve, the client is worth $1,000 a month to your business, not $5,000. At the defaults, the 80% margin turns $55,000 of lifetime revenue into $44,000 of lifetime profit.",
      },
    ],
  },

  "freelance/self-employment-tax-calculator": {
    quickAnswer:
      "On $100,000 of net self-employment earnings in 2026, self-employment tax is $14,129.55: $11,451.40 of Social Security tax and $2,678.15 of Medicare tax, an effective rate of 14.13%. Half of that tax — $7,064.78 — is deductible from your income tax, saving about $1,554 at a 22% marginal rate.",
    howItWorks: [
      "Enter your net earnings from self-employment — your Schedule C net profit, revenue minus deductible business expenses — and your filing status. The calculator follows Schedule SE: it first reduces net earnings by any home-office deduction you enter, then multiplies by 92.35% to find the SE-tax base. That 92.35% step exists because employees never pay payroll tax on the employer's share; the self-employed get the same treatment through the multiplier.",
      "Social Security tax is 12.4% of the base, but only up to the 2026 wage base of $184,500. On the $100,000 example the base is $92,350, so the full base is taxed and Social Security takes $11,451.40. The cap starts to matter once net earnings pass about $199,800 — above that, the Social Security line stops growing while Medicare keeps rising.",
      "Medicare tax is 2.9% of the full base with no cap — $2,678.15 on the example. High earners pay an additional 0.9% Medicare tax on the base above $200,000 for single filers or $250,000 for married couples filing jointly. The threshold is set by your filing status, which is why the calculator asks for it.",
      "The home-office deduction is an optional input that reduces net earnings before the calculation starts. A $2,760 deduction on the example cuts the base to $89,801 and the total tax to $13,740, saving about $390 of SE tax. Enter whatever home-office deduction you claim — the simplified $5-per-square-foot method or actual expenses — or leave it at zero.",
      "The deduction for one-half of SE tax softens the bill on the income-tax side. You deduct half the SE tax — $7,064.78 on the example — from your income when figuring federal income tax, which at a 22% marginal rate saves about $1,554. It does not reduce the SE tax itself, and it is not the same as the 20% QBI deduction, which lowers income tax further. The calculator shows the effective rate too: 14.13% on the example, because the 92.35% step means the 15.3% rate applies to less than your full earnings.",
    ],
    formula:
      "SE-tax base = (net earnings − home-office deduction) × 92.35%. Social Security tax = 12.4% of the base up to $184,500. Medicare tax = 2.9% of the base, plus 0.9% above $200,000 single or $250,000 joint. Total SE tax = Social Security + Medicare. One-half of SE tax is deductible for income tax.",
    example: {
      title: "Worked example: $100,000 net earnings, single filer, 2026",
      body: "Net earnings are $100,000 with no home-office deduction. The SE-tax base is $100,000 × 92.35% = $92,350. Social Security tax is 12.4% of the base, $11,451.40, and Medicare tax is 2.9%, $2,678.15. Total SE tax is $14,129.55, an effective rate of 14.13% on net earnings, leaving $85,870.45 after SE tax. The one-half deduction is $7,064.78, worth about $1,554 of income-tax saving at a 22% marginal rate. The base is well below the $200,000 additional-Medicare threshold, so no 0.9% tax applies. Claiming a $2,760 home-office deduction would cut the base to $89,801 and the tax to $13,740.",
    },
    faqs: [
      {
        question: "What is the self-employment tax rate?",
        answer:
          "15.3% on 92.35% of net earnings: 12.4% for Social Security up to the $184,500 wage base for 2026, plus 2.9% for Medicare on all earnings. Because the 92.35% step shrinks the base first, the effective rate on net earnings is 14.13% below the wage base. Above $200,000 of earnings ($250,000 married filing jointly), an additional 0.9% Medicare tax applies.",
      },
      {
        question: "Why is the SE-tax base 92.35% of net earnings?",
        answer:
          "Employees pay payroll tax only on their wages, never on the employer's matching share. The self-employed are both employer and employee, so Schedule SE multiplies net earnings by 92.35% — roughly 100% minus the 7.65% employer share — before applying the 15.3% rate. It is the same treatment, applied through the multiplier instead of a separate employer payment.",
      },
      {
        question: "What is the deduction for one-half of SE tax?",
        answer:
          "You may deduct half of your self-employment tax from your income when figuring federal income tax. On $100,000 of net earnings the deduction is $7,064.78, worth about $1,554 at a 22% marginal rate. It lowers income tax only — it does not reduce the SE tax itself — and it is separate from the 20% QBI deduction.",
      },
      {
        question: "Does a home-office deduction lower self-employment tax?",
        answer:
          "Yes. A home-office deduction claimed on Schedule C reduces your net earnings before the SE-tax calculation, so it lowers both income tax and SE tax. A $2,760 deduction on $100,000 of net earnings cuts SE tax by about $390. Enter your deduction in the calculator, or leave it at zero if you do not claim one.",
      },
    ],
  },

  "freelance/s-corp-tax-savings-calculator": {
    quickAnswer:
      "On $120,000 of net business income with a $48,000 salary, an S-corp election saves about $9,269 a year in payroll taxes: $16,955 of self-employment tax as a sole proprietor against $7,686 of S-corp payroll tax. The saving is gross — admin costs of roughly $1,500 a year come off it.",
    howItWorks: [
      "Enter your net business income and the share of it you would take as a W-2 salary. The calculator compares two ways of taxing the same profit: as a sole proprietor (or single-member LLC taxed as one), where the whole profit carries self-employment tax, and as an S-corp, where only the salary carries payroll tax and the rest flows out as distributions.",
      "The sole-proprietor baseline is the 15.3% self-employment tax on 92.35% of net income: 12.4% for Social Security up to the annual wage base, plus 2.9% for Medicare on all earnings. On $120,000 of net income that is $16,955. Every dollar of profit is taxed, which is why the S-corp split has anything to save.",
      "Under the S election, your salary goes through payroll and pays FICA — the 7.65% employee share plus the 7.65% employer share, 15.3% combined — while distributions escape payroll tax entirely. The calculator also adds about $342 a year of unemployment tax: $42 of FUTA (0.6% on the first $7,000 of wages after the state credit) plus roughly $300 of state unemployment tax. A higher salary shrinks the QBI deduction, because the salary is a business expense that reduces qualified business income — another reason the salary choice has two-way consequences.",
      "The salary is the whole argument. The IRS requires reasonable compensation for the work you do, judged on the facts: your duties, experience, hours and what comparable businesses pay for similar services. There is no fixed percentage that is safe — the 60/40 rule is a myth — and if the salary is too low the IRS can reclassify distributions as wages, with back taxes, penalties and interest.",
      "The calculator flags the election as worthwhile when gross payroll-tax savings exceed $2,000, but the saving it shows is before admin costs: payroll service, a separate Form 1120-S return and extra bookkeeping run roughly $1,500 a year. The break-even point is typically around $80,000 to $100,000 of net business income; below it, the admin usually eats the saving.",
    ],
    formula:
      "Annual saving = sole-proprietor self-employment tax − (FICA on W-2 salary + unemployment tax), where sole-proprietor tax = net income × 92.35% × 15.3% and FICA applies only to the salary portion.",
    example: {
      title: "Worked example: $120,000 net income, 40% salary",
      body: "Net business income is $120,000 and the salary ratio is 40%, so the W-2 salary is $48,000 and distributions are $72,000. As a sole proprietor, self-employment earnings are $120,000 × 92.35% = $110,820, and the 15.3% tax is $16,955.46. As an S-corp, FICA on the $48,000 salary is $7,344, plus $342 of unemployment tax, for $7,686 of payroll tax. Gross saving is $16,955.46 − $7,686 = $9,269.46. After roughly $1,500 of admin costs, about $7,769 remains — provided the $48,000 salary is defensible as reasonable compensation for the work done.",
    },
    faqs: [
      {
        question: "At what income level should a freelancer switch to an S-corp?",
        answer:
          "The break-even point is typically around $80,000 to $100,000 of net business income. Below it, payroll service, the Form 1120-S return and extra bookkeeping — roughly $1,500 a year — usually outweigh the FICA savings. This calculator flags the election as worthwhile when gross payroll-tax savings exceed $2,000 a year.",
      },
      {
        question: "What is reasonable compensation?",
        answer:
          "It is the salary the IRS requires an S-corp owner-employee to pay themselves before taking distributions: what a comparable business would pay for the same work. The test looks at duties, experience, hours and market pay for similar roles. There is no fixed percentage or safe-harbor split in the tax code or regulations.",
      },
      {
        question: "Are S-corp distributions completely tax-free?",
        answer:
          "No. Distributions escape FICA payroll tax — the 15.3% that is the whole point of the election — but you still pay federal and state income tax on them. The saving is the payroll tax on the distribution portion only, and it is reduced by the cost of running payroll and filing the separate corporate return.",
      },
      {
        question: "What are the hidden costs of an S-corp?",
        answer:
          "Running an S-corp means a payroll service, a separate corporate tax return (Form 1120-S), federal and state unemployment taxes, and more complex bookkeeping — typically $1,500 to $2,500 a year. The calculator shows gross payroll-tax savings before these costs, so subtract them before deciding the election is worth it.",
      },
    ],
  },

  "freelance/billable-hours-calculator": {
    quickAnswer:
      "Four unbilled scope-creep hours a week at $100 an hour cost $19,200 a year — and tracking software that recovers them returns $26,256 a year net of its $144 annual cost, about 182 times what it costs. The hours are already worked; the only question is whether they get billed.",
    howItWorks: [
      "Enter the hours you lose each week to unbilled scope creep, the hours you spend on manual time tracking and admin, your hourly rate and the monthly cost of tracking software. The calculator assumes 48 working weeks a year and turns those four inputs into the revenue you lose, the admin time software can return, and the net return on the software.",
      "Lost revenue is the scope-creep line: unbilled hours × hourly rate × 48 weeks. Four hours a week at $100 an hour is $19,200 a year of work already done and never invoiced — the 'just one more quick change' that falls outside the statement of work and gets absorbed because nobody is counting.",
      "The admin line is the time tracking software gives back. The calculator assumes good software saves 75% of your manual tracking time — the spreadsheet entries, the end-of-month reconstruction, the invoice arithmetic. Two manual hours a week become 1.5 hours saved, worth $7,200 a year at $100 an hour.",
      "Net ROI is recovered revenue plus admin time saved, minus the software's annual cost. The ROI multiplier divides that net figure by the annual software cost, so a $26,256 net return on a $144 subscription is a 182x multiple. The multiple looks absurd because the subscription is trivial next to an hour of your rate. If the software cost were zero, the multiplier would be meaningless — the metric only works because the cost is real but small.",
      "The deeper point is the record, not the software. Tracked hours turn a vague 'quick favor' into a priced change order: two hours at $100 is $200 added to the budget, agreed before the work starts. Even flat-fee freelancers need the record — without it, there is no way to know whether a $5,000 project took 20 hours or 100.",
    ],
    formula:
      "Net ROI = (unbilled scope-creep hours × hourly rate × 48) + (weekly admin hours × 75% × hourly rate × 48) − (monthly software cost × 12). ROI multiplier = net ROI ÷ annual software cost.",
    example: {
      title: "Worked example: 4 lost hours a week at $100 an hour",
      body: "A freelancer loses 4 hours a week to unbilled scope creep, spends 2 hours a week on manual time tracking, charges $100 an hour and pays $12 a month for tracking software. Lost revenue is 4 × $100 × 48 = $19,200 a year. Admin time saved is 2 × 75% = 1.5 hours a week, worth 1.5 × $100 × 48 = $7,200 a year. The software costs $12 × 12 = $144 a year, so net ROI is $19,200 + $7,200 − $144 = $26,256 — 182 times the subscription. Recovering a single $100 hour a month would still cover the $144 annual cost more than eight times over.",
    },
    faqs: [
      {
        question: "What is the true cost of scope creep?",
        answer:
          "Scope creep is the unbilled work that leaks out of a project: the extra revision, the 'quick change' outside the statement of work. At 4 hours a week and $100 an hour, it costs $19,200 a year. It is the most expensive line on this calculator because the hours are already worked — they are simply never invoiced.",
      },
      {
        question: "Why should flat-fee freelancers track time?",
        answer:
          "Even when you charge flat fees, time tracking is how you know your effective hourly rate. A $5,000 project that takes 20 hours pays $250 an hour; the same project at 100 hours pays $50. Without tracked hours you cannot tell which projects are profitable, which clients cost you money, or what to quote next time.",
      },
      {
        question: "How does time tracking software save administrative time?",
        answer:
          "Manual tracking means entering hours into spreadsheets, reconstructing forgotten days at month-end and building invoices by hand. Software logs time as you work and generates invoices from the log. This calculator assumes it saves 75% of manual admin time — 1.5 hours a week on the defaults, worth $7,200 a year.",
      },
      {
        question: "What is a good ROI for time tracking software?",
        answer:
          "Most freelance time tracking software costs $10–$20 a month, so the bar is low: recovering one $100 billable hour a month covers a $12 subscription eight times over. At the defaults — 4 lost hours a week and 2 admin hours — the net return is $26,256 a year on $144 of cost, a 182x multiple.",
      },
    ],
  },

  "freelance/w2-vs-1099-calculator": {
    quickAnswer:
      "A $100,000 salary with $15,000 of benefits is worth $87,350 after tax, while the same work at $75 an hour as a 1099 contractor nets $95,141 — about $7,791 more. The contractor pays $18,934 of self-employment tax but gains the 20% QBI deduction and deducts $10,000 of business expenses.",
    howItWorks: [
      "Enter your W-2 salary and the value of its benefits, then the contractor side: hourly rate, hours per week, weeks per year and business expenses. One effective tax rate applies to both sides, so the comparison isolates the structure — employment versus contracting — rather than mixing in different tax assumptions. The weeks-per-year input defaults to 48, leaving four weeks for holidays, sick time and gaps between contracts — time a W-2 employee is paid for and a contractor is not.",
      "The W-2 side subtracts the 7.65% employee share of FICA and income tax at your effective rate, then adds benefits back as value: employer health cover, the 401(k) match, paid leave and the rest. Benefits are the part people forget when they compare a salary with a contractor rate — $15,000 of benefits is worth $15,000 of take-home you would otherwise have to buy yourself.",
      "The 1099 side starts from gross contract income — rate × hours × weeks — minus business expenses. Self-employment tax is 15.3% of 92.35% of the net figure, and half of it is deductible. The 20% QBI deduction then applies; it is permanent from 2026 and the full 20% is available below $201,750 of taxable income for single filers. Income tax applies to what remains.",
      "The premium line shows how much more the contractor gross is than the salary: $144,000 against $100,000 is a 44% premium at the defaults. The common rule of thumb is 20–30%, but the right premium depends on your benefits, your expenses and your tax rate — this calculator shows the actual gap for your numbers instead of the rule.",
      "The break-even line estimates the hourly rate at which contracting matches the W-2 package's total value — about $67 an hour at the defaults. It is a rough gross-up rather than a precise inversion of the tax math, so treat it as a guide. Below that rate, the W-2 job pays more for the same hours; above it, contracting wins.",
    ],
    formula:
      "1099 take-home = (gross − expenses) − self-employment tax − income tax on (net business income − half the SE tax − QBI deduction). W-2 value = salary − 7.65% FICA − income tax + benefits.",
    example: {
      title: "Worked example: $100,000 salary vs $75 an hour contracting",
      body: "The W-2 side: a $100,000 salary loses $7,650 of FICA and $20,000 of income tax at a 20% effective rate, leaving $72,350; adding $15,000 of benefits gives a total value of $87,350. The 1099 side: $75 × 40 hours × 48 weeks is $144,000 gross, minus $10,000 of expenses is $134,000 of net business income. Self-employment tax is $18,933.60, the QBI deduction is $24,906.64, taxable income is $99,626.56 and income tax is $19,925.31 — leaving take-home pay of $95,141.09. The contractor comes out $7,791.09 ahead, and the break-even hourly rate is about $66.63.",
    },
    faqs: [
      {
        question: "How much more should I charge as a 1099 contractor vs W-2?",
        answer:
          "The common rule of thumb is 20–30% more than the equivalent salary, to cover the employer's half of FICA (7.65%), self-funded health insurance, unpaid time off and business expenses. At the defaults here the actual premium is 44% — $144,000 of contract gross against a $100,000 salary — because the benefits package alone is worth $15,000.",
      },
      {
        question: "Do 1099 contractors pay more in taxes than W-2 employees?",
        answer:
          "Contractors pay the full 15.3% self-employment tax, where employees pay only the 7.65% employee share of FICA. But contractors deduct business expenses from income and can claim the 20% QBI deduction, which employees cannot. At the defaults the contractor still comes out $7,791 ahead despite paying $18,934 of self-employment tax.",
      },
      {
        question: "How do you calculate 1099 tax?",
        answer:
          "Deduct business expenses from gross income to find net business profit, multiply by 92.35% and apply the 15.3% self-employment tax. Subtract half that tax, apply the 20% QBI deduction if eligible, and apply income tax to the remainder. On $134,000 of net profit at a 20% effective rate, that is $18,934 of SE tax plus $19,925 of income tax.",
      },
      {
        question: "What benefits do I lose going from W-2 to 1099?",
        answer:
          "You lose employer-subsidized health insurance, the 401(k) employer match, paid vacation and sick leave, unemployment insurance eligibility and workers' compensation coverage. You must fund all of them yourself, which is why the calculator adds the value of your W-2 benefits — $15,000 at the defaults — to the employee side of the comparison.",
      },
    ],
  },

  "freelance/business-vehicle-tax-deduction-calculator": {
    quickAnswer:
      "Driving 12,000 business miles of 15,000 total in a leased car, the actual-expenses method deducts $9,520 — $400 more than the $9,120 standard-mileage figure at the 76¢ rate — and saves $2,285 at a 24% tax rate. The winner depends on your car's running costs, not on a rule of thumb.",
    howItWorks: [
      "Enter your monthly lease payment, down payment and lease term, your business and personal miles, annual gas, insurance and repair costs, and your tax bracket. The calculator runs both IRS methods on the same numbers and shows which one deducts more — the standard mileage rate and the actual-expenses method rarely agree, and the gap is usually hundreds of dollars.",
      "The standard mileage method multiplies your business miles by the IRS standard mileage rate — 76 cents a mile for July to December 2026 (72.5 cents for January to June). It is simple, and it needs nothing beyond a mileage log. The rate is designed to cover the full cost of running a car, including depreciation, so it suits economical cars with low running costs.",
      "The actual-expenses method adds up your real costs — annual lease payments, the down payment spread over the lease term, gas, insurance and repairs — then multiplies the total by your business-use percentage. A $3,600 down payment on a 36-month lease adds $100 a month, or $1,200 a year, to the deductible base. Business-use percentage is business miles ÷ total miles.",
      "Which method wins depends on the car. Actual expenses usually win for expensive vehicles, high lease payments or heavy running costs; the standard rate usually wins for cheap, economical cars driven a long way. The calculator picks the larger deduction and multiplies it by your tax bracket to show the saving — the deduction itself is not the saving, the bracket turns it into one.",
      "Either method needs a mileage log: the date, destination, business purpose and miles of each trip, plus your total miles for the year. Only the business-use share of any cost is deductible. One thing the calculator does not model: leased luxury vehicles face an IRS inclusion amount that reduces the deduction — check it with a CPA before relying on the figure for an expensive car.",
    ],
    formula:
      "Standard mileage deduction = business miles × standard mileage rate. Actual expenses deduction = (annual lease + amortized down payment + gas + insurance + repairs) × business-use %, where business-use % = business miles ÷ total miles.",
    example: {
      title: "Worked example: leased car, 12,000 business miles",
      body: "A leased car is driven 12,000 business miles and 3,000 personal miles, so business use is 12,000 ÷ 15,000 = 80%. The lease is $600 a month with a $3,600 down payment on a 36-month term; gas is $1,800, insurance $1,200 and repairs $500 a year. The standard mileage method gives 12,000 × $0.76 = $9,120. The actual method gives ($7,200 lease + $1,200 amortized down payment + $1,800 gas + $1,200 insurance + $500 repairs) × 80% = $11,900 × 80% = $9,520. Actual expenses win by $400, and at a 24% tax bracket the deduction saves $2,284.80.",
    },
    faqs: [
      {
        question: "Can I write off a leased car as a 1099 contractor?",
        answer:
          "Yes. A 1099 contractor can deduct the business-use portion of a leased vehicle using either the standard mileage rate or the actual-expenses method — the business share of lease payments, gas and insurance. At the defaults, 80% business use makes the actual method worth $9,520 against $9,120 for standard mileage.",
      },
      {
        question: "Is it better to lease or buy a car for tax write-offs?",
        answer:
          "It depends on the vehicle. Buying a heavy vehicle (over 6,000 lbs gross vehicle weight) can qualify for a large first-year Section 179 deduction, while leasing spreads the deduction evenly over the lease term and is usually better for cash flow. Run both scenarios through the calculator with your own numbers before deciding.",
      },
      {
        question: "Can I write off 100% of my car lease?",
        answer:
          "Only if the vehicle is used 100% for business, which the IRS scrutinizes closely. If you drive 15,000 miles a year and 12,000 are for business, your business-use percentage is 80% and you can deduct only 80% of the lease payments and running costs. Personal miles never count, under either deduction method.",
      },
      {
        question: "How do I deduct the down payment on a leased business vehicle?",
        answer:
          "You cannot deduct a lease down payment in the year you pay it. It must be spread evenly over the lease term: a $3,600 down payment on a 36-month lease adds $100 a month, or $1,200 a year, to your deductible costs. The calculator amortizes it automatically, then applies your business-use percentage to the total.",
      },
    ],
  },

  "freelance/digital-nomad-cost-of-living-calculator": {
    quickAnswer:
      "Moving from $5,000 to $2,250 a month in expenses pays back a $2,500 relocation in under a month and stretches a $20,000 runway from 4 months to 7.8. Monthly profit rises from $1,000 to $3,750 on the same $6,000 income — geo-arbitrage works through costs, not extra work.",
    howItWorks: [
      "Enter your current monthly expenses, how much cheaper the destination is as a percentage, the one-off cost of relocating, your current savings and your monthly income. The calculator prices the move itself, not the destination: you supply the cost reduction, so verify it against real rents and food prices for the city you have in mind before trusting the result.",
      "New monthly expenses are your current expenses × (1 − cost reduction %). At a 55% reduction, $5,000 a month becomes $2,250. The monthly saving is the difference — $2,750 — and the payback period is the relocation cost divided by that saving. A $2,500 move pays for itself in under a month at the defaults; a $10,000 move would take nearly four. The reduction percentage is the input that decides everything, and it is also the easiest to get wrong: a city that looks 55% cheaper on rent alone may be only 35% cheaper once food, transport and insurance are counted.",
      "Runway is savings ÷ monthly expenses. The current runway uses your savings as they are; the new runway uses savings after the relocation cost is paid, because the move itself eats part of the cushion. The extension is the difference between the two — the extra months of survival the cheaper city buys if your income stops.",
      "New monthly profit is monthly income minus new monthly expenses. It is the clearest statement of geo-arbitrage: the same $6,000 of freelance income leaves $1,000 a month after $5,000 of expenses, but $3,750 after $2,250. Nothing about the work changed — only where the money is spent.",
      "What the calculator does not model matters as much as what it does. US citizens must file US taxes wherever they live, though the foreign earned income exclusion lets qualifying taxpayers exclude up to $132,900 of foreign earned income for 2026 — you qualify by spending 330 full days abroad in 12 months. Visas, global health insurance, coworking and foreign transaction fees all sit outside the calculation.",
    ],
    formula:
      "Payback (months) = relocation cost ÷ (current expenses − new expenses). New runway = (savings − relocation cost) ÷ new expenses, where new expenses = current expenses × (1 − cost reduction %).",
    example: {
      title: "Worked example: $5,000 a month to a 55% cheaper city",
      body: "Monthly expenses are $5,000, the destination is 55% cheaper, relocation costs $2,500, savings are $20,000 and monthly income is $6,000. New expenses are $5,000 × 45% = $2,250, saving $2,750 a month, so the $2,500 relocation pays back in 0.9 months. Current runway is $20,000 ÷ $5,000 = 4 months. After the move, savings are $17,500 and the new runway is $17,500 ÷ $2,250 = 7.8 months — an extension of 3.8 months. Monthly profit rises from $6,000 − $5,000 = $1,000 to $6,000 − $2,250 = $3,750.",
    },
    faqs: [
      {
        question: "What is geo-arbitrage?",
        answer:
          "Geo-arbitrage is earning in a strong currency — dollars, pounds or euros — while living somewhere with a much lower cost of living, such as Southeast Asia or Latin America. Your income stays the same and your expenses fall, so your profit margin rises without working more hours or raising your rates.",
      },
      {
        question: "What is a relocation payback period?",
        answer:
          "It is the number of months for your lower living expenses to repay the upfront cost of moving: flights, visas and temporary housing. Divide the relocation cost by the monthly saving. At the defaults — a $2,500 move saving $2,750 a month — the payback is 0.9 months, so the move is cash-positive almost immediately.",
      },
      {
        question: "How does cost of living affect my freelance runway?",
        answer:
          "Runway is how many months your savings last if income drops to zero: savings divided by monthly expenses. Halving your expenses doubles your runway. At the defaults, moving from $5,000 to $2,250 a month stretches $20,000 from 4 months to 7.8 months, even after the $2,500 relocation cost comes out of savings.",
      },
      {
        question: "Do I still have to pay taxes as a digital nomad?",
        answer:
          "Yes. US citizens must file US taxes wherever they live, and leaving the country does not end your tax residency. You may qualify for the foreign earned income exclusion — up to $132,900 of foreign earned income for 2026 — by spending 330 full days abroad in 12 months, but it does not reduce self-employment tax. Consult an expat tax professional.",
      },
    ],
  },
};
