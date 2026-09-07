import { Outlet } from 'react-router-dom'

/**
 * Shell da aplicação autenticada.
 * Sidebar (260px) + Topbar (72px) serão implementados na fase de Layouts.
 */
export function AppLayout() {
  return (
    <div>
      {/* TODO: Sidebar */}
      {/* TODO: Topbar */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
