import { clsx } from 'clsx'
import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import './Switch.css'

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  label: string
}

/**
 * Switch para preferências de efeito imediato.
 * Não usar para ações que exigem confirmação.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, ...rest }, ref) => {
    const id = useId()

    return (
      <div className={clsx('switch', className)}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className="switch__input"
          {...rest}
        />
        <label htmlFor={id} className="switch__label">
          <span className="switch__track" aria-hidden>
            <span className="switch__thumb" />
          </span>
          {label}
        </label>
      </div>
    )
  },
)

Switch.displayName = 'Switch'
