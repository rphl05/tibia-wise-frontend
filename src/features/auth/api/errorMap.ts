import { useTranslation } from 'react-i18next'
import type { ApiError } from '@/lib/api/errors'

export function useAuthErrorMap(): (error: unknown) => Record<string, string> {
  const { t } = useTranslation()

  return (error: unknown) => {
    if (!isApiError(error)) {
      return { form: t('errors.generic') }
    }

    const fieldErrors: Record<string, string> = {}

    switch (error.code) {
      case 'VALIDATION_ERROR': {
        const messages = Array.isArray(error.message) ? error.message : [error.message]
        for (const msg of messages) {
          if (msg.includes('email')) fieldErrors.email = t('auth.errors.invalidEmail', 'E-mail inválido')
          else if (msg.includes('username')) fieldErrors.username = t('auth.errors.invalidUsername', 'Nome de usuário inválido')
          else if (msg.includes('password')) fieldErrors.password = t('auth.errors.invalidPassword', 'Senha inválida')
          else if (msg.includes('confirm')) fieldErrors.confirmPassword = t('auth.errors.passwordsMismatch', 'As senhas não coincidem')
          else if (msg.includes('display_name')) fieldErrors.displayName = t('auth.errors.invalidDisplayName', 'Nome de exibição inválido')
          else fieldErrors.form = msg
        }
        break
      }
      case 'INVALID_CREDENTIALS':
        fieldErrors.form = t('auth.errors.invalidCredentials', 'Credenciais inválidas. Verifique e-mail/usuário e senha.')
        break
      case 'EMAIL_NOT_VERIFIED':
        fieldErrors.form = t('auth.errors.emailNotVerified', 'E-mail não verificado. Verifique sua caixa de entrada.')
        break
      case 'EMAIL_ALREADY_IN_USE':
        fieldErrors.email = t('auth.errors.emailInUse', 'Este e-mail já está em uso.')
        break
      case 'USERNAME_ALREADY_IN_USE':
        fieldErrors.username = t('auth.errors.usernameInUse', 'Este nome de usuário já está em uso.')
        break
      case 'CAPTCHA_REQUIRED':
        fieldErrors.form = t('auth.errors.captchaRequired', 'Verificação necessária. Tente novamente.')
        break
      case 'ACCOUNT_LOCKED':
        fieldErrors.form = t('auth.errors.accountLocked', 'Conta bloqueada temporariamente. Tente novamente mais tarde.')
        break
      case 'ACCOUNT_SUSPENDED':
        fieldErrors.form = t('auth.errors.accountSuspended', 'Conta suspensa. Entre em contato com o suporte.')
        break
      case 'INVALID_TOKEN':
        fieldErrors.form = t('auth.errors.invalidToken', 'Token inválido ou expirado.')
        break
      case 'UNAUTHORIZED':
        fieldErrors.form = t('auth.errors.unauthorized', 'Sessão expirada. Faça login novamente.')
        break
      default:
        fieldErrors.form = t('errors.generic')
    }

    return fieldErrors
  }
}

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'status' in error
  )
}