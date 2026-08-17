import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CoastFireState {
  currentAge: number;
  retirementAge: number;
  currentInvestments: number;
  annualSpendInRetirement: number;
  safeWithdrawalRate: number;
  inflationRate: number;
  investmentReturnRate: number;
  setCurrentAge: (val: number) => void;
  setRetirementAge: (val: number) => void;
  setCurrentInvestments: (val: number) => void;
  setAnnualSpendInRetirement: (val: number) => void;
  setSafeWithdrawalRate: (val: number) => void;
  setInflationRate: (val: number) => void;
  setInvestmentReturnRate: (val: number) => void;
}

export const useCoastFireStore = create<CoastFireState>()(
  persist(
    (set) => ({
      currentAge: 30,
      retirementAge: 65,
      currentInvestments: 100000,
      annualSpendInRetirement: 80000,
      safeWithdrawalRate: 4.0,
      inflationRate: 3.0,
      investmentReturnRate: 7.0,
      setCurrentAge: (val) => set({ currentAge: val }),
      setRetirementAge: (val) => set({ retirementAge: val }),
      setCurrentInvestments: (val) => set({ currentInvestments: val }),
      setAnnualSpendInRetirement: (val) => set({ annualSpendInRetirement: val }),
      setSafeWithdrawalRate: (val) => set({ safeWithdrawalRate: val }),
      setInflationRate: (val) => set({ inflationRate: val }),
      setInvestmentReturnRate: (val) => set({ investmentReturnRate: val })
    }),
    { name: 'coast-fire-calculator-storage' }
  )
)
