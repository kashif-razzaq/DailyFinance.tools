import type { Guide } from "../guides"

/** Editorial guides — Salary, Tax, Retirement & Investing hub. Part of the 100-article framework set. */
export const GUIDES_TAX_SALARY_RETIREMENT: Guide[] = [
  {
    "cornerstone": false,
    "description": "How federal tax brackets work in 2026: marginal vs effective rates, the full single and joint tables, a worked example, and what a raise really costs you.",
    "faqs": [
      {
        "answer": "Bonuses are supplemental wages, and employers usually withhold on them at a flat 22% federal rate rather than your W-4 rate. That is withholding, not the tax itself: your actual tax on the bonus depends on your marginal bracket for the year. If 22% was too much, the excess comes back as a refund or a smaller tax bill when you file; if too little, you owe the difference.",
        "question": "Why is my bonus withheld at a higher rate?"
      },
      {
        "answer": "Most states use their own graduated brackets with different rates and thresholds, and a few use a single flat rate. Nine states levy no tax on wage income at all. State tax stacks on top of federal tax, so your true marginal rate on the next dollar is the two combined. Your state guide covers the structure where you live.",
        "question": "Do state taxes use brackets too?"
      },
      {
        "answer": "Your marginal rate is the rate on your next dollar of income — the rate of your top bracket. Your effective rate is total tax divided by total income, and it is always lower, because most of your income is taxed in the lower brackets. A single filer in the 22% bracket might pay an effective rate near 12%.",
        "question": "What is the difference between my marginal and effective tax rate?"
      },
      {
        "answer": "No. Only the income above the bracket line is taxed at the higher rate; every dollar below it keeps its old rate. A raise always increases your after-tax pay through federal income tax alone. The confusion comes from benefit cliffs in other programs, where earning more can reduce a subsidy — that is a benefits rule, not a tax bracket.",
        "question": "Can a raise push me into a higher bracket and cost me money?"
      },
      {
        "answer": "Subtract the standard deduction ($16,100 single, $32,200 joint in 2026) or your itemized deductions from your income to get taxable income, then find the row it falls in. The rate on that row is your marginal rate. The Income Tax Calculator runs the same calculation with your exact figures.",
        "question": "How do I find my tax bracket?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/how-federal-income-tax-brackets-work.jpg",
    "imageAlt": "Illustration of tax brackets as ascending emerald steps with a gold coin on each",
    "inlineImage": "/images/how-federal-income-tax-brackets-work-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of ascending emerald and sage bar-chart columns with a stack of burnt-orange coins beside the tallest column",
    "intro": "The most persistent myth in personal tax is that moving into a higher bracket taxes all your income at the higher rate. It does not. Each bracket taxes only the slice of income inside it. A raise is never a pay cut via federal income tax — the math below shows why.",
    "published": "2026-11-17",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Income Tax Calculator",
        "url": "/tax/income-tax-calculator"
      },
      {
        "name": "Tax Calculator",
        "url": "/tax/tax-calculator"
      },
      {
        "name": "Take-Home Pay Calculator",
        "url": "/tax/take-home-pay-calculator"
      },
      {
        "name": "Capital Gains Tax Calculator",
        "url": "/tax/capital-gains-tax-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How marginal rates actually work",
        "paragraphs": [
          "The federal income tax is progressive: rates rise as income rises, but only the income inside each band pays that band's rate. Think of seven stacked buckets. The 10% bucket holds the first slice of taxable income; the 12% bucket holds the next slice; and so on up to 37%. Your top bucket is your marginal rate — the rate on the next dollar you earn, and the rate that decides what a raise, a bonus, or an extra shift is really worth.",
          "The effective rate is different: total tax divided by total income. Because most of your income is taxed in the lower buckets, your effective rate is always below your marginal rate — often far below. The worked example below shows a filer with a 22% marginal rate paying an 11.6% effective rate. People quote the marginal rate as if it were the average, and that error makes tax look roughly twice as heavy as it is.",
          "The myth that a raise can cost you money comes from confusing the two. Crossing into a higher bracket changes the rate on the dollars above the line only. Every dollar below the line keeps its old rate. No raise, bonus, or overtime shift can reduce your after-tax pay through federal income tax alone. Benefit cliffs exist in some means-tested programs, where earning more can reduce a subsidy — but that is a benefits rule, not a tax bracket."
        ]
      },
      {
        "heading": "The standard deduction comes first",
        "paragraphs": [
          "Brackets apply to taxable income, not to your salary. Before any bracket touches your pay, the standard deduction comes off: $16,100 for a single filer in 2026, $32,200 for married couples filing jointly. A single filer earning $50,000 has taxable income of $33,900; the first $16,100 is taxed at 0%. The deduction is the reason the bracket tables look lower than most people's salaries.",
          "The deduction is also why low earners can owe no federal income tax at all: a single filer earning $16,100 or less has zero taxable income. And it is why the 0% capital gains threshold reaches further than it looks — the threshold applies to taxable income, so the deduction adds room on top of it. More on that below.",
          "You can itemize instead — mortgage interest, state and local taxes up to a cap, charitable gifts — but only the amount above the standard deduction saves tax. If your itemized deductions total $18,000 as a single filer, itemizing saves tax on $1,900, not on $18,000. Most filers take the standard deduction, and the comparison takes five minutes at filing time."
        ]
      },
      {
        "heading": "The 2026 federal brackets",
        "paragraphs": [
          "There are seven rates: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. The thresholds are adjusted for inflation each year; the table shows 2026 for single filers and married couples filing jointly. The tax-at-threshold column is the cumulative tax owed on all income up to that line — a shortcut for working out your bill: find your row, then add your marginal rate times the income above the line.",
          "Read the table with an example. A single filer with $120,000 of taxable income sits in the 24% bracket, because $120,000 is above the $105,700 line. Tax is $17,966 plus 24% of the $14,300 above the line ($3,432), for a total of $21,398 — an effective rate of 17.8% on taxable income. Nobody pays 24% on the whole $120,000.",
          "Filing jointly roughly doubles the thresholds up to the 35% bracket, which is the marriage bonus for single-earner couples: the same income spread across wider bands. At the top the doubling breaks — the 37% bracket starts at $640,600 single but $768,700 joint, not $1,281,200. Two high earners filing jointly can pay more than two single filers on the same combined income. The marriage penalty lives at the top."
        ],
        "table": {
          "head": [
            "Rate",
            "Single: taxable income over",
            "Married filing jointly: over",
            "Tax at threshold (single)"
          ],
          "rows": [
            [
              "10%",
              "$0",
              "$0",
              "$0"
            ],
            [
              "12%",
              "$12,400",
              "$24,800",
              "$1,240"
            ],
            [
              "22%",
              "$50,400",
              "$100,800",
              "$5,800"
            ],
            [
              "24%",
              "$105,700",
              "$211,400",
              "$17,966"
            ],
            [
              "32%",
              "$201,775",
              "$403,550",
              "$41,024"
            ],
            [
              "35%",
              "$256,225",
              "$512,450",
              "$58,448"
            ],
            [
              "37%",
              "$640,600",
              "$768,700",
              "$192,979.25"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Withholding is an estimate settled at filing — a refund means you overpaid during the year, not that you were taxed less.",
          "Pre-tax 401(k) and HSA contributions reduce taxable income in the top slice first — they save tax at your marginal rate.",
          "FICA (Social Security + Medicare, 7.65%) applies on top of income tax and is mostly flat, with a Social Security wage cap."
        ],
        "heading": "A worked example (2026, single filer)",
        "paragraphs": [
          "The standard deduction comes off first: $16,100 for a single filer in 2026. On an $85,000 salary, taxable income is $68,900. Tax is then built in slices: 10% on the first $12,400 ($1,240), 12% on the next slice up to $50,400 ($4,560), and 22% on the remainder up to $68,900 ($4,070). Total federal income tax: about $9,870 — an effective rate of 11.6% of gross pay, even though the marginal bracket is 22%.",
          "Now add a $5,000 raise. Only the new $5,000 is taxed at 22% ($1,100); the rest of the income is taxed exactly as before. You keep $3,900 of the raise before FICA and state tax. The marginal rate is the price of the next dollar; the effective rate is what you actually pay on average. Confusing the two leads people to refuse overtime, fear bonuses and misjudge job offers."
        ]
      },
      {
        "heading": "What a raise, bonus, or second job really costs",
        "paragraphs": [
          "A raise is taxed at your marginal rate — the rate on the next dollar. At a 22% marginal rate, a $5,000 raise costs $1,100 of federal income tax and keeps $3,900 before FICA and state tax. The only way a raise leaves you worse off is outside the tax system: a lost benefit or a higher Medicare premium years later, not the bracket itself.",
          "Bonuses look worse than they are. Employers usually withhold on supplemental wages at a flat 22%, which can exceed your real rate if your marginal rate is 12%. The extra comes back as a refund or a smaller bill at filing — withholding is a deposit, not the tax. And if a bonus pushes part of your income into the next bracket, only that part pays the higher rate.",
          "A second job or a working spouse changes the picture, because each employer withholds as if its job were your only income. Two $60,000 jobs look like two middle incomes to payroll; combined, $120,000 pushes part of your income into a higher bracket, and the standard deduction is only claimed once. The fix is the W-4: the multiple-jobs worksheet or the IRS Tax Withholding Estimator. Without it, April brings a bill.",
          "Overtime and commissions work the same way: each extra dollar is taxed at your marginal rate, never at a rate applied to your whole salary. Turning down overtime to stay in a lower bracket gives up after-tax pay for no reason — you keep 78 cents of every overtime dollar at a 22% marginal rate, before FICA and state tax."
        ]
      },
      {
        "heading": "Withholding vs the actual tax bill",
        "paragraphs": [
          "Your paycheck withholding and your tax bill are two different numbers, and the gap between them is the refund or the amount owed in April. Withholding is payroll's estimate: it annualizes one paycheck, applies the standard deduction and the bracket tables, and withholds the result. It knows nothing about your spouse's income, your freelance work, your capital gains, or your deductions beyond the standard one.",
          "That is why a refund is not a bonus and a bill is not a penalty. A $2,000 refund means you lent the government $2,000 during the year at 0% interest; a $2,000 bill means you kept the money and now settle up. Either way the tax is the same — only the timing differs. The fix for a persistent refund is a new W-4 with the right adjustments, or the IRS Tax Withholding Estimator to set it exactly.",
          "Income without withholding needs its own plan. Freelance earnings, rental income, and capital gains have no employer withholding anything, so the IRS expects quarterly estimated payments — due in April, June, September, and January. Miss them and the IRS charges interest on the underpayment, even if you pay in full at filing. A common rule of thumb is to set aside your marginal rate on every untaxed dollar as it arrives."
        ]
      },
      {
        "heading": "Capital gains sit on top of ordinary income",
        "paragraphs": [
          "Long-term capital gains — profit on assets held more than a year — get their own rates: 0%, 15%, or 20%, depending on total taxable income. The gains stack on top of your ordinary income: wages and other income fill the lower bands first, and the gain fills whatever room is left. That stacking is why the same $10,000 gain can be taxed at 0% for one person and 15% for another.",
          "For 2026, the 0% rate covers taxable income up to $49,450 for single filers and $98,900 for married couples filing jointly. The 15% rate runs to $545,500 single and $613,700 joint; above that, 20%. Because the threshold applies to taxable income — after the standard deduction — a single filer with no other income can realize about $65,550 of gains ($49,450 plus the $16,100 standard deduction) at 0%.",
          "Short-term gains — assets held a year or less — are taxed as ordinary income at your marginal rate. Holding an asset past the one-year mark can cut the rate from 22% or 24% to 15% or even 0%. High earners face one more layer: the 3.8% net investment income tax applies to investment income when modified adjusted gross income passes $200,000 single or $250,000 joint. Those thresholds are fixed in law and do not rise with inflation.",
          "Qualified dividends use the same 0/15/20% schedule as long-term gains. And losses matter: capital losses offset gains dollar for dollar, and up to $3,000 of net losses a year can offset ordinary income, with the rest carried forward to future years. Selling a losing investment to realize the loss — tax-loss harvesting — is one of the few ways to choose which year a loss lands in."
        ],
        "table": {
          "head": [
            "Long-term rate",
            "Single",
            "Married filing jointly"
          ],
          "rows": [
            [
              "0%",
              "Taxable income up to $49,450",
              "Taxable income up to $98,900"
            ],
            [
              "15%",
              "$49,451 to $545,500",
              "$98,901 to $613,700"
            ],
            [
              "20%",
              "Over $545,500",
              "Over $613,700"
            ]
          ]
        }
      },
      {
        "heading": "How to lower your marginal rate",
        "paragraphs": [
          "You cannot choose your bracket, but you can choose how much income lands in it. Pre-tax contributions to a 401(k) or traditional IRA come off the top slice first: a $5,000 401(k) contribution at a 22% marginal rate saves $1,100 of federal income tax this year. HSA contributions made through payroll save income tax and FICA both, which is why the HSA is the most tax-favoured account in the code.",
          "Timing matters in uneven years. Freelancers and business owners can sometimes shift income or deductions across the year boundary — billing in January instead of December, or bunching charitable gifts into one year so itemized deductions clear the standard deduction. These moves change which year's brackets the income faces, and the saving is the difference between the two years' marginal rates.",
          "Tax-loss harvesting in a taxable account works the same way: selling a losing investment to realize the loss, then using it to offset gains or up to $3,000 of ordinary income. The wash-sale rule blocks the loss if you buy the same security within 30 days before or after the sale, so the replacement holding has to be genuinely different.",
          "What does not work: refusing income. No deduction is worth more than the income it shelters — a 22% saving on a dollar you never earned is still a dollar lost. The goal is to pay tax once, at the lowest available rate, not to avoid earning. Every legitimate strategy on this page keeps the income and changes when or how it is taxed."
        ]
      },
      {
        "heading": "How brackets change each year",
        "paragraphs": [
          "Bracket thresholds are not fixed — the IRS adjusts them for inflation every fall, in a revenue procedure published before the tax year starts. The 2026 figures in this guide come from Revenue Procedure 2025-32. The adjustment uses the chained consumer price index, so thresholds rise in most years and hold flat when inflation is near zero.",
          "The adjustment matters because without it, inflation alone would push people into higher brackets — bracket creep. A 3% raise that only matches inflation would otherwise face a higher marginal rate on the same real income. Indexing keeps the real tax on the same real income roughly constant, year after year.",
          "Not everything is indexed. The net investment income tax thresholds ($200,000 single, $250,000 joint) are fixed in law, as are the Social Security benefit taxation thresholds. Those fixed lines bite more people every year as nominal incomes rise. Brackets move with inflation; the fixed thresholds do not, and the difference is deliberate — Congress chose which lines to index.",
          "Rates themselves change only when Congress changes them. The seven rates in the table — 10% to 37% — are set by statute. Thresholds move with inflation every year; rates move only when the law changes. Check the current year's figures before planning around them — last year's table is close, but close is not exact."
        ]
      },
      {
        "heading": "State tax and the total marginal rate",
        "paragraphs": [
          "Federal brackets are only part of the rate on your next dollar. Most states levy their own income tax with their own brackets, and a few use a flat rate. Nine states levy no tax on wage income at all. Your state guide covers the structure where you live — but the arithmetic is the same everywhere: the rates stack.",
          "Stacking changes decisions. A worker in the 22% federal bracket in a 5% state bracket faces a 27% marginal rate on the next dollar of wages — and 34.65% once the 7.65% FICA charge is included, below the Social Security wage base. That combined rate is the real price of the next dollar, and the real saving from a pre-tax 401(k) contribution: $5,000 contributed at a 34.65% combined rate saves about $1,733.",
          "Some cities add their own income tax on top — New York City and Philadelphia are the best-known examples — and a few states tax retirement withdrawals differently from wages. Moving states changes the stack: the same salary in Texas or Florida keeps more of each dollar than in California or New York, though housing and other costs move the other way. The bracket is federal; the total is local."
        ]
      },
      {
        "bullets": [
          "Refusing overtime or a bonus to avoid a higher bracket — you keep most of every extra dollar; the higher rate touches only the slice above the line.",
          "Treating a refund as a bonus — a refund is your own money returned. A large refund every year means your withholding is too high; adjust your W-4 and use the money during the year.",
          "Forgetting state tax — state brackets stack on top of federal ones. A 22% federal marginal rate plus a 5% state rate is a 27% marginal rate on the next dollar.",
          "Ignoring FICA — Social Security and Medicare add 7.65% on wages up to the Social Security wage base ($184,500 in 2026), and Medicare has no cap. Your true marginal rate on pay is higher than your bracket.",
          "Filing with the wrong status — married couples should compare joint versus separate filing. The answer is usually joint, but the comparison costs nothing and the difference can be thousands."
        ],
        "heading": "Mistakes that cost real money",
        "paragraphs": [
          "The bracket myth is the most expensive misunderstanding in personal tax, but it is not the only one. A few errors show up every filing season, and each has a concrete cost.",
          "When the numbers get complicated — a second job, stock compensation, rental income, a mid-year move — run the figures through the Income Tax Calculator before the year ends. Bracket decisions made in December are cheap; the same decisions discovered in April are not."
        ]
      }
    ],
    "seoTitle": "How Federal Income Tax Brackets Work in 2026 (With Examples)",
    "slug": "how-federal-income-tax-brackets-work",
    "sources": [
      {
        "label": "IRS — Revenue Procedure 2025-32 (2026 figures)",
        "url": "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf"
      },
      {
        "label": "IRS — Federal income tax rates and brackets",
        "url": "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets"
      }
    ],
    "title": "How Federal Income Tax Brackets Work in 2026 (With Examples)",
    "type": "What",
    "updated": "2026-11-17"
  },
  {
    "cornerstone": false,
    "description": "How to read your paycheck: gross pay, FICA, federal withholding and every deduction line explained, plus the annual checks that catch costly payroll errors.",
    "faqs": [
      {
        "answer": "Common causes: new benefit premiums from open enrollment, a reset of the Social Security wage base, updated tax tables, or a fresh 401(k) election. Compare the stub line by line against the last stub of the old year — the line that moved names the cause. If no line explains the change, ask payroll; January errors are the cheapest to fix.",
        "question": "Why did my take-home change in January?"
      },
      {
        "answer": "Taxable wages are gross pay minus pre-tax deductions such as traditional 401(k) contributions, health premiums, and HSA contributions. The gap between them is why two people on the same salary can owe different tax — and why your W-2 Box 1 is usually lower than your salary. Roth contributions do not reduce taxable wages.",
        "question": "What is the difference between gross and taxable wages?"
      },
      {
        "answer": "A first paycheck often covers a partial period, and deductions can front-load: a full month's health premium on a half-month's pay, or a 401(k) election applied from day one. Bonuses and overtime in the first period are also withheld at the supplemental rate. Compare the stub's gross and each deduction against your offer letter before worrying.",
        "question": "Why is my first paycheck smaller than I expected?"
      },
      {
        "answer": "Year to date: the running total of each line since January 1. YTD gross is what you have earned so far this year; YTD 401(k) shows progress toward the annual limit; YTD Social Security wages show how close you are to the $184,500 wage base. The final stub of the year is the draft of your W-2.",
        "question": "What does YTD mean on a pay stub?"
      },
      {
        "answer": "Your employer must tell you about changes to pay, but the notice is often the stub itself or an open-enrollment email. Premium changes, tax-table updates, and court-ordered garnishments can all move your deposit without a separate conversation. Read every stub, and question any line you do not recognize — payroll errors are common and fixable.",
        "question": "Can my employer change my deductions without telling me?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/how-to-read-your-paycheck.jpg",
    "imageAlt": "Illustration of a paycheck: a payslip with neat rows, a magnifier and a coin stack",
    "inlineImage": "/images/how-to-read-your-paycheck-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of an open emerald wallet with bills and burnt-orange coins, a sage calendar, and a magnifying glass leaning on a coin stack",
    "intro": "A pay stub is a small financial statement. Between gross pay and the deposit, four things leave: pre-tax deductions, federal withholding, FICA, and state/local tax — in that order, and the order matters because each step shrinks the base the next one taxes.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Paycheck Calculator",
        "url": "/tax/paycheck-calculator"
      },
      {
        "name": "Salary Calculator",
        "url": "/tax/salary-calculator"
      },
      {
        "name": "Overtime Calculator",
        "url": "/tax/overtime-calculator"
      },
      {
        "name": "Take-Home Pay Calculator",
        "url": "/tax/take-home-pay-calculator"
      }
    ],
    "sections": [
      {
        "heading": "The anatomy of a pay stub",
        "paragraphs": [
          "Every stub has the same four blocks, whatever the format: earnings, taxes, deductions, and the summary. Earnings shows hours and rate (or salary for the period), plus overtime, bonuses, and commissions. Taxes shows federal withholding, Social Security, Medicare, and state and local tax. Deductions shows everything else taken from pay. The summary shows gross pay, total deductions, and net pay — the deposit — for this period and year to date.",
          "The year-to-date (YTD) column is the most useful part of the stub. It turns each line into a running total you can check against your own records: YTD gross against your salary, YTD 401(k) against the annual limit, YTD Social Security wages against the wage base. A single period's stub can hide an error; the YTD column exposes it.",
          "Codes vary by employer — FED, SS, MED, 401K, MED-PRE — and the stub rarely explains them. Your payroll portal or HR team has the legend; if a code is unfamiliar, ask before assuming. Misreading a code is how people miss a double deduction for months."
        ]
      },
      {
        "heading": "Gross pay: what counts",
        "paragraphs": [
          "Gross pay is everything you earned in the period before anything comes out. For hourly workers that is hours times rate, including overtime at time-and-a-half for hours over 40 in a week. For salaried workers it is the annual salary divided by the number of pay periods — 26 for biweekly, 24 for semi-monthly. The two extra paychecks a year on a biweekly schedule are not bonuses; they are the same salary split differently.",
          "Bonuses, commissions, tips, and shift differentials all count as gross pay and are taxed as wages. So are payouts for unused vacation and sick leave when you leave a job. Taxable fringe benefits — personal use of a company car, for example — can appear in gross pay too, even though no cash changed hands.",
          "What does not count: employer-paid health premiums (they never reach your stub as income), employer 401(k) matching contributions, and reimbursements for business expenses. If your stub's gross looks higher than your salary divided by pay periods, check for a bonus, an overtime line, or a taxable fringe — not an error."
        ]
      },
      {
        "bullets": [
          "Roth 401(k) contributions are post-tax: they do not reduce this year's taxable wages.",
          "Garnishments, union dues and after-tax benefits appear after taxes — read them separately from tax lines.",
          "Your final stub of the year is the draft of your W-2; discrepancies are easiest to fix in January."
        ],
        "heading": "The order money leaves",
        "paragraphs": [
          "Start with gross pay. Pre-tax deductions come out first: traditional 401(k) contributions, health premiums and HSA/FSA contributions. These reduce the income the IRS taxes, which is why a 6% 401(k) contribution on a $70,000 salary removes $4,200 from taxable wages, not just from your deposit. Federal withholding is then estimated from the W-4 you filed, using the bracket system. FICA follows: 6.2% Social Security up to the annual wage cap plus 1.45% Medicare, matched by your employer. State and local taxes come last, where they exist.",
          "Two checks are worth doing annually. First, whether your withholding roughly matches your actual tax — a large refund every year is an interest-free loan you can redirect by adjusting your W-4. Second, whether your year-to-date Social Security wages stop at the cap; payroll errors do happen, and excess FICA is only recoverable at filing."
        ]
      },
      {
        "heading": "Federal withholding and your W-4",
        "paragraphs": [
          "Federal withholding is your employer's estimate of your annual income tax, paid a little each paycheck. Payroll annualizes your pay for the period, applies the standard deduction and the bracket tables, and withholds the result. The W-4 you filed tells payroll how to adjust that estimate: dependents, a second job, extra withholding you requested.",
          "The W-4 changed in 2020 — allowances are gone. Step 1 is personal information; Step 2 covers multiple jobs or a working spouse; Step 3 claims dependents; Step 4 covers other income, deductions, and extra withholding. A W-4 filed years ago may no longer match your life, and payroll has no way to know unless you file a new one.",
          "Withholding is an estimate, and estimates miss. A second job, a working spouse, freelance income, or a mid-year raise can all leave you under-withheld — and the IRS charges interest on underpayment. The IRS Tax Withholding Estimator takes ten minutes and tells you exactly what to put on a new W-4. Run it after any life change: marriage, a new job, a child, a house.",
          "You can file a new W-4 at any time. Your employer must apply it by the start of the first payroll period ending on or after the 30th day after you submit it — so a form handed in this week can still take a pay cycle or two to show up. Check the next stub to confirm the change landed."
        ]
      },
      {
        "heading": "FICA, line by line",
        "paragraphs": [
          "FICA is two taxes with one name. Social Security takes 6.2% of wages up to the annual wage base — $184,500 in 2026 — and Medicare takes 1.45% of all wages with no cap. Your employer matches both, so the true cost is double what you see: 12.4% for Social Security and 2.9% for Medicare combined. Self-employed workers pay both halves themselves, 15.3% in total, through the self-employment tax.",
          "The Social Security wage base is why high earners see a mid-year bump in take-home pay. Once your year-to-date Social Security wages pass $184,500, the 6.2% stops for the rest of the year. On a $250,000 salary, the cap saves about $4,060 a year against what the tax would be without it — money that shows up as a larger deposit from the month you cross the line.",
          "Medicare has no cap, and high earners pay more: an additional 0.9% Medicare tax applies to wages above $200,000 in a year, withheld by the employer with no employer match. It is easy to miss on a stub because it appears only after you cross $200,000 of wages — and only on the wages above the line.",
          "Two FICA checks matter. First, if you changed jobs mid-year, each employer withholds Social Security up to the cap separately — you may have overpaid, and the excess is refunded as a credit when you file. Second, some wages are exempt: student workers at their own school and certain visa holders, for example. If a line is missing that should be there — or present when it should not be — payroll can fix it, but only if you notice."
        ]
      },
      {
        "heading": "State and local tax lines",
        "paragraphs": [
          "State withholding works like federal withholding with different tables: your employer estimates your state tax from your pay and your state withholding form, which is separate from the federal W-4. Rates and brackets vary widely — some states have a single flat rate, others graduate like the federal system, and nine states levy no tax on wages at all. If you moved mid-year, you may see two state lines on one stub.",
          "A few states add their own lines. California, New York, New Jersey, Rhode Island, and Hawaii levy state disability insurance (SDI), which appears as its own deduction. Some cities levy a local income tax — New York City's is the largest — and some school districts and counties do too. These lines are small individually; together they explain why two identical salaries in different states produce different deposits.",
          "State withholding errors are harder to catch than federal ones, because the tables are unfamiliar. If your state line looks wrong — zero in a state with an income tax, or a jump with no explanation — compare it against your state's withholding calculator or last year's return. State refunds and bills settle the same way federal ones do, at filing time."
        ]
      },
      {
        "heading": "A worked example: one biweekly paycheck",
        "paragraphs": [
          "Take a salaried worker earning $70,000, paid biweekly. Gross pay per period is $2,692.31 ($70,000 divided by 26). Pre-tax deductions: a 6% 401(k) contribution of $161.54 and a $150 health premium. Federal taxable wages are $2,380.77. FICA is charged on $2,542.31 — the health premium reduces FICA wages, but the 401(k) contribution does not.",
          "Social Security takes 6.2% of $2,542.31 ($157.62); Medicare takes 1.45% ($36.86). Federal withholding: annualize the $2,380.77 of taxable wages to $61,900, subtract the $16,100 standard deduction, and apply the brackets to $45,800 — $1,240 plus 12% of $33,400, or $5,248 a year, about $201.85 per paycheck. Net pay before state tax: about $1,984.",
          "The effective federal income tax rate on this paycheck is about 7.5% of gross pay ($201.85 on $2,692.31), even though the marginal bracket is 12% — the standard deduction and the 10% bracket do the work. Add FICA and the total federal bite is about 14.7% before state tax. Run your own figures through the Paycheck Calculator; the pattern holds at every salary, but the numbers move with your elections."
        ]
      },
      {
        "heading": "Pre-tax vs post-tax deductions",
        "paragraphs": [
          "Pre-tax deductions come out before income tax is calculated, so they shrink the wages the IRS taxes. Traditional 401(k) contributions, health insurance premiums, HSA contributions, and flexible spending accounts all work this way. A $200 monthly HSA contribution removes $2,400 a year from taxable wages; at a 22% marginal rate that saves $528 of federal income tax, plus FICA if it runs through payroll.",
          "Not every pre-tax deduction reduces every tax. Traditional 401(k) contributions reduce federal income tax and, in most states, state tax — but not FICA. Social Security and Medicare are still charged on the full wage. HSA contributions through payroll are the exception: they escape FICA too, which is one reason the HSA is the most tax-favoured account in the code.",
          "Post-tax deductions come out after tax is calculated and change nothing about your tax bill. Roth 401(k) contributions are the main one: you pay tax on the money now, and qualified withdrawals in retirement are tax-free. Roth contributions do not reduce this year's taxable wages, so a Roth saver on the same salary pays more tax today than a traditional saver — and less later.",
          "The order matters for a reason: pre-tax deductions reduce the base that withholding and FICA are calculated on. Two people on the same salary can have different take-home pay and different tax bills purely because one maxes a 401(k) and the other does not. The stub shows the result; the choice was made at enrollment."
        ],
        "table": {
          "head": [
            "Deduction",
            "Reduces income tax?",
            "Reduces FICA?",
            "When taxed"
          ],
          "rows": [
            [
              "Traditional 401(k)",
              "Yes",
              "No",
              "At withdrawal"
            ],
            [
              "Roth 401(k)",
              "No",
              "No",
              "Never, if qualified"
            ],
            [
              "HSA (via payroll)",
              "Yes",
              "Yes",
              "Never, for medical use"
            ],
            [
              "Health premiums",
              "Yes",
              "Yes",
              "Never"
            ],
            [
              "FSA",
              "Yes",
              "Yes",
              "Never, for qualified use"
            ]
          ]
        }
      },
      {
        "heading": "After-tax lines and the year-to-date column",
        "paragraphs": [
          "After taxes, the remaining lines are a mixed bag: Roth 401(k) contributions, after-tax 401(k) contributions, union dues, garnishments, 401(k) loan repayments, parking and transit passes, and charitable gifts through payroll. Read them separately from the tax lines — they are spending and saving choices, not taxes, even though they reduce the same deposit.",
          "Garnishments deserve attention: a court-ordered deduction for child support, student loans, or a debt judgment. Federal law caps most garnishments at 25% of disposable earnings, and child support orders can go higher. If a garnishment appears that you did not expect, contact payroll and the issuing court — errors happen, and they compound.",
          "The year-to-date column is your reconciliation tool. In December, YTD federal wages should roughly match your W-2 Box 1, and YTD Social Security wages should match Box 3. Differences have explanations — pre-tax deductions lower Box 1 but not Box 3 — but a large unexplained gap means a payroll error, and January is the cheapest month to fix it. Keep the final stub of each year; it is the draft of your W-2 and the evidence if the W-2 is wrong.",
          "Keep stubs for at least a year, and the final stub of each year with your tax return. If a future employer, a lender, or the SSA questions your earnings record, the stub is the record that settles it."
        ]
      },
      {
        "heading": "What to do when something looks wrong",
        "paragraphs": [
          "Start with the stub, not the phone. Compare the suspect line against the previous period and the year-to-date column: a deduction that doubled, a YTD total that jumped by more than one period's amount, a tax line that changed without a pay change. Note the pay periods affected and the amounts — payroll fixes specifics, not vibes.",
          "Raise it with payroll in writing — email, not a hallway conversation — and keep a copy. Most errors are corrected in the next pay cycle, and over-withheld tax is returned through payroll or at filing. If the error reaches your W-2, your employer issues a corrected W-2 (Form W-2c); do not file with a W-2 you know is wrong, because the IRS matches it against the employer's filing.",
          "Two errors have longer tails. Social Security wages reported wrong change your future benefit — check the earnings record at ssa.gov and dispute errors with pay stubs as evidence. And a 401(k) contribution at the wrong percentage compounds silently: a 3% election instead of 6% on a $70,000 salary is $2,100 a year of missed saving, plus the match it would have earned."
        ]
      },
      {
        "heading": "Pay frequency and the extra-paycheck months",
        "paragraphs": [
          "How often you are paid changes the shape of your cash flow, not the total. Biweekly pay means 26 paychecks a year — two months with three paychecks. Semi-monthly pay means 24 paychecks, two a month, every month. Monthly pay means 12. The annual salary is the same; only the split differs.",
          "The three-paycheck months are the ones to plan around. On a biweekly schedule they arrive twice a year, and the third check in those months has no rent or mortgage due against it for most people — it is the cheapest windfall in personal finance. Directing those two checks to savings, debt, or an annual bill is worth more than any budgeting app.",
          "Withholding adapts to frequency automatically: payroll annualizes each paycheck — multiplying a biweekly check by 26, a semi-monthly check by 24 — so the annual estimate is the same either way. What changes is the per-check amount: the same annual tax split across 26 checks is smaller per check than across 24. If you switch employers and the pay frequency changes, expect the per-check numbers to move even though the annual figures have not."
        ]
      },
      {
        "heading": "When your take-home changes unexpectedly",
        "paragraphs": [
          "Take-home pay moves for ordinary reasons, and the stub tells you which one. A January drop usually means new benefit premiums, a reset Social Security wage base, updated tax tables, or a fresh 401(k) election. A mid-year jump often means you crossed the Social Security wage base — the 6.2% stops and your deposit rises.",
          "Compare line by line against the previous stub, not against memory. Find the line that moved: gross, withholding, or a deduction. If gross moved, check hours, overtime, or a bonus. If withholding moved, check whether a W-4 change took effect or a bonus was withheld at the supplemental rate. If a deduction moved, check open enrollment or a new election.",
          "A shrinking deposit with no line explaining it is a payroll error until proven otherwise. Common ones: a deduction that should have ended, a double premium after a plan change, a 401(k) contribution at the wrong percentage. Payroll departments fix errors routinely — but only for the people who report them."
        ]
      }
    ],
    "seoTitle": "How to Read Your Paycheck (Pay Stub): Deductions Explained",
    "slug": "how-to-read-your-paycheck",
    "sources": [
      {
        "label": "IRS — Tax Withholding Estimator",
        "url": "https://www.irs.gov/individuals/tax-withholding-estimator"
      },
      {
        "label": "IRS — Topic No. 751, Social Security and Medicare withholding rates",
        "url": "https://www.irs.gov/taxtopics/tc751"
      }
    ],
    "title": "How to Read Your Paycheck (Pay Stub): Deductions Explained",
    "type": "How-to",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": false,
    "description": "Roth vs traditional IRA: both shelter growth, so the choice is when you pay tax — a bet on your current bracket vs your retirement bracket. How to decide.",
    "faqs": [
      {
        "answer": "Yes — a Roth conversion. The converted amount is taxed as ordinary income in the conversion year, so conversions are cheapest in low-income years, such as early retirement before Social Security starts. There is no income limit on conversions and no limit on the amount, but the pro-rata rule applies if you hold other pre-tax IRA money.",
        "question": "Can I convert a traditional IRA to a Roth?"
      },
      {
        "answer": "Rising future rates favor the Roth: you lock in today's lower rate and future withdrawals are insulated from whatever Congress does next. The same logic applies in reverse — if you expect rates to fall, the traditional IRA's deduction now becomes more valuable. Nobody knows future rates, which is one argument for holding both.",
        "question": "Which is better if I expect tax rates to rise generally?"
      },
      {
        "answer": "Yes. The $7,500 limit for 2026 ($8,600 at 50+) applies to your combined contributions across all IRAs, not per account. You can split it any way you like — $4,000 to a Roth and $3,500 to a traditional, for example — as long as the total stays within the limit and your earned income.",
        "question": "Can I contribute to both a Roth and a traditional IRA in the same year?"
      },
      {
        "answer": "Excess contributions are taxed at 6% a year for every year they remain in the account. You can avoid the tax by withdrawing the excess — plus any earnings on it — before the tax-filing deadline for that year. The 6% penalty applies again each year the excess stays put, so fix it promptly.",
        "question": "What happens if I contribute too much to an IRA?"
      },
      {
        "answer": "Yes. Your contribution cannot exceed your taxable compensation for the year, and you need earned income to contribute at all. The exception is a spousal IRA: if you file jointly, a spouse with no income can contribute based on the working spouse's earnings, up to the same $7,500 limit.",
        "question": "Do I need earned income to open an IRA?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/roth-vs-traditional-ira.jpg",
    "imageAlt": "Illustration of Roth vs Traditional IRA: two plant pots on a balance, one in sun and one in shade",
    "inlineImage": "/images/roth-vs-traditional-ira-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a balance scale holding two stacks of burnt-orange coins, a small green sprout growing from the taller stack, under a sage sun arc",
    "intro": "A traditional IRA deducts contributions now and taxes withdrawals later. A Roth IRA taxes contributions now and never taxes qualified withdrawals. If your tax rate is the same on both ends, the outcomes are identical. The decision is a comparison of two rates — today's and retirement's — plus a few rules that break the tie.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Roth IRA Calculator",
        "url": "/personal-wealth/roth-ira-calculator"
      },
      {
        "name": "IRA Calculator",
        "url": "/personal-wealth/ira-calculator"
      },
      {
        "name": "Retirement Calculator",
        "url": "/personal-wealth/retirement-calculator"
      },
      {
        "name": "Roth IRA Conversion Simulator",
        "url": "/personal-wealth/roth-ira-conversion-simulator"
      }
    ],
    "sections": [
      {
        "heading": "How each account taxes you",
        "paragraphs": [
          "A traditional IRA is tax-deferred: contributions may be deductible in the year you make them, growth is untaxed while it compounds, and withdrawals in retirement are taxed as ordinary income. The government lends you the tax and collects it later. A Roth IRA is tax-exempt: contributions go in after tax with no deduction, growth is untaxed, and qualified withdrawals are untaxed too. The government collects its share up front and never again.",
          "Both accounts shelter growth the same way — dividends, interest, and capital gains inside either IRA are never taxed year by year. That shared shelter is why the comparison comes down to timing alone: pay tax now at today's rate, or pay tax later at retirement's rate. Everything else — investment choices, fees, compounding — is identical between the two.",
          "The timing difference has a second-order effect: a traditional IRA's balance is partly the government's money. A $500,000 traditional balance at a 22% retirement rate is worth $390,000 after tax; a $500,000 Roth balance is worth $500,000."
        ]
      },
      {
        "bullets": [
          "2026 contribution limit: $7,500 under 50; $8,600 at 50+. Verify current limits with the IRS before contributing.",
          "Roth contributions (not earnings) can be withdrawn any time without tax or penalty — a flexibility traditional IRAs do not offer.",
          "Traditional IRAs force required minimum distributions in your 70s; Roth IRAs do not for the original owner.",
          "Roth income limits can be worked around via the backdoor Roth — a conversion with paperwork that must be done correctly."
        ],
        "heading": "The math of the tie",
        "paragraphs": [
          "Contribute $7,500 at a 22% bracket. Traditional: the full $7,500 goes in (saving $1,650 of tax now), grows for 30 years at 7% to about $57,100, and is taxed at withdrawal. At 22%, you keep $44,500. Roth: you pay the $1,650 now, contribute $5,850 of after-tax money... to compare fairly, invest the same total outlay — $7,500 of earnings. After tax, $5,850 goes into the Roth and grows to about $44,500, tax-free. Identical. Change the retirement bracket to 12% and traditional wins; change it to 32% and Roth wins by a wide margin.",
          "Most early-career savers are in the 12% or 22% bracket with decades of raises ahead — Roth contributions at a known, low rate are usually the better bet. Peak-earning years in the 32%+ brackets favor traditional deductions. Many households end up holding both, which creates tax diversification: in retirement you can choose which account funds each year, managing brackets year by year."
        ]
      },
      {
        "heading": "The 2026 limits and income rules",
        "paragraphs": [
          "For 2026 you can contribute up to $7,500 across all your traditional and Roth IRAs combined, or $8,600 if you are 50 or older. The limit is shared — $7,500 total, not $7,500 per account — and it cannot exceed your earned income for the year. A spouse with no income can contribute to a spousal IRA based on the working spouse's earnings, up to the same limit. There is no age limit on contributions.",
          "The traditional IRA's deduction is income-tested if you or your spouse has a workplace plan. For 2026, the deduction phases out between $81,000 and $91,000 of modified adjusted gross income for single filers covered by a plan at work, and between $129,000 and $149,000 for married couples filing jointly. Below the range the full contribution is deductible; above it, none of it is — though you can still contribute after tax. Without a workplace plan, the deduction is fully available at any income.",
          "The Roth IRA's contribution is income-tested for everyone. For 2026, direct Roth contributions phase out between $153,000 and $168,000 of modified adjusted gross income for single filers and between $242,000 and $252,000 for married couples filing jointly. Above the top of the range, no direct contribution is allowed — but the backdoor route below stays open.",
          "Contributions for a tax year can be made until the filing deadline — April 15 of the following year. That window matters: you can decide your Roth-versus-traditional split after the year's income is known, not before. Excess contributions are taxed at 6% a year for every year they stay in the account, so check the limits before you contribute, not after."
        ],
        "table": {
          "head": [
            "Rule, 2026",
            "Traditional IRA",
            "Roth IRA"
          ],
          "rows": [
            [
              "Contribution limit (under 50)",
              "$7,500",
              "$7,500"
            ],
            [
              "Contribution limit (50+)",
              "$8,600",
              "$8,600"
            ],
            [
              "Tax on contributions",
              "May be deductible",
              "No deduction"
            ],
            [
              "Tax on qualified withdrawals",
              "Taxed as income",
              "Tax-free"
            ],
            [
              "Income phase-out (single)",
              "$81,000–$91,000 (deduction, if covered at work)",
              "$153,000–$168,000 (contribution)"
            ],
            [
              "Income phase-out (joint)",
              "$129,000–$149,000 (deduction, if covered at work)",
              "$242,000–$252,000 (contribution)"
            ],
            [
              "Required withdrawals",
              "Yes, from RMD age",
              "None for the owner"
            ]
          ]
        }
      },
      {
        "heading": "The same money at three life stages",
        "paragraphs": [
          "At 25, in the 12% bracket, the Roth is the obvious call. A $7,500 Roth contribution costs $900 of tax today; invested at 7% for 40 years it grows to about $112,300, all of it tax-free. The same $7,500 in a traditional IRA saves $900 now and produces a retirement tax bill on the full $112,300 — at 22%, about $24,700.",
          "At 45, in the 24% bracket at peak earnings, the traditional deduction earns its keep. A $7,500 contribution saves $1,800 of tax this year, and the money has 20 years to grow before retirement. If the retirement bracket is 12% or 22%, the deduction was worth more than the withdrawal tax. This is the saver the traditional IRA was designed for — high rate now, lower rate later.",
          "At 62, retired but not yet claiming Social Security, the question flips to conversions. Income is low — no salary, no benefits yet — so converting traditional money to Roth at 12% beats leaving it to face RMDs at 22% later. The window between retirement and RMD age is the cheapest conversion opportunity most savers ever get, and it closes when benefits and RMDs start."
        ]
      },
      {
        "heading": "The five-year rules",
        "paragraphs": [
          "Roth withdrawals are tax-free only when they are qualified, and qualification has two conditions: the five-year rule and a qualifying event. The five-year clock starts on January 1 of the tax year for which you made your first Roth contribution — not the day you deposited the money. A contribution for 2026 made in April 2027 still starts the clock on January 1, 2026, and the five years end on December 31, 2030.",
          "The qualifying event is usually turning 59½. The others are disability, death (for beneficiaries), and a first-home purchase of up to $10,000. Meet both conditions and every dollar — contributions and earnings — comes out tax-free. Miss the five-year rule and the earnings portion of a withdrawal is taxable, even after 59½.",
          "Conversions have their own five-year clock. Each conversion starts a separate five-year period, and withdrawing converted money before it runs out triggers the 10% early-withdrawal penalty if you are under 59½ — even though the conversion itself was already taxed. The rule exists to stop people converting and withdrawing immediately to dodge the penalty.",
          "The practical lesson: open a Roth IRA early, even with a small contribution. The clock starts with the first dollar, and five years pass whether you contribute again or not. A Roth opened at 25 and left alone is fully seasoned long before retirement; one opened at 60 is not."
        ]
      },
      {
        "heading": "Taking money out before 59½",
        "paragraphs": [
          "Withdrawals from a traditional IRA before 59½ are taxed as income plus a 10% early-withdrawal penalty, unless an exception applies. The exceptions cover disability, death, unreimbursed medical expenses above 7.5% of adjusted gross income, qualified higher-education expenses, health insurance premiums while unemployed, a first-home purchase up to $10,000, and a series of substantially equal periodic payments. Each exception waives the penalty only — the income tax still applies.",
          "The Roth IRA is more flexible, because of the ordering rules. Withdrawals come out in a fixed sequence: regular contributions first, then converted amounts, then earnings. Contributions were already taxed, so they come out tax-free and penalty-free at any age, for any reason. That makes a Roth IRA a genuine emergency reserve in a way a traditional IRA is not — though raiding retirement savings should be a last resort.",
          "The first-home exception is worth understanding precisely. Up to $10,000 per person, lifetime, can be withdrawn penalty-free for a first home — and first-time means you have not owned a home in the previous two years. A married couple can each use $10,000 from their own IRAs. The money must be spent on the purchase within 120 days. For a Roth, the withdrawal is fully tax-free as well if the five-year rule is met.",
          "One trap: the 10% penalty applies per distribution, and the IRS checks your age at withdrawal, not at contribution. A traditional IRA withdrawal at 59 is penalized; the same withdrawal six months later is not. If you can wait, wait."
        ]
      },
      {
        "heading": "What the choice does not change",
        "paragraphs": [
          "The Roth-versus-traditional choice changes when you pay tax. It does not change what you can invest in, what you pay in fees, or how fast the money compounds. Both accounts hold the same funds at the same prices, and a dollar inside either one grows at the same rate. Anyone selling a Roth IRA as a better investment — rather than a better tax wrapper — is confusing the account with the investment.",
          "Creditor protection is broadly similar too: federal bankruptcy law protects IRA assets up to a limit that adjusts for inflation, and many states add their own protection outside bankruptcy. The details vary by state, but the Roth-versus-traditional choice is not what decides them.",
          "Inheritance rules are the same for both: most non-spouse beneficiaries must empty an inherited IRA within ten years under the SECURE Act. The difference is what the beneficiary owes: inherited Roth withdrawals are tax-free, while inherited traditional withdrawals are taxed as income. That makes a Roth the better account to leave behind — one more tie-breaker, not a reason to choose on its own.",
          "Fees deserve a final word: the tax saving from the right choice can be wiped out by a high-fee fund or an adviser charging 1% a year. Choose the account on tax; choose the investment on cost."
        ]
      },
      {
        "heading": "Roth conversions and the backdoor Roth",
        "paragraphs": [
          "A Roth conversion moves money from a traditional IRA to a Roth IRA. The converted amount is taxed as ordinary income in the conversion year — there is no limit on how much you can convert and no income limit on who can convert. The best conversion years are low-income ones: early retirement before Social Security starts, a sabbatical, a year between jobs. Converting $30,000 in a 12% year costs $3,600; the same conversion in a 32% year costs $9,600.",
          "The backdoor Roth uses the same mechanism for high earners who cannot contribute directly. You contribute after tax to a traditional IRA — no deduction, no income limit on the contribution itself — then convert it to a Roth. If the contribution was after tax and there are no earnings yet, the conversion costs little or no tax. The paperwork matters: the conversion is reported on Form 8606, and mistakes create double taxation.",
          "The pro-rata rule is the catch. If you hold other pre-tax money in any traditional, SEP, or SIMPLE IRA, the IRS treats every conversion as a proportional mix of pre-tax and after-tax money across all your IRAs. Someone with $90,000 of pre-tax IRA money who contributes $7,500 after tax and converts $7,500 will find about 92% of the conversion taxable — the backdoor barely helps.",
          "The clean fix is to move pre-tax IRA money into a workplace 401(k) before using the backdoor — 401(k) balances do not count in the pro-rata calculation. Without that step, the backdoor is usually not worth it. Run the conversion through the Roth IRA Conversion Simulator before moving money; the tax bill arrives in the conversion year whether or not you expected it."
        ]
      },
      {
        "heading": "Required minimum distributions",
        "paragraphs": [
          "Traditional IRAs force withdrawals in retirement. Required minimum distributions begin at 73 if you were born between 1951 and 1959, and at 75 if you were born in 1960 or later. Each year's RMD is the prior year-end balance divided by a life-expectancy factor from the IRS Uniform Lifetime Table — at 73 the factor is 26.5, so a $1,000,000 balance produces a first RMD of about $37,736.",
          "Missing an RMD is expensive: the excise tax is 25% of the amount you failed to withdraw, reduced to 10% if you correct the shortfall within two years. Roth IRAs have no RMDs during the owner's lifetime, and since 2024 designated Roth accounts in 401(k) plans are exempt too. That exemption is worth real money late in retirement: Roth balances keep compounding untouched while traditional balances are drawn down on the IRS's schedule.",
          "RMDs also drive tax planning in the gap years between retirement and RMD age. Converting traditional money to Roth in low-income years shrinks future RMDs, which can keep you in a lower bracket and limit the income-related surcharge on Medicare premiums. The conversion decision and the RMD decision are the same decision, seen from two ends."
        ]
      },
      {
        "heading": "IRAs and the rest of your retirement plan",
        "paragraphs": [
          "An IRA is rarely the first account to fund. The usual order: contribute enough to your 401(k) to capture the full employer match — an immediate return no IRA can match — then fund an IRA up to the limit, then return to the 401(k) for anything beyond that. The 2026 401(k) limit is $24,500 ($32,500 at 50+), far above the IRA's $7,500, so the 401(k) carries the bulk of saving for most workers.",
          "The IRA's advantage is choice. A 401(k) offers the funds your employer picked; an IRA offers nearly any fund, stock, or bond on the market, usually at lower fees. That freedom is worth more as balances grow — a 0.5% fee difference on $100,000 is $500 a year, every year. The IRA is also yours when you change jobs; a 401(k) follows the employer until you roll it over.",
          "The HSA sits alongside both for workers with a high-deductible health plan: deductible contributions, tax-free growth, tax-free withdrawals for medical costs — the only triple-tax-advantaged account. After 65, HSA withdrawals for non-medical costs are taxed like a traditional IRA, so the account doubles as a backup retirement fund."
        ]
      },
      {
        "bullets": [
          "In the 12% bracket or below: Roth, almost always.",
          "In the 32% bracket or above: traditional, almost always.",
          "In the 22% or 24% bracket: split, or decide on the tie-breakers.",
          "Above the Roth income limits: traditional plus the backdoor, with the pro-rata rule checked first.",
          "Nearing retirement with a large traditional balance: model conversions in low-income years before RMDs begin."
        ],
        "heading": "A decision framework",
        "paragraphs": [
          "The decision rule is simple to state and hard to apply: compare your marginal rate today with your expected marginal rate in retirement. Early-career savers in the 12% bracket with decades of raises ahead should usually choose Roth — the rate is low and known, and the tax-free growth compounds for decades. Peak earners in the 32% bracket or above should usually take the traditional deduction — the rate is high, and retirement income is often lower.",
          "The middle is genuinely uncertain. A saver in the 22% bracket today who expects a similar rate in retirement can split contributions between the two — and many should. Holding both creates tax diversification: in retirement you choose each year which account funds spending, managing your bracket year by year. Roth withdrawals add nothing to taxable income, so they can fill a year without pushing Social Security benefits into a higher tax tier.",
          "A few tie-breakers: choose Roth if you expect tax rates to rise generally, if you want to leave tax-free money to heirs, or if you value the option of withdrawing contributions early. Choose traditional if you need the deduction to qualify for other benefits, or if you are in a high-tax state now and plan to retire in a low-tax one — state tax follows the same timing logic as federal."
        ]
      }
    ],
    "seoTitle": "Roth vs Traditional IRA: Which Is Better for Your Taxes?",
    "slug": "roth-vs-traditional-ira",
    "sources": [
      {
        "label": "IRS — Roth IRAs",
        "url": "https://www.irs.gov/retirement-plans/roth-iras"
      },
      {
        "label": "IRS — Traditional IRAs",
        "url": "https://www.irs.gov/retirement-plans/traditional-iras"
      },
      {
        "label": "IRS — Retirement topics: IRA contribution limits",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits"
      }
    ],
    "title": "Roth vs Traditional IRA: Which Is Better for Your Taxes?",
    "type": "Comparison",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": false,
    "description": "How Social Security benefits are calculated: your 35 best years, bend points, claiming age, the earnings test, spousal benefits, taxes and the 2026 COLA.",
    "faqs": [
      {
        "answer": "Trust-fund projections show a shortfall in the mid-2030s that would cut scheduled benefits by roughly a fifth if Congress does nothing. Payroll taxes would still cover the majority of benefits — the system cannot run to zero while workers keep paying in. Planning with a haircut is prudent; planning on zero is not supported by the projections.",
        "question": "Will Social Security run out?"
      },
      {
        "answer": "Yes. Before full retirement age, earning above the annual limit — $24,480 in 2026 — temporarily withholds $1 of benefits per $2 earned above it, and the withheld amounts are credited back later. In the year you reach full retirement age the limit is $65,160. After full retirement age there is no limit at all.",
        "question": "Can I claim and keep working?"
      },
      {
        "answer": "Full retirement age is the age at which you receive your full benefit with no reduction: 67 if you were born in 1960 or later, 66 if you were born between 1943 and 1954, and 66 plus two months per birth year in between. Claiming earlier reduces the benefit permanently; delaying past it adds 8% a year until 70.",
        "question": "What is full retirement age?"
      },
      {
        "answer": "The SSA averages your best 35 years of indexed earnings. Years you did not work enter as zeros, which drags the average down — a 30-year career carries five zero years. Working additional years replaces zeros with real earnings and can raise the benefit more than expected, especially late-career years at higher pay.",
        "question": "How is my benefit calculated if I worked fewer than 35 years?"
      },
      {
        "answer": "Up to 85% of your benefits can be federally taxable, depending on combined income — your AGI plus tax-exempt interest plus half your benefits. Below $25,000 single or $32,000 joint, none is taxable. The thresholds have never been indexed for inflation, so more retirees cross them each year.",
        "question": "Are Social Security benefits taxed?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/social-security-benefits-explained.jpg",
    "imageAlt": "Illustration of Social Security: a shield with a rising sun and coin steps",
    "inlineImage": "/images/social-security-benefits-explained-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of an hourglass with burnt-orange coins flowing through it, beside a sage calendar and a rising sun over layered hills",
    "intro": "Your Social Security benefit is not based on your last or best salary. It is built from your 35 highest-earning years, indexed for wage growth, run through a formula that replaces a larger share of income for lower earners — and then permanently adjusted up or down by the age at which you claim.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Social Security Calculator",
        "url": "/personal-wealth/social-security-calculator"
      },
      {
        "name": "Retirement Calculator",
        "url": "/personal-wealth/retirement-calculator"
      },
      {
        "name": "RMD Calculator",
        "url": "/personal-wealth/rmd-calculator"
      }
    ],
    "sections": [
      {
        "heading": "The 35-year rule and the bend points",
        "paragraphs": [
          "The SSA averages your best 35 years of indexed earnings into a monthly figure (AIME), then applies bend points: 90% of the first slice, 32% of the middle slice, 15% above that. That progressive formula is why the system replaces roughly 55% of income for a low earner and about 28% for a high earner. Work fewer than 35 years and the missing years enter as zeros — a 30-year career carries five zero years in the average, which is why late-career years of work sometimes replace early low or zero years and raise the benefit more than expected."
        ]
      },
      {
        "bullets": [
          "You need 40 credits to qualify for retirement benefits — at most four a year, one per $1,890 of earnings in 2026. Ten years of steady work earns them.",
          "Earnings above the annual wage base ($184,500 in 2026) are not taxed for Social Security and do not raise your benefit.",
          "Your benefit is based on your own earnings record — a spouse's record matters only for spousal and survivor benefits."
        ],
        "heading": "How your benefit is calculated, step by step",
        "paragraphs": [
          "The calculation has four steps. First, the SSA takes your earnings history and indexes each year's earnings for wage growth — a dollar earned in 1990 counts for more than its face value, because average wages have risen since. Indexing stops at age 60; earnings after 60 count at face value.",
          "Second, the SSA picks your 35 highest-earning indexed years and averages them into a monthly figure called average indexed monthly earnings (AIME). Work fewer than 35 years and the missing years enter as zeros — five zero years in a 30-year career cut the average by about a seventh. A late-career year at high pay can replace an early low year and lift the average more than the extra year of work suggests.",
          "Third, the SSA runs AIME through the benefit formula — the bend points. For workers first eligible in 2026, the primary insurance amount (PIA) is 90% of the first $1,286 of AIME, plus 32% of AIME between $1,286 and $7,749, plus 15% of AIME above $7,749. The PIA is the benefit at full retirement age. Bend points are indexed to average wages, so they rise most years; the 2026 figures apply to workers turning 62 in 2026.",
          "A worked example: AIME of $6,000 a month. The first $1,286 pays 90% ($1,157.40); the remaining $4,714 pays 32% ($1,508.48). The PIA is about $2,666 a month at full retirement age. A higher earner with AIME of $10,000 gets 90% of $1,286 ($1,157.40), 32% of $6,463 ($2,068.16), and 15% of $2,251 ($337.65) — about $3,563. The second worker earned two-thirds more and receives about a third more: the formula replaces a larger share of income for lower earners, by design."
        ]
      },
      {
        "heading": "Full retirement age by birth year",
        "paragraphs": [
          "Full retirement age (FRA) is the age at which you receive your full PIA — no reduction, no bonus. It depends only on your birth year: 66 for those born between 1943 and 1954, rising two months per birth year through 1959, and 67 for anyone born in 1960 or later. Congress set the schedule in 1983, and under current law it stops at 67.",
          "Two details catch people out. First, if you were born on January 1, the SSA treats you as born in the previous year — someone born January 1, 1960 uses the 1959 row. Second, the earliest claiming age is 62 for everyone, but the reduction for claiming at 62 depends on your FRA: 30% for those with an FRA of 67, 25% for those with an FRA of 66."
        ],
        "table": {
          "head": [
            "Born",
            "Full retirement age"
          ],
          "rows": [
            [
              "1943–1954",
              "66"
            ],
            [
              "1955",
              "66 and 2 months"
            ],
            [
              "1956",
              "66 and 4 months"
            ],
            [
              "1957",
              "66 and 6 months"
            ],
            [
              "1958",
              "66 and 8 months"
            ],
            [
              "1959",
              "66 and 10 months"
            ],
            [
              "1960 or later",
              "67"
            ]
          ]
        }
      },
      {
        "bullets": [
          "A spousal benefit can reach 50% of the worker's full-retirement amount; survivor benefits reach up to 100%.",
          "Benefits are taxable on up to 85% of the amount, depending on combined income.",
          "Check your earnings record at ssa.gov — unreported or mis-credited years directly cut the benefit."
        ],
        "heading": "Claiming age: the 76% swing",
        "paragraphs": [
          "Claiming at 62 instead of full retirement age (67 for those born in 1960 or later) cuts the benefit by about 30%, permanently. Waiting to 70 adds delayed retirement credits of 8% per year past full retirement age — a benefit about 76% larger than the age-62 amount. The break-even for waiting is typically the early-to-mid 80s: live past it and waiting wins by an increasing margin. Health, a spouse's benefit, and whether you keep working before full retirement age (the earnings test can temporarily withhold benefits) all belong in the decision — it is insurance against a long life more than an investment to maximise."
        ]
      },
      {
        "heading": "Delaying to 70: what the extra years buy",
        "paragraphs": [
          "Delayed retirement credits add 8% a year for each year you wait past full retirement age, up to 70 — a guaranteed, inflation-adjusted increase no investment can match. On a $2,000 monthly benefit at full retirement age, claiming at 62 pays $1,400; claiming at 70 pays $2,480. The age-70 check is $1,080 a month larger than the age-62 check, every month, for life.",
          "The cost of waiting is the checks you do not receive. Claiming at 62 pays $1,400 a month for eight years before the age-70 claim starts — $134,400 in hand by 70. The age-70 check is $1,080 a month larger, so it takes about ten and a half years of the larger checks to catch up, and the crossover lands in the early 80s. Live past it and waiting wins by an increasing margin; die before it and claiming early wins.",
          "Two factors tilt the answer beyond the arithmetic. First, the survivor benefit: a higher earner who delays to 70 leaves a larger survivor benefit for a spouse. Second, health: waiting requires funding the gap years from savings, and it is the wrong choice if you need the income or expect a short retirement."
        ]
      },
      {
        "heading": "Working while collecting: the earnings test",
        "paragraphs": [
          "Claim before full retirement age and keep working, and the earnings test can temporarily withhold part of your benefit. For 2026, if you are under FRA for the whole year, you can earn $24,480 without losing anything; above that, the SSA withholds $1 of benefits for every $2 earned over the limit. In the calendar year you reach FRA, the limit jumps to $65,160 and the withholding softens to $1 for every $3 — counting only earnings from the months before you reach FRA. From the month you reach FRA, there is no limit at all.",
          "A worked example: you are 63, your benefit is $1,800 a month, and you earn $30,480 in 2026 — $6,000 over the limit. The SSA withholds $3,000 over the year, roughly a month and two-thirds of benefits, spread across the year's payments.",
          "Withheld benefits are not lost. When you reach full retirement age, the SSA recalculates your benefit to credit back the months that were withheld in full — your monthly amount rises to reflect the months you effectively did not claim. The earnings test is a timing shift, not a tax. It still hurts cash flow in the year it applies, which is why the claiming decision and the working decision belong together.",
          "Only earnings from work count: wages, bonuses, commissions, and net self-employment income. Pensions, annuities, investment income, interest, dividends, and capital gains do not. In your first year of benefits, the SSA can apply a monthly test instead — you are treated as retired in any month you earn $2,040 or less — which helps people who retire mid-year."
        ]
      },
      {
        "heading": "Spousal, survivor, and family benefits",
        "paragraphs": [
          "A married spouse can claim a spousal benefit of up to 50% of the worker's PIA — the full-retirement-age amount, not the amount the worker actually receives. The 50% requires claiming at your own full retirement age; claiming earlier reduces it. You receive the larger of your own benefit and the spousal benefit, not both. A spouse with no earnings history of their own still qualifies after a year of marriage — and, for divorced spouses, a marriage that lasted at least ten years.",
          "Survivor benefits are larger. A widow or widower can receive up to 100% of the worker's benefit, including any delayed retirement credits the worker earned. A surviving spouse can claim a survivor benefit as early as 60 (50 if disabled) at a reduced rate. One practical consequence: the higher earner's decision to delay to 70 protects the surviving spouse, not just the worker.",
          "Divorced spouses keep rights too: a marriage of at least ten years entitles an ex-spouse to spousal benefits on the worker's record, and to survivor benefits if the worker dies — without affecting what the worker or a current spouse receives. Remarriage generally ends spousal benefits on an ex-spouse's record, but survivor benefits can survive a remarriage after age 60.",
          "There is a family maximum — a cap on the total benefits payable on one worker's record, usually 150% to 180% of the PIA. It rarely binds for a worker plus a spouse, but it can matter for families with several children collecting on one record. Children's benefits end at 18 (19 if still in high school), or continue for a disabled adult child."
        ]
      },
      {
        "heading": "Disability and survivors: the insurance you already own",
        "paragraphs": [
          "Retirement is not the only benefit your payroll taxes buy. Social Security Disability Insurance (SSDI) pays a benefit based on your earnings record if a severe disability stops you working before retirement — the same PIA formula, with the claiming-age adjustment replaced by disability rules. Survivors Insurance pays your spouse and children if you die. Both are funded by the same 6.2% payroll tax.",
          "The disability benefit is harder to qualify for than most people expect: the condition must prevent substantial work and be expected to last at least a year or result in death. But for workers who do qualify, it replaces income at the same progressive formula as retirement.",
          "Young families get the most from the survivors side. A worker who dies with young children leaves a survivor benefit for the spouse caring for them and for each child — benefits that can exceed what the worker would have received in retirement. The value is invisible until it is needed, which is why the payroll tax is better understood as an insurance premium than as a tax."
        ]
      },
      {
        "heading": "Taxes on benefits",
        "paragraphs": [
          "Up to 85% of your Social Security benefits can be federally taxable, depending on your combined income: adjusted gross income plus tax-exempt interest plus half of your Social Security benefits. The thresholds are fixed in law and have never been indexed for inflation — set in 1983 and 1993 — so more retirees cross them every year as incomes rise.",
          "The 85% figure is a ceiling on how much of the benefit enters taxable income, not a tax rate. The taxable portion is then taxed at your ordinary marginal rate. A retiree in the 12% bracket with 85% of benefits taxable pays an effective rate of about 10% on the benefit itself. The IRS worksheet in Publication 915 computes the exact figure, and it can land below the ceiling.",
          "The practical consequence is a hidden marginal rate: each extra dollar of IRA withdrawal or part-time earnings can make another 50 or 85 cents of Social Security taxable at the same time, so a $1,000 IRA withdrawal in the phase-in range can add $1,850 to taxable income. Roth withdrawals do not count toward combined income.",
          "Some states tax benefits too — about eight states tax at least a portion, with their own thresholds and exemptions, and the list changes as states adjust their rules. Check your state's treatment before assuming the federal answer is the whole answer."
        ],
        "table": {
          "head": [
            "Filing status",
            "No tax below",
            "Up to 50% taxable",
            "Up to 85% taxable"
          ],
          "rows": [
            [
              "Single",
              "$25,000",
              "$25,000–$34,000",
              "Above $34,000"
            ],
            [
              "Married filing jointly",
              "$32,000",
              "$32,000–$44,000",
              "Above $44,000"
            ]
          ]
        }
      },
      {
        "heading": "The cost-of-living adjustment",
        "paragraphs": [
          "Benefits rise with inflation through the annual cost-of-living adjustment (COLA). The SSA sets it from the Consumer Price Index for Urban Wage Earners (CPI-W): the average of July, August, and September is compared with the same quarter a year earlier, and the percentage increase — rounded to the nearest tenth — becomes the COLA for the following January. For 2026 the COLA is 2.8%, lifting the average retired worker's benefit by about $56 a month, from about $2,015 to about $2,071.",
          "The COLA can be zero in a year when prices do not rise, but it can never be negative — benefits do not fall when the index falls. The adjustment applies to the benefit itself, so it compounds: a 2.8% rise this year raises the base for every future year. Over a 25-year retirement, even modest COLAs roughly double the nominal benefit.",
          "The COLA is not a raise in real terms — it preserves purchasing power, and imperfectly. The CPI-W tracks the spending of urban wage earners, not retirees, and retirees spend more on healthcare, where prices have risen faster. Medicare Part B premiums, deducted from most benefit checks, also rise most years and can absorb part of the COLA. Plan on the COLA keeping pace with prices, not beating them."
        ]
      },
      {
        "heading": "Social Security and your wider retirement plan",
        "paragraphs": [
          "Social Security replaces roughly 55% of income for a low earner and about 28% for a high earner — it was designed as a foundation, not a complete retirement. The gap between the benefit and the spending you need is what savings must fill: roughly 25 times the annual shortfall, under the 4% rule. A $2,000 monthly benefit against $5,000 of monthly spending leaves a $3,000 gap — $36,000 a year, or about $900,000 of savings.",
          "The claiming decision interacts with the rest of the plan. Delaying to 70 means drawing savings down for eight years, which also shrinks future RMDs. Claiming early preserves savings but locks in a smaller inflation-adjusted income for life. Neither choice is free.",
          "Treat the benefit as longevity insurance, not as an investment to maximize. A larger guaranteed, inflation-adjusted check is worth more to an 85-year-old than a larger portfolio balance was at 65 — it cannot run out, it cannot fall with the market, and it rises with prices. That insurance value is the strongest argument for waiting, and it is the reason the decision deserves more thought than the break-even alone."
        ]
      },
      {
        "heading": "Checking your record and planning your claim",
        "paragraphs": [
          "Your benefit is only as accurate as your earnings record. Create a my Social Security account at ssa.gov and check the record year by year — unreported or mis-credited earnings directly cut the benefit, and errors are far easier to fix with pay stubs or W-2s in hand than decades later. The statement also shows estimated benefits at 62, full retirement age, and 70, assuming you keep earning at your current level.",
          "The estimates overstate the benefit if you stop working early, because they assume your current earnings continue. If you plan to retire at 62 but delay claiming to 70, the estimate at 70 assumes eight more years of earnings you will not have. Use the SSA's calculators with your actual planned earnings for a truer figure.",
          "Apply for benefits about three months before you want them to start. You can apply online, by phone, or in person, and you can change your mind within 12 months of starting — withdrawing the application and repaying benefits received — once in a lifetime. One timing rule applies to everyone: sign up for Medicare at 65 even if you delay Social Security, or you risk late-enrollment penalties and gaps in coverage.",
          "No calculator settles the claiming decision on its own. Run your own numbers with the Social Security Calculator, check them against your statement, and weigh the result against your health, your spouse's benefit, and your other income."
        ]
      }
    ],
    "seoTitle": "How Social Security Benefits Are Calculated: The Formula",
    "slug": "social-security-benefits-explained",
    "sources": [
      {
        "label": "SSA — Retirement Benefits",
        "url": "https://www.ssa.gov/benefits/retirement"
      },
      {
        "label": "SSA — Primary Insurance Amount (bend points)",
        "url": "https://www.ssa.gov/oact/cola/piaformula.html"
      }
    ],
    "title": "How Social Security Benefits Are Calculated: The Formula",
    "type": "What",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": true,
    "description": "Retirement planning, step by step: how much you need, 2026 401(k) and IRA limits, Social Security timing, RMDs, withdrawal order, and a worked example.",
    "faqs": [
      {
        "answer": "It depends on your spending, not your salary. Estimate your annual retirement spending, subtract Social Security and any pension, then multiply the remaining gap by 25. A $39,000 annual gap needs about $975,000 of savings under the 4% rule. Use the Retirement Calculator with your own figures — the multiplier is a planning estimate, not a promise.",
        "question": "How much money do I need to retire?"
      },
      {
        "answer": "The 4% rule is a planning rule of thumb, not a guarantee. It was tested on 30-year retirements with a balanced stock-and-bond portfolio, and it ignores fees and taxes. Longer retirements, high fees, or a market fall early in retirement can all break it. Retirees who stay flexible — spending less after a down year — give the rule far more room to work.",
        "question": "Is the 4% rule still safe?"
      },
      {
        "answer": "Compare your tax rate now with your expected rate in retirement. A traditional IRA suits you if your rate is higher now, because the deduction is worth more today. A Roth suits you if your rate is lower now, because tax-free growth beats a small deduction. Many savers hold both, which lets them choose which pot to draw from once their retirement tax rate is known.",
        "question": "Should I choose a Roth or traditional IRA?"
      },
      {
        "answer": "Claiming at 62 cuts your benefit by 30% for life if your full retirement age is 67; delaying to 70 raises it by 24%. Claiming early fits if you need the income or are in poor health. Delaying fits if you can fund the gap from savings, expect a long retirement, or want a larger survivor benefit for your spouse. There is no single right age.",
        "question": "When should I claim Social Security?"
      },
      {
        "answer": "The IRS charges an excise tax of 25% of the amount you failed to withdraw, reduced to 10% if you correct the shortfall within two years. You report the missed RMD on Form 5329 with your tax return. Roth IRAs have no RMDs during your lifetime, and designated Roth 401(k) accounts have been exempt since 2024.",
        "question": "What happens if I miss a required minimum distribution?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/complete-guide-to-retirement-planning.jpg",
    "imageAlt": "Flat-vector illustration of a nest egg with a growing tree beside a winding road leading toward a rising sun",
    "inlineImage": "/images/complete-guide-to-retirement-planning-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a piggy bank, stacked coins, a wall calendar, and a pie chart of savings buckets",
    "intro": "Retirement planning means turning a salary into income that lasts after work ends. Start with the income you will need, subtract Social Security and any pension, then save enough to cover the gap — roughly 25 times the annual shortfall. This guide covers the amount to save, the accounts to use, Social Security timing, and withdrawals.",
    "published": "2026-09-21",
    "readMinutes": 18,
    "relatedTools": [
      {
        "name": "Retirement Calculator",
        "url": "/personal-wealth/retirement-calculator"
      },
      {
        "name": "IRA Calculator",
        "url": "/personal-wealth/ira-calculator"
      },
      {
        "name": "Roth IRA Calculator",
        "url": "/personal-wealth/roth-ira-calculator"
      },
      {
        "name": "Social Security Calculator",
        "url": "/personal-wealth/social-security-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Costs that usually fall: retirement contributions, payroll taxes, commuting, work clothes, and mortgage payments if the loan is paid off.",
          "Costs that usually rise: health insurance and out-of-pocket medical costs, travel and leisure in the early years, and later, home help and care.",
          "Costs that stay put: housing costs other than the mortgage, food, utilities, insurance, and property taxes."
        ],
        "heading": "How much you need: replacement income and your retirement number",
        "paragraphs": [
          "Retirement planning starts with a spending target, not a savings target. The standard shortcut is the replacement ratio: most people need 70 to 80 percent of their pre-retirement income to maintain their standard of living. Someone earning $90,000 might plan on $63,000 to $72,000 a year. The ratio works because several costs fall away in retirement: you stop saving for retirement, payroll taxes end, and many people retire with the mortgage paid off.",
          "Treat the ratio as a starting point, not a verdict. It overstates what some people need and understates what others need. A household that plans to travel heavily, support adult children, or pay for private health insurance before Medicare starts at 65 can spend more in retirement than while working. The reliable check is a bottom-up budget: list what you actually spend now, remove what ends, and add what begins.",
          "Once you have an annual spending figure, subtract the income retirement already provides — mainly Social Security and any pension. What remains is the gap your savings must fill. Multiply that gap by 25 and you have a first-pass retirement number, the savings target this guide builds toward. The next section explains where that multiplier comes from, and the worked example later runs the full calculation for one saver.",
          "Pensions and part-time work count the same way Social Security does: subtract any reliable income from your spending target before multiplying by 25. A $12,000-a-year pension cuts the savings target by $300,000. Part-time work in the first years of retirement has the same effect, and it lets savings grow untouched for longer. Count only income you can rely on — but for many households it is the difference between a target that looks impossible and one within reach."
        ]
      },
      {
        "bullets": [
          "The 4% rule assumes a 30-year retirement and a balanced stock-and-bond portfolio.",
          "It ignores fees and taxes, which reduce what you can actually spend.",
          "Early-retirement losses hurt most: sequence risk is the rule's biggest weakness.",
          "Flexibility — spending less after a down year — matters more than the exact percentage."
        ],
        "heading": "The 4% rule — and its limits",
        "paragraphs": [
          "The 4% rule is the most widely used answer to the question of how much savings is enough. It comes from a 1994 study by financial planner William Bengen, who tested withdrawal rates against US market history and found that withdrawing 4% of a portfolio in the first year of retirement, then adjusting that amount for inflation each year, survived every 30-year period in the data. The portfolio in the study was roughly half stocks and half bonds. A $1,000,000 portfolio supports $40,000 of first-year income under the rule; a $39,000 annual gap needs $975,000 of savings, which is where the multiply-by-25 shortcut comes from.",
          "The rule is a planning estimate, not a guarantee. It was tested on 30-year retirements, so someone retiring at 60 who lives to 95 needs a plan that lasts 35 years, not 30. It assumes a specific mix of stocks and bonds and ignores investment fees and taxes, both of which come out of the same pot. And it says nothing about the order of returns: a market fall in the first few years of retirement does far more damage than the same fall a decade later, because withdrawals during a downturn lock in losses. This is sequence-of-returns risk, and it is the main reason a fixed withdrawal rate can fail even when average returns look fine.",
          "Use the rule to size the target, then plan to be flexible. Retirees who trim spending after a bad market year give the rule far more room to work, and a lower starting rate, such as 3.5%, buys extra safety for longer retirements. Run your own numbers with the Retirement Calculator, and revisit the plan every year or two."
        ]
      },
      {
        "heading": "A worked example: one retirement number, step by step",
        "paragraphs": [
          "Maya is 45, earns $90,000 a year, and plans to retire at 67. She has $150,000 saved so far and wants to know whether she is on track. Her target income is 70% of her salary, or $63,000 a year. Her Social Security statement estimates a benefit of $2,000 a month at 67, or $24,000 a year. The gap her savings must fill is $39,000 a year, so her retirement number is 25 times that gap: $975,000.",
          "The projection below assumes her investments earn 4% a year after inflation — a planning assumption, not a promise — and all figures are in today's dollars, so the $63,000 target keeps its current purchasing power. At her current pace of $1,000 a month, her existing $150,000 grows to about $355,000 by 67, and her contributions add about $411,000, for a total of about $766,000. That is roughly $209,000 short of her $975,000 target.",
          "Closing the gap takes about $1,510 a month, or roughly $18,100 a year — an extra $510 a month over what she saves now. Three levers move the answer: saving more, retiring later, or spending less. Retiring at 69 instead of 67 adds two years of contributions and growth and cuts two years of withdrawals. Spending $3,000 a year less in retirement cuts the target by $75,000. The point of the exercise is not precision — no 22-year projection is precise — but to show which lever is doing the work, and how large the change needs to be. These are estimates for planning, not financial advice.",
          "The answer is sensitive to the return assumption, which is why the 4% figure deserves a stress test. At 3% real growth instead of 4%, the same $1,000 a month reaches only about $654,000 by 67. Retiring two years earlier, at 65, cuts the total to about $686,000 at the original 4% assumption, because two years of contributions and growth disappear. A plan that only works at one return assumption is fragile; test yours at a lower return and a longer life, and check that the levers still close the gap."
        ],
        "table": {
          "head": [
            "Step",
            "Figure"
          ],
          "rows": [
            [
              "Target retirement income (70% of $90,000)",
              "$63,000 a year"
            ],
            [
              "Less Social Security at 67 ($2,000 a month)",
              "$24,000 a year"
            ],
            [
              "Annual gap savings must fill",
              "$39,000 a year"
            ],
            [
              "Retirement number (gap x 25)",
              "$975,000"
            ],
            [
              "Projected savings at 67, saving $1,000 a month",
              "About $766,000"
            ],
            [
              "Shortfall",
              "About $209,000"
            ],
            [
              "Monthly saving needed to close the gap",
              "About $1,510"
            ]
          ]
        }
      },
      {
        "heading": "401(k)s and workplace plans",
        "paragraphs": [
          "For most workers, the 401(k) is the main retirement account, and the employer match is the first priority. A typical match might add 50 cents for every dollar you contribute up to 6% of pay — an immediate 50% return on those dollars before any investment growth. Contribute at least enough to capture the full match; turning it down is leaving part of your pay on the table. Contributions come out of your paycheck before tax, which lowers your taxable income in the year you contribute, and the money grows tax-deferred until withdrawal.",
          "For 2026, you can defer up to $24,500 of your salary into a 401(k). Your employer can add matching and profit-sharing contributions on top, up to a combined limit of $72,000 for the year. Many plans also offer a Roth 401(k) option: after-tax contributions, tax-free qualified withdrawals. The $24,500 limit covers traditional and Roth contributions combined, so splitting between them does not raise the cap.",
          "Withdrawals before age 59½ generally trigger income tax plus a 10% early-withdrawal penalty, with exceptions for hardship, disability, and a few other cases. One exception matters for early retirees: the rule of 55 lets you withdraw from your most recent employer's 401(k) penalty-free if you leave that job at 55 or older. When you change jobs, rolling the old 401(k) into an IRA or your new employer's plan keeps the money tax-deferred; cashing it out triggers tax and usually the penalty. Check your plan's vesting schedule too — employer matching contributions may take several years to become fully yours.",
          "One 2026 change affects higher earners. Under SECURE 2.0, workers age 50 or older who earned more than $145,000 in FICA wages from their employer in the prior year must make catch-up contributions as Roth contributions — after tax, with tax-free withdrawals later. The threshold is indexed for inflation. If your plan has no Roth option, you may be unable to make catch-up contributions at all until it adds one, so check with your plan administrator before the year starts."
        ],
        "table": {
          "head": [
            "2026 limit",
            "Amount"
          ],
          "rows": [
            [
              "Employee elective deferral (under 50)",
              "$24,500"
            ],
            [
              "Catch-up contribution (age 50+)",
              "$8,000"
            ],
            [
              "Higher catch-up (ages 60-63)",
              "$11,250"
            ],
            [
              "Combined employee + employer limit",
              "$72,000"
            ],
            [
              "Combined limit including catch-up (age 50+)",
              "$80,000"
            ]
          ]
        }
      },
      {
        "heading": "IRAs: traditional vs Roth",
        "paragraphs": [
          "An individual retirement account (IRA) is the account you open yourself, outside work. For 2026 you can contribute up to $7,500 across all your traditional and Roth IRAs combined, or $8,600 if you are 50 or older. You need earned income to contribute, and your contribution cannot exceed what you earned — though a spouse with no income can contribute to a spousal IRA based on the working spouse's earnings, up to the same limit.",
          "A traditional IRA gives you a tax break now: contributions may be tax-deductible, the money grows tax-deferred, and withdrawals in retirement are taxed as ordinary income. The deduction is limited if you or your spouse is covered by a workplace plan — for 2026 it phases out between $81,000 and $91,000 of modified adjusted gross income for single filers, and between $129,000 and $149,000 for married couples filing jointly. Below those ranges the full contribution is deductible; above them, none of it is.",
          "A Roth IRA works the other way around: contributions go in after tax, with no deduction, but qualified withdrawals in retirement are entirely tax-free, including all the growth. To be qualified, withdrawals generally must come after age 59½ and at least five years after your first Roth contribution. Direct Roth contributions are also limited by income — high earners phase out — but there is no income limit on converting a traditional IRA to a Roth, which is why some high earners use the backdoor route of contributing to a traditional IRA and converting it.",
          "The choice comes down to your tax rate now versus your tax rate in retirement. If you expect to be in a lower bracket later, the traditional IRA's deduction now is worth more. If you expect a higher bracket later — common for younger workers whose earnings will rise — the Roth's tax-free growth usually wins. Many savers hold both, which leaves the choice open until retirement, when the tax answer is known."
        ],
        "table": {
          "head": [
            "",
            "Traditional IRA",
            "Roth IRA"
          ],
          "rows": [
            [
              "Tax on contributions",
              "May be deductible",
              "No deduction"
            ],
            [
              "Tax on withdrawals",
              "Taxed as income",
              "Tax-free if qualified"
            ],
            [
              "2026 contribution limit",
              "$7,500 ($8,600 at 50+)",
              "$7,500 ($8,600 at 50+)"
            ],
            [
              "Required withdrawals",
              "Yes, from RMD age",
              "None during your lifetime"
            ],
            [
              "Best when",
              "Your tax rate is higher now",
              "Your tax rate is lower now"
            ]
          ]
        }
      },
      {
        "heading": "Social Security: when to claim",
        "paragraphs": [
          "Social Security is the foundation of most retirement income, and the claiming decision is one of the largest financial choices in retirement. Your benefit is based on your 35 highest-earning years, adjusted for wage growth. The Social Security Administration converts that average into a primary insurance amount using bend points — for 2026, you get 90% of the first $1,286 of average monthly earnings, 32% of earnings up to $7,749, and 15% above that. The formula replaces a larger share of income for lower earners. You need 40 credits to qualify, earned at a maximum of four a year; one credit costs $1,890 of earnings in 2026.",
          "You can claim as early as 62, but the reduction is permanent. Full retirement age is 67 for anyone born in 1960 or later. Claiming at 62 cuts the benefit by 30%. Delaying past full retirement age earns delayed retirement credits of 8% a year up to age 70 — a guaranteed, inflation-adjusted increase no investment can match. The table shows what that means for a $2,000 monthly benefit at full retirement age.",
          "There is no single right claiming age. Claiming early makes sense if you need the income, are in poor health, or expect a shorter retirement. Delaying pays if you can fund the gap years from savings, expect a long retirement, or want to maximize the survivor benefit for a spouse. A married spouse can also claim a spousal benefit of up to 50% of the worker's full retirement age benefit. One timing rule applies to everyone: sign up for Medicare at 65 even if you delay Social Security, or you risk late-enrollment penalties and gaps in coverage.",
          "Check your own numbers before deciding. Your my Social Security statement at ssa.gov shows your earnings record and estimated benefits at 62, full retirement age, and 70. The estimates assume you keep earning at your current level, so they overstate the benefit if you stop working early. If you claim before full retirement age while still working, an earnings test can temporarily withhold part of your benefit, though withheld amounts are credited back once you reach full retirement age."
        ],
        "table": {
          "head": [
            "Claiming age",
            "Share of full benefit",
            "Monthly benefit on a $2,000 base"
          ],
          "rows": [
            [
              "62 (earliest)",
              "70%",
              "$1,400"
            ],
            [
              "67 (full retirement age)",
              "100%",
              "$2,000"
            ],
            [
              "70 (latest useful age)",
              "124%",
              "$2,480"
            ]
          ]
        }
      },
      {
        "heading": "Catch-up contributions after 50",
        "paragraphs": [
          "The tax code gives older savers extra room, and the amounts are large enough to change the outcome. From the year you turn 50, you can contribute an extra $8,000 a year to a 401(k) on top of the $24,500 standard limit, for a total of $32,500 in 2026. The IRA catch-up is $1,100, taking the limit from $7,500 to $8,600. A health savings account adds another $1,000 from age 55. These are per-person limits, so a couple over 50 can shelter far more than either could alone.",
          "Since 2025, savers aged 60 to 63 get a still higher 401(k) catch-up: $11,250 in 2026 instead of $8,000, taking the employee total to $35,750. The window is narrow — it applies only in those four years — so it pays to know it is coming and to plan for it. The combined employee-plus-employer limit rises with it, to $83,250 for savers in that age band.",
          "Catch-ups matter because the final working years are often the highest-earning ones, and the costs that squeezed saving earlier have usually eased. An extra $8,000 a year for 15 years is $120,000 of contributions before any investment growth. If you are behind, the catch-up years are the cheapest way to close the gap."
        ],
        "table": {
          "head": [
            "Account",
            "Standard limit, 2026",
            "Catch-up",
            "Total at 50+"
          ],
          "rows": [
            [
              "401(k)",
              "$24,500",
              "$8,000",
              "$32,500"
            ],
            [
              "401(k), ages 60-63",
              "$24,500",
              "$11,250",
              "$35,750"
            ],
            [
              "IRA (traditional or Roth)",
              "$7,500",
              "$1,100",
              "$8,600"
            ],
            [
              "HSA, self-only (age 55+)",
              "$4,400",
              "$1,000",
              "$5,400"
            ],
            [
              "HSA, family (age 55+)",
              "$8,750",
              "$1,000",
              "$9,750"
            ]
          ]
        }
      },
      {
        "heading": "Required minimum distributions",
        "paragraphs": [
          "Tax-deferred accounts come with a deadline. Required minimum distributions (RMDs) force withdrawals from traditional IRAs, 401(k)s, and similar pre-tax accounts once you reach a set age, so the tax the government deferred is eventually collected. Under SECURE 2.0, RMDs begin at 73 if you were born between 1951 and 1959, and at 75 if you were born in 1960 or later. Your first RMD is due by April 1 of the year after you reach that age, but delaying it means taking two RMDs in one tax year, which usually pushes income — and the tax bill — higher. Every later RMD is due by December 31.",
          "Each year's RMD is your account balance on December 31 of the prior year divided by a life-expectancy factor from the IRS Uniform Lifetime Table. At 73 the factor is 26.5, so a $1,000,000 balance produces a first RMD of about $37,736 — roughly 3.8% of the balance. The factor shrinks as you age, so the required percentage rises each year. Your custodian usually calculates the amount, but you are responsible for taking it.",
          "Missing an RMD is expensive: the excise tax is 25% of the amount you failed to withdraw, reduced to 10% if you correct the shortfall within two years. Roth IRAs have no RMDs during the owner's lifetime, and since 2024 designated Roth accounts in 401(k) plans are exempt too — one more reason Roth balances are valuable late in retirement. If you are charitably inclined, a qualified charitable distribution lets you send RMD money directly to a charity, where it counts toward the RMD without adding to your taxable income."
        ]
      },
      {
        "bullets": [
          "Taxable accounts first: spend money that is already taxed before touching sheltered accounts.",
          "Tax-deferred accounts next: draw these down before RMDs force the issue.",
          "Roth accounts last: preserve tax-free growth and the absence of RMDs as long as possible.",
          "Use low-income years for Roth conversions, and keep a cash buffer against market falls."
        ],
        "heading": "Withdrawing in retirement: order and taxes",
        "paragraphs": [
          "The order you draw from your accounts changes how much tax you pay over a retirement. The standard sequence is taxable accounts first, then tax-deferred accounts, then Roth accounts last. Spending taxable money first lets your tax-advantaged accounts keep compounding. Drawing tax-deferred accounts next keeps RMDs manageable later. Roth money goes last because it grows tax-free, has no RMDs, and passes to heirs tax-free. This is a starting framework, not a rule — your tax bracket in a given year may justify drawing from a different pot.",
          "The years between retiring and starting RMDs are a planning window. Income is often at its lowest then, which can make it a good time for partial Roth conversions: moving money from a traditional IRA to a Roth and paying tax at a low rate now, so the money grows tax-free and never faces an RMD. Conversions also shrink future RMDs, which can keep you in a lower bracket and limit the income-related surcharge on Medicare premiums.",
          "Taxes do not stop at retirement. Withdrawals from pre-tax accounts are taxed as ordinary income, and up to 85% of your Social Security benefits can be taxable depending on your other income. RMDs, pensions, and part-time earnings all count toward that calculation, so a large RMD can make more of your Social Security taxable at the same time. Keep one to two years of spending in cash or short-term savings so a market fall does not force you to sell investments at a loss — the same sequence risk that threatens the 4% rule applies every year you withdraw.",
          "The deeper goal is tax diversification: holding money in all three buckets — taxable, tax-deferred, and Roth — so you can choose each year which pot to draw from. In a low-income year you might draw from a traditional IRA up to the top of a low bracket; in a high-income year, Roth withdrawals add nothing to taxable income. Building that flexibility takes years, which is why the Roth-versus-traditional decision in your working years matters as much as the withdrawal order in retirement."
        ]
      },
      {
        "bullets": [
          "Medicare starts at 65; Part B costs $202.90 a month in 2026 plus a $283 deductible.",
          "Original Medicare has no out-of-pocket cap, and dental, vision, hearing, and long-term care are largely uncovered.",
          "An HSA is the only triple-tax-advantaged account: deductible in, tax-free growth, tax-free out for medical costs."
        ],
        "heading": "Healthcare costs in retirement",
        "paragraphs": [
          "Healthcare is the largest variable cost in most retirement budgets, and it is the one most often underestimated. Medicare begins at 65 and covers most hospital and medical care, but it is not free and it is not complete. Part A covers hospital stays and is premium-free for most people with 40 quarters of work history. Part B covers doctors and outpatient care: the standard premium is $202.90 a month in 2026, with a $283 annual deductible, and after the deductible you generally pay 20% of the approved amount. Part D covers prescription drugs through a separate plan, and Part C (Medicare Advantage) bundles the parts through a private insurer.",
          "The gaps are what catch people out. Original Medicare has no annual out-of-pocket cap, so the 20% coinsurance on Part B has no ceiling. Dental, vision, and hearing care are largely uncovered. Long-term care — help with daily living in a nursing home or at home — is not covered by Medicare at all beyond short rehabilitative stays. A Medigap policy can cap the out-of-pocket exposure, and long-term care insurance exists for the care risk, but both cost more the longer you wait.",
          "A health savings account is the best tool for funding this gap while you are still working. If you have a qualifying high-deductible health plan, you can contribute $4,400 for self-only coverage or $8,750 for family coverage in 2026, plus $1,000 from age 55. Contributions are tax-deductible, growth is tax-free, and withdrawals for medical expenses are tax-free — the only triple-tax-advantaged account in the code. The money rolls over year to year, and in retirement it can pay Medicare premiums and other medical costs tax-free. Enroll in Medicare on time: the Part B late-enrollment penalty adds 10% to the premium for each full 12-month period you went without coverage, and it lasts for life.",
          "The gap before 65 needs its own plan. Medicare does not start until 65, so retiring earlier means finding coverage for the years in between — COBRA continuation from your employer for up to 18 months, or a marketplace plan under the Affordable Care Act, where subsidies depend on income. Budget for those premiums separately; they are often the largest single cost of early retirement, and they sit outside the Medicare figures above."
        ]
      }
    ],
    "seoTitle": "The Complete Guide to Retirement Planning for 2026",
    "slug": "complete-guide-to-retirement-planning",
    "sources": [
      {
        "label": "IRS: 401(k) and profit-sharing plan contribution limits",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits"
      },
      {
        "label": "IRS: IRA contribution limits",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits"
      },
      {
        "label": "IRS: Required minimum distributions FAQs",
        "url": "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs"
      },
      {
        "label": "Social Security Administration: Contribution and benefit base",
        "url": "https://www.ssa.gov/oact/cola/cbb.html"
      }
    ],
    "title": "The Complete Guide to Retirement Planning",
    "type": "What",
    "updated": "2026-09-21"
  },
  {
    "cornerstone": false,
    "description": "A 401(k) is your workplace retirement account: paycheck contributions, an employer match, and 2026 limits up to $24,500. How it works, with real numbers.",
    "faqs": [
      {
        "answer": "At minimum, contribute enough to capture the full employer match, because that is an immediate return no investment can match. Beyond that, a common target is 15% of gross pay including the employer match. If 15% is out of reach, start with the match, then raise your rate by one percentage point each time your pay rises until you reach it.",
        "question": "How much should I contribute to my 401(k)?"
      },
      {
        "answer": "The money stays yours, but you must choose what to do with it. You can leave it in the old plan, roll it into your new employer's plan, or roll it into an IRA. A direct rollover moves the money trustee to trustee with no tax withheld. Cashing out is the expensive option: income tax plus a 10% penalty if you are under 59½.",
        "question": "What happens to my 401(k) if I leave my job?"
      },
      {
        "answer": "Yes, but it is expensive. Withdrawals before age 59½ are generally taxed as income plus a 10% additional tax, unless an exception applies. Exceptions include leaving your job in or after the year you turn 55, disability, and certain medical expenses. Many plans also allow loans from your balance, which avoid the tax and penalty but take the money out of the market while borrowed.",
        "question": "Can I withdraw from my 401(k) before age 59½?"
      },
      {
        "answer": "It depends on your tax rate now versus in retirement. A traditional 401(k) gives you a tax break today and taxes withdrawals later, which suits people who expect a lower rate in retirement. A Roth 401(k) is funded with after-tax money and qualified withdrawals are tax-free, which suits people who expect a higher rate later. Many savers split contributions between the two.",
        "question": "Is a Roth 401(k) better than a traditional 401(k)?"
      },
      {
        "answer": "For 2026, you can contribute up to $24,500 of your own money across all 401(k), 403(b), and most 457 plans combined. Workers aged 50 and over can add an $8,000 catch-up, for $32,500. Workers who turn 60, 61, 62, or 63 during the year get a higher $11,250 catch-up instead, for $35,750. The overall limit including employer contributions is $72,000.",
        "question": "What is the 401(k) contribution limit for 2026?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/how-does-a-401k-work.jpg",
    "imageAlt": "Flat vector illustration of a golden nest egg in a nest beside a large emerald growth arrow, with coins and a small potted plant on a cream background",
    "inlineImage": "/images/how-does-a-401k-work-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of gold coins stacking into a rising staircase with a small sprout on the tallest stack, on a cream background",
    "intro": "A 401(k) is a retirement account your employer offers that lets you save straight from your paycheck before you can spend it. Your contributions come out automatically, your employer often adds matching money, and the balance grows tax-deferred until you withdraw it in retirement. This guide explains how each part works, with the 2026 limits and real numbers.",
    "published": "2026-09-25",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "401k vs Solo 401k",
        "url": "/personal-wealth/401k-vs-solo-401k-calculator"
      },
      {
        "name": "Retirement Calculator",
        "url": "/personal-wealth/retirement-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What a 401(k) is",
        "paragraphs": [
          "A 401(k) is an employer-sponsored retirement savings plan, named after section 401(k) of the Internal Revenue Code. It is the main way most American workers save for retirement: you choose a percentage of each paycheck to contribute, your employer deducts it before the money reaches your bank account, and the balance is invested in funds you select from the plan's menu. Because the money never passes through your hands, saving happens whether or not you think about it that month.",
          "The account's value comes from three sources: your contributions, your employer's contributions, and investment growth. Your contributions are the part you control directly. Employer contributions, usually a match, are extra money tied to how much you put in. Investment growth is the return on the funds you choose, and over decades it typically becomes the largest share of the balance.",
          "Two features set a 401(k) apart from an ordinary savings or brokerage account. First, the tax treatment: money goes in pre-tax in a traditional 401(k), grows without annual tax on dividends or gains, and is taxed only when withdrawn. Second, the limits: the IRS caps how much you can contribute each year, and the account carries rules about when you can take money out. Those rules are the price of the tax break, and understanding them is the difference between using the account well and paying penalties you did not expect.",
          "A 401(k) is a defined-contribution plan, which means the outcome depends on what goes in and how it grows, not on a promised payout. That is the opposite of a traditional pension, a defined-benefit plan, where the employer promises a set monthly income and bears the investment risk. In a 401(k), you bear the investment risk, but you also control the contributions and the investment choices, and the balance is yours to keep and pass on. The shift from pensions to 401(k)s over the past forty years is why understanding this account matters: for most workers, it is the retirement plan."
        ]
      },
      {
        "heading": "How money gets in: payroll deductions and tax treatment",
        "paragraphs": [
          "You fund a 401(k) by choosing a contribution rate, usually a percentage of your gross pay, through your employer's benefits system. A 6% election on a $5,000 monthly paycheck sends $300 into the account each pay period before you see it. You can change the rate at any time in most plans, and many employers let you set it in dollars rather than a percentage. Some plans enroll new employees automatically, typically at a low rate such as 3%, and raise it by a percentage point each year unless the employee opts out.",
          "In a traditional 401(k), contributions are pre-tax: they reduce your taxable income in the year you make them. Contribute $10,000 in a year when you are in the 22% federal income tax bracket and your federal income tax bill falls by $2,200 ($10,000 x 22%). You still pay Social Security and Medicare taxes on the full amount; the 401(k) deduction applies to income tax only. The tax is deferred, not eliminated: withdrawals in retirement are taxed as ordinary income.",
          "The money grows tax-deferred inside the account. Dividends, interest, and capital gains are not taxed in the year they occur, so the full balance keeps compounding. In an ordinary brokerage account, by contrast, you pay tax on dividends and realized gains each year, which slows growth. The difference is small in any single year and large over a career: deferring tax on growth is one of the account's main advantages, alongside the employer match.",
          "Not every employer offers a 401(k), and eligibility rules vary. Many plans require a waiting period, commonly 30 to 90 days, before a new hire can enroll, and some require a minimum number of hours worked. If your employer does not offer a plan, an IRA is the nearest alternative, covered in the comparison at the end of this guide."
        ]
      },
      {
        "heading": "Traditional vs Roth 401(k)",
        "paragraphs": [
          "Many employers now offer two versions of the same account. A traditional 401(k) takes pre-tax money and taxes withdrawals. A Roth 401(k) takes after-tax money and makes qualified withdrawals tax-free. The contribution limit is shared: the $24,500 limit for 2026 covers your traditional and Roth contributions combined, not $24,500 in each.",
          "The choice is a bet on your tax rate. If your tax rate in retirement will be lower than it is today, the traditional version usually wins, because the deduction is worth more now than the tax will cost later. If your rate will be higher in retirement, or you are early in your career and earning less than you expect to later, the Roth usually wins, because you pay tax at today's lower rate and withdraw tax-free. Nobody knows future tax rates, so many savers split contributions between the two.",
          "Two details matter. First, employer matching contributions always go into the traditional, pre-tax side of the account, even if all your own contributions are Roth. Second, a Roth withdrawal is qualified, and therefore tax-free, only if the account is at least five years old and you are 59½ or older, disabled, or deceased. A withdrawal that is not qualified can be taxed and penalized on the earnings portion."
        ],
        "table": {
          "head": [
            "Feature",
            "Traditional 401(k)",
            "Roth 401(k)"
          ],
          "rows": [
            [
              "Contributions",
              "Pre-tax; lowers taxable income now",
              "After-tax; no deduction now"
            ],
            [
              "Withdrawals in retirement",
              "Taxed as ordinary income",
              "Tax-free if qualified"
            ],
            [
              "Required minimum distributions",
              "Begin at age 73",
              "None during your lifetime"
            ],
            [
              "Usually suits",
              "Higher earners expecting a lower rate later",
              "Younger or lower earners expecting a higher rate later"
            ]
          ]
        }
      },
      {
        "bullets": [
          "50% of the first 6% of pay: worth $2,400 a year on an $80,000 salary when you contribute the full 6%.",
          "Dollar for dollar up to 3% of pay: worth $2,400 a year on the same salary ($80,000 x 3%).",
          "100% of the first 3% plus 50% of the next 2%: worth $3,200 a year on an $80,000 salary at a 5% contribution.",
          "A nonelective contribution, a fixed percentage of pay your employer adds whether or not you contribute, is separate from the match."
        ],
        "heading": "The employer match: the part you should never skip",
        "paragraphs": [
          "The employer match is the most valuable feature of a 401(k), and the easiest to leave on the table. A match is money your employer adds to your account based on how much you contribute. It is part of your compensation, not a bonus: the employer has budgeted it, and you only receive it by contributing.",
          "Take a common formula: 50% of the first 6% of pay. On an $80,000 salary, contributing 6% means $4,800 a year from you ($80,000 x 6%), and the employer adds $2,400 (50% x $4,800), for a total of $7,200 a year into the account. That is an immediate 50% return on your $4,800 before any investment growth. Contribute only 3% and the match falls to $1,200, leaving $1,200 a year unclaimed.",
          "Match formulas vary by employer, and the details are in your plan's summary plan description, which your employer must provide. Whatever the formula, the rule is the same: contribute at least enough to capture the full match before saving anywhere else. No investment reliably returns 50% or 100% in a year; the match does, the moment it lands."
        ]
      },
      {
        "heading": "2026 contribution limits",
        "paragraphs": [
          "For 2026, the IRS caps your own elective deferrals at $24,500 across all 401(k), 403(b), and most 457 plans you participate in. If you have two jobs with two plans, the $24,500 covers both combined. The limit rises with inflation in $500 steps, and the IRS announces the new figure each autumn.",
          "Workers aged 50 and over can add a catch-up contribution of $8,000 in 2026, bringing their personal limit to $32,500. Under SECURE 2.0, workers who turn 60, 61, 62, or 63 during the year get a higher catch-up of $11,250 instead, for a personal limit of $35,750. The higher catch-up is a narrow window: it applies only in those four years, then the standard $8,000 catch-up resumes at 64.",
          "A separate overall limit caps everything going into the account in a year: your contributions, your employer's match and nonelective contributions, and any after-tax contributions. For 2026 that limit is $72,000, or $80,000 including the standard catch-up, or $83,250 for those aged 60 to 63. Most savers never approach it, but high earners with generous matches should know it exists."
        ],
        "table": {
          "head": [
            "Limit for 2026",
            "Amount"
          ],
          "rows": [
            [
              "Employee elective deferrals (under 50)",
              "$24,500"
            ],
            [
              "Employee limit at age 50+ (with $8,000 catch-up)",
              "$32,500"
            ],
            [
              "Employee limit at ages 60-63 (with $11,250 catch-up)",
              "$35,750"
            ],
            [
              "Overall limit, employee plus employer",
              "$72,000"
            ],
            [
              "Overall limit including standard catch-up",
              "$80,000"
            ],
            [
              "Overall limit including ages 60-63 catch-up",
              "$83,250"
            ]
          ]
        }
      },
      {
        "heading": "What your money is invested in",
        "paragraphs": [
          "Contributing is only half the job. The money sits in investments you choose from the plan's menu, typically 10 to 30 funds. Common options include stock index funds, bond funds, money market funds, and target-date funds. If you never choose, most plans place you in a default investment, usually a target-date fund matched to your expected retirement year.",
          "A target-date fund is the simplest choice for most savers. It holds a mix of stocks and bonds and shifts gradually toward bonds as the target year approaches. A 2045 fund for someone retiring around 2045 might hold mostly stocks today and mostly bonds by 2045. You pick one fund and the mix is managed for you.",
          "Fees matter more than most savers realize. A fund's expense ratio is the annual percentage it charges, and the difference between a 0.05% index fund and a 0.75% actively managed fund compounds over decades. On a $100,000 balance, that gap costs $700 a year. Check the expense ratios on your plan's menu; low-cost index funds are usually available, and they are the usual default choice for long-term retirement saving.",
          "Time does most of the work. Contributing $500 a month at an assumed steady 7% annual return grows to about $260,463 after 20 years and $609,985 after 30 years, on contributions of $120,000 and $180,000 respectively. The 7% figure is an assumption used to show the math; real returns vary and are never guaranteed. The point is compounding: the last ten years add more than the first twenty, because growth earns growth of its own."
        ]
      },
      {
        "heading": "Vesting: when the employer match becomes yours",
        "paragraphs": [
          "Your own contributions are always 100% yours, from the first paycheck. Employer contributions are different: they vest, meaning they become yours to keep, on a schedule set by the plan. If you leave before you are fully vested, you forfeit the unvested part of the employer match.",
          "Vesting schedules come in two common shapes. Cliff vesting gives you nothing until a set date, then 100% at once, often after three years. Graded vesting releases the match in stages, such as 20% a year over five years. Some plans vest immediately. Your plan's summary plan description states the schedule, and it is worth reading before you time a job change.",
          "Here is what the difference costs. Suppose you leave after two years under a five-year graded schedule at 20% a year. You keep 40% of the employer contributions and forfeit 60%. On $10,000 of employer match, that is $6,000 left behind. The same departure under immediate vesting keeps the full $10,000. Vesting never affects your own contributions or their growth; that money is yours regardless."
        ]
      },
      {
        "heading": "Changing jobs: what happens to your 401(k)",
        "paragraphs": [
          "Your 401(k) does not disappear when you leave a job, but it does need a decision. You have four options: leave the money in the old plan, roll it into your new employer's plan, roll it into an IRA, or cash it out. The first three keep the tax-deferred status; the fourth usually costs a large share of the balance.",
          "Leaving the money in the old plan is the simplest option, and many plans allow it, though some require small balances to be moved out. Rolling it into your new employer's plan keeps everything in one place. Rolling it into an IRA gives you the widest investment choice. In all three cases, use a direct rollover: the money moves trustee to trustee, with no tax withheld and no deadline to meet.",
          "The expensive mistake is taking the money yourself. A distribution paid directly to you from a retirement plan is subject to mandatory 20% federal withholding, even if you intend to roll it over. You then have 60 days to deposit the full amount, including the 20% that was withheld, into another retirement account. Miss the deadline and the whole amount counts as a taxable withdrawal, plus the 10% penalty if you are under 59½.",
          "Cashing out outright is the worst of the four options for most people. A $10,000 balance cashed out at age 40 in the 22% bracket costs $2,200 in income tax plus a $1,000 penalty, leaving $6,800. The larger cost is invisible: that $10,000, left invested at an assumed steady 7%, would be worth about $54,274 after 25 years. Cashing out trades decades of growth for a fraction of the balance today."
        ]
      },
      {
        "heading": "Taking money out: withdrawals, loans, and required distributions",
        "paragraphs": [
          "You can withdraw from a 401(k) penalty-free from age 59½. Withdrawals before that age generally cost income tax plus a 10% additional tax, unless an exception applies. On a $10,000 early withdrawal in the 22% bracket, that is $2,200 of income tax plus a $1,000 penalty, leaving $6,800 before any state tax.",
          "Exceptions to the 10% penalty include separation from service in or after the year you turn 55, known as the rule of 55, as well as disability and certain medical expenses. The income tax still applies; only the penalty is waived. Hardship withdrawals for an immediate and heavy financial need, such as preventing eviction, are allowed by many plans but still carry the tax and usually the penalty.",
          "Many plans allow loans from your own balance, repaid with interest to your own account through payroll deductions. A loan avoids the tax and penalty of a withdrawal, but the money is out of the market while borrowed, and an unpaid loan after leaving the job is generally treated as a distribution, taxed and penalized. Treat a loan as a last resort, not a convenience.",
          "At the other end, the IRS requires withdrawals. Required minimum distributions generally begin at age 73, calculated from your balance and life expectancy. If you are still working for the employer sponsoring the plan, you can delay RMDs from that plan until you retire, unless you own 5% or more of the business. Designated Roth accounts have no required distributions during your lifetime."
        ]
      },
      {
        "heading": "401(k) vs IRA: how they compare",
        "paragraphs": [
          "An IRA is the individual counterpart to a 401(k): you open it yourself at a bank or brokerage, with no employer involved. The 2026 IRA limit is $7,500, with a $1,100 catch-up at age 50 and over, far below the 401(k)'s $24,500. The IRA's advantage is choice: thousands of funds instead of a menu of dozens, and often lower fees.",
          "The usual order is to contribute enough to the 401(k) to capture the full employer match, then fund an IRA up to its limit, then return to the 401(k) for anything beyond that. The match is the reason the 401(k) comes first; the IRA's wider choice is the reason it comes second. If your employer offers no plan at all, the IRA is the starting point, and a self-employed worker may have a Solo 401(k) instead, which combines both.",
          "Neither account is the whole plan. A 401(k) or IRA holds the investments; your contribution rate, your investment choice, and your time in the market decide what the balance becomes. The account is the container. What you put in it, and how long you leave it alone, is what matters."
        ],
        "table": {
          "head": [
            "Feature",
            "401(k)",
            "IRA"
          ],
          "rows": [
            [
              "Who offers it",
              "Your employer",
              "You open it yourself"
            ],
            [
              "2026 contribution limit",
              "$24,500",
              "$7,500"
            ],
            [
              "Catch-up at age 50+",
              "$8,000",
              "$1,100"
            ],
            [
              "Employer match",
              "Often available",
              "None"
            ],
            [
              "Investment choice",
              "A menu of funds",
              "Thousands of funds"
            ]
          ]
        }
      }
    ],
    "seoTitle": "How Does a 401(k) Work? Contributions, Match and Rules",
    "slug": "how-does-a-401k-work",
    "sources": [
      {
        "label": "IRS — 401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500 (IR-2025-111)",
        "url": "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500"
      },
      {
        "label": "IRS — Retirement Topics: 401(k) and Profit-Sharing Plan Contribution Limits",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits"
      },
      {
        "label": "IRS — Retirement Plan and IRA Required Minimum Distributions FAQs",
        "url": "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs"
      },
      {
        "label": "IRS — Retirement Topics: Exceptions to Tax on Early Distributions",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-exceptions-to-tax-on-early-distributions"
      }
    ],
    "title": "How Does a 401(k) Work?",
    "type": "What",
    "updated": "2026-09-25"
  },
  {
    "cornerstone": false,
    "description": "Do your own taxes step by step: gather your documents, choose free filing software, work out your tax bracket by bracket, then file by April 15, 2027.",
    "faqs": [
      {
        "answer": "For 2026, a single filer under 65 must file if gross income reaches $16,100, the standard deduction amount. You must also file if you had $400 or more in net earnings from self-employment, even if your total income is below the threshold. File anyway if tax was withheld from your pay or you qualify for a refundable credit: the IRS will not send you a refund you never claim.",
        "question": "Do I need to file a tax return?"
      },
      {
        "answer": "A straightforward return with one W-2 and the standard deduction is usually a single evening's work in guided software. Self-employment, rental income, or itemized deductions add time, mostly in organizing records rather than in the software itself. Splitting the job into two sittings, documents first and the return second, keeps it manageable.",
        "question": "How long does doing your own taxes take?"
      },
      {
        "answer": "Yes, if your adjusted gross income is $95,000 or less, IRS Free File gives you guided tax software from partner companies at no cost. Start at IRS.gov/freefile so you reach the free version. At any income level, Free File Fillable Forms is free and gives you the federal forms online. Free in-person help is also available through the IRS Volunteer Income Tax Assistance (VITA) program for qualifying taxpayers.",
        "question": "Can I file my taxes for free?"
      },
      {
        "answer": "File your return on time anyway. The failure-to-file penalty is 5% of unpaid tax per month, ten times the 0.5% failure-to-pay penalty, so filing protects you even when you cannot pay. Pay what you can by April 15, then request an IRS payment plan for the rest. Interest still accrues on the unpaid balance, but a plan stops the situation from getting worse.",
        "question": "What if I can't pay what I owe?"
      },
      {
        "answer": "If you owe tax, the IRS charges a failure-to-file penalty of 5% of the unpaid tax per month, up to 25%, plus interest. Request an extension on Form 4868 by April 15 to get until October 15 to file, but note the extension does not move the payment date. If you are due a refund, there is no penalty for filing late, though you must file within three years to claim it.",
        "question": "What happens if I miss the April 15 deadline?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/how-to-do-your-own-taxes.jpg",
    "imageAlt": "Flat vector illustration of a desk with blank tax forms, a calculator, an orange pencil, and a small potted plant on a cream background",
    "inlineImage": "/images/how-to-do-your-own-taxes-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a clipboard with a blank checklist, a large orange pencil, a small calendar, and a paperclip on a cream background",
    "intro": "Doing your own taxes means gathering your income documents, choosing free or low-cost filing software, working through your income, deductions, and credits, and e-filing your return before the April 15, 2027 deadline. For a straightforward return, the whole job takes a few hours. This guide walks through it step by step, with a worked example using the 2026 tax figures.",
    "published": "2026-09-28",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Tax Calculator",
        "url": "/tax/tax-calculator"
      },
      {
        "name": "Income Tax Calculator",
        "url": "/tax/income-tax-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Decide whether doing your own taxes fits",
        "paragraphs": [
          "Most returns are simple enough to do yourself. If your income comes from one or two W-2 jobs, you take the standard deduction, and you have a handful of 1099 forms for bank interest or dividends, guided tax software can walk you through the whole return. The software asks plain questions, does the arithmetic, and checks for common errors before you file.",
          "Self-employment adds work but is still manageable for many people. A freelancer with one Schedule C, a few 1099-NEC forms, and a short list of business expenses can usually file without help. The extra steps are tracking expenses through the year and paying self-employment tax of 15.3% on net earnings of $400 or more, which the software calculates on Schedule SE.",
          "Some situations are worth professional help. Rental property, a business with employees, income from several states, a year with a divorce, or a large capital gain all add forms and judgment calls where a mistake costs more than the preparer's fee. The dividing line is complexity, not income: a $200,000 salary on one W-2 is a simpler return than $40,000 split across freelance work, rentals, and investments.",
          "If you are unsure, start the return yourself and see how it goes. Guided software shows you the forms it is filling in as you answer questions. If you reach a section you cannot answer with confidence, that is the point to stop and get help, not to guess. A return filed with a wrong number costs more to fix than a return filed a week later with the right one."
        ]
      },
      {
        "bullets": [
          "W-2 from every employer, and 1099-NEC or 1099-MISC for freelance and contract work.",
          "1099-INT for bank interest, 1099-DIV for dividends, and 1099-B for brokerage sales.",
          "1098 for mortgage interest, 1098-E for student loan interest, and records of any childcare costs.",
          "SSA-1099 if you received Social Security benefits, and any 1099-R for retirement account distributions.",
          "Your prior-year tax return, your Social Security number, and the Social Security numbers of your spouse and dependents."
        ],
        "heading": "Gather your documents first",
        "paragraphs": [
          "Collect every document before you open the software. Stopping halfway to hunt for a form is how numbers get typed from memory, and numbers typed from memory are how returns get rejected or questioned. Put everything in one folder, physical or digital, and check each item off as it arrives.",
          "Most income documents arrive in January. Employers must send your W-2 by January 31; for the 2026 tax year that date falls on a Sunday, so the deadline moves to Monday, February 1, 2027. Banks and brokerages send 1099 forms on a similar schedule, though corrected 1099s can arrive into February or March. Wait until you have the final version of each form before you file.",
          "You also need your prior-year return, or at least last year's adjusted gross income (AGI). The IRS uses your prior-year AGI to verify your identity when you e-file. If you filed last year, the number is on line 11 of your 2025 Form 1040. If you did not file last year, enter $0."
        ]
      },
      {
        "heading": "Know the dates that matter",
        "paragraphs": [
          "The deadline for a 2026 federal return is Thursday, April 15, 2027. That is the date to file your return and to pay any tax you owe. The IRS opens e-filing in late January and announces the exact opening date in early January, so early filers can usually submit within the first weeks of February.",
          "If you cannot finish by April 15, file Form 4868 to get an automatic extension to Friday, October 15, 2027. The extension covers filing only. Any tax you owe is still due April 15, and interest and penalties run on an unpaid balance after that date. Estimate what you owe and pay it with the extension request.",
          "April 15 is also the deadline for contributions that count toward 2026: traditional and Roth IRA contributions and health savings account contributions for 2026 must be made by April 15, 2027. An extension to file does not extend these deadlines. If you plan a last-minute IRA contribution, make it before April 15 and confirm with the account provider that it is coded for 2026.",
          "Missing the deadline costs real money. The failure-to-file penalty is 5% of unpaid tax for each month or part of a month the return is late, up to 25%. The failure-to-pay penalty is 0.5% per month, also capped at 25%. Filing on time and paying late is ten times cheaper than not filing at all, so file even if you cannot pay."
        ]
      },
      {
        "heading": "Choose how you will file",
        "paragraphs": [
          "The cheapest route for most people is IRS Free File. Guided tax software from IRS partner companies is free if your adjusted gross income is $95,000 or less. The software asks questions, fills in the forms, and guarantees its calculations. You must start from IRS.gov/freefile; going directly to a partner's commercial site does not get you the free version. Free File opens each January.",
          "If your income is above the Free File limit, Free File Fillable Forms is free at any income level. It gives you the federal forms online with limited calculations and no state filing. It suits people who know which forms they need and are comfortable working without guided questions.",
          "IRS Direct File, the government's own free filing tool, is not an option for the 2026 tax year. The IRS discontinued it after the 2025 filing season and has not announced plans to bring it back. Free File is the free guided option that remains.",
          "Commercial tax software and paper filing are the other routes. Paid software suits returns with rental property or complex investments that free options handle poorly, and most products include a state return. Paper filing by mail is free but slow: the IRS processes paper returns by hand, and refunds take weeks longer than e-filed returns. For most do-it-yourself filers, e-filing through Free File or paid software is the better choice."
        ]
      },
      {
        "heading": "Work out your taxable income",
        "paragraphs": [
          "Your tax is figured on taxable income, not on everything you earned. The path runs through three steps: add up total income, subtract adjustments to reach adjusted gross income (AGI), then subtract either the standard deduction or your itemized deductions. What is left is taxable income, and the tax tables apply to that number.",
          "Adjustments to income lower your AGI before the deduction. Common ones include traditional IRA contributions, student loan interest, health savings account contributions, and one-half of self-employment tax. These are sometimes called above-the-line deductions because they appear above the AGI line on the return. They reduce AGI whether or not you itemize.",
          "For 2026, the standard deduction is $16,100 for single filers, $32,200 for married couples filing jointly, and $24,150 for heads of household. If you are 65 or older or blind, add $2,050 per condition if you are unmarried, or $1,650 per condition if you are married. Itemizing only pays when your total itemized deductions on Schedule A, such as mortgage interest, state and local taxes, and charitable gifts, add up to more than your standard deduction. Most filers take the standard deduction."
        ],
        "table": {
          "head": [
            "Filing status",
            "Standard deduction for 2026"
          ],
          "rows": [
            [
              "Single",
              "$16,100"
            ],
            [
              "Married filing jointly",
              "$32,200"
            ],
            [
              "Head of household",
              "$24,150"
            ],
            [
              "Married filing separately",
              "$16,100"
            ],
            [
              "Additional amount, 65 or older or blind (unmarried, per condition)",
              "$2,050"
            ],
            [
              "Additional amount, 65 or older or blind (married, per condition)",
              "$1,650"
            ]
          ]
        }
      },
      {
        "heading": "Figure your tax bracket by bracket",
        "paragraphs": [
          "Federal income tax is marginal: each slice of taxable income is taxed at the rate for its bracket, and only the income inside a bracket gets that bracket's rate. Moving into a higher bracket never raises the tax on the income below it. For 2026, the single-filer brackets run 10% up to $12,400 of taxable income, 12% to $50,400, 22% to $105,700, 24% to $201,775, 32% to $256,225, 35% to $640,600, and 37% above that.",
          "Here is the arithmetic for a single filer with $85,000 of income and no adjustments, so AGI is $85,000. Subtract the $16,100 standard deduction to get taxable income of $68,900. The tax is then figured bracket by bracket: 10% of the first $12,400 is $1,240; 12% of the next $38,000 (from $12,400 to $50,400) is $4,560; 22% of the remaining $18,500 (from $50,400 to $68,900) is $4,070. The total federal income tax is $9,870.",
          "Two rates describe that result. The marginal rate is 22%, the rate on the next dollar earned. The effective rate is 11.6%, the total tax of $9,870 divided by the $85,000 income. The gap between the two is normal: the lower brackets pull the average down. When someone says they are in the 22% bracket, they mean their marginal rate, not the share of their income that goes to tax.",
          "Filing status changes the answer on the same income. A married couple filing jointly on $85,000 takes the $32,200 standard deduction, leaving $52,800 of taxable income. Their tax is $2,480 plus 12% of the $28,000 above $24,800, which comes to $5,840, an effective rate of 6.9%. The wider brackets and larger deduction for joint filers are why the same household income can produce a much smaller bill."
        ],
        "table": {
          "head": [
            "Bracket",
            "Taxable income in bracket",
            "Tax"
          ],
          "rows": [
            [
              "10% up to $12,400",
              "$12,400",
              "$1,240"
            ],
            [
              "12% from $12,400 to $50,400",
              "$38,000",
              "$4,560"
            ],
            [
              "22% from $50,400 to $68,900",
              "$18,500",
              "$4,070"
            ],
            [
              "Total tax on $68,900 taxable income",
              "$68,900",
              "$9,870"
            ]
          ]
        }
      },
      {
        "heading": "Claim the credits and deductions you qualify for",
        "paragraphs": [
          "Deductions and credits both lower your bill, but they work differently. A deduction lowers the income your tax is figured on, so a $1,000 deduction saves a filer in the 22% bracket $220. A credit lowers the tax itself, so a $1,000 credit saves $1,000. Credits are usually worth more than deductions of the same size, and refundable credits can pay out even when they exceed the tax you owe.",
          "The largest credit for many families is the child tax credit: up to $2,200 per qualifying child for 2026, of which up to $1,700 is refundable as the additional child tax credit. A qualifying child must be under 17 at the end of the year, live with you for more than half the year, and have a Social Security number. The credit phases out at higher incomes, so check the Form 1040 instructions for the limits that apply to you.",
          "The earned income tax credit helps low- and moderate-income workers, and its value depends on income, filing status, and number of children. Because the rules are detailed, the IRS offers a free EITC Assistant that checks eligibility and estimates the amount. It is worth using: the credit is one of the most commonly missed, and it is refundable.",
          "Education costs and retirement saving can also earn credits. The American Opportunity Tax Credit and the Lifetime Learning Credit offset college costs, and the saver's credit rewards retirement contributions at lower incomes. Guided software asks about each of these in turn. Answer honestly and let the software decide what you qualify for; claiming a credit you do not qualify for is a common reason returns get flagged."
        ]
      },
      {
        "heading": "File, pay, and track your refund",
        "paragraphs": [
          "Before you submit, review the return the way the IRS will read it: names and Social Security numbers exactly as printed on the cards, income figures matching the forms, and bank details correct for direct deposit. A mistyped Social Security number or a wrong bank account number is the most common reason a return is rejected or a refund goes astray.",
          "E-file and choose direct deposit for the fastest refund. To sign an e-filed return, the IRS asks for your prior-year AGI or your self-select PIN, a five-digit number you choose. If you filed last year, your AGI is on line 11 of your 2025 return; if you did not file, enter $0. The software walks you through this step before it transmits the return.",
          "After filing, check your refund status with the IRS Where's My Refund tool. Your status appears about 24 hours after you e-file a current-year return. You need your Social Security number, filing status, and the exact refund amount. If the status does not appear after a few days, check that the return was accepted; a rejected return needs a correction and a resubmission before the deadline.",
          "If you owe tax, pay by April 15 even if you file an extension. The IRS accepts payment from a bank account, by card, or by check with Form 1040-V. If you cannot pay the full amount, pay what you can and request a payment plan: the failure-to-pay penalty drops while an installment agreement is in place, and paying something always beats paying nothing."
        ]
      },
      {
        "heading": "Avoid the mistakes that delay refunds",
        "paragraphs": [
          "Most delayed refunds trace back to a short list of avoidable errors. The IRS rejects returns with mismatched names or Social Security numbers, and a single wrong digit in a bank routing number sends a direct deposit to the wrong account or bounces it back. Review the return slowly before you submit it. The review is the cheapest part of the job and the one that prevents most delays.",
          "File only when every income form has arrived. Filing early on a W-2 and then receiving a corrected 1099 means amending the return, which takes far longer to process than waiting a week for the final form. If a form is missing in mid-February, contact the payer first; the IRS can help you reconstruct the figures from your pay stubs if the payer does not respond.",
          "Check that you entered every 1099, including small ones. The IRS receives copies of the same forms, and its computers match them against your return. A missing 1099-INT for $40 of bank interest will not change your tax much, but it can trigger a notice and a delay while the IRS reconciles the difference."
        ]
      },
      {
        "bullets": [
          "Save a copy of the filed return and the IRS acceptance confirmation with your tax records.",
          "Check your refund status about 24 hours after e-filing, and contact the IRS if it still has not appeared after a few days.",
          "Note any estimated tax payments due for next year if you had self-employment income or income without withholding.",
          "Adjust your W-4 with your employer if you owed a large balance or received a very large refund."
        ],
        "heading": "Fix mistakes and keep your records",
        "paragraphs": [
          "If you find an error after filing, file an amended return on Form 1040-X. Common reasons include a corrected 1099, a missed credit, or a wrong filing status. You generally have three years from the date you filed the original return, or two years from the date you paid the tax, whichever is later, to claim a refund on an amended return. Amend only the items that were wrong; the form asks for the original figures, the corrected figures, and an explanation.",
          "Keep the return and every document behind it for at least three years from the date you filed, or from the due date if you filed early. That is the period the IRS generally has to assess additional tax. Keep records for six years if you left out more than 25% of the gross income shown on the return, and for seven years if you claimed a loss from worthless securities or a bad debt deduction. If you never filed a return, there is no time limit, so keep those records indefinitely.",
          "Doing your own taxes gets easier the second time. The documents are the same, the software remembers your details, and the concepts from this guide carry over. The first return is the hard one; after that, the job is mostly repeating a process you already understand."
        ]
      }
    ],
    "seoTitle": "How to Do Your Own Taxes: A Step-by-Step 2026 Guide",
    "slug": "how-to-do-your-own-taxes",
    "sources": [
      {
        "label": "IRS — Rev. Proc. 2025-32, annual inflation adjustments for tax year 2026",
        "url": "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf"
      },
      {
        "label": "IRS — Individual tax filing (April 15, 2027 deadline)",
        "url": "https://www.irs.gov/individual-tax-filing"
      },
      {
        "label": "IRS — E-file: Do your taxes for free (Free File, AGI $95,000 or less)",
        "url": "https://www.irs.gov/e-file-do-your-taxes-for-free"
      },
      {
        "label": "IRS — File your tax return",
        "url": "https://www.irs.gov/filing/individuals/how-to-file"
      }
    ],
    "title": "How to Do Your Own Taxes",
    "type": "How-to",
    "updated": "2026-09-28"
  },
  {
    "cornerstone": false,
    "description": "How capital gains tax works in 2026: short-term vs long-term rates, the 0%, 15%, and 20% thresholds, the 3.8% NIIT, losses, and the home-sale exclusion.",
    "faqs": [
      {
        "answer": "No. You owe tax only when you sell or otherwise dispose of the asset — that is when the gain is realized. An asset that has risen in value but that you still hold has an unrealized gain, and no tax is due on it. The same applies to losses: a paper loss does not reduce your tax until you sell. This is why the timing of a sale is a tax decision.",
        "question": "Do I owe capital gains tax if I have not sold the asset?"
      },
      {
        "answer": "Yes, usually. A gain is long-term if you held the asset for more than one year before selling it. If you sell exactly one year after buying, the gain is short-term, because the rule requires more than one year. The holding period starts the day after you buy and includes the day you sell, so count carefully — one day can change the rate by several percentage points.",
        "question": "Is a gain long-term if I held the asset for exactly one year?"
      },
      {
        "answer": "No. Capital gains are taxed at the federal level, and most states tax them too, usually as ordinary income at the state's own rates. A few states have no income tax at all. State tax is calculated separately from federal tax, and the federal 0%, 15%, and 20% rates do not apply to it. Your total bill is the federal tax plus whatever your state charges.",
        "question": "Does the federal capital gains rate include state tax?"
      },
      {
        "answer": "Net your gains and losses first. Losses offset gains of the same type, then the other type. If losses exceed gains, you can deduct up to $3,000 of the excess against ordinary income each year ($1,500 if married filing separately) and carry the rest forward indefinitely. The wash-sale rule blocks the loss if you buy the same or a substantially identical security within 30 days before or after the sale.",
        "question": "What happens if my capital losses are bigger than my gains?"
      },
      {
        "answer": "If you owned and lived in the home for at least two of the five years before the sale, you can exclude up to $250,000 of gain as a single filer or $500,000 as a married couple filing jointly. A gain above the exclusion is taxed at the long-term capital gains rates. You can use the exclusion once every two years, and the home must have been your main home.",
        "question": "How much gain can I exclude when I sell my home?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/how-capital-gains-tax-works.jpg",
    "imageAlt": "Flat-vector illustration of an ascending bar chart with a rising orange arrow, a stack of coins, and a small pie chart",
    "inlineImage": "/images/how-capital-gains-tax-works-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a house with an orange roof beside a large wall calendar with one date circled in sage",
    "intro": "Capital gains tax is the tax on the profit from selling an asset for more than you paid. The rate depends on how long you held it and how much other income you have. Hold for more than a year and the federal rate is 0%, 15%, or 20%; sell sooner and the gain is taxed as ordinary income.",
    "published": "2026-10-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Capital Gains Tax Calculator",
        "url": "/tax/capital-gains-tax-calculator"
      },
      {
        "name": "Investment Calculator",
        "url": "/personal-wealth/investment-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What counts as a capital gain",
        "paragraphs": [
          "A capital gain is the profit from selling a capital asset — stocks, bonds, funds, real estate, a business, collectibles — for more than you paid. The gain is the sale price minus your basis, usually what you paid including commissions and fees, plus the cost of any improvements. Sell shares for $15,000 that cost $10,000 and your gain is $5,000. Sell for less and you have a capital loss, covered later in this guide.",
          "The key word is selling. Tax is due only when you realize the gain by disposing of the asset. An investment that has doubled on paper but that you still hold has an unrealized gain, and no tax is due on it — not this year, not ever, until you sell. The same applies in reverse: a paper loss does not reduce your tax until you sell. This is why the timing of a sale is a tax decision in its own right, and why holding an asset past a year-end can move the tax bill into the next year.",
          "Basis is not always the purchase price. A gifted asset generally carries the giver's basis. An inherited asset is generally stepped up to its value at the date of death — a $100,000 holding bought for $20,000 passes to heirs with a $100,000 basis, so selling it immediately produces no taxable gain. Improvements to real estate add to basis, which is why keeping renovation records matters when you sell a home. Dividends and interest are not capital gains, though qualified dividends are taxed at the same preferential rates."
        ],
        "table": {
          "head": [
            "Item",
            "Amount"
          ],
          "rows": [
            [
              "Sale price of shares",
              "$15,000"
            ],
            [
              "Purchase price (basis)",
              "$10,000"
            ],
            [
              "Commissions and fees paid",
              "$50"
            ],
            [
              "Capital gain",
              "$4,950"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Short-term: held one year or less. Taxed as ordinary income, at rates from 10% to 37% in 2026.",
          "Long-term: held more than one year. Taxed at 0%, 15%, or 20%, depending on your taxable income.",
          "The holding period starts the day after you buy and includes the day you sell.",
          "Selling exactly one year after buying is short-term — the rule requires more than one year."
        ],
        "heading": "Short-term vs long-term: the one-year line",
        "paragraphs": [
          "The one-year line is the single most important fact about capital gains tax. Hold an asset for more than one year and your gain is long-term, taxed at 0%, 15%, or 20%. Hold it for one year or less and your gain is short-term, taxed as ordinary income at your marginal rate — 10% to 37% in 2026. The difference is large: a $10,000 gain for a single filer in the 22% bracket costs $2,200 short-term but only $1,500 long-term in the 15% band — a $700 saving from waiting past the one-year mark.",
          "The holding period starts the day after you acquire the asset and includes the day you sell it. Buy shares on March 10, 2026 and sell them on March 11, 2027, and the gain is long-term. Sell them on March 10, 2027 — exactly one year later — and the gain is short-term, because the rule requires more than one year. One day can change the rate by several percentage points, so check the dates before you place the order, especially for a large gain.",
          "The one-year line applies per lot, not per account. If you bought shares of the same stock at different times, each lot has its own holding period and basis, and your broker's lot-selection setting controls which shares are deemed sold — check it before a sale. Inherited assets are always treated as long-term, and the holding period for gifted property generally includes the time the giver held it."
        ]
      },
      {
        "heading": "The 2026 rates and thresholds",
        "paragraphs": [
          "For 2026, long-term capital gains are taxed at 0%, 15%, or 20%, depending on your taxable income. The thresholds come from IRS Revenue Procedure 2025-32. A single filer pays 0% while taxable income stays at or below $49,450, 15% up to $545,500, and 20% above that. For married couples filing jointly, the 0% rate covers taxable income up to $98,900, and the 15% rate runs to $613,700.",
          "These thresholds apply to your total taxable income, not to the gain alone. Taxable income is what remains after subtracting the standard deduction — $16,100 for single filers and $32,200 for married couples filing jointly in 2026 — or itemized deductions if larger. A single filer with $60,000 of gross income and the standard deduction has taxable income of $43,900, putting long-term gains in the 0% band. The same thresholds apply to qualified dividends.",
          "Short-term gains get no preferential rate. They are added to your other ordinary income and taxed at the ordinary brackets, which for 2026 run from 10% to 37%. A short-term gain stacks on top of your wages, so it is taxed at your highest marginal rate. That stacking is also how the long-term rates work, as the next section shows."
        ],
        "table": {
          "head": [
            "Filing status",
            "0% rate up to",
            "15% rate up to",
            "20% rate above"
          ],
          "rows": [
            [
              "Single",
              "$49,450",
              "$545,500",
              "$545,500"
            ],
            [
              "Married filing jointly",
              "$98,900",
              "$613,700",
              "$613,700"
            ],
            [
              "Married filing separately",
              "$49,450",
              "$306,850",
              "$306,850"
            ],
            [
              "Head of household",
              "$66,200",
              "$579,600",
              "$579,600"
            ]
          ]
        }
      },
      {
        "heading": "How the thresholds stack on your other income",
        "paragraphs": [
          "The thresholds are not based on the size of your gain. They are based on your total taxable income, with the gain stacked on top of your ordinary income. Wages, pension, and IRA withdrawals fill the bands first, and only the room left under the threshold is taxed at 0%. A moderate gain can still be taxed at 15% if your other income already fills the 0% band — and a retiree with little ordinary income can sell a large gain at 0%.",
          "Take a single filer with $40,000 of taxable income from wages and a $20,000 long-term gain. Total taxable income is $60,000. The 0% band ends at $49,450, so $9,450 of the gain — the room between $40,000 and $49,450 — is taxed at 0%. The remaining $10,550 falls in the 15% band, so the tax is $10,550 times 15%, or $1,582.50. The effective rate on the $20,000 gain is about 7.9%, not 15%, because nearly half of it fell in the 0% band.",
          "The same stacking explains why the 0% rate is worth planning around. A single filer with $30,000 of taxable income has $19,450 of 0% room: selling a $19,450 long-term gain costs nothing in federal tax, while selling $25,000 costs 15% on the $5,550 above the threshold — $832.50. In a low-income year — early retirement, a sabbatical, a gap between jobs — that room is at its widest. It resets every year, so unused 0% space does not carry forward."
        ]
      },
      {
        "heading": "The 3.8% net investment income tax",
        "paragraphs": [
          "Higher earners face an additional tax on top of the capital gains rates. The net investment income tax (NIIT) is a 3.8% tax on the lesser of your net investment income and the amount by which your modified adjusted gross income exceeds $200,000 for single filers or $250,000 for married couples filing jointly. Net investment income includes capital gains, dividends, interest, rents, and royalties — but not wages, Social Security, or retirement account distributions. The thresholds are fixed by statute and not adjusted for inflation.",
          "The IRS gives a worked example. A single taxpayer has modified adjusted gross income of $270,000 and net investment income of $90,000. The income exceeds the $200,000 threshold by $70,000, and the tax applies to the lesser of $70,000 and $90,000 — so the NIIT is $70,000 times 3.8%, or $2,660. The tax falls on the excess over the threshold, not on all investment income.",
          "Combined with the capital gains rates, the NIIT takes the top federal rate on long-term gains to 23.8% — 20% plus 3.8% — for taxpayers above both the 20% threshold and the NIIT threshold. Someone in the 15% band with income above the NIIT threshold pays 18.8%. The NIIT is reported on Form 8960, and estimated tax payments may be needed to cover it, since brokers do not withhold it. Use the Capital Gains Tax Calculator to see the NIIT layered onto your own gain."
        ]
      },
      {
        "bullets": [
          "Losses first offset gains of the same type: short-term losses against short-term gains, long-term against long-term.",
          "Any remaining loss offsets gains of the other type, starting with the type that saves the most tax.",
          "If losses still exceed gains, deduct up to $3,000 of the excess against ordinary income each year ($1,500 if married filing separately).",
          "Unused losses carry forward indefinitely — they never expire, and they keep their short-term or long-term character."
        ],
        "heading": "Capital losses: netting, the $3,000 limit, and carryforwards",
        "paragraphs": [
          "Losses are not wasted. The tax code nets gains and losses before any tax is calculated: short-term losses offset short-term gains first, long-term losses offset long-term gains first, and any remaining loss offsets gains of the other type. Only the net gain is taxed. A $12,000 short-term gain and a $20,000 long-term loss net to an $8,000 long-term loss — no tax on the gain at all.",
          "When losses exceed gains, you can deduct up to $3,000 of the excess against ordinary income each year — $1,500 if married filing separately. The $8,000 net loss above lets you deduct $3,000 this year and carry the remaining $5,000 forward. Carried-forward losses keep their character — a long-term loss stays long-term — and there is no expiry date, so a large loss from one bad year can shelter gains for years.",
          "One rule limits the game. The wash-sale rule disallows a loss if you buy the same or a substantially identical security within 30 days before or after the sale — a 61-day window. Sell shares at a loss on June 1 and buy them back on June 20, and the loss is disallowed; it is added to the basis of the replacement shares instead, so it is deferred rather than lost. The rule also applies if your spouse buys the same security, or if you buy it in an IRA."
        ]
      },
      {
        "heading": "Special rates and exclusions",
        "paragraphs": [
          "Not every long-term gain gets the 0%, 15%, and 20% treatment. Gains on collectibles — art, antiques, coins, stamps, precious metals — are taxed at a maximum rate of 28%. Unrecaptured section 1250 gain, the portion of a gain on depreciable real estate attributable to depreciation you took, is taxed at a maximum of 25%. A $10,000 gain on a coin collection in the 20% band costs $2,800, not $2,000.",
          "The largest exclusion in the code is for your home. If you owned and lived in your main home for at least two of the five years before the sale, you can exclude up to $250,000 of gain as a single filer, or $500,000 as a married couple filing jointly. Buy for $300,000, sell for $520,000 after living in it for three years, and the $220,000 gain is fully excluded as a single filer — no federal tax at all. A gain above the exclusion is taxed at the long-term rates, and you can use the exclusion once every two years.",
          "Gains inside retirement accounts are not taxed as capital gains at all. A 401(k) or traditional IRA defers tax until withdrawal, when the money is taxed as ordinary income regardless of how much came from investment gains. A Roth IRA or Roth 401(k) skips tax entirely on qualified withdrawals. That is why asset location matters: holding your fastest-growing investments inside a Roth account can cut the total tax bill without changing what you own."
        ],
        "table": {
          "head": [
            "Type of gain",
            "Maximum federal rate"
          ],
          "rows": [
            [
              "Long-term gain, ordinary assets",
              "20% (plus 3.8% NIIT if applicable)"
            ],
            [
              "Short-term gain",
              "37% (ordinary income rates)"
            ],
            [
              "Collectibles gain",
              "28%"
            ],
            [
              "Unrecaptured section 1250 gain",
              "25%"
            ],
            [
              "Gain on main home, within exclusion",
              "0% (excluded)"
            ]
          ]
        }
      },
      {
        "heading": "How you report it",
        "paragraphs": [
          "Your broker does much of the paperwork. By mid-February you should receive Form 1099-B, listing your sales proceeds and, for covered securities, your cost basis. The IRS gets the same form, so a sale you forget to report will still show up on their side — and the IRS may assume a zero basis, taxing the entire proceeds as gain. Check the 1099-B against your own records, especially for older holdings where the broker may not know your basis.",
          "You report the details on Form 8949, which lists each sale with its dates, proceeds, basis, and gain or loss, and the totals flow to Schedule D, where short-term and long-term amounts are netted and the tax is calculated. The Qualified Dividends and Capital Gain Tax Worksheet in the Form 1040 instructions applies the 0%, 15%, and 20% rates. Tax software handles this automatically, but the worksheet is the mechanism that stacks your gain on top of your ordinary income and applies the preferential rates band by band.",
          "A large gain can also create an estimated tax obligation. A big sale in June with no withholding can leave you underpaid for the year, triggering an underpayment penalty. If you expect to owe more than $1,000 at filing time, make a quarterly estimated payment using Form 1040-ES. One safe harbor: paying at least 100% of last year's tax (110% if your adjusted gross income was over $150,000) avoids the penalty even if you owe more this year."
        ]
      },
      {
        "bullets": [
          "Hold past one year: the long-term rates save the most tax for the least effort.",
          "Harvest losses: sell losing positions to offset gains, then deduct up to $3,000 of any excess against ordinary income.",
          "Use low-income years: realize gains when your taxable income leaves room in the 0% band.",
          "Mind the wash-sale rule: wait more than 30 days before repurchasing a security you sold at a loss.",
          "Keep fast-growing assets in a Roth account, where gains are never taxed on qualified withdrawal."
        ],
        "heading": "Ways to lower the bill",
        "paragraphs": [
          "The cheapest tax cut is patience. Holding an asset for more than a year converts a short-term gain taxed at your ordinary rate into a long-term gain taxed at 0%, 15%, or 20%. For a single filer in the 22% bracket with a $10,000 gain, that is a $700 saving — $2,200 versus $1,500 — for waiting past the one-year mark. In the 32% bracket the same gain costs $3,200 short-term versus $1,500 long-term, a $1,700 difference. Never let tax alone decide an investment — a falling stock is a bad hold at any rate — but when the decision is close, the holding period should tip it.",
          "Tax-loss harvesting is the second lever. Selling a losing position realizes a loss that offsets gains elsewhere in your portfolio, and up to $3,000 of any excess offsets ordinary income each year, with the rest carried forward. It is most valuable when the loss offsets a short-term gain, which would otherwise be taxed at your highest rate. Just respect the wash-sale rule: wait more than 30 days before buying the same security back, or buy a similar-but-not-identical one in the meantime.",
          "Timing and placement complete the picture. Realizing gains in a low-income year lets more of the gain fall in the 0% band, and splitting a large sale across two tax years can keep each year's gain in a lower band. Holding your fastest-growing assets inside a Roth IRA or Roth 401(k) means the gains are never taxed at all on qualified withdrawal. Donating appreciated shares to charity is another option: you deduct the full market value if you itemize, and neither you nor the charity pays tax on the gain."
        ]
      }
    ],
    "seoTitle": "How Capital Gains Tax Works: 2026 Rates, Rules, Brackets",
    "slug": "how-capital-gains-tax-works",
    "sources": [
      {
        "label": "IRS: Revenue Procedure 2025-32 (2026 inflation adjustments, section 4.03)",
        "url": "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf"
      },
      {
        "label": "IRS: Topic No. 409, Capital gains and losses",
        "url": "https://www.irs.gov/taxtopics/tc409"
      },
      {
        "label": "IRS: Questions and answers on the net investment income tax",
        "url": "https://www.irs.gov/newsroom/questions-and-answers-on-the-net-investment-income-tax"
      },
      {
        "label": "IRS: Topic No. 701, Sale of your home",
        "url": "https://www.irs.gov/taxtopics/tc701"
      }
    ],
    "title": "How Capital Gains Tax Works",
    "type": "What",
    "updated": "2026-10-06"
  },
  {
    "cornerstone": false,
    "description": "Roth IRA vs 401(k) in 2026: limits, the match, tax treatment, income phase-outs, and withdrawal rules — with a worked example showing which account wins.",
    "faqs": [
      {
        "answer": "Yes. The limits are separate. In 2026 you can defer up to $24,500 into a 401(k) and contribute up to $7,500 to an IRA in the same year, for $32,000 in total if you are under 50. The $7,500 IRA limit covers traditional and Roth IRAs combined. Your 401(k) contributions do not reduce your IRA room, and IRA contributions do not reduce your 401(k) room.",
        "question": "Can I contribute to a 401(k) and a Roth IRA in the same year?"
      },
      {
        "answer": "No. A Roth 401(k) is a Roth option inside your employer's plan: it shares the $24,500 employee limit with traditional 401(k) contributions, has no income limit, and can receive an employer match (the match itself goes in pre-tax). A Roth IRA is an account you open yourself, with a $7,500 limit and income phase-outs. Since 2024, neither has required minimum distributions during your lifetime.",
        "question": "Is a Roth 401(k) the same as a Roth IRA?"
      },
      {
        "answer": "You can use the backdoor route: contribute to a traditional IRA without taking a deduction, then convert it to a Roth IRA. There is no income limit on conversions. The catch is the pro-rata rule — if you already hold pre-tax money in any traditional, SEP, or SIMPLE IRA, part of the conversion is taxable. Report the contribution and conversion on Form 8606 with your tax return.",
        "question": "What if I earn too much to contribute directly to a Roth IRA?"
      },
      {
        "answer": "Not usually. Capture the full employer match first, then fund a Roth IRA up to $7,500 if your income allows it. The Roth IRA gives you wider investment choice, no required distributions, and access to your contributions at any time. After the Roth IRA is full, return to the 401(k) and raise contributions toward the $24,500 limit. High earners in a high bracket now may prefer maxing the pre-tax 401(k) first.",
        "question": "Should I max out my 401(k) before opening a Roth IRA?"
      },
      {
        "answer": "A mix helps. Roth IRA contributions can be withdrawn at any time without tax or penalty, which makes them a useful bridge before 59½. A 401(k) allows penalty-free withdrawals from age 55 if you leave your most recent employer at 55 or older — the rule of 55. Neither account alone covers an early retirement well; most early retirees also hold taxable savings to fund the years before penalty-free access begins.",
        "question": "Which account is better if I plan to retire early?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/roth-ira-vs-401k.jpg",
    "imageAlt": "Flat-vector illustration of two savings jars side by side, one deep emerald with a sprouting plant and one burnt orange beside a stack of coins",
    "inlineImage": "/images/roth-ira-vs-401k-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a paycheck splitting into two arrows, one emerald toward a potted plant and one orange toward a stack of coins",
    "intro": "A traditional 401(k) cuts your tax bill now and taxes withdrawals in retirement; a Roth IRA taxes the money now and lets it grow and come out tax-free. Both shelter growth from tax, and you can hold both at once. The right choice depends on your employer match and your tax rate now versus the rate you expect in retirement.",
    "published": "2026-10-02",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Roth IRA Calculator",
        "url": "/personal-wealth/roth-ira-calculator"
      },
      {
        "name": "401k vs Solo 401k",
        "url": "/personal-wealth/401k-vs-solo-401k-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Contribute enough to your 401(k) to capture the full employer match before saving anywhere else.",
          "After the match, a Roth IRA usually wins when your tax rate is lower now than in retirement.",
          "A traditional 401(k) usually wins when your tax rate is higher now, because the deduction is worth more.",
          "Holding both gives you tax diversification: choose each year which pot to draw from."
        ],
        "heading": "The short answer: take the match, then compare tax rates",
        "paragraphs": [
          "If your employer matches 401(k) contributions, the first decision is already made. Contribute enough to get the full match before you save anywhere else. A match is an immediate return no investment can reliably beat — turning it down leaves pay on the table.",
          "Once the match is captured, the choice between a Roth IRA and additional 401(k) contributions comes down to tax timing. A traditional 401(k) gives you a tax break now: contributions reduce your taxable income, and you pay tax when you withdraw the money in retirement. A Roth IRA works the other way around: contributions go in after tax, with no deduction, but qualified withdrawals in retirement are entirely tax-free, including all the growth.",
          "That makes the comparison a bet on your tax rate. If your rate is higher now than it will be in retirement, the traditional 401(k)'s deduction is worth more than the Roth's tax-free withdrawal later. If your rate is lower now — common early in a career — the Roth usually wins. If the rates are the same, the two tie exactly, as the worked example below shows."
        ]
      },
      {
        "heading": "How each account works",
        "paragraphs": [
          "A 401(k) is a workplace retirement plan. Your employer offers it, and contributions come out of your paycheck. Traditional contributions are pre-tax: they lower your taxable income, grow tax-deferred, and are taxed as ordinary income when withdrawn. Many plans also offer a Roth 401(k) option, where contributions go in after tax and qualified withdrawals come out tax-free. The same $24,500 employee limit covers traditional and Roth contributions combined, so splitting between them does not raise the cap.",
          "A Roth IRA is an individual retirement account you open yourself, at a bank or brokerage, outside work. You contribute after-tax money, up to $7,500 for 2026, and qualified withdrawals in retirement are tax-free. There is no employer match and no payroll deduction — you fund it from your bank account, and you have until April 15, 2027, to make 2026 contributions. A 401(k), by contrast, must be funded through payroll by December 31, 2026; you cannot top it up from your bank account in January.",
          "Both accounts shelter growth from yearly tax, which is why either beats a taxable account for long-term saving. The structural differences matter too: a 401(k) usually offers a limited menu of funds chosen by your employer, while an IRA lets you invest in almost anything. A 401(k) can offer loans; an IRA cannot. And a 401(k) has no income limit, while a Roth IRA phases out for high earners."
        ],
        "table": {
          "head": [
            "",
            "Traditional 401(k)",
            "Roth IRA"
          ],
          "rows": [
            [
              "Who offers it",
              "Your employer",
              "You open it yourself"
            ],
            [
              "How money goes in",
              "Payroll deduction",
              "From your bank account"
            ],
            [
              "2026 contribution limit",
              "$24,500 ($32,500 at 50+)",
              "$7,500 ($8,600 at 50+)"
            ],
            [
              "Tax on contributions",
              "Pre-tax",
              "After tax"
            ],
            [
              "Tax on withdrawals",
              "Taxed as ordinary income",
              "Tax-free if qualified"
            ],
            [
              "Income limit",
              "None",
              "Phases out at high incomes"
            ],
            [
              "Employer match",
              "Often available",
              "None"
            ],
            [
              "Required withdrawals",
              "Yes, from RMD age",
              "None during your lifetime"
            ]
          ]
        }
      },
      {
        "heading": "2026 contribution limits",
        "paragraphs": [
          "For 2026, you can defer up to $24,500 of your salary into a 401(k). Your employer can add matching and profit-sharing contributions on top, up to a combined limit of $72,000 for the year, not counting catch-up contributions. At 50 or older, an extra $8,000 takes your personal total to $32,500 and the combined limit to $80,000.",
          "Savers aged 60 to 63 get a still higher catch-up under SECURE 2.0: $11,250 in 2026 instead of $8,000, taking the employee total to $35,750 and the combined limit to $83,250. The IRA limit is smaller but still meaningful: $7,500 across all your traditional and Roth IRAs combined, or $8,600 if you are 50 or older, with a $1,100 catch-up.",
          "One 2026 rule affects higher earners. Under SECURE 2.0, workers age 50 or older who earned more than $150,000 in FICA wages from their employer in the prior year must make catch-up contributions as Roth contributions — after tax, with tax-free withdrawals later. If your plan has no Roth option, you may be unable to make catch-up contributions until it adds one. The 2026 figures come from IRS Notice 2025-67."
        ],
        "table": {
          "head": [
            "2026 limit",
            "401(k)",
            "IRA (traditional + Roth)"
          ],
          "rows": [
            [
              "Standard limit, under 50",
              "$24,500",
              "$7,500"
            ],
            [
              "Catch-up, age 50+",
              "$8,000",
              "$1,100"
            ],
            [
              "Total at 50+",
              "$32,500",
              "$8,600"
            ],
            [
              "Higher catch-up, ages 60-63",
              "$11,250",
              "Not available"
            ],
            [
              "Total at ages 60-63",
              "$35,750",
              "$8,600"
            ],
            [
              "Combined employee + employer limit",
              "$72,000",
              "Not applicable"
            ]
          ]
        }
      },
      {
        "heading": "The employer match: the one clear winner",
        "paragraphs": [
          "The employer match is the only part of this comparison with no downside. A typical match adds 50 cents for every dollar you contribute up to 6% of pay. On an $80,000 salary, contributing 6% means $4,800 from your paycheck, and the employer adds $2,400 — $7,200 invested from $4,800 of your own money, an immediate 50% return before any investment growth. No Roth IRA benefit comes close: a Roth IRA has no match.",
          "Some employers match dollar for dollar up to a percentage of pay, which is a 100% immediate return on those dollars. Whatever the formula, contribute at least enough to capture every dollar of it. The match does not count against your $24,500 employee limit — it counts only toward the $72,000 combined limit — so it never crowds out your own contributions.",
          "Check your plan's vesting schedule before counting the match as yours. Some employers let you keep matching contributions immediately; others phase ownership in over several years, and you forfeit the unvested portion if you leave early. The match is still worth capturing either way — vesting only affects what you keep if you leave."
        ]
      },
      {
        "heading": "The tax math: when the rates tie, and when they decide",
        "paragraphs": [
          "The core comparison is simpler than it looks. Suppose you have $10,000 of pay to save at a 22% tax rate, and the money doubles before you withdraw it. In a traditional 401(k), the full $10,000 goes in pre-tax, grows to $20,000, and is taxed at 22% on withdrawal — $4,400 of tax, leaving $15,600. In a Roth IRA, you pay 22% tax first, so $7,800 goes in, grows to $15,600, and comes out tax-free. Same $15,600. When your tax rate is the same now and in retirement, the two tie exactly: paying tax on the contribution and paying tax on the withdrawal are the same thing when the rate does not change.",
          "The tie breaks when the rates differ. If your rate is 22% now but only 12% in retirement, the 401(k) wins: the $20,000 withdrawal is taxed at 12%, or $2,400, leaving $17,600 — $2,000 more than the Roth's $15,600. The deduction was worth 22 cents on the dollar; the withdrawal costs only 12. This is the common case for high earners who expect lower income in retirement.",
          "The reverse is just as clear. If your rate is 12% now but 22% in retirement — typical for a young worker whose earnings will rise — the Roth wins by the same $2,000. You pay 12% now, so $8,800 goes in and doubles to $17,600 tax-free, while the 401(k)'s $20,000 withdrawal loses 22%, or $4,400, leaving $15,600. Paying tax at 12% to avoid paying it at 22% is a good trade, and the Roth locks that trade in permanently.",
          "Several forces push your retirement tax rate up, which argues for holding some Roth money even if your rate looks high now. Required minimum distributions can force large taxable withdrawals in your 70s, and up to 85% of Social Security benefits can become taxable depending on your other income. Tax diversification — money in both pre-tax and Roth accounts — is insurance against that."
        ],
        "table": {
          "head": [
            "Scenario",
            "Traditional 401(k)",
            "Roth IRA",
            "Winner"
          ],
          "rows": [
            [
              "22% now, 22% in retirement",
              "$15,600 after tax",
              "$15,600 tax-free",
              "Tie"
            ],
            [
              "22% now, 12% in retirement",
              "$17,600 after tax",
              "$15,600 tax-free",
              "401(k) by $2,000"
            ],
            [
              "12% now, 22% in retirement",
              "$15,600 after tax",
              "$17,600 tax-free",
              "Roth by $2,000"
            ]
          ]
        }
      },
      {
        "bullets": [
          "401(k): no income limit. Anyone whose employer offers a plan can contribute the full $24,500.",
          "Roth IRA, single or head of household: full below $153,000 of modified AGI, zero at $168,000.",
          "Roth IRA, married filing jointly: full below $242,000 of modified AGI, zero at $252,000.",
          "Roth IRA, married filing separately and lived with your spouse: phase-out is $0 to $10,000."
        ],
        "heading": "Income limits: who can use each account",
        "paragraphs": [
          "A 401(k) has no income limit. Whether you earn $40,000 or $400,000, you can defer up to $24,500, and your employer can match on top. High earners face only the $150,000 wage threshold for mandatory Roth catch-up contributions, described above.",
          "A Roth IRA is different. Direct contributions phase out as your modified adjusted gross income rises. For 2026, single filers and heads of household can contribute the full $7,500 below $153,000 of modified AGI; the limit shrinks through the range to zero at $168,000. For married couples filing jointly, the range is $242,000 to $252,000. Inside the range, the IRS worksheet in Publication 590-A gives your reduced limit. For example, a single filer with modified AGI of $160,000 is $8,000 below the top of a $15,000-wide range, so the reduced limit is $7,500 times $8,000 divided by $15,000 — $4,000.",
          "Earning too much for a direct Roth contribution does not close the door. There is no income limit on converting a traditional IRA to a Roth IRA, so high earners use the backdoor route: contribute to a traditional IRA without deducting it, then convert it to a Roth. The catch is the pro-rata rule — if you already hold pre-tax money in any traditional, SEP, or SIMPLE IRA, part of the conversion is taxable. Rolling pre-tax IRA money into a 401(k) first can clear the way, because 401(k) balances are not counted. Note also that the traditional IRA deduction has its own, lower phase-outs for people covered by a workplace plan: $81,000 to $91,000 for single filers and $129,000 to $149,000 for married couples filing jointly in 2026."
        ]
      },
      {
        "bullets": [
          "Withdrawals before 59½ from a 401(k) or traditional IRA generally trigger income tax plus a 10% penalty, with exceptions for hardship and disability.",
          "Roth IRA contributions can be withdrawn at any time, tax-free and penalty-free, because you already paid tax on them.",
          "Roth IRA earnings are tax-free only in a qualified distribution: after age 59½ and at least five years after your first Roth contribution.",
          "Roth IRAs have no required minimum distributions during your lifetime; designated Roth 401(k) accounts have been exempt since 2024."
        ],
        "heading": "Withdrawals, penalties, and required distributions",
        "paragraphs": [
          "Both accounts are meant for retirement, and the tax code enforces that with a 10% early-withdrawal penalty on top of income tax for withdrawals before age 59½ from a traditional 401(k) or traditional IRA. Exceptions exist for hardship, disability, and certain medical expenses, but the penalty applies to the taxable portion of the withdrawal. A 401(k) may also offer loans, which an IRA cannot; an unpaid loan after leaving your job is treated as a distribution.",
          "The Roth IRA is far more flexible before retirement. Because contributions went in after tax, you can withdraw them at any time, for any reason, without tax or penalty. Only the earnings are restricted: they come out tax-free only in a qualified distribution, generally requiring age 59½ and five years since your first Roth contribution. Earnings withdrawn early are taxed as income plus the 10% penalty, with exceptions including disability and a first-home purchase of up to $10,000.",
          "The accounts also differ at the other end of life. Traditional 401(k)s and traditional IRAs face required minimum distributions: under SECURE 2.0, RMDs begin at 73 if you were born between 1951 and 1959, and at 75 if you were born in 1960 or later. Each year's RMD is your prior year-end balance divided by a life-expectancy factor from the IRS table. Missing an RMD costs an excise tax of 25% of the amount you failed to withdraw, reduced to 10% if you correct the shortfall within two years. Roth IRAs have no RMDs during your lifetime, and since 2024 designated Roth 401(k) accounts are exempt too."
        ]
      },
      {
        "heading": "Changing jobs, rollovers, and the rule of 55",
        "paragraphs": [
          "A 401(k) is tied to an employer, so changing jobs raises a question the Roth IRA never does. When you leave, you can leave the money in the old plan, roll it into a new employer's plan, or roll it into an IRA. A direct rollover — trustee to trustee — avoids tax and penalty entirely. An indirect rollover, where the check comes to you, triggers 20% mandatory withholding, and you must replace it from other funds within 60 days. Cashing out is the worst option: the full balance is taxed as income plus the 10% penalty if you are under 59½.",
          "One rule makes the 401(k) more flexible than the IRA for early retirees. The rule of 55 lets you withdraw from your most recent employer's 401(k) penalty-free if you leave that job at 55 or older — no need to wait until 59½. Withdrawals are still taxed as income, but the 10% penalty does not apply. The rule covers only the plan of the employer you just left, so rolling that money into an IRA first would destroy the benefit.",
          "Rollovers also affect the backdoor Roth strategy. Pre-tax money in a traditional IRA triggers the pro-rata rule on conversions, but pre-tax money in a 401(k) does not, so rolling an old traditional IRA into a current employer's 401(k) can clear the way for clean backdoor conversions. A Roth 401(k) balance can be rolled into a Roth IRA, keeping its tax-free status and gaining the Roth IRA's withdrawal flexibility."
        ]
      },
      {
        "bullets": [
          "Contribute enough to your 401(k) to capture the full employer match.",
          "Fund a Roth IRA up to $7,500 if your income allows it and your current rate is low or moderate.",
          "Return to the 401(k) and raise contributions toward the $24,500 limit.",
          "Use catch-up contributions from age 50, and the higher $11,250 catch-up at ages 60 to 63.",
          "Revisit the split yearly: a raise, a move, or a low-income year can flip the winner."
        ],
        "heading": "How to decide: a priority order",
        "paragraphs": [
          "For most workers the order is straightforward. First, contribute enough to the 401(k) to capture the full employer match. Second, fund a Roth IRA up to $7,500 if your income allows it: the flexibility — wider investment choice, no required distributions, access to contributions — makes it the better second step for most people. Third, return to the 401(k) and raise contributions toward the $24,500 limit. Fourth, use catch-up contributions from age 50, and the higher catch-up at ages 60 to 63.",
          "Young workers and low earners should lean Roth. A 25-year-old in the 12% bracket pays a low rate to buy decades of tax-free growth, and their rate will almost certainly be higher later. The same logic applies in any low-income year — a sabbatical, a job change, or early retirement before Social Security starts are all good times for Roth contributions, because the tax cost is temporarily low.",
          "High earners should lean traditional 401(k) for the bulk of their saving. Someone in the 32% bracket gets 32 cents back for every dollar deferred and is unlikely to face a 32% rate on withdrawals in retirement. Even so, holding some Roth money is worth it: Roth withdrawals add nothing to taxable income, which can keep Social Security benefits less taxable and Medicare premiums lower. Revisit the split each year — a raise, a move, or a low-income year can flip the winner."
        ]
      }
    ],
    "seoTitle": "Roth IRA vs 401(k): Which Is Better for You in 2026?",
    "slug": "roth-ira-vs-401k",
    "sources": [
      {
        "label": "IRS: 401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500 (IR-2025-111)",
        "url": "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500"
      },
      {
        "label": "IRS: 401(k) and profit-sharing plan contribution limits",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits"
      },
      {
        "label": "IRS: IRA contribution limits",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits"
      },
      {
        "label": "IRS: Required minimum distributions FAQs",
        "url": "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs"
      }
    ],
    "title": "Roth IRA vs 401(k)",
    "type": "Comparison",
    "updated": "2026-10-02"
  },
  {
    "cornerstone": false,
    "description": "Find your retirement number from your spending, not your salary. The 25x rule, what Social Security covers, and a worked example with real arithmetic.",
    "faqs": [
      {
        "question": "How much do I need to retire at 67?",
        "answer": "Multiply the yearly spending your savings must cover by 25. If you spend $60,000 a year and Social Security pays $24,000, the $36,000 gap needs $900,000. Your own number depends on your spending, your benefit, and any pension, so run the same steps with your figures. Remember the 25x rule assumes a roughly 30-year retirement."
      },
      {
        "question": "Is $1 million enough to retire?",
        "answer": "It depends on your spending. At a 4% withdrawal rate, $1 million pays $40,000 a year from savings. Add $24,000 of Social Security and that is $64,000 a year: comfortable for a household spending $60,000, tight for one spending $90,000. The test is always the gap between your spending and your guaranteed income, not the round number."
      },
      {
        "question": "What is the 4% rule?",
        "answer": "The 4% rule says a retiree can withdraw 4% of a portfolio in the first year of retirement, then raise that dollar amount with inflation each year, with a good chance the money lasts 30 years. It comes from William Bengen's 1994 study of US market history. It is a rule of thumb with real limits, US data only, 30 years, before fees and taxes, not a guarantee."
      },
      {
        "question": "Does Social Security count toward my retirement number?",
        "answer": "Yes: subtract it before you multiply. Social Security replaces about 43% of pre-retirement earnings for a medium earner claiming at full retirement age, and the average retired worker received $2,071 a month in January 2026. Every dollar of guaranteed income cuts your savings target by 25 dollars, so claiming later can shrink the number your portfolio must cover."
      },
      {
        "question": "How much should I save each month for retirement?",
        "answer": "It depends on your age, your target, and what you already have. In the worked example, a 45-year-old with $150,000 saved needs about $658 a month at a 6% real return to reach $900,000 by 67. The monthly amount matters less than starting now: every year you wait, the same target needs a larger monthly check."
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/how-much-do-i-need-to-retire.jpg",
    "imageAlt": "Flat-vector illustration of a glass savings jar filled with gold coins, with an orange target flag planted on top",
    "inlineImage": "/images/how-much-do-i-need-to-retire-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a rocking chair on a porch beside a winding path leading toward a rising sun",
    "intro": "Your retirement number is 25 times the annual spending your savings must cover after Social Security and any pension. A household that spends $60,000 a year and gets $24,000 from Social Security needs $900,000 in savings: a $36,000 yearly gap times 25. This guide shows how to build that number for yourself, step by step.",
    "published": "2026-10-13",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Retirement Calculator",
        "url": "/personal-wealth/retirement-calculator"
      },
      {
        "name": "RMD Calculator",
        "url": "/personal-wealth/rmd-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Costs that usually fall: payroll taxes, retirement contributions, commuting, work clothing, and child-related spending.",
          "Costs that usually rise: health care, travel in the early retirement years, and help for adult children or aging parents.",
          "Costs that stay put: housing, food, utilities, insurance, and property taxes, unless you move or pay off a mortgage."
        ],
        "heading": "Start with spending, not salary",
        "paragraphs": [
          "Salary-based shortcuts mislead. Two people earning $90,000 can need very different nest eggs if one spends $45,000 a year and the other spends $75,000. Your savings fund spending, not income, so the honest starting point is what a year of your life costs.",
          "A common shortcut estimates that spending instead of measuring it. The Social Security Administration's 2026 cost-of-living fact sheet repeats the standard planning guidance: most financial advisers say you will need about 70% to 80% of pre-retirement income to live comfortably in retirement, counting Social Security, investments, and personal savings together. Fidelity's analysis of spending data lands in a similar place, finding most people need to replace 55% to 80% of pre-tax income, with the share falling as income rises.",
          "The range exists because retirement changes both sides of the ledger. Some costs stop the day work stops. Others grow.",
          "Measure your own spending before you trust a percentage. Pull 12 months of bank and card statements, total the year, then adjust for what changes: subtract the mortgage payment if the loan ends before you retire, add the health insurance premium you will pay before Medicare starts at 65. A number built from your own records beats any rule of thumb: the rule describes an average household, and you are not one."
        ]
      },
      {
        "heading": "The 25x rule and the 4% rule",
        "paragraphs": [
          "The 25x rule and the 4% rule are one rule read in two directions. If a portfolio can pay out 4% of its starting value each year, then funding a given amount of annual spending takes 25 times that amount: 4% of 25 is 1. A $36,000 yearly gap needs $900,000; a $50,000 gap needs $1,250,000.",
          "The 4% figure comes from a specific study, not from folklore. In October 1994, financial planner William Bengen published \"Determining Withdrawal Rates Using Historical Data\" in the Journal of Financial Planning. He tested a portfolio of 50% US stocks and 50% intermediate-term Treasury bonds, rebalanced annually, against every rolling 30-year period in US market history back to 1926. A first-year withdrawal of 4%, raised each year with inflation, never exhausted the portfolio in under 33 years. A 4.25% withdrawal could have run dry in 28 years in the worst case. Bengen called 4% the SAFEMAX: the highest starting rate that survived the worst historical stretch.",
          "A second study reached a similar place four years later. In 1998, Trinity University professors Philip Cooley, Carl Hubbard, and Daniel Walz published \"Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable\" in the AAII Journal, testing withdrawal rates across stock and bond mixes and time horizons. Their results supported 4% as a workable starting rate for a 30-year retirement, and the \"Trinity study\" label stuck.",
          "Treat 4% as a rule of thumb with known limits, not a guarantee. Both studies used US market history only, assumed a roughly 30-year retirement, and modeled portfolios before fees and taxes: Bengen's main case sat in tax-deferred accounts, and the Trinity authors did not adjust for taxes or transaction costs. A rule that survived every past 30-year stretch says nothing certain about the next 30. Use 25x to set your first target, then check it against your own horizon, costs, and tax bill."
        ]
      },
      {
        "heading": "What Social Security covers",
        "paragraphs": [
          "Social Security is the largest guaranteed income most retirees have, and it shrinks the savings target more than any other item. The program replaces a higher share of earnings for lower earners and a lower share for higher earners, by design. The Social Security Administration's 2026 fact sheet puts the replacement at as much as 79% of pre-retirement earnings for very low earners, about 43% for medium earners, and about 28% for maximum earners who claim at full retirement age.",
          "In cash terms, the average retired worker received $2,071 a month in January 2026, after a 2.8% cost-of-living adjustment. That is about $24,850 a year: a floor under retirement spending, not a full income.",
          "Your benefit is set by formula, not by saving. The SSA takes your 35 highest-earning years, adjusts each year for wage growth, and averages them into average indexed monthly earnings (AIME). The 2026 formula then pays 90% of the first $1,286 of AIME, 32% of AIME between $1,286 and $7,749, and 15% of AIME above $7,749. Take an AIME of $5,000: 90% of $1,286 is $1,157.40, and 32% of the remaining $3,714 is $1,188.48, for a monthly benefit of $2,345.80 at full retirement age, about $28,150 a year.",
          "Two more rules shape the number. First, only earnings up to the 2026 wage base of $184,500 count toward your benefit; pay above that line is neither taxed for Social Security nor credited. Second, you need 40 credits, roughly 10 years of work, to qualify for retirement benefits at all. In 2026, $1,890 of covered earnings buys one credit, up to four a year.",
          "When you claim matters as much as what you earned. Full retirement age is 67 for anyone born in 1960 or later. Claiming at 62 cuts the monthly benefit by up to 30%. Each year you wait past full retirement age, up to 70, adds 8% to the benefit. A worker whose full benefit is $2,000 a month gets about $1,400 at 62 and about $2,480 at 70, a difference that compounds across a retirement lasting decades."
        ]
      },
      {
        "heading": "Find the gap your savings must fund",
        "paragraphs": [
          "Subtract guaranteed income from spending before you multiply anything. The formula is: annual retirement spending, minus Social Security, minus any pension or annuity income, equals the gap your savings must fund. Multiply the gap by 25 for your first target.",
          "The table shows how the target moves with spending. Each row uses a realistic Social Security figure for that income level: higher earners get larger checks but a smaller share of their pay replaced.",
          "Notice what the table leaves out: taxes. The gap is spending after tax, but withdrawals from traditional 401(k)s and IRAs arrive before tax. If your withdrawals face a 12% federal rate, funding $36,000 of spending takes $40,909 of withdrawals, $36,000 divided by 0.88, and the target rises to about $1,023,000. Section 8 covers the tax adjustment."
        ],
        "table": {
          "head": [
            "Annual spending",
            "Social Security",
            "Yearly gap",
            "Savings target (25x)"
          ],
          "rows": [
            [
              "$40,000",
              "$24,000",
              "$16,000",
              "$400,000"
            ],
            [
              "$60,000",
              "$24,000",
              "$36,000",
              "$900,000"
            ],
            [
              "$80,000",
              "$30,000",
              "$50,000",
              "$1,250,000"
            ],
            [
              "$100,000",
              "$36,000",
              "$64,000",
              "$1,600,000"
            ]
          ]
        }
      },
      {
        "heading": "Worked example: from spending to monthly savings",
        "paragraphs": [
          "Maya is 45, earns $90,000 a year, and plans to retire at 67. She has $150,000 saved across a 401(k) and an IRA. She wants two numbers: how much she needs, and how much she must save each month to get there. Every step below uses her numbers and shows its arithmetic.",
          "Step 1: set spending. Maya totals a year of bank statements and finds she spends $66,000 a year today. Her mortgage ends at 62, which removes $9,000 a year, and she expects to spend $3,000 a year more on travel. Retirement spending: $66,000 minus $9,000 plus $3,000 equals $60,000 a year.",
          "Step 2: subtract Social Security. Maya checks her my Social Security statement, which estimates $2,000 a month at 67: $24,000 a year, close to the $2,071 national average for retired workers in January 2026.",
          "Step 3: find the gap. $60,000 of spending minus $24,000 of Social Security leaves $36,000 a year for savings to fund. She has no pension.",
          "Step 4: multiply by 25. $36,000 times 25 equals $900,000. That is Maya's savings target at 67, in today's dollars.",
          "Step 5: grow what she has. Maya has 22 years until 67. Assume her $150,000 grows at 6% a year after inflation, an assumption, not a forecast. Compounding at 6% a year for 22 years turns $150,000 into $540,531. Her current savings, left alone, cover more than half the target.",
          "Step 6: find the shortfall. $900,000 minus $540,531 leaves $359,469 still to save.",
          "Step 7: convert the shortfall to a monthly amount. Saving every month for 22 years at 6% a year, each dollar saved monthly builds about $546 by retirement. $359,469 divided by $546 gives about $658 a month. Check: $658 a month builds about $359,400, and $540,531 plus $359,400 equals $899,931, effectively the $900,000 target.",
          "Two notes keep the example honest. First, the 6% real return is a planning assumption: at 5%, the same $150,000 grows to about $438,800 and the monthly figure rises to about $962, while at 7% it falls to about $377. Second, the $658 includes any employer match: if Maya's employer adds $200 a month, she needs $458 from her own pay. Her $658 a month is $7,896 a year, well inside the 2026 401(k) limit of $24,500, so the whole amount fits in tax-advantaged accounts. This example also ignores taxes for clarity; section 8 shows how a 12% tax rate on withdrawals lifts the target."
        ]
      },
      {
        "heading": "Adjusting for early retirement",
        "paragraphs": [
          "Retiring before 67 changes the math three ways: the money must last longer, Social Security starts later, and you get fewer years to save. The 4% rule was tested for 30-year retirements. A 55-year-old retiree may need the portfolio to last 40 years, and a 4% withdrawal rate was never tested for that span.",
          "A lower withdrawal rate covers the longer horizon. At 3.5% instead of 4%, Maya's $36,000 gap needs $36,000 divided by 0.035, which is $1,028,571, about $129,000 more than her age-67 target. The 3.5% figure is a planning choice for a longer retirement, not a finding from Bengen's study.",
          "The bridge years cost more than the gap suggests. From 55 to 62, Maya gets no Social Security, since 62 is the earliest claiming age, so her savings fund the full $60,000 a year, not the $36,000 gap. That is $24,000 a year extra for 7 years: $168,000 of additional withdrawals before her first Social Security check. Those withdrawals also shrink the balance that must then last another three decades.",
          "Early retirement also trims the Social Security check itself. The benefit formula averages your 35 highest-earning years, and years with no earnings enter as zeros. Retiring at 55 after 30 working years means five zero years in the average. And health insurance needs a plan of its own: Medicare starts at 65, so a 55-year-old retiree buys 10 years of coverage on the open market, where costs vary widely by state, plan, and health. Budget the premium from a real quote, not a national average."
        ]
      },
      {
        "heading": "Part-time work changes the target",
        "paragraphs": [
          "Part-time work in the first years of retirement cuts the target two ways at once: the paycheck covers spending, and the portfolio stays untouched longer. The effect is larger than most people expect.",
          "Take Maya's numbers. If she earns $12,000 a year from part-time work for her first five retired years, that covers $60,000 of spending her savings would otherwise fund, and her $900,000 stays invested for five more years instead of shrinking from day one. If the part-time income were permanent, it would cut the target directly: $12,000 times 25 equals $300,000 less to save.",
          "Treat part-time income as a bridge, not a foundation. Health, job markets, and caregiving duties can end it without warning, and a plan that still needs the paycheck at 80 has a hole in it. Count part-time work for the years you can reasonably expect it, then make sure the portfolio covers the gap on its own after that.",
          "One rule catches people who claim Social Security early and keep working. In 2026, the SSA withholds $1 of benefits for every $2 earned above $24,480 by workers under full retirement age for the whole year. The withheld benefits are not lost: the SSA recalculates the monthly amount upward at full retirement age to credit the months benefits were withheld, but the cash flow gap is real in the year it happens."
        ]
      },
      {
        "heading": "Taxes and required minimum distributions",
        "paragraphs": [
          "The 25x target prices spending, not taxes. Withdrawals from a traditional 401(k) or IRA count as ordinary income in the year you take them, so a dollar of spending from those accounts costs more than a dollar of withdrawals. Qualified Roth withdrawals are tax-free, which is why the mix of account types matters as much as the total.",
          "The standard deduction shelters the first slice. For 2026, a single filer subtracts $16,100 and a married couple filing jointly subtracts $32,200 before any federal income tax applies. A single retiree withdrawing $36,000 a year from a traditional IRA has $19,900 of taxable income after the deduction, before counting any taxable Social Security.",
          "Social Security itself can be taxable. Single filers whose combined income, adjusted gross income plus nontaxable interest plus half of Social Security benefits, tops $25,000 may owe federal tax on part of their benefits, and up to 85% of benefits can be taxable at higher incomes. The $25,000 threshold has not moved with inflation since the law was written, so it catches more retirees every year.",
          "Required minimum distributions add a second tax wrinkle. Once you reach 73, or 75 if you were born in 1960 or later, the IRS requires yearly withdrawals from traditional IRAs and 401(k)s whether you need the money or not. The IRS Uniform Lifetime Table sets the divisor: 26.5 at age 73. Maya's $900,000 balance would face a first RMD of $900,000 divided by 26.5, which is $33,962, close to her $36,000 planned withdrawal, so the RMD barely changes year one. But the divisor shrinks every year, 24.6 at 75 and 20.2 at 80, so the required share of the balance climbs with age, and a missed RMD costs a 25% penalty on the shortfall, cut to 10% if corrected within two years.",
          "RMDs are why some retirees convert part of a traditional IRA to a Roth in their 60s, when income, and the tax rate on the conversion, is low. The conversion pays tax now to shrink the balance that future RMDs are calculated on. Whether that trade pays depends on your tax brackets in both decades, so run the numbers or ask a tax professional before converting."
        ]
      },
      {
        "heading": "Closing the gap: where the money goes",
        "paragraphs": [
          "A target only helps if the savings follow it. The order of operations is simple: take the full employer 401(k) match first, since it is an immediate return no investment matches, then fill tax-advantaged accounts to their limits, then save in a taxable account if anything remains.",
          "The 2026 limits set the ceiling. The IRS raised the 401(k) elective deferral limit to $24,500 for 2026, with an $8,000 catch-up for workers 50 and older and an $11,250 catch-up for workers ages 60 to 63 under the SECURE 2.0 Act. The IRA limit is $7,500, with a $1,100 catch-up at 50 and older.",
          "The IRA deduction has an income limit when a workplace plan covers you. For 2026, the deduction phases out between $81,000 and $91,000 of modified adjusted gross income for single filers, and between $129,000 and $149,000 for married couples filing jointly. Above those ranges, a Roth IRA, or a nondeductible traditional IRA, is the route in.",
          "Revisit the target once a year. Spending drifts, Social Security estimates update, markets move, and a number set at 45 will not hold at 55. Maya re-runs her seven steps each January with her actual balance and her latest Social Security estimate, and adjusts the monthly amount by the difference. The target is a compass, not a contract."
        ],
        "table": {
          "head": [
            "Limit for 2026",
            "Amount"
          ],
          "rows": [
            [
              "401(k) elective deferral",
              "$24,500"
            ],
            [
              "401(k) catch-up, age 50+",
              "$8,000 (total $32,500)"
            ],
            [
              "401(k) catch-up, ages 60-63",
              "$11,250 (total $35,750)"
            ],
            [
              "401(k) combined employee + employer",
              "$72,000, plus catch-ups"
            ],
            [
              "IRA",
              "$7,500"
            ],
            [
              "IRA catch-up, age 50+",
              "$1,100 (total $8,600)"
            ]
          ]
        }
      }
    ],
    "seoTitle": "How Much Do I Need to Retire? Find Your Number in 2026",
    "slug": "how-much-do-i-need-to-retire",
    "sources": [
      {
        "label": "Social Security Administration — 2026 Cost-of-Living Adjustment Fact Sheet",
        "url": "https://www.ssa.gov/news/press/factsheets/colafacts2026.pdf"
      },
      {
        "label": "IRS — 401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500 (IR-2025-111)",
        "url": "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500"
      },
      {
        "label": "IRS Publication 590-B — Distributions from Individual Retirement Arrangements",
        "url": "https://www.irs.gov/publications/p590b"
      },
      {
        "label": "Fidelity — What will my savings cover in retirement?",
        "url": "https://www.fidelity.com/viewpoints/retirement/retirement-income-sources"
      }
    ],
    "title": "How Much Do I Need to Retire?",
    "type": "What",
    "updated": "2026-10-13"
  },
  {
    "cornerstone": false,
    "description": "Tax withholding pulls federal income tax from every paycheck before you see it. Learn how the W-4 sets the amount, how to spot a wrong one, and how to fix it.",
    "faqs": [
      {
        "answer": "No — a large refund means you overpaid during the year and lent the IRS money interest-free. The IRS returns the excess without interest, so a $2,600 refund is $2,600 you could have had in your paychecks. Withholding is right when your refund or balance due at filing is close to zero. A new W-4 with the correct entries moves the money from April back into your monthly pay.",
        "question": "Does a big tax refund mean my withholding is right?"
      },
      {
        "answer": "As often as you need to. There is no limit on W-4 submissions and no fee. Each new form replaces the one before it in full, and your employer must apply it no later than the start of the first payroll period ending on or after the 30th day after you submit it. Submit a new one whenever your pay, household, or other income changes.",
        "question": "How often can I change my W-4?"
      },
      {
        "answer": "Your employer withholds no federal income tax from your pay. You can claim exempt only if you had no federal tax liability last year and expect none this year. The claim lasts one year — an exempt W-4 for 2026 expires February 16, 2027 — and claiming exempt when you owe tax leaves the full bill due in April, plus a possible underpayment penalty.",
        "question": "What happens if I write exempt on my W-4?"
      },
      {
        "answer": "No. The federal W-4 controls only federal income tax. Most states with an income tax have their own withholding form — some use the federal W-4, others have a state-specific certificate. Check your state tax agency's form when you update your federal W-4, or your state withholding can drift out of line while the federal amount is correct.",
        "question": "Does federal withholding cover state income tax?"
      },
      {
        "answer": "Yes. The underpayment penalty charges you for paying late during the year, not for the balance itself. Paying the full amount by the filing deadline stops interest and failure-to-pay penalties on the balance, but the underpayment penalty for the quarters you were short still applies — unless a safe harbor covers you. That is why fixing withholding during the year matters more than paying promptly in April.",
        "question": "Can I owe a penalty if I pay my balance in full by April 15?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/what-is-tax-withholding.jpg",
    "imageAlt": "Flat illustration of a paycheck splitting into portions, one flowing to a government building and the rest to a wallet",
    "inlineImage": "/images/what-is-tax-withholding-inline.jpg",
    "inlineImageAlt": "Flat illustration of a blank tax form with a pencil and a dial gauge",
    "intro": "Tax withholding is the income tax your employer takes from each paycheck and sends to the IRS. The amount comes from the Form W-4 you gave your employer. When that form matches your life, withholding lands close to your tax bill. When it does not, you get a big refund or an April bill.",
    "published": "2026-10-10",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Paycheck Calculator",
        "url": "/tax/paycheck-calculator"
      },
      {
        "name": "Take-Home Pay Calculator",
        "url": "/tax/take-home-pay-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How withholding works",
        "paragraphs": [
          "The United States income tax system is pay-as-you-go. The IRS expects tax paid as income is earned, not in one lump sum the following April. For employees, withholding is how that happens: your employer calculates the tax on each paycheck, holds it back, and sends it to the IRS with the employer's own payroll tax deposit. You never handle the money, and the IRS credits it to your account as you earn.",
          "Three federal items come out of most paychecks. Federal income tax is the one your W-4 controls. Social Security tax is 6.2% of wages up to the annual wage base, $184,500 in 2026, and Medicare tax is 1.45% of all wages with no cap. Your employer matches both. An additional Medicare tax of 0.9% applies to wages above $200,000, and only the employee pays that part. Your W-4 changes none of the payroll taxes — only the income tax line.",
          "At filing time, your W-2 reports the year's withholding. Your return compares what you paid against your actual tax. Overpaid, the IRS refunds the difference. Underpaid, you owe the balance. Withholding is an estimate paid in advance, not the tax itself — the return settles the account.",
          "Every new hire completes a W-4 on starting a job. If you never submit one, or submit one without a signature, your employer must withhold as if you were single with no adjustments — no dependents, no extra amounts, no Step 2 entries. For many people that default over-withholds, so a missing form costs money every payday until you file one."
        ]
      },
      {
        "heading": "What the W-4 controls",
        "paragraphs": [
          "Form W-4, the Employee's Withholding Certificate, is the instruction sheet you give your employer. It tells payroll your filing status, whether you have more than one job, what credits to account for, and any extra amount to hold back. Your employer keeps the form; it does not go to the IRS.",
          "The IRS redesigned the form for 2020 and removed withholding allowances. There is no longer a number of allowances to claim, and the old advice to claim 0 or 1 has no place on the current form. The redesigned W-4 uses dollar amounts and yes-or-no steps instead, so the form reflects your actual situation rather than a proxy number.",
          "Only Steps 1 and 5 are required for everyone. A single filer with one job and no dependents completes those two steps and leaves the rest blank. Step 3 uses $2,200 per qualifying child under 17 and $500 per other dependent for 2026, for filers with income of $200,000 or less ($400,000 if married filing jointly). Step 4(c) is the extra withholding line: any dollar amount you enter there comes out of every paycheck on top of the calculated tax.",
          "The IRS recommends a new W-4 each year and whenever your personal or financial situation changes. The form takes a few minutes, and a fresh one replaces the old one in full — you never edit a filed W-4, you submit a new one."
        ],
        "table": {
          "head": [
            "Step",
            "What it covers",
            "Who completes it"
          ],
          "rows": [
            [
              "1",
              "Personal information and filing status",
              "Everyone"
            ],
            [
              "2",
              "Multiple jobs or spouse works",
              "Two jobs, or married filing jointly with a working spouse"
            ],
            [
              "3",
              "Dependents and credits",
              "Anyone claiming the child tax credit or credit for other dependents"
            ],
            [
              "4",
              "Other adjustments (optional)",
              "Other income, deductions, extra withholding"
            ],
            [
              "5",
              "Signature and date",
              "Everyone"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Your refund or balance due topped $1,000 last year",
          "You started or left a second job",
          "Your pay rose or fell sharply",
          "You married, divorced, or had a child",
          "You started earning income with no withholding, such as interest or freelance pay"
        ],
        "heading": "How to tell if your withholding is wrong",
        "paragraphs": [
          "Your last tax return is the clearest signal. A refund over $1,000 means you lent the IRS that money interest-free all year. A balance due means you paid too little during the year — and a balance over $1,000 can also trigger an underpayment penalty, unless a safe harbor covers you. Neither outcome changes your total tax; both mean the timing was wrong.",
          "You do not have to wait for April to find out. Mid-year, multiply the federal income tax withheld on one pay stub by your total number of pay periods for the year and compare the result with a rough estimate of your annual tax. If the projection lands more than about $500 from your expected bill, your W-4 needs attention. The IRS Tax Withholding Estimator does this math for you.",
          "Watch for the quiet causes. A raise, a second job, a spouse returning to work, freelance income, or a child aging out of the child tax credit all change the right withholding amount without changing your W-4. Payroll software cannot see any of those changes — it withholds on the instructions you last gave it."
        ]
      },
      {
        "heading": "The IRS Tax Withholding Estimator",
        "paragraphs": [
          "The IRS Tax Withholding Estimator is a free tool on IRS.gov that checks your withholding against your expected tax for the year. It asks about your income, filing status, dependents, and the withholding shown on your most recent pay stubs, then tells you whether you are on track and, if not, what to enter on a new W-4.",
          "Gather your latest pay stub for each job, your most recent tax return, and any records of income without withholding — interest, dividends, freelance pay, or retirement distributions. The estimator works best with the year's actual numbers rather than guesses, and it does not save your information or ask you to log in.",
          "The estimator's output is a specific W-4 recommendation, including an extra withholding amount for line 4(c) if you need one. Use it in the middle of the year, when there is still time for a corrected W-4 to change the outcome, and again after any major pay or family change.",
          "If you are married filing jointly, run the estimator with both spouses' pay stubs in hand. It accounts for two incomes and tells you which spouse's W-4 should carry any adjustment, which the paper worksheet cannot do as cleanly. The estimator is built for employees with wage income; if most of your income is self-employment income, the Form 1040-ES worksheet fits better."
        ]
      },
      {
        "heading": "How to fix it with a new W-4",
        "paragraphs": [
          "The fix is one form. Download the current year's Form W-4 from IRS.gov, complete it with your current situation, sign it, and give it to your employer's payroll department. There is no fee, no IRS filing, and no limit on how often you can submit a new one.",
          "For most corrections, two lines do the work. Step 2(c) — the checkbox for two jobs — or the Multiple Jobs Worksheet fixes the double standard deduction problem when two jobs each withhold as if they were your only income. Line 4(c) adds a flat extra amount per paycheck, which is the simplest fix for income with no withholding: divide the tax that income will create by your remaining pay periods and enter the result.",
          "Your employer must put the new form into effect no later than the start of the first payroll period ending on or after the 30th day after you submit it. In practice most payroll departments apply it to the next cycle. Check the following pay stub: the federal income tax line should move in the direction you intended.",
          "A late-year fix still helps. The IRS treats withholding as paid evenly through the year, so extra withholding in November and December counts toward earlier quarters too. Estimated tax payments do not get that treatment — they count only when paid — which is why a W-4 fix beats a year-end estimated payment for closing a gap."
        ]
      },
      {
        "heading": "Worked example: single filer on a $75,000 salary",
        "paragraphs": [
          "Dana is single, earns $75,000 a year, is paid every two weeks, and takes the standard deduction. Her 2026 standard deduction is $16,100, so her taxable income is $58,900. Her federal income tax works out to $7,670: 10% on the first $12,400 ($1,240), 12% on the next $38,000 ($4,560), and 22% on the remaining $8,500 ($1,870).",
          "Payroll taxes add $5,737.50: Social Security at 6.2% of $75,000 is $4,650, and Medicare at 1.45% is $1,087.50. Her total federal withholding for the year should be $13,407.50, leaving take-home pay of $61,592.50.",
          "Dana's problem: her W-4 still carries a $100 extra withholding entry on line 4(c) from a side job that ended two years ago. That is $2,600 a year — $100 times 26 paychecks — withheld beyond her $7,670 tax bill. Every April she gets a refund of about $2,600 and calls it a bonus. It is her own money, returned months late with no interest.",
          "The fix takes one form. She submits a new W-4 with line 4(c) blank. Her federal income tax withholding drops to $295.00 per check, her net pay rises by $100 to $2,468.94, and her April refund drops to near zero. Her total tax is unchanged at $7,670 — only the timing changes.",
          "Check the result on the next pay stub. The federal income tax line should read $295.00, and the year-to-date total should track $295.00 times the number of checks issued. If the line does not move after a month, ask payroll whether the new form was received — a form handed to a manager instead of payroll is a common reason a fix never takes effect."
        ],
        "table": {
          "head": [
            "Biweekly paycheck",
            "Amount"
          ],
          "rows": [
            [
              "Gross pay",
              "$2,884.62"
            ],
            [
              "Federal income tax",
              "$295.00"
            ],
            [
              "Social Security (6.2%)",
              "$178.85"
            ],
            [
              "Medicare (1.45%)",
              "$41.83"
            ],
            [
              "Net pay",
              "$2,368.94"
            ]
          ]
        }
      },
      {
        "heading": "The underpayment penalty and the safe harbors",
        "paragraphs": [
          "Paying too little during the year can cost more than the balance due. The IRS charges an underpayment penalty — computed as interest on the shortfall, at a rate that changes quarterly — when withholding and estimated payments fall short. The penalty is calculated on Form 2210, quarter by quarter, so a shortfall early in the year costs more than one in December.",
          "Three safe harbors remove the penalty. You owe none if your withholding and timely estimated payments reach the smaller of 90% of the current year's tax or 100% of the prior year's tax. If your prior-year adjusted gross income was over $150,000 ($75,000 if married filing separately), the prior-year figure rises to 110%. And no penalty applies at all if you owe less than $1,000 after withholding and refundable credits.",
          "Apply the numbers to Dana. Suppose she also earns $15,000 of interest income with no withholding. That income is taxed at her 22% marginal rate, adding $3,300 to her bill: $10,970 total tax against $7,670 withheld. She owes $3,300 in April. But she owes no penalty: her $7,670 of withholding equals 100% of her prior-year tax of $7,670, so the prior-year safe harbor covers her. The safe harbor removes the penalty, not the balance — she still pays the $3,300.",
          "The fix is line 4(c). Dividing the $3,300 of extra tax by 26 paychecks gives about $127 per check. With that entry, her withholding covers the interest income as the year goes on, and the April balance disappears."
        ],
        "table": {
          "head": [
            "Safe harbor",
            "What you must pay during the year"
          ],
          "rows": [
            [
              "Current-year test",
              "90% of this year's total tax"
            ],
            [
              "Prior-year test",
              "100% of last year's total tax"
            ],
            [
              "Prior-year test, higher income",
              "110% of last year's total tax (prior-year AGI over $150,000)"
            ],
            [
              "Small balance exception",
              "Owe under $1,000 at filing"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Starting a new job, or a second job",
          "Getting married or divorced",
          "A spouse starting or stopping work",
          "Having a child, or a child turning 17 and leaving the child tax credit",
          "A large raise, bonus, or pay cut",
          "Starting freelance work or other income with no withholding",
          "Buying or selling a home, if it changes whether you itemize"
        ],
        "heading": "When to recheck your withholding",
        "paragraphs": [
          "Withholding is set-and-forget only while your life stands still. The IRS recommends a fresh check each year and after any change to your income or household. A five-minute review after each of these events keeps the April surprise small.",
          "The two-job case deserves special attention. Each employer's payroll system applies the full standard deduction to that job's pay, so two jobs together under-withhold by roughly the tax on one standard deduction. Step 2 of the W-4 exists for exactly this situation — check the box in Step 2(c) when there are only two jobs, or use the estimator for three or more.",
          "Run one more check every January. The new year brings new withholding tables and new tax figures, and a January review catches a stale line 4(c) entry before it runs for twelve more months. A bonus is another trigger: employers may withhold on bonuses and commissions at the 22% flat supplemental rate, which can over- or under-shoot your marginal rate and leave a gap or a surplus to fix with the next W-4."
        ]
      },
      {
        "heading": "Withholding or estimated tax",
        "paragraphs": [
          "Withholding covers wages. Income without an employer — freelance pay, business income, rent, interest, dividends, capital gains — has no withholding unless you arrange it. If you expect to owe $1,000 or more after withholding and refundable credits, the IRS generally expects quarterly estimated tax payments on Form 1040-ES.",
          "Employees with side income can usually skip estimated payments by raising withholding instead. Line 4(c) on the W-4 sends extra tax from every paycheck, and because withholding counts as paid evenly through the year, it covers earlier quarters that an estimated payment made in December would miss. That makes the W-4 the simpler tool whenever a paycheck is available to carry the extra tax.",
          "Estimated payments follow a quarterly schedule: April 15, June 15, and September 15 of the tax year, and January 15 of the following year. Miss a quarter and the underpayment penalty applies to that quarter even if a later payment covers the annual total. If your income arrives unevenly, the annualized installment method on Schedule AI of Form 2210 lets you match payments to when the income actually arrived.",
          "Either route works. The test is the same: pay at least the safe-harbor amount, on time, through the year. Withholding does it automatically once the W-4 is right; estimated payments need four dates a year and your own discipline."
        ]
      },
      {
        "heading": "Common W-4 mistakes",
        "paragraphs": [
          "Most withholding errors come from a form that was right once and never revisited, or from one step filled in wrong. Each of these mistakes is common, and each is fixed by submitting a corrected W-4 — no amended return, no IRS contact, no penalty for the correction itself.",
          "One error to check first is line 4(b). It takes only the deductions above your standard deduction, not your full itemized total. Entering the full total double-counts the standard deduction and under-withholds for the year. The Deductions Worksheet on page 3 of the form computes the right figure; use it rather than guessing."
        ],
        "bullets": [
          "Using an old form, or old answers from the allowances era",
          "Skipping Step 2 when you have two jobs or a working spouse",
          "Entering extra withholding on line 4(c) and forgetting it is there",
          "Claiming exempt without meeting both no-liability tests",
          "Leaving Step 3 unchanged after a child turns 17",
          "Entering full itemized deductions on line 4(b) instead of only the excess over the standard deduction"
        ]
      }
    ],
    "seoTitle": "What Is Tax Withholding and How to Fix Yours in 2026",
    "slug": "what-is-tax-withholding",
    "sources": [
      {
        "label": "IRS — About Form W-4, Employee's Withholding Certificate",
        "url": "https://www.irs.gov/forms-pubs/about-form-w-4"
      },
      {
        "label": "IRS — Tax Withholding Estimator",
        "url": "https://www.irs.gov/individuals/tax-withholding-estimator"
      },
      {
        "label": "IRS — Topic No. 306, Penalty for Underpayment of Estimated Tax",
        "url": "https://www.irs.gov/taxtopics/tc306"
      },
      {
        "label": "IRS — IR-2025-103, tax inflation adjustments for tax year 2026",
        "url": "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill"
      }
    ],
    "title": "What Is Tax Withholding and How to Fix It",
    "type": "What",
    "updated": "2026-10-10"
  },
  {
    "cornerstone": false,
    "description": "An HSA and an FSA both pay medical costs with pre-tax dollars, but the rules differ sharply. Compare 2026 limits, tax savings, rollover, and portability.",
    "faqs": [
      {
        "answer": "Yes, but only with a limited-purpose FSA or a post-deductible FSA. A general-purpose health FSA disqualifies you from contributing to an HSA because it counts as coverage that pays medical costs before your HDHP deductible. A limited-purpose FSA covers only dental and vision expenses, so the IRS allows it alongside an HSA. A post-deductible FSA pays only after you meet your HDHP deductible, which is also allowed.",
        "question": "Can I have an HSA and an FSA at the same time?"
      },
      {
        "answer": "Nothing — the HSA is yours and it goes with you. Contributions your employer made are your property and cannot be reclaimed. You keep the account, the balance, and the ability to spend it on qualified medical expenses. You can only keep contributing if your new coverage is also a qualifying HDHP, but the existing balance stays available regardless of your new plan or employer.",
        "question": "What happens to my HSA if I change jobs?"
      },
      {
        "answer": "It is generally forfeited under the use-it-or-lose-it rule. Your plan may soften this in one of two ways, but not both: a carryover of up to $680 into the next plan year, or a grace period of up to two and a half months to incur expenses against the old balance. Any amount above the carryover cap is still lost, and a plan is not required to offer either option. Check your plan documents before open enrollment.",
        "question": "What happens to unused FSA money at the end of the year?"
      },
      {
        "answer": "Yes, but it costs you. Before age 65, a non-medical withdrawal is taxed as ordinary income plus an additional 20% tax. From age 65, the 20% penalty disappears and the withdrawal is taxed as ordinary income only, the same as a traditional IRA distribution. Medical withdrawals are tax-free at any age. The 20% penalty also does not apply if you become disabled.",
        "question": "Can I use HSA money for non-medical expenses?"
      },
      {
        "answer": "The HSA, on every measure. Its 2026 limit is higher — $4,400 self-only versus $3,400 for an FSA — so the upfront tax saving is larger: $1,304.60 versus $1,008.10 in the 22% bracket with payroll contributions. The HSA also grows tax-free and pays out tax-free for medical costs, while FSA money cannot be invested. The FSA's only edge is that the full election is available on day one.",
        "question": "Which saves more in taxes, an HSA or an FSA?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/hsa-vs-fsa.jpg",
    "imageAlt": "Flat-vector illustration of a balance scale holding a medical savings pouch and a stack of coins",
    "inlineImage": "/images/hsa-vs-fsa-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a first-aid kit beside a potted plant with coins at its base",
    "intro": "For most people with access to both, the HSA wins. It holds more money, the balance rolls over every year, it stays with you when you change jobs, and it is tax-free going in, growing, and coming out for medical costs. An FSA still makes sense when you cannot get an HSA or expect large bills this year.",
    "published": "2026-10-21",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "HSA Triple Tax Advantage",
        "url": "/personal-wealth/hsa-triple-tax-advantage-calculator"
      },
      {
        "name": "Paycheck Calculator",
        "url": "/tax/paycheck-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What an HSA is",
        "paragraphs": [
          "A health savings account (HSA) is an individually owned savings account for medical costs. You can open one only if you are covered by a qualifying high-deductible health plan (HDHP), and you use the money to pay qualified medical expenses for yourself, your spouse, and your dependents. Qualified expenses include deductibles, copays, prescriptions, dental work, vision care, and many over-the-counter items.",
          "The HSA is the only account in the tax code with a triple tax advantage. Money goes in pre-tax, grows tax-free, and comes out tax-free when you spend it on qualified medical expenses. No other mainstream account does all three: a 401(k) or traditional IRA taxes the withdrawals, and a Roth IRA taxes the contributions.",
          "Contributions are either excluded from your income when they come out of your paycheck through your employer, or deductible on your tax return when you contribute directly. The deduction is available whether or not you itemize. There are no income limits on who can contribute, and you do not need earned income to put money in.",
          "The account is yours. Contributions your employer makes become your property and cannot be taken back. The balance rolls over in full every year, with no deadline to spend it and no requirement to withdraw anything in any given year. You can also keep contributing for a tax year until the tax-filing deadline in April of the following year, which gives you months after year-end to top up."
        ]
      },
      {
        "heading": "What an FSA is",
        "paragraphs": [
          "A health flexible spending arrangement (FSA) is an employer-run plan that lets you set aside part of your salary, before tax, to pay qualified medical expenses. Unlike an HSA, an FSA is not an account you own. It is a benefit your employer offers through a cafeteria plan, and it exists only while you work for that employer.",
          "At the start of each plan year you elect how much to contribute for the year, and your employer deducts that amount from your paychecks in equal installments. Your election is locked in for the year. You can change it mid-year only if the law and your plan allow it, typically after a qualifying life event such as marriage, a birth, or a change in employment.",
          "The FSA has one feature the HSA cannot match: the full amount you elect is available to you from the first day of the plan year, even though you have not contributed it yet. If you elect $3,400 and need a $2,000 dental procedure in January, the plan reimburses the $2,000 before you have put more than a few paychecks in. If you leave the job partway through the year, you do not repay the difference.",
          "The trade-off is the use-it-or-lose-it rule. Money left in the FSA at the end of the plan year is generally forfeited. Your plan may soften this with a carryover or a grace period, covered below, but neither is guaranteed. An FSA is a spending tool for costs you expect this year, not a savings vehicle."
        ]
      },
      {
        "bullets": [
          "HSA: requires a qualifying HDHP, no other disqualifying coverage, no Medicare enrollment, and no dependent status.",
          "FSA: requires only that your employer offers one. It works with any health plan, including a low-deductible plan.",
          "Both spouses can hold their own accounts. Each spouse's FSA election is separate, and each spouse 55 or older needs a separate HSA for the catch-up contribution."
        ],
        "heading": "Who qualifies for each",
        "paragraphs": [
          "Eligibility is where the two accounts diverge most. An HSA has strict conditions set by the tax code. An FSA has almost none beyond working for an employer that offers one.",
          "To contribute to an HSA, you must be covered by a qualifying HDHP on the first day of the month. For 2026, a qualifying HDHP must have an annual deductible of at least $1,700 for self-only coverage or $3,400 for family coverage, and it must cap annual out-of-pocket costs at no more than $8,500 for self-only coverage or $17,000 for family coverage. Premiums do not count toward the out-of-pocket cap. A plan that calls itself high-deductible but misses either test does not qualify.",
          "Three more conditions apply. You must have no other disqualifying health coverage, you must not be enrolled in Medicare, and you must not be claimable as a dependent on someone else's tax return. Enrolling in Medicare sets your HSA contribution limit to zero from the first month of Medicare coverage, including retroactive coverage.",
          "One trap catches people every open enrollment: a general-purpose health FSA disqualifies you from contributing to an HSA, because the FSA counts as other coverage that pays medical costs before the deductible. The exception is a limited-purpose FSA, which covers only dental and vision costs, or a post-deductible FSA, which pays only after you meet the HDHP deductible. Either can sit alongside an HSA."
        ]
      },
      {
        "heading": "2026 contribution limits",
        "paragraphs": [
          "The IRS sets both limits each year for inflation. For 2026, the HSA holds considerably more than the FSA, and the gap widens further for people 55 and older.",
          "The HSA limit covers all contributions to the account from every source. If your employer seeds your HSA with $1,000, you can add only $3,400 more under self-only coverage. The FSA limit applies per employee, so two working spouses can each elect the full amount under their own employer's plan.",
          "Your HSA limit is prorated by the number of months you were HSA-eligible during the year. If you had qualifying HDHP coverage for only six months, your limit is half the annual figure. One exception, the last-month rule, lets you contribute the full annual amount if you are eligible on December 1, but only if you stay eligible through the end of the following year."
        ],
        "table": {
          "head": [
            "Limit for 2026",
            "HSA",
            "Health FSA"
          ],
          "rows": [
            [
              "Self-only coverage",
              "$4,400",
              "$3,400 per employee"
            ],
            [
              "Family coverage",
              "$8,750",
              "No family limit"
            ],
            [
              "Catch-up at age 55+",
              "$1,000",
              "None"
            ],
            [
              "Maximum carryover",
              "Full balance, every year",
              "$680, if the plan allows it"
            ],
            [
              "Employer contributions",
              "Count toward the limit",
              "Follow the plan's rules"
            ]
          ]
        }
      },
      {
        "heading": "How the tax savings compare",
        "paragraphs": [
          "Both accounts cut your federal income tax, but the HSA cuts more because it holds more, and its growth is never taxed. The arithmetic below uses the 22% federal income tax bracket, which covers a wide band of middle-income single filers and married couples in 2026.",
          "Contribute the full $4,400 to an HSA and you save $968 in federal income tax: $4,400 × 0.22 = $968. If the contribution comes out of your paycheck through your employer's cafeteria plan, you also skip the 7.65% employee share of Social Security and Medicare taxes, worth another $336.60: $4,400 × 0.0765 = $336.60. Total tax saved: $1,304.60. Contributions you make directly to an HSA, outside payroll, save the income tax but not the payroll taxes.",
          "The same math on a $3,400 FSA election saves $748 in federal income tax ($3,400 × 0.22) plus $260.10 in payroll taxes ($3,400 × 0.0765), for a total of $1,008.10. The FSA's lower limit caps the saving about $296 below the HSA's, and the FSA offers nothing on growth because the money cannot be invested.",
          "The HSA's third advantage compounds over time. Money you invest inside an HSA grows tax-free, and withdrawals for medical costs are tax-free too. An FSA balance earns nothing and must be spent within the plan year or the short carryover window. Over a decade of maxing out an HSA and paying small bills out of pocket, the tax-free growth alone can exceed the FSA's entire annual tax saving.",
          "One caution: state tax treatment does not always follow the federal rules. A few states tax HSA contributions or earnings even though the federal government does not. Check your state's treatment before assuming the full triple advantage applies to your state return."
        ]
      },
      {
        "heading": "HSA vs FSA at a glance",
        "paragraphs": [
          "The table below puts the decision in one place. The rows that matter most for most people are rollover, portability, and investing: the three areas where the accounts are not close."
        ],
        "table": {
          "head": [
            "Feature",
            "HSA",
            "Health FSA"
          ],
          "rows": [
            [
              "Who owns it",
              "You",
              "Your employer's plan"
            ],
            [
              "Requires an HDHP",
              "Yes",
              "No"
            ],
            [
              "2026 contribution limit",
              "$4,400 self-only / $8,750 family",
              "$3,400 per employee"
            ],
            [
              "Catch-up at 55+",
              "$1,000",
              "None"
            ],
            [
              "Unused money at year-end",
              "Rolls over in full",
              "Forfeited, except carryover or grace period"
            ],
            [
              "Portability",
              "Stays with you for life",
              "Ends when you leave the job"
            ],
            [
              "Investing",
              "Yes, tax-free growth",
              "No"
            ],
            [
              "Tax on medical withdrawals",
              "Tax-free",
              "Tax-free"
            ],
            [
              "Tax on non-medical withdrawals",
              "Income tax + 20% penalty before 65",
              "Not allowed"
            ],
            [
              "Full amount available day one",
              "No, only what is in the account",
              "Yes, full election upfront"
            ],
            [
              "Deadline to contribute",
              "Tax-filing deadline in April",
              "Set at open enrollment"
            ]
          ]
        }
      },
      {
        "heading": "What you can spend the money on",
        "paragraphs": [
          "Both accounts pay for the same thing: qualified medical expenses, the medical care costs defined in section 213(d) of the tax code. That covers deductibles, copays, and coinsurance, prescription drugs, dental treatment, eye exams and glasses, mental health care, and many over-the-counter items. Expenses for your spouse and dependents count too, even if they are not on your health plan.",
          "Over-the-counter medicine qualifies whether or not a doctor prescribed it, and menstrual care products count as medical care. The same list applies to both accounts, so the choice between an HSA and an FSA never turns on what you can buy.",
          "Insurance premiums are the main exception. You generally cannot pay premiums from an HSA, with four exceptions: long-term care insurance (up to age-based limits the IRS adjusts each year), COBRA continuation coverage, health coverage while you receive unemployment compensation, and Medicare premiums once you are 65 or older. Medigap premiums are excluded.",
          "Keep the receipt for everything. Both accounts reimburse you tax-free only for qualified expenses, and the IRS can ask you to prove it. HSA providers and FSA administrators may ask for documentation before they pay a claim, and if you reimburse yourself from an HSA years after the expense, the receipt is your only proof."
        ]
      },
      {
        "heading": "What happens to the money over time",
        "paragraphs": [
          "Time is the HSA's greatest advantage. The balance rolls over in full every year, for as many years as you hold the account, with no spending deadline. You do not have to withdraw anything in any given year, so you can pay small medical bills out of pocket, keep the receipts, and let the HSA balance grow. The IRS requires only that the expense was incurred after you established the HSA.",
          "Most HSA providers let you invest part of the balance once it reaches a modest size, typically in mutual funds or exchange-traded funds. Investment earnings inside the account are tax-free, and withdrawals for qualified medical expenses stay tax-free. An HSA used this way doubles as a retirement account for future health costs, which is why financial planners often call it the most tax-efficient account available.",
          "An FSA runs on the opposite clock. Unused money at the end of the plan year is forfeited, unless your plan offers one of two relief valves. A carryover lets up to $680 of unused 2026 money roll into the next plan year; anything above $680 is still lost, and the carryover does not reduce next year's $3,400 election limit. A grace period instead gives you up to two and a half months after year-end to incur expenses against the old balance. A plan can offer a carryover or a grace period, but never both, and it can offer neither.",
          "Portability follows the same split. Your HSA is yours for life. Change jobs, retire, or go self-employed, and the account and its balance go with you. An FSA belongs to your employer's plan, so leaving the job generally ends it. You may be able to continue an FSA under COBRA by paying the full cost yourself, but few people find that worthwhile for a spending account."
        ]
      },
      {
        "heading": "What happens at age 65",
        "paragraphs": [
          "Age 65 changes the HSA in two ways. First, enrolling in Medicare ends your ability to contribute. Your contribution limit drops to zero from the first month of Medicare coverage, so if you enroll in Medicare at 65, stop HSA contributions the month before. Second, the penalty on non-medical withdrawals disappears.",
          "Before 65, an HSA withdrawal for anything other than qualified medical expenses is taxed as ordinary income and hit with an additional 20% tax. From age 65, the 20% penalty goes away. Non-medical withdrawals are still taxed as ordinary income, exactly like withdrawals from a traditional IRA, but there is no extra penalty. Medical withdrawals stay tax-free at any age.",
          "The HSA stays useful in retirement. You can use it tax-free to pay Medicare premiums, including Parts A, B, and D and Medicare Advantage premiums, for yourself and your spouse. The one exception is premiums for a Medicare supplemental policy such as Medigap, which are not a qualified medical expense. Long-term care insurance premiums also qualify, up to age-based limits the IRS adjusts each year.",
          "The FSA has no age-65 story. It is tied to your job, so it ends when your employment ends, and any balance left at that point is forfeited under the same use-it-or-lose-it rule. If you are still working at 65 and your employer offers an FSA, it works the same way it did at 45."
        ]
      },
      {
        "bullets": [
          "Pick the HSA if you have a qualifying HDHP and can afford to contribute beyond your expected medical bills.",
          "Pick the FSA if you are on a low-deductible plan, are on Medicare, or expect a large known bill early in the year.",
          "Pick both if your employer offers a limited-purpose FSA alongside an HDHP: HSA for saving, FSA for planned dental and vision costs."
        ],
        "heading": "Which account should you choose?",
        "paragraphs": [
          "If you have a qualifying HDHP, choose the HSA. It holds more money, the balance never expires, it follows you between jobs, the money can be invested, and it is the only account with the triple tax advantage. Fund it first, up to the limit, before putting extra money into a taxable brokerage account for medical costs.",
          "Choose the FSA when you cannot get an HSA. That covers anyone on a low-deductible plan, anyone enrolled in Medicare, and anyone whose employer does not offer an HDHP. The FSA's tax saving is real: $1,008.10 on a full $3,400 election in the 22% bracket, including payroll tax savings. The key is to elect only what you are confident you will spend, so the use-it-or-lose-it rule does not eat the saving.",
          "The FSA also wins in one narrow case even when you have an HSA: a large, known expense early in the year. Because the full FSA election is available on day one, a $3,400 FSA covers a January surgery immediately, while an HSA only has what you have put in so far. If you expect a big bill in the first months of the year, a limited-purpose FSA for dental and vision costs can sit alongside your HSA and cover those bills upfront.",
          "If you can have both, use both. Pair a maxed-out HSA with a limited-purpose FSA for predictable dental and vision costs, and keep the HSA invested for the long term. If you can have only one, the HSA is the better account for almost everyone who qualifies."
        ]
      }
    ],
    "seoTitle": "HSA vs FSA: Which Is Better in 2026? Compare the Two",
    "slug": "hsa-vs-fsa",
    "sources": [
      {
        "label": "IRS Revenue Procedure 2025-19 — 2026 HSA and HDHP limits",
        "url": "https://www.irs.gov/pub/irs-drop/rp-25-19.pdf"
      },
      {
        "label": "IRS Revenue Procedure 2025-32 — 2026 health FSA limit and carryover",
        "url": "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf"
      },
      {
        "label": "IRS Publication 969 — Health Savings Accounts and Other Tax-Favored Health Plans",
        "url": "https://www.irs.gov/publications/p969"
      },
      {
        "label": "IRS Publication 15-B (2026) — Employer's Tax Guide to Fringe Benefits",
        "url": "https://www.irs.gov/publications/p15b"
      }
    ],
    "title": "HSA vs FSA: Which Is Better?",
    "type": "Comparison",
    "updated": "2026-10-21"
  },
  {
    "cornerstone": false,
    "description": "Seven common tax mistakes — wrong filing status, stale withholding, missed deadlines — with the dollar cost of each and how to avoid them for tax year 2026.",
    "faqs": [
      {
        "answer": "Claiming a credit you do not qualify for, usually the earned income credit. The IRS claws back the full amount plus interest, can add a 20% erroneous-claim penalty, and can ban you from the credit for two years — ten if it finds fraud. A single wrong $4,427 claim can cost over $5,300 before interest, which is more than any of the other mistakes on this list.",
        "question": "What is the most expensive tax mistake?"
      },
      {
        "answer": "April 15, June 15, and September 15, 2026, with the final installment due January 15, 2027. Each installment is generally one quarter of the tax you expect to owe for the year. You avoid the underpayment penalty by paying at least 90% of the current year's tax, or 100% of last year's tax — 110% if last year's adjusted gross income was over $150,000.",
        "question": "When are 2026 estimated tax payments due?"
      },
      {
        "answer": "Yes. IRA contributions for 2026 can be made until April 15, 2027, the filing deadline, up to $7,500 — or $8,600 if you are 50 or older. A 401(k) is different: elective deferrals must come out of paychecks by December 31, 2026, with no grace period. Do not assume the IRA deadline applies to your workplace plan.",
        "question": "Can I still contribute to an IRA for 2026 after the year ends?"
      },
      {
        "answer": "The failure-to-file penalty is 5% of the tax you owe per month, so if you owe nothing, there is no penalty. File anyway: you may be owed a refund, and you generally have three years from the filing deadline to claim it before the IRS keeps it. Filing also starts the clock on the years the IRS has to audit the return.",
        "question": "What happens if I file late but do not owe tax?"
      },
      {
        "answer": "Yes. All income is taxable whether or not a form reports it. The $2,000 threshold for 2026 only controls whether the payer must file a Form 1099-NEC — it does not change what you owe. Track every payment you receive, including small jobs and cash, and report the full amount. Unreported income found later draws tax plus failure-to-pay penalties and interest.",
        "question": "Do I have to report income if I did not get a 1099?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/tax-mistakes-that-cost-you-money.jpg",
    "imageAlt": "Flat vector illustration of a tax form with a magnifying glass and a warning triangle, in deep emerald and burnt orange on a cream background",
    "inlineImage": "/images/tax-mistakes-that-cost-you-money-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of gold coins slipping through a crack in the ground, in deep emerald and burnt orange on a cream background",
    "intro": "Tax mistakes are oversights — the wrong filing status, a W-4 that no longer matches your life, a deadline you assumed was later than it is. Each one has a dollar cost, and several compound: a missed payment draws interest, a wrong credit draws a penalty. The seven most common for 2026 follow, with how to avoid each.",
    "published": "2026-10-17",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Tax Calculator",
        "url": "/tax/tax-calculator"
      },
      {
        "name": "Income Tax Calculator",
        "url": "/tax/income-tax-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Why small mistakes cost real money",
        "paragraphs": [
          "The tax code gives you no credit for good intentions. A return filed with the wrong status, a payment made one quarter late, or a credit claimed on a guess all produce the same result: money leaves your account that did not have to. The IRS charges interest on underpayments at a rate it resets every quarter — 7% a year for the quarter that began October 1, 2026 — and penalties stack on top of interest, not instead of it.",
          "The other pattern in this guide is money left on the table. The wrong filing status, a skipped itemizing comparison, or a missed retirement contribution does not trigger a bill. It quietly raises the tax you pay, and you never get a notice telling you. The table below summarizes all seven mistakes and what each one typically costs. The sections that follow work through them one at a time."
        ],
        "table": {
          "head": [
            "Mistake",
            "What it typically costs"
          ],
          "rows": [
            [
              "Wrong filing status",
              "Hundreds to thousands in extra tax — the head-of-household standard deduction is $8,050 higher than single for 2026"
            ],
            [
              "Stale withholding",
              "A large April bill, plus interest if the shortfall is big enough"
            ],
            [
              "Skipping the itemizing comparison",
              "The tax on every dollar of deductions above the standard deduction you never claimed"
            ],
            [
              "Ignoring estimated tax",
              "Interest at 7% a year on each late quarterly payment"
            ],
            [
              "Missing retirement deadlines",
              "A lost year of tax-deferred room you cannot buy back"
            ],
            [
              "Forgetting the 1099-NEC change",
              "Unreported income taxed later, with penalties and interest"
            ],
            [
              "Claiming credits you do not qualify for",
              "Repayment plus interest, a 20% penalty, and a ban of up to 10 years"
            ]
          ]
        }
      },
      {
        "heading": "1. Filing with the wrong status",
        "paragraphs": [
          "Your filing status sets your standard deduction and your tax brackets, so it changes your bill before a single deduction is considered. For 2026 the standard deduction is $16,100 for single filers, $24,150 for heads of household, and $32,200 for married couples filing jointly. Pick the wrong one and you pay tax on income you did not have to.",
          "The most common error is filing as single when you qualify as head of household. The test is strict: you must be unmarried, have paid more than half the cost of keeping up your home, and have a qualifying person living with you for more than half the year. A single parent who meets that test and files as single instead gives up $8,050 of deduction — $24,150 minus $16,100. At the 12% marginal rate that is $966 of extra tax, every year, for one checkbox.",
          "Married couples make the opposite error: filing separately by default, or because one spouse wants to keep a student loan payment low, without comparing the joint return. Separate filers cannot claim the earned income credit, and several other credits and deductions shrink or disappear. Run both versions before you choose; the joint return wins most of the time, but the comparison takes minutes and the cost of skipping it is real."
        ]
      },
      {
        "heading": "2. Not adjusting withholding after a life change",
        "paragraphs": [
          "Your W-4 tells your employer how much tax to hold back from each paycheck. It reflects your life on the day you filled it in — and nothing after that. A raise, a second job, a marriage, a divorce, a child, or a spouse who stops working all change the right amount. If you never update the form, the withholding keeps answering last year's question.",
          "The cost shows up in April. A household that is $200 a month short on withholding owes $2,400 at filing, all at once, and if the shortfall is large enough it can also draw an underpayment penalty. The IRS offers a free Tax Withholding Estimator that walks through your pay, your spouse's pay, and your deductions, and tells you what to put on a new W-4. It takes about ten minutes; the alternative is a surprise bill.",
          "Check withholding at least once a year, and always after a life change. Two-income households need the check most: each employer withholds as if its paycheck were your only income, so the second income is often under-withheld. The fix is a new W-4 with an extra withholding amount on the line provided for it — a number you choose, not a guess."
        ]
      },
      {
        "heading": "3. Skipping the standard-deduction comparison",
        "paragraphs": [
          "For 2026 the standard deduction is $16,100 single, $24,150 head of household, and $32,200 married filing jointly. Most filers take it, and most should. The mistake is taking it without checking whether your itemized deductions add up to more — mortgage interest, charitable gifts, and state and local taxes paid during the year. The comparison costs five minutes. Skipping it costs the tax on every dollar you could have deducted above the standard amount.",
          "Take a married couple with $24,000 of mortgage interest, $7,000 of charitable donations, and $4,000 of state and local taxes. Their itemized total is $35,000 — $2,800 above the $32,200 standard deduction. At a 22% marginal rate, itemizing saves $616. If the same couple takes the standard deduction without thinking, that $616 is gone. The math flips the other way for many filers, which is exactly why the comparison matters: the right answer depends on your numbers, not on habit.",
          "One timing point: deductions count in the year you pay them, not the year you incur them. A charitable gift made on December 31 counts for that year; the same gift on January 2 counts for the next. If your itemized total is close to the standard deduction, bunching two years of charitable gifts into one year can push you over the line — and the year you bunch is the year itemizing pays."
        ]
      },
      {
        "heading": "4. Ignoring estimated tax until April",
        "paragraphs": [
          "The tax system is pay-as-you-go. If you earn income without withholding — freelance work, a side business, rental income, capital gains — the IRS expects payment four times a year, not once in April. For 2026 the due dates are April 15, June 15, and September 15, with the final installment due January 15, 2027. Miss a date and the penalty clock starts, even if you eventually pay in full.",
          "The penalty is interest on each late installment, charged at the IRS underpayment rate — 7% a year for the quarter that began October 1, 2026, after 6% in the second quarter and 7% in the third. A freelancer who was $2,500 short on the September 15 installment and paid nothing until December 31 owes about $51 in penalty on that installment alone: $2,500 × 7% × 107 days ÷ 365. The amount is small; the habit is not. A full year of skipped installments turns a few dollars of interest into hundreds.",
          "Three safe harbors remove the penalty entirely. You owe nothing if your balance due at filing is under $1,000 after withholding and credits, if you paid at least 90% of the current year's tax, or if you paid at least 100% of last year's tax — 110% if last year's adjusted gross income was over $150,000. The simplest protection for a freelancer with steady income is the prior-year rule: divide last year's total tax by four and pay that each quarter. Form 1040-ES carries the worksheet."
        ]
      },
      {
        "heading": "5. Missing retirement-contribution deadlines",
        "paragraphs": [
          "Retirement accounts have two different deadlines, and mixing them up is the mistake. Contributions to a 401(k) come out of your paycheck, so they must be deferred by December 31 — there is no grace period, and a change requested in the last days of December may not process until January, when it counts for the next year. For 2026 the employee limit is $24,500, plus an $8,000 catch-up if you are 50 or older.",
          "An IRA works the other way. You can contribute for 2026 until April 15, 2027, the filing deadline — which means the mistake runs in both directions. Some people rush an IRA contribution in December when they had four more months; others assume the 401(k) has the same grace period and discover in January that the year's room is gone. The 2026 IRA limit is $7,500 across all your IRAs, or $8,600 if you are 50 or older.",
          "The cost is the tax on the contribution you never made. A single filer in the 22% bracket who skips a $7,500 deductible IRA contribution pays $1,650 more tax that year — and loses the year's tax-deferred growth on top. Note the deduction has income limits: if you are covered by a workplace plan, the traditional IRA deduction phases out between $81,000 and $91,000 of modified adjusted gross income for single filers in 2026. Above that range the contribution is still allowed, but the deduction is not."
        ]
      },
      {
        "heading": "6. Forgetting the new 1099-NEC threshold",
        "paragraphs": [
          "For payments made in 2026, the Form 1099-NEC reporting threshold rose from $600 to $2,000 under the One Big Beautiful Bill Act. A business that paid a contractor $1,500 during 2026 files no 1099-NEC for that contractor — under the old rule, it filed one. The forms for 2026 payments are due February 1, 2027, because January 31 falls on a Sunday. Businesses still working from the $600 figure waste time filing forms nobody needs; the bigger risk runs the other way.",
          "The threshold controls paperwork, not tax. Every dollar a contractor earns is taxable whether or not a 1099 arrives, and the higher threshold means more contractors will have income with no form attached to it. The freelancer who treats “no 1099” as “no income” is the one who gets hurt. Take $1,800 of freelance income with no 1099: self-employment tax is 15.3% of 92.35% of net earnings — $254 on $1,662 — and income tax at the 22% bracket adds about $368, for roughly $622 of tax on income that never appeared on a form. Add failure-to-pay penalties and interest if the IRS finds it first, and a small job becomes an expensive one.",
          "The fix is a habit, not a form. Track every payment you receive, in a spreadsheet or an app, whether or not you expect a 1099. If you pay contractors, track what you paid each one and file for everyone at or above $2,000. The threshold is per contractor per year, not per payment: three $700 payments to the same person total $2,100 and require a form."
        ]
      },
      {
        "heading": "7. Claiming credits you do not qualify for",
        "paragraphs": [
          "Refundable credits are the most expensive mistakes on this list, because the IRS treats a wrong claim as money it already paid you. The earned income credit is the largest: for 2026 the maximum is $8,231 with three or more qualifying children, $7,316 with two, $4,427 with one, and $664 with none. The rules are specific — the child must live with you more than half the year, meet age and relationship tests, and your investment income must not exceed $12,200. A child who lives with the other parent, or a year with a large capital gain, can disqualify a claim that looked fine.",
          "The consequences go beyond repayment. If the IRS denies the credit, you pay back the amount plus interest, and an erroneous-claim penalty of 20% of the excess can apply. A wrongly claimed $4,427 credit becomes $4,427 plus an $885 penalty, plus interest — over $5,300 before the interest is counted. A finding of reckless or intentional disregard bans you from the credit for two years; fraud bans you for ten. After any disallowance other than a math error, you must file Form 8862 to claim the credit again.",
          "The safeguard is the IRS's own EITC Assistant, which walks through the tests before you file, and a hard rule: never claim a credit on someone else's say-so. Preparers who promise a large refund for a fee have an incentive to claim credits you cannot support, and the bill comes to you, not to them."
        ]
      },
      {
        "heading": "What to do if you already made one of these mistakes",
        "paragraphs": [
          "Most of these mistakes can be fixed after the fact, and the fix is usually cheaper than the wait. If you already filed with the wrong status, the wrong deduction, or a credit you should not have claimed, file an amended return on Form 1040-X. You generally have three years from the date you filed the original return to amend and claim a refund, so a 2026 return filed in April 2027 can be corrected into 2030. Amending to fix an underpayment is also the move that stops interest from growing: interest accrues until the tax is paid in full, so every month of delay adds to the bill.",
          "Withholding and estimated tax can be fixed mid-year, which is why this guide is dated October: there is still time to change the outcome for 2026. A new W-4 filed now changes the withholding on your remaining paychecks, and an estimated payment made before January 15, 2027 counts toward the 2026 year even if earlier installments were short. A late payment still draws interest for the days it was late, but paying now stops the clock; waiting until April does not.",
          "Penalties have their own fixes. The IRS offers First Time Abate relief for taxpayers with a clean compliance history — one request can remove failure-to-file and failure-to-pay penalties for a single tax period. If you owe and cannot pay in full, an installment agreement cuts the failure-to-pay penalty from 0.5% a month to 0.25% while the plan is active. Neither fix removes interest, which keeps accruing until the balance is paid, but both cut the part of the bill you can control.",
          "The mistakes that cannot be fixed are the deadline ones. A 401(k) contribution window that closed on December 31 does not reopen, and a year of IRA room you skipped is gone once April 15 passes. Those are the two to put on a calendar now, while the 2026 deadlines are still ahead of you: December 31 for the 401(k), April 15, 2027 for the IRA."
        ]
      },
      {
        "bullets": [
          "Confirm your filing status — especially head of household if you are unmarried and support a home.",
          "Compare your itemized deductions with the standard deduction for your status before choosing.",
          "Run the Tax Withholding Estimator after any job change, marriage, divorce, or new child.",
          "Pay estimated tax by each quarterly date, or confirm you meet a safe harbor.",
          "Top up your 401(k) before December 31 and your IRA before April 15, 2027.",
          "Track freelance income yourself — a missing 1099 does not make income tax-free.",
          "Check every credit against its eligibility rules, and file Form 8862 if a past claim was disallowed."
        ],
        "heading": "A short checklist before you file",
        "paragraphs": [
          "Most of the mistakes above are caught by a ten-minute review before you file. Run through this list with last year's return beside you, and fix what you find while there is still time to change it.",
          "One last point: file even if you cannot pay. The failure-to-file penalty is 5% of the tax owed per month, up to 25%, while the failure-to-pay penalty is 0.5% per month — ten times smaller. Filing on time and setting up an installment agreement cuts the late-payment penalty to 0.25% a month. The return is the cheap part; the delay is the expensive part."
        ]
      }
    ],
    "seoTitle": "7 Tax Mistakes That Cost You Money in 2026 (Avoid Them)",
    "slug": "tax-mistakes-that-cost-you-money",
    "sources": [
      {
        "label": "IRS — Revenue Procedure 2025-32, 2026 inflation adjustments",
        "url": "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf"
      },
      {
        "label": "IRS — Quarterly interest rates",
        "url": "https://www.irs.gov/payments/quarterly-interest-rates"
      },
      {
        "label": "IRS — Topic No. 306, Penalty for underpayment of estimated tax",
        "url": "https://www.irs.gov/taxtopics/tc306"
      },
      {
        "label": "IRS — Retirement topics, IRA contribution limits",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits"
      }
    ],
    "title": "7 Tax Mistakes That Cost You Money",
    "type": "Mistakes",
    "updated": "2026-10-17"
  },
  {
    "cornerstone": false,
    "description": "Learn how to negotiate a higher salary: research your market rate with BLS data, pick a specific number, use exact scripts, and get the deal in writing.",
    "faqs": [
      {
        "answer": "Ask for a specific number above your target, built from market data rather than a fixed percentage. If the market range for the role runs from $90,000 to $115,000 and your research puts you near the top, asking for $110,000 is defensible. A round 10% above the offer is a common starting point, but the market range matters more than any percentage rule.",
        "question": "How much more should I ask for than the offer?"
      },
      {
        "answer": "An employer can withdraw an offer at any time before you accept, but a professional counter is a normal part of hiring and rarely causes a withdrawal. The risk rises if the ask is far outside the market range, if the tone turns adversarial, or if you issue an ultimatum. Keep the ask specific, the tone collaborative, and the evidence visible, and the risk stays low.",
        "question": "Can an employer take back an offer if I negotiate?"
      },
      {
        "answer": "No. Your current salary anchors the discussion to your past pay instead of the market rate for the role. Redirect to the market: the role pays this range, and your experience puts you at this point in it. Some states and cities bar employers from asking about salary history, so check the rules where you live before the interview.",
        "question": "Should I tell them my current salary?"
      },
      {
        "answer": "Build the case before the conversation. Gather your market rate from the BLS OEWS data, list your measurable results from the past year, and pick a specific number. Ask ahead of the budget cycle so your manager has time to make the case. If the answer is no, ask what results would justify the number and get a written review date with a target.",
        "question": "How do I negotiate a raise in my current job?"
      },
      {
        "answer": "Move to the rest of the package: a signing bonus, a higher bonus target, extra paid time off, remote days, or a training budget. Then ask for a written review in six months with a defined salary target tied to defined goals. A fixed budget this year does not have to mean a fixed salary forever, but only a written date turns that into a real commitment.",
        "question": "What if they say the salary budget is fixed?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/how-to-negotiate-a-higher-salary.jpg",
    "imageAlt": "Flat-vector illustration of two people shaking hands across a table with a rising bar chart behind them",
    "inlineImage": "/images/how-to-negotiate-a-higher-salary-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of ascending steps with a flag on the top step and stacked coins beside them",
    "intro": "Negotiating a higher salary starts with a market rate you can defend, not a guess. Research what your role pays, pick one specific number, ask for it at the point of maximum leverage, and negotiate the whole package, not just base pay. Then get the agreement in writing before you accept.",
    "published": "2026-10-28",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Salary Calculator",
        "url": "/tax/salary-calculator"
      },
      {
        "name": "Salary to Hourly Calculator",
        "url": "/freelance/salary-to-hourly-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Why the first number matters",
        "paragraphs": [
          "Your starting salary is the base every future raise is calculated from. A percentage increase applies to the salary you already have, so a gap agreed on day one does not stay fixed, it grows. Two people doing the same job with the same annual raises end up further apart every year if one started higher.",
          "Take a $5,000 raise negotiated once. With 3% annual increases, the extra pay is $5,000 in year one and $5,150 in year two, because the 3% raise applies to the higher base. By year twenty the annual difference is $8,768. Across all twenty years the extra pay totals $134,352. Without the compounding, twenty years of a flat $5,000 would be $100,000, so the compounding alone is worth $34,352.",
          "The effect reaches beyond base pay. Annual bonuses and 401(k) employer matches are often a percentage of pay, so a higher base raises both. Severance calculated in weeks of pay is larger too. A single negotiation moves all of these at once, which is why the first number carries more weight than any later one.",
          "The same logic works in reverse. Accepting below market and hoping for a catch-up raise later is a weak plan, because raise budgets are a small percentage of current pay. A 4% raise on $80,000 is $3,200; on $95,000 it is $3,800. The person who started higher pulls further ahead with the same percentage."
        ]
      },
      {
        "heading": "Find your market rate",
        "paragraphs": [
          "Your market rate is what employers actually pay for your role, in your area, at your experience level. The strongest source for it is the Bureau of Labor Statistics Occupational Employment and Wage Statistics (OEWS) survey, which reports wages by occupation from a survey of employers. The current edition covers May 2025 and was released in spring 2026.",
          "Read the OEWS table with care. It publishes a mean wage and a median wage for each occupation. The mean is the average across all workers in the role, pulled up by a small number of very high earners. The median is the middle worker: half earn more, half earn less. For a negotiation, the median is the better anchor, because it describes the typical worker.",
          "The survey also publishes wages by metropolitan area, and the same job pays differently in different cities. A national median is a starting point; the figure for your metro area is the number to use. OEWS covers wage and salary workers, so it excludes self-employed earnings, and it reports base wages, not bonuses or equity.",
          "Each row below shows the median hourly wage and the mean annual wage for the occupation, from the OEWS May 2025 national estimates. To convert a median hourly wage to an annual figure, multiply by 2,080, the standard full-time year of 40 hours a week for 52 weeks. The all-occupations median of $24.51 an hour annualizes to about $50,980."
        ],
        "table": {
          "head": [
            "Occupation",
            "Median hourly wage",
            "Mean annual wage"
          ],
          "rows": [
            [
              "All occupations",
              "$24.51",
              "$69,770"
            ],
            [
              "Software developers",
              "$65.38",
              "$148,100"
            ],
            [
              "General and operations managers",
              "$50.85",
              "$134,940"
            ],
            [
              "Registered nurses",
              "$46.90",
              "$101,420"
            ],
            [
              "Accountants and auditors",
              "$40.23",
              "$94,750"
            ],
            [
              "Computer network support specialists",
              "$36.64",
              "$81,870"
            ]
          ]
        }
      },
      {
        "heading": "Adjust for inflation",
        "paragraphs": [
          "A salary number means little without the price level behind it. Consumer prices rose 3.7% in the twelve months to September 2026, according to the Bureau of Labor Statistics, with the September report released on October 14, 2026. That is the rate your pay has to beat just to hold its purchasing power.",
          "The arithmetic is direct. A salary of $85,000 needs to reach $88,145 to buy the same basket of goods a year later ($85,000 x 1.037). A 3% raise gives $87,550, which looks like a raise and is in fact a $595 real pay cut. A raise below the inflation rate is a pay cut in everything but the name.",
          "Inflation also sets the floor for your ask. Compare the offered salary with what you earn now, adjusted for inflation since your last raise, not with the raw number on your pay stub. If your last raise was two years ago, the gap between your current pay and your real market rate is larger than the nominal figures suggest.",
          "Use the headline CPI-U figure, which covers all urban consumers, more than 90% of the US population. Core inflation, which excludes food and energy, was 2.6% over the same twelve months, but the headline number is the right one for a cost-of-living argument, because food and energy are real costs you pay."
        ]
      },
      {
        "heading": "What a raise is worth after tax",
        "paragraphs": [
          "A raise is quoted gross, but you spend it net. Before you decide whether an offer is enough, work out what the extra money is worth after federal income tax and payroll tax. The 2026 figures come from IRS Revenue Procedure 2025-32: the standard deduction is $16,100 for single filers and $32,200 for married couples filing jointly, and the seven federal rates run from 10% to 37%.",
          "Take a single filer earning $85,000 who negotiates a $5,000 raise to $90,000. The standard deduction of $16,100 leaves taxable income of $68,900 before the raise and $73,900 after it. Both figures sit inside the 22% bracket, which for single filers covers taxable income from $50,400 to $105,700 in 2026. Federal tax rises by exactly 22% of $5,000, which is $1,100.",
          "Payroll tax takes another slice. Social Security tax is 6.2% and Medicare tax is 1.45%, a combined 7.65% on wages, so the $5,000 raise costs $382.50 in payroll tax. Total tax on the raise is $1,482.50, and the take-home gain is $3,517.50 a year, or about $293 a month, every year, compounding with future raises.",
          "The marginal rate is what matters here, not your average rate. Only the income inside a bracket is taxed at that bracket's rate, so a raise that crosses into a higher bracket taxes only the part above the threshold at the higher rate. Run your own numbers with the Salary Calculator before you settle on a target, and use the Salary to Hourly Calculator to translate an annual figure into an hourly rate: $85,000 is $40.87 an hour over a 2,080-hour year, and a $5,000 raise is $2.40 an hour."
        ]
      },
      {
        "heading": "Pick your number",
        "paragraphs": [
          "Go into the conversation with three numbers: your target, your floor, and your opening ask. Your target is the salary you want. Your floor is the lowest you will accept, set before the conversation starts, when you are thinking clearly. Your opening ask is a specific number slightly above your target, which leaves room to move and still land where you want.",
          "Make the ask specific. A precise number signals research: $97,500 reads as a figure built from market data, while $95,000 to $100,000 reads as a guess, and the employer will hear the bottom of the range. Never give a range with a bottom you would not accept, because the bottom is the number they will anchor on.",
          "Base the number on the market data and your own evidence, not on your current salary, which reflects your last employer's budget and your last negotiation. If an employer asks what you earn now, redirect to the market: the role pays this range, and your skills and results put you at this point in it. Some states and cities bar employers from asking about salary history at all.",
          "Set your floor with your real costs in mind: housing, debt payments, savings, and the cost of the commute or relocation. A floor built from your budget is a floor you can hold. A floor built from a feeling folds at the first pushback."
        ]
      },
      {
        "heading": "When to negotiate",
        "paragraphs": [
          "The strongest moment to negotiate is after a written offer and before you accept it. At that point the employer has chosen you, spent time and money on the hiring process, and wants the role filled. Your leverage is at its highest, and the employer expects a discussion: negotiating at the offer stage is a normal part of hiring, not an imposition.",
          "If you are already in the role, the best moments are your performance review, the completion of a major project, and any point where your responsibilities have grown beyond your job description. Tie the ask to evidence: revenue you brought in, costs you cut, a team you built, a system you fixed. The case is strongest when the value is recent and measurable.",
          "Timing inside the company calendar matters too. Raise budgets are usually set during annual planning, so an ask made a month before budgets are finalized has a better chance than one made the week after. If your manager needs approval from above, give them time to make the case.",
          "Avoid negotiating from a weak position. Do not open the conversation the week of a layoff announcement, a missed quarter, or a hiring freeze, unless your own situation forces the timing. And do not negotiate without an alternative: another offer, or a clear plan to look, changes your tone even if you never mention it."
        ]
      },
      {
        "bullets": [
          "Do not name your current salary first. It anchors the discussion to your past pay instead of the market rate.",
          "Do not give a range. The employer hears the bottom number and treats it as your ask.",
          "Do not justify the ask with personal costs. Rent, debt, and family expenses are real, but they are not the employer's pricing logic.",
          "Do not threaten to quit unless you mean it. An empty threat costs you credibility and can end the conversation badly.",
          "Do not accept on the spot. Ask for the offer in writing and take at least a day to decide, even if the number is good."
        ],
        "heading": "What to say, and what not to say",
        "paragraphs": [
          "Keep the conversation short, specific, and grounded in the market. You are not asking for a favor; you are proposing a price for your work. State the number, state the evidence, then stop talking. The silence after your ask is part of the negotiation, and filling it with apologies weakens the number.",
          "For a new offer, try this: \"Thank you for the offer. Based on the market data for this role and the experience I bring, I would like to discuss a base salary of $97,500. I am excited about the role and I want to make this work.\" For a raise in your current job: \"Over the past year I took on the vendor migration and cut our processing time by a third. The market rate for this role is now above my current pay. I would like to discuss moving my salary to $97,500.\"",
          "What you say matters less than what you avoid. Keep these out of the conversation:",
          "After the ask, expect a pause or a counter. If they counter below your target, respond with a number, not a reaction: \"I appreciate that. I could accept $94,000 with a six-month review and a $5,000 signing bonus.\" Every move should be a specific number or a specific term."
        ]
      },
      {
        "heading": "Negotiate beyond base pay",
        "paragraphs": [
          "Base salary is the most visible number, but it is not the only one. When an employer cannot move on salary, the rest of the package often has room. A $5,000 signing bonus is cash now. Extra paid time off is time you cannot buy back. Remote work can save thousands a year in commuting costs.",
          "Rank the levers by what they are worth to you before the conversation, so you can trade quickly. Note that a signing bonus is usually paid once and taxed as ordinary income in the year you receive it, so it does not compound the way base pay does. Prefer base pay when you can get it; take the bonus when you cannot.",
          "Two levers deserve special attention. The first is a scheduled review: if the employer will not meet your number now, ask for a written review in six months with a defined salary target tied to defined goals. The second is a title change, which costs the employer nothing and raises your market rate for the next negotiation."
        ],
        "table": {
          "head": [
            "Lever",
            "What to ask for",
            "Why it matters"
          ],
          "rows": [
            [
              "Signing bonus",
              "One-time payment, often $5,000 to $10,000",
              "Cash now; closes a gap the base cannot"
            ],
            [
              "Annual bonus target",
              "A higher target percentage or a guaranteed first-year bonus",
              "Raises total pay without moving base"
            ],
            [
              "Equity or stock options",
              "More shares, or a shorter vesting schedule",
              "Builds long-term value if the company grows"
            ],
            [
              "Paid time off",
              "Extra days beyond the standard allowance",
              "Time off has a cash value and a health value"
            ],
            [
              "Remote work",
              "More remote days, or a home-office stipend",
              "Cuts commuting cost and time"
            ],
            [
              "Start date",
              "A later start, or a paid gap between jobs",
              "Rest and preparation before day one"
            ],
            [
              "Review date",
              "A written six-month review with a salary target",
              "Creates a second negotiation on a deadline"
            ],
            [
              "Professional development",
              "A training budget or conference attendance",
              "Raises your market rate for the next move"
            ]
          ]
        }
      },
      {
        "heading": "If the answer is no",
        "paragraphs": [
          "A no is information, not a verdict. The first question to ask is why: is the salary capped by a pay band, is the budget set for the year, or does the decision-maker need more evidence? The answer tells you whether the no is about this year, this role, or your case, and each one has a different fix.",
          "If the budget is the blocker, move to the other levers and ask for a written review date with a target. If the evidence is the blocker, ask what results would justify the number and get them in writing. A specific target turns a no into a plan. Pin down a date and a number before you leave the room.",
          "Do not accept a counteroffer from your current employer as a substitute for a real fix. A counteroffer usually arrives only after you have a competing offer, which means the employer could have paid you fairly all along and chose not to until you were leaving. The reasons you wanted to leave, the manager, the work, the hours, the path, do not change because the pay did. If you accept one, get the new terms in writing and be honest about whether the underlying problems are fixed.",
          "If the answer stays no and the gap matters, the market is the remedy. Interviewing elsewhere gives you a real alternative and fresh data on what your role pays. You do not have to take the other job; you have to know what it would pay."
        ]
      },
      {
        "heading": "Get it in writing",
        "paragraphs": [
          "Nothing in a negotiation counts until it is written down. Verbal promises about salary, bonuses, reviews, and start dates are forgotten, reinterpreted, or lost when your hiring manager leaves. Before you accept, ask for the full offer in writing and check every term against what was discussed.",
          "The written offer should state the base salary, the start date, the bonus target and how it is calculated, any signing bonus and its payment date, equity terms including the vesting schedule, paid time off, and any review date you agreed on. Read the bonus and equity language closely: a discretionary bonus is not the same as one with a defined target, and equity with a one-year cliff pays nothing if you leave in year one.",
          "If you negotiated a raise in your current job, confirm it by email the same day: the new salary, the effective date, and any review or title change you agreed on. Ask your manager to confirm in reply. That email is your record if the change is delayed or disputed.",
          "Finally, keep your own file. Save the offer letter, the confirmation email, and the market research you used. You will need them at the next review, the next negotiation, or the next job search. Each round starts from the number the last one set."
        ]
      }
    ],
    "seoTitle": "How to Negotiate a Higher Salary (2026 Guide) That Works",
    "slug": "how-to-negotiate-a-higher-salary",
    "sources": [
      {
        "label": "BLS Occupational Employment and Wage Statistics, May 2025 — national employment and wage data by occupation",
        "url": "http://stats.bls.gov/news.release/ocwage.t01.htm"
      },
      {
        "label": "BLS Consumer Price Index, September 2026 (released October 14, 2026)",
        "url": "https://www.bls.gov/news.release/archives/cpi_10142026.htm"
      },
      {
        "label": "IRS Revenue Procedure 2025-32 — 2026 tax brackets and standard deduction (IR-2025-103)",
        "url": "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill"
      }
    ],
    "title": "How to Negotiate a Higher Salary",
    "type": "How-to",
    "updated": "2026-10-28"
  },
  {
    "cornerstone": false,
    "description": "Claiming at 62 cuts your Social Security check by 30%; waiting until 70 raises it 24%. Compare the ages, the breakeven math, and rules that change the answer.",
    "faqs": [
      {
        "answer": "There is no single best age. Full retirement age, 67 for anyone born in 1960 or later, is the neutral choice: the full benefit with no earnings test. Claim at 62 if you need the income or expect a shorter life. Wait until 70 if you are healthy, can fund the gap years, or are the higher earner in a marriage, because the 24% increase also raises your spouse's survivor benefit.",
        "question": "What is the best age to claim Social Security?"
      },
      {
        "answer": "No. Waiting pays only if you live past the breakeven age — about 80 years and 4 months against claiming at 62, or 82 years and 6 months against claiming at 67, on a $2,071 PIA. Die before that and the early claimer collected more in total. The exception is a married higher earner: delaying raises the survivor benefit even if the worker dies early.",
        "question": "Does waiting until 70 always pay off?"
      },
      {
        "answer": "Yes. Before full retirement age, the earnings test withholds $1 for every $2 earned above $24,480 in 2026, or $1 for every $3 above $65,160 in the year you reach full retirement age. Withheld benefits are not lost — the SSA recalculates your check at full retirement age. From the month you reach full retirement age, you can earn any amount with no withholding.",
        "question": "Can I work and collect Social Security at the same time?"
      },
      {
        "answer": "It depends on your combined income: adjusted gross income plus nontaxable interest plus half your benefits. Below $25,000 single or $32,000 married filing jointly, none of your benefits are taxed. Above $34,000 or $44,000, up to 85% is taxable. At least 15% is always tax-free. The thresholds are not indexed for inflation.",
        "question": "Will my Social Security benefits be taxed?"
      },
      {
        "answer": "Within 12 months of claiming, you can withdraw your application, repay all benefits received, and claim again later at a higher rate — but only once. After full retirement age, you can also suspend your benefit and earn delayed retirement credits until 70. Outside those two options, your claiming age is fixed, so it pays to decide deliberately.",
        "question": "Can I change my mind after I start claiming?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/when-should-you-claim-social-security.jpg",
    "imageAlt": "Flat-vector illustration of a winding timeline with three milestone markers in emerald, burnt orange, and sage",
    "inlineImage": "/images/when-should-you-claim-social-security-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a nest egg beside a clock in emerald, burnt orange, and sage",
    "intro": "Claim at 62 and your check is 30% smaller for life. Wait until 70 and it is 24% larger. There is no single right age: the best choice depends on your health, your need for income, whether you keep working, and what your spouse will inherit. This guide runs the numbers so you can decide with them, not around them.",
    "published": "2026-10-25",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Social Security Calculator",
        "url": "/personal-wealth/social-security-calculator"
      },
      {
        "name": "Retirement Calculator",
        "url": "/personal-wealth/retirement-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How your benefit is calculated",
        "paragraphs": [
          "Your benefit starts with your earnings record. The Social Security Administration takes your 35 highest-earning years, adjusts each year for wage growth, adds them up, and divides by 420 months. The result is your average indexed monthly earnings, or AIME. Years you did not work count as zeros, so fewer than 35 years of earnings pulls the average down.",
          "The AIME then runs through a three-part formula to produce your primary insurance amount, or PIA — the monthly benefit you receive at full retirement age. For workers first eligible in 2026, the formula pays 90% of the first $1,286 of AIME, 32% of AIME between $1,286 and $7,749, and 15% of anything above $7,749. Those two cutoffs are the bend points, and they are fixed by the year you turn 62, even if you claim years later.",
          "Take an AIME of $5,000. The first slice pays 90% of $1,286, or $1,157.40. The middle slice pays 32% of $3,714 — the part of $5,000 above $1,286 — or $1,188.48. Nothing sits above the second bend point, so the PIA is $2,345.88, rounded down to $2,345.80. That is the benefit at full retirement age; the age you claim then moves it up or down.",
          "Two more facts frame the decision. You need 40 credits — about 10 years of work — to qualify for retirement benefits at all, and in 2026 one credit costs $1,890 in covered earnings, up to four credits a year. And cost-of-living adjustments apply from the year you turn 62 whether or not you have claimed, so delaying never forfeits a COLA. The 2026 COLA is 2.8%, which lifted the average retired worker's benefit to $2,071 a month."
        ]
      },
      {
        "heading": "The three claiming ages: 62, 67, and 70",
        "paragraphs": [
          "Full retirement age is 67 for anyone born in 1960 or later. Claim before it and your benefit shrinks by 5/9 of 1% for each of the first 36 months early, then 5/12 of 1% for each month beyond that. Claiming at 62 — the earliest possible age — means 60 months early and a 30% cut that is permanent.",
          "Wait past full retirement age and the math reverses. Delayed retirement credits add 2/3 of 1% of your PIA for each month you wait, or 8% a year, up to age 70. For someone with a full retirement age of 67, three years of credits lift the benefit to 124% of the PIA. There is no gain in waiting past 70: the credits stop.",
          "The table below applies those rules to a PIA of $2,071, the average retired worker's benefit in January 2026. The spread is wide: the age-70 check is 77% larger than the age-62 check, every month, for life, with each year's COLA applied on top.",
          "One caution: the choice is close to final. Within 12 months of claiming you can withdraw your application, repay everything you received, and start over — but only once. After that window, the claiming age you picked is the benefit you keep."
        ],
        "table": {
          "head": [
            "Claim at",
            "Share of PIA",
            "Monthly benefit",
            "Annual benefit"
          ],
          "rows": [
            [
              "62",
              "70%",
              "$1,450",
              "$17,396"
            ],
            [
              "67",
              "100%",
              "$2,071",
              "$24,852"
            ],
            [
              "70",
              "124%",
              "$2,568",
              "$30,816"
            ]
          ]
        }
      },
      {
        "heading": "You can claim any month, not just at 62, 67, or 70",
        "paragraphs": [
          "The three ages in this guide are landmarks, not the only choices. You can start benefits in any month from 62 to 70, and the adjustment is prorated by the month: 5/9 of 1% for each of the first 36 months before full retirement age, 5/12 of 1% for each month earlier than that, and 2/3 of 1% for each month you wait past full retirement age. There is no cliff at any birthday.",
          "That flexibility matters, because retirement rarely lands on a round age. If you stop working at 64 and three months, you can claim then rather than funding three more years from savings or having claimed at 62. Every month of delay adds between 0.42% and 0.67% to your monthly check for life, depending on which side of full retirement age you are on, so even a six-month delay is worth real money.",
          "The table shows three in-between ages on the same $2,071 PIA. Notice how the penalty shrinks as you approach full retirement age: claiming at 65 costs 13.3%, less than half the 30% cost of claiming at 62, because the steepest part of the reduction schedule is the earliest months. The SSA's own online calculator shows your exact amount for any claiming month, on your own earnings record."
        ],
        "table": {
          "head": [
            "Claim at",
            "Share of PIA",
            "Monthly benefit"
          ],
          "rows": [
            [
              "63",
              "75%",
              "$1,553"
            ],
            [
              "65",
              "86.7%",
              "$1,795"
            ],
            [
              "68",
              "108%",
              "$2,237"
            ]
          ]
        }
      },
      {
        "heading": "The breakeven math",
        "paragraphs": [
          "Claiming early pays you sooner; claiming late pays you more. The breakeven age is where the late claimer's larger checks catch up with the early claimer's head start. It is the single most useful number in this decision, and it comes straight from the table above.",
          "Compare 62 with 67. The early claimer collects 60 extra monthly checks of $1,450 — a head start of $86,982 — before the age-67 claimer receives a dollar. From 67 on, the later claimer gains $621.30 a month. Dividing $86,982 by $621.30 gives 140 months, or 11 years and 8 months. The breakeven age is about 78 years and 8 months.",
          "The same arithmetic for the other pairs: 62 against 70 gives a head start of $139,171 and a monthly gap of $1,118.34, so the lines cross at about 80 years and 4 months. Claiming at 67 against 70 gives a head start of $74,556 and a gap of $497.04 a month, crossing at 82 years and 6 months. Live past the breakeven age and the later claim wins; die before it and the earlier claim wins.",
          "The lifetime totals make the stakes concrete. These figures ignore COLAs, which apply to every claiming age alike, and ignore any return you might earn by investing early checks — both would move the breakeven ages slightly later, not earlier."
        ],
        "table": {
          "head": [
            "Live to",
            "Claim at 62",
            "Claim at 67",
            "Claim at 70"
          ],
          "rows": [
            [
              "80",
              "$313,135",
              "$323,076",
              "$308,165"
            ],
            [
              "85",
              "$400,117",
              "$447,336",
              "$462,247"
            ],
            [
              "90",
              "$487,099",
              "$571,596",
              "$616,330"
            ]
          ]
        }
      },
      {
        "heading": "When claiming at 62 makes sense",
        "paragraphs": [
          "Claiming at 62 is the right call when you need the money now. If you have stopped working, have little saved, and the choice is between claiming early and drawing down a small nest egg or going into debt, take the benefit. A smaller check you can live on beats a larger check you cannot reach.",
          "Health is the second reason. The breakeven ages run from about 79 to 83, so if your health or family history points to a shorter life, the early checks are worth more than the larger ones you may never collect. This is a judgment about your own situation, not a bet on averages — the breakeven math only pays if you are alive to collect it.",
          "A third case is the single retiree with no spouse who would inherit a survivor benefit and no need to maximize a check someone else will live on. With no survivor to protect, the decision is purely about your own lifespan and cash flow, and the early claim is easier to justify.",
          "One thing claiming early does not cost you: inflation protection. Your benefit still receives every annual COLA, and the 2.8% increase for 2026 applied to early claimers exactly as it did to everyone else. What you give up is the higher base amount, not the adjustments."
        ]
      },
      {
        "heading": "When waiting until 70 pays",
        "paragraphs": [
          "Waiting pays when you can afford to. If you are still working, have a pension, or hold enough savings to cover the gap years, each year you wait buys an 8% increase in a monthly check that is adjusted for inflation and guaranteed for life. No investment offers that combination without risk.",
          "Longevity is the other half of the case. A 65-year-old man lives on average to about 83 and a 65-year-old woman to about 86, on the Social Security Administration's 2023 period life table — past every breakeven age in this guide. If your parents lived into their nineties and your health is good, the odds favor the larger check.",
          "For married couples, waiting has a second payoff that the breakeven math misses: the higher earner's delayed credits raise the survivor benefit. When the higher earner dies, the surviving spouse inherits the higher check. Delaying to 70 is, in effect, buying the largest possible survivor benefit for your spouse.",
          "One administrative note: if you delay past 65, sign up for Medicare anyway. You can enroll in Medicare at 65 without claiming Social Security, and waiting to enroll can mean delayed coverage and higher premiums."
        ]
      },
      {
        "heading": "Working while you collect: the earnings test",
        "paragraphs": [
          "Claiming before full retirement age while you keep working triggers the retirement earnings test. In 2026, if you are under full retirement age all year, the Social Security Administration withholds $1 in benefits for every $2 you earn above $24,480. In the calendar year you reach full retirement age, the limit rises to $65,160, the withholding falls to $1 for every $3, and only earnings before the month you reach full retirement age count. From that month on, there is no limit at all.",
          "Say you claim at 63 and earn $40,000 in 2026. The excess over $24,480 is $15,520, so $7,760 of benefits is withheld for the year — about five and a half months of a $1,450 check. The withheld amount is not a tax and not a penalty. At full retirement age the SSA recalculates your benefit and credits you for the months that were withheld, as if you had claimed later, which raises your monthly check permanently.",
          "The test counts only earned income: wages and net self-employment earnings. Pensions, annuities, IRA and 401(k) withdrawals, interest, dividends, rental income, and capital gains do not count, however large they are. If your income in early retirement comes from savings rather than a paycheck, the earnings test never touches you.",
          "The practical lesson is to run the numbers before combining a paycheck with an early claim. If your earnings are high enough to wipe out most of the year's benefit, you may be claiming early for checks you mostly will not receive — and the recalculation at full retirement age only partly makes up for the early-claim reduction itself."
        ]
      },
      {
        "heading": "Spouses and survivors",
        "paragraphs": [
          "For married couples, the claiming decision is a joint one, because your choice sets the size of two benefits, not one. A spouse can claim a spousal benefit worth up to 50% of your PIA — your benefit at full retirement age — but only at the spouse's own full retirement age. Claim the spousal benefit at 62 and it falls to 32.5% of your PIA. Waiting past full retirement age never increases a spousal benefit: delayed retirement credits do not apply to it.",
          "The survivor benefit works differently, and it is the more valuable of the two. A widow or widower can claim from age 60 — 50 if disabled — starting at 71.5% of the deceased worker's benefit and rising to 100% at the survivor's full retirement age. Critically, the survivor benefit includes any delayed retirement credits the worker earned. A worker who waited to 70 leaves a survivor benefit based on the 124% check, not the 100% one.",
          "The numbers show why the higher earner should usually wait. On a PIA of $2,071, the spousal benefit is $1,036 a month at the spouse's full retirement age and $673 at 62. The survivor benefit, by contrast, can reach the full $2,568 a month the worker would have received at 70. In many couples, the survivor benefit is the largest single source of retirement income the surviving spouse will have.",
          "One limit to know: you cannot collect your own benefit and a full spousal benefit at the same time. The SSA pays the higher of the two amounts. The spousal benefit is a top-up for a lower-earning spouse, not a second full check."
        ]
      },
      {
        "heading": "Taxes on your benefits",
        "paragraphs": [
          "Up to 85% of your Social Security benefits can be counted as taxable income, depending on your combined income — your adjusted gross income, plus any nontaxable interest, plus half your Social Security benefits. The thresholds have not been adjusted for inflation since they were set, so more retirees cross them every year.",
          "Take a single filer with $20,000 of other income and $24,852 a year in benefits — the average benefit at full retirement age. Combined income is $20,000 plus half of $24,852, or $32,426. That sits in the 50% tier, and the taxable amount is 50% of the $7,426 above the $25,000 threshold: $3,713. At least 15% of benefits is always tax-free, whatever your income.",
          "Claiming age changes the tax picture in two ways. A larger check from waiting raises combined income, which can push more of the benefit into tax — but you are taxed on more income because you have more income, which is still a gain. And claiming while still working usually means a high combined income, so early claimers with a paycheck should expect up to 85% of the benefit to be taxable. The IRS worksheet in Topic 423 governs the exact calculation, and some states tax benefits too, under their own rules."
        ],
        "table": {
          "head": [
            "Filing status",
            "Combined income",
            "Share of benefits taxable"
          ],
          "rows": [
            [
              "Single",
              "Under $25,000",
              "0%"
            ],
            [
              "Single",
              "$25,000–$34,000",
              "Up to 50%"
            ],
            [
              "Single",
              "Over $34,000",
              "Up to 85%"
            ],
            [
              "Married filing jointly",
              "Under $32,000",
              "0%"
            ],
            [
              "Married filing jointly",
              "$32,000–$44,000",
              "Up to 50%"
            ],
            [
              "Married filing jointly",
              "Over $44,000",
              "Up to 85%"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Claim at 62 if you need the income now, your health points to a shorter life, or you have stopped working with little saved.",
          "Claim at full retirement age, 67, if you want the full benefit without the earnings test and without funding three more years from savings.",
          "Wait until 70 if you are healthy, still earning or well saved, and especially if you are the higher earner in a marriage — your delay is your spouse's survivor benefit.",
          "Check your own numbers before deciding: your my Social Security account at ssa.gov shows your earnings record and your estimated benefit at 62, 67, and 70."
        ],
        "heading": "Health, longevity, and your decision",
        "paragraphs": [
          "Every breakeven age in this guide sits below average life expectancy. The SSA's 2023 period life table gives a 65-year-old man 18.1 more years on average, to about 83, and a 65-year-old woman 20.7 more years, to about 86. About one in four men and one in three women alive at 65 will reach 90. The average person who waits comes out ahead — but you are not the average, and the spread around it is wide.",
          "That is why the decision comes down to three personal questions, not one national answer: how long you expect to live, whether you need the money now, and whether a spouse will depend on your benefit after you are gone. Answer those honestly and the claiming age usually picks itself.",
          "Whatever you choose, decide on your own record, not on the averages in this guide. Your PIA, your health, and your household are the inputs that matter; the averages only show how the machine works."
        ]
      }
    ],
    "seoTitle": "When Should You Claim Social Security? 62 vs 67 vs 70",
    "slug": "when-should-you-claim-social-security",
    "sources": [
      {
        "label": "SSA — 2026 Cost-of-Living Adjustment (COLA) Fact Sheet",
        "url": "https://www.ssa.gov/cola/factsheets/2026.html"
      },
      {
        "label": "SSA — Benefits Planner: Retirement Age and Benefit Reduction",
        "url": "https://www.ssa.gov/benefits/retirement/planner/agereduction.html"
      },
      {
        "label": "SSA — Benefits Planner: Delayed Retirement Credits",
        "url": "https://www.ssa.gov/benefits/retirement/planner/delayret.html"
      },
      {
        "label": "SSA — Benefit Formula Bend Points",
        "url": "https://www.ssa.gov/oact/cola/bendpoints.html"
      }
    ],
    "title": "When Should You Claim Social Security?",
    "type": "What",
    "updated": "2026-10-25"
  },
  {
    "cornerstone": false,
    "description": "The 4% rule says to withdraw 4% of your portfolio in year one, then adjust for inflation. The research behind it, the 2026 updates, and where it breaks down.",
    "faqs": [
      {
        "answer": "As a starting point, yes — with a small revision. Morningstar's December 2025 research puts the safe starting rate for 2026 retirees at 3.9%, slightly below the classic 4%, based on a 90% chance of the money lasting 30 years. Bengen himself now cites 4.7% for a more diversified portfolio. A first-year withdrawal in the high 3s to 4% remains well supported; a rate above 5% is not.",
        "question": "Is the 4% rule still safe in 2026?"
      },
      {
        "answer": "No. The 4% rule covers portfolio withdrawals only. Social Security, a pension, or part-time earnings sit outside it, and both Bengen's and Morningstar's research model the portfolio alone. Subtract guaranteed income from your annual spending first, then apply the rule to the remaining gap. A retiree who needs $60,000 a year and receives $25,000 from Social Security needs the portfolio to cover $35,000.",
        "question": "Does the 4% rule include Social Security?"
      },
      {
        "answer": "The original studies tested 30-year retirements only, so retiring at 50 or 55 puts you outside the research. A 40-year horizon needs a lower starting rate, because the portfolio must survive more market cycles and more years of inflation. Plan around a lower rate, keep a larger stock allocation for growth over the longer horizon, and test your plan against a 40-year window rather than the standard 30.",
        "question": "What if I retire early, at 50 or 55?"
      },
      {
        "answer": "No. The rule takes 4% of the starting balance once, then adjusts that dollar amount for inflation each year. Taking 4% of the current balance every year is a different method: it never runs the portfolio to zero, because the withdrawal shrinks as the balance shrinks, but your income falls sharply in a down market. The classic rule protects spending; the percentage-of-balance method protects the portfolio.",
        "question": "Should I withdraw 4% of my balance every year?"
      },
      {
        "answer": "No. Required minimum distributions are a tax rule, not a spending plan: from age 73 the IRS requires withdrawals from traditional IRAs and 401(k)s, and the amount is taxable income whether you spend it or not. The 4% rule is a spending guideline. In your 70s the two are close — the RMD factor at 73 is 26.5, about 3.8% of the balance — but RMDs rise as a share of the balance each year and eventually exceed 4%.",
        "question": "Do required minimum distributions replace the 4% rule?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/the-4-percent-rule-explained.jpg",
    "imageAlt": "Flat-vector illustration of a glass jar filled with burnt-orange coins, a small green plant sprouting from the top, on a cream background",
    "inlineImage": "/images/the-4-percent-rule-explained-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of an emerald hourglass with gold coins flowing through it beside a rising staircase of coin stacks",
    "intro": "The 4% rule says you can withdraw 4% of your retirement portfolio in your first year of retirement, then raise that dollar amount with inflation each year, and the money should last 30 years. On a $1 million portfolio, that is $40,000 in year one. It is a planning starting point, not a guarantee.",
    "published": "2026-11-05",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Retirement Calculator",
        "url": "/personal-wealth/retirement-calculator"
      },
      {
        "name": "RMD Calculator",
        "url": "/personal-wealth/rmd-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What the 4% rule says",
        "paragraphs": [
          "The rule has two steps. In your first year of retirement, withdraw 4% of your total portfolio balance. In every year after, withdraw the same dollar amount, adjusted for inflation. The percentage applies once, to the starting balance — you do not take 4% of whatever the portfolio is worth each year.",
          "On a $1 million portfolio, year one is $40,000, or about $3,333 a month. If inflation runs 3% that year, year two is $41,200 ($40,000 × 1.03). If the portfolio falls 20% in year one, the withdrawal still rises with inflation — the rule does not cut spending when markets fall. That fixed real spending is both the rule's appeal and its main weakness.",
          "The 4% figure covers portfolio withdrawals only. Social Security, a pension, or part-time work sits outside it: subtract that income from your spending first, then apply the rule to the gap. A retiree who needs $60,000 a year and gets $25,000 from Social Security needs the portfolio to cover $35,000, which at 4% means an $875,000 portfolio ($35,000 ÷ 0.04)."
        ]
      },
      {
        "heading": "Where the number came from",
        "paragraphs": [
          "Financial planner William Bengen published the original study in the Journal of Financial Planning in October 1994. He took a portfolio of 50% US large-company stocks and 50% intermediate-term government bonds, rebalanced annually, and tested it against every rolling 30-year period in US market data back to 1926. The worst starting year was 1966, at the start of a decade of high inflation and weak stock returns. Even then, a 4% first-year withdrawal, raised with inflation each year, lasted at least 33 years. Bengen called the highest rate that survived every period the SAFEMAX; the worst case supported about 4.15%, and he published the rounded 4%.",
          "Four years later, three Trinity University professors — Philip Cooley, Carl Hubbard, and Daniel Walz — ran a broader test in the AAII Journal in February 1998. They tried withdrawal rates from 3% to 12%, five stock-bond mixes, and payout periods of 15 to 30 years, using US data from 1926 to 1995 with withdrawals adjusted for inflation. Their 30-year results are the numbers behind the rule's reputation:",
          "The table shows the share of historical 30-year periods in which the portfolio still had money left at the end. Two patterns stand out. First, 4% worked in 95% or more of periods for any portfolio holding at least half its assets in stocks. Second, bond-heavy portfolios failed badly: at 4%, an all-bond portfolio survived only 20% of 30-year periods, because bonds could not keep up with inflation. The rule assumes you stay invested in stocks through retirement."
        ],
        "table": {
          "head": [
            "Portfolio mix",
            "3% withdrawal",
            "4% withdrawal",
            "5% withdrawal"
          ],
          "rows": [
            [
              "100% stocks",
              "100%",
              "95%",
              "85%"
            ],
            [
              "75% stocks / 25% bonds",
              "100%",
              "98%",
              "83%"
            ],
            [
              "50% stocks / 50% bonds",
              "100%",
              "95%",
              "76%"
            ],
            [
              "25% stocks / 75% bonds",
              "100%",
              "71%",
              "27%"
            ],
            [
              "100% bonds",
              "80%",
              "20%",
              "17%"
            ]
          ]
        }
      },
      {
        "heading": "How to work out your number",
        "paragraphs": [
          "Run the rule backward to find your target. Multiply the annual spending your portfolio must cover by 25 — the 25x rule, the flip side of 4% (1 ÷ 0.04 = 25). A $40,000 yearly gap needs $1 million; a $60,000 gap needs $1.5 million.",
          "Start with total spending, then subtract income the portfolio does not have to provide. Take a retiree who spends $72,000 a year and expects $30,000 from Social Security and a small pension. The gap is $42,000, so the target is $42,000 × 25 = $1,050,000. Get the spending figure right first: track a full year of actual expenses, including the irregular ones — a new roof, a car, medical bills — rather than guessing from a single month.",
          "The 3.9% column uses Morningstar's current estimate (see below). The difference is modest — about $26,000 on a $40,000 income — but it shows the direction of the research: today's starting conditions support slightly less than the classic 4%."
        ],
        "table": {
          "head": [
            "Annual spending from savings",
            "Target at 4% (25x)",
            "Target at 3.9% (25.6x)"
          ],
          "rows": [
            [
              "$30,000",
              "$750,000",
              "$769,000"
            ],
            [
              "$40,000",
              "$1,000,000",
              "$1,026,000"
            ],
            [
              "$50,000",
              "$1,250,000",
              "$1,282,000"
            ],
            [
              "$60,000",
              "$1,500,000",
              "$1,538,000"
            ]
          ]
        }
      },
      {
        "heading": "What the research says now",
        "paragraphs": [
          "The 4% rule is a backward-looking test: it asks what survived the past. Morningstar's annual State of Retirement Income research asks the opposite question — what can a new retiree withdraw, given today's bond yields, stock valuations, and inflation outlook? Its December 2025 edition puts the safe starting rate for 2026 retirees at 3.9%, defined as the highest rate that left money remaining in 90% of simulated 30-year retirements, for a portfolio holding 30% to 50% in stocks and excluding Social Security. That is up from 3.7% the year before, as expected returns improved across most asset classes.",
          "Bengen himself has moved the other way. In his 2025 book, A Richer Retirement, he raised his own figure to 4.7%, after adding small-company and international stocks to the portfolio and testing against the full historical record. The gap between 3.9% and 4.7% is mostly method: Morningstar projects forward from today's valuations, while Bengen replays history. Neither number includes taxes or fees.",
          "Both lines of research agree on one point: flexibility is worth more than precision. Morningstar found that retirees willing to let spending move with markets — trimming in down years, spending more after good ones — could start near 6%. The 4% rule's fixed real withdrawal is the cautious case: it assumes you never adjust. Most retirees do adjust, which is why the rule works better as a ceiling on first-year spending than as a fixed plan."
        ]
      },
      {
        "bullets": [
          "A 30-year retirement. Retire at 65 and the rule covers you to 95. Retire at 55 and you need 40 years, which the original studies never tested — plan on a lower rate.",
          "A stock-heavy portfolio. The Trinity results show 4% failing most of the time once bonds dominate. An all-bond portfolio survived only 20% of 30-year periods at 4%.",
          "US market history. Both studies use US stocks and bonds from 1926 onward — the strongest market record in the world. Other countries' markets produced lower safe rates.",
          "No taxes or fees. The studies model pre-tax withdrawals with no fund expenses. Withdrawals from a traditional 401(k) or IRA are taxed as income, so the spendable amount is less than 4%.",
          "Fixed real spending, whatever happens. The rule never cuts the withdrawal after a market fall and never raises it after a rally. Real retirees usually spend less as they age, which helps — but health costs can push the other way."
        ],
        "heading": "The assumptions the rule depends on",
        "paragraphs": [
          "The 4% rule holds only where its assumptions hold. Change one, and the safe rate moves."
        ]
      },
      {
        "heading": "Two risks the rule does not cover",
        "paragraphs": [
          "Sequence-of-returns risk is the first. The order of returns matters as much as the average. Two retirees with identical portfolios and identical average returns get different outcomes if one hits a bear market in the first five years: early losses shrink the portfolio while withdrawals stay fixed, leaving less capital to recover. The 1966 retiree in Bengen's study is the cautionary case — high inflation and weak stocks at the start. Holding a cash reserve outside the portfolio lets you ride out an early downturn without selling stocks at low prices.",
          "Required minimum distributions are the second. The 4% rule is a spending choice; RMDs are a legal requirement. Once you reach 73, the IRS requires withdrawals from traditional IRAs and 401(k)s, calculated by dividing the prior year-end balance by a life-expectancy factor from the IRS Uniform Lifetime Table. At 73 the factor is 26.5, so a $1 million balance requires a $37,736 withdrawal ($1,000,000 ÷ 26.5) — about 3.8%, close to the 4% rule. The factor shrinks each year, so required withdrawals rise as a share of the balance and eventually exceed 4%. You do not have to spend an RMD — you can reinvest it in a taxable account — but you do have to take it, and it is taxable income."
        ]
      },
      {
        "heading": "Putting the rule to work",
        "paragraphs": [
          "Use the rule as a checkpoint, not an autopilot setting. Once a year, divide your planned withdrawal by your current portfolio balance. If the result is well above 4% — because the portfolio fell or spending rose — that is the signal to trim, not to keep withdrawing the inflation-adjusted amount regardless. If it is well below 4%, you have room to spend more or to leave more behind.",
          "If you are still building the balance, the 2026 contribution limits are the levers that matter most: $24,500 into a 401(k), plus an $8,000 catch-up if you are 50 or older, and $7,500 into an IRA, plus a $1,100 catch-up. A worker 50 or older who maxes both puts away $41,100 a year ($24,500 + $8,000 + $7,500 + $1,100). Run your own numbers with the Retirement Calculator, and check the RMD math for your age with the RMD Calculator."
        ]
      }
    ],
    "seoTitle": "The 4% Rule Explained: Safe Withdrawal Rate in 2026",
    "slug": "the-4-percent-rule-explained",
    "sources": [
      {
        "label": "Cooley, Hubbard & Walz, \"Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable,\" AAII Journal (1998)",
        "url": "https://www.aaii.com/journal/199802/feature.pdf"
      },
      {
        "label": "Morningstar, \"What's a Safe Retirement Withdrawal Rate for 2026?\" (Dec 2025)",
        "url": "https://www.morningstar.com/retirement/whats-safe-retirement-withdrawal-rate-2026"
      },
      {
        "label": "IRS Publication 590-B, Distributions from Individual Retirement Arrangements (IRAs)",
        "url": "https://www.irs.gov/publications/p590b"
      }
    ],
    "title": "The 4% Rule Explained",
    "type": "What",
    "updated": "2026-11-05"
  },
  {
    "cornerstone": false,
    "description": "The 2026 standard deduction is $16,100 single and $32,200 joint. How it works in 2026, extra amounts for age 65+ and blindness, and when itemizing beats it.",
    "faqs": [
      {
        "answer": "Yes. The choice is made fresh on each year's return, and nothing carries over. Many filers itemize in a year with a large deductible expense — a home purchase, a big charitable gift, major medical bills — and take the standard deduction in ordinary years. Tax software compares the two totals automatically; the only work is gathering your itemized expenses to see which is larger.",
        "question": "Can I switch between the standard deduction and itemizing each year?"
      },
      {
        "answer": "No. The standard deduction comes after AGI, not before it. AGI is total income minus adjustments such as retirement contributions and student loan interest; the deduction then reduces AGI to taxable income. That order matters: AGI sets eligibility for credits and other deductions, so the standard deduction cannot help you qualify for an AGI-tested benefit.",
        "question": "Does the standard deduction lower my adjusted gross income?"
      },
      {
        "answer": "Then your taxable income is zero and you owe no federal income tax. A single filer earning $16,100 or less in 2026 pays nothing, though you may still want to file: a return is how you claim refundable credits such as the earned income tax credit, and how you recover any tax withheld from your paychecks.",
        "question": "What if my income is less than the standard deduction?"
      },
      {
        "answer": "No. Each state sets its own rules, and several have no standard deduction at all or a much smaller one. Nine states levy no tax on wage income, so the question does not arise there. Your state return starts from federal figures but applies state law, so check your state's standard deduction separately before assuming the federal amount carries over.",
        "question": "Is the standard deduction the same in every state?"
      },
      {
        "answer": "No. The standard deduction is a fixed amount set by the IRS for your filing status, and claiming it requires no proof of spending. That is its main advantage over itemizing, which needs records for every expense you list. You still need your income documents — W-2s, 1099s — but nothing extra for the deduction itself.",
        "question": "Do I need receipts to claim the standard deduction?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/what-is-the-standard-deduction.jpg",
    "imageAlt": "Flat-vector illustration of a deep emerald shield protecting a stack of burnt-orange coins",
    "inlineImage": "/images/what-is-the-standard-deduction-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of an emerald balance scale weighing one large burnt-orange coin against a pile of smaller coins",
    "intro": "The standard deduction is a fixed amount the IRS lets you subtract from your income before any tax is calculated. For 2026 it is $16,100 for single filers and $32,200 for married couples filing jointly. It is the simplest way to lower your taxable income: no receipts, no itemizing, no Schedule A.",
    "published": "2026-11-01",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Income Tax Calculator",
        "url": "/tax/income-tax-calculator"
      },
      {
        "name": "Tax Calculator",
        "url": "/tax/tax-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How the standard deduction works",
        "paragraphs": [
          "Your federal income tax is calculated on taxable income, not on everything you earn. Adjusted gross income (AGI) is your total income minus specific adjustments such as retirement contributions and student loan interest. The standard deduction then comes off your AGI. What is left is taxable income, and the tax brackets apply only to that remainder.",
          "Take a single filer earning $75,000 in 2026 with no adjustments, so AGI is $75,000. The standard deduction of $16,100 brings taxable income to $58,900. The first $16,100 is taxed at 0%. The deduction is not a refund or a credit: it does not put money back in your pocket directly. It shrinks the income the IRS taxes, and the saving equals the deduction times your marginal rate. At a 22% marginal rate, a $16,100 deduction is worth $3,542 of tax avoided.",
          "You choose the standard deduction or itemized deductions each year, whichever is larger. The choice is made on your return; there is no form to file in advance and no commitment to next year. Most filers take the standard deduction, because itemizing only wins when mortgage interest, state and local taxes, charitable gifts, and other deductible expenses add up to more than the standard amount."
        ]
      },
      {
        "heading": "The 2026 standard deduction amounts",
        "paragraphs": [
          "The IRS adjusts the standard deduction for inflation each year and publishes the new amounts each autumn in a revenue procedure. For tax year 2026, the amounts come from Revenue Procedure 2025-32. The One Big Beautiful Bill Act, signed in July 2025, also raised the base amounts permanently, so the 2026 figures are higher than a pure inflation adjustment would have produced. You use them on the return you file in early 2027.",
          "The increases over 2025 are $350 for single filers and $700 for joint filers. Head of household sits between the two: $24,150, exactly 1.5 times the single amount. Married filing separately gets the single amount each, so a couple filing separately claims $16,100 apiece — the same combined $32,200 as filing jointly, though other rules make separate filing less attractive for most couples."
        ],
        "table": {
          "head": [
            "Filing status",
            "2025",
            "2026"
          ],
          "rows": [
            [
              "Single",
              "$15,750",
              "$16,100"
            ],
            [
              "Married filing jointly",
              "$31,500",
              "$32,200"
            ],
            [
              "Married filing separately",
              "$15,750",
              "$16,100"
            ],
            [
              "Head of household",
              "$23,625",
              "$24,150"
            ],
            [
              "Qualifying surviving spouse",
              "$31,500",
              "$32,200"
            ]
          ]
        }
      },
      {
        "heading": "Extra amounts for age 65 and blindness",
        "paragraphs": [
          "Age and blindness each add a fixed amount on top of the basic deduction. For 2026 the additional amount is $2,050 per condition for single filers and heads of household, and $1,650 per condition per spouse for married filers. The amounts stack: a single filer who is both 65 or older and blind adds $4,100, and a married couple where both spouses are 65 or older adds $3,300.",
          "You count as 65 on the day before your 65th birthday, so a filer who turns 65 on January 1, 2027 qualifies for the extra amount on the 2026 return. Blindness is measured on the last day of the tax year, and the IRS definition in Publication 501 covers partial sight, not only total blindness. You claim the extra amounts by checking the age and blindness boxes on Form 1040 or Form 1040-SR, the version designed for seniors."
        ],
        "table": {
          "head": [
            "Filer",
            "Basic deduction",
            "Additional amount",
            "Total"
          ],
          "rows": [
            [
              "Single, age 68",
              "$16,100",
              "$2,050",
              "$18,150"
            ],
            [
              "Single, age 68 and blind",
              "$16,100",
              "$4,100",
              "$20,200"
            ],
            [
              "Head of household, age 70",
              "$24,150",
              "$2,050",
              "$26,200"
            ],
            [
              "Married filing jointly, both spouses 65+",
              "$32,200",
              "$3,300",
              "$35,500"
            ]
          ]
        }
      },
      {
        "heading": "The standard deduction for dependents",
        "paragraphs": [
          "A dependent's standard deduction is capped. If another taxpayer can claim you as a dependent, your standard deduction for 2026 is the greater of $1,350 or your earned income plus $450 — and it can never exceed the basic standard deduction for your filing status. The rule mainly affects teenagers and students with part-time jobs.",
          "A student who earns $6,000 from a summer job gets a standard deduction of $6,450 ($6,000 + $450), so none of that income is taxed. A dependent with no earned income and $2,000 of investment income gets $1,350, leaving $650 taxable. Unearned income above the limit is taxed even when the dependent earns nothing — the $450 add-on counts earned income only."
        ]
      },
      {
        "bullets": [
          "Your mortgage interest alone is close to the standard deduction — a large mortgage in its early years, when most of each payment is interest.",
          "You paid substantial state and local taxes and made large charitable gifts in the same year.",
          "You had major unreimbursed medical expenses in one year.",
          "You bunch deductions: paying two years of charitable gifts or property tax in one year to clear the standard deduction, then taking the standard deduction the next year."
        ],
        "heading": "Standard deduction or itemizing: how to decide",
        "paragraphs": [
          "Itemizing means listing deductible expenses on Schedule A instead of taking the flat amount. The expenses that usually matter are mortgage interest, state and local taxes up to a cap, charitable donations, and, for some filers, large medical expenses. You take whichever total is larger. Only the amount above the standard deduction saves tax: itemizing $18,000 as a single filer beats the standard deduction by $1,900, and at a 22% marginal rate that is worth $418.",
          "Bunching is the one planning move worth knowing. Because the choice is made year by year, timing deductible payments can push you over the line in alternating years. A couple that normally itemizes $28,000 — below the $32,200 joint standard deduction — can move a year of charitable gifts forward, itemize $36,000 in year one, and take the standard deduction in year two, gaining tax savings on the $3,800 excess."
        ]
      },
      {
        "heading": "A worked example: what the deduction saves",
        "paragraphs": [
          "The saving from the standard deduction depends on your marginal rate — the rate on your last dollar of income. The worked example below uses the 2026 single-filer brackets: 10% up to $12,400 of taxable income, 12% to $50,400, and 22% to $105,700.",
          "A single filer earning $75,000 has taxable income of $58,900 after the $16,100 deduction. Tax is 10% of $12,400 ($1,240), plus 12% of the $38,000 between $12,400 and $50,400 ($4,560), plus 22% of the $8,500 above $50,400 ($1,870): $7,670 in total. Without the deduction, the same income would be taxed on $75,000, adding 22% of $16,100 — $3,542 — to the bill. The deduction cuts the tax by nearly a third, and the effective rate on the full $75,000 is 10.2%.",
          "A married couple earning $120,000 jointly takes the $32,200 deduction, leaving $87,800 taxable. The 2026 joint brackets tax the first $24,800 at 10% ($2,480) and the remaining $63,000 at 12% ($7,560), for a total of $10,040 — an effective rate of 8.4% on gross income. Without the deduction the bill would be $15,824: the deduction saves $5,784, because it also keeps $19,200 of income out of the 22% bracket."
        ]
      },
      {
        "heading": "What the standard deduction does not cover",
        "paragraphs": [
          "The standard deduction lowers federal income tax only. It does not reduce Social Security or Medicare tax, which are charged on gross wages before any deduction. A single filer earning $75,000 still pays payroll tax on the full $75,000 even though income tax applies to $58,900. Self-employment tax works the same way: it is calculated on net business earnings, and the standard deduction does not touch it.",
          "State tax is separate too, though the federal deduction sometimes helps indirectly. States that start from federal taxable income inherit the federal deduction, so it lowers the state bill as well. States that start from federal AGI apply their own deduction rules instead, and several have no standard deduction at all. Check your state's return rather than assuming the federal amount carries over.",
          "Finally, the deduction is not a credit. A $16,100 deduction is worth $16,100 times your marginal rate — $1,610 at 10%, $3,542 at 22% — not $16,100 back. And it cannot take taxable income below zero: once your income is fully sheltered, the unused part of the deduction has no further value. It reduces tax; it never creates a refund on its own."
        ]
      },
      {
        "heading": "Who cannot claim it, and the separate senior deduction",
        "paragraphs": [
          "A few filers cannot take the standard deduction at all. If you file separately and your spouse itemizes, you must itemize too — the IRS does not let one spouse take the flat amount while the other lists expenses. Nonresident aliens and dual-status aliens generally cannot claim it, with narrow exceptions for those married to U.S. citizens or residents who elect joint treatment. Short-year returns filed after a change of accounting period, and returns for estates, trusts, and partnerships, are also excluded.",
          "Separate from the standard deduction, filers 65 and older can claim an enhanced senior deduction of up to $6,000 for 2025 through 2028 under the One Big Beautiful Bill Act. It is not part of the standard deduction: it is claimed on Schedule 1-A, it applies whether you itemize or not, and it phases out above an income limit. A single 66-year-old in 2026 can therefore deduct $18,150 as a standard deduction plus up to $6,000 as a senior deduction — do not confuse the two when comparing your return to someone else's."
        ]
      }
    ],
    "seoTitle": "What Is the Standard Deduction? 2026 Amounts Explained",
    "slug": "what-is-the-standard-deduction",
    "sources": [
      {
        "label": "IRS Revenue Procedure 2025-32 — 2026 inflation adjustments, section 4.14",
        "url": "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf"
      },
      {
        "label": "IRS Topic No. 551 — Standard deduction",
        "url": "https://www.irs.gov/taxtopics/tc551"
      },
      {
        "label": "IRS Publication 501 — Dependents, Standard Deduction, and Filing Information",
        "url": "https://www.irs.gov/publications/p501"
      }
    ],
    "title": "What Is the Standard Deduction?",
    "type": "What",
    "updated": "2026-11-01"
  },
  {
    "cornerstone": false,
    "description": "Overtime is 1.5x your regular rate for hours over 40 in a workweek. See the FLSA formula, worked hourly and salaried examples, and the 2026 tax deduction.",
    "faqs": [
      {
        "answer": "Under federal law, weekly. The FLSA requires overtime only for hours over 40 in a workweek, so a single 12-hour day triggers no federal overtime if the week totals 40 hours or fewer. Some states add a daily rule: California, for example, requires 1.5 times the regular rate for hours over 8 in a workday. When both laws apply, you get whichever standard pays more.",
        "question": "Is overtime calculated daily or weekly?"
      },
      {
        "answer": "Nondiscretionary bonuses do. If a bonus is promised for hitting a target — a production bonus, a retention bonus tied to staying a set period, or a commission — it is part of your regular rate for the weeks it covers, and your overtime premium must be calculated on the higher rate. Truly discretionary bonuses, decided after the fact with no prior promise, and gifts are excluded.",
        "question": "Do bonuses count toward my overtime rate?"
      },
      {
        "answer": "No. A salary alone does not make a job exempt. To be exempt under the white-collar exemptions, an employee must be paid on a salary basis of at least $684 a week ($35,568 a year) and perform duties that fit the executive, administrative, or professional tests. A salaried employee who fails any part of the test is nonexempt and is owed overtime on hours over 40.",
        "question": "Does a salary mean I do not get overtime?"
      },
      {
        "answer": "No. For tax years 2025 through 2028, you can deduct the FLSA-required premium portion of overtime — the extra half of time-and-a-half — up to $12,500 a year ($25,000 joint), with a phase-out above $150,000 of modified adjusted gross income ($300,000 joint). Overtime pay is still wages for withholding, and Social Security and Medicare taxes still apply in full.",
        "question": "Is overtime pay tax-free now?"
      },
      {
        "answer": "Start by keeping your own record of hours worked and comparing it with your pay stubs and the regular-rate math in this guide. Raise the shortfall with your employer in writing. If that does not resolve it, you can file a complaint with the Department of Labor's Wage and Hour Division at 1-866-487-9243. The FLSA generally allows two years to claim unpaid overtime, or three years if the violation was willful.",
        "question": "What if my employer did not pay overtime I was owed?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/how-overtime-pay-is-calculated.jpg",
    "imageAlt": "Flat-vector illustration of a wall clock, stacked timecards, and a hard hat in deep emerald, burnt orange, and sage on a cream background",
    "inlineImage": "/images/how-overtime-pay-is-calculated-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a pay envelope with a blank pay slip, stacks of coins, and an hourglass in deep emerald, burnt orange, and sage",
    "intro": "Overtime pay is 1.5 times your regular rate for every hour over 40 in a workweek. The regular rate is not always your hourly wage: it includes most bonuses, commissions, and shift differentials. This guide works through the federal formula, salaried and multi-rate examples, who is exempt, and the new federal tax deduction for overtime.",
    "published": "2026-11-09",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Overtime Calculator",
        "url": "/tax/overtime-calculator"
      },
      {
        "name": "Paycheck Calculator",
        "url": "/tax/paycheck-calculator"
      }
    ],
    "sections": [
      {
        "heading": "The federal rule",
        "paragraphs": [
          "The Fair Labor Standards Act (FLSA) requires covered employers to pay nonexempt employees at least 1.5 times their regular rate for hours worked over 40 in a workweek. The rule is weekly, not daily: federal law does not require overtime for a long single day, and it does not require premium pay for work on Saturdays, Sundays, holidays, or regular days of rest as such.",
          "A workweek is a fixed, regularly recurring period of 168 hours — seven consecutive 24-hour periods. It can start on any day and at any hour, and different employees can have different workweeks. Hours cannot be averaged across two or more weeks: a 50-hour week followed by a 30-hour week still owes 10 hours of overtime, even though the two-week average is 40. Overtime earned in a workweek is normally due on the regular payday for the pay period in which it was earned.",
          "There is no federal limit on the number of hours employees aged 16 and older may work in a week. The FLSA sets the floor, not the ceiling: an employer can pay more than time-and-a-half, and many union contracts and state laws do."
        ]
      },
      {
        "bullets": [
          "Nondiscretionary bonuses, commissions, and shift differentials count. A production bonus you earn by hitting a target raises your regular rate for the weeks it covers.",
          "Discretionary bonuses, gifts, and payments for time not worked do not count. A holiday bonus the employer decides on the spot, vacation pay, holiday pay, and sick pay are all excluded.",
          "Expense reimbursements and true premium pay for weekend or holiday work are also excluded from the regular rate.",
          "The regular rate can never fall below the federal minimum wage of $7.25 an hour."
        ],
        "heading": "What counts in the regular rate",
        "paragraphs": [
          "The regular rate is the hourly rate your overtime premium is built on, and it is usually more than your base wage. The FLSA defines it as all remuneration for employment, with a short list of statutory exclusions. Divide total pay for the week (minus the exclusions) by total hours actually worked, and that is the regular rate — even if you are paid by salary, piece rate, or commission.",
          "This is where most paycheck errors happen. If your employer calculates overtime on your base wage alone while paying you a shift differential or a nondiscretionary bonus, the premium is understated. The fix is to add those amounts to the week's pay before dividing by hours."
        ]
      },
      {
        "heading": "Hourly workers: a worked example",
        "paragraphs": [
          "Take a warehouse worker earning $24.00 an hour who works 48 hours in a week. The first 40 hours pay straight time: 40 × $24.00 = $960.00. The 8 overtime hours pay 1.5 times the regular rate: 8 × $36.00 = $288.00. Gross pay for the week is $1,248.00.",
          "The same math scales. At $24.00 an hour, each overtime hour is worth $36.00, so every extra hour past 40 adds $12.00 more than a straight-time hour. The table below shows gross weekly pay at $24.00 an hour for weeks of 40 to 60 hours."
        ],
        "table": {
          "head": [
            "Hours worked",
            "Straight-time pay",
            "Overtime pay",
            "Gross pay"
          ],
          "rows": [
            [
              "40",
              "$960.00",
              "$0.00",
              "$960.00"
            ],
            [
              "45",
              "$960.00",
              "$180.00",
              "$1,140.00"
            ],
            [
              "50",
              "$960.00",
              "$360.00",
              "$1,320.00"
            ],
            [
              "55",
              "$960.00",
              "$540.00",
              "$1,500.00"
            ],
            [
              "60",
              "$960.00",
              "$720.00",
              "$1,680.00"
            ]
          ]
        }
      },
      {
        "heading": "Salaried nonexempt workers",
        "paragraphs": [
          "Being paid a salary does not by itself remove the right to overtime. A salaried employee who is nonexempt is owed overtime, and the regular rate comes from dividing the salary by the hours it covers. A fixed salary for a workweek longer than 40 hours does not discharge the employer's overtime obligation.",
          "Example: a salaried nonexempt employee earns $1,040 a week and works 48 hours. The regular rate is $1,040 ÷ 48 = $21.67 an hour. The salary already covers straight-time pay for all 48 hours, so the overtime owed is only the extra half-rate on the 8 overtime hours: 8 × $10.83 = $86.67. Gross pay for the week is $1,040.00 + $86.67 = $1,126.67.",
          "Note how the regular rate falls as hours rise: the same $1,040 salary over 50 hours gives a regular rate of $20.80, and over 60 hours $17.33. That is the arithmetic of a fixed salary spread over more hours — and why the Department of Labor's own example, a $405 salary for a 45-hour week, produces a regular rate of $9.00 and $22.50 of overtime (5 hours × $4.50)."
        ]
      },
      {
        "heading": "Two rates in one week",
        "paragraphs": [
          "When an employee works at two or more rates in a single workweek, the regular rate for that week is the weighted average of those rates: add the earnings from all rates together and divide by the total hours worked at all jobs.",
          "Example: a worker spends 30 hours on the floor at $20.00 an hour and 20 hours driving at $26.00 an hour. Earnings are (30 × $20.00) + (20 × $26.00) = $600.00 + $520.00 = $1,120.00. The regular rate is $1,120.00 ÷ 50 = $22.40. The 10 overtime hours owe the extra half-rate: 10 × $11.20 = $112.00. Gross pay is $1,232.00.",
          "The same divide-total-pay-by-total-hours method applies to piece-rate and commission workers. Add up everything earned in the week (minus the statutory exclusions), divide by hours actually worked, and pay the half-rate premium on hours over 40. Under FLSA section 7(g)(2), an employer may instead pay 1.5 times the rate in effect when the overtime was performed, but only under conditions set out in the regulations."
        ]
      },
      {
        "bullets": [
          "Salary basis: the employee is paid a fixed salary that does not shrink with hours worked or output.",
          "Salary level: at least $684 a week ($35,568 a year) for most executive, administrative, and professional employees. A 2024 rule that would have raised this figure was vacated by a federal court, and the Department of Labor restored the $684 level in May 2026.",
          "Duties: the employee's primary duties must fit the exemption — managing a department and directing two or more full-time employees for executives, office work tied to management or business operations with independent judgment for administrative staff, and work requiring advanced knowledge for professionals.",
          "Highly compensated employees need total annual compensation of at least $107,432, including at least $684 a week paid on a salary or fee basis."
        ],
        "heading": "Who does not get overtime",
        "paragraphs": [
          "Not every worker is covered. The FLSA exempts bona fide executive, administrative, professional, computer, and outside sales employees — the white-collar exemptions — along with groups such as certain agricultural workers, seasonal amusement employees, and railroad and air carrier employees. Exemption is the exception: an employer must meet every element of the test, and a job title alone never decides it.",
          "If any test fails, the employee is nonexempt and owed overtime. A worker paid $600 a week with a manager title is nonexempt, because the salary level is not met. Doctors, lawyers, teachers, and outside sales employees are not subject to the salary-level test."
        ]
      },
      {
        "bullets": [
          "Averaging hours across a two-week pay period instead of counting each workweek separately.",
          "Leaving nondiscretionary bonuses, commissions, or shift differentials out of the regular rate.",
          "Offering time off instead of overtime pay. Under FLSA section 7(o), comp time in place of cash overtime is limited to public agencies; a private employer must pay cash.",
          "Treating overtime as waivable. An employee cannot agree away the right to overtime pay, and an employer cannot refuse to pay for overtime it knew about, even if it was not authorized in advance."
        ],
        "heading": "State rules and common mistakes",
        "paragraphs": [
          "Federal law is the floor. When state and federal rules both apply, the worker gets the higher standard. Several states require daily overtime: California pays 1.5 times the regular rate for hours over 8 in a workday (up to 12) and double time for hours over 12, under California Labor Code Section 510. Check your state labor department for the rules where you work.",
          "Four mistakes show up repeatedly in underpaid overtime:",
          "If your pay looks short, keep your own record of hours worked and compare it against your pay stubs. The FLSA generally allows two years to claim unpaid overtime — three years if the violation was willful."
        ]
      },
      {
        "heading": "The federal overtime tax deduction",
        "paragraphs": [
          "For tax years 2025 through 2028, the One Big Beautiful Bill Act (P.L. 119-21) created a federal income tax deduction for qualified overtime compensation. It is a deduction, not an exemption: overtime pay is still wages, still subject to income tax withholding, and still subject to Social Security and Medicare taxes.",
          "Only the premium counts. Qualified overtime compensation is the amount above your regular rate that the FLSA requires — the “half” in time-and-a-half. On an 8-hour overtime week at a $24.00 regular rate, that is 8 × $12.00 = $96.00 of qualified overtime, not the $288.00 of overtime pay. The deduction is capped at $12,500 a year ($25,000 on a joint return) and is reduced by $100 for each $1,000 of modified adjusted gross income above $150,000 ($300,000 joint), reaching zero at $275,000 ($550,000 joint).",
          "You can claim it whether you itemize or take the standard deduction, on Schedule 1-A of Form 1040. Married taxpayers must file jointly. Starting with tax year 2026, your employer must report your qualified overtime in Form W-2 box 12 with code TT, and the deduction is limited to the amount reported — so check that figure against your pay records. Withholding does not change automatically; you can adjust it by filing a new Form W-4 that accounts for the expected deduction."
        ]
      }
    ],
    "seoTitle": "How Overtime Pay Is Calculated: FLSA Formula & Examples",
    "slug": "how-overtime-pay-is-calculated",
    "sources": [
      {
        "label": "DOL Fact Sheet #23: Overtime Pay Requirements of the FLSA",
        "url": "https://www.dol.gov/agencies/whd/fact-sheets/23-flsa-overtime-pay"
      },
      {
        "label": "DOL: Earnings thresholds for the executive, administrative, and professional exemption",
        "url": "https://www.dol.gov/agencies/whd/overtime/salary-levels"
      },
      {
        "label": "IRS Fact Sheet FS-2026-13: Questions and answers about the new deduction for qualified overtime compensation",
        "url": "https://www.irs.gov/pub/taxpros/fs-2026-13.pdf"
      },
      {
        "label": "26 U.S.C. § 225: Qualified overtime compensation",
        "url": "https://uscode.house.gov/us/usc/119-118/t26/s225/"
      }
    ],
    "title": "How Overtime Pay Is Calculated",
    "type": "What",
    "updated": "2026-11-09"
  },
  {
    "cornerstone": false,
    "description": "FICA is the 7.65% payroll tax on your pay: 6.2% Social Security up to the $184,500 wage base, plus 1.45% Medicare on all wages. See 2026 rates and examples.",
    "faqs": [
      {
        "answer": "No. FICA is a payroll tax that funds Social Security and Medicare, charged at flat rates on wages up to the limits described above. Federal income tax is charged on taxable income at graduated bracket rates and funds general government spending. The two appear as separate lines on your pay stub, and paying one does not reduce the other.",
        "question": "Is FICA the same as federal income tax?"
      },
      {
        "answer": "Your year-to-date wages passed the $184,500 wage base for 2026, so your employer stopped withholding the 6.2% Social Security tax for the rest of the year. Medicare withholding continues on every dollar. The counter resets on January 1, and the 6.2% deduction returns on your first paycheck of the new year.",
        "question": "Why did the Social Security line disappear from my paycheck?"
      },
      {
        "answer": "Yes. Bonuses, commissions, and tips are wages for FICA purposes and are taxed at the same rates as regular pay: 6.2% Social Security up to the wage base and 1.45% Medicare on the full amount. If the bonus pushes your wages past $184,500, only the part below the base owes Social Security tax.",
        "question": "Do I pay FICA tax on a bonus?"
      },
      {
        "answer": "Only the Social Security part, and only when the excess came from two or more employers. Add up Box 4 on all your W-2s, subtract the $11,439 maximum for 2026, and claim the difference on Schedule 3, line 11. Medicare tax has no cap, so it is never overwithheld, and a single employer's error must be refunded by the employer.",
        "question": "Can I get FICA tax back if too much was withheld?"
      },
      {
        "answer": "No. FICA applies to wages and net self-employment earnings only. Dividends, capital gains, interest, and rental income are not FICA wages and owe no Social Security or Medicare tax through payroll. High earners may owe a separate net investment income tax on some investment income, but that is a different tax, settled on the tax return rather than through withholding.",
        "question": "Does FICA apply to investment income?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/what-is-fica-tax.jpg",
    "imageAlt": "Flat-vector illustration of a paycheck split into three colored segments, with a shield and a heart beside it",
    "inlineImage": "/images/what-is-fica-tax-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a worker and an employer each holding a coin beside a balanced scale",
    "intro": "FICA is the payroll tax taken from every paycheck to fund Social Security and Medicare. In 2026, employees pay 7.65% of wages: 6.2% for Social Security on the first $184,500 earned, plus 1.45% for Medicare on all wages. Your employer matches both parts, and high earners pay an extra 0.9% Medicare tax.",
    "published": "2026-11-12",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Paycheck Calculator",
        "url": "/tax/paycheck-calculator"
      },
      {
        "name": "Take-Home Pay Calculator",
        "url": "/tax/take-home-pay-calculator"
      }
    ],
    "sections": [
      {
        "heading": "The two taxes inside FICA",
        "paragraphs": [
          "FICA stands for the Federal Insurance Contributions Act, the law that created the payroll tax funding Social Security and Medicare. It is not income tax. Federal income tax goes to the general fund; FICA goes to the Social Security and Medicare trust funds, and the amount you pay is tied to the benefits you can later claim.",
          "Two separate taxes make up FICA. The Social Security tax, formally Old-Age, Survivors, and Disability Insurance (OASDI), pays retirement, disability, and survivor benefits. The Medicare tax, formally hospital insurance, funds Medicare Part A, the hospital coverage most people qualify for at 65.",
          "Employees pay 6.2% for Social Security and 1.45% for Medicare, a combined 7.65% on wages below the wage base. Employers pay an identical 7.65% on top of your salary, so the total collected on your pay is 15.3%. The employer share never appears on your pay stub as a deduction, but it is part of what your job costs your employer."
        ],
        "table": {
          "head": [
            "Component",
            "Employee rate",
            "Employer rate",
            "Applies to"
          ],
          "rows": [
            [
              "Social Security",
              "6.2%",
              "6.2%",
              "First $184,500 of wages in 2026"
            ],
            [
              "Medicare",
              "1.45%",
              "1.45%",
              "All wages, no cap"
            ],
            [
              "Additional Medicare",
              "0.9%",
              "None, no match",
              "Wages above $200,000 single / $250,000 joint"
            ],
            [
              "Combined base rate",
              "7.65%",
              "7.65%",
              "Up to the wage base; 1.45% above it"
            ]
          ]
        }
      },
      {
        "heading": "The Social Security wage base in 2026",
        "paragraphs": [
          "Social Security tax stops once your wages for the year reach the wage base, also called the taxable maximum or the contribution and benefit base. For 2026 the wage base is $184,500, up $8,400 from $176,100 in 2025. The Social Security Administration sets it each fall from the national average wage index, so it usually rises a little every year.",
          "The cap limits what you pay. At 6.2%, the most any employee pays in Social Security tax in 2026 is $184,500 x 6.2% = $11,439. Your employer pays the same $11,439. Once your year-to-date wages cross $184,500, your employer stops withholding the 6.2% for the rest of the year, and your take-home pay rises by that amount until January, when the counter resets.",
          "A worker earning $250,000 a year crosses the base in September, so the last three months of paychecks carry no Social Security withholding. A worker earning $100,000 never reaches the base and pays 6.2% on every paycheck all year. The cap applies per person, not per job: if you change employers mid-year, the new employer withholds from dollar one, and you settle any overpayment on your tax return."
        ]
      },
      {
        "heading": "Medicare tax has no cap",
        "paragraphs": [
          "Medicare tax works the opposite way. The 1.45% rate applies to every dollar of covered wages, with no ceiling. A worker earning $500,000 pays 1.45% on the full $500,000, or $7,250, and the employer matches it.",
          "High earners pay a third layer: the Additional Medicare Tax of 0.9% on wages above a threshold set by filing status. The threshold is $200,000 for single filers, head of household, and qualifying surviving spouses; $250,000 for married couples filing jointly; and $125,000 for married filing separately. The thresholds are written into the tax code and are not adjusted for inflation, so more workers cross them as wages rise.",
          "Withholding follows a simpler rule than liability. Your employer must start withholding the extra 0.9% once the wages it pays you pass $200,000 in the calendar year, regardless of your filing status, and keep withholding it through December. There is no employer match on the 0.9%. The actual tax is settled on your return with Form 8959, which compares your total Medicare wages and self-employment income against your filing-status threshold and credits what was already withheld."
        ]
      },
      {
        "heading": "What FICA costs at three salaries",
        "paragraphs": [
          "The table below shows the employee share of FICA for three salaries in 2026, assuming a single filer with no pre-tax deductions. The pattern is the point: the effective FICA rate falls as income rises, because the Social Security piece stops at $184,500 while only Medicare keeps going.",
          "On a $100,000 salary paid biweekly, each check carries $3,846.15 of gross pay and $294.23 of FICA ($3,846.15 x 7.65%). On the $250,000 salary, the 0.9% layer adds $450 for the year: 0.9% x ($250,000 - $200,000). The employer pays a matching $15,064 on that salary, $11,439 of Social Security plus $3,625 of Medicare, with no match on the $450.",
          "To see FICA inside your own paycheck, run your salary through the Paycheck Calculator, which breaks out every withholding line, or the Take-Home Pay Calculator, which adds 401(k), HSA, and premium deductions to the picture."
        ],
        "table": {
          "head": [
            "Salary",
            "Social Security (6.2%)",
            "Medicare (1.45%)",
            "Additional Medicare (0.9%)",
            "Total FICA",
            "Effective rate"
          ],
          "rows": [
            [
              "$50,000",
              "$3,100",
              "$725",
              "$0",
              "$3,825",
              "7.65%"
            ],
            [
              "$100,000",
              "$6,200",
              "$1,450",
              "$0",
              "$7,650",
              "7.65%"
            ],
            [
              "$250,000",
              "$11,439",
              "$3,625",
              "$450",
              "$15,514",
              "6.21%"
            ]
          ]
        }
      },
      {
        "heading": "How FICA shows up on your pay stub",
        "paragraphs": [
          "Most pay stubs list FICA as two lines, not one. The Social Security line may read 'Social Security,' 'OASDI,' or 'FICA-SS'; the Medicare line may read 'Medicare,' 'HI,' or 'FICA-Med.' The Additional Medicare Tax, when it applies, usually appears on the Medicare line or as its own line. The labels vary by payroll provider, but the math behind them does not.",
          "Check the year-to-date column, not just the current period. Divide the year-to-date Social Security withholding by your year-to-date gross pay: the result should be 6.2% until your wages pass $184,500. A mismatch usually means a pre-tax cafeteria-plan deduction lowered your FICA wages, which is correct, or that a bonus was processed on a separate check, which is also correct.",
          "Your W-2 carries the same split into tax season. Box 3 reports Social Security wages and Box 4 the tax withheld; Box 5 reports Medicare wages and Box 6 the tax withheld. Compare Box 4 against 6.2% of Box 3, up to the $11,439 maximum: if they do not match, ask payroll before you file. Keep the final pay stub of the year: it is the fastest way to check the W-2 against what was actually withheld."
        ]
      },
      {
        "heading": "FICA for self-employed workers",
        "paragraphs": [
          "Self-employed workers have no employer to split the bill, so they pay both halves as self-employment tax: 12.4% for Social Security plus 2.9% for Medicare, a combined 15.3%. The tax is figured on Schedule SE and filed with Form 1040.",
          "The 15.3% applies to net earnings from self-employment, not to gross revenue. Schedule SE first multiplies net profit by 92.35%, which mirrors the employer share an employee never pays tax on. A freelancer with $80,000 of net profit has net earnings of $80,000 x 92.35% = $73,880, and owes $73,880 x 15.3% = $11,303.64 in self-employment tax. Half of that tax, $5,651.82, is deductible when figuring adjusted gross income.",
          "The same $184,500 wage base caps the 12.4% Social Security portion, counting W-2 wages and net earnings together. The 2.9% Medicare portion has no cap, and the 0.9% Additional Medicare Tax applies above the same filing-status thresholds. You owe self-employment tax once net earnings reach $400 for the year, and it is paid with quarterly estimated payments rather than withholding."
        ]
      },
      {
        "bullets": [
          "Traditional 401(k) and 403(b) deferrals lower your federal income tax, but they do not reduce FICA wages. You pay Social Security and Medicare tax on the full gross pay, which is why W-2 Box 3 (Social Security wages) and Box 5 (Medicare wages) are usually larger than Box 1 (federal wages).",
          "Health insurance premiums, HSA contributions, and FSA contributions made through a Section 125 cafeteria plan do reduce FICA wages, so both you and your employer pay less payroll tax on that money.",
          "Employer matching contributions to your 401(k) are not wages at all: they are exempt from FICA entirely.",
          "Bonuses, commissions, and tips are FICA wages in full, taxed at the same rates as regular pay."
        ],
        "heading": "What counts as FICA wages",
        "paragraphs": [
          "FICA applies to wages, salaries, tips, and bonuses, but not every dollar on your pay stub is treated the same way. The key distinction is which pre-tax deductions shrink the wages FICA is figured on.",
          "The practical consequence is worth knowing when you choose between accounts: a dollar in a cafeteria-plan HSA or FSA escapes FICA, while a dollar in a traditional 401(k) does not. That does not make one choice better than the other, but it is one more input to the decision."
        ]
      },
      {
        "heading": "Two jobs and the excess Social Security credit",
        "paragraphs": [
          "Each employer applies the $184,500 wage base to its own payroll only. It cannot see your other jobs, so two employers can each withhold the full 6.2% and push your combined withholding past the $11,439 yearly maximum.",
          "The overpayment is not lost. Add up the Social Security tax in Box 4 of every W-2, subtract $11,439, and claim the difference as a credit on Schedule 3 of Form 1040, line 11. Take two jobs paying $120,000 and $90,000: withholding is $7,440 plus $5,580, or $13,020, so the credit is $13,020 - $11,439 = $1,581. The credit is refundable, so it comes back even if you owe no income tax.",
          "The credit only covers overwithholding caused by multiple employers. If one employer withholds more than $11,439 on its own, that is a payroll error: ask the employer to refund it. Each spouse on a joint return figures the credit separately against their own $11,439 maximum."
        ]
      }
    ],
    "seoTitle": "What Is FICA Tax? 2026 Rates, Wage Base & Examples",
    "slug": "what-is-fica-tax",
    "sources": [
      {
        "label": "IRS Topic No. 751, Social Security and Medicare withholding rates",
        "url": "https://www.irs.gov/taxtopics/tc751"
      },
      {
        "label": "IRS Topic No. 560, Additional Medicare tax",
        "url": "https://www.irs.gov/taxtopics/tc560"
      },
      {
        "label": "Social Security Administration, Contribution and Benefit Base",
        "url": "https://www.ssa.gov/oact/cola/cbb.html"
      },
      {
        "label": "IRS, Self-employment tax (Social Security and Medicare taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      }
    ],
    "title": "What Is FICA Tax?",
    "type": "What",
    "updated": "2026-11-12"
  },
  {
    "cornerstone": false,
    "description": "A small refund means withholding matched your tax bill, or a credit shrank. The six most common causes, with real numbers, and how to fix it next year.",
    "faqs": [
      {
        "answer": "No. A refund is the IRS returning tax you overpaid during the year, and you earn no interest on that overpayment. A small refund usually means your withholding closely matched your tax bill, so you kept more of each paycheck instead of lending it to the government. What matters is your total tax on Form 1040, line 24 — not the size of the refund check.",
        "question": "Is a small tax refund a bad thing?"
      },
      {
        "answer": "Something usually did change, even if it was quiet. A child may have turned 17 and lost the $2,200 child tax credit, a raise may have pushed you into an earned income credit phaseout, or a new W-4 may have made your withholding more accurate. Compare line 24 (total tax) and line 33 (total payments) on this year's return with last year's to see which side moved.",
        "question": "Why is my refund smaller than last year when nothing changed?"
      },
      {
        "answer": "The IRS says an e-filed return typically takes about three weeks, while a mailed return takes six weeks or more. Returns claiming the earned income credit or the additional child tax credit are held until mid-February by law, so the whole refund waits even if you file in January. Track the status with the IRS Where's My Refund tool.",
        "question": "How long does it take to get a tax refund?"
      },
      {
        "answer": "Yes. Enter an extra amount in Step 4(c) of Form W-4 and your employer will withhold it from every paycheck; divide the refund you want by your number of paydays to find the per-check amount. Keep in mind the IRS pays no interest on overwithheld tax, so a bigger refund is really a smaller paycheck all year — useful as forced saving, but not free money.",
        "question": "Can I get a bigger refund next year?"
      },
      {
        "answer": "The most common reason is an adjustment to your return: a math error, a credit you did not qualify for, tax owed from a prior year, or underpaid estimated tax. The other reason is a debt offset, where the Treasury's Bureau of the Fiscal Service takes part of your refund for past-due child support, federal debts, or state tax. Either way you get a notice explaining the change and how to dispute it.",
        "question": "Why did the IRS reduce my refund?"
      }
    ],
    "hub": "Salary, Tax, Retirement & Investing",
    "image": "/images/why-is-my-tax-refund-so-small.jpg",
    "imageAlt": "Flat illustration of coin stacks shrinking from tall to a single coin beside a large emerald document shape",
    "inlineImage": "/images/why-is-my-tax-refund-so-small-inline.jpg",
    "inlineImageAlt": "Flat illustration of a magnifying glass over a blank paycheck with a single small coin beside it",
    "intro": "A small refund usually means your employer withheld almost exactly what you owed — or a credit you counted on shrank or disappeared. A refund is not a bonus; it is the IRS returning tax you overpaid. When the overpayment is small, the refund is small. The fix starts with finding which of the two changed.",
    "published": "2026-11-15",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Paycheck Calculator",
        "url": "/tax/paycheck-calculator"
      },
      {
        "name": "Income Tax Calculator",
        "url": "/tax/income-tax-calculator"
      }
    ],
    "sections": [
      {
        "heading": "A refund is your own money coming back",
        "paragraphs": [
          "A tax refund is not a gift from the government. It is the difference between what you paid during the year — mostly tax withheld from your paychecks — and what you actually owed. If you paid $5,400 and owed $5,020, your refund is $380. If you paid exactly what you owed, your refund is zero, and nothing went wrong.",
          "Take a single filer earning $60,000 in wages in 2026. The standard deduction is $16,100, leaving $43,900 of taxable income. The tax is 10% of the first $12,400 ($1,240) plus 12% of the remaining $31,500 ($3,780), for a total of $5,020. If the employer withheld $5,020 over the year, the refund is $0 — the system worked exactly as designed.",
          "That is why comparing refunds year to year misleads. A smaller refund can mean you kept more of each paycheck during the year instead of lending it to the IRS interest-free. The number that matters is your total tax, not the size of the check in April."
        ]
      },
      {
        "heading": "Your withholding got more accurate",
        "paragraphs": [
          "The IRS redesigned Form W-4 in 2020 and removed withholding allowances entirely. The new form asks directly about multiple jobs, dependents, and other income, and the withholding tables built on it aim to match your tax bill more closely than the old allowance system did.",
          "If you started a new job, or filed a new W-4 after a life change, your employer now withholds a more accurate amount — and a more accurate amount means a smaller refund. The IRS notes in its own guidance that you can ask for extra withholding in Step 4(c) of Form W-4 if you prefer a larger refund, but you earn no interest on the amount you overpay.",
          "Check your last pay stub. If federal withholding fell after a W-4 change while your pay stayed the same, that is where the refund went: into your paychecks, spread across the year."
        ]
      },
      {
        "heading": "A child turned 17, or a dependent left",
        "paragraphs": [
          "The child tax credit is worth up to $2,200 per qualifying child for 2026, but only while the child is under 17 at the end of the year. The year a child turns 17, the credit drops to the $500 credit for other dependents — a $1,700 swing on one birthday.",
          "The loss can be bigger than $1,700. Up to $1,700 of the child credit is refundable through the additional child tax credit, meaning it can come back as cash even if you owe no tax. The $500 credit for other dependents is not refundable at all: it can only reduce tax you owe, and any leftover is lost.",
          "Take a single parent earning $20,000 who files as head of household. The $24,150 standard deduction is bigger than the income, so the tax is $0. The $2,200 child credit has no tax to cancel, but up to $1,700 of it comes back as a refund through the additional child tax credit. The year the child turns 17, the refundable $1,700 disappears and the $500 replacement credit is nonrefundable — with no tax to offset, it is worth nothing. The refund falls by $1,700."
        ]
      },
      {
        "heading": "A raise shrank a credit",
        "paragraphs": [
          "Several credits shrink as income rises, and the phaseouts are steep enough that a raise can cost more in lost credits than it adds in pay. The earned income tax credit is the sharpest example: for 2026 it is worth up to $8,231 for a family with three or more children, and it phases out completely at $62,974 of income for a single filer and $70,244 for a married couple filing jointly.",
          "The child tax credit phases out too, starting at $200,000 of modified adjusted gross income ($400,000 on a joint return), losing $50 for every $1,000 above the threshold. A bonus or a second income that pushes a household across a threshold can quietly remove part of a credit the family received the year before.",
          "A higher income also pushes more of each dollar into a higher bracket. The 2026 single brackets run 10% to $12,400, 12% to $50,400, and 22% to $105,700 — but only the income inside each band is taxed at that rate. A raise never makes your whole income taxable at the higher rate; it only taxes the top slice. If your refund fell after a raise, the likelier cause is a lost credit, not the bracket."
        ]
      },
      {
        "heading": "You itemized less, or the standard deduction did the work",
        "paragraphs": [
          "You only benefit from itemizing when your itemized deductions beat the standard deduction — $16,100 single or $32,200 joint for 2026. Most filers take the standard deduction, so a year with fewer deductible expenses changes nothing on the return.",
          "The state and local tax deduction is capped at $40,400 for 2026 ($20,200 if married filing separately), and it phases down once modified adjusted gross income passes $505,000. If you paid more than the cap in state and property taxes, the excess buys you no deduction at all.",
          "Mortgage interest and charitable gifts only matter above the standard-deduction line. A filer with $14,000 of itemized deductions gets the same $16,100 standard deduction as everyone else — the itemizing added nothing, and the refund reflects that."
        ]
      },
      {
        "heading": "Side income arrived without withholding",
        "paragraphs": [
          "Wages arrive with tax already withheld. Freelance, gig, and contract income does not. If you earned money on a 1099 and made no estimated payments, that tax comes due on your return — and it comes straight out of your refund.",
          "Self-employment income carries two taxes: income tax and self-employment tax of 15.3% (12.4% for Social Security and 2.9% for Medicare). The self-employment tax applies to 92.35% of net earnings, and half of it is deductible from income.",
          "$10,000 of freelance profit means $9,235 of net earnings for self-employment tax, which comes to $1,413. Half of that, $706, is deductible, leaving $9,294 of additional taxable income; at a 12% marginal rate that adds about $1,115 of income tax. One $10,000 side job, untaxed during the year, costs roughly $2,528 at filing time.",
          "For 2026, a payer must issue a Form 1099-NEC when it pays you $2,000 or more for services. Even below the reporting threshold, the income is still taxable; no form does not mean no tax."
        ]
      },
      {
        "heading": "Part of your refund paid a debt, or the IRS changed your return",
        "paragraphs": [
          "Sometimes the refund you expected was correct — and then reduced. The IRS says the most common cause of a reduced refund is an adjustment to the return: a math error, a credit claimed for a child who did not qualify, tax owed from a prior year, or underpaid estimated tax.",
          "The other cause is a debt offset. The Treasury's Bureau of the Fiscal Service can take part of your refund to pay past-due child support, federal agency non-tax debts, state income tax, or certain state unemployment debts. The Bureau mails a notice showing the original refund, the offset amount, and the agency that received the payment.",
          "If your refund arrives smaller than your return showed, check for a notice before assuming a mistake. The IRS mails one for adjustments; the Bureau of the Fiscal Service mails one for offsets. If you disagree, follow the instructions in the notice — and if a joint refund was taken for your spouse's debt alone, you may be able to recover your share through injured spouse relief."
        ],
        "table": {
          "head": [
            "What changed",
            "What it does",
            "What it can cost"
          ],
          "rows": [
            [
              "Child turned 17",
              "Child tax credit $2,200 becomes the $500 credit for other dependents",
              "Up to $1,700"
            ],
            [
              "Second job, no W-4 adjustment",
              "Each job applies the full standard deduction, so too little is withheld",
              "Refund shrinks or a balance appears"
            ],
            [
              "$10,000 of side income, untaxed",
              "Self-employment tax $1,413 plus income tax of about $1,115",
              "About $2,528"
            ],
            [
              "Income rose past a credit phaseout",
              "Earned income credit falls as income rises; it ends at $62,974 single, $70,244 joint",
              "Up to $8,231"
            ],
            [
              "Refund offset",
              "Treasury takes part of the refund for a past-due debt",
              "Dollar for dollar"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Run the IRS Tax Withholding Estimator after any job change, marriage, or new child — and again if a refund surprises you.",
          "If you want a larger refund, add extra withholding in Step 4(c) of Form W-4. Divide the amount you want back by your number of paydays.",
          "If you earn side income, pay estimated tax quarterly with Form 1040-ES, or add withholding from your main job to cover it.",
          "Track your refund with the IRS Where's My Refund tool. An e-filed return typically takes about three weeks; returns claiming the earned income credit or additional child tax credit are held until mid-February by law."
        ],
        "heading": "How to check your return and fix next year",
        "paragraphs": [
          "Start with your filed return. Form 1040, line 24 shows your total tax; line 33 shows everything you paid in — withholding, estimated payments, and refundable credits; line 34 is your overpayment. Compare line 24 with last year's: if total tax rose while withholding stayed flat, that is the whole story.",
          "Then fix next year before it happens. The IRS Tax Withholding Estimator walks through your pay, jobs, and credits and tells you exactly what to put on a new W-4. A mid-year check takes a few minutes and prevents the same surprise twice."
        ]
      }
    ],
    "seoTitle": "Why Is My Tax Refund So Small? Causes and Fixes (2026)",
    "slug": "why-is-my-tax-refund-so-small",
    "sources": [
      {
        "label": "IRS — Refunds: when to expect your refund",
        "url": "https://www.irs.gov/refunds"
      },
      {
        "label": "IRS — Topic No. 203, Reduced Refund",
        "url": "https://www.irs.gov/refunds/reduced-refund"
      },
      {
        "label": "IRS — Tax Withholding Estimator",
        "url": "https://www.irs.gov/individuals/tax-withholding-estimator"
      },
      {
        "label": "IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)",
        "url": "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf"
      }
    ],
    "title": "Why Is My Tax Refund So Small?",
    "type": "Troubleshooting",
    "updated": "2026-11-15"
  }
]
