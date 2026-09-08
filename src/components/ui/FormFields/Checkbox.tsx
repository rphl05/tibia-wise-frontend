import { clsx } from 'clsx'
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

import './Checkbox.css'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  label: ReactNode
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...rest }, ref) => {
    const id = useId()
    const errorId = `${id}-error`

    return (
      <div className={clsx('checkbox', className)}>
        <div className="checkbox__row">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className="checkbox__input"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...rest}
          />
          <label htmlFor={id} className="checkbox__label">
            {label}
          </label>
        </div>
        {error && (
          <p id={errorId} className="field__error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
