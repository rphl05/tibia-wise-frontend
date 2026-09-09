import { RegisterForm } from '@/features/auth/components/RegisterForm'
import './AuthPage.css'

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <RegisterForm />
      </div>
    </div>
  )
}