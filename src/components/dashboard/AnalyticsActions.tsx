'use client'

import { useState } from 'react'
import { Download, Printer } from 'lucide-react'
import type { FinancialPicture } from '@/lib/financial-picture'
import { ProUpgradeModal } from '@/components/shared/ProUpgradeModal'

/**
 * Header actions for the analytics page: CSV export of the whole
 * financial picture (Pro — exports are a Pro feature everywhere on
 * DailyFinance) and a print view the browser can save as PDF.
 */
export function AnalyticsActions({ pic, isPro }: { pic: FinancialPicture; isPro: boolean }) {
  const [showPro, setShowPro] = useState(false)

  const exportCsv = () => {
    if (!isPro) {
      setShowPro(true)
      return
    }
    const esc = (v: unknown) => '"' + String(v ?? '').replace(/"/g, '""') + '"'
    const row = (...cells: unknown[]) => cells.map(esc).join(',')
    const out: string[] = []
    out.push(row('DailyFinance — Cross-Data Analytics export'))
    out.push(row('Generated', new Date().toLocaleDateString('en-US')))
    out.push('')
    out.push(row('Summary'))
    out.push(row('Net position', Math.round(pic.netPosition)))
    out.push(row('Total assets', Math.round(pic.totalAssets)))
    out.push(row('Total debts', Math.round(pic.totalDebts)))
    if (pic.monthlyDebtPayments != null) out.push(row('Monthly debt payments', Math.round(pic.monthlyDebtPayments)))
    if (pic.weightedApr != null) out.push(row('Weighted APR %', pic.weightedApr.toFixed(2)))
    if (pic.totalInterestCost != null) out.push(row('Interest still to pay', Math.round(pic.totalInterestCost)))
    if (pic.dti != null) out.push(row('Debt-to-income %', pic.dti.toFixed(1)))
    if (pic.monthlyIncome != null) out.push(row('Monthly income (' + (pic.incomeSource ?? 'saved scenario') + ')', Math.round(pic.monthlyIncome)))
    if (pic.monthlyInvesting != null) out.push(row('Saving & investing /mo', Math.round(pic.monthlyInvesting)))
    if (pic.emergency) out.push(row('Emergency cover (months)', pic.emergency.monthsCovered.toFixed(1)))
    out.push('')
    out.push(row('Assets', 'Source', 'Value'))
    for (const a of pic.assets) out.push(row(a.label, a.source, Math.round(a.value)))
    out.push('')
    out.push(row('Debts', 'Source', 'Balance', 'APR %', 'Monthly payment', 'Interest remaining'))
    for (const d of pic.debts) out.push(row(d.label, d.source, Math.round(d.value), d.apr ?? '', d.monthlyPayment != null ? Math.round(d.monthlyPayment) : '', d.interestCost != null ? Math.round(d.interestCost) : ''))
    if (pic.cashFlow) {
      out.push('')
      out.push(row('Monthly cash flow', 'Amount'))
      out.push(row('Income', Math.round(pic.cashFlow.income)))
      for (const o of pic.cashFlow.outgo) out.push(row(o.label, Math.round(o.value)))
      out.push(row('Savings', Math.round(pic.cashFlow.savings)))
      out.push(row('Unallocated', Math.round(pic.cashFlow.leftover)))
      out.push(row('Savings rate %', pic.cashFlow.savingsRate.toFixed(1)))
    }
    if (pic.snapshots.length) {
      out.push('')
      out.push(row('Snapshots', 'Value'))
      for (const s of pic.snapshots) out.push(row(s.label, s.value))
    }
    if (pic.business) {
      out.push('')
      out.push(row('Business & creator'))
      if (pic.business.estMonthlyEarnings != null) out.push(row('Est. platform earnings /mo', pic.business.estMonthlyEarnings))
      if (pic.business.taxSetAsideMonthly != null) out.push(row('Tax set-aside /mo', pic.business.taxSetAsideMonthly))
      if (pic.business.runwayMonths != null) out.push(row('Business runway (months)', pic.business.runwayMonths))
      for (const m of pic.business.metrics) out.push(row(m.label, m.value, m.detail ?? ''))
    }
    const blob = new Blob([out.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dailyfinance-analytics.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        onClick={exportCsv}
        className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
      >
        <Download className="h-4 w-4" /> Export CSV
      </button>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
      >
        <Printer className="h-4 w-4" /> Print / PDF
      </button>
      <ProUpgradeModal isOpen={showPro} onClose={() => setShowPro(false)} />
    </div>
  )
}
