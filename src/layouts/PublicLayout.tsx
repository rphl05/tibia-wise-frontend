import { Outlet } from 'react-router-dom'

/**
 * Layout de páginas públicas (sem Sidebar da aplicação).
 * O PublicHeader e o Footer serão implementados na fase do Design System.
 */
export function PublicLayout() {
  return (
    <div>
      {/* TODO: PublicHeader */}
      <main>
        <Outlet />
      </main>
      {/* TODO: Footer */}
    </div>
  )
}
