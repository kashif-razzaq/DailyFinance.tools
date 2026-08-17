import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HsaTripleTaxAdvantageState {
  annualContribution: number;
  yearsToInvest: number;
  annualReturnRate: number;
  marginalTaxRate: number;
  setAnnualContribution: (val: number) => void;
  setYearsToInvest: (val: number) => void;
  setAnnualReturnRate: (val: number) => void;
  setMarginalTaxRate: (val: number) => void;
}

export const useHsaTripleTaxAdvantageStore = create<HsaTripleTaxAdvantageState>()(
  persist(
    (set) => ({
      annualContribution: 4150,
      yearsToInvest: 20,
      annualReturnRate: 7,
      marginalTaxRate: 24,
      setAnnualContribution: (val) => set({ annualContribution: val }),
      setYearsToInvest: (val) => set({ yearsToInvest: val }),
      setAnnualReturnRate: (val) => set({ annualReturnRate: val }),
      setMarginalTaxRate: (val) => set({ marginalTaxRate: val })
    }),
    { name: 'hsa-triple-tax-advantage-calculator-storage' }
  )
)
