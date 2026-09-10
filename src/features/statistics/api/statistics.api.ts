import { apiClient } from '@/lib/api/client'

export interface StatisticsResult {
  count: number
  avg_xp: string
  avg_xp_per_hour: string
  avg_loot: string
  avg_balance: string
  avg_duration: string
  total_xp: string
  total_loot: string
  has_enough_data: boolean
  period: string
}

export interface StatisticsParams {
  period?: '7d' | '30d' | '90d' | 'all'
  hunting_place_id?: number
  vocation_id?: number
  level_min?: number
  level_max?: number
}

export interface StatisticsEvolutionPoint {
  period: string
  xp_per_hour: string
  profit_per_hour: string
  hunt_count: number
}

export interface PeriodComparison {
  current: StatisticsResult
  previous: StatisticsResult
  xp_change_pct: string
  profit_change_pct: string
}

export interface XpAnalysis {
  total_xp: string
  xp_per_hunt_avg: string
  best_hunt_xp: string
  best_hunt_xp_per_hour: string
}

export interface ProfitAnalysis {
  total_profit: string
  profit_per_hunt_avg: string
  best_hunt_profit: string
  best_hunt_profit_per_hour: string
}

export interface HuntingPlacePerformance {
  hunting_place_id: number
  hunting_place_name: string
  hunt_count: number
  avg_xp_per_hour: string
  avg_profit_per_hour: string
  total_xp: string
  total_profit: string
}

export interface HuntComparisonItem {
  hunt_id: string
  hunt_name: string | null
  hunting_place: string
  date: string
  duration_seconds: number
  xp: string
  xp_per_hour: string
  balance: string
  profit_per_hour: string
}

export interface RankingEntry {
  rank: number
  character_name: string
  vocation_id: number
  world: string
  level: number
  value: string
}

export interface RankingResponse {
  items: RankingEntry[]
  totalPages: number
  currentPage: number
}

export const statisticsApi = {
  getStatistics: (params?: StatisticsParams) => {
    const search = new URLSearchParams()
    if (params?.period) search.append('period', params.period)
    if (params?.hunting_place_id) search.append('hunting_place_id', String(params.hunting_place_id))
    if (params?.vocation_id) search.append('vocation_id', String(params.vocation_id))
    if (params?.level_min) search.append('level_min', String(params.level_min))
    if (params?.level_max) search.append('level_max', String(params.level_max))
    const qs = search.toString()
    return apiClient<StatisticsResult>(`/statistics${qs ? `?${qs}` : ''}`)
  },

  getHuntingPlaceStatistics: (id: number, params?: StatisticsParams) => {
    const search = new URLSearchParams()
    if (params?.period) search.append('period', params.period)
    if (params?.vocation_id) search.append('vocation_id', String(params.vocation_id))
    if (params?.level_min) search.append('level_min', String(params.level_min))
    if (params?.level_max) search.append('level_max', String(params.level_max))
    const qs = search.toString()
    return apiClient<StatisticsResult>(`/hunting-places/${id}/statistics${qs ? `?${qs}` : ''}`)
  },

  // Dashboard-specific endpoints
  getDashboard: () => apiClient<{
    total_hunts: number
    avg_xp_per_hour: string
    avg_profit_per_hour: string
    total_play_time: string
    recent_hunts: Array<{
      id: string
      public_id: string
      name: string | null
      hunting_place: string
      character_name: string
      duration_seconds: number
      xp: string
      xp_per_hour: string
      balance: string
      profit_per_hour: string
      created_at: string
    }>
    latest_news: Array<{
      id: number
      title: string
      slug: string
      summary: string
      cover_image_url: string | null
      created_at: string
    }>
    recommendations: Array<{
      hunting_place_id: number
      hunting_place_name: string
      estimated_xp_per_hour: string
      estimated_profit_per_hour: string
      compatibility_score: number
      reason: string
    }>
  }>('/dashboard'),

  // Evolution chart data
  getXpEvolution: (params?: { period?: '7d' | '30d' | '90d' | 'all' }) => {
    const search = new URLSearchParams()
    if (params?.period) search.append('period', params.period)
    const qs = search.toString()
    return apiClient<StatisticsEvolutionPoint[]>(`/statistics/xp-evolution${qs ? `?${qs}` : ''}`)
  },

  getProfitEvolution: (params?: { period?: '7d' | '30d' | '90d' | 'all' }) => {
    const search = new URLSearchParams()
    if (params?.period) search.append('period', params.period)
    const qs = search.toString()
    return apiClient<StatisticsEvolutionPoint[]>(`/statistics/profit-evolution${qs ? `?${qs}` : ''}`)
  },

  getPeriodComparison: (params?: { period?: '7d' | '30d' | '90d' | 'all' }) => {
    const search = new URLSearchParams()
    if (params?.period) search.append('period', params.period)
    const qs = search.toString()
    return apiClient<PeriodComparison>(`/statistics/comparison${qs ? `?${qs}` : ''}`)
  },

  getXpAnalysis: () => apiClient<XpAnalysis>('/statistics/xp-analysis'),
  getProfitAnalysis: () => apiClient<ProfitAnalysis>('/statistics/profit-analysis'),

  getHuntingPlacePerformance: (params?: { period?: '7d' | '30d' | '90d' | 'all' }) => {
    const search = new URLSearchParams()
    if (params?.period) search.append('period', params.period)
    const qs = search.toString()
    return apiClient<HuntingPlacePerformance[]>(`/statistics/hunting-place-performance${qs ? `?${qs}` : ''}`)
  },

  getHuntComparison: (params?: { period?: '7d' | '30d' | '90d' | 'all' }) => {
    const search = new URLSearchParams()
    if (params?.period) search.append('period', params.period)
    const qs = search.toString()
    return apiClient<HuntComparisonItem[]>(`/statistics/hunt-comparison${qs ? `?${qs}` : ''}`)
  },

  getRanking: (params?: {
    type: 'xpPerHour' | 'profitPerHour' | 'totalXp' | 'totalProfit'
    period?: '7d' | '30d' | '90d' | 'all'
    vocation?: number
    world?: string
    page?: number
    pageSize?: number
  }) => {
    const search = new URLSearchParams()
    if (params?.type) search.append('type', params.type)
    if (params?.period) search.append('period', params.period)
    if (params?.vocation) search.append('vocation', String(params.vocation))
    if (params?.world) search.append('world', params.world)
    if (params?.page) search.append('page', String(params.page))
    if (params?.pageSize) search.append('pageSize', String(params.pageSize))
    const qs = search.toString()
    return apiClient<RankingResponse>(`/statistics/ranking${qs ? `?${qs}` : ''}`)
  },
}