import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FlippingProfitMarginState {
  arv: number;
  repairCosts: number;
  purchasePrice: number;
  holdingCosts: number;
  sellingCosts: number;
  setArv: (val: number) => void;
  setRepairCosts: (val: number) => void;
  setPurchasePrice: (val: number) => void;
  setHoldingCosts: (val: number) => void;
  setSellingCosts: (val: number) => void;
}

export const useFlippingProfitMarginStore = create<FlippingProfitMarginState>()(
  persist(
    (set) => ({
      arv: 300000,
      repairCosts: 40000,
      purchasePrice: 150000,
      holdingCosts: 10000,
      sellingCosts: 20000,
      setArv: (val) => set({ arv: val }),
      setRepairCosts: (val) => set({ repairCosts: val }),
      setPurchasePrice: (val) => set({ purchasePrice: val }),
      setHoldingCosts: (val) => set({ holdingCosts: val }),
      setSellingCosts: (val) => set({ sellingCosts: val })
    }),
    { name: 'flipping-profit-margin-calculator-storage' }
  )
)
