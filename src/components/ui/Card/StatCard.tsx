import type { ReactNode } from 'react'

import { Card } from './Card'
import './StatCard.css'

export interface StatCardProps {
  label: string
  value: string
  /** Informação de apoio (ex.: "+8 esta semana"). Só exibir com fonte confiável. */
  trend?: string
  icon?: ReactNode
}

export function StatCard({ label, value, trend, icon }: StatCardProps) {
  return (
    <Card className="stat-card">
      <div className="stat-card__header">
        <span className="stat-card__label">{label}</span>
        {icon && (
          <span className="stat-card__icon" aria-hidden>
            {icon}
          </span>
        )}
      </div>
      <p className="stat-card__value">{value}</p>
      {trend && <p className="stat-card__trend">{trend}</p>}
    </Card>
  )
}
