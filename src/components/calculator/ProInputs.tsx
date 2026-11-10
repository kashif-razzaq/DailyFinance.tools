/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { curSym } from '@/lib/currency'

/**
 * Shared input/result primitives for the Pro tools, in the same visual
 * language as the free calculators (labelled money fields with the live
 * currency symbol, percentage sliders, deep-emerald result cards).
 */
export const fmt = (n: number) =>
  curSym() + Math.round(n).toLocaleString('en-US', { maximumFractionDigits: 0 })

export const fmt2 = (n: number) =>
  curSym() +
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const num = (v: string) => (v === '' ? 0 : Number(v) || 0)

export function MoneyInput({
  label,
  value,
  onChange,
  hint,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  hint?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-muted-foreground">{curSym()}</span>
        <Input
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(num(e.target.value))}
          className="pl-7 font-mono"
        />
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function PctSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 30,
  step = 0.1,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  min?: number
  max?: number
  step?: number
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <label className="text-sm font-semibold">{label}</label>
        <span className="font-mono font-bold">{value}%</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} />
    </div>
  )
}

export function NumSlider({
  label,
  value,
  onChange,
  min,
  max,
  suffix = '',
}: {
  label: string
  value: number
  onChange: (n: number) => void
  min: number
  max: number
  suffix?: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <label className="text-sm font-semibold">{label}</label>
        <span className="font-mono font-bold">
          {value}
          {suffix}
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={1} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} />
    </div>
  )
}

export function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#064E3B] p-6 text-white shadow-xl md:p-8">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/70">{title}</h3>
      {children}
    </div>
  )
}

export function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-white/60">{label}</p>
      <p className="mt-1 font-mono text-2xl font-extrabold tracking-tight md:text-3xl">{value}</p>
      {sub && <p className="mt-1 text-xs font-light text-white/70">{sub}</p>}
    </div>
  )
}
