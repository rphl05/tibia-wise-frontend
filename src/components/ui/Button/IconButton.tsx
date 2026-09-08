import { clsx } from 'clsx'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

import './IconButton.css'

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Nome acessível obrigatório — o botão não possui texto visível. */
  'aria-label': string
  variant?: 'ghost' | 'surface'
  size?: 'sm' | 'md'
  children: ReactNode
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { variant = 'ghost', size = 'md', className, type = 'button', children, ...rest },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={clsx(
        'icon-btn',
        `icon-btn--${variant}`,
        `icon-btn--${size}`,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  ),
)

IconButton.displayName = 'IconButton'
