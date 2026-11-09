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

export const TOOL_CONTENT_B1: Record<string, ToolContentEntry> = {
  "tax/tax-calculator": {
    quickAnswer:
      "On a $75,000 salary filing single in 2026, federal income tax is about $7,872 after the $16,100 standard deduction. That is an effective rate of 10.5%, even though the top bracket reached is 22% — each bracket taxes only the income inside it. This is an estimate; verify final figures with the IRS.",
    howItWorks: [
      "Enter your gross annual income, filing status and any deductions or credits you want included. The calculator subtracts the standard deduction first — $16,100 for single filers and $32,200 for married filing jointly in 2026 — unless you enter a larger itemized amount.",
      "It then walks your taxable income through the 2026 federal brackets in order: 10%, 12%, 22%, 24%, 32%, 35% and 37%. Only the slice of income inside each bracket is taxed at that bracket's rate, which is why your effective rate is always lower than your top bracket.",
      "The result shows total federal tax, your effective rate (tax divided by gross income), your marginal rate (the bracket your next dollar falls into) and a bracket-by-bracket breakdown so you can see exactly where the total comes from.",
      "The estimate covers federal income tax only. State income tax, payroll tax and credits such as the child tax credit change the final number, and the IRS publishes the official brackets each year — treat this as a planning figure, not a filed return.",
    ],
    formula:
      "Taxable income = gross income - standard deduction. Tax = sum over brackets of (income slice in bracket x bracket rate).",
    example: {
      title: "Worked example: $60,000 salary, single filer, 2026",
      body: "Gross income is $60,000. Subtract the $16,100 standard deduction and taxable income is $43,900. The first $11,925 is taxed at 10% = $1,192.50. The next $31,975 (up to $43,900) is taxed at 12% = $3,837. Total federal tax = $5,029.50, an effective rate of 8.4%. The marginal rate is 12%, so an extra $100 of income would add $12 of tax, not $22.",
    },
    faqs: [
      {
        question: "What is the standard deduction for 2026?",
        answer:
          "The calculators on this site use $16,100 for single filers and $32,200 for married filing jointly, the projected 2026 amounts. The IRS confirms the official figures in the autumn before the tax year. If you itemize deductions larger than the standard amount, use the itemized figure instead.",
      },
      {
        question: "What is the difference between marginal and effective tax rates?",
        answer:
          "Your marginal rate is the rate on your last dollar of income — 22% for a single filer with taxable income between $48,475 and $103,350 in 2026. Your effective rate is total tax divided by total income, and it is always lower because the first dollars are taxed at 10% and 12%. Decisions about extra income should use the marginal rate; comparing overall tax burden uses the effective rate.",
      },
      {
        question: "Does this calculator include state income tax?",
        answer:
          "No. It estimates federal income tax only. State tax ranges from 0% in states such as Texas and Florida to over 10% on high incomes in California and Hawaii. Add your state estimate separately, or use the paycheck calculator for a per-paycheck view.",
      },
      {
        question: "Why is my estimate different from my actual refund or amount owed?",
        answer:
          "A refund or balance due is the difference between this tax figure and what was already withheld from your pay during the year. Credits, pre-tax retirement contributions, health insurance premiums and a second job all move the final number. This calculator estimates the tax itself, before withholding is compared against it.",
      },
    ],
  },

  "tax/paycheck-calculator": {
    quickAnswer:
      "A $80,000 salary paid biweekly nets about $2,496 per paycheck for a single filer in a state with no income tax, after federal tax and FICA. Federal withholding takes roughly $345 of each check and payroll tax takes $235. State tax and benefits such as health insurance reduce it further.",
    howItWorks: [
      "Enter your gross salary or hourly wage, how often you are paid, and your filing status. The calculator annualizes your pay, applies the 2026 standard deduction and federal brackets, then divides the result back across your pay periods.",
      "Payroll tax (FICA) is calculated on top of income tax: Social Security takes 6.2% of wages up to the $184,500 wage base for 2026, and Medicare takes 1.45% on all wages, plus an extra 0.9% on wages above $200,000 (single) or $250,000 (married filing jointly).",
      "Pre-tax deductions you enter — 401(k) contributions, health premiums, HSA or FSA contributions — reduce the wages that income tax is calculated on. They do not reduce Social Security and Medicare tax, except for some cafeteria-plan premiums.",
      "The result breaks each paycheck into gross pay, federal tax, Social Security, Medicare, state tax where applicable and your net (take-home) pay, with annual totals alongside so you can budget either way.",
    ],
    formula:
      "Net pay = gross pay - federal income tax - state income tax - FICA (6.2% Social Security to the wage base + 1.45% Medicare) - deductions.",
    example: {
      title: "Worked example: $80,000 salary, biweekly, single, no state tax",
      body: "Gross pay per check is $80,000 / 26 = $3,076.92. Over the year: federal tax on $63,900 of taxable income is $8,972, Social Security is $80,000 x 6.2% = $4,960, and Medicare is $80,000 x 1.45% = $1,160. Total deductions are $15,092, leaving $64,908 a year, or $2,496 per biweekly paycheck.",
    },
    faqs: [
      {
        question: "Why is my first paycheck at a new job smaller or larger than this estimate?",
        answer:
          "Withholding is calculated as if every paycheck were the same size all year. Starting mid-year, a signing bonus, or a pay rise partway through the year makes any single check unrepresentative. The annual totals in the result are the more reliable figure for budgeting.",
      },
      {
        question: "What is FICA and why is it separate from income tax?",
        answer:
          "FICA is the payroll tax that funds Social Security and Medicare. Employees pay 6.2% for Social Security on wages up to $184,500 in 2026 and 1.45% for Medicare on all wages; employers pay the same again. It is charged on gross wages before the standard deduction, which is why it applies even when you owe no income tax.",
      },
      {
        question: "How does a 401(k) contribution change my paycheck?",
        answer:
          "A traditional 401(k) contribution comes out before income tax, so contributing $200 per biweekly check cuts taxable wages by $5,200 a year. At a 22% marginal rate that saves $1,144 of federal tax, meaning the $5,200 contribution reduces take-home pay by about $4,056, not the full $5,200. FICA tax still applies to the contribution.",
      },
      {
        question: "Does this estimate include state income tax?",
        answer:
          "State tax depends on where you work and live — nine states levy no broad wage income tax, while others use flat or graduated rates. Enter your state in the calculator where the option is offered; otherwise subtract your state's rate as a rough guide and treat the result as an estimate.",
      },
    ],
  },

  "tax/salary-calculator": {
    quickAnswer:
      "A $75,000 salary is $36.06 an hour, $1,442 a week or $6,250 a month at a standard 40-hour week. The conversion assumes 2,080 working hours a year (40 hours x 52 weeks) and shows gross pay before tax unless you open the tax view.",
    howItWorks: [
      "Enter pay in any unit — hourly, weekly, biweekly, monthly or annual — and the calculator converts it into every other unit using your hours per week and weeks per year. The default is 40 hours a week and 52 weeks a year, or 2,080 hours.",
      "If you work part-time hours, unpaid leave or a compressed schedule, change the hours and weeks inputs. A $75,000 salary at 37.5 hours a week is $38.46 an hour, not $36.06, because the same pay covers fewer hours.",
      "The tax view layers an estimate of federal tax and FICA onto the gross figures using the 2026 brackets and the $16,100 single / $32,200 married standard deduction, so you can compare a job offer's gross headline with what actually arrives.",
      "Use the gross figures to compare offers like-for-like, then the net figures for budgeting. Employer benefits — retirement match, health cover, paid leave — are not in either number and can be worth 20-30% on top of salary.",
    ],
    formula:
      "Hourly rate = annual salary / (hours per week x weeks per year). Annual salary = hourly rate x hours per week x 52.",
    example: {
      title: "Worked example: converting $30 an hour to a salary",
      body: "At 40 hours a week for 52 weeks, $30 an hour is $30 x 2,080 = $62,400 a year, $5,200 a month, $2,400 biweekly and $1,200 a week. With two weeks of unpaid leave (50 working weeks), the same hourly rate pays $30 x 2,000 = $60,000 — a $2,400 difference that the weeks-per-year input captures.",
    },
    faqs: [
      {
        question: "How many working hours are in a year?",
        answer:
          "A full-time schedule of 40 hours a week for 52 weeks is 2,080 hours. That counts paid holidays and paid vacation as working time. Actual hours worked are closer to 1,950-2,000 once holidays and leave are removed, which is why hourly conversions of a salary can look different between employers.",
      },
      {
        question: "Is a biweekly paycheck the same as twice a month?",
        answer:
          "No. Biweekly pay means 26 paychecks a year; twice-monthly (semi-monthly) pay means 24. A $75,000 salary is $2,884.62 biweekly but $3,125 semi-monthly. The annual total is identical — only the timing differs, and two months a year contain three biweekly checks.",
      },
      {
        question: "How do I compare an hourly contract rate with a salaried job?",
        answer:
          "Multiply the hourly rate by the hours you will actually bill, then subtract what employment provided free: employer payroll tax (7.65%), retirement match, health insurance and paid leave. A contractor typically needs an hourly rate 25-40% above the salaried equivalent hourly rate to break even. The salary to hourly calculator in the freelance section runs this comparison directly.",
      },
      {
        question: "Does this calculator deduct tax?",
        answer:
          "The headline conversions are gross pay. The tax view adds an estimate of 2026 federal income tax and FICA (6.2% Social Security up to $184,500 plus 1.45% Medicare). State tax varies too much by state to fold into a single number, so treat net figures as federal-only estimates.",
      },
    ],
  },

  "tax/income-tax-calculator": {
    quickAnswer:
      "A single filer with $100,000 of taxable income in 2026 pays $16,914 in federal income tax — an effective rate of 16.9% against a 22% marginal rate. The first $11,925 is taxed at 10% and only the income above $48,475 reaches the 22% bracket.",
    howItWorks: [
      "Enter your income and filing status. If you enter gross income, the calculator subtracts the 2026 standard deduction — $16,100 single or $32,200 married filing jointly — to reach taxable income; if you already know your taxable income, enter it directly.",
      "Tax is built bracket by bracket. For single filers in 2026: 10% up to $11,925, 12% to $48,475, 22% to $103,350, 24% to $197,300, 32% to $250,525, 35% to $626,350 and 37% above that. Married filing jointly thresholds are roughly double for the lower brackets.",
      "The output shows the tax charged inside each bracket, your total tax, your effective rate and your marginal rate. The bracket table is the useful part: it shows exactly which dollars are taxed at which rate.",
      "This is federal income tax only, before credits. Credits such as the child tax credit reduce the final bill dollar for dollar, and capital gains are taxed under separate preferential rates — use the capital gains calculator for investment income.",
    ],
    formula:
      "Tax = 10% x first slice + 12% x next slice + 22% x next slice + ... applied to taxable income (gross income - deductions).",
    example: {
      title: "Worked example: $100,000 taxable income, single, 2026",
      body: "Tax by bracket: 10% x $11,925 = $1,192.50; 12% x $36,550 = $4,386; 22% x $51,525 = $11,335.50. Total = $16,914. The effective rate is $16,914 / $100,000 = 16.9%. Earning $1,000 more adds $220 of tax (the 22% marginal rate), not $220 plus a higher rate on everything earned before it.",
    },
    faqs: [
      {
        question: "Will a pay rise push all my income into a higher bracket?",
        answer:
          "No. Only the income above the bracket threshold is taxed at the higher rate. A single filer whose taxable income rises from $48,000 to $49,000 pays 22% on the $525 above the $48,475 threshold and the same rates as before on everything below it. A gross pay rise always increases net pay.",
      },
      {
        question: "What are the 2026 federal income tax brackets for single filers?",
        answer:
          "10% up to $11,925; 12% from $11,925 to $48,475; 22% to $103,350; 24% to $197,300; 32% to $250,525; 35% to $626,350; and 37% above $626,350. These thresholds apply to taxable income, after the standard or itemized deduction. Figures are the projected 2026 amounts used across this site — confirm against the IRS revenue procedure for the year.",
      },
      {
        question: "What is the difference between gross income and taxable income?",
        answer:
          "Gross income is everything you earn. Taxable income is what remains after adjustments (such as deductible retirement or HSA contributions) and the standard or itemized deduction. On a $75,000 salary with the $16,100 standard deduction, taxable income is $58,900 — the brackets apply to $58,900, not $75,000.",
      },
      {
        question: "Do tax credits reduce taxable income or the tax itself?",
        answer:
          "Credits reduce the tax itself, dollar for dollar, after the bracket calculation. A $2,000 child tax credit cuts a $7,872 tax bill to $5,872. Deductions work earlier and are worth less: a $2,000 deduction at a 22% marginal rate saves $440. This calculator estimates tax before most credits unless you enter them.",
      },
    ],
  },

  "tax/take-home-pay-calculator": {
    quickAnswer:
      "On a $65,000 salary, a single filer takes home about $54,356 a year after federal tax and FICA in 2026 — roughly $4,530 a month before state tax and workplace benefits. Payroll tax alone removes $4,973 of the salary.",
    howItWorks: [
      "Enter your gross salary, pay frequency and filing status. The calculator works out annual federal income tax using the 2026 brackets and the standard deduction ($16,100 single, $32,200 married filing jointly), then splits the net result across your pay periods.",
      "It then deducts FICA: 6.2% Social Security on wages up to $184,500 and 1.45% Medicare on all wages. Unlike income tax, FICA has no standard deduction, so it is a flat percentage from the first dollar until the Social Security cap.",
      "Add any regular deductions you know — retirement contributions, health premiums, union dues — to close the gap between the estimate and your real payslip. Pre-tax items lower income tax as well as take-home pay; after-tax items only lower take-home pay.",
      "Read the result as an annual figure first. Per-check amounts move around with bonuses, overtime and unpaid days, but the annual net is the number a budget should be built on.",
    ],
    formula:
      "Take-home pay = gross pay - federal income tax - state income tax - FICA - other deductions.",
    example: {
      title: "Worked example: $65,000 salary, single, 2026",
      body: "Taxable income is $65,000 - $16,100 = $48,900. Federal tax: $1,192.50 (10% bracket) + $4,386 (12% bracket) + $93.50 (22% on the $425 above $48,475) = $5,672. FICA: Social Security $65,000 x 6.2% = $4,030 and Medicare $65,000 x 1.45% = $942.50. Take-home pay = $65,000 - $5,672 - $4,972.50 = $54,355.50 a year, about $4,530 a month before state tax.",
    },
    faqs: [
      {
        question: "Why is my take-home pay less than 70% of my salary?",
        answer:
          "Three layers come out before you are paid: federal income tax, FICA at a flat 7.65% (until the Social Security cap), and state tax where it applies. On a $65,000 salary the federal layers alone take about 16.4%. Add a state tax of 5% and workplace deductions, and take-home pay near 70-75% of gross is normal.",
      },
      {
        question: "Does take-home pay include bonuses?",
        answer:
          "Bonuses are taxed as ordinary income but are often withheld at a flat 22% federal rate when paid. If your marginal rate is lower, the excess comes back as a refund; if higher, you may owe at filing. Annualize any bonus into the salary input for a closer estimate.",
      },
      {
        question: "How much state tax should I expect on top of this?",
        answer:
          "It depends entirely on the state: Texas, Florida and seven other states levy no broad wage income tax; flat-tax states sit roughly between 2.5% and 5.25%; graduated states such as California reach 9.3% well into middle incomes and higher at the top. Check your state's rate and subtract it from the federal-only net shown here.",
      },
      {
        question: "Can I increase my take-home pay by adjusting my W-4?",
        answer:
          "A W-4 only changes withholding — the timing of tax payments — not the tax itself. Claiming adjustments you are not entitled to means a bill plus underpayment penalties at filing. The correct fix is the opposite direction: if you routinely get a large refund, a properly completed W-4 spreads that money across your paychecks instead.",
      },
    ],
  },

  "tax/overtime-calculator": {
    quickAnswer:
      "At $20 an hour, five hours of overtime a week at time-and-a-half pays $150 on top of $800 regular pay — $950 gross for the week, or about $600 extra a month. Federal law requires the 1.5x rate past 40 hours a week for non-exempt employees.",
    howItWorks: [
      "Enter your regular hourly rate, regular hours and overtime hours. The calculator pays regular hours at the base rate and overtime hours at your chosen multiplier — 1.5x (time and a half) or 2x (double time).",
      "The Fair Labor Standards Act sets the floor: non-exempt employees must receive at least 1.5x their regular rate for hours over 40 in a single workweek. Overtime is calculated weekly, not per pay period, so a 50-hour week followed by a 30-hour week still earns 10 overtime hours.",
      "Some states add daily overtime — California, for example, requires 1.5x past 8 hours in a day and 2x past 12. If your state or contract is more generous than the federal rule, enter the multiplier that actually applies to you.",
      "Results are gross pay. Overtime is taxed as ordinary income at your marginal rate, and a large overtime check is often withheld as if you earned that amount all year — the difference is settled when you file.",
    ],
    formula:
      "Gross pay = (regular hours x hourly rate) + (overtime hours x hourly rate x multiplier).",
    example: {
      title: "Worked example: $20/hour, 45-hour week, time and a half",
      body: "Regular pay: 40 hours x $20 = $800. Overtime rate: $20 x 1.5 = $30. Overtime pay: 5 hours x $30 = $150. Total gross for the week = $950. Across a month of similar weeks that is roughly $600 of overtime pay. At double time the same five hours would pay $200 and the week would total $1,000.",
    },
    faqs: [
      {
        question: "Who is entitled to overtime pay?",
        answer:
          "Non-exempt employees under the Fair Labor Standards Act — most hourly workers and salaried workers below the federal salary threshold ($684 per week under the long-standing federal rule). Executive, administrative and professional employees who meet both the salary and duties tests are exempt. Misclassification is common; your duties, not your job title, decide the test.",
      },
      {
        question: "Is overtime calculated daily or weekly?",
        answer:
          "Federally, weekly: hours over 40 in one workweek. A handful of states, including California, Alaska, Nevada and Colorado, add daily thresholds or specific conditions. Collective bargaining agreements and employer policies can be more generous than either. Use the rule that gives you the higher rate where both apply.",
      },
      {
        question: "Why was so much tax withheld from my overtime check?",
        answer:
          "Payroll systems annualize each check. A $950 week is withheld as if you earned $49,400 a year; a week with heavy overtime can be withheld as if you were in a higher bracket permanently. Your actual tax is calculated on real annual income when you file, and any over-withholding returns as a refund.",
      },
      {
        question: "Does overtime count toward Social Security and Medicare tax?",
        answer:
          "Yes. FICA applies to overtime exactly as to regular pay: 6.2% for Social Security up to the $184,500 wage base in 2026 and 1.45% for Medicare on all wages. On $150 of overtime, FICA removes $11.48 before income tax.",
      },
    ],
  },

  "tax/capital-gains-tax-calculator": {
    quickAnswer:
      "A $30,000 long-term gain for a single filer with $40,000 of other taxable income costs about $3,083 in federal tax in 2026, because the first $9,450 of the gain sits under the 0% threshold. The same gain taxed as short-term income would cost about $5,753.",
    howItWorks: [
      "Enter your purchase price (cost basis), sale price, holding period, filing status and your other taxable income. The gain is the sale price minus basis and selling costs.",
      "Holding period decides the regime. Assets held one year or less produce short-term gains, taxed at ordinary income rates up to 37%. Assets held more than one year produce long-term gains, taxed at preferential rates of 0%, 15% or 20% depending on your total taxable income.",
      "Long-term gains stack on top of your other income. For single filers in 2026 the 0% rate applies while total taxable income stays under $49,450, the 15% rate covers the middle, and 20% applies above $545,500. Married filing jointly thresholds are $98,900 and $613,700.",
      "High earners may also owe the 3.8% net investment income tax, which applies when modified adjusted gross income passes $200,000 (single) or $250,000 (married filing jointly). The calculator checks this threshold and shows it separately. All figures are federal estimates — most states tax gains as ordinary income.",
    ],
    formula:
      "Gain = sale price - cost basis. Long-term tax = 0% / 15% / 20% applied to the slices of the gain below and above the income thresholds, plus 3.8% NIIT where it applies.",
    example: {
      title: "Worked example: $30,000 long-term gain, single filer",
      body: "Other taxable income is $40,000 and the long-term gain is $30,000, giving total taxable income of $70,000. The 0% threshold is $49,450, so $49,450 - $40,000 = $9,450 of the gain is taxed at 0%. The remaining $20,550 is taxed at 15% = $3,082.50. Had the asset been sold inside a year, the gain would stack at ordinary rates: $8,475 at 12% and $21,525 at 22% = $5,752.50. Waiting for long-term status saves about $2,670 here.",
    },
    faqs: [
      {
        question: "What are the long-term capital gains rates for 2026?",
        answer:
          "0%, 15% and 20%, set by total taxable income. For single filers the 0% rate runs to $49,450 of taxable income and the 20% rate starts at $545,500; for married filing jointly the figures are $98,900 and $613,700. Most taxpayers in the middle fall in the 15% band. These are the projected 2026 thresholds used by this calculator.",
      },
      {
        question: "How long must I hold an asset for long-term rates?",
        answer:
          "More than one year. Selling on the one-year anniversary is still short-term; the holding period starts the day after purchase and must exceed 12 months. Inherited assets are treated as long-term regardless of holding period.",
      },
      {
        question: "What is the net investment income tax?",
        answer:
          "An additional 3.8% tax on investment income — including capital gains — for taxpayers with modified adjusted gross income above $200,000 (single) or $250,000 (married filing jointly). It applies to the smaller of your net investment income or the amount by which your income exceeds the threshold, and the thresholds are not indexed for inflation.",
      },
      {
        question: "Can capital losses reduce my tax?",
        answer:
          "Yes. Losses first offset gains of the same type, then the other type. If losses still remain, up to $3,000 a year ($1,500 married filing separately) offsets ordinary income, and the rest carries forward indefinitely. Selling a losing position to bank the loss — then avoiding a repurchase within 30 days to stay clear of the wash-sale rule — is the standard tax-loss harvesting move.",
      },
    ],
  },

  "freelance/salary-to-hourly-calculator": {
    quickAnswer:
      "A $60,000 salary at 40 hours a week equals $28.85 an hour; $30 an hour full-time equals $62,400 a year. Freelancers should not stop at that conversion — a contractor rate needs to run 25-40% higher than the salaried equivalent to cover self-employment tax, benefits and unpaid time.",
    howItWorks: [
      "Enter a salary to get the hourly rate, or an hourly rate to get the salary. Both directions use the same identity: annual pay divided by annual hours, where annual hours are hours per week times weeks per year (2,080 at 40 hours x 52 weeks).",
      "Adjust the weeks input for unpaid time off. Employees are paid for holidays and vacation; contractors are not. At 48 paid weeks instead of 52, a $62,400 target requires $31.25 an hour, not $30.",
      "The comparison that matters for freelancers is employer cost. An employer pays 7.65% payroll tax, retirement contributions, health insurance and paid leave on top of salary. If you are pricing contract work, the calculator's loaded view shows what a salary really costs so you can price against it.",
      "Use the straight conversion for job comparisons and negotiation. Use the loaded comparison before quoting a client a rate that has to replace a salary.",
    ],
    formula:
      "Hourly rate = annual salary / (hours per week x weeks worked per year). Salary = hourly rate x hours per week x weeks per year.",
    example: {
      title: "Worked example: $85,000 salary to an hourly contractor rate",
      body: "Straight conversion: $85,000 / 2,080 hours = $40.87 an hour. As a contractor you lose the employer's 7.65% payroll tax contribution, paid leave and any retirement match — conservatively 25% of salary value. Pricing to replace the package, not just the pay, gives $40.87 x 1.25 = $51.08 an hour. Quoting the straight $40.87 would quietly pay you about $17,000 a year less than the job did.",
    },
    faqs: [
      {
        question: "Why do freelancers charge more per hour than employees earn?",
        answer:
          "Because the employee's hourly figure excludes what the employer adds: 7.65% payroll tax, paid holidays and vacation (typically 15-25 days), health insurance subsidies and retirement matching. A contractor buys all of that out of the hourly rate, and also absorbs unpaid admin time and gaps between contracts.",
      },
      {
        question: "How many hours should I use if I take four weeks off?",
        answer:
          "Use 48 weeks: 40 x 48 = 1,920 hours. A $70,000 income target over 1,920 hours is $36.46 an hour, versus $33.65 over 2,080 hours. Every unpaid week raises the rate needed to hit the same annual income by roughly 2%.",
      },
      {
        question: "Is 2,080 hours the right default?",
        answer:
          "It is the standard for full-time salaried roles: 40 hours x 52 weeks, with holidays and vacation paid inside it. It is the right default for comparing a salary offer. For pricing your own contract work, billable hours are what count, and few freelancers bill more than 1,200-1,500 hours a year.",
      },
      {
        question: "How does this differ from the freelance hourly rate calculator?",
        answer:
          "This tool converts between two ways of stating the same pay. The freelance hourly rate calculator builds a rate from your costs — target income, business expenses, taxes and billable hours — to find your minimum acceptable rate. Convert first to understand an offer; build from costs to set your own price.",
      },
    ],
  },

  "freelance/1099-tax-calculator": {
    quickAnswer:
      "On $80,000 of net 1099 income, a single filer owes about $19,032 in federal tax for 2026 — $11,304 of self-employment tax plus $7,729 of income tax — leaving about $60,968 before state tax. Set aside roughly 24% of every payment and pay it quarterly.",
    howItWorks: [
      "Enter your net self-employment income — revenue minus business expenses — and your filing status. Tax is calculated on net income, so track expenses first; every $1,000 of legitimate expenses removes roughly $240-$380 of tax at typical rates.",
      "Self-employment tax comes first: 15.3% applied to 92.35% of net income. The 12.4% Social Security part stops at the $184,500 wage base for 2026; the 2.9% Medicare part has no cap. Half of the self-employment tax is then deducted from your income before income tax is figured.",
      "Income tax is calculated on what remains after that deduction and the standard deduction ($16,100 single, $32,200 married filing jointly in 2026), using the graduated federal brackets. A qualified business income (QBI) deduction of up to 20% may reduce it further if you qualify.",
      "The result splits the total into four quarterly estimated payments. Paying quarterly is not optional paperwork: underpaying during the year triggers an underpayment penalty even if you settle in full at filing.",
    ],
    formula:
      "SE tax = net income x 92.35% x 15.3%. Income tax = brackets applied to (net income - half of SE tax - standard deduction). Total tax = SE tax + income tax.",
    example: {
      title: "Worked example: $80,000 net 1099 income, single, 2026",
      body: "Self-employment tax: $80,000 x 92.35% = $73,880, taxed at 15.3% = $11,303.64. Half of that, $5,651.82, is deducted. Taxable income: $80,000 - $5,651.82 - $16,100 = $58,248.18. Income tax through the brackets: $1,192.50 + $4,386 + $2,150.10 = $7,728.60. Total federal tax = $19,032.24, or about $4,758 per quarter, before state tax and any QBI deduction.",
    },
    faqs: [
      {
        question: "How much should I set aside from each 1099 payment?",
        answer:
          "A practical rule is 25-30% of net income for federal and state tax combined at middle incomes: self-employment tax alone takes about 14.1% of net income (15.3% on 92.35%), and income tax adds the rest. On $80,000 of net income the federal total here is 23.8%; higher incomes and high-tax states push the figure up.",
      },
      {
        question: "When are quarterly estimated taxes due?",
        answer:
          "April 15, June 15, September 15 and January 15 of the following year, adjusted for weekends and federal holidays. The safe harbor rule protects you from penalties if you pay at least 90% of the current year's tax or 100% of last year's (110% if last year's income exceeded $150,000).",
      },
      {
        question: "What is the difference between this and the self-employment tax calculator?",
        answer:
          "The self-employment tax calculator isolates the 15.3% payroll-equivalent tax. This calculator combines it with federal income tax and shows total tax, take-home pay and the quarterly amounts. Use the SE tax calculator to understand one component; use this one to plan payments.",
      },
      {
        question: "Do I pay 1099 tax on gross receipts or net income?",
        answer:
          "Net income — gross receipts minus ordinary and necessary business expenses. Software, equipment, mileage, home office and professional services all reduce the base before either tax is calculated. Filing Schedule C is where the net figure is established; if you have not tracked expenses, reconstruct them from bank and card statements before estimating.",
      },
    ],
  },

  "ecommerce/profit-margin-calculator": {
    quickAnswer:
      "An item bought for $50 and sold for $80 makes $30 of gross profit, a 37.5% margin and a 60% markup. Margin and markup are different fractions of different bases — confusing them is the most common pricing error in retail and e-commerce.",
    howItWorks: [
      "Enter the cost of the item and its selling price. Cost should mean the full unit cost you want the margin measured against — product cost alone for a gross margin, or product plus shipping, packaging and fees for a net view.",
      "The calculator reports three numbers: profit per unit (price minus cost), gross margin (profit divided by price) and markup (profit divided by cost). Retailers quote margins; wholesalers often quote markups; the same $30 profit is 37.5% one way and 60% the other.",
      "Use the reverse mode to price from a target margin. Price is not cost plus a percentage of cost — to land a 40% margin on a $50 cost, the price must be $50 / (1 - 0.40) = $83.33, not $70.",
      "Compare the result against your channel's fee load. A 37.5% gross margin on a marketplace that takes 15-20% in fees, before advertising, leaves far less than the headline suggests.",
    ],
    formula:
      "Profit = price - cost. Margin = profit / price x 100. Markup = profit / cost x 100. Price for a target margin = cost / (1 - margin).",
    example: {
      title: "Worked example: pricing for a 40% margin on a $50 cost",
      body: "Adding a 40% markup gives $50 x 1.40 = $70, but the margin on $70 is ($70 - $50) / $70 = 28.6%, not 40%. Pricing by the margin formula instead: $50 / (1 - 0.40) = $83.33. At $83.33 the profit is $33.33 and the margin is exactly 40%. A store that prices 1,000 units a month by the wrong method gives up $13.33 per unit — $13,330 a month.",
    },
    faqs: [
      {
        question: "What is a good profit margin for e-commerce?",
        answer:
          "Gross margins of 40-60% are typical targets for private-label and branded goods, because marketplace fees, shipping and ad spend still have to come out. Net margins for online stores commonly land between 5% and 20%. A margin figure means little until you state which costs it includes — gross margin excludes operating costs by definition.",
      },
      {
        question: "What is the difference between margin and markup?",
        answer:
          "Margin divides profit by the selling price; markup divides profit by cost. A 50% markup is a 33.3% margin; a 100% markup is a 50% margin. They are interchangeable only at zero. Always state which one a supplier or partner is quoting before comparing prices.",
      },
      {
        question: "Should shipping and platform fees be in the cost?",
        answer:
          "For pricing decisions, yes — use the fullest cost you can assign per unit: product, inbound freight, packaging, outbound shipping subsidy, transaction fees and expected return costs. That produces a contribution margin, the number that tells you whether one more sale makes money. Keep the pure product-cost margin as well for supplier comparisons.",
      },
      {
        question: "Can margin exceed 100%?",
        answer:
          "No. Margin is profit divided by price, and profit cannot exceed the price unless cost is negative. Markup can exceed 100% freely — a $10 cost sold at $35 is a 250% markup and a 71.4% margin. A spreadsheet showing a margin above 100% has the formula inverted.",
      },
    ],
  },

  "ecommerce/roi-calculator": {
    quickAnswer:
      "Invest $5,000 and get back $6,500 and the return on investment is 30%. ROI ignores how long the money was tied up — 30% in three months and 30% in three years are very different results, which the annualized view separates.",
    howItWorks: [
      "Enter the total cost of the investment and the total value gained or returned. Cost should include everything the return depended on: purchase price, fees, your tooling, and ad spend for a marketing ROI.",
      "The calculator reports ROI as a percentage and, where a time period is entered, an annualized return so investments of different lengths can be compared honestly.",
      "For business decisions the inputs decide the answer. A campaign that returns $6,500 of revenue on $5,000 of ad spend shows 30% ROI, but if the goods sold cost $4,000, the same campaign lost money. Run ROI on profit where profit is what you are deciding about.",
      "Compare the result with your alternatives: the same capital in a savings account, another channel, or simply not spent. ROI above your cost of capital creates value; ROI below it destroys value even when the raw number is positive.",
    ],
    formula:
      "ROI = (gain - cost) / cost x 100. Annualized ROI = ((1 + ROI) ^ (1 / years) - 1) x 100.",
    example: {
      title: "Worked example: two campaigns, same ROI, different value",
      body: "Campaign A: $5,000 spent, $6,500 returned in 3 months. ROI = ($6,500 - $5,000) / $5,000 = 30%. Annualized: (1.30 ^ 4) - 1 = 185.6%. Campaign B: the same $5,000 returns $6,500 after 2 years. ROI is also 30%, but annualized it is (1.30 ^ 0.5) - 1 = 14.0%. The headline ROI is identical; campaign A frees the capital to be reused three more times in the same period.",
    },
    faqs: [
      {
        question: "What is a good ROI for marketing spend?",
        answer:
          "Benchmarks are usually quoted as ROAS (revenue per ad dollar) rather than ROI. A 4:1 ROAS is a common target, but whether it profits depends on margin: at a 40% gross margin, break-even ROAS is 2.5:1; below that the campaign loses money even at a positive revenue ROI. Convert through your margin before judging — the break-even ROAS calculator does this directly.",
      },
      {
        question: "What is the difference between ROI and ROAS?",
        answer:
          "ROAS divides revenue by ad spend only. ROI divides total gain minus total cost by total cost, where cost includes everything. A 400% ROAS campaign can have a negative ROI once product cost, shipping and fees are counted. ROAS is a media metric; ROI is a business metric.",
      },
      {
        question: "Why does ROI not account for time?",
        answer:
          "The basic formula has no time variable, which is its main weakness. Annualizing fixes comparisons between projects of different lengths, and net present value goes further by discounting future cash. For quick comparisons of similar-length projects, plain ROI is adequate; for capital decisions, annualize.",
      },
      {
        question: "Can ROI be negative or over 100%?",
        answer:
          "Yes to both. ROI is -100% if the investment returns nothing, and it exceeds 100% whenever the gain more than doubles the cost — a $1,000 spend returning $3,500 is 250% ROI. Percentages above a few hundred usually mean the cost base was defined narrowly, so check what was excluded.",
      },
    ],
  },

  "ecommerce/markup-calculator": {
    quickAnswer:
      "A $40 cost with a 50% markup sells for $60 and carries a 33.3% margin. To hit a specific margin instead — say 40% — the price is cost divided by (1 - margin): $40 / 0.60 = $66.67, which is a 66.7% markup.",
    howItWorks: [
      "Enter the unit cost and either a markup percentage or a target margin. The calculator converts between the two and shows the resulting selling price and profit per unit.",
      "Markup is calculated on cost; margin is calculated on price. Because the bases differ, the same dollar profit always produces a higher markup percentage than margin percentage, and the gap widens as profit grows.",
      "Use markup mode when you work from supplier price lists and category conventions (keystone pricing in retail is a 100% markup). Use margin mode when you work backwards from a profitability target or a channel's fee structure.",
      "Check the resulting price against the market before committing. The formula gives the price your costs require; if customers will not pay it, the fix is in the cost or the offer, not in quietly accepting a margin that fees will erase.",
    ],
    formula:
      "Selling price = cost x (1 + markup). Selling price from margin = cost / (1 - margin). Markup from margin = margin / (1 - margin).",
    example: {
      title: "Worked example: converting a 40% margin target to a markup",
      body: "A product costs $40 and the target gross margin is 40%. Required price: $40 / (1 - 0.40) = $66.67. The markup that produces it: ($66.67 - $40) / $40 = 66.7%. A buyer who instead applies a 40% markup prices at $56, earns $16 per unit instead of $26.67, and lands a 28.6% margin — 11.4 points below target on every sale.",
    },
    faqs: [
      {
        question: "What markup should I use for retail products?",
        answer:
          "Keystone pricing — a 100% markup, equivalent to a 50% margin — is the traditional retail starting point. Grocery runs far lower (10-25% markup on many lines), while jewellery, furniture and private-label goods run higher. The right markup is the one that leaves your target margin after the channel's fees, shipping and returns are paid.",
      },
      {
        question: "How do I convert margin to markup quickly?",
        answer:
          "Markup = margin / (1 - margin). A 30% margin is a 42.9% markup; a 40% margin is 66.7%; a 50% margin is 100%. The reverse: margin = markup / (1 + markup), so a 50% markup is a 33.3% margin. Keep the pair you use most often written next to your price list.",
      },
      {
        question: "Should markup cover platform fees and shipping?",
        answer:
          "The markup itself only relates cost to price. Whether the result is profitable depends on what else comes out of the price: a marketplace taking 15% plus payment fees turns a 50% margin into roughly 32% before advertising. Price from the net backwards — set the margin target after fees, then convert to markup.",
      },
      {
        question: "Why do suppliers and retailers argue about percentages?",
        answer:
          "Because they habitually quote different measures: suppliers quote markup on their price, retailers quote margin on theirs. A '50%' from a supplier (markup) and a '50%' demanded by a retailer (margin) differ by 17 points of profit on the same product. Put the basis in writing — '50% margin on retail price' — before agreeing terms.",
      },
    ],
  },

  "ecommerce/etsy-fee-calculator": {
    quickAnswer:
      "On a $45 Etsy order ($40 item plus $5 shipping), core fees are about $4.73 before any ads: $2.93 transaction fee at 6.5%, $1.60 payment processing at 3% plus $0.25, and the $0.20 listing fee. If the item cost you $18 and shipping costs $5, profit is $17.27.",
    howItWorks: [
      "Enter the item price, the shipping you charge the buyer, your item cost and your actual shipping cost. Etsy calculates its percentage fees on the total the buyer pays — item price plus shipping charge — not on the item price alone.",
      "The calculator applies the current core fee stack: a $0.20 listing fee per item (charged at listing and renewed every four months or on each sale of a multi-quantity listing), a 6.5% transaction fee, and Etsy Payments processing at 3% plus $0.25 per order in the US. Some countries add a small regulatory operating fee on top.",
      "Optional costs sit below the core result: Etsy Ads or Offsite Ads (12-15% of the order total when an ad click leads to a sale, capped per order) are the two that change the answer materially. Offsite Ads are mandatory for shops earning over $10,000 a year on Etsy.",
      "The output shows total fees, fee percentage of the order, and your profit after item and shipping costs — the figure to compare against your target margin before you set or change a price.",
    ],
    formula:
      "Profit = (item price + shipping charged) - 6.5% transaction fee - (3% + $0.25) payment processing - $0.20 listing fee - item cost - shipping cost.",
    example: {
      title: "Worked example: $40 item, $5 shipping charged, $18 item cost",
      body: "The buyer pays $45. Transaction fee: 6.5% x $45 = $2.93. Payment processing: 3% x $45 + $0.25 = $1.60. Listing fee: $0.20. Total core fees = $4.73, or 10.5% of the order. Profit: $45 - $4.73 - $18 item cost - $5.00 shipping cost = $17.27. If that order came through an Offsite Ad at 15%, fees would rise by $6.75 and profit would fall to $10.52.",
    },
    faqs: [
      {
        question: "How much does Etsy take from each sale in total?",
        answer:
          "Core fees total roughly 10-11% of the order value for a typical US order once the listing fee, 6.5% transaction fee and 3% + $0.25 payment processing are combined — the fixed $0.45 of flat fees weighs more heavily on cheap items. A $15 order loses about 13% to core fees; a $100 order loses about 10%. Ads are additional.",
      },
      {
        question: "Does Etsy charge fees on shipping?",
        answer:
          "Yes. The transaction fee and payment processing are calculated on the amount the buyer pays including the shipping charge. Offering 'free' shipping by folding the cost into the item price does not reduce the percentage fees — the same total is charged either way — though it can change search placement.",
      },
      {
        question: "What is the Etsy regulatory operating fee?",
        answer:
          "A small additional percentage Etsy charges in some countries to cover local digital-services taxes and regulation — for example 0.27% in the US and higher in parts of Europe. It is calculated on the order total like the transaction fee. Check the fee line in your payment account for the rate that applies to your shop's country.",
      },
      {
        question: "How do Offsite Ads fees work?",
        answer:
          "If a buyer clicks an Etsy-placed ad (on Google, Instagram and similar) and buys from your shop within 30 days, Etsy charges 12% of the order total if your shop earned $10,000 or more in the previous 365 days, or 15% below that threshold, with the fee capped at $100 per order. High-earning shops cannot opt out; smaller shops can.",
      },
    ],
  },

  "ecommerce/ebay-fee-calculator": {
    quickAnswer:
      "Selling a $100 item with $10 shipping in most eBay categories costs about $15.36 in final value fees — 13.6% of the $110 total plus a $0.40 per-order fee — leaving $94.64 before your item and shipping costs. Fee rates vary by category, so check the rate for yours.",
    howItWorks: [
      "Enter the sale price, shipping charged to the buyer, your item cost and shipping cost, and pick the category rate that applies. Since eBay moved sellers to managed payments, there is no separate PayPal fee — payment processing is inside the final value fee.",
      "The final value fee is a percentage of the total amount of the sale: item price plus shipping plus any sales tax eBay collects. Most general categories sit at 13.6%, with lower rates in categories such as business equipment and higher effective rates on low-price items because of the fixed per-order fee ($0.30 on orders up to $10, $0.40 above).",
      "Promoted Listings are optional and additive: you choose an ad rate percentage, charged only when the item sells through the ad. The calculator lets you include it so the profit figure reflects promoted sales honestly.",
      "The result shows total fees, your net proceeds and profit after costs. Compare it against selling the same item on other channels — the fee gap between marketplaces is often larger than the price gap.",
    ],
    formula:
      "Profit = (sale price + shipping charged) - (final value fee % x total sale + per-order fee) - promoted listing fee - item cost - shipping cost.",
    example: {
      title: "Worked example: $100 sale in a 13.6% category",
      body: "Total amount of the sale: $100 item + $10 shipping = $110. Final value fee: 13.6% x $110 = $14.96, plus the $0.40 per-order fee = $15.36. Net proceeds: $110 - $15.36 = $94.64. With an item cost of $55 and actual shipping of $9.50, profit is $94.64 - $55 - $9.50 = $30.14. Adding a 5% promoted listing rate would cost a further $5.50 and cut profit to $24.64.",
    },
    faqs: [
      {
        question: "What percentage does eBay take in 2026?",
        answer:
          "For most categories, 13.6% of the total sale amount plus a per-order fee of $0.30-$0.40. Some categories differ: many electronics and media categories are lower, and parts and accessories follow their own schedule. eBay also charges insertion fees beyond a seller's free monthly allowance (typically $0.35 per listing) and optional listing upgrades. Rates change — verify your category in eBay's fee schedule before bulk pricing.",
      },
      {
        question: "Does eBay charge its fee on shipping and tax?",
        answer:
          "Yes. The percentage applies to the total the buyer pays, including the shipping charge and any sales tax eBay collects and remits. Sellers who underprice shipping therefore do not reduce the fee; the fee follows the combined total.",
      },
      {
        question: "Is there still a separate PayPal fee on eBay sales?",
        answer:
          "No. Under managed payments, eBay processes the payment itself and the processing cost is included in the final value fee. If you sell the same item through your own website with a separate payment processor, that processor's fee (typically around 2.9% + $0.30) applies instead and should be compared like-for-like.",
      },
      {
        question: "How do promoted listings change the maths?",
        answer:
          "The ad rate you set is charged on the total sale amount when the item sells after an ad click within 30 days, on top of the final value fee. At a 5% ad rate on a $110 sale that is $5.50. Promotion pays when it sells items that would otherwise sit unsold; on items that sell organically anyway, it is a straight margin cut.",
      },
    ],
  },

  "ecommerce/shopify-margin-calculator": {
    quickAnswer:
      "A $60 Shopify sale with a $24 product cost and $6 shipping cost keeps about $27.96 — a 46.6% margin — after Shopify Payments takes $2.04 (2.9% plus $0.30 at the standard online rate). Apps, ads and returns still come out of that figure.",
    howItWorks: [
      "Enter the selling price, product cost, shipping charged and shipping cost, plus any per-order costs you want included such as packaging or app fees spread per order. The calculator works out the true per-order profit, not just price minus product cost.",
      "Payment processing is applied at Shopify Payments' standard online rate of 2.9% plus $0.30 per order; higher Shopify plans carry lower rates (down to about 2.5% plus $0.30 on Advanced), and using a third-party gateway instead adds Shopify's transaction fee of 0.5-2% depending on plan. Enter the rate your store actually pays.",
      "The result shows profit per order, margin percentage and a break-even price — the lowest price at which the order still covers its costs. The break-even figure is the one to watch during discount campaigns.",
      "Run the numbers per product, not store-wide. A store's blended margin hides the products that lose money after shipping; those are the ones this calculator exists to find.",
    ],
    formula:
      "Profit = price + shipping charged - product cost - shipping cost - (price x payment rate + fixed fee) - other per-order costs. Margin = profit / revenue x 100.",
    example: {
      title: "Worked example: $60 product, free shipping offer",
      body: "Revenue: $60. Costs: product $24, shipping $6 (absorbed by the store), payment fee 2.9% x $60 + $0.30 = $2.04. Profit = $60 - $24 - $6 - $2.04 = $27.96, a 46.6% margin. If the same order carries a $15 customer acquisition cost from ads, the true contribution falls to $12.96 — the figure that decides whether the ad campaign scales.",
    },
    faqs: [
      {
        question: "What does Shopify charge per sale?",
        answer:
          "With Shopify Payments, the online card rate is 2.9% plus $0.30 per order on the Basic plan, about 2.7% plus $0.30 on Grow and about 2.5% plus $0.30 on Advanced; the monthly plan fee ($39 Basic at standard pricing) is separate. If you use an external payment gateway instead, Shopify adds a transaction fee of 2%, 1% or 0.5% by plan on top of the gateway's own charges.",
      },
      {
        question: "What margin should a Shopify store target?",
        answer:
          "A gross margin of 50% or more on products is a workable target for most direct-to-consumer stores, because ads, shipping subsidies, apps and returns typically consume 25-40 points of it. Stores with organic traffic can run profitably on less; stores buying all their traffic on ads usually need more.",
      },
      {
        question: "Should I include ad spend in product margin?",
        answer:
          "Keep two numbers. Product margin (price minus product, shipping and fees) tells you if the product is priced right. Contribution margin after ad spend tells you if the marketing is working. Mixing them into one figure makes it impossible to tell whether a bad month was a pricing problem or a traffic problem.",
      },
      {
        question: "How much do returns reduce margin?",
        answer:
          "At a 10% return rate with a $6 return shipping cost and a product that cannot be resold at full price, expect returns to cost roughly 3-6 margin points on apparel — the highest-return category, where rates of 20-30% are common. Add an expected returns cost per order (return rate x cost per return) to the calculator for a realistic figure.",
      },
    ],
  },

  "ecommerce/amazon-fba-fee-calculator": {
    quickAnswer:
      "A $30 item with a $9 unit cost, a 15% referral fee ($4.50), a $5.00 FBA fulfilment fee and $0.30 of storage keeps $11.20 — a 37.3% margin before advertising. Referral and fulfilment fees together usually take 25-35% of the price before you spend anything on ads.",
    howItWorks: [
      "Enter the selling price, unit cost (product plus inbound freight), and the item's size tier and weight. The calculator applies the referral fee for your category and the fulfilment fee for your size tier, plus an estimate of monthly storage spread per unit.",
      "Amazon's referral fee is a percentage of the total price including shipping: 15% in many major categories such as home and kitchen and beauty, 8% for electronics accessories in part, and up to 20% for jewellery, with minimums per category. It is charged whether the item is fulfilled by Amazon or by you.",
      "The FBA fulfilment fee is a flat per-unit charge set by size and shipping weight — small standard items run a few dollars, large and oversize items considerably more. It covers picking, packing, delivery and returns handling, which is why comparing FBA with merchant-fulfilled shipping needs your real carrier rates.",
      "The output shows profit per unit and margin after Amazon's fees. Advertising (Amazon Ads cost per click in competitive categories commonly runs $0.50-$3.00) is separate — subtract your ad cost per unit to get the figure that decides whether a listing is viable.",
    ],
    formula:
      "Profit = price - unit cost - (referral % x price) - FBA fulfilment fee - storage per unit - ad cost per unit.",
    example: {
      title: "Worked example: $30 kitchen item, standard size tier",
      body: "Referral fee at 15%: $4.50. Fulfilment fee for the size tier: $5.00. Storage allocated per unit: $0.30. Unit cost including inbound freight: $9.00. Profit = $30.00 - $9.00 - $4.50 - $5.00 - $0.30 = $11.20 per unit, a 37.3% margin. At an ad cost of $4.50 per unit sold (a 15% ad cost of sales), contribution falls to $6.70 — still viable, but a price cut of $3 would erase a third of it.",
    },
    faqs: [
      {
        question: "What are Amazon's referral fees by category?",
        answer:
          "Common rates: 15% for home and kitchen, beauty and most general categories; 8% for consumer electronics (with higher rates on accessories tiers); 12% for automotive in part; up to 20% for jewellery. Each category also has a minimum referral fee, typically $0.30. Amazon publishes the full schedule in Seller Central and adjusts it periodically — confirm your category's current rate there.",
      },
      {
        question: "How much is the FBA fulfilment fee?",
        answer:
          "It depends on the size tier and shipping weight. Small standard-size items generally cost roughly $3-$5.50 per unit, standard-size items more, and large or oversize items $10 and up, with peak-season surcharges in Q4. Measure and weigh your packaged product precisely — crossing a tier boundary by a fraction of an inch or ounce raises the fee on every unit.",
      },
      {
        question: "Is FBA worth it versus fulfilling orders myself?",
        answer:
          "Compare the FBA fee against your merchant-fulfilled total: carrier postage, packaging, your time, and the storage you use. FBA also converts the listing to Prime delivery, which raises conversion on most products. For small, fast-moving items FBA usually wins on both cost and sales; for slow or oversize items, merchant fulfilment or Seller Fulfilled Prime often costs less.",
      },
      {
        question: "What other Amazon fees should I budget for?",
        answer:
          "Monthly storage (charged per cubic foot, higher in Q4 and for aged inventory), long-term/aged inventory surcharges, removal or disposal fees, inbound placement fees depending on how you ship stock in, and returns processing fees in some categories. Slow-moving inventory is where these accumulate — storage and aged-inventory charges are the ones that turn a marginal product into a loss.",
      },
    ],
  },

  "ecommerce/sales-tax-vat-calculator": {
    quickAnswer:
      "A $100 purchase at an 8.25% combined sales tax rate adds $8.25, for a total of $108.25. The calculator also runs in reverse: a $108.25 tax-inclusive total at 8.25% contains $100 of price and $8.25 of tax.",
    howItWorks: [
      "Enter the price and the tax rate to get the tax amount and the tax-inclusive total. US sales tax is a combined rate — state plus county, city and special district layers — which is why the same state's rate changes by address; 8.25% is the maximum combined rate in much of Texas, for example.",
      "Use reverse mode when a receipt or a tax-inclusive price needs splitting: dividing the total by (1 + rate) recovers the pre-tax price. This is the correct way to extract tax from marketplace reports and imported invoices.",
      "VAT works differently — it is charged at each stage of the supply chain with credits for tax paid on inputs, and consumer prices are usually quoted VAT-inclusive (20% in the UK, 19% in Germany, 21% in Spain as standard rates). The reverse calculation is identical in form: a £120 VAT-inclusive price at 20% is £100 plus £20 VAT.",
      "For sellers, the calculator answers pricing questions, not filing questions. Collection obligations depend on nexus — where you have a physical presence or pass an economic threshold (commonly $100,000 of sales in a state) — and rates must be verified against the delivery address, not the store's location.",
    ],
    formula:
      "Tax = price x rate. Total = price x (1 + rate). Reverse: pre-tax price = total / (1 + rate).",
    example: {
      title: "Worked example: $250 order shipped to an 8.25% address",
      body: "Tax: $250 x 8.25% = $20.63 (rounded). Total charged: $270.63. To verify from the receipt: $270.63 / 1.0825 = $250.00 pre-tax. If the same $270.63 had been priced tax-inclusive under UK VAT at 20%, the split would be $270.63 / 1.20 = $225.53 of price and $45.10 of VAT — always confirm which tax and rate a total contains before extracting.",
    },
    faqs: [
      {
        question: "What is the average US sales tax rate?",
        answer:
          "Combined state and local rates average roughly 7.5-7.7% nationally. Five states (Oregon, Montana, New Hampshire, Delaware and Alaska) levy no statewide sales tax, though parts of Alaska have local taxes. The highest combined rates exceed 10% in some districts of states such as Illinois, Tennessee, Louisiana and Arkansas. The rate that applies is the one at the delivery address for shipped goods in most states.",
      },
      {
        question: "What is the difference between sales tax and VAT?",
        answer:
          "Sales tax is charged once, to the final consumer, and businesses reselling goods buy tax-free with a resale certificate. VAT is charged at every stage of production and distribution, with each business remitting tax on its value added and reclaiming tax on its inputs. The consumer ultimately bears both; the collection mechanics and the paperwork differ completely.",
      },
      {
        question: "When must an online seller collect sales tax in another state?",
        answer:
          "When the seller has nexus there: a physical presence (office, warehouse, employee) or economic nexus, which most states set at $100,000 of sales into the state in a year (some also count 200 transactions; several have dropped the transaction test). Marketplaces such as Amazon and Etsy collect and remit on marketplace sales in all states with such laws, which covers many small sellers automatically.",
      },
      {
        question: "How do I extract tax from a total that already includes it?",
        answer:
          "Divide the total by (1 + rate). At 8.25%, a $216.50 total divides by 1.0825 to give a $200 pre-tax price and $16.50 of tax. Do not subtract 8.25% of the total — that calculates the rate against the tax-inclusive base and understates the price ($216.50 x 8.25% = $17.86, which is wrong).",
      },
    ],
  },

  "ecommerce/customer-acquisition-cost-calculator": {
    quickAnswer:
      "Spending $4,000 on sales and marketing to win 160 new customers gives a customer acquisition cost of $25 per customer. CAC only means something next to lifetime value: at a $25 CAC, a customer must generate more than $25 of gross profit over their relationship with you.",
    howItWorks: [
      "Enter total sales and marketing spend for a period and the number of new customers that spend produced. Fully loaded CAC includes ad spend, marketing salaries, agency fees, software and discounts given to acquire — not just the ad platform's number.",
      "Match the period to your sales cycle. A business with a 60-day cycle that divides this month's spend by this month's customers will understate CAC, because this month's spend produces customers two months from now.",
      "The calculator reports CAC per customer and, if you enter revenue or margin data, CAC against first-order value — the test for whether acquisition pays back immediately or over repeat purchases.",
      "Compare CAC by channel, not blended. A blended $25 can hide a $12 organic channel subsidising a $60 paid channel, and budget decisions made on the blend will overfund the expensive channel.",
    ],
    formula:
      "CAC = total sales and marketing cost in period / new customers acquired in period.",
    example: {
      title: "Worked example: a month of paid acquisition",
      body: "Ad spend $3,200, marketing tools $300, and half of a marketing manager's $1,000 monthly cost allocated to acquisition: total $4,000. New customers: 160. CAC = $4,000 / 160 = $25. If the average first order is $55 at a 45% gross margin ($24.75 of profit), the first order alone does not cover CAC — the business needs at least one repeat purchase per customer to profit, which makes retention, not more ads, the binding constraint.",
    },
    faqs: [
      {
        question: "What counts toward CAC?",
        answer:
          "Everything spent to acquire: ad spend, sponsorships, affiliate commissions, marketing and sales salaries (the acquisition share), agency retainers, creative production, marketing software and first-order discounts or free shipping offers. Excluding salaries and discounts is the most common way CAC gets understated.",
      },
      {
        question: "What is a good CAC?",
        answer:
          "There is no universal figure — the test is the ratio to lifetime value. LTV:CAC of 3:1 or better is the standard benchmark for a healthy model; below 1.5:1, growth usually consumes cash faster than customers repay it. Also watch payback period: recovering CAC within 6-12 months keeps growth fundable for most small businesses.",
      },
      {
        question: "Why does the ad platform report a lower cost per customer?",
        answer:
          "Platforms count only their own spend and credit themselves for conversions they touched, sometimes alongside another platform claiming the same sale. They also exclude salaries, tools and discounts. A platform CPA of $18 can be a fully loaded CAC of $25-30. Use platform numbers to optimise inside the channel and fully loaded CAC to judge the channel.",
      },
      {
        question: "How can I lower CAC?",
        answer:
          "The durable routes are conversion rate (the same spend converts more visitors), channel mix (shift budget toward the channel with the lowest marginal CAC, not the lowest average), and referral or organic programmes that acquire at near-zero marginal cost. Cutting spend on the best channel to lower blended CAC usually lowers profit while improving the metric.",
      },
    ],
  },

  "ecommerce/ltv-to-cac-ratio-calculator": {
    quickAnswer:
      "A customer worth $300 in lifetime gross profit who costs $75 to acquire gives an LTV:CAC ratio of 4:1 — comfortably above the 3:1 benchmark. Below 1:1 the business loses money on every customer it wins, and growth makes the loss bigger.",
    howItWorks: [
      "Enter customer lifetime value and customer acquisition cost. LTV must be measured in gross profit, not revenue: average order value multiplied by gross margin, multiplied by the number of orders over the customer's life (or average monthly profit divided by churn rate for subscriptions).",
      "The calculator returns the ratio and the payback picture: how much of the first order's profit is consumed by acquisition cost, and how many orders a customer must place before they become profitable.",
      "Read the ratio alongside cash flow. A 4:1 ratio with a 24-month payback can still bankrupt a small business, because the $75 is spent today and the $300 arrives over two years. Ratio measures quality; payback measures survivability.",
      "Segment before acting. Ratios by channel, product line and cohort routinely differ by a factor of two or three; the blended figure is the average of businesses you would fund and businesses you would close.",
    ],
    formula:
      "LTV:CAC = lifetime gross profit per customer / acquisition cost per customer. LTV = average profit per order x orders per lifetime, or monthly profit per customer / monthly churn.",
    example: {
      title: "Worked example: subscription business at 5% monthly churn",
      body: "Subscribers pay $40 a month at a 70% gross margin, so monthly profit per customer is $28. At 5% monthly churn, the average customer stays 1 / 0.05 = 20 months. LTV = $28 x 20 = $560. With a CAC of $140, the ratio is 560 / 140 = 4:1, and payback is $140 / $28 = 5 months. Cutting churn to 4% extends life to 25 months, lifts LTV to $700 and the ratio to 5:1 — without spending a dollar more on acquisition.",
    },
    faqs: [
      {
        question: "What LTV:CAC ratio should I aim for?",
        answer:
          "3:1 is the widely used minimum for a sustainable model; 4:1 to 5:1 is strong. A ratio far above that — say 8:1 — usually signals underinvestment: the business could profitably spend more on acquisition and grow faster. A ratio below 1:1 means each new customer destroys value and growth should pause until price, margin or retention improves.",
      },
      {
        question: "Should LTV use revenue or profit?",
        answer:
          "Gross profit. Revenue-based LTV overstates value by the cost of goods and servicing, and it is the error behind most failed paid-acquisition programmes. A customer generating $1,000 of revenue at a 30% margin is worth $300 — compare CAC against $300, never against $1,000.",
      },
      {
        question: "How do I estimate LTV for a new business with no history?",
        answer:
          "Build it from components you can observe early: average order value, gross margin, and repeat purchase rate in the first 90-180 days. Use a conservative lifetime — assume repeat behaviour decays — and revisit the estimate as cohorts age. Decisions made on a cautious LTV improve with data; decisions made on an optimistic one often cannot be unwound.",
      },
      {
        question: "What moves the ratio fastest?",
        answer:
          "Churn and margin usually beat acquisition cost. In the worked example, one point of churn (5% to 4%) raised LTV by 25%. A 10% price rise at constant volume lifts LTV directly. Cutting CAC by switching channels often lowers customer quality and LTV with it — check the ratio by channel before reallocating budget.",
      },
    ],
  },

  "ecommerce/target-roas-break-even-calculator": {
    quickAnswer:
      "At a 40% gross margin, break-even ROAS is 2.5 — every $1 of ad spend must return $2.50 of revenue just to cover the cost of the goods sold. At a 25% margin it is 4.0; at 60% it is 1.67. Campaigns below break-even ROAS lose money on every sale they generate.",
    howItWorks: [
      "Enter your gross margin (or price and unit cost) and any additional per-order costs you want included — shipping subsidy, packaging, transaction fees. The calculator converts margin into the revenue each ad dollar must produce to break even.",
      "The maths is direct: ads are paid out of gross profit. If each revenue dollar carries 40 cents of gross profit, one ad dollar needs 1 / 0.40 = $2.50 of revenue to pay for itself.",
      "Set two targets, not one. The break-even figure is the floor. A target ROAS above it — say 3.5 when break-even is 2.5 — reserves profit after ads for overheads and net margin. Campaigns between floor and target are profitable but thin; campaigns below the floor are losing money however good the revenue looks.",
      "Recompute when prices, costs or fee rates change. A supplier price rise that cuts margin from 40% to 34% moves break-even ROAS from 2.5 to 2.94; a campaign happily running at 2.7 flips from profit to loss without the ad performance changing at all.",
    ],
    formula:
      "Break-even ROAS = 1 / gross margin (as a decimal). With extra per-order costs: 1 / (margin - extra costs as a share of price).",
    example: {
      title: "Worked example: $80 product, $48 unit cost, $4 shipping subsidy",
      body: "Gross margin before shipping: ($80 - $48) / $80 = 40%. The $4 shipping subsidy is 5% of price, leaving an effective margin of 35%. Break-even ROAS = 1 / 0.35 = 2.86. The store spends $1,000 on ads and makes $2,700 of revenue (ROAS 2.7): gross profit after shipping is $945 against $1,000 of ads — a $55 loss on a campaign that looks close to target. At ROAS 3.2, revenue of $3,200 yields $1,120 of gross profit and $120 over break-even.",
    },
    faqs: [
      {
        question: "What is the difference between break-even and target ROAS?",
        answer:
          "Break-even ROAS is where ad spend exactly consumes gross profit — zero profit, zero loss. Target ROAS adds the profit you require on top. If break-even is 2.5 and you want ads to leave 10% of revenue as profit, target ROAS = 1 / (0.40 - 0.10) = 3.33. Managing campaigns to break-even by mistake is a common cause of 'busy but broke' stores.",
      },
      {
        question: "Should fees and shipping be included in the margin?",
        answer:
          "Yes, for an honest floor. Payment processing (around 2.9% + $0.30), marketplace referral fees and any shipping subsidy all come out of the same revenue the ads generate. A margin that excludes them produces a break-even ROAS that is too low, and campaigns get scaled while losing money.",
      },
      {
        question: "Why do platforms report ROAS differently?",
        answer:
          "Platforms attribute revenue using their own windows and models — view-through conversions, 7-day click windows, cross-device estimates — and two platforms can both claim the same order. Platform ROAS guides optimisation inside the platform; judge profitability on your store's actual revenue and ad invoices over the same period.",
      },
      {
        question: "What if my ROAS is above break-even but I still lose money?",
        answer:
          "Break-even ROAS only covers the cost of goods and the per-order costs you included. Rent, salaries, software and your own time sit below it. That is why the target ROAS, set with a profit allowance, is the operational number — break-even is a floor for emergencies and clearance pricing, not a strategy.",
      },
    ],
  },

};
