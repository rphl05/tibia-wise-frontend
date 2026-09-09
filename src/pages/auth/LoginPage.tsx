import { LoginForm } from '@/features/auth/components/LoginForm'
import './AuthPage.css'

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <LoginForm />
      </div>
    </div>
  )
}