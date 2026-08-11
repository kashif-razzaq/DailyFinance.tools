import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TimeTrackingROIState {
  weeklyUnbilledScopeCreep: number
  weeklyAdminTimeTracking: number
  hourlyRate: number
  softwareCostPerMonth: number
  
  // Setters
  setWeeklyUnbilledScopeCreep: (val: number) => void
  setWeeklyAdminTimeTracking: (val: number) => void
  setHourlyRate: (val: number) => void
  setSoftwareCostPerMonth: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    annualLostRevenue: number
    annualAdminCost: number
    annualSoftwareCost: number
    netROI: number
    roiMultiplier: number
  }
}

export const useTimeTrackingROIStore = create<TimeTrackingROIState>()(
  persist(
    (set, get) => ({
      weeklyUnbilledScopeCreep: 4,
      weeklyAdminTimeTracking: 2,
      hourlyRate: 100,
      softwareCostPerMonth: 12,

      setWeeklyUnbilledScopeCreep: (val) => set({ weeklyUnbilledScopeCreep: val }),
      setWeeklyAdminTimeTracking: (val) => set({ weeklyAdminTimeTracking: val }),
      setHourlyRate: (val) => set({ hourlyRate: val }),
      setSoftwareCostPerMonth: (val) => set({ softwareCostPerMonth: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        // Assume 48 working weeks per year
        const workingWeeks = 48

        // If you properly tracked scope creep and billed for it (or prevented it to take other work)
        const annualLostRevenue = s.weeklyUnbilledScopeCreep * s.hourlyRate * workingWeeks
        
        // If a software saves you manual admin time
        // (Assuming good software saves 75% of the manual time)
        const hoursSavedWeekly = s.weeklyAdminTimeTracking * 0.75
        const annualAdminCost = hoursSavedWeekly * s.hourlyRate * workingWeeks

        const annualSoftwareCost = s.softwareCostPerMonth * 12

        // Net ROI = Value Gained + Costs Saved - Software Cost
        const netROI = annualLostRevenue + annualAdminCost - annualSoftwareCost

        const roiMultiplier = annualSoftwareCost > 0 ? netROI / annualSoftwareCost : 999

        return {
          annualLostRevenue,
          annualAdminCost,
          annualSoftwareCost,
          netROI,
          roiMultiplier
        }
      }
    }),
    {
      name: 'time-tracking-roi-storage',
      skipHydration: true,
    }
  )
)
