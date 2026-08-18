import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CLVState {
  averagePurchaseValue: number
  purchaseFrequency: number
  customerLifespan: number
  grossMarginPct: number
  targetCacRatio: number
  
  // Setters
  setAveragePurchaseValue: (val: number) => void
  setPurchaseFrequency: (val: number) => void
  setCustomerLifespan: (val: number) => void
  setGrossMarginPct: (val: number) => void
  setTargetCacRatio: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    customerValue: number // APV * PF
    basicCLV: number // APV * PF * Lifespan
    profitAdjustedCLV: number // Basic CLV * Margin
    maxCAC: number // Profit Adjusted CLV / Target CAC Ratio
    healthRating: 'Strong' | 'Fair' | 'At Risk' | 'Critical'
    chartData: { year: number, cumulativeRevenue: number, cumulativeProfit: number }[]
  }
}

export const useClientLTVStore = create<CLVState>()(
  persist(
    (set, get) => ({
      averagePurchaseValue: 150,
      purchaseFrequency: 4,
      customerLifespan: 5,
      grossMarginPct: 60,
      targetCacRatio: 3, // Target 3:1 CLV:CAC

      setAveragePurchaseValue: (val) => set({ averagePurchaseValue: val }),
      setPurchaseFrequency: (val) => set({ purchaseFrequency: val }),
      setCustomerLifespan: (val) => set({ customerLifespan: val }),
      setGrossMarginPct: (val) => set({ grossMarginPct: val }),
      setTargetCacRatio: (val) => set({ targetCacRatio: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        const customerValue = s.averagePurchaseValue * s.purchaseFrequency
        const basicCLV = customerValue * s.customerLifespan
        const profitAdjustedCLV = basicCLV * (s.grossMarginPct / 100)
        
        const maxCAC = s.targetCacRatio > 0 ? profitAdjustedCLV / s.targetCacRatio : 0

        let healthRating: 'Strong' | 'Fair' | 'At Risk' | 'Critical' = 'Strong'
        if (s.customerLifespan < 1) healthRating = 'Critical'
        else if (s.grossMarginPct < 20) healthRating = 'At Risk'
        else if (s.targetCacRatio < 3) healthRating = 'Fair'

        const chartData = []
        let cumulativeRevenue = 0
        let cumulativeProfit = 0
        const yearsToProject = Math.ceil(s.customerLifespan)

        for (let year = 1; year <= Math.max(5, yearsToProject + 1); year++) {
          if (year <= yearsToProject) {
            cumulativeRevenue += customerValue
            cumulativeProfit += (customerValue * (s.grossMarginPct / 100))
          }
          chartData.push({
            year,
            cumulativeRevenue,
            cumulativeProfit
          })
        }

        return {
          customerValue,
          basicCLV,
          profitAdjustedCLV,
          maxCAC,
          healthRating,
          chartData
        }
      }
    }),
    {
      name: 'clv-calculator-storage',
      skipHydration: true,
    }
  )
)
