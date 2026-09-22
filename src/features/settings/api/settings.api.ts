import { apiClient } from '@/lib/api/client'
import type { Me, SessionInfo, UpdateMeDto } from '@/types/api'

export const settingsApi = {
  updateMe: (dto: UpdateMeDto) =>
    apiClient<Me>('/me', { method: 'PATCH', body: dto }),

  listSessions: () => apiClient<SessionInfo[]>('/me/sessions'),

  revokeSession: (id: string) =>
    apiClient<{ message: string }>(`/me/sessions/${id}`, { method: 'DELETE' }),

  /** Encerra TODAS as sessões do usuário, incluindo a sessão atual. */
  revokeAllSessions: () =>
    apiClient<{ message: string }>('/me/sessions', { method: 'DELETE' }),
}

export type { SessionInfo, UpdateMeDto }
