import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'
import './AuthPage.css'

export default function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}