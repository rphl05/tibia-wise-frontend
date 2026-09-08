import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { forwardRef, useId, type SelectHTMLAttributes } from 'react'

import './FormField.css'

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label: string
  error?: string
  hint?: string
  placeholder?: string
}

/**
 * Select nativo (acessível por padrão). Para casos que exijam
 * comportamento customizado avançado, criar componente dedicado.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, placeholder, children, className, ...rest }, ref) => {
    const id = useId()
    const messageId = `${id}-message`

    return (
      <div className={clsx('field', error && 'field--error', className)}>
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
        <div className="field__control">
          <select
            ref={ref}
            id={id}
            className="field__input field__select"
            aria-invalid={error ? true : undefined}
            aria-describedby={error || hint ? messageId : undefined}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <span className="field__trailing" aria-hidden>
            <ChevronDown size={18} />
          </span>
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

Select.displayName = 'Select'
