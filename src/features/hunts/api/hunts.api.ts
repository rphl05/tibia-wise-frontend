import { apiClient } from '@/lib/api/client'
import type { HuntSummary, HuntDetail, Paginated } from '@/types/api'

function buildQuery(params: Record<string, unknown>): string {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) search.append(key, String(value))
  })
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

export interface CreateHuntDto {
  raw_content: string
  character_id: number
  hunting_place_id?: number
  name?: string
  notes?: string
  visibility?: 'PUBLIC' | 'PRIVATE'
  is_fast_respawn?: boolean
}

export interface UpdateHuntDto {
  name?: string
  visibility?: 'PUBLIC' | 'PRIVATE'
  notes?: string
}

export const huntsApi = {
  list: (params?: {
    hunting_place_id?: number
    character_id?: number
    page?: number
    limit?: number
  }) => apiClient<Paginated<HuntSummary>>(`/hunts${buildQuery(params ?? {})}`),

  myHunts: (params?: {
    page?: number
    limit?: number
    visibility?: 'PUBLIC' | 'PRIVATE'
  }) => apiClient<Paginated<HuntSummary>>(`/me/hunts${buildQuery(params ?? {})}`),

  get: (publicId: string) => apiClient<HuntDetail>(`/hunts/${publicId}`),

  myHuntDetail: (publicId: string) => apiClient<HuntDetail>(`/me/hunts/${publicId}`),

  import: (dto: CreateHuntDto) =>
    apiClient<{ message: string; hunt_id: string }>('/me/hunts', { method: 'POST', body: dto }),

  update: (publicId: string, dto: UpdateHuntDto) =>
    apiClient<{ message: string }>(`/me/hunts/${publicId}`, { method: 'PATCH', body: dto }),

  archive: (publicId: string) =>
    apiClient<{ message: string }>(`/me/hunts/${publicId}/archive`, { method: 'POST' }),

  delete: (publicId: string) =>
    apiClient<{ message: string }>(`/me/hunts/${publicId}`, { method: 'DELETE' }),
}