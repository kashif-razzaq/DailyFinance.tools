import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CompoundInterestScalerState {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturnRate: number;
  yearsToGrow: number;
  setInitialInvestment: (val: number) => void;
  setMonthlyContribution: (val: number) => void;
  setAnnualReturnRate: (val: number) => void;
  setYearsToGrow: (val: number) => void;
}

export const useCompoundInterestScalerStore = create<CompoundInterestScalerState>()(
  persist(
    (set) => ({
      initialInvestment: 10000,
      monthlyContribution: 500,
      annualReturnRate: 8,
      yearsToGrow: 30,
      setInitialInvestment: (val) => set({ initialInvestment: val }),
      setMonthlyContribution: (val) => set({ monthlyContribution: val }),
      setAnnualReturnRate: (val) => set({ annualReturnRate: val }),
      setYearsToGrow: (val) => set({ yearsToGrow: val })
    }),
    { name: 'compound-interest-scaler-calculator-storage' }
  )
)
