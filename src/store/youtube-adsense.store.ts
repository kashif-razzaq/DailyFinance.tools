import { create } from 'zustand'

export interface YouTubeAdsenseState {
  // Inputs
  monthlyViews: number
  rpm: number
  retentionRate: number
  videosPerMonth: number
  shortsViews: number
  shortsRpm: number

  // Actions
  setMonthlyViews: (val: number) => void
  setRpm: (val: number) => void
  setRetentionRate: (val: number) => void
  setVideosPerMonth: (val: number) => void
  setShortsViews: (val: number) => void
  setShortsRpm: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    longFormRevenue: number
    shortsRevenue: number
    totalMonthlyRevenue: number
    totalAnnualRevenue: number
    dailyAverage: number
    viewsPerVideo: number
    estimatedPlaybacks: number
  }
}

export const useYouTubeAdsenseStore = create<YouTubeAdsenseState>((set, get) => ({
  // Default values
  monthlyViews: 500000,
  rpm: 4.50, // Average RPM (Revenue Per Mille - 1000 views)
  retentionRate: 50, // Audience retention impacts ad playbacks
  videosPerMonth: 4,
  shortsViews: 1000000,
  shortsRpm: 0.15, // Shorts RPM is notoriously lower

  setMonthlyViews: (val) => set({ monthlyViews: val }),
  setRpm: (val) => set({ rpm: val }),
  setRetentionRate: (val) => set({ retentionRate: val }),
  setVideosPerMonth: (val) => set({ videosPerMonth: val }),
  setShortsViews: (val) => set({ shortsViews: val }),
  setShortsRpm: (val) => set({ shortsRpm: val }),

  getDerivedMetrics: () => {
    const state = get()

    // 1. Long Form calculation (based on RPM, not just CPM, so it accounts for YouTube's cut)
    // Adjusting effective RPM slightly based on retention (higher retention = more mid-rolls)
    const retentionModifier = 1 + ((state.retentionRate - 50) / 100) // 50% is baseline
    const effectiveRpm = state.rpm * Math.max(0.5, Math.min(2, retentionModifier))
    const longFormRevenue = (state.monthlyViews / 1000) * effectiveRpm

    // 2. Shorts calculation (Shorts RPM is generally flat)
    const shortsRevenue = (state.shortsViews / 1000) * state.shortsRpm

    // 3. Totals
    const totalMonthlyRevenue = longFormRevenue + shortsRevenue
    const totalAnnualRevenue = totalMonthlyRevenue * 12
    const dailyAverage = totalMonthlyRevenue / 30.4 // Avg days in a month

    // 4. Other stats
    const viewsPerVideo = state.videosPerMonth > 0 ? state.monthlyViews / state.videosPerMonth : 0
    const estimatedPlaybacks = (state.monthlyViews * 0.7) // Roughly 70% of views are monetized playbacks

    return {
      longFormRevenue,
      shortsRevenue,
      totalMonthlyRevenue,
      totalAnnualRevenue,
      dailyAverage,
      viewsPerVideo,
      estimatedPlaybacks
    }
  }
}))
