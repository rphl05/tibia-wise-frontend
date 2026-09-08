import { clsx } from 'clsx'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

import './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'premium'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'btn',
          `btn--${variant}`,
          `btn--${size}`,
          fullWidth && 'btn--full',
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading && (
          <span className="btn__spinner" aria-hidden="true">
            <span className="spinner" />
          </span>
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="btn__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="btn__label">{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className="btn__icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
