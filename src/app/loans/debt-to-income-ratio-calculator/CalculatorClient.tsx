/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}
// Lender bands used across US mortgage/loan underwriting:
// <=36% comfortable · 37-43% acceptable for most programs · 44-50% needs strong compensating factors · >50% high risk.
function band(pct: number) {
  if (pct <= 36) return { label: 'Comfortable', color: '#059669', text: 'Most lenders view this as a healthy ratio with room to borrow.' }
  if (pct <= 43) return { label: 'Acceptable', color: '#D97706', text: 'Within the limit for most loan programs, including qualified mortgages.' }
  if (pct <= 50) return { label: 'Stretched', color: '#EA580C', text: 'Approval usually needs strong compensating factors: high reserves, excellent credit, large down payment.' }
  return { label: 'High Risk', color: '#DC2626', text: 'Most lenders will decline or price the loan expensively. Reducing debts or raising income comes first.' }
}
function BandBar({ label, pct }: { label: string; pct: number }) {
  const b = band(pct)
  const width = Math.min(100, pct)
  return (<div className="space-y-2">
    <div className="flex justify-between text-sm"><span className="font-semibold text-white/90">{label}</span><span className="font-mono font-bold">{pct.toFixed(1)}% · {b.label}</span></div>
    <div className="relative h-4 rounded-full bg-white/15 overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: width + '%', backgroundColor: b.color }} />
    </div>
    <div className="relative h-4 text-[10px] text-white/50 font-mono"><span className="absolute" style={{ left: '36%' }}>36%</span><span className="absolute" style={{ left: '43%' }}>43%</span><span className="absolute" style={{ left: '50%' }}>50%</span></div>
  </div>)
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [income, setIncome] = useState(7200)
  const [housing, setHousing] = useState(1850)
  const [auto, setAuto] = useState(430)
  const [student, setStudent] = useState(290)
  const [cards, setCards] = useState(160)
  const [other, setOther] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.income !== undefined) setIncome(s.income as any)
    if (s.housing !== undefined) setHousing(s.housing as any)
    if (s.auto !== undefined) setAuto(s.auto as any)
    if (s.student !== undefined) setStudent(s.student as any)
    if (s.cards !== undefined) setCards(s.cards as any)
    if (s.other !== undefined) setOther(s.other as any)
  })


  // Front-end DTI = housing / gross monthly income. Back-end DTI = (housing + all recurring debts) / income.
  const totalDebts = housing + auto + student + cards + other
  const front = income > 0 ? housing / income * 100 : 0
  const back = income > 0 ? totalDebts / income * 100 : 0
  const bb = band(back)
  // Extra monthly debt payment you could carry before crossing each threshold.
  const room43 = Math.max(0, income * 0.43 - totalDebts)
  const room36 = Math.max(0, income * 0.36 - totalDebts)
  const cutTo43 = Math.max(0, totalDebts - income * 0.43)

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Gross Monthly Income" value={income} onChange={setIncome} hint="Before taxes — salary plus any regular income, divided by 12 if you know the annual figure." />
      <div className="border-t pt-6 space-y-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Monthly Housing (Front-End)</h4>
        <MoneyInput label="Rent or Mortgage Payment" value={housing} onChange={setHousing} hint="For mortgages, include taxes, insurance and HOA if your lender escrows them." />
      </div>
      <div className="border-t pt-6 space-y-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Other Monthly Debts (Back-End)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MoneyInput label="Auto Loan / Lease" value={auto} onChange={setAuto} />
          <MoneyInput label="Student Loans" value={student} onChange={setStudent} />
          <MoneyInput label="Credit Card Minimums" value={cards} onChange={setCards} hint="Minimum payments only — lenders use the minimum, not your balance." />
          <MoneyInput label="Other Loan Payments" value={other} onChange={setOther} hint="Personal loans, child support, alimony — anything on your credit report. Utilities and groceries do not count." />
        </div>
      </div>
      <div className="rounded-xl bg-neutral-50 border p-4 text-sm text-neutral-600">Lenders count only recurring debts that appear on your credit report or are court-ordered. Groceries, utilities, insurance premiums and subscriptions are <strong>not</strong> part of DTI.</div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your Debt-to-Income Ratios">
        <div className="space-y-6">
          <BandBar label="Back-End DTI (all debts)" pct={back} />
          <BandBar label="Front-End DTI (housing only)" pct={front} />
        </div>
        <p className="text-white/85 text-sm mt-4">{bb.text}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Monthly Debts</p><p className="font-mono text-xl font-bold">{fmt(totalDebts)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Income After Debts</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, income - totalDebts))}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Where You Stand vs Lender Thresholds</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center"><span>36% — comfortable zone</span><span className={`font-mono font-bold ${back <= 36 ? 'text-[#059669]' : 'text-neutral-400'}`}>{back <= 36 ? 'Inside' : fmt(totalDebts - income * 0.36) + ' over'}</span></div>
          <div className="flex justify-between items-center"><span>43% — qualified-mortgage line</span><span className={`font-mono font-bold ${back <= 43 ? 'text-[#059669]' : 'text-[#DC2626]'}`}>{back <= 43 ? 'Inside' : fmt(cutTo43) + ' over'}</span></div>
          <div className="flex justify-between items-center"><span>50% — upper limit with strong factors</span><span className={`font-mono font-bold ${back <= 50 ? 'text-[#059669]' : 'text-[#DC2626]'}`}>{back <= 50 ? 'Inside' : fmt(totalDebts - income * 0.50) + ' over'}</span></div>
          <div className="border-t pt-3 text-neutral-600">{back <= 43
            ? <>You could take on about <strong className="text-[#1F2937]">{fmt(room43)}/mo</strong> more in debt payments before crossing 43%{room36 > 0 && <>, or {fmt(room36)}/mo to stay inside the comfortable 36% zone</>}.</>
            : <>To reach the 43% line, cut monthly debt payments by <strong className="text-[#1F2937]">{fmt(cutTo43)}</strong> — or add about <strong className="text-[#1F2937]">{fmt(totalDebts / 0.43 - income)}/mo</strong> in gross income.</>}</div>
        </div></div>
    <ToolActionsBar slug="debt-to-income-ratio-calculator" isPro={isPro} inputs={{ income, housing, auto, student, cards, other }} />
    </div></div></>)
}
