import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/FormFields/Input'
import { PasswordInput } from '@/components/ui/FormFields/PasswordInput'
import { useAuthErrorMap } from '../api/errorMap'
import { useLoginSchema } from '../schemas/authSchemas'
import { authApi } from '../api/auth.api'

export function LoginForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const mapErrors = useAuthErrorMap()
  const schema = useLoginSchema()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      try {
        await authApi.login(data)
        navigate('/dashboard', { replace: true })
      } catch (err) {
        const mapped = mapErrors(err)
        Object.entries(mapped).forEach(([field, message]) => {
          setError(field as 'identifier' | 'password' | 'form', { type: 'manual', message })
        })
      }
    }),
    [handleSubmit, navigate, mapErrors, setError],
  )

  return (
    <form onSubmit={onSubmit} noValidate className="auth-form">
      <h1 className="auth-form__title">{t('auth.login.title')}</h1>
      <p className="auth-form__subtitle">{t('auth.login.subtitle')}</p>

      {errors.form && (
        <div className="auth-form__error" role="alert">
          {errors.form.message}
        </div>
      )}

      <Input
        {...register('identifier')}
        label={t('auth.login.identifier')}
        placeholder={t('auth.login.identifierPlaceholder')}
        error={errors.identifier?.message}
        autoComplete="username"
        autoFocus
      />

      <PasswordInput
        {...register('password')}
        label={t('auth.login.password')}
        error={errors.password?.message}
        autoComplete="current-password"
      />

      <div className="auth-form__row">
        <Link to="/forgot-password" className="auth-form__link">
          {t('auth.login.forgotPassword')}
        </Link>
      </div>

      <Button type="submit" fullWidth loading={isSubmitting}>
        {t('auth.login.submit')}
      </Button>

      <p className="auth-form__footer">
        {t('auth.login.noAccount')}{' '}
        <Link to="/register">{t('auth.login.registerLink')}</Link>
      </p>
    </form>
  )
}