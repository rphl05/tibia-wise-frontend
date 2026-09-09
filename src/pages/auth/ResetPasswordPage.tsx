import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm'
import './AuthPage.css'

export default function ResetPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <ResetPasswordForm />
      </div>
    </div>
  )
}