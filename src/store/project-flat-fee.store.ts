import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProjectFlatFeeState {
  estimatedHours: number
  targetHourlyRate: number
  commBufferPct: number
  riskLevel: 'Low' | 'Medium' | 'High'
  clientROI: number
  roiSharePct: number
  
  // Setters
  setEstimatedHours: (val: number) => void
  setTargetHourlyRate: (val: number) => void
  setCommBufferPct: (val: number) => void
  setRiskLevel: (val: 'Low' | 'Medium' | 'High') => void
  setClientROI: (val: number) => void
  setRoiSharePct: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    totalHoursBuffered: number
    costPlusFloor: number
    roiPriceAnchor: number
    flatFeeQuote: number
    effectiveHourlyRate: number
    extraRevisionFee: number
    depositAmount: number
    milestoneAmount: number
  }
}

export const useProjectFlatFeeStore = create<ProjectFlatFeeState>()(
  persist(
    (set, get) => ({
      estimatedHours: 40,
      targetHourlyRate: 100,
      commBufferPct: 20,
      riskLevel: 'Medium',
      clientROI: 25000,
      roiSharePct: 10,

      setEstimatedHours: (val) => set({ estimatedHours: val }),
      setTargetHourlyRate: (val) => set({ targetHourlyRate: val }),
      setCommBufferPct: (val) => set({ commBufferPct: val }),
      setRiskLevel: (val) => set({ riskLevel: val }),
      setClientROI: (val) => set({ clientROI: val }),
      setRoiSharePct: (val) => set({ roiSharePct: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        // Comm buffer
        const totalHoursBuffered = s.estimatedHours * (1 + (s.commBufferPct / 100))
        
        // Risk Multiplier
        let riskMult = 1.15
        if (s.riskLevel === 'Medium') riskMult = 1.30
        if (s.riskLevel === 'High') riskMult = 1.55

        // Cost plus floor
        const costPlusFloor = totalHoursBuffered * s.targetHourlyRate * riskMult
        
        // ROI Anchor
        // If ROI is $0 or unrealistic (handled in UI), we just use it raw here.
        const roiPriceAnchor = s.clientROI * (s.roiSharePct / 100)

        // Flat Fee Quote: Max of (CostPlus * 1.25 value multiplier) or ROI anchor
        const flatFeeQuote = Math.max(costPlusFloor * 1.25, roiPriceAnchor)

        const effectiveHourlyRate = s.estimatedHours > 0 ? (flatFeeQuote / s.estimatedHours) : 0
        
        // Extra revision round fee (15% of hours * rate)
        const extraRevisionFee = (0.15 * s.estimatedHours) * s.targetHourlyRate

        // 50/50 split
        const depositAmount = flatFeeQuote * 0.50
        const milestoneAmount = flatFeeQuote * 0.50

        return {
          totalHoursBuffered,
          costPlusFloor,
          roiPriceAnchor,
          flatFeeQuote,
          effectiveHourlyRate,
          extraRevisionFee,
          depositAmount,
          milestoneAmount
        }
      }
    }),
    {
      name: 'project-flat-fee-storage',
      skipHydration: true,
    }
  )
)
