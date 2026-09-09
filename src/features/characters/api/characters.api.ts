import { apiClient } from '@/lib/api/client'
import type { Character, CharacterDetail } from '@/types/api'

export interface CreateCharacterDto {
  name: string
  is_private?: boolean
}

export interface UpdateCharacterDto {
  level?: number
  magic_level?: number
  fist_fighting?: number
  club_fighting?: number
  sword_fighting?: number
  axe_fighting?: number
  distance_fighting?: number
  shielding?: number
  fishing?: number
  is_private?: boolean
}

export interface VerifyCharacterResponse {
  token: string
  message: string
}

export type { Character, CharacterDetail }

export const charactersApi = {
  list: () => apiClient<Character[]>('/me/characters'),

  get: (id: string) => apiClient<CharacterDetail>(`/characters/${id}`),

  create: (dto: CreateCharacterDto) =>
    apiClient<Character>('/me/characters', { method: 'POST', body: dto }),

  update: (id: string, dto: UpdateCharacterDto) =>
    apiClient<Character>(`/me/characters/${id}`, { method: 'PATCH', body: dto }),

  delete: (id: string) =>
    apiClient<{ message: string }>(`/me/characters/${id}`, { method: 'DELETE' }),

  verify: (id: string) =>
    apiClient<VerifyCharacterResponse>(`/me/characters/${id}/verify`, { method: 'POST' }),

  generateVerification: (id: string) =>
    apiClient<VerifyCharacterResponse>(`/me/characters/${id}/generate-verification`, { method: 'POST' }),

  refresh: (id: string) =>
    apiClient<Character>(`/me/characters/${id}/refresh`, { method: 'POST' }),
}