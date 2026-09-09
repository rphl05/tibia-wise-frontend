import { Outlet } from 'react-router-dom'

import { Footer } from './Footer/Footer'
import { PublicHeader } from './PublicLayout/PublicHeader'

/** Layout de páginas públicas: header simples + conteúdo + footer. */
export function PublicLayout() {
  return (
    <div>
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
