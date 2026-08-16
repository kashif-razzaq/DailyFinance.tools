import { create } from 'zustand'

export interface TikTokFundState {
  // Inputs
  monthlyViews: number
  qualifiedViewPercentage: number // Percentage of views that watched > 5 seconds
  rpm: number // Revenue per 1000 qualified views (Creator Rewards Program)
  videosPerMonth: number
  avgVideoLength: 'short' | 'medium' | 'long' // Only > 1min qualifies for new program

  // Actions
  setMonthlyViews: (val: number) => void
  setQualifiedViewPercentage: (val: number) => void
  setRpm: (val: number) => void
  setVideosPerMonth: (val: number) => void
  setAvgVideoLength: (val: TikTokFundState['avgVideoLength']) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    qualifiedViews: number
    estimatedMonthlyEarnings: number
    estimatedAnnualEarnings: number
    earningsPerVideo: number
    isEligible: boolean
    eligibilityMessage: string
  }
}

export const useTikTokFundStore = create<TikTokFundState>((set, get) => ({
  // Default values
  monthlyViews: 5000000,
  qualifiedViewPercentage: 45, // Typically 30-60% of views qualify
  rpm: 0.65, // Creator Rewards Program RPMs range from $0.20 - $1.50+
  videosPerMonth: 15,
  avgVideoLength: 'long', // Must be over 1 min to qualify

  setMonthlyViews: (val) => set({ monthlyViews: val }),
  setQualifiedViewPercentage: (val) => set({ qualifiedViewPercentage: val }),
  setRpm: (val) => set({ rpm: val }),
  setVideosPerMonth: (val) => set({ videosPerMonth: val }),
  setAvgVideoLength: (val) => set({ avgVideoLength: val }),

  getDerivedMetrics: () => {
    const state = get()

    // 1. Check Eligibility for Creator Rewards Program (requires videos > 1 min)
    const isEligible = state.avgVideoLength === 'long'
    const eligibilityMessage = isEligible
      ? "Your content qualifies for the Creator Rewards Program."
      : "Warning: Only videos over 1 minute long qualify for monetization in the new program."

    // 2. Calculate Qualified Views
    // In the new program, only views where the user watched for > 5 seconds count.
    // If not eligible (short videos), earnings are 0 under the new program (the old fund is defunct).
    const qualifiedViews = isEligible ? state.monthlyViews * (state.qualifiedViewPercentage / 100) : 0

    // 3. Earnings
    const estimatedMonthlyEarnings = (qualifiedViews / 1000) * state.rpm
    const estimatedAnnualEarnings = estimatedMonthlyEarnings * 12
    const earningsPerVideo = state.videosPerMonth > 0 ? estimatedMonthlyEarnings / state.videosPerMonth : 0

    return {
      qualifiedViews,
      estimatedMonthlyEarnings,
      estimatedAnnualEarnings,
      earningsPerVideo,
      isEligible,
      eligibilityMessage
    }
  }
}))
