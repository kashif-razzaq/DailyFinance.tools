import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FatFireVsLeanFireState {
  leanMonthlySpend: number;
  fatMonthlySpend: number;
  safeWithdrawalRate: number;
  setLeanMonthlySpend: (val: number) => void;
  setFatMonthlySpend: (val: number) => void;
  setSafeWithdrawalRate: (val: number) => void;
}

export const useFatFireVsLeanFireStore = create<FatFireVsLeanFireState>()(
  persist(
    (set) => ({
      leanMonthlySpend: 3000,
      fatMonthlySpend: 10000,
      safeWithdrawalRate: 4.0,
      setLeanMonthlySpend: (val) => set({ leanMonthlySpend: val }),
      setFatMonthlySpend: (val) => set({ fatMonthlySpend: val }),
      setSafeWithdrawalRate: (val) => set({ safeWithdrawalRate: val })
    }),
    { name: 'fat-fire-vs-lean-fire-calculator-storage' }
  )
)
