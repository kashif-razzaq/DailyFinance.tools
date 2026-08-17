import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface InflationPurchasingPowerState {
  currentAmount: number;
  inflationRate: number;
  years: number;
  setCurrentAmount: (val: number) => void;
  setInflationRate: (val: number) => void;
  setYears: (val: number) => void;
}

export const useInflationPurchasingPowerStore = create<InflationPurchasingPowerState>()(
  persist(
    (set) => ({
      currentAmount: 100000,
      inflationRate: 3,
      years: 10,
      setCurrentAmount: (val) => set({ currentAmount: val }),
      setInflationRate: (val) => set({ inflationRate: val }),
      setYears: (val) => set({ years: val })
    }),
    { name: 'inflation-purchasing-power-calculator-storage' }
  )
)
