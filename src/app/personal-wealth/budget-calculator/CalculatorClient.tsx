/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmt2 = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function PctSlider({ label, value, onChange, min = 0, max = 20, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = ['#064E3B', '#0E7C61', '#D97706', '#2563EB', '#7C3AED', '#DB2777', '#0891B2', '#65A30D', '#EA580C', '#475569', '#059669']

// Formula: Total Expenses = sum(categories); Leftover = Income − Total Expenses − Savings; Savings Rate = Savings / Income × 100
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [income, setIncome] = useState(5500)
  const [housing, setHousing] = useState(1600)
  const [transport, setTransport] = useState(450)
  const [food, setFood] = useState(650)
  const [utilities, setUtilities] = useState(220)
  const [insurance, setInsurance] = useState(280)
  const [entertainment, setEntertainment] = useState(200)
  const [dining, setDining] = useState(250)
  const [subscriptions, setSubscriptions] = useState(60)
  const [other, setOther] = useState(150)
  const [savings, setSavings] = useState(600)

  const categories = useMemo(() => [
    { name: 'Housing', value: housing || 0 },
    { name: 'Transport', value: transport || 0 },
    { name: 'Food / Groceries', value: food || 0 },
    { name: 'Utilities', value: utilities || 0 },
    { name: 'Insurance', value: insurance || 0 },
    { name: 'Entertainment', value: entertainment || 0 },
    { name: 'Dining Out', value: dining || 0 },
    { name: 'Subscriptions', value: subscriptions || 0 },
    { name: 'Other', value: other || 0 },
    { name: 'Savings / Investments', value: savings || 0 },
  ], [housing, transport, food, utilities, insurance, entertainment, dining, subscriptions, other, savings])

  const calc = useMemo(() => {
    const expenseOnly = categories.filter((c) => c.name !== 'Savings / Investments').reduce((s, c) => s + c.value, 0)
    const totalOut = expenseOnly + (savings || 0)
    const leftover = (income || 0) - totalOut
    const savingsRate = income > 0 ? ((savings || 0) / income) * 100 : 0
    const expenseRate = income > 0 ? (expenseOnly / income) * 100 : 0
    const pieData = categories.filter((c) => c.value > 0)
    const withPct = categories.map((c) => ({ ...c, pct: income > 0 ? (c.value / income) * 100 : 0 }))
    return { expenseOnly, totalOut, leftover, savingsRate, expenseRate, pieData, withPct }
  }, [categories, income, savings])

  const isDeficit = calc.leftover < 0

  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Monthly Take-Home Income" value={income} onChange={setIncome} hint="After-tax pay that actually lands in your account." />
      <div className="border-t pt-6">
        <h3 className="font-bold text-base mb-4">Monthly Expenses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MoneyInput label="Housing (rent / mortgage)" value={housing} onChange={setHousing} />
          <MoneyInput label="Transport" value={transport} onChange={setTransport} />
          <MoneyInput label="Food / Groceries" value={food} onChange={setFood} />
          <MoneyInput label="Utilities" value={utilities} onChange={setUtilities} />
          <MoneyInput label="Insurance" value={insurance} onChange={setInsurance} />
          <MoneyInput label="Entertainment" value={entertainment} onChange={setEntertainment} />
          <MoneyInput label="Dining Out" value={dining} onChange={setDining} />
          <MoneyInput label="Subscriptions" value={subscriptions} onChange={setSubscriptions} />
          <MoneyInput label="Other" value={other} onChange={setOther} />
        </div>
      </div>
      <div className="border-t pt-6">
        <MoneyInput label="Savings / Investments" value={savings} onChange={setSavings} hint="Pay yourself first — treated as a planned allocation, not a leftover." />
      </div>
      {/* PctSlider kept in helpers for consistency; budget uses live MoneyInputs only */}
      <span className="hidden">{isPro ? 'pro' : ''}</span>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Monthly Budget Summary">
        <div className={`text-4xl font-black font-mono ${isDeficit ? 'text-red-300' : ''}`}>{fmt(calc.leftover)}</div>
        <p className="text-white/80 mt-2 text-sm">{isDeficit ? 'deficit — you are spending more than you earn' : 'leftover surplus after expenses and savings'}</p>
        {isDeficit && <p className="mt-3 bg-red-500/20 border border-red-300/40 rounded-xl px-4 py-3 text-sm font-semibold text-red-100">Warning: deficit of {fmt(Math.abs(calc.leftover))}/month. Cut {fmt(Math.abs(calc.leftover))} from expenses or reduce savings temporarily to balance.</p>}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Expenses</p><p className="font-mono text-xl font-bold">{fmt(calc.expenseOnly)}</p><p className="text-white/60 text-xs">{calc.expenseRate.toFixed(1)}% of income</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Income</p><p className="font-mono text-xl font-bold">{fmt(income)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Savings Rate</p><p className="font-mono text-xl font-bold">{calc.savingsRate.toFixed(1)}%</p><p className="text-white/60 text-xs">{fmt(savings)}/month saved</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Allocated</p><p className="font-mono text-xl font-bold">{fmt(calc.totalOut)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Where Your Money Goes</h4>
        {calc.pieData.length === 0 ? <p className="text-sm text-muted-foreground">Add expenses to see the breakdown.</p> : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={calc.pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label={(entry: any) => `${entry.name} ${income > 0 ? Math.round((entry.value / income) * 100) : 0}%`} labelLine={false} fontSize={11}>
                {calc.pieData.map((entry, idx) => (<Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />))}
              </Pie>
              <Tooltip formatter={(v: any) => fmt(Number(v))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Per-Category % of Income</h4>
        <div className="space-y-3">
          {calc.withPct.map((c, idx) => (
            <div key={c.name}>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium">{c.name}</span><span className="font-mono font-bold">{fmt(c.value)} · {c.pct.toFixed(1)}%</span></div>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden"><div className="h-2.5 rounded-full" style={{ width: `${Math.min(100, c.pct)}%`, backgroundColor: COLORS[idx % COLORS.length] }} /></div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Common guide: housing ≤30%, savings ≥20% (50/30/20 rule). Compare your bars against those benchmarks.</p>
      </div>
    </div>
  </div>)
}
