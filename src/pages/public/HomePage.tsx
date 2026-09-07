import { Link } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

export default function HomePage() {
  return (
    <section>
      <h1>Tibia Wise</h1>
      <p>Analytics para suas hunting sessions do Tibia.</p>
      <nav>
        <Link to={ROUTES.login}>Entrar</Link> ·{' '}
        <Link to={ROUTES.register}>Criar conta</Link>
      </nav>
    </section>
  )
}
