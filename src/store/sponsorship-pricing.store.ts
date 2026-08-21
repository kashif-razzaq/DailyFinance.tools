import { create } from 'zustand'

export interface SponsorshipPricingState {
  // Inputs
  platform: 'youtube' | 'instagram' | 'tiktok' | 'newsletter' | 'podcast'
  audienceSize: number
  engagementRate: number // percentage (0-100)
  niche: 'finance' | 'tech' | 'gaming' | 'lifestyle' | 'education' | 'other'
  deliverableType: 'dedicated' | 'integrated' | 'shoutout'
  usageRights: number // months (0 = none)
  exclusivity: number // months (0 = none)

  // Actions
  setPlatform: (val: SponsorshipPricingState['platform']) => void
  setAudienceSize: (val: number) => void
  setEngagementRate: (val: number) => void
  setNiche: (val: SponsorshipPricingState['niche']) => void
  setDeliverableType: (val: SponsorshipPricingState['deliverableType']) => void
  setUsageRights: (val: number) => void
  setExclusivity: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    baseRate: number
    engagementPremium: number
    nicheMultiplier: number
    deliverableMultiplier: number
    usageRightsFee: number
    exclusivityFee: number
    recommendedRate: number
    negotiationRange: [number, number]
  }
}

export const useSponsorshipPricingStore = create<SponsorshipPricingState>((set, get) => ({
  // Default values
  platform: 'youtube',
  audienceSize: 50000,
  engagementRate: 5,
  niche: 'tech',
  deliverableType: 'integrated',
  usageRights: 0,
  exclusivity: 0,

  setPlatform: (val) => set({ platform: val }),
  setAudienceSize: (val) => set({ audienceSize: val }),
  setEngagementRate: (val) => set({ engagementRate: val }),
  setNiche: (val) => set({ niche: val }),
  setDeliverableType: (val) => set({ deliverableType: val }),
  setUsageRights: (val) => set({ usageRights: val }),
  setExclusivity: (val) => set({ exclusivity: val }),

  getDerivedMetrics: () => {
    const state = get()

    // Base CPM (Cost Per Mille) mapping by platform
    const platformCPMs = {
      youtube: 20,     // Higher effort, better conversion
      instagram: 10,   // Moderate effort
      tiktok: 5,       // Lower effort, fleeting attention
      newsletter: 25,  // Very high conversion
      podcast: 25      // High trust, engaged audience
    }

    const baseCPM = platformCPMs[state.platform]
    const baseRate = (state.audienceSize / 1000) * baseCPM

    // Niche Multiplier
    const nicheMultipliers = {
      finance: 1.5,
      tech: 1.3,
      education: 1.2,
      lifestyle: 0.9,
      gaming: 0.8,
      other: 1.0
    }
    const nicheMultiplier = nicheMultipliers[state.niche]

    // Deliverable Multiplier
    const deliverableMultipliers = {
      dedicated: 2.0,    // Full video/email about sponsor
      integrated: 1.0,   // 60s read in middle
      shoutout: 0.5      // 15s quick mention at start/end
    }
    const deliverableMultiplier = deliverableMultipliers[state.deliverableType]

    // Engagement Premium (Benchmark is typically 2-3%, above that is premium)
    const engagementPremiumFactor = state.engagementRate > 3 ? (state.engagementRate - 3) * 0.1 : 0
    // Cap engagement premium at +50%
    const engagementPremium = baseRate * Math.min(0.5, engagementPremiumFactor)

    // Calculate subtotal before usage/exclusivity rights
    const subtotal = (baseRate * nicheMultiplier * deliverableMultiplier) + engagementPremium

    // Usage Rights (Typically +10-20% per month of usage)
    const usageRightsFee = state.usageRights > 0 ? subtotal * (0.15 * state.usageRights) : 0

    // Exclusivity Rights (Typically +10-25% per month of exclusivity)
    const exclusivityFee = state.exclusivity > 0 ? subtotal * (0.20 * state.exclusivity) : 0

    const recommendedRate = subtotal + usageRightsFee + exclusivityFee

    // Provide a negotiation range (-15% to +25%)
    const negotiationRange: [number, number] = [
      Math.max(0, recommendedRate * 0.85),
      recommendedRate * 1.25
    ]

    return {
      baseRate,
      engagementPremium,
      nicheMultiplier,
      deliverableMultiplier,
      usageRightsFee,
      exclusivityFee,
      recommendedRate,
      negotiationRange
    }
  }
}))
