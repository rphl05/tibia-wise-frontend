const REFRESH_TOKEN_KEY = 'tw-refresh-token'

/**
 * O access token vive apenas em memória (ver AuthProvider).
 * O refresh token é persistido para restaurar a sessão.
 * A autorização real é sempre validada pelo backend.
 */
export const tokenStorage = {
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },
  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  },
  clear(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}
