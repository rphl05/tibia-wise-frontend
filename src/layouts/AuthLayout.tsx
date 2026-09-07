import { Outlet } from 'react-router-dom'

/** Layout das páginas de autenticação (login, registro, etc.). */
export function AuthLayout() {
  return (
    <main>
      <Outlet />
    </main>
  )
}
