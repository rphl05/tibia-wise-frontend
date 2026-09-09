import { clsx } from 'clsx'
import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import './Dropdown.css'

export interface DropdownProps {
  /** Elemento que abre o menu (button). Recebe props via render. */
  trigger: (props: {
    onClick: () => void
    'aria-expanded': boolean
    'aria-haspopup': 'menu'
  }) => ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  'aria-label'?: string
}

/**
 * Dropdown genérico com fechamento por clique fora e Esc.
 * Itens internos devem usar <DropdownItem>.
 */
export function Dropdown({ trigger, children, align = 'right', 'aria-label': ariaLabel }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="dropdown" ref={rootRef}>
      {trigger({
        onClick: () => setOpen((v) => !v),
        'aria-expanded': open,
        'aria-haspopup': 'menu',
      })}
      {open && (
        <div
          className={clsx('dropdown__menu', `dropdown__menu--${align}`)}
          role="menu"
          aria-label={ariaLabel}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  danger?: boolean
  disabled?: boolean
  children: ReactNode
}

export function DropdownItem({ icon, danger, disabled, children, ...rest }: DropdownItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={clsx('dropdown__item', danger && 'dropdown__item--danger', disabled && 'dropdown__item--disabled')}
      disabled={disabled}
      {...rest}
    >
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </button>
  )
}
