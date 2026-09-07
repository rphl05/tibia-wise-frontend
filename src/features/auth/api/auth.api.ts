import { apiClient } from '@/lib/api/client'
import type { Me } from '@/types/api'

export interface LoginPayload {
  identifier: string
  password: string
  captcha_token?: string
}

export interface RegisterPayload {
  email: string
  username: string
  password: string
  display_name: string
  country_code?: string
  birth_date?: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient<AuthTokens>('/auth/login', { method: 'POST', body: payload, anonymous: true }),

  register: (payload: RegisterPayload) =>
    apiClient<{ message: string }>('/auth/register', {
      method: 'POST',
      body: payload,
      anonymous: true,
    }),

  verifyEmail: (token: string) =>
    apiClient<{ message: string }>('/auth/verify-email', {
      method: 'POST',
      body: { token },
      anonymous: true,
    }),

  resendVerification: (email: string) =>
    apiClient<{ message: string }>('/auth/resend-verification', {
      method: 'POST',
      body: { email },
      anonymous: true,
    }),

  forgotPassword: (email: string) =>
    apiClient<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: { email },
      anonymous: true,
    }),

  resetPassword: (token: string, password: string) =>
    apiClient<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: { token, password },
      anonymous: true,
    }),

  refresh: (refreshToken: string) =>
    apiClient<AuthTokens>('/auth/refresh', {
      method: 'POST',
      body: { refresh_token: refreshToken },
      anonymous: true,
      skipAuthRetry: true,
    }),

  logout: (refreshToken: string) =>
    apiClient<{ message: string }>('/auth/logout', {
      method: 'POST',
      body: { refresh_token: refreshToken },
      anonymous: true,
      skipAuthRetry: true,
    }),

  me: () => apiClient<Me>('/me'),
}
