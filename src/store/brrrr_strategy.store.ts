import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BrrrrStrategyState {
  purchasePrice: number;
  rehabCost: number;
  arv: number;
  refinanceLTV: number;
  setPurchasePrice: (val: number) => void;
  setRehabCost: (val: number) => void;
  setArv: (val: number) => void;
  setRefinanceLTV: (val: number) => void;
}

export const useBrrrrStrategyStore = create<BrrrrStrategyState>()(
  persist(
    (set) => ({
      purchasePrice: 150000,
      rehabCost: 40000,
      arv: 275000,
      refinanceLTV: 75,
      setPurchasePrice: (val) => set({ purchasePrice: val }),
      setRehabCost: (val) => set({ rehabCost: val }),
      setArv: (val) => set({ arv: val }),
      setRefinanceLTV: (val) => set({ refinanceLTV: val })
    }),
    { name: 'brrrr-strategy-analyzer-storage' }
  )
)
