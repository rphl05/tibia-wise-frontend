import { clsx } from 'clsx'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

import './Card.css'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'highlight'
  /** Torna o card interativo (hover/focus). Use com onClick e role adequado. */
  interactive?: boolean
  as?: ElementType
  children: ReactNode
}

export function Card({
  variant = 'default',
  interactive = false,
  as: Element = 'div',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Element
      className={clsx(
        'card',
        variant === 'highlight' && 'card--highlight',
        interactive && 'card--interactive',
        className,
      )}
      {...(interactive && !rest.onClick ? { tabIndex: 0 } : {})}
      {...rest}
    >
      {children}
    </Element>
  )
}
