import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ReitVsPhysicalYieldState {
  investmentAmount: number;
  reitDividendYield: number;
  reitAppreciation: number;
  physicalCashOnCash: number;
  physicalAppreciation: number;
  setInvestmentAmount: (val: number) => void;
  setReitDividendYield: (val: number) => void;
  setReitAppreciation: (val: number) => void;
  setPhysicalCashOnCash: (val: number) => void;
  setPhysicalAppreciation: (val: number) => void;
}

export const useReitVsPhysicalYieldStore = create<ReitVsPhysicalYieldState>()(
  persist(
    (set) => ({
      investmentAmount: 50000,
      reitDividendYield: 4.5,
      reitAppreciation: 3.0,
      physicalCashOnCash: 6.5,
      physicalAppreciation: 4.0,
      setInvestmentAmount: (val) => set({ investmentAmount: val }),
      setReitDividendYield: (val) => set({ reitDividendYield: val }),
      setReitAppreciation: (val) => set({ reitAppreciation: val }),
      setPhysicalCashOnCash: (val) => set({ physicalCashOnCash: val }),
      setPhysicalAppreciation: (val) => set({ physicalAppreciation: val })
    }),
    { name: 'reit-vs-physical-yield-calculator-storage' }
  )
)
