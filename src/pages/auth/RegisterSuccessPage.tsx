import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/Button/Button'
import { Alert } from '@/components/feedback/Alert/Alert'
import './AuthPage.css'

export default function RegisterSuccessPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email ?? ''

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <Alert type="success" title={t('auth.registerSuccess.title')}>
          <p className="auth-success__email">{email}</p>
          <p>{t('auth.registerSuccess.subtitle')}</p>
          <p>{t('auth.registerSuccess.info')}</p>
        </Alert>
        <Link to="/verify-email" state={{ email }} className="auth-page__link">
          <Button fullWidth>{t('auth.registerSuccess.resend')}</Button>
        </Link>
      </div>
    </div>
  )
}