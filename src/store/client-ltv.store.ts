import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ClientLTVState {
  monthlyRetainer: number
  monthlyChurnPct: number
  grossMarginPct: number
  expansionPct: number
  targetLtvCacRatio: number
  
  // Setters
  setMonthlyRetainer: (val: number) => void
  setMonthlyChurnPct: (val: number) => void
  setGrossMarginPct: (val: number) => void
  setExpansionPct: (val: number) => void
  setTargetLtvCacRatio: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    clientLifespanMonths: number
    grossLTV: number
    netLTV: number
    targetMaxCAC: number
    paybackPeriod: number
    healthRating: 'Strong' | 'Fair' | 'At Risk' | 'Critical'
  }
}

export const useClientLTVStore = create<ClientLTVState>()(
  persist(
    (set, get) => ({
      monthlyRetainer: 2500,
      monthlyChurnPct: 5.0,
      grossMarginPct: 80,
      expansionPct: 10,
      targetLtvCacRatio: 4,

      setMonthlyRetainer: (val) => set({ monthlyRetainer: val }),
      setMonthlyChurnPct: (val) => set({ monthlyChurnPct: val }),
      setGrossMarginPct: (val) => set({ grossMarginPct: val }),
      setExpansionPct: (val) => set({ expansionPct: val }),
      setTargetLtvCacRatio: (val) => set({ targetLtvCacRatio: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        let clientLifespanMonths = 60 // Cap at 60 months if churn is 0
        if (s.monthlyChurnPct > 0) {
          clientLifespanMonths = Math.min(60, 1 / (s.monthlyChurnPct / 100))
        }

        const grossLTV = s.monthlyRetainer * clientLifespanMonths * (1 + (s.expansionPct / 100))
        const netLTV = grossLTV * (s.grossMarginPct / 100)
        
        const targetMaxCAC = netLTV / s.targetLtvCacRatio

        const monthlyGrossProfit = s.monthlyRetainer * (s.grossMarginPct / 100)
        const paybackPeriod = monthlyGrossProfit > 0 ? targetMaxCAC / monthlyGrossProfit : 999

        let healthRating: 'Strong' | 'Fair' | 'At Risk' | 'Critical' = 'Strong'
        if (s.monthlyChurnPct > 15) healthRating = 'Critical'
        else if (paybackPeriod > 6) healthRating = 'At Risk'
        else if (paybackPeriod > 3) healthRating = 'Fair'

        return {
          clientLifespanMonths,
          grossLTV,
          netLTV,
          targetMaxCAC,
          paybackPeriod,
          healthRating
        }
      }
    }),
    {
      name: 'client-ltv-storage',
      skipHydration: true,
    }
  )
)
