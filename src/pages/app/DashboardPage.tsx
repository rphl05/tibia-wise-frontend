import { useAuth } from '@/features/auth/AuthProvider'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <section>
      <h1>Dashboard</h1>
      <p>
        Olá, {user?.display_name}. Conteúdo do Dashboard será implementado na fase
        de Analytics.
      </p>
      <button type="button" onClick={() => void logout()}>
        Sair
      </button>
    </section>
  )
}
