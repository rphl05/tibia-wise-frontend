import { clsx } from 'clsx'
import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import './FormField.css'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  error?: string
  hint?: string
  success?: string
}

/**
 * Input com label obrigatório e mensagens de validação associadas
 * via aria-describedby (acessibilidade).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, success, className, ...rest }, ref) => {
    const id = useId()
    const messageId = `${id}-message`
    const message = error ?? success ?? hint
    const state = error ? 'error' : success ? 'success' : undefined

    return (
      <div className={clsx('field', state && `field--${state}`, className)}>
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
        <div className="field__control">
          <input
            ref={ref}
            id={id}
            className="field__input"
            aria-invalid={error ? true : undefined}
            aria-describedby={message ? messageId : undefined}
            {...rest}
          />
        </div>
        {message && (
          <p
            id={messageId}
            className={clsx(
              error && 'field__error',
              success && 'field__success',
              !error && !success && 'field__hint',
            )}
            role={error ? 'alert' : undefined}
          >
            {message}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
