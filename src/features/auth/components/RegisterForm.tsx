import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/FormFields/Input'
import { PasswordInput } from '@/components/ui/FormFields/PasswordInput'
import { useAuthErrorMap } from '../api/errorMap'
import { useRegisterSchema } from '../schemas/authSchemas'
import { authApi } from '../api/auth.api'

export function RegisterForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const mapErrors = useAuthErrorMap()
  const schema = useRegisterSchema()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      try {
        await authApi.register({
          email: data.email,
          username: data.username,
          password: data.password,
          display_name: data.display_name,
          country_code: data.country_code,
          birth_date: data.birth_date,
        })
        navigate('/verify-email', { replace: true, state: { email: data.email } })
      } catch (err) {
        const mapped = mapErrors(err)
        Object.entries(mapped).forEach(([field, message]) => {
          setError(field as keyof typeof data | 'form', { type: 'manual', message })
        })
      }
    }),
    [handleSubmit, navigate, mapErrors, setError],
  )

  return (
    <form onSubmit={onSubmit} noValidate className="auth-form">
      <h1 className="auth-form__title">{t('auth.register.title')}</h1>
      <p className="auth-form__subtitle">{t('auth.register.subtitle')}</p>

      {errors.form && (
        <div className="auth-form__error" role="alert">
          {errors.form.message}
        </div>
      )}

      <Input
        {...register('email')}
        label={t('auth.register.email')}
        placeholder={t('auth.register.emailPlaceholder')}
        type="email"
        error={errors.email?.message}
        autoComplete="email"
        autoFocus
      />

      <Input
        {...register('username')}
        label={t('auth.register.username')}
        placeholder={t('auth.register.usernamePlaceholder')}
        error={errors.username?.message}
        autoComplete="username"
        hint={t('auth.register.usernameHelp')}
      />

      <Input
        {...register('display_name')}
        label={t('auth.register.displayName')}
        placeholder={t('auth.register.displayNamePlaceholder')}
        error={errors.display_name?.message}
        autoComplete="name"
      />

      <PasswordInput
        {...register('password')}
        label={t('auth.register.password')}
        placeholder={t('auth.register.passwordPlaceholder')}
        error={errors.password?.message}
        autoComplete="new-password"
        hint={t('auth.register.passwordHelp')}
      />

      <PasswordInput
        {...register('confirmPassword')}
        label={t('auth.register.confirmPassword')}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
      />

      <Input
        {...register('country_code')}
        label={t('auth.register.countryCode')}
        placeholder={t('auth.register.countryCodePlaceholder')}
        error={errors.country_code?.message}
        maxLength={2}
      />

      <Input
        {...register('birth_date')}
        label={t('auth.register.birthDate')}
        placeholder={t('auth.register.birthDatePlaceholder')}
        type="date"
        error={errors.birth_date?.message}
      />

      <Button type="submit" fullWidth loading={isSubmitting}>
        {t('auth.register.submit')}
      </Button>

      <p className="auth-form__terms">
        {t('auth.register.terms', {
          terms: <Link to="/terms">{t('auth.register.termsLink')}</Link>,
          privacy: <Link to="/privacy">{t('auth.register.privacyLink')}</Link>,
        })}
      </p>

      <p className="auth-form__footer">
        {t('auth.register.hasAccount')}{' '}
        <Link to="/login">{t('auth.register.loginLink')}</Link>
      </p>
    </form>
  )
}