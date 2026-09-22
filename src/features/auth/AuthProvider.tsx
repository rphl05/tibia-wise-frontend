import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { configureApiAuth } from '@/lib/api/client'
import { tokenStorage } from '@/lib/storage/tokenStorage'
import type { Me } from '@/types/api'
import { authApi } from './api/auth.api'

type AuthStatus =
  | 'authenticating' // restaurando sessão
  | 'authenticated'
  | 'anonymous'

interface AuthContextValue {
  status: AuthStatus
  user: Me | null
  login: (identifier: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('authenticating')
  const [user, setUser] = useState<Me | null>(null)
  const accessTokenRef = useRef<string | null>(null)

  useEffect(() => {
    configureApiAuth({
      getAccessToken: () => accessTokenRef.current,
      setTokens: (access, refresh) => {
        accessTokenRef.current = access
        tokenStorage.setRefreshToken(refresh)
      },
      onUnauthorized: () => {
        accessTokenRef.current = null
        tokenStorage.clear()
        setUser(null)
        setStatus('anonymous')
      },
    })
  }, [])

  // Restaura a sessão a partir do refresh token persistido.
  useEffect(() => {
    let cancelled = false

    async function restoreSession() {
      const refreshToken = tokenStorage.getRefreshToken()
      if (!refreshToken) {
        setStatus('anonymous')
        return
      }
      try {
        const tokens = await authApi.refresh(refreshToken)
        accessTokenRef.current = tokens.access_token
        tokenStorage.setRefreshToken(tokens.refresh_token)
        const me = await authApi.me()
        if (cancelled) return
        setUser(me)
        setStatus('authenticated')
      } catch {
        if (cancelled) return
        tokenStorage.clear()
        setStatus('anonymous')
      }
    }

    void restoreSession()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (identifier: string, password: string) => {
    const tokens = await authApi.login({ identifier, password })
    accessTokenRef.current = tokens.access_token
    tokenStorage.setRefreshToken(tokens.refresh_token)
    const me = await authApi.me()
    setUser(me)
    setStatus('authenticated')
  }, [])

  const logout = useCallback(async () => {
    const refreshToken = tokenStorage.getRefreshToken()
    try {
      if (refreshToken) await authApi.logout(refreshToken)
    } finally {
      accessTokenRef.current = null
      tokenStorage.clear()
      setUser(null)
      setStatus('anonymous')
    }
  }, [])

  const refreshUser = useCallback(async () => {
    const me = await authApi.me()
    setUser(me)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, login, logout, refreshUser }),
    [status, user, login, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
