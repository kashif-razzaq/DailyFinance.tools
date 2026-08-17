import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CapexReserveState {
  roofCost: number;
  roofLifespan: number;
  hvacCost: number;
  hvacLifespan: number;
  otherCost: number;
  otherLifespan: number;
  setRoofCost: (val: number) => void;
  setRoofLifespan: (val: number) => void;
  setHvacCost: (val: number) => void;
  setHvacLifespan: (val: number) => void;
  setOtherCost: (val: number) => void;
  setOtherLifespan: (val: number) => void;
}

export const useCapexReserveStore = create<CapexReserveState>()(
  persist(
    (set) => ({
      roofCost: 10000,
      roofLifespan: 15,
      hvacCost: 6000,
      hvacLifespan: 10,
      otherCost: 5000,
      otherLifespan: 5,
      setRoofCost: (val) => set({ roofCost: val }),
      setRoofLifespan: (val) => set({ roofLifespan: val }),
      setHvacCost: (val) => set({ hvacCost: val }),
      setHvacLifespan: (val) => set({ hvacLifespan: val }),
      setOtherCost: (val) => set({ otherCost: val }),
      setOtherLifespan: (val) => set({ otherLifespan: val })
    }),
    { name: 'capex-reserve-planner-storage' }
  )
)
