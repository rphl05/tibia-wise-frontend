import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { PasswordInput } from '@/components/ui/FormFields/PasswordInput'
import { Alert } from '@/components/feedback/Alert/Alert'
import { useAuthErrorMap } from '../api/errorMap'
import { useResetPasswordSchema } from '../schemas/authSchemas'
import { authApi } from '../api/auth.api'

export function ResetPasswordForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mapErrors = useAuthErrorMap()
  const schema = useResetPasswordSchema()
  const [submitted, setSubmitted] = useState(false)
  const [tokenValid, setTokenValid] = useState(true)

  const token = searchParams.get('token') ?? ''

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema), defaultValues: { token } })

  useEffect(() => {
    if (!token) {
      setTokenValid(false)
    }
  }, [token])

  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      try {
        await authApi.resetPassword(data.token, data.password)
        setSubmitted(true)
        setTimeout(() => navigate('/login', { replace: true }), 2000)
      } catch (err) {
        const mapped = mapErrors(err)
        Object.entries(mapped).forEach(([field, message]) => {
          setError(field as keyof typeof data | 'form', { type: 'manual', message })
        })
      }
    }),
    [handleSubmit, mapErrors, navigate, setError],
  )

if (submitted) {
      return (
        <div className="auth-form auth-form--centered">
          <Alert type="success" title={t('auth.resetPassword.success')}>
            {t('auth.resetPassword.success')}
          </Alert>
        </div>
      )
    }

    if (!tokenValid) {
      return (
        <div className="auth-form auth-form--centered">
          <Alert type="error" title={t('auth.resetPassword.invalidToken')}>
            {t('auth.resetPassword.invalidToken')}
          </Alert>
          <Link to="/forgot-password" className="auth-form__footer">
            {t('auth.forgotPassword.backToLogin')}
          </Link>
        </div>
      )
    }

  return (
    <form onSubmit={onSubmit} noValidate className="auth-form">
      <h1 className="auth-form__title">{t('auth.resetPassword.title')}</h1>
      <p className="auth-form__subtitle">{t('auth.resetPassword.subtitle')}</p>

      <input type="hidden" {...register('token')} />

      {errors.form && (
        <div className="auth-form__error" role="alert">
          {errors.form.message}
        </div>
      )}

      <PasswordInput
        {...register('password')}
        label={t('auth.resetPassword.password')}
        error={errors.password?.message}
        autoComplete="new-password"
      />

      <PasswordInput
        {...register('confirmPassword')}
        label={t('auth.resetPassword.confirmPassword')}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
      />

      <Button type="submit" fullWidth loading={isSubmitting}>
        {t('auth.resetPassword.submit')}
      </Button>
    </form>
  )
}