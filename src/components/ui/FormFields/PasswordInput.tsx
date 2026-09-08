import { clsx } from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import './FormField.css'

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  label: string
  error?: string
  hint?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, hint, className, ...rest }, ref) => {
    const { t } = useTranslation()
    const id = useId()
    const messageId = `${id}-message`
    const [visible, setVisible] = useState(false)

    return (
      <div className={clsx('field', error && 'field--error', className)}>
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
        <div className="field__control">
          <input
            ref={ref}
            id={id}
            type={visible ? 'text' : 'password'}
            className="field__input"
            style={{ paddingRight: 'var(--space-10)' }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error || hint ? messageId : undefined}
            {...rest}
          />
          <button
            type="button"
            className="field__trailing field__trailing--interactive icon-btn icon-btn--ghost icon-btn--sm"
            onClick={() => setVisible((v) => !v)}
            aria-label={
              visible
                ? t('form.hidePassword', 'Ocultar senha')
                : t('form.showPassword', 'Mostrar senha')
            }
          >
            {visible ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
          </button>
        </div>
        {(error || hint) && (
          <p
            id={messageId}
            className={error ? 'field__error' : 'field__hint'}
            role={error ? 'alert' : undefined}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'
