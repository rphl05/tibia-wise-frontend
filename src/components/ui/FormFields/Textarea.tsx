import { clsx } from 'clsx'
import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'

import './FormField.css'

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, ...rest }, ref) => {
    const id = useId()
    const messageId = `${id}-message`

    return (
      <div className={clsx('field', error && 'field--error', className)}>
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          className="field__textarea"
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          {...rest}
        />
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

Textarea.displayName = 'Textarea'
