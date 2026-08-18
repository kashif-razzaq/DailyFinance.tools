import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CostOfLivingState {
  currentSalary: number
  currentCityIndex: number
  newCityIndex: number

  housingExp: number
  foodExp: number
  transportExp: number
  healthcareExp: number
  taxesMiscExp: number
  
  // Setters
  setCurrentSalary: (val: number) => void
  setCurrentCityIndex: (val: number) => void
  setNewCityIndex: (val: number) => void

  setHousingExp: (val: number) => void
  setFoodExp: (val: number) => void
  setTransportExp: (val: number) => void
  setHealthcareExp: (val: number) => void
  setTaxesMiscExp: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    requiredSalary: number
    salaryDiff: number
    salaryDiffPct: number
    totalPersonalCost: number
    expenseBreakdown: { name: string; value: number; color: string }[]
  }
}

export const useCostOfLivingStore = create<CostOfLivingState>()(
  persist(
    (set, get) => ({
      currentSalary: 85000,
      currentCityIndex: 100, // E.g. base index
      newCityIndex: 145, // E.g. moving to a more expensive city
      
      housingExp: 2000,
      foodExp: 800,
      transportExp: 400,
      healthcareExp: 300,
      taxesMiscExp: 1500,

      setCurrentSalary: (val) => set({ currentSalary: val }),
      setCurrentCityIndex: (val) => set({ currentCityIndex: val }),
      setNewCityIndex: (val) => set({ newCityIndex: val }),

      setHousingExp: (val) => set({ housingExp: val }),
      setFoodExp: (val) => set({ foodExp: val }),
      setTransportExp: (val) => set({ transportExp: val }),
      setHealthcareExp: (val) => set({ healthcareExp: val }),
      setTaxesMiscExp: (val) => set({ taxesMiscExp: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        const requiredSalary = s.currentCityIndex > 0 
          ? s.currentSalary * (s.newCityIndex / s.currentCityIndex)
          : s.currentSalary

        const salaryDiff = requiredSalary - s.currentSalary
        const salaryDiffPct = s.currentSalary > 0 ? (salaryDiff / s.currentSalary) * 100 : 0

        const totalPersonalCost = s.housingExp + s.foodExp + s.transportExp + s.healthcareExp + s.taxesMiscExp

        const expenseBreakdown = [
          { name: 'Housing', value: s.housingExp, color: '#2563EB' },
          { name: 'Food', value: s.foodExp, color: '#059669' },
          { name: 'Transport', value: s.transportExp, color: '#D97706' },
          { name: 'Healthcare', value: s.healthcareExp, color: '#DC2626' },
          { name: 'Taxes & Misc', value: s.taxesMiscExp, color: '#7C3AED' },
        ].filter(e => e.value > 0)

        return {
          requiredSalary,
          salaryDiff,
          salaryDiffPct,
          totalPersonalCost,
          expenseBreakdown
        }
      }
    }),
    {
      name: 'cost-of-living-storage',
      skipHydration: true,
    }
  )
)
