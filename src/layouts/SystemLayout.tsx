import { Outlet } from 'react-router-dom'

/** Layout das páginas de sistema/erro (403, 404, 500, 503). */
export function SystemLayout() {
  return (
    <main>
      <Outlet />
    </main>
  )
}
