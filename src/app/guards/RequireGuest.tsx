import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/config/routes'
import { useAuth } from '@/features/auth/AuthProvider'

/** Rotas exclusivas de visitantes (login, registro, etc.). */
export function RequireGuest() {
  const { status } = useAuth()

  if (status === 'authenticating') {
    return <p>Carregando…</p>
  }

  if (status === 'authenticated') {
    return <Navigate to={ROUTES.dashboard} replace />
  }

  return <Outlet />
}
