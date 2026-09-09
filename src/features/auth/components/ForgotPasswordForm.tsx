import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/FormFields/Input'
import { Alert } from '@/components/feedback/Alert/Alert'
import { useAuthErrorMap } from '../api/errorMap'
import { useForgotPasswordSchema } from '../schemas/authSchemas'
import { authApi } from '../api/auth.api'

export function ForgotPasswordForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const mapErrors = useAuthErrorMap()
  const schema = useForgotPasswordSchema()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      try {
        await authApi.forgotPassword(data.email)
        setSubmitted(true)
      } catch (err) {
        const mapped = mapErrors(err)
        Object.entries(mapped).forEach(([field, message]) => {
          setError(field as 'email' | 'form', { type: 'manual', message })
        })
      }
    }),
    [handleSubmit, mapErrors, setError],
  )

if (submitted) {
      return (
        <div className="auth-form auth-form--centered">
          <Alert type="success" title={t('auth.forgotPassword.success')}>
            {t('auth.forgotPassword.success')}
          </Alert>
          <Button variant="ghost" onClick={() => navigate('/login', { replace: true })}>
            {t('auth.forgotPassword.backToLogin')}
          </Button>
        </div>
      )
    }

  return (
    <form onSubmit={onSubmit} noValidate className="auth-form">
      <h1 className="auth-form__title">{t('auth.forgotPassword.title')}</h1>
      <p className="auth-form__subtitle">{t('auth.forgotPassword.subtitle')}</p>

      {errors.form && (
        <div className="auth-form__error" role="alert">
          {errors.form.message}
        </div>
      )}

      <Input
        {...register('email')}
        label={t('auth.forgotPassword.email')}
        type="email"
        placeholder={t('auth.register.emailPlaceholder')}
        error={errors.email?.message}
        autoComplete="email"
        autoFocus
      />

      <Button type="submit" fullWidth loading={isSubmitting}>
        {t('auth.forgotPassword.submit')}
      </Button>

      <p className="auth-form__footer">
        <Link to="/login">{t('auth.forgotPassword.backToLogin')}</Link>
      </p>
    </form>
  )
}