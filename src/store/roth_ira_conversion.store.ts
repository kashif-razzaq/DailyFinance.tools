import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RothIraConversionState {
  traditionalIraBalance: number;
  nonDeductibleBasis: number;
  conversionAmount: number;
  marginalTaxRate: number;
  setTraditionalIraBalance: (val: number) => void;
  setNonDeductibleBasis: (val: number) => void;
  setConversionAmount: (val: number) => void;
  setMarginalTaxRate: (val: number) => void;
}

export const useRothIraConversionStore = create<RothIraConversionState>()(
  persist(
    (set) => ({
      traditionalIraBalance: 10000,
      nonDeductibleBasis: 6500,
      conversionAmount: 6500,
      marginalTaxRate: 24,
      setTraditionalIraBalance: (val) => set({ traditionalIraBalance: val }),
      setNonDeductibleBasis: (val) => set({ nonDeductibleBasis: val }),
      setConversionAmount: (val) => set({ conversionAmount: val }),
      setMarginalTaxRate: (val) => set({ marginalTaxRate: val })
    }),
    { name: 'roth-ira-conversion-simulator-storage' }
  )
)
