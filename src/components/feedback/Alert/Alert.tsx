import { clsx } from 'clsx'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import type { ReactNode } from 'react'

import './Alert.css'

const ICONS = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
} as const

export interface AlertProps {
  type: keyof typeof ICONS
  title?: string
  children: ReactNode
}

/** Feedback persistente e contextual (diferente do Toast, que é temporário). */
export function Alert({ type, title, children }: AlertProps) {
  const Icon = ICONS[type]
  return (
    <div className={clsx('alert', `alert--${type}`)} role={type === 'error' ? 'alert' : 'status'}>
      <Icon size={18} aria-hidden className="alert__icon" />
      <div className="alert__content">
        {title && <p className="alert__title">{title}</p>}
        <div className="alert__body">{children}</div>
      </div>
    </div>
  )
}
