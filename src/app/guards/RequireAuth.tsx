import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ROUTES } from '@/config/routes'
import { useAuth } from '@/features/auth/AuthProvider'

/**
 * Protege rotas autenticadas.
 * Exibe loading durante a restauração de sessão e preserva o destino
 * pretendido para redirecionamento após o login.
 */
export function RequireAuth() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'authenticating') {
    // TODO: substituir por PageLoading quando o Design System estiver implementado.
    return <p>Carregando…</p>
  }

  if (status === 'anonymous') {
    return (
      <Navigate
        to={ROUTES.login}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  return <Outlet />
}
