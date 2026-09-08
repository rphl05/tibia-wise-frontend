import type { ReactNode } from 'react'

import { Button } from '@/components/ui/Button/Button'
import './EmptyState.css'

export interface EmptyStateProps {
  /** Ilustração de empty-state (imagens em public/assets/images/empty-*.webp). */
  image?: string
  title: string
  description?: string
  /** Label do CTA principal; renderiza um Button. */
  actionLabel?: string
  onAction?: () => void
  secondaryAction?: ReactNode
}

export function EmptyState({
  image,
  title,
  description,
  actionLabel,
  onAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      {image && <img src={image} alt="" className="empty-state__image" width={200} />}
      <h2 className="empty-state__title">{title}</h2>
      {description && <p className="empty-state__description">{description}</p>}
      {(actionLabel || secondaryAction) && (
        <div className="empty-state__actions">
          {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}
