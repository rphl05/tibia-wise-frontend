import { clsx } from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'

import './Badge.css'

export type BadgeVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'premium'
  | 'accent'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

export function Badge({ variant = 'default', className, children, ...rest }: BadgeProps) {
  return (
    <span className={clsx('badge', `badge--${variant}`, className)} {...rest}>
      {children}
    </span>
  )
}
