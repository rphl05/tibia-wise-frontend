import { env } from '@/config/env'
import { ApiError } from './errors'
import { tokenStorage } from '@/lib/storage/tokenStorage'

/**
 * API Client central do Tibia Wise.
 * Componentes nunca chamam a API diretamente — sempre via features/hooks.
 */
type AccessTokenGetter = () => string | null
type AccessTokenSetter = (access: string, refresh: string) => void
type UnauthorizedHandler = () => void

let getAccessToken: AccessTokenGetter = () => null
let setTokens: AccessTokenSetter = () => undefined
let onUnauthorized: UnauthorizedHandler = () => undefined

/** Configurado pelo AuthProvider na inicialização. */
export function configureApiAuth(handlers: {
  getAccessToken: AccessTokenGetter
  setTokens: AccessTokenSetter
  onUnauthorized: UnauthorizedHandler
}) {
  getAccessToken = handlers.getAccessToken
  setTokens = handlers.setTokens
  onUnauthorized = handlers.onUnauthorized
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: unknown
  /** Omite o header Authorization (endpoints públicos). */
  anonymous?: boolean
  /** Evita tentativa de refresh em caso de 401 (uso interno). */
  skipAuthRetry?: boolean
  signal?: AbortSignal
}

let refreshPromise: Promise<boolean> | null = null

async function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = tokenStorage.getRefreshToken()
      if (!refreshToken) return false
      try {
        const res = await fetch(`${env.apiUrl}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        })
        if (!res.ok) return false
        const data = (await res.json()) as {
          access_token: string
          refresh_token: string
        }
        setTokens(data.access_token, data.refresh_token)
        return true
      } catch {
        return false
      } finally {
        setTimeout(() => {
          refreshPromise = null
        }, 0)
      }
    })()
  }
  return refreshPromise
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, anonymous, skipAuthRetry, signal } = options

  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  const token = getAccessToken()
  if (!anonymous && token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${env.apiUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  })

  if (res.status === 401 && !anonymous && !skipAuthRetry) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      return apiClient<T>(path, { ...options, skipAuthRetry: true })
    }
    onUnauthorized()
    throw new ApiError({ statusCode: 401, code: 'UNAUTHORIZED', message: 'Session expired' })
  }

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({
      statusCode: res.status,
      code: 'INTERNAL_ERROR',
      message: res.statusText,
    }))) as { statusCode: number; code?: string; message: string | string[] }
    throw new ApiError({
      statusCode: errorBody.statusCode ?? res.status,
      code: errorBody.code ?? 'INTERNAL_ERROR',
      message: errorBody.message ?? res.statusText,
    })
  }

  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}
