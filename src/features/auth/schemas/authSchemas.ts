import { z } from 'zod'
import { useTranslation } from 'react-i18next'

export function useLoginSchema() {
  const { t } = useTranslation()

  return z.object({
    identifier: z
      .string()
      .min(1, t('auth.validation.identifierRequired', 'Informe seu e-mail ou nome de usuário')),
    password: z.string().min(1, t('auth.validation.passwordRequired', 'Informe sua senha')),
    captcha_token: z.string().optional(),
  })
}

export function useRegisterSchema() {
  const { t } = useTranslation()

  return z
    .object({
      email: z
        .string()
        .min(1, t('auth.validation.emailRequired', 'Informe seu e-mail'))
        .email(t('auth.validation.invalidEmail', 'E-mail inválido')),
      username: z
        .string()
        .min(1, t('auth.validation.usernameRequired', 'Informe o nome de usuário'))
        .regex(/^[a-zA-Z0-9_-]{4,30}$/, t('auth.validation.invalidUsername', '4-30 caracteres: letras, números, _ ou -')),
      display_name: z
        .string()
        .min(1, t('auth.validation.displayNameRequired', 'Informe o nome de exibição'))
        .max(80, t('auth.validation.displayNameMax', 'Máximo 80 caracteres')),
      password: z
        .string()
        .min(1, t('auth.validation.passwordRequired', 'Informe a senha'))
        .min(8, t('auth.validation.passwordMin', 'Mínimo 8 caracteres'))
        .regex(/[A-Z]/, t('auth.validation.passwordUppercase', 'Pelo menos 1 maiúscula'))
        .regex(/[0-9]/, t('auth.validation.passwordNumber', 'Pelo menos 1 número'))
        .regex(/[^A-Za-z0-9]/, t('auth.validation.passwordSymbol', 'Pelo menos 1 símbolo')),
      confirmPassword: z.string().min(1, t('auth.validation.confirmRequired', 'Confirme a senha')),
      country_code: z.string().regex(/^[A-Z]{2}$/, t('auth.validation.invalidCountry', 'Código inválido (ex.: BR)')).optional(),
      birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, t('auth.validation.invalidBirthDate', 'Data inválida (AAAA-MM-DD)')).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.validation.passwordsMismatch', 'As senhas não coincidem'),
      path: ['confirmPassword'],
    })
}

export function useForgotPasswordSchema() {
  const { t } = useTranslation()

  return z.object({
    email: z
      .string()
      .min(1, t('auth.validation.emailRequired', 'Informe seu e-mail'))
      .email(t('auth.validation.invalidEmail', 'E-mail inválido')),
  })
}

export function useResetPasswordSchema() {
  const { t } = useTranslation()

  return z
    .object({
      token: z.string().min(1, 'Token obrigatório'),
      password: z
        .string()
        .min(1, t('auth.validation.passwordRequired', 'Informe a nova senha'))
        .min(8, t('auth.validation.passwordMin', 'Mínimo 8 caracteres'))
        .regex(/[A-Z]/, t('auth.validation.passwordUppercase', 'Pelo menos 1 maiúscula'))
        .regex(/[0-9]/, t('auth.validation.passwordNumber', 'Pelo menos 1 número'))
        .regex(/[^A-Za-z0-9]/, t('auth.validation.passwordSymbol', 'Pelo menos 1 símbolo')),
      confirmPassword: z.string().min(1, t('auth.validation.confirmRequired', 'Confirme a senha')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.validation.passwordsMismatch', 'As senhas não coincidem'),
      path: ['confirmPassword'],
    })
}

export function useVerifyEmailSchema() {
  const { t } = useTranslation()

  return z.object({
    token: z.string().min(1, t('auth.validation.codeRequired', 'Informe o código')).length(6, t('auth.validation.codeLength', 'Código de 6 dígitos')),
  })
}