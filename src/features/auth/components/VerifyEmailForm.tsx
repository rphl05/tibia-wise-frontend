import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCallback, useState, useEffect } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/FormFields/Input'
import { Alert } from '@/components/feedback/Alert/Alert'
import { useAuthErrorMap } from '../api/errorMap'
import { useVerifyEmailSchema } from '../schemas/authSchemas'
import { authApi } from '../api/auth.api'

export function VerifyEmailForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mapErrors = useAuthErrorMap()
  const schema = useVerifyEmailSchema()
  const [submitted, setSubmitted] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [email] = useState(() => searchParams.get('email') ?? '')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => setResendCooldown((c) => c - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [resendCooldown])

  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      try {
        await authApi.verifyEmail(data.token)
        setSubmitted(true)
        setTimeout(() => navigate('/login', { replace: true }), 2000)
      } catch (err) {
        const mapped = mapErrors(err)
        Object.entries(mapped).forEach(([field, message]) => {
          setError(field as 'token' | 'form', { type: 'manual', message })
        })
      }
    }),
    [handleSubmit, mapErrors, navigate, setError],
  )

  const handleResend = useCallback(async () => {
    if (!email) return
    try {
      await authApi.resendVerification(email)
      setResendCooldown(60)
    } catch {
      // silencioso
    }
  }, [email])

if (submitted) {
      return (
        <div className="auth-form auth-form--centered">
          <Alert type="success" title={t('auth.verifyEmail.success')}>
            {t('auth.verifyEmail.success')}
          </Alert>
        </div>
      )
    }

  return (
    <form onSubmit={onSubmit} noValidate className="auth-form">
      <h1 className="auth-form__title">{t('auth.verifyEmail.title')}</h1>
      <p className="auth-form__subtitle">{t('auth.verifyEmail.subtitle')}</p>

      {email && <p className="auth-form__email">{t('auth.verifyEmail.sentTo', { email })}</p>}

      {errors.form && (
        <div className="auth-form__error" role="alert">
          {errors.form.message}
        </div>
      )}

      <Input
        {...register('token')}
        label={t('auth.verifyEmail.codePlaceholder')}
        placeholder={t('auth.verifyEmail.codePlaceholder')}
        error={errors.token?.message}
        autoComplete="one-time-code"
        autoFocus
        maxLength={6}
        inputMode="numeric"
      />

      <Button type="submit" fullWidth loading={isSubmitting}>
        {t('auth.verifyEmail.submit')}
      </Button>

      <Button
        type="button"
        variant="ghost"
        fullWidth
        disabled={resendCooldown > 0}
        onClick={handleResend}
      >
        {resendCooldown > 0
          ? t('auth.verifyEmail.resendIn', { seconds: resendCooldown })
          : t('auth.verifyEmail.resend')}
      </Button>
    </form>
  )
}