import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/Button/Button'
import './ErrorState.css'

export interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

/**
 * Estado de erro genérico. Nunca exibir mensagens técnicas da API —
 * mostrar mensagens compreensíveis ao usuário.
 */
export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  const { t } = useTranslation()

  return (
    <div className="error-state" role="alert">
      <AlertTriangle size={40} aria-hidden className="error-state__icon" />
      <h2 className="error-state__title">{title ?? t('errors.generic')}</h2>
      {description && <p className="error-state__description">{description}</p>}
      {onRetry && <Button onClick={onRetry}>{t('actions.retry')}</Button>}
    </div>
  )
}
