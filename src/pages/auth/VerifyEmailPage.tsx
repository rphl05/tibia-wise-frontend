import { VerifyEmailForm } from '@/features/auth/components/VerifyEmailForm'
import './AuthPage.css'

export default function VerifyEmailPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <VerifyEmailForm />
      </div>
    </div>
  )
}