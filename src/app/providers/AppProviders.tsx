import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { ToastProvider } from '@/components/feedback/Toast/ToastProvider'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { queryClient } from '@/lib/query/queryClient'
import { ThemeProvider } from './ThemeProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
