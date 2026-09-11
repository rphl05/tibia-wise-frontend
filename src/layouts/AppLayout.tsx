import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { MobileNav } from './AppLayout/MobileNav'
import { Sidebar } from './AppLayout/Sidebar'
import { Topbar } from './AppLayout/Topbar'
import { SkipLink } from '@/components/a11y/SkipLink'

import './AppLayout/AppLayout.css'

/**
 * Shell autenticado: Sidebar (260px) + Topbar (72px) + conteúdo.
 * Tablet/mobile: sidebar vira drawer; mobile tem navegação inferior.
 */
export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <SkipLink />
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="app-layout__backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <main className="app-layout__content" id="main-content">
        <div className="app-layout__container">
          <Outlet />
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
