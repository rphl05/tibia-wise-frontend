import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/lib/api/client'

export interface UserSubscriptionResponse {
  has_active: boolean
  subscription: {
    id: string
    plan_name: string
    plan_slug: string
    max_characters: number | null
    status: string
    payment_method: string | null
    started_at: string
    expires_at: string | null
  } | null
  pending_request: unknown | null
  fallback_plan?: {
    name: string
    slug: string
    max_characters: number
  }
}

export const subscriptionsApi = {
  getMine: () => apiClient<UserSubscriptionResponse>('/me/subscription'),
}

/**
 * Informa se o usuário autenticado possui assinatura Premium ativa.
 * A autoridade final continua sendo o backend; aqui é apenas decisão
 * de UI (ex.: esconder opções Premium para usuários Free).
 */
export function useIsPremium(): boolean {
  const { data } = useQuery({
    queryKey: ['meSubscription'],
    queryFn: subscriptionsApi.getMine,
    // Falha no lookup não deve liberar recursos Premium.
    retry: false,
  })
  return data?.has_active === true
}
