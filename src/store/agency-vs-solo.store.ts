import { create } from 'zustand'

export interface AgencyVsSoloState {
  // Inputs
  currentHourlyRate: number
  hoursPerVideo: number
  videosPerMonth: number
  contractorHourlyRate: number // e.g. editor or thumbnail artist
  contractorHoursPerVideo: number // how long it takes them
  managementHoursPerVideo: number // how long you spend managing them

  // Actions
  setCurrentHourlyRate: (val: number) => void
  setHoursPerVideo: (val: number) => void
  setVideosPerMonth: (val: number) => void
  setContractorHourlyRate: (val: number) => void
  setContractorHoursPerVideo: (val: number) => void
  setManagementHoursPerVideo: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    soloCostPerVideo: number
    delegatedCostPerVideo: number
    timeSavedPerVideo: number
    financialROI: number
    monthlyTimeSaved: number
    monthlyArbitrageProfit: number
  }
}

export const useAgencyStore = create<AgencyVsSoloState>((set, get) => ({
  // Default values
  currentHourlyRate: 100, // Creator's effective hourly rate
  hoursPerVideo: 15, // Time creator spends editing
  videosPerMonth: 4,
  contractorHourlyRate: 35,
  contractorHoursPerVideo: 12,
  managementHoursPerVideo: 2, // Briefing, reviewing, revisions

  setCurrentHourlyRate: (val) => set({ currentHourlyRate: val }),
  setHoursPerVideo: (val) => set({ hoursPerVideo: val }),
  setVideosPerMonth: (val) => set({ videosPerMonth: val }),
  setContractorHourlyRate: (val) => set({ contractorHourlyRate: val }),
  setContractorHoursPerVideo: (val) => set({ contractorHoursPerVideo: val }),
  setManagementHoursPerVideo: (val) => set({ managementHoursPerVideo: val }),

  getDerivedMetrics: () => {
    const state = get()

    // Value of creator's time if they do it themselves
    const soloCostPerVideo = state.hoursPerVideo * state.currentHourlyRate

    // Hard cost of contractor + value of creator's time managing them
    const hardContractorCost = state.contractorHoursPerVideo * state.contractorHourlyRate
    const managementCost = state.managementHoursPerVideo * state.currentHourlyRate
    const delegatedCostPerVideo = hardContractorCost + managementCost

    // Raw hours saved
    const timeSavedPerVideo = state.hoursPerVideo - state.managementHoursPerVideo

    // Financial ROI (Arbitrage value). If > 0, you are making money by hiring.
    const financialROI = soloCostPerVideo - delegatedCostPerVideo

    const monthlyTimeSaved = timeSavedPerVideo * state.videosPerMonth
    const monthlyArbitrageProfit = financialROI * state.videosPerMonth

    return {
      soloCostPerVideo,
      delegatedCostPerVideo,
      timeSavedPerVideo,
      financialROI,
      monthlyTimeSaved,
      monthlyArbitrageProfit
    }
  }
}))
