import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NomadCOLState {
  currentMonthlyExpenses: number
  targetColReductionPct: number // represented as a positive number for reduction (e.g. 60 = 60% cheaper)
  relocationCost: number
  currentSavings: number
  monthlyIncome: number
  
  // Setters
  setCurrentMonthlyExpenses: (val: number) => void
  setTargetColReductionPct: (val: number) => void
  setRelocationCost: (val: number) => void
  setCurrentSavings: (val: number) => void
  setMonthlyIncome: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    newMonthlyExpenses: number
    monthlySavings: number
    paybackMonths: number
    currentRunwayMonths: number
    newRunwayMonths: number
    runwayExtension: number
    newMonthlyProfit: number
  }
}

export const useNomadCOLStore = create<NomadCOLState>()(
  persist(
    (set, get) => ({
      currentMonthlyExpenses: 5000,
      targetColReductionPct: 55,
      relocationCost: 2500,
      currentSavings: 20000,
      monthlyIncome: 6000,

      setCurrentMonthlyExpenses: (val) => set({ currentMonthlyExpenses: val }),
      setTargetColReductionPct: (val) => set({ targetColReductionPct: val }),
      setRelocationCost: (val) => set({ relocationCost: val }),
      setCurrentSavings: (val) => set({ currentSavings: val }),
      setMonthlyIncome: (val) => set({ monthlyIncome: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        const newMonthlyExpenses = s.currentMonthlyExpenses * (1 - (s.targetColReductionPct / 100))
        const monthlySavings = s.currentMonthlyExpenses - newMonthlyExpenses
        
        const paybackMonths = monthlySavings > 0 ? s.relocationCost / monthlySavings : 999

        const currentRunwayMonths = s.currentMonthlyExpenses > 0 ? s.currentSavings / s.currentMonthlyExpenses : 999
        
        const savingsAfterRelocation = Math.max(0, s.currentSavings - s.relocationCost)
        const newRunwayMonths = newMonthlyExpenses > 0 ? savingsAfterRelocation / newMonthlyExpenses : 999

        const runwayExtension = newRunwayMonths - currentRunwayMonths
        
        const newMonthlyProfit = s.monthlyIncome - newMonthlyExpenses

        return {
          newMonthlyExpenses,
          monthlySavings,
          paybackMonths,
          currentRunwayMonths,
          newRunwayMonths,
          runwayExtension,
          newMonthlyProfit
        }
      }
    }),
    {
      name: 'nomad-col-storage',
      skipHydration: true,
    }
  )
)
